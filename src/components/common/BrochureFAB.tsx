import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const BrochureFAB = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleDownload = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      console.log("📄 [PDF Engine]: Building document dynamically...");
      
      // Dynamically import the PDF renderer and the document component
      const [ { pdf }, { BrochurePDF } ] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./BrochurePDF")
      ]);

      const blob = await pdf(<BrochurePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      
      console.log("✅ [PDF Engine]: Ready for download!");
      console.log("🔗 Preview Link:", url);
      console.group("📂 Brochure Content Mapping:");
      console.log("- Brand: Gemini Nexatech");
      console.log("- Target: Official Corporate Brochure");
      console.log("- Format: A4 (Helvetica-Standard)");
      console.groupEnd();

      const link = document.createElement("a");
      link.href = url;
      link.download = "Gemini_Nexatech_Brochure.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the object URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error("❌ [PDF Engine] Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // CONDITIONAL RENDER: Move below all hooks to satisfy Rules of Hooks
  if (location.pathname !== "/") return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[100]">
      <div
        className="relative flex items-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Text Label */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 px-4 py-2 bg-[#013299] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg shadow-xl whitespace-nowrap hidden md:block pointer-events-none"
            >
              Download Profile
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#013299] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Circle - Symmetrical with WhatsApp */}
        <motion.button
          onClick={handleDownload}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.1 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
          aria-label="Download Profile"
          className={`p-2.5 sm:p-4 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 relative overflow-hidden ${
            isLoading
              ? "bg-gray-800 cursor-wait"
              : "bg-[#fd8e18] hover:bg-[#013299] animate-ripple-orange"
          }`}
        >
          {isLoading ? (
            <FaSpinner className="text-xl sm:text-2xl text-white animate-spin" />
          ) : (
            <FaFilePdf className="text-xl sm:text-2xl text-white group-hover:scale-110 transition-transform" />
          )}

          {/* Background Shine for Hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>
    </div>
  );
};

export default BrochureFAB;
