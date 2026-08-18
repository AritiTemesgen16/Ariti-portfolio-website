import React, { useState, useEffect } from 'react';
import { PROFILE, SERVICES } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle, Clock, Phone, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: preselectedService || 'Full-Stack Web Applications',
    budget: '$1,000 - $3,000',
    timeline: '1-2 Weeks',
    message: '',
    additionalInfo: '',
    honeypot: ''
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorResponse, setErrorResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorResponse(null);
    setSuccessResponse(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact message.');
      }

      setSuccessResponse(data.message || 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceType: 'Full-Stack Web Applications',
        budget: '$1,000 - $3,000',
        timeline: '1-2 Weeks',
        message: '',
        additionalInfo: '',
        honeypot: ''
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected network error occurred.';
      setErrorResponse(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Direct Communication"
          title="Let's Build Something Reliable Together"
          subtitle="Have a full-time role opening, a custom web software project, or a technical inquiry? Send a direct message below or email Ariti directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & SLA */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border border-slate-200 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Direct Inquiries
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Reachable for freelance commissions, full-stack software development roles, and consultations.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                
                <a
                  href={`mailto:${PROFILE.contact.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 block">Direct Email</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                      {PROFILE.contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${PROFILE.contact.phone}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 block">Phone / Mobile</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate block">
                      {PROFILE.contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={PROFILE.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-sky-500 text-white shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 block">Telegram</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate block">
                      @arititemesgen
                    </span>
                  </div>
                </a>

                <a
                  href={PROFILE.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-slate-900 text-white shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 block">GitHub Profile</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                      github.com/Arititemesgen16
                    </span>
                  </div>
                </a>

                <a
                  href={PROFILE.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-700 text-white shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 block">LinkedIn Profile</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                      linkedin.com/in/Arititemesgen
                    </span>
                  </div>
                </a>

              </div>

              {/* Response Time SLA */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" /> Guaranteed Response SLA
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Messages are reviewed daily. You will receive a personal reply within 24 business hours.
                </p>
              </div>

            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Title */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Send a Message or Project Request
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fill out the form details below to discuss project scope, architecture, or employment.
                  </p>
                </div>

                {/* Hidden Anti-Spam Honeypot Field */}
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  aria-hidden="true"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    required
                    placeholder="e.g. Samuel Alemu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="e.g. samuel@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Company & Service Type Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Company / Organization"
                    placeholder="e.g. TechCorp (Optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                      Service / Inquiry Type
                    </label>
                    <select
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    >
                      <option value="General Inquiry">General / Full-Time Engineering Role</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget & Timeline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                      Estimated Budget
                    </label>
                    <select
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="Under $1,000">Small Scope (&lt; $1,000)</option>
                      <option value="$1,000 - $3,000">Standard Web App ($1,000 - $3,000)</option>
                      <option value="$3,000 - $5,000">Enterprise System ($3,000 - $5,000)</option>
                      <option value="$5,000+">Custom Software System ($5,000+)</option>
                      <option value="Full-Time Salary">Full-Time Permanent Role</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                      Project Timeline
                    </label>
                    <select
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    >
                      <option value="Immediate (< 1 week)">Immediate (&lt; 1 week)</option>
                      <option value="1-2 Weeks">1-2 Weeks</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2-3 Months">2-3 Months</option>
                      <option value="Flexible / To be discussed">Flexible / To be discussed</option>
                    </select>
                  </div>
                </div>

                {/* Message Text Area (Project Description) */}
                <TextArea
                  label="Project Description"
                  required
                  rows={4}
                  placeholder="Describe your software project requirements, system objectives, timeline, or job description details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                {/* Additional Information Text Area */}
                <Input
                  label="Additional Information (Optional)"
                  placeholder="e.g. Preferred tech stack, links to existing mockups or docs, referral source..."
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                />

                {/* Error Banner */}
                {errorResponse && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorResponse}</span>
                  </div>
                )}

                {/* Success Banner */}
                {successResponse && (
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500" />
                    <span>{successResponse}</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={loading}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Message to Ariti
                </Button>

              </form>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};
