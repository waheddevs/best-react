import SearchOffRounded from "@mui/icons-material/SearchOffRounded";
import Link from "next/link";

const copy = {
  title: "Sahifa topilmadi",
  description: "Manzil noto‘g‘ri yoki kontent hali mavjud emas.",
  link: "Bosh sahifaga qaytish",
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <span className="not-found__2">
          <SearchOffRounded aria-hidden="true" sx={{ fontSize: 32 }} />
        </span>
        <p className="not-found__3">404</p>
        <h1 className="not-found__4">{copy.title}</h1>
        <p className="not-found__5">{copy.description}</p>
        <Link href="/website" className="not-found__6">
          {copy.link}
        </Link>
      </div>
    </main>
  );
}
