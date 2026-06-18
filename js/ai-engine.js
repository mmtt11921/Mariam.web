(() => {
  const dialectAliases = new Map(Object.entries({
    ايش: "وش", شنو: "وش", وشو: "وش", وشي: "وش",
    ليه: "ليش", عليش: "ليش", لماذا: "ليش",
    ابغى: "ابي", بغيت: "ابي", ودي: "ابي",
    انتي: "انت", انك: "انت", عنج: "عنك",
    قاعده: "قاعد", قاعدة: "قاعد", جالسه: "قاعد",
    تسوين: "تسوين", تعملين: "تسوين", تشتغلين: "تشتغلين",
    مهتمه: "مهتم", ساكنه: "ساكن", متزوجه: "متزوج",
    فكره: "فكره", قصتك: "قصه", سالفتك: "قصه",
    الحين: "حاليا", دحين: "حاليا", حاليا: "حاليا",
    هواه: "هواه", هوات: "هواه", هوّاة: "هواه"
  }));
  const fillerWords = new Set(["يا", "طيب", "ممكن", "لو", "سمحتي", "تكفين", "بس", "يعني", "مره", "مرة", "عن", "لي", "لنا", "the", "a", "an", "please"]);

  function normalize(text = "") {
    return String(text).toLowerCase().normalize("NFD")
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
      .replace(/[إأآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/(.)\1{2,}/g, "$1$1")
      .replace(/[^a-z0-9\u0600-\u06FF\s]/g, " ")
      .replace(/\s+/g, " ").trim();
  }

  function tokens(text) {
    return normalize(text).split(" ").filter(Boolean).map(token => dialectAliases.get(token) || token).filter(token => !fillerWords.has(token));
  }

  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i += 1) {
      let previous = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const saved = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
        previous = saved;
      }
    }
    return row[b.length];
  }

  function tokenMatches(input, target) {
    if (input === target) return 1;
    if (input.length >= 5 && target.length >= 5 && (input.includes(target) || target.includes(input))) return .82;
    const longest = Math.max(input.length, target.length);
    if (longest >= 5 && editDistance(input, target) <= 1) return .76;
    return 0;
  }

  function phraseCoverage(inputTokens, phrase) {
    const phraseTokens = tokens(phrase);
    if (!phraseTokens.length) return 0;
    let matched = 0;
    phraseTokens.forEach(target => {
      matched += inputTokens.reduce((best, input) => Math.max(best, tokenMatches(input, target)), 0);
    });
    return matched / phraseTokens.length;
  }

  function orderedPhraseScore(inputTokens, phrase) {
    const phraseTokens = tokens(phrase);
    if (phraseTokens.length < 2) return 0;
    let cursor = -1;
    let matched = 0;
    let span = 0;
    phraseTokens.forEach(target => {
      const next = inputTokens.findIndex((input, index) => index > cursor && tokenMatches(input, target) >= .74);
      if (next >= 0) {
        if (cursor >= 0) span += next - cursor;
        cursor = next;
        matched += 1;
      }
    });
    if (matched !== phraseTokens.length) return 0;
    return span <= phraseTokens.length + 2 ? 14 : 8;
  }

  function scoreIntent(text, intent) {
    const normalized = normalize(text);
    const inputTokens = tokens(text);
    let score = 0;
    let signals = 0;

    intent.phrases.forEach(phrase => {
      const normalizedPhrase = normalize(phrase);
      if (normalized.includes(normalizedPhrase)) {
        score = Math.max(score, 100);
        signals += 2;
        return;
      }
      const coverage = phraseCoverage(inputTokens, phrase);
      if (coverage >= .9) { score = Math.max(score, 88); signals += 2; }
      else if (coverage >= .7) { score = Math.max(score, 70); signals += 1; }
      score += orderedPhraseScore(inputTokens, phrase);
    });

    intent.words.forEach(word => {
      const wordTokens = tokens(word);
      const coverage = phraseCoverage(inputTokens, word);
      if (coverage >= .98) { score += wordTokens.length > 1 ? 42 : 26; signals += 1; }
      else if (coverage >= .74) { score += wordTokens.length > 1 ? 30 : 16; signals += .5; }
    });

    if (signals >= 2 && score < 70) score += 18;
    return Math.min(100, Math.round(score));
  }

  function includesAlias(text, alias) {
    return normalize(text).includes(normalize(alias));
  }

  function classify(question, config) {
    const text = normalize(question);
    if (!text) return { topic: "unknown", confidence: 0, alternatives: [] };
    const mentionsQ = /\bq\b/.test(text) || includesAlias(text, config.qLegacyAlias) || includesAlias(text, config.qLegacyArabicAlias);
    if (mentionsQ && config.qConceptTerms.some(term => includesAlias(text, term))) return { topic: "qConceptPrivate", confidence: 100, alternatives: [] };
    if (mentionsQ || ["what is future venture", "what is your next venture", "next venture", "وش المشروع القادم", "وش المشروع المستقبلي"].some(phrase => includesAlias(text, phrase))) {
      return { topic: "confidential", confidence: 100, alternatives: [] };
    }

    const ranked = config.aiIntents.map(intent => ({ topic: intent.topic, hard: intent.hard, score: scoreIntent(text, intent) }))
      .sort((a, b) => b.score - a.score);
    const hardMatch = ranked.find(intent => intent.hard && intent.score >= 26);
    if (hardMatch) return { topic: hardMatch.topic, confidence: hardMatch.score, alternatives: ranked.slice(0, 3) };

    const top = ranked[0];
    const second = ranked[1] || { score: 0 };
    const margin = top.score - second.score;
    const confident = top.score >= 70 || (top.score >= 58 && margin >= 18) || (top.score >= 26 && margin >= 26);
    return { topic: confident ? top.topic : "unknown", confidence: confident ? top.score : Math.min(top.score, 69), alternatives: ranked.slice(0, 3) };
  }

  function splitClauses(question) {
    return String(question).split(/[؟?!،,;؛]|\s+(?:وبعدها|وبرضو|وكمان|وايضا|أيضًا|also|and also|plus)\s+|\s+و(?=(?:وش|ايش|ليش|كيف|هل|وين|متى|من|ابي|ودي)\s)|\s+and\s+(?=(?:what|why|how|where|who|tell|can)\s)/i)
      .map(part => part.trim().replace(/^و(?=(?:وش|ايش|ليش|كيف|هل|وين|متى|من|ابي|ودي)\s)/, ""))
      .filter(part => tokens(part).length > 0);
  }

  function classifyCompound(question, config) {
    const whole = classify(question, config);
    if (["privacy", "confidential", "qConceptPrivate"].includes(whole.topic)) return { ...whole, topics: [whole.topic], compound: false };
    const clauses = splitClauses(question);
    if (clauses.length < 2) return { ...whole, topics: whole.topic === "unknown" ? [] : [whole.topic], compound: false };

    const results = clauses.map(clause => classify(clause, config)).filter(result => result.topic !== "unknown");
    const protectedResult = results.find(result => ["privacy", "confidential", "qConceptPrivate"].includes(result.topic));
    if (protectedResult) return { ...protectedResult, topics: [protectedResult.topic], compound: false };

    const topics = [...new Set(results.map(result => result.topic))].slice(0, 3);
    if (topics.length < 2) return { ...whole, topics: whole.topic === "unknown" ? topics : [whole.topic], compound: false };
    return { topic: topics[0], topics, confidence: Math.min(...results.map(result => result.confidence)), alternatives: results, compound: true };
  }

  const referenceFollowUpPattern = /^(وش فيه|ايش فيه|وش يقدم|ايش يقدم|وش يسوي|ايش يسوي|وش فكرته|ايش فكرته|وش هدفه|ايش هدفه|مين يستفيد منه|كيف استفيد منه|وين القاه|وين الاقيه|كيف ادخله|كيف انضم|قولي عنه|علميني عنه|ابي اعرف عنه|tell me more about it|what does it offer|what is in it|how do i join|where can i find it)$/;
  const expansionFollowUpPattern = /^(وش بعد|وبعدين|قولي اكثر|علميني اكثر|زيديني|كيف يعني|وضحي|وضح|tell me more|what else|explain more)$/;

  function createMemory(initial = {}) {
    return {
      lastTopic: initial.lastTopic || null,
      recentTopics: Array.isArray(initial.recentTopics) ? initial.recentTopics.slice(0, 4) : [],
      turns: Number.isFinite(initial.turns) ? initial.turns : 0
    };
  }

  function remember(memory, topics) {
    const meaningful = topics.filter(topic => !["unknown", "greeting", "islamicGreeting", "thanks"].includes(topic));
    if (meaningful.length) {
      memory.lastTopic = meaningful[meaningful.length - 1];
      memory.recentTopics = [...new Set([...meaningful.reverse(), ...memory.recentTopics])].slice(0, 4);
    }
    memory.turns += 1;
    return memory;
  }

  function classifyWithMemory(question, config, memory = createMemory()) {
    const result = classifyCompound(question, config);
    const normalized = normalize(question);
    const isReference = referenceFollowUpPattern.test(normalized);
    const isExpansion = expansionFollowUpPattern.test(normalized);
    if ((result.topic === "unknown" || isReference || isExpansion) && memory.lastTopic) {
      const protectedTopic = ["privacy", "confidential", "qConceptPrivate"].includes(memory.lastTopic);
      if (!protectedTopic) {
        const contextual = { topic: memory.lastTopic, topics: [memory.lastTopic], confidence: 92, compound: false, contextual: true };
        remember(memory, contextual.topics);
        return contextual;
      }
    }
    remember(memory, result.topics || (result.topic === "unknown" ? [] : [result.topic]));
    return result;
  }

  const engine = Object.freeze({ normalize, tokens, scoreIntent, classify, splitClauses, classifyCompound, createMemory, classifyWithMemory });
  if (typeof module !== "undefined" && module.exports) module.exports = engine;
  if (typeof window !== "undefined") window.MARIAM_AI_ENGINE = engine;
})();
