import { motion } from 'framer-motion'
import { ArrowRight, Play, Wand2 } from 'lucide-react'

const floatingCards = [
  { label: 'Original', emoji: '🖼️', delay: 0, x: -20, y: 0 },
  { label: 'Cartoon', emoji: '🎨', delay: 0.5, x: 20, y: -10 },
  { label: 'AI Magic', emoji: '✨', delay: 1, x: 0, y: 15 },
]

export default function HeroSection({ onUploadClick }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,110,248,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(45,212,191,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 px-4 py-1.5 rounded-full glass text-xs font-medium tracking-wide flex items-center gap-2"
        style={{ border: '1px solid rgba(124,110,248,0.3)', color: '#A78BFA' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#7C6EF8] animate-pulse inline-block" />
        Powered by OpenCV · Flask · React
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-center text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-3xl"
      >
        <span className="text-white">AI Cartoon</span>
        <br />
        <span className="gradient-text glow-text">Studio</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6 text-center text-[#888] text-lg max-w-xl leading-relaxed"
      >
        Transform ordinary photos into stunning cartoon artwork using
        OpenCV's edge detection, color quantization, and bilateral filtering.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row gap-3 items-center"
      >
        <button onClick={onUploadClick} className="btn-primary flex items-center gap-2 text-white">
          <Wand2 size={16} />
          Upload & Cartoonize
          <ArrowRight size={16} />
        </button>
        <a href="#features" className="btn-secondary flex items-center gap-2 text-[#ccc]">
          <Play size={14} />
          See How It Works
        </a>
      </motion.div>

      {/* Floating cards */}
      <div className="relative mt-16 flex gap-4 justify-center">
        {floatingCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: card.y }}
            transition={{
              delay: 0.6 + i * 0.15,
              y: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 3 + i * 0.5,
                delay: card.delay,
                ease: 'easeInOut'
              }
            }}
            className="glass rounded-2xl p-4 flex flex-col items-center gap-1 min-w-[80px]"
            style={{
              border: '1px solid rgba(124,110,248,0.2)',
              transform: `translateX(${card.x}px)`
            }}
          >
            <span className="text-2xl">{card.emoji}</span>
            <span className="text-xs text-[#888]">{card.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#555]">Scroll to begin</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-6 rounded-full"
          style={{ background: 'linear-gradient(to bottom, #7C6EF8, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
