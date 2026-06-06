import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";

export function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#080c14] relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <m.div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-violet-700/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-indigo-700/15 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Top + bottom accent lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/25 text-violet-300 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Ready to Explore
        </m.div>

        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight"
        >
          Experience{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Blink Chat
          </span>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="text-base sm:text-lg text-gray-400 mb-10 leading-relaxed"
        >
          Explore a modern real-time communication platform built with scalable
          technologies and production-grade practices.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            id="final-cta-login-btn"
            onClick={() => void navigate("/login")}
            className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/50 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#080c14]"
          >
            Login to Continue
          </button>
          <button
            id="final-cta-signup-btn"
            onClick={() => void navigate("/signup")}
            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#080c14]"
          >
            Create Account
          </button>
        </m.div>
      </div>
    </section>
  );
}
