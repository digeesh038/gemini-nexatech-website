import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaCheck,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

const countries = [
  { name: "Afghanistan", code: "+93", iso: "af" },
  { name: "Albania", code: "+355", iso: "al" },
  { name: "Algeria", code: "+213", iso: "dz" },
  { name: "Andorra", code: "+376", iso: "ad" },
  { name: "Angola", code: "+244", iso: "ao" },
  { name: "Argentina", code: "+54", iso: "ar" },
  { name: "Armenia", code: "+374", iso: "am" },
  { name: "Australia", code: "+61", iso: "au" },
  { name: "Austria", code: "+43", iso: "at" },
  { name: "Azerbaijan", code: "+994", iso: "az" },
  { name: "Bahrain", code: "+973", iso: "bh" },
  { name: "Bangladesh", code: "+880", iso: "bd" },
  { name: "Belgium", code: "+32", iso: "be" },
  { name: "Brazil", code: "+55", iso: "br" },
  { name: "Canada", code: "+1", iso: "ca" },
  { name: "China", code: "+86", iso: "cn" },
  { name: "Denmark", code: "+45", iso: "dk" },
  { name: "Egypt", code: "+20", iso: "eg" },
  { name: "Finland", code: "+358", iso: "fi" },
  { name: "France", code: "+33", iso: "fr" },
  { name: "Germany", code: "+49", iso: "de" },
  { name: "Greece", code: "+30", iso: "gr" },
  { name: "Hong Kong", code: "+852", iso: "hk" },
  { name: "India", code: "+91", iso: "in" },
  { name: "Indonesia", code: "+62", iso: "id" },
  { name: "Ireland", code: "+353", iso: "ie" },
  { name: "Israel", code: "+972", iso: "il" },
  { name: "Italy", code: "+39", iso: "it" },
  { name: "Japan", code: "+81", iso: "jp" },
  { name: "Kuwait", code: "+965", iso: "kw" },
  { name: "Malaysia", code: "+60", iso: "my" },
  { name: "Mexico", code: "+52", iso: "mx" },
  { name: "Netherlands", code: "+31", iso: "nl" },
  { name: "New Zealand", code: "+64", iso: "nz" },
  { name: "Norway", code: "+47", iso: "no" },
  { name: "Oman", code: "+968", iso: "om" },
  { name: "Pakistan", code: "+92", iso: "pk" },
  { name: "Philippines", code: "+63", iso: "ph" },
  { name: "Poland", code: "+48", iso: "pl" },
  { name: "Portugal", code: "+351", iso: "pt" },
  { name: "Qatar", code: "+974", iso: "qa" },
  { name: "Russia", code: "+7", iso: "ru" },
  { name: "Saudi Arabia", code: "+966", iso: "sa" },
  { name: "Singapore", code: "+65", iso: "sg" },
  { name: "South Africa", code: "+27", iso: "za" },
  { name: "South Korea", code: "+82", iso: "kr" },
  { name: "Spain", code: "+34", iso: "es" },
  { name: "Sri Lanka", code: "+94", iso: "lk" },
  { name: "Sweden", code: "+46", iso: "se" },
  { name: "Switzerland", code: "+41", iso: "ch" },
  { name: "Thailand", code: "+66", iso: "th" },
  { name: "Turkey", code: "+90", iso: "tr" },
  { name: "United Arab Emirates", code: "+971", iso: "ae" },
  { name: "United Kingdom", code: "+44", iso: "gb" },
  { name: "United States", code: "+1", iso: "us" },
  { name: "Vietnam", code: "+84", iso: "vn" },
].sort((a, b) => a.name.localeCompare(b.name));

// ─── Shared Form Component ────────────────────────────────────────────────────
interface ContactFormProps {
  formData: any;
  setFormData: (d: any) => void;
  selectedCountry: any;
  setSelectedCountry: (c: any) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  isSubmitted: boolean;
  isSending: boolean;
  isError: boolean;
  showErrors: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleReset: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  filteredCountries: typeof countries;
}

const ContactForm = ({
  formData,
  setFormData,
  selectedCountry,
  setSelectedCountry,
  isDropdownOpen,
  setIsDropdownOpen,
  searchQuery,
  setSearchQuery,
  isSubmitted,
  isSending,
  isError,
  showErrors,
  handleSubmit,
  handleReset,
  dropdownRef,
  filteredCountries,
}: ContactFormProps) => (
  <div className="bg-[#000D1A]/60 backdrop-blur-3xl p-4 lg:p-8 rounded-[3rem] border border-white/10 shadow-2xl relative z-10 box-border">
    <div className="text-center mb-3">
      <h2 className="text-2xl lg:text-3xl font-black tracking-tight">
        Turn your vision into reality
      </h2>
    </div>

    {!isSubmitted ? (
      <form onSubmit={handleSubmit} className="space-y-3 text-left">
        {/* Row 1: Name and Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1 group">
            <label className="text-[11px] uppercase font-black tracking-widest text-white/40 ml-1 group-focus-within:text-gemini-orange transition-colors">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              required
              className={`w-full bg-transparent border-b ${showErrors && !formData.name ? "border-red-500 shadow-[0_1px_0_0_rgba(239,68,68,0.5)]" : "border-white/20"} py-2 px-1 text-white placeholder:text-white/10 focus:outline-none focus:border-gemini-orange transition-all font-medium text-sm`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 group">
            <label className="text-[11px] uppercase font-black tracking-widest text-white/40 ml-1 group-focus-within:text-gemini-orange transition-colors">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Company Inc."
              required
              className={`w-full bg-transparent border-b ${showErrors && !formData.businessName ? "border-red-500 shadow-[0_1px_0_0_rgba(239,68,68,0.5)]" : "border-white/20"} py-2 px-1 text-white placeholder:text-white/10 focus:outline-none focus:border-gemini-orange transition-all font-medium text-sm`}
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
            />
          </div>
        </div>

        {/* Row 2: Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1 group">
            <label className="text-[11px] uppercase font-black tracking-widest text-white/40 ml-1 group-focus-within:text-gemini-orange transition-colors">
              Business Email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              required
              className={`w-full bg-transparent border-b ${showErrors && !formData.email ? "border-red-500 shadow-[0_1px_0_0_rgba(239,68,68,0.5)]" : "border-white/20"} py-2 px-1 text-white placeholder:text-white/10 focus:outline-none focus:border-gemini-orange transition-all font-medium text-sm`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 group">
            <label className="text-[11px] uppercase font-black tracking-widest text-white/40 ml-1 group-focus-within:text-gemini-orange transition-colors">
              Contact Number
            </label>
            <div
              className={`flex items-center gap-2 relative border-b ${showErrors && !formData.phone ? "border-red-500 shadow-[0_1px_0_0_rgba(239,68,68,0.5)]" : "border-white/20"} group-focus-within:border-gemini-orange transition-all`}
            >
              <div ref={dropdownRef} className="relative shrink-0">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 py-2 cursor-pointer hover:bg-white/5 transition-all px-1 rounded-t-lg"
                >
                  <img
                    src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                    alt={selectedCountry.name}
                    className="w-4 h-2.5 object-cover rounded-sm"
                  />
                  <span className="font-bold text-[11px] text-white">
                    {selectedCountry.code}
                  </span>
                  <FaChevronDown
                    className={`text-[9px] text-white/50 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-[#001D3D] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 w-60 max-h-[250px] flex flex-col">
                    <div className="p-2 border-b border-white/5 bg-[#001529]">
                      <input
                        type="text"
                        placeholder="Search country..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-gemini-orange text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="overflow-y-auto custom-scrollbar">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((c) => (
                          <div
                            key={c.iso}
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gemini-blue/40 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                          >
                            <img
                              src={`https://flagcdn.com/w40/${c.iso}.png`}
                              alt={c.name}
                              className="w-5 h-3.5 object-cover rounded-sm"
                            />
                            <span className="flex-1 text-[11px] font-bold text-white/90">
                              {c.name}
                            </span>
                            <span className="text-[10px] font-black text-gemini-orange">
                              {c.code}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-white/30 text-[11px]">
                          No countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <input
                type="tel"
                placeholder="000 000 0000"
                required
                className="flex-1 bg-transparent py-2 px-1 text-white placeholder:text-white/10 focus:outline-none transition-all font-medium text-sm h-full"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Requirement */}
        <div className="space-y-1 group">
          <label className="text-[11px] uppercase font-black tracking-widest text-white/40 ml-1 group-focus-within:text-gemini-orange transition-colors">
            Requirement
          </label>
          <textarea
            placeholder="Tell us about your project..."
            required
            rows={2}
            className={`w-full bg-transparent border-b ${showErrors && !formData.requirements ? "border-red-500 shadow-[0_1px_0_0_rgba(239,68,68,0.5)]" : "border-white/20"} py-2 px-1 text-white placeholder:text-white/10 focus:outline-none focus:border-gemini-orange transition-all font-medium text-md resize-none`}
            value={formData.requirements}
            onChange={(e) =>
              setFormData({ ...formData, requirements: e.target.value })
            }
          />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setFormData({ ...formData, nda: !formData.nda })}
            >
              <div
                className={`min-w-[1.25rem] h-5 rounded border ${formData.nda ? "bg-gemini-blue border-gemini-blue" : showErrors && !formData.nda ? "border-red-500 bg-red-500/10" : "border-white/20"} flex items-center justify-center transition-all`}
              >
                {formData.nda && <FaCheck className="text-[10px] text-white" />}
              </div>
              <span
                className={`text-[12px] ${showErrors && !formData.nda ? "text-red-400" : "text-white/40"} font-bold group-hover:text-white/80 transition-colors leading-tight`}
              >
                I want to protect my business idea by signing an NDA
              </span>
            </div>

            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() =>
                setFormData({ ...formData, updates: !formData.updates })
              }
            >
              <div
                className={`min-w-[1.25rem] h-5 rounded border ${formData.updates ? "bg-gemini-blue border-gemini-blue" : showErrors && !formData.updates ? "border-red-500 bg-red-500/10" : "border-white/20"} flex items-center justify-center transition-all`}
              >
                {formData.updates && (
                  <FaCheck className="text-[10px] text-white" />
                )}
              </div>
              <span
                className={`text-[12px] ${showErrors && !formData.updates ? "text-red-400" : "text-white/40"} font-bold group-hover:text-white/80 transition-colors leading-tight`}
              >
                I agree to receive Phone call and Whatsapp Messages
              </span>
            </div>
          </div>

          {showErrors && (!formData.nda || !formData.updates) && (
            <p className="text-[11px] text-red-500 font-bold tracking-wide animate-pulse">
              * Please agree to both terms to continue
            </p>
          )}

          {isError && (
            <p className="text-[11px] text-red-400 font-bold tracking-wide">
              ⚠ Something went wrong. Please try again or contact us directly.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="w-1/2 mx-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-gemini-orange disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-[1.25rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/40 active:scale-[0.98] mt-2"
        >
          {isSending ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Sending…
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    ) : (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gemini-blue/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <FaCheck className="text-3xl text-gemini-blue" />
        </div>
        <h3 className="text-3xl font-black mb-4 tracking-tight">
          Requirement Sent!
        </h3>
        <p className="text-white/60 leading-relaxed max-w-xs mx-auto mb-8">
          Our team will review your details and connect with you shortly.
        </p>
        <button
          onClick={handleReset}
          className="text-gemini-orange font-black text-[12px] uppercase tracking-widest hover:underline"
        >
          Submit Another Requirement
        </button>
      </div>
    )}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const ContactPage = () => {
  const initialState = {
    name: "",
    businessName: "",
    email: "",
    phone: "",
    requirements: "",
    nda: false,
    updates: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.iso === "ae") || countries[0],
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Mobile popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-detect country by IP
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          const detected = countries.find(
            (c) => c.iso.toLowerCase() === data.country_code.toLowerCase(),
          );
          if (detected) setSelectedCountry(detected);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nda || !formData.updates) {
      setShowErrors(true);
      return;
    }

    setIsSending(true);
    setIsError(false);
    setShowErrors(false);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("business_name", formData.businessName);
    payload.append("email", formData.email);
    payload.append("phone", `${selectedCountry.code} ${formData.phone}`);
    payload.append("message", formData.requirements);
    payload.append("nda", formData.nda ? "Yes" : "No");
    payload.append("updates", formData.updates ? "Yes" : "No");

    try {
      const response = await fetch("/sendmail.php", {
        method: "POST",
        body: payload,
      });

      const result = await response.text();

      if (result.trim() === "success") {
        setIsSubmitted(true);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setIsSubmitted(false);
    setIsSending(false);
    setIsError(false);
    setSearchQuery("");
    setShowErrors(false);
  };

  const steps = [
    "One of our experts will reach out to you.",
    "We'll listen to your ideas with full attention.",
    "You'll receive a FREE expert consultation on execution.",
  ];

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery),
  );

  const sharedFormProps = {
    formData,
    setFormData,
    selectedCountry,
    setSelectedCountry,
    isDropdownOpen,
    setIsDropdownOpen,
    searchQuery,
    setSearchQuery,
    isSubmitted,
    isSending,
    isError,
    showErrors,
    handleSubmit,
    handleReset,
    dropdownRef,
    filteredCountries,
  };

  return (
    <div className="bg-[#000510] text-white min-h-screen pt-15 relative overflow-hidden font-inter flex flex-col">
      <SEO 
        title="Contact Us"
        description="Get in touch with Gemini Nexatech. We provide expert consultation for your engineering and digital vision. Visit our office in Chennai or reach out via WhatsApp."
      />
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gemini-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex-1 flex items-center py-12 lg:py-20 w-full">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
            {/* Left Column: Info */}
            <div className="space-y-10 text-left mt-4">
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight"
                >
                  Take the first step towards{" "}
                  <span className="text-gemini-orange">Innovation</span>
                </motion.h1>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white/90 underline decoration-gemini-blue decoration-4 underline-offset-8">
                    What happens next?
                  </h3>
                  <ul className="space-y-4 pt-2">
                    {steps.map((step, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-center gap-4 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gemini-blue flex items-center justify-center text-sm font-black shadow-lg shadow-gemini-blue/30 group-hover:scale-110 transition-transform">
                          {idx + 1}
                        </div>
                        <p className="text-white/80 font-medium">{step}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <p className="text-white/60 leading-relaxed font-medium">
                  Fill out the form, and our experts will contact you within
                  minutes to discuss your <br /> requirements. You can also
                  email us{" "}
                  <a
                    href="mailto:sales@gemininexatech.com"
                    className="text-gemini-blue hover:text-gemini-orange font-bold underline transition-colors"
                  >
                    sales@gemininexatech.com
                  </a>
                </p>

                {/* WhatsApp & Address Info */}
                <div className="pt-6 flex flex-col gap-6 md:flex-row md:gap-0 items-start">
                  <div className="space-y-4 flex-1">
                    <h4 className="text-gemini-orange font-black text-[13px] uppercase tracking-[0.2em] flex items-center gap-3">
                      <span className="w-4 h-1 bg-gemini-orange rounded-full" />
                      Quick Support
                    </h4>
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/10 group-hover:border-green-500/20 transition-all">
                        <FaWhatsapp className="text-green-500 text-xl" />
                      </div>
                      <a
                        href="https://wa.me/918590899899"
                        className="text-white font-bold text-sm tracking-wide hover:text-green-400 transition-colors whitespace-nowrap"
                      >
                        +91 85908 99899
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <h4 className="text-gemini-blue font-black text-[13px] uppercase tracking-[0.2em] flex items-center gap-3">
                      <span className="w-4 h-1 bg-gemini-blue rounded-full" />
                      Visit Us
                    </h4>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <FaMapMarkerAlt className="text-gemini-blue text-lg" />
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed font-bold pt-1">
                        Campus-1a, MILLENIA BUSINESS PARK-I, Perungudi, Chennai,
                        Tamil Nadu 600096
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form — desktop only */}
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ContactForm {...sharedFormProps} />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 blur-[100px] -z-10 rounded-full pointer-events-none" />
            </div>
          </div>
        </Container>
      </div>

      {/* ── Mobile: Floating "Get in Touch" button ── */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center gap-2 bg-gemini-blue hover:bg-gemini-orange text-white font-black text-sm uppercase tracking-widest px-8 py-3.5 rounded-full shadow-2xl shadow-gemini-blue/40 active:scale-95 transition-all whitespace-nowrap"
        >
          ✉ Get in Touch
        </motion.button>
      </div>

      {/* ── Mobile: Form Popup / Bottom Sheet ── */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsPopupOpen(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#000D1A] rounded-t-[2rem] border-t border-white/10 shadow-2xl overflow-y-auto"
              style={{ maxHeight: "92dvh" }}
            >
              {/* Handle bar + close button */}
              <div className="sticky top-0 bg-[#000D1A] pt-4 pb-2 px-4 flex items-center justify-between z-10 border-b border-white/5">
                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                <span className="text-white font-black text-sm uppercase tracking-widest mt-3">
                  Contact Us
                </span>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="mt-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 active:scale-90 transition-all"
                  aria-label="Close form"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Form inside popup */}
              <div className="p-4 pb-10">
                <ContactForm {...sharedFormProps} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
