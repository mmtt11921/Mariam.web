/**
 * Mariam AI - Conversation Manager
 *
 * Pure logic layer (no DOM). Wraps:
 *  - js/dialect-normalizer.js  (Egyptian/Levantine/Iraqi/Maghrebi + Franco-Arabic)
 *  - js/ai-engine.js           (intent classification, memory, compound questions)
 *  - js/ai-config.js           (answers, intents, privacy aliases)
 *
 * Exposes a single ask(question) -> { answer, language, topics, confidence, suggestions }
 * so the chat UI and the voice layer can both call the same brain.
 */
(() => {
  const { aiAnswers, aiIntents, qLegacyAlias, qLegacyArabicAlias, qConceptTerms } = window.MARIAM_AI_CONFIG;
  const engine = window.MARIAM_AI_ENGINE;
  const dialect = window.MARIAM_DIALECT_NORMALIZER;

  const config = { aiIntents, qLegacyAlias, qLegacyArabicAlias, qConceptTerms };
  const hasArabic = text => /[\u0600-\u06FF]/.test(text);

  // Suggested follow-up questions per topic (used by the chat UI for dynamic chips).
  const followUps = {
    ar: {
      who: ["وش مشاريعك؟", "وش رؤيتك المستقبلية؟"],
      projects: ["وش هواة هب؟", "ليش الأمن السيبراني؟"],
      hawat: ["متى يطلق هواة هب؟", "وش خطوة ميرا؟"],
      hawatHub: ["متى الإطلاق الرسمي؟", "وش مجتمعاتك الأخرى؟"],
      cybersecurity: ["وش رؤيتك المستقبلية؟", "وش مشاريعك؟"],
      healthcare: ["وش خبراتك؟", "وش مشاريعك؟"],
      step: ["وش مشاريعك الأخرى؟", "وش رؤيتك المستقبلية؟"],
      experience: ["وش تعلمتي من خبراتك؟", "وش اهتماماتك؟"],
      future: ["وش مشاريعك الحالية؟", "وش هواة هب؟"],
      communities: ["وش مركز المعرفة؟", "وش هواة؟"],
      education: ["وش اهتماماتك؟", "وش خبراتك؟"],
      languages: ["وش تخصصك؟", "وش اهتماماتك؟"],
      sabah: ["وش أرشيف التصميم؟", "ليش التصميم الصحي؟"],
      design: ["وش مشروع SABAH Laboratories؟", "كيف تصممين لكل قطاع؟"],
      voiceFuture: ["وش يقدر يسوي Mariam AI؟", "وش رؤيتك للموقع؟"],
      interests: ["وش مشاريعك؟", "وش رؤيتك المستقبلية؟"],
      unknown: ["مين مريم؟", "وش مشاريعك؟", "وش رؤيتك للمستقبل؟"]
    },
    en: {
      who: ["What are your projects?", "What is your future vision?"],
      projects: ["What is Hawat Hub?", "Why cybersecurity?"],
      hawat: ["When does Hawat Hub launch?", "What is Step by Mira?"],
      hawatHub: ["When is the official launch?", "What other communities do you have?"],
      cybersecurity: ["What is your future vision?", "What are your projects?"],
      healthcare: ["Tell me about your experience", "What are your projects?"],
      step: ["What other projects are you building?", "What is your future vision?"],
      experience: ["What did you learn from your experience?", "What are your interests?"],
      future: ["What are your current projects?", "What is Hawat Hub?"],
      communities: ["What is Knowledge Hub?", "What is Hawat?"],
      education: ["What are your interests?", "Tell me about your experience"],
      languages: ["What did you study?", "What are your interests?"],
      sabah: ["What is the design archive?", "Why healthcare design?"],
      design: ["What is SABAH Laboratories?", "How do you design for each sector?"],
      voiceFuture: ["What can Mariam AI do?", "What is the website vision?"],
      interests: ["What are your projects?", "What is your future vision?"],
      unknown: ["Who is Mariam?", "What are your projects?", "What is your future vision?"]
    }
  };

  const PRIVATE_TOPICS = ["privacy", "confidential", "qConceptPrivate"];

  function createSession(initialMemory = {}) {
    const memory = engine.createMemory(initialMemory);
    return {
      memory,
      serialize() {
        return JSON.stringify(memory);
      }
    };
  }

  function buildSuggestions(language, topics) {
    const list = topics?.length ? topics : ["unknown"];
    const seen = new Set();
    const suggestions = [];
    list.forEach(topic => {
      (followUps[language]?.[topic] || []).forEach(question => {
        if (!seen.has(question)) {
          seen.add(question);
          suggestions.push(question);
        }
      });
    });
    if (!suggestions.length) return followUps[language].unknown;
    return suggestions.slice(0, 3);
  }

  /**
   * Ask Mariam AI a question.
   * @param {string} question raw visitor input (any dialect / franco-arabic / English)
   * @param {object} session  result of createSession()
   * @returns {{answer:string, language:'ar'|'en', topics:string[], confidence:number, suggestions:string[], isPrivate:boolean}}
   */
  function ask(question, session) {
    const isFranco = dialect.looksFranco(question);
    const language = (hasArabic(question) || isFranco) ? "ar" : "en";
    const normalized = (language === "ar") ? dialect.preNormalize(question) : question;

    const result = engine.classifyWithMemory(normalized, config, session.memory);
    const topics = result.topics?.length ? result.topics : [result.topic];
    const answer = topics.map(topic => aiAnswers[language][topic]).filter(Boolean).join("\n\n")
      || aiAnswers[language].unknown;

    return {
      answer,
      language,
      topics,
      confidence: result.confidence,
      isPrivate: topics.some(topic => PRIVATE_TOPICS.includes(topic)),
      suggestions: buildSuggestions(language, topics)
    };
  }

  /** Direct lookup for suggestion-chip clicks (bypasses classification). */
  function answerForTopic(topic, language) {
    return aiAnswers[language]?.[topic] || aiAnswers[language].unknown;
  }

  function greeting(language) {
    return aiAnswers[language].greeting;
  }

  const api = Object.freeze({ createSession, ask, answerForTopic, greeting, buildSuggestions, hasArabic });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.MARIAM_AI_CONVERSATION = api;
})();
