import {
    FaOilCan,
    FaIndustry,
    FaLightbulb,
    FaHardHat,
    FaTruck,
    FaPlane,
} from "react-icons/fa";
import oilGasImg from "../../../assets/industries/Oil-1-opt.webp";
import manufacturingImg from "../../../assets/industries/manufacturing.webp";
import energyImg from "../../../assets/industries/energy-utilities.webp";
import constructionImg from "../../../assets/industries/construction.webp";
import logisticsImg from "../../../assets/industries/transportation.webp";
import aviationImg from "../../../assets/industries/aviation.webp";

export const INDUSTRIES_DATA = [
    {
        id: "oil-gas",
        title: "Oil & Gas",
        shortTitle: "Oil & Gas",
        desc: "Ensure safety, monitoring, and operational continuity in critical environments.",
        icon: FaOilCan,
        color: "#FF8C00",
        image: oilGasImg,
    },
    {
        id: "manufacturing",
        title: "Manufacturing & Industrial",
        shortTitle: "Mfg & Industrial",
        desc: "Optimize processes, protect assets, and monitor industrial operations.",
        icon: FaIndustry,
        color: "#0047AB",
        image: manufacturingImg,
    },
    {
        id: "energy-utilities",
        title: "Energy & Utilities",
        shortTitle: "Energy",
        desc: "Safeguard infrastructure, automate operations, and enhance energy efficiency.",
        icon: FaLightbulb,
        color: "#00C2FF",
        image: energyImg,
    },
    {
        id: "construction",
        title: "Construction & Infrastructure",
        shortTitle: "Construction",
        desc: "Protect worksites, equipment, and personnel with advanced monitoring.",
        icon: FaHardHat,
        color: "#FFBD00",
        image: constructionImg,
    },
    {
        id: "logistics",
        title: "Transportation & Logistics",
        shortTitle: "Logistics",
        desc: "Track fleets, assets, and cargo for safety and efficiency.",
        icon: FaTruck,
        color: "#00FFC2",
        image: logisticsImg,
    },
    {
        id: "aviation",
        title: "Aviation & Aerospace",
        shortTitle: "Aviation",
        desc: "Secure airports, fleets, and aerospace facilities with intelligent solutions.",
        icon: FaPlane,
        color: "#FF3E00",
        image: aviationImg,
    },
];
