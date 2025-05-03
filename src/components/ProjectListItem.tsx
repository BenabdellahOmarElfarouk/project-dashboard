// components/ProjectListItem.tsx
import { Project } from '../types/project';

interface Props {
  project: Project;
  onSelect: (project: Project) => void;
  onToggleCollection: (projectId: string) => void;
  isInCollection: boolean;
}

export const ProjectListItem = ({ project, onSelect, onToggleCollection, isInCollection }: Props) => (
  <div
    className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
    onClick={() => onSelect(project)}
  >
    <div className="flex items-center gap-4">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-16 h-16 object-cover rounded"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
        <p className="text-sm text-gray-500">Owner: {project.owner}</p>
      </div>
    </div>

    <button
      onClick={e => {
        e.stopPropagation(); // prevent modal from opening
        onToggleCollection(project.id);
      }}
      className={`px-3 py-1 rounded text-sm ${
        isInCollection ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}
    >
      {isInCollection ? 'Remove' : 'Collect'}
    </button>
  </div>
);

