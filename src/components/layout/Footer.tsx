import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, MapPin, Globe, Phone, MessageSquare } from 'lucide-react';
import { PROFILE } from '../../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm">
                AT
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {PROFILE.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Software Developer & Full-Stack Engineer based in Ethiopia. Building high-reliability web platforms, customized pharmacy management systems, direct agricultural marketplaces, and financial application architectures.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono-tech text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> {PROFILE.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> English, Amharic, Afaan Oromo
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors text-slate-400">
                  Featured Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors text-slate-400">
                  Development Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skills')} className="hover:text-white transition-colors text-slate-400">
                  Technical Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-slate-400">
                  About & Background
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors text-slate-400">
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold">
              Connect & Direct
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={PROFILE.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors text-slate-400"
                >
                  <Github className="w-4 h-4" /> GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors text-slate-400"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn Network
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors text-slate-400"
                >
                  <MessageSquare className="w-4 h-4 text-sky-400" /> Telegram (@arititemesgen)
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.contact.phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors text-slate-400"
                >
                  <Phone className="w-4 h-4 text-emerald-400" /> {PROFILE.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.contact.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors text-slate-400"
                >
                  <Mail className="w-4 h-4 text-blue-400" /> {PROFILE.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono-tech">Built with React, TypeScript & Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
