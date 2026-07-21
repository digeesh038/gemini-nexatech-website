import { useParams, Link } from "react-router-dom";
import { services } from "../data/websiteData";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import Container from "../components/common/Container";
import { useEffect, useState } from "react";
import SEO from "../components/common/SEO";
import { serviceSchema, breadcrumbSchema } from "../seo/schema";

/* ─────────────────────────────────────────────
   AccordionImages — Industries-style expand panels
   ───────────────────────────────────────────── */
const AccordionImages = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const count = Math.min(images.length, 3);
  const imgs = images.slice(0, count);

  return (
    <div
      className="flex gap-2 h-[220px] md:h-[360px] lg:h-[420px] w-full rounded-2xl overflow-hidden"
      onMouseLeave={() => setHovered(null)}
    >
      {imgs.map((src, idx) => {
        const isActive = hovered === idx;
        const isInactive = hovered !== null && hovered !== idx;
        return (
          <div
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            style={{
              flex: isActive ? 3.5 : isInactive ? 0.8 : 1,
              transition: "flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              minWidth: 0,
            }}
          >
            {/* Background Image */}
            <img
              src={src}
              alt={`${title} ${idx + 1}`}
              className="w-full h-full object-cover"
              style={{
                transform: isActive ? "scale(1.05)" : "scale(1.12)",
                filter: isActive ? "grayscale(0%)" : "grayscale(60%)",
                opacity: isInactive ? 0.5 : isActive ? 1 : 0.75,
                transition:
                  "transform 0.8s ease, filter 0.8s ease, opacity 0.6s ease",
              }}
            />

            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              style={{
                opacity: isActive ? 0.4 : 0.7,
                transition: "opacity 0.6s ease",
              }}
            />

            {/* Orange bottom bar — expands on hover */}
            <div
              className="absolute bottom-0 left-0 h-[3px] bg-gemini-orange"
              style={{
                width: isActive ? "100%" : "0%",
                transition: "width 0.7s ease",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000510]">
        <h1 className="text-white text-2xl">Service not found</h1>
        <Link to="/" className="text-gemini-orange ml-4">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#000510] min-h-screen pt-20 lg:pt-24 pb-16 relative overflow-hidden font-inter">
      <SEO
        title={`${service.title} Service`}
        description={service.description}
        jsonLd={[
          serviceSchema({
            title: service.title,
            description: service.description,
            path: `/services/${service.id}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: service.title, path: `/services/${service.id}` },
          ]),
        ]}
      />
      {/* Dynamic Aura Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gemini-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gemini-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 lg:mb-8">
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
          <div className="md:text-right w-full lg:max-w-5xl ml-auto">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl xl:text-5xl font-black uppercase tracking-tight leading-tight bg-gradient-to-r from-white via-white to-gemini-orange bg-clip-text text-transparent"
            >
              {service.title}
            </motion.h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Column 1: Content (Description -> Points -> CTA) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-3 lg:space-y-5 flex flex-col items-start"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed font-medium max-w-xl text-left"
            >
              {service.description}
            </motion.p>

            {/* Key Features */}
            <div className="space-y-3 w-full">
              <h3 className="text-white font-black text-sm md:text-base uppercase tracking-[0.15em] flex items-center gap-3 text-left">
                <span className="w-6 h-1 bg-gemini-orange rounded-full flex-shrink-0" />
                Key Features
              </h3>
              <div className="grid gap-2 md:gap-3 items-start justify-start">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex items-center gap-3 group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gemini-blue group-hover:border-gemini-blue transition-all duration-300">
                      <FaCheck className="text-[10px] text-gemini-orange group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-400 font-bold uppercase text-[10px] md:text-[11px] tracking-wider group-hover:text-white transition-colors text-left">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <Link
                to="/contact"
                className="inline-block bg-white text-gemini-blue hover:bg-gemini-orange hover:text-white font-black py-3 px-10 rounded-xl transition-all shadow-xl uppercase tracking-[0.2em] text-[10px] transform hover:scale-105 active:scale-95"
              >
                CONSULT OUR EXPERTS
              </Link>
            </motion.div>
          </motion.div>

          {/* Column 2: Accordion Image Gallery (Industries-style) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mt-2 lg:mt-0"
          >
            {service.images && service.images.length > 0 ? (
              <AccordionImages images={service.images} title={service.title} />
            ) : (
              /* Placeholder when no images yet */
              <div className="h-[360px] rounded-2xl border-2 border-white/10 bg-white/5 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gemini-blue/20 border border-gemini-blue/30 flex items-center justify-center">
                  <span className="text-gemini-blue text-2xl">📷</span>
                </div>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                  Images Coming Soon
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceDetail;
