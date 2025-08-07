export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  gpa: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}