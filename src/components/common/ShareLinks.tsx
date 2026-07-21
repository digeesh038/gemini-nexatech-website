import { FaLinkedin, FaWhatsapp, FaFacebookF, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SITE_URL } from "../../seo/schema";

/**
 * Share targets for the current page.
 *
 * Rendered as plain <a href> intents rather than a third-party widget so there
 * is no extra script on the critical path and the buttons still work without
 * JS. URLs are built from SITE_URL + pathname (not window.location) so the
 * prerendered HTML points at the canonical domain rather than whatever preview
 * host served the page.
 */
const ShareLinks = ({ title = "Gemini Nexatech — Where Ideas Meet Innovation" }: { title?: string }) => {
  const { pathname } = useLocation();
  const [copied, setCopied] = useState(false);

  const url = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      label: "Share on LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0A66C2",
    },
    {
      label: "Share on X",
      icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#ffffff",
    },
    {
      label: "Share on Facebook",
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877F2",
    },
    {
      label: "Share on WhatsApp",
      icon: FaWhatsapp,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25D366",
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the share links above still work */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
        Share this page
      </span>
      <div className="flex flex-wrap gap-2">
        {targets.map(({ label, icon: Icon, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            style={{ "--hover-color": color } as React.CSSProperties}
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--hover-color)] hover:bg-white/10 hover:border-[var(--hover-color)]/30 transition-all"
          >
            <span className="sr-only">{label}</span>
            <Icon className="text-base" />
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy link to this page"
          title={copied ? "Link copied" : "Copy link"}
          className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#FF8C00] hover:bg-white/10 hover:border-[#FF8C00]/30 transition-all"
        >
          <span className="sr-only">Copy link to this page</span>
          {copied ? (
            <span className="text-[10px] font-black text-[#FF8C00]">OK</span>
          ) : (
            <FaLink className="text-base" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareLinks;
