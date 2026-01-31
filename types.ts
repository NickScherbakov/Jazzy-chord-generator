
export interface ChordBlock {
  id: string;
  name: string;
  root: string;
  quality: string;
  tensions: string[];
  duration: number; // in beats
  position: number; // in beats
  functionTag: string;
  recommendedScale: string;
  voicingTemplate: string;
  difficulty: 'Easy' | 'Medium' | 'Pro';
}

export interface Project {
  id: string;
  name: string;
  lastModified: string;
  key: string;
  bpm: number;
  timeSignature: string;
  style: string;
  mood: string;
}

export interface MelodyNote {
  row: number;
  col: number;
}

export type ViewTab = 'GuideTone' | 'Tension' | 'Heatmap' | 'PianoRoll';
