import React, { useState } from 'react';
import { Project } from './types';
import { ProfilePhotoProvider } from './context/ProfilePhotoContext';
import { SEOHead } from './components/ui/SEOHead';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { ContactSection } from './components/sections/ContactSection';
import { CaseStudyModal } from './components/ui/CaseStudyModal';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [modalCaseStudy, setModalCaseStudy] = useState<Project | null>(null);
  const [activeDetailProject, setActiveDetailProject] = useState<Project | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleNavigate = (sectionId: string) => {
    if (activeDetailProject) setActiveDetailProject(null);
    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 10);
  };

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    handleNavigate('contact');
  };

  const handleOpenDetailProject = (project: Project) => {
    setModalCaseStudy(null);
    setActiveDetailProject(project);
  };

  if (activeDetailProject) {
    return (
      <ProfilePhotoProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-200 flex flex-col font-sans">
          <SEOHead
            title={`${activeDetailProject.title} Case Study | Ariti Temesgen Wayu`}
            description={`${activeDetailProject.title}: ${activeDetailProject.caseStudy.valueProposition}`}
            canonical={`https://arititemesgen.com/projects/${activeDetailProject.id}`}
            ogImage={activeDetailProject.coverImage}
          />
          <ProjectDetailPage project={activeDetailProject} onBack={() => setActiveDetailProject(null)} onSelectProject={(project) => setActiveDetailProject(project)} onContactClick={(service) => { setActiveDetailProject(null); if (service) setPreselectedService(service); setTimeout(() => handleNavigate('contact'), 50); }} />
          <Footer onNavigate={handleNavigate} />
        </div>
      </ProfilePhotoProvider>
    );
  }

  return (
    <ProfilePhotoProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-200 flex flex-col font-sans">
        <SEOHead />
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
        <main className="flex-grow">
          <HeroSection onNavigate={handleNavigate} />
          <ProjectsSection onOpenCaseStudy={(project) => setActiveDetailProject(project)} />
          <ServicesSection onSelectService={handleSelectService} />
          <SkillsSection />
          <AboutSection />
          <ExperienceSection />
          <ResumeSection onContactClick={() => handleNavigate('contact')} />
          <ContactSection preselectedService={preselectedService} />
        </main>
        <Footer onNavigate={handleNavigate} />
        <CaseStudyModal project={modalCaseStudy} onClose={() => setModalCaseStudy(null)} onOpenFullPage={handleOpenDetailProject} onContactClick={(service) => { setModalCaseStudy(null); if (service) setPreselectedService(service); handleNavigate('contact'); }} />
      </div>
    </ProfilePhotoProvider>
  );
}
