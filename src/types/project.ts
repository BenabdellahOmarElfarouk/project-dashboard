export interface Project {
    id: string;
    title: string;
    owner: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'planned';
  }