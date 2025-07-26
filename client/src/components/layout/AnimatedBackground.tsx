"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const floatingElements = [
    { id: 1, size: "w-4 h-4", color: "bg-blue-500/20", delay: 0, duration: 8 },
    { id: 2, size: "w-6 h-6", color: "bg-purple-500/20", delay: 2, duration: 12 },
    { id: 3, size: "w-3 h-3", color: "bg-green-500/20", delay: 4, duration: 10 },
    { id: 4, size: "w-5 h-5", color: "bg-orange-500/20", delay: 1, duration: 15 },
    { id: 5, size: "w-2 h-2", color: "bg-pink-500/20", delay: 3, duration: 9 },
  ]

  const gridPattern = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="grid grid-cols-12 gap-4 h-full">
          {gridPattern.map((i) => (
            <motion.div
              key={i}
              className="border-l border-slate-400"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mouse-following gradient */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 30,
        }}
      />

      {/* Large Atmospheric Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-green-500/5 to-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <motion.div
        className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [-50, 50, -50],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* Floating Particles */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} ${element.color} rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <motion.circle
              cx="50"
              cy="50"
              r="2"
              fill="currentColor"
              className="text-blue-400"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.line
              x1="50"
              y1="50"
              x2="100"
              y2="25"
              stroke="currentColor"
              strokeWidth="1"
              className="text-purple-400"
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.line
              x1="50"
              y1="50"
              x2="0"
              y2="75"
              stroke="currentColor"
              strokeWidth="1"
              className="text-green-400"
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural)" />
      </svg>

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export default AnimatedBackground
