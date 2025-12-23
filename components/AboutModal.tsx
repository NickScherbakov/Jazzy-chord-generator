
import React from 'react';
import { X, Music, Github, Globe, Sparkles, Heart } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
  // Add theme prop to satisfy Workspace.tsx usage
  theme?: 'Dark' | 'Light';
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose, theme = 'Dark' }) => {
  const isDark = theme === 'Dark';

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className={`border w-full max-w-lg rounded-[3rem] overflow-hidden relative ${isDark ? 'bg-zinc-900 border-zinc-800 text-white shadow-[0_0_100px_rgba(99,102,241,0.2)]' : 'bg-white border-zinc-200 text-zinc-900 shadow-2xl'}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500" />
        
        <header className="p-10 pb-6 flex justify-between items-start">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40">
            <Music size={32} />
          </div>
          <button onClick={onClose} className={`p-3 rounded-full transition-all ${isDark ? 'text-zinc-500 hover:text-white bg-zinc-800/50 hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100'}`}>
            <X size={24} />
          </button>
        </header>

        <div className="px-10 pb-10 space-y-8">
          <div>
            <h2 className="text-3xl font-black tracking-tighter mb-1">HarmonicFlow Pro</h2>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em]">Version 2.5.0 Build 2025</p>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
            Designed for the professional jazz composer. Our engine utilizes advanced modal analysis and voice-leading optimization to bridge the gap between AI generation and artistic intent.
          </p>

          <div className="grid grid-cols-1 gap-3">
             <div className={`flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-black/20 border-zinc-800' : 'bg-zinc-50 border-zinc-100'}`}>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                   <Sparkles size={20} />
                </div>
                <div>
                   <p className="text-xs font-black uppercase tracking-widest text-indigo-400">AI Engine</p>
                   <p className={`text-[10px] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>GPT-4 Harmonic Backbone</p>
                </div>
             </div>
             <div className={`flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-black/20 border-zinc-800' : 'bg-zinc-50 border-zinc-100'}`}>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                   <Globe size={20} />
                </div>
                <div>
                   <p className="text-xs font-black uppercase tracking-widest text-pink-400">Sync Service</p>
                   <p className={`text-[10px] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>Enabled (iCloud Drive)</p>
                </div>
             </div>
          </div>

          <footer className={`pt-4 flex items-center justify-between border-t ${isDark ? 'border-zinc-800/50' : 'border-zinc-100'}`}>
             <div className="flex gap-4">
               <button className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></button>
               <button className="text-zinc-500 hover:text-white transition-colors"><Globe size={20} /></button>
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase">
               Made with <Heart size={10} className="text-red-500 fill-red-500" /> by MusicPro Team
             </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;