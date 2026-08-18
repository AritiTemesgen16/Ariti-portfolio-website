import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { PROJECTS } from '../../data/portfolioData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SEOHead } from '../ui/SEOHead';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Shield,
  Zap,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Code2,
  Lock,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  onContactClick: (preselectedService?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onContactClick
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Find next and previous projects for quick switching
  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  const navSections = [
    { id: 'overview', label: '1. Overview & Users' },
    { id: 'architecture', label: '2. Architecture & Stack' },
    { id: 'database', label: '3. Database Schema' },
    { id: 'decisions', label: '4. Tech Decisions' },
    { id: 'challenges', label: '5. Challenges & Security' },
    { id: 'screenshots', label: '6. Screenshots & Roadmap' }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const cs = project.caseStudy;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": cs.overview,
    "applicationCategory": project.category,
    "operatingSystem": "Web",
    "author": {
      "@type": "Person",
      "name": "Ariti Temesgen Wayu"
    }
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 animate-fade-in">
      <SEOHead
        title={`${project.title} Case Study | Ariti Temesgen Wayu`}
        description={`${project.title}: ${cs.valueProposition} Designed and built by Ariti Temesgen Wayu.`}
        canonical={`https://arititemesgen.dev/projects/${project.id}`}
        ogImage={project.coverImage}
        keywords={[project.title, project.category, ...project.technologies, "Ariti Temesgen Wayu", "Case Study"]}
        jsonLd={projectJsonLd}
      />
      
      {/* Top Header Breadcrumb & Actions Bar */}

      <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono-tech"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </button>

          {/* Quick Links / Actions */}
          <div className="flex items-center gap-3">
            {cs.githubUrl && cs.githubUrl !== '' && (
              <a
                href={cs.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                title="View Source Repository"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}

            {cs.demoUrl && cs.demoUrl !== '' && (
              <a
                href={cs.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
                title="View Live Demo"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>

        </div>

        {/* Sticky Sub-Navigation Section Jump Bar */}
        <div className="bg-slate-100/80 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-2">
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono-tech font-medium whitespace-nowrap transition-colors ${
                  activeTab === sec.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner Header */}
      <header className="bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="blue" size="md">{project.category}</Badge>
            <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
              <Calendar className="w-3.5 h-3.5" /> {project.period}
            </span>
            <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
              <User className="w-3.5 h-3.5 text-blue-500" /> {project.role}
            </span>
          </div>

          {/* Title & Value Proposition */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-blue-600 dark:text-blue-400 max-w-4xl leading-relaxed">
              "{cs.valueProposition}"
            </p>
          </div>

          {/* Quick Metrics / Baseline Note Banner */}
          {cs.measuredResultsNote && (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono-tech text-amber-800 dark:text-amber-300">
              <Info className="w-4 h-4 shrink-0 text-amber-500" />
              <span><strong>Note on Metrics:</strong> {cs.measuredResultsNote}</span>
            </div>
          )}

          {/* Main Hero Cover Showcase Image */}
          <div className="relative aspect-video max-h-[500px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
            <img
              src={project.coverImage}
              alt={`${project.title} Case Study Cover`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-mono-tech text-blue-300 uppercase tracking-widest">
                  Software System Architecture
                </span>
                <p className="text-sm font-semibold text-slate-200">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Body Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* SECTION 1: OVERVIEW, PROBLEM, SOLUTION & TARGET USERS */}
        <section id="overview" className="scroll-mt-28 space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-500" /> 1. Project Overview & Scope
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-tech">
              Core system purpose, target demographics, problem definition, and engineering role
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Overview Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Executive System Summary
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {cs.overview}
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1 text-sm">
                  <span className="text-xs font-mono-tech font-bold uppercase text-slate-500 dark:text-slate-400 block">
                    My Role & Execution Responsibility
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {cs.myRole}
                  </p>
                </div>
              </Card>

              {/* Target Users */}
              <Card className="border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" /> Target Users & Intended Demographics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cs.targetUsers.map((userGroup, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-mono-tech font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {userGroup}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Problem & Solution Callout Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Problem Statement */}
              <div className="p-6 rounded-2xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 space-y-3">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>The Operational Problem</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {cs.problem}
                </p>
              </div>

              {/* Solution Statement */}
              <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>The Engineering Solution</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {cs.solution}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 2: TECHNICAL ARCHITECTURE & TECH STACK */}
        <section id="architecture" className="scroll-mt-28 space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-500" /> 2. Technical Architecture & Tech Stack
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-tech">
              System layer design, communication flow, and categorized technological tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* System Architecture Diagram Card */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                System Architecture Layers
              </h3>
              <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 border border-slate-800 space-y-4 font-mono-tech text-sm shadow-xl">
                <div className="text-xs uppercase tracking-wider text-blue-400 font-bold pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>System Architecture Breakdown</span>
                  <span className="text-slate-500">Tier 1 -&gt; Tier 3</span>
                </div>
                <div className="space-y-3">
                  {cs.technicalArchitecture.map((arch, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-800/80">
                      <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {arch}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Features List */}
              <div className="pt-2 space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Core Engineering Features
                </h3>
                <div className="space-y-2">
                  {cs.coreFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Categorized Technology Stack */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Categorized Technology Stack
              </h3>
              <div className="space-y-4">
                {cs.technologyStack.map((cat, idx) => (
                  <Card key={idx} className="border border-slate-200 dark:border-slate-800 p-4 space-y-2">
                    <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((tech) => (
                        <Badge key={tech} variant="tech" size="md">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: DATABASE DESIGN OVERVIEW & SCHEMAS */}
        <section id="database" className="scroll-mt-28 space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-500" /> 3. Database Design Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-tech">
              Entity structures, field definitions, data normalization, and indexing strategy
            </p>
          </div>

          <Card className="border border-slate-200 dark:border-slate-800 space-y-6">
            
            {/* Overview & Indexing Strategy */}
            <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Data Modeling Principles
              </h3>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {cs.databaseDesign.overview}
              </p>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono-tech text-blue-900 dark:text-blue-300 space-y-1">
                <span className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Database Indexing Strategy
                </span>
                <p className="leading-relaxed">
                  {cs.databaseDesign.indexingStrategy}
                </p>
              </div>
            </div>

            {/* Primary Entities Table Breakdown */}
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono-tech uppercase tracking-wider text-xs">
                Primary Database Entities & Collections
              </h3>

              <div className="space-y-6">
                {cs.databaseDesign.primaryEntities.map((entity, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-blue-500" />
                        <span className="font-bold text-slate-900 dark:text-slate-100 font-mono-tech text-sm">
                          {entity.name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-tech">
                        Entity #{idx + 1}
                      </span>
                    </div>

                    <p className="p-4 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60">
                      {entity.description}
                    </p>

                    {/* Key Fields Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono-tech">
                        <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            <th className="px-4 py-2 font-semibold">Field Name</th>
                            <th className="px-4 py-2 font-semibold">Data Type</th>
                            <th className="px-4 py-2 font-semibold">Purpose & Constraints</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                          {entity.keyFields.map((field, fIdx) => (
                            <tr key={fIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-4 py-2.5 font-bold text-blue-600 dark:text-blue-400">
                                {field.name}
                              </td>
                              <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400">
                                {field.type}
                              </td>
                              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">
                                {field.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </Card>
        </section>

        {/* SECTION 4: IMPORTANT TECHNICAL DECISIONS */}
        <section id="decisions" className="scroll-mt-28 space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-500" /> 4. Important Technical Decisions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-tech">
              Architectural trade-offs, engineering justifications, and technology choices
            </p>
          </div>

          <div className="space-y-6">
            {cs.importantTechnicalDecisions.map((item, idx) => (
              <Card key={idx} className="border border-slate-200 dark:border-slate-800 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-mono-tech text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="text-xs font-mono-tech font-bold uppercase text-slate-500 dark:text-slate-400 block">
                      The Decision Made
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.decision}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/20 space-y-1">
                    <span className="text-xs font-mono-tech font-bold uppercase text-blue-600 dark:text-blue-400 block">
                      Engineering Rationale
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.rationale}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 5: CHALLENGES, SECURITY & PERFORMANCE */}
        <section id="challenges" className="scroll-mt-28 space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-500" /> 5. Challenges, Security & Performance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-tech">
              Obstacles overcome, security guardrails, and system performance optimizations
            </p>
          </div>

          {/* Technical Challenges & Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Technical Challenges & Problem Solving
            </h3>

            <div className="space-y-4">
              {cs.challenges.map((c, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono-tech text-amber-600 dark:text-amber-400 font-bold uppercase">
                        Challenge #{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {c.challenge}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-sm space-y-1 ml-2 border-l-4 border-l-blue-600">
                    <span className="text-xs font-mono-tech font-bold uppercase text-blue-600 dark:text-blue-400 block">
                      Applied Software Solution
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {c.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Performance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Security Considerations */}
            <Card className="border border-slate-200 dark:border-slate-800 space-y-4 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-500" /> Security Considerations & Guardrails
              </h3>
              <ul className="space-y-3">
                {cs.securityConsiderations.map((sec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Performance Considerations */}
            <Card className="border border-slate-200 dark:border-slate-800 space-y-4 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Performance Considerations & Baselines
              </h3>
              <ul className="space-y-3">
                {cs.performanceConsiderations.map((perf, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{perf}</span>
                  </li>
                ))}
              </ul>
            </Card>

          </div>
        </section>

        {/* SECTION 6: SCREENSHOTS, ROADMAP & LESSONS */}
        <section id="screenshots" className="scroll-mt-28 space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" /> 6. Screenshots, Lessons & Future Roadmap
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-tech">
              Visual showcase, future architecture improvements, and key takeaway lessons
            </p>
          </div>

          {/* Screenshots Gallery */}
          {cs.screenshots.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Interface & System Visual Showcase
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cs.screenshots.map((shot, idx) => (
                  <div key={idx} className="space-y-2 group">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
                      <img
                        src={shot.url}
                        alt={shot.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 pl-1">
                      {shot.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roadmap & Lessons Learned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Future Improvements */}
            <Card className="border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-blue-500" /> Future Improvements & Roadmap
              </h3>
              <ul className="space-y-3">
                {cs.futureImprovements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono-tech text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Lessons Learned */}
            <Card className="border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" /> Lessons Learned & Takeaways
              </h3>
              <ul className="space-y-3">
                {cs.lessonsLearned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

          </div>
        </section>

        {/* SECTION 7: CONTACT CTA */}
        <section id="contact-cta" className="pt-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl space-y-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-blue-200">
                Custom Engineering Collaboration
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Need a similar application engineered for your organization?
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                Reach out directly to discuss software architecture, database design, full-stack development, or full-time engineering roles.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onContactClick(project.title)}
              className="bg-white text-blue-900 hover:bg-slate-100 shrink-0 font-bold shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Discuss Project with Ariti
            </Button>
          </div>
        </section>

        {/* Project Switcher Footer Controls */}
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onSelectProject(prevProject)}
            className="w-full sm:w-auto p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-left flex items-center gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
            <div>
              <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 block">Previous Case Study</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                {prevProject.title}
              </span>
            </div>
          </button>

          <button
            onClick={onBack}
            className="text-xs font-mono-tech text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            All Projects List
          </button>

          <button
            onClick={() => onSelectProject(nextProject)}
            className="w-full sm:w-auto p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-right flex items-center justify-end gap-3 group"
          >
            <div>
              <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 block">Next Case Study</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                {nextProject.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
          </button>
        </div>

      </main>

    </article>
  );
};
