import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArchitectureLabScene } from '../../three/scenes/ArchitectureLabScene';
import { architectureNodes } from '../../config';
import { ArchitectureNode } from '../../types';
import { Shield, CheckCircle2, Layers } from 'lucide-react';

export function ArchitectureLab() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(architectureNodes[2]); // Default Reverse Proxy

  return (
    <section id="architecture" className="py-24 border-b border-[#1e242f] bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#1e242f] pb-3 mb-10 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 text-red-500 font-bold">
            <span>[05]</span>
            <span className="text-white">INTERACTIVE 3D ARCHITECTURE LAB</span>
          </div>
          <span>SIMULATION // DEPLOY-MESH</span>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-heading tracking-tight mb-2">
            Architecture Lab.
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Interactive distributed telemetry playground. Click any 3D node to inspect failure domains and security rules.
          </p>
        </div>

        {/* 3D Visualizer & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
          
          {/* 3D Stage */}
          <div className="lg:col-span-8 border border-[#1e242f] bg-[#0d0e12] h-[500px] flex flex-col relative">
            
            {/* Stage Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e242f] bg-[#101216] text-xs">
              <span className="text-white font-bold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-red-500" />
                DISTRIBUTED TRAFFIC FLOW [3D]
              </span>
              <span className="text-slate-500 text-[10px]">POINTER_TILT: ENABLED</span>
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

              {/* Node Switcher Strip */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 z-10">
                {architectureNodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNode(n)}
                    className={`px-3 py-1 text-[11px] uppercase transition-colors ${
                      selectedNode.id === n.id
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-[#101216] text-slate-400 hover:text-white border border-[#1e242f]'
                    }`}
                  >
                    {n.layer}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Node Inspector Panel */}
          <div className="lg:col-span-4 border border-[#1e242f] bg-[#101216] p-5">
            
            <div className="flex justify-between items-center border-b border-[#1e242f] pb-2 mb-4 text-xs">
              <span className="text-red-500 font-bold">[NODE INSPECTION]</span>
              <span className="text-white">{selectedNode.layer}</span>
            </div>

            <div className="text-xl font-black text-white uppercase font-heading mb-1">{selectedNode.name}</div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
              {selectedNode.role}
            </p>

            <div className="mb-4">
              <div className="text-[10px] text-slate-500 uppercase mb-1.5">STACK &amp; PROTOCOLS:</div>
              <div className="flex flex-wrap gap-1">
                {selectedNode.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-[#0a0a0c] border border-[#1e242f] text-[10px] text-cyan-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Reliability Advice */}
            <div className="p-3 border border-[#1e242f] bg-[#0d0e12] mb-3">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                HIGH-AVAILABILITY RULE:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedNode.reliabilityTip}
              </p>
            </div>

            {/* Security Isolation Advice */}
            <div className="p-3 border border-[#1e242f] bg-[#0d0e12]">
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-bold mb-1">
                <Shield className="w-3.5 h-3.5" />
                SECURITY HARDENING:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedNode.securityTip}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
