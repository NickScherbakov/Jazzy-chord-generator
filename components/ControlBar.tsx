
import React, { useState } from 'react';
import { 
  Sparkles, Hash, RotateCcw, 
  ChevronDown, Activity, Zap, Layers, Scale
} from 'lucide-react';
import { STYLE_PRESETS } from '../constants';

interface ControlBarProps {
  onGenerate: () => void;
  isGenerating: boolean;
  entropy: number;
  setEntropy: (val: number) => void;
  theme?: 'Dark' | 'Light';
}

const ControlBar: React.FC<ControlBarProps> = ({ onGenerate, isGenerating, entropy, setEntropy, theme = 'Dark' }) => {
  const [style, setStyle] = useState('Cool Jazz');
  const [showStyles, setShowStyles] = useState(false);
  const [stability, setStability] = useState(0.8);
  const [weirdness, setWeirdness] = useState(0.3);

  const isDark = theme === 'Dark';

  return (
    <div className={`flex items-center gap-1 border rounded-3xl p-2 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 relative ${isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
      {/* Style Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setShowStyles(!showStyles)}
          className={`flex items-center gap-2 px-5 py-2 rounded-2xl transition-all ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
        >
          <Zap size={16} className="text-indigo-400" />
          <div className="text-left">
            <p className="text-[9px] font-black text-zinc-500 uppercase leading-none mb-1">Style</p>
            <p className="text-xs font-bold">{style}</p>
          </div>
          <ChevronDown size={14} className={`text-zinc-600 ml-2 transition-transform ${showStyles ? 'rotate-180' : ''}`} />
        </button>

        {showStyles && (
          <div className={`absolute top-full mt-2 left-0 w-48 max-h-64 overflow-y-auto z-50 rounded-2xl border shadow-2xl animate-in fade-in slide-in-from-top-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            {STYLE_PRESETS.map(s => (
              <button 
                key={s} 
                onClick={() => { setStyle(s); setShowStyles(false); }}
                className={`w-full text-left px-4 py-3 text-xs font-bold transition-all ${style === s ? 'bg-indigo-600 text-white' : isDark ? 'text-zinc-400 hover:bg-zinc-800' : 'text-zinc-600 hover:bg-zinc-50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`w-px h-8 mx-1 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

      {/* Generation Sliders Group */}
      <div className="flex items-center gap-6 px-4">
        {/* Entropy / Temperature */}
        <div className="flex flex-col gap-1 w-24">
          <div className="flex justify-between">
            <p className="text-[9px] font-black text-zinc-500 uppercase">Entropy</p>
            <p className="text-[9px] font-black text-indigo-400">{Math.round(entropy * 100)}%</p>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={entropy}
            onChange={(e) => setEntropy(parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>

        {/* Stability */}
        <div className="flex flex-col gap-1 w-24">
          <div className="flex justify-between">
            <p className="text-[9px] font-black text-zinc-500 uppercase">Stability</p>
            <p className="text-[9px] font-black text-emerald-400">{Math.round(stability * 100)}%</p>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={stability}
            onChange={(e) => setStability(parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
          />
        </div>

        {/* Weirdness */}
        <div className="flex flex-col gap-1 w-24">
          <div className="flex justify-between">
            <p className="text-[9px] font-black text-zinc-500 uppercase">Weirdness</p>
            <p className="text-[9px] font-black text-pink-400">{Math.round(weirdness * 100)}%</p>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={weirdness}
            onChange={(e) => setWeirdness(parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500" 
          />
        </div>
      </div>

      <div className={`w-px h-8 mx-1 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

      {/* Seed Input */}
      <div className="flex items-center px-4 gap-3">
        <Hash size={14} className="text-zinc-600" />
        <input 
          type="text" 
          defaultValue="42069" 
          className={`bg-transparent text-xs font-mono w-16 focus:outline-none ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`} 
        />
        <button className={`p-1 rounded-md text-zinc-500 ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}><RotateCcw size={12}/></button>
      </div>

      <button 
        onClick={onGenerate}
        disabled={isGenerating}
        className={`
          flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-xl
          ${isGenerating 
            ? 'bg-zinc-800 text-zinc-600' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-95'}
        `}
      >
        {isGenerating ? 'GEN...' : <><Sparkles size={16} /> GENERATE</>}
      </button>
    </div>
  );
};

export default ControlBar;
