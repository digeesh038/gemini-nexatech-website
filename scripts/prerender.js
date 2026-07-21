/**
 * Build-time prerenderer.
 *
 * Renders every route in src/seo/routes.ts to static HTML so crawlers that do
 * not execute JavaScript (Bing, Seobility, LinkedIn/Slack/X unfurlers, LLM
 * crawlers) see real headings, copy and links instead of an empty <div id="root">.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server) — see the
 * "build" script in package.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, process.env.PRERENDER_DIST || "dist");
const SITE_URL = "https://gemininexatech.com";

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

for (const marker of ["<!--app-html-->", "<!--app-head-->"]) {
  if (!template.includes(marker)) {
    throw new Error(`index.html is missing the ${marker} placeholder`);
  }
}

const { render, allRoutes } = await import(
  pathToFileURL(path.join(dist, "server", "entry-server.js")).href
);

/** Maps "/products/rfid-smartid" -> "dist/products/rfid-smartid/index.html". */
const outputFor = (route) =>
  route === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, route.replace(/^\/|\/$/g, ""), "index.html");

let failures = 0;

for (const route of allRoutes) {
  try {
    const { html, head } = render(route);

    if (!html.trim()) throw new Error("rendered empty markup");

    const page = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", html);

    const out = outputFor(route);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page);

    console.log(`  prerendered ${route.padEnd(34)} ${(page.length / 1024).toFixed(1)} kB`);
  } catch (err) {
    failures++;
    console.error(`  FAILED ${route}: ${err.message}`);
  }
}

// Vercel serves /404.html for any path that matches no file, with a real 404
// status. Prerendering it means unknown URLs get the NotFound page directly
// instead of the homepage shell (which would hydrate into a mismatch).
{
  const { html, head } = render("/__not-found__");
  fs.writeFileSync(
    path.join(dist, "404.html"),
    template.replace("<!--app-head-->", head).replace("<!--app-html-->", html),
  );
  console.log("  prerendered 404.html");
}

// Keep the sitemap in lockstep with what was actually prerendered.
const today = new Date().toISOString().slice(0, 10);

const urls = allRoutes
  .map((route) => {
    const loc = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    const priority = route === "/" ? "1.0" : route.includes("/") && route.split("/").length > 2 ? "0.7" : "0.8";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`\n  sitemap.xml written with ${allRoutes.length} URLs`);

if (failures) {
  console.error(`\n  ${failures} route(s) failed to prerender`);
  process.exit(1);
}

console.log(`  prerendered ${allRoutes.length} routes\n`);
