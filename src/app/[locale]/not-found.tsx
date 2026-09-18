"use client";

import SearchOffRounded from "@mui/icons-material/SearchOffRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";

const copy = {
  uz: {
    title: "Sahifa topilmadi",
    description: "Manzil noto‘g‘ri yoki kontent hali mavjud emas.",
    link: "Bosh sahifaga qaytish",
  },
  ru: {
    title: "Страница не найдена",
    description: "Адрес неверен или материал пока недоступен.",
    link: "Вернуться на главную",
  },
  en: {
    title: "Page not found",
    description: "The address is incorrect or the content is not available yet.",
    link: "Return home",
  },
};

export default function NotFound() {
  /* HOOKS */
  const locale = useCurrentLocale();
  const labels = copy[locale];

  return (
    <main className="publicShared__notFound">
      <div>
        <span className="publicShared__notFoundIcon">
          <SearchOffRounded aria-hidden="true" className="publicShared__notFoundIconSvg" />
        </span>
        <p className="publicShared__notFoundCode">404</p>
        <h1 className="publicShared__notFoundTitle">{labels.title}</h1>
        <p className="publicShared__notFoundDescription">{labels.description}</p>
        <ScrollToTopLink href={`/${locale}`} className="publicShared__notFoundLink">
          {labels.link}
        </ScrollToTopLink>
      </div>
    </main>
  );
}
