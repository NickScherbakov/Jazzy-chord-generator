import React from 'react';
import { X, TimerReset, TrendingUp } from 'lucide-react';

interface TempoRampModalProps {
  onClose: () => void;
  theme?: 'Dark' | 'Light';
  startBpm: number;
  endBpm: number;
  durationSeconds: number;
  smoothingTau: number;
}

const formatDuration = (durationSeconds: number) => {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.round(durationSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const TempoRampModal: React.FC<TempoRampModalProps> = ({
  onClose,
  theme = 'Dark',
  startBpm,
  endBpm,
  durationSeconds,
  smoothingTau,
}) => {
  const isDark = theme === 'Dark';

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className={`border w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
        <header className="p-8 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Tempo Ramp</p>
              <h2 className="text-xl font-black tracking-tight">{startBpm} → {endBpm} BPM</h2>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-all ${isDark ? 'text-zinc-400 hover:text-white bg-zinc-800/70' : 'text-zinc-500 hover:text-zinc-900 bg-zinc-100'}`}>
            <X size={20} />
          </button>
        </header>

        <div className="p-8 space-y-6">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-black/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
              <span>Target Range</span>
              <span>{startBpm}→{endBpm} / {formatDuration(durationSeconds)}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <TimerReset size={14} />
              <span>Linear ramp with EMA smoothing (τ={smoothingTau.toFixed(1)}s)</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-zinc-500 leading-relaxed">
            <p>
              The current BPM readout follows the ramp in real time and applies exponential smoothing to keep
              the display stable during playback.
            </p>
          </div>
        </div>

        <footer className={`p-6 border-t flex justify-end ${isDark ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-zinc-50'}`}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-95"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TempoRampModal;
