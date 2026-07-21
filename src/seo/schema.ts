/** schema.org builders for page-level JSON-LD. Consumed via <SEO jsonLd={...} />. */

export const SITE_URL = "https://gemininexatech.com";

const ORGANIZATION = {
  "@type": "Organization",
  name: "Gemini Nexatech",
  url: SITE_URL,
} as const;

/** Breadcrumb trail. Pass paths site-relative, e.g. "/products/gps-fleet". */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: `${SITE_URL}${crumb.path}`,
  })),
});

export const serviceSchema = (s: { title: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.description,
  url: `${SITE_URL}${s.path}`,
  serviceType: s.title,
  provider: ORGANIZATION,
  areaServed: { "@type": "Country", name: "India" },
});

export const productSchema = (p: { title: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.title,
  description: p.description,
  url: `${SITE_URL}${p.path}`,
  brand: ORGANIZATION,
});

/** Industry pages are editorial overviews rather than a sellable entity. */
export const industrySchema = (i: { title: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${i.title} Industry`,
  description: i.description,
  url: `${SITE_URL}${i.path}`,
  about: { "@type": "Thing", name: i.title },
  publisher: ORGANIZATION,
});

export const contactSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    ...ORGANIZATION,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9003275271",
      email: "sales@gemininexatech.com",
      contactType: "sales",
      areaServed: "IN",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Campus-1a, Millenia Business Park-I, Perungudi",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600096",
      addressCountry: "IN",
    },
  },
});
