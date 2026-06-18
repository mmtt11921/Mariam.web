const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const base = path.join(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
["js/ai-config.js", "js/ai-engine.js", "js/dialect-normalizer.js", "js/ai-conversation.js"].forEach(file => {
  vm.runInContext(fs.readFileSync(path.join(base, file), "utf8"), context);
});
const conversation = context.window.MARIAM_AI_CONVERSATION;

// [question, expected topics array]
const cases = [
  // --- Egyptian ---
  ["ايه مشاريعك؟", ["projects"]],
  ["إزاي بدأ اهتمامك بالأمن السيبراني؟", ["cybersecurity"]],
  ["فين ممكن ألاقي هواة هب؟", ["hawatHub"]],
  ["إمتى هواة هب هيطلق؟", ["hawat", "hawatHub"]],

  // --- Levantine (Shami) ---
  ["شو مشاريعك؟", ["projects"]],
  ["كيفك، شو قصتك؟", ["who"]],
  ["وين بلاقي هواة هب؟", ["hawatHub"]],
  ["ليش مهتمة بالصحة الرقمية؟", ["healthcare"]],

  // --- Iraqi ---
  ["شلون اهتماماتك؟", ["interests"]],
  ["شخبارك، شنو مشاريعك؟", ["projects"]],
  ["شنهي هواة؟", ["hawat"]],

  // --- Maghrebi / Darija ---
  ["واش مشاريعك؟", ["projects"]],
  ["علاش مهتمة بالأمن السيبراني؟", ["cybersecurity"]],
  ["واش هواة هب؟", ["hawatHub"]],

  // --- Spelling mistakes / missing hamza ---
  ["ايش مشاريعك", ["projects"]],
  ["وش اهتماماتها", ["interests"]],
  ["وش رؤيتها للمستقبل", ["future"]],
  ["وش خبراتها", ["experience"]],

  // --- Franco-Arabic (Arabic in Latin letters) ---
  ["wsh mashare3k", ["projects"]],
  ["3arabi wsh mashare3k", ["projects"]],
  ["leh ta7tay l cyber", ["cybersecurity"]],
  ["wsh ro7tk lel mostaqbal", ["future"]],
  ["3arefeeny 3an mariam", ["who"]],

  // --- English ---
  ["What are your projects?", ["projects"]],
  ["Why cybersecurity?", ["cybersecurity"]],
  ["Tell me about Hawat Hub", ["hawatHub"]]
];

const failures = [];
cases.forEach(([question, expected]) => {
  const session = conversation.createSession();
  const result = conversation.ask(question, session);
  const topics = result.topics || [];
  const ok = expected.some(topic => topics.includes(topic));
  if (!ok) failures.push({ question, expected, actual: topics, confidence: result.confidence });
});

const accuracy = ((cases.length - failures.length) / cases.length) * 100;
console.log(`Mariam AI dialect/franco accuracy: ${accuracy.toFixed(1)}% (${cases.length - failures.length}/${cases.length})`);
failures.forEach(failure => console.log(JSON.stringify(failure)));
if (accuracy < 85) process.exitCode = 1;
