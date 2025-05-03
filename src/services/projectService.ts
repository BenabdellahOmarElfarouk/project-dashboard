import { Project } from '../types/project';
import projectsData from '../data/projects.json';

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate data structure
    if (!Array.isArray(projectsData)) {
      throw new Error('Invalid data format');
    }
    
    return projectsData as Project[];
  } catch (error) {
    console.error('Error loading projects:', error);
    throw new Error('Failed to load projects data');
  }
};