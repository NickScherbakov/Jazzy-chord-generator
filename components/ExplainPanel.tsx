
import React, { useState } from 'react';
import { ChordBlock } from '../types';
import { 
  X, Brain, CheckCircle2, ChevronRight, 
  Target, BarChart, Scale, Lightbulb
} from 'lucide-react';

interface ExplainPanelProps {
  chord?: ChordBlock;
  onClose: () => void;
  onSubstitute: (newName: string) => void;
}

const ExplainPanel: React.FC<ExplainPanelProps> = ({ chord, onClose, onSubstitute }) => {
  const [mode, setMode] = useState<'Concise' | 'Detailed'>('Detailed');

  if (!chord) return null;

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 animate-in slide-in-from-right duration-300">
      <header className="p-6 border-b border-zinc-800 flex items-center justify-between bg-indigo-600/5">
        <div className="flex items-center gap-3">
          <Brain size={20} className="text-indigo-400" />
          <h3 className="text-lg font-bold">Explain Mode</h3>
        </div>
        <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
          <X size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <section>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">AI Analysis Score</p>
          <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-indigo-500 rounded-full w-[94%] shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          </div>
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-black text-white">94% Confidence</h4>
            <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black">
              <CheckCircle2 size={12} /> VALIDATED
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Decision Factors</h5>
            <div className="bg-zinc-900 p-1 rounded-xl flex border border-zinc-800">
              <button 
                onClick={() => setMode('Concise')}
                className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${mode === 'Concise' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}
              >
                CONCISE
              </button>
              <button 
                onClick={() => setMode('Detailed')}
                className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${mode === 'Detailed' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}
              >
                DETAILED
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Common Tones', value: '3 / 4', icon: Target },
              { label: 'Movement Cost', value: 'Low', icon: BarChart },
              { label: 'Style Affinity', value: 'Native', icon: Lightbulb }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-3xl">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-600">
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-sm text-zinc-200">{item.label}</p>
                      <span className="text-[10px] font-black text-indigo-400">{item.value}</span>
                    </div>
                    {mode === 'Detailed' && (
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Optimized for voice-leading with high pitch retention.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-600 p-6 rounded-[2.5rem] shadow-2xl shadow-indigo-600/20 flex flex-col gap-5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
               <Brain size={20} className="text-white" />
             </div>
             <p className="font-black text-white leading-tight uppercase text-xs tracking-widest">Substitution Suggestion</p>
          </div>
          <p className="text-xs text-indigo-50 font-medium leading-relaxed opacity-90">
            Tritone sub would increase tension by 24% while resolving clearly.
          </p>
          <button 
            onClick={() => onSubstitute('Db7#11')}
            className="bg-white text-indigo-600 font-black py-4 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 text-xs uppercase tracking-widest"
          >
            Apply Db7#11 Swap
          </button>
        </section>
      </div>
    </div>
  );
};

export default ExplainPanel;
