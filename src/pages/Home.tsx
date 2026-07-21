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

      {/* Lead-in copy. The H1 ("Your Digital Partner for …") was previously
          followed straight into the section grids, so none of its wording
          appeared in the page body — this restates it in prose and gives the
          heading-heavy sections below some supporting text. */}
      <section className="bg-[#000510] px-6 pb-10 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-gray-300 text-base lg:text-xl leading-relaxed">
            Gemini Nexatech is <strong className="text-white">your digital partner for</strong>{" "}
            custom software, intelligent tracking and industrial IoT. For more
            than 15 years we have helped manufacturing, energy, construction,
            logistics, aviation and oil &amp; gas teams turn complex operational
            problems into dependable systems.
          </p>
          <p className="text-gray-400 text-sm lg:text-lg leading-relaxed">
            Every engagement is delivered end to end by our in-house engineering
            team — discovery and solution design, build and systems integration,
            deployment across your sites, then long-term application support. The
            result is technology you can hand to your operators on day one:
            RFID and RTLS rollouts, GPS and fleet telematics, AI video analytics,
            connected sensors and the enterprise applications that tie them
            together.
          </p>
          <p className="text-gray-400 text-sm lg:text-lg leading-relaxed">
            We work as an extension of your team rather than a vendor at arm's
            length. Projects start with a site walkthrough and a written scope,
            run in short review cycles you can steer, and finish with training,
            documentation and a support agreement. Because we build the software
            and specify the hardware, the two are designed against each other
            from the start — readers, tags, gateways and sensors are chosen for
            the environment they will actually live in, whether that is a
            refinery, a shop floor, a cold store or an airside apron. Our
            engineering team is based in Chennai and supports deployments
            wherever your sites are.
          </p>
          <p className="text-gray-400 text-sm lg:text-lg leading-relaxed">
            Engagements are sized to the problem rather than to a fixed package.
            That might be a short discovery to prove a tracking concept on one
            line before committing capital, a full build and rollout across
            multiple sites, or taking over an existing system that has outgrown
            whoever first installed it. Where you already run an ERP, MES or
            maintenance platform, we integrate with it instead of asking you to
            replace it — the aim is one source of truth, not another dashboard
            your team has to remember to open.
          </p>
        </div>
      </section>

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
