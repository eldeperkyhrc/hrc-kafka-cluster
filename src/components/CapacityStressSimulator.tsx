import React, { useState } from 'react';
import { 
  AlertTriangle, HardDrive, Cpu, Server, 
  TrendingUp, ShieldAlert, ArrowRight, CheckCircle2 
} from 'lucide-react';

interface CapacityStressSimulatorProps {
  onNavigateToSignoff?: () => void;
}

export const CapacityStressSimulator: React.FC<CapacityStressSimulatorProps> = ({ onNavigateToSignoff }) => {
  // Daily load in GB/day (range 0.1 to 10 GB/day)
  const [dailyLoadGb, setDailyLoadGb] = useState<number>(1.0);

  // Available free space on current root disk: approximately 9.2 GB free
  const currentFreeDiskGb = 9.2;
  const daysUntilFullCurrent = Math.max(0.1, Number((currentFreeDiskGb / dailyLoadGb).toFixed(1)));

  // Proposed 1TB dedicated SSD (1,000 GB)
  const proposedDiskGb = 1000;
  const daysUntilFullProposed = Math.round(proposedDiskGb / dailyLoadGb);

  // Status severity based on days
  const isEmergency = daysUntilFullCurrent <= 3;
  const isWarning = daysUntilFullCurrent > 3 && daysUntilFullCurrent <= 14;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Cluster Capacity & Growth Stress Simulator
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded">
              P0 Critical Ask
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Evaluate disk exhaustion timelines and memory headroom under real CDC throughput across the 10 source databases.
          </p>
        </div>

        {onNavigateToSignoff && (
          <button
            onClick={onNavigateToSignoff}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs shrink-0"
          >
            <span>Authorize VM Expansion</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Interactive Load Slider Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Simulation Control
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Projected Total Daily CDC Ingest Volume
            </h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-[#1F3A5F]">
              {dailyLoadGb >= 1 ? `${dailyLoadGb.toFixed(1)} GB / day` : `${Math.round(dailyLoadGb * 1000)} MB / day`}
            </span>
            <div className="text-[11px] font-mono text-slate-500">
              Across 10 enterprise source databases
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3">
          <input
            type="range"
            min="0.1"
            max="10.0"
            step="0.1"
            value={dailyLoadGb}
            onChange={(e) => setDailyLoadGb(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1F3A5F]"
          />
          <div className="flex justify-between text-xs font-mono text-slate-500">
            <button onClick={() => setDailyLoadGb(0.1)} className="hover:text-slate-900">
              Low: 100 MB/d
            </button>
            <button onClick={() => setDailyLoadGb(1.0)} className="hover:text-slate-900 font-bold">
              Medium: 1.0 GB/d
            </button>
            <button onClick={() => setDailyLoadGb(5.0)} className="hover:text-slate-900 font-bold text-amber-700">
              High: 5.0 GB/d
            </button>
            <button onClick={() => setDailyLoadGb(10.0)} className="hover:text-slate-900 font-bold text-red-700">
              Peak: 10.0 GB/d
            </button>
          </div>
        </div>

        {/* Outcome Comparison: Current vs Proposed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Current State */}
          <div className={`p-5 rounded-xl border space-y-3 ${
            isEmergency 
              ? 'bg-red-50/70 border-red-200' 
              : isWarning 
                ? 'bg-amber-50/70 border-amber-200' 
                : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Current Pilot Hardware (48GB Root Disk)
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                isEmergency ? 'bg-red-200 text-red-900' : 'bg-slate-200 text-slate-800'
              }`}>
                {isEmergency ? 'CRITICAL RISK' : 'AT CAPACITY'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-600">Days Until Server Disk Exhaustion:</div>
              <div className={`text-3xl font-extrabold font-mono ${
                isEmergency ? 'text-red-700' : isWarning ? 'text-amber-700' : 'text-slate-900'
              }`}>
                {daysUntilFullCurrent} Days
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Based on current remaining free capacity (~9.2 GB)
              </div>
            </div>

            <p className="text-xs text-slate-700 pt-1 leading-relaxed">
              When disk reaches 100%, Kafka brokers immediately cease acknowledging producer ACKs, causing Debezium connectors to halt and risking transaction log expiration on source databases.
            </p>
          </div>

          {/* Proposed Production Hardware */}
          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                Proposed Production Tier (1 TB SSD Data Disk)
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded">
                ENTERPRISE STABLE
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-600">Storage Retention Headroom:</div>
              <div className="text-3xl font-extrabold font-mono text-emerald-800">
                {daysUntilFullProposed}+ Days
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Dedicated non-OS mount points isolating Kafka commit logs
              </div>
            </div>

            <p className="text-xs text-slate-700 pt-1 leading-relaxed">
              Provides comfortable 7-day retention with ample room for compaction, index logs, and emergency source re-syncs without OS root disk interference.
            </p>
          </div>
        </div>
      </div>

      {/* Sizing Gap Table */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Hardware Sizing Matrix — Pilot vs. Production Baseline
        </h3>
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Specification</th>
                <th className="p-3">Current VM Allocation</th>
                <th className="p-3 bg-blue-50/50 text-[#1F3A5F]">Production Target</th>
                <th className="p-3">Engineering Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-slate-500" />
                  <span>vCPU Cores per Node</span>
                </td>
                <td className="p-3 font-mono">4 Cores</td>
                <td className="p-3 font-mono font-bold text-[#1F3A5F] bg-blue-50/30">16 Cores</td>
                <td className="p-3">Handles parallel Debezium serialization and consumer burst spikes</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span>RAM per Node</span>
                </td>
                <td className="p-3 font-mono">15 GB</td>
                <td className="p-3 font-mono font-bold text-[#1F3A5F] bg-blue-50/30">64 GB</td>
                <td className="p-3">Crucial: Kafka relies on Linux kernel OS page cache for zero-copy disk I/O</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                  <span>Root OS Disk</span>
                </td>
                <td className="p-3 font-mono">48 GB</td>
                <td className="p-3 font-mono font-bold text-[#1F3A5F] bg-blue-50/30">100 GB</td>
                <td className="p-3">Docker images, build layers, OS logs, and crash dumps</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-red-500" />
                  <span>Dedicated Kafka SSD</span>
                </td>
                <td className="p-3 font-mono text-red-600 font-bold">None (0 GB)</td>
                <td className="p-3 font-mono font-bold text-emerald-700 bg-blue-50/30">500 GB – 1 TB SSD</td>
                <td className="p-3">Strict isolation of Kafka message log segments from root file system</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Temporary Mitigations Banner */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Active Safeguard Mitigations Already Deployed (Buying Time)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <strong className="text-slate-800">Docker Log Rotation:</strong> Capped at 300 MB maximum per container.
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <strong className="text-slate-800">Topic Retention:</strong> Temporarily reduced from 7 days down to 3 days.
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <strong className="text-slate-800">Prometheus TSDB:</strong> Hard capped at 7 days and 2 GB maximum storage.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
