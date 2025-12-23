
import React, { useState } from 'react';
import { Mic, Plus, MousePointer2, Music, Eraser } from 'lucide-react';

// Add interface for theme support
interface MelodyEditorProps {
  theme?: 'Dark' | 'Light';
}

const MelodyEditor: React.FC<MelodyEditorProps> = ({ theme = 'Dark' }) => {
  const [notes, setNotes] = useState<{row: number, col: number}[]>([
    {row: 4, col: 2}, {row: 5, col: 4}, {row: 4, col: 6}, {row: 3, col: 8}
  ]);

  const toggleNote = (row: number, col: number) => {
    const exists = notes.find(n => n.row === row && n.col === col);
    if (exists) {
      setNotes(notes.filter(n => n !== exists));
    } else {
      setNotes([...notes, {row, col}]);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 pt-24 animate-in fade-in duration-500">
      <div className="px-8 mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-3">
            <Mic className="text-amber-500" />
            Melody Input
          </h3>
          <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mt-1">DRAW NOTES TO OPTIMIZE HARMONY</p>
        </div>
        <div className="flex bg-zinc-900 rounded-xl p-1 border border-zinc-800">
          <button className="p-2 bg-indigo-500 text-white rounded-lg shadow-lg"><MousePointer2 size={18} /></button>
          <button className="p-2 text-zinc-500 hover:text-white"><Eraser size={18} /></button>
          <button className="p-2 text-zinc-500 hover:text-white"><Plus size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 pt-0">
        <div className="border border-zinc-800 rounded-3xl overflow-hidden flex bg-zinc-900/10">
          <div className="w-16 flex flex-col border-r border-zinc-800">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className={`flex-1 flex items-center justify-center font-mono text-[10px] border-b border-zinc-800 ${i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900'}`}>
                {['C','B','Bb','A','Ab','G','Gb','F','E','Eb','D','Db'][i]}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-16 relative">
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} className="border-r border-zinc-800/50" />
            ))}
            {Array.from({length: 12}).map((_, row) => (
              <div key={row} className="absolute left-0 right-0 h-[8.33%] border-b border-zinc-800/20" style={{top: `${row * 8.33}%`}}>
                {Array.from({length: 16}).map((_, col) => {
                  const isActive = notes.some(n => n.row === row && n.col === col);
                  return (
                    <div 
                      key={col} 
                      onClick={() => toggleNote(row, col)}
                      className={`absolute top-0 bottom-0 transition-all cursor-pointer ${isActive ? 'bg-amber-500 border border-amber-400 shadow-lg shadow-amber-500/20 z-10' : 'hover:bg-zinc-800/30'}`}
                      style={{left: `${col * 6.25}%`, width: '6.25%'}}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 flex gap-4">
        <button className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-xl text-sm font-bold hover:border-zinc-700 transition-all">Import MIDI Melody</button>
        <button className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-500/20 transition-all">Clear All Notes</button>
      </div>
    </div>
  );
};

export default MelodyEditor;