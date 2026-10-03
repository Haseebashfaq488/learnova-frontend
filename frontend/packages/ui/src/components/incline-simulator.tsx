"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Compass, Sparkles, Check } from "lucide-react";

export interface InclineSimulatorProps {
  className?: string;
  initialAngle?: number;
  massKg?: number;
  muK?: number;
}

export function InclineSimulator({
  className = "",
  initialAngle = 28,
  massKg = 5.0,
  muK = 0.15,
}: InclineSimulatorProps) {
  const [angle, setAngle] = useState(initialAngle);
  const [isRunning, setIsRunning] = useState(false);

  const g = 9.8;
  const angleRad = (angle * Math.PI) / 180;

  // Physics calculations
  const totalWeight = massKg * g; // 49 N
  const fgParallel = totalWeight * Math.sin(angleRad);
  const normalForce = totalWeight * Math.cos(angleRad);
  const fk = muK * normalForce;
  const netAccel = Math.max(0, (fgParallel - fk) / massKg);

  // SVG Geometry
  const rampWidth = 360;
  const rampHeight = rampWidth * Math.tan(angleRad);
  const cappedHeight = Math.min(200, rampHeight);

  // Block placement along ramp hypotenuse
  const blockX = 180;
  const blockY = -(cappedHeight * 0.5);

  const runTest = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1200);
  };

  return (
    <div className={`bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#0B2B53] text-white flex items-center justify-center text-xs font-bold">
            03
          </span>
          <h3 className="text-sm font-bold text-[#0B2B53]">
            Interactive Diagram: Vector Decomposition
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Vector Physics
        </span>
      </div>

      {/* Vector Canvas Area */}
      <div className="w-full bg-white rounded-xl p-4 border border-slate-200/80 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
        {/* Tilted frame indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 text-[11px] font-semibold text-slate-600">
          <Compass className="h-3.5 w-3.5 text-sky-600" />
          <span>Tilted Reference Frame (x&apos;, y&apos;)</span>
        </div>

        {/* Dynamic Vector SVG */}
        <svg
          viewBox="0 0 500 280"
          className="w-full max-w-lg h-60 select-none overflow-visible"
        >
          <defs>
            <marker id="arr-blue" markerWidth="6" markerHeight="6" refX="6" refY="5" viewBox="0 0 10 10" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#00A8E8" />
            </marker>
            <marker id="arr-green" markerWidth="6" markerHeight="6" refX="6" refY="5" viewBox="0 0 10 10" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
            </marker>
            <marker id="arr-red" markerWidth="6" markerHeight="6" refX="6" refY="5" viewBox="0 0 10 10" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#EF4444" />
            </marker>
            <marker id="arr-navy" markerWidth="6" markerHeight="6" refX="6" refY="5" viewBox="0 0 10 10" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0B2B53" />
            </marker>
          </defs>

          {/* Ground Baseline */}
          <line x1="40" y1="240" x2="460" y2="240" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

          {/* Ramp Assembly */}
          <g transform="translate(60, 240)">
            {/* Ramp Triangle */}
            <path
              d={`M 0 0 L ${rampWidth} 0 L 0 ${-cappedHeight} Z`}
              fill="#F1F5F9"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <line x1="0" y1={-cappedHeight} x2={rampWidth} y2="0" stroke="#0B2B53" strokeWidth="3" />

            {/* Incline Angle Arc */}
            <path
              d={`M ${rampWidth - 60} 0 A 60 60 0 0 0 ${rampWidth - 60 * Math.cos(angleRad)} ${-60 * Math.sin(angleRad)}`}
              fill="none"
              stroke="#00A8E8"
              strokeWidth="2"
            />
            <text x={rampWidth - 85} y="-8" fill="#0B2B53" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              θ = {angle}°
            </text>

            {/* Block on Incline */}
            <g transform={`translate(${blockX}, ${blockY}) rotate(${-angle})`}>
              {/* Block Body */}
              <rect
                x="-35"
                y="-35"
                width="70"
                height="35"
                rx="4"
                fill="#0B2B53"
                className={`transition-transform duration-200 ${isRunning ? "scale-95" : ""}`}
              />
              <text x="0" y="-13" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                m = {massKg.toFixed(1)} kg
              </text>

              {/* Normal Force Vector FN (Green: Perpendicular Up) */}
              <line
                x1="0"
                y1="-35"
                x2="0"
                y2={-35 - normalForce * 1.3}
                stroke="#10B981"
                strokeWidth="3"
                markerEnd="url(#arr-green)"
              />
              <text x="10" y={-35 - normalForce * 1.0} fill="#10B981" fontSize="12" fontWeight="700" fontFamily="sans-serif">
                FN
              </text>

              {/* Friction fk (Red: Up Incline) */}
              <line
                x1="-35"
                y1="-17.5"
                x2={-35 - fk * 2.8}
                y2="-17.5"
                stroke="#EF4444"
                strokeWidth="2.5"
                markerEnd="url(#arr-red)"
              />
              <text x={-45 - fk * 2.8} y="-22" fill="#EF4444" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                fk
              </text>

              {/* Downhill Parallel Gravity (Blue: Down Incline) */}
              <line
                x1="35"
                y1="-17.5"
                x2={35 + fgParallel * 2.2}
                y2="-17.5"
                stroke="#00A8E8"
                strokeWidth="2.5"
                markerEnd="url(#arr-blue)"
              />
              <text x={45 + fgParallel * 2.2} y="-22" fill="#00A8E8" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                Fg,∥
              </text>

              {/* True Gravity Fg = mg (Navy: Straight Down) */}
              <g transform={`rotate(${angle})`}>
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={totalWeight * 1.5}
                  stroke="#0B2B53"
                  strokeWidth="2.5"
                  markerEnd="url(#arr-navy)"
                />
                <text x="8" y={totalWeight * 1.2} fill="#0B2B53" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                  Fg = mg
                </text>
              </g>
            </g>
          </g>
        </svg>

        {/* Live Vector Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full pt-3 border-t border-slate-100">
          <div className="p-2.5 rounded-xl bg-slate-50 text-center">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Incline Angle θ</span>
            <span className="text-sm font-extrabold text-[#0B2B53]">{angle}°</span>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 text-center">
            <span className="block text-[10px] uppercase font-bold text-sky-600">Fg,∥ (Downhill)</span>
            <span className="text-sm font-extrabold text-sky-700">{fgParallel.toFixed(1)} N</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-center">
            <span className="block text-[10px] uppercase font-bold text-emerald-600">FN (Normal Force)</span>
            <span className="text-sm font-extrabold text-emerald-700">{normalForce.toFixed(1)} N</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 text-center">
            <span className="block text-[10px] uppercase font-bold text-rose-600">Net Accel ax</span>
            <span className="text-sm font-extrabold text-rose-700">{netAccel.toFixed(2)} m/s²</span>
          </div>
        </div>
      </div>

      {/* Controls Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        {/* Angle Slider */}
        <div className="flex items-center gap-3 w-full sm:w-2/3">
          <label htmlFor="angle-range" className="text-xs font-bold text-[#0B2B53] whitespace-nowrap">
            Adjust Angle θ:
          </label>
          <input
            id="angle-range"
            type="range"
            min="10"
            max="65"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00A8E8]"
          />
          <span className="font-mono text-xs font-bold text-[#0B2B53] w-10 text-right">
            {angle}°
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={runTest}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0B2B53] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{isRunning ? "Simulating..." : "Run Vector Test"}</span>
          </button>
          <button
            type="button"
            onClick={() => setAngle(28)}
            className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
            title="Reset to 28° default"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
