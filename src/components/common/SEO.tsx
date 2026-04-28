import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "Gemini Nexatech - Where Ideas Meet Innovation",
  description = "Gemini Nexatech is a leading provider of innovative digital solutions, specialized engineering, and technical consultancy services.",
  keywords = "Gemini Nexatech, engineering, innovation, digital solutions, technical consultancy, tech services",
  image = "/og-image.png",
  url = "https://gemininexatech.com/",
  type = "website"
}: SEOProps) => {
  const siteTitle = title.includes("Gemini Nexatech") ? title : `${title} | Gemini Nexatech`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
