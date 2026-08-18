export type Theme = 'dark' | 'light';

export interface TechnicalChallenge {
  challenge: string;
  solution: string;
}

export interface ScreenshotItem {
  url: string;
  caption: string;
  type?: 'dashboard' | 'mobile' | 'schema' | 'terminal' | 'feature';
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export interface EntityField {
  name: string;
  type: string;
  description: string;
}

export interface DatabaseEntity {
  name: string;
  description: string;
  keyFields: EntityField[];
}

export interface DatabaseDesign {
  overview: string;
  primaryEntities: DatabaseEntity[];
  indexingStrategy: string;
}

export interface TechnicalDecision {
  title: string;
  decision: string;
  rationale: string;
}

export interface CaseStudyData {
  valueProposition: string;
  overview: string;
  problem: string;
  targetUsers: string[];
  myRole: string;
  solution: string;
  coreFeatures: string[];
  technicalArchitecture: string[];
  technologyStack: TechStackCategory[];
  databaseDesign: DatabaseDesign;
  importantTechnicalDecisions: TechnicalDecision[];
  challenges: TechnicalChallenge[];
  securityConsiderations: string[];
  performanceConsiderations: string[];
  futureImprovements: string[];
  lessonsLearned: string[];
  screenshots: ScreenshotItem[];
  githubUrl: string;
  demoUrl: string;
  measuredResultsNote?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Enterprise App' | 'FinTech' | 'AgriTech' | 'HealthTech' | 'API & System' | 'B2B Platform';
  summary: string;
  featured: boolean;
  coverImage: string;
  period: string;
  role: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudy: CaseStudyData;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: 'Advanced' | 'Proficient' | 'Experienced';
    iconName?: string;
    featured?: boolean;
  }[];
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  idealFor: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'Education' | 'Engineering' | 'Freelance' | 'Open Source';
  description: string;
  highlights: string[];
  skillsUsed: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  serviceType: string;
  budget?: string;
  message: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  ogImage?: string;
}
