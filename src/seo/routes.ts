import { services, products, industries } from "../data/websiteData";

/** Routes with a fixed path. */
export const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/video-library",
  "/blogs",
];

/** Detail routes derived from site data, so new entries are picked up automatically. */
export const dynamicRoutes = [
  ...services.map((s) => `/services/${s.id}`),
  ...products.map((p) => `/products/${p.id}`),
  ...industries.map((i) => `/industries/${i.id}`),
];

/** Every crawlable route. Drives both prerendering and sitemap generation. */
export const allRoutes = [...staticRoutes, ...dynamicRoutes];
