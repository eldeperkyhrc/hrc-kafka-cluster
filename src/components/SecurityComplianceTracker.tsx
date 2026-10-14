import React, { useState } from 'react';
import { SECURITY_PHASES, SecurityPhase } from '../data/kafkaDeckData';
import { 
  ShieldCheck, ShieldAlert, Lock, Key, FileText, 
  CheckCircle2, AlertTriangle, ChevronRight, Check
} from 'lucide-react';

export const SecurityComplianceTracker: React.FC = () => {
  const [phases] = useState<SecurityPhase[]>(SECURITY_PHASES);
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number>(1);
  const [testDataType, setTestDataType] = useState<string>('internal');

  const selectedPhase = phases.find(p => p.phase === selectedPhaseNum) || phases[0];

  const dataSuitability = {
    internal: {
      label: 'Internal Operational & Aggregated Metrics',
      allowed: true,
      reason: 'Current 5-zone network perimeter segmentation and SSH key isolation provide sufficient boundary protection for non-sensitive data.',
      statusClass: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    pii: {
      label: 'Personally Identifiable Information (PII) / Citizen Records',
      allowed: false,
      reason: 'BLOCKED: Data in transit is currently plaintext on the wire. Requires Phase 1 TLS encryption and SASL client authentication.',
      statusClass: 'text-red-700 bg-red-50 border-red-200'
    },
    financial: {
      label: 'Core Financials, General Ledger & Invoicing (System 07)',
      allowed: false,
      reason: 'BLOCKED: Plaintext database credentials in config files violate SAMA CSF and NCA ECC-1. Requires Phase 1 TLS + Phase 2 HashiCorp Vault.',
      statusClass: 'text-red-700 bg-red-50 border-red-200'
    },
    regulated: {
      label: 'National Regulatory & Statutory Compliance Datasets',
      allowed: false,
      reason: 'BLOCKED: Lacks immutable forensic audit trail and per-topic zero-trust ACLs. Requires completion of all 4 Hardening Phases.',
      statusClass: 'text-red-700 bg-red-50 border-red-200'
    }
  };

  const currentCheck = dataSuitability[testDataType as keyof typeof dataSuitability];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Security Hardening Roadmap & Compliance Alignment
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
              Phase 1–4 Execution Plan
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Transitioning the cluster from network perimeter trust to zero-trust compliance aligned with ISO 27001, NCA ECC-1, and SAMA CSF.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
          Target Compliance: <strong>Q3 2027</strong>
        </div>
      </div>

      {/* Interactive Data Classification Suitability Checker */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Governance Gate
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Live Data Classification Suitability Check
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Select a data type to verify whether the cluster is authorized today:
          </span>
        </div>

        {/* Radio options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'internal', label: '1. Internal Operational' },
            { id: 'pii', label: '2. Citizen / Employee PII' },
            { id: 'financial', label: '3. Financial & Ledger' },
            { id: 'regulated', label: '4. National Regulated' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTestDataType(item.id)}
              className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                testDataType === item.id 
                  ? 'border-[#1F3A5F] bg-blue-50/60 text-[#1F3A5F] font-bold ring-1 ring-[#1F3A5F]/20' 
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Suitability Result */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${currentCheck.statusClass}`}>
          {currentCheck.allowed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-bold text-sm">
              {currentCheck.allowed ? 'AUTHORIZATION GRANTED: SUITABLE TODAY' : 'AUTHORIZATION WITHHELD: HARDENING MANDATORY'}
            </div>
            <p className="leading-relaxed">
              {currentCheck.reason}
            </p>
          </div>
        </div>
      </div>

      {/* 4-Phase Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {phases.map((p) => {
          const isSelected = selectedPhase.phase === p.phase;
          return (
            <div
              key={p.phase}
              onClick={() => setSelectedPhaseNum(p.phase)}
              className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected 
                  ? 'border-[#1F3A5F] bg-blue-50/40 shadow-xs ring-1 ring-[#1F3A5F]/20' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                    PHASE {p.phase}
                  </span>
                  <span className="text-xs font-mono font-bold text-red-600">
                    {p.priority}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">{p.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {p.scope}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                <div>Timeline: <strong className="text-slate-700">{p.timeline}</strong></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Phase Detail Expansion */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Deep Dive: {selectedPhase.title}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Execution Window: {selectedPhase.timeline} · Estimated Cost: {selectedPhase.cost}
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-blue-100 text-[#1F3A5F] rounded">
            Priority: {selectedPhase.priority}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Deliverables */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Key Engineering Deliverables
            </h4>
            <div className="space-y-1.5">
              {selectedPhase.deliverables.map((d, i) => (
                <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Framework Impact */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Satisfies Regulatory Standards
            </h4>
            <div className="space-y-1.5">
              {selectedPhase.complianceImpact.map((c, i) => (
                <div key={i} className="p-2.5 bg-blue-50/50 border border-blue-200/70 rounded-lg flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1F3A5F] shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-medium">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Matrix Table */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Enterprise Compliance Alignment Matrix
        </h3>
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Framework</th>
                <th className="p-3">Current Status</th>
                <th className="p-3">Gaps Under Audit</th>
                <th className="p-3 bg-emerald-50 text-emerald-950 font-bold">Target Post-Phase 4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-3 font-bold text-slate-900">ISO/IEC 27001:2022</td>
                <td className="p-3 font-mono text-amber-700">⚠️ Partial</td>
                <td className="p-3">A.10 Cryptographic controls & A.9 Access control</td>
                <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/40">✅ Full Alignment</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">NCA ECC-1 (Essential Cybersecurity Controls)</td>
                <td className="p-3 font-mono text-amber-700">⚠️ Partial</td>
                <td className="p-3">Domain 2.4 (Data Protection & In-Transit Cryptography)</td>
                <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/40">✅ Full Alignment</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">SAMA Cyber Security Framework (CSF)</td>
                <td className="p-3 font-mono text-amber-700">⚠️ Partial</td>
                <td className="p-3">Section 3.2 (Credential Storage) & 3.4 (Immutable Audit Logging)</td>
                <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/40">✅ Full Alignment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
