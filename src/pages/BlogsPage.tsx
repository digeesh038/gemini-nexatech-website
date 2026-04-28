import { motion } from "framer-motion";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";

const BLOGS = [
  {
    id: 1,
    title: "The Future of AI in Industrial Automation",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing the manufacturing landscape...",
    date: "Feb 15, 2024",
    author: "Marketing Team",
    category: "AI & Tech",
  },
  {
    id: 2,
    title: "Cybersecurity Trends for Enterprise Systems",
    excerpt:
      "Protecting your digital assets in an increasingly connected corporate world...",
    date: "Feb 10, 2024",
    author: "Security Dept",
    category: "Cybersecurity",
  },
  {
    id: 3,
    title: "IoT Solutions for Modern Smart Cities",
    excerpt:
      "Building sustainable and efficient urban environments through connected sensors...",
    date: "Feb 05, 2024",
    author: "IoT Specialists",
    category: "IoT",
  },
  {
    id: 4,
    title: "Cloud Migration: Best Practices for 2024",
    excerpt:
      "Strategic approaches to moving your mission-critical infrastructure to the cloud...",
    date: "Jan 28, 2024",
    author: "Cloud Team",
    category: "Cloud",
  },
  {
    id: 5,
    title: "Predictive Maintenance in Oil & Gas",
    excerpt:
      "Reducing downtime and improving safety through advanced sensor data analysis...",
    date: "Jan 22, 2024",
    author: "Engineering Team",
    category: "Industries",
  },
  {
    id: 6,
    title: "Building Scalable Mobile Apps for Global Users",
    excerpt:
      "Overcoming technical challenges in developing cross-platform mobile experiences...",
    date: "Jan 15, 2024",
    author: "App Dev Team",
    category: "Development",
  },
];

const BlogCard = ({
  blog,
  index,
}: {
  blog: (typeof BLOGS)[0];
  index: number;
}) => {
  const isFirstThree = index < 3;

  return (
    <motion.div
      initial={
        isFirstThree ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.95 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: isFirstThree ? index * 0.1 : 0 }}
      className="group relative bg-[#001024]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-gemini-orange/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(253,142,24,0.1)]"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-gemini-blue/10 text-gemini-blue rounded-full text-[10px] font-black uppercase tracking-widest border border-gemini-blue/20">
            {blog.category}
          </span>
          <div className="flex items-center gap-2 text-gray-500 text-[10px]">
            <FaCalendarAlt className="text-gemini-orange" />
            {blog.date}
          </div>
        </div>

        <h3 className="text-xl font-black text-white mb-4 group-hover:text-gemini-orange transition-colors duration-300 leading-tight">
          {blog.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <div className="w-6 h-6 rounded-full bg-gemini-blue/20 flex items-center justify-center">
              <FaUser className="text-[10px] text-gemini-blue" />
            </div>
            {blog.author}
          </div>
          <button className="flex items-center gap-2 text-gemini-orange text-xs font-bold group/btn">
            READ MORE
            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BlogsPage = () => {
  return (
    <div className="bg-[#000510] min-h-screen pt-32 pb-24 overflow-hidden">
      <SEO 
        title="Tech Insights & Blogs"
        description="Stay updated with the latest trends in AI, IoT, Cybersecurity, and Industrial Automation. Explore perspectives and insights from the Gemini Nexatech team."
      />
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gemini-blue/10 blur-[120px] rounded-full -z-10" />

      <Container>
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gemini-orange font-black uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Our Perspectives
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tight"
          >
            LATEST <span className="text-gemini-blue">TECH</span>{" "}
            <span className="text-gemini-orange">INSIGHTS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Dive deep into the world of industrial innovation, custom software
            trends, and the future of enterprise technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((blog, idx) => (
            <BlogCard key={blog.id} blog={blog} index={idx} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogsPage;
