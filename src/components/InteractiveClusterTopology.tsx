import React, { useState } from 'react';
import { PHYSICAL_NODES, NodeServer } from '../data/kafkaDeckData';
import { 
  Server, Cpu, HardDrive, Network, ShieldCheck, AlertCircle, 
  RefreshCw, Power, CheckCircle2, ArrowRightLeft, Radio
} from 'lucide-react';

export const InteractiveClusterTopology: React.FC = () => {
  const [nodes, setNodes] = useState<NodeServer[]>(PHYSICAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-01');
  const [isFailoverActive, setIsFailoverActive] = useState<boolean>(false);
  const [failedNodeId, setFailedNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const handleToggleFailover = (nodeId: string) => {
    if (failedNodeId === nodeId) {
      // Restore
      setFailedNodeId(null);
      setIsFailoverActive(false);
      setNodes(PHYSICAL_NODES.map(n => ({ ...n, status: 'Nominal' })));
    } else {
      // Simulate failover
      setFailedNodeId(nodeId);
      setIsFailoverActive(true);
      setNodes(PHYSICAL_NODES.map(n => {
        if (n.id === nodeId) {
          return { ...n, status: 'Simulated Failover' };
        }
        return { ...n, status: 'Nominal' };
      }));
    }
  };

  const activeBrokersCount = nodes.filter(n => n.status !== 'Simulated Failover').length;

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Physical 3-Node Cluster & Quorum Topology
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
              KRaft Mode (No ZooKeeper)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Redundant deployment across PRD-KAF-APP01, APP02, and APP03 on subnet 10.254.2.0/24 with triple replication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-600 px-3 py-1.5 bg-slate-100 rounded-lg flex items-center gap-2">
            <Radio className={`w-3.5 h-3.5 ${isFailoverActive ? 'text-amber-500 animate-pulse' : 'text-emerald-600'}`} />
            <span>Active Quorum: <strong>{activeBrokersCount} / 3 Nodes</strong></span>
          </div>
          {isFailoverActive && (
            <button
              onClick={() => handleToggleFailover(failedNodeId!)}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-800 text-white hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore Node</span>
            </button>
          )}
        </div>
      </div>

      {/* Rack Banner Image with Physical View */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950">
        <img 
          src="/src/assets/images/server_nodes_rack_1792003047305.jpg" 
          alt="Enterprise Server Rack Nodes" 
          className="w-full h-44 sm:h-56 object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
          <div className="text-white space-y-1">
            <div className="text-xs font-mono text-cyan-400">HARDWARE LAYER · DATACENTER SUITE</div>
            <div className="text-lg font-bold">Dedicated Server Enclosure with Isolated Network Interfaces</div>
            <div className="text-xs text-slate-300">
              Inter-broker communication locked to internal VLAN on ports 19092 (Broker) and 29092 (KRaft Quorum).
            </div>
          </div>
        </div>
      </div>

      {/* 3 Physical Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nodes.map((node) => {
          const isFailed = node.status === 'Simulated Failover';
          const isSelected = selectedNode.id === node.id;

          return (
            <div 
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`rounded-xl p-5 border cursor-pointer transition-all ${
                isSelected 
                  ? 'border-[#1F3A5F] ring-2 ring-[#1F3A5F]/20 bg-white shadow-md' 
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Card Top */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isFailed ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <span className="font-mono font-bold text-sm text-slate-900">{node.name}</span>
                </div>
                <span className="font-mono text-xs text-slate-500">{node.ip}</span>
              </div>

              {/* Status Banner */}
              <div className="py-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Node Status:</span>
                  <span className={`font-semibold font-mono ${isFailed ? 'text-red-600' : 'text-emerald-700'}`}>
                    {isFailed ? 'FAILED (Simulated)' : 'NOMINAL (Online)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">KRaft Role:</span>
                  <span className="font-mono text-slate-800 font-medium">
                    {isFailed ? 'Unreachable' : (failedNodeId === 'node-01' && node.id === 'node-02' ? 'Elected Leader' : node.kraftRole)}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {node.role}
                </div>
              </div>

              {/* Hardware Spec Summary */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  <span>{node.specs.vcpu} vCPU</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-400" />
                  <span>{node.specs.ramGb} GB RAM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                  <span>{node.specs.diskGb} GB Disk</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <span>Free: {node.specs.diskFreeGb} GB</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                  }}
                  className="text-xs text-[#1F3A5F] hover:underline font-semibold"
                >
                  View Services
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFailover(node.id);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors flex items-center gap-1 ${
                    isFailed 
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{isFailed ? 'Reboot Server' : 'Simulate Crash'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Failover Outcome Notice when Active */}
      {isFailoverActive && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 space-y-1">
            <div className="font-bold text-sm">Cluster High Availability Verified in Real Time</div>
            <p>
              Node <span className="font-mono font-bold">{failedNodeId === 'node-01' ? 'PRD-KAF-APP01' : failedNodeId === 'node-02' ? 'PRD-KAF-APP02' : 'PRD-KAF-APP03'}</span> is offline. 
              KRaft metadata quorum automatically elected <span className="font-mono font-bold">{failedNodeId === 'node-01' ? 'PRD-KAF-APP02' : 'PRD-KAF-APP01'}</span> as quorum leader. 
              With minimum in-sync replicas (min.insync.replicas=2), partition ACK succeeds with <strong>zero message loss</strong> and continuous downstream delivery to PROD_ODS.
            </p>
          </div>
        </div>
      )}

      {/* Selected Node Deep Inspector */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Node Inspector: {selectedNode.name}</span>
              <span className="text-xs font-mono text-slate-500 font-normal">({selectedNode.ip})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{selectedNode.role}</p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
            Ubuntu 22.04 LTS · Kernel 5.15 Optimized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Services Deployed */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-4 h-4 text-slate-500" />
              Active System & Container Daemons
            </h4>
            <div className="space-y-2">
              {selectedNode.services.map((svc, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="font-medium text-slate-800">{svc}</span>
                  <span className="font-mono text-emerald-700 font-semibold text-[11px]">ACTIVE / HEALTHY</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bound Ports & Network Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Network className="w-4 h-4 text-slate-500" />
              Listening Ports & Quorum Bindings
            </h4>
            <div className="space-y-2">
              {selectedNode.ports.map((port, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-700">{port}</span>
                  <span className="text-slate-500">TCP Internal</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hardware Limitation Notice */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Resource Warning:</strong> Root volume free space is only <span className="font-mono font-bold">{selectedNode.specs.diskFreeGb} GB</span>. 
              Production CDC streaming requires allocating a dedicated 500GB–1TB SSD mount.
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold text-amber-800 uppercase shrink-0">Phase 2 P0</span>
        </div>
      </div>
    </div>
  );
};
