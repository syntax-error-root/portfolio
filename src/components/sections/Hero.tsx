import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { InfrastructureHeroScene } from '../../three/scenes/InfrastructureHeroScene';
import { profileConfig } from '../../config';
import { ArrowRight, Terminal, Activity, Server, Radio } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* 3D Real-Time WebGL Canvas */}
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

      {/* Cyber Grid Masked Layer */}
      <div className="absolute inset-0 z-1 pointer-events-none cyber-grid opacity-30" />

      {/* Gradient Atmospheric Fog */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-radial from-transparent via-[#07090e]/50 to-[#07090e]" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Typography */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* System Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-950/40 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              <span className="text-[11px] font-mono tracking-widest text-sky-300 uppercase">
                {profileConfig.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
              Engineering the <br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                invisible.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed font-light">
              {profileConfig.supportingCopy}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#architecture"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 bg-slate-900/60 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-md"
              >
                Architecture Lab
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-sky-500/30 bg-sky-950/30 text-sky-300 font-mono text-xs hover:bg-sky-900/40 transition-all"
              >
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>Launch CLI</span>
              </button>
            </div>
          </div>

          {/* Telemetry Status Console Module */}
          <div className="lg:col-span-4 w-full">
            <div className="glass-panel rounded-xl p-5 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                    SYS_TELEMETRY.RUN
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  LIVE 60FPS
                </span>
              </div>

              {/* Real-time system log feed */}
              <div className="space-y-2.5 font-mono text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">[SYS]</span>
                  <span className="text-slate-300">Infrastructure initialized</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">[NET]</span>
                  <span className="text-slate-300">Distributed mesh connected</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">[CI/CD]</span>
                  <span className="text-slate-300">Continuous rollout ready</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">[OBS]</span>
                  <span className="text-slate-300">Prometheus telemetry active</span>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  ALL NODES HEALTHY
                </span>
                <span className="text-slate-500">BOGURA_NODE_01</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
