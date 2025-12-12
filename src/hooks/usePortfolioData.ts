import { useEffect, useState } from "react";

interface PersonalInfo {
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
    twitter: string;
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
  achievements: string[];
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
  achievements: string[];
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

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const portfolioData: PortfolioData = await response.json();
        setData(portfolioData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter projects based on selected category
  const filteredProjects = data?.work.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  ) || [];

  // Get projects count for each category
  const getCategoryCount = (categoryId: string) => {
    if (!data) return 0;
    if (categoryId === 'all') return data.work.length;
    return data.work.filter(project => project.category === categoryId).length;
  };

  return { 
    data, 
    loading, 
    error, 
    selectedCategory, 
    setSelectedCategory, 
    filteredProjects, 
    getCategoryCount 
  };
}
