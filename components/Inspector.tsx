
import React from 'react';
import { ChordBlock } from '../types';
import { 
  Sparkles, Activity, ChevronRight, 
  Trash2, Copy, Replace, Music, Fingerprint,
  Mic, AlertTriangle, Maximize2, Minimize2, Piano, Layers
} from 'lucide-react';

interface InspectorProps {
  chord?: ChordBlock;
  multiCount?: number;
  onExplain: () => void;
  onToggleCollapse: () => void;
  onToggleMelodyAware: () => void;
  onSubstitute: (newName: string) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  melodyAwareMode: boolean;
  isFloating?: boolean;
  onToggleFloat?: () => void;
}

const Inspector: React.FC<InspectorProps> = ({ 
  chord, 
  multiCount = 0,
  onExplain, 
  onToggleCollapse, 
  onToggleMelodyAware, 
  onSubstitute,
  onDelete,
  onDuplicate,
  melodyAwareMode,
  isFloating = false,
  onToggleFloat
}) => {
  if (multiCount > 1) {
    return (
      <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
        <header className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-bold">Batch Selection</h3>
          <button onClick={onToggleCollapse} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"><ChevronRight size={20}/></button>
        </header>
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-indigo-600/20 text-indigo-400 rounded-3xl flex items-center justify-center shadow-xl border border-indigo-500/20">
            <Layers size={40} />
          </div>
          <div>
            <h4 className="text-2xl font-black mb-2">{multiCount} Chords Selected</h4>
            <p className="text-zinc-500 text-sm">Perform batch operations on your selection.</p>
          </div>
          <div className="w-full grid grid-cols-1 gap-3">
             <button onClick={onDuplicate} className="w-full bg-zinc-900 hover:bg-zinc-800 p-5 rounded-3xl flex items-center justify-center gap-3 border border-zinc-800 transition-all active:scale-95">
               <Copy size={20} className="text-zinc-400" />
               <span className="font-black text-xs uppercase tracking-widest">Duplicate All</span>
             </button>
             <button onClick={onDelete} className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 p-5 rounded-3xl flex items-center justify-center gap-3 border border-red-500/20 transition-all active:scale-95">
               <Trash2 size={20} />
               <span className="font-black text-xs uppercase tracking-widest">Remove All</span>
             </button>
          </div>
        </div>
      </div>
    );
  }

  if (!chord) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800 shadow-inner">
          <Music size={24} />
        </div>
        <p className="text-sm font-medium">Select a chord block to view its properties.</p>
      </div>
    );
  }

  const hasConflict = melodyAwareMode && (chord.name === 'G13(b9)' || chord.name === 'Am7');

  return (
    <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
      <header className={`p-6 border-b border-zinc-800 flex items-center justify-between ${isFloating ? 'bg-indigo-600/10 cursor-move' : ''}`}>
        <h3 className="text-lg font-bold flex items-center gap-2">
          {isFloating && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
          Inspector
        </h3>
        <div className="flex items-center gap-1">
          {onToggleFloat && (
            <button onClick={onToggleFloat} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
              {isFloating ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          )}
          <button onClick={onToggleCollapse} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-4xl font-black tracking-tighter text-indigo-400 leading-none">{chord.name}</h4>
            <button 
              onClick={onExplain}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-black flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
            >
              <Sparkles size={14} /> EXPLAIN
            </button>
          </div>

          <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 mb-6">
            <div className="flex items-center gap-3">
              <Mic size={18} className={melodyAwareMode ? 'text-amber-500' : 'text-zinc-500'} />
              <div className="text-left">
                <span className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">Optimizer</span>
                <span className="text-xs font-bold text-zinc-300">Melody-Aware</span>
              </div>
            </div>
            <button 
              onClick={onToggleMelodyAware}
              className={`w-12 h-6 rounded-full transition-all relative ring-1 ring-white/10 ${melodyAwareMode ? 'bg-indigo-600' : 'bg-zinc-800'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${melodyAwareMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {hasConflict && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl mb-6 animate-in slide-in-from-top-2">
              <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest mb-2">
                <AlertTriangle size={14} />
                Harmonic Collision
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Melody pitch <span className="text-amber-500 font-bold">F#</span> conflicts. Swap to {chord.root}7#11 is suggested.
              </p>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
            <Fingerprint size={14} /> Voice Structure
          </h5>
          <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-6 shadow-inner relative overflow-hidden flex flex-col gap-6">
             <div className="flex gap-1 justify-center h-24">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className={`relative w-6 h-full rounded-b-lg border border-zinc-800 ${[1,3,6,8,10,13].includes(i % 14) ? 'h-0' : 'bg-zinc-900/50'}`}>
                    {[2, 5, 7, 9, 12].includes(i) && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse" />
                    )}
                  </div>
                ))}
             </div>
          </div>
        </section>

        <section className="space-y-4">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
            <Sparkles size={14} /> AI Swaps
          </h5>
          <div className="grid grid-cols-1 gap-2.5">
            {(hasConflict ? ['G7alt', 'Db7#11'] : ['G7b9', 'Db7#11', 'G7alt']).map((alt) => (
              <button 
                key={alt}
                onClick={() => onSubstitute(alt)}
                className="w-full bg-zinc-900/60 hover:bg-zinc-800 border-2 border-zinc-800/50 hover:border-indigo-500/50 p-4 rounded-3xl flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-600 group-hover:text-indigo-400">
                    <Replace size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-lg leading-none mb-1">{alt}</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Substitution</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
              </button>
            ))}
          </div>
        </section>
      </div>

      <footer className="p-6 border-t border-zinc-800 bg-zinc-950/80 flex gap-3">
        <button 
          onClick={onDuplicate}
          className="flex-1 bg-zinc-900 hover:bg-zinc-800 p-4 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all border border-zinc-800 group active:scale-95"
        >
          <Copy size={18} className="text-zinc-500 group-hover:text-white" />
          <span className="text-xs font-black tracking-widest uppercase">Duplicate</span>
        </button>
        <button 
          onClick={onDelete}
          className="flex-1 bg-zinc-900 hover:bg-red-500/10 hover:text-red-400 p-4 rounded-[1.5rem] flex items-center justify-center gap-3 border border-zinc-800 group active:scale-95"
        >
          <Trash2 size={18} className="text-zinc-500 group-hover:text-red-400" />
          <span className="text-xs font-black tracking-widest uppercase">Delete</span>
        </button>
      </footer>
    </div>
  );
};

export default Inspector;
