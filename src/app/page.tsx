import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getCategories, getPosts } from "@/lib/api";

interface HomeProps {
  searchParams: Promise<{ categoria?: string; pagina?: string; busca?: string }>;
}

function buildHref(params: { categoria?: string; pagina?: number; busca?: string }) {
  const query = new URLSearchParams();
  if (params.categoria) query.set("categoria", params.categoria);
  if (params.busca) query.set("busca", params.busca);
  if (params.pagina && params.pagina > 1) query.set("pagina", String(params.pagina));
  const text = query.toString();
  return text ? `/?${text}` : "/";
}

export default async function Home({ searchParams }: HomeProps) {
  const { categoria, pagina, busca } = await searchParams;
  const page = Math.max(1, Number(pagina) || 1);
  const [posts, categories] = await Promise.all([
    getPosts({ page, category: categoria, search: busca }),
    getCategories(),
  ]);
  const { current_page, last_page } = posts.meta;

  return (
    <>
      <section className="bg-gradient-to-b from-brand-100 to-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <p className="text-[12.5px] font-bold uppercase tracking-widest text-brand-500">Blog</p>
          <h1 className="mt-2 max-w-2xl text-[34px] font-bold leading-tight tracking-tight text-ink sm:text-[46px]">
            Gestão, fiscal e dicas para o seu negócio
          </h1>
          <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
            Conteúdo do time do Controle Dois sobre vendas, financeiro, notas fiscais e novidades do sistema.
          </p>

          <form action="/" className="mt-8 flex max-w-md gap-2">
            {categoria && <input type="hidden" name="categoria" value={categoria} />}
            <input
              type="search"
              name="busca"
              defaultValue={busca}
              placeholder="Buscar artigos"
              className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-muted focus:border-brand-300 focus:outline-none"
            />
            <button className="rounded-xl bg-brand-500 px-5 py-3 text-[14.5px] font-semibold text-white transition hover:bg-brand-700">
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href={buildHref({ busca })}
              className={`rounded-full px-4 py-1.5 text-[13.5px] font-semibold transition ${
                !categoria ? "bg-brand-500 text-white" : "bg-brand-100 text-brand-700 hover:bg-brand-300/40"
              }`}
            >
              Todos
            </Link>
            {categories.map((item) => (
              <Link
                key={item.category}
                href={buildHref({ categoria: item.category, busca })}
                className={`rounded-full px-4 py-1.5 text-[13.5px] font-semibold transition ${
                  categoria === item.category ? "bg-brand-500 text-white" : "bg-brand-100 text-brand-700 hover:bg-brand-300/40"
                }`}
              >
                {item.category}
              </Link>
            ))}
          </div>
        )}

        {posts.data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line px-6 py-20 text-center">
            <p className="text-[17px] font-bold text-ink">
              {categoria || busca ? "Nenhum artigo encontrado" : "Os primeiros artigos estão chegando"}
            </p>
            <p className="mt-2 text-[14.5px] text-ink-soft">
              {categoria || busca ? "Tente outra busca ou veja todos os artigos." : "Volte em breve para ler as novidades."}
            </p>
            {(categoria || busca) && (
              <Link href="/" className="mt-5 inline-block text-[14px] font-semibold text-brand-700 hover:underline">
                Ver todos os artigos
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.data.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {last_page > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-3" aria-label="Paginação">
            {current_page > 1 && (
              <Link
                href={buildHref({ categoria, busca, pagina: current_page - 1 })}
                className="rounded-xl border border-line px-4 py-2 text-[14px] font-semibold text-ink hover:border-brand-300"
              >
                Anterior
              </Link>
            )}
            <span className="text-[13.5px] text-ink-soft">
              Página {current_page} de {last_page}
            </span>
            {current_page < last_page && (
              <Link
                href={buildHref({ categoria, busca, pagina: current_page + 1 })}
                className="rounded-xl border border-line px-4 py-2 text-[14px] font-semibold text-ink hover:border-brand-300"
              >
                Próxima
              </Link>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
