import { motion } from "framer-motion";
import { usePageLoading } from "@/contexts/PageLoadingContext";
import React, { useState, useEffect } from "react";

interface PageLoaderProps {
  fullScreen?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ fullScreen }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const increment = prev < 70 ? Math.random() * 15 + 5 : Math.random() * 5 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const loader = (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Clean progress circle - main focus */}
      <div className="relative w-24 h-24 mb-6">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 72 72">
          <circle
            cx="36"
            cy="36"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-warm-300"
          />
          <motion.circle
            cx="36"
            cy="36"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className="text-warm-600"
            style={{
              strokeDasharray,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.3s ease-out'
            }}
          />
        </svg>
        
        {/* Simple percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-warm-700">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Minimal loading text */}
      <span className="text-warm-600 text-lg font-medium">
        Loading...
      </span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-beige-200/95 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return loader;
};

// Simplified mini loader
export const MiniLoader = ({
  size = "sm",
  className = "",
}: {
  size?: "xs" | "sm" | "md";
  className?: string;
}) => {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6", 
    md: "w-8 h-8",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <motion.div
        className="absolute inset-0 border-2 border-warm-300 border-t-warm-600 rounded-full"
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
          className="h-4 bg-warm-200 rounded-md overflow-hidden"
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

export default PageLoader;
