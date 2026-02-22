import zebraLogo from "../../assets/zebra.jpeg";
import hidLogo from "../../assets/hid.jpeg";
import impinjLogo from "../../assets/impinj.jpeg";
import xerafyLogo from "../../assets/xerafy.jpeg";

export const HERO_DATA = {
    heading: "Your Digital Partner for",
    whatsapp: {
        number: "971555133884",
        link: "https://wa.me/918590899899"
    },
    ctas: [
        { label: "Schedule a Call", href: "#contact", type: "primary" },
        { label: "Video Library", href: "/video-library", type: "secondary" }
    ],
    trustedBy: {
        label: "Trusted by",
        logos: [
            { name: "Zebra", src: zebraLogo },
            { name: "HID", src: hidLogo },
            { name: "Impinj", src: impinjLogo },
            { name: "Xerafy", src: xerafyLogo },
        ]
    }
};
