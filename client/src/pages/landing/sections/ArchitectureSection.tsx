import { useRef } from "react";
import { m, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

interface ArchNode {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  border: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: "user",
    label: "User",
    description: "Browser / Mobile",
    color: "bg-violet-500/15",
    textColor: "text-violet-300",
    border: "border-violet-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-2a6 6 0 0112 0v2" />
      </svg>
    ),
  },
  {
    id: "cloudflare",
    label: "Cloudflare",
    description: "CDN · DDoS Protection",
    color: "bg-orange-500/15",
    textColor: "text-orange-300",
    border: "border-orange-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: "nginx",
    label: "Nginx",
    description: "Reverse Proxy · SSL",
    color: "bg-green-500/15",
    textColor: "text-green-300",
    border: "border-green-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    id: "docker",
    label: "Docker Containers",
    description: "Isolated Services",
    color: "bg-blue-500/15",
    textColor: "text-blue-300",
    border: "border-blue-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
        <line x1="8" y1="12" x2="8" y2="16" strokeLinecap="round" />
        <line x1="16" y1="12" x2="16" y2="16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "nodejs",
    label: "Node.js API",
    description: "Express · Socket.IO",
    color: "bg-emerald-500/15",
    textColor: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
  {
    id: "mongodb",
    label: "MongoDB",
    description: "Primary Database",
    color: "bg-green-600/15",
    textColor: "text-green-300",
    border: "border-green-600/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
      </svg>
    ),
  },
];

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.1, ease: "easeOut" },
  }),
};

function ArrowDown() {
  return (
    <div className="flex flex-col items-center gap-0 py-1">
      {/* Animated dashed line */}
      <div className="w-px h-6 bg-gradient-to-b from-violet-500/50 to-transparent relative overflow-hidden">
        <m.div
          className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-violet-400/70 to-transparent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <svg className="w-3 h-3 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export function ArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="architecture" className="py-24 bg-[#0a0e17] relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-4">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Production-Ready Architecture
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            A battle-tested deployment pipeline from the user's browser to the database layer.
          </p>
        </div>

        <div ref={ref} className="flex flex-col items-center gap-0 max-w-md mx-auto">
          {ARCH_NODES.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center w-full">
              <m.div
                custom={i}
                variants={nodeVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border ${node.color} ${node.border} hover:brightness-110 transition-all duration-200`}
              >
                <div className={`${node.textColor} shrink-0`}>{node.icon}</div>
                <div>
                  <p className={`text-sm font-semibold ${node.textColor}`}>{node.label}</p>
                  <p className="text-xs text-gray-500">{node.description}</p>
                </div>
              </m.div>

              {/* Arrow between nodes */}
              {i < ARCH_NODES.length - 1 && <ArrowDown />}
            </div>
          ))}
        </div>

        {/* Side annotations */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {[
            { label: "HTTPS / TLS", icon: "🔒" },
            { label: "WebSocket", icon: "⚡" },
            { label: "Docker Compose", icon: "🐳" },
            { label: "AWS EC2", icon: "☁️" },
          ].map((tag) => (
            <div
              key={tag.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/8 text-xs text-gray-400"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
