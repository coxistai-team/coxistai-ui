"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface OptimisticActionProps {
  isLoading: boolean
  isSuccess?: boolean
  isError?: boolean
  children: React.ReactNode
  loadingText?: string
  successText?: string
  errorText?: string
  className?: string
}

export const OptimisticAction = ({
  isLoading,
  isSuccess,
  isError,
  children,
  loadingText = "Processing...",
  successText = "Success!",
  errorText = "Error occurred",
  className,
}: OptimisticActionProps) => {
  return (
    <motion.div className={cn("relative", className)} layout>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center space-x-2 text-blue-400"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">{loadingText}</span>
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center space-x-2 text-green-400"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Check className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">{successText}</span>
          </motion.div>
        ) : isError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center space-x-2 text-red-400"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <X className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">{errorText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface OptimisticListProps<T> {
  items: T[]
  optimisticItems?: T[]
  renderItem: (item: T, isOptimistic?: boolean) => React.ReactNode
  keyExtractor: (item: T) => string
  className?: string
}

export function OptimisticList<T>({
  items,
  optimisticItems = [],
  renderItem,
  keyExtractor,
  className,
}: OptimisticListProps<T>) {
  const allItems = [...items, ...optimisticItems]

  return (
    <div className={cn("space-y-2", className)}>
      <AnimatePresence>
        {allItems.map((item, index) => {
          const isOptimistic = index >= items.length
          return (
            <motion.div
              key={keyExtractor(item)}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: isOptimistic ? 0.7 : 1,
                y: 0,
                scale: 1,
              }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className={cn("relative", isOptimistic && "opacity-70")}
            >
              {renderItem(item, isOptimistic)}
              {isOptimistic && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export const OptimisticButton = ({
  onClick,
  isLoading,
  children,
  className,
  ...props
}: {
  onClick: () => Promise<void> | void
  isLoading?: boolean
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-xl px-4 py-2 font-medium transition-all",
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
        "hover:from-blue-500 hover:to-purple-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </motion.div>
        ) : (
          <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
