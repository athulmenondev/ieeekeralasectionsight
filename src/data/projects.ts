import projectsData from '../../data/project.json';
import type { ProjectsData } from '../types';

export const getProjectsData = (): ProjectsData =>
  ({
    categories: [...new Set(projectsData.map((p) => p.category))],
    projects: projectsData,
  });

export const getFeaturedProjects = () =>
  projectsData.filter((p) => p.featured);

export const getProjectById = (id: number) =>
  projectsData.find((p) => p.id === id);

export const getProjectsByCategory = (category: string) =>
  projectsData.filter((p) => p.category === category);