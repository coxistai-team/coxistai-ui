"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  className?: string
  lines?: number
  variant?: "default" | "card" | "avatar" | "button" | "text"
  animated?: boolean
}

export const SkeletonLoader = ({ className, lines = 3, variant = "default", animated = true }: SkeletonLoaderProps) => {
  const baseClasses = "bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-lg"

  const variants = {
    default: "h-4 w-full",
    card: "h-48 w-full rounded-2xl",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24 rounded-xl",
    text: "h-4 w-3/4",
  }

  const shimmerAnimation = animated
    ? {
        backgroundPosition: ["200% 0", "-200% 0"],
      }
    : {}

  const shimmerTransition = animated
    ? {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }
    : {}

  if (variant !== "default") {
    return (
      <motion.div
        className={cn(baseClasses, variants[variant], className)}
        style={{
          backgroundImage: animated
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
            : undefined,
          backgroundSize: animated ? "200% 100%" : undefined,
        }}
        animate={shimmerAnimation}
        transition={shimmerTransition}
      />
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(baseClasses, index === lines - 1 ? "w-2/3" : "w-full", "h-4")}
          style={{
            backgroundImage: animated
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
              : undefined,
            backgroundSize: animated ? "200% 100%" : undefined,
          }}
          animate={shimmerAnimation}
          transition={{
            ...shimmerTransition,
            delay: animated ? index * 0.1 : 0,
          }}
        />
      ))}
    </div>
  )
}

export const BentoSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
      {/* Large card */}
      <motion.div
        className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          <SkeletonLoader variant="avatar" />
          <SkeletonLoader lines={2} />
          <SkeletonLoader variant="button" />
        </div>
      </motion.div>

      {/* Medium cards */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="space-y-3">
            <SkeletonLoader variant="avatar" className="w-8 h-8" />
            <SkeletonLoader lines={1} />
            <SkeletonLoader variant="text" />
          </div>
        </motion.div>
      ))}

      {/* Small cards */}
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
        >
          <div className="space-y-2">
            <SkeletonLoader variant="avatar" className="w-6 h-6" />
            <SkeletonLoader lines={1} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default SkeletonLoader
