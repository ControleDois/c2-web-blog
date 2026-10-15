import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
      <p className="text-[64px] font-bold text-brand-500">404</p>
      <h1 className="mt-2 text-[24px] font-bold text-ink">Artigo não encontrado</h1>
      <p className="mt-3 text-ink-soft">O artigo pode ter sido removido ou o endereço mudou.</p>
      <Link href="/" className="mt-8 rounded-xl bg-brand-500 px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-700">
        Ver todos os artigos
      </Link>
    </div>
  );
}
