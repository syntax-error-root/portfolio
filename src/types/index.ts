export interface ProfileData {
  name: string;
  role: string;
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  location: string;
  status: string;
  aboutPhilosophy: string;
  aboutHighlights: string[];
}

export interface SkillItem {
  name: string;
  description: string;
  level?: string;
  category: 'INFRASTRUCTURE' | 'CONTAINERS & ORCHESTRATION' | 'AUTOMATION & DELIVERY' | 'OBSERVABILITY' | 'CLOUD & PLATFORM ENGINEERING' | 'AI & WORKFLOW AUTOMATION';
}

export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  problemStatement: string;
  architectureSolution: string;
  technologies: string[];
  engineeringDecisions: string[];
  securityConsiderations: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  layer: 'Internet' | 'DNS' | 'Reverse Proxy' | 'Application' | 'Databases' | 'Monitoring';
  role: string;
  tech: string[];
  reliabilityTip: string;
  securityTip: string;
  position: [number, number, number];
}
