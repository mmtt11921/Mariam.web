(() => {
    const aiAnswers = {
      en: {
        greeting: "Hi! I’m Mariam AI. Ask me about Mariam’s journey, projects, experience, communities, interests, or future vision.",
        islamicGreeting: "Wa alaikum assalam wa rahmatullahi wa barakatuh. Welcome! I’m Mariam AI, and I’d be happy to share Mariam’s journey, projects, experiences, and future vision with you.",
        thanks: "You’re welcome! I’m here whenever you want to explore another part of Mariam’s journey.",
        privacy: "I prefer to keep some personal details private. I’m happy to discuss projects, experience, learning, and future goals.",
        confidential: "Some projects are intentionally shared at a high level while they continue to evolve. Detailed information will be announced at the appropriate time.",
        qConceptPrivate: "Mariam is keeping the full concept private for now and will share more when the project is ready.",
        qPublic: "Some future ventures are intentionally kept private while they evolve. Mariam will share more when the timing and direction are ready.",
        who: "Mariam Alharbi is a Computer Information Systems graduate passionate about Cybersecurity and Healthcare AI. She enjoys combining technology, entrepreneurship, learning communities, and digital innovation to build meaningful impact.",
        interests: "Mariam’s interests include Cybersecurity, Healthcare AI, Information Systems, Software Development, UX and Design, Entrepreneurship, and Community Building.",
        education: "Mariam Alharbi is a Computer Information Systems graduate.",
        cybersecurity: "Mariam is interested in Cybersecurity because of its importance in protecting people, organizations, and digital systems. She sees it as a highly impactful and future-oriented field.",
        healthcare: "Mariam’s interest in Healthcare AI grew after her training at Yanbu General Hospital, where she learned about healthcare workflows, the patient journey, operational challenges, and the effect of health systems on patient experience.",
        projects: "Mariam is currently developing five public projects and prototypes: her Personal Website, Mariam AI, Rafeeq AI, Step by Mira, and the Hawat Hub prototype. Hawat Hub is planned for official launch at the beginning of the new academic year 2026 / 1448 AH.",
        ruqi: "Ruqi is a brand currently under development with a focus on identity, experience, and long-term growth.",
        step: "Step by Mira is a platform dedicated to exploring digital products, analyzing user experiences, understanding how applications work, and reimagining better versions through thoughtful improvements. Its tagline is: Understanding Products. Building Better Ones.",
        mariamAi: "Mariam AI is a personal AI assistant designed to introduce Mariam's journey, projects, communities, and future vision.",
        website: "Mariam’s Personal Website is a digital home documenting her learning journey, projects, experiences, and future plans.",
        sabah: "SABAH Laboratories is a healthcare design case study prepared as a future-ready design project for a modern medical laboratory brand. It focuses on trust, precision, innovation, intelligence, and patient-centered care without adding fake design assets.",
        design: "Mariam’s design archive is organized by sector, showing how design decisions change across healthcare, technology, business, hospitality, and other fields. The goal is to connect visual identity with real industry context.",
        voiceFuture: "The voice experience is marked as coming soon. The current plan is to develop Mariam AI into a more natural voice interaction in the future while keeping the current version as a prototype.",
        knowledge: "Knowledge Hub is a learning space where Mariam shares books, insights, quotes, and knowledge gained through continuous learning. Telegram: https://t.me/knowledgeHub_mariam",
        hawat: "Hawat is a learning community in development. Its official launch is planned for the beginning of the new academic year 2026 / 1448 AH, and it will expand according to the Mariam Alharbi Foundation plan.",
        hawatHub: "Hawat Hub is the current prototype digital space for the Hawat community. Its official launch is planned for the beginning of the new academic year 2026 / 1448 AH, and it will expand according to the Mariam Alharbi Foundation plan. Prototype: https://hwaat-hub.vercel.app",
        communities: "Mariam’s public communities and content spaces include Knowledge Hub, Hawat, and Step by Mira.",
        experience: "Mariam’s experience includes data entry and understanding daily operational systems at AWE Company; reception training and healthcare workflow exposure at Yanbu General Hospital; reception experience at Canary Hotel, where she independently studied the Nazeel PMS and documented observations in Notion; and a short restaurant work experience focused on customer experience, workflow, and service operations. Across these experiences, she documented observations and improvement ideas to better understand work environments, operational systems, user experience, and opportunities for improvement.",
        leadership: "Mariam’s volunteering and leadership experience includes event organization, community activities, and supervising the organizing team in a historical event organized by Basmah.",
        languages: "Mariam speaks Arabic at an excellent level, is developing her intermediate English toward proficiency, and is a beginner in German. She learns languages to expand knowledge, communication, and cultural understanding.",
        announcement: "Building a project starts long before launch. Sharing selected parts of the identity and vision helps document the journey and build awareness while keeping implementation details private until the right time.",
        future: "Mariam aims to build impactful technology ventures, learning communities, and future digital solutions focused on Cybersecurity, Healthcare AI, innovation, and continuous learning.",
        websiteVision: "The website will gradually evolve with interactive visitor comments, community suggestions, dynamic project updates, knowledge sharing, smarter Mariam AI capabilities, and deeper community engagement.",
        unknown: "I can help with Mariam’s public journey, interests, projects, communities, experience, learning, and future vision. Could you ask about one of those areas?"
      },
      ar: {
        greeting: "يا هلا والله، نورتوا المكان! أنا Mariam AI، وأقدر أحكي لكم عن رحلتي، مشاريعي، خبراتي، مجتمعاتي، ورؤيتي للمستقبل. إيش حابين تعرفوا؟",
        islamicGreeting: "وعليكم السلام ورحمة الله وبركاته، يا هلا والله ومرحبا! نورتوا المكان. أنا Mariam AI، وأقدر أحكي لكم عن رحلتي ومشاريعي وخبراتي وكل خطوة قاعدة أبنيها. إيش حابين تعرفوا؟",
        thanks: "العفو يا أهلاً وسهلاً! أسعدني سؤالك، وإذا حابين تعرفوا شيء ثاني عن رحلتي أو مشاريعي أنا موجودة.",
        privacy: "أفضل الاحتفاظ ببعض المعلومات الشخصية بشكل خاص، ويسعدني الحديث عن المشاريع والخبرات والرحلة التعليمية والرؤية المستقبلية.",
        confidential: "بعض المشاريع يتم الإعلان عنها بشكل عام أثناء مرحلة التطوير، بينما تبقى التفاصيل الداخلية خاصة حتى يحين وقت الإعلان الرسمي.",
        qConceptPrivate: "مريم تفضل الاحتفاظ بتفاصيل الفكرة حاليًا، وسيتم مشاركة المزيد عندما يكون المشروع جاهزًا.",
        qPublic: "بعض المشاريع المستقبلية تبقى خاصة أثناء تطورها. مريم ستشارك المزيد عندما يكون التوقيت والاتجاه مناسبين.",
        who: "مريم الحربي خريجة نظم المعلومات الحاسوبية، وتهتم بالأمن السيبراني والذكاء الاصطناعي في القطاع الصحي. تحب التعلم المستمر وبناء المشاريع ذات الأثر، وتسعى إلى الجمع بين التقنية وريادة الأعمال وخدمة المجتمع من خلال مبادرات ومشاريع رقمية متنوعة.",
        interests: "تهتم مريم بالأمن السيبراني والذكاء الاصطناعي الصحي ونظم المعلومات وتطوير البرمجيات وتجربة المستخدم والتصميم وريادة الأعمال وبناء المجتمعات.",
        education: "مريم الحربي خريجة نظم المعلومات الحاسوبية.",
        cybersecurity: "شدّ مريم مجال الأمن السيبراني لأنه من أكثر المجالات تأثيرًا اليوم، خصوصًا مع تزايد الاعتماد على التقنية وحاجة الأفراد والمنشآت للحماية الرقمية. وتشوفه مجالًا مستقبليًا مهمًا للتعلم والتطوير.",
        healthcare: "زاد اهتمام مريم بالذكاء الاصطناعي الصحي بعد تدريبها في مستشفى ينبع العام، حيث تعرّفت على سير العمل في القطاع الصحي، وفهمت رحلة المريض داخل المنشأة، ولاحظت التحديات التشغيلية وأثر الأنظمة الصحية على تجربة المريض.",
        projects: "مريم تعمل حاليًا على خمسة مشاريع ونماذج أولية عامة قيد التطوير: موقعها الشخصي، وMariam AI، وRafeeq AI، وStep by Mira، والنموذج الأولي لهواة هب. يُخطط لإطلاق هواة هب رسميًا مع بداية العام الدراسي الجديد 2026 / 1448هـ.",
        ruqi: "Ruqi علامة تجارية قيد التطوير حاليًا، مع التركيز على الهوية والتجربة والنمو على المدى الطويل.",
        step: "Step by Mira منصة تستكشف المنتجات الرقمية وتحلل تجربة المستخدم وتفهم كيف تشتغل التطبيقات، وبعدها تعيد تصور نسخ أفضل من خلال تحسينات مدروسة.",
        mariamAi: "Mariam AI مساعد ذكاء اصطناعي شخصي مصمم للتعريف برحلة مريم ومشاريعها ومجتمعاتها ورؤيتها المستقبلية.",
        website: "الموقع الشخصي لمريم بيت رقمي يوثّق رحلة تعلمها ومشاريعها وخبراتها وخططها المستقبلية.",
        sabah: "SABAH Laboratories مشروع تصميم صحي على شكل دراسة حالة مستقبلية لهوية مختبرات طبية حديثة. يركز على الثقة، والدقة، والابتكار، والذكاء، والعناية الإنسانية بدون إضافة تصاميم وهمية.",
        design: "أرشيف التصميم عند مريم منظم حسب القطاعات، ويوضح كيف تختلف قرارات الهوية والتجربة والرسالة البصرية بين الصحة، التقنية، الأعمال، الضيافة، وغيرها. الهدف هو ربط التصميم بسياق المجال الحقيقي.",
        voiceFuture: "التجربة الصوتية مذكورة حاليًا كميزة قادمة. الخطة المستقبلية هي تطوير Mariam AI ليصبح أكثر طبيعية في التفاعل الصوتي، بينما تبقى النسخة الحالية نموذجًا أوليًا.",
        knowledge: "مركز المعرفة مساحة تعليمية تشارك فيها مريم الكتب والأفكار والاقتباسات والمعرفة المكتسبة من التعلم المستمر. تيليجرام: https://t.me/knowledgeHub_mariam",
        hawat: "هواة مجتمع تعليمي قيد التطوير، ويُخطط لإطلاقه رسميًا مع بداية العام الدراسي الجديد 2026 / 1448هـ، ثم التوسع به وفق خطة مؤسسة مريم الحربي.",
        hawatHub: "هواة هب هو النموذج الأولي الحالي للمساحة الرقمية الخاصة بمجتمع هواة. يُخطط لإطلاقه رسميًا مع بداية العام الدراسي الجديد 2026 / 1448هـ، ثم التوسع به وفق خطة مؤسسة مريم الحربي. يمكن استكشاف النموذج عبر https://hwaat-hub.vercel.app",
        communities: "تشمل مجتمعات مريم ومساحات المحتوى العامة: مركز المعرفة وهواة وStep by Mira.",
        experience: "تشمل خبرات مريم العمل ككاتبة بيانات في شركة AWE لفهم إدخال البيانات وتنظيمها وكيف تدعم الأنظمة العمليات اليومية، والتدريب في استقبال مستشفى ينبع العام لفهم سير العمل الصحي ورحلة المريض، والعمل في استقبال فندق الكناري حيث درست وحللت نظام نزيل بشكل مستقل ووثّقت ملاحظاتها في Notion، إضافة إلى تجربة عمل قصيرة في بيئة مطعم ركزت فيها على تجربة العميل وسير العمل وبيئة التشغيل والخدمة. وخلال تجاربها المختلفة وثّقت مريم الملاحظات وأفكار التحسين لفهم بيئات العمل والأنظمة التشغيلية وتجربة المستخدم وفرص التطوير.",
        leadership: "تشمل خبرات مريم التطوعية والقيادية تنظيم الفعاليات والأنشطة المجتمعية، والإشراف على فريق التنظيم في إحدى الفعاليات التاريخية التي تم تنظيمها من قبل بصمة.",
        languages: "مستوى مريم في العربية ممتاز، ومستواها في الإنجليزية متوسط وفي طريقه للاحتراف، وهي مبتدئة في الألمانية. تتعلم اللغات لأنها تفتح أبوابًا للمعرفة والتواصل وفهم الثقافات المختلفة.",
        announcement: "بناء المشروع يبدأ قبل الإطلاق بوقت طويل. مشاركة الهوية والرؤية وبعض مراحل الرحلة تساعد على توثيق التقدم وبناء الوعي بالمشروع، بينما تبقى التفاصيل التنفيذية خاصة حتى يحين وقت الإعلان المناسب.",
        future: "تسعى مريم إلى بناء مشاريع تقنية ومجتمعات تعليمية ومنصات رقمية ذات أثر، مع التركيز على الأمن السيبراني والذكاء الاصطناعي والتقنية الصحية والتعلم المستمر.",
        websiteVision: "سيتطور الموقع تدريجيًا ليشمل تعليقات الزوار التفاعلية واقتراحات المجتمع وتحديثات المشاريع الديناميكية ومشاركة المعرفة وقدرات أذكى لـ Mariam AI وتفاعلًا أعمق مع المجتمع.",
        unknown: "أقدر أساعدك بالمعلومات العامة عن رحلة مريم واهتماماتها ومشاريعها ومجتمعاتها وخبراتها ورؤيتها المستقبلية. ممكن تسأل عن أحد هذه الجوانب؟"
      }
    };

    const privateAliases = {
      visionEn: ["mu", "hayya"].join(""),
      visionAr: ["م", "هيا"].join(""),
      warmthEn: ["smart ", "warmth ", "guardian"].join(""),
      warmthAr: ["حارس ", "الدفء"].join(""),
      ventureOneEn: ["ta", "mam"].join(""),
      ventureOneAr: ["ت", "مام"].join(""),
      ventureTwoEn: ["ha", "mi"].join(""),
      ventureTwoAr: ["ح", "امي"].join("")
    };

    const aiIntents = [
      { topic: "islamicGreeting", phrases: ["السلام عليكم ورحمة الله وبركاته", "السلام عليكم ورحمه الله وبركاته", "السلام عليكم ورحمة الله", "السلام عليكم ورحمه الله", "السلام عليكم", "سلام عليكم"], words: ["السلام عليكم", "سلام عليكم"] },
      { topic: "greeting", phrases: ["hello", "hi mariam", "hey", "هلا", "هلا والله", "يا هلا", "مرحبا", "صباح الخير", "مساء الخير", "كيفك", "كيف حالك"], words: ["hello", "مرحبا", "هلا"] },
      { topic: "thanks", phrases: ["thank you", "thanks", "شكرا", "يعطيك العافيه", "ما قصرتي", "تسلمين"], words: ["thanks", "شكرا", "تسلمين"] },
      { topic: "privacy", hard: true, phrases: ["كم عمرك", "وش عمرك", "وين ساكنه", "وين بيتك", "وش رقمك", "رقم جوالك", "كم راتبك", "متزوجه", "وش اسم عايلتك", "وش اسم عائلتك", "وش بياناتك", "how old", "your age", "where do you live", "home address", "phone number", "are you married", "family name", "personal data"], words: ["عمر", "مواليد", "ميلاد", "ساكنه", "عنوان", "جوال", "هاتف", "رقمك", "راتب", "راتبك", "متزوجه", "عائلتك", "عايلتك", "بياناتك", "age", "birthday", "address", "phone", "married", "family", "financial", "salary"] },
      { topic: "confidential", hard: true, phrases: ["وش " + privateAliases.visionAr, "وش فكره " + privateAliases.visionAr, "كيف يشتغل " + privateAliases.visionAr, "وش " + privateAliases.warmthAr, "وش " + privateAliases.ventureOneAr, "وش " + privateAliases.ventureTwoAr], words: [privateAliases.visionEn, privateAliases.visionAr, privateAliases.warmthEn, privateAliases.warmthAr, privateAliases.ventureOneEn, privateAliases.ventureOneAr, privateAliases.ventureTwoEn, privateAliases.ventureTwoAr] },
      { topic: "step", phrases: ["step by mira", "what does step by mira offer", "وش خطوه ميرا", "وش فكره خطوه ميرا", "ليه سويتي خطوه ميرا", "وش تقدم خطوه ميرا", "علميني عن خطوه ميرا", "خطوه ميرا وش تسوي", "وش سالفه ستيب باي ميرا"], words: ["step by mira", "step", "mira", "خطوه ميرا", "ستيب باي ميرا"] },
      { topic: "hawatHub", phrases: ["what is hawat hub", "tell me about hawat hub", "where can i find hawat hub", "is hawat hub live", "وش هواه هب", "وش هوات هب", "ايش هواه هب", "مشروع هواه هب", "هواه هب وش يقدم", "هل اطلق هواه هب", "وين القى هواه هب", "وين الاقي هواه هب", "وين الاقي هواة هب", "ممكن القى هواه هب", "وين بلاقي هواه هب"], words: ["hawat hub", "hwaat hub", "هواه هب", "هوات هب", "هب هواه"] },
      { topic: "hawat", phrases: ["what is hawat", "tell me about hawat community", "وش هواه", "وش مجتمع هواه", "وش تقدم هواه", "كيف انضم لهواه", "علميني عن مجتمع هواه", "هواه وش يسوون", "مين يستفيد من هواه"], words: ["hawat community", "hwaat community", "مجتمع هواه", "هواه", "هوات"] },
      { topic: "cybersecurity", phrases: ["why cybersecurity", "choose cyber", "interested in cyber", "what drew you to cybersecurity", "ليش السايبر", "ليش الامن السيبراني", "وش شدك للامن السيبراني", "ليه مهتمه بالسايبر", "ليه السايبر عاجبك", "وش دخل السايبر في مسارك", "ليش اخترتي السايبر", "عليش توجهتي للسايبر", "وش سبب اهتمامك بالامن الرقمي", "وش يعجبك بالامن السيبراني", "وش يعجبك بالحمايه الرقميه", "كيف بدا اهتمامك بالسايبر"], words: ["cybersecurity", "cyber", "امن سيبراني", "امن رقمي", "سايبر", "السيبراني", "الحمايه الرقميه"] },
      { topic: "healthcare", phrases: ["why healthcare ai", "healthcare become part", "healthcare path", "interested in health", "digital health interest", "ليش الذكاء الاصطناعي الصحي", "وش علاقتك بالمجال الصحي", "وش علاقتك بالصحه الرقميه", "كيف ارتبط مسارك بالمجال الصحي", "وش تعلمتي من رحله المريض", "وش تعلمتي من المستشفي", "وش اللي خلاك تفكرين بالصحه", "ليه مهتمه بالتقنيه الصحيه", "كيف بدا اهتمامك بالصحه الرقميه", "وش اثر تدريب المستشفي عليك", "ليش تجمعين الصحه والذكاء الاصطناعي"], words: ["healthcare ai", "digital health", "ذكاء اصطناعي صحي", "تقنيه صحيه", "الصحه الرقميه", "المجال الصحي", "المستشفي", "رحله المريض"] },
      { topic: "projects", phrases: ["what projects", "what are you building", "what are you working on", "working on these days", "current projects", "وش مشاريعك", "وش المشاريع اللي تبنيها", "وش قاعده تبنين", "وش عندك حاليا", "وش تشتغلين عليه", "ايش مشاريعك", "وش ناويه تسوين", "وش تسوين", "عطيني نبذه عن مشاريعك", "وش جديد مشاريعك", "وش قاعدين تطورين", "وش الاشياء اللي تطورينها حاليا"], words: ["current projects", "مشاريعك", "مشاريع", "تبنين", "تشتغلين عليه", "قاعد تبنين", "تطورين"] },
      { topic: "who", phrases: ["who is mariam", "tell me about mariam", "introduce yourself", "who are you", "tell me your story", "مين مريم", "من تكون مريم الحربي", "عرفيني عن مريم", "عرفيني عنك", "عرفيني عليك", "عرفيني بنفسك", "ودي اعرف عن مريم", "من انتي", "وش قصتك", "وش سالفتك", "احكي لي عنك", "عطيني نبذه عنك", "ابي اتعرف عليك", "مريم وش تسوي", "كلميني عن نفسك"], words: ["who is mariam", "مريم الحربي", "عرفيني عن مريم", "عرفيني عليك", "عرفيني بنفسك", "قصتك", "سالفتك", "نبذه عنك", "عن نفسك"] },
      { topic: "announcement", phrases: ["before launch", "share project", "share logo", "share identity", "ليش تعلنين", "ليش تشاركين", "قبل الاطلاق"], words: ["announce", "launch", "تعلنين", "تشاركين", "الشعارات", "الهويه", "الاطلاق"] },
      { topic: "websiteVision", phrases: ["website future", "website roadmap", "تطور الموقع", "خارطه الموقع", "مستقبل الموقع"], words: ["roadmap", "خارطه", "تطور"] },
      { topic: "knowledge", phrases: ["knowledge hub", "what is knowledge hub", "مركز المعرفه", "وش مركز المعرفه", "وين تشاركين الكتب والمعرفه"], words: ["knowledge hub", "knowledgehub", "مركز المعرفه"] },
      { topic: "ruqi", phrases: ["what is ruqi", "tell me about ruqi", "وش رقي", "ايش مشروع رقي", "علميني عن رقي", "علميني عن ruqi"], words: ["ruqi", "رقي"] },
      { topic: "mariamAi", phrases: ["what is mariam ai", "how does mariam ai work", "وش mariam ai", "وش مساعد مريم", "مريم اي ايش يسوي", "وش يقدر يسوي مريم اي اي"], words: ["mariam ai", "مريم اي اي", "مساعد مريم"] },
      { topic: "website", phrases: ["personal website", "tell me about this website", "موقع مريم", "الموقع الشخصي", "وش فكره الموقع", "ليش سويتي الموقع"], words: ["personal website", "موقع مريم", "الموقع الشخصي"] },
      { topic: "sabah", phrases: ["what is sabah laboratories", "tell me about sabah labs", "sabah laboratories", "وش صباح لاب", "وش sabah laboratories", "وش مشروع صباح", "تصميم صباح", "مختبر صباح"], words: ["sabah laboratories", "sabah labs", "sabah", "صباح", "مختبر صباح"] },
      { topic: "design", phrases: ["design archive", "your design work", "what do you design", "وش أرشيف التصميم", "وش تصاميمك", "تصميمك للقطاعات", "كيف تصممين لكل قطاع"], words: ["design archive", "design", "تصاميم", "التصميم", "أرشيف التصميم", "ارشيف التصميم"] },
      { topic: "voiceFuture", phrases: ["voice experience", "talk to mariam", "voice ai", "when voice", "التجربة الصوتية", "تحدث مع مريم", "متى الصوت", "هل اقدر اتكلم مع مريم"], words: ["voice", "صوت", "الصوتية", "تحدث"] },
      { topic: "leadership", phrases: ["leadership", "volunteering", "your volunteer work", "وش تطوعك", "وش سويتي بالتطوع", "احكي عن قيادتك", "احكي عن تجربتك القياديه", "هل قد اشرفتي على تنظيم فعاليه", "وش دورك في الفعاليات"], words: ["leadership", "volunteer", "قياده", "قياديه", "تطوع", "تنظيم فعاليه", "فعاليات", "بصمه"] },
      { topic: "experience", phrases: ["your experience", "work experience", "tell me about your work experience", "where did you train", "وش خبرتك", "وين تدربتي", "وين اشتغلتي", "وش تعلمتي من شغلك", "تجاربك العمليه وش علمتك", "احكي عن خبراتك", "وش تجربتك بالمستشفي", "وش تجربتك بمستشفي ينبع", "وش سويتي بفندق الكناري"], words: ["work experience", "تجاربك العمليه", "خبراتك", "خبره", "مستشفي ينبع", "awe", "الكناري", "نزيل", "تدريب"] },
      { topic: "languages", phrases: ["what languages", "what languages do you speak", "وش لغاتك", "ايش اللغات اللي تعرفينها", "وش اللغات اللي تتعلمينها", "كيف مستواك بالانجليزي", "هل تتكلمين الماني"], words: ["languages", "لغات", "العربيه", "الانجليزيه", "الالمانيه", "الماني"] },
      { topic: "communities", phrases: ["your communities", "what communities do you run", "وش مجتمعاتك", "وش المجتمعات اللي عندك", "هل عندك مجتمعات تعليميه"], words: ["communities", "community", "مجتمعاتك", "مجتمعات", "مجتمع تعليمي"] },
      { topic: "future", phrases: ["future vision", "future goals", "where are you heading", "وش رؤيتك", "وش اهدافك", "وش ناويه للمستقبل", "وش ناويه تحققين مستقبلا", "وين تشوفين نفسك قدام", "وش خطتك الجايه", "وش تطمحين له"], words: ["future vision", "future goals", "رؤيتك", "اهدافك", "المستقبل", "مستقبلا", "تطمحين", "خطتك الجايه"] },
      { topic: "education", phrases: ["your education", "what did you study", "وش تخصصك", "وش درستي", "درستي نظم معلومات", "ايش تخصص مريم", "وش شهادتك الجامعيه"], words: ["education", "degree", "تخصصك", "نظم المعلومات", "خريجه"] },
      { topic: "interests", phrases: ["your interests", "what are you interested in", "what fields interest you", "وش اهتماماتك", "وش تحبين", "وش المجالات اللي تهمك", "ايش شغفك"], words: ["interests", "اهتماماتك", "مجالات", "شغفك", "تحبين"] }
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
