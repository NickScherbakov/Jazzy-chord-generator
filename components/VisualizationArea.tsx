
import React, { useState, useMemo } from 'react';
import { ViewTab, ChordBlock } from '../types';
import { 
  AreaChart, Area, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, ReferenceLine
} from 'recharts';
import { 
  Activity, BarChart3, Grid, Music, Focus
} from 'lucide-react';

interface VisualizationAreaProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  chords: ChordBlock[];
  entropy: number;
  theme?: 'Dark' | 'Light';
  onCellClick?: (index: number) => void;
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({ activeTab, setActiveTab, chords, entropy, theme = 'Dark', onCellClick }) => {
  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

  const graphData = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => ({
      time: i,
      tension: (Math.sin(i / 5) * 50 + 50) + (Math.random() * 20 * entropy),
      targetTension: 60 + (Math.sin(i / 8) * 20), // Simulated target curve
      voiceLeading: Math.cos(i / 4) * 40 + 60,
      complexity: (i % 8) * 10 * entropy
    }));
  }, [entropy]);

  const pianoRollNotes = useMemo(() => {
    return chords.flatMap((chord) => {
      const offsets = chord.quality.includes('Major') ? [0, 4, 7, 11] : [0, 3, 7, 10];
      return offsets.map(offset => ({
        id: `${chord.id}-${offset}`,
        row: (12 - (['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'].indexOf(chord.root) + offset) % 12) % 12,
        pos: chord.position,
        dur: chord.duration,
        name: chord.name
      }));
    });
  }, [chords]);

  const guideTones = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      beat: i,
      third: 60 + Math.floor(Math.sin(i / 2) * 5),
      seventh: 67 + Math.floor(Math.cos(i / 2) * 5),
    }));
  }, []);

  const tabs: {id: ViewTab, label: string, icon: any}[] = [
    { id: 'Tension', label: 'Tension Curve', icon: Activity },
    { id: 'GuideTone', label: 'Guide Tones', icon: BarChart3 },
    { id: 'Heatmap', label: 'Harmonic Heatmap', icon: Grid },
    { id: 'PianoRoll', label: 'Piano Roll', icon: Music },
  ];

  const isDark = theme === 'Dark';

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
      <div className={`flex border-b px-4 ${isDark ? 'bg-zinc-950/80 border-zinc-900' : 'bg-zinc-50 border-zinc-200'}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all relative
              ${activeTab === tab.id 
                ? (isDark ? 'text-white' : 'text-zinc-900') 
                : (isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600')}
            `}
          >
            <tab.icon size={14} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 animate-in fade-in" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        {activeTab === 'Tension' && (
          <div className="h-full flex flex-col animate-in fade-in">
             <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Calculated Tension</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Target Overlay</span>
                  </div>
                </div>
                <div className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  OPTIMIZATION GAIN: 0.92
                </div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorTension" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#18181b' : '#e4e4e7'} />
                <Tooltip 
                  contentStyle={{backgroundColor: isDark ? '#09090b' : '#fff', borderColor: isDark ? '#27272a' : '#e4e4e7', borderRadius: '12px'}}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="tension" stroke="#6366f1" fill="url(#colorTension)" strokeWidth={3} />
                <Line type="monotone" dataKey="targetTension" stroke="#3f3f46" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'GuideTone' && (
          <div className="h-full flex flex-col animate-in fade-in">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={guideTones}>
                <CartesianGrid strokeDasharray="5 5" stroke={isDark ? '#18181b' : '#e4e4e7'} />
                <Line type="stepAfter" dataKey="third" stroke="#6366f1" strokeWidth={4} dot={false} />
                <Line type="stepAfter" dataKey="seventh" stroke="#f59e0b" strokeWidth={4} dot={false} />
                <Tooltip cursor={{ stroke: '#6366f1', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'Heatmap' && (
          <div className="h-full grid grid-cols-8 grid-rows-8 gap-1.5 animate-in zoom-in-95">
            {Array.from({ length: 64 }).map((_, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setHighlightedCell(i)}
                onMouseLeave={() => setHighlightedCell(null)}
                onClick={() => onCellClick?.(i)}
                className={`
                  rounded-lg transition-all duration-300 border cursor-crosshair flex items-center justify-center
                  ${highlightedCell === i ? 'scale-110 z-10 border-indigo-400 bg-indigo-500 shadow-xl' : isDark ? 'bg-indigo-500/10 border-zinc-800' : 'bg-indigo-500/5 border-zinc-200'}
                `}
                style={{ opacity: highlightedCell === i ? 1 : Math.max(0.1, (i % 17) / 17 * entropy) }}
              >
                {highlightedCell === i && <Focus size={12} className="text-white" />}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'PianoRoll' && (
          <div className={`h-full flex relative border rounded-[2rem] overflow-hidden animate-in fade-in ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-zinc-50 border-zinc-200'}`}>
            <div className={`w-16 border-r flex flex-col z-10 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
               {['C','B','Bb','A','Ab','G','Gb','F','E','Eb','D','Db'].map((p, i) => (
                 <div key={i} className={`flex-1 border-b flex items-center justify-center text-[9px] font-black ${isDark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-400 border-zinc-200'}`}>
                    {p}
                 </div>
               ))}
            </div>
            <div className={`flex-1 grid grid-cols-16 relative overflow-hidden ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
               {Array.from({length: 16}).map((_, i) => <div key={i} className={`border-r ${isDark ? 'border-zinc-900/40' : 'border-zinc-100'}`} />)}
               
               {pianoRollNotes.map(note => (
                  <div 
                    key={note.id}
                    className="absolute h-[8%] bg-indigo-500/30 border border-indigo-500/50 rounded-md animate-in slide-in-from-left duration-500"
                    style={{
                      top: `${note.row * 8.33}%`,
                      left: `${(note.pos / 16) * 100}%`,
                      width: `${(note.dur / 16) * 100}%`
                    }}
                  />
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationArea;
