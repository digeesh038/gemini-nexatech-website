import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { useProductsManager } from "./products/ProductsManager";
import { useProductsAnimations } from "./products/ProductsAnimations";

// ── Mobile peek-carousel card ────────────────────────────────────────────────
const MobileProductCard = ({
  product,
  isActive,
}: {
  product: any;
  isActive: boolean;
}) => (
  <div
    className={`relative bg-[#00152F]/60 backdrop-blur-xl rounded-[24px] border transition-all duration-300 p-5 flex flex-col shadow-2xl h-full overflow-hidden ${
      isActive
        ? "border-[#FF8C00]/40 shadow-[0_0_30px_rgba(255,140,0,0.12)]"
        : "border-white/5 opacity-60 scale-95"
    }`}
  >
    {/* Animated bottom tech bar */}
    <div className="absolute bottom-0 left-0 w-full h-[2px] rounded-b-[24px] overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r from-[#FF8C00] to-orange-400 transition-all duration-700 ${isActive ? "w-full" : "w-0"}`}
      />
    </div>

    {/* Icon + Title */}
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center border border-[#FF8C00]/20 flex-shrink-0">
        <product.icon className="text-base text-[#FF8C00]" />
      </div>
      <h3 className="text-base font-black text-white tracking-tight leading-tight">
        {product.title}
      </h3>
    </div>

    {/* Description */}
    <p className="text-gray-400 text-[11px] leading-relaxed mb-3 line-clamp-3">
      {product.desc}
    </p>

    {/* First 2 chips */}
    <div className="flex flex-wrap gap-1.5 mb-4">
      {product.products.slice(0, 2).map((sub: any, i: number) => (
        <div
          key={i}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5"
        >
          <sub.icon className="text-[10px] text-[#FF8C00] flex-shrink-0" />
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider leading-none">
            {sub.name}
          </span>
        </div>
      ))}
      {product.products.length > 2 && (
        <div className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center">
          <span className="text-[10px] font-bold text-white/30 uppercase">
            +{product.products.length - 2}
          </span>
        </div>
      )}
    </div>

    {/* Explore button */}
    <div className="mt-auto">
      <Link
        to={`/products/${product.id}`}
        className="flex items-center gap-1.5 bg-[#FF8C00] text-white font-black text-xs py-2 px-4 rounded-xl shadow-lg active:scale-95 transition-transform w-fit"
      >
        Explore <span>→</span>
      </Link>
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

        {/* ── MOBILE: peek carousel ── */}
        <div className="md:hidden relative z-10">
          {/* Drag / swipe area */}
          <div
            className="relative overflow-hidden"
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
            {/* Peek track: card = 82vw + 8px gap; offset so active card is centred with 9vw peek on left */}
            <div
              className="flex gap-2 transition-transform duration-500 ease-out"
              style={{
                width: `${products.length * 82}vw`,
                transform: `translateX(calc(9vw - ${activeIdx * 82}vw - ${activeIdx * 8}px))`,
              }}
            >
              {products.map((product: any, idx: number) => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ width: "82vw", minHeight: "260px" }}
                >
                  <MobileProductCard
                    product={product}
                    isActive={idx === activeIdx}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots + counter */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {products.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIdx
                    ? "w-5 h-2 bg-[#FF8C00]"
                    : "w-2 h-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Progress bar — only show when auto-play is running (not on last card) */}
          {activeIdx < products.length - 1 && (
            <div className="mx-auto mt-3 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
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

        {/* ── DESKTOP: original grid (md+) ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="product-card group relative h-auto mb-4"
              style={{ perspective: "1000px" }}
            >
              <div className="card-inner w-full h-full relative transition-transform duration-500">
                {/* Main Card Face */}
                <div className="relative w-full h-full bg-[#00152F]/40 backdrop-blur-xl rounded-[32px] border border-white/10 p-6 flex flex-col items-start shadow-2xl overflow-hidden">
                  {/* Digital Blueprint Overlay */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-tech-blueprint opacity-50" />
                  </div>

                  {/* Mouse Glow */}
                  <div className="card-glow absolute w-[100px] h-[100px] bg-white/20 blur-[60px] rounded-full opacity-0 pointer-events-none" />

                  {/* Icon & Title Row */}
                  <div className="flex items-center w-full mb-6 relative h-12">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#FF8C00]/50 transition-colors duration-500">
                        <product.icon className="text-xl text-[#FF8C00]" />
                      </div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF8C00]/30" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight group-hover:text-[#FF8C00] transition-colors leading-none text-center">
                        {product.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-400 text-[16px] leading-relaxed mb-6 text-left w-full">
                    {product.desc}
                  </p>

                  {/* Desktop: show all chips */}
                  <div className="w-full mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.products.map((sub: any, i: number) => (
                        <div
                          key={i}
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 group/chip hover:bg-[#FF8C00]/10 hover:border-[#FF8C00]/30 transition-all cursor-default"
                        >
                          <sub.icon className="text-[11px] flex-shrink-0 text-[#FF8C00]" />
                          <span className="text-[11px] font-bold text-white/70 group-hover/chip:text-white uppercase tracking-wider whitespace-normal leading-tight text-left">
                            {sub.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Tech Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF8C00]/10 overflow-hidden">
                    <div className="w-1/3 h-full bg-[#FF8C00] translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out shadow-[0_0_10px_#FF8C00]" />
                  </div>

                  {/* Desktop hover overlay */}
                  <Link
                    to={`/products/${product.id}`}
                    className="hidden md:flex absolute inset-0 z-20 items-center justify-center bg-[#00152F]/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-md rounded-[32px]"
                  >
                    <span className="bg-white text-gemini-blue font-black py-3 px-8 rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl flex items-center gap-2 whitespace-nowrap">
                      EXPLORE {product.title} <span className="text-xl">→</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Products;
