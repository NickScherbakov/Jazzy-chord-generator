
import React, { useState } from 'react';
import { X, Moon, Sun, Monitor, HardDrive, Cpu, CloudOff, Globe } from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
  theme: 'Dark' | 'Light';
  setTheme: (t: 'Dark' | 'Light') => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose, theme, setTheme }) => {
  const [offlineMode, setOfflineMode] = useState(true);
  const [performance, setPerformance] = useState<'Realtime' | 'Quality'>('Quality');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`border w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 ${theme === 'Dark' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
        <header className="p-8 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-indigo-500 rounded-full transition-all">
            <X size={24} />
          </button>
        </header>

        <div className="p-8 space-y-10">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Monitor size={14} /> UI Appearance
            </h3>
            <div className={`grid grid-cols-2 gap-2 p-1.5 rounded-2xl border ${theme === 'Dark' ? 'bg-black/40 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
              {['Light', 'Dark'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t as any)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${theme === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <HardDrive size={14} /> Local Engine
            </h3>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-4 rounded-2xl border ${theme === 'Dark' ? 'bg-black/20 border-zinc-800/50' : 'bg-zinc-50 border-zinc-200'}`}>
                <div className="flex gap-4 items-center">
                  <div className="p-2.5 bg-zinc-800 rounded-xl text-zinc-400">
                    <CloudOff size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Offline Generation</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Run all AI logic on device</p>
                  </div>
                </div>
                <button 
                  onClick={() => setOfflineMode(!offlineMode)}
                  className={`w-12 h-6 rounded-full relative transition-all ${offlineMode ? 'bg-indigo-600' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${offlineMode ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Cpu size={14} /> Performance Preset
            </h3>
            <div className="flex gap-3">
              {['Realtime', 'Quality'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPerformance(p as any)}
                  className={`flex-1 p-4 rounded-2xl border transition-all text-left ${performance === p ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' : theme === 'Dark' ? 'bg-zinc-950 border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}
                >
                  <p className="font-bold text-sm">{p} Render</p>
                  <p className="text-[9px] uppercase font-black opacity-60">{p === 'Realtime' ? 'Lowest Latency' : 'Highest Complexity'}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className={`p-8 border-t flex justify-end ${theme === 'Dark' ? 'border-zinc-800 bg-zinc-950/50' : 'border-zinc-200 bg-zinc-50'}`}>
          <button onClick={onClose} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
            Save & Sync
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsPanel;
