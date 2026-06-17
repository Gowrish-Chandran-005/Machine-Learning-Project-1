import { motion } from 'framer-motion'

const features = [
  {
    icon: '⬡',
    title: 'Edge Detection',
    subtitle: 'Adaptive Threshold',
    description: 'Converts the image to grayscale, applies median blur to reduce noise, then uses adaptive thresholding to extract crisp, comic-style edges.',
    color: '#7C6EF8',
    bg: 'rgba(124,110,248,0.08)',
    border: 'rgba(124,110,248,0.2)',
  },
  {
    icon: '◈',
    title: 'Color Quantization',
    subtitle: 'K-Means Clustering',
    description: 'Reduces the color palette to 9 dominant colors using K-Means clustering, giving the flat, cel-shaded look characteristic of cartoons.',
    color: '#2DD4BF',
    bg: 'rgba(45,212,191,0.08)',
    border: 'rgba(45,212,191,0.2)',
  },
  {
    icon: '◉',
    title: 'Bilateral Filtering',
    subtitle: 'Edge-Preserving Smooth',
    description: 'Applies bilateral filtering to smooth colors while preserving edge boundaries — flattening texture without blurring structural details.',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
  },
  {
    icon: '✦',
    title: 'Cartoon Rendering',
    subtitle: 'Bitwise Mask Blend',
    description: 'Combines the smoothed color image with the edge mask using bitwise AND, producing a final image with vivid flat color and strong outlines.',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.2)',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-[#7C6EF8] mb-3 block">
          How It Works
        </span>
        <h2 className="text-4xl font-bold">
          The{' '}
          <span className="gradient-text">Pipeline</span>
        </h2>
        <p className="text-[#888] mt-4 max-w-lg mx-auto">
          Four precise OpenCV operations transform any photo into hand-drawn cartoon art in milliseconds.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {features.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl relative overflow-hidden"
            style={{ background: feat.bg, border: `1px solid ${feat.border}` }}
          >
            {/* Step number */}
            <div className="absolute top-4 right-5 text-5xl font-black opacity-[0.07]"
              style={{ color: feat.color }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: feat.bg, border: `1px solid ${feat.border}`, color: feat.color }}>
                {feat.icon}
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-bold text-white">{feat.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ background: `${feat.color}18`, color: feat.color }}>
                    {feat.subtitle}
                  </span>
                </div>
                <p className="text-[#888] text-sm leading-relaxed">{feat.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pipeline visual */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-10 glass rounded-2xl p-5 font-mono text-xs overflow-x-auto"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="text-[#555] mb-2 text-[10px] tracking-widest">PIPELINE</div>
        <div className="flex items-center gap-2 flex-wrap text-[#888]">
          {[
            { text: 'RGB Image', color: '#888' },
            { text: '→' },
            { text: 'Edge Mask', color: '#7C6EF8' },
            { text: '→' },
            { text: 'Color Quant (k=9)', color: '#2DD4BF' },
            { text: '→' },
            { text: 'Bilateral Filter', color: '#F97316' },
            { text: '→' },
            { text: 'Bitwise AND', color: '#EC4899' },
            { text: '→' },
            { text: '🎨 Cartoon', color: '#fff' },
          ].map((item, i) => (
            <span key={i} style={{ color: item.color || '#666' }}>{item.text}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
