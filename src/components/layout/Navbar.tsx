import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/GN-opt2.webp";
import { FaChevronDown } from "react-icons/fa";
import { useNavbarAnimations } from "./Navbar/NavbarAnimations";
import { useNavbarManager } from "./Navbar/NavbarManager";

const Navbar = () => {
  const {
    isMobileMenuOpen,
    activeDropdown,
    isScrolled,
    services,
    industries,
    insights,
    products,
    navLinks,
    scrollToSection,
    toggleMobileMenu,
    toggleDropdown,
    scrollToTop,
    location,
  } = useNavbarManager();

  const { navRef } = useNavbarAnimations(isMobileMenuOpen, location.pathname);

  // Dynamic Styles based on Scroll
  const isHome = location.pathname === "/";
  const navBg = isHome
    ? isScrolled
      ? "bg-black/80 backdrop-blur-2xl border-white/5 shadow-2xl"
      : "bg-transparent border-transparent"
    : "bg-black/90 backdrop-blur-xl border-white/10";

  const textColor = isHome && !isScrolled ? "text-white" : "text-white/90";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${navBg}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={scrollToTop}
            className="flex-shrink-0 flex items-center cursor-pointer transition-all"
          >
            <img
              src={logo}
              alt="Gemini Nexatech Logo"
              width="200"
              height="40"
              className="h-10 sm:h-11 lg:h-12 w-auto"
            />
            <div className="flex flex-col items-start justify-center ml-2">
              <span className="text-base sm:text-xl lg:text-2xl font-black leading-none tracking-tight">
                <span
                  className={`${isHome && !isScrolled ? "text-white" : "text-gemini-blue"} transition-colors duration-500`}
                >
                  GEMINI{" "}
                </span>
                <span className="text-gemini-orange">NEXATECH</span>
              </span>
              <span
                className={`text-[9px] sm:text-[10px] lg:text-[11px] ${isHome && !isScrolled ? "text-white/60" : "text-gray-400"} tracking-[0.13em] uppercase font-bold leading-tight mt-1 transition-colors duration-500`}
              >
                Where Ideas Meet Innovation
              </span>
            </div>
          </button>

          <div className="hidden lg:flex lg:items-center lg:space-x-4 xl:space-x-8 nav-links-wrapper relative">
            <div className="nav-link-container px-2 relative z-10">
              <div className="nav-link-inner">
                <button
                  data-section="about"
                  onClick={() => scrollToSection(navLinks[0].Link)}
                  className={`flex items-center ${textColor} hover:text-gemini-orange cursor-pointer font-inter font-bold transition-colors uppercase tracking-wider text-xs py-2`}
                >
                  {navLinks[0].label}
                </button>
              </div>
            </div>

            {/* Services Dropdown */}
            <div
              className="nav-link-container px-2 relative z-10 group"
              onMouseEnter={() => toggleDropdown("services")}
              onMouseLeave={() => toggleDropdown(null as any)}
            >
              <div className="nav-link-inner">
                <button
                  data-section="services"
                  className={`flex items-center ${textColor} group-hover:text-gemini-orange cursor-pointer font-bold transition-colors uppercase tracking-wider text-xs py-2`}
                >
                  Services{" "}
                  <FaChevronDown
                    className={`ml-1 text-[10px] transition-transform duration-300 ${activeDropdown === "services" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <div
                className={`absolute left-0 lg:left-[-150px] xl:left-[-250px] top-full mt-1 w-[95vw] lg:w-[700px] xl:w-[800px] bg-[#000510]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl border border-white/10 transition-all duration-300 transform p-4 lg:p-5 z-50 ${
                  activeDropdown === "services"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                  {services.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(service.Link)}
                      className="group/card cursor-pointer relative flex items-center space-x-3 bg-[#013299]/10 hover:bg-white p-2.5 rounded-xl transition-all duration-300 text-left overflow-hidden border border-transparent hover:border-[#FD8E18]/20 hover:shadow-lg"
                    >
                      <div className="relative flex-shrink-0 p-1.5 bg-white/5 rounded-lg group-hover/card:bg-[#FF8C00]/20 transition-all duration-300">
                        <service.icon className="text-sm text-white group-hover/card:text-[#FF8C00] transition-colors" />
                      </div>
                      <span className="text-[14px] xl:text-[15px] font-bold text-gray-200 group-hover/card:text-[#013299] transition-colors leading-tight whitespace-nowrap">
                        {service.title}
                      </span>
                      {/* Animated Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#FD8E18] transition-all duration-300 group-hover/card:w-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Dropdown */}
            <div
              className="nav-link-container px-2 relative z-10 group"
              onMouseEnter={() => toggleDropdown("products")}
              onMouseLeave={() => toggleDropdown(null as any)}
            >
              <div className="nav-link-inner">
                <button
                  data-section="products"
                  className={`flex items-center ${textColor} group-hover:text-gemini-orange cursor-pointer font-bold uppercase tracking-wider text-xs transition-colors py-2`}
                >
                  Products{" "}
                  <FaChevronDown
                    className={`ml-1 text-xs transition-transform duration-300 ${activeDropdown === "products" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[95vw] lg:w-[550px] xl:w-[650px] bg-[#000510]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl border border-white/10 transition-all duration-300 transform p-4 lg:p-5 z-50 ${
                  activeDropdown === "products"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4"
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  {products.map((product, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(`/products/${product.id}`)}
                      className="group/card cursor-pointer relative flex items-center space-x-3 bg-[#013299]/10 hover:bg-white p-2.5 rounded-xl transition-all duration-300 text-left overflow-hidden border border-transparent hover:border-[#FD8E18]/20 hover:shadow-lg"
                    >
                      <div className="relative flex-shrink-0 p-1.5 bg-white/5 rounded-lg group-hover/card:bg-[#FF8C00]/20 transition-all duration-300">
                        <product.icon className="text-sm text-white group-hover/card:text-[#FF8C00] transition-colors" />
                      </div>
                      <span className="text-[14px] xl:text-[15px] font-bold text-gray-200 group-hover/card:text-[#013299] transition-colors leading-tight whitespace-nowrap">
                        {product.title}
                      </span>
                      {/* Animated Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#FD8E18] transition-all duration-300 group-hover/card:w-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Industries Dropdown */}
            <div
              className="nav-link-container px-2 relative z-10 group"
              onMouseEnter={() => toggleDropdown("industries")}
              onMouseLeave={() => toggleDropdown(null as any)}
            >
              <div className="nav-link-inner">
                <button
                  data-section="industries"
                  className={`flex items-center ${textColor} group-hover:text-gemini-orange cursor-pointer font-bold transition-colors uppercase tracking-wider text-xs py-2`}
                >
                  Industries{" "}
                  <FaChevronDown
                    className={`ml-1 text-[10px] transition-transform duration-300 ${activeDropdown === "industries" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <div
                className={`absolute right-0 lg:right-[-100px] xl:right-[-180px] top-full mt-1 w-[95vw] lg:w-[600px] xl:w-[700px] bg-[#000510]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl border border-white/10 transition-all duration-300 transform p-4 lg:p-5 z-50 ${
                  activeDropdown === "industries"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4"
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  {industries.map((ind, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(ind.Link)}
                      className="group/card cursor-pointer relative flex items-center space-x-3 bg-[#013299]/10 hover:bg-white p-2.5 rounded-xl transition-all duration-300 text-left overflow-hidden border border-transparent hover:border-[#FD8E18]/20 hover:shadow-lg"
                    >
                      <div className="relative flex-shrink-0 p-1.5 bg-white/5 rounded-lg group-hover/card:bg-[#FF8C00]/20 transition-all duration-300">
                        <ind.icon className="text-sm text-white group-hover/card:text-[#FF8C00] transition-colors duration-500" />
                      </div>
                      <span className="text-[14px] xl:text-[15px] font-bold text-gray-200 group-hover/card:text-[#013299] transition-colors duration-500 leading-tight whitespace-nowrap">
                        {ind.title}
                      </span>
                      {/* Animated Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#FD8E18] transition-all duration-300 group-hover/card:w-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights Dropdown */}
            <div
              className="nav-link-container px-2 relative z-10 group"
              onMouseEnter={() => toggleDropdown("insights")}
              onMouseLeave={() => toggleDropdown(null as any)}
            >
              <div className="nav-link-inner">
                <button
                  data-section="insights"
                  className={`flex items-center ${textColor} group-hover:text-gemini-orange cursor-pointer font-bold transition-colors uppercase tracking-wider text-xs py-2`}
                >
                  Insights{" "}
                  <FaChevronDown
                    className={`ml-1 text-[10px] transition-transform duration-300 ${activeDropdown === "insights" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <div
                className={`absolute right-0 lg:right-[-50px] xl:right-[-100px] top-full mt-1 w-[280px] bg-[#000510]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl border border-white/10 transition-all duration-300 transform p-4 z-50 ${
                  activeDropdown === "insights"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4"
                }`}
              >
                <div className="flex flex-col gap-2">
                  {insights.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.Link)}
                      className="group/card cursor-pointer relative flex items-center space-x-3 bg-white/5 hover:bg-white p-2.5 rounded-xl transition-all duration-300 text-left overflow-hidden border border-transparent hover:border-[#FD8E18]/20 hover:shadow-lg"
                    >
                      <div className="relative flex-shrink-0 p-1.5 bg-white/5 rounded-lg group-hover/card:bg-[#FF8C00]/20 transition-all duration-300">
                        <item.icon className="text-sm text-white group-hover/card:text-[#FF8C00] transition-colors" />
                      </div>
                      <span className="text-[14px] font-bold text-gray-200 group-hover/card:text-[#013299] transition-colors leading-tight">
                        {item.title}
                      </span>
                      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#FD8E18] transition-all duration-300 group-hover/card:w-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-link-container px-2 relative z-10">
              <div className="nav-link-inner">
                <button
                  data-section="contact"
                  onClick={() => scrollToSection(navLinks[3].Link)}
                  className={`flex items-center ${textColor} hover:text-gemini-orange cursor-pointer font-bold transition-colors uppercase tracking-wider text-xs py-2`}
                >
                  {navLinks[3].label}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-content"
            className={`lg:hidden p-2 rounded-md ${textColor} hover:bg-white/10 transition-colors`}
          >
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-[#000510]/90 backdrop-blur-xl overflow-hidden shadow-2xl rounded-b-[24px]"
            >
              <div className="flex flex-col p-4 space-y-1">
                <button
                  onClick={() => scrollToSection(navLinks[0].Link)}
                  className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 font-bold transition-all rounded-xl"
                >
                  {navLinks[0].label}
                </button>

                <div className="w-full">
                  <button
                    onClick={() => toggleDropdown("services")}
                    className={`w-full flex items-center justify-between px-4 py-3 text-white/90 font-bold transition-all rounded-xl ${
                      activeDropdown === "services"
                        ? "bg-white/10"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <span>Services</span>
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${
                        activeDropdown === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "services" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-white/5 mt-1 rounded-xl"
                      >
                        <div className="px-2 py-3 space-y-1">
                          {services.map((service, index) => (
                            <button
                              key={index}
                              onClick={() => scrollToSection(service.Link)}
                              className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white rounded-lg transition-all group"
                            >
                              <service.icon className="text-base text-[#FF8C00] group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-semibold text-gray-200 group-hover:text-white">
                                {service.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-full">
                  <button
                    onClick={() => toggleDropdown("products")}
                    className={`w-full flex items-center justify-between px-4 py-3 text-white/90 font-bold transition-all rounded-xl ${
                      activeDropdown === "products"
                        ? "bg-white/10"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <span>Products</span>
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${
                        activeDropdown === "products" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "products" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-white/5 mt-1 rounded-xl"
                      >
                        <div className="px-2 py-3 space-y-1">
                          {products.map((product, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                scrollToSection(`/products/${product.id}`)
                              }
                              className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white rounded-lg transition-all group"
                            >
                              <product.icon className="text-base text-[#FD8E18] group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-semibold text-gray-200 text-left">
                                {product.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-full">
                  <button
                    onClick={() => toggleDropdown("industries")}
                    className={`w-full flex items-center justify-between px-4 py-3 text-white/90 font-bold transition-all rounded-xl ${
                      activeDropdown === "industries"
                        ? "bg-white/10"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <span>Industries</span>
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${
                        activeDropdown === "industries" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "industries" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-white/5 mt-1 rounded-xl"
                      >
                        <div className="px-2 py-3 space-y-1">
                          {industries.map((ind, index) => (
                            <button
                              key={index}
                              onClick={() => scrollToSection(ind.Link)}
                              className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white rounded-lg transition-all group"
                            >
                              <ind.icon className="text-base text-[#FD8E18] group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-semibold text-gray-200 text-left">
                                {ind.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-full">
                  <button
                    onClick={() => toggleDropdown("insights")}
                    className={`w-full flex items-center justify-between px-4 py-3 text-white/90 font-bold transition-all rounded-xl ${
                      activeDropdown === "insights"
                        ? "bg-white/10"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <span>Insights</span>
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${
                        activeDropdown === "insights" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "insights" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-white/5 mt-1 rounded-xl"
                      >
                        <div className="px-2 py-3 space-y-1">
                          {insights.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => scrollToSection(item.Link)}
                              className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white rounded-lg transition-all group"
                            >
                              <item.icon className="text-base text-[#FF8C00] group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-semibold text-gray-200 group-hover:text-white text-left">
                                {item.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => scrollToSection(navLinks[3].Link)}
                  className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 font-bold transition-all rounded-xl"
                >
                  {navLinks[3].label}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gooey SVG Filter Definition */}
      <svg className="svg-filters">
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
      <style>{`
        .nav-link-container.is-active .nav-link-inner button {
          color: #FD8E18 !important;
        }
        .nav-link-container.is-active .nav-link-inner button svg {
          color: #FD8E18 !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
