import React from 'react';
import { PROFILE, PROJECTS, EXPERIENCE_ITEMS } from '../../data/portfolioData';
import { useProfilePhoto } from '../../context/ProfilePhotoContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  FileText,
  Printer,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  MessageSquare,
  GraduationCap,
  Briefcase,
  Code2,
  Globe,
  Award,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ResumeSectionProps {
  onContactClick?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onContactClick }) => {
  const { photoUrl: profilePhoto } = useProfilePhoto();
  
  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Text CV Download handler as downloadable fallback
  const handleDownloadTextCV = () => {
    const textContent = `================================================================
${PROFILE.name.toUpperCase()} - CURRICULUM VITAE
${PROFILE.title}
Location: ${PROFILE.location} | Email: ${PROFILE.contact.email} | Phone: ${PROFILE.contact.phone}
Telegram: @arititemesgen | GitHub: ${PROFILE.contact.github} | LinkedIn: ${PROFILE.contact.linkedin}
================================================================

PROFESSIONAL SUMMARY
--------------------
${PROFILE.bio}

TECHNICAL SKILLS
----------------
• Frontend: React 18, TypeScript, Tailwind CSS, Recharts, Responsive UI Design, State Management
• Backend & APIs: Node.js, Express.js, RESTful API Engineering, Request Sanitization
• Databases & Storage: PostgreSQL (Relational SQL, 3NF), MongoDB (Document Schemas, Mongoose)
• Programming Languages: TypeScript, JavaScript, Python, Java
• Core CS Principles: Data Structures & Algorithms, Software Architecture, Database Normalization
• Tooling & Environment: Git, GitHub, Vite, Postman, Linux Containers, Docker Basics

EDUCATION
---------
${PROFILE.education.degree}
${PROFILE.education.institution} - ${PROFILE.education.period}
Focus: ${PROFILE.education.focus}

VERIFIED EXPERIENCE
-------------------
${EXPERIENCE_ITEMS.map(exp => `
${exp.role.toUpperCase()}
${exp.organization} | ${exp.period} | ${exp.location}
${exp.description}
Key Responsibilities & Highlights:
${exp.highlights.map(h => `  - ${h}`).join('\n')}
Skills: ${exp.skillsUsed.join(', ')}
`).join('\n')}

FEATURED FULL-STACK PROJECTS
----------------------------
${PROJECTS.map(p => `
${p.title} (${p.category} - ${p.period}) - ${p.role}
Summary: ${p.summary}
Technologies: ${p.technologies.join(', ')}
`).join('\n')}

LANGUAGES
---------
${PROFILE.languages.map(l => `• ${l.name}: ${l.proficiency}`).join('\n')}

VERIFIED ACHIEVEMENTS & HIGHLIGHTS
----------------------------------
• Computer Science & Management Graduate combining software engineering expertise with formal business management training.
• Architected and deployed 3 full-stack software systems (PharmaCore, AgriConnect Ethiopia, SmartSpend).
• Engineered tri-lingual localization engines supporting Ge'ez (Amharic) and Latin scripts.
================================================================
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ariti_Temesgen_Wayu_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="resume" className="py-20 bg-slate-50 dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header & Action Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8 no-print">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono-tech font-semibold">
              <FileText className="w-3.5 h-3.5" /> Professional Resume & Background
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Curriculum Vitae
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Verified academic credentials, engineering experience, technical proficiencies, and software accomplishments in a print-ready format.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              size="md"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 font-semibold"
            >
              Print / Save as PDF
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleDownloadTextCV}
              leftIcon={<Download className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
            >
              Download Text CV (.txt)
            </Button>
          </div>
        </div>

        {/* PRINTABLE RESUME CARD */}
        <div className="printable-resume bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-xl space-y-10 max-w-4xl mx-auto">
          
          {/* Header Contact Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={profilePhoto}
                  alt={PROFILE.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top border-2 border-slate-200 dark:border-slate-700 shadow-md shrink-0 no-print"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    {PROFILE.name}
                  </h1>
                  <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {PROFILE.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono-tech text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{PROFILE.location}</span>
              </div>
            </div>

            {/* Quick Contact Links Strip */}
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs font-mono-tech text-slate-600 dark:text-slate-400 pt-2">
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>{PROFILE.contact.email}</span>
              </a>

              <a
                href={`tel:${PROFILE.contact.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>{PROFILE.contact.phone}</span>
              </a>

              <a
                href={PROFILE.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                <span>@arititemesgen</span>
              </a>

              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                <span>github.com/Arititemesgen16</span>
              </a>

              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                <span>linkedin.com/in/Arititemesgen</span>
              </a>
            </div>
          </div>

          {/* 1. PROFESSIONAL SUMMARY */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Professional Summary
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {PROFILE.bio}
            </p>
          </div>

          {/* 2. TECHNICAL SKILLS */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Technical Proficiencies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="text-xs font-mono-tech font-bold text-slate-900 dark:text-slate-100 uppercase block">
                  Frontend Development
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  React 18, TypeScript, Tailwind CSS, Recharts, Client-side State, Responsive Design, Accessibility
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="text-xs font-mono-tech font-bold text-slate-900 dark:text-slate-100 uppercase block">
                  Backend & REST APIs
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Node.js, Express.js, RESTful Architecture, Request Sanitization, Route Middleware, Sub-unit Arithmetic
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="text-xs font-mono-tech font-bold text-slate-900 dark:text-slate-100 uppercase block">
                  Databases & Storage
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  PostgreSQL (3NF Relational SQL), MongoDB (Mongoose ODM, Document Aggregation Pipelines), Indexing
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="text-xs font-mono-tech font-bold text-slate-900 dark:text-slate-100 uppercase block">
                  Core CS & Developer Tools
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Data Structures, Algorithms, Software Architecture, Git, GitHub, Vite, Linux Containers, Postman
                </p>
              </div>
            </div>
          </div>

          {/* 3. VERIFIED EXPERIENCE */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Verified Engineering Experience
            </h3>

            <div className="space-y-6">
              {EXPERIENCE_ITEMS.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {exp.role} <span className="text-slate-400 font-normal">| {exp.organization}</span>
                    </h4>
                    <span className="text-xs font-mono-tech text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800/60 shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 pt-1 pl-2">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 4. ACADEMIC EDUCATION */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Academic Education
            </h3>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {PROFILE.education.degree}
                </h4>
                <span className="text-xs font-mono-tech text-emerald-600 dark:text-emerald-400 font-bold">
                  {PROFILE.education.period} (Honors)
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {PROFILE.education.institution} — {PROFILE.location}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono-tech">
                Core Focus Areas: {PROFILE.education.focus}
              </p>
            </div>
          </div>

          {/* 5. FEATURED SOFTWARE PROJECTS (COMPLEMENTS PORTFOLIO) */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Key Software System Deliverables
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {PROJECTS.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {p.title} <span className="text-xs font-normal text-slate-500">({p.category})</span>
                    </span>
                    <span className="text-xs font-mono-tech text-slate-500">{p.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.technologies.slice(0, 6).map((tech) => (
                      <Badge key={tech} variant="tech" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. LANGUAGES & VERIFIED ACHIEVEMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Languages */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-tech uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
                <Globe className="w-4 h-4" /> Languages
              </h3>
              <div className="space-y-2">
                {PROFILE.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{lang.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono-tech">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Achievements */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-tech uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
                <Award className="w-4 h-4" /> Verified Engineering Highlights
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Computer Science & Management Graduate with strong technical engineering & operational business foundations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Engineered and deployed 3 full-stack software applications (PharmaCore, AgriConnect, SmartSpend)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Implemented tri-lingual localization engines supporting Ge'ez (Amharic) and Latin scripts</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer note in printed CV */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs font-mono-tech text-slate-400 flex items-center justify-between">
            <span>Ariti Temesgen Wayu — Professional CV</span>
            <span>arititemesgen16@gmail.com</span>
          </div>

        </div>

      </div>
    </section>
  );
};
