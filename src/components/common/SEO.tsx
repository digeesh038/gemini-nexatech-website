import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../../seo/schema';

export { SITE_URL };

/**
 * Per-route document metadata.
 *
 * Uses React 19's native metadata support — <title>/<meta>/<link> rendered
 * anywhere in the tree are hoisted into <head> by React on the client. During
 * prerendering, renderToString emits them inline instead, so scripts/prerender.js
 * lifts them into <head> to keep the static HTML correct for crawlers.
 */

/** Builds an absolute URL from a site-relative path. */
const absolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Canonical form: absolute, no trailing slash (except root), no query/hash. */
const canonicalFor = (pathname: string) => {
  const clean = pathname.replace(/\/+$/, "");
  return clean ? `${SITE_URL}${clean}` : `${SITE_URL}/`;
};

/** Escapes `<` so a JSON payload can never break out of the script tag. */
const safeJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** Override the canonical URL. Defaults to the current route — leave unset. */
  url?: string;
  type?: string;
  /** Optional page-level schema.org markup, serialized into a JSON-LD script tag. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set for pages that must stay out of the index (e.g. 404). */
  noindex?: boolean;
}

const SEO = ({
  title = "Gemini Nexatech - Where Ideas Meet Innovation",
  description = "Gemini Nexatech is a leading provider of innovative digital solutions, specialized engineering, and technical consultancy services.",
  keywords = "Gemini Nexatech, engineering, innovation, digital solutions, technical consultancy, tech services",
  image = "/og-image.png",
  url,
  type = "website",
  jsonLd,
  noindex = false,
}: SEOProps) => {
  const { pathname } = useLocation();
  const siteTitle = title.includes("Gemini Nexatech") ? title : `${title} | Gemini Nexatech`;
  const canonical = url ? absolute(url) : canonicalFor(pathname);
  const imageUrl = absolute(image);

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={canonical} />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(jsonLd) }}
        />
      )}
    </>
  );
};

export default SEO;
