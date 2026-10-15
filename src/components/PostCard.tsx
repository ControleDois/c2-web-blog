import Link from "next/link";
import { formatDate, type BlogPostSummary } from "@/lib/api";

export default function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:border-brand-300"
    >
      {post.cover_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_url} alt={post.cover_alt ?? ""} className="aspect-[16/9] w-full object-cover" loading="lazy" />
      ) : (
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-brand-100 to-brand-300/40" />
      )}
      <div className="flex flex-1 flex-col p-5">
        {post.category && <p className="text-[12px] font-bold uppercase tracking-wide text-brand-500">{post.category}</p>}
        <h2 className="mt-1.5 text-[17px] font-bold leading-snug text-ink group-hover:text-brand-700">{post.title}</h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-soft">{post.excerpt}</p>}
        <p className="mt-auto pt-4 text-[12.5px] text-muted">
          {formatDate(post.published_at)} · {post.reading_minutes} min de leitura
        </p>
      </div>
    </Link>
  );
}
