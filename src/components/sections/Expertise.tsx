import React, { useState } from 'react';
import { skillsConfig } from '../../config';
import { SkillItem } from '../../types';
import { Layers, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

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
    <section id="expertise" className="py-28 relative z-10 border-t border-white/5 bg-[#090d14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            TECHNICAL CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered systems stack.
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl font-light">
            Modular infrastructure competencies verified through production deployment, not arbitrary percentage bars.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 rounded-md font-mono text-xs tracking-wider transition-all ${
                activeTab === cat
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Skill Blocks */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-slate-900 border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                      : 'bg-[#0c1017]/70 border-white/5 hover:border-white/20 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                      {skill.category.split(' ')[0]}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-sky-400' : 'text-slate-600'}`} />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{skill.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Inspection Card */}
          <div className="lg:col-span-4 sticky top-24">
            {selectedSkill ? (
              <div className="glass-panel-glow rounded-2xl p-6 relative">
                <div className="text-[11px] font-mono text-sky-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  SPECIFICATION INSPECTOR
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedSkill.name}</h3>
                <div className="inline-block text-[11px] font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 rounded mb-4">
                  {selectedSkill.category}
                </div>
                <div className="border-t border-white/10 pt-4 mb-4">
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Production Scope:</h5>
                  <p className="text-xs text-slate-200 leading-relaxed font-light">
                    {selectedSkill.description}
                  </p>
                </div>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5 font-mono text-[11px] text-slate-400 space-y-1">
                  <div>STATUS: PROD-TESTED</div>
                  <div>SECURITY: HARDENED</div>
                  <div>TELEMETRY: MONITORED</div>
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-6 text-center text-slate-500 font-mono text-xs">
                Select any capability to inspect production scope
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
