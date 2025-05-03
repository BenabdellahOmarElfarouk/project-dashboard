import { Project } from '../types/project';
import { IoClose } from 'react-icons/io5';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 modal-overlay bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close Project"
            >
              <IoClose size={24} />
            </button>
          </div>
          <p className="text-gray-600 mt-1">by {project.owner}</p>
          
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover mt-4 rounded"
          />
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Start Date</h3>
              <p>{project.startDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">End Date</h3>
              <p>{project.endDate}</p>
            </div>
            <div className="col-span-2">
              <h3 className="font-semibold">Status</h3>
              <p className="capitalize">{project.status}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold">Description</h3>
            <p className="mt-2 text-gray-700">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};