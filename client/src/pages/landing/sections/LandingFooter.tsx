import { BlinkChatLogo } from "../../../components/ui/BlinkChatLogo";

const GITHUB_URL = "https://github.com/amalthomas26/blink-chat";

export function LandingFooter() {
  return (
    <footer className="bg-[#060a12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <BlinkChatLogo size={30} />
            <div>
              <p className="text-sm font-bold text-white">BlinkChat</p>
              <p className="text-[11px] text-gray-500">Real-Time Communication Platform</p>
            </div>
          </div>

          {/* Tech credits */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Built with{" "}
              <span className="text-cyan-400/80">React 19</span>
              {" · "}
              <span className="text-green-400/80">Node.js</span>
              {" · "}
              <span className="text-violet-400/80">Socket.IO</span>
              {" · "}
              <span className="text-emerald-400/80">MongoDB</span>
            </p>
            <p className="text-[11px] text-gray-600 mt-1">
              Deployed on AWS EC2 · Cloudflare · Docker
            </p>
          </div>

          {/* GitHub link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-github-link"
            aria-label="View source on GitHub"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200 text-sm group"
          >
            {/* GitHub SVG icon */}
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            <span>View on GitHub</span>
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} BlinkChat · Full-Stack Portfolio Project
          </p>
          <p className="text-[11px] text-gray-600">
            React · TypeScript · Node.js · MongoDB · Socket.IO · Docker · AWS
          </p>
        </div>
      </div>
    </footer>
  );
}
