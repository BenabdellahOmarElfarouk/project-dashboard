import { useState, useEffect } from 'react';
import { Project } from './types/project';
import { fetchProjects } from './services/projectService';
import { ProjectCard } from './components/ProjectCard';
import { ProjectListItem } from './components/ProjectListItem';
import { SearchBar } from './components/SearchBar';
import { ProjectModal } from './components/ProjectModal';
import { Sidebar } from './components/Sidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProjectCardSkeleton } from './components/ProjectCardSkeleton';
import { FaTh, FaList } from 'react-icons/fa'; 

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collectedProjects, setCollectedProjects] = useLocalStorage<Project[]>('collectedProjects', []);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects(); // Fetch data from backend
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    [project.title /* Add more fields if needed */]
      .some(text => text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleCollection = (projectId: string) => {
    const exists = collectedProjects.some(p => p.id === projectId);
    if (exists) {
      setCollectedProjects(collectedProjects.filter(p => p.id !== projectId));
    } else {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCollectedProjects([...collectedProjects, project]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Project Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              My Collection ({collectedProjects.length})
            </button>
          </div>
        </header>

        <div className="flex flex-col items-start gap-4 mb-6">
          {/* Search Bar */}
          <div className="w-full">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          {/* Toggle between card/list views */}
          {!isLoading && (
            <button
              onClick={() => setViewMode(prev => (prev === 'card' ? 'list' : 'card'))}
              className="bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition text-lg flex items-center justify-center self-end"
              aria-label={`Switch to ${viewMode === 'card' ? 'list' : 'card'} view`}
            >
              {viewMode === 'card' ? (
                <FaList className="text-xl" />
              ) : (
                <FaTh className="text-xl" />
              )}
            </button>
          )}
        </div>


        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(6)].map((_, i) => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No projects match your search.</p>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
                onToggleCollection={toggleCollection}
                isInCollection={collectedProjects.some(p => p.id === project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="divide-y mt-6">
            {filteredProjects.map(project => (
              <ProjectListItem
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
                onToggleCollection={toggleCollection}
                isInCollection={collectedProjects.some(p => p.id === project.id)}
              />
            ))}
          </div>
        )}

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          collectedProjects={collectedProjects}
          onSelectProject={setSelectedProject}
          onRemoveProject={(projectId) =>
            setCollectedProjects(collectedProjects.filter(p => p.id !== projectId))
          }
        />
      </div>
    </div>
  );
}

export default App;
