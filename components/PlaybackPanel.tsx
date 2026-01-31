
import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Download, Layers, Repeat,
  Fingerprint
} from 'lucide-react';
import TempoRampModal from './TempoRampModal';
import { TEMPO_RAMP_START_BPM, TEMPO_RAMP_END_BPM, TEMPO_RAMP_DURATION_SECONDS } from '../constants';

interface PlaybackPanelProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  playhead: number;
  onExport: () => void;
  onEnableAudio: () => void;
  audioEnabled: boolean;
  theme?: 'Dark' | 'Light';
}

const RAMP_START_BPM = TEMPO_RAMP_START_BPM;
const RAMP_END_BPM = TEMPO_RAMP_END_BPM;
const RAMP_DURATION_SECONDS = TEMPO_RAMP_DURATION_SECONDS;
const SMOOTHING_TAU_SECONDS = 0.3;

const PlaybackPanel: React.FC<PlaybackPanelProps> = ({ isPlaying, onPlayToggle, playhead, onExport, onEnableAudio, audioEnabled, theme = 'Dark' }) => {
  const [swing, setSwing] = useState(50);
  const [humanize, setHumanize] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [showTempoRamp, setShowTempoRamp] = useState(false);
  const [displayBpm, setDisplayBpm] = useState(`${RAMP_START_BPM.toFixed(1)}`);
  const elapsedSecondsRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const smoothedBpmRef = useRef(RAMP_START_BPM);
  const rafRef = useRef<number | null>(null);

  const isDark = theme === 'Dark';

  useEffect(() => {
    const updateBpm = (targetBpm: number, dt: number) => {
      if (dt <= 0 || !Number.isFinite(dt)) {
        smoothedBpmRef.current = targetBpm;
        setDisplayBpm(targetBpm.toFixed(1));
        return;
      }

      const alpha = 1 - Math.exp(-dt / SMOOTHING_TAU_SECONDS);
      smoothedBpmRef.current += alpha * (targetBpm - smoothedBpmRef.current);
      setDisplayBpm(smoothedBpmRef.current.toFixed(1));
    };

    const tick = (timestamp: number) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = timestamp;
      }

      const dt = (timestamp - lastTickRef.current) / 1000;
      lastTickRef.current = timestamp;
      elapsedSecondsRef.current = Math.min(RAMP_DURATION_SECONDS, elapsedSecondsRef.current + dt);

      const progress = RAMP_DURATION_SECONDS === 0 ? 1 : elapsedSecondsRef.current / RAMP_DURATION_SECONDS;
      const targetBpm = RAMP_START_BPM + (RAMP_END_BPM - RAMP_START_BPM) * Math.min(1, progress);
      updateBpm(targetBpm, dt);

      rafRef.current = requestAnimationFrame(tick);
    };

    if (isPlaying) {
      lastTickRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying]);

  return (
    <footer className={`h-20 border-t flex items-center justify-between px-8 z-40 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
      {/* Left: Transport Info & Swing */}
      <div className="flex items-center gap-8 min-w-[340px]">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Tempo</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono font-black tabular-nums">{displayBpm}</span>
              <span className="text-[10px] text-zinc-600 font-bold uppercase">BPM</span>
              <button
                type="button"
                onClick={() => setShowTempoRamp(true)}
                className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border transition-all ${isDark ? 'border-zinc-700 text-zinc-400 hover:text-white hover:border-indigo-400' : 'border-zinc-200 text-zinc-500 hover:text-indigo-600 hover:border-indigo-300'}`}
              >
                {`${RAMP_START_BPM}→${RAMP_END_BPM} / 65:00`}
              </button>
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
        <div className="flex items-center gap-2">
          <button
            onClick={onEnableAudio}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-indigo-400' : 'bg-white border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:border-indigo-300'}`}
          >
            Enable Audio
          </button>
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${audioEnabled ? (isDark ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10' : 'border-emerald-500/40 text-emerald-600 bg-emerald-500/10') : (isDark ? 'border-zinc-700 text-zinc-500' : 'border-zinc-300 text-zinc-400')}`}>
            {audioEnabled ? 'Audio enabled' : 'Audio disabled'}
          </span>
        </div>
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

      {showTempoRamp && (
        <TempoRampModal
          onClose={() => setShowTempoRamp(false)}
          theme={theme}
          startBpm={RAMP_START_BPM}
          endBpm={RAMP_END_BPM}
          durationSeconds={RAMP_DURATION_SECONDS}
          smoothingTau={SMOOTHING_TAU_SECONDS}
        />
      )}
    </footer>
  );
};

export default PlaybackPanel;
