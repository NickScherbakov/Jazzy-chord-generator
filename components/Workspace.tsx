
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Settings as SettingsIcon, HelpCircle, Undo2, Redo2, ChevronLeft,
  Mic, ShieldAlert, Piano, CheckCircle2, Info
} from 'lucide-react';
import Timeline from './Timeline';
import Inspector from './Inspector';
import VisualizationArea from './VisualizationArea';
import PlaybackPanel from './PlaybackPanel';
import ControlBar from './ControlBar';
import ExplainPanel from './ExplainPanel';
import BassVoicingModal from './BassVoicingModal';
import ConstraintsModal from './ConstraintsModal';
import ExportSheet from './ExportSheet';
import MelodyEditor from './MelodyEditor';
import SettingsPanel from './SettingsPanel';
import HelpOverlay from './HelpOverlay';
import AboutModal from './AboutModal';
import { ChordBlock, ViewTab } from '../types';
import { INITIAL_CHORDS } from '../constants';
import { audioEngine } from '../utils/audioEngine';

const Workspace: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // App State
  const [chords, setChords] = useState<ChordBlock[]>(INITIAL_CHORDS);
  const [history, setHistory] = useState<ChordBlock[][]>([INITIAL_CHORDS]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // UI State
  const [selectedChordIds, setSelectedChordIds] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [entropy, setEntropy] = useState(0.7);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [inspectorIsFloating, setInspectorIsFloating] = useState(false);
  const [explainOpen, setExplainOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('Tension');
  const [isGenerating, setIsGenerating] = useState(false);
  const [theme, setTheme] = useState<'Dark' | 'Light'>('Dark');
  const [highlightedHeatmapChord, setHighlightedHeatmapChord] = useState<string | null>(null);
  
  // Modals
  const [showBassModal, setShowBassModal] = useState(false);
  const [showConstraintsModal, setShowConstraintsModal] = useState(false);
  const [showExportSheet, setShowExportSheet] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [melodyMode, setMelodyMode] = useState(false);
  const [melodyAwareMode, setMelodyAwareMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const selectedChord = chords.find(c => selectedChordIds.includes(c.id));

  // Undo/Redo Engine
  const pushToHistory = (newChords: ChordBlock[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newChords);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setChords(newChords);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setChords(history[historyIndex - 1]);
      showFeedback('Undo');
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setChords(history[historyIndex + 1]);
      showFeedback('Redo');
    }
  };

  // Initialize audio engine and handle playback
  useEffect(() => {
    let interval: any;
    
    if (isPlaying) {
      // Инициализируем и запускаем звук
      audioEngine.play(chords, 120).catch(err => console.error('Audio error:', err));
      
      interval = setInterval(() => {
        setPlayhead(prev => (prev >= 16 ? 0 : prev + 0.05));
      }, 50);
    } else {
      // Останавливаем звук при паузе
      audioEngine.stop();
    }
    
    return () => {
      clearInterval(interval);
      if (!isPlaying) {
        audioEngine.stop();
      }
    };
  }, [isPlaying, chords]);

  const showFeedback = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteMany = (ids: string[]) => {
    const newChords = chords.filter(c => !ids.includes(c.id));
    pushToHistory(newChords);
    setSelectedChordIds([]);
    showFeedback(ids.length > 1 ? `${ids.length} chords removed` : 'Chord removed');
  };

  const handleDuplicateMany = (ids: string[]) => {
    const selected = chords.filter(c => ids.includes(c.id));
    const maxPos = Math.max(...chords.map(c => c.position + c.duration));
    const copies = selected.map((c, i) => ({
      ...c,
      id: Math.random().toString(36).substring(7),
      position: maxPos + (c.position - Math.min(...selected.map(s => s.position)))
    }));
    pushToHistory([...chords, ...copies]);
    setSelectedChordIds(copies.map(c => c.id));
    showFeedback(ids.length > 1 ? `${ids.length} chords duplicated` : 'Chord duplicated');
  };

  // Cleanup на размонтирование компонента
  useEffect(() => {
    return () => {
      audioEngine.stop();
      audioEngine.dispose();
    };
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newChords = chords.map(c => 
        c.id === 'c4' ? { ...c, name: 'G13(b9)' } : c
      );
      pushToHistory(newChords);
      showFeedback('Harmonic progression optimized.');
    }, 1500);
  };

  const updateChord = (id: string, updates: Partial<ChordBlock>, commit: boolean = true) => {
    const updated = chords.map(c => c.id === id ? { ...c, ...updates } : c);
    if (commit) {
      pushToHistory(updated);
    } else {
      setChords(updated);
    }
  };

  const handleChordSelect = (id: string, multi: boolean = false) => {
    if (multi) {
      setSelectedChordIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
      setSelectedChordIds([id]);
    }
    setExplainOpen(false);
  };

  const handleSubstitute = (newName: string) => {
    if (selectedChordIds.length === 1) {
      updateChord(selectedChordIds[0], { name: newName });
      showFeedback(`Substituted with ${newName}`);
    }
  };

  const handleHeatmapClick = (index: number) => {
    const targetBeat = (index % 4) * 4;
    setPlayhead(targetBeat);
    const chordAtBeat = chords.find(c => targetBeat >= c.position && targetBeat < c.position + c.duration);
    if (chordAtBeat) {
      setSelectedChordIds([chordAtBeat.id]);
      setHighlightedHeatmapChord(chordAtBeat.id);
      setTimeout(() => setHighlightedHeatmapChord(null), 1000);
    }
  };

  const renderInspector = () => (
    <div className="w-full h-full flex flex-col">
      {explainOpen ? (
        <ExplainPanel 
          chord={selectedChord} 
          onClose={() => setExplainOpen(false)} 
          onSubstitute={handleSubstitute}
        />
      ) : (
        <Inspector 
          chord={selectedChord} 
          multiCount={selectedChordIds.length}
          onExplain={() => setExplainOpen(true)}
          onToggleCollapse={() => setInspectorOpen(false)}
          onToggleMelodyAware={() => setMelodyAwareMode(!melodyAwareMode)}
          onSubstitute={handleSubstitute}
          onDelete={() => handleDeleteMany(selectedChordIds)}
          onDuplicate={() => handleDuplicateMany(selectedChordIds)}
          melodyAwareMode={melodyAwareMode}
          isFloating={inspectorIsFloating}
          onToggleFloat={() => setInspectorIsFloating(!inspectorIsFloating)}
        />
      )}
    </div>
  );

  return (
    <div className={`flex-1 flex flex-col h-full relative overflow-hidden select-none transition-colors duration-500 ${theme === 'Dark' ? 'bg-black text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      
      {/* GLOBAL TOAST */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-indigo-600 text-white px-8 py-4 rounded-full font-black text-sm shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-300 border border-white/20">
          <CheckCircle2 size={20} />
          {toast.toUpperCase()}
        </div>
      )}

      {/* HEADER SECTION */}
      <header className={`h-16 border-b flex items-center justify-between px-6 z-50 backdrop-blur-md shrink-0 ${theme === 'Dark' ? 'bg-zinc-950/95 border-zinc-800' : 'bg-white/95 border-zinc-200'}`}>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className={`p-2 rounded-lg transition-all ${theme === 'Dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold tracking-wide flex items-center gap-2">
              <span className="text-zinc-500 font-normal">Project /</span> 
              Midnight Blue Jam
            </h2>
            <div className={`h-4 w-px ${theme === 'Dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
            <button 
              onClick={() => {
                setMelodyMode(!melodyMode);
                showFeedback(melodyMode ? 'Chord View' : 'Melody Mode');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${melodyMode ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500 hover:text-white border border-zinc-800'}`}
            >
              <Mic size={14} />
              {melodyMode ? 'Exit Melody Mode' : 'Enter Melody Mode'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={historyIndex <= 0} className="p-2 disabled:opacity-30"><Undo2 size={18}/></button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-2 disabled:opacity-30"><Redo2 size={18}/></button>
          <div className="h-6 w-px mx-2 bg-zinc-800" />
          <button onClick={() => setShowConstraintsModal(true)} className="p-2"><ShieldAlert size={20}/></button>
          <button onClick={() => setShowBassModal(true)} className="p-2"><Piano size={20}/></button>
          <button onClick={() => setShowHelp(true)} className="p-2"><HelpCircle size={20}/></button>
          <button onClick={() => setShowSettings(true)} className="p-2"><SettingsIcon size={20}/></button>
          <button onClick={() => setShowAbout(true)} className="p-2"><Info size={20}/></button>
        </div>
      </header>

      {/* CONTROL BELT SECTION */}
      <div className={`flex items-center justify-center p-3 border-b shrink-0 z-40 shadow-xl ${theme === 'Dark' ? 'bg-zinc-950/90 border-zinc-900' : 'bg-zinc-50 border-zinc-200'}`}>
        <ControlBar 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating} 
          entropy={entropy}
          setEntropy={setEntropy}
          theme={theme}
        />
      </div>

      {/* MAIN VIEWPORT AREA */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          
          {/* CONTENT SPLIT (TIMELINE & VISUALIZATION) */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Timeline View - Reduced height proportion to fix overlap and empty space */}
            <div className="flex-[42] min-h-[260px] relative border-b border-zinc-900/40 overflow-hidden">
              {melodyMode ? (
                <MelodyEditor theme={theme} />
              ) : (
                <Timeline 
                  chords={chords}
                  selectedIds={selectedChordIds}
                  onSelect={handleChordSelect}
                  playhead={playhead}
                  onPlayheadChange={setPlayhead}
                  melodyAwareMode={melodyAwareMode}
                  onUpdateChord={updateChord}
                  theme={theme}
                  highlightId={highlightedHeatmapChord}
                  isGenerating={isGenerating}
                  showVoiceLeading={explainOpen}
                />
              )}
            </div>
            
            {/* Visualization Area - Increased proportion to ensure tension curve is visible */}
            <div className={`flex-[58] min-h-[300px] overflow-hidden ${theme === 'Dark' ? 'bg-zinc-950' : 'bg-white'}`}>
              <VisualizationArea 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                chords={chords}
                entropy={entropy}
                theme={theme}
                onCellClick={handleHeatmapClick}
              />
            </div>
          </div>
        </div>

        {/* DOCKED SIDE INSPECTOR */}
        {inspectorOpen && !inspectorIsFloating && (
          <div 
            className={`transition-all duration-300 flex border-l shrink-0 w-[420px] z-30 ${theme === 'Dark' ? 'bg-zinc-950 border-zinc-800 shadow-2xl' : 'bg-zinc-50 border-zinc-200 shadow-xl'}`}
          >
            {renderInspector()}
          </div>
        )}

        {/* FLOATING SIDE INSPECTOR OVERLAY */}
        {inspectorOpen && inspectorIsFloating && (
          <div className={`absolute top-24 right-10 w-[400px] h-[75%] border rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] backdrop-blur-3xl z-[60] overflow-hidden flex flex-col ring-1 ring-white/10 animate-in zoom-in-95 duration-300 ${theme === 'Dark' ? 'bg-zinc-950/95 border-zinc-800' : 'bg-white/95 border-zinc-200'}`}>
            {renderInspector()}
          </div>
        )}

        {/* COLLAPSED INSPECTOR HANDLE */}
        {!inspectorOpen && (
          <button 
            onClick={() => setInspectorOpen(true)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 border p-4 rounded-full shadow-2xl transition-all z-50 ${theme === 'Dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
          >
            <ChevronLeft size={28} />
          </button>
        )}
      </div>

      {/* PLAYBACK PANEL SECTION */}
      <div id="playback-panel" className="shrink-0 z-50">
        <PlaybackPanel 
          isPlaying={isPlaying} 
          onPlayToggle={() => setIsPlaying(!isPlaying)}
          playhead={playhead}
          onExport={() => setShowExportSheet(true)}
          theme={theme}
        />
      </div>

      {/* OVERLAYS & MODALS */}
      {showBassModal && <BassVoicingModal onClose={() => setShowBassModal(false)} theme={theme} />}
      {showConstraintsModal && <ConstraintsModal onClose={() => setShowConstraintsModal(false)} theme={theme} />}
      {showExportSheet && <ExportSheet onClose={() => setShowExportSheet(false)} theme={theme} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} theme={theme} setTheme={setTheme} />}
      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} theme={theme} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} theme={theme} />}
    </div>
  );
};

export default Workspace;
