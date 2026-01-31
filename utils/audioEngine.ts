import * as Tone from 'tone';
import { ChordBlock } from '../types';

class AudioEngine {
  private synth: Tone.PolySynth<Tone.Synth> | null = null;
  private bass: Tone.Synth | null = null;
  private isInitialized = false;
  private currentPlayingNotes = new Set<number>();
  private tempo = 120;
  private noteSequence: { notes: number[], time: number, duration: number }[] = [];
  private nowPlayingIndex = 0;

  async initialize() {
    if (this.isInitialized) return;

    await Tone.start();

    // Синтезатор для аккордов (высокие ноты)
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.5,
      },
    }).toDestination();

    // Синтезатор для баса (низкие ноты)
    this.bass = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.01,
        decay: 0.15,
        sustain: 0.2,
        release: 0.6,
      },
    }).toDestination();

    this.isInitialized = true;
  }

  setTempo(bpm: number) {
    this.tempo = bpm;
    Tone.Transport.bpm.value = bpm;
  }

  // Преобразование MIDI номера в частоту
  private midiToFreq(midi: number): string {
    return Tone.Frequency(midi, 'midi').toNote();
  }

  // Играть один аккорд
  playChord(notes: number[], duration: number = 0.5) {
    if (!this.synth) return;

    const freqs = notes.map(n => this.midiToFreq(n));
    this.synth.triggerAttackRelease(freqs, duration);
  }

  // Играть басовую ноту
  playBass(note: number, duration: number = 0.5) {
    if (!this.bass) return;

    const freq = this.midiToFreq(note);
    this.bass.triggerAttackRelease(freq, duration);
  }

  // Преобразование ChordBlock в мидю ноты
  private chordToMidi(chord: ChordBlock): number[] {
    // Базовые ноты для каждого типа аккорда (MIDI номера)
    const rootNotes: { [key: string]: number } = {
      'C': 60, 'D': 62, 'E': 64, 'F': 65, 'G': 67, 'A': 69, 'B': 71,
      'Db': 61, 'Eb': 63, 'Gb': 66, 'Ab': 68, 'Bb': 70,
    };

    const root = rootNotes[chord.root] || 60;

    // Определяем интервалы для разных типов аккордов
    if (chord.quality.includes('Major 7') || chord.quality === 'Major 9') {
      return [root, root + 4, root + 7, root + 11]; // 1, 3, 5, 7
    } else if (chord.quality.includes('Minor 7') || chord.quality === 'Minor 9') {
      return [root, root + 3, root + 7, root + 10]; // 1, b3, 5, b7
    } else if (chord.quality.includes('Dominant')) {
      return [root, root + 4, root + 7, root + 10]; // 1, 3, 5, b7
    } else if (chord.quality === 'Half-Diminished') {
      return [root, root + 3, root + 6, root + 10]; // 1, b3, b5, b7
    } else if (chord.quality === 'Minor 6') {
      return [root, root + 3, root + 7, root + 9]; // 1, b3, 5, 6
    } else {
      // По умолчанию major 7
      return [root, root + 4, root + 7, root + 11];
    }
  }

  // Построить последовательность для воспроизведения
  buildSequence(chords: ChordBlock[], bpm: number) {
    this.setTempo(bpm);
    this.noteSequence = [];
    this.nowPlayingIndex = 0;

    let currentTime = 0;
    const beatDuration = (60 / bpm) * 1000; // ms per beat
    const chordDuration = 1; // beats

    chords.forEach((chord) => {
      const midiNotes = this.chordToMidi(chord);
      this.noteSequence.push({
        notes: midiNotes,
        time: currentTime,
        duration: chordDuration,
      });
      currentTime += chordDuration * beatDuration;
    });
  }

  // Начать воспроизведение
  async play(chords: ChordBlock[], bpm: number) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.buildSequence(chords, bpm);
    Tone.Transport.cancel();

    // Планируем ноты в Web Audio API
    this.noteSequence.forEach((item, idx) => {
      Tone.Transport.schedule((time) => {
        if (this.synth && item.notes.length > 0) {
          const freqs = item.notes.map(n => this.midiToFreq(n));
          // Басовая нота - первая нота минус октава
          const bassNote = item.notes[0] - 12;
          this.synth.triggerAttackRelease(freqs, item.duration, time);
          if (this.bass) {
            this.bass.triggerAttackRelease(
              this.midiToFreq(bassNote),
              item.duration,
              time
            );
          }
        }
      }, item.time / 1000);
    });

    Tone.Transport.start();
  }

  // Остановить воспроизведение
  stop() {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    if (this.synth) this.synth.triggerRelease();
    if (this.bass) this.bass.triggerRelease();
  }

  // Пауза
  pause() {
    Tone.Transport.pause();
  }

  // Продолжить
  resume() {
    Tone.Transport.start();
  }

  // Получить статус
  isPlaying(): boolean {
    return Tone.Transport.state === 'started';
  }

  // Очистка
  dispose() {
    if (this.synth) this.synth.dispose();
    if (this.bass) this.bass.dispose();
  }
}

export const audioEngine = new AudioEngine();
