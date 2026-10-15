import Image from "next/image";
import Link from "next/link";
import { APP_URL, SIGNUP_URL, SITE_URL, TRIAL_DAYS } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={34} height={32} priority />
          <span className="text-[16px] font-bold tracking-tight text-ink">
            Controle Dois <span className="font-medium text-brand-500">Blog</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-5">
          <a href={SITE_URL} className="hidden text-[14px] font-medium text-ink-soft transition hover:text-brand-700 sm:inline">
            Conheça o sistema
          </a>
          <a href={APP_URL} className="hidden text-[14px] font-medium text-ink-soft transition hover:text-brand-700 sm:inline">
            Entrar
          </a>
          <a
            href={SIGNUP_URL}
            className="rounded-xl bg-brand-500 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-brand-700"
          >
            Testar {TRIAL_DAYS} dias grátis
          </a>
        </nav>
      </div>
    </header>
  );
}
