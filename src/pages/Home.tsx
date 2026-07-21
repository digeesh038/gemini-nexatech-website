import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/hero/Hero";
import Stats from "../components/sections/Stats";
import Services from "../components/sections/Services";
import Products from "../components/sections/Products";
import CaseStudies from "../components/sections/CaseStudies";
import Industries from "../components/sections/Industries";
import ScheduleCallModal from "../components/common/ScheduleCallModal";
import SectionDivider from "../components/common/SectionDivider";
import SEO from "../components/common/SEO";

const Home = () => {
  const { hash } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <main>
      <SEO
        title="Gemini Nexatech - Where Ideas Meet Innovation"
        description="Gemini Nexatech is a leading provider of innovative digital solutions, specialized engineering, and technical consultancy services. Transforming ideas into reality."
      />
      <div className="relative">
        <Hero onScheduleCall={() => setIsModalOpen(true)} />
      </div>

      <Stats />

      <SectionDivider direction="right" />
      <section id="services">
        <Services />
      </section>

      <SectionDivider direction="left" />
      <section id="products">
        <Products />
      </section>

      <SectionDivider direction="both" />
      <section id="industries">
        <Industries />
      </section>

      <SectionDivider direction="right" />
      <CaseStudies />

      <ScheduleCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default Home;
