export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
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

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  year: string;
  description: string;
  image: string;
  achievements?: string[];
}

interface Experience {
  id: number;
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
}

interface Skills {
  showcase: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
  soft: string[];
}

interface Contact {
  availability: string;
  preferredContact: string;
  timezone: string;
  languages: string[];
  services: string[];
  rates: {
    daily: string;
    project: string;
    retainer: string;
  };
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
