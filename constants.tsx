
import React from 'react';
import { Project, ChordBlock } from './types';

export const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Midnight Blue Jam', lastModified: '2 mins ago', key: 'Bb Major', bpm: 120, timeSignature: '4/4', style: 'Cool Jazz', mood: 'Melancholic' },
  { id: '2', name: 'Bebop Frenzy', lastModified: '1 hour ago', key: 'F Minor', bpm: 240, timeSignature: '4/4', style: 'Bebop', mood: 'Energetic' },
  { id: '3', name: 'Bossa Nova Sunset', lastModified: 'Yesterday', key: 'D Major', bpm: 110, timeSignature: '4/4', style: 'Bossa Nova', mood: 'Relaxed' },
  { id: '4', name: 'Neo-Soul Vibe', lastModified: '3 hours ago', key: 'Ab Major', bpm: 92, timeSignature: '4/4', style: 'Neo-Soul', mood: 'Dreamy' },
];

export const INITIAL_CHORDS: ChordBlock[] = [
  { id: 'c1', name: 'Cmaj9', root: 'C', quality: 'Major 9', tensions: ['9', '13'], duration: 4, position: 0, functionTag: 'I', recommendedScale: 'Ionian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'c2', name: 'Am7', root: 'A', quality: 'Minor 7', tensions: ['11'], duration: 4, position: 4, functionTag: 'vi', recommendedScale: 'Aeolian', voicingTemplate: 'Rootless', difficulty: 'Easy' },
  { id: 'c3', name: 'Dm9', root: 'D', quality: 'Minor 9', tensions: ['9', '11'], duration: 4, position: 8, functionTag: 'ii', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Medium' },
  { id: 'c4', name: 'G13(b9)', root: 'G', quality: 'Dominant 13', tensions: ['b9', '13'], duration: 4, position: 12, functionTag: 'V', recommendedScale: 'Altered', voicingTemplate: 'Upper Structure', difficulty: 'Pro' },
];

export const STYLE_PRESETS = [
  'Bebop', 
  'Cool Jazz', 
  'Fusion', 
  'Bossa Nova', 
  'Modal Jazz', 
  'Hard Bop', 
  'Gypsy Jazz', 
  'Smooth Jazz', 
  'Acid Jazz', 
  'Neo-Soul', 
  'Swing', 
  'Avant-Garde', 
  'Soul Jazz', 
  'Lo-Fi Jazz', 
  'Dark Jazz'
];

export const MOOD_PRESETS = [
  'Vibrant', 
  'Melancholic', 
  'Relaxed', 
  'Tense', 
  'Sophisticated', 
  'Cinematic', 
  'Dreamy', 
  'Nocturnal', 
  'Aggressive', 
  'Whimsical', 
  'Ethereal', 
  'Gritty', 
  'Nostalgic', 
  'Romantic', 
  'Mysterious'
];

export const KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
