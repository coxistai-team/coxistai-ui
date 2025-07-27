import { useEffect, useRef } from "react";
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

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 250}, 70%, 60%)`,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const floatingElements = [
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

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
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

      {/* Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 border border-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Floating Dots */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={`dot-${index}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          style={{
            left: `${5 + (index * 7) % 90}%`,
            top: `${10 + (index * 9) % 80}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Wave Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-400/20 to-transparent"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

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

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M 100 200 Q 300 100 500 200"
          stroke="url(#gradient1)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          animate={{
            pathLength: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M 600 300 Q 800 200 1000 300"
          stroke="url(#gradient2)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          animate={{
            pathLength: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Particle Trails */}
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={`trail-${index}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          style={{
            left: `${20 + (index * 10) % 60}%`,
            top: `${30 + (index * 8) % 40}%`,
          }}
          animate={{
            y: [-50, 50, -50],
            x: [-20, 20, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Knowledge Flow Lines */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={`flow-${index}`}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
            style={{
              left: `${15 + (index * 20)}%`,
              top: `${10 + (index * 15)}%`,
            }}
            animate={{
              height: [0, 200, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: index * 1.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Success Indicators */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={`success-${index}`}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${25 + (index * 12) % 70}%`,
            top: `${20 + (index * 10) % 60}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeInOut"
          }}
        >
          ✅
        </motion.div>
      ))}

      {/* Learning Path Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="flex space-x-4"
          animate={{
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {['🎯', '📖', '💡', '🚀', '🏆'].map((emoji, index) => (
            <motion.div
              key={index}
              className="text-3xl opacity-30"
              animate={{
                y: [-5, 5, -5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedBackground;