
import React, { useEffect, useState } from 'react';
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
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [autostartGuide, setAutostartGuide] = useState(true);

  useEffect(() => {
    const storedAutostart = localStorage.getItem('hf-guide-autostart');
    const shouldAutostart = storedAutostart !== 'false';
    setAutostartGuide(shouldAutostart);
    setShowGuide(shouldAutostart);
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.style.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const guideSteps = [
    {
      title: 'Шаг 1: Создайте проект',
      description: 'Нажмите “New Project” и задайте тональность, темп и стиль. Это база для гармонического анализа и генерации аккордов.'
    },
    {
      title: 'Шаг 2: Введите мелодию “Осенние листья”',
      description: 'Вставьте пример ниже в редактор мелодии, чтобы увидеть, как HarmonicFlow предлагает гармонию.',
      example: 'Am7 | D7 | Gmaj7 | Cmaj7 | F#ø7 | B7 | Em7 | Em7'
    },
    {
      title: 'Шаг 3: Сгенерируйте гармонию',
      description: 'Запустите генерацию, сравните варианты и отредактируйте каденции. Сохраните проект или экспортируйте MIDI.'
    }
  ];

  const activeStep = guideSteps[guideStep];

  const handleAutostartChange = (value: boolean) => {
    setAutostartGuide(value);
    localStorage.setItem('hf-guide-autostart', value ? 'true' : 'false');
  };

  const handleCopyExample = async () => {
    const exampleText = guideSteps[1].example ?? '';
    if (!exampleText) {
      return;
    }
    await navigator.clipboard.writeText(exampleText);
  };

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

      <section className="mb-10 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-bold">Добро пожаловать</p>
            <h2 className="text-3xl font-black text-white mt-3 mb-4">Интерактивный путеводитель по созданию мелодий</h2>
            <p className="text-zinc-400 max-w-2xl">
              HarmonicFlow помогает быстро создавать джазовые гармонии и аранжировки. Мы приготовили интерактивную
              инструкцию с примером “Осенние листья”, которая запускается сразу после входа. Автозапуск можно отключить.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              onClick={() => setShowGuide(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm shadow-lg shadow-indigo-600/20 transition-all"
            >
              <HelpCircle size={18} />
              Открыть путеводитель
            </button>
            <label className="flex items-center gap-3 text-sm text-zinc-400 font-semibold">
              <input
                type="checkbox"
                checked={autostartGuide}
                onChange={(event) => handleAutostartChange(event.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500"
              />
              Автозапуск путеводителя
            </label>
          </div>
        </div>
      </section>

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

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-3xl rounded-[2.5rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold">Путеводитель</p>
                <h3 className="text-2xl font-black text-white mt-3">{activeStep.title}</h3>
                <p className="text-zinc-400 mt-4">{activeStep.description}</p>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="h-10 w-10 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-indigo-500 transition-colors"
                aria-label="Закрыть путеводитель"
              >
                ×
              </button>
            </div>

            {activeStep.example && (
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3">Пример мелодии</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <code className="text-sm text-indigo-200">{activeStep.example}</code>
                  <button
                    onClick={handleCopyExample}
                    className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-600/40 transition-colors text-sm font-bold"
                  >
                    Скопировать
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-zinc-400 font-semibold">
                <button
                  onClick={() => handleAutostartChange(!autostartGuide)}
                  className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-indigo-500 hover:text-white transition-colors"
                >
                  Автозапуск: {autostartGuide ? 'включен' : 'выключен'}
                </button>
                <span>Шаг {guideStep + 1} из {guideSteps.length}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setGuideStep((prev) => Math.max(0, prev - 1))}
                  disabled={guideStep === 0}
                  className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:border-indigo-500 hover:text-white transition-colors disabled:opacity-50 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300"
                >
                  Назад
                </button>
                {guideStep < guideSteps.length - 1 ? (
                  <button
                    onClick={() => setGuideStep((prev) => Math.min(guideSteps.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors"
                  >
                    Далее
                  </button>
                ) : (
                  <button
                    onClick={() => setShowGuide(false)}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors"
                  >
                    Готово
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBrowser;
