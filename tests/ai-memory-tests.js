const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const engine = require("../js/ai-engine.js");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/ai-config.js"), "utf8"), context);
const config = context.window.MARIAM_AI_CONFIG;

const conversations = [
  [["وش هواة؟", "hawat"], ["وش فيه؟", "hawat"], ["كيف انضم؟", "hawat"]],
  [["عرفيني عن هواة هب", "hawatHub"], ["وش يقدم؟", "hawatHub"], ["وين ألقاه؟", "hawatHub"]],
  [["ليش مهتمة بالسايبر؟", "cybersecurity"], ["قولي أكثر", "cybersecurity"], ["كيف يعني؟", "cybersecurity"]],
  [["وش مشاريعك؟", "projects"], ["وش بعد؟", "projects"]],
  [["وش تخصصك؟", "education"], ["وش اللغات اللي تعرفينها؟", "languages"], ["قولي عنها أكثر", "languages"]],
  [["كم عمرك؟", "privacy"], ["وش فيه؟", "unknown"]],
  [["هلا والله", "greeting"], ["وش مشاريعك؟", "projects"], ["وش يقدم؟", "projects"]]
];

const failures = [];
let total = 0;
conversations.forEach(turns => {
  const memory = engine.createMemory();
  turns.forEach(([question, expected]) => {
    total += 1;
    const result = engine.classifyWithMemory(question, config, memory);
    if (result.topic !== expected) failures.push({ question, expected, actual: result.topic, memory: { ...memory } });
  });
});

const accuracy = ((total - failures.length) / total) * 100;
console.log(`Mariam AI memory accuracy: ${accuracy.toFixed(1)}% (${total - failures.length}/${total})`);
failures.forEach(failure => console.log(JSON.stringify(failure)));
if (accuracy < 70) process.exitCode = 1;
