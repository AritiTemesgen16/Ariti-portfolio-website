import React from 'react';
import { SERVICES } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Layers, BarChart3, ShieldAlert, ShoppingBag, Database, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6 text-blue-500" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-indigo-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-red-500" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-emerald-500" />;
      case 'Database': return <Database className="w-6 h-6 text-cyan-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      default: return <Layers className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          eyebrow="Commercial Capability & Inquiries"
          title="Software Development Services Offered"
          subtitle="Direct software engineering services for organizations, startups, and business owners needing reliable web tools, custom management software, or database backend solutions."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Card hoverable key={service.id} className="flex flex-col h-full border border-slate-200 dark:border-slate-800">
              
              {/* Service Icon & Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-slate-700/80">
                  {getIcon(service.icon)}
                </div>
                <Badge variant="outline" size="sm">
                  Full Service
                </Badge>
              </div>

              {/* Titles & Description */}
              <div className="space-y-2 mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {service.title}
                </h3>
                <p className="text-xs font-mono-tech text-blue-600 dark:text-blue-400 font-medium">
                  {service.subtitle}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {service.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2 py-3 my-2 border-y border-slate-100 dark:border-slate-800/80 flex-grow">
                <p className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold">
                  Key Deliverables
                </p>
                <ul className="space-y-2">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3 pt-3">
                <div className="flex flex-wrap gap-1">
                  {service.technologies.map((tech) => (
                    <Badge key={tech} variant="tech" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Call to Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onSelectService(service.title)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="mt-2"
                >
                  Inquire About This Service
                </Button>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
