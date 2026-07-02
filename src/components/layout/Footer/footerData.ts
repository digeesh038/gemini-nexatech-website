import { FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

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
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
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
    socials: [
        { icon: FaLinkedin, href: "#", label: "LinkedIn", color: "#0A66C2" },
        { icon: FaTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
        { icon: FaGithub, href: "#", label: "GitHub", color: "#ffffff" },
        { icon: FaYoutube, href: "#", label: "Youtube", color: "#FF0000" },
        { icon: FaInstagram, href: "#", label: "Instagram", color: "#E4405F" }
    ]
};
