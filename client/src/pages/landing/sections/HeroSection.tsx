import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import type { Variants } from "framer-motion";

// Static chat mockup data — no real data fetched
const MOCK_MESSAGES = [
  { id: 1, sender: "Alex", avatar: "A", text: "Hey team! Just pushed the new feature 🚀", time: "09:41", own: false, color: "bg-violet-500" },
  { id: 2, sender: "You", avatar: "Y", text: "Looks great! Running tests now.", time: "09:42", own: true, color: "bg-indigo-500" },
  { id: 3, sender: "Sara", avatar: "S", text: "The UI looks polished 🔥 nice work!", time: "09:43", own: false, color: "bg-cyan-500" },
  { id: 4, sender: "You", avatar: "Y", text: "Thanks! Video call in 5?", time: "09:44", own: true, color: "bg-indigo-500" },
  { id: 5, sender: "Alex", avatar: "A", text: "Sure, joining now 👍", time: "09:44", own: false, color: "bg-violet-500" },
];

const ONLINE_USERS = [
  { name: "Alex", color: "bg-violet-500" },
  { name: "Sara", color: "bg-cyan-500" },
  { name: "Mike", color: "bg-amber-500" },
  { name: "Priya", color: "bg-pink-500" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function HeroSection() {
  const navigate = useNavigate();

  const handleViewFeatures = () => {
    document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-10 overflow-hidden bg-[#0a0e17]">
      {/* Background radial glows — CSS only, no JS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-violet-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <m.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <m.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/25 text-violet-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Production-Ready Full-Stack App
              </span>
            </m.div>

            {/* Headline */}
            <m.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
            >
              Real-Time Communication{" "}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Built for Modern Teams
              </span>
            </m.h1>

            {/* Subheadline */}
            <m.p
              variants={fadeUp}
              className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              Blink Chat delivers instant messaging, presence tracking, media
              sharing, and peer-to-peer video calling with a production-ready
              architecture.
            </m.p>

            {/* CTAs */}
            <m.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <button
                id="hero-get-started-btn"
                onClick={() => void navigate("/login")}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0e17]"
              >
                Get Started
              </button>
              <button
                id="hero-features-btn"
                onClick={handleViewFeatures}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0a0e17]"
              >
                View Features
              </button>
            </m.div>
          </m.div>

          {/* Right — chat mockup */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            {/* Glow ring behind the mockup */}
            <div className="absolute inset-0 bg-violet-600/10 rounded-3xl blur-2xl scale-95" />

            {/* Chat window */}
            <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d1220]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-[#111827]/60">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-gray-400 font-medium"># general</span>
                </div>
                {/* Live badge */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-400 font-medium">Live</span>
                </div>
              </div>

              {/* Online users bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-[#0d1220]/40">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Online</span>
                <div className="flex -space-x-1.5">
                  {ONLINE_USERS.map((u) => (
                    <div
                      key={u.name}
                      className={`w-5 h-5 rounded-full ${u.color} border border-[#0d1220] flex items-center justify-center text-[8px] font-bold text-white`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500">{ONLINE_USERS.length} online</span>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-3 px-4 py-4">
                {MOCK_MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.own ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${msg.color} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}
                    >
                      {msg.avatar}
                    </div>
                    <div className={`flex flex-col gap-0.5 max-w-[78%] ${msg.own ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-3 py-1.5 rounded-2xl text-xs text-white leading-relaxed ${
                          msg.own
                            ? "bg-violet-600 rounded-tr-sm"
                            : "bg-[#1e2a3a] border border-white/5 rounded-tl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-gray-600">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div className="px-4 py-3 border-t border-white/5 bg-[#0d1220]/60">
                <div className="flex items-center gap-2 bg-[#1a2030] rounded-xl px-3 py-2 border border-white/5">
                  <span className="text-[11px] text-gray-500 flex-1">Type a message…</span>
                  <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white rotate-90" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11a1 1 0 112 0v5.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
