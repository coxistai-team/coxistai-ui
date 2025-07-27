import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  Target, 
  Star, 
  Sparkles,
  Brain,
  Rocket,
  Globe,
  Code,
  Calculator,
  PenTool,
  Music,
  Camera,
  Heart,
  Zap,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const LoadingDemo = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const demoElements = [
    { icon: BookOpen, color: "from-blue-400 to-purple-400", delay: 0, duration: 8 },
    { icon: GraduationCap, color: "from-purple-400 to-pink-400", delay: 1, duration: 10 },
    { icon: Lightbulb, color: "from-yellow-400 to-orange-400", delay: 2, duration: 12 },
    { icon: Target, color: "from-green-400 to-teal-400", delay: 3, duration: 9 },
    { icon: Star, color: "from-pink-400 to-red-400", delay: 4, duration: 11 },
    { icon: Brain, color: "from-indigo-400 to-purple-400", delay: 5, duration: 13 },
    { icon: Rocket, color: "from-orange-400 to-red-400", delay: 6, duration: 7 },
    { icon: Globe, color: "from-teal-400 to-blue-400", delay: 7, duration: 14 },
    { icon: Code, color: "from-emerald-400 to-green-400", delay: 8, duration: 10 },
    { icon: Calculator, color: "from-violet-400 to-purple-400", delay: 9, duration: 12 },
    { icon: PenTool, color: "from-cyan-400 to-blue-400", delay: 10, duration: 9 },
    { icon: Music, color: "from-pink-400 to-purple-400", delay: 11, duration: 11 },
    { icon: Camera, color: "from-yellow-400 to-orange-400", delay: 12, duration: 13 },
    { icon: Heart, color: "from-red-400 to-pink-400", delay: 13, duration: 8 },
    { icon: Zap, color: "from-yellow-400 to-orange-400", delay: 14, duration: 10 },
    { icon: Award, color: "from-amber-400 to-yellow-400", delay: 15, duration: 12 },
    { icon: Users, color: "from-blue-400 to-cyan-400", delay: 16, duration: 9 },
    { icon: TrendingUp, color: "from-green-400 to-emerald-400", delay: 17, duration: 11 },
    { icon: CheckCircle, color: "from-emerald-400 to-green-400", delay: 18, duration: 13 },
    { icon: Sparkles, color: "from-purple-400 to-pink-400", delay: 19, duration: 10 }
  ];

  const handleDemoLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Elements */}
        {demoElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute w-8 h-8 rounded-full bg-gradient-to-r ${element.color} flex items-center justify-center shadow-lg`}
            style={{
              left: `${10 + (index * 5) % 80}%`,
              top: `${15 + (index * 7) % 70}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            <element.icon className="w-4 h-4 text-white" />
          </motion.div>
        ))}

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-56 h-56 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Educational Symbols */}
        <motion.div
          className="absolute top-1/4 right-1/6 text-6xl opacity-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🎓
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 text-4xl opacity-10"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📚
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/6 text-5xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💡
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => setLocation('/')}
          className="flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Loading Demo
            <span className="inline-block ml-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-purple-400 inline" />
              </motion.div>
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience our beautiful loading animations and educational theme
          </p>
        </motion.div>

        {/* Demo Controls */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Interactive Loading Demo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Educational floating elements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Animated background particles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Smooth loading transitions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Educational color themes</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Try It Out</h3>
                <motion.button
                  onClick={handleDemoLoad}
                  className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Start Loading Demo'}
                </motion.button>
                
                {loading && (
                  <motion.div
                    className="w-full h-2 bg-white/10 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Educational Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { icon: Brain, label: "AI-Powered", value: "Smart Learning", color: "from-purple-400 to-pink-400" },
            { icon: Users, label: "Community", value: "Global Network", color: "from-blue-400 to-cyan-400" },
            { icon: TrendingUp, label: "Progress", value: "Real-time Tracking", color: "from-green-400 to-emerald-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{stat.label}</h3>
              <p className="text-gray-300 text-sm">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Path Visualization */}
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Learning Journey</h2>
            
            <div className="flex justify-center space-x-8 mb-8">
              {['🎯', '📖', '💡', '🚀', '🏆'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="text-4xl opacity-60"
                  animate={{
                    y: [-5, 5, -5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What You'll Experience</h3>
                <div className="space-y-3">
                  {[
                    "Personalized AI tutoring sessions",
                    "Interactive learning modules",
                    "Real-time progress tracking",
                    "Community collaboration",
                    "Achievement milestones"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Technology Stack</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "React", color: "from-blue-400 to-cyan-400" },
                    { name: "TypeScript", color: "from-blue-400 to-purple-400" },
                    { name: "Framer Motion", color: "from-purple-400 to-pink-400" },
                    { name: "Tailwind CSS", color: "from-cyan-400 to-blue-400" },
                    { name: "AI Integration", color: "from-green-400 to-emerald-400" },
                    { name: "Real-time", color: "from-orange-400 to-red-400" }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      className={`px-3 py-2 bg-gradient-to-r ${tech.color} rounded-lg text-center text-white text-sm font-medium`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingDemo;