import React from 'react';
import { ArrowRight, Github, Mail, ShieldCheck, Terminal, MapPin, Sparkles, GraduationCap } from 'lucide-react';
import { PROFILE } from '../../data/portfolioData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono-tech">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">Available for Hire & Freelance Projects</span>
            </div>

            {/* Main Headline Hierarchy */}
            <div className="space-y-3">
              {/* 1. Name */}
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
                {PROFILE.name}
              </h1>

              {/* 2. Role Title */}
              <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
                {PROFILE.title}
              </p>

              {/* 3. Academic Qualification Line */}
              <div className="pt-0.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-2xs">
                  <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Computer Science & Management Graduate</span>
                </div>
              </div>
            </div>

            {/* 4. Professional Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              I combine software engineering expertise with formal training in management to design and build practical, production-ready digital solutions. I specialize in full-stack web applications, business management systems, and scalable database architectures, with a focus on reliability, usability, and solving real-world operational challenges.
            </p>

            {/* Location & Languages bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-500" /> Based in {PROFILE.location}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> English, Amharic, Afaan Oromo
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('contact')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('projects')}
              >
                View My Work
              </Button>

              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Ariti Temesgen Wayu GitHub"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Signals */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-mono-tech font-bold text-slate-900 dark:text-slate-100">3+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Major Systems Built</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono-tech font-bold text-slate-900 dark:text-slate-100">CS & Mgmt</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Degrees Held</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono-tech font-bold text-slate-900 dark:text-slate-100">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Authentic Craft</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Code & Architecture Visualizer */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-200 font-mono-tech space-y-4">
              
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-slate-400 ml-2 font-medium flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" /> developer-profile.ts
                  </span>
                </div>
                <span className="text-emerald-400 text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                  BUILD PASSING
                </span>
              </div>

              {/* Code Snippet */}
              <div className="text-xs leading-relaxed space-y-2 text-slate-300">
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span> <span className="text-emerald-300">"{PROFILE.name}"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">degrees:</span> [
                  <span className="text-amber-300">"Computer Science"</span>, <span className="text-amber-300">"Management"</span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">specialization:</span> <span className="text-emerald-300">"Full-Stack & Business Systems"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">stack:</span> [
                  <span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"PostgreSQL"</span>, <span className="text-amber-300">"MongoDB"</span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">systemsBuilt:</span> [
                  <span className="text-emerald-300">"SmartSpend"</span>, <span className="text-emerald-300">"AgriConnect"</span>, <span className="text-emerald-300">"PharmaCore"</span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">status:</span> <span className="text-emerald-400">"READY_FOR_COMMISSION"</span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Featured System Tags */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Core Engineering Priorities
                  </span>
                  <span className="text-emerald-400">100% Type-Safe</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="tech" size="sm">Relational Schemas</Badge>
                  <Badge variant="tech" size="sm">Business Systems</Badge>
                  <Badge variant="tech" size="sm">Batch Expiry Tracking</Badge>
                  <Badge variant="tech" size="sm">Multi-Language UX</Badge>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
