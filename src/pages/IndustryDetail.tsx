import { useParams, Link } from "react-router-dom";
import { industries } from "../data/websiteData";
import { motion } from "framer-motion";
import { FaArrowLeft, FaIndustry, FaLightbulb, FaCheck } from "react-icons/fa";
import Container from "../components/common/Container";
import { useEffect } from "react";
import SEO from "../components/common/SEO";
import { industrySchema, breadcrumbSchema } from "../seo/schema";

const IndustryDetail = () => {
  const { id } = useParams();
  const industry = industries.find((i) => i.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000510]">
        <h1 className="text-white text-2xl">Industry not found</h1>
        <Link to="/" className="text-gemini-orange ml-4">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#000510] min-h-screen pt-20 lg:pt-28 pb-16">
      <SEO
        title={`${industry.title} Industry`}
        description={industry.description}
        jsonLd={[
          industrySchema({
            title: industry.title,
            description: industry.description,
            path: `/industries/${industry.id}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/#industries" },
            { name: industry.title, path: `/industries/${industry.id}` },
          ]),
        ]}
      />
      <Container className="relative z-10 w-full">
        {/* Header Row: Return Home + Industry Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 lg:mb-8">
          {/* Return Home — hidden on mobile, phone's back button handles it */}
          <div className="hidden md:flex flex-shrink-0">
            <Link
              to="/"
              className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all backdrop-blur-md"
            >
              <FaArrowLeft className="text-gemini-orange text-sm group-hover:-translate-x-1 transition-transform" />
              <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">
                Return <span className="text-gray-500 text-[11px]">Home</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
          {/* Column 1: Subtitle & Description */}
          <div className="lg:col-span-4 flex flex-col items-start pt-2 group">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-3xl xl:text-5xl text-left font-black uppercase tracking-tight leading-tight bg-gradient-to-r from-white via-white to-gemini-orange bg-clip-text text-transparent"
              >
                {industry.title}
              </motion.h1>
              <div className="space-y-4">
                <p className="text-lg lg:text-xl text-gemini-orange font-black uppercase tracking-widest leading-tight text-left">
                  {industry.subtitle}
                </p>
                <p className="text-base lg:text-lg text-gray-400 leading-relaxed font-medium max-w-lg text-left">
                  {industry.description}
                </p>
              </div>
              <div className="text-left">
                <Link
                  to="/contact"
                  className="inline-block bg-white text-gemini-blue hover:bg-gemini-orange hover:text-white font-black py-4 px-12 rounded-xl transition-all shadow-xl uppercase tracking-[0.15em] text-[11px] transform hover:scale-105 active:scale-95"
                >
                  CONSULT OUR EXPERTS
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Key Support (Balanced height) */}
          <div className="lg:col-span-4 bg-[#050B16]/60 backdrop-blur-xl border border-white/5 p-6 xl:p-8 rounded-[40px] shadow-2xl flex flex-col h-auto">
            <h3 className="text-white font-black text-lg xl:text-xl mb-4 lg:mb-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gemini-orange/10 flex items-center justify-center border border-gemini-orange/20 flex-shrink-0">
                <FaLightbulb className="text-gemini-orange" />
              </div>
              <span className="uppercase tracking-widest">KEY SUPPORT</span>
            </h3>
            <div className="space-y-2 flex-grow">
              {industry.support.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="group flex items-start gap-4 cursor-default min-h-[40px]"
                >
                  <div className="w-7 h-7 rounded-full border border-white/5 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-gemini-orange group-hover:bg-gemini-orange/10 transition-all duration-300">
                    <FaCheck className="text-[10px] text-white/20 group-hover:text-gemini-orange group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] xl:text-[11px] tracking-[0.12em] group-hover:text-white transition-colors duration-300 text-left leading-relaxed py-1">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 3: Impact (Balanced height) */}
          <div className="lg:col-span-4 bg-[#00152F]/60 backdrop-blur-xl border border-white/5 p-6 xl:p-8 rounded-[40px] shadow-2xl flex flex-col h-auto">
            <h3 className="text-white font-black text-lg xl:text-xl mb-4 lg:mb-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gemini-blue/10 flex items-center justify-center border border-gemini-blue/20 flex-shrink-0">
                <FaIndustry className="text-gemini-blue" />
              </div>
              <span className="uppercase tracking-widest">
                STRATEGIC IMPACT
              </span>
            </h3>
            <div className="space-y-2 flex-grow">
              {industry.impact.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="group flex items-start gap-4 cursor-default min-h-[40px]"
                >
                  <div className="w-7 h-7 rounded-full border border-white/5 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-gemini-blue group-hover:bg-gemini-blue/10 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-gemini-blue/40 group-hover:bg-gemini-orange group-hover:shadow-[0_0_10px_rgba(253,142,24,0.6)] transition-all duration-300" />
                  </div>
                  <span className="font-bold text-[11px] xl:text-[12px] text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left leading-relaxed py-1">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default IndustryDetail;
