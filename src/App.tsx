import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

import "./App.css";
import ServiceDetail from "./pages/ServiceDetail";
import ProductDetail from "./pages/ProductDetail";
import IndustryDetail from "./pages/IndustryDetail";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VideoLibraryPage from "./pages/VideoLibraryPage";
import BlogsPage from "./pages/BlogsPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";
import BrochureFAB from "./components/common/BrochureFAB";
import WhatsAppFAB from "./components/common/WhatsAppFAB";

/**
 * Everything inside the router. Kept separate from <App /> so the prerenderer
 * can mount the same tree under a StaticRouter — see src/entry-server.tsx.
 */
export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-white focus:text-black">Skip to content</a>
      <BrochureFAB />
      <WhatsAppFAB />
      <div className="min-h-screen">
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/industries/:id" element={<IndustryDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/video-library" element={<VideoLibraryPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
