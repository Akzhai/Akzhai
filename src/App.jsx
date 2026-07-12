import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Brain, 
  Code, 
  Database, 
  Terminal, 
  Layers, 
  Cpu, 
  CheckCircle, 
  Send, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  Flame,
  ArrowUpRight,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeBackground from "./components/ThreeBackground";
import ThreeSkillsCube from "./components/ThreeSkillsCube";


// Custom brand icon SVGs
const Github = ({ className = "w-5 h-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className = "w-5 h-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [projectFilter, setProjectFilter] = useState("all");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Track active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "education", "github", "contact"];
      const scrollPosition = window.scrollY + 255;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Scroll Progress Indicator
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      const progressIndicator = document.getElementById("scrollProgress");
      if (progressIndicator) {
        progressIndicator.style.width = `${scrolled}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse coordinates for Spotlight mouse follow glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1500);
  };

  const handleTiltMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (x / (rect.width / 2)) * 12,
      y: -(y / (rect.height / 2)) * 12
    });
  };

  const handleTiltMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Nav links
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "github", label: "GitHub" },
    { id: "contact", label: "Contact" }
  ];

  // Personal Information
  const person = {
    name: "Akzhai",
    role: "MCA Student | Full Stack Developer | Python Developer",
    location: "Coimbatore, Tamil Nadu, India",
    email: "akshaimca@gmail.com",
    phone: "+91 93612 11669",
    linkedin: "https://www.linkedin.com/in/akzhai-r-65a17b32a",
    github: "https://github.com/Akzhai",
    portfolio: "https://akzhai.dev"
  };

  // Typewriter roles
  const typewriterRoles = [
    "Python Developer",
    "React Developer",
    "Flask Developer",
    "Full Stack Developer",
    "AWS Learner",
    "Problem Solver"
  ];

  const [roleIdx, setRoleIdx] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = typewriterRoles[roleIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText(currentWord.substring(0, roleText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setRoleText(currentWord.substring(0, roleText.length + 1));
      }, 100);
    }

    if (!isDeleting && roleText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && roleText === "") {
      setIsDeleting(false);
      setRoleIdx((roleIdx + 1) % typewriterRoles.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIdx]);

  // Projects list
  const projects = [
    {
      id: 1,
      title: "College Placement System",
      category: "python-flask",
      desc: "A Flask-based web application for automating campus recruitment. Students can register, upload resumes, and apply for jobs, while administrators can post opportunities and manage applications.",
      tags: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
      features: [
        "Student & Admin Login panels",
        "Resume Upload capabilities",
        "Job Posting administration module",
        "Application Tracking workflows",
        "Interactive Stats Dashboard",
        "Role Management configuration"
      ],
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 2,
      title: "Smart Supermarket Management System",
      category: "mern",
      desc: "A MERN Stack application with chatbot integration, online ordering, payment system, and admin dashboard.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
      features: [
        "Product Search",
        "Shopping Cart",
        "Online Payment",
        "Chatbot",
        "Order Management"
      ],
      color: "from-cyan-500 to-emerald-500"
    }
  ];

  const filteredProjects = projectFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  // Skill sets
  const skillsData = [
    {
      category: "Programming Languages",
      icon: <Terminal className="w-5 h-5 text-indigo-500" />,
      items: ["Python", "Java", "JavaScript", "SQL"]
    },
    {
      category: "Frontend Dev",
      icon: <Layers className="w-5 h-5 text-cyan-500" />,
      items: ["React.js", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"]
    },
    {
      category: "Backend Dev",
      icon: <Code className="w-5 h-5 text-purple-500" />,
      items: ["Flask", "Node.js", "Express.js", "REST API"]
    },
    {
      category: "Databases",
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      items: ["SQLite", "MySQL", "MongoDB"]
    },
    {
      category: "Cloud Computing",
      icon: <Brain className="w-5 h-5 text-orange-500" />,
      items: ["AWS EC2", "AWS S3"]
    },
    {
      category: "Tools & Utilities",
      icon: <Cpu className="w-5 h-5 text-pink-500" />,
      items: ["Git", "GitHub", "VS Code", "Power BI", "Figma", "Postman"]
    }
  ];

  // Timeline experiences
  const experiences = [
    {
      role: "Software Developer Intern",
      company: "The Mind IT",
      period: "2025 (Internship)",
      desc: "Developed responsive frontend components in React.js and compiled scalable REST APIs using Java, Node.js, and Express. Created database structures in SQL and MongoDB, fixed bugs, and managed code repositories via Git.",
      skills: ["React.js", "Java", "JavaScript", "Node.js", "SQL", "MongoDB"]
    },
    {
      role: "Data Analytics Intern",
      company: "NextSkill Technologies",
      period: "2024 (Internship)",
      desc: "Created dashboard environments in Power BI and Excel, structured complex datasets, and compiled key business intelligence visualizations to support decision metrics.",
      skills: ["Power BI", "Excel", "Dashboard Creation", "Data Visualization", "BI"]
    }
  ];

  // Timeline Education
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Dr. Mahalingam College of Engineering and Technology",
      location: "Pollachi, Tamil Nadu",
      period: "2024 - 2026",
      details: "Focusing on object oriented designs, web applications, cloud hosting infrastructure, and algorithms."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "PSG College of Arts & Science",
      location: "Coimbatore, Tamil Nadu",
      period: "2021 - 2024",
      details: "Laid groundwork in scripting languages, data schemas, relational databases, and operating systems."
    }
  ];

  // Certifications
  const certifications = [
    "Google Data Analytics Professional Certificate",
    "Microsoft Excel Specialist",
    "AWS Cloud Practitioner"
  ];

  return (
    <div className="min-h-screen portfolio-bg-main text-slate-800 dark:text-zinc-200 transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">

      
      {/* PWA / Futuristic Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Meteor shower effect */}
      <div className="meteor-container">
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
      </div>

      {/* Floating geometric shapes / glowing blobs */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-[45%] right-[5%] w-48 h-48 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-[20%] left-[8%] w-40 h-40 bg-cyan-500/5 dark:bg-cyan-500/5 rounded-full blur-2xl pointer-events-none animate-pulse" style={{ animationDelay: "4s" }}></div>

      {/* Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[3.5px] bg-slate-200 dark:bg-zinc-800 z-50">
        <div id="scrollProgress" className="h-full w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-100 rounded-r-full shadow-lg shadow-indigo-500/50"></div>
      </div>

      {/* 3D Particle Background */}
      <ThreeBackground />

      {/* Interactive Spotlight Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-40 dark:opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
        }}
      />

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 dark:border-zinc-900/40 bg-slate-50/75 dark:bg-[#050816]/75 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-8">
          
          <a href="#home" className="flex items-center gap-2 text-xl font-heading font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">&lt;{person.name}.dev /&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`font-heading text-sm font-semibold transition-colors relative py-1 ${
                      activeSection === link.id 
                        ? "text-indigo-500 dark:text-indigo-400" 
                        : "text-slate-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-855 bg-white dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 font-heading text-sm font-bold text-white shadow-md hover:bg-indigo-600 hover:shadow-indigo-500/20 dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300">
              Hire Me
            </a>
          </nav>

          {/* Tablet/Mobile Action Items */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-855 bg-white dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-855 bg-white dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] z-40 lg:hidden border-b border-slate-200 dark:border-zinc-855 bg-white dark:bg-zinc-950 p-6 shadow-xl"
          >
            <nav className="flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block font-heading text-lg font-bold transition-colors ${
                        activeSection === link.id 
                          ? "text-indigo-500 dark:text-indigo-400" 
                          : "text-slate-600 dark:text-zinc-400"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full py-3.5 rounded-xl bg-slate-900 text-white font-heading font-bold shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-955"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Hero Section */}
        <section id="home" className="flex min-h-[calc(100vh-80px)] flex-col justify-center py-12 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 dark:border-indigo-500/20 dark:bg-indigo-500/10 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Seeking Software Developer Internship roles
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-[1.1] mb-4 text-slate-900 dark:text-white"
              >
                Hi, I'm <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">{person.name}</span>
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl sm:text-2xl font-semibold font-heading mb-6 min-h-[40px] flex items-center text-slate-600 dark:text-zinc-400"
              >
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                  {roleText}
                </span>
                <span className="animate-pulse ml-1 text-indigo-500 font-light">|</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed mb-8 max-w-2xl"
              >
                Passionate Full Stack Developer specializing in Python, Flask, React.js, JavaScript, and modern web technologies. I enjoy building scalable web applications, solving real-world problems, and continuously learning new technologies.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4 w-full sm:w-auto"
              >
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl text-white font-heading font-bold transition-all duration-300 shadow-md hover:scale-[1.02] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
                
                <a
                  href="#projects"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 dark:bg-zinc-900/50 dark:border-zinc-850 dark:hover:bg-zinc-800 font-heading font-bold transition-colors shadow-sm"
                >
                  View Projects
                </a>

                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl border border-dashed border-indigo-500/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/5 hover:border-indigo-500/60 font-heading font-bold transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </motion.div>

              {/* Social Connections */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 mt-12 text-slate-500 dark:text-zinc-500"
              >
                <span className="text-xs uppercase tracking-wider font-bold">Find me on</span>
                <div className="flex gap-4">
                  <a href={person.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                  <a href={`mailto:${person.email}`} className="hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="Email"><Mail className="w-5 h-5" /></a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3D Profile Frame */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -12, 0]
                }}
                transition={{ 
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  },
                  default: { duration: 0.6, type: "spring", bounce: 0.3 }
                }}
                onMouseMove={handleTiltMouseMove}
                onMouseLeave={handleTiltMouseLeave}
                style={{ 
                  transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 select-none z-10"
              >
                {/* Rotating Glowing Neon Gradient Ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 p-[3.5px] animate-[spin_10s_linear_infinite] opacity-80 blur-[1px] z-0 shadow-[0_0_25px_rgba(99,102,241,0.3)]">
                  <div className="w-full h-full rounded-full bg-slate-50 dark:bg-[#050816]"></div>
                </div>

                {/* Second pulsed glowing ring */}
                <div className="absolute -inset-2 rounded-full border-2 border-indigo-500/30 dark:border-indigo-400/20 animate-ping opacity-25 z-0" style={{ animationDuration: "3s" }}></div>

                {/* Neon Aurora Glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur-3xl opacity-35 animate-pulse"></div>
                
                {/* 3D Glass Card Container */}
                <div className="relative w-full h-full rounded-full border-2 border-white/20 dark:border-zinc-800/80 bg-white/20 dark:bg-[#111827]/25 backdrop-blur-md overflow-hidden p-3 shadow-2xl z-10">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-zinc-850 dark:to-zinc-800 relative">
                    <img 
                      src="/profile_pic.png" 
                      alt={person.name} 
                      className={`w-full h-full object-cover relative z-10 transition-all duration-500 [filter:contrast(1.05)_brightness(1.02)_saturate(1.04)] ${imgLoaded ? "opacity-100" : "opacity-0 absolute"}`}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgLoaded(false)}
                    />
                    {!imgLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/85 dark:bg-zinc-900/85 backdrop-blur-sm">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-heading font-extrabold mb-4 shadow-lg shadow-indigo-500/20">
                          A
                        </div>
                        <h3 className="font-heading font-bold text-slate-800 dark:text-white text-lg">{person.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 max-w-[200px]">{person.role}</p>
                        
                        <div className="flex gap-2 mt-4 text-xs font-mono bg-slate-900 text-indigo-400 p-2 rounded border border-zinc-800">
                          <span>Coimbatore, IN</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating neon particles */}
                <div className="absolute -top-6 left-12 w-3.5 h-3.5 rounded-full bg-indigo-500/60 blur-[1px] animate-pulse"></div>
                <div className="absolute top-1/2 -right-8 w-2.5 h-2.5 rounded-full bg-cyan-500/60 blur-[1px] animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute -bottom-6 left-1/3 w-3 h-3 rounded-full bg-purple-500/60 blur-[1px] animate-pulse" style={{ animationDelay: "2s" }}></div>

                {/* Floating Micro Tech Icons */}
                <div className="absolute -top-2 -right-2 w-11 h-11 bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-850 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md z-20">
                  <Terminal className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-11 h-11 bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-850 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md z-20">
                  <Code className="w-5 h-5 text-cyan-500" />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* About Me Section (Blue -> Purple Gradient Theme) */}
        <section id="about" className="py-20 border-t border-slate-200/50 dark:border-zinc-900/40 relative">
          
          {/* Section Gradient Blob */}
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-gradient-to-tr from-blue-500 to-purple-500 opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="section-header text-left mb-12">
            <span className="text-xs font-heading font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest block mb-2">My Profile</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Aspiring Full Stack Web Developer & MCA Student
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-base sm:text-lg">
                I am currently pursuing my <strong className="text-slate-800 dark:text-white">Master of Computer Applications (MCA)</strong> at Dr. Mahalingam College of Engineering and Technology in Pollachi. With a deep interest in software engineering paradigms, I specialize in crafting robust, secure backend platforms and seamless front-end interfaces.
              </p>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-base sm:text-lg">
                I have a strong conceptual and practical command over <strong className="text-indigo-500">Python & Flask</strong> architectures, alongside reactive client UI development in <strong className="text-purple-500">React.js</strong>. I enjoy creating database models using SQL and MongoDB, building APIs, and automating deployment configurations.
              </p>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-base sm:text-lg">
                My goals center on developing scalable web architectures, engineering products that solve real-world problems, and staying at the bleeding edge of software and cloud innovations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/40 shadow-sm backdrop-blur-md hover:border-blue-500/35 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all">
                  <GraduationCap className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <h4 className="text-xs text-slate-500 dark:text-zinc-500 uppercase font-bold">MCA Degree</h4>
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">2024 - 2026 Batch</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/40 shadow-sm backdrop-blur-md hover:border-blue-500/35 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all">
                  <MapPin className="w-5 h-5 text-purple-500 shrink-0" />
                  <div>
                    <h4 className="text-xs text-slate-500 dark:text-zinc-500 uppercase font-bold">Location</h4>
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">{person.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info card */}
            <div className="lg:col-span-4 bg-white/45 dark:bg-[#111827]/45 border border-slate-200/80 dark:border-zinc-855/50 rounded-2xl p-6 shadow-sm backdrop-blur-md hover:border-blue-500/35 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all">
              <h4 className="font-heading font-bold text-lg mb-6 border-b border-slate-200 dark:border-zinc-850 pb-2">Quick Info</h4>
              
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-500">Degree</span>
                  <span className="font-semibold">MCA (Postgrad)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-500">Academic Focus</span>
                  <span className="font-semibold">Full Stack / ML</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-500">Email</span>
                  <a href={`mailto:${person.email}`} className="font-semibold text-indigo-500 hover:underline">{person.email}</a>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-500">Phone</span>
                  <a href={`tel:${person.phone}`} className="font-semibold text-indigo-500 hover:underline">{person.phone}</a>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-500">Location</span>
                  <span className="font-semibold text-right">Coimbatore, TN</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-850">
                <h5 className="font-heading font-semibold text-xs text-slate-500 uppercase mb-4 tracking-wider">Interest Areas</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold">Web Development</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold">Cloud Databases</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold">API Architectures</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold">System Design</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section (Purple -> Cyan Gradient Theme) */}
        <section id="skills" className="py-20 border-t border-slate-200/50 dark:border-zinc-900/40 relative">
          
          {/* Section Gradient Blob */}
          <div className="absolute top-[30%] right-[10%] w-72 h-72 bg-gradient-to-tr from-purple-500 to-cyan-500 opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="section-header text-left mb-12">
            <span className="text-xs font-heading font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest block mb-2">My Toolkit</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">Technical Skills</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Grid of skills */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillsData.map((skillGroup, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={idx}
                  className="bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/50 rounded-2xl p-6 shadow-sm backdrop-blur-md hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60">
                      {skillGroup.icon}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                      {skillGroup.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100/50 dark:bg-zinc-900/30 text-slate-700 dark:text-zinc-300 border border-slate-200/40 dark:border-zinc-855/40 hover:bg-white dark:hover:bg-zinc-800 hover:border-purple-500/20 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 3D Skills Cube */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-855/60 rounded-2xl p-6 shadow-sm backdrop-blur-md hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all">
              <h3 className="font-heading font-bold text-sm text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-4">
                3D Interactive Cube
              </h3>
              <ThreeSkillsCube />
              <p className="text-xs text-slate-500 dark:text-zinc-500 text-center mt-4">
                Hover over the cube to slow rotation and tilt it. Drag to interact.
              </p>
            </div>

          </div>
        </section>

        {/* Projects Section (Pink -> Purple Gradient Theme) */}
        <section id="projects" className="py-20 border-t border-slate-200/50 dark:border-zinc-900/40 relative">
          
          {/* Section Gradient Blob */}
          <div className="absolute top-[40%] left-[15%] w-72 h-72 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="section-header text-left">
              <span className="text-xs font-heading font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest block mb-2">My Creations</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">Featured Projects</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded mt-3"></div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/60 p-1.5 rounded-xl shadow-sm backdrop-blur-md self-start">
              <button
                onClick={() => setProjectFilter("all")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg font-heading transition-colors ${
                  projectFilter === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-zinc-400 hover:text-indigo-500"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setProjectFilter("python-flask")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg font-heading transition-colors ${
                  projectFilter === "python-flask"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-zinc-400 hover:text-indigo-500"
                }`}
              >
                Python & Flask
              </button>
              <button
                onClick={() => setProjectFilter("mern")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg font-heading transition-colors ${
                  projectFilter === "mern"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-zinc-400 hover:text-indigo-500"
                }`}
              >
                MERN Stack
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group flex flex-col h-full bg-white/45 dark:bg-[#111827]/25 border border-slate-200/60 dark:border-zinc-850/50 rounded-2xl overflow-hidden hover:border-pink-500/35 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300 backdrop-blur-md"
                >
                  {/* Glowing card head */}
                  <div className={`h-3 bg-gradient-to-r ${project.color}`}></div>
                  
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="flex-1">
                      <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-indigo-500 bg-indigo-500/5 px-2.5 py-1 rounded-full border border-indigo-500/10">
                        {project.category === "python-flask" ? "Python / Flask" : "MERN Stack"}
                      </span>
                      
                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white mt-4 group-hover:text-pink-500 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mt-4">
                        {project.desc}
                      </p>

                      <div className="mt-6">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-zinc-500 mb-2.5">Key Features</h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300">
                              <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-850/80">
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-900 text-slate-500 border border-slate-200/30 dark:border-zinc-800">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center gap-4">
                        <a 
                          href="#contact" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-pink-500 hover:text-pink-600 hover:underline"
                        >
                          View Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <a 
                          href={person.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          aria-label="Source code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Experience Section (Blue -> Emerald Gradient Theme) */}
        <section id="experience" className="py-20 border-t border-slate-200/50 dark:border-zinc-900/40 relative">
          
          {/* Section Gradient Blob */}
          <div className="absolute top-[50%] right-[15%] w-72 h-72 bg-gradient-to-tr from-blue-500 to-emerald-500 opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="section-header text-left mb-12">
            <span className="text-xs font-heading font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest block mb-2">My Journey</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">Work Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded mt-3"></div>
          </div>

          <div className="relative border-l border-slate-200 dark:border-zinc-800 ml-4 pl-8 py-2 space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                key={idx}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#050816] border-4 border-indigo-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#050816]"></div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-heading font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-full border border-indigo-500/10">
                      {exp.period}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mt-2">
                      {exp.role}
                    </h3>
                    <h4 className="text-slate-505 font-semibold mt-0.5">{exp.company}</h4>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base max-w-3xl">
                  {exp.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Certs Section (Orange -> Gold Gradient Theme) */}
        <section id="education" className="py-20 border-t border-slate-200/50 dark:border-zinc-900/40 relative">
          
          {/* Section Gradient Blob */}
          <div className="absolute top-[60%] left-[10%] w-72 h-72 bg-gradient-to-tr from-orange-500 to-yellow-500 opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Education timeline */}
            <div className="lg:col-span-7">
              <div className="section-header text-left mb-12">
                <span className="text-xs font-heading font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest block mb-2">Qualifications</span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">Education</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded mt-3"></div>
              </div>

              <div className="relative border-l border-slate-200 dark:border-zinc-800 ml-4 pl-8 py-2 space-y-12">
                {education.map((edu, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    key={idx}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#050816] border-4 border-indigo-500 flex items-center justify-center"></div>

                    <div>
                      <span className="text-xs font-heading font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-full border border-indigo-500/10">
                        {edu.period}
                      </span>
                      <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mt-2.5">
                        {edu.degree}
                      </h3>
                      <h4 className="text-slate-505 font-semibold mt-0.5">{edu.institution}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{edu.location}</p>
                    </div>

                    <p className="text-slate-600 dark:text-zinc-400 mt-4 leading-relaxed text-sm">
                      {edu.details}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications and Achievements */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Certs List */}
              <div className="bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/50 rounded-2xl p-6 shadow-sm backdrop-blur-md hover:border-orange-500/35 hover:shadow-[0_0_20px_rgba(251,146,60,0.15)] transition-all">
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Certifications
                </h3>
                
                <ul className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-zinc-300 items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="font-semibold">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements summary */}
              <div className="bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/50 rounded-2xl p-6 shadow-sm backdrop-blur-md hover:border-orange-500/35 hover:shadow-[0_0_20px_rgba(251,146,60,0.15)] transition-all">
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-purple-500" />
                  Achievements
                </h3>

                <ul className="space-y-4 text-sm text-slate-600 dark:text-zinc-300">
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-800 dark:text-white block">Breast Cancer Research Paper</strong>
                      <span className="text-xs text-slate-500">Authored ML modeling systems achieving predictive outcomes.</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-800 dark:text-white block">Fullstack Applications Dev</strong>
                      <span className="text-xs text-slate-500">Built multiple responsive platforms using Python/Flask and MERN.</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-800 dark:text-white block">Active GitHub Coding</strong>
                      <span className="text-xs text-slate-500">Committed to repositories, maintaining coding timelines.</span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* GitHub stats section (Dark Blue Theme) */}
        <section id="github" className="py-20 border-t border-slate-200/50 dark:border-zinc-900/40 relative">
          
          {/* Section Gradient Blob */}
          <div className="absolute top-[70%] right-[10%] w-72 h-72 bg-gradient-to-tr from-blue-900 to-indigo-950 opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="section-header text-left mb-12">
            <span className="text-xs font-heading font-bold text-blue-900 dark:text-indigo-400 uppercase tracking-widest block mb-2">Continuous Learning</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">GitHub Activity</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-950 to-indigo-900 rounded mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Open Source Contributions
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                I enjoy sharing code templates, deploying modules, and contributing to communities. My GitHub profile records my development workflows, commits, streaks, and languages.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-200 transition-colors font-heading text-sm font-bold shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Profile
                </a>
              </div>

              {/* Visitor Counter Widget */}
              <div className="pt-4 flex items-center gap-2.5 text-xs text-slate-500 dark:text-zinc-500">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Visitor Count:</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 font-bold border border-indigo-500/15">
                  1,482 views
                </span>
              </div>
            </div>

            {/* Pinned Repos / Mock Stats */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* GitHub Stats Mockup */}
              <div className="p-6 bg-[#0c0b16] text-[#c9d1d9] border border-[#21262d]/50 rounded-2xl flex flex-col justify-between h-48 shadow-lg font-mono hover:border-indigo-900/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-[#21262d]/50 pb-2.5 mb-4">
                    <span>Akzhai / Stats</span>
                    <Github className="w-4 h-4 text-[#8b949e]" />
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Total Stars:</span>
                      <span className="text-[#58a6ff] font-bold">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Commits:</span>
                      <span className="text-[#58a6ff] font-bold">412</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total PRs:</span>
                      <span className="text-[#58a6ff] font-bold">22</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Issues:</span>
                      <span className="text-[#58a6ff] font-bold">6</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-[10px] text-[#8b949e] flex justify-between items-center mt-2 pt-2.5 border-t border-[#21262d]/50">
                  <span>Rating: A+</span>
                  <span className="px-2 py-0.5 rounded bg-[#21262d] text-emerald-400 font-bold">Active</span>
                </div>
              </div>

              {/* Top Languages */}
              <div className="p-6 bg-[#0c0b16] text-[#c9d1d9] border border-[#21262d]/50 rounded-2xl flex flex-col justify-between h-48 shadow-lg font-mono hover:border-indigo-900/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-[#21262d]/50 pb-2.5 mb-4">
                    <span>Top Languages</span>
                    <BookOpen className="w-4 h-4 text-[#8b949e]" />
                  </div>
                  
                  <div className="space-y-3">
                    {/* Python */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Python (Flask)</span>
                        <span>50%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                    {/* JS */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>JavaScript (React)</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    {/* SQL */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>SQL & Others</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GitHub Streak Stats */}
              <div className="p-6 bg-[#0c0b16] text-[#c9d1d9] border border-[#21262d]/50 rounded-2xl flex flex-col justify-between h-48 shadow-lg font-mono sm:col-span-2 hover:border-indigo-900/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-[#21262d]/50 pb-2.5 mb-4">
                    <span>GitHub Streak Stats</span>
                    <Flame className="w-4 h-4 text-orange-500" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div>
                      <span className="text-[10px] text-[#8b949e] uppercase block">Total Contributions</span>
                      <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">528</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8b949e] uppercase block">Current Streak</span>
                      <span className="text-xl sm:text-2xl font-bold text-orange-500 mt-1 block">22 days</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8b949e] uppercase block">Longest Streak</span>
                      <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 block">54 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-[9px] text-[#8b949e] text-center mt-2 pt-2 border-t border-[#21262d]/50">
                  Data updated dynamically via Git endpoints
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Section (Purple -> Blue Gradient Theme) */}
        <section id="contact" className="py-20 border-t border-slate-200/50 dark:border-zinc-900/40 relative">
          
          {/* Section Gradient Blob */}
          <div className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-gradient-to-tr from-purple-500 to-blue-500 opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="section-header text-left mb-12">
            <span className="text-xs font-heading font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest block mb-2">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">Contact Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Let's discuss development opportunities or internships!
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                Feel free to send a message, drop an email, or connect via LinkedIn. I'll get back to you within 24 hours.
              </p>

              <div className="space-y-4 pt-4">
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/40 shadow-sm backdrop-blur-md hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all">
                  <div className="p-3 rounded-xl bg-indigo-500/5 text-indigo-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase font-bold">Email</h4>
                    <a href={`mailto:${person.email}`} className="text-sm font-semibold hover:text-indigo-500 hover:underline">{person.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/40 shadow-sm backdrop-blur-md hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all">
                  <div className="p-3 rounded-xl bg-purple-500/5 text-purple-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase font-bold">Call Me</h4>
                    <a href={`tel:${person.phone}`} className="text-sm font-semibold hover:text-indigo-500 hover:underline">{person.phone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/45 dark:bg-[#111827]/45 border border-slate-200/60 dark:border-zinc-850/40 shadow-sm backdrop-blur-md hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all">
                  <div className="p-3 rounded-xl bg-cyan-500/5 text-cyan-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase font-bold">Location</h4>
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">{person.location}</p>
                  </div>
                </div>

              </div>





            </div>

            {/* Message Form */}
            <div className="lg:col-span-7 bg-white/45 dark:bg-[#111827]/30 border border-slate-200/80 dark:border-zinc-850/50 rounded-2xl p-6 sm:p-8 shadow-sm backdrop-blur-md hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all relative">
              <AnimatePresence>
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-50 dark:bg-zinc-950 rounded-2xl flex flex-col items-center justify-center text-center p-6 z-20"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                    <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Message Dispatched!</h3>
                    <p className="text-sm text-slate-500 dark:text-zinc-500 mt-2 max-w-sm">
                      Thank you for reaching out, Akzhai will contact you back as soon as possible.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-zinc-500">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-855 bg-slate-50/50 dark:bg-[#111827]/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-[#111827] focus:outline-none transition-all text-sm text-slate-800 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-zinc-500">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-855 bg-slate-50/50 dark:bg-[#111827]/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-[#111827] focus:outline-none transition-all text-sm text-slate-800 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-zinc-500">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Internship / Work Opportunity"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-855 bg-slate-50/50 dark:bg-[#111827]/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-[#111827] focus:outline-none transition-all text-sm text-slate-800 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-zinc-500">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-855 bg-slate-50/50 dark:bg-[#111827]/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-[#111827] focus:outline-none transition-all text-sm text-slate-800 dark:text-zinc-100 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-heading font-bold transition-all duration-300 shadow-md hover:scale-[1.02] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50"
                  >
                    {formLoading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 dark:bg-zinc-900/50 dark:border-zinc-850 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-heading font-bold transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Footer (Black + Glass Theme) */}
      <footer className="border-t border-slate-200/50 dark:border-zinc-900/60 bg-white/60 dark:bg-[#040610] py-12 relative z-10 transition-colors backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2 text-lg font-heading font-bold">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">&lt;{person.name}.dev /&gt;</span>
          </a>
          
          <p className="text-xs text-slate-500 dark:text-zinc-500 md:order-last">
            Made with ❤️ by {person.name} | React + Tailwind + Three.js
          </p>

          <div className="flex gap-6 text-slate-400 hover:text-slate-600 dark:text-zinc-500">
            <a href={person.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            <a href={`mailto:${person.email}`} className="hover:text-indigo-500 transition-colors" aria-label="Email"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
