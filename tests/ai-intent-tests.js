const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const engine = require("../js/ai-engine.js");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/ai-config.js"), "utf8"), context);
const config = context.window.MARIAM_AI_CONFIG;

const cases = [
  ["مين مريم؟", "who"], ["وش سالفتك", "who"], ["عرفينا عليك شوي", "who"], ["ابي اتعرف عليك", "who"],
  ["مريم وش تسوي بالحياة", "who"], ["tell me Mariam's story", "who"],
  ["وش مشاريعك الحين", "projects"], ["وش قاعدة تبنين هالفترة؟", "projects"], ["عطيني نبذة عن مشاريعك", "projects"],
  ["ايش عندك مشاريع حاليا", "projects"], ["وش تشتغلين عليه هالأيام", "projects"], ["what are you building now", "projects"],
  ["ليش اخترتي السايبر؟", "cybersecurity"], ["وش شدك للأمن السبراني", "cybersecurity"], ["كيف بدا اهتمامك بالسايبر", "cybersecurity"],
  ["وش يعجبك بالحماية الرقمية", "cybersecurity"], ["why are you interested in cyber security", "cybersecurity"],
  ["وش علاقتك بالصحة الرقمية", "healthcare"], ["ليه مهتمة بالتقنية الصحية", "healthcare"], ["كيف أثر تدريب المستشفى عليك", "healthcare"],
  ["ليش تجمعين الذكاء الاصطناعي والصحة", "healthcare"], ["tell me about your digital health interest", "healthcare"],
  ["وش خطوة ميرا", "step"], ["خطوة ميرا وش تسوي؟", "step"], ["وش سالفة ستيب باي ميرا", "step"],
  ["علميني عن step by mira", "step"], ["what does Step by Mira offer", "step"],
  ["وش هواة؟", "hawat"], ["كيف انضم لمجتمع هواة", "hawat"], ["مين يستفيد من هواة", "hawat"],
  ["وش هوات هب", "hawatHub"], ["هواة هب وش يقدم", "hawatHub"], ["هل اطلق هواة هب؟", "hawatHub"],
  ["where can I find Hawat Hub", "hawatHub"], ["tell me about hwaat hub", "hawatHub"],
  ["وش خبراتك", "experience"], ["وين تدربتي؟", "experience"], ["وش تجربتك بمستشفى ينبع", "experience"],
  ["وش سويتي بفندق الكناري", "experience"], ["tell me about your work experience", "experience"],
  ["وش تطوعك", "leadership"], ["وش دورك بالفعاليات", "leadership"], ["احكي عن تجربتك القيادية", "leadership"],
  ["وش لغاتك", "languages"], ["كيف مستواك بالانجليزي", "languages"], ["what languages do you speak", "languages"],
  ["وش تخصصك", "education"], ["ايش درست مريم", "education"], ["what did you study", "education"],
  ["وش اهتماماتك", "interests"], ["ايش شغفك", "interests"], ["what fields interest you", "interests"],
  ["وش رؤيتك قدام", "future"], ["وين تشوفين نفسك بالمستقبل", "future"], ["وش تطمحين له", "future"],
  ["what is your future vision", "future"], ["وش مجتمعاتك", "communities"], ["هل عندك مجتمعات تعليمية", "communities"],
  ["وش مركز المعرفة", "knowledge"], ["وين تشاركين الكتب والمعرفة", "knowledge"], ["وش رقي", "ruqi"],
  ["علميني عن ruqi", "ruqi"], ["وش مريم اي اي", "mariamAi"], ["وش يقدر يسوي مساعد مريم", "mariamAi"],
  ["ليش سويتي الموقع", "website"], ["وش فكرة موقع مريم", "website"],
  ["كم عمرك", "privacy"], ["وين ساكنة", "privacy"], ["وش رقم جوالك", "privacy"], ["كم راتبك", "privacy"],
  ["وش مهيا", "confidential"], ["وش حارس الدفء", "confidential"], ["وش تمام", "confidential"], ["هل Q كوفي؟", "qConceptPrivate"],
  ["وش المشروع المستقبلي", "confidential"], ["هلا كيفك", "greeting"], ["السلام عليكم", "islamicGreeting"], ["السلام عليكم ورحمة الله وبركاته", "islamicGreeting"], ["شكرا ما قصرتي", "thanks"], ["وش الجو اليوم", "unknown"], ["عطني وصفة كبسة", "unknown"]
  ,["ممكن تعرفيني بنفسك شوي؟", "who"], ["من تكون مريم الحربي", "who"], ["ودي أعرف وش قاعدة تشتغلين عليه", "projects"],
  ["وش الأشياء اللي تطورينها حاليا", "projects"], ["عليش توجهتي للسايبر", "cybersecurity"], ["وش سبب اهتمامك بالأمن الرقمي", "cybersecurity"],
  ["كيف ارتبط مسارك بالمجال الصحي", "healthcare"], ["وش تعلمتي من رحلة المريض", "healthcare"], ["ابي افهم فكرة خطوة ميرا", "step"],
  ["هواة يفيد الطلاب بشنو", "hawat"], ["النسخة التجريبية لهواة هب وينها", "hawatHub"], ["تجاربك العملية وش علمتك", "experience"],
  ["هل قد أشرفتي على تنظيم فعالية", "leadership"], ["هل تتكلمين ألماني", "languages"], ["درستي نظم معلومات؟", "education"],
  ["وش أكثر المجالات اللي تجذبك", "interests"], ["وش ناوية تحققين مستقبلا", "future"], ["وين مجتمعاتك التعليمية", "communities"],
  ["هل Q مشروع قهوة", "qConceptPrivate"], ["وش فكرة حامي", "confidential"], ["اعطيني عنوان بيتك", "privacy"],
  ["كم عمرك بالضبط", "privacy"], ["مين فاز بالمباراة", "unknown"], ["اكتب لي كود بايثون", "unknown"], ["وش أفضل مطعم", "unknown"]
];

const failures = [];
cases.forEach(([question, expected]) => {
  const result = engine.classify(question, config);
  if (result.topic !== expected) failures.push({ question, expected, actual: result.topic, confidence: result.confidence, alternatives: result.alternatives });
});

const accuracy = ((cases.length - failures.length) / cases.length) * 100;
console.log(`Mariam AI intent accuracy: ${accuracy.toFixed(1)}% (${cases.length - failures.length}/${cases.length})`);
failures.forEach(failure => console.log(JSON.stringify(failure)));
if (accuracy < 70) process.exitCode = 1;
