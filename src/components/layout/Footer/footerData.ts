import { FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export const FOOTER_DATA = {
    about: {
        title: "Gemini Nexatech",
        desc: "Where Ideas Meet Innovation. We specialize in transforming complex business challenges into seamless digital reality through high-end engineering and strategic design."
    },
    sections: [
        {
            title: "Our Softwares",
            links: [
                { label: "ProtectEx", href: "/video-library" },
                { label: "TrackPro", href: "/video-library" },
                { label: "Tyre Sense 360", href: "/video-library" },
                { label: "CargoVision", href: "/video-library" },
                { label: "TrackBus", href: "/video-library" },
                { label: "NexTrace", href: "/video-library" },
            ]
        },
        {
            title: "Quick Links",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Services", href: "#services" },
                { label: "Products", href: "#products" },
                { label: "Industries", href: "#industries" },
                { label: "Video Library", href: "/video-library" },
                { label: "Blogs", href: "/blogs" },
                // Privacy Policy / Terms of Service links removed: no such routes
                // exist, so they rendered as soft 404s (HTTP 200, empty page).
                // Re-add here once the pages and routes are built.
            ]
        },
        {
            title: "Contact Info",
            contact: [
                { icon: FaPhone, label: "+91 9003275271", href: "tel:+919003275271" },
                { icon: FaEnvelope, label: "sales@gemininexatech.com", href: "mailto:sales@gemininexatech.com" },
                { icon: FaMapMarkerAlt, label: "Campus-1a, MILLENIA BUSINESS PARK-I, Perungudi, Chennai, Tamil Nadu 600096", href: "https://www.google.com/maps/search/?api=1&query=Campus-1a,+MILLENIA+BUSINESS+PARK-I,+Perungudi,+Chennai,+Tamil+Nadu+600096" },
                { icon: FaWhatsapp, label: "Chat on WhatsApp", href: "https://wa.me/918590899899", highlight: true }
            ]
        }
    ],
    // Only profiles with a real URL are listed. The Twitter/GitHub/YouTube/
    // Instagram entries used to be href="#", which rendered as dead links and
    // told search engines the brand had no social presence. Add each one back
    // here as soon as its live profile URL is known — Footer.tsx renders
    // whatever is in this array, and schema.ts should get the same URLs so
    // the Organization `sameAs` list stays in sync.
    socials: [
        { icon: FaLinkedin, href: "https://in.linkedin.com/company/gemini-nexatech-5747153b3", label: "LinkedIn", color: "#0A66C2" },
    ]
};
