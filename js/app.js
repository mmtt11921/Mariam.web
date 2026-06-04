const translations = {
  en: {
    skip: "Skip to content", navJourney: "Journey", navExperience: "Experience", navLeadership: "Leadership", navAi: "Mariam AI", navFuture: "Future", navContact: "Contact",
    heroBubble: "Welcome to Mariam’s journey ✨", heroHello: "Welcome", heroTitle: "I am Mariam Alharbi", heroBelief: "I believe technology creates real impact.", heroLead: "I build technology projects, learning communities, and digital solutions for the future.",
    askAI: "Ask Mariam AI", exploreProjects: "Explore Projects", voiceTitle: "Voice experience coming soon", voiceSmall: "Soon, you will be able to speak with Mariam AI by voice.", scrollCue: "Scroll to explore",
    journeyTitle: "The journey starts here ✨", journeyNote: "The journey continues... wait for what is next.",
    pMariamAi: "A prototype that lets visitors learn about Mariam, her projects, and interests through an intelligent conversation.", pStep: "A learning platform that helps people move step by step in their professional and technical journey.", pFutureTitle: "Future Venture", pFuture: "The next project is currently in development. Details will be announced later.",
    experienceTitle: "Work Experience", dataEntry: "Data Entry", reception: "Reception Trainee", aweCopy: "Accurate data entry, organization, and workflow support.", hospitalCopy: "Experience inside a healthcare environment to understand workflows and visitor service.",
    leadershipTitle: "Volunteering & Leadership", basmahTitle: "Basmah Platform", basmahCopy: "Volunteer participation in humanitarian and community initiatives.", eventsTitle: "Event Organization", eventsCopy: "Organizing work, supporting visitors, and helping teams during events.", volunteerTitle: "Volunteer Activities", volunteerCopy: "Supervised the organizing team in one of the historical events organized by Basmah.",
    aiPrototype: "The current prototype. It will evolve in the future to include voice, visual interaction, and more direct experiences.", aiDefault: "Type your question here or choose one of the suggestions.",
    statHours: "volunteer hours", statProjects: "public projects", statYear: "graduation year", statPassion: "Passion", statBetter: "drives me forward", statLearning: "Learning", statNonstop: "never stops",
    voiceSectionTitle: "Talk with Mariam soon", voiceSectionCopy: "In the future, Mariam AI will be developed to speak with Mariam’s real voice and offer a more realistic and interactive experience.",
    futureKicker: "The journey continues...", futureTitle: "Every version opens a new door.", rVoice: "Direct voice conversations with Mariam AI.", rJourneyTitle: "Interactive Journey", rJourney: "A more interactive journey with evolving milestones and experiences.", rProjectsTitle: "New Projects", rProjects: "New projects announced when their identity and direction are ready.", rArchiveTitle: "Expanded Experience Archive", rArchive: "A wider archive of experience, learning, and initiatives.",
    contactKicker: "Let’s build the future together", contactTitle: "Contact me.", name: "Name", email: "Email", subject: "Subject", message: "Message", send: "Send Message", footer: "This website evolves as I learn, build, and grow.",
    voiceModalTitle: "Coming Soon...", voiceModalCopy: "We are building voice conversations for Mariam AI to create a more interactive experience."
  },
  arChips: ["✨ من هي مريم الحربي؟", "✨ وش هي خطوة ميرا؟", "✨ وش مشاريعك؟", "✨ ليش الأمن السيبراني؟", "✨ وش رؤيتك المستقبلية؟", "✨ ليش الذكاء الاصطناعي الصحي؟"],
  enChips: ["✨ Who is Mariam Alharbi?", "✨ What is Step by Mira?", "✨ What are your projects?", "✨ Why cybersecurity?", "✨ What is your future vision?", "✨ Why Healthcare AI?"]
};

const arabic = {};
document.querySelectorAll("[data-i18n]").forEach(el => arabic[el.dataset.i18n] = el.textContent);
let language = "ar";

function setLanguage(lang) {
  language = lang;
  const isArabic = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.classList.toggle("ltr", !isArabic);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const value = isArabic ? arabic[el.dataset.i18n] : translations.en[el.dataset.i18n];
    if (value) el.textContent = value;
  });
  document.getElementById("langSwitch").textContent = isArabic ? "EN" : "العربية";
  document.getElementById("aiQuestion").placeholder = isArabic ? "اكتب سؤالك هنا..." : "Type your question here...";
  document.getElementById("aiResponse").textContent = isArabic ? arabic.aiDefault : translations.en.aiDefault;
  document.querySelectorAll(".chip-list .question").forEach((button, index) => {
    button.textContent = isArabic ? translations.arChips[index] : translations.enChips[index];
  });
}

document.getElementById("langSwitch").addEventListener("click", () => setLanguage(language === "ar" ? "en" : "ar"));
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", event => {
  const open = navLinks.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const walker = document.getElementById("walker");
window.addEventListener("scroll", () => {
  if (!walker) return;
  const sections = ["journey", "experience", "mariam-ai", "voice", "future"].map(id => document.getElementById(id)).filter(Boolean);
  const index = sections.reduce((active, section, current) => section.getBoundingClientRect().top < window.innerHeight * .58 ? current : active, 0);
  const direction = language === "ar" ? -1 : 1;
  const travel = Math.min(92, window.scrollY / 18);
  const stageLift = [0, -18, 18, -8, 10][index] || 0;
  walker.style.opacity = window.scrollY < window.innerHeight * .72 ? "0" : ".95";
  walker.style.transform = `translate(${direction * travel}px, ${stageLift}px) rotate(${direction * (index * 4 - 4)}deg)`;
}, { passive: true });

const { aiAnswers, aiIntents, qLegacyAlias, qLegacyArabicAlias, qConceptTerms } = window.MARIAM_AI_CONFIG;
const hasArabic = text => /[\u0600-\u06FF]/.test(text);
const normalizeAiText = text => text.toLowerCase().normalize("NFD")
  .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
  .replace(/[إأآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
  .replace(/[^a-z0-9\u0600-\u06FF\s]/g, " ").replace(/\s+/g, " ").trim();
function scoreAiIntent(text, intent) {
  let score = 0;
  intent.phrases.forEach(phrase => { if (text.includes(normalizeAiText(phrase))) score = Math.max(score, 100); });
  intent.words.forEach(word => { if (text.includes(normalizeAiText(word))) score += word.includes(" ") ? 45 : 24; });
  return Math.min(score, 100);
}
function getAiTopic(question) {
  const text = normalizeAiText(question);
  const mentionsQ = /\bq\b/.test(text) || text.includes(qLegacyAlias) || text.includes(qLegacyArabicAlias);
  if (mentionsQ && qConceptTerms.some(term => text.includes(term))) return "qConceptPrivate";
  if (mentionsQ || ["what is future venture", "وش المشروع القادم", "وش المشروع المستقبلي"].some(phrase => text.includes(normalizeAiText(phrase)))) return "confidential";
  const ranked = aiIntents.map(intent => ({ ...intent, score: scoreAiIntent(text, intent) })).sort((a, b) => b.score - a.score);
  const hardMatch = ranked.find(intent => intent.hard && intent.score > 0);
  if (hardMatch) return hardMatch.topic;
  return ranked[0].score >= 70 ? ranked[0].topic : "unknown";
}
function answerAi(question, topic) {
  const responseLanguage = hasArabic(question) ? "ar" : "en";
  return aiAnswers[responseLanguage][topic || getAiTopic(question)];
}
function showAiAnswer(answer) {
  const response = document.getElementById("aiResponse");
  response.style.opacity = 0;
  setTimeout(() => { response.textContent = answer; response.style.opacity = 1; }, 140);
}
document.querySelectorAll(".question").forEach(button => button.addEventListener("click", () => showAiAnswer(aiAnswers[language][button.dataset.topic])));
document.getElementById("aiForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("aiQuestion");
  showAiAnswer(answerAi(input.value));
  input.value = "";
});

const voiceModal = document.getElementById("voiceModal");
function openVoiceModal() { voiceModal.classList.add("open"); voiceModal.setAttribute("aria-hidden", "false"); }
function closeVoiceModal() { voiceModal.classList.remove("open"); voiceModal.setAttribute("aria-hidden", "true"); }
document.getElementById("voiceHero").addEventListener("click", openVoiceModal);
document.getElementById("closeVoiceModal").addEventListener("click", closeVoiceModal);
voiceModal.addEventListener("click", event => { if (event.target === voiceModal) closeVoiceModal(); });

const { formId: CONTACT_FORM_ID, endpoint: CONTACT_FORM_ENDPOINT, successMessage: CONTACT_SUCCESS, errorMessage: CONTACT_ERROR } = window.CONTACT_FORM_CONFIG;
document.getElementById("contactForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("formStatus");
  const submit = form.querySelector('button[type="submit"]');
  status.className = "form-status full";
  status.textContent = "";
  if (!CONTACT_FORM_ID) { status.classList.add("error"); status.textContent = CONTACT_ERROR; return; }
  submit.disabled = true;
  try {
    const response = await fetch(CONTACT_FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Form submission failed");
    form.reset();
    status.classList.add("success");
    status.textContent = CONTACT_SUCCESS;
  } catch {
    status.classList.add("error");
    status.textContent = CONTACT_ERROR;
  } finally {
    submit.disabled = false;
  }
});
