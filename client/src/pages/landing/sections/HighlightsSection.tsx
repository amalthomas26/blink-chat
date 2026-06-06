import { useRef } from "react";
import { m, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

interface Highlight {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  color: string;
  iconBg: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    id: "realtime-messaging",
    title: "Real-Time Messaging",
    description:
      "Messages are delivered instantly via persistent WebSocket connections using Socket.IO — no polling, no delay.",
    tag: "Socket.IO",
    color: "from-violet-500/10 to-transparent",
    iconBg: "bg-violet-500/15 text-violet-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "webrtc-video",
    title: "WebRTC Video Calls",
    description:
      "Direct browser-to-browser video calling using the WebRTC API — low latency, encrypted, no relay server needed.",
    tag: "WebRTC",
    color: "from-indigo-500/10 to-transparent",
    iconBg: "bg-indigo-500/15 text-indigo-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.866v6.268a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "docker",
    title: "Dockerized Deployment",
    description:
      "The entire application — API server, React client, and database — runs in isolated Docker containers via Docker Compose.",
    tag: "Docker",
    color: "from-blue-500/10 to-transparent",
    iconBg: "bg-blue-500/15 text-blue-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    id: "cloud",
    title: "Cloud Hosted Infrastructure",
    description:
      "Deployed on AWS EC2 behind Cloudflare for global CDN caching, DDoS protection, and automatic HTTPS.",
    tag: "AWS · Cloudflare",
    color: "from-orange-500/10 to-transparent",
    iconBg: "bg-orange-500/15 text-orange-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: "responsive",
    title: "Responsive Design",
    description:
      "Mobile-first UI that adapts fluidly from small phones to large desktops using a component-based Tailwind CSS system.",
    tag: "Tailwind CSS",
    color: "from-teal-500/10 to-transparent",
    iconBg: "bg-teal-500/15 text-teal-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: "jwt-security",
    title: "JWT Security",
    description:
      "Short-lived access tokens stored in memory and refresh tokens in httpOnly cookies — silent token rotation on every session.",
    tag: "JWT · httpOnly",
    color: "from-amber-500/10 to-transparent",
    iconBg: "bg-amber-500/15 text-amber-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

function HighlightCard({ item, index }: { item: Highlight; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={`relative rounded-2xl border border-white/8 bg-gradient-to-br ${item.color} p-6 flex flex-col gap-4 group hover:border-white/15 transition-all duration-300 hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between">
        <div className={`inline-flex p-2.5 rounded-xl ${item.iconBg}`}>{item.icon}</div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-gray-500 font-mono">
          {item.tag}
        </span>
      </div>
      <div>
        <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
      </div>
    </m.div>
  );
}

export function HighlightsSection() {
  return (
    <section className="py-24 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-4">
            Application Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Makes This Production-Grade
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Each capability was implemented with real-world scalability and security in mind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIGHLIGHTS.map((item, i) => (
            <HighlightCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
