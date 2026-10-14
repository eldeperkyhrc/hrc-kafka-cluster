import React, { useState, useEffect, useRef } from 'react';
import { SLIDES_DATA, SlideData } from '../data/kafkaDeckData';
import { SlideViewer } from './SlideViewer';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Clock, BookOpen, MessageSquareText, X, CheckSquare, 
  Layers, Play, Pause, RotateCcw
} from 'lucide-react';

interface PresentationModeProps {
  initialSlideNumber?: number;
  onClose: () => void;
  onOpenTalkingPoints: () => void;
  onNavigateToView: (view: 'deck' | 'topology' | 'cdc' | 'health' | 'capacity' | 'security' | 'signoff') => void;
  decisionState: Record<string, boolean>;
  onToggleDecision: (key: string) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  initialSlideNumber = 1,
  onClose,
  onOpenTalkingPoints,
  onNavigateToView,
  decisionState,
  onToggleDecision
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(initialSlideNumber - 1);
  const [isOnlyShortDeck, setIsOnlyShortDeck] = useState<boolean>(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // 20-minute meeting timer
  const [timerSeconds, setTimerSeconds] = useState<number>(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const timerRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeSlides: SlideData[] = isOnlyShortDeck
    ? SLIDES_DATA.filter(s => s.isExecShortDeck)
    : SLIDES_DATA;

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

  // Timer interval
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === 't' || e.key === 'T') {
        onOpenTalkingPoints();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowSpeakerNotes(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, activeSlides.length, isFullscreen]);

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev < activeSlides.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
    setIsFullscreen(false);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-900 flex flex-col justify-between overflow-hidden text-slate-100"
    >
      {/* Top Presentation Bar */}
      <div className="h-14 px-4 sm:px-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#1F3A5F] flex items-center justify-center font-bold text-xs">
            JHSAM
          </div>
          <span className="text-sm font-bold text-white hidden sm:inline">
            Executive Briefing Deck
          </span>
          <span className="text-xs font-mono text-slate-400">
            Slide {currentSlideIndex + 1} of {activeSlides.length}
          </span>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2">
          {/* Executive Filter Toggle */}
          <button
            onClick={() => {
              setIsOnlyShortDeck(!isOnlyShortDeck);
              setCurrentSlideIndex(0);
            }}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              isOnlyShortDeck 
                ? 'bg-blue-600 text-white font-semibold' 
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isOnlyShortDeck ? 'Short Deck (5 Slides)' : 'Full Deck (18 Slides)'}
          </button>

          {/* 20 Min Timer */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-slate-800/80 rounded font-mono text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className={timerSeconds < 300 ? 'text-amber-400 font-bold' : ''}>
              {formatTimer(timerSeconds)}
            </span>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)} 
              className="hover:text-white text-slate-400 ml-1"
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button 
              onClick={() => setTimerSeconds(20 * 60)} 
              className="hover:text-white text-slate-400"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1.5 ${
              showSpeakerNotes ? 'bg-slate-700 text-cyan-300' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <button
            onClick={onOpenTalkingPoints}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
            title="Cheat Sheet (T)"
          >
            <MessageSquareText className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
            title="Exit Presentation (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto">
          <SlideViewer 
            currentSlideNumber={currentSlide.number} 
            onNavigateToView={(view) => {
              onClose();
              onNavigateToView(view);
            }}
            decisionState={decisionState}
            onToggleDecision={onToggleDecision}
          />
        </div>
      </div>

      {/* Speaker Notes Teleprompter Drawer (collapsible) */}
      {showSpeakerNotes && (
        <div className="h-28 bg-slate-950 border-t border-slate-800 px-6 py-3 shrink-0 flex items-start gap-4">
          <div className="w-32 shrink-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              PRESENTER PROMPT
            </span>
            <div className="text-xs font-bold text-slate-200 mt-0.5 truncate">
              Slide {currentSlide.number}: {currentSlide.title}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto text-xs text-slate-300 leading-relaxed font-sans pr-2">
            <strong className="text-white">What to say: </strong>
            {currentSlide.speakerNotes}
          </div>
          <button
            onClick={() => setShowSpeakerNotes(false)}
            className="text-slate-500 hover:text-slate-300 text-xs shrink-0"
          >
            Hide
          </button>
        </div>
      )}

      {/* Bottom Navigation Control Bar */}
      <div className="h-14 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous (←)</span>
        </button>

        {/* Slide Progress Dots / Scrubber */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto max-w-md px-2">
          {activeSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              title={`Slide ${s.number}: ${s.title}`}
              className={`h-2 rounded-full transition-all ${
                currentSlideIndex === idx 
                  ? 'w-6 bg-cyan-400' 
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === activeSlides.length - 1}
          className="px-4 py-1.5 bg-[#1F3A5F] hover:bg-[#152740] disabled:opacity-30 disabled:hover:bg-[#1F3A5F] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>Next (→)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
