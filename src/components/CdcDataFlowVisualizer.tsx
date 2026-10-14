import React, { useState, useEffect } from 'react';
import { CDC_SOURCES, CdcSource } from '../data/kafkaDeckData';
import { 
  Database, ArrowRight, Play, CheckCircle2, Clock, 
  Layers, HardDrive, RefreshCw, Filter, Sparkles
} from 'lucide-react';

export const CdcDataFlowVisualizer: React.FC = () => {
  const [sources] = useState<CdcSource[]>(CDC_SOURCES);
  const [selectedSourceId, setSelectedSourceId] = useState<string>('src-5'); // Default CRM
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [filterType, setFilterType] = useState<string>('ALL');

  const selectedSource = sources.find(s => s.id === selectedSourceId) || sources[0];

  const steps = [
    { ms: 0, label: 'Source DB Commit', role: 'Source Database', desc: `Transaction committed in ${selectedSource.name} (${selectedSource.dbType})` },
    { ms: 10, label: 'Debezium Read', role: 'Kafka Connect Worker', desc: 'Connector captures change from database redo/transaction log' },
    { ms: 15, label: 'Kafka Broker Quorum', role: 'KRaft Cluster', desc: 'Message acknowledged by 3x replicas across APP01/02/03' },
    { ms: 25, label: 'JDBC Sink Consume', role: 'Kafka Connect Sink', desc: 'Sink worker consumes Avro record with Schema Registry validation' },
    { ms: 50, label: 'Written to PROD_ODS', role: 'Operational Data Store', desc: 'ODS tables updated with micro-batch upsert' },
    { ms: 100, label: 'Analytical Query Ready', role: 'DWH / SDAIA / BI', desc: 'Immediate executive reporting availability (<100ms total latency)' }
  ];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentStep(0);

    const timeouts = [
      setTimeout(() => setCurrentStep(1), 300),
      setTimeout(() => setCurrentStep(2), 650),
      setTimeout(() => setCurrentStep(3), 1050),
      setTimeout(() => setCurrentStep(4), 1450),
      setTimeout(() => setCurrentStep(5), 1850),
      setTimeout(() => {
        setIsSimulating(false);
      }, 2300)
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  const filteredSources = sources.filter(s => {
    if (filterType === 'ALL') return true;
    return s.dbType.toLowerCase().includes(filterType.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Top Explanation */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              End-to-End CDC Data Pipeline (10 Sources → PROD_ODS)
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 text-[#1F3A5F] rounded">
              Sub-Second (~100ms)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Replaces nightly batch full-table dumps with real-time Debezium log tailing and triple-replicated Kafka event ingestion.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F3A5F] text-white text-xs font-semibold rounded-lg hover:bg-[#152740] transition-colors shadow-xs disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isSimulating ? 'Propagating Change...' : 'Simulate Live Transaction'}</span>
        </button>
      </div>

      {/* Interactive Step-by-Step Flow Visualizer */}
      <div className="bg-slate-950 text-white rounded-xl p-6 border border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400">ACTIVE PIPELINE SIMULATION</span>
            <h3 className="text-base font-bold text-slate-100 mt-0.5">
              Tracing Transaction Event: <span className="text-amber-400 font-mono">{selectedSource.name}</span>
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Current Latency: <strong className="text-emerald-400">{isSimulating ? steps[currentStep].ms : 100} ms</strong>
          </div>
        </div>

        {/* Pipeline Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {steps.map((st, idx) => {
            const isActive = isSimulating ? currentStep >= idx : true;
            const isCurrent = isSimulating && currentStep === idx;

            return (
              <div 
                key={idx}
                className={`p-3.5 rounded-lg border transition-all ${
                  isCurrent 
                    ? 'bg-blue-900/60 border-cyan-400 shadow-lg ring-1 ring-cyan-400/50' 
                    : isActive 
                      ? 'bg-slate-900/80 border-slate-700 text-slate-200' 
                      : 'bg-slate-900/30 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                    T+{st.ms} ms
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold mt-2 text-white">{st.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{st.role}</div>
                <div className="text-[10px] text-slate-400 mt-2 leading-tight">
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Old vs New Latency Bar */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg">
            <div className="text-red-400 font-bold">Historical Nightly Batch ETL</div>
            <div className="text-slate-300 text-[11px] mt-1">
              Data available next business day at 08:00 AM (12–24h latency). Heavy DB table lock spikes.
            </div>
          </div>
          <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg">
            <div className="text-emerald-400 font-bold">JHSAM Kafka CDC Pipeline</div>
            <div className="text-slate-300 text-[11px] mt-1">
              Data available in PROD_ODS in ~100 milliseconds. 0 table locks, continuous micro-streaming.
            </div>
          </div>
        </div>
      </div>

      {/* 10 Sources Matrix */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              10 Source Databases Configured & Ready
            </h3>
            <p className="text-xs text-slate-500">
              Select any system to inspect its connector plugin, schema volume, and operational target.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            {['ALL', 'Oracle', 'SQL Server', 'PostgreSQL', 'MySQL'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterType === type 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {filteredSources.map((source) => {
            const isSelected = source.id === selectedSource.id;
            return (
              <div
                key={source.id}
                onClick={() => setSelectedSourceId(source.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-[#1F3A5F] bg-blue-50/50 shadow-xs ring-1 ring-[#1F3A5F]/20' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-500">{source.dbType}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="font-bold text-sm text-slate-900 mt-1">{source.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">{source.businessDomain}</div>

                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1 text-[11px] font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span>Tables:</span>
                    <strong className="text-slate-800">{source.tablesCount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span className="text-slate-700">{source.changeVolume}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Source Deep Specs */}
        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-slate-900">
              Active Selection: <span className="font-mono text-[#1F3A5F]">{selectedSource.name}</span> ({selectedSource.businessDomain})
            </div>
            <div className="text-slate-600 font-mono text-[11px]">
              Debezium Connector: <span className="text-slate-800 font-semibold">{selectedSource.connector}</span> · Target: <span className="text-slate-800 font-semibold">PROD_ODS.ODS_{selectedSource.name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
              SERVICE ACCOUNT & FIREWALL READY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
