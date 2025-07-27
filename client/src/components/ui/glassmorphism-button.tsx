import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismButtonProps {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset";
}

const GlassmorphismButton = ({ 
  children, 
  className, 
  variant = "default", 
  size = "md",
  onClick,
  disabled = false,
  title,
  type = "button"
}: GlassmorphismButtonProps) => {
  const baseClasses = "font-semibold transition-all duration-300 border border-warm-400/30 flex items-center justify-center btn-animate";
  
  const variants = {
    default: "glassmorphism-button text-warm-50",
    outline: "glassmorphism text-warm-800 hover:glassmorphism-button hover:text-warm-50 border-warm-500/40"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl"
  };
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed transform-none",
        className
      )}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95, y: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.button>
  );
};

export default GlassmorphismButton;
