import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Container from "../common/Container";
import { servicesData } from "./services/servicesData";
import { useServicesAnimations } from "./services/ServicesAnimations";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollDir, setScrollDir] = useState<1 | -1>(1); // 1 = down, -1 = up

  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const oldContentRef = useRef<HTMLDivElement>(null);
  const newContentRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onTabChange = (index: number) => {
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
  };

  const { containerRef, tabsRef, syncScrollToTab } = useServicesAnimations(
    activeIndex,
    previousIndex,
    servicesData.length,
    onTabChange,
    headerRef,
    cardRef,
    oldContentRef,
    newContentRef,
    scanlineRef,
    (_, direction) => setScrollDir(direction as 1 | -1),
  );

  const activeService = servicesData[activeIndex];
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isMobile || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % servicesData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  // ─── MOBILE ───────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        id="services-section"
        className="bg-[#000510] py-8 px-4 overflow-hidden"
      >
        <Container>
          <div className="text-center mb-6">
            <span className="text-[#FF8C00] font-bold text-xs tracking-[0.3em] uppercase mb-1 block">
              Our Expertise
            </span>
            <h2 className="text-2xl font-black text-white">Our Services</h2>
          </div>

          <div
            className="relative"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50)
                    setActiveIndex((prev) => (prev + 1) % servicesData.length);
                  else if (info.offset.x > 50)
                    setActiveIndex(
                      (prev) =>
                        (prev - 1 + servicesData.length) % servicesData.length,
                    );
                }}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-[#00152F]/60 backdrop-blur-xl rounded-[28px] border border-white/10 p-4 flex flex-col items-center text-center shadow-2xl cursor-grab active:cursor-grabbing touch-none"
              >
                <div className="w-10 h-10 bg-[#FF8C00]/10 rounded-xl flex items-center justify-center mb-2 border border-[#FF8C00]/20 pointer-events-none">
                  <activeService.icon className="text-base text-[#FF8C00]" />
                </div>
                <h3 className="text-base font-black text-white mb-1.5 uppercase tracking-tight pointer-events-none">
                  {activeService.title}
                </h3>
                <p className="text-gray-400 text-[11px] leading-relaxed mb-2 px-1 pointer-events-none line-clamp-3">
                  {activeService.desc}
                </p>
                <div className="space-y-1.5 mb-3 w-full max-w-[260px] pointer-events-none">
                  {activeService.points.slice(0, 2).map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-left"
                    >
                      <FaCheckCircle className="text-[#FF8C00] text-[10px] flex-shrink-0" />
                      <span className="text-white/80 text-[10px] font-medium uppercase tracking-wider leading-tight">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pointer-events-auto">
                  <Link
                    to={`/services/${activeService.id}`}
                    className="px-6 py-2 bg-white text-[#0047AB] text-xs font-bold rounded-xl hover:bg-[#FF8C00] hover:text-white transition-all active:scale-95 shadow-lg block w-fit mx-auto"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-4">
              {servicesData.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === idx ? "w-8 bg-[#FF8C00]" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // ─── DESKTOP ──────────────────────────────────────────────────────
  return (
    <section
      id="services-section"
      ref={containerRef}
      className="bg-[#000510] relative overflow-hidden flex flex-col items-center justify-center min-h-[100dvh] pt-[40px] lg:pt-[40px]"
    >
      {/* ── Header: heading + skip buttons — ALWAYS VISIBLE ── */}
      <div
        ref={headerRef}
        className="px-4 mb-1 lg:mb-3 relative z-10 w-full text-center"
      >
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[#FF8C00] font-bold text-xs tracking-[0.2em] uppercase">
                Future-Ready Solutions
              </span>
            </div>

            {/* Heading row + ONE conditional skip button */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Smart Tech{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-orange-400">
                  Solutions
                </span>
              </h2>

              {/* Single skip button — changes based on scroll direction */}
              {scrollDir === 1 ? (
                <button
                  onClick={() =>
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-4 py-2 rounded-xl bg-[#FF8C00]/10 border border-[#FF8C00]/25 text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Skip to Products ↓
                </button>
              ) : (
                <button
                  onClick={() =>
                    document
                      .getElementById("hero")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300"
                >
                  ↑ Skip to Top
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main Card ── */}
      <Container>
        <div
          ref={cardRef}
          className="relative z-10 bg-[#00152F]/40 backdrop-blur-md rounded-[24px] lg:rounded-[40px] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,71,171,0.2)] will-change-transform mb-8"
        >
          {/* Tab Bar */}
          <div className="bg-[#000510]/90 border-b border-white/10 p-2 lg:p-3 relative overflow-hidden">
            <div
              className="flex lg:grid lg:grid-cols-12 gap-1 relative overflow-x-auto lg:overflow-x-visible no-scrollbar snap-x snap-mandatory"
              ref={tabsRef}
            >
              <div
                className="active-tab-pill absolute bg-gradient-to-br from-[#0047AB] to-[#002152] rounded-xl shadow-[0_0_20px_rgba(0,71,171,0.6)] border border-white/20 pointer-events-none z-0"
                style={{ width: 0, height: 0, opacity: 0 }}
              >
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0047AB]" />
              </div>

              {servicesData.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => syncScrollToTab(index)}
                  className={`relative flex-shrink-0 min-w-[100px] lg:min-w-0 flex flex-col items-center cursor-pointer justify-center py-2 lg:py-3 px-3 rounded-xl transition-all duration-300 group snap-center tab-btn-${index} ${
                    activeIndex === index ? "z-10" : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`tab-content-${index} flex flex-col items-center pointer-events-none`}
                  >
                    <service.icon
                      className={`text-base lg:text-xl mb-1.5 transition-colors duration-300 ${
                        activeIndex === index
                          ? "text-[#FF8C00]"
                          : "text-white/50 group-hover:text-white/100"
                      }`}
                    />
                    <span
                      className={`text-[9px] lg:text-[11px] font-bold uppercase tracking-tight text-center leading-[1.2] transition-colors duration-300 px-1 line-clamp-2 min-h-[2.4em] flex items-center justify-center ${
                        activeIndex === index
                          ? "text-white"
                          : "text-white/50 group-hover:text-white/100"
                      }`}
                    >
                      {service.title.split(" ")[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 lg:p-8 relative overflow-hidden">
            <div
              ref={scanlineRef}
              className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-[#FF8C00]/40 to-transparent z-20 pointer-events-none hidden"
              style={{ boxShadow: "0 0 40px rgba(255, 140, 0, 0.4)" }}
            />

            {/* Old content (for transition) */}
            <div
              key={`old-${previousIndex}`}
              className="absolute inset-0 p-5 lg:p-8"
              ref={oldContentRef}
            >
              <div className="w-full h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-10 opacity-0" />
            </div>

            {/* Active content */}
            <div
              key={`new-${activeIndex}`}
              className="relative z-10 w-full h-full"
              ref={newContentRef}
            >
              <div className="w-full h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
                {/* Left: Text */}
                <div className="flex-1 text-left relative z-10 w-full">
                  {/* Icon + Title in ONE row */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-11 h-11 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-xl flex-shrink-0">
                      <activeService.icon className="text-xl lg:text-2xl text-[#FF8C00]" />
                    </div>
                    <h2 className="text-xl lg:text-2xl xl:text-3xl font-black text-white leading-tight drop-shadow-lg">
                      {activeService.title}
                    </h2>
                  </div>

                  <p className="text-gray-300 text-sm lg:text-base mb-4 leading-relaxed max-w-xl opacity-90">
                    {activeService.desc}
                  </p>

                  {/* Only 2 bullet points */}
                  <div className="grid grid-cols-1 gap-2.5 mb-6">
                    {activeService.points.slice(0, 2).map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 group/point"
                      >
                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#FF8C00]/20 flex items-center justify-center border border-[#FF8C00]/30 group-hover/point:bg-[#FF8C00] transition-colors duration-300 flex-shrink-0">
                          <FaCheckCircle className="text-[12px] text-[#FF8C00] group-hover/point:text-white" />
                        </div>
                        <span className="text-white/90 text-[13px] lg:text-[15px] font-medium tracking-wide">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/services/${activeService.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-3.5 bg-white text-[#0047AB] font-bold rounded-xl lg:rounded-2xl hover:bg-[#FF8C00] hover:text-white transition-all duration-300 active:scale-95 shadow-lg"
                  >
                    Learn More <span className="text-xl">→</span>
                  </Link>
                </div>

                {/* Right: Fixed-size image */}
                <div className="flex-shrink-0 w-full lg:w-[400px] xl:w-[440px]">
                  <div
                    className={`rounded-[24px] lg:rounded-[32px] overflow-hidden border-4 border-white/10 shadow-2xl bg-gradient-to-br ${activeService.gradient}`}
                  >
                    <img
                      src={activeService.image}
                      alt={activeService.title}
                      className="w-full h-[230px] lg:h-[290px] object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
