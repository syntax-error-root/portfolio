import React, { useState } from 'react';
import { skillsConfig } from '../../config';
import { SkillItem } from '../../types';
import { Cpu, Terminal, ArrowUpRight, Zap } from 'lucide-react';

export function Expertise() {
  const categories = [
    'ALL',
    'INFRASTRUCTURE',
    'CONTAINERS & ORCHESTRATION',
    'AUTOMATION & DELIVERY',
    'OBSERVABILITY',
    'CLOUD & PLATFORM ENGINEERING',
    'AI & WORKFLOW AUTOMATION',
  ] as const;

  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(skillsConfig[0]);

  const filteredSkills = activeTab === 'ALL'
    ? skillsConfig
    : skillsConfig.filter(s => s.category === activeTab);

  return (
    <section id="expertise" className="relative py-28 bg-[#05070e] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>TECHNICAL CAPABILITIES</span>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-heading tracking-tight mb-3">
            Engineered systems stack.
          </h2>
          <p className="text-base text-slate-400 max-w-2xl">
            Verified competencies across Linux systems, distributed container networks, cloud automation, and observability pipelines.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid + Dynamic Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Skills Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-950/40 to-slate-900/80 border-cyan-400/50 shadow-xl shadow-cyan-950/30 -translate-y-0.5'
                      : 'glass-card border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] text-cyan-300 border border-white/[0.08]">
                      {skill.category.split(' ')[0]}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
                  </div>
                  
                  <h4 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
                    <span>{skill.name}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5 -translate-y-0.5' : 'text-slate-600'}`} />
                  </h4>
                  
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Inspector Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            {selectedSkill ? (
              <div className="glass-card rounded-2xl p-6 border border-white/[0.08] shadow-2xl relative">
                
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white tracking-wider">
                      CAPABILITY INSPECTOR
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    INSPECT
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      TECHNOLOGY
                    </div>
                    <div className="text-2xl font-bold text-white font-heading">
                      {selectedSkill.name}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      CLASSIFICATION
                    </div>
                    <div className="text-xs font-mono text-cyan-300 font-semibold">
                      {selectedSkill.category}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      ENGINEERING SCOPE
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                      {selectedSkill.description}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                      RELIABILITY &amp; SECURITY CONTROLS
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>Automated health verification</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>Least-privilege isolation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>Auditable declarative configs</span>
                      </li>
                    </ul>
                  </div>

                  {selectedSkill.level && (
                    <div className="pt-2">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                        PROFICIENCY TIER
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono font-medium">
                        {selectedSkill.level}
                      </span>
                    </div>
                  )}

                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>

    </section>
  );
}
