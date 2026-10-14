import React, { useState } from 'react';
import { SLIDES_DATA } from './data/kafkaDeckData';
import { TopBar } from './components/TopBar';
import { SlideViewer } from './components/SlideViewer';
import { InteractiveClusterTopology } from './components/InteractiveClusterTopology';
import { CdcDataFlowVisualizer } from './components/CdcDataFlowVisualizer';
import { HealthVerificationConsole } from './components/HealthVerificationConsole';
import { CapacityStressSimulator } from './components/CapacityStressSimulator';
import { SecurityComplianceTracker } from './components/SecurityComplianceTracker';
import { ExecutiveDecisionSignoff } from './components/ExecutiveDecisionSignoff';
import { PresentationMode } from './components/PresentationMode';
import { ExecutiveTalkingPointsModal } from './components/ExecutiveTalkingPointsModal';
import { 
  Presentation, ChevronLeft, ChevronRight, Grid, 
  CheckCircle2, AlertTriangle, ShieldCheck, HardDrive, 
  Database, Server, BookOpen, Layers
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'deck' | 'topology' | 'cdc' | 'health' | 'capacity' | 'security' | 'signoff'>('deck');
  const [currentSlideNum, setCurrentSlideNum] = useState<number>(1);
  const [isShortDeckOnly, setIsShortDeckOnly] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [isTalkingPointsOpen, setIsTalkingPointsOpen] = useState<boolean>(false);

  // Executive Decision state: 4 key asks
  const [decisionState, setDecisionState] = useState<Record<string, boolean>>({
    capacity: true,
    security: true,
    sponsor: false,
    followup: true
  });

  const toggleDecision = (key: string) => {
    setDecisionState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const approvedDecisionsCount = Object.values(decisionState).filter(Boolean).length;

  const displayedSlides = isShortDeckOnly 
    ? SLIDES_DATA.filter(s => s.isExecShortDeck) 
    : SLIDES_DATA;

  const currentSlideIndex = displayedSlides.findIndex(s => s.number === currentSlideNum);
  const safeSlideIndex = currentSlideIndex >= 0 ? currentSlideIndex : 0;

  const handleNextSlide = () => {
    if (safeSlideIndex < displayedSlides.length - 1) {
      setCurrentSlideNum(displayedSlides[safeSlideIndex + 1].number);
    }
  };

  const handlePrevSlide = () => {
    if (safeSlideIndex > 0) {
      setCurrentSlideNum(displayedSlides[safeSlideIndex - 1].number);
    }
  };

  const currentSlide = displayedSlides[safeSlideIndex] || displayedSlides[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-blue-100 selection:text-[#1F3A5F]">
      {/* Universal Top Bar */}
      <TopBar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenTalkingPoints={() => setIsTalkingPointsOpen(true)}
        onStartPresentation={() => setIsPresentationOpen(true)}
        approvedCount={approvedDecisionsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* VIEW 1: EXECUTIVE BRIEFING DECK */}
        {activeView === 'deck' && (
          <div className="space-y-6">
            {/* Quick Hero Banner with Presentation Triggers */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 text-[#1F3A5F] rounded">
                    OCTOBER 2026 DEPLOYMENT
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    31/31 Checks Verified
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                  JHSAM Data Management Platform — Kafka Cluster Executive Briefing
                </h1>
              </div>

              {/* Deck Filters & Presenter Launch */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => {
                      setIsShortDeckOnly(false);
                      if (currentSlideIndex === -1) setCurrentSlideNum(1);
                    }}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      !isShortDeckOnly 
                        ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Full Deck (18)
                  </button>
                  <button
                    onClick={() => {
                      setIsShortDeckOnly(true);
                      setCurrentSlideNum(1);
                    }}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      isShortDeckOnly 
                        ? 'bg-white text-[#1F3A5F] shadow-xs font-bold' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Exec Core (5)
                  </button>
                </div>

                <button
                  onClick={() => setIsPresentationOpen(true)}
                  className="px-4 py-2 bg-[#1F3A5F] hover:bg-[#152740] text-white text-xs font-bold rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>Start Presentation</span>
                </button>
              </div>
            </div>

            {/* Slide Navigation Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  disabled={safeSlideIndex === 0}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  disabled={safeSlideIndex === displayedSlides.length - 1}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Dropdown jump */}
                <select
                  value={currentSlideNum}
                  onChange={(e) => setCurrentSlideNum(Number(e.target.value))}
                  className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1F3A5F]"
                >
                  {displayedSlides.map((s) => (
                    <option key={s.id} value={s.number}>
                      Slide {s.number}: {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span>
                  Showing {safeSlideIndex + 1} of {displayedSlides.length} slides
                </span>
                <span>·</span>
                <span>Audience: Steering Committee</span>
              </div>
            </div>

            {/* Slide Canvas */}
            <SlideViewer
              currentSlideNumber={currentSlideNum}
              onNavigateToView={setActiveView}
              decisionState={decisionState}
              onToggleDecision={toggleDecision}
            />

            {/* Speaker Notes Box for Current Slide */}
            <div className="p-4 bg-slate-100/90 border border-slate-200/80 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  <span>Presenter Talking Notes (What to Say)</span>
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  Slide {currentSlide.number}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed font-sans text-xs">
                {currentSlide.speakerNotes}
              </p>
            </div>

            {/* Slide Thumbnail Navigation Strip */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Jump to Slide
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {displayedSlides.map((s) => {
                  const isActive = s.number === currentSlideNum;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideNum(s.number)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isActive 
                          ? 'border-[#1F3A5F] bg-blue-50/70 shadow-xs ring-1 ring-[#1F3A5F]/20' 
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="font-bold text-slate-700">#{s.number}</span>
                        {s.isExecShortDeck && (
                          <span className="text-blue-700 font-bold">★ Core</span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1 truncate">
                        {s.title}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {s.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TOPOLOGY EXPLORER */}
        {activeView === 'topology' && (
          <InteractiveClusterTopology />
        )}

        {/* VIEW 3: CDC PIPELINES */}
        {activeView === 'cdc' && (
          <CdcDataFlowVisualizer />
        )}

        {/* VIEW 4: HEALTH VERIFICATION */}
        {activeView === 'health' && (
          <HealthVerificationConsole />
        )}

        {/* VIEW 5: CAPACITY & SIZING */}
        {activeView === 'capacity' && (
          <CapacityStressSimulator onNavigateToSignoff={() => setActiveView('signoff')} />
        )}

        {/* VIEW 6: SECURITY ROADMAP */}
        {activeView === 'security' && (
          <SecurityComplianceTracker />
        )}

        {/* VIEW 7: DECISION SIGN-OFF */}
        {activeView === 'signoff' && (
          <ExecutiveDecisionSignoff
            decisionState={decisionState}
            onToggleDecision={toggleDecision}
          />
        )}
      </main>

      {/* Fullscreen Presentation Mode Modal */}
      {isPresentationOpen && (
        <PresentationMode
          initialSlideNumber={currentSlideNum}
          onClose={() => setIsPresentationOpen(false)}
          onOpenTalkingPoints={() => setIsTalkingPointsOpen(true)}
          onNavigateToView={(v) => {
            setIsPresentationOpen(false);
            setActiveView(v);
          }}
          decisionState={decisionState}
          onToggleDecision={toggleDecision}
        />
      )}

      {/* Presenter Talking Points Cheat Sheet Modal */}
      <ExecutiveTalkingPointsModal
        isOpen={isTalkingPointsOpen}
        onClose={() => setIsTalkingPointsOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">JHSAM Data Management Platform</span>
            <span>·</span>
            <span>Kafka Cluster Deployment Executive Briefing</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Classification: Internal – Confidential</span>
            <span>·</span>
            <span>October 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
