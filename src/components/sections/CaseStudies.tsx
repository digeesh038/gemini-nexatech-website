import { motion } from "framer-motion";
import { CASE_STUDIES } from "./casestudies/caseStudiesData";
import Container from "../common/Container";

const CaseStudies = () => {
  // Duplicate the array for a seamless infinite loop
  const duplicatedStudies = [...CASE_STUDIES, ...CASE_STUDIES];

  return (
    <section
      id="cases"
      className="py-12 lg:py-24 bg-[#000510] overflow-hidden border-t border-white/5"
    >
      <Container>
        <div className="text-center mb-8 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-[#FF8C00] font-bold text-xs tracking-[0.2em] uppercase">
              Proven Performance
            </span>
          </motion.div>
          <h2 className="text-3xl lg:text-6xl font-black text-white mb-4 lg:mb-6 tracking-tight">
            Success{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-blue-400">
              Stories
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how Gemini Nexatech is transforming operations for global
            industries.
          </p>
        </div>
      </Container>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedStudies.map((study, index) => (
            <div
              key={`${study.id}-${index}`}
              className="inline-block w-[280px] sm:w-[450px] mx-3 whitespace-normal"
            >
              <div className="h-full bg-[#00152F]/40 backdrop-blur-md rounded-[24px] border border-white/10 p-5 lg:p-8 hover:border-[#0047AB]/50 transition-all duration-500 hover:bg-[#00152F]/60 group/card relative overflow-hidden flex flex-col">
                {/* Glow Effect */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${study.color} opacity-0 group-hover/card:opacity-20 blur-[50px] transition-opacity duration-700`}
                />

                <div className="flex items-start justify-between mb-4 lg:mb-8">
                  <div
                    className={`w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center text-white text-lg lg:text-2xl shadow-lg`}
                  >
                    <study.icon />
                  </div>
                  <div className="text-right">
                    <span className="text-[#FF8C00] font-black text-lg lg:text-2xl block">
                      {study.impact.split(" ")[0]}
                    </span>
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                      {study.impact.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-1 block">
                    Client: {study.client}
                  </span>
                  <h3 className="text-base lg:text-xl font-bold text-white group-hover/card:text-[#0047AB] transition-colors">
                    {study.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6">
                  {study.desc}
                </p>

                <div className="mt-auto flex items-center gap-2 text-[#0047AB] font-bold text-xs uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                  Detailed Report <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .filter-grayscale { filter: grayscale(1); }
        .filter-grayscale:hover { filter: grayscale(0); }
      `,
        }}
      />
    </section>
  );
};

export default CaseStudies;
