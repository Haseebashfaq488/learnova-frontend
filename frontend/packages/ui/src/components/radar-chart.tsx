"use client";

import React, { useState } from "react";
import { RadarMetric } from "@learnova/types";

export interface RadarChartProps {
  metrics: RadarMetric[];
  width?: number;
  height?: number;
  className?: string;
}

export function RadarChart({
  metrics,
  width = 460,
  height = 400,
  className = "",
}: RadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const centerX = 230;
  const centerY = 190;
  const maxRadius = 135;

  // 6 angles in degrees (starting from top -90deg and rotating clockwise by 60deg)
  const angles = [-90, -30, 30, 90, 150, 210];

  const getCoordinates = (index: number, valueRatio: number) => {
    const angleRad = (angles[index] * Math.PI) / 180;
    const r = maxRadius * valueRatio;
    return {
      x: centerX + r * Math.cos(angleRad),
      y: centerY + r * Math.sin(angleRad),
    };
  };

  // Generate web polygon points for a given percentage level (0.2, 0.4, 0.6, 0.8, 1.0)
  const getGridPolygonPoints = (level: number) => {
    return angles
      .map((_, i) => {
        const pt = getCoordinates(i, level);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(" ");
  };

  // Generate data polygon points
  const dataPolygonPoints = metrics
    .map((m, i) => {
      const ratio = Math.min(1, Math.max(0, m.score / (m.fullMark || 100)));
      const pt = getCoordinates(i, ratio);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[430px] h-auto drop-shadow-sm overflow-visible"
      >
        <defs>
          <linearGradient id="learnovaSpiderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#00A8E8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B2B53" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="spiderDotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A8E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00A8E8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric Grid Levels */}
        <polygon
          points={getGridPolygonPoints(0.2)}
          fill="none"
          stroke="#e2e8f0"
          strokeDasharray="3,3"
          strokeWidth="1.2"
        />
        <polygon
          points={getGridPolygonPoints(0.4)}
          fill="none"
          stroke="#e2e8f0"
          strokeDasharray="3,3"
          strokeWidth="1.2"
        />
        <polygon
          points={getGridPolygonPoints(0.6)}
          fill="none"
          stroke="#e2e8f0"
          strokeDasharray="3,3"
          strokeWidth="1.2"
        />
        <polygon
          points={getGridPolygonPoints(0.8)}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1.2"
        />
        <polygon
          points={getGridPolygonPoints(1.0)}
          fill="#f8fafc"
          fillOpacity="0.4"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* Axis Spokes */}
        {angles.map((_, i) => {
          const outerPt = getCoordinates(i, 1.0);
          return (
            <line
              key={`spoke-${i}`}
              x1={centerX}
              y1={centerY}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="#e2e8f0"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Shaded Data Polygon Area */}
        <polygon
          points={dataPolygonPoints}
          fill="url(#learnovaSpiderGrad)"
          stroke="#00A8E8"
          strokeWidth="2.5"
          className="transition-all duration-300"
        />

        {/* Interactive Data Nodes */}
        {metrics.map((m, i) => {
          const ratio = Math.min(1, Math.max(0, m.score / (m.fullMark || 100)));
          const pt = getCoordinates(i, ratio);
          const isHovered = hoveredIndex === i;

          return (
            <g
              key={`node-${i}`}
              className="cursor-pointer transition-transform"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isHovered && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="12"
                  fill="url(#spiderDotGlow)"
                  className="animate-ping"
                />
              )}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? "6" : "4.5"}
                fill={m.score >= 85 ? "#10B981" : m.score >= 60 ? "#00A8E8" : "#EF4444"}
                stroke="#FFFFFF"
                strokeWidth="2"
                className="transition-all duration-200"
              />
            </g>
          );
        })}

        {/* Axis Labels */}
        {metrics.map((m, i) => {
          const labelPt = getCoordinates(i, 1.22);
          const isTop = i === 0;
          const isBottom = i === 3;
          const isRight = i === 1 || i === 2;
          const isLeft = i === 4 || i === 5;

          let textAnchor: "middle" | "start" | "end" = "middle";
          if (isRight) textAnchor = "start";
          if (isLeft) textAnchor = "end";

          const isHovered = hoveredIndex === i;

          return (
            <g key={`label-${i}`}>
              <text
                x={labelPt.x}
                y={labelPt.y + (isTop ? -6 : isBottom ? 14 : 0)}
                textAnchor={textAnchor}
                className={`text-[12px] font-semibold transition-colors duration-150 ${
                  isHovered ? "fill-indigo-600 font-bold" : "fill-slate-700"
                }`}
              >
                {m.concept}
              </text>
              <text
                x={labelPt.x}
                y={labelPt.y + (isTop ? 8 : isBottom ? 28 : 14)}
                textAnchor={textAnchor}
                className={`text-[11px] font-bold ${
                  m.score >= 85
                    ? "fill-emerald-600"
                    : m.score >= 60
                    ? "fill-sky-600"
                    : "fill-rose-500"
                }`}
              >
                {m.score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
