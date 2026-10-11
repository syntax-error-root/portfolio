import React, { useState } from 'react';
import { projectsConfig } from '../../config';
import { ProjectItem } from '../../types';
import { ArrowUpRight, Shield, Terminal } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem>(projectsConfig[0]);

  return (
    <section id="projects" className="py-24 border-b border-[#1e242f] bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#1e242f] pb-3 mb-10 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 text-red-500 font-bold">
            <span>[04]</span>
            <span className="text-white">DEPLOYED PRODUCTION CASE STUDIES</span>
          </div>
          <span>LOG // PROJ-DEPLOY</span>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-heading tracking-tight mb-2">
            Systems That Stay Online.
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Real architectural blueprints focusing on survivability, isolation, and automated delivery.
          </p>
        </div>

        {/* Blueprint Selector Tab Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e242f] border border-[#1e242f] mb-8 font-mono">
          {projectsConfig.map((p) => {
            const isSelected = activeProject.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`p-5 text-left transition-colors ${
                  isSelected
                    ? 'bg-[#161a23] text-white border-b-2 md:border-b-0 md:border-l-2 border-red-600'
                    : 'bg-[#101216] text-slate-400 hover:text-white hover:bg-[#13171e]'
                }`}
              >
                <div className="text-[10px] text-red-500 font-bold uppercase mb-1">[{p.badge}]</div>
                <div className="text-sm font-bold text-white uppercase leading-snug">{p.title}</div>
              </button>
            );
          })}
        </div>

        {/* Case Study Deep-Dive Terminal Pane */}
        <div className="border border-[#1e242f] bg-[#101216] p-6 sm:p-10 font-mono">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e242f] pb-6 mb-8">
            <div>
              <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-1">
                BLUEPRINT SPECIFICATION :: {activeProject.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-heading">
                {activeProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 border border-[#1e242f] bg-[#0d0e12] text-slate-300 hover:text-white hover:border-slate-400"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>REPOSITORY</span>
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white font-bold hover:bg-red-500"
                >
                  <span>LIVE PROD</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Problem & Solution */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                  [01] PROBLEM STATEMENT
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {activeProject.problemStatement}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                  [02] ARCHITECTURE &amp; SOLUTION
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {activeProject.architectureSolution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  DEPLOYED TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#0a0a0c] border border-[#1e242f] text-xs text-cyan-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Decisions & Security Isolation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 border border-[#1e242f] bg-[#0d0e12]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-red-500" />
                  KEY ENGINEERING DECISIONS
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                  {activeProject.engineeringDecisions.map((dec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 font-mono">»</span>
                      <span>{dec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border border-[#1e242f] bg-[#0d0e12]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  SECURITY &amp; ISOLATION CONTROLS
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                  {activeProject.securityConsiderations.map((sec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">»</span>
                      <span>{sec}</span>
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
