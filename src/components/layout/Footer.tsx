import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../common/Container";
import { useFooterManager } from "./Footer/FooterManager";
import { useFooterAnimations } from "./Footer/FooterAnimations";
import { useCallback, useState } from "react";

const Footer = () => {
  const { sections, socials } = useFooterManager();
  const { footerRef } = useFooterAnimations();
  const navigate = useNavigate();
  const location = useLocation();

  // Track which section is open on mobile; null = all closed
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  const handleLinkClick = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        const targetId = href.replace("#", "");
        if (location.pathname !== "/") {
          navigate("/#" + targetId);
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else {
        navigate(href);
      }
    },
    [location.pathname, navigate],
  );

  return (
    <footer
      ref={footerRef as any}
      id="contact"
      className="relative bg-[#000510] pt-20 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-tech-blueprint opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] footer-aura opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-0 opacity-10">
        <span className="watermark-text font-black uppercase">NEXATECH</span>
      </div>

      <Container className="relative z-10">
        {/* ── Desktop layout (md+) – unchanged ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-10 items-start mb-8">
          {/* Column 1: CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6 text-left"
          >
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black tracking-tight leading-none uppercase">
                <span className="text-gemini-blue">GEMINI </span>
                <span className="text-gemini-orange">NEXATECH</span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.165em] font-bold mt-2">
                WHERE IDEAS MEETS INNOVATION
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tighter">
              Ready to build the <br />
              <span className="text-gemini-orange uppercase">
                Next Big Thing?
              </span>
            </h2>

            <div className="flex justify-start">
              <Link
                to="/contact"
                className="px-8 py-3 text-md bg-white text-gemini-blue font-black rounded-xl hover:bg-gemini-orange hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl uppercase tracking-wider"
              >
                LET'S WORK TOGETHER
              </Link>
            </div>
          </motion.div>

          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${
                section.title === "Our Softwares"
                  ? "lg:col-span-3"
                  : section.title === "Quick Links"
                    ? "lg:col-span-2"
                    : "lg:col-span-4"
              } space-y-2 items-start text-left`}
            >
              <h3 className="text-white font-black uppercase tracking-widest text-sm border-l-4 border-gemini-orange pl-4 w-full">
                {section.title}
              </h3>
              <ul className="space-y-2 pt-2">
                {section.links?.map((link, lIdx) => (
                  <li key={lIdx} className="list-none">
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-400 hover:text-white flex items-center group transition-colors text-sm sm:text-base pl-4 cursor-pointer outline-none"
                    >
                      <div className="relative flex items-center">
                        <span className="absolute -left-4 w-0 group-hover:w-3 h-[2px] bg-[#FF8C00] transition-all duration-300"></span>
                        <span className="text-xl">{link.label}</span>
                      </div>
                    </button>
                  </li>
                ))}

                {section.contact?.map((item, cIdx) => (
                  <li key={cIdx} className="list-none">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-start gap-2.5 transition-all group pl-4 ${
                        item.highlight
                          ? "text-green-400 font-bold hover:text-green-300"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <item.icon
                        className={`text-xl flex-shrink-0 mt-[3px] ${item.highlight ? "text-green-400" : ""}`}
                      />
                      <span className="text-lg leading-snug">{item.label}</span>
                    </a>
                  </li>
                ))}

                {section.title === "Contact Info" && (
                  <li className="list-none">
                    <div className="flex flex-wrap gap-2 pl-2 mt-4">
                      {socials.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          style={{ "--hover-color": social.color } as any}
                          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--hover-color)] hover:bg-white/10 hover:border-[var(--hover-color)]/30 transition-all group"
                        >
                          <span className="sr-only">{social.label}</span>
                          <social.icon className="text-xl group-hover:scale-110 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile layout (< md) – accordion ── */}
        <div className="md:hidden mb-8">
          {/* Brand / CTA block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 text-left mb-8"
          >
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black tracking-tight leading-none uppercase">
                <span className="text-gemini-blue">GEMINI </span>
                <span className="text-gemini-orange">NEXATECH</span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.165em] font-bold mt-2">
                WHERE IDEAS MEETS INNOVATION
              </span>
            </div>
            <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">
              Ready to build the <br />
              <span className="text-gemini-orange uppercase">
                Next Big Thing?
              </span>
            </h2>
            <Link
              to="/contact"
              className="inline-block px-7 py-3 text-sm bg-white text-gemini-blue font-black rounded-xl active:scale-95 shadow-xl uppercase tracking-wider"
            >
              LET'S WORK TOGETHER
            </Link>
          </motion.div>

          {/* Accordion sections */}
          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {sections.map((section, idx) => {
              const isOpen = openSection === section.title;
              return (
                <div key={idx}>
                  {/* Accordion header */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between py-4 pr-1 text-left outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-black uppercase tracking-widest text-sm border-l-4 border-gemini-orange pl-4">
                      {section.title}
                    </span>
                    <span
                      className={`text-2xl font-bold leading-none transition-transform duration-300 ${
                        isOpen ? "text-gemini-orange rotate-0" : "text-gray-400"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Accordion body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-5 space-y-3 pl-1">
                          {section.links?.map((link, lIdx) => (
                            <li key={lIdx} className="list-none">
                              <button
                                onClick={() => handleLinkClick(link.href)}
                                className="text-gray-400 active:text-white flex items-center group transition-colors text-base pl-4 cursor-pointer outline-none"
                              >
                                <div className="relative flex items-center">
                                  <span className="absolute -left-4 w-0 group-active:w-3 h-[2px] bg-[#FF8C00] transition-all duration-300"></span>
                                  <span>{link.label}</span>
                                </div>
                              </button>
                            </li>
                          ))}

                          {section.contact?.map((item, cIdx) => (
                            <li key={cIdx} className="list-none">
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-start gap-2.5 transition-all pl-4 ${
                                  item.highlight
                                    ? "text-green-400 font-bold"
                                    : "text-gray-400"
                                }`}
                              >
                                <item.icon
                                  className={`text-lg flex-shrink-0 mt-[2px] ${item.highlight ? "text-green-400" : ""}`}
                                />
                                <span className="text-base leading-snug">
                                  {item.label}
                                </span>
                              </a>
                            </li>
                          ))}

                          {section.title === "Contact Info" && (
                            <li className="list-none">
                              <div className="flex flex-wrap gap-2 pl-4 mt-3">
                                {socials.map((social, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    style={
                                      { "--hover-color": social.color } as any
                                    }
                                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 active:text-[var(--hover-color)] active:bg-white/10 transition-all"
                                  >
                                    <span className="sr-only">{social.label}</span>
                                    <social.icon className="text-lg" />
                                  </a>
                                ))}
                              </div>
                            </li>
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
