
import React, { useState } from 'react';
import { X, Piano, Music, Layout, ChevronRight, Activity } from 'lucide-react';

interface BassVoicingModalProps {
  onClose: () => void;
  // Add theme prop to satisfy Workspace.tsx usage
  theme?: 'Dark' | 'Light';
}

const BassVoicingModal: React.FC<BassVoicingModalProps> = ({ onClose, theme = 'Dark' }) => {
  const [interpolation, setInterpolation] = useState(0.5);
  const [selectedBass, setSelectedBass] = useState('Walking Bass');
  const [selectedVoicing, setSelectedVoicing] = useState('Rootless');

  const bassPatterns = [
    { name: 'Root Walk', desc: 'Emphasis on 1st and 5th' },
    { name: 'Walking Bass', desc: 'Continuous swing quarters' },
    { name: 'Pedal Point', desc: 'Sustained harmonic tension' },
    { name: 'Latin Bossa', desc: 'Syncopated rhythmic patterns' }
  ];

  const voicingTemplates = [
    { name: 'Rooted 4-way', desc: 'Standard beginner shell' },
    { name: 'Rootless', desc: 'Professional open spread' },
    { name: 'Drop 2', desc: 'Classical jazz guitar feel' },
    { name: 'Upper Structure', desc: 'Extended polychord tensions' }
  ];

  const isDark = theme === 'Dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className={`border w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
        <header className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-100 bg-zinc-50'}`}>
          <div className="flex items-center gap-3">
            <Piano className="text-indigo-400" />
            <h2 className="text-2xl font-bold tracking-tight">Voicing & Bass Engine</h2>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-all ${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:bg-zinc-100'}`}>
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left: Selectors */}
          <div className={`w-1/2 border-r overflow-y-auto p-8 space-y-8 ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Bass Patterns</h3>
              <div className="grid grid-cols-1 gap-2">
                {bassPatterns.map(p => (
                  <button 
                    key={p.name}
                    onClick={() => setSelectedBass(p.name)}
                    className={`w-full p-4 rounded-2xl text-left transition-all border ${selectedBass === p.name 
                      ? 'bg-indigo-500/10 border-indigo-500/40' 
                      : isDark ? 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-100 hover:bg-zinc-100'}`}
                  >
                    <p className="font-bold">{p.name}</p>
                    <p className="text-xs text-zinc-500">{p.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Voicing Style</h3>
              <div className="grid grid-cols-1 gap-2">
                {voicingTemplates.map(v => (
                  <button 
                    key={v.name}
                    onClick={() => setSelectedVoicing(v.name)}
                    className={`w-full p-4 rounded-2xl text-left transition-all border ${selectedVoicing === v.name 
                      ? 'bg-indigo-500/10 border-indigo-500/40' 
                      : isDark ? 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-100 hover:bg-zinc-100'}`}
                  >
                    <p className="font-bold">{v.name}</p>
                    <p className="text-xs text-zinc-500">{v.desc}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Live Preview & Interpolation */}
          <div className={`w-1/2 p-8 flex flex-col ${isDark ? 'bg-zinc-950' : 'bg-zinc-50/30'}`}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Voicing Interpolation</h3>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-12 relative">
              {/* Interpolation Visualizer */}
              <div className="w-full flex justify-between items-center px-8 relative">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 border rounded-2xl flex items-center justify-center shadow-lg ${isDark ? 'bg-zinc-900 border-indigo-500/20' : 'bg-white border-zinc-100'}`}>
                    <Music className="text-zinc-500" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600">PREV VOICING</span>
                </div>
                <div className={`flex-1 h-px mx-4 relative ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 transition-all"
                    style={{ left: `${interpolation * 100}%` }}
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 border rounded-2xl flex items-center justify-center shadow-xl ${isDark ? 'bg-zinc-900 border-indigo-500' : 'bg-white border-indigo-200'}`}>
                    <Activity className="text-indigo-400" />
                  </div>
                  <span className={`text-[10px] font-bold ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>NEW VOICING</span>
                </div>
              </div>

              <div className="w-full space-y-2">
                <input 
                  type="range" 
                  min="0" max="1" step="0.01" 
                  value={interpolation} 
                  onChange={e => setInterpolation(parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                />
                <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                  <span>Smooth Transition</span>
                  <span>Direct Jump</span>
                </div>
              </div>

              <div className={`w-full border rounded-2xl p-6 space-y-4 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}>
                 <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase">
                   <Layout size={14} />
                   Interpolated Voicing Preview
                 </div>
                 <div className="h-24 flex items-end justify-center gap-2">
                    {[40, 50, 60, 55, 70, 80].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-4 bg-indigo-500/60 rounded-full transition-all duration-300"
                        style={{ height: `${h + (interpolation * 20)}px` }}
                      />
                    ))}
                 </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Apply Engine Settings
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BassVoicingModal;