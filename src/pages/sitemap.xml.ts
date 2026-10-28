import type { APIRoute } from "astro";
import { projects } from "../content/portfolio";
export const GET: APIRoute = ({ site }) => {
  const paths = ["/", ...projects.map((project) => `/work/${project.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`).join("")}</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
