
import React, { useRef, useState } from 'react';
import { ChordBlock } from '../types';
import { Lock, MoreHorizontal, ShieldAlert, ZoomIn, ZoomOut, ShieldCheck, Sparkles } from 'lucide-react';

interface TimelineProps {
  chords: ChordBlock[];
  selectedIds: string[];
  onSelect: (id: string, multi: boolean) => void;
  playhead: number;
  onPlayheadChange: (val: number) => void;
  melodyAwareMode?: boolean;
  onUpdateChord: (id: string, updates: Partial<ChordBlock>, commit?: boolean) => void;
  theme?: 'Dark' | 'Light';
  highlightId?: string | null;
  isGenerating?: boolean;
  showVoiceLeading?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ 
  chords, selectedIds, onSelect, playhead, onPlayheadChange, 
  melodyAwareMode, onUpdateChord, theme = 'Dark', highlightId = null,
  isGenerating = false, showVoiceLeading = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(200);
  const [barZoom, setBarZoom] = useState<4 | 8 | 16>(4);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [snapGuide, setSnapGuide] = useState<number | null>(null);

  const totalBeats = barZoom * 4;
  const isLight = theme === 'Light';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + containerRef.current.scrollLeft;
    const beat = x / zoomLevel;

    if (isScrubbing) {
      onPlayheadChange(Math.max(0, Math.min(totalBeats, beat)));
    } else if (draggingId) {
      const snappedBeat = Math.round(beat * 2) / 2;
      setSnapGuide(snappedBeat);
      onUpdateChord(draggingId, { position: Math.max(0, snappedBeat) }, false);
    } else if (resizingId) {
      const chord = chords.find(c => c.id === resizingId);
      if (chord) {
        const newDuration = Math.max(0.5, beat - chord.position);
        onUpdateChord(resizingId, { duration: Math.round(newDuration * 2) / 2 }, false);
      }
    }
  };

  const stopInteractions = () => {
    if (draggingId || resizingId) {
      const id = draggingId || resizingId;
      const finalChord = chords.find(c => c.id === id);
      if (finalChord) onUpdateChord(id!, finalChord, true);
    }
    setDraggingId(null);
    setResizingId(null);
    setIsScrubbing(false);
    setSnapGuide(null);
  };

  return (
    <div 
      className={`relative w-full h-full overflow-x-auto overflow-y-hidden pt-4 pb-12 select-none transition-colors duration-300 ${isLight ? 'bg-zinc-100/50' : 'bg-zinc-950/60'}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={stopInteractions}
      onMouseLeave={stopInteractions}
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none" style={{ width: `${totalBeats * zoomLevel}px` }}>
        {Array.from({ length: totalBeats + 1 }).map((_, i) => (
          <div 
            key={i} 
            className={`absolute top-0 bottom-0 border-l ${i % 4 === 0 ? (isLight ? 'border-zinc-300' : 'border-zinc-800') : (isLight ? 'border-zinc-200/40' : 'border-zinc-900/10')}`}
            style={{ left: `${i * zoomLevel}px` }}
          >
            {i % 4 === 0 && i < totalBeats && (
              <span className={`text-[10px] font-black ml-4 mt-2 absolute block uppercase tracking-[0.3em] whitespace-nowrap ${isLight ? 'text-zinc-400' : 'text-zinc-700'}`}>
                BAR {Math.floor(i / 4) + 1}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* SNAP INDICATOR */}
      {snapGuide !== null && (
        <div 
          className="absolute top-0 bottom-0 w-[1.5px] bg-indigo-500/40 z-10 pointer-events-none"
          style={{ left: `${snapGuide * zoomLevel}px` }}
        />
      )}

      {/* MAIN PLAYHEAD */}
      <div 
        className="absolute top-0 bottom-0 w-[3px] bg-red-500 z-40 pointer-events-none shadow-[0_0_15px_rgba(239,68,68,0.5)]"
        style={{ left: `${playhead * zoomLevel}px` }}
      >
        <div 
          className="w-6 h-6 bg-red-500 rounded-full -ml-[11.5px] mt-1 shadow-[0_0_20px_rgba(239,68,68,0.7)] border-2 border-white/80 cursor-grab active:cursor-grabbing pointer-events-auto flex items-center justify-center transition-transform hover:scale-110 active:scale-100"
          onMouseDown={(e) => { e.stopPropagation(); setIsScrubbing(true); }}
        >
          <div className="w-1 h-3 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* CHORD BLOCKS LAYER */}
      <div className="relative h-full min-w-max px-8">
        {chords.map((chord) => {
          const hasConflict = melodyAwareMode && (chord.name === 'G13(b9)' || chord.name === 'Am7');
          const isSelected = selectedIds.includes(chord.id);
          const isHighlighted = highlightId === chord.id;
          
          return (
            <div
              key={chord.id}
              onMouseDown={(e) => onSelect(chord.id, e.shiftKey)}
              className={`
                absolute top-12 h-36 rounded-[2rem] border-[3px] flex flex-col p-5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300
                ${isSelected ? 'border-indigo-500 bg-indigo-500/15 z-20 scale-[1.01]' : isLight ? 'border-zinc-200 bg-white shadow-lg hover:shadow-xl z-10 hover:border-zinc-300' : 'border-zinc-800 bg-zinc-900 shadow-xl z-10 hover:bg-zinc-800/80'}
                ${hasConflict ? 'ring-2 ring-amber-500/30 border-amber-500/80' : ''}
                ${isHighlighted ? 'ring-2 ring-indigo-500 animate-pulse' : ''}
                ${draggingId === chord.id ? 'opacity-50 scale-95 cursor-grabbing z-50 shadow-none' : 'cursor-grab'}
              `}
              style={{ 
                left: `${chord.position * zoomLevel + 24}px`, 
                width: `${chord.duration * zoomLevel - 12}px`,
              }}
            >
              {/* Drag Area */}
              <div 
                className="absolute inset-0 z-0" 
                onMouseDown={(e) => { e.stopPropagation(); setDraggingId(chord.id); }}
              />

              <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                 {chord.difficulty === 'Pro' && (
                   <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg" title="Professional Voicing">
                     <Lock size={10} />
                   </div>
                 )}
                 {chord.functionTag === 'I' && (
                   <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg" title="Resolved State">
                     <ShieldCheck size={10} />
                   </div>
                 )}
              </div>

              {hasConflict && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 py-0.5 flex items-center justify-center gap-1 text-black text-[8px] font-black tracking-[0.2em] rounded-t-[2rem] uppercase">
                  <ShieldAlert size={8} />
                  Harmonic Collision
                </div>
              )}

              <div className="relative z-10 flex items-center justify-between mb-1 mt-1 pointer-events-none">
                <span className={`text-3xl font-black tracking-tighter ${isSelected ? 'text-indigo-400' : isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {chord.name}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isLight ? 'bg-zinc-100 text-zinc-400' : 'bg-zinc-950/80 text-zinc-600'}`}>
                  <MoreHorizontal size={12} />
                </div>
              </div>

              <div className="mt-auto relative z-10 flex justify-between items-end pointer-events-none">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase font-black text-zinc-500 tracking-[0.15em]">{chord.functionTag}</span>
                  <div className="flex gap-1">
                    {chord.tensions.map(t => (
                      <span key={t} className={`px-1.5 py-0.5 rounded-md text-[9px] font-black border ${isLight ? 'bg-zinc-50 text-indigo-600 border-zinc-200' : 'bg-black/50 text-indigo-400 border-indigo-500/20'}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resize Handle */}
              <div 
                className="absolute right-2 top-8 bottom-8 w-4 cursor-ew-resize flex items-center justify-center group z-20"
                onMouseDown={(e) => { e.stopPropagation(); setResizingId(chord.id); }}
              >
                <div className={`w-1.5 h-10 rounded-full transition-all duration-300 ${isLight ? 'bg-zinc-200 group-hover:bg-indigo-400' : 'bg-zinc-800 group-hover:bg-indigo-500 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEWPORT CONTROLS (ZOOM / BARS) */}
      <div className="absolute bottom-4 left-8 flex items-center gap-4 z-40">
        <div className={`flex items-center border p-1 rounded-xl backdrop-blur-3xl shadow-2xl ${isLight ? 'bg-white/90 border-zinc-200' : 'bg-zinc-900/90 border-zinc-800 shadow-indigo-500/5'}`}>
          {[4, 8, 16].map((bars) => (
            <button
              key={bars}
              onClick={() => setBarZoom(bars as any)}
              className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition-all tracking-widest ${barZoom === bars ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/40' : isLight ? 'text-zinc-400 hover:text-zinc-900' : 'text-zinc-500 hover:text-white'}`}
            >
              {bars} BARS
            </button>
          ))}
        </div>
        <div className={`flex border p-1 rounded-xl backdrop-blur-3xl shadow-2xl ${isLight ? 'bg-white/90 border-zinc-200' : 'bg-zinc-900/90 border-zinc-800 shadow-indigo-500/5'}`}>
          <button onClick={() => setZoomLevel(z => Math.max(100, z - 30))} className="p-1.5 text-zinc-500 hover:text-indigo-400 transition-colors"><ZoomOut size={14}/></button>
          <div className="w-px h-5 bg-zinc-800 self-center" />
          <button onClick={() => setZoomLevel(z => Math.min(400, z + 30))} className="p-1.5 text-zinc-500 hover:text-indigo-400 transition-colors"><ZoomIn size={14}/></button>
        </div>
      </div>

      {/* GENERATION OVERLAY */}
      {isGenerating && (
        <div className="absolute inset-0 z-[60] pointer-events-none flex items-center justify-center bg-indigo-950/30 backdrop-blur-[4px] animate-pulse">
           <div className="flex flex-col items-center gap-3">
             <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-[0_0_60px_rgba(99,102,241,1)] animate-bounce">
               <Sparkles size={32} />
             </div>
             <p className="text-[10px] font-black text-white tracking-[0.6em] uppercase drop-shadow-lg">Optimizing Harmony</p>
           </div>
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent animate-shimmer" />
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Timeline;
