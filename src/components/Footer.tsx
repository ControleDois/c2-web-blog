import { APP_URL, SITE_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-brand-50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-[13.5px] text-ink-soft">
        <p>© {new Date().getFullYear()} Controle Dois. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <a href={SITE_URL} className="hover:text-brand-700">Site</a>
          <a href={APP_URL} className="hover:text-brand-700">Entrar no sistema</a>
          <a href="/feed.xml" className="hover:text-brand-700">RSS</a>
        </div>
      </div>
    </footer>
  );
}
