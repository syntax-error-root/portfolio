import React from 'react';
import { profileConfig } from '../../config';
import { Shield, Server, Cpu, GitBranch, Layers, CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-28 relative z-10 border-t border-white/5 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            ENGINEERING PHILOSOPHY &amp; BACKGROUND
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Beyond deployment. <br />
            <span className="text-slate-400 font-light">Into reliability.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              {profileConfig.aboutPhilosophy}
            </p>

            <p className="text-slate-400 leading-relaxed font-light">
              Bridging application code and bare-metal reality requires deep respect for failure domains. Whether running Linux kernel tuning, orchestrating distributed Docker containers, or constructing automated telemetry pipelines, every component is built with defensive recovery in mind.
            </p>

            {/* Core Capability Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {profileConfig.aboutHighlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-mono text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Architecture Topology Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow rounded-2xl p-6 relative overflow-hidden">
              <div className="text-xs font-mono text-sky-400 tracking-wider uppercase mb-5 flex items-center justify-between border-b border-white/10 pb-3">
                <span>SYSTEM FLOW MAP</span>
                <span className="text-slate-400">ISOLATION ARCH</span>
              </div>

              {/* Connected Infrastructure Architecture Diagram */}
              <div className="space-y-4 font-mono text-xs">
                
                {/* Layer 1: Edge Proxy */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-sky-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="text-white font-bold">Edge Reverse Proxy &amp; TLS</div>
                      <div className="text-[10px] text-slate-400">Nginx / Caddy · Let's Encrypt</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded">INGRESS</span>
                </div>

                <div className="flex justify-center -my-2 text-sky-400/50">↓</div>

                {/* Layer 2: Workloads */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-indigo-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Server className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="text-white font-bold">Containerized Workloads</div>
                      <div className="text-[10px] text-slate-400">Docker · Docker Compose · K8s</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded">COMPUTE</span>
                </div>

                <div className="flex justify-center -my-2 text-indigo-400/50">↓</div>

                {/* Layer 3: Automation & Telemetry */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-white font-bold">Automation &amp; Observability</div>
                      <div className="text-[10px] text-slate-400">Prometheus · Grafana · n8n</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded">CONTROL</span>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 flex justify-between">
                <span>REDUNDANCY: MULTI-TIER</span>
                <span>FAILOVER: DETERMINISTIC</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
