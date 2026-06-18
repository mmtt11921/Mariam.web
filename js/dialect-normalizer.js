/**
 * Mariam AI - Dialect & Franco-Arabic Normalizer
 *
 * Independent pre-processing layer placed BEFORE js/ai-engine.js classification.
 * It does NOT replace ai-engine.js normalize()/tokens(); it widens the input so the
 * existing engine (and its dialect map) recognizes more variants:
 *  - Egyptian, Levantine, Iraqi, Maghrebi/Darija common question words
 *  - Missing/extra hamzas, common misspellings
 *  - Franco-Arabic (Arabic typed in Latin letters, e.g. "3arabi", "ezayek")
 *
 * Output is plain Arabic-script text that is then handed to MARIAM_AI_ENGINE as usual.
 */
(() => {
  // Franco-Arabic (Arabizi) -> Arabic letter map. Order matters: multi-char first.
  const francoMultiMap = [
    [/3a/g, "عا"], [/3i/g, "عي"], [/3o/g, "عو"], [/3u/g, "عو"],
    [/kh/g, "خ"], [/sh/g, "ش"], [/th/g, "ث"], [/gh/g, "غ"], [/dh/g, "ذ"],
    [/ae/g, "ا"], [/aa/g, "ا"], [/ee/g, "ي"], [/oo/g, "و"]
  ];
  const francoCharMap = new Map(Object.entries({
    "2": "ء", "3": "ع", "5": "خ", "6": "ط", "7": "ح", "8": "ق", "9": "ق",
    "a": "ا", "b": "ب", "c": "ك", "d": "د", "e": "ي", "f": "ف", "g": "ج",
    "h": "ه", "i": "ي", "j": "ج", "k": "ك", "l": "ل", "m": "م", "n": "ن",
    "o": "و", "p": "ب", "q": "ق", "r": "ر", "s": "س", "t": "ت", "u": "و",
    "v": "ف", "w": "و", "x": "كس", "y": "ي", "z": "ز"
  }));

  // Quick heuristic: does the text look like Franco-Arabic (Latin letters + Arabic digits 2/3/5/6/7/8/9 used as letters)?
  function looksFranco(text) {
    const hasLatin = /[a-zA-Z]/.test(text);
    const hasArabicNumeralLetters = /[23567890]/.test(text);
    const hasArabicScript = /[\u0600-\u06FF]/.test(text);
    return hasLatin && hasArabicNumeralLetters && !hasArabicScript;
  }

  function transliterateFranco(text) {
    let result = text.toLowerCase();
    francoMultiMap.forEach(([pattern, replacement]) => {
      result = result.replace(pattern, replacement);
    });
    result = result.split("").map(ch => francoCharMap.get(ch) || ch).join("");
    return result;
  }

  // High-value franco-arabic words mapped directly to their Arabic equivalents.
  // Generic letter-by-letter transliteration is imprecise for short vowels, so the
  // most common question words, verbs, and privacy-sensitive terms get exact
  // mappings here first. Anything not listed falls back to transliterateFranco().
  const francoWordMap = new Map(Object.entries({
    wsh: "وش", wish: "وش", esh: "وش", eh: "وش", ish: "وش",
    leh: "ليش", leih: "ليش", "3alish": "ليش",
    keef: "كيف", kif: "كيف", izay: "كيف", ezay: "كيف", shlon: "كيف", kifash: "كيف",
    wein: "وين", fein: "وين", win: "وين", fin: "وين",
    emta: "متى", mata: "متى", eimta: "متى",
    abi: "ابي", "3abi": "ابي", bgheet: "ابي", "3awza": "ابي", "3ayza": "ابي", "3ayez": "ابي", bidi: "ابي",
    "mashare3ek": "مشاريعك", "mashare3k": "مشاريعك", "mashare3": "مشاريع", "mashroo3": "مشروع",
    "ro7tk": "رؤيتك", "ro7tek": "رؤيتك", "mostaqbalek": "مستقبلك", "mostaqbalk": "مستقبلك",
    "khebretk": "خبرتك", "khebrtek": "خبرتك", "ihtimamatk": "اهتماماتك",
    cyber: "سايبر", cybersecurity: "امن سيبراني", healthcare: "الرعايه الصحيه",
    hawat: "هواة", hwaat: "هواة", mariam: "مريم", step: "step",
    "3omrek": "كم عمرك", omrek: "كم عمرك", "3omrak": "كم عمرك", "3omrik": "كم عمرك",
    "3unwanek": "عنوانك", "3unwanak": "عنوانك", telefonek: "تلفونك", "ra2ebek": "راتبك", rateb: "راتب",
    "ta3rifeeni": "تعرفيني", "ta3rifini": "تعرفيني", "3arefeeny": "عرفيني", "3arrefeeny": "عرفيني",
    esmek: "اسمك",
    shukran: "شكرا", thanks: "شكرا",
    salam: "سلام", salamu: "السلام عليكم"
  }));

  function applyFrancoWordMap(text) {
    return text.toLowerCase().split(/(\s+)/).map(part => {
      if (/^\s+$/.test(part)) return part;
      const stripped = part.replace(/[?!.,]/g, "");
      const mapped = francoWordMap.get(stripped);
      return mapped || part;
    }).join("");
  }

  // Common dialect words mapped to the Saudi/Hijazi forms already known by ai-engine's dialectAliases
  // (which itself maps to "وش", "ليش", "ابي", etc.). This catches Egyptian, Levantine, Iraqi, Maghrebi forms.
  const regionalAliases = new Map(Object.entries({
    // Egyptian
    "ايه": "وش", "إيه": "وش", "ازاي": "كيف", "إزاي": "كيف", "عايز": "ابي", "عايزة": "ابي",
    "عاوز": "ابي", "عاوزة": "ابي", "ليه": "ليش", "فين": "وين", "إمتى": "متى", "امتى": "متى",
    "دلوقتي": "حاليا", "بتعملي": "تسوين", "بتشتغلي": "تشتغلين", "إنتي": "انت", "انتى": "انت",
    "عامله": "تسوين", "بتعرفي": "تعرفين",

    // Levantine (Shami)
    "شو": "وش", "كيفك": "كيف حالك", "وين": "وين", "هلق": "حاليا", "هلأ": "حاليا",
    "بدي": "ابي", "بدك": "تبين", "ليش": "ليش", "كيفكم": "كيف حالكم", "شغلتك": "شغلك",

    // Iraqi
    "شلون": "وش", "شلونك": "كيف حالك", "شخبارك": "كيف حالك", "اشتغلتي": "اشتغلتي",
    "وكت": "متى", "هسه": "حاليا", "هسة": "حاليا", "اريد": "ابي", "تريدين": "تبين",
    "شنو": "وش", "شنهي": "وش",

    // Maghrebi / Darija (Moroccan, Algerian, Tunisian)
    "كيفاش": "وش", "علاش": "ليش", "بغيت": "ابي", "غادي": "رايحه",
    "واش": "وش", "شحال": "كم", "دابا": "حاليا", "منين": "من وين", "كيداير": "كيف حالك",
    "كيداير ا": "كيف حالك", "بزاف": "كثير", "نتي": "انت"
  }));

  // Common spelling variants / missing hamza forms not already covered by ai-engine normalize()
  const spellingAliases = new Map(Object.entries({
    "ايش": "وش", "ايشي": "وش", "وايش": "وش",
    "احكيلي": "احكي لي", "قوليلي": "قولي لي", "علميني": "علميني",
    "اشتغلتي": "اشتغلتي", "تشتغلين": "تشتغلين",
    "اخصائيه": "تخصص", "تخصصها": "تخصص", "شهادتها": "شهاده",
    "مشاريعها": "مشاريعك", "خبراتها": "خبراتك", "اهتماماتها": "اهتماماتك",
    "مستقبلها": "مستقبلك", "رؤيتها": "رؤيتك", "قصتها": "قصتك",
    "تعيشي": "ساكنه", "تعيشين": "ساكنه", "تسكني": "ساكنه", "تسكنين": "ساكنه"
  }));

  // Apply a word-level map without breaking word boundaries (Arabic-aware).
  function applyWordMap(text, map) {
    return text.split(/(\s+)/).map(part => {
      if (/^\s+$/.test(part)) return part;
      const stripped = part.replace(/[؟?!.,،]/g, "");
      const mapped = map.get(stripped);
      if (!mapped) return part;
      const trailing = part.slice(stripped.length);
      return mapped + trailing;
    }).join("");
  }

  /**
   * Main entry point: takes raw visitor input and returns Arabic-normalized text
   * ready for MARIAM_AI_ENGINE.classify / classifyWithMemory / classifyCompound.
   * English input is returned unchanged.
   */
  function preNormalize(rawText = "") {
    let text = String(rawText).trim();
    if (!text) return text;

    if (looksFranco(text)) {
      text = applyFrancoWordMap(text);
      // Transliterate any remaining Latin-script words not covered by the word map.
      text = text.split(/(\s+)/).map(part => {
        if (/^\s+$/.test(part)) return part;
        if (!/[a-zA-Z0-9]/.test(part)) return part; // already Arabic
        return transliterateFranco(part);
      }).join("");
    }

    if (/[\u0600-\u06FF]/.test(text)) {
      text = applyWordMap(text, regionalAliases);
      text = applyWordMap(text, spellingAliases);
    }

    return text;
  }

  const api = Object.freeze({ preNormalize, looksFranco, transliterateFranco, regionalAliases, spellingAliases });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.MARIAM_DIALECT_NORMALIZER = api;
})();
