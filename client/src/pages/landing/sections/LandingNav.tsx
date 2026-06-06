import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlinkChatLogo } from "../../../components/ui/BlinkChatLogo";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Architecture", href: "#architecture" },
  { label: "Screenshots", href: "#screenshots" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e17]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
          aria-label="Blink Chat home"
        >
          <BlinkChatLogo size={34} animated />
          <span className="text-white font-bold text-lg tracking-tight group-hover:text-violet-300 transition-colors duration-200">
            Blink<span className="text-violet-400">Chat</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleAnchor(link.href)}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-login-btn"
            onClick={() => void navigate("/login")}
            className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
          >
            Login
          </button>
          <button
            id="nav-signup-btn"
            onClick={() => void navigate("/signup")}
            className="text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-violet-900/40 hover:shadow-violet-700/50 hover:scale-[1.02] active:scale-95"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-menu-btn"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-[#0d1220]/95 backdrop-blur-xl border-b border-white/5 px-4 pb-4 pt-2 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleAnchor(link.href)}
              className="text-sm text-gray-300 hover:text-white py-2 text-left transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { setMenuOpen(false); void navigate("/login"); }}
              className="flex-1 text-sm text-gray-300 border border-white/10 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={() => { setMenuOpen(false); void navigate("/signup"); }}
              className="flex-1 text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-lg transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
