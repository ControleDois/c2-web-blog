import type { MetadataRoute } from "next";
import { getSlugs } from "@/lib/api";
import { BLOG_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getSlugs();
  return [
    { url: BLOG_URL, lastModified: new Date(), priority: 1 },
    ...slugs.map((item) => ({
      url: `${BLOG_URL}/${item.slug}`,
      lastModified: new Date(item.updated_at || item.published_at || Date.now()),
      priority: 0.7,
    })),
  ];
}
