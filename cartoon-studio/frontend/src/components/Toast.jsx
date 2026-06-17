import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const icons = {
  success: <CheckCircle size={16} className="text-[#2DD4BF]" />,
  error: <XCircle size={16} className="text-red-400" />,
  info: <Info size={16} className="text-[#7C6EF8]" />,
}

const borders = {
  success: 'rgba(45,212,191,0.3)',
  error: 'rgba(239,68,68,0.3)',
  info: 'rgba(124,110,248,0.3)',
}

export default function Toast({ message, type = 'info' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl glass text-sm font-medium"
      style={{ border: `1px solid ${borders[type]}`, maxWidth: '360px' }}
    >
      {icons[type]}
      <span className="text-[#E8E8F0]">{message}</span>
    </motion.div>
  )
}
