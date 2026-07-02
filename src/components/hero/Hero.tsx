import { FaPhone, FaPlay } from "react-icons/fa";
import AnimatedServices from "./AnimatedServices";
import heroImage from "../../assets/hero_section_image.jpg";
import { useHeroManager } from "./HeroManager";
import { useHeroAnimations } from "./HeroAnimations";
import { services } from "../../data/websiteData";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onScheduleCall?: () => void;
}

const Hero = ({ onScheduleCall }: HeroProps) => {
  const navigate = useNavigate();
  const { heading, ctas, trustedByLabel, logos, scrollToSection } =
    useHeroManager();

  const [currentIndex, setCurrentIndex] = useState(0);
  const { containerRef, contentRef } = useHeroAnimations();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={containerRef}
        className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden pt-14 sm:pt-20"
      >
        {/* Animated Background Image - Optimized Focus */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={services[currentIndex].image || heroImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ originX: "50%", originY: "50%" }}
            />
          </AnimatePresence>
          {/* Enhanced Overlay for better text readability */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/90 via-black/40 to-black/90" />
          <div className="absolute inset-0 z-[1] bg-black/30" />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8"
        >
          <div className="text-center space-y-6 sm:space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-tight font-inter tracking-[0.3em] uppercase drop-shadow-2xl"
            >
              {heading}
            </motion.h1>

            <div className="flex items-center justify-center">
              <AnimatedServices currentIndex={currentIndex} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-4">
              {ctas.map((cta, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (cta.type === "primary" && onScheduleCall) {
                      onScheduleCall();
                    } else if (cta.href.startsWith("/")) {
                      navigate(cta.href);
                    } else {
                      scrollToSection(cta.href);
                    }
                  }}
                  className={`group relative w-72 sm:w-auto h-14 sm:h-16 px-10 sm:px-14 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 cursor-pointer border-2 shadow-2xl ${
                    cta.type === "primary"
                      ? "bg-gradient-to-r from-gemini-blue via-blue-600 to-blue-700 text-white border-transparent hover:shadow-gemini-blue/40"
                      : "bg-white/5 border-white/20 text-white hover:bg-white hover:text-black hover:border-white"
                  }`}
                >
                  <span className="relative z-10">{cta.label}</span>
                  {cta.type === "primary" ? (
                    <FaPhone className="group-hover:animate-ring transition-all rotate-90 duration-300 text-sm sm:text-base relative z-10" />
                  ) : (
                    <FaPlay className="group-hover:animate-play-pulse transition-all duration-300 text-[10px] sm:text-xs relative z-10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-[#011C3D] to-[#000A16] py-8 sm:py-12 border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 relative overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0047AB] via-[#0066CC] to-[#0047AB]"></div>
              <h3 className="relative z-10 text-xs sm:text-sm lg:text-base font-black text-white px-8 py-3 whitespace-nowrap drop-shadow-md uppercase tracking-[0.2em]">
                {trustedByLabel}
              </h3>
            </div>

            <div className="flex-1 overflow-hidden relative w-full">
              <div className="flex animate-scroll-left">
                {[...logos, ...logos, ...logos].map((logo, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-2 sm:p-3 flex-shrink-0 flex items-center justify-center border border-white/10 hover:shadow-[0_0_30px_rgba(253,142,24,0.4)] transition-all duration-500 w-32 h-20 sm:w-40 sm:h-24 lg:w-56 lg:h-32 mx-4 sm:mx-6 lg:mx-8 overflow-hidden"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="w-full h-full object-contain scale-105 filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-115 mix-blend-multiply brightness-[1.1] contrast-[1.3]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
