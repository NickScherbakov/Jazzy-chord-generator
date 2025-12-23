
import React, { useState } from 'react';
import { Project } from '../types';
import { X, Shuffle } from 'lucide-react';
import { KEYS, STYLE_PRESETS, MOOD_PRESETS } from '../constants';

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (project: Project) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: 'Untitled Progression',
    key: 'C Major',
    bpm: 120,
    timeSig: '4/4',
    style: 'Cool Jazz',
    mood: 'Sophisticated',
    seed: Math.floor(Math.random() * 999999),
    randomizeSeed: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      lastModified: 'Just now',
      key: formData.key,
      bpm: formData.bpm,
      timeSignature: formData.timeSig,
      style: formData.style,
      mood: formData.mood
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <header className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h2 className="text-2xl font-bold">New Project</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium text-zinc-400">Project Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter project name..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Key</label>
              <select 
                value={formData.key}
                onChange={(e) => setFormData({...formData, key: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none"
              >
                {KEYS.map(k => <option key={k} value={`${k} Major`}>{k} Major</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">BPM</label>
              <input 
                type="number" 
                value={formData.bpm}
                onChange={(e) => setFormData({...formData, bpm: parseInt(e.target.value)})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Style</label>
              <select 
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none"
              >
                {STYLE_PRESETS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Mood</label>
              <select 
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none"
              >
                {MOOD_PRESETS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="col-span-2 flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-zinc-400">Generation Seed</label>
                <input 
                  type="text" 
                  disabled={formData.randomizeSeed}
                  value={formData.seed}
                  onChange={(e) => setFormData({...formData, seed: parseInt(e.target.value)})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none disabled:opacity-50"
                />
              </div>
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.randomizeSeed}
                  onChange={(e) => setFormData({...formData, randomizeSeed: e.target.checked})}
                  className="w-5 h-5 accent-indigo-500 rounded border-zinc-800 bg-zinc-950"
                />
                <span className="text-sm text-zinc-400">Randomize</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-semibold transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-2 px-12 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
