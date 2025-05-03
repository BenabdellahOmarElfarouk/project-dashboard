import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onToggleCollection: (projectId: string) => void;
  isInCollection: boolean;
}
export const ProjectCard = ({ project, onSelect, onToggleCollection, isInCollection }: ProjectCardProps) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    planned: 'bg-yellow-100 text-yellow-800'
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Project+Image';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image with hover effect */}
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover cursor-pointer"
          onError={handleImageError}
        />
        {/* Hover overlay */}
        <div
          onClick={() => onSelect(project)}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 text-white transition-opacity cursor-pointer"
        >
          <span className="text-lg font-semibold">Click for more details</span>
        </div>
      </div>

      {/* --- Project Details --- */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollection(project.id);
            }}
            className={`px-3 py-1 rounded-full text-sm ${isInCollection
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            aria-label={isInCollection ? 'Remove from collection' : 'Add to collection'}
          >
            {isInCollection ? 'Collected' : 'Collect'}
          </button>
        </div>
        <p className="text-gray-600 mt-1">by {project.owner}</p>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {project.startDate} - {project.endDate}
          </div>
        </div>
      </div>
    </div>
  );
};
