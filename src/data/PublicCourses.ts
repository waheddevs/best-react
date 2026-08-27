import type { LocalizedCourseList, LocalizedCourseText, PublicCourse } from "@/types/PublicCourse";

const text = (uz: string, ru: string, en: string): LocalizedCourseText => ({ uz, ru, en });
const list = (uz: string[], ru: string[], en: string[]): LocalizedCourseList => ({ uz, ru, en });

// Complete fictional client-preview content. Replace with verified client data before production.
export const courses: PublicCourse[] = [
  {
    accent: "blue",
    audience: text(
      "Ingliz tilini noldan boshlayotgan yoki kundalik muloqot uchun bilimlarini tizimli mustahkamlashni istagan o‘quvchilar uchun.",
      "Для учеников, которые начинают английский с нуля или хотят системно укрепить знания для повседневного общения.",
      "For learners starting English from zero or strengthening their skills for everyday communication.",
    ),
    category: "english",
    curriculum: list(
      [
        "Asosiy grammatika va faol lug‘at",
        "Tinglab tushunish va talaffuz",
        "Kundalik suhbat amaliyoti",
        "O‘qish va qisqa yozuv",
        "Bosqich yakunidagi progress review",
      ],
      [
        "Базовая грамматика и активная лексика",
        "Аудирование и произношение",
        "Практика повседневной речи",
        "Чтение и короткие письменные задания",
        "Итоговый обзор прогресса",
      ],
      [
        "Core grammar and active vocabulary",
        "Listening and pronunciation",
        "Everyday conversation practice",
        "Reading and short-form writing",
        "End-of-stage progress review",
      ],
    ),
    duration: text("Har bir bosqich 3 oy", "Каждый уровень — 3 месяца", "3 months per level"),
    focus: text(
      "Kundalik erkin muloqot",
      "Свободное повседневное общение",
      "Confident everyday communication",
    ),
    formatLabel: text("Oflayn guruh", "Офлайн-группа", "In-person group"),
    highlights: list(
      [
        "Beginner’dan Upper-Intermediate / Pre-IELTS’gacha 5 bosqich",
        "Haftasiga 3 marta, har bir dars 80 daqiqa",
        "Cambridge University Press asosidagi bosqichma-bosqich materiallar",
      ],
      [
        "5 уровней: от Beginner до Upper-Intermediate / Pre-IELTS",
        "3 занятия в неделю по 80 минут",
        "Последовательные материалы на основе Cambridge University Press",
      ],
      [
        "Five stages from Beginner to Upper-Intermediate / Pre-IELTS",
        "Three 80-minute lessons each week",
        "Structured materials based on Cambridge University Press",
      ],
    ),
    heroVariant: "immersive",
    image: "/images/courses-page/general-english-fullscreen-hero.webp",
    imageAlt: text(
      "Yorug‘ sinfda suhbat mashqini bajarayotgan o‘quvchilar",
      "Ученики практикуют разговорную речь в светлом классе",
      "Learners practising conversation in a bright classroom",
    ),
    level: text("Beginner — Pre-IELTS", "Beginner — Pre-IELTS", "Beginner — Pre-IELTS"),
    outcomes: list(
      [
        "Kundalik mavzularda aniq va erkinroq fikr bildirish",
        "Tinglash, o‘qish, yozish va speaking ko‘nikmalarini parallel rivojlantirish",
        "Keyingi CEFR yoki IELTS bosqichiga tayyor poydevor yaratish",
        "Movie Day, Speaking Club va yakshanba faoliyatlarida tilni amalda ishlatish",
      ],
      [
        "Увереннее выражать мысли на повседневные темы",
        "Параллельно развивать аудирование, чтение, письмо и речь",
        "Создать основу для следующего уровня CEFR или IELTS",
        "Применять язык на Movie Day, Speaking Club и воскресных активностях",
      ],
      [
        "Communicate more clearly across everyday topics",
        "Develop listening, reading, writing, and speaking together",
        "Build a foundation for the next CEFR or IELTS stage",
        "Use English during Movie Day, Speaking Club, and Sunday activities",
      ],
    ),
    overview: list(
      [
        "Har bir bosqich grammatika va faol lug‘atni real muloqot vazifalari bilan bog‘laydi. O‘quvchilar yangi mavzuni qisqa tushuntirishdan keyin juftlikdagi suhbat, tinglash va yozish mashqlarida qo‘llaydi.",
        "Dastur davomida kichik diagnostikalar va progress review’lar o‘tkaziladi. Natijalar keyingi bosqich, mustaqil mashq va qo‘shimcha speaking faoliyatlari uchun aniq yo‘nalish beradi.",
      ],
      [
        "Каждый уровень связывает грамматику и активную лексику с реальными коммуникативными задачами. После короткого объяснения ученики применяют тему в диалогах, аудировании и письменной практике.",
        "Небольшие диагностики и progress review помогают отслеживать развитие в течение программы. Результаты определяют следующий уровень, самостоятельную практику и дополнительные разговорные активности.",
      ],
      [
        "Each stage connects grammar and active vocabulary with realistic communication tasks. After a concise explanation, learners apply the topic through paired speaking, listening, and short writing practice.",
        "Regular diagnostics and progress reviews make development visible throughout the programme. The results shape the next level, independent practice, and optional speaking activities.",
      ],
    ),
    posterAlt: text(
      "Kinematik osmon ostida General English ko‘nikmalarini ko‘rsatuvchi yo‘nalish taxtalari",
      "Указатели с навыками General English на фоне кинематографичного неба",
      "Direction signs showing General English skills beneath a cinematic sky",
    ),
    posterImage: "/images/courses-page/general-english-poster.webp",
    posterTitle: text("English", "English", "English"),
    prerequisites: text(
      "Boshlang‘ich level check tavsiya etiladi; oldingi bilim talab qilinmaydi.",
      "Рекомендуется стартовая проверка уровня; предварительные знания не обязательны.",
      "An initial level check is recommended; prior knowledge is not required.",
    ),
    schedule: text(
      "Haftasiga 3 marta · 80 daqiqa",
      "3 раза в неделю · 80 минут",
      "3 times a week · 80 minutes",
    ),
    slug: "english-general",
    summary: text(
      "Besh bosqichli dastur grammatika, lug‘at va jonli muloqotni bir yo‘nalishda rivojlantiradi.",
      "Пятиуровневая программа последовательно развивает грамматику, лексику и живое общение.",
      "A five-stage programme that develops grammar, vocabulary, and real communication together.",
    ),
    symbol: "EN",
    title: text("General English", "General English", "General English"),
  },
  {
    accent: "turquoise",
    audience: text(
      "IELTS formatini tizimli o‘rganish, mavjud bilimini mustahkamlash yoki yuqori band uchun intensiv tayyorlanishni istaganlar uchun.",
      "Для тех, кто хочет системно освоить формат IELTS, укрепить базу или интенсивно готовиться к высокому баллу.",
      "For learners who want a structured introduction to IELTS, stronger foundations, or intensive high-band preparation.",
    ),
    category: "exam",
    comparisonTitle: text("IELTS", "IELTS", "IELTS"),
    curriculum: list(
      [
        "IELTS formati va band descriptors",
        "Listening va Reading strategiyalari",
        "Writing Task 1 va Task 2",
        "Speaking Part 1–2–3",
        "To‘liq MOCK va individual tahlil",
      ],
      [
        "Формат IELTS и band descriptors",
        "Стратегии Listening и Reading",
        "Writing Task 1 и Task 2",
        "Speaking Part 1–2–3",
        "Полный MOCK и индивидуальный анализ",
      ],
      [
        "IELTS format and band descriptors",
        "Listening and Reading strategies",
        "Writing Task 1 and Task 2",
        "Speaking Parts 1–2–3",
        "Full MOCK and individual analysis",
      ],
    ),
    duration: text(
      "Trekka qarab 3–6 oy",
      "3–6 месяцев в зависимости от трека",
      "3–6 months by track",
    ),
    focus: text(
      "IELTS strategiyasi va band o‘sishi",
      "Стратегия IELTS и рост band score",
      "IELTS strategy and band development",
    ),
    formatLabel: text("Oflayn intensiv", "Офлайн-интенсив", "In-person intensive"),
    highlights: list(
      [
        "Pre-IELTS, Standard va Advanced treklar",
        "Barcha 4 skill real imtihon formatida",
        "Muntazam MOCK, professional feedback va progress monitoring",
      ],
      [
        "Треки Pre-IELTS, Standard и Advanced",
        "Все 4 навыка в формате реального экзамена",
        "Регулярные MOCK, профессиональная обратная связь и мониторинг прогресса",
      ],
      [
        "Pre-IELTS, Standard, and Advanced tracks",
        "All four skills practised in real exam format",
        "Regular MOCK exams, professional feedback, and progress monitoring",
      ],
    ),
    heroVariant: "immersive",
    image: "/images/courses-page/ielts-fullscreen-hero.webp",
    imageAlt: text(
      "Zamonaviy test xonasida IELTS listening va writing mashqlarini bajarayotgan o‘quvchi",
      "Ученик выполняет задания IELTS Listening и Writing в современном экзаменационном классе",
      "A learner completing IELTS listening and writing practice in a modern test room",
    ),
    level: text("B1 — C1", "B1 — C1", "B1 — C1"),
    outcomes: list(
      [
        "Har bir IELTS bo‘limining baholash mezonlarini tushunish",
        "Murakkab savol turlarida vaqtni boshqarish",
        "Writing’da aniq struktura va dalil yaratish",
        "Speaking’da chuqur va mantiqiy javob berish",
      ],
      [
        "Понимать критерии оценки каждого раздела IELTS",
        "Управлять временем в сложных типах заданий",
        "Строить чёткую структуру и аргументацию в Writing",
        "Давать глубокие и логичные ответы в Speaking",
      ],
      [
        "Understand assessment criteria across every IELTS section",
        "Manage time across complex question types",
        "Build clear structure and arguments in Writing",
        "Give deeper, more logical Speaking responses",
      ],
    ),
    overview: list(
      [
        "Kurs Listening, Reading, Writing va Speaking’ni bitta imtihon strategiyasi ichida rivojlantiradi. Har bir modul task turi, vaqt boshqaruvi va baholash mezonlarini amaliy misollar orqali ochib beradi.",
        "Boshlang‘ich diagnostika o‘quvchini mos trekka yo‘naltiradi, muntazam MOCK bloklari esa real formatdagi progressni ko‘rsatadi. Feedback keyingi haftadagi aniq fokus va mustaqil mashq rejasiga aylantiriladi.",
      ],
      [
        "Курс развивает Listening, Reading, Writing и Speaking в рамках единой экзаменационной стратегии. Каждый модуль раскрывает типы заданий, управление временем и критерии оценивания через практические примеры.",
        "Стартовая диагностика помогает выбрать подходящий трек, а регулярные MOCK-блоки показывают прогресс в реальном формате. Обратная связь превращается в конкретный фокус и план самостоятельной работы на следующую неделю.",
      ],
      [
        "The course develops Listening, Reading, Writing, and Speaking through one coherent exam strategy. Each module explores task types, time management, and assessment criteria through practical examples.",
        "An initial diagnostic places learners on a suitable track, while regular MOCK blocks reveal progress in a realistic format. Feedback becomes a clear weekly focus and an independent practice plan.",
      ],
    ),
    posterAlt: text(
      "Qizil eshikdagi xat tirqishidan chiqib turgan oq IELTS konverti",
      "Белый конверт IELTS в почтовой прорези красной двери",
      "A white IELTS envelope emerging from the mail slot of a red door",
    ),
    posterImage: "/images/courses-page/ielts-course-poster.webp",
    posterTitle: text("IELTS", "IELTS", "IELTS"),
    prerequisites: text(
      "Trek level check va qisqa diagnostika natijasiga ko‘ra tanlanadi.",
      "Трек выбирается по результатам проверки уровня и короткой диагностики.",
      "The track is selected after a level check and short diagnostic.",
    ),
    schedule: text(
      "Haftasiga 3 marta · 80 daqiqa",
      "3 раза в неделю · 80 минут",
      "3 times a week · 80 minutes",
    ),
    slug: "ielts",
    summary: text(
      "Pre-IELTS’dan yuqori band maqsadigacha uch trekli, to‘liq formatdagi imtihon tayyorgarligi.",
      "Трёхуровневая подготовка к полному формату экзамена — от Pre-IELTS до высокого band score.",
      "Three focused tracks covering the full exam journey from Pre-IELTS to a high-band goal.",
    ),
    symbol: "IE",
    title: text("IELTS", "IELTS", "IELTS"),
    tracks: [
      {
        highlights: list(
          [
            "Academic English va formal uslubga kirish",
            "Advanced grammar va academic vocabulary",
            "Writing Task 1–2 strukturasi",
            "Speaking Part 1–2–3 bo‘yicha feedback",
          ],
          [
            "Введение в Academic English и формальный стиль",
            "Advanced grammar и академическая лексика",
            "Структура Writing Task 1–2",
            "Обратная связь по Speaking Part 1–2–3",
          ],
          [
            "Introduction to Academic English and formal style",
            "Advanced grammar and academic vocabulary",
            "Writing Task 1–2 structure",
            "Feedback across Speaking Parts 1–2–3",
          ],
        ),
        level: text("Upper-Intermediate", "Upper-Intermediate", "Upper-Intermediate"),
        summary: text(
          "General English’dan to‘liq IELTS tayyorgarligiga o‘tish bosqichi.",
          "Переходный этап от General English к полной подготовке IELTS.",
          "A bridge from General English into full IELTS preparation.",
        ),
        title: text("Pre-IELTS", "Pre-IELTS", "Pre-IELTS"),
      },
      {
        highlights: list(
          [
            "Barcha skilllar official descriptors asosida",
            "Writing’da 5.5+ uchun struktura va argument",
            "Speaking’da individual feedback",
            "Ko‘proq full-format MOCK va progress tahlili",
          ],
          [
            "Все навыки по official band descriptors",
            "Структура и аргументация Writing для 5.5+",
            "Индивидуальная обратная связь по Speaking",
            "Больше full-format MOCK и анализа прогресса",
          ],
          [
            "All skills aligned with official band descriptors",
            "Writing structure and argument for a 5.5+ target",
            "Individual Speaking feedback",
            "More full-format MOCK exams and progress analysis",
          ],
        ),
        level: text("B1+", "B1+", "B1+"),
        summary: text(
          "Tizimli tayyorgarlik va ishonchli official exam readiness.",
          "Системная подготовка и уверенная готовность к официальному экзамену.",
          "Systematic preparation for confident official-exam readiness.",
        ),
        title: text("IELTS Standard", "IELTS Standard", "IELTS Standard"),
      },
      {
        highlights: list(
          [
            "Murakkab real-exam savollari",
            "Advanced argumentation va collocations",
            "Yuqori band mezonlari bo‘yicha Speaking",
            "Strategik MOCK tahlili va exam psychology",
          ],
          [
            "Сложные задания реального экзамена",
            "Advanced argumentation и collocations",
            "Speaking по критериям высокого band score",
            "Стратегический анализ MOCK и exam psychology",
          ],
          [
            "Complex real-exam question types",
            "Advanced argumentation and collocations",
            "Speaking against high-band criteria",
            "Strategic MOCK analysis and exam psychology",
          ],
        ),
        level: text("B2 — C1", "B2 — C1", "B2 — C1"),
        summary: text(
          "Yuqori band maqsadi uchun intensiv va individual yo‘naltirilgan trek.",
          "Интенсивный трек с индивидуальным фокусом на высокий band score.",
          "An intensive, individually focused track for a high-band target.",
        ),
        title: text("IELTS Advanced", "IELTS Advanced", "IELTS Advanced"),
      },
    ],
  },
  {
    accent: "yellow",
    audience: text(
      "CEFR imtihoniga tayyorlanayotgan yoki o‘z darajasini A2–C1 oralig‘ida tasdiqlashni rejalashtirganlar uchun.",
      "Для тех, кто готовится к экзамену CEFR или планирует подтвердить уровень от A2 до C1.",
      "For learners preparing for CEFR assessment or planning to confirm a level from A2 to C1.",
    ),
    category: "exam",
    comparisonTitle: text("CEFR", "CEFR", "CEFR"),
    curriculum: list(
      [
        "CEFR descriptorlari va diagnostika",
        "Grammar va vocabulary development",
        "Reading va listening tasklari",
        "Writing va speaking mezonlari",
        "Final simulation va feedback",
      ],
      [
        "Дескрипторы CEFR и диагностика",
        "Развитие грамматики и словаря",
        "Задания Reading и Listening",
        "Критерии Writing и Speaking",
        "Финальная симуляция и обратная связь",
      ],
      [
        "CEFR descriptors and diagnostics",
        "Grammar and vocabulary development",
        "Reading and listening tasks",
        "Writing and speaking criteria",
        "Final simulation and feedback",
      ],
    ),
    duration: text("12–16 hafta", "12–16 недель", "12–16 weeks"),
    focus: text(
      "Darajani tizimli tasdiqlash",
      "Системное подтверждение уровня",
      "Structured level certification",
    ),
    formatLabel: text("Oflayn guruh", "Офлайн-группа", "In-person group"),
    highlights: list(
      [
        "A2’dan C1’gacha levelga mos dastur",
        "Haftasiga 3 marta, 80 daqiqalik amaliy dars",
        "Skill-by-skill diagnostika va final simulation",
      ],
      [
        "Программа по уровням от A2 до C1",
        "3 практических занятия в неделю по 80 минут",
        "Диагностика каждого навыка и финальная симуляция",
      ],
      [
        "Level-specific programme from A2 to C1",
        "Three practical 80-minute lessons each week",
        "Skill-by-skill diagnostics and a final simulation",
      ],
    ),
    heroVariant: "immersive",
    image: "/images/courses-page/cefr-fullscreen-hero.webp",
    imageAlt: text(
      "CEFR A1 dan C2 gacha daraja xaritasini tutor bilan ko‘rib chiqayotgan o‘quvchi",
      "Ученик вместе с преподавателем изучает карту уровней CEFR от A1 до C2",
      "A learner reviewing the CEFR level map from A1 to C2 with a tutor",
    ),
    level: text("A2 — C1", "A2 — C1", "A2 — C1"),
    outcomes: list(
      [
        "Tanlangan CEFR level descriptorlarini tushunish",
        "Har bir skill bo‘yicha kuchli va rivojlanadigan tomonlarni bilish",
        "Imtihon topshiriqlarini vaqt ichida bajarish",
        "Aniq keyingi bosqich rejasiga ega bo‘lish",
      ],
      [
        "Понимать дескрипторы выбранного уровня CEFR",
        "Знать сильные стороны и зоны развития по каждому навыку",
        "Выполнять экзаменационные задания в заданное время",
        "Получить ясный план следующего этапа",
      ],
      [
        "Understand the descriptors for the selected CEFR level",
        "Identify strengths and development areas in each skill",
        "Complete assessment tasks within the time limit",
        "Leave with a clear plan for the next stage",
      ],
    ),
    overview: list(
      [
        "Dastur tanlangan CEFR darajasining descriptorlarini kundalik skill mashqlari bilan bog‘laydi. Speaking, listening, reading va writing bir xil progress xaritasi asosida parallel rivojlantiriladi.",
        "Bosqichma-bosqich diagnostika o‘quvchining kuchli tomonlari va rivojlanadigan zonalarini ko‘rsatadi. Tutor feedback’i keyingi levelga o‘tish uchun aniq vazifalar va o‘lchanadigan haftalik maqsadlarni belgilaydi.",
      ],
      [
        "Программа связывает дескрипторы выбранного уровня CEFR с ежедневной практикой навыков. Speaking, listening, reading и writing развиваются параллельно по единой карте прогресса.",
        "Поэтапная диагностика показывает сильные стороны ученика и зоны развития. Обратная связь преподавателя формирует конкретные задания и измеримые недельные цели для перехода на следующий уровень.",
      ],
      [
        "The programme connects the descriptors of the selected CEFR level with practical skill work. Speaking, listening, reading, and writing develop together through one visible progression map.",
        "Stage-by-stage diagnostics identify strengths and development areas. Tutor feedback then defines concrete tasks and measurable weekly goals for moving towards the next level.",
      ],
    ),
    posterAlt: text(
      "C2 markaziga yo‘naltirilgan nayzali qorong‘i CEFR target posteri",
      "Тёмный постер CEFR с дротиком, направленным в центр C2",
      "A dark CEFR target poster with a dart aimed at the C2 centre",
    ),
    posterImage: "/images/courses-page/cefr-target-poster.webp",
    posterTitle: text("CEFR", "CEFR", "CEFR"),
    prerequisites: text(
      "Level check natijasi asosida mos A2, B1, B2 yoki C1 guruhi tavsiya qilinadi.",
      "Подходящая группа A2, B1, B2 или C1 рекомендуется по результатам level check.",
      "A suitable A2, B1, B2, or C1 group is recommended after a level check.",
    ),
    schedule: text(
      "Haftasiga 3 marta · 80 daqiqa",
      "3 раза в неделю · 80 минут",
      "3 times a week · 80 minutes",
    ),
    slug: "cefr",
    summary: text(
      "Tanlangan daraja descriptorlari, real tasklar va muntazam diagnostikaga asoslangan tizimli dastur.",
      "Системная программа на основе дескрипторов выбранного уровня, реальных заданий и регулярной диагностики.",
      "A structured programme built around level descriptors, realistic tasks, and regular diagnostics.",
    ),
    symbol: "CF",
    title: text("CEFR", "CEFR", "CEFR"),
  },
  {
    accent: "blue",
    audience: text(
      "Rus tilini kundalik hayot, o‘qish yoki ish uchun amaliy o‘rganishni istaganlar uchun.",
      "Для тех, кто хочет практично изучать русский язык для жизни, учёбы или работы.",
      "For learners who need practical Russian for daily life, study, or work.",
    ),
    category: "language",
    curriculum: list(
      [
        "Kiril alifbosi va talaffuz",
        "Kundalik grammatika",
        "Dialog va tinglash",
        "O‘qish va yozish",
        "Amaliy speaking review",
      ],
      [
        "Кириллица и произношение",
        "Практическая грамматика",
        "Диалоги и аудирование",
        "Чтение и письмо",
        "Практический speaking review",
      ],
      [
        "Cyrillic and pronunciation",
        "Practical grammar",
        "Dialogue and listening",
        "Reading and writing",
        "Practical speaking review",
      ],
    ),
    duration: text("Har bir bosqich 4 oy", "Каждый уровень — 4 месяца", "4 months per level"),
    focus: text(
      "Kundalik va ish muloqoti",
      "Общение в жизни и на работе",
      "Daily and workplace communication",
    ),
    formatLabel: text("Oflayn guruh", "Офлайн-группа", "In-person group"),
    highlights: list(
      [
        "Noldan B2’gacha bosqichli dastur",
        "Haftasiga 3 marta, 80 daqiqa",
        "Dialog, talaffuz va real vaziyatlarga urg‘u",
      ],
      [
        "Пошаговая программа от нуля до B2",
        "3 занятия в неделю по 80 минут",
        "Фокус на диалогах, произношении и реальных ситуациях",
      ],
      [
        "A staged route from zero to B2",
        "Three 80-minute lessons each week",
        "Focus on dialogue, pronunciation, and real situations",
      ],
    ),
    heroVariant: "immersive",
    image: "/images/courses-page/russian-fullscreen-hero.png",
    imageAlt: text(
      "Rus tili darsida o‘qituvchi doskada kirill harflarini tushuntirmoqda",
      "Преподаватель объясняет кириллические буквы на уроке русского языка",
      "A teacher explains Cyrillic letters during a Russian language lesson",
    ),
    level: text("A0 — B2", "A0 — B2", "A0 — B2"),
    outcomes: list(
      [
        "Kundalik vaziyatlarda rus tilida muloqot qilish",
        "Asosiy grammatikani nutqda qo‘llash",
        "Kiril yozuvini erkinroq o‘qish",
        "Ish va o‘qish mavzularida fikr bildirish",
      ],
      [
        "Общаться по-русски в повседневных ситуациях",
        "Использовать базовую грамматику в речи",
        "Увереннее читать кириллицу",
        "Выражать мысли на темы работы и учёбы",
      ],
      [
        "Communicate in everyday Russian",
        "Use core grammar in speech",
        "Read Cyrillic with greater confidence",
        "Discuss work and study topics",
      ],
    ),
    overview: list(
      [
        "Kurs kiril alifbosi, talaffuz va asosiy grammatikani kundalik dialoglar bilan birlashtiradi. Har bir mavzu transport, xarid, o‘qish yoki ish kabi tanish vaziyatlarda qo‘llanadi.",
        "Qisqa audio mashqlar, role-play va yozma topshiriqlar yangi lug‘atni faol nutqqa olib chiqadi. Bosqich yakunidagi suhbat o‘quvchining keyingi guruhga tayyorligini ko‘rsatadi.",
      ],
      [
        "Курс объединяет кириллицу, произношение и базовую грамматику с повседневными диалогами. Каждая тема применяется в знакомых ситуациях: транспорт, покупки, учёба или работа.",
        "Короткие аудиозадания, role-play и письменная практика переводят новую лексику в активную речь. Итоговая беседа показывает готовность ученика к следующей группе.",
      ],
      [
        "The course combines Cyrillic, pronunciation, and core grammar with practical everyday dialogue. Each topic is applied to familiar situations such as transport, shopping, study, or work.",
        "Short listening tasks, role-play, and writing practice move new vocabulary into active speech. An end-of-stage conversation shows whether the learner is ready for the next group.",
      ],
    ),
    prerequisites: text(
      "Boshlang‘ich guruh uchun oldingi bilim talab qilinmaydi.",
      "Для начальной группы предварительные знания не нужны.",
      "No prior knowledge is required for the beginner group.",
    ),
    schedule: text(
      "Haftasiga 3 marta · 80 daqiqa",
      "3 раза в неделю · 80 минут",
      "3 times a week · 80 minutes",
    ),
    slug: "russian",
    summary: text(
      "Talaffuz, grammatika va real dialoglarga asoslangan amaliy rus tili yo‘li.",
      "Практический русский язык с опорой на произношение, грамматику и реальные диалоги.",
      "A practical Russian pathway built around pronunciation, grammar, and real dialogue.",
    ),
    symbol: "RU",
    title: text("Russian", "Русский язык", "Russian"),
  },
  {
    accent: "turquoise",
    audience: text(
      "Fransuz tilini sayohat, o‘qish va madaniy muloqot uchun boshlamoqchi bo‘lganlar uchun.",
      "Для тех, кто начинает французский для путешествий, учёбы и культурного общения.",
      "For learners beginning French for travel, study, and cultural communication.",
    ),
    category: "language",
    curriculum: list(
      [
        "Tovushlar va talaffuz",
        "Kundalik iboralar",
        "Grammar patterns",
        "Listening va dialog",
        "Mini presentation",
      ],
      [
        "Звуки и произношение",
        "Повседневные фразы",
        "Грамматические модели",
        "Аудирование и диалог",
        "Мини-презентация",
      ],
      [
        "Sounds and pronunciation",
        "Everyday phrases",
        "Grammar patterns",
        "Listening and dialogue",
        "Mini presentation",
      ],
    ),
    duration: text("Har bir bosqich 4 oy", "Каждый уровень — 4 месяца", "4 months per level"),
    focus: text(
      "Sayohat va madaniy muloqot",
      "Путешествия и культурное общение",
      "Travel and cultural communication",
    ),
    formatLabel: text("Oflayn guruh", "Офлайн-группа", "In-person group"),
    highlights: list(
      [
        "A0’dan B1’gacha tushunarli bosqichlar",
        "Haftasiga 3 marta, 80 daqiqa",
        "Talaffuz va conversational French amaliyoti",
      ],
      [
        "Понятные уровни от A0 до B1",
        "3 занятия в неделю по 80 минут",
        "Практика произношения и разговорного французского",
      ],
      [
        "Clear stages from A0 to B1",
        "Three 80-minute lessons each week",
        "Pronunciation and conversational French practice",
      ],
    ),
    heroVariant: "immersive",
    image: "/images/courses-page/french-fullscreen-hero.png",
    imageAlt: text(
      "Fransuz tili darsida o‘qituvchi tanishuv iboralari va talaffuzni tushuntirmoqda",
      "Преподаватель объясняет фразы для знакомства и произношение на уроке французского языка",
      "A teacher explains introductory phrases and pronunciation during a French lesson",
    ),
    level: text("A0 — B1", "A0 — B1", "A0 — B1"),
    outcomes: list(
      [
        "O‘zingizni tanishtirish va kundalik suhbat qurish",
        "Asosiy fransuz talaffuzini boshqarish",
        "Qisqa matn va e’lonlarni tushunish",
        "Sayohat vaziyatlarida mustaqil muloqot qilish",
      ],
      [
        "Представляться и вести повседневный разговор",
        "Освоить базовое французское произношение",
        "Понимать короткие тексты и объявления",
        "Самостоятельно общаться в путешествиях",
      ],
      [
        "Introduce yourself and hold everyday conversations",
        "Handle core French pronunciation",
        "Understand short texts and announcements",
        "Communicate independently while travelling",
      ],
    ),
    overview: list(
      [
        "Dastur fransuz tilining tovush tizimi va ritmini sodda dialoglardan boshlab o‘rgatadi. Yangi grammatika kundalik tanishuv, sayohat, kafe va shahar vaziyatlari orqali mustahkamlanadi.",
        "Har darsda listening, talaffuz va qisqa speaking vazifasi bir-birini to‘ldiradi. Mini-loyihalar o‘quvchiga yangi iboralarni mustaqil va tabiiyroq ishlatish imkonini beradi.",
      ],
      [
        "Программа знакомит со звуковой системой и ритмом французского через простые диалоги. Новая грамматика закрепляется в ситуациях знакомства, путешествия, кафе и города.",
        "На каждом занятии аудирование, произношение и короткая разговорная задача дополняют друг друга. Мини-проекты помогают использовать новые выражения более самостоятельно и естественно.",
      ],
      [
        "The programme introduces French sound patterns and rhythm through simple dialogue. New grammar is reinforced through familiar situations involving introductions, travel, cafés, and city life.",
        "Listening, pronunciation, and a short speaking task support one another in every lesson. Mini-projects help learners use new expressions more independently and naturally.",
      ],
    ),
    prerequisites: text(
      "Boshlang‘ich guruh ochiq; level check faqat tajribali o‘quvchilar uchun.",
      "Начальная группа открыта всем; level check нужен только ученикам с опытом.",
      "The beginner group is open to all; a level check is only needed for experienced learners.",
    ),
    schedule: text(
      "Haftasiga 3 marta · 80 daqiqa",
      "3 раза в неделю · 80 минут",
      "3 times a week · 80 minutes",
    ),
    slug: "french",
    summary: text(
      "Aniq talaffuz va kundalik vaziyatlardan boshlangan conversational French dasturi.",
      "Разговорный французский, который начинается с ясного произношения и повседневных ситуаций.",
      "Conversational French beginning with clear pronunciation and everyday situations.",
    ),
    symbol: "FR",
    title: text("French", "Французский язык", "French"),
  },
  {
    accent: "yellow",
    audience: text(
      "Nemis tilini ta’lim, ish yoki kelajakdagi xalqaro rejalari uchun o‘rganayotganlar uchun.",
      "Для тех, кто изучает немецкий для образования, работы или будущих международных планов.",
      "For learners studying German for education, work, or future international plans.",
    ),
    category: "language",
    curriculum: list(
      [
        "Talaffuz va sentence structure",
        "Core grammar",
        "Kundalik vocabulary",
        "Reading va listening",
        "Goethe-style task preview",
      ],
      [
        "Произношение и структура предложений",
        "Основная грамматика",
        "Повседневная лексика",
        "Чтение и аудирование",
        "Знакомство с заданиями Goethe",
      ],
      [
        "Pronunciation and sentence structure",
        "Core grammar",
        "Everyday vocabulary",
        "Reading and listening",
        "Goethe-style task preview",
      ],
    ),
    duration: text("Har bir bosqich 4 oy", "Каждый уровень — 4 месяца", "4 months per level"),
    focus: text(
      "Ta’lim va professional muloqot",
      "Учёба и профессиональное общение",
      "Study and professional communication",
    ),
    formatLabel: text("Oflayn guruh", "Офлайн-группа", "In-person group"),
    highlights: list(
      [
        "A0’dan B2’gacha strukturali yo‘l",
        "Haftasiga 3 marta, 80 daqiqa",
        "Grammar accuracy va faol speaking muvozanati",
      ],
      [
        "Структурированный путь от A0 до B2",
        "3 занятия в неделю по 80 минут",
        "Баланс точной грамматики и активной речи",
      ],
      [
        "A structured path from A0 to B2",
        "Three 80-minute lessons each week",
        "A balance of grammar accuracy and active speaking",
      ],
    ),
    heroVariant: "immersive",
    image: "/images/courses-page/german-fullscreen-hero.png",
    imageAlt: text(
      "Nemis tili darsida o‘qituvchi doskada gap tuzilishini tushuntirmoqda",
      "Преподаватель объясняет структуру предложения на уроке немецкого языка",
      "A teacher explains sentence structure during a German language lesson",
    ),
    level: text("A0 — B2", "A0 — B2", "A0 — B2"),
    outcomes: list(
      [
        "Nemischa gap tuzilishini ishonchli qo‘llash",
        "Kundalik va akademik matnlarni tushunish",
        "Fikrni aniq va tartibli ifodalash",
        "Keyingi sertifikat bosqichiga tayyorlanish",
      ],
      [
        "Уверенно использовать немецкую структуру предложений",
        "Понимать повседневные и учебные тексты",
        "Ясно и последовательно выражать мысли",
        "Подготовиться к следующему уровню сертификации",
      ],
      [
        "Use German sentence structure confidently",
        "Understand everyday and academic texts",
        "Express ideas clearly and logically",
        "Prepare for the next certification stage",
      ],
    ),
    overview: list(
      [
        "Kurs nemischa gap tuzilishini faol lug‘at va muloqot vazifalari bilan bosqichma-bosqich quradi. O‘quvchilar qoidani faqat yodlamaydi, balki uni tinglash, o‘qish va speaking kontekstida ishlatadi.",
        "Har modul yakunida qisqa practical checkpoint mavjud. U aniqlik, tushunish va fikrni tartibli ifodalash bo‘yicha keyingi darslarning fokusini belgilaydi.",
      ],
      [
        "Курс поэтапно соединяет структуру немецкого предложения с активной лексикой и коммуникативными задачами. Ученики не просто запоминают правило, а применяют его в аудировании, чтении и речи.",
        "Каждый модуль завершается коротким practical checkpoint. Он определяет фокус следующих занятий по точности, пониманию и последовательному выражению мысли.",
      ],
      [
        "The course builds German sentence structure alongside active vocabulary and communication tasks. Learners do more than memorise rules; they apply them through listening, reading, and speaking contexts.",
        "Each module closes with a short practical checkpoint. It defines the next lesson focus for accuracy, comprehension, and expressing ideas in a clear sequence.",
      ],
    ),
    prerequisites: text(
      "A1+ guruhlariga kirish uchun qisqa level check o‘tkaziladi.",
      "Для групп A1+ проводится короткий level check.",
      "A short level check is used for entry into A1+ groups.",
    ),
    schedule: text(
      "Haftasiga 3 marta · 80 daqiqa",
      "3 раза в неделю · 80 минут",
      "3 times a week · 80 minutes",
    ),
    slug: "german",
    summary: text(
      "Grammar aniqligi, faol lug‘at va bosqichma-bosqich speaking’ni birlashtirgan nemis tili dasturi.",
      "Немецкий язык с балансом точной грамматики, активной лексики и поэтапной разговорной практики.",
      "German combining accurate grammar, active vocabulary, and progressive speaking practice.",
    ),
    symbol: "DE",
    title: text("German", "Немецкий язык", "German"),
  },
  {
    accent: "blue",
    audience: text(
      "Mandarin tilini noldan, to‘g‘ri talaffuz va yozuv asoslari bilan boshlamoqchi bo‘lganlar uchun.",
      "Для тех, кто начинает мандаринский с нуля и хочет освоить произношение и основы письма.",
      "For learners beginning Mandarin from zero with a strong base in pronunciation and writing.",
    ),
    category: "language",
    curriculum: list(
      [
        "Pinyin va tones",
        "Asosiy characters",
        "Kundalik sentence patterns",
        "Listening va repetition",
        "HSK-style vocabulary review",
      ],
      [
        "Pinyin и тоны",
        "Базовые иероглифы",
        "Повседневные речевые модели",
        "Аудирование и повторение",
        "Повторение лексики в формате HSK",
      ],
      [
        "Pinyin and tones",
        "Core characters",
        "Everyday sentence patterns",
        "Listening and repetition",
        "HSK-style vocabulary review",
      ],
    ),
    duration: text("Har bir bosqich 4 oy", "Каждый уровень — 4 месяца", "4 months per level"),
    focus: text(
      "Mandarin asoslari va HSK yo‘li",
      "Основы мандаринского и путь HSK",
      "Mandarin foundations and an HSK pathway",
    ),
    formatLabel: text("Oflayn guruh", "Офлайн-группа", "In-person group"),
    highlights: list(
      [
        "HSK 1’dan HSK 4’gacha bosqichlar",
        "Haftasiga 3 marta, 80 daqiqa",
        "Pinyin, tones, characters va dialog birgalikda",
      ],
      [
        "Уровни от HSK 1 до HSK 4",
        "3 занятия в неделю по 80 минут",
        "Pinyin, тоны, иероглифы и диалог в одной программе",
      ],
      [
        "Stages from HSK 1 to HSK 4",
        "Three 80-minute lessons each week",
        "Pinyin, tones, characters, and dialogue developed together",
      ],
    ),
    heroVariant: "immersive",
    image: "/images/courses-page/chinese-fullscreen-hero.png",
    imageAlt: text(
      "Mandarin darsida o‘qituvchi pinyin va to‘rt tonni tushuntirmoqda",
      "Преподаватель объясняет пиньинь и четыре тона на уроке китайского языка",
      "A teacher explains pinyin and the four tones during a Mandarin lesson",
    ),
    level: text("HSK 1 — HSK 4", "HSK 1 — HSK 4", "HSK 1 — HSK 4"),
    outcomes: list(
      [
        "To‘rt tonni aniqroq farqlash va qo‘llash",
        "Asosiy characters’ni o‘qish va yozish",
        "Kundalik savol-javoblarni olib borish",
        "HSK vocabulary bloklarini tizimli o‘zlashtirish",
      ],
      [
        "Точнее различать и использовать четыре тона",
        "Читать и писать базовые иероглифы",
        "Вести простые повседневные диалоги",
        "Системно осваивать блоки лексики HSK",
      ],
      [
        "Distinguish and use the four tones more accurately",
        "Read and write core characters",
        "Handle simple everyday exchanges",
        "Build HSK vocabulary in structured blocks",
      ],
    ),
    overview: list(
      [
        "Dastur pinyin va to‘rt tonni kundalik iboralar bilan birga o‘rgatadi, so‘ng asosiy characters va HSK vocabulary bloklariga o‘tadi. Har yangi element talaffuz, tinglash va dialogda qayta ishlatiladi.",
        "Vizual character kartalari, qisqa dictation va spaced review xotirani mustahkamlaydi. Bosqich yakunida o‘quvchi keyingi HSK blokiga o‘tish uchun shaxsiy takrorlash ro‘yxatini oladi.",
      ],
      [
        "Программа изучает pinyin и четыре тона вместе с повседневными выражениями, затем переходит к базовым иероглифам и блокам лексики HSK. Каждый новый элемент повторяется в произношении, аудировании и диалогах.",
        "Визуальные карточки иероглифов, короткие диктанты и spaced review укрепляют память. В конце этапа ученик получает личный список повторения для перехода к следующему блоку HSK.",
      ],
      [
        "The programme teaches pinyin and the four tones alongside everyday expressions before moving into core characters and structured HSK vocabulary blocks. Every new element returns in pronunciation, listening, and dialogue practice.",
        "Visual character cards, short dictation, and spaced review strengthen recall. At the end of each stage, learners receive a personal revision list for moving into the next HSK block.",
      ],
    ),
    prerequisites: text(
      "Boshlang‘ich bosqich uchun oldingi Mandarin bilimi talab qilinmaydi.",
      "Для начального уровня знание мандаринского не требуется.",
      "No previous Mandarin knowledge is required for the beginner stage.",
    ),
    schedule: text(
      "Haftasiga 3 marta · 80 daqiqa",
      "3 раза в неделю · 80 минут",
      "3 times a week · 80 minutes",
    ),
    slug: "chinese",
    summary: text(
      "Pinyin, tones, characters va kundalik dialogni birga rivojlantiradigan Mandarin dasturi.",
      "Программа мандаринского, которая объединяет pinyin, тоны, иероглифы и повседневный диалог.",
      "A Mandarin programme developing pinyin, tones, characters, and everyday dialogue together.",
    ),
    symbol: "ZH",
    title: text("Chinese", "Китайский язык", "Chinese"),
  },
];

export const featuredCourses = courses.filter((course) => course.category !== "language");
export const languageCourses = courses.filter((course) => course.category === "language");
