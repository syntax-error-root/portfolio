import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArchitectureLabScene } from '../../three/scenes/ArchitectureLabScene';
import { architectureNodes } from '../../config';
import { ArchitectureNode } from '../../types';
import { Shield, CheckCircle2, Layers, Cpu, Compass } from 'lucide-react';

export function ArchitectureLab() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(architectureNodes[2]); // Default Reverse Proxy

  return (
    <section id="architecture" className="relative py-28 bg-[#05070e] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>SIGNATURE INTERACTIVE 3D PLAYGROUND</span>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-heading tracking-tight mb-3">
            Architecture Lab.
          </h2>
          <p className="text-base text-slate-400 max-w-2xl">
            Interactive distributed telemetry playground. Click any 3D node or choose a layer below to inspect failure domains and security rules.
          </p>
        </div>

        {/* 3D Visualizer & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 3D Stage Container */}
          <div className="lg:col-span-8 glass-card rounded-3xl h-[520px] flex flex-col relative overflow-hidden border border-white/[0.08] shadow-2xl">
            
            {/* Stage Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  DISTRIBUTED INFRASTRUCTURE MESH
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Move cursor to tilt 3D view</span>
              </div>
            </div>

            {/* Three.js Canvas */}
            <div className="flex-1 w-full relative">
              <Canvas
                camera={{ position: [0, 3.5, 11], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ArchitectureLabScene
                    selectedNodeId={selectedNode.id}
                    onSelectNode={(node) => setSelectedNode(node)}
                  />
                </Suspense>
              </Canvas>

              {/* Layer Switcher Pills */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-10">
                {architectureNodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNode(n)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                      selectedNode.id === n.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-black/60 backdrop-blur-md text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                    }`}
                  >
                    {n.layer}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Node Inspector Panel */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-white/[0.08] shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300">
                  NODE SPECIFICATION
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                {selectedNode.layer}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white font-heading mb-2">
              {selectedNode.name}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {selectedNode.role}
            </p>

            <div className="mb-5">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                STACK &amp; PROTOCOLS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* High-Availability Advice */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-3">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>HIGH-AVAILABILITY RULE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.reliabilityTip}
              </p>
            </div>

            {/* Security Isolation Advice */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold mb-1.5">
                <Shield className="w-4 h-4 shrink-0" />
                <span>SECURITY ISOLATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.securityTip}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
