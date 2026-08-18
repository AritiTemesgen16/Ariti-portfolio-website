import React from 'react';
import { Project } from '../../types';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  return (
    <Card hoverable className="flex flex-col h-full overflow-hidden group">
      {/* Thumbnail image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-t-lg -mt-6 -mx-6 mb-5 border-b border-slate-200/80 dark:border-slate-800">
        <img
          src={project.coverImage}
          alt={`${project.title} - ${project.subtitle}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge variant="blue" size="sm">
            {project.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-slate-950/80 text-white backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono-tech">
            {project.period}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 flex-grow">
          {project.summary}
        </p>

        {/* Role & Tech Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono-tech">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Role: {project.role}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="tech" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="outline" size="sm">
                +{project.technologies.length - 5}
              </Badge>
            )}
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-4 flex items-center justify-between gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenCaseStudy(project)}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Read Case Study
          </Button>

          <div className="flex items-center gap-1">
            {(project.githubUrl || project.caseStudy?.githubUrl) && (project.githubUrl || project.caseStudy?.githubUrl) !== '' && (
              <a
                href={project.githubUrl || project.caseStudy?.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={`View ${project.title} GitHub repository`}
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {(project.demoUrl || project.caseStudy?.demoUrl) && (project.demoUrl || project.caseStudy?.demoUrl) !== '' && (
              <a
                href={project.demoUrl || project.caseStudy?.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={`View ${project.title} live preview`}
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
