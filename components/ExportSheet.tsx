
import React, { useState } from 'react';
import { 
  X, FileText, Music, Waves, CheckCircle, Download, Clock, 
  FolderOpen, ShieldCheck, ChevronRight, HardDrive, Plus, 
  FileCode, Lock
} from 'lucide-react';

interface ExportSheetProps {
  onClose: () => void;
  theme?: 'Dark' | 'Light';
}

const ExportSheet: React.FC<ExportSheetProps> = ({ onClose, theme = 'Dark' }) => {
  const [step, setStep] = useState<'options' | 'folder' | 'permissions' | 'progress' | 'complete'>('options');
  const [progress, setProgress] = useState(0);
  const [permissions, setPermissions] = useState({
    dawDrag: true,
    fileSystem: true,
    autoSync: false
  });

  const startExport = () => {
    setStep('progress');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep('complete');
      }
    }, 80);
  };

  const isDark = theme === 'Dark';

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4 animate-in slide-in-from-bottom duration-300">
      <div className={`border w-full max-w-xl rounded-t-[40px] shadow-2xl overflow-hidden ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
        <header className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                <Download size={20} />
             </div>
             <div>
               <h2 className="text-2xl font-black tracking-tight">Export & Sync</h2>
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Mastering & DAW Exchange</p>
             </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-all ${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:bg-zinc-100'}`}><X size={24} /></button>
        </header>

        <div className="px-8 pb-12">
          {step === 'options' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'mid', name: 'Standard MIDI (.mid)', desc: 'Chord messages + velocities', icon: Music },
                  { id: 'xml', name: 'MusicXML (.xml)', desc: 'Professional lead sheet notation', icon: FileText },
                  { id: 'wav', name: 'Audio Stems (.wav)', desc: '24-bit piano + bass renders', icon: Waves },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setStep('folder')} className={`flex items-center gap-4 p-5 border rounded-3xl transition-all group text-left ${isDark ? 'bg-zinc-950 border-zinc-800 hover:border-indigo-500/50' : 'bg-zinc-50 border-zinc-100 hover:border-indigo-300'}`}>
                    <div className={`p-3 rounded-2xl transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-indigo-400' : 'bg-white text-zinc-400 group-hover:text-indigo-600'}`}>
                      <opt.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{opt.name}</p>
                      <p className="text-xs text-zinc-500">{opt.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-zinc-700" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'folder' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center justify-between">
                 <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Select Destination</p>
                 <button className="text-indigo-400 text-xs font-bold flex items-center gap-1"><Plus size={14} /> NEW FOLDER</button>
               </div>
               
               <div className={`border rounded-3xl overflow-hidden ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-100'}`}>
                 <div className={`p-3 border-b text-[10px] font-mono text-zinc-500 flex items-center gap-2 ${isDark ? 'bg-black/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <HardDrive size={12} /> / iCloud / AudioProjects / Projections /
                 </div>
                 <div className="p-2 space-y-1">
                    {['Ableton Sessions', 'Logic Pro Assets', 'Midi Exports', 'Recordings'].map(f => (
                      <button key={f} onClick={() => setStep('permissions')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-white'}`}>
                        <FolderOpen size={16} className="text-amber-500" />
                        {f}
                      </button>
                    ))}
                 </div>
               </div>
               <button onClick={() => setStep('options')} className="w-full py-4 text-zinc-500 text-xs font-black uppercase tracking-widest">Back to Formats</button>
            </div>
          )}

          {step === 'permissions' && (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className={`p-5 rounded-3xl border flex gap-4 ${isDark ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
                   <ShieldCheck size={24} className="text-indigo-500 shrink-0" />
                   <div>
                     <p className="text-sm font-bold mb-1">Exchange Permissions</p>
                     <p className="text-[11px] text-zinc-500 leading-relaxed">HarmonicFlow requires sandbox access to exchange data with external DAWs.</p>
                   </div>
                </div>

                <div className="space-y-3">
                   {[
                     { id: 'dawDrag', label: 'Enable Drag-to-DAW', icon: FileCode },
                     { id: 'fileSystem', label: 'File System Bridge', icon: HardDrive },
                     { id: 'autoSync', label: 'Background Cloud Sync', icon: Lock }
                   ].map(p => (
                     <div key={p.id} className={`p-4 rounded-2xl flex items-center justify-between border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-100'}`}>
                        <div className="flex items-center gap-3">
                           <p.icon size={18} className="text-zinc-500" />
                           <span className="text-sm font-bold">{p.label}</span>
                        </div>
                        <button 
                          onClick={() => setPermissions(prev => ({...prev, [p.id]: !prev[p.id as keyof typeof prev]}))}
                          className={`w-10 h-5 rounded-full relative transition-all ${permissions[p.id as keyof typeof permissions] ? 'bg-indigo-500' : 'bg-zinc-700'}`}
                        >
                           <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${permissions[p.id as keyof typeof permissions] ? 'left-5.5' : 'left-0.5'}`} />
                        </button>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={startExport}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3"
                >
                  <Download size={20} />
                  Begin Render
                </button>
             </div>
          )}

          {step === 'progress' && (
            <div className="py-20 flex flex-col items-center gap-8 animate-in fade-in zoom-in">
              <div className="relative w-32 h-32 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className={isDark ? "text-zinc-800" : "text-zinc-100"} />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={376.8} strokeDashoffset={376.8 * (1 - progress/100)} className="text-indigo-500 transition-all duration-100" />
                 </svg>
                 <span className="absolute text-xl font-mono font-black">{progress}%</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg mb-2">Rendering Assets</p>
                <p className="text-sm text-zinc-500 flex items-center gap-2 justify-center">
                  <Clock size={14} /> 
                  Optimizing voice-leading for MIDI...
                </p>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="py-20 flex flex-col items-center gap-8 animate-in zoom-in">
              <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/10">
                <CheckCircle size={48} />
              </div>
              <div className="text-center">
                <p className="text-2xl font-black mb-2">Export Success</p>
                <p className="text-zinc-400">Assets are ready in your local project folder.</p>
              </div>
              <button 
                onClick={onClose}
                className={`px-12 py-4 rounded-full font-bold transition-all ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportSheet;
