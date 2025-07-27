import { motion } from "framer-motion";
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
  CheckCircle
} from "lucide-react";

const PageLoader = () => {
  const loadingElements = [
    { icon: BookOpen, color: "from-blue-400 to-purple-400", delay: 0 },
    { icon: GraduationCap, color: "from-purple-400 to-pink-400", delay: 0.2 },
    { icon: Lightbulb, color: "from-yellow-400 to-orange-400", delay: 0.4 },
    { icon: Target, color: "from-green-400 to-teal-400", delay: 0.6 },
    { icon: Star, color: "from-pink-400 to-red-400", delay: 0.8 },
    { icon: Brain, color: "from-indigo-400 to-purple-400", delay: 1.0 },
    { icon: Rocket, color: "from-orange-400 to-red-400", delay: 1.2 },
    { icon: Globe, color: "from-teal-400 to-blue-400", delay: 1.4 },
    { icon: Code, color: "from-emerald-400 to-green-400", delay: 1.6 },
    { icon: Calculator, color: "from-violet-400 to-purple-400", delay: 1.8 },
    { icon: PenTool, color: "from-cyan-400 to-blue-400", delay: 2.0 },
    { icon: Music, color: "from-pink-400 to-purple-400", delay: 2.2 },
    { icon: Camera, color: "from-yellow-400 to-orange-400", delay: 2.4 },
    { icon: Heart, color: "from-red-400 to-pink-400", delay: 2.6 },
    { icon: Zap, color: "from-yellow-400 to-orange-400", delay: 2.8 },
    { icon: Award, color: "from-amber-400 to-yellow-400", delay: 3.0 },
    { icon: Users, color: "from-blue-400 to-cyan-400", delay: 3.2 },
    { icon: TrendingUp, color: "from-green-400 to-emerald-400", delay: 3.4 },
    { icon: CheckCircle, color: "from-emerald-400 to-green-400", delay: 3.6 },
    { icon: Sparkles, color: "from-purple-400 to-pink-400", delay: 3.8 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Elements */}
        {loadingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute w-6 h-6 rounded-full bg-gradient-to-r ${element.color} flex items-center justify-center shadow-lg`}
            style={{
              left: `${10 + (index * 4) % 80}%`,
              top: `${15 + (index * 3) % 70}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            <element.icon className="w-3 h-3 text-white" />
          </motion.div>
        ))}

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-56 h-56 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Educational Symbols */}
        <motion.div
          className="absolute top-1/4 right-1/6 text-4xl opacity-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🎓
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 text-3xl opacity-20"
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📚
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/6 text-4xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💡
        </motion.div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Coexist AI
              </span>
              <div className="text-sm text-white/60 font-medium">Learning Platform</div>
            </div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <motion.div
            className="w-64 h-2 bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Loading your learning experience</h2>
          <p className="text-white/60 text-sm">Preparing your personalized AI tutor...</p>
        </motion.div>

        {/* Educational Icons Row */}
        <motion.div
          className="flex justify-center space-x-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {['🎯', '📖', '💡', '🚀', '🏆'].map((emoji, index) => (
            <motion.div
              key={index}
              className="text-2xl opacity-60"
              animate={{
                y: [-3, 3, -3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Success Indicators */}
        <motion.div
          className="flex justify-center space-x-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              className="text-lg opacity-40"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "easeInOut"
              }}
            >
              ✅
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Skeleton Loader Component
interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  lines = 3,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-white/10 rounded-md overflow-hidden"
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Mini Loader Component
interface MiniLoaderProps {
  size?: "xs" | "sm" | "md";
  className?: string;
}

export const MiniLoader: React.FC<MiniLoaderProps> = ({
  size = "sm",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6", 
    md: "w-8 h-8",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <motion.div
        className="absolute inset-0 border-2 border-white/20 border-t-purple-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default PageLoader;
