import React, { useState } from 'react';
import { projectsConfig } from '../../config';
import { ProjectItem } from '../../types';
import { ArrowUpRight, Shield, FolderGit2, CheckCircle2 } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem>(projectsConfig[0]);

  return (
    <section id="projects" className="relative py-28 bg-[#05070e] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PRODUCTION CASE STUDIES</span>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-heading tracking-tight mb-3">
            Systems that stay online.
          </h2>
          <p className="text-base text-slate-400 max-w-2xl">
            Real architectural case studies focusing on high availability, automated recovery, and container isolation.
          </p>
        </div>

        {/* Project Selector Navigation Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {projectsConfig.map((p) => {
            const isSelected = activeProject.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`p-5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/50 to-slate-900 border-cyan-400/50 shadow-xl shadow-cyan-950/30'
                    : 'glass-card border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase">
                    {p.badge}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
                </div>
                <div className="text-base font-bold text-white leading-snug">
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Project Deep-Dive Showcase Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-8">
            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
                ARCHITECTURAL SPECIFICATION :: {activeProject.badge}
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white font-heading">
                {activeProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-mono transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/20"
                >
                  <span>Live Preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Problem & Architecture */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Problem Statement
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                  {activeProject.problemStatement}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Architectural Solution
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                  {activeProject.architectureSolution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  Reliability &amp; Security Isolation
                </h4>
                <div className="space-y-1.5 bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                  {activeProject.securityConsiderations.map((sec, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Stack & Decisions */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Key Engineering Decisions
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {activeProject.engineeringDecisions.map((decision, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{decision}</span>
                    </li>
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
