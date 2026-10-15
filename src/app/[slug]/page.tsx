import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PostCard from "@/components/PostCard";
import { formatDate, getPost, getSlugs } from "@/lib/api";
import { APP_URL, BLOG_URL, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artigo não encontrado" };

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.published_at ?? undefined,
      authors: post.author_name ? [post.author_name] : undefined,
      tags: post.tags,
      images: post.cover_url ? [post.cover_url] : ["/logo.png"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo_description || post.excerpt || undefined,
    image: post.cover_url ? [post.cover_url] : undefined,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: post.author_name || "Controle Dois" },
    publisher: { "@type": "Organization", name: "Controle Dois", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: `${BLOG_URL}/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <Link href="/" className="text-[13.5px] font-semibold text-brand-700 hover:underline">
          ← Todos os artigos
        </Link>

        {post.category && (
          <p className="mt-8 text-[12.5px] font-bold uppercase tracking-widest text-brand-500">{post.category}</p>
        )}
        <h1 className="mt-2 text-[32px] font-bold leading-tight tracking-tight text-ink sm:text-[42px]">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-[18px] leading-relaxed text-ink-soft">{post.excerpt}</p>}
        <p className="mt-5 text-[13.5px] text-muted">
          {post.author_name ? `${post.author_name} · ` : ""}
          {formatDate(post.published_at)} · {post.reading_minutes} min de leitura
        </p>

        {post.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_url} alt={post.cover_alt ?? ""} className="mt-8 w-full rounded-2xl object-cover" />
        )}

        <div className="prose prose-lg prose-slate mt-10 max-w-none prose-headings:tracking-tight prose-a:text-brand-700 prose-img:rounded-xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {children}
                </a>
              ),
              // eslint-disable-next-line @next/next/no-img-element
              img: ({ src, alt }) => <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-brand-100 px-3 py-1 text-[12.5px] font-semibold text-brand-700">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <aside className="mt-14 rounded-2xl bg-brand-900 p-8 text-white">
          <h2 className="text-[22px] font-bold">Organize a sua empresa com o Controle Dois</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-brand-100">
            Vendas, financeiro, notas fiscais, estoque e PDV em um só sistema, com a versão certa para o seu segmento.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={SITE_URL} className="rounded-xl bg-white px-5 py-3 text-[14.5px] font-semibold text-brand-700 hover:bg-brand-100">
              Conheça o sistema
            </a>
            <a href={APP_URL} className="rounded-xl border border-white/30 px-5 py-3 text-[14.5px] font-semibold text-white hover:bg-white/10">
              Entrar
            </a>
          </div>
        </aside>
      </article>

      {post.related.length > 0 && (
        <section className="border-t border-line bg-brand-50 py-14">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-[22px] font-bold text-ink">Continue lendo</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {post.related.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
