"use client";

import SearchOffRounded from "@mui/icons-material/SearchOffRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { defaultLocale, isLocale } from "@/config/locales";

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
  const pathname = usePathname();
  const pathLocale = pathname.split("/")[1];
  const locale = isLocale(pathLocale) ? pathLocale : defaultLocale;
  const labels = copy[locale];

  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-20 text-center">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand/15 text-heading">
          <SearchOffRounded aria-hidden="true" sx={{ fontSize: 32 }} />
        </span>
        <p className="mt-6 text-sm font-black tracking-[0.2em] text-action uppercase">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-heading">{labels.title}</h1>
        <p className="mt-4 text-muted">{labels.description}</p>
        <Link
          href={`/${locale}`}
          className="mt-7 inline-flex min-h-12 items-center rounded-2xl bg-(image:--gradient-cta) px-6 font-bold text-white"
        >
          {labels.link}
        </Link>
      </div>
    </main>
  );
}
