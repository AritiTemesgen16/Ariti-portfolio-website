import React, { useEffect } from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Lightbulb, Layers, Calendar, User, ArrowLeft, Maximize2, Shield, Lock, Zap, Database } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenFullPage: (project: Project) => void;
  onContactClick: (serviceTitle?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenFullPage,
  onContactClick
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const cs = project.caseStudy;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-auto overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenFullPage(project);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Open Full Screen Case Study"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Full Detail Page
            </button>

            {cs.githubUrl && (
              <a
                href={cs.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="GitHub Repo"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {cs.demoUrl && (
              <a
                href={cs.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-10 overflow-y-auto flex-grow">
          
          {/* Title & Banner */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="blue" size="md">{project.category}</Badge>
              <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {project.period}
              </span>
              <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-500" /> {project.role}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {project.title}
            </h1>
            <p className="text-base text-blue-600 dark:text-blue-400 font-semibold italic">
              "{cs.valueProposition}"
            </p>

            {/* Main Image */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <img
                src={project.coverImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Executive Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              1. Project Overview & Scope
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {cs.overview}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
              <h3 className="text-base font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" /> The Problem
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {cs.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> The Solution
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {cs.solution}
              </p>
            </div>
          </div>

          {/* Architecture */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" /> 2. System Architecture
            </h2>
            <div className="bg-slate-900 text-slate-200 rounded-xl p-5 border border-slate-800 space-y-2.5 font-mono-tech text-xs">
              {cs.technicalArchitecture.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold shrink-0">0{idx + 1}.</span>
                  <p className="text-slate-300">{arch}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Database Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-500" /> 3. Database Design
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {cs.databaseDesign.overview}
            </p>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-mono-tech text-blue-800 dark:text-blue-300">
              <strong>Indexing Strategy:</strong> {cs.databaseDesign.indexingStrategy}
            </div>
          </div>

          {/* Tech Decisions */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              4. Technical Decisions
            </h2>
            <div className="space-y-3">
              {cs.importantTechnicalDecisions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {item.title}: <span className="font-normal">{item.decision}</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong>Rationale:</strong> {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-6 rounded-2xl bg-blue-600 text-white space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h3 className="text-base font-bold">View full interactive case study view?</h3>
              <p className="text-xs text-blue-100 mt-1">Access complete entity schema tables, security checklists, and performance baselines.</p>
            </div>
            <div className="flex items-center justify-center gap-2 shrink-0">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  onClose();
                  onOpenFullPage(project);
                }}
                className="bg-white text-blue-900 hover:bg-slate-100 font-bold"
              >
                Open Full Case Study Page
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

