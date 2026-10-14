import React from 'react';
import { Presentation, ShieldCheck, CheckSquare, MessageSquareText } from 'lucide-react';

interface TopBarProps {
  activeView: 'deck' | 'topology' | 'cdc' | 'health' | 'capacity' | 'security' | 'signoff';
  onSelectView: (view: 'deck' | 'topology' | 'cdc' | 'health' | 'capacity' | 'security' | 'signoff') => void;
  onOpenTalkingPoints: () => void;
  onStartPresentation: () => void;
  approvedCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onSelectView,
  onOpenTalkingPoints,
  onStartPresentation,
  approvedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#1F3A5F] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs">
            JHSAM
          </div>
          <button
            onClick={() => onSelectView('deck')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-[#1F3A5F] transition-colors text-left"
          >
            JHSAM Kafka Platform
          </button>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectView('deck')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeView === 'deck'
                ? 'border-[#1F3A5F] text-[#1F3A5F] font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Executive Deck
          </button>
          <button
            onClick={() => onSelectView('topology')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeView === 'topology'
                ? 'border-[#1F3A5F] text-[#1F3A5F] font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Cluster Topology
          </button>
          <button
            onClick={() => onSelectView('cdc')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeView === 'cdc'
                ? 'border-[#1F3A5F] text-[#1F3A5F] font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            10 CDC Pipelines
          </button>
          <button
            onClick={() => onSelectView('health')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeView === 'health'
                ? 'border-[#1F3A5F] text-[#1F3A5F] font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Verification (31/31)
          </button>
          <button
            onClick={() => onSelectView('capacity')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeView === 'capacity'
                ? 'border-[#1F3A5F] text-[#1F3A5F] font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Capacity & Sizing
          </button>
          <button
            onClick={() => onSelectView('security')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeView === 'security'
                ? 'border-[#1F3A5F] text-[#1F3A5F] font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Security Roadmap
          </button>
          <button
            onClick={() => onSelectView('signoff')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
              activeView === 'signoff'
                ? 'border-[#1F3A5F] text-[#1F3A5F] font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Decision Sign-Off</span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
              {approvedCount}/4
            </span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenTalkingPoints}
            title="Presenter Talking Points Cheat Sheet"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageSquareText className="w-3.5 h-3.5 text-slate-600" />
            <span>Talking Points</span>
          </button>

          <button
            onClick={onStartPresentation}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1F3A5F] hover:bg-[#152740] rounded-lg transition-colors shadow-xs whitespace-nowrap"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Present Deck</span>
          </button>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="lg:hidden border-t border-slate-100 overflow-x-auto scrollbar-none py-2 px-4 flex items-center gap-4 text-xs font-medium text-slate-600">
        <button
          onClick={() => onSelectView('deck')}
          className={`whitespace-nowrap ${activeView === 'deck' ? 'text-[#1F3A5F] font-bold' : ''}`}
        >
          Deck
        </button>
        <button
          onClick={() => onSelectView('topology')}
          className={`whitespace-nowrap ${activeView === 'topology' ? 'text-[#1F3A5F] font-bold' : ''}`}
        >
          Cluster Topology
        </button>
        <button
          onClick={() => onSelectView('cdc')}
          className={`whitespace-nowrap ${activeView === 'cdc' ? 'text-[#1F3A5F] font-bold' : ''}`}
        >
          CDC Pipelines
        </button>
        <button
          onClick={() => onSelectView('health')}
          className={`whitespace-nowrap ${activeView === 'health' ? 'text-[#1F3A5F] font-bold' : ''}`}
        >
          Health (31/31)
        </button>
        <button
          onClick={() => onSelectView('capacity')}
          className={`whitespace-nowrap ${activeView === 'capacity' ? 'text-[#1F3A5F] font-bold' : ''}`}
        >
          Capacity
        </button>
        <button
          onClick={() => onSelectView('security')}
          className={`whitespace-nowrap ${activeView === 'security' ? 'text-[#1F3A5F] font-bold' : ''}`}
        >
          Security
        </button>
        <button
          onClick={() => onSelectView('signoff')}
          className={`whitespace-nowrap ${activeView === 'signoff' ? 'text-[#1F3A5F] font-bold' : ''}`}
        >
          Approval ({approvedCount}/4)
        </button>
        <button
          onClick={onOpenTalkingPoints}
          className="whitespace-nowrap text-slate-500 underline ml-2"
        >
          Cheat Sheet
        </button>
      </div>
    </header>
  );
};
