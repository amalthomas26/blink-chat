import { useRef } from "react";
import { m, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

interface TechItem {
  name: string;
  description: string;
  color: string;
  textColor: string;
  border: string;
}

interface TechCategory {
  category: string;
  icon: React.ReactNode;
  items: TechItem[];
}

const TECH_STACK: TechCategory[] = [
  {
    category: "Frontend",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { name: "React 19", description: "UI library", color: "bg-cyan-500/10", textColor: "text-cyan-300", border: "border-cyan-500/20" },
      { name: "TypeScript", description: "Type safety", color: "bg-blue-500/10", textColor: "text-blue-300", border: "border-blue-500/20" },
      { name: "Tailwind CSS", description: "Utility-first styling", color: "bg-teal-500/10", textColor: "text-teal-300", border: "border-teal-500/20" },
      { name: "Zustand", description: "State management", color: "bg-orange-500/10", textColor: "text-orange-300", border: "border-orange-500/20" },
      { name: "Vite", description: "Build tool", color: "bg-purple-500/10", textColor: "text-purple-300", border: "border-purple-500/20" },
    ],
  },
  {
    category: "Backend",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4" />
      </svg>
    ),
    items: [
      { name: "Node.js", description: "Runtime", color: "bg-green-500/10", textColor: "text-green-300", border: "border-green-500/20" },
      { name: "Express", description: "HTTP server", color: "bg-gray-500/10", textColor: "text-gray-300", border: "border-gray-500/20" },
      { name: "Socket.IO", description: "Real-time events", color: "bg-violet-500/10", textColor: "text-violet-300", border: "border-violet-500/20" },
      { name: "WebRTC", description: "P2P video calls", color: "bg-pink-500/10", textColor: "text-pink-300", border: "border-pink-500/20" },
    ],
  },
  {
    category: "Database",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
      </svg>
    ),
    items: [
      { name: "MongoDB", description: "Primary database", color: "bg-green-500/10", textColor: "text-green-300", border: "border-green-500/20" },
      { name: "Mongoose", description: "ODM layer", color: "bg-red-500/10", textColor: "text-red-300", border: "border-red-500/20" },
      { name: "GridFS / S3", description: "Media storage", color: "bg-amber-500/10", textColor: "text-amber-300", border: "border-amber-500/20" },
    ],
  },
  {
    category: "Infrastructure",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    items: [
      { name: "Docker", description: "Containerisation", color: "bg-blue-500/10", textColor: "text-blue-300", border: "border-blue-500/20" },
      { name: "AWS EC2", description: "Cloud hosting", color: "bg-orange-500/10", textColor: "text-orange-300", border: "border-orange-500/20" },
      { name: "Nginx", description: "Reverse proxy", color: "bg-green-500/10", textColor: "text-green-300", border: "border-green-500/20" },
      { name: "Cloudflare", description: "CDN & DDoS protection", color: "bg-orange-400/10", textColor: "text-orange-200", border: "border-orange-400/20" },
    ],
  },
];

const colVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tech-stack" className="py-24 bg-[#080c14] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built with Industry-Standard Technologies
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Every layer of the stack is chosen for performance, scalability, and developer experience.
          </p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TECH_STACK.map((cat, i) => (
            <m.div
              key={cat.category}
              custom={i}
              variants={colVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex flex-col gap-4"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-white">{cat.category}</span>
              </div>

              {/* Tech badges */}
              <div className="flex flex-col gap-2">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border ${tech.color} ${tech.border} group hover:border-white/15 transition-colors duration-200`}
                  >
                    <span className={`text-sm font-medium ${tech.textColor}`}>{tech.name}</span>
                    <span className="text-[10px] text-gray-600 group-hover:text-gray-500 transition-colors">{tech.description}</span>
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
