import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/common/Container";
import {
  FaPlay,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaBox,
  FaBus,
  FaRoute,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import webAppImg from "../assets/services/web_application_development.jpg";

// Auto-converts any YouTube URL format → embed URL
function toEmbedUrl(url: string): string {
  if (!url) return "";
  // Already an embed URL
  if (url.includes("youtube.com/embed/")) return url;
  // youtu.be short link
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // Full watch URL
  const watchMatch = url.match(/[?&]v=([^?&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return url;
}

const softwares = [
  {
    id: 1,
    title: "ProtectEx",
    subtitle: "Ex Inspection & Maintenance Software",
    description:
      "An end-to-end digital platform that safeguards asset integrity through inspections, preventive maintenance, compliance tracking, and real-time equipment health monitoring.",
    icon: FaShieldAlt,
    videoUrl: "https://www.youtube.com/watch?v=l12C53_1u8g",
    image: webAppImg,
  },
  {
    id: 2,
    title: "TrackPro",
    subtitle: "Asset Tracking & Management Software",
    description:
      "A centralized solution delivering real-time asset visibility, lifecycle management, and performance insights to optimize utilization and minimize losses.",
    icon: FaMapMarkerAlt,
    videoUrl: "",
    image: "",
  },
  {
    id: 3,
    title: "Tyre Sense 360",
    subtitle: "Tyre Pressure Monitoring Software",
    description:
      "A smart fleet safety system that continuously monitors tyre pressure and temperature, providing instant alerts and analytics to improve efficiency and extend tyre lifespan.",
    icon: FaTachometerAlt,
    videoUrl: "",
    image: "",
  },
  {
    id: 4,
    title: "CargoVision",
    subtitle: "Container Loading & Monitoring Software",
    description:
      "A digital logistics platform that tracks container loading and monitoring in real time, ensuring accuracy, compliance, accountability, and reduced cargo damage.",
    icon: FaBox,
    videoUrl: "",
    image: "",
  },
  {
    id: 5,
    title: "TrackBus",
    subtitle: "School Transportation Management Software",
    description:
      "A secure transport management system offering real-time vehicle tracking, route optimization, and instant communication to enhance student safety.",
    icon: FaBus,
    videoUrl: "",
    image: "",
  },
  {
    id: 6,
    title: "NexTrace",
    subtitle: "Resource Tracking & Evacuation Management Software",
    description:
      "An intelligent emergency management solution that enables real-time resource tracking and automated evacuation coordination for improved safety and control.",
    icon: FaRoute,
    videoUrl: "",
    image: "",
  },
];

const VideoLibraryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedVideo, setSelectedVideo] = useState<null | {
    title: string;
    subtitle: string;
    url: string;
  }>(null);

  const handleCardClick = (sw: (typeof softwares)[0]) => {
    if (sw.videoUrl) {
      setSelectedVideo({
        title: sw.title,
        subtitle: sw.subtitle,
        url: toEmbedUrl(sw.videoUrl),
      });
    }
  };

  const closeModal = () => setSelectedVideo(null);

  return (
    <div className="bg-[#000510] min-h-screen font-inter">
      {/* ── Header ── */}
      <div className="pt-20 lg:pt-28 pb-6 lg:pb-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="text-[#FF8C00] font-bold text-xs tracking-[0.25em] uppercase">
            Our Software Products
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tight"
        >
          Software{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-orange-400">
            Library
          </span>
        </motion.h1>
      </div>

      {/* ── Cards Grid ── */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
          {softwares.map((sw, idx) => {
            const Icon = sw.icon;
            const hasVideo = Boolean(sw.videoUrl);

            return (
              <motion.div
                key={sw.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleCardClick(sw)}
                className={`group relative bg-white rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,71,171,0.18)] flex flex-col h-full ${hasVideo ? "cursor-pointer" : "cursor-default"}`}
              >
                {/* Image / Placeholder area */}
                <div className="relative w-full h-[160px] md:h-[180px] bg-gradient-to-br from-[#001a3d] to-[#000c1f] overflow-hidden flex-shrink-0">
                  {sw.image ? (
                    <img
                      src={sw.image}
                      alt={sw.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#0047AB]/20 border border-[#0047AB]/30">
                        <Icon className="text-3xl text-[#0047AB]" />
                      </div>
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Play overlay — always visible on mobile, hover-only on desktop */}
                  {hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0047AB] flex items-center justify-center shadow-lg">
                        <FaPlay className="text-white text-sm ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Text content — white background, grows to fill remaining height */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Icon + Title + Badge — one row */}
                  <div className="flex items-center gap-3 mb-2 justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0047AB]/10 border border-[#0047AB]/20">
                        <Icon className="text-lg text-[#0047AB]" />
                      </div>
                      {/* Title — dark navy, all cards */}
                      <h2 className="text-xl text-left font-black text-[#001D3D] tracking-tight line-clamp-1">
                        {sw.title}
                      </h2>
                    </div>

                    {/* Watch Now / Coming Soon badge */}
                    {hasVideo ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0047AB] hover:bg-[#FF8C00] text-white text-[9px] font-black uppercase tracking-widest transition-all duration-300 flex-shrink-0 shadow-md">
                        <FaPlay className="text-[9px] ml-[1px]" />
                        Watch Now
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-[9px] font-black uppercase tracking-widest flex-shrink-0">
                        <FaPlay className="text-[9px] ml-[1px]" />
                        Coming Soon
                      </div>
                    )}
                  </div>

                  {/* Subtitle — brand blue, all cards */}
                  <p className="text-[12px] text-left font-bold uppercase tracking-wider mb-2 text-[#0047AB]">
                    {sw.subtitle}
                  </p>

                  {/* Description — full text, no clamp */}
                  <p className="text-gray-500 text-sm text-left leading-relaxed">
                    {sw.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* ── Video Popup Modal ── */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#000c1f] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,71,171,0.4)] z-10 flex flex-col overflow-hidden mx-2 sm:mx-0"
              style={{ maxHeight: "92vh" }}
            >
              {/* ── Close button — always visible, top-right corner ── */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-sm active:scale-90"
                aria-label="Close video"
              >
                <FaTimes className="text-white text-sm" />
              </button>

              {/* Video — fills available width, keeps 16:9 */}
              <div
                className="w-full"
                style={{ aspectRatio: "16/9", flexShrink: 0 }}
              >
                <iframe
                  src={selectedVideo.url}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  title={selectedVideo.title}
                />
              </div>

              {/* Title + Subtitle — always visible below video, never hidden */}
              <div className="flex-shrink-0 px-5 py-4 border-t border-white/10 bg-[#000c1f]">
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                  {selectedVideo.title}
                </h2>
                <p className="text-[#FF8C00] text-[11px] font-bold uppercase tracking-wider mt-1">
                  {selectedVideo.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoLibraryPage;
