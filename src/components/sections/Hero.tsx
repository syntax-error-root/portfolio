import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { InfrastructureHeroScene } from '../../three/scenes/InfrastructureHeroScene';
import { profileConfig } from '../../config';
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#05070e]">
      
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Precision Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      {/* 3D WebGL Infrastructure Scene Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 9.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <InfrastructureHeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pointer-events-none">
        
        <div className="max-w-3xl flex flex-col items-start pointer-events-auto">
          
          {/* Pill Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md mb-6 shadow-lg shadow-cyan-500/5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wider text-cyan-300">
              {profileConfig.eyebrow}
            </span>
          </div>

          {/* Editorial Macro Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.02] tracking-tight font-heading mb-6">
            Engineering <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
              the invisible.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
            {profileConfig.supportingCopy}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 font-medium text-sm transition-all backdrop-blur-md hover:-translate-y-0.5"
            >
              <span>Let's Connect</span>
            </a>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/30 text-sm font-mono transition-all backdrop-blur-md"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Shell</span>
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
