import React from 'react';
import { EXPERIENCE_ITEMS, PROFILE } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { GraduationCap, Briefcase, Globe, CheckCircle2, Calendar, MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Background & Education"
          title="Education, Practical Experience & Languages"
          subtitle="Grounded in formal Computer Science fundamentals and practical full-stack software development experience across multiple specialized web platforms."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Experience Timeline */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" /> Professional Track & Milestones
            </h3>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {EXPERIENCE_ITEMS.map((item) => (
                <div key={item.id} className="relative pl-10">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold ring-4 ring-white dark:ring-slate-950">
                    {item.type === 'Education' ? <GraduationCap className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                  </div>

                  <Card className="border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono-tech text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                          {item.type}
                        </span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {item.role}
                        </h4>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {item.organization}
                        </p>
                      </div>

                      <div className="text-right flex flex-col items-end">
                        <span className="text-xs font-mono-tech bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> {item.period}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {item.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold">
                        Key Highlights
                      </p>
                      <ul className="space-y-1.5">
                        {item.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.skillsUsed.map((sk) => (
                        <Badge key={sk} variant="tech" size="sm">
                          {sk}
                        </Badge>
                      ))}
                    </div>

                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Multilingual Proficiency */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Education Card */}
            <Card className="border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Academic Degree
                </h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {PROFILE.education.degree}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-tech">
                  {PROFILE.education.institution}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                  Focus: {PROFILE.education.focus}
                </p>
              </div>
            </Card>

            {/* Languages Card */}
            <Card className="border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Globe className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Languages Spoken
                </h3>
              </div>

              <div className="space-y-3">
                {PROFILE.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {lang.name}
                    </span>
                    <Badge variant="status" size="sm">
                      {lang.proficiency}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Multilingual fluency enables clear communication across local Ethiopian project stakeholders and global technical teams.
              </p>
            </Card>

          </div>

        </div>

      </div>
    </section>
  );
};
