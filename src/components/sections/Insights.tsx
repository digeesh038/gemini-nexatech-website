import Container from "../common/Container";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { useInsightsAnimations } from "./insights/InsightsAnimations";
import { useInsightsManager } from "./insights/InsightsManager";

const Insights = () => {
  const { insights } = useInsightsManager();
  const { containerRef } = useInsightsAnimations();

  return (
    <section
      id="insights"
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#000A16] to-[#011C3D] border-t border-white/10"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tighter">
              KNOWLEDGE <span className="text-gemini-orange">HUB</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">
              Latest Research, Blogs & Videos
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="group bg-[#00152F] rounded-3xl border border-white/10 hover:border-gemini-blue/50 transition-all duration-500 overflow-hidden shadow-2xl relative"
            >
              <div className="h-48 bg-tech-blueprint opacity-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00152F] to-transparent" />
              </div>
              <div className="p-8 -mt-16 relative z-10">
                <div className="inline-block px-3 py-1 rounded-lg bg-gemini-blue text-white text-[10px] font-black uppercase tracking-widest mb-4">
                  {insight.category}
                </div>
                <h3 className="text-xl font-black text-white mb-4 leading-tight group-hover:text-gemini-orange transition-colors">
                  {insight.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic font-medium">
                  "{insight.excerpt}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase">
                    <FaUser className="text-gemini-blue" /> {insight.author}
                  </div>
                  <button aria-label={`Read more about ${insight.title}`} className="text-white hover:text-gemini-orange transition-colors">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Insights;
