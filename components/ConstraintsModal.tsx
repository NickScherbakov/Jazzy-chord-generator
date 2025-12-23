
import React, { useState } from 'react';
import { X, ShieldCheck, ShieldAlert, Lock, Ban, Zap, Info } from 'lucide-react';

interface ConstraintsModalProps {
  onClose: () => void;
  // Add theme prop to satisfy Workspace.tsx usage
  theme?: 'Dark' | 'Light';
}

const ConstraintsModal: React.FC<ConstraintsModalProps> = ({ onClose, theme = 'Dark' }) => {
  const [constraints, setConstraints] = useState([
    { id: '1', name: 'Diatonic Focus', desc: 'Prioritize chords within the native key center.', enabled: true, icon: ShieldCheck },
    { id: '2', name: 'No Secondary Dominants', desc: 'Disallow non-diatonic V-I motions.', enabled: false, icon: Ban },
    { id: '3', name: 'Voice-leading Threshold', desc: 'Enforce maximum pitch jump across transitions.', enabled: true, icon: Zap },
    { id: '4', name: 'Lock Functional Template', desc: 'Prevent generator from changing functional roles.', enabled: true, icon: Lock }
  ]);

  const toggle = (id: string) => {
    setConstraints(prev => prev.map(c => c.id === id ? {...c, enabled: !c.enabled} : c));
  };

  const isDark = theme === 'Dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className={`border w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
        <header className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-pink-500" />
            <h2 className="text-2xl font-bold">Constraint System</h2>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}><X size={20} /></button>
        </header>

        <div className="p-8 space-y-6">
          <div className={`p-4 rounded-2xl flex gap-4 border ${isDark ? 'bg-pink-500/5 border-pink-500/20' : 'bg-pink-50 border-pink-100'}`}>
             <div className="p-3 bg-pink-500/10 text-pink-500 rounded-xl h-fit">
               <Info size={20} />
             </div>
             <div>
               <p className="text-sm font-bold text-zinc-200 mb-1">Strict Mode is Active</p>
               <p className="text-xs text-zinc-500 leading-relaxed">
                 Constraints restrict the harmonic search space, ensuring the generated results adhere to your specific musical rules.
               </p>
             </div>
          </div>

          <div className="space-y-3">
            {constraints.map(c => (
              <div 
                key={c.id} 
                onClick={() => toggle(c.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${c.enabled 
                  ? isDark ? 'bg-zinc-800 border-indigo-500/30' : 'bg-zinc-50 border-indigo-200' 
                  : isDark ? 'bg-zinc-950 border-zinc-800 hover:bg-zinc-900' : 'bg-white border-zinc-100 hover:bg-zinc-50'}`}
              >
                <div className={`p-3 rounded-xl ${c.enabled ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-900 text-zinc-500'}`}>
                  <c.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">{c.desc}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-all ${c.enabled ? 'bg-indigo-500' : 'bg-zinc-700'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${c.enabled ? 'left-7' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className={`p-6 border-t ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-100 bg-zinc-50'}`}>
           <button 
             onClick={onClose}
             className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
           >
             Save Constraints
           </button>
        </footer>
      </div>
    </div>
  );
};

export default ConstraintsModal;