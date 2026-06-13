const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const engine = require("../js/ai-engine.js");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/ai-config.js"), "utf8"), context);
const config = context.window.MARIAM_AI_CONFIG;

const cases = [
  ["عرفيني عن مريم ووش المشاريع اللي تبنيها", ["who", "projects"]],
  ["وش مشاريعك وليش مهتمة بالسايبر؟", ["projects", "cybersecurity"]],
  ["وش تخصصك ووش اللغات اللي تعرفينها", ["education", "languages"]],
  ["احكي عن خبراتك ووش تعلمتي من المستشفى", ["experience", "healthcare"]],
  ["وش هو هواة هب وكيف أقدر أعرف مجتمعاتك؟", ["hawatHub", "communities"]],
  ["وش خطوة ميرا ووش رؤيتك للمستقبل", ["step", "future"]],
  ["Tell me about Mariam and what projects she is building", ["who", "projects"]],
  ["Why cybersecurity and why healthcare AI?", ["cybersecurity", "healthcare"]],
  ["What did Mariam study and what languages does she speak?", ["education", "languages"]],
  ["وش مشاريعك وكم عمرك", ["privacy"]],
  ["عرفيني عنك ووش فكرة حامي", ["confidential"]],
  ["وش Q وهل هو مشروع قهوة", ["qConceptPrivate"]],
  ["هلا وكيفك", ["greeting"]], ["السلام عليكم ورحمة الله وبركاته", ["islamicGreeting"]],
  ["وش مشاريعك؟ وليش السايبر؟ وش رؤيتك؟", ["projects", "cybersecurity", "future"]]
];

const failures = [];
cases.forEach(([question, expected]) => {
  const result = engine.classifyCompound(question, config);
  const actual = result.topics || [];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) failures.push({ question, expected, actual, result });
});

const accuracy = ((cases.length - failures.length) / cases.length) * 100;
console.log(`Mariam AI compound accuracy: ${accuracy.toFixed(1)}% (${cases.length - failures.length}/${cases.length})`);
failures.forEach(failure => console.log(JSON.stringify(failure)));
if (accuracy < 70) process.exitCode = 1;
