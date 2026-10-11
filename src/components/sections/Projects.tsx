import React, { useState } from 'react';
import { projectsConfig } from '../../config';
import { ProjectItem } from '../../types';
import { ArrowUpRight, Shield, Terminal, Layers } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem>(projectsConfig[0]);

  return (
    <section id="projects" className="py-28 relative z-10 border-t border-white/5 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            PRODUCTION CASE STUDIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Systems that stay online.
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl font-light">
            Real architectural blueprints focusing on survivability, isolation, and automated delivery.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {projectsConfig.map((p) => {
            const isSelected = activeProject.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`text-left p-5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-sky-400/80 shadow-[0_0_25px_rgba(56,189,248,0.15)]'
                    : 'bg-[#0c1017]/60 border-white/5 hover:border-white/20 hover:bg-slate-900/40'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-sky-400 mb-1">{p.badge}</div>
                <div className="text-sm font-bold text-white leading-snug">{p.title}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Case Study Panel */}
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-sky-400 tracking-wider uppercase mb-1 block">
                CASE STUDY :: {activeProject.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all"
                >
                  <span>Production Live</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Problem & Architecture */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  [01] PROBLEM STATEMENT
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {activeProject.problemStatement}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  [02] ARCHITECTURE &amp; SOLUTION
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {activeProject.architectureSolution}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  DEPLOYED TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-sky-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Key Decisions & Security */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-white/5">
                <h4 className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  KEY ENGINEERING DECISIONS
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-light list-disc list-inside">
                  {activeProject.engineeringDecisions.map((dec, i) => (
                    <li key={i} className="leading-relaxed">{dec}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-white/5">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  SECURITY &amp; ISOLATION
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-light list-disc list-inside">
                  {activeProject.securityConsiderations.map((sec, i) => (
                    <li key={i} className="leading-relaxed">{sec}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
