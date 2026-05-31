(() => {
    const aiAnswers = {
      en: {
        privacy: "I prefer to keep some personal details private. I’m happy to discuss projects, experience, learning, and future goals.",
        confidential: "Some projects are intentionally shared at a high level while they continue to evolve. Detailed information will be announced at the appropriate time.",
        qConceptPrivate: "Mariam is keeping the full concept private for now and will share more when the project is ready.",
        qPublic: "Q is a future brand currently under long-term development. Mariam is intentionally sharing only selected parts of the identity while keeping the full details private until the right time.",
        who: "Mariam Alharbi is a Computer Information Systems graduate passionate about Cybersecurity and Healthcare AI. She enjoys combining technology, entrepreneurship, learning communities, and digital innovation to build meaningful impact.",
        interests: "Mariam’s interests include Cybersecurity, Healthcare AI, Information Systems, Software Development, UX and Design, Entrepreneurship, and Community Building.",
        education: "Mariam Alharbi is a Computer Information Systems graduate.",
        cybersecurity: "Mariam is interested in Cybersecurity because of its importance in protecting people, organizations, and digital systems. She sees it as a highly impactful and future-oriented field.",
        healthcare: "Mariam's interest in Healthcare AI grew through healthcare exposure and her belief that technology can improve patient experiences, healthcare systems, and decision-making.",
        projects: "Mariam is currently building Ruqi, Step by Mira, Mariam AI, and her Personal Website. Her public future-venture list also includes Q, Tamam, and Hami. Selected details remain private while the ideas evolve.",
        ruqi: "Ruqi is a brand currently under development with a focus on identity, experience, and long-term growth.",
        step: "Step by Mira is a platform dedicated to exploring digital products, analyzing user experiences, understanding how applications work, and reimagining better versions through thoughtful improvements. Its tagline is: Understanding Products. Building Better Ones.",
        mariamAi: "Mariam AI is a personal AI assistant designed to introduce Mariam's journey, projects, communities, and future vision.",
        website: "Mariam’s Personal Website is a digital home documenting her learning journey, projects, experiences, and future plans.",
        knowledge: "Knowledge Hub is a learning space where Mariam shares books, insights, quotes, and knowledge gained through continuous learning. Telegram: https://t.me/knowledgeHub_mariam",
        hawat: "Hawat is a student community supporting learners in Computer Science, Artificial Intelligence, and Information Systems through resources, workshops, opportunities, volunteering, and academic support.",
        communities: "Mariam’s public communities and content spaces include Knowledge Hub, Hawat, and Step by Mira.",
        experience: "Mariam’s experience includes data entry, data quality improvement, reporting, and team collaboration at AWE, as well as reception training and healthcare workflow exposure at Yanbu General Hospital.",
        leadership: "Mariam’s leadership and volunteering include organizing at Yanbu Book Fair, supervising a team in Yanbu Historical Area Events, community volunteering, and student support initiatives.",
        announcement: "Building a project starts long before launch. Sharing selected parts of the identity and vision helps document the journey and build awareness while keeping implementation details private until the right time.",
        future: "Mariam aims to build impactful technology ventures, learning communities, and future digital solutions focused on Cybersecurity, Healthcare AI, innovation, and continuous learning.",
        websiteVision: "The website will gradually evolve with interactive visitor comments, community suggestions, dynamic project updates, knowledge sharing, smarter Mariam AI capabilities, and deeper community engagement.",
        unknown: "I can help with Mariam’s public journey, interests, projects, communities, experience, learning, and future vision. Could you ask about one of those areas?"
      },
      ar: {
        privacy: "أفضل الاحتفاظ ببعض المعلومات الشخصية بشكل خاص، ويسعدني الحديث عن المشاريع والخبرات والرحلة التعليمية والرؤية المستقبلية.",
        confidential: "بعض المشاريع يتم الإعلان عنها بشكل عام أثناء مرحلة التطوير، بينما تبقى التفاصيل الداخلية خاصة حتى يحين وقت الإعلان الرسمي.",
        qConceptPrivate: "مريم تفضل الاحتفاظ بتفاصيل الفكرة حاليًا، وسيتم مشاركة المزيد عندما يكون المشروع جاهزًا.",
        qPublic: "Q علامة تجارية مستقبلية لا تزال تحت التطوير طويل المدى. مريم تشارك جزءًا بسيطًا من الهوية فقط، بينما تبقى التفاصيل الكاملة خاصة إلى أن يحين وقت الإعلان المناسب.",
        who: "مريم الحربي خريجة نظم المعلومات الحاسوبية، وتهتم بالأمن السيبراني والذكاء الاصطناعي في القطاع الصحي. تحب التعلم المستمر وبناء المشاريع ذات الأثر، وتسعى إلى الجمع بين التقنية وريادة الأعمال وخدمة المجتمع من خلال مبادرات ومشاريع رقمية متنوعة.",
        interests: "تهتم مريم بالأمن السيبراني والذكاء الاصطناعي الصحي ونظم المعلومات وتطوير البرمجيات وتجربة المستخدم والتصميم وريادة الأعمال وبناء المجتمعات.",
        education: "مريم الحربي خريجة نظم المعلومات الحاسوبية.",
        cybersecurity: "شدّ مريم مجال الأمن السيبراني لأنه من أكثر المجالات تأثيرًا اليوم، خصوصًا مع تزايد الاعتماد على التقنية وحاجة الأفراد والمنشآت للحماية الرقمية. وتشوفه مجالًا مستقبليًا مهمًا للتعلم والتطوير.",
        healthcare: "اهتمام مريم بالتقنية الصحية والذكاء الاصطناعي الصحي زاد بعد تجربة التدريب داخل المستشفى. لاحظت كيف ممكن للتقنية تحسّن تجربة المرضى وتطوّر الأنظمة الصحية وتدعم اتخاذ القرار.",
        projects: "مريم تشتغل حاليًا على Ruqi وStep by Mira وMariam AI وموقعها الشخصي. وتشمل قائمة الاستثمارات المستقبلية العامة Q وTamam وHami. تبقى التفاصيل المختارة خاصة بينما تتطور الأفكار.",
        ruqi: "Ruqi علامة تجارية قيد التطوير حاليًا، مع التركيز على الهوية والتجربة والنمو على المدى الطويل.",
        step: "Step by Mira منصة تستكشف المنتجات الرقمية وتحلل تجربة المستخدم وتفهم كيف تشتغل التطبيقات، وبعدها تعيد تصور نسخ أفضل من خلال تحسينات مدروسة.",
        mariamAi: "Mariam AI مساعد ذكاء اصطناعي شخصي مصمم للتعريف برحلة مريم ومشاريعها ومجتمعاتها ورؤيتها المستقبلية.",
        website: "الموقع الشخصي لمريم بيت رقمي يوثّق رحلة تعلمها ومشاريعها وخبراتها وخططها المستقبلية.",
        knowledge: "مركز المعرفة مساحة تعليمية تشارك فيها مريم الكتب والأفكار والاقتباسات والمعرفة المكتسبة من التعلم المستمر. تيليجرام: https://t.me/knowledgeHub_mariam",
        hawat: "هواة مجتمع طلابي يدعم المتعلمين في علوم الحاسب والذكاء الاصطناعي ونظم المعلومات من خلال الموارد وورش العمل والفرص والتطوع والدعم الأكاديمي.",
        communities: "تشمل مجتمعات مريم ومساحات المحتوى العامة: مركز المعرفة وهواة وStep by Mira.",
        experience: "تشمل خبرة مريم إدخال البيانات وتحسين جودتها وإعداد التقارير والتعاون مع الفريق في AWE، إضافة إلى التدريب في الاستقبال والتعرف على سير العمل الصحي في مستشفى ينبع العام.",
        leadership: "تشمل خبرات مريم القيادية والتطوعية التنظيم في معرض ينبع للكتاب والإشراف على فريق في فعاليات منطقة ينبع التاريخية والتطوع المجتمعي ومبادرات دعم الطلاب.",
        announcement: "بناء المشروع يبدأ قبل الإطلاق بوقت طويل. مشاركة الهوية والرؤية وبعض مراحل الرحلة تساعد على توثيق التقدم وبناء الوعي بالمشروع، بينما تبقى التفاصيل التنفيذية خاصة حتى يحين وقت الإعلان المناسب.",
        future: "تسعى مريم إلى بناء مشاريع تقنية ومجتمعات تعليمية ومنصات رقمية ذات أثر، مع التركيز على الأمن السيبراني والذكاء الاصطناعي والتقنية الصحية والتعلم المستمر.",
        websiteVision: "سيتطور الموقع تدريجيًا ليشمل تعليقات الزوار التفاعلية واقتراحات المجتمع وتحديثات المشاريع الديناميكية ومشاركة المعرفة وقدرات أذكى لـ Mariam AI وتفاعلًا أعمق مع المجتمع.",
        unknown: "أقدر أساعدك بالمعلومات العامة عن رحلة مريم واهتماماتها ومشاريعها ومجتمعاتها وخبراتها ورؤيتها المستقبلية. ممكن تسأل عن أحد هذه الجوانب؟"
      }
    };

    const aiIntents = [
      { topic: "privacy", hard: true, phrases: ["كم عمرك", "وش عمرك", "وين ساكنه", "وين بيتك", "وش رقمك", "رقم جوالك", "متزوجه", "وش اسم عايلتك", "وش اسم عائلتك", "وش بياناتك", "how old", "your age", "where do you live", "home address", "phone number", "are you married", "family name", "personal data"], words: ["عمر", "مواليد", "ميلاد", "ساكنه", "عنوان", "جوال", "هاتف", "رقمك", "متزوجه", "عائلتك", "عايلتك", "بياناتك", "age", "birthday", "address", "phone", "married", "family", "financial", "salary"] },
      { topic: "confidential", hard: true, phrases: ["وش مهيا", "وش فكره مهيا", "كيف يشتغل مهيا", "وش حارس الدفء", "وش تمام", "وش حامي"], words: ["muhayya", "مهيا", "مهيأ", "محيا", "smart warmth guardian", "حارس الدفء", "tamam", "تمام", "hami", "حامي"] },
      { topic: "step", phrases: ["step by mira", "وش خطوه ميرا", "وش فكره خطوه ميرا", "ليه سويتي خطوه ميرا", "وش تقدم خطوه ميرا"], words: ["step", "mira", "خطوه", "ميرا"] },
      { topic: "hawat", phrases: ["what is hawat", "وش هواه", "وش مجتمع هواه", "وش تقدم هواه", "كيف انضم لهواه"], words: ["hawat", "hwaat", "هواه", "هوات"] },
      { topic: "cybersecurity", phrases: ["why cybersecurity", "choose cyber", "interested in cyber", "ليش الامن السيبراني", "وش شدك للامن السيبراني", "ليه مهتمه بالسايبر", "وش دخل السايبر في مسارك"], words: ["cybersecurity", "cyber", "سايبر", "السيبراني", "الامن"] },
      { topic: "healthcare", phrases: ["why healthcare ai", "healthcare become part", "healthcare path", "interested in health", "ليش الذكاء الاصطناعي الصحي", "وش علاقتك بالمجال الصحي", "وش اللي خلاك تفكرين بالصحه", "ليه مهتمه بالتقنيه الصحيه"], words: ["healthcare", "health", "الصحي", "الصحه", "المستشفي", "التقنيه الصحيه"] },
      { topic: "projects", phrases: ["what projects", "what are you building", "what are you working on", "working on these days", "وش مشاريعك", "وش قاعده تبنين", "وش عندك حاليا", "وش تشتغلين عليه", "ايش مشاريعك", "وش ناويه تسوين", "وش تسوين"], words: ["projects", "project", "building", "ventures", "working on", "مشاريع", "مشروع", "تبنين", "تشتغلين", "ناويه", "عندك"] },
      { topic: "who", phrases: ["who is mariam", "tell me about mariam", "introduce yourself", "who are you", "مين مريم", "عرفيني عليك", "من انتي", "وش قصتك", "وش سالفتك", "احكي لي عنك"], words: ["mariam", "مريم", "انتي", "قصتك", "سالفتك", "عنك", "yourself"] },
      { topic: "announcement", phrases: ["before launch", "share project", "share logo", "share identity", "ليش تعلنين", "ليش تشاركين", "قبل الاطلاق"], words: ["announce", "launch", "تعلنين", "تشاركين", "الشعارات", "الهويه", "الاطلاق"] },
      { topic: "websiteVision", phrases: ["website future", "website roadmap", "تطور الموقع", "خارطه الموقع", "مستقبل الموقع"], words: ["roadmap", "خارطه", "تطور"] },
      { topic: "knowledge", phrases: ["knowledge hub", "مركز المعرفه"], words: ["knowledgehub", "المعرفه"] },
      { topic: "ruqi", phrases: ["what is ruqi", "وش رقي"], words: ["ruqi", "رقي"] },
      { topic: "mariamAi", phrases: ["what is mariam ai", "وش mariam ai", "وش مساعد مريم"], words: ["mariam ai", "مساعد مريم"] },
      { topic: "website", phrases: ["personal website", "موقع مريم", "الموقع الشخصي"], words: ["website", "site", "موقع"] },
      { topic: "leadership", phrases: ["leadership", "volunteering", "وش تطوعك"], words: ["leadership", "volunteer", "قياده", "تطوع"] },
      { topic: "experience", phrases: ["your experience", "وش خبرتك", "وين تدربتي"], words: ["experience", "hospital", "awe", "خبره", "مستشفي", "تدريب"] },
      { topic: "communities", phrases: ["your communities", "وش مجتمعاتك"], words: ["communities", "community", "مجتمع", "مجتمعات"] },
      { topic: "future", phrases: ["future vision", "future goals", "وش رؤيتك", "وش اهدافك", "وش ناويه للمستقبل"], words: ["vision", "goals", "رؤيه", "اهداف", "مستقبل"] },
      { topic: "education", phrases: ["your education", "وش تخصصك", "وش درستي"], words: ["education", "graduate", "degree", "تخصص", "خريجه", "دراسه"] },
      { topic: "interests", phrases: ["your interests", "وش اهتماماتك", "وش تحبين"], words: ["interests", "interested", "اهتمامات", "مهتمه", "تحبين"] }
    ];

    const qLegacyAlias = ["quin", "cy"].join("");
    const qLegacyArabicAlias = ["كوين", "سي"].join("");
    const qConceptTerms = [
      ["ca", "fe"].join(""), ["cof", "fee"].join(""), ["dess", "ert"].join(""), ["life", "style"].join(""),
      ["كا", "فيه"].join(""), ["كو", "في"].join(""), ["مق", "هي"].join(""), ["ق", "هوه"].join(""),
      ["حلو", "يات"].join(""), ["ح", "لى"].join(""), ["لايف ", "ستايل"].join("")
    ];

  window.MARIAM_AI_CONFIG = Object.freeze({
    aiAnswers,
    aiIntents,
    qLegacyAlias,
    qLegacyArabicAlias,
    qConceptTerms
  });
})();
