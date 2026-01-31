
import React from 'react';
import { Project, ChordBlock } from './types';

export const TEMPO_RAMP_START_BPM = 65;
export const TEMPO_RAMP_END_BPM = 140;
export const TEMPO_RAMP_DURATION_SECONDS = 65 * 60;

export const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Midnight Blue Jam', lastModified: '2 mins ago', key: 'Bb Major', bpm: 120, timeSignature: '4/4', style: 'Cool Jazz', mood: 'Melancholic' },
  { id: '2', name: 'Bebop Frenzy', lastModified: '1 hour ago', key: 'F Minor', bpm: 240, timeSignature: '4/4', style: 'Bebop', mood: 'Energetic' },
  { id: '3', name: 'Bossa Nova Sunset', lastModified: 'Yesterday', key: 'D Major', bpm: 110, timeSignature: '4/4', style: 'Bossa Nova', mood: 'Relaxed' },
  { id: '4', name: 'Neo-Soul Vibe', lastModified: '3 hours ago', key: 'Ab Major', bpm: 92, timeSignature: '4/4', style: 'Neo-Soul', mood: 'Dreamy' },
  { id: '5', name: 'Autumn Leaves (Educational)', lastModified: 'Just now', key: 'G Minor', bpm: 140, timeSignature: '4/4', style: 'Swing', mood: 'Nostalgic' },
];

export const INITIAL_CHORDS: ChordBlock[] = [
  { id: 'c1', name: 'Cmaj9', root: 'C', quality: 'Major 9', tensions: ['9', '13'], duration: 4, position: 0, functionTag: 'I', recommendedScale: 'Ionian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'c2', name: 'Am7', root: 'A', quality: 'Minor 7', tensions: ['11'], duration: 4, position: 4, functionTag: 'vi', recommendedScale: 'Aeolian', voicingTemplate: 'Rootless', difficulty: 'Easy' },
  { id: 'c3', name: 'Dm9', root: 'D', quality: 'Minor 9', tensions: ['9', '11'], duration: 4, position: 8, functionTag: 'ii', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Medium' },
  { id: 'c4', name: 'G13(b9)', root: 'G', quality: 'Dominant 13', tensions: ['b9', '13'], duration: 4, position: 12, functionTag: 'V', recommendedScale: 'Altered', voicingTemplate: 'Upper Structure', difficulty: 'Pro' },
];

// Autumn Leaves - Классическая джазовая прогрессия (учебный пример)
// Форма: 32 такта AABC
export const AUTUMN_LEAVES_CHORDS: ChordBlock[] = [
  // Секция A (8 тактов) - первая часть
  { id: 'al1', name: 'Cm7', root: 'C', quality: 'Minor 7', tensions: ['9', '11'], duration: 4, position: 0, functionTag: 'ii', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'al2', name: 'F7', root: 'F', quality: 'Dominant 7', tensions: ['9', '13'], duration: 4, position: 4, functionTag: 'V', recommendedScale: 'Mixolydian', voicingTemplate: 'Rootless', difficulty: 'Easy' },
  { id: 'al3', name: 'Bbmaj7', root: 'Bb', quality: 'Major 7', tensions: ['9', '13'], duration: 4, position: 8, functionTag: 'I', recommendedScale: 'Ionian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'al4', name: 'Ebmaj7', root: 'Eb', quality: 'Major 7', tensions: ['9', '13'], duration: 4, position: 12, functionTag: 'IV', recommendedScale: 'Lydian', voicingTemplate: 'Spread', difficulty: 'Easy' },
  { id: 'al5', name: 'Am7b5', root: 'A', quality: 'Half-Diminished', tensions: ['11'], duration: 4, position: 16, functionTag: 'ii°', recommendedScale: 'Locrian', voicingTemplate: 'Drop 2', difficulty: 'Medium' },
  { id: 'al6', name: 'D7(b9)', root: 'D', quality: 'Dominant 7', tensions: ['b9', '13'], duration: 4, position: 20, functionTag: 'V', recommendedScale: 'Altered', voicingTemplate: 'Upper Structure', difficulty: 'Medium' },
  { id: 'al7', name: 'Gm7', root: 'G', quality: 'Minor 7', tensions: ['9', '11'], duration: 8, position: 24, functionTag: 'i', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  
  // Секция A повтор (8 тактов)
  { id: 'al8', name: 'Cm7', root: 'C', quality: 'Minor 7', tensions: ['9', '11'], duration: 4, position: 32, functionTag: 'ii', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'al9', name: 'F7', root: 'F', quality: 'Dominant 7', tensions: ['9', '13'], duration: 4, position: 36, functionTag: 'V', recommendedScale: 'Mixolydian', voicingTemplate: 'Rootless', difficulty: 'Easy' },
  { id: 'al10', name: 'Bbmaj7', root: 'Bb', quality: 'Major 7', tensions: ['9', '13'], duration: 4, position: 40, functionTag: 'I', recommendedScale: 'Ionian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'al11', name: 'Ebmaj7', root: 'Eb', quality: 'Major 7', tensions: ['9', '13'], duration: 4, position: 44, functionTag: 'IV', recommendedScale: 'Lydian', voicingTemplate: 'Spread', difficulty: 'Easy' },
  { id: 'al12', name: 'Am7b5', root: 'A', quality: 'Half-Diminished', tensions: ['11'], duration: 4, position: 48, functionTag: 'ii°', recommendedScale: 'Locrian', voicingTemplate: 'Drop 2', difficulty: 'Medium' },
  { id: 'al13', name: 'D7(b9)', root: 'D', quality: 'Dominant 7', tensions: ['b9', '13'], duration: 4, position: 52, functionTag: 'V', recommendedScale: 'Altered', voicingTemplate: 'Upper Structure', difficulty: 'Medium' },
  { id: 'al14', name: 'Gm7', root: 'G', quality: 'Minor 7', tensions: ['9', '11'], duration: 8, position: 56, functionTag: 'i', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  
  // Секция B (Bridge - 8 тактов)
  { id: 'al15', name: 'Am7b5', root: 'A', quality: 'Half-Diminished', tensions: ['11'], duration: 4, position: 64, functionTag: 'ii°', recommendedScale: 'Locrian', voicingTemplate: 'Drop 2', difficulty: 'Medium' },
  { id: 'al16', name: 'D7(b9)', root: 'D', quality: 'Dominant 7', tensions: ['b9', '13'], duration: 4, position: 68, functionTag: 'V', recommendedScale: 'Altered', voicingTemplate: 'Upper Structure', difficulty: 'Medium' },
  { id: 'al17', name: 'Gm7', root: 'G', quality: 'Minor 7', tensions: ['9', '11'], duration: 8, position: 72, functionTag: 'i', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'al18', name: 'Cm7', root: 'C', quality: 'Minor 7', tensions: ['9', '11'], duration: 4, position: 80, functionTag: 'iv', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'al19', name: 'F7', root: 'F', quality: 'Dominant 7', tensions: ['9', '13'], duration: 4, position: 84, functionTag: 'V/III', recommendedScale: 'Mixolydian', voicingTemplate: 'Rootless', difficulty: 'Easy' },
  { id: 'al20', name: 'Bbmaj7', root: 'Bb', quality: 'Major 7', tensions: ['9', '13'], duration: 8, position: 88, functionTag: 'III', recommendedScale: 'Ionian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  
  // Секция C (заключительные 8 тактов)
  { id: 'al21', name: 'Am7b5', root: 'A', quality: 'Half-Diminished', tensions: ['11'], duration: 4, position: 96, functionTag: 'ii°', recommendedScale: 'Locrian', voicingTemplate: 'Drop 2', difficulty: 'Medium' },
  { id: 'al22', name: 'D7(b9)', root: 'D', quality: 'Dominant 7', tensions: ['b9', '13'], duration: 4, position: 100, functionTag: 'V', recommendedScale: 'Altered', voicingTemplate: 'Upper Structure', difficulty: 'Medium' },
  { id: 'al23', name: 'Gm7', root: 'G', quality: 'Minor 7', tensions: ['9', '11'], duration: 4, position: 104, functionTag: 'i', recommendedScale: 'Dorian', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
  { id: 'al24', name: 'Gm6', root: 'G', quality: 'Minor 6', tensions: ['9'], duration: 4, position: 108, functionTag: 'i', recommendedScale: 'Melodic Minor', voicingTemplate: 'Drop 2', difficulty: 'Easy' },
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
