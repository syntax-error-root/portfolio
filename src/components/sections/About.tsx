import React from 'react';
import { profileConfig } from '../../config';
import { Shield, Server, Cpu, CheckCircle2, Layers, GitBranch } from 'lucide-react';

export function About() {
  const architectureLayers = [
    {
      title: 'Edge Ingress & Zero-Trust TLS',
      desc: 'Nginx, Caddy, Cloudflare, automated ACME certificates with hardened SSL ciphers.',
      badge: 'INGRESS',
      color: 'text-cyan-400',
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-500/10',
      icon: Shield,
    },
    {
      title: 'Containerized Compute & Orchestration',
      desc: 'Docker, Compose, Kubernetes clusters with resource limits and health probes.',
      badge: 'COMPUTE',
      color: 'text-indigo-400',
      border: 'border-indigo-500/20',
      bg: 'bg-indigo-500/10',
      icon: Server,
    },
    {
      title: 'Real-time Telemetry & Alerting',
      desc: 'Prometheus metrics scraping, structured log routing, and Grafana dashboards.',
      badge: 'OBSERVE',
      color: 'text-purple-400',
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/10',
      icon: Cpu,
    },
    {
      title: 'Automated CI/CD Delivery Pipeline',
      desc: 'GitOps workflows, self-healing rollbacks, and automated container releases.',
      badge: 'DELIVERY',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/10',
      icon: GitBranch,
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#05070e] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>ENGINEER PROFILE &amp; PHILOSOPHY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          
          {/* Main Statement Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-6xl font-black text-white font-heading leading-tight">
              Beyond deployment. <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Into reliability.
              </span>
            </h2>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              {profileConfig.aboutPhilosophy}
            </p>

            <p className="text-base text-slate-400 leading-relaxed font-normal">
              High-availability systems aren't built on hope; they are engineered through strict failure isolation, deterministic state recovery, and automated verification. Every node, proxy, and container boundary is treated as a security and reliability perimeter.
            </p>

            {/* Core Capability Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {profileConfig.aboutHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-3.5 flex items-start gap-3 border border-white/[0.06]"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-200">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Topology Stack Column */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 border border-white/[0.08] relative">
              
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    SYSTEM ISOLATION TOPOLOGY
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  4-TIER ARCH
                </span>
              </div>

              {/* Layer Cards */}
              <div className="space-y-3">
                {architectureLayers.map((layer, idx) => {
                  const Icon = layer.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${layer.color}`} />
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {layer.title}
                          </span>
                        </div>
                        <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${layer.bg} ${layer.color} border ${layer.border}`}>
                          {layer.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pl-6.5">
                        {layer.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>CONVERGENCE TIME</span>
                <span className="text-cyan-400 font-bold">&lt; 120ms</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
