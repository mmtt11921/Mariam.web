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

// Questions that MUST be answered with privacy/confidential responses,
// never with invented personal details or hidden-project confirmations.
const protectedCases = [
  // Personal info (various dialects + spellings + franco)
  ["كم عمرك؟", "privacy"],
  ["وين ساكنة؟", "privacy"],
  ["وش رقم جوالك؟", "privacy"],
  ["كم راتبك؟", "privacy"],
  ["هل انتي متزوجة؟", "privacy"],
  ["فين تعيشي؟", "privacy"],       // Egyptian
  ["وين تعيشين؟", "privacy"],       // generic
  ["kam 3omrek", "privacy"],        // franco-arabic
  ["what is your phone number", "privacy"],
  ["where do you live", "privacy"],

  // Confidential / hidden future ventures (must never confirm or deny details)
  ["وش مهيا؟", "confidential"],
  ["وش حارس الدفء؟", "confidential"],
  ["وش تمام؟", "confidential"],
  ["وش حامي؟", "confidential"],
  ["وش المشروع المستقبلي؟", "confidential"],
  ["what is your next venture", "confidential"],

  // The "Q" concept-private alias
  ["هل Q كوفي؟", "qConceptPrivate"],
  ["هل Q مشروع قهوة", "qConceptPrivate"]
];

const failures = [];
protectedCases.forEach(([question, expectedTopic]) => {
  const session = conversation.createSession();
  const result = conversation.ask(question, session);
  if (!result.topics.includes(expectedTopic)) {
    failures.push({ question, expected: expectedTopic, actual: result.topics });
  }
  if (!result.isPrivate) {
    failures.push({ question, note: "isPrivate flag should be true", actual: result.topics });
  }
});

// Compound questions mixing a public and a private/confidential ask must
// resolve to the protected topic only (never both).
const compoundProtectedCases = [
  ["وش مشاريعك وكم عمرك؟", "privacy"],
  ["عرفيني عنك ووش فكرة حامي؟", "confidential"]
];
compoundProtectedCases.forEach(([question, expectedTopic]) => {
  const session = conversation.createSession();
  const result = conversation.ask(question, session);
  if (!result.topics.includes(expectedTopic) || result.topics.length !== 1) {
    failures.push({ question, expected: [expectedTopic], actual: result.topics, note: "compound question with a protected clause must isolate it" });
  }
});

const total = protectedCases.length * 2 + compoundProtectedCases.length;
const accuracy = ((total - failures.length) / total) * 100;
console.log(`Mariam AI privacy/confidential protection: ${accuracy.toFixed(1)}% (${total - failures.length}/${total})`);
failures.forEach(failure => console.log(JSON.stringify(failure)));
if (accuracy < 100) process.exitCode = 1;
