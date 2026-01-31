
import React, { useRef } from 'react';
import { Mic, Plus, MousePointer2, Music, Eraser } from 'lucide-react';
import { Midi } from '@tonejs/midi';
import { MelodyNote } from '../types';

// Add interface for theme support
interface MelodyEditorProps {
  theme?: 'Dark' | 'Light';
  notes: MelodyNote[];
  onNotesChange: (notes: MelodyNote[]) => void;
}

const ROW_NOTE_NAMES = ['C','B','Bb','A','Ab','G','Gb','F','E','Eb','D','Db'];
const PITCH_CLASS_NAMES = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];

const MelodyEditor: React.FC<MelodyEditorProps> = ({ theme = 'Dark', notes, onNotesChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleNote = (row: number, col: number) => {
    const exists = notes.find(n => n.row === row && n.col === col);
    if (exists) {
      onNotesChange(notes.filter(n => n !== exists));
    } else {
      onNotesChange([...notes, {row, col}]);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const midi = new Midi(arrayBuffer);
      const ppq = midi.header.ppq || 480;
      const imported = new Map<string, MelodyNote>();

      midi.tracks.forEach(track => {
        track.notes.forEach(note => {
          const col = Math.round(note.ticks / ppq);
          if (col < 0 || col >= 16) return;

          const pitchClass = note.midi % 12;
          const noteName = PITCH_CLASS_NAMES[pitchClass];
          const row = ROW_NOTE_NAMES.indexOf(noteName);
          if (row === -1) return;

          imported.set(`${row}-${col}`, { row, col });
        });
      });

      onNotesChange(Array.from(imported.values()));
    } catch (error) {
      console.error('Failed to import MIDI:', error);
    } finally {
      event.target.value = '';
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
                {ROW_NOTE_NAMES[i]}
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
        <input
          ref={fileInputRef}
          type="file"
          accept=".mid,.midi"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-xl text-sm font-bold hover:border-zinc-700 transition-all"
          onClick={handleImportClick}
        >
          Import MIDI Melody
        </button>
        <button
          className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-500/20 transition-all"
          onClick={() => onNotesChange([])}
        >
          Clear All Notes
        </button>
      </div>
    </div>
  );
};

export default MelodyEditor;