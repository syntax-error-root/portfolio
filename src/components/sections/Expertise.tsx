import React, { useState } from 'react';
import { skillsConfig } from '../../config';
import { SkillItem } from '../../types';
import { ChevronRight, Cpu } from 'lucide-react';

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
    <section id="expertise" className="py-24 border-b border-[#1e242f] bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#1e242f] pb-3 mb-10 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 text-red-500 font-bold">
            <span>[03]</span>
            <span className="text-white">TECHNICAL CAPABILITY MATRIX</span>
          </div>
          <span>SPEC / CAP-03</span>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-heading tracking-tight mb-2">
            Engineered Systems Stack.
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Rigid competencies verified in production environments. No arbitrary skill percentages.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-px bg-[#1e242f] border border-[#1e242f] mb-8 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 transition-colors uppercase ${
                activeTab === cat
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-[#101216] text-slate-400 hover:text-white hover:bg-[#13171e]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Industrial Grid Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Skills Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e242f] border border-[#1e242f]">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#161a23] text-white border-l-2 border-red-600'
                      : 'bg-[#101216] text-slate-300 hover:bg-[#13171e]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                    <span className="text-red-500 font-bold">[{skill.category.split(' ')[0]}]</span>
                    <span className="text-slate-500">{isSelected ? 'ACTIVE' : 'SELECT'}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight mb-1">{skill.name}</h4>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed line-clamp-2">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Precision Inspector Card */}
          <div className="lg:col-span-4 border border-[#1e242f] bg-[#101216] p-5 font-mono">
            {selectedSkill ? (
              <div>
                <div className="flex justify-between items-center border-b border-[#1e242f] pb-2 mb-4 text-xs">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-red-500" />
                    CAPABILITY_INSPECTOR
                  </span>
                  <span className="text-red-500 text-[10px]">VERIFIED</span>
                </div>

                <div className="text-lg font-bold text-white uppercase mb-1">{selectedSkill.name}</div>
                <div className="text-[11px] text-red-400 mb-4">{selectedSkill.category}</div>

                <div className="border-t border-[#1e242f] pt-3 mb-4">
                  <div className="text-[10px] text-slate-500 uppercase mb-1">PRODUCTION SCOPE:</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedSkill.description}
                  </p>
                </div>

                <div className="bg-[#0a0a0c] p-3 border border-[#1e242f] space-y-1 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>DEPLOY_TEST:</span>
                    <span className="text-emerald-400">PASSED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AUDIT_TRAIL:</span>
                    <span className="text-white">ENFORCED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FAILOVER:</span>
                    <span className="text-white">AUTOMATED</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
}
