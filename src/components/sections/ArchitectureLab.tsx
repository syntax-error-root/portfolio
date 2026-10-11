import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArchitectureLabScene } from '../../three/scenes/ArchitectureLabScene';
import { architectureNodes } from '../../config';
import { ArchitectureNode } from '../../types';
import { Shield, Activity, Layers, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function ArchitectureLab() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(architectureNodes[2]); // Default Reverse Proxy

  return (
    <section id="architecture" className="py-28 relative z-10 border-t border-white/5 bg-[#080c13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
              SIGNATURE 3D INTERACTIVE PLAYGROUND
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Architecture Lab.
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl font-light">
              Interactive 3D distributed pipeline. Inspect failure modes, TLS termination, container security, and telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="bg-sky-500/10 text-sky-300 border border-sky-500/20 px-3 py-1.5 rounded">
              INTERACTIVE 3D NODES
            </span>
          </div>
        </div>

        {/* 3D Visualizer Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 3D Canvas Stage */}
          <div className="lg:col-span-8 glass-panel-glow rounded-2xl h-[480px] relative overflow-hidden flex flex-col">
            
            {/* Top Bar Navigation of Pipeline */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 z-10 bg-[#07090e]/70 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>ACTIVE PIPELINE: INTERNET → MONITORING</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">CLICK ANY NODE TO INSPECT</span>
            </div>

            {/* Three.js Canvas */}
            <div className="flex-1 w-full relative">
              <Canvas
                camera={{ position: [0, 4, 11], fov: 45 }}
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

              {/* In-Canvas Quick Node Switcher Bottom Strip */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 z-10 pointer-events-auto">
                {architectureNodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNode(n)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                      selectedNode.id === n.id
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                        : 'bg-black/60 text-slate-300 hover:bg-black/90 border border-white/10'
                    }`}
                  >
                    {n.layer}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Detailed Component Inspector Sidebar */}
          <div className="lg:col-span-4">
            <div className="glass-panel-glow rounded-2xl p-6 relative">
              
              <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-2">
                LAYER INSPECTION :: {selectedNode.layer}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedNode.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-5">
                {selectedNode.role}
              </p>

              {/* Technologies */}
              <div className="mb-5">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">Core Tech:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-sky-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reliability Considerations */}
              <div className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-500/20 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  RELIABILITY &amp; HIGH-AVAILABILITY
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {selectedNode.reliabilityTip}
                </p>
              </div>

              {/* Security Considerations */}
              <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  SECURITY &amp; DEFENSE
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {selectedNode.securityTip}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
