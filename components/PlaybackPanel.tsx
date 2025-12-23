
import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Square, 
  Volume2, Download, Layers, Repeat, Zap,
  Fingerprint, Sparkles, Clock
} from 'lucide-react';

interface PlaybackPanelProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  playhead: number;
  onExport: () => void;
  theme?: 'Dark' | 'Light';
}

const PlaybackPanel: React.FC<PlaybackPanelProps> = ({ isPlaying, onPlayToggle, playhead, onExport, theme = 'Dark' }) => {
  const [swing, setSwing] = useState(50);
  const [humanize, setHumanize] = useState(true);
  const [isLooping, setIsLooping] = useState(true);

  const isDark = theme === 'Dark';

  return (
    <footer className={`h-20 border-t flex items-center justify-between px-8 z-40 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
      {/* Left: Transport Info & Swing */}
      <div className="flex items-center gap-8 min-w-[340px]">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Tempo</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono font-black">120.0</span>
              <span className="text-[10px] text-zinc-600 font-bold uppercase">BPM</span>
            </div>
          </div>
          
          <div className="flex flex-col border-l border-zinc-800/50 pl-6">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Meter</p>
            <span className="text-xl font-mono font-black">4/4</span>
          </div>
        </div>
        
        <div className={`w-px h-8 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

        <div className="flex flex-col gap-1 w-24">
          <div className="flex justify-between">
            <p className="text-[9px] font-bold text-zinc-500 uppercase">Swing</p>
            <p className={`text-[9px] font-bold ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{swing}%</p>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={swing}
            onChange={(e) => setSwing(parseInt(e.target.value))}
            className={`w-full h-1 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} 
          />
        </div>

        <button 
          onClick={() => setHumanize(!humanize)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${humanize 
            ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
            : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}
        >
          <Fingerprint size={12} />
          <span className="text-[10px] font-black uppercase">Humanize</span>
        </button>
      </div>

      {/* Center: Playback Controls */}
      <div className="flex items-center gap-6">
        <button className="text-zinc-500 hover:text-white transition-all"><SkipBack size={24}/></button>
        <button 
          onClick={onPlayToggle}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl
            ${isPlaying 
              ? isDark ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900' 
              : isDark ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-white/10' : 'bg-zinc-900 text-white hover:scale-105 active:scale-95'}
          `}
        >
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
        </button>
        <button className="text-zinc-500 hover:text-white transition-all"><SkipForward size={24}/></button>
        <button 
          onClick={() => setIsLooping(!isLooping)}
          className={`p-2.5 border rounded-xl transition-all ${isLooping 
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
            : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-indigo-400' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}
        >
          <Repeat size={18} />
        </button>
      </div>

      {/* Right: Export & Volume */}
      <div className="flex items-center gap-6 min-w-[340px] justify-end">
        <div className={`flex items-center gap-3 border rounded-2xl px-4 py-2.5 shadow-inner ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
           <Layers size={16} className="text-zinc-500" />
           <select className="bg-transparent text-xs font-black uppercase tracking-widest focus:outline-none appearance-none cursor-pointer">
             <option>Grand Piano Trio</option>
             <option>Rhodes MKII</option>
             <option>Upright Walk</option>
           </select>
        </div>

        <button 
          onClick={onExport}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Download size={18} />
          Export
        </button>
      </div>
    </footer>
  );
};

export default PlaybackPanel;
