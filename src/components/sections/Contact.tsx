import React from 'react';
import { Mail, ArrowUpRight, Terminal, CheckCircle2 } from 'lucide-react';
import { profileConfig } from '../../config';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="py-28 relative z-10 border-t border-white/5 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Callout Card */}
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-14 border border-white/10 relative overflow-hidden mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              DEPLOYMENT COMPLETE :: READY FOR DISCUSSIONS
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Have an infrastructure challenge?
            </h2>
            
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8">
              Let's engineer systems that are reliable, observable, and designed to scale under extreme production load.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:default13789@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <Mail className="w-4 h-4" />
                <span>Initiate Contact</span>
              </a>

              <a
                href="https://github.com/syntax-error-root"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="https://linkedin.com/in/omik-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info & system motifs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>© {currentYear} {profileConfig.name} — Bogura, Bangladesh</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>UPTIME: 99.99%</span>
            <span>STACK: VITE · REACT · THREE.JS · TAILWIND</span>
          </div>
        </div>

      </div>
    </section>
  );
}
