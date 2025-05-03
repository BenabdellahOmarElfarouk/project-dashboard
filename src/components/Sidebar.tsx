import { Project } from '../types/project';
import { IoClose, IoTrashBin } from 'react-icons/io5';

// Define the props 
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  collectedProjects: Project[];
  onSelectProject: (project: Project) => void;
  onRemoveProject: (projectId: string) => void;
}

export const Sidebar = ({ isOpen, toggleSidebar, collectedProjects, onSelectProject, onRemoveProject }: SidebarProps) => {
  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="p-4">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Collection</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close Sidebar"
          >
            <IoClose size={24} />
          </button>
        </div>

        {collectedProjects.length === 0 ? (
          <p className="text-gray-500">No projects collected yet</p>
        ) : (
          <ul className="space-y-2">
            {collectedProjects.map(project => (
              <li key={project.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                <span
                  className="cursor-pointer truncate"
                  onClick={() => onSelectProject(project)}  // View project details 
                >
                  {project.title}
                </span>
                <button
                  onClick={() => onRemoveProject(project.id)}
                  className="text-red-500 hover:text-red-700 ml-2"  // Added margin-left to create space between title and icon
                >
                  <IoTrashBin size={20} />  {/* Use the trash bin icon */}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};