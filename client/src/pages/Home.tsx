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
  Clock
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

  const floatingElements = [
    { id: 1, icon: Sparkles, color: "from-purple-400 to-pink-400", delay: 0 },
    { id: 2, icon: Star, color: "from-teal-400 to-blue-400", delay: 0.5 },
    { id: 3, icon: Target, color: "from-yellow-400 to-orange-400", delay: 1 },
  ];

  const skillTags = [
    "React", "TypeScript", "AI/ML", "Python", "JavaScript", "Node.js",
    "Design", "Animation", "Figma", "Vue.js", "Grids", "Tailwind"
  ];

  const contentCards = [
    {
      id: 1,
      type: "WORKSHOP",
      title: "AI-Powered Learning Workshop",
      subtitle: "Dr. Sarah Chen",
      bgColor: "bg-gray-50",
      accentColor: "bg-orange-100",
      icon: Zap,
      action: "Add event"
    },
    {
      id: 2,
      type: "COURSE",
      title: "Product Designer from Scratch",
      subtitle: "Beginner • 4-6 months",
      bgColor: "bg-amber-50",
      accentColor: "bg-orange-100",
      icon: BookOpen,
      action: null
    },
    {
      id: 3,
      type: "EVENT",
      title: "Tech Meetup DevSum",
      subtitle: "10/10/2023 - 14/10/2023",
      bgColor: "bg-green-50",
      accentColor: "bg-green-100",
      icon: Calendar,
      action: "Add event"
    },
    {
      id: 4,
      type: "STATS",
      title: "100K+",
      subtitle: "trained students",
      bgColor: "bg-purple-500",
      accentColor: "bg-purple-600",
      icon: Users,
      action: null,
      isStats: true
    },
    {
      id: 5,
      type: "FEATURE",
      title: "Competitive Advantage",
      subtitle: "Stay ahead with AI",
      bgColor: "bg-yellow-400",
      accentColor: "bg-yellow-500",
      icon: TrendingUp,
      action: null
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute w-20 h-20 rounded-full bg-gradient-to-r ${element.color} opacity-20 blur-xl`}
          style={{
            left: `${20 + element.id * 25}%`,
            top: `${30 + element.id * 15}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-6xl mx-auto mb-20"
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
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
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

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Learn and improve your skills with interactive courses and AI-powered tutoring built specifically for future professionals
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
        </motion.div>

        {/* Content Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {contentCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`${card.bgColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
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
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {card.type}
                </span>
                {card.action && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">{card.action}</span>
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 group-hover:translate-x-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {card.subtitle}
                </p>
                
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
                <card.icon className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Tags */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {skillTags.map((tag, index) => (
            <motion.div
              key={tag}
              className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium cursor-pointer hover:bg-purple-600 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your learning?
          </h2>
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
