import React from 'react';
import { profileConfig } from '../../config';
import { Shield, Server, Cpu, CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 border-b border-[#1e242f] bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Stamp Header */}
        <div className="flex items-center justify-between border-b border-[#1e242f] pb-3 mb-12 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 text-red-500 font-bold">
            <span>[02]</span>
            <span className="text-white">SYSTEM PHILOSOPHY &amp; SPECIFICATIONS</span>
          </div>
          <span>SECTION // PHIL-ARCH</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-heading leading-[0.95]">
              Beyond Deployment. <br />
              <span className="text-red-500">Into Reliability.</span>
            </h2>

            <p className="text-lg text-slate-300 font-normal leading-relaxed border-l-2 border-red-600 pl-4 bg-[#101216] p-4">
              {profileConfig.aboutPhilosophy}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              High-availability systems aren't built on hope; they are engineered through strict failure isolation, deterministic state recovery, and automated verification. Every node, proxy, and container boundary is treated as a security and reliability perimeter.
            </p>

            {/* Checklist Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e242f] border border-[#1e242f] pt-0">
              {profileConfig.aboutHighlights.map((highlight, idx) => (
                <div key={idx} className="bg-[#101216] p-3.5 font-mono text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">»</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Architecture Topology Blueprint */}
          <div className="lg:col-span-5 border border-[#1e242f] bg-[#101216] p-6 font-mono">
            <div className="flex justify-between items-center border-b border-[#1e242f] pb-3 mb-5 text-xs">
              <span className="text-white font-bold">[ SYSTEM ISOLATION MAP ]</span>
              <span className="text-red-500">REV 3.2</span>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Layer 1 */}
              <div className="p-3 border border-[#1e242f] bg-[#0d0e12] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-red-500" />
                  <div>
                    <div className="text-white font-bold">EDGE REVERSE PROXY // TLS</div>
                    <div className="text-[10px] text-slate-500">Nginx / Caddy · ACME Automated</div>
                  </div>
                </div>
                <span className="text-[10px] bg-red-950/60 text-red-400 px-2 py-0.5 border border-red-900">
                  INGRESS
                </span>
              </div>

              <div className="text-center text-slate-600 text-xs font-mono">│ │</div>

              {/* Layer 2 */}
              <div className="p-3 border border-[#1e242f] bg-[#0d0e12] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-white font-bold">CONTAINERIZED RUNTIME</div>
                    <div className="text-[10px] text-slate-500">Docker · Docker Compose · K8s</div>
                  </div>
                </div>
                <span className="text-[10px] bg-cyan-950/60 text-cyan-400 px-2 py-0.5 border border-cyan-900">
                  COMPUTE
                </span>
              </div>

              <div className="text-center text-slate-600 text-xs font-mono">│ │</div>

              {/* Layer 3 */}
              <div className="p-3 border border-[#1e242f] bg-[#0d0e12] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-white font-bold">CONTROL &amp; OBSERVABILITY</div>
                    <div className="text-[10px] text-slate-500">Prometheus · Grafana · n8n</div>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 border border-emerald-900">
                  METRICS
                </span>
              </div>

            </div>

            <div className="mt-5 pt-3 border-t border-[#1e242f] text-[10px] text-slate-500 flex justify-between">
              <span>FAILOVER: DETERMINISTIC</span>
              <span>ZERO-POINT-OF-FAILURE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
