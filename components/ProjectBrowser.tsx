
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { Plus, Clock, Music, Settings, HelpCircle, Search } from 'lucide-react';

interface ProjectBrowserProps {
  projects: Project[];
  onNew: () => void;
}

const ProjectBrowser: React.FC<ProjectBrowserProps> = ({ projects, onNew }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.style.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto bg-zinc-950">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2 italic">HarmonicFlow</h1>
          <p className="text-zinc-500 font-medium">Professional Jazz Composition & Harmonic Intelligence</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
            />
          </div>
          <button onClick={onNew} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95 whitespace-nowrap">
            <Plus size={20} />
            NEW PROJECT
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            onClick={() => navigate(`/workspace/${project.id}`)}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 cursor-pointer hover:border-indigo-500/50 hover:bg-zinc-800/40 transition-all shadow-xl"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Music size={28} />
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Last Sync</span>
                <span className="text-xs font-bold text-zinc-400 flex items-center justify-end gap-1">
                  <Clock size={12} />
                  {project.lastModified}
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">{project.name}</h3>
            
            <div className="flex gap-2 flex-wrap">
              {[project.key, `${project.bpm} BPM`, project.style].map(tag => (
                <div key={tag} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-[9px] font-black tracking-widest uppercase text-zinc-500 group-hover:border-zinc-700 transition-colors">
                  {tag}
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
               <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
                 <Plus size={20} className="rotate-45" />
               </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[3rem]">
            <Search size={48} className="text-zinc-800 mb-4" />
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectBrowser;
