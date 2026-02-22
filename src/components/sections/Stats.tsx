import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "../common/Container";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { numericValue: 15, suffix: "+", label: "Years of Excellence" },
  { numericValue: 100, suffix: "+", label: "Empowered Clients" },
  { numericValue: 10, suffix: "+", label: "Countries Served" },
  { numericValue: 30, suffix: "+", label: "Tech Engineers" },
];

// ── Desktop card (unchanged) ──────────────────────────────────────────────────
const StatCard = ({
  numericValue,
  suffix,
  label,
}: {
  numericValue: number;
  suffix: string;
  label: string;
}) => (
  <div className="relative group">
    <div className="bg-gradient-to-b from-[#0047AB] to-[#002861] p-8 rounded-[2rem] border border-white/10 group-hover:border-gemini-blue/50 transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(0,71,171,0.5)] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-500 rounded-full" />
      <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500 flex items-baseline gap-1">
        <span className="stat-number" data-target={numericValue}>
          0
        </span>
        <span className="text-gemini-orange">{suffix}</span>
      </div>
      <div className="text-blue-100/70 text-center leading-tight font-bold uppercase tracking-wider text-xs">
        {label}
      </div>
    </div>
  </div>
);

// ── Mobile compact card ───────────────────────────────────────────────────────
const StatCardMobile = ({
  numericValue,
  suffix,
  label,
}: {
  numericValue: number;
  suffix: string;
  label: string;
}) => (
  <div className="bg-gradient-to-b from-[#0047AB] to-[#002861] rounded-2xl border border-white/10 p-4 flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 rounded-full" />
    <div className="text-3xl font-black text-white mb-1 tracking-tighter flex items-baseline gap-0.5">
      <span className="stat-number-mobile" data-target={numericValue}>
        0
      </span>
      <span className="text-gemini-orange">{suffix}</span>
    </div>
    <div className="text-blue-100/60 text-center leading-tight font-bold uppercase tracking-wide text-[10px]">
      {label}
    </div>
  </div>
);

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Desktop counters
      const counts = gsap.utils.toArray<HTMLElement>(".stat-number");
      counts.forEach((count) => {
        const target = parseInt(count.getAttribute("data-target") || "0", 10);
        gsap.to(count, {
          innerText: target,
          duration: 2.5,
          snap: { innerText: 1 },
          ease: "power4.out",
          scrollTrigger: {
            trigger: count,
            start: "top 90%",
          },
        });
      });

      // Mobile counters
      const mobileCounts = gsap.utils.toArray<HTMLElement>(
        ".stat-number-mobile",
      );
      mobileCounts.forEach((count) => {
        const target = parseInt(count.getAttribute("data-target") || "0", 10);
        gsap.to(count, {
          innerText: target,
          duration: 2.5,
          snap: { innerText: 1 },
          ease: "power4.out",
          scrollTrigger: {
            trigger: count,
            start: "top 90%",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-10 lg:py-16 bg-[#000510]">
      <Container>
        {/* ── Mobile: compact 2×2 grid ── */}
        <div className="sm:hidden w-full bg-[#001D3D]/30 backdrop-blur-xl rounded-[2rem] p-5 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-gemini-blue/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gemini-orange/5 blur-[80px] rounded-full" />
          <div className="grid grid-cols-2 gap-3 relative z-10">
            {STATS.map((stat, idx) => (
              <StatCardMobile
                key={idx}
                numericValue={stat.numericValue}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        {/* ── sm+ (tablet & desktop): original layout ── */}
        <div className="hidden sm:block w-full bg-[#001D3D]/30 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-gemini-blue/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gemini-orange/5 blur-[100px] rounded-full" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STATS.map((stat, idx) => (
              <StatCard
                key={idx}
                numericValue={stat.numericValue}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Stats;
