import { ProfileData, SkillItem, ProjectItem, ArchitectureNode } from '../types';

export const profileConfig: ProfileData = {
  name: "Omik",
  role: "DevOps & Platform Systems Engineer",
  eyebrow: "INFRASTRUCTURE · AUTOMATION · RELIABILITY",
  headline: "Engineering the invisible.",
  supportingCopy: "I build reliable infrastructure, automate complex workflows, and engineer systems designed to scale through AI-driven automation.",
  location: "Bogura, Bangladesh (Available Worldwide)",
  status: "ONLINE — ALL SYSTEMS OPERATIONAL",
  aboutPhilosophy: "Infrastructure is not an afterthought; it is the foundation of digital survivability. From provisioning bare metal to automated container orchestration and telemetry, every system must be reproducible, observable, and hardened.",
  aboutHighlights: [
    "Linux system administration & kernel telemetry",
    "Zero-downtime blue/green deployment pipelines",
    "Self-healing containerized orchestration with Docker & Kubernetes",
    "Full-stack observability with Prometheus & Grafana",
    "Automated workflow engineering using n8n & LLM agents"
  ]
};

export const skillsConfig: SkillItem[] = [
  // INFRASTRUCTURE
  { name: "Linux System Administration", description: "Kernel internals, systemd services, filesystem tuning, cgroups, process isolation", category: "INFRASTRUCTURE" },
  { name: "Networking & BGP/DNS", description: "TCP/IP socket architecture, iptables/nftables, CIDR subnetting, DNSSEC", category: "INFRASTRUCTURE" },
  { name: "Reverse Proxies (Nginx & Caddy)", description: "High-performance reverse proxying, SSL/TLS offloading, load balancing, rate limiting", category: "INFRASTRUCTURE" },
  { name: "TLS & Cryptography", description: "Automated Let's Encrypt renewal, mTLS communication, modern cipher suites", category: "INFRASTRUCTURE" },

  // CONTAINERS & ORCHESTRATION
  { name: "Docker & Containerization", description: "Multi-stage minimal image builds, daemon tuning, layer caching, rootless runtime", category: "CONTAINERS & ORCHESTRATION" },
  { name: "Docker Compose", description: "Declarative multi-container networking, persistent volumes, environment templating", category: "CONTAINERS & ORCHESTRATION" },
  { name: "Kubernetes Platform", description: "Pod scheduling, ingress controllers, ConfigMaps, Secrets, stateful sets", category: "CONTAINERS & ORCHESTRATION" },

  // AUTOMATION & DELIVERY
  { name: "CI/CD Pipelines", description: "Automated test runner, container image registries, blue-green deployment pipelines", category: "AUTOMATION & DELIVERY" },
  { name: "Bash & POSIX Shell", description: "Idempotent shell scripting, automated system provisioning, incident mitigation scripts", category: "AUTOMATION & DELIVERY" },
  { name: "Python Automation", description: "Infrastructure SDKs, REST API automation, telemetry scraping, automated alert handlers", category: "AUTOMATION & DELIVERY" },
  { name: "Git Workflow & GitOps", description: "Declarative infrastructure syncing, atomic branch strategies, commit audit trails", category: "AUTOMATION & DELIVERY" },
  { name: "Infrastructure as Code", description: "Reproducible configuration management, automated state verification (SaltStack/Terraform)", category: "AUTOMATION & DELIVERY" },

  // OBSERVABILITY
  { name: "Prometheus Monitoring", description: "Time-series metric collection, PromQL queries, Node Exporter, alert rules", category: "OBSERVABILITY" },
  { name: "Grafana Dashboards", description: "Real-time visual telemetry, SLO/SLA dashboards, alert thresholds, multi-source panels", category: "OBSERVABILITY" },
  { name: "Distributed Logging", description: "Centralized log aggregation, log rotation, journalctl tracing, structured JSON logs", category: "OBSERVABILITY" },

  // CLOUD & PLATFORM ENGINEERING
  { name: "Cloud Infrastructure & VPS", description: "Bare metal & cloud VPS lifecycle management, firewall policies, storage attach", category: "CLOUD & PLATFORM ENGINEERING" },
  { name: "High Availability Systems", description: "Failover clustering, HAProxy redundancy, health check daemons, zero-single-point-of-failure", category: "CLOUD & PLATFORM ENGINEERING" },

  // AI & WORKFLOW AUTOMATION
  { name: "n8n Workflow Automation", description: "Event-driven workflow orchestration, webhook triggers, multi-system integration", category: "AI & WORKFLOW AUTOMATION" },
  { name: "LLM Agent Integration", description: "Embedding autonomous agents into DevOps troubleshooting, intelligent incident routing", category: "AI & WORKFLOW AUTOMATION" }
];

export const projectsConfig: ProjectItem[] = [
  {
    id: "proj-platform",
    title: "High-Availability E-Commerce & CMS Cloud Platform",
    badge: "INFRASTRUCTURE",
    problemStatement: "Monolithic web applications required zero-downtime updates, resilient database failover, and high-concurrency traffic routing under peak load.",
    architectureSolution: "Containerized multi-tier architecture featuring HAProxy/Nginx edge load balancers, headless React SPA frontend, isolated backend containers, and SaltStack automated orchestration.",
    technologies: ["Docker", "Nginx", "SaltStack", "HAProxy", "Linux", "CI/CD"],
    engineeringDecisions: [
      "Decoupled edge TLS termination from internal microservices to reduce worker latency",
      "Implemented automated database replica failover with zero manual intervention required",
      "Containerized stateful assets onto dedicated encrypted storage volumes"
    ],
    securityConsiderations: [
      "Strict network segmentation using isolated Docker bridge networks",
      "Automated SSL/TLS certificate rotation via ACME protocol",
      "WAF rate-limiting headers applied at the proxy perimeter"
    ],
    githubUrl: "https://github.com/syntax-error-root/portfolio",
    liveUrl: "https://omik.dev"
  },
  {
    id: "proj-observability",
    title: "Observability-First Telemetry & Alerting Hub",
    badge: "OBSERVABILITY",
    problemStatement: "Lack of centralized visibility led to silent system degradation and delayed mean-time-to-detection (MTTD) during production traffic spikes.",
    architectureSolution: "Multi-node Prometheus cluster scraping node metrics, cAdvisor container stats, and custom application exporters, visualized on high-density Grafana telemetry dashboards.",
    technologies: ["Prometheus", "Grafana", "Node Exporter", "Docker", "Alertmanager"],
    engineeringDecisions: [
      "Targeted 15-second metric scrape intervals with optimized TSDB compaction",
      "Constructed custom PromQL alerting rules based on 95th percentile latency anomalies",
      "Integrated automatic webhook triggers into internal communication channels"
    ],
    securityConsiderations: [
      "Metrics endpoints restricted via mTLS and network ACLs",
      "Grafana RBAC permissions enforcing read-only access for observability staff"
    ],
    githubUrl: "https://github.com/syntax-error-root/portfolio"
  },
  {
    id: "proj-ai-agent",
    title: "Autonomous AI-Driven DevOps Troubleshooting Agent",
    badge: "AI AUTOMATION",
    problemStatement: "Repetitive diagnostic tasks during on-call incidents consumed senior engineering bandwidth and slowed response velocity.",
    architectureSolution: "Autonomous n8n workflow engine connected to LLM tool-calling APIs, ingesting production error webhooks, querying journalctl/Prometheus, and generating root-cause hypotheses.",
    technologies: ["n8n", "Python", "LLMs", "Docker", "Prometheus API", "Webhooks"],
    engineeringDecisions: [
      "Sandboxed diagnostic execution to read-only log inspection without write permissions",
      "Engineered structured incident summary generation formatted directly for SRE handoff"
    ],
    securityConsiderations: [
      "API keys stored in hardware-backed environment vaults",
      "Zero customer data transmitted to model context; sanitized diagnostic tokens only"
    ],
    githubUrl: "https://github.com/syntax-error-root/portfolio"
  }
];

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "net-client",
    name: "Public Internet & Clients",
    layer: "Internet",
    role: "Global ingress source generating user HTTPS requests",
    tech: ["HTTP/2", "HTTP/3", "QUIC", "TCP"],
    reliabilityTip: "Implement Anycast IP routing and Geo-DNS to steer traffic away from degraded edge regions.",
    securityTip: "Enforce strict DDoS mitigation and SYN flood protection at perimeter edge.",
    position: [-6, 2, 0]
  },
  {
    id: "net-dns",
    name: "Authoritative Anycast DNS",
    layer: "DNS",
    role: "Resolves domain requests to nearest healthy perimeter ingress node",
    tech: ["DNSSEC", "Cloudflare", "Route 53", "BIND9"],
    reliabilityTip: "Low TTL policies during cutovers enable rapid rollback within 60 seconds.",
    securityTip: "DNSSEC cryptographic signing prevents cache poisoning and man-in-the-middle attacks.",
    position: [-3.5, 2, 0]
  },
  {
    id: "net-proxy",
    name: "Reverse Proxy & Edge Ingress",
    layer: "Reverse Proxy",
    role: "TLS termination, HTTP request routing, rate limiting, and gzip/brotli compression",
    tech: ["Nginx", "Caddy", "HAProxy", "Let's Encrypt"],
    reliabilityTip: "Active upstream health checks dynamically eject failing backend pods from the pool.",
    securityTip: "Modern TLS 1.3 cipher suite enforcement and strict Content-Security-Policy (CSP) headers.",
    position: [-1, 2, 0]
  },
  {
    id: "app-containers",
    name: "Application Containers & Services",
    layer: "Application",
    role: "Stateless container workloads executing API requests and processing queues",
    tech: ["Docker", "Kubernetes", "Node.js", "Python", "Go"],
    reliabilityTip: "Configure pod disruption budgets and graceful SIGTERM handling to allow zero-downtime rolling deploys.",
    securityTip: "Enforce non-root execution, read-only root filesystems, and strict memory limits.",
    position: [1.5, 2, 0]
  },
  {
    id: "storage-db",
    name: "Distributed Storage & Databases",
    layer: "Databases",
    role: "ACID-compliant relational storage, caching layer, and persistent volumes",
    tech: ["PostgreSQL", "Redis", "WAL Archiving", "ZFS"],
    reliabilityTip: "Continuous WAL archiving with automated replica recovery prevents catastrophic data loss.",
    securityTip: "Encryption at rest (AES-256) and segregated private subnet isolation with no public IP exposure.",
    position: [4, 2, 0]
  },
  {
    id: "obs-telemetry",
    name: "Observability & Alert Telemetry",
    layer: "Monitoring",
    role: "Time-series metrics collection, distributed tracing, and automated alert dispatch",
    tech: ["Prometheus", "Grafana", "Node Exporter", "Alertmanager"],
    reliabilityTip: "Separate monitoring network preventing metric loss during application saturation.",
    securityTip: "Dedicated service accounts with read-only metrics scraping privileges.",
    position: [6.5, 2, 0]
  }
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about         - Systems engineer profile & engineering philosophy
  skills        - Technical expertise and platform competencies
  projects      - Infrastructure case studies and deployed systems
  architecture  - Real-time 3D system architecture lab breakdown
  contact       - Secure communication coordinates
  clear         - Wipe terminal buffer`,
  
  about: `[PROFILE: Omik]
Role: DevOps & Platform Systems Engineer
Location: Bogura, Bangladesh (UTC+6)
Focus: Engineering resilient, automated, observable cloud-native platforms.
Core Belief: "Automate complexity away. Make failure states predictable and recovery deterministic."`,

  skills: `[TECHNICAL COMPETENCIES]
- Infrastructure: Linux Kernel internals, Nginx, Caddy, SSL/TLS, TCP/IP
- Containers: Docker, Docker Compose, Kubernetes, Containerd
- Automation: CI/CD Pipelines, Bash, Python, GitOps, SaltStack
- Observability: Prometheus, Grafana, Alertmanager, Structured Logging
- AI Platforms: n8n Workflow Automation, LLM Autonomous Agents`,

  projects: `[INFRASTRUCTURE CASE STUDIES]
1. High-Availability E-Commerce & CMS Cloud Platform (Docker, Nginx, SaltStack)
2. Observability-First Telemetry Hub (Prometheus, Grafana, Alertmanager)
3. Autonomous AI-Driven DevOps Troubleshooting Agent (n8n, Python, LLMs)
Type 'projects' in web view to inspect comprehensive architecture diffs.`,

  architecture: `[SYSTEM ARCHITECTURE LAB ACTIVE]
Visualizing distributed flow:
Internet -> Anycast DNS -> Edge Reverse Proxy -> Application Containers -> Distributed DB -> Telemetry
Select any node in the Architecture 3D Lab to inspect failure domains and security rules.`,

  contact: `[COORDINATES]
Email: default13789@gmail.com
GitHub: https://github.com/syntax-error-root
LinkedIn: https://linkedin.com/in/omik-dev
Status: Open for mission-critical infrastructure roles and cloud engineering projects.`
};
