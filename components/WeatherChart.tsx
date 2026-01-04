"use client";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { icon: string; description: string; main: string }[];
}

interface WeatherChartProps {
  data: ForecastItem[];
}

export default function WeatherChart({ data }: WeatherChartProps) {
  const chartData = data.slice(0, 12).map((item) => {
    const time = new Date(item.dt * 1000);
    const hour = time.getHours();

    return {
      time: `${hour}:00`,
      temp: Math.round(item.main.temp),
    };
  });

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { time: string } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-3 shadow-xl">
          <p className="text-white font-semibold">{payload[0].payload.time}</p>
          <p className="text-white text-lg font-bold">{payload[0].value}°C</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
          unit="°"
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#60a5fa"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorTemp)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
