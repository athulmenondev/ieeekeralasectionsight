export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  impact: string;
  featured: boolean;
  details?: {
    duration: string;
    status: 'ongoing' | 'completed' | 'planning';
    partners?: string[];
    highlights: string[];
  };
}

export interface ProjectsData {
  categories: string[];
  projects: Project[];
}