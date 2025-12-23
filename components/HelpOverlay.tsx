
import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Target, Zap, Music } from 'lucide-react';

interface HelpOverlayProps {
  onClose: () => void;
  theme?: 'Dark' | 'Light';
}

const STEPS = [
  {
    target: 'control-bar',
    title: 'AI Generation Controls',
    desc: 'Tweak entropy and style presets to direct the harmonic engine. Higher entropy yields more unexpected jazz tensions.',
    icon: Sparkles
  },
  {
    target: 'melody-toggle',
    title: 'Melody Input',
    desc: 'Switch to Melody View to draw guide notes. The generator will automatically avoid collisions with your custom melody.',
    icon: Music
  },
  {
    target: 'visualization-area',
    title: 'Real-time Analysis',
    desc: 'Switch between Tension Curves, Guide Tone paths, and Piano Rolls to visualize the voice-leading quality of your progression.',
    icon: Target
  },
  {
    target: 'inspector-panel',
    title: 'AI Inspector',
    desc: 'Analyze specific chord choices, view substitute suggestions, and understand the "Why" behind every voicing.',
    icon: Zap
  }
];

const HelpOverlay: React.FC<HelpOverlayProps> = ({ onClose, theme = 'Dark' }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep(prev => (prev + 1) % STEPS.length);
  const prev = () => setCurrentStep(prev => (prev - 1 + STEPS.length) % STEPS.length);

  const step = STEPS[currentStep];
  const isDark = theme === 'Dark';

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-[2px] pointer-events-auto">
      {/* Target Highlight Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute border-[200vw] border-black/70 rounded-full transition-all duration-500 ease-in-out shadow-[0_0_100px_rgba(99,102,241,0.5)]"
          style={{
            width: '400px',
            height: '400px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 1000vh rgba(0,0,0,0.8)'
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className={`w-full max-w-sm border rounded-[2.5rem] p-10 animate-in zoom-in-90 duration-300 relative ${isDark ? 'bg-zinc-900 border-indigo-500/50 shadow-[0_0_80px_rgba(99,102,241,0.2)] text-white' : 'bg-white border-indigo-200 shadow-xl text-zinc-900'}`}>
          <div className="flex justify-between items-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40">
              <step.icon size={32} />
            </div>
            <button onClick={onClose} className={`p-3 rounded-full transition-all ${isDark ? 'text-zinc-500 hover:text-white bg-zinc-800' : 'text-zinc-400 hover:text-zinc-900 bg-zinc-50'}`}>
              <X size={24} />
            </button>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-black mb-4 tracking-tight">{step.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">
              {step.desc}
            </p>
          </div>

          <div className="flex items-center justify-between border-t pt-8 border-zinc-800/50">
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-indigo-500' : isDark ? 'w-1.5 bg-zinc-800' : 'w-1.5 bg-zinc-200'}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className={`p-4 rounded-2xl transition-all ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'}`}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={currentStep === STEPS.length - 1 ? onClose : next} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-2xl font-black text-sm transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-95">
                {currentStep === STEPS.length - 1 ? 'GOT IT' : 'NEXT'}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        #${step.target} {
          position: relative;
          z-index: 120 !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3);
          border-radius: 1.5rem;
          background: ${isDark ? '#09090b' : '#ffffff'};
        }
      `}</style>
    </div>
  );
};

export default HelpOverlay;
