import React, { useState } from 'react';
import { TALKING_POINTS } from '../data/kafkaDeckData';
import { X, Search, MessageSquareText, HelpCircle, CheckCircle } from 'lucide-react';

interface ExecutiveTalkingPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveTalkingPointsModal: React.FC<ExecutiveTalkingPointsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const filteredPoints = TALKING_POINTS.filter(p => 
    p.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1F3A5F] text-white flex items-center justify-center">
              <MessageSquareText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Executive Talking Points Cheat Sheet
              </h3>
              <p className="text-xs text-slate-500">
                Crisp 2-sentence answers to top steering committee inquiries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search talking points (e.g. cost, ROI, downtime, owner)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/20 font-medium"
            />
          </div>
        </div>

        {/* List of Talking Points */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100">
          {filteredPoints.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching executive questions found.
            </div>
          ) : (
            filteredPoints.map((item, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4 space-y-1.5' : 'space-y-1.5'}>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-mono font-bold text-[#1F3A5F] bg-blue-50 px-2 py-0.5 rounded shrink-0 mt-0.5">
                    Q: {item.q}
                  </span>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                  <span className="font-semibold text-slate-900">Recommended Response: </span>
                  {item.a}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Tip: Be direct about security gaps & capacity — executives value transparency.</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[#1F3A5F] text-white rounded-lg hover:bg-[#152740] transition-colors"
          >
            Close Cheat Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
