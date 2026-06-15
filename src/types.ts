export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  resume?: string;
  resumeSoftwareDeveloper?: string;
  resumeProjectManager?: string;
  profileImage?: string;
  socialLinks: {
    linkedin: string;
    github: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface WorkProject {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  technologies: string[];
  duration: string;
  year: string;
  image: string;
  images?: string[];
  video: string;
  hasVideo: boolean;
  demoUrl: string;
  githubUrl: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  year: string;
  description: string;
  image: string;
  achievements?: string[];
}

export interface Experience {
  id: number;
  category: string;
  position: string;
  company: string;
  image?: string;
  type: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
  focus?: string[];
  website?: string;
  preview?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SkillCategory {
  label: string;
  groups: SkillGroup[];
}

export interface Skills {
  development: SkillCategory;
  management: SkillCategory;
}

export interface Contact {
  availability: string;
  preferredContact: string;
  timezone: string;
  languages: string[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  categories: Category[];
  work: WorkProject[];
  education: Education[];
  experience: Experience[];
  skills: Skills;
  contact: Contact;
}
