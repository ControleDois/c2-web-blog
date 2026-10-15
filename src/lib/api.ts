import { API_URL } from "./site";

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  cover_alt: string | null;
  category: string | null;
  tags: string[];
  author_name: string | null;
  published_at: string | null;
  reading_minutes: number;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  updatedAt?: string | null;
  related: BlogPostSummary[];
}

export interface PostsPage {
  data: BlogPostSummary[];
  meta: { total: number; per_page: number; current_page: number; last_page: number };
}

export interface CategoryCount {
  category: string;
  total: number;
}

const EMPTY_PAGE: PostsPage = { data: [], meta: { total: 0, per_page: 9, current_page: 1, last_page: 1 } };

async function getJson<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}/connect/blog${path}`, { next: { revalidate } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getPosts(params: { page?: number; category?: string; tag?: string; search?: string }): Promise<PostsPage> {
  const query = new URLSearchParams({ limit: "9", page: String(params.page || 1) });
  if (params.category) query.set("category", params.category);
  if (params.tag) query.set("tag", params.tag);
  if (params.search) query.set("search", params.search);
  return (await getJson<PostsPage>(`/posts?${query.toString()}`, 60)) ?? EMPTY_PAGE;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  return getJson<BlogPost>(`/posts/${encodeURIComponent(slug)}`, 60);
}

export async function getCategories(): Promise<CategoryCount[]> {
  return (await getJson<CategoryCount[]>("/categories", 300)) ?? [];
}

export async function getSlugs(): Promise<{ slug: string; updated_at: string | null; published_at: string | null }[]> {
  return (await getJson("/slugs", 300)) ?? [];
}

export function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}
