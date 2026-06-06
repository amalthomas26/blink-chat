import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

// Real screenshots from client/docs/ — only 3 that display correctly
import loginImg from "../../../assets/screenshots/auth.login.png";
import chatImg from "../../../assets/screenshots/chat.main.png";
import responsiveImg from "../../../assets/screenshots/responsive.chatarea.png";

interface Screenshot {
  id: string;
  label: string;
  description: string;
  src: string;
  tag: string;
}

const SCREENSHOTS: Screenshot[] = [
  {
    id: "login",
    label: "Login Screen",
    description: "Clean authentication UI with Google OAuth, email/password, and 2FA support.",
    src: loginImg,
    tag: "Auth",
  },
  {
    id: "chat",
    label: "Chat Interface",
    description: "Full-featured real-time chat with message reactions, replies, and media sharing.",
    src: chatImg,
    tag: "Core",
  },
  {
    id: "mobile",
    label: "Mobile View",
    description: "Adaptive mobile layout with touch-friendly interactions and bottom navigation.",
    src: responsiveImg,
    tag: "Responsive",
  },
];

export function ScreenshotsSection() {
  const [activeId, setActiveId] = useState<string>(SCREENSHOTS[0].id);
  const active = SCREENSHOTS.find((s) => s.id === activeId) ?? SCREENSHOTS[0];

  return (
    <section id="screenshots" className="py-24 bg-[#0a0e17] relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-700/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-4">
            Screenshots
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See It in Action
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Real screenshots from the live application — no mockups.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SCREENSHOTS.map((s) => (
            <button
              key={s.id}
              id={`screenshot-tab-${s.id}`}
              onClick={() => setActiveId(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeId === s.id
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/50"
                  : "bg-white/5 text-gray-400 hover:bg-white/8 hover:text-white border border-white/8"
              }`}
            >
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  activeId === s.id ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"
                }`}
              >
                {s.tag}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Screenshot display */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <m.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              {/* Device frame */}
              <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60 bg-[#0d1220]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111827] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-[#1a2030] rounded-md px-3 py-1 text-[11px] text-gray-500 text-center max-w-xs mx-auto">
                      blinkchat.app
                    </div>
                  </div>
                </div>

                {/* Screenshot image */}
                <div className="relative overflow-hidden" style={{ maxHeight: "520px" }}>
                  <img
                    src={active.src}
                    alt={active.label}
                    className="w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d1220] to-transparent" />
                </div>
              </div>

              {/* Caption */}
              <div className="text-center">
                <p className="text-sm font-semibold text-white mb-1">{active.label}</p>
                <p className="text-sm text-gray-400">{active.description}</p>
              </div>
            </m.div>
          </AnimatePresence>

          {/* Glow border ring */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
