import type { PublicResultVideo } from "@/types/PublicResult";

const pexelsLicenseUrl = "https://www.pexels.com/license/";

// Licensed stock footage for the client preview. Do not present the people as real BEST LC learners.
export const publicResultVideos: PublicResultVideo[] = [
  {
    duration: "00:05",
    key: "lesson-preparation",
    posterSrc: "/videos/result-preview-01.webp",
    source: {
      creator: "Thirdman",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/woman-talking-through-her-laptop-6503020/",
    },
    title: {
      uz: "Darsga tayyorgarlik",
      ru: "Подготовка к занятию",
      en: "Preparing for a lesson",
    },
    videoSrc: "/videos/result-preview-01.mp4",
  },
  {
    duration: "00:05",
    key: "focused-home-study",
    posterSrc: "/videos/result-preview-02.webp",
    source: {
      creator: "Tima Miroshnichenko",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/student-using-laptop-and-reading-book-at-home-6860421/",
    },
    title: {
      uz: "Uyda diqqat bilan o‘qish",
      ru: "Сосредоточенная учёба дома",
      en: "Focused study at home",
    },
    videoSrc: "/videos/result-preview-02.mp4",
  },
  {
    duration: "00:05",
    key: "independent-study",
    posterSrc: "/videos/result-preview-03.webp",
    source: {
      creator: "Ron Lach",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/woman-studying-while-using-laptop-7983124/",
    },
    title: {
      uz: "Mustaqil o‘quv jarayoni",
      ru: "Самостоятельная учебная работа",
      en: "Independent study session",
    },
    videoSrc: "/videos/result-preview-03.mp4",
  },
  {
    duration: "00:05",
    key: "listening-practice",
    posterSrc: "/videos/result-preview-04.webp",
    source: {
      creator: "olia danilevich",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/a-woman-studying-while-listening-to-music-6868323/",
    },
    title: {
      uz: "Tinglab o‘rganish mashqi",
      ru: "Учебная практика аудирования",
      en: "Listening practice",
    },
    videoSrc: "/videos/result-preview-04.mp4",
  },
  {
    duration: "00:05",
    key: "collaborative-learning",
    posterSrc: "/videos/result-preview-05.webp",
    source: {
      creator: "Keira Burton",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/smiling-young-people-chatting-and-studying-6145398/",
    },
    title: {
      uz: "Birgalikda o‘rganish",
      ru: "Совместное обучение",
      en: "Collaborative learning",
    },
    videoSrc: "/videos/result-preview-05.mp4",
  },
  {
    duration: "00:05",
    key: "reading-and-notes",
    posterSrc: "/videos/result-preview-06.webp",
    source: {
      creator: "SHVETS production",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/woman-reading-a-book-7560166/",
    },
    title: {
      uz: "O‘qish va qayd yozish",
      ru: "Чтение и ведение заметок",
      en: "Reading and note-taking",
    },
    videoSrc: "/videos/result-preview-06.mp4",
  },
  {
    duration: "00:05",
    key: "learning-confidence",
    posterSrc: "/videos/result-preview-07.webp",
    source: {
      creator: "Monstera Production",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/a-student-smiling-on-the-camera-6219760/",
    },
    title: {
      uz: "O‘qishga ishonch bilan",
      ru: "Уверенность в обучении",
      en: "Learning with confidence",
    },
    videoSrc: "/videos/result-preview-07.mp4",
  },
  {
    duration: "00:05",
    key: "peer-learning",
    posterSrc: "/videos/result-preview-08.webp",
    source: {
      creator: "George Pak",
      licenseUrl: pexelsLicenseUrl,
      provider: "Pexels",
      url: "https://www.pexels.com/video/students-studying-while-sitting-on-stairs-7969425/",
    },
    title: {
      uz: "Tengdoshlar bilan o‘rganish",
      ru: "Обучение вместе со сверстниками",
      en: "Learning with peers",
    },
    videoSrc: "/videos/result-preview-08.mp4",
  },
];
