import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const floatingShapes = [
    { id: 1, type: "cube", size: "w-8 h-8", color: "bg-warm-500", position: "top-10 left-10", delay: 0 },
    { id: 2, type: "circle", size: "w-6 h-6", color: "bg-beige-400", position: "top-32 right-20", delay: 2 },
    { id: 3, type: "diamond", size: "w-10 h-10", color: "bg-warm-600", position: "top-1/2 left-1/4", delay: 0 },
    { id: 4, type: "ring", size: "w-12 h-12", color: "border-beige-500", position: "top-3/4 right-1/3", delay: 1 },
    { id: 5, type: "gradient", size: "w-8 h-8", color: "gradient-warm", position: "top-1/3 right-10", delay: 2 }
  ];

  const mathSymbols = [
    { id: 6, symbol: "∑", position: "bottom-20 left-1/2", delay: 2 },
    { id: 7, symbol: "∫", position: "top-20 right-1/4", delay: 0 },
    { id: 8, symbol: "π", position: "bottom-32 left-20", delay: 1 }
  ];

  const floatVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige-200 via-warm-200 to-beige-300 opacity-95"></div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-warm-900/10 via-transparent to-warm-800/5"></div>
      
      {/* Floating Shapes with updated colors to match the new theme */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.position} ${shape.size} opacity-10`}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: shape.delay }}
        >
          {shape.type === "cube" && (
            <div className="bg-warm-600/30 rounded-lg w-full h-full backdrop-blur-sm shadow-soft" />
          )}
          {shape.type === "circle" && (
            <div className="bg-beige-400/40 rounded-full w-full h-full backdrop-blur-sm shadow-soft" />
          )}
          {shape.type === "diamond" && (
            <div className="bg-warm-500/35 transform rotate-45 w-full h-full backdrop-blur-sm shadow-soft" />
          )}
          {shape.type === "ring" && (
            <div className="border-2 border-warm-600/40 rounded-full w-full h-full backdrop-blur-sm" />
          )}
          {shape.type === "gradient" && (
            <div className="gradient-warm opacity-40 rounded-full w-full h-full backdrop-blur-sm shadow-soft" />
          )}
        </motion.div>
      ))}

      {/* Math Symbols with updated colors */}
      {mathSymbols.map((symbol) => (
        <motion.div
          key={symbol.id}
          className={`absolute ${symbol.position} text-4xl font-bold text-warm-700/25 select-none text-shadow-soft`}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: symbol.delay }}
        >
          {symbol.symbol}
        </motion.div>
      ))}
      
      {/* Additional atmospheric elements */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-warm-500/15 to-beige-400/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" as const
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-l from-beige-400/20 to-warm-500/20 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: 2
        }}
      />
    </div>
  );
};

export default AnimatedBackground;