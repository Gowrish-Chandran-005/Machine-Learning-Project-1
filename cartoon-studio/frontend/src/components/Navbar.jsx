import { motion } from 'framer-motion'
import { Sparkles, Moon, Sun } from 'lucide-react'

export default function Navbar({ theme, setTheme }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7C6EF8, #2DD4BF)' }}>
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="font-semibold text-[15px] tracking-tight">AI Cartoon Studio</span>
      </div>

      <div className="flex items-center gap-3">
        <a href="#features" className="text-sm text-[#888] hover:text-white transition-colors hidden md:block">Features</a>
        <a href="https://github.com" target="_blank" rel="noreferrer"
          className="text-sm text-[#888] hover:text-white transition-colors hidden md:block">GitHub</a>
        <button
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg btn-secondary text-[#888] hover:text-white"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </motion.nav>
  )
}
