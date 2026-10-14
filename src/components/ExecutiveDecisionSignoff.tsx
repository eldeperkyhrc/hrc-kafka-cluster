import React, { useState } from 'react';
import { 
  FileCheck, Printer, CheckCircle2, AlertTriangle, 
  Copy, Check, Share2, Stamp, Calendar, User 
} from 'lucide-react';

interface ExecutiveDecisionSignoffProps {
  decisionState: Record<string, boolean>;
  onToggleDecision: (key: string) => void;
}

export const ExecutiveDecisionSignoff: React.FC<ExecutiveDecisionSignoffProps> = ({
  decisionState,
  onToggleDecision
}) => {
  const [signerName, setSignerName] = useState<string>('H.E. Executive Sponsor');
  const [signerTitle, setSignerTitle] = useState<string>('Chair, Data Governance Steering Committee');
  const [committeeName, setCommitteeName] = useState<string>('HRC Enterprise Technology Steering Committee');
  const [memoCopied, setMemoCopied] = useState<boolean>(false);

  const decisions = [
    {
      key: 'capacity',
      title: '1. Hardware Capacity Expansion Authorization (P0 Immediate)',
      scope: 'Authorize Infrastructure team to expand 3× VM nodes to 16 vCPU, 64 GB RAM, 100 GB root disk, and attach 3× dedicated 1 TB SSD data volumes within 30 days.',
      owner: 'Infrastructure / Platform Engineering',
      target: 'November 2026'
    },
    {
      key: 'security',
      title: '2. Endorse 2027 Security Hardening Roadmap (Phases 1–4)',
      scope: 'Endorse Phased implementation of TLS in-transit encryption, SASL/SCRAM authentication, HashiCorp Vault secrets management, SIEM audit logging, and RBAC.',
      owner: 'Information Security + Platform',
      target: 'Q1 – Q3 2027'
    },
    {
      key: 'sponsor',
      title: '3. Appointment of Cross-Functional Steering Sponsor',
      scope: 'Assign executive sponsor to govern inter-departmental SLAs across Platform, DBA, Security, and Network teams for seamless CDC source onboarding.',
      owner: 'Executive Committee',
      target: 'Immediate'
    },
    {
      key: 'followup',
      title: '4. Schedule 30-Day Post-Expansion Review',
      scope: 'Calendar formal status review 30 days post-VM upgrade to inspect live CDC streaming telemetry from initial 5 high-volume databases.',
      owner: 'Steering Secretariat',
      target: '30 Days from Approval'
    }
  ];

  const approvedCount = Object.values(decisionState).filter(Boolean).length;
  const isFullyApproved = approvedCount === decisions.length;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMemo = () => {
    const text = `
HRC DATA MANAGEMENT PLATFORM — EXECUTIVE BRIEFING DECISION MEMORANDUM
Date: October 14, 2026
Presented To: ${committeeName}
Executive Signatory: ${signerName} (${signerTitle})
Classification: Internal – Confidential

DECISION RECORD:
1. Capacity Expansion Authorization: ${decisionState.capacity ? 'APPROVED' : 'PENDING'}
2. Security Hardening Roadmap (2027): ${decisionState.security ? 'APPROVED' : 'PENDING'}
3. Executive Steering Sponsor: ${decisionState.sponsor ? 'APPROVED' : 'PENDING'}
4. 30-Day Follow-Up Review: ${decisionState.followup ? 'SCHEDULED' : 'PENDING'}

PLATFORM BASELINE:
- 3-Node KRaft Cluster: Live & Verified Operational
- 31/31 Health Verification Checks: PASS (100%)
- Target: Full CDC onboarding of 10 enterprise source databases to PROD_ODS.
    `.trim();

    navigator.clipboard.writeText(text);
    setMemoCopied(true);
    setTimeout(() => setMemoCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Executive Decision & Governance Sign-Off Record
            </h2>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              isFullyApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-[#1F3A5F]'
            }`}>
              {approvedCount} / 4 Approved
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Formal steering committee endorsement required to release infrastructure capacity and unlock the Phase 2 roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyMemo}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {memoCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{memoCopied ? 'Memo Copied' : 'Copy Text'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1F3A5F] hover:bg-[#152740] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Decision Memo</span>
          </button>
        </div>
      </div>

      {/* Decision Items Checklist */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Required Steering Committee Actions
        </h3>

        <div className="space-y-3">
          {decisions.map((item) => {
            const isChecked = !!decisionState[item.key];
            return (
              <div
                key={item.key}
                onClick={() => onToggleDecision(item.key)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                  isChecked 
                    ? 'border-emerald-300 bg-emerald-50/40 ring-1 ring-emerald-400/30' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // handled by parent onClick
                  className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />

                <div className="flex-1 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{item.title}</span>
                    <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                      isChecked ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isChecked ? 'ENDORSED' : 'PENDING APPROVAL'}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.scope}</p>
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500">
                    <span>Owner: <strong>{item.owner}</strong></span>
                    <span>·</span>
                    <span>Target Timeline: <strong>{item.target}</strong></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Signatory Details Form & Digital Seal */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Stamp className="w-4 h-4 text-[#1F3A5F]" />
          <span>Steering Committee Endorsement Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Executive Signatory Name</label>
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/20 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Official Role / Title</label>
            <input
              type="text"
              value={signerTitle}
              onChange={(e) => setSignerTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/20 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Governing Body</label>
            <input
              type="text"
              value={committeeName}
              onChange={(e) => setCommitteeName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/20 font-medium"
            />
          </div>
        </div>

        {/* Formal Executive Memo Card for Printing */}
        <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs font-mono text-slate-700 printable-memo">
          <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold text-slate-900">MEMORANDUM FOR RECORD</div>
              <div className="text-[11px] text-slate-500">REF: HRC-KAFKA-DECISION-2026-10-14</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900">CLASSIFICATION: INTERNAL – CONFIDENTIAL</div>
              <div className="text-[11px] text-slate-500">HRC Data Management Platform</div>
            </div>
          </div>

          <div className="space-y-2 text-slate-800">
            <p>
              <strong>SUBJECT:</strong> Phase 2 Capacity Expansion & Security Hardening Approval
            </p>
            <p>
              <strong>STATUS OF PLATFORM:</strong> The 3-node KRaft Kafka cluster (PRD-KAF-APP01–03) has concluded initial deployment with 31/31 health verification tests passing (100% nominal) and zero unplanned downtime.
            </p>
            <p>
              <strong>DETERMINATION:</strong> The Steering Committee hereby registers the following approvals:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Capacity Expansion: {decisionState.capacity ? 'APPROVED (30-day allocation of 16 vCPU, 64GB RAM, 1TB SSD per host)' : 'PENDING STEERING ACTION'}</li>
              <li>Security Hardening: {decisionState.security ? 'APPROVED (Phases 1–4 roadmap endorsed for 2027 compliance)' : 'PENDING STEERING ACTION'}</li>
              <li>Executive Sponsor: {decisionState.sponsor ? 'ASSIGNED (Cross-functional governance active)' : 'PENDING STEERING ACTION'}</li>
              <li>30-Day Follow-Up: {decisionState.followup ? 'SCHEDULED' : 'PENDING STEERING ACTION'}</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-slate-500">Signed on behalf of Steering Committee:</div>
              <div className="font-bold text-slate-900 mt-1 font-sans text-sm">{signerName}</div>
              <div className="text-[11px] text-slate-600">{signerTitle}</div>
            </div>
            <div className="text-right sm:text-right">
              <div className="text-[11px] text-slate-500">Official Date:</div>
              <div className="font-bold text-slate-900 mt-1">October 14, 2026</div>
              <div className="text-[11px] text-emerald-700 font-semibold">DIGITALLY SEALED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
