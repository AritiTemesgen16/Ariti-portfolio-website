import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectCard } from '../ui/ProjectCard';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'B2B Platform', 'Enterprise App', 'FinTech', 'AgriTech'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          eyebrow="Real-World Systems"
          title="Featured Software Projects & Case Studies"
          subtitle="Detailed case studies showcasing technical problem solving, database architecture, multi-language localization, and production web engineering."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-mono-tech font-medium rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs font-mono-tech text-slate-500 dark:text-slate-400 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
          Need a custom management tool, marketplace, or API service? Click any project above for architectural details or contact Ariti directly.
        </div>

      </div>
    </section>
  );
};
