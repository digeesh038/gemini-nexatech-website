import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/common/Container";
import { coreValues } from "../data/websiteData";
import {
  FaRocket,
  FaEye,
  FaGem,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stats from "../components/sections/Stats";
import SectionDivider from "../components/common/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const journeyData = [
    {
      year: "2026",
      description:
        "In 2026, we cemented our position as global leaders in AI-driven industrial safety and operational excellence, expanding our R&D horizons to next-gen robotics.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2025",
      description:
        "In 2025, we earned multiple prestigious industry recognitions, including Top Flutter Developers and Top Robotics Company, cementing our position as a global leader.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071",
    },
    {
      year: "2024",
      description:
        "Successfully deployed integrated security systems for major international airports and expanded our footprint in the aviation sector.",
      image:
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2023",
      description:
        "Opened our strategic hub in Dubai to meet growing tech demands in the Middle East and launched next-gen RTLS platforms.",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea4e7388814?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2022",
      description:
        "Formed key global alliances with cloud providers, enabling massive scalability for our enterprise clients.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    },
    {
      year: "2021",
      description:
        "Released our ultra-accurate centimeter-level RTLS platform, revolutionizing indoor asset tracking.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2020",
      description:
        "Ensured operational continuity for clients worldwide during the global shift, specializing in remote monitoring.",
      image:
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2019",
      description:
        "Launched green-tech initiatives and eco-friendly monitoring solutions, aligning tech with sustainability.",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2018",
      description:
        "Named 'Most Innovative Tech Partner' in the Oil & Gas sector, recognizing our specialized safety solutions.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2017",
      description:
        "Fully integrated advanced AI and predictive analytics into our core tracking and safety product offerings.",
      image:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2016",
      description:
        "Kicked off international operations with major industrial projects across Europe and South East Asia.",
      image:
        "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2015",
      description:
        "Established a state-of-the-art R&D center focused exclusively on IoT and sensor-based technologies.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2014",
      description:
        "Delivered our first enterprise-grade tracking solution for a regional logistics leader, proving our core tech.",
      image:
        "https://images.unsplash.com/photo-1519003722824-192d992a6058?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2013",
      description:
        "Gemini Nexatech founded with a bold vision to transform industrial operations through innovative technology.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2012",
      description:
        "Gemini Nexatech founded with a bold vision to transform industrial operations through innovative technology.",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea4e7388814?auto=format&fit=crop&q=80&w=2070",
    },
    {
      year: "2011",
      description:
        "Gemini Nexatech founded with a bold vision to transform industrial operations through innovative technology.",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea4e7388814?auto=format&fit=crop&q=80&w=2072",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setActiveIndex((i) => Math.min(journeyData.length - 1, i + 1));

  return (
    <div
      ref={sectionRef}
      className="bg-[#000510] min-h-screen pt-20 pb-10 overflow-hidden font-inter"
    >
      {/* ── Hero Section ── */}
      <section className="relative py-4 lg:py-6">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-gemini-blue/10 to-transparent -z-10" />
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="typo-section text-gemini-orange mb-4 block"
            >
              Our Legacy
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="typo-heading mb-8"
            >
              WE ARE <span className="text-gemini-blue uppercase">GEMINI</span>{" "}
              <span className="text-gemini-orange uppercase">NEXATECH</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="typo-body uppercase opacity-80"
            >
              Empowering businesses with innovative technology solutions that
              drive efficiency, safety, and growth across industries worldwide.
            </motion.p>
          </div>
        </Container>
      </section>

      <Stats />

      <SectionDivider direction="both" />

      {/* ── Mission / Vision ── */}
      <section className="py-8 lg:py-12 bg-[#000510] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gemini-blue/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gemini-orange/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#001D3D]/50 to-transparent border border-white/5 hover:border-gemini-blue/30 transition-all duration-700 shadow-2xl overflow-hidden"
            >
              {/* Hide giant icon on mobile */}
              <div className="hidden lg:block absolute -top-10 -right-10 p-12 text-gemini-blue/30 text-[12rem] transition-all duration-1000 group-hover:text-gemini-blue/50 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                <FaRocket />
              </div>
              {/* Small icon visible on mobile */}
              <div className="flex items-center gap-3 mb-3 lg:hidden">
                <div className="w-9 h-9 rounded-xl bg-gemini-blue/20 flex items-center justify-center border border-gemini-blue/30">
                  <FaRocket className="text-gemini-blue text-base" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4 lg:mb-6">
                  <div className="w-12 h-1.5 bg-gemini-blue rounded-full" />
                  <h3 className="typo-section">MISSION</h3>
                </div>
                <p className="typo-body italic text-sm lg:text-base leading-relaxed">
                  "Empowering businesses with innovative technology solutions
                  that drive efficiency, safety, and growth across industries
                  worldwide."
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#001D3D]/30 to-transparent border border-white/5 hover:border-gemini-orange/30 transition-all duration-700 shadow-2xl overflow-hidden"
            >
              <div className="hidden lg:block absolute -top-10 -right-10 p-12 text-gemini-orange/30 text-[12rem] transition-all duration-1000 group-hover:text-gemini-orange/50 group-hover:scale-110 group-hover:rotate-12 pointer-events-none">
                <FaEye />
              </div>
              <div className="flex items-center gap-3 mb-3 lg:hidden">
                <div className="w-9 h-9 rounded-xl bg-gemini-orange/20 flex items-center justify-center border border-gemini-orange/30">
                  <FaEye className="text-gemini-orange text-base" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4 lg:mb-6">
                  <div className="w-12 h-1.5 bg-gemini-orange rounded-full" />
                  <h3 className="typo-section">VISION</h3>
                </div>
                <p className="typo-body text-sm lg:text-base text-white italic leading-relaxed">
                  "To be a global leader in smart, integrated, and sustainable
                  tech solutions that transform operations and create lasting
                  value for our clients and communities."
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <SectionDivider direction="both" />

      {/* ── Core Values ── */}
      <section className="py-10 lg:py-16">
        <Container>
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="typo-heading mb-6">
              Our Core <span className="text-gemini-orange">Values</span>
            </h2>
            <div className="w-24 h-2 bg-gemini-blue mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {coreValues.map((value, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: idx * 0.1,
                }}
                key={idx}
                className="relative p-5 lg:p-10 rounded-[1.5rem] lg:rounded-[2.5rem] bg-[#001D3D]/40 backdrop-blur-xl border border-white/5 hover:border-gemini-blue/50 transition-all duration-700 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gemini-blue/5 blur-3xl rounded-full group-hover:bg-gemini-blue/20 transition-colors" />

                <div className="relative z-10">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-gemini-blue/20 to-gemini-blue/5 flex items-center justify-center mb-3 lg:mb-6 border border-white/5 group-hover:bg-gemini-blue transition-all duration-500 shadow-xl group-hover:rotate-[360deg]">
                    <FaGem className="text-gemini-blue text-base lg:text-2xl group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-sm lg:text-base font-black text-white mb-2 lg:mb-4 group-hover:text-gemini-orange transition-colors leading-tight">
                    {value.title}
                  </h4>
                  <p className="text-[11px] lg:text-sm text-white/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gemini-blue to-gemini-orange group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider direction="both" />

      {/* ── Company Journey ── */}
      <section className="relative overflow-hidden py-6">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={journeyData[activeIndex].image}
              alt={`Journey ${journeyData[activeIndex].year}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover grayscale"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#000510] via-[#000510]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t border-t-2 border-white/10 from-[#000510] via-transparent to-transparent" />
        </div>

        <Container>
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Label */}
            <div className="flex justify-center mb-6">
              <span className="bg-gemini-blue/20 text-blue-400 px-6 py-2 rounded-full typo-tab-heading text-[10px] backdrop-blur-md border border-white/5 uppercase tracking-[0.2em]">
                OUR JOURNEY
              </span>
            </div>

            {/* ── MOBILE Journey UI: prev/next card style ── */}
            <div className="lg:hidden">
              {/* Year + nav row */}
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 active:scale-90 transition-all"
                  aria-label="Previous year"
                >
                  <FaChevronLeft className="text-sm" />
                </button>

                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-white font-black text-6xl tracking-tighter"
                >
                  {journeyData[activeIndex].year}
                </motion.div>

                <button
                  onClick={goNext}
                  disabled={activeIndex === journeyData.length - 1}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 active:scale-90 transition-all"
                  aria-label="Next year"
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </div>

              {/* Description */}
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white/80 text-sm leading-relaxed border-l-2 border-gemini-blue/50 pl-4 mb-6"
              >
                {journeyData[activeIndex].description}
              </motion.p>

              {/* Progress indicator dots */}
              <div className="flex items-center justify-center gap-1.5">
                {journeyData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "w-5 h-2 bg-gemini-blue"
                        : "w-2 h-2 bg-white/20"
                    }`}
                    aria-label={`Go to ${journeyData[idx].year}`}
                  />
                ))}
              </div>

              {/* Counter label */}
              <p className="text-center text-white/40 text-xs font-bold mt-3 uppercase tracking-widest">
                {activeIndex + 1} / {journeyData.length}
              </p>
            </div>

            {/* ── DESKTOP Journey UI: original timeline ── */}
            <div className="hidden lg:block">
              {/* Year Display */}
              <div className="flex justify-center mb-10 border-b border-white/10 pb-8">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-white font-black text-9xl tracking-tighter"
                >
                  {journeyData[activeIndex].year}
                </motion.div>
              </div>

              {/* Heading & Description */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="typo-heading text-3xl lg:text-5xl leading-[1.1] text-white"
                >
                  Over 15+ Years of Innovation to Help Businesses Thrive!
                </motion.h2>

                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="typo-body text-xl lg:text-lg opacity-80 leading-relaxed border-l border-gemini-blue/30 pl-6">
                    {journeyData[activeIndex].description}
                  </p>
                </motion.div>
              </div>

              {/* Timeline Selector */}
              <div className="mt-12 lg:mt-16">
                <div className="relative">
                  <div className="absolute bottom-[16px] left-0 w-full h-[2px] bg-white/10" />
                  <motion.div
                    className="absolute bottom-[16px] left-0 h-[2px] bg-gemini-blue z-10"
                    animate={{
                      width: `${(activeIndex / (journeyData.length - 1)) * 100}%`,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                  <div className="flex justify-between relative z-20">
                    {journeyData.map((item, idx) => (
                      <button
                        key={item.year}
                        onClick={() => setActiveIndex(idx)}
                        className="group flex flex-col items-center cursor-pointer outline-none"
                      >
                        <motion.span
                          className={`typo-tab-heading text-xs mb-4 transition-all duration-300 ${
                            idx === activeIndex
                              ? "text-white scale-125 font-black"
                              : "text-white/40 group-hover:text-white/70"
                          }`}
                        >
                          {item.year}
                        </motion.span>
                        <div
                          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                            idx === activeIndex
                              ? "bg-white border-gemini-blue scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                              : "bg-[#000510] border-white/20 group-hover:border-white/50"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
