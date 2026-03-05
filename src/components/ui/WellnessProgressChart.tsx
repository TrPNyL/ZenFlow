"use client";

import { useEffect, useState, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressDataPoint {
  date: string;
  mood_score: number;
  energy_score: number;
  stress_score: number;
}

interface WellnessProgressChartProps {
  data: ProgressDataPoint[];
  height?: number;
}

// Custom Tooltip Component
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    // Format date for display
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    };

    return (
      <div className="bg-[var(--cream-light)] p-4 rounded-xl shadow-[var(--shadow-lg)] border border-[var(--cream-dark)]">
        <p className="font-[family-name:var(--font-heading)] text-[var(--forest)] font-medium mb-2">
          {label && formatDate(label)}
        </p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-[var(--forest-light)] capitalize">
                {entry.name.replace("_score", "")}:
              </span>
              <span className="text-sm font-medium text-[var(--forest)]">
                {entry.value}/10
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Custom Legend Component
function CustomLegend() {
  const items = [
    { key: "mood_score", label: "Mood", color: "#8fad88" },
    { key: "energy_score", label: "Energy", color: "#e8c4b0" },
    { key: "stress_score", label: "Stress", color: "#2d4a3e" },
  ];

  return (
    <div className="flex items-center justify-center gap-6 mb-4">
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-[var(--forest-light)]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function WellnessProgressChart({
  data,
  height = 350,
}: WellnessProgressChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div ref={chartRef} className="w-full">
      <CustomLegend />
      
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDelay: "200ms",
        }}
      >
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              {/* Mood Gradient - Sage */}
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8fad88" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8fad88" stopOpacity={0.05} />
              </linearGradient>

              {/* Energy Gradient - Blush */}
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e8c4b0" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#e8c4b0" stopOpacity={0.05} />
              </linearGradient>

              {/* Stress Gradient - Forest */}
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2d4a3e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2d4a3e" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--cream-dark)"
              vertical={false}
            />

            {/* X Axis */}
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: "var(--forest-light)", fontSize: 12 }}
              axisLine={{ stroke: "var(--cream-dark)" }}
              tickLine={false}
              dy={10}
            />

            {/* Y Axis */}
            <YAxis
              domain={[0, 10]}
              tick={{ fill: "var(--forest-light)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Mood Area - Sage */}
            <Area
              type="monotone"
              dataKey="mood_score"
              stroke="#8fad88"
              strokeWidth={isVisible ? 2.5 : 0}
              fill="url(#moodGradient)"
              animationDuration={2000}
              animationBegin={0}
              dot={{ fill: "#8fad88", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />

            {/* Energy Area - Blush */}
            <Area
              type="monotone"
              dataKey="energy_score"
              stroke="#e8c4b0"
              strokeWidth={isVisible ? 2.5 : 0}
              fill="url(#energyGradient)"
              animationDuration={2000}
              animationBegin={300}
              dot={{ fill: "#e8c4b0", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />

            {/* Stress Area - Forest */}
            <Area
              type="monotone"
              dataKey="stress_score"
              stroke="#2d4a3e"
              strokeWidth={isVisible ? 2.5 : 0}
              fill="url(#stressGradient)"
              animationDuration={2000}
              animationBegin={600}
              dot={{ fill: "#2d4a3e", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      {data.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--cream-dark)]">
          {[
            {
              label: "Avg Mood",
              value: (data.reduce((acc, d) => acc + d.mood_score, 0) / data.length).toFixed(1),
              color: "#8fad88",
            },
            {
              label: "Avg Energy",
              value: (data.reduce((acc, d) => acc + d.energy_score, 0) / data.length).toFixed(1),
              color: "#e8c4b0",
            },
            {
              label: "Avg Stress",
              value: (data.reduce((acc, d) => acc + d.stress_score, 0) / data.length).toFixed(1),
              color: "#2d4a3e",
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-[family-name:var(--font-heading)] font-semibold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[var(--forest-light)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sample data generator for demo purposes
export function generateSampleProgressData(days: number = 14): ProgressDataPoint[] {
  const data: ProgressDataPoint[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate somewhat realistic correlated data
    const baseMood = 6 + Math.sin(i * 0.5) * 2 + Math.random() * 2;
    const energy = Math.min(10, Math.max(1, baseMood + Math.random() * 2 - 1));
    const stress = Math.min(10, Math.max(1, 10 - baseMood * 0.7 + Math.random() * 3));

    data.push({
      date: date.toISOString().split("T")[0],
      mood_score: Math.round(baseMood * 10) / 10,
      energy_score: Math.round(energy * 10) / 10,
      stress_score: Math.round(stress * 10) / 10,
    });
  }

  return data;
}