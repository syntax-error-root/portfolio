import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { InfrastructureHeroScene } from '../../three/scenes/InfrastructureHeroScene';
import { profileConfig } from '../../config';
import { ArrowRight, Terminal, Activity, Crosshair } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 border-b border-[#1e242f] bg-[#0a0a0c]">
      
      {/* 3D WebGL Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-75">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <InfrastructureHeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Blueprint Grid & CRT scanlines */}
      <div className="absolute inset-0 z-1 pointer-events-none blueprint-grid opacity-30" />
      <div className="absolute inset-0 z-1 pointer-events-none crt-scanlines" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Top Mechanical Header Stamp */}
        <div className="flex items-center justify-between border-b border-[#1e242f] pb-3 mb-8 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-red-600"></span>
            <span className="text-white font-bold tracking-widest">[ DEPLOYMENT // PROD ]</span>
            <span className="text-slate-600">///</span>
            <span>SYSTEM IDENTIFIER: OM-928</span>
          </div>
          <div className="hidden sm:block text-slate-500">
            SPECIFICATION: DEVOPS &amp; DISTRIBUTED ARCHITECTURE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Main Macro-Typography Column */}
          <div className="lg:col-span-8 flex flex-col items-start">
            
            <div className="text-xs font-mono uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
              <span>///</span>
              <span>{profileConfig.eyebrow}</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.92] tracking-tighter uppercase font-heading mb-6">
              Engineering <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #ffffff' }}>
                The Invisible.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-8 border-l-2 border-red-600 pl-4 bg-[#101216]/60 backdrop-blur-sm py-2">
              {profileConfig.supportingCopy}
            </p>

            {/* Tactical Actions */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-500 transition-colors"
              >
                DEPLOYMENTS_LOG
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#architecture"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1e242f] bg-[#101216] text-white hover:border-slate-400 transition-colors uppercase"
              >
                ARCH_LAB [3D]
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 border border-[#1e242f] bg-[#101216] text-slate-300 hover:text-white transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-red-500" />
                <span>SHELL</span>
              </button>
            </div>
          </div>

          {/* Tactical Telemetry Readout Box */}
          <div className="lg:col-span-4 w-full">
            <div className="border border-[#1e242f] bg-[#101216]/90 p-5 font-mono text-xs backdrop-blur-md">
              
              <div className="flex items-center justify-between border-b border-[#1e242f] pb-2 mb-4 text-slate-400">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                  TELEMETRY_FEED
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 border border-emerald-800">
                  MON_ACTIVE
                </span>
              </div>

              <div className="space-y-2 text-slate-300 text-[11px]">
                <div className="flex justify-between border-b border-[#1e242f]/50 pb-1">
                  <span className="text-slate-500">KERNEL_VER</span>
                  <span className="text-white">6.8.0-GENERIC</span>
                </div>
                <div className="flex justify-between border-b border-[#1e242f]/50 pb-1">
                  <span className="text-slate-500">CONTAINERS</span>
                  <span className="text-emerald-400">42 RUNNING // 0 FAILED</span>
                </div>
                <div className="flex justify-between border-b border-[#1e242f]/50 pb-1">
                  <span className="text-slate-500">PROMETHEUS</span>
                  <span className="text-white">15s SCRAPE INTERVAL</span>
                </div>
                <div className="flex justify-between border-b border-[#1e242f]/50 pb-1">
                  <span className="text-slate-500">GATEWAY_EDGE</span>
                  <span className="text-cyan-400">TLS 1.3 / mTLS</span>
                </div>
                <div className="flex justify-between pt-1 text-slate-400">
                  <span>LOAD_AVG</span>
                  <span className="text-white">0.42 0.38 0.29</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e242f] flex justify-between items-center text-[10px] text-slate-500">
                <span>STATION: BOGURA_BD</span>
                <span className="text-red-500 font-bold">STATUS: ARMED</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
