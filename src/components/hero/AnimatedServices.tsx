import { motion, AnimatePresence } from "framer-motion";

const services = [
  "Custom Software Development",
  "Web Application Development",
  "Mobile Application Development",
  "UX/UI Design",
  "AI Development",
  "IT & Software Consulting",
  "Cloud & DevOps",
  "API Development & System Integration",
  "Enterprise Application Development",
  "IoT & Smart Monitoring Solutions",
  "Data Analytics & Business Intelligence",
  "Application Maintenance & Support",
] as const;

interface AnimatedServicesProps {
  currentIndex: number;
}

const AnimatedServices = ({ currentIndex }: AnimatedServicesProps) => {
  const currentService = services[currentIndex];
  const words = currentService.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.8,
    },
  };

  return (
    <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[140px] flex items-center justify-center px-4 py-4 sm:py-6 relative z-10 w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white text-center flex flex-wrap justify-center items-center leading-[1.2] tracking-tight font-inter w-full max-w-[95vw] lg:max-w-7xl mx-auto"
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={`${currentIndex}-${wordIndex}`}
              variants={letterVariants}
              className="inline-block mx-[0.15em] py-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedServices;
