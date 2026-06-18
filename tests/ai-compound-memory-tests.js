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

let failures = [];
let total = 0;

function expectTopics(question, session, expectedTopics, label) {
  total += 1;
  const result = conversation.ask(question, session);
  const ok = expectedTopics.every(topic => result.topics.includes(topic));
  if (!ok) failures.push({ label, question, expected: expectedTopics, actual: result.topics });
  return result;
}

// --- Compound / multi-part questions ---
(() => {
  const session = conversation.createSession();
  expectTopics("وش مشاريعك وليش مهتمة بالأمن السيبراني؟", session, ["projects", "cybersecurity"], "compound-ar");
})();

(() => {
  const session = conversation.createSession();
  expectTopics("Tell me about Mariam and what projects she is building", session, ["who", "projects"], "compound-en");
})();

// --- Follow-up / conversation memory ---
(() => {
  const session = conversation.createSession();
  expectTopics("وش مشاريعك؟", session, ["projects"], "memory-1");
  expectTopics("ومتى يطلق؟", session, ["projects"], "memory-2 (ومتى يطلق -> stays on projects/hawat)");
})();

(() => {
  const session = conversation.createSession();
  expectTopics("وش هواة هب؟", session, ["hawatHub"], "memory-hawatHub-1");
  expectTopics("وش يقدم؟", session, ["hawatHub"], "memory-hawatHub-2 (follow-up resolves pronoun)");
  expectTopics("وين ألقاه؟", session, ["hawatHub"], "memory-hawatHub-3 (second follow-up)");
})();

(() => {
  const session = conversation.createSession();
  expectTopics("ليش مهتمة بالأمن السيبراني؟", session, ["cybersecurity"], "memory-cyber-1");
  expectTopics("قولي أكثر", session, ["cybersecurity"], "memory-cyber-2 (expansion follow-up)");
})();

// --- Short follow-ups should not leak after a privacy/confidential answer ---
(() => {
  const session = conversation.createSession();
  expectTopics("كم عمرك؟", session, ["privacy"], "privacy-then-followup-1");
  const result = conversation.ask("وش فيه؟", session);
  total += 1;
  if (result.topics.includes("privacy") || result.topics.includes("confidential")) {
    failures.push({ label: "privacy-then-followup-2", question: "وش فيه؟", note: "follow-up after privacy must not be treated as continuing the private topic", actual: result.topics });
  }
})();

const accuracy = ((total - failures.length) / total) * 100;
console.log(`Mariam AI compound + memory accuracy: ${accuracy.toFixed(1)}% (${total - failures.length}/${total})`);
failures.forEach(failure => console.log(JSON.stringify(failure)));
if (accuracy < 85) process.exitCode = 1;
