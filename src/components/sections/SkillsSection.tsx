import React from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Code2, Server, Database, Wrench, Terminal, Cpu } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Code2 className="w-5 h-5 text-blue-500" />;
      case 1: return <Terminal className="w-5 h-5 text-cyan-500" />;
      case 2: return <Server className="w-5 h-5 text-indigo-500" />;
      case 3: return <Database className="w-5 h-5 text-emerald-500" />;
      case 4: return <Wrench className="w-5 h-5 text-amber-500" />;
      default: return <Cpu className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Technical Proficiency"
          title="Core Technologies & Engineering Stack"
          subtitle="Verified proficiency across modern frontend frameworks, backend server runtimes, relational and document database management, and development tooling."
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <Card key={category.title} className="flex flex-col h-full border border-slate-200 dark:border-slate-800">
              
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                  {getCategoryIcon(idx)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-3 flex-grow">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800"
                  >
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <Badge variant={skill.level === 'Advanced' ? 'blue' : 'tech'} size="sm">
                        {skill.level}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

            </Card>
          ))}
        </div>

        {/* Engineering Philosophy Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" /> AI-Assisted Software Engineering Workflow
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              I leverage modern AI coding tools to accelerate initial boilerplate generation and test-case creation, while maintaining strict human-in-the-loop review over database normalization, API security, and runtime error boundary handling.
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <Badge variant="status" dot size="md">
              High Velocity + Strict Quality
            </Badge>
          </div>
        </div>

      </div>
    </section>
  );
};
