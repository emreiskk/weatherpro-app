"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  weatherCondition?: string;
}

export default function AnimatedBackground({ weatherCondition = "clear" }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  const getBackgroundGradient = () => {
    const condition = weatherCondition.toLowerCase();

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "from-gray-700 via-gray-600 to-slate-800";
    } else if (condition.includes("snow")) {
      return "from-blue-200 via-blue-100 to-slate-300";
    } else if (condition.includes("cloud")) {
      return "from-blue-400 via-sky-300 to-blue-500";
    } else if (condition.includes("clear")) {
      return "from-blue-400 via-cyan-300 to-blue-600";
    } else if (condition.includes("mist") || condition.includes("fog")) {
      return "from-gray-400 via-slate-300 to-gray-500";
    } else if (condition.includes("thunder")) {
      return "from-gray-800 via-slate-700 to-purple-900";
    }

    return "from-blue-400 via-cyan-300 to-blue-600";
  };

  const getParticleColor = () => {
    const condition = weatherCondition.toLowerCase();

    if (condition.includes("rain")) return "bg-blue-200/30";
    if (condition.includes("snow")) return "bg-white/60";
    if (condition.includes("cloud")) return "bg-white/20";

    return "bg-white/10";
  };

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`} />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"
        animate={{
          x: [-50, 50, -50],
          y: [-50, 50, -50],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Weather Particles */}
      {weatherCondition.toLowerCase().includes("rain") && (
        <div className="absolute inset-0">
          {particles.map((i) => (
            <motion.div
              key={i}
              className={`absolute w-0.5 h-8 ${getParticleColor()} rounded-full`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
              }}
              animate={{
                y: window.innerHeight + 20,
              }}
              transition={{
                duration: Math.random() * 1 + 0.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {weatherCondition.toLowerCase().includes("snow") && (
        <div className="absolute inset-0">
          {particles.map((i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 ${getParticleColor()} rounded-full`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
              }}
              animate={{
                y: window.innerHeight + 20,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
