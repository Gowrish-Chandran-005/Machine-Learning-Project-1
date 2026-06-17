import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Clock, Maximize2, ZoomIn } from 'lucide-react'

const ResultSection = forwardRef(function ResultSection({ result, processingTime }, ref) {
  const [downloaded, setDownloaded] = useState(false)
  const [zoomed, setZoomed] = useState(null)

  const downloadCartoon = () => {
    const link = document.createElement('a')
    link.href = result.cartoon
    link.download = 'cartoon_output.png'
    link.click()
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  const ImageCard = ({ src, label, side }) => (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: side === 'left' ? 0 : 0.15 }}
      className="relative rounded-2xl overflow-hidden glass group cursor-zoom-in"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      onClick={() => setZoomed(src)}
      whileHover={{ scale: 1.01 }}
    >
      <img
        src={src}
        alt={label}
        className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
        style={{ maxHeight: '420px', background: '#0a0a0f' }}
      />
      {/* Label */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          background: side === 'left'
            ? 'rgba(255,255,255,0.1)'
            : 'linear-gradient(135deg, rgba(124,110,248,0.8), rgba(45,212,191,0.6))',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
        {label}
      </div>
      {/* Zoom hint */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-7 h-7 rounded-full flex items-center justify-center glass"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <ZoomIn size={13} />
        </div>
      </div>
    </motion.div>
  )

  return (
    <section ref={ref} className="px-4 py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Your Cartoon{' '}
              <span className="gradient-text">is Ready</span>
            </h2>
            {processingTime && (
              <p className="text-[#888] text-sm mt-1 flex items-center gap-1.5">
                <Clock size={12} />
                Processed in {processingTime < 1000
                  ? `${processingTime}ms`
                  : `${(processingTime / 1000).toFixed(1)}s`}
                {result.dimensions && ` · ${result.dimensions.width}×${result.dimensions.height}px`}
              </p>
            )}
          </div>
          <motion.button
            onClick={downloadCartoon}
            className="btn-primary flex items-center gap-2 text-white text-sm"
            whileTap={{ scale: 0.97 }}
            animate={downloaded ? { scale: [1, 0.97, 1.03, 1] } : {}}
          >
            <Download size={15} />
            {downloaded ? 'Downloaded!' : 'Download Cartoon'}
          </motion.button>
        </div>

        {/* Side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageCard src={result.original} label="Original" side="left" />
          <ImageCard src={result.cartoon} label="Cartoonized" side="right" />
        </div>

        {/* Divider label */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-[#555] font-medium tracking-widest uppercase">Before & After</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-4 flex flex-wrap gap-6 justify-center text-center"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { label: 'Edge Detection', value: 'Adaptive Threshold', color: '#7C6EF8' },
            { label: 'Color Clusters', value: 'k=9 (K-Means)', color: '#2DD4BF' },
            { label: 'Bilateral Filter', value: 'd=7, σ=200', color: '#F97316' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-xs text-[#666]">{stat.label}</span>
              <span className="text-sm font-semibold" style={{ color: stat.color }}>{stat.value}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {zoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setZoomed(null)}
        >
          <motion.img
            src={zoomed}
            alt="Zoomed"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-full max-h-full rounded-xl object-contain"
            style={{ maxHeight: '90vh' }}
          />
          <button
            onClick={() => setZoomed(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white"
          >
            ✕
          </button>
        </motion.div>
      )}
    </section>
  )
})

export default ResultSection
