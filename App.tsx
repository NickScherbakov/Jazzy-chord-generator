
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProjectBrowser from './components/ProjectBrowser';
import Workspace from './components/Workspace';
import NewProjectModal from './components/NewProjectModal';
import { Project } from './types';
import { MOCK_PROJECTS } from './constants';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [showNewProject, setShowNewProject] = useState(false);

  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setShowNewProject(false);
  };

  return (
    <HashRouter>
      <div className="h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<ProjectBrowser projects={projects} onNew={() => setShowNewProject(true)} />} />
          <Route path="/workspace/:id" element={<Workspace />} />
        </Routes>

        {showNewProject && (
          <NewProjectModal 
            onClose={() => setShowNewProject(false)} 
            onCreate={handleCreateProject}
          />
        )}
      </div>
    </HashRouter>
  );
};

export default App;
