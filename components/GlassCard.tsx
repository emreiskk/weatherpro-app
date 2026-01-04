"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`
        backdrop-blur-xl bg-white/10
        border border-white/20
        rounded-3xl shadow-2xl
        hover:bg-white/15
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
