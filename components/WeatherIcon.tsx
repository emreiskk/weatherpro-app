"use client";
import { motion } from "framer-motion";

interface WeatherIconProps {
  condition: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function WeatherIcon({ condition, size = "md" }: WeatherIconProps) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const iconSize = sizes[size];
  const weatherCondition = condition.toLowerCase();

  // Clear / Sunny
  if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
    return (
      <motion.div
        className={`${iconSize} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="20" fill="#FDB813" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.line
              key={angle}
              x1="50"
              y1="10"
              x2="50"
              y2="25"
              stroke="#FDB813"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: angle / 315,
              }}
            />
          ))}
        </svg>
      </motion.div>
    );
  }

  // Clouds
  if (weatherCondition.includes("cloud")) {
    return (
      <motion.div className={`${iconSize} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.ellipse
            cx="35"
            cy="45"
            rx="18"
            ry="15"
            fill="#E0E7EF"
            animate={{ x: [0, 3, 0], y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="55"
            cy="40"
            rx="22"
            ry="18"
            fill="#F0F4F8"
            animate={{ x: [0, -3, 0], y: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="65"
            cy="48"
            rx="16"
            ry="13"
            fill="#E0E7EF"
            animate={{ x: [0, 2, 0], y: [0, -1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    );
  }

  // Rain
  if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle")) {
    return (
      <motion.div className={`${iconSize} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Cloud */}
          <ellipse cx="35" cy="30" rx="18" ry="15" fill="#6B7280" />
          <ellipse cx="55" cy="25" rx="22" ry="18" fill="#9CA3AF" />
          <ellipse cx="65" cy="33" rx="16" ry="13" fill="#6B7280" />

          {/* Rain drops */}
          {[25, 40, 55, 70].map((x, i) => (
            <motion.line
              key={x}
              x1={x}
              y1="45"
              x2={x}
              y2="70"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>
      </motion.div>
    );
  }

  // Thunder
  if (weatherCondition.includes("thunder") || weatherCondition.includes("storm")) {
    return (
      <motion.div className={`${iconSize} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Dark cloud */}
          <ellipse cx="35" cy="30" rx="18" ry="15" fill="#374151" />
          <ellipse cx="55" cy="25" rx="22" ry="18" fill="#4B5563" />
          <ellipse cx="65" cy="33" rx="16" ry="13" fill="#374151" />

          {/* Lightning bolt */}
          <motion.path
            d="M 50 40 L 45 55 L 52 55 L 48 70 L 60 50 L 53 50 L 57 40 Z"
            fill="#FCD34D"
            stroke="#F59E0B"
            strokeWidth="1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        </svg>
      </motion.div>
    );
  }

  // Snow
  if (weatherCondition.includes("snow")) {
    return (
      <motion.div className={`${iconSize} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Cloud */}
          <ellipse cx="35" cy="30" rx="18" ry="15" fill="#D1D5DB" />
          <ellipse cx="55" cy="25" rx="22" ry="18" fill="#E5E7EB" />
          <ellipse cx="65" cy="33" rx="16" ry="13" fill="#D1D5DB" />

          {/* Snowflakes */}
          {[{ x: 30, y: 50 }, { x: 45, y: 55 }, { x: 60, y: 50 }, { x: 75, y: 55 }].map((pos, i) => (
            <motion.g
              key={i}
              animate={{
                y: [0, 30, 0],
                rotate: [0, 360],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <circle cx={pos.x} cy={pos.y} r="3" fill="#E0F2FE" />
              <line x1={pos.x - 4} y1={pos.y} x2={pos.x + 4} y2={pos.y} stroke="#BAE6FD" strokeWidth="1" />
              <line x1={pos.x} y1={pos.y - 4} x2={pos.x} y2={pos.y + 4} stroke="#BAE6FD" strokeWidth="1" />
              <line x1={pos.x - 3} y1={pos.y - 3} x2={pos.x + 3} y2={pos.y + 3} stroke="#BAE6FD" strokeWidth="1" />
              <line x1={pos.x - 3} y1={pos.y + 3} x2={pos.x + 3} y2={pos.y - 3} stroke="#BAE6FD" strokeWidth="1" />
            </motion.g>
          ))}
        </svg>
      </motion.div>
    );
  }

  // Mist / Fog
  if (weatherCondition.includes("mist") || weatherCondition.includes("fog") || weatherCondition.includes("haze")) {
    return (
      <motion.div className={`${iconSize} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[30, 42, 54, 66].map((y, i) => (
            <motion.line
              key={y}
              x1="20"
              y1={y}
              x2="80"
              y2={y}
              stroke="#9CA3AF"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ x: [-5, 5, -5], opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </svg>
      </motion.div>
    );
  }

  // Partly Cloudy
  if (weatherCondition.includes("few clouds") || weatherCondition.includes("scattered")) {
    return (
      <motion.div className={`${iconSize} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Sun */}
          <motion.circle
            cx="35"
            cy="35"
            r="15"
            fill="#FDB813"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Cloud */}
          <motion.g
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <ellipse cx="50" cy="50" rx="16" ry="13" fill="#E0E7EF" />
            <ellipse cx="65" cy="45" rx="18" ry="15" fill="#F0F4F8" />
            <ellipse cx="72" cy="52" rx="13" ry="11" fill="#E0E7EF" />
          </motion.g>
        </svg>
      </motion.div>
    );
  }

  // Night Clear
  if (weatherCondition.includes("night")) {
    return (
      <motion.div className={`${iconSize} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 45 20 Q 35 50 45 80 Q 70 70 75 50 Q 70 30 45 20 Z"
            fill="#FCD34D"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {[{ x: 25, y: 30 }, { x: 30, y: 45 }, { x: 20, y: 60 }].map((star, i) => (
            <motion.circle
              key={i}
              cx={star.x}
              cy={star.y}
              r="2"
              fill="#FFF"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </svg>
      </motion.div>
    );
  }

  // Default - Broken clouds / overcast
  return (
    <motion.div className={`${iconSize} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.ellipse
          cx="30"
          cy="40"
          rx="20"
          ry="16"
          fill="#9CA3AF"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.ellipse
          cx="52"
          cy="35"
          rx="24"
          ry="20"
          fill="#D1D5DB"
          animate={{ x: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.ellipse
          cx="68"
          cy="42"
          rx="18"
          ry="15"
          fill="#9CA3AF"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}
