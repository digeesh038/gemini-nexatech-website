import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "./App";
import "./index.css";

export { allRoutes } from "./seo/routes";

/**
 * React 19 hoists <title>/<meta>/<link> into <head> on the client, but
 * renderToString emits them inline wherever they were rendered. Left in the
 * body they are invisible to crawlers — a canonical outside <head> is ignored
 * outright — and they would also mismatch the hydrated client DOM.
 *
 * So we lift exactly those three tag types out of the markup and return them
 * for injection into <head>. JSON-LD is deliberately left in the body: React
 * does not hoist <script>, and JSON-LD is valid anywhere in the document.
 */
const HOISTABLE = /<(title|meta|link)\b[^>]*?(?:\/>|>(?:[\s\S]*?<\/\1>)?)/gi;

function hoistMetadata(markup: string) {
  const head: string[] = [];
  const html = markup.replace(HOISTABLE, (tag) => {
    head.push(tag);
    return "";
  });
  return { html, head: head.join("\n    ") };
}

/** Renders one route to static HTML plus its <head> tags. */
export function render(url: string) {
  const markup = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );

  return hoistMetadata(markup);
}
