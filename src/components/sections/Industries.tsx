import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { useIndustriesManager } from "./industries/IndustriesManager";
import { useIndustriesAnimations } from "./industries/IndustriesAnimations";

const Industries = () => {
  const { industries } = useIndustriesManager();
  const { containerRef } = useIndustriesAnimations();

  return (
    <section
      id="industries-section"
      ref={containerRef}
      className="bg-[#000510] relative overflow-hidden flex flex-col lg:min-h-screen"
    >
      {/* Header Area */}
      <div className="pt-10 lg:pt-24 pb-6 lg:pb-16 relative z-10 px-4 text-center">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="text-[#FF8C00] font-bold text-xs tracking-[0.2em] uppercase">
                Industries We Serve
              </span>
            </motion.div>
            <h2 className="text-2xl lg:text-5xl xl:text-6xl font-black text-white mb-3 lg:mb-6 tracking-tight leading-tight">
              Empowering Growth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-orange-400">
                Across Industries
              </span>
            </h2>
            <p className="text-gray-400 text-sm lg:text-xl max-w-2xl mx-auto leading-relaxed">
              We deliver smart security, tracking, and automation solutions
              across industries, protecting people, assets, and operations
              worldwide.
            </p>
          </div>
        </Container>
      </div>

      {/* Cinematic Accordion Area */}
      <div className="flex-grow flex flex-col lg:flex-row w-full h-auto lg:h-[600px] items-stretch overflow-hidden">
        {industries.map((industry: any) => (
          <div
            key={industry.id}
            className="industry-pillar relative group flex-[1] min-h-[130px] lg:min-h-0 cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-[#00152F]"
          >
            {/* Background Image with Parallax Scale */}
            <div className="absolute inset-0 z-0">
              <img
                src={industry.image}
                alt={industry.title}
                className="pillar-image w-full h-full object-cover scale-125 grayscale opacity-40 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-60"
              />
              {/* Color Overlay */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-10 transition-opacity duration-700"
                style={{ backgroundColor: industry.color }}
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#000510]/80 via-transparent to-[#000510]" />
            </div>

            {/* Content Area */}
            <div className="relative z-10 w-full h-full flex flex-col lg:items-center justify-center p-6 lg:p-10 pointer-events-none">
              {/* Vertical Pillar Title (Desktop Only) centered for safety */}
              <div className="pillar-title hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap -rotate-90">
                <h3 className="text-3xl lg:text-4xl font-black text-white/20 uppercase tracking-[0.3em] group-hover:opacity-0 transition-opacity duration-300">
                  {industry.shortTitle}
                </h3>
              </div>

              {/* Mobile Title Area */}
              <div className="lg:hidden flex items-center justify-between w-full">
                <h3 className="text-base lg:text-3xl font-black text-white uppercase tracking-wider group-hover:text-[#FF8C00] transition-colors">
                  {industry.shortTitle}
                </h3>
                <industry.icon className="text-xl lg:text-4xl text-[#FF8C00] group-hover:scale-110 transition-transform" />
              </div>

              {/* Detailed Content (Reveals on Hover/Scroll Focus) */}
              <div className="pillar-details opacity-0 lg:-translate-x-20 transition-all duration-500 w-full max-w-lg lg:absolute lg:left-12 lg:bottom-12">
                <div className="hidden lg:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md items-center justify-center mb-6 border border-white/20">
                  <industry.icon className="text-2xl text-[#FF8C00]" />
                </div>
                <h3 className="text-2xl lg:text-4xl font-black text-white mb-4 leading-tight">
                  {industry.title}
                </h3>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                  {industry.desc}
                </p>
                <Link
                  to={`/industries/${industry.id}`}
                  className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-[#FF8C00] hover:text-white transition-all transform active:scale-95 inline-block pointer-events-auto"
                >
                  View Solution
                </Link>
              </div>
            </div>

            {/* Active Indicator (Bottom Bar) */}
            <div className="absolute bottom-0 left-0 h-1 bg-[#FF8C00] w-0 group-hover:w-full transition-all duration-700" />
          </div>
        ))}
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-[#0047AB]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF8C00]/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default Industries;
