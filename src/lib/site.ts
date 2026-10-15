export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://controledois.com.br").replace(/\/+$/, "");
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.controledois.com.br").replace(/\/+$/, "");
export const BLOG_URL = (process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog.controledois.com.br").replace(/\/+$/, "");
// Em produção, sem API_URL configurada, usa a API oficial: antes o blog ficava vazio e todo artigo dava 404 em silêncio.
const DEFAULT_API_URL = process.env.NODE_ENV === "production" ? "https://api.grupoamsfacilita.com.br" : "http://localhost:3333";
export const API_URL = (process.env.API_URL ?? DEFAULT_API_URL).replace(/\/+$/, "");
