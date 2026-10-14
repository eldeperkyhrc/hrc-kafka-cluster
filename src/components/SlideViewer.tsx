import React from 'react';
import { SLIDES_DATA, PHYSICAL_NODES, CDC_SOURCES, HEALTH_CHECKS, TOP_RISKS, SECURITY_PHASES } from '../data/kafkaDeckData';
import { 
  Server, ShieldAlert, Cpu, HardDrive, CheckCircle2, AlertTriangle, 
  Clock, Database, ArrowRight, Layers, FileCheck, Users, TrendingUp, Sparkles
} from 'lucide-react';

interface SlideViewerProps {
  currentSlideNumber: number;
  onNavigateToView?: (view: 'deck' | 'topology' | 'cdc' | 'health' | 'capacity' | 'security' | 'signoff') => void;
  decisionState?: Record<string, boolean>;
  onToggleDecision?: (key: string) => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentSlideNumber,
  onNavigateToView,
  decisionState = {},
  onToggleDecision
}) => {
  const slide = SLIDES_DATA.find(s => s.number === currentSlideNumber) || SLIDES_DATA[0];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col min-h-[640px]">
      {/* Slide Header Bar */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded text-center">
            SLIDE {String(slide.number).padStart(2, '0')} / 18
          </span>
          <span className="text-xs font-medium text-slate-500">
            {slide.category}
          </span>
          {slide.isExecShortDeck && (
            <span className="text-[11px] font-semibold text-[#1F3A5F] bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
              Exec 5-Slide Core
            </span>
          )}
        </div>
        <div className="text-xs font-mono text-slate-400">
          JHSAM Data Management Platform · October 2026
        </div>
      </div>

      {/* Slide Body Container */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Slide Title */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F3A5F] tracking-tight">
              {slide.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1 font-medium">
              {slide.subtitle}
            </p>
          </div>

          {/* Slide Content by Number */}
          {slide.number === 1 && <Slide1Content onNavigate={onNavigateToView} />}
          {slide.number === 2 && <Slide2Content onNavigate={onNavigateToView} />}
          {slide.number === 3 && <Slide3Content onNavigate={onNavigateToView} />}
          {slide.number === 4 && <Slide4Content onNavigate={onNavigateToView} />}
          {slide.number === 5 && <Slide5Content onNavigate={onNavigateToView} />}
          {slide.number === 6 && <Slide6Content onNavigate={onNavigateToView} />}
          {slide.number === 7 && <Slide7Content onNavigate={onNavigateToView} />}
          {slide.number === 8 && <Slide8Content onNavigate={onNavigateToView} />}
          {slide.number === 9 && <Slide9Content onNavigate={onNavigateToView} />}
          {slide.number === 10 && <Slide10Content onNavigate={onNavigateToView} />}
          {slide.number === 11 && <Slide11Content onNavigate={onNavigateToView} />}
          {slide.number === 12 && <Slide12Content onNavigate={onNavigateToView} />}
          {slide.number === 13 && <Slide13Content onNavigate={onNavigateToView} />}
          {slide.number === 14 && <Slide14Content onNavigate={onNavigateToView} />}
          {slide.number === 15 && <Slide15Content onNavigate={onNavigateToView} />}
          {slide.number === 16 && <Slide16Content onNavigate={onNavigateToView} />}
          {slide.number === 17 && <Slide17Content onNavigate={onNavigateToView} />}
          {slide.number === 18 && (
            <Slide18Content 
              decisionState={decisionState} 
              onToggleDecision={onToggleDecision} 
              onNavigate={onNavigateToView} 
            />
          )}
        </div>

        {/* Slide Footer Key Takeaway Banner */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Executive Takeaway:</span>
            <span className="text-slate-600">{slide.keyTakeaway}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 shrink-0">
            Internal – Confidential
          </div>
        </div>
      </div>
    </div>
  );
};

/* Individual Slide Renderers */

const Slide1Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
    <div className="lg:col-span-7 space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-semibold">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        Status: Live & Verified Operational (October 2026)
      </div>

      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
          Real-time Event Streaming Backbone for 10 Business Applications & ODS Analytics
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Comprehensive executive briefing covering cluster architecture, live health verification, 
          day-2 operational procedures, capacity expansion mandates, and the 2027 security hardening roadmap.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-500 font-medium">Replication Factor</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">3× Quorum</div>
          <div className="text-[11px] text-slate-500">Survives 1-node loss</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-500 font-medium">CDC Sources</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">10 Systems</div>
          <div className="text-[11px] text-slate-500">Sub-second ingest</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-500 font-medium">Health Check</div>
          <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">31 / 31 (100%)</div>
          <div className="text-[11px] text-emerald-600 font-medium">Zero errors/downtime</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
        <span>Prepared by: <strong className="text-slate-700 font-semibold">Platform Engineering</strong></span>
        <span>·</span>
        <span>Audience: <strong className="text-slate-700 font-semibold">Executive Steering Committee</strong></span>
        <span>·</span>
        <span>Duration: <strong className="text-slate-700 font-semibold">20 Min + 5 Min Q&A</strong></span>
      </div>
    </div>

    <div className="lg:col-span-5 flex flex-col items-center">
      <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
        <img 
          src="/src/assets/images/kafka_enterprise_mesh_1792003032458.jpg" 
          alt="JHSAM Kafka Cluster Enterprise Mesh" 
          className="w-full h-56 object-cover"
        />
        <div className="p-3 bg-slate-900 text-slate-300 text-xs flex items-center justify-between">
          <span className="font-mono text-[11px]">KRaft 3-Node Topology Active</span>
          <span className="text-emerald-400 font-mono text-[11px]">3,200+ Live Metrics</span>
        </div>
      </div>
    </div>
  </div>
);

const Slide2Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* The Bottom Line checklist */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          The Bottom Line Assessment
        </h3>
        <div className="space-y-2.5 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900 font-semibold">Production-grade 3-node Kafka cluster</strong> deployed & 100% operational in KRaft mode.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900 font-semibold">Full CDC pipeline configured</strong> — 10 heterogeneous enterprise source DBs targeting PROD_ODS.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900 font-semibold">31/31 health checks verified</strong> (0 warnings, 0 failures, 0 unplanned downtime).</span>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900 font-semibold">Hardware is currently undersized</strong> — VM expansion required before high-volume onboarding.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900 font-semibold">Security hardening required</strong> — Phase 1 TLS/SASL must precede regulated PII/financial data.</span>
          </div>
        </div>
      </div>

      {/* Three Headlines */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Three Executive Headlines
        </h3>
        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-slate-200 rounded-lg shadow-xs">
            <div className="text-xs font-bold text-[#1F3A5F]">1. Delivered On Time & High Availability</div>
            <p className="text-xs text-slate-600 mt-1">
              Cluster deployed on schedule with full 3-node KRaft replication and automated leader failover.
            </p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-lg shadow-xs">
            <div className="text-xs font-bold text-[#1F3A5F]">2. Comprehensive 360° Observability</div>
            <p className="text-xs text-slate-600 mt-1">
              3,200+ metrics streamed to Prometheus & Grafana with proactive alerts on consumer lag & broker health.
            </p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-lg shadow-xs">
            <div className="text-xs font-bold text-[#1F3A5F]">3. Ready for Full CDC Ingest</div>
            <p className="text-xs text-slate-600 mt-1">
              All 10 database service accounts, firewalls, and Debezium connector worker definitions are staged.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Primary Recommendation Banner */}
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">
          Primary Committee Recommendation
        </div>
        <div className="text-sm font-semibold text-slate-900 mt-0.5">
          Approve Phase 2: Hardware Capacity Expansion (30-day window) + Security Hardening Roadmap.
        </div>
      </div>
      <button 
        onClick={() => onNavigate && onNavigate('signoff')}
        className="px-4 py-2 bg-[#1F3A5F] text-white text-xs font-semibold rounded-lg hover:bg-[#152740] transition-colors shrink-0"
      >
        Review Decision Items
      </button>
    </div>
  </div>
);

const Slide3Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Problem Before Kafka */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          The Problem Before Kafka (Status Quo)
        </h3>
        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Historical Challenge</th>
                <th className="p-2.5">Direct Business Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-2.5 font-medium text-slate-900">Data silos across 10+ systems</td>
                <td className="p-2.5">No unified single view of operational metrics</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium text-slate-900">Overnight batch ETL jobs</td>
                <td className="p-2.5">Data is stale by 12–24 hours when executives read it</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium text-slate-900">Manual data extraction</td>
                <td className="p-2.5">Resource-intensive, error-prone, fragile scripts</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium text-slate-900">No real-time event triggers</td>
                <td className="p-2.5">Inability to react instantly to business events</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium text-slate-900">Fragmented audit trail</td>
                <td className="p-2.5">Significant compliance & regulatory review risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* What Kafka Delivers */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          What Kafka Delivers (Modern Foundation)
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-lg">
            <div className="font-bold text-emerald-950">Sub-Second Streaming</div>
            <p className="text-slate-600 mt-1">~100ms latency replacing 12–24h batches for immediate visibility.</p>
          </div>
          <div className="p-3 bg-blue-50/50 border border-blue-200/80 rounded-lg">
            <div className="font-bold text-blue-950">Triple-Redundancy</div>
            <p className="text-slate-600 mt-1">3x replication with zero data loss even during hardware failure.</p>
          </div>
          <div className="p-3 bg-purple-50/50 border border-purple-200/80 rounded-lg">
            <div className="font-bold text-purple-950">Reusable Architecture</div>
            <p className="text-slate-600 mt-1">Onboard future sources without custom point-to-point spaghetti code.</p>
          </div>
          <div className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-lg">
            <div className="font-bold text-amber-950">Immutable Audit Trail</div>
            <p className="text-slate-600 mt-1">Every database INSERT, UPDATE, DELETE captured with full historical replay.</p>
          </div>
        </div>

        {/* Visual flow */}
        <div className="p-3.5 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">10 Source DBs</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="text-amber-300">Kafka 3-Node Cluster</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="text-cyan-300">PROD_ODS</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 font-bold">DWH / SDAIA</span>
        </div>
      </div>
    </div>
  </div>
);

const Slide4Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          End-to-End Enterprise Architecture
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The JHSAM Data Platform bridges legacy relational silos and modern analytical stores. 
          Ten operational databases continuously stream table-level transaction logs through Debezium connectors 
          into redundant KRaft Kafka brokers, which sink data into the unified <span className="font-mono font-semibold text-slate-800">PROD_ODS</span> repository.
        </p>

        {/* Scale Metrics Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Platform Component</th>
                <th className="p-2.5">Current Deployed Scale</th>
                <th className="p-2.5">Operational Guarantee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600 font-mono">
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900">CDC Sources</td>
                <td className="p-2.5 font-bold text-slate-900">10 Databases</td>
                <td className="p-2.5 font-sans">Oracle, SQL Server, Postgres, MySQL</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900">Compute Servers</td>
                <td className="p-2.5 font-bold text-slate-900">3 Nodes</td>
                <td className="p-2.5 font-sans">Distributed across 10.254.2.34 - .36</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900">KRaft Quorum</td>
                <td className="p-2.5 font-bold text-slate-900">3 Controllers</td>
                <td className="p-2.5 font-sans">Sub-second automatic leader election</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900">Replication Factor</td>
                <td className="p-2.5 font-bold text-slate-900">3× Replication</td>
                <td className="p-2.5 font-sans">Min In-Sync Replicas = 2 (Zero Data Loss)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900">Health Verification</td>
                <td className="p-2.5 font-bold text-emerald-700">31/31 Passing</td>
                <td className="p-2.5 font-sans text-emerald-600 font-medium">100% operational baseline</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-3">
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
          <img 
            src="/src/assets/images/kafka_enterprise_mesh_1792003032458.jpg" 
            alt="Kafka Topology" 
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate && onNavigate('topology')}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors"
          >
            Explore 3-Node Topology
          </button>
          <button
            onClick={() => onNavigate && onNavigate('cdc')}
            className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#1F3A5F] hover:bg-[#152740] rounded-lg text-center transition-colors"
          >
            Inspect 10 Pipelines
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Slide5Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PHYSICAL_NODES.map((node) => (
        <div key={node.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-[#1F3A5F] bg-blue-100/70 px-2 py-0.5 rounded">
              {node.name}
            </span>
            <span className="text-[11px] font-mono text-slate-500">{node.ip}</span>
          </div>

          <div className="text-xs font-semibold text-slate-900 border-b border-slate-200 pb-2">
            {node.role}
          </div>

          <div className="space-y-1 text-xs text-slate-600">
            {node.services.map((svc, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">{svc}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600">
            <div>
              <span className="text-slate-400">CPU:</span> {node.specs.vcpu} vCPU
            </div>
            <div>
              <span className="text-slate-400">RAM:</span> {node.specs.ramGb} GB
            </div>
            <div>
              <span className="text-slate-400">Disk:</span> {node.specs.diskGb} GB
            </div>
            <div className="text-amber-700 font-bold">
              <span className="text-slate-400 font-normal">Free:</span> {node.specs.diskFreeGb} GB
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="p-4 bg-slate-900 text-slate-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
      <div className="space-y-1">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          High Availability & Automatic KRaft Quorum Failover
        </div>
        <p className="text-slate-400">
          Inter-broker consensus on ports <span className="font-mono text-cyan-300">19092 / 29092</span>. Any 1 node can experience complete hardware power-off without stopping ingestion or querying.
        </p>
      </div>
      <button
        onClick={() => onNavigate && onNavigate('topology')}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg shrink-0 transition-colors"
      >
        Simulate Server Failover
      </button>
    </div>
  </div>
);

const Slide6Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-6">
    {/* Milestone timeline table */}
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
        Timeline of a Single Change Event (Sub-Second CDC Execution)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="font-mono font-bold text-slate-900">T+0 ms</div>
          <div className="text-[11px] font-semibold text-slate-700 mt-1">Source Commit</div>
          <div className="text-[10px] text-slate-500">INSERT / UPDATE</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="font-mono font-bold text-slate-900">T+10 ms</div>
          <div className="text-[11px] font-semibold text-slate-700 mt-1">Debezium Capture</div>
          <div className="text-[10px] text-slate-500">Transaction log read</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="font-mono font-bold text-slate-900">T+15 ms</div>
          <div className="text-[11px] font-semibold text-slate-700 mt-1">Kafka Publish</div>
          <div className="text-[10px] text-slate-500">3x replica ACK</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="font-mono font-bold text-slate-900">T+25 ms</div>
          <div className="text-[11px] font-semibold text-slate-700 mt-1">Sink Consume</div>
          <div className="text-[10px] text-slate-500">JDBC sink worker</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="font-mono font-bold text-slate-900">T+50 ms</div>
          <div className="text-[11px] font-semibold text-slate-700 mt-1">Written to ODS</div>
          <div className="text-[10px] text-slate-500">PROD_ODS tables</div>
        </div>
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg">
          <div className="font-mono font-bold text-emerald-800">T+100 ms</div>
          <div className="text-[11px] font-bold text-emerald-900 mt-1">Analytics Ready</div>
          <div className="text-[10px] text-emerald-700">DWH / SDAIA / BI</div>
        </div>
      </div>
    </div>

    {/* Batch vs CDC comparison */}
    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-3">Performance Dimension</th>
            <th className="p-3 bg-red-50/60 text-red-900">Previous Approach (Nightly Batch ETL)</th>
            <th className="p-3 bg-emerald-50/60 text-emerald-900">New Platform (Kafka CDC Real-Time)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-600">
          <tr>
            <td className="p-3 font-semibold text-slate-900">Data Latency</td>
            <td className="p-3 font-mono text-red-700">12–24 Hours Delay</td>
            <td className="p-3 font-mono font-bold text-emerald-700">~100 Milliseconds (Sub-Second)</td>
          </tr>
          <tr>
            <td className="p-3 font-semibold text-slate-900">Database Impact</td>
            <td className="p-3">Heavy full-table scans locking production DBs at 2 AM</td>
            <td className="p-3 font-medium text-emerald-800">Non-intrusive incremental transaction log tailing</td>
          </tr>
          <tr>
            <td className="p-3 font-semibold text-slate-900">Compute Load Profile</td>
            <td className="p-3">Massive batch spikes causing cluster resource choking</td>
            <td className="p-3 font-medium text-emerald-800">Evenly distributed, gentle streaming throughput</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Slide7Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-4">
    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-2.5">Delivered Capability</th>
            <th className="p-2.5">Verification</th>
            <th className="p-2.5">Executive Business Impact</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-600">
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Real-time CDC pipeline</td>
            <td className="p-2.5 font-mono text-emerald-700">PASS (Ready)</td>
            <td className="p-2.5">Sub-second propagation from source to analytical storage</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">10 source systems</td>
            <td className="p-2.5 font-mono text-emerald-700">Configured</td>
            <td className="p-2.5">Single enterprise integration spine replacing point-to-point scripts</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Triple-redundant storage</td>
            <td className="p-2.5 font-mono text-emerald-700">Live Quorum</td>
            <td className="p-2.5">Guarantees zero data loss even if an entire host crashes</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Schema governance</td>
            <td className="p-2.5 font-mono text-emerald-700">Active :8081</td>
            <td className="p-2.5">Strict schema contracts prevent upstream changes from breaking ODS</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Distributed CDC processing</td>
            <td className="p-2.5 font-mono text-emerald-700">2 Workers Live</td>
            <td className="p-2.5">Horizontal load balancing across multiple application servers</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Full observability</td>
            <td className="p-2.5 font-mono text-emerald-700">3,200+ Metrics</td>
            <td className="p-2.5">Proactive anomaly alerting before operational lag affects business</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Management console</td>
            <td className="p-2.5 font-mono text-emerald-700">Kafka UI :8080</td>
            <td className="p-2.5">Self-service inspection of topics, partitions, and connector states</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Zero-downtime operations</td>
            <td className="p-2.5 font-mono text-emerald-700">Rolling Verified</td>
            <td className="p-2.5">Patch and upgrade hosts without interrupting streaming traffic</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Slide8Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* Terminal View */}
      <div className="md:col-span-7 bg-slate-950 text-slate-200 font-mono text-xs rounded-xl p-4 shadow-md border border-slate-800 space-y-1.5">
        <div className="text-slate-400 pb-2 border-b border-slate-800 flex justify-between">
          <span>JHSAM Kafka Cluster — Verification CLI</span>
          <span className="text-emerald-400">verify-cluster.sh</span>
        </div>
        <div className="text-slate-300 pt-1">[1] Containers on host: 5/5 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[2] KRaft Quorum: 2/2 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[3] Brokers registered: 1/1 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[4] Topics healthy: 5/5 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[5] Kafka Connect workers: 4/4 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[6] Schema Registry :8081: 1/1 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[7] Kafka UI Console :8080: 2/2 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[8] Prometheus TSDB :9090: 2/2 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[9] Grafana Dashboards :3000: 3/3 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="text-slate-300">[10] JMX / Node Exporters: 6/6 <span className="text-emerald-400 font-bold">✓ PASS</span></div>
        <div className="pt-2 border-t border-slate-800 text-emerald-400 font-bold flex justify-between">
          <span>TOTAL CHECKS: 31 PASS / 0 WARN / 0 FAIL</span>
          <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">100% HEALTHY</span>
        </div>
      </div>

      {/* Stability Metrics Cards */}
      <div className="md:col-span-5 space-y-3">
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-500 font-medium">Unplanned Downtime</div>
          <div className="text-2xl font-bold font-mono text-emerald-700">0 Minutes</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Continuous uptime since initial deployment</div>
        </div>
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-500 font-medium">Data Loss Incidents</div>
          <div className="text-2xl font-bold font-mono text-emerald-700">0 Events</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Zero corruption across all broker ISR partitions</div>
        </div>
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-500 font-medium">Consumer Ingestion Lag</div>
          <div className="text-2xl font-bold font-mono text-slate-900">0 Backlog</div>
          <div className="text-[11px] text-slate-500 mt-0.5">All topics processing in sub-second velocity</div>
        </div>
      </div>
    </div>
  </div>
);

const Slide9Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="text-xs text-slate-500 font-medium">Broker Health Metrics</div>
        <div className="text-2xl font-bold font-mono text-[#1F3A5F] mt-1">586 Metrics</div>
        <p className="text-xs text-slate-600 mt-1">
          Scraped per broker via JMX (Port 7071): Under-replicated partitions, ISR shrink rate, byte in/out.
        </p>
      </div>
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="text-xs text-slate-500 font-medium">Connect Pipeline Metrics</div>
        <div className="text-2xl font-bold font-mono text-[#1F3A5F] mt-1">2,000 Metrics</div>
        <p className="text-xs text-slate-600 mt-1">
          Scraped across workers (Port 7072): Task state, batch processing duration, Debezium offset commits.
        </p>
      </div>
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="text-xs text-slate-500 font-medium">Host Telemetry Metrics</div>
        <div className="text-2xl font-bold font-mono text-[#1F3A5F] mt-1">900 Metrics</div>
        <p className="text-xs text-slate-600 mt-1">
          Scraped via Node Exporter (Port 9100): CPU iowait, Linux page cache, memory saturation, root disk IOPS.
        </p>
      </div>
    </div>

    {/* Metric thresholds table */}
    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-2.5">Observability Domain</th>
            <th className="p-2.5">Key Indicators Monitored</th>
            <th className="p-2.5">Configured Alert Trigger</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-600">
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Broker Health</td>
            <td className="p-2.5">Liveness, ISR count, controller epoch</td>
            <td className="p-2.5 font-mono text-red-700 font-semibold">Any broker unreachable &gt; 15s</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">CDC Consumer Lag</td>
            <td className="p-2.5">Offset delta between producer & sink</td>
            <td className="p-2.5 font-mono text-amber-700 font-semibold">&gt; 10,000 message backlog</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">Host Disk Storage</td>
            <td className="p-2.5">Root volume utilization</td>
            <td className="p-2.5 font-mono text-amber-700 font-semibold">&gt; 80% capacity utilized</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">JVM Heap Pressure</td>
            <td className="p-2.5">Garbage collection pause duration</td>
            <td className="p-2.5 font-mono text-amber-700 font-semibold">&gt; 85% heap threshold</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Slide10Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
      <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <div className="text-xs text-amber-900 space-y-1">
        <div className="font-bold text-sm">Honest Executive Security Assessment</div>
        <p>
          The cluster runs inside a strictly segmented perimeter network. However, network segmentation alone 
          is insufficient for regulated enterprise data. In-transit encryption (TLS) and authentication (SASL) must be implemented in Phase 1 before handling PII or financial assets.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* What's In Place */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Active Controls In Place
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-900">Network Segmentation:</span> 5 firewall zones isolating app traffic
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-900">OS Hardening:</span> Ubuntu minimal LTS baseline with kernel sysctl tuning
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-900">Container Hygiene:</span> Log rotation enabled, non-root daemons where supported
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-900">Access Management:</span> SSH key pair auth only; password login disabled
          </div>
        </div>
      </div>

      {/* What's Missing */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Gaps to Close in Phase 1 & 2
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-red-50/50 border border-red-200 rounded-lg">
            <span className="font-bold text-red-950">No TLS Encryption:</span> Data currently travels unencrypted on internal wire
          </div>
          <div className="p-2.5 bg-red-50/50 border border-red-200 rounded-lg">
            <span className="font-bold text-red-950">No SASL Authentication:</span> Reliance on IP filtering rather than verified client identity
          </div>
          <div className="p-2.5 bg-red-50/50 border border-red-200 rounded-lg">
            <span className="font-bold text-red-950">Plaintext Credentials:</span> DB passwords in config files rather than Vault secrets
          </div>
          <div className="p-2.5 bg-red-50/50 border border-red-200 rounded-lg">
            <span className="font-bold text-red-950">No Topic ACLs:</span> Any connected client can publish to any topic
          </div>
        </div>
      </div>
    </div>

    {/* Suitability Badge */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
      <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>CURRENTLY SUITABLE FOR:</strong> Internal, non-sensitive operational & aggregation data.</span>
      </div>
      <div className="p-3 bg-red-50 border border-red-300 text-red-900 rounded-lg flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
        <span><strong>NOT SUITABLE FOR:</strong> PII, financial, health, or regulatory-audited records.</span>
      </div>
    </div>
  </div>
);

const Slide11Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SECURITY_PHASES.map((p) => (
        <div key={p.phase} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 text-[#1F3A5F] rounded">
                PHASE {p.phase}
              </span>
              <span className="text-xs font-mono font-bold text-red-600">{p.priority}</span>
            </div>
            <div className="text-xs font-bold text-slate-900">{p.title}</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">{p.scope}</p>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-500">
            <div><strong>Window:</strong> {p.timeline}</div>
            <div><strong>Cost:</strong> {p.cost}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Compliance Alignment Table */}
    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-2.5">Regulatory Framework</th>
            <th className="p-2.5">Current Status</th>
            <th className="p-2.5">Target Post-Phase 4 Hardening</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-600">
          <tr>
            <td className="p-2.5 font-bold text-slate-900">ISO 27001 (Information Security)</td>
            <td className="p-2.5 font-mono text-amber-700">⚠️ Partial (Perimeter only)</td>
            <td className="p-2.5 font-mono text-emerald-700 font-semibold">✅ Full Alignment</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">NCA ECC-1 (National Cybersecurity Authority)</td>
            <td className="p-2.5 font-mono text-amber-700">⚠️ Partial (Awaiting TLS)</td>
            <td className="p-2.5 font-mono text-emerald-700 font-semibold">✅ Full Alignment</td>
          </tr>
          <tr>
            <td className="p-2.5 font-bold text-slate-900">SAMA CSF (Financial Cyber Framework)</td>
            <td className="p-2.5 font-mono text-amber-700">⚠️ Partial (Awaiting Vault)</td>
            <td className="p-2.5 font-mono text-emerald-700 font-semibold">✅ Full Alignment</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Slide12Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* RACI matrix */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Cross-Functional RACI Ownership
        </h3>
        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Team</th>
                <th className="p-2.5">Core Responsibility</th>
                <th className="p-2.5">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-2.5 font-bold text-slate-900">Platform Eng</td>
                <td className="p-2.5">Cluster architecture, version upgrades</td>
                <td className="p-2.5 font-mono">Business hours</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">DevOps</td>
                <td className="p-2.5">Day-2 runtime operations, alerting</td>
                <td className="p-2.5 font-mono text-emerald-700 font-semibold">24×7 On-call</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">DBA Team</td>
                <td className="p-2.5">Source/target DB accounts & CDC grant roles</td>
                <td className="p-2.5 font-mono">Business hours</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">Security</td>
                <td className="p-2.5">TLS PKI, secrets audit, SIEM integration</td>
                <td className="p-2.5 font-mono">Business hours</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">Network</td>
                <td className="p-2.5">Firewall policies P01–P42, routing</td>
                <td className="p-2.5 font-mono">Business hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident response SLAs */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Incident Response SLA Tiers
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-bold text-red-950">Sev-1: Complete Cluster Down</div>
              <div className="text-slate-600 text-[11px]">Immediate pager duty, all-hands incident room</div>
            </div>
            <div className="font-mono font-bold text-red-700 text-sm">15 Min SLA</div>
          </div>
          <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-bold text-amber-950">Sev-2: Single Broker Down (Degraded)</div>
              <div className="text-slate-600 text-[11px]">Quorum maintained, on-call engineer investigation</div>
            </div>
            <div className="font-mono font-bold text-amber-700 text-sm">1 Hour SLA</div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Sev-3: High Consumer Lag Alert</div>
              <div className="text-slate-600 text-[11px]">Backlog accumulation on single connector</div>
            </div>
            <div className="font-mono font-bold text-slate-700 text-sm">24 Hour SLA</div>
          </div>
        </div>

        <div className="p-3 bg-slate-100 rounded-lg text-[11px] text-slate-600">
          <strong>Documentation Suite:</strong> 11 formal SOP documents, single-command automated deployment, and automated health verification scripts deployed on all hosts.
        </div>
      </div>
    </div>
  </div>
);

const Slide13Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
      <div className="text-xs text-red-900 space-y-1">
        <div className="font-bold text-sm">Hardware Capacity Alert — Critical Executive Ask</div>
        <p>
          Current VM compute resources (4 vCPU, 15 GB RAM, 48 GB root disk) were provisioned for validation. 
          Without dedicated SSD data disks and expanded RAM, onboarding all 10 high-volume sources will deplete disk space within <strong>2 days</strong>.
        </p>
      </div>
    </div>

    {/* Hardware comparison table */}
    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-2.5">Server Hardware Resource</th>
            <th className="p-2.5 text-amber-900">Current (Pilot)</th>
            <th className="p-2.5 text-emerald-900">Production Target</th>
            <th className="p-2.5">Capacity Expansion Gap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-600 font-mono">
          <tr>
            <td className="p-2.5 font-sans font-medium text-slate-900">vCPU Cores per Node</td>
            <td className="p-2.5 text-amber-700">4 vCPU</td>
            <td className="p-2.5 font-bold text-emerald-700">16 vCPU</td>
            <td className="p-2.5 font-bold text-slate-900">4× Increase</td>
          </tr>
          <tr>
            <td className="p-2.5 font-sans font-medium text-slate-900">RAM per Node</td>
            <td className="p-2.5 text-amber-700">15 GB</td>
            <td className="p-2.5 font-bold text-emerald-700">64 GB</td>
            <td className="p-2.5 font-bold text-slate-900">4.3× Increase (Crucial for page cache)</td>
          </tr>
          <tr>
            <td className="p-2.5 font-sans font-medium text-slate-900">Root OS Disk</td>
            <td className="p-2.5 text-amber-700">48 GB</td>
            <td className="p-2.5 font-bold text-emerald-700">100 GB</td>
            <td className="p-2.5 font-bold text-slate-900">2× Increase (Docker images & logs)</td>
          </tr>
          <tr>
            <td className="p-2.5 font-sans font-medium text-slate-900">Dedicated Kafka SSD Volume</td>
            <td className="p-2.5 text-red-700">None (0 GB)</td>
            <td className="p-2.5 font-bold text-emerald-700">500 GB – 1 TB SSD</td>
            <td className="p-2.5 font-bold text-red-600">NEW ALLOCATION (Mandatory)</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Load Scenarios */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="font-bold text-slate-900">Low CDC Load (100 MB/d)</div>
        <div className="text-lg font-bold font-mono text-slate-700 mt-1">~91 Days to Full</div>
        <div className="text-[11px] text-slate-500">Survivable under current pilot limits</div>
      </div>
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="font-bold text-amber-950">Medium Load (1 GB/d)</div>
        <div className="text-lg font-bold font-mono text-amber-800 mt-1">~9 Days to Full</div>
        <div className="text-[11px] text-amber-700">Requires daily log manual purging</div>
      </div>
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="font-bold text-red-950">High Load (5 GB/d)</div>
        <div className="text-lg font-bold font-mono text-red-700 mt-1">~2 Days to Full ⚠️</div>
        <div className="text-[11px] text-red-600 font-semibold">Immediate risk if all 10 sources active</div>
      </div>
    </div>
  </div>
);

const Slide14Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-4">
    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-2.5">#</th>
            <th className="p-2.5">Identified Risk</th>
            <th className="p-2.5">Likelihood / Impact</th>
            <th className="p-2.5">Engineered Mitigation</th>
            <th className="p-2.5">Owner</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-600">
          {TOP_RISKS.map((r) => (
            <tr key={r.id}>
              <td className="p-2.5 font-bold font-mono text-slate-900">{r.id}</td>
              <td className="p-2.5 font-semibold text-slate-900">{r.risk}</td>
              <td className="p-2.5">
                <span className={`font-mono font-bold ${r.impact === 'Severe' ? 'text-red-700' : 'text-amber-700'}`}>
                  {r.likelihood} / {r.impact}
                </span>
              </td>
              <td className="p-2.5">{r.mitigation}</td>
              <td className="p-2.5 font-mono text-slate-500">{r.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
      <div className="font-bold text-slate-900">Active Risk Defenses Implemented Today:</div>
      <p className="text-slate-600 text-[11px]">
        Docker container log rotation caps container logs at 300MB; Kafka segment retention reduced from 7 days to 3 days; Prometheus TSDB retention capped at 7 days / 2GB max size.
      </p>
    </div>
  </div>
);

const Slide15Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-2.5">Capability</th>
              <th className="p-2.5">Before Kafka</th>
              <th className="p-2.5">After Kafka</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600">
            <tr>
              <td className="p-2.5 font-bold text-slate-900">Data Latency</td>
              <td className="p-2.5 font-mono text-red-700">12–24 Hours</td>
              <td className="p-2.5 font-mono font-bold text-emerald-700">~100 ms</td>
            </tr>
            <tr>
              <td className="p-2.5 font-bold text-slate-900">Data Silos</td>
              <td className="p-2.5">10+ Point scripts</td>
              <td className="p-2.5 font-bold text-slate-800">Unified pipeline</td>
            </tr>
            <tr>
              <td className="p-2.5 font-bold text-slate-900">Engineering Effort</td>
              <td className="p-2.5">Constant ETL fixes</td>
              <td className="p-2.5 font-bold text-emerald-800">Automated CDC</td>
            </tr>
            <tr>
              <td className="p-2.5 font-bold text-slate-900">Compliance Audit</td>
              <td className="p-2.5">Fragmented logs</td>
              <td className="p-2.5 font-bold text-slate-800">Full CDC history</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Quantified Annual Value Return
        </h3>
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs">
          <div className="text-lg font-bold text-emerald-950 font-mono">
            2–3 FTE-Equivalent Savings
          </div>
          <p className="text-slate-700">
            Eliminates dozens of weekly engineering hours previously squandered on fixing broken batch ETL scripts, schema mismatches, and manual ad-hoc SQL dumps.
          </p>
        </div>
        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
          <div className="font-bold text-[#1F3A5F]">Real-Time Executive Intelligence</div>
          <p className="text-slate-600 text-[11px]">
            Leadership views live today numbers on SDAIA and DWH dashboards rather than 24-hour delayed snapshots.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Slide16Content: React.FC<{ onNavigate?: (v: any) => void }> = ({ onNavigate }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stream 1 */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Stream 1: Capacity Expansion (Immediate)
          </h3>
          <span className="text-xs font-mono font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
            P0 MANDATORY
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Required within 30 days to support production CDC ingestion across all 10 databases.
        </p>
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>RAM:</strong> 3× Servers to 64 GB RAM
          </div>
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>vCPU:</strong> 3× Servers to 16 vCPU Cores
          </div>
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>Dedicated Data Disks:</strong> 3× 500GB – 1TB SSD Volumes
          </div>
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>Root OS Disks:</strong> Expand to 100 GB
          </div>
        </div>
      </div>

      {/* Stream 2 */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Stream 2: Security Hardening (Roadmap)
          </h3>
          <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
            P1 STAGED
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Staged across Q1–Q3 2027 to achieve ISO 27001, NCA ECC-1, and SAMA CSF compliance.
        </p>
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>Q1 2027:</strong> TLS in-transit + SASL/SCRAM authentication ($0 OSS)
          </div>
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>Q1–Q2 2027:</strong> HashiCorp Vault secrets management & DB rotation
          </div>
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>Q2 2027:</strong> Centralized immutable audit logging (ELK / Loki)
          </div>
          <div className="p-2 bg-white border border-slate-200 rounded">
            <strong>Q3 2027:</strong> Fine-grained RBAC & per-topic data contracts
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide17Content: React.FC<{ onNavigate?: (v: any) => void }> = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
        <span className="font-mono text-emerald-800 font-bold">Oct 2026 (Done)</span>
        <div className="font-bold text-slate-900">Foundation Deployed</div>
        <p className="text-slate-600 text-[11px]">3-node KRaft cluster live, 3,200 metrics streaming, 31/31 health checks passing.</p>
      </div>
      <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
        <span className="font-mono text-amber-800 font-bold">Nov – Dec 2026 (Active)</span>
        <div className="font-bold text-slate-900">Capacity & Onboarding</div>
        <p className="text-slate-600 text-[11px]">VM expansion execution, followed by connecting all 10 databases to CDC pipelines.</p>
      </div>
      <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
        <span className="font-mono text-blue-800 font-bold">Q1 – Q3 2027 (Planned)</span>
        <div className="font-bold text-slate-900">Security & Compliance</div>
        <p className="text-slate-600 text-[11px]">TLS, Vault, audit logs, and formal audit alignment with NCA ECC-1 and ISO 27001.</p>
      </div>
    </div>

    {/* Success metrics */}
    <div className="p-4 bg-slate-900 text-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
      <div>
        <div className="text-emerald-400 font-mono font-bold text-lg">&lt; 1 Second</div>
        <div className="text-slate-400 text-[11px] mt-0.5">End-to-End Latency Target</div>
      </div>
      <div>
        <div className="text-emerald-400 font-mono font-bold text-lg">0 Minutes</div>
        <div className="text-slate-400 text-[11px] mt-0.5">Quarterly Unplanned Downtime</div>
      </div>
      <div>
        <div className="text-emerald-400 font-mono font-bold text-lg">100% (10 DBs)</div>
        <div className="text-slate-400 text-[11px] mt-0.5">CDC Onboarding Completion</div>
      </div>
      <div>
        <div className="text-emerald-400 font-mono font-bold text-lg">ISO & NCA</div>
        <div className="text-slate-400 text-[11px] mt-0.5">Regulatory Certification</div>
      </div>
    </div>
  </div>
);

const Slide18Content: React.FC<{ 
  decisionState: Record<string, boolean>; 
  onToggleDecision?: (key: string) => void;
  onNavigate?: (v: any) => void;
}> = ({ decisionState, onToggleDecision, onNavigate }) => (
  <div className="space-y-6">
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
      <h3 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">
        Decision Requested Today from Steering Committee
      </h3>
      <p className="text-xs text-slate-700 mt-1">
        Please confirm approval for the two critical Phase 2 investment streams to keep cluster momentum:
      </p>

      {/* Interactive Checkboxes */}
      <div className="mt-4 space-y-2.5">
        {[
          { key: 'capacity', title: '1. Approve Capacity Expansion (30-Day VM Upgrade)', desc: 'Authorize 16 vCPU, 64 GB RAM, and dedicated 1TB SSDs across 3 servers.' },
          { key: 'security', title: '2. Approve Security Hardening Roadmap (2027 Budget)', desc: 'Endorse Phased TLS, Vault, and Audit Logging implementation.' },
          { key: 'sponsor', title: '3. Assign Executive Steering Sponsor', desc: 'Appoint executive sponsor for cross-team coordination (DBA, Security, Infra).' },
          { key: 'followup', title: '4. Schedule 30-Day Follow-Up Review', desc: 'Calendar operational review post-VM expansion.' }
        ].map(item => (
          <label 
            key={item.key} 
            className="flex items-start gap-3 p-3 bg-white border border-slate-200/90 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <input 
              type="checkbox" 
              checked={!!decisionState[item.key]} 
              onChange={() => onToggleDecision && onToggleDecision(item.key)}
              className="mt-0.5 w-4 h-4 text-[#1F3A5F] rounded border-slate-300 focus:ring-[#1F3A5F]"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900">{item.title}</span>
              <p className="text-slate-500 text-[11px] mt-0.5">{item.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <div className="text-xs text-slate-600">
        Status: <strong className="font-mono text-[#1F3A5F]">{Object.values(decisionState).filter(Boolean).length} / 4</strong> Decisions Approved in Session
      </div>
      <button
        onClick={() => onNavigate && onNavigate('signoff')}
        className="px-5 py-2.5 bg-[#1F3A5F] hover:bg-[#152740] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2"
      >
        <FileCheck className="w-4 h-4" />
        <span>Open Formal Decision Sign-Off Memo</span>
      </button>
    </div>
  </div>
);
