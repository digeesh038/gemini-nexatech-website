import {
    FaLaptopCode,
    FaGlobe,
    FaMobileAlt,
    FaPaintBrush,
    FaBrain,
    FaLightbulb,
    FaCloud,
    FaNetworkWired,
    FaBuilding,
    FaMicrochip,
    FaChartBar,
    FaTools,
} from "react-icons/fa";

import customSoftwareImg from "../../../assets/services/Custom-Software-Development.webp";
import webAppImg from "../../../assets/services/web_application_development.webp";
import mobileAppImg from "../../../assets/services/mobile-app-development.webp";
import uiUxImg from "../../../assets/services/ui_ux.webp";
import aiDevImg from "../../../assets/services/ai-development.webp";
import consultingImg from "../../../assets/services/Software-Consulting-opt.webp";
import cloudDevOpsImg from "../../../assets/services/cloud_devops.webp";
import apiIntegrationImg from "../../../assets/services/api_integration.webp";
import enterpriseAppImg from "../../../assets/services/enterprise-application-development.webp";
import iotImg from "../../../assets/services/iot.webp";
import dataAnalyticsImg from "../../../assets/services/data-analytics-techniques.avif";
import maintenanceImg from "../../../assets/services/application-support.webp";

export interface ServiceItem {
    id: string;
    icon: any;
    title: string;
    desc: string;
    points: string[];
    image: string;
    gradient: string;
}

export const servicesData: ServiceItem[] = [
    {
        id: "custom-software",
        icon: FaLaptopCode,
        title: "Custom Software Development",
        desc: "We design and develop tailored software solutions that align perfectly with your business processes, ensuring scalability and value.",
        points: [
            "Built for B2B & B2C businesses",
            "Scalable & future-ready architecture",
            "Secure, high-performance solutions",
        ],
        image: customSoftwareImg,
        gradient: "from-[#0047AB] to-[#002152]",
    },
    {
        id: "web-app",
        icon: FaGlobe,
        title: "Web Application Development",
        desc: "We create responsive, secure, and high-performing web applications that streamline operations and deliver seamless user experiences.",
        points: [
            "Modern frameworks & technologies",
            "Cross-browser compatibility",
            "Optimized performance & security",
        ],
        image: webAppImg,
        gradient: "from-[#00152F] to-[#0047AB]",
    },
    {
        id: "mobile-app",
        icon: FaMobileAlt,
        title: "Mobile Application Development",
        desc: "We develop powerful Android and iOS mobile applications that enhance mobility, productivity, and customer engagement.",
        points: [
            "Native & cross-platform development",
            "User-centric mobile experiences",
            "Scalable backend integration",
        ],
        image: mobileAppImg,
        gradient: "from-[#1a1a1a] to-[#FF8C00]/30",
    },
    {
        id: "ui-ux",
        icon: FaPaintBrush,
        title: "UX/UI Design Services",
        desc: "We craft intuitive and visually compelling digital experiences that enhance usability, engagement, and brand perception.",
        points: [
            "User-centered design approach",
            "Interactive prototypes & wireframes",
            "Modern, clean visual aesthetics",
        ],
        image: uiUxImg,
        gradient: "from-[#0047AB] via-[#000510] to-[#FF8C00]/20",
    },
    {
        id: "ai-dev",
        icon: FaBrain,
        title: "AI Development Services",
        desc: "We deliver AI-powered solutions that automate processes, enhance decision-making, and unlock predictive business insights.",
        points: [
            "Machine learning & automation",
            "Predictive analytics",
            "Intelligent dashboards & insights",
        ],
        image: aiDevImg,
        gradient: "from-[#000000] via-[#00152F] to-[#0047AB]",
    },
    {
        id: "consulting",
        icon: FaLightbulb,
        title: "IT & Software Consulting",
        desc: "We provide strategic technology consulting to help organizations choose, design, and implement the right digital solutions.",
        points: [
            "Technology roadmap planning",
            "System architecture advisory",
            "Process optimization strategies",
        ],
        image: consultingImg,
        gradient: "from-[#FF8C00]/20 to-[#00152F]",
    },
    {
        id: "cloud-devops",
        icon: FaCloud,
        title: "Cloud & DevOps Services",
        desc: "We enable businesses to leverage cloud infrastructure and DevOps practices for faster deployment, scalability, and operational efficiency.",
        points: [
            "Cloud migration & deployment",
            "CI/CD implementation",
            "Infrastructure management",
        ],
        image: cloudDevOpsImg,
        gradient: "from-[#0047AB]/60 to-[#00152F]",
    },
    {
        id: "api-integration",
        icon: FaNetworkWired,
        title: "API & System Integration",
        desc: "We build secure APIs and integrate enterprise systems to ensure seamless communication between platforms and devices.",
        points: [
            "Third-party integrations",
            "ERP & enterprise connectivity",
            "Secure data exchange",
        ],
        image: apiIntegrationImg,
        gradient: "from-[#1a1a1a] via-[#00152F] to-[#0047AB]/40",
    },
    {
        id: "enterprise-app",
        icon: FaBuilding,
        title: "Enterprise App Development",
        desc: "We develop robust enterprise-grade applications that automate workflows, improve collaboration, and support large-scale operations.",
        points: [
            "High scalability & performance",
            "Workflow automation",
            "Enterprise-level security",
        ],
        image: enterpriseAppImg,
        gradient: "from-[#002861] to-[#1a1a1a]",
    },
    {
        id: "iot-monitoring",
        icon: FaMicrochip,
        title: "IoT & Smart Monitoring",
        desc: "We design intelligent IoT-enabled systems that provide real-time monitoring, asset visibility, and operational control.",
        points: [
            "Real-time device connectivity",
            "Asset & fleet monitoring",
            "Data-driven alerts & reporting",
        ],
        image: iotImg,
        gradient: "from-[#FF8C00]/10 via-[#000510] to-[#0047AB]",
    },
    {
        id: "data-analytics",
        icon: FaChartBar,
        title: "Data Analytics & BI",
        desc: "We transform raw data into actionable insights through advanced analytics, dashboards, and reporting solutions.",
        points: [
            "Interactive dashboards",
            "Performance analytics",
            "Business decision insights",
        ],
        image: dataAnalyticsImg,
        gradient: "from-[#00152F] via-[#0047AB]/30 to-[#000A16]",
    },
    {
        id: "maintenance",
        icon: FaTools,
        title: "Application Support",
        desc: "We provide continuous monitoring, upgrades, and technical support to ensure your systems operate smoothly and efficiently.",
        points: [
            "SLA-based support",
            "Performance optimization",
            "Version upgrades & enhancements",
        ],
        image: maintenanceImg,
        gradient: "from-[#0a0a0a] to-[#0047AB]/40",
    },
];
