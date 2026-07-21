import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { useProductsManager } from "./products/ProductsManager";
import { useProductsAnimations } from "./products/ProductsAnimations";

/**
 * One card for both breakpoints — a peek-carousel slide under md, a grid tile
 * at md+. Rendering a separate mobile and desktop card put every title and
 * description in the HTML twice; the layout switch now lives in App.css
 * (`.pd-*` rules) instead of in duplicated markup.
 */
const ProductCard = ({
  product,
  isActive,
}: {
  product: any;
  isActive: boolean;
}) => (
  <div
    className="product-card group relative h-full md:h-auto md:mb-4"
    style={{ perspective: "1000px" }}
  >
    <div className="card-inner w-full h-full relative transition-transform duration-500">
      <div
        data-active={isActive}
        className="pd-card relative w-full h-full bg-[#00152F]/60 md:bg-[#00152F]/40 backdrop-blur-xl rounded-[24px] md:rounded-[32px] border p-5 md:p-6 flex flex-col items-start shadow-2xl overflow-hidden"
      >
        {/* Digital blueprint overlay — desktop only */}
        <div className="hidden md:block absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-tech-blueprint opacity-50" />
        </div>

        {/* Mouse glow — desktop only */}
        <div className="card-glow hidden md:block absolute w-[100px] h-[100px] bg-white/20 blur-[60px] rounded-full opacity-0 pointer-events-none" />

        {/* Icon + title. Inline row on mobile, centred overlay at md+. */}
        <div className="flex items-center gap-3 md:gap-0 w-full mb-3 md:mb-6 relative md:h-12">
          <div className="relative z-10">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#FF8C00]/10 md:bg-white/5 flex items-center justify-center border border-[#FF8C00]/20 md:border-white/10 md:group-hover:border-[#FF8C00]/50 transition-colors duration-500 flex-shrink-0">
              <product.icon className="text-base md:text-xl text-[#FF8C00]" />
            </div>
            <div className="hidden md:block absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF8C00]/30" />
          </div>

          <h3 className="text-base md:text-xl lg:text-2xl font-black text-white tracking-tight leading-tight md:leading-none md:absolute md:inset-0 md:flex md:items-center md:justify-center md:text-center md:pointer-events-none md:group-hover:text-[#FF8C00] md:transition-colors">
            {product.title}
          </h3>
        </div>

        <p className="text-gray-400 text-[11px] md:text-[16px] leading-relaxed mb-3 md:mb-6 line-clamp-3 md:line-clamp-none text-left w-full">
          {product.desc}
        </p>

        {/* Sub-product chips. Mobile shows the first two plus a "+N" badge;
            md+ shows the full set. */}
        <div className="w-full mb-4">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {product.products.map((sub: any, i: number) => (
              <div
                key={i}
                className={`${
                  i > 1 ? "hidden md:flex" : "flex"
                } px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white/5 border border-white/10 items-center gap-1.5 md:gap-2 group/chip md:hover:bg-[#FF8C00]/10 md:hover:border-[#FF8C00]/30 transition-all cursor-default`}
              >
                <sub.icon className="text-[10px] md:text-[11px] text-[#FF8C00] flex-shrink-0" />
                <span className="text-[10px] md:text-[11px] font-bold text-white/70 group-hover/chip:text-white uppercase tracking-wider whitespace-normal leading-tight md:leading-tight text-left">
                  {sub.name}
                </span>
              </div>
            ))}
            {product.products.length > 2 && (
              <div className="md:hidden px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center">
                <span className="text-[10px] font-bold text-white/30 uppercase">
                  +{product.products.length - 2}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile progress underline */}
        <div className="md:hidden absolute bottom-0 left-0 w-full h-[2px] rounded-b-[24px] overflow-hidden">
          <div className="pd-underline h-full bg-gradient-to-r from-[#FF8C00] to-orange-400" />
        </div>

        {/* Desktop bottom tech bar */}
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-1 bg-[#FF8C00]/10 overflow-hidden">
          <div className="w-1/3 h-full bg-[#FF8C00] translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out shadow-[0_0_10px_#FF8C00]" />
        </div>

        {/* A single link per card: an inline pill on mobile, a full-card hover
            overlay at md+. One <a> keeps each anchor text unique per product. */}
        <Link
          to={`/products/${product.id}`}
          className="mt-auto flex items-center gap-1.5 bg-[#FF8C00] text-white font-black text-xs py-2 px-4 rounded-xl shadow-lg active:scale-95 transition-transform w-fit
            md:mt-0 md:w-auto md:absolute md:inset-0 md:z-20 md:justify-center md:gap-0 md:bg-[#00152F]/90 md:p-0 md:rounded-[32px] md:shadow-none md:backdrop-blur-md md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible md:transition-all md:duration-300"
        >
          <span className="flex items-center gap-2 md:bg-white md:text-gemini-blue md:font-black md:py-3 md:px-8 md:rounded-xl md:translate-y-4 md:group-hover:translate-y-0 md:transition-all md:duration-300 md:shadow-xl md:whitespace-nowrap">
            Explore {product.title} <span className="text-lg md:text-xl">→</span>
          </span>
        </Link>
      </div>
    </div>
  </div>
);

const Products = () => {
  const { products } = useProductsManager();
  const { containerRef } = useProductsAnimations();

  // ── Mobile carousel state ─────────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev >= products.length - 1) {
          // reached last card — stop auto-play
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
  }, [products.length]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, startTimer]);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    startTimer(); // reset timer on manual nav
  };

  return (
    <section
      id="products"
      ref={containerRef}
      className="pt-8 lg:pt-12 pb-10 lg:pb-24 bg-[#000510] relative overflow-hidden"
    >
      {/* Background Tech Elements — desktop only */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0047AB] to-transparent animate-pulse" />
      </div>

      <Container>
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 lg:mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-[#FF8C00] font-bold text-xs tracking-[0.2em] uppercase">
              Technology Solutions
            </span>
          </motion.div>

          <h2 className="text-3xl lg:text-6xl font-black text-white mb-3 lg:mb-4 tracking-tight">
            Advanced Smart{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-orange-400">
              Technology
            </span>
          </h2>
          <p className="text-gray-400 text-sm lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Cutting-edge intelligent technologies designed to enhance
            visibility, automation and operational efficiency across industries.
          </p>
        </div>

        <div className="relative z-10">
          {/* Swipe area (mobile) / plain wrapper (md+) */}
          <div
            className="pd-viewport relative"
            onTouchStart={(e) => {
              setIsPaused(true);
              setDragStartX(e.touches[0].clientX);
            }}
            onTouchEnd={(e) => {
              const diff = dragStartX - e.changedTouches[0].clientX;
              if (diff > 40) goTo(Math.min(activeIdx + 1, products.length - 1));
              else if (diff < -40) goTo(Math.max(activeIdx - 1, 0));
              setTimeout(() => setIsPaused(false), 800);
            }}
          >
            {/* Peek track: card = 82vw + 8px gap; offset so the active card is
                centred with a 9vw peek on the left. Becomes a grid at md+. */}
            <div
              className="pd-track"
              style={
                {
                  "--pd-track-w": `${products.length * 82}vw`,
                  "--pd-track-x": `calc(9vw - ${activeIdx * 82}vw - ${activeIdx * 8}px)`,
                } as React.CSSProperties
              }
            >
              {products.map((product: any, idx: number) => (
                <div key={product.id} className="pd-item">
                  <ProductCard product={product} isActive={idx === activeIdx} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots + counter — mobile only */}
          <div className="md:hidden flex items-center justify-center gap-1.5 mt-5">
            {products.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? "w-10 h-3 bg-[#FF8C00]"
                      : "w-3 h-3 bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Progress bar — only while auto-play is running (not on last card) */}
          {activeIdx < products.length - 1 && (
            <div className="md:hidden mx-auto mt-3 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  className="h-full bg-[#FF8C00] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "0%" : "100%" }}
                  transition={{ duration: isPaused ? 0 : 4, ease: "linear" }}
                />
              </AnimatePresence>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Products;
