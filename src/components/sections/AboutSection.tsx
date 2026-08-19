import React from 'react';
import { PROFILE } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { ProfilePhotoCard } from '../ui/ProfilePhotoCard';
import { Shield, Code, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const corePrinciples = [
    {
      title: "Functional Scope Discipline",
      description: "Build exactly what solves the problem without adding bloated features or unnecessary code complexity."
    },
    {
      title: "Data Integrity First",
      description: "Ensure relational database normalization, transaction isolation, and type safety across every layer."
    },
    {
      title: "Performance Under Constraints",
      description: "Optimize payload sizes and client rendering to deliver responsive experiences even under variable network speeds."
    },
    {
      title: "Clear Professional Communication",
      description: "Provide transparent project updates, clear technical documentation, and accountable execution timelines."
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Developer Profile"
          title="About Ariti Temesgen Wayu"
          subtitle="Software developer focused on building pragmatic, reliable web software, custom management tools, and database systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            <p className="font-medium text-slate-900 dark:text-slate-100 text-lg">
              I am a Software Developer holding degrees in both Computer Science and Management, based in Addis Ababa, Ethiopia. I combine software engineering expertise with business and operational insight to build reliable digital solutions that solve real-world operational challenges.
            </p>
            <p>
              My engineering approach prioritizes technical correctness, maintainability, and clean user experience over superficial trends. Having designed platforms like <strong className="text-slate-900 dark:text-slate-100">PharmaCore Ethiopia</strong> (pharmacy inventory with batch/expiry tracking) and <strong className="text-slate-900 dark:text-slate-100">AgriConnect Ethiopia</strong> (direct farmer marketplace with tri-lingual support), I understand how to turn complex real-world requirements into resilient software.
            </p>
            <p>
              Whether collaborating on full-time engineering teams or executing freelance client contracts, I bring strong TypeScript, React, Node.js, PostgreSQL, and MongoDB expertise to every project.
            </p>
            <div className="pt-4 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase font-mono-tech tracking-wider text-xs">Why Work With Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm"><Code className="w-4 h-4 text-blue-500" /> Full-Stack Capability</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Seamless integration from frontend React components to backend Express REST APIs and PostgreSQL/MongoDB schemas.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm"><Shield className="w-4 h-4 text-emerald-500" /> Honest Professionalism</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">No inflated marketing jargon or artificial metrics, only verifiable qualifications and working code.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Public visitors can view the photo, but photo replacement controls are disabled. */}
            <ProfilePhotoCard showUploadButton={false} />

            <Card className="border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"><Award className="w-5 h-5 text-blue-500" /> Core Engineering Values</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-tech">Guiding every commit, schema migration, and UI component</p>
              </div>
              <div className="space-y-4">
                {corePrinciples.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono-tech text-xs font-bold shrink-0 mt-0.5">{idx + 1}</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
