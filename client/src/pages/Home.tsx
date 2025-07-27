import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Sparkles, 
  Users, 
  BookOpen, 
  Calendar,
  Star,
  ArrowRight,
  Play,
  Target,
  Zap,
  TrendingUp,
  Award,
  Clock,
  Heart,
  Rocket,
  Lightbulb,
  Trophy,
  Shield,
  Globe,
  Code,
  Palette,
  Brain,
  Eye,
  MousePointer,
  Zap as Lightning,
  CheckCircle,
  Smile,
  Coffee,
  Music,
  Camera,
  Gift,
  Flame
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const Home = () => {
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const skillTags = [
    "React", "TypeScript", "AI/ML", "Python", "JavaScript", "Node.js",
    "Design", "Animation", "Figma", "Vue.js", "Grids", "Tailwind",
    "Next.js", "GraphQL", "MongoDB", "Docker", "AWS", "Firebase"
  ];

  const funElements = [
    { icon: Coffee, text: "Fuel your creativity", color: "text-orange-400" },
    { icon: Music, text: "Learn with rhythm", color: "text-purple-400" },
    { icon: Camera, text: "Capture knowledge", color: "text-blue-400" },
    { icon: Gift, text: "Unlock your potential", color: "text-green-400" },
    { icon: Flame, text: "Ignite your passion", color: "text-red-400" },
    { icon: Brain, text: "Expand your mind", color: "text-pink-400" }
  ];

  const contentCards = [
    {
      id: 1,
      type: "WORKSHOP",
      title: "AI-Powered Learning Workshop",
      subtitle: "Dr. Sarah Chen • Interactive Sessions",
      bgColor: "bg-white/10 backdrop-blur-xl border border-white/20",
      accentColor: "bg-orange-100",
      icon: Zap,
      action: "Add event",
      features: ["Live Q&A", "Hands-on Projects", "Certificate"]
    },
    {
      id: 2,
      type: "COURSE",
      title: "Product Designer from Scratch",
      subtitle: "Beginner • 4-6 months • 12 Modules",
      bgColor: "bg-white/10 backdrop-blur-xl border border-white/20",
      accentColor: "bg-orange-100",
      icon: BookOpen,
      action: null,
      features: ["Portfolio Building", "Industry Mentors", "Job Ready"]
    },
    {
      id: 3,
      type: "EVENT",
      title: "Tech Meetup DevSum 2024",
      subtitle: "10/10/2023 - 14/10/2023 • Virtual & In-Person",
      bgColor: "bg-white/10 backdrop-blur-xl border border-white/20",
      accentColor: "bg-green-100",
      icon: Calendar,
      action: "Add event",
      features: ["Networking", "Workshops", "Hackathon"]
    },
    {
      id: 4,
      type: "STATS",
      title: "100K+",
      subtitle: "trained students worldwide",
      bgColor: "bg-purple-500/20 backdrop-blur-xl border border-purple-500/30",
      accentColor: "bg-purple-600",
      icon: Users,
      action: null,
      isStats: true,
      features: ["Active Community", "Global Reach", "Success Stories"]
    },
    {
      id: 5,
      type: "FEATURE",
      title: "Competitive Advantage",
      subtitle: "Stay ahead with cutting-edge AI technology",
      bgColor: "bg-yellow-400/20 backdrop-blur-xl border border-yellow-400/30",
      accentColor: "bg-yellow-500",
      icon: TrendingUp,
      action: null,
      features: ["AI-Powered", "Real-time", "Personalized"]
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Learners", icon: Users },
    { number: "98%", label: "Success Rate", icon: Trophy },
    { number: "24/7", label: "AI Support", icon: Shield },
    { number: "200+", label: "Expert Mentors", icon: Award }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Hero Section */}
        <motion.div 
          className="max-w-7xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-4xl font-bold text-white">Coexist AI</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block">Build</span>
            <span className="flex items-center justify-center space-x-4">
              <motion.span 
                className="inline-flex items-center px-6 py-3 bg-purple-500 rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-6 h-6 text-white mr-2" />
                <span className="text-white">your</span>
              </motion.span>
            </span>
            <span className="flex items-center justify-center space-x-4">
              <motion.span 
                className="inline-flex items-center px-6 py-3 bg-teal-400 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Star className="w-6 h-6 text-white mr-2" />
                <span className="text-white">skills</span>
              </motion.span>
              <motion.span 
                className="inline-flex items-center px-6 py-3 bg-yellow-400 rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Target className="w-6 h-6 text-white mr-2" />
                <span className="text-white">online</span>
              </motion.span>
            </span>
          </motion.h1>

          {/* Extended Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-6xl mx-auto mb-8 leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Learn and improve your skills with interactive courses and AI-powered tutoring built specifically for future professionals. 
            Join our global community of learners and unlock your potential with cutting-edge technology and personalized learning experiences.
          </motion.p>

          {/* Fun Elements Row */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {funElements.map((element, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <element.icon className={`w-4 h-4 ${element.color}`} />
                <span className="text-gray-400">{element.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full flex items-center space-x-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocation('/signup')}
            >
              <span>Get started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-full flex items-center space-x-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocation('/chat')}
            >
              <Play className="w-5 h-5" />
              <span>Try AI Tutor</span>
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-purple-400 mr-2" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Content Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {contentCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`${card.bgColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                if (card.type === "WORKSHOP") setLocation('/presentations');
                if (card.type === "COURSE") setLocation('/notes');
                if (card.type === "EVENT") setLocation('/calendar');
                if (card.type === "STATS") setLocation('/community');
                if (card.type === "FEATURE") setLocation('/code');
              }}
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${card.accentColor} rounded-full opacity-20 -translate-y-16 translate-x-16`} />
              
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  {card.type}
                </span>
                {card.action && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-300">{card.action}</span>
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 group-hover:translate-x-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  {card.subtitle}
                </p>
                
                {/* Features List */}
                {card.features && (
                  <div className="space-y-2 mb-4">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Stats Card Special Styling */}
                {card.isStats && (
                  <div className="mt-4 flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white" />
                    ))}
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className="absolute bottom-4 right-4">
                <card.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun Interactive Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Choose Coexist AI? 
            <span className="inline-block ml-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Smile className="w-8 h-8 text-yellow-400 inline" />
              </motion.div>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Learning</h3>
              <p className="text-gray-400">Personalized experiences that adapt to your learning style and pace</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Community</h3>
              <p className="text-gray-400">Connect with learners worldwide and share knowledge across borders</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Future-Ready Skills</h3>
              <p className="text-gray-400">Learn the most in-demand skills for tomorrow's job market</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Skill Tags */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Master the Latest Technologies
            <span className="inline-block ml-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Code className="w-6 h-6 text-purple-400 inline" />
              </motion.div>
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {skillTags.map((tag, index) => (
              <motion.div
                key={tag}
                className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium cursor-pointer hover:bg-purple-600 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 3.4 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your learning journey?
            <span className="inline-block ml-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="w-8 h-8 text-purple-400 inline" />
              </motion.div>
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of learners who are already building their future with AI-powered education. 
            Start your journey today and unlock unlimited possibilities!
          </p>
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-full text-lg flex items-center space-x-3 mx-auto transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation('/signup')}
          >
            <Sparkles className="w-6 h-6" />
            <span>Start Learning Today</span>
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
};

export default Home;
