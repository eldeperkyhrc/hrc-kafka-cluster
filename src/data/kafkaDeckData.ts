export interface SlideData {
  id: number;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  category: 'Overview' | 'Architecture' | 'Operations' | 'Security' | 'Capacity & Risk' | 'Business Value' | 'Governance';
  isExecShortDeck: boolean;
  speakerNotes: string;
  keyTakeaway: string;
}

export interface NodeServer {
  id: string;
  name: string;
  ip: string;
  role: string;
  services: string[];
  specs: {
    vcpu: number;
    ramGb: number;
    diskGb: number;
    diskFreeGb: number;
  };
  kraftRole: 'Leader / Broker 1' | 'Follower / Broker 2' | 'Follower / Broker 3';
  ports: string[];
  status: 'Nominal' | 'Simulated Failover' | 'Warning';
}

export interface CdcSource {
  id: string;
  name: string;
  dbType: 'Oracle' | 'SQL Server' | 'PostgreSQL' | 'MySQL' | 'Oracle EBS';
  businessDomain: string;
  connector: string;
  changeVolume: string;
  status: 'Ready / Pre-configured' | 'Active Streaming' | 'Awaiting Capacity';
  tablesCount: number;
}

export interface HealthCheckItem {
  id: number;
  category: string;
  name: string;
  targetCount: number;
  passingCount: number;
  status: 'PASS' | 'WARN' | 'FAIL';
  details: string;
}

export interface RiskItem {
  id: number;
  risk: string;
  likelihood: 'High' | 'Medium' | 'Low';
  impact: 'Severe' | 'High' | 'Medium';
  mitigation: string;
  owner: string;
  timeline: string;
  status: 'Mitigation Active' | 'Planned Phase 1' | 'Ongoing Governance';
}

export interface SecurityPhase {
  phase: number;
  title: string;
  scope: string;
  timeline: string;
  cost: string;
  priority: 'P0' | 'P1';
  complianceImpact: string[];
  deliverables: string[];
}

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    slug: 'title',
    number: 1,
    title: 'HRC Data Management Platform',
    subtitle: 'Kafka Cluster Deployment — Executive Briefing',
    category: 'Overview',
    isExecShortDeck: true,
    speakerNotes: 'Welcome. Today I will walk you through the deployment of the HRC Kafka Cluster — what it is, what is live today, and what we recommend next. This is a 20-minute briefing with 5 minutes for questions.',
    keyTakeaway: 'The foundational enterprise streaming backbone is live and operational as of October 2026.'
  },
  {
    id: 2,
    slug: 'executive-summary',
    number: 2,
    title: 'Executive Summary',
    subtitle: 'The Bottom Line & Strategic Priorities',
    category: 'Overview',
    isExecShortDeck: true,
    speakerNotes: 'The cluster is live and passing all health checks. The two things that need executive attention are: (1) the hardware is undersized for production load, and (2) we need to invest in security hardening before this handles regulated data. Both are addressed in the slides ahead.',
    keyTakeaway: '100% health checks passing with zero downtime, but requires VM capacity expansion and Phase 2 security hardening.'
  },
  {
    id: 3,
    slug: 'business-context',
    number: 3,
    title: 'Business Context — Why Kafka?',
    subtitle: 'From 12–24h Batch ETL Silos to Sub-Second CDC Streaming',
    category: 'Business Value',
    isExecShortDeck: false,
    speakerNotes: 'Before Kafka, data moved between systems via nightly batch jobs. Business could not react to events in real time, and engineers were spending cycles keeping ETL pipelines alive. Kafka changes that: it captures every database change as it happens and makes it available to downstream systems within milliseconds.',
    keyTakeaway: 'Sub-second data propagation replaces fragile overnight batch runs and eliminates data silos.'
  },
  {
    id: 4,
    slug: 'architecture-glance',
    number: 4,
    title: 'What We Built — Architecture at a Glance',
    subtitle: '10 Pre-Configured CDC Sources, 3-Node KRaft Quorum, PROD_ODS Target',
    category: 'Architecture',
    isExecShortDeck: true,
    speakerNotes: 'This is the complete picture. Ten business systems feed into a 3-node cluster. The cluster is fully redundant: any one broker can fail without data loss. Downstream, everything lands in the Operational Data Store where analytics and reporting pick it up.',
    keyTakeaway: 'End-to-end unified architecture: 10 source DBs, 3 KRaft brokers with 3x replication, landing in PROD_ODS.'
  },
  {
    id: 5,
    slug: 'cluster-physical-view',
    number: 5,
    title: 'The 3-Node Cluster — Physical View',
    subtitle: 'Distributed High-Availability Hardware Topology & Quorum',
    category: 'Architecture',
    isExecShortDeck: false,
    speakerNotes: 'The cluster runs across three physical servers. If any one of them goes down — power loss, hardware issue, OS reboot — the cluster keeps working. Kafka replication means data is never lost. This is what makes it production-grade.',
    keyTakeaway: 'Survives total loss of any single node with automatic KRaft controller failover and 3x replica parity.'
  },
  {
    id: 6,
    slug: 'data-flow-cdc-to-ods',
    number: 6,
    title: 'Data Flow — CDC Source to ODS',
    subtitle: 'From Database Commit to Analytical Availability in ~100 Milliseconds',
    category: 'Architecture',
    isExecShortDeck: false,
    speakerNotes: 'Here is what happens when someone in CVM updates a customer record. Within a tenth of a second, that change flows through Kafka and lands in the Operational Data Store. Compare that to the previous approach, where the same change waited until 2 AM for the nightly batch job.',
    keyTakeaway: 'Sub-second event pipeline: T+0ms DB commit → T+10ms Debezium → T+50ms JDBC Sink → T+100ms ODS analytics.'
  },
  {
    id: 7,
    slug: 'key-capabilities-delivered',
    number: 7,
    title: 'Key Capabilities Delivered',
    subtitle: 'Eight Verified Operational Building Blocks for HRC Data',
    category: 'Operations',
    isExecShortDeck: false,
    speakerNotes: 'This is the full capability set. Every checkbox is verified live. The business outcome is: stakeholders get current data, engineers stop firefighting batch jobs, and we have a foundation for event-driven applications.',
    keyTakeaway: 'Triple-redundant storage, Debezium CDC, Schema Registry governance, and rolling zero-downtime updates.'
  },
  {
    id: 8,
    slug: 'live-status-verified',
    number: 8,
    title: 'Live Status — Verified Operational',
    subtitle: '31/31 Health Checks Passing (100% Clean) with Zero Incidents',
    category: 'Operations',
    isExecShortDeck: false,
    speakerNotes: 'The verification script confirms every component. I want to emphasize: 31 out of 31 checks pass, and there have been zero unplanned downtime incidents since deployment. This is not aspirational — it is the live state.',
    keyTakeaway: 'All 10 verification test suites passing: containers, KRaft quorum, topics, connect, registry, and monitoring.'
  },
  {
    id: 9,
    slug: 'metrics-observability',
    number: 9,
    title: 'Metrics & Observability',
    subtitle: '3,200+ Real-Time Metrics Streaming into Prometheus & Grafana',
    category: 'Operations',
    isExecShortDeck: false,
    speakerNotes: 'We are collecting 3,200 metrics across the entire stack. Grafana dashboards give operations real-time visibility. When a source falls behind or a connector fails, we know within seconds — not hours. This is why the cluster has had zero downtime: we catch issues before they become incidents.',
    keyTakeaway: 'Granular telemetry: 586 broker metrics, 2,000 Kafka Connect metrics, and 900 host metrics with proactive alerting.'
  },
  {
    id: 10,
    slug: 'security-posture',
    number: 10,
    title: 'Security Posture — Current State',
    subtitle: 'Honest Assessment: Segmented Perimeter vs. In-Transit Encryption Gap',
    category: 'Security',
    isExecShortDeck: true,
    speakerNotes: 'I want to be transparent about the current security posture. The cluster runs on a segmented internal network, but there is no encryption, no authentication, and no audit logging. This is acceptable for the initial pilot, but must be addressed before we onboard regulated data. The next slide outlines the roadmap.',
    keyTakeaway: 'Appropriate for non-sensitive operational data today; strictly NOT suitable for PII or financial data until Phase 1.'
  },
  {
    id: 11,
    slug: 'security-roadmap',
    number: 11,
    title: 'Security Roadmap — Going Forward',
    subtitle: 'Four-Phase Hardening Program for ISO 27001, NCA ECC-1, and SAMA CSF',
    category: 'Security',
    isExecShortDeck: false,
    speakerNotes: 'We have planned a four-phase hardening program. Phase 1 is critical and should be completed first — it adds encryption and authentication. Phases 2–4 progressively add secrets management, audit logging, and fine-grained access control. Our goal: achieve ISO/NCA/SAMA alignment by Q3 2027.',
    keyTakeaway: 'Phased hardening: TLS+SASL in Q1 2027, Vault in Q1-Q2, Central Logging in Q2, and RBAC/ACLs in Q3.'
  },
  {
    id: 12,
    slug: 'operations-model',
    number: 12,
    title: 'Operations Model — Day-2 Support',
    subtitle: 'Cross-Functional RACI, 24x7 On-Call SLA, and 11-Document Playbook Suite',
    category: 'Operations',
    isExecShortDeck: false,
    speakerNotes: 'Operations is formalized. On-call is established, incident response times are defined, and we have complete documentation. An on-call engineer can resolve most issues using the playbooks without escalation.',
    keyTakeaway: '15-min Sev-1 response target, clear tier ownership across Platform, DevOps, DBA, and Security teams.'
  },
  {
    id: 13,
    slug: 'capacity-growth-outlook',
    number: 13,
    title: 'Capacity & Growth Outlook',
    subtitle: 'Urgent Assessment: Current Hardware is Undersized for Production Load',
    category: 'Capacity & Risk',
    isExecShortDeck: false,
    speakerNotes: 'This is the biggest concern. The current hardware — 4 vCPU, 15 GB RAM, no dedicated data disk — will not survive production CDC load. We have applied mitigations that buy us time, but we strongly recommend capacity expansion before onboarding all 10 sources. This is the primary ask of this briefing.',
    keyTakeaway: 'Under 5 GB/day high CDC load, current storage fills in 2 days. 64GB RAM & 1TB dedicated SSDs required.'
  },
  {
    id: 14,
    slug: 'risks-mitigations',
    number: 14,
    title: 'Risks & Mitigations',
    subtitle: 'Top 5 Operational Risks with Assigned Ownership & Active Controls',
    category: 'Capacity & Risk',
    isExecShortDeck: false,
    speakerNotes: 'Risk #1 is the most urgent. The rest are addressable with the security roadmap. What matters is: we have identified them, we have a plan, and we are tracking progress. Nothing is a surprise.',
    keyTakeaway: 'Disk exhaustion is the primary P0 risk; temporary mitigations in place, but permanent fix is VM expansion.'
  },
  {
    id: 15,
    slug: 'business-benefits',
    number: 15,
    title: 'Business Benefits & Value Realization',
    subtitle: '2–3 FTE Engineering Savings, Live Decisions, and Compliance Readiness',
    category: 'Business Value',
    isExecShortDeck: false,
    speakerNotes: 'The benefits are tangible: real-time data instead of yesterday numbers, one pipeline instead of ten custom integrations, and a foundation for event-driven applications we have not imagined yet. The engineering efficiency alone pays back the investment in 12–18 months.',
    keyTakeaway: '2–3 FTE-equivalent annual savings, complete audit trail for SDAIA compliance, and agile real-time dashboards.'
  },
  {
    id: 16,
    slug: 'investments-required',
    number: 16,
    title: 'Investments Required',
    subtitle: 'Two Capital & Effort Streams: Immediate Capacity vs. Security Hardening',
    category: 'Governance',
    isExecShortDeck: false,
    speakerNotes: 'Two asks. First: capacity expansion — this is the critical one. We need bigger VMs and dedicated data disks within 30 days. Second: budget for the security hardening roadmap, which we can spread over 3 quarters. Both are modest investments relative to the business value.',
    keyTakeaway: 'Stream 1 (Capacity, 30 days) is P0 infrastructure allocation; Stream 2 (Security) spreads across Q1–Q3 2027.'
  },
  {
    id: 17,
    slug: 'timeline-milestones',
    number: 17,
    title: 'Timeline & Milestones',
    subtitle: 'Six-Month Execution Roadmap to Full Production Onboarding & Compliance',
    category: 'Governance',
    isExecShortDeck: false,
    speakerNotes: 'This is our 6-month plan. October through December is capacity expansion and CDC onboarding. Q1–Q2 2027 is security hardening. Q3 2027 is compliance alignment. Each milestone has an owner and a success metric.',
    keyTakeaway: 'Q4 2026 onboarding of all 10 sources follows immediate VM expansion, leading to Q1-Q3 security certification.'
  },
  {
    id: 18,
    slug: 'recommendation-approval',
    number: 18,
    title: 'Recommendation & Approval',
    subtitle: 'Executive Decision Request: Approve Phase 2 Expansion & Hardening',
    category: 'Governance',
    isExecShortDeck: true,
    speakerNotes: 'In summary: the cluster is live, stable, and ready. What we need from this committee is (1) approval to expand capacity — the critical path item, and (2) endorsement of the security hardening roadmap. With those two decisions, we can onboard all 10 sources by year-end and be compliance-ready by mid-2027. I will take questions now.',
    keyTakeaway: 'Action requested today: approve 30-day capacity expansion and endorse the 2027 security roadmap budget.'
  }
];

export const PHYSICAL_NODES: NodeServer[] = [
  {
    id: 'node-01',
    name: 'PRD-KAF-APP01',
    ip: '10.254.2.34',
    role: 'Broker 1 & Connector Worker 1',
    services: ['Kafka Broker 1 (KRaft)', 'Kafka Connect 1', 'Schema Registry', 'JMX Exporter', 'Node Exporter'],
    specs: {
      vcpu: 4,
      ramGb: 15,
      diskGb: 48,
      diskFreeGb: 9.8
    },
    kraftRole: 'Leader / Broker 1',
    ports: ['9092 (Client)', '19092 (Broker Inter-Comm)', '29092 (KRaft Quorum)', '8081 (Schema Reg)', '8083 (Connect)'],
    status: 'Nominal'
  },
  {
    id: 'node-02',
    name: 'PRD-KAF-APP02',
    ip: '10.254.2.35',
    role: 'Broker 2 & Management UI',
    services: ['Kafka Broker 2 (KRaft)', 'Kafka Connect 2', 'Kafka UI Console', 'JMX Exporter', 'Node Exporter'],
    specs: {
      vcpu: 4,
      ramGb: 15,
      diskGb: 48,
      diskFreeGb: 10.2
    },
    kraftRole: 'Follower / Broker 2',
    ports: ['9092 (Client)', '19092 (Broker Inter-Comm)', '29092 (KRaft Quorum)', '8080 (Kafka UI)', '8083 (Connect)'],
    status: 'Nominal'
  },
  {
    id: 'node-03',
    name: 'PRD-KAF-APP03',
    ip: '10.254.2.36',
    role: 'Broker 3 & Observability Hub',
    services: ['Kafka Broker 3 (KRaft)', 'Prometheus Server', 'Grafana Analytics', 'JMX Exporter', 'Node Exporter'],
    specs: {
      vcpu: 4,
      ramGb: 15,
      diskGb: 48,
      diskFreeGb: 8.4
    },
    kraftRole: 'Follower / Broker 3',
    ports: ['9092 (Client)', '19092 (Broker Inter-Comm)', '29092 (KRaft Quorum)', '9090 (Prometheus)', '3000 (Grafana)'],
    status: 'Nominal'
  }
];

export const CDC_SOURCES: CdcSource[] = [
  { id: 'src-1', name: 'EPM Aggregation', dbType: 'Oracle', businessDomain: 'Enterprise Performance', connector: 'debezium-oracle-epm', changeVolume: '~120K changes/day', status: 'Ready / Pre-configured', tablesCount: 42 },
  { id: 'src-2', name: 'EPM SharePoint', dbType: 'SQL Server', businessDomain: 'Document Management', connector: 'debezium-sqlserver-sp', changeVolume: '~65K changes/day', status: 'Ready / Pre-configured', tablesCount: 18 },
  { id: 'src-3', name: 'Mahfouzat', dbType: 'PostgreSQL', businessDomain: 'Archival & Records', connector: 'debezium-postgres-mahfouzat', changeVolume: '~90K changes/day', status: 'Ready / Pre-configured', tablesCount: 34 },
  { id: 'src-4', name: 'NRM', dbType: 'Oracle', businessDomain: 'National Registry Matrix', connector: 'debezium-oracle-nrm', changeVolume: '~280K changes/day', status: 'Ready / Pre-configured', tablesCount: 56 },
  { id: 'src-5', name: 'CVM', dbType: 'SQL Server', businessDomain: 'Customer Value Management', connector: 'debezium-sqlserver-cvm', changeVolume: '~450K changes/day', status: 'Ready / Pre-configured', tablesCount: 82 },
  { id: 'src-6', name: 'MMS', dbType: 'MySQL', businessDomain: 'Material Management', connector: 'debezium-mysql-mms', changeVolume: '~110K changes/day', status: 'Ready / Pre-configured', tablesCount: 29 },
  { id: 'src-7', name: 'AZKA (NewFinance)', dbType: 'Oracle EBS', businessDomain: 'Core Financials & GL', connector: 'debezium-oracle-azka-fin', changeVolume: '~340K changes/day', status: 'Ready / Pre-configured', tablesCount: 64 },
  { id: 'src-8', name: 'AZKA (Stores)', dbType: 'SQL Server', businessDomain: 'Inventory & Procurement', connector: 'debezium-sqlserver-azka-st', changeVolume: '~190K changes/day', status: 'Ready / Pre-configured', tablesCount: 38 },
  { id: 'src-9', name: 'Moamalat', dbType: 'PostgreSQL', businessDomain: 'Correspondence & Workflow', connector: 'debezium-postgres-moamalat', changeVolume: '~220K changes/day', status: 'Ready / Pre-configured', tablesCount: 47 },
  { id: 'src-10', name: 'Expert', dbType: 'MySQL', businessDomain: 'Consultancy & Advisory Cases', connector: 'debezium-mysql-expert', changeVolume: '~85K changes/day', status: 'Ready / Pre-configured', tablesCount: 22 }
];

export const HEALTH_CHECKS: HealthCheckItem[] = [
  { id: 1, category: 'Containers on Host', name: 'Docker Compose Daemon & Containers', targetCount: 5, passingCount: 5, status: 'PASS', details: 'All 5 containers running on host with healthy restart policy and log rotation.' },
  { id: 2, category: 'KRaft Quorum', name: 'KRaft Metadata Controller Quorum', targetCount: 2, passingCount: 2, status: 'PASS', details: 'Controllers active, metadata epoch synchronized across 19092/29092.' },
  { id: 3, category: 'Brokers', name: 'Broker Liveness & Registration', targetCount: 1, passingCount: 1, status: 'PASS', details: 'Brokers 1, 2, 3 registered in cluster metadata with 3x replication factor.' },
  { id: 4, category: 'Topics', name: 'Core Infrastructure Topics', targetCount: 5, passingCount: 5, status: 'PASS', details: '_schemas, connect-configs, connect-offsets, connect-status, heartbeat verified in ISR.' },
  { id: 5, category: 'Kafka Connect', name: 'Connect Workers Distributed Group', targetCount: 4, passingCount: 4, status: 'PASS', details: 'Distributed group active across APP01 and APP02, Debezium & JDBC plugins loaded.' },
  { id: 6, category: 'Schema Registry', name: 'Confluent Schema Registry Instance', targetCount: 1, passingCount: 1, status: 'PASS', details: 'Listening on port 8081, Avro compatibility checks enforced.' },
  { id: 7, category: 'Kafka UI', name: 'Provectus Kafka UI Management Console', targetCount: 2, passingCount: 2, status: 'PASS', details: 'Active on port 8080, cluster and schema registry endpoints mapped.' },
  { id: 8, category: 'Prometheus', name: 'Prometheus TSDB & Scraping Targets', targetCount: 2, passingCount: 2, status: 'PASS', details: 'Scraping 6 targets on 15s interval, TSDB retention set to 7d / 2GB cap.' },
  { id: 9, category: 'Grafana', name: 'Grafana Provisioned Dashboards', targetCount: 3, passingCount: 3, status: 'PASS', details: 'Dashboards provisioned: Cluster Health, CDC Pipeline Lag, Host Resources.' },
  { id: 10, category: 'Exporters', name: 'JMX & Node Exporters Reachability', targetCount: 6, passingCount: 6, status: 'PASS', details: 'Ports 7071 (JMX Broker), 7072 (JMX Connect), 9100 (Node) reachable on all nodes.' }
];

export const TOP_RISKS: RiskItem[] = [
  {
    id: 1,
    risk: 'Disk full under production CDC load',
    likelihood: 'High',
    impact: 'Severe',
    mitigation: 'VM capacity expansion (100GB root + 500GB–1TB dedicated SSD per server)',
    owner: 'Infrastructure / Platform',
    timeline: 'Immediate (30 Days)',
    status: 'Mitigation Active'
  },
  {
    id: 2,
    risk: 'Security incident / unauthenticated internal access',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Implement Phase 1 TLS encryption + SASL/SCRAM authentication',
    owner: 'Security + Platform',
    timeline: 'Q1 2027',
    status: 'Planned Phase 1'
  },
  {
    id: 3,
    risk: 'Single source database outage stalls downstream sync',
    likelihood: 'Low',
    impact: 'Medium',
    mitigation: 'Debezium offset tracking allows automatic seamless resume on DB recovery',
    owner: 'DBA Team + DevOps',
    timeline: 'Implemented',
    status: 'Ongoing Governance'
  },
  {
    id: 4,
    risk: 'Schema drift breaks downstream ODS ingest',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Schema Registry enforces backward compatibility contracts on all CDC topics',
    owner: 'Data Governance',
    timeline: 'Active',
    status: 'Ongoing Governance'
  },
  {
    id: 5,
    risk: 'Insider threat without forensic trail',
    likelihood: 'Low',
    impact: 'High',
    mitigation: 'Centralized ELK/Loki audit logging + fine-grained per-topic ACLs',
    owner: 'Information Security',
    timeline: 'Q2–Q3 2027',
    status: 'Planned Phase 1'
  }
];

export const SECURITY_PHASES: SecurityPhase[] = [
  {
    phase: 1,
    title: 'Phase 1: In-Transit TLS & SASL/SCRAM',
    scope: 'Encrypt all network communications (clients, inter-broker, Connect, Schema Registry) & enforce username/password auth.',
    timeline: 'Q1 2027 (Jan – Feb)',
    cost: '$0 software license (OSS) + internal engineering effort',
    priority: 'P0',
    complianceImpact: ['NCA ECC-1 2.4 (Encryption)', 'ISO 27001 A.10.1 (Cryptographic Controls)'],
    deliverables: [
      'Internal PKI or cert-manager generated TLS certificates for all 3 nodes',
      'Dual-listener configuration (Port 9093 SSL/SASL_SSL)',
      'SASL/SCRAM-SHA-512 authentication credentials for Debezium & Sink accounts'
    ]
  },
  {
    phase: 2,
    title: 'Phase 2: Enterprise Secrets Management',
    scope: 'Eliminate plaintext database credentials in Docker compose and config files using HashiCorp Vault.',
    timeline: 'Q1–Q2 2027 (Feb – Apr)',
    cost: 'Vault server allocation + optional enterprise support license',
    priority: 'P1',
    complianceImpact: ['SAMA CSF 3.2.1 (Credential Management)', 'ISO 27001 A.9.4'],
    deliverables: [
      'HashiCorp Vault agent sidecar integration with Kafka Connect',
      'Dynamic short-lived credentials for Oracle, SQL Server, Postgres source DBs',
      'Automated 90-day credential rotation without pipeline downtime'
    ]
  },
  {
    phase: 3,
    title: 'Phase 3: Centralized Audit Logging',
    scope: 'Deploy forensic audit trail capturing every producer, consumer, schema mutation, and administrative operation.',
    timeline: 'Q2 2027 (Apr – May)',
    cost: 'Central log aggregator storage (ELK / Grafana Loki)',
    priority: 'P1',
    complianceImpact: ['NCA ECC-1 2.8 (Audit Logs)', 'SAMA CSF 3.4 (Log Retention 1 Year)'],
    deliverables: [
      'Kafka authorizer audit logs streamed to centralized SIEM/Loki',
      'Immutable retention policies with tamper-evident log integrity',
      'Alert triggers on unauthorized topic access or connection anomalies'
    ]
  },
  {
    phase: 4,
    title: 'Phase 4: Granular RBAC & Per-Topic ACLs',
    scope: 'Transition from network-level perimeter trust to zero-trust per-topic, per-group read/write access control lists.',
    timeline: 'Q3 2027 (May – Jul)',
    cost: '$0 software license (Kafka native ACLs) + policy definition',
    priority: 'P1',
    complianceImpact: ['ISO 27001 A.9.1 (Access Control Policy)', 'NCA ECC-1 2.1'],
    deliverables: [
      'Topic-level ACL matrix mapped to data classification levels',
      'Producer identity restrictions (only designated Debezium accounts can publish to source topics)',
      'Consumer group scoping (prevent cross-department data exposure)'
    ]
  }
];

export const TALKING_POINTS = [
  {
    q: 'What is Kafka?',
    a: 'A distributed platform for moving data between systems in real time. Instead of batch transfers overnight, every change is captured and delivered within milliseconds.'
  },
  {
    q: 'Why do we need this?',
    a: 'Ten business systems need to share data with the Operational Data Store. Kafka replaces fragile custom point-to-point integrations with a single, highly reliable pipeline.'
  },
  {
    q: 'How much does it cost?',
    a: 'The software is free and open-source. The investment is in server capacity (VM expansion) and security hardening — modest relative to the millions in enterprise value.'
  },
  {
    q: 'What could go wrong?',
    a: 'Two things: (1) undersized hardware — we have mitigations active and a plan to expand; (2) security gaps — we have a clear 4-phase roadmap to close them.'
  },
  {
    q: 'How long until production?',
    a: 'The cluster is live today! CDC onboarding can begin immediately once capacity expansion is approved — targeting 30 days.'
  },
  {
    q: 'Who owns this?',
    a: 'Platform Engineering owns the cluster. DevOps runs day-2 operations. DBA owns source/target accounts. Security owns hardening. Network owns firewalls.'
  },
  {
    q: 'What is the ROI?',
    a: '2–3 FTE-equivalent savings per year in eliminated manual ETL maintenance, plus business value from real-time data enabling faster, accurate decisions.'
  }
];
