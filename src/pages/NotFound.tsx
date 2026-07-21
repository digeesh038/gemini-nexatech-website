import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

/**
 * Catch-all route. Static hosting can't return a real 404 status for an SPA
 * rewrite, so this page carries `noindex` to keep unknown URLs out of the index.
 */
const NotFound = () => (
  <main className="relative min-h-[70vh] flex items-center">
    <SEO
      title="Page Not Found"
      description="The page you are looking for could not be found."
      noindex
    />

    <Container className="relative z-10 text-center py-24">
      <p className="text-gemini-orange font-black tracking-widest uppercase text-sm">
        Error 404
      </p>
      <h1 className="text-4xl sm:text-5xl font-black text-white mt-4">
        This page doesn't exist
      </h1>
      <p className="text-gray-400 mt-4 max-w-xl mx-auto">
        The page you're looking for may have been moved or removed. Head back
        home, or get in touch and we'll point you the right way.
      </p>
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        <Link
          to="/"
          className="px-8 py-3 rounded-full bg-gemini-blue text-white font-bold uppercase tracking-widest text-sm"
        >
          Back to Home
        </Link>
        <Link
          to="/contact"
          className="px-8 py-3 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm"
        >
          Contact Us
        </Link>
      </div>
    </Container>
  </main>
);

export default NotFound;
