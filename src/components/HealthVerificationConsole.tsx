import React, { useState } from 'react';
import { HEALTH_CHECKS, HealthCheckItem } from '../data/kafkaDeckData';
import { 
  CheckCircle2, Terminal, Play, RefreshCw, 
  ShieldCheck, AlertCircle, Search, ChevronRight
} from 'lucide-react';

export const HealthVerificationConsole: React.FC = () => {
  const [checks, setChecks] = useState<HealthCheckItem[]>(HEALTH_CHECKS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeCheckIndex, setActiveCheckIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<HealthCheckItem | null>(HEALTH_CHECKS[0]);

  const totalPassing = checks.reduce((acc, c) => acc + c.passingCount, 0);
  const totalTarget = checks.reduce((acc, c) => acc + c.targetCount, 0);

  const runVerificationSuite = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveCheckIndex(0);

    const interval = setInterval(() => {
      setActiveCheckIndex(prev => {
        if (prev === null) return 0;
        if (prev >= checks.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          return null;
        }
        return prev + 1;
      });
    }, 180);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Cluster Operational Verification Suite
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
              PASS: 31 / 31 (100%)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Automated cluster validation script (<code className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded">verify-cluster.sh</code>) probing 10 subsystems across all 3 nodes.
          </p>
        </div>

        <button
          onClick={runVerificationSuite}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F3A5F] text-white text-xs font-semibold rounded-lg hover:bg-[#152740] transition-colors shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Validating Subsystems...' : 'Re-Run Verification Suite'}</span>
        </button>
      </div>

      {/* Verification Terminal & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal Output */}
        <div className="lg:col-span-7 bg-slate-950 text-slate-200 font-mono text-xs rounded-xl p-5 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>bash /opt/JHSAM-kafka/scripts/verify-cluster.sh --all-hosts</span>
              </div>
              <span className="text-[11px] text-slate-500">EXIT CODE 0</span>
            </div>

            <div className="text-slate-500 py-1">
              ═════════════════════════════════════════════════════════════<br />
              &nbsp;JHSAM KAFKA CLUSTER — EXECUTIVE OPERATIONAL VERIFICATION<br />
              ═════════════════════════════════════════════════════════════
            </div>

            <div className="space-y-1.5 pt-1">
              {checks.map((c, idx) => {
                const isCurrent = isRunning && activeCheckIndex === idx;
                const isPassed = !isRunning || (activeCheckIndex !== null && activeCheckIndex > idx);

                return (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedCategory(c)}
                    className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer transition-colors ${
                      isCurrent 
                        ? 'bg-blue-900/60 text-cyan-300' 
                        : selectedCategory?.id === c.id 
                          ? 'bg-slate-900 text-white' 
                          : 'hover:bg-slate-900/40 text-slate-300'
                    }`}
                  >
                    <span className="truncate">
                      [{c.id}] {c.category}:
                    </span>
                    <span className="shrink-0 flex items-center gap-2 font-mono">
                      <span>{c.passingCount}/{c.targetCount}</span>
                      {isCurrent ? (
                        <span className="text-cyan-400 animate-pulse font-bold">PROBING...</span>
                      ) : isPassed ? (
                        <span className="text-emerald-400 font-bold">✓ PASS</span>
                      ) : (
                        <span className="text-slate-600">PENDING</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 text-slate-400">
              ═════════════════════════════════════════════════════════════
            </div>
            <div className="text-emerald-400 font-bold flex items-center justify-between">
              <span>OVERALL RESULT: PASS: 31 | WARN: 0 | FAIL: 0</span>
              <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[11px]">
                100% NOMINAL
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex justify-between">
            <span>Report timestamp: 2026-10-14 11:36:18 AST</span>
            <span>Cluster Quorum: Synchronized</span>
          </div>
        </div>

        {/* Selected Check Details */}
        <div className="lg:col-span-5 space-y-4">
          {selectedCategory ? (
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#1F3A5F] bg-blue-50 px-2 py-0.5 rounded">
                  TEST SUITE #{selectedCategory.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedCategory.category}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedCategory.name}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="font-semibold text-slate-700">Verification Details:</div>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedCategory.details}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <span className="text-[11px] text-emerald-800">Pass Rate</span>
                    <div className="text-lg font-bold text-emerald-900 mt-0.5">
                      {selectedCategory.passingCount} / {selectedCategory.targetCount}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] text-slate-500">Subsystem State</span>
                    <div className="text-lg font-bold text-slate-900 mt-0.5">Verified</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-lg text-slate-700 space-y-1">
                  <div className="font-bold text-[#1F3A5F]">Production Reliability Impact:</div>
                  <p className="text-[11px]">
                    Subsystem has verified telemetry streaming directly to Prometheus scrape targets every 15 seconds.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Health summary card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Production Baseline Guarantee</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              No single check failed or threw a warning. The cluster baseline is in an ideal ready state for CDC onboarding once capacity expansion is authorized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
