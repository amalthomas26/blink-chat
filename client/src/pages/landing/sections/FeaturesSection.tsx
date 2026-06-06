import { useRef } from "react";
import { m, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  gradient: string;
  iconBg: string;
}

const FEATURES: Feature[] = [
  {
    id: "real-time-messaging",
    title: "Real-Time Messaging",
    description: "Lightning-fast message delivery with zero perceptible latency.",
    bullets: ["Instant delivery via Socket.IO", "Message reactions & replies", "Read receipts & timestamps"],
    gradient: "from-violet-500/10 to-indigo-500/5",
    iconBg: "bg-violet-500/15 text-violet-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: "presence-system",
    title: "Presence System",
    description: "Always know who's available with real-time online/offline tracking.",
    bullets: ["Online / offline indicators", "Last seen timestamps", "Typing indicators"],
    gradient: "from-green-500/10 to-emerald-500/5",
    iconBg: "bg-green-500/15 text-green-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-2a6 6 0 0112 0v2" />
      </svg>
    ),
  },
  {
    id: "media-sharing",
    title: "Media Sharing",
    description: "Share images and files in conversations instantly.",
    bullets: ["Image uploads & previews", "File attachments", "Compressed thumbnails"],
    gradient: "from-cyan-500/10 to-blue-500/5",
    iconBg: "bg-cyan-500/15 text-cyan-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
    ),
  },
  {
    id: "video-calling",
    title: "Video Calling",
    description: "Crystal-clear peer-to-peer video calls powered by WebRTC.",
    bullets: ["P2P WebRTC video calls", "Screen sharing capable", "In-app call controls"],
    gradient: "from-indigo-500/10 to-purple-500/5",
    iconBg: "bg-indigo-500/15 text-indigo-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.866v6.268a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "secure-auth",
    title: "Secure Authentication",
    description: "Enterprise-grade security protecting every user session.",
    bullets: ["JWT access tokens", "Refresh token rotation", "2FA & Google OAuth"],
    gradient: "from-amber-500/10 to-orange-500/5",
    iconBg: "bg-amber-500/15 text-amber-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "responsive-design",
    title: "Responsive Experience",
    description: "Seamlessly adapts from mobile to large desktop displays.",
    bullets: ["Mobile-first layout", "Adaptive sidebar", "Touch-friendly UI"],
    gradient: "from-pink-500/10 to-rose-500/5",
    iconBg: "bg-pink-500/15 text-pink-400",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
      </svg>
    ),
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" },
  }),
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={`group relative rounded-2xl border border-white/8 bg-gradient-to-br ${feature.gradient} p-6 hover:border-white/15 transition-all duration-300 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5`}
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.02]" />

      <div className={`inline-flex p-2.5 rounded-xl ${feature.iconBg} mb-4`}>
        {feature.icon}
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-gray-400 mb-3 leading-relaxed">{feature.description}</p>
      <ul className="flex flex-col gap-1.5">
        {feature.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </m.div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything a Modern Chat App Needs
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Built with production-grade patterns to handle real-world communication at scale.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
