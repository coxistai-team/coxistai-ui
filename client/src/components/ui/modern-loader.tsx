"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, Zap } from "lucide-react"

interface ModernLoaderProps {
  size?: "sm" | "md" | "lg"
  text?: string
  variant?: "default" | "brain" | "sparkles" | "zap"
}

export const ModernLoader = ({ size = "md", text = "Loading...", variant = "default" }: ModernLoaderProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const icons = {
    default: null,
    brain: Brain,
    sparkles: Sparkles,
    zap: Zap,
  }

  const Icon = icons[variant]

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated Icon or Spinner */}
      <div className="relative">
        {Icon ? (
          <motion.div
            className={`${sizeClasses[size]} text-blue-400`}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        ) : (
          <motion.div className="relative">
            {/* Outer Ring */}
            <motion.div
              className={`${sizeClasses[size]} border-4 border-slate-700 rounded-full`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Inner Ring */}
            <motion.div
              className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full`}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Center Dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </motion.div>
          </motion.div>
        )}

        {/* Pulse Effect */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full`}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className={`${textSizes[size]} font-medium text-slate-300`}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.p>

      {/* Dots Animation */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const FullScreenLoader = ({ text = "Loading your experience..." }: { text?: string }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
            <Brain className="w-10 h-10 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        <ModernLoader size="lg" text={text} variant="brain" />

        <motion.div
          className="mt-8 text-slate-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Powered by AI • Built for Students
        </motion.div>
      </div>
    </div>
  )
}

export default ModernLoader
