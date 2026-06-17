import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import UploadSection from './components/UploadSection'
import ResultSection from './components/ResultSection'
import FeaturesSection from './components/FeaturesSection'
import Navbar from './components/Navbar'
import ParticleCanvas from './components/ParticleCanvas'
import Toast from './components/Toast'

const API_BASE = 'http://localhost:5000'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [toast, setToast] = useState(null)
  const [processingTime, setProcessingTime] = useState(null)
  const uploadRef = useRef(null)
  const resultRef = useRef(null)

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 4000)
  }, [])

  const handleFile = useCallback((selectedFile) => {
    if (!selectedFile) return

    const allowed = ['image/jpeg', 'image/png', 'image/jpg']
    if (!allowed.includes(selectedFile.type)) {
      showToast('Only JPG and PNG files are supported', 'error')
      return
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      showToast('File too large. Maximum size is 10MB', 'error')
      return
    }

    setFile(selectedFile)
    setResult(null)
    setProcessingTime(null)
    const url = URL.createObjectURL(selectedFile)
    setPreview(url)
  }, [showToast])

  const cartoonize = useCallback(async () => {
    if (!file) {
      showToast('Please upload an image first', 'error')
      return
    }

    setLoading(true)
    setProgress(0)

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 85) { clearInterval(progressInterval); return 85 }
        return p + Math.random() * 8
      })
    }, 200)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE}/cartoonize`, {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Processing failed')
      }

      setResult(data)
      setProcessingTime(data.processing_time_ms)
      showToast('Cartoon generated successfully!', 'success')

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)

    } catch (err) {
      showToast(err.message || 'Something went wrong. Is the backend running?', 'error')
    } finally {
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 500)
    }
  }, [file, showToast])

  // Keyboard shortcut: Ctrl+Enter to process
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        cartoonize()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [cartoonize])

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className={theme}>
      <div className="min-h-screen bg-ink text-[#E8E8F0] relative overflow-x-hidden">
        <ParticleCanvas />

        <div className="relative z-10">
          <Navbar theme={theme} setTheme={setTheme} />

          <HeroSection onUploadClick={scrollToUpload} />

          <UploadSection
            ref={uploadRef}
            file={file}
            preview={preview}
            loading={loading}
            progress={progress}
            onFile={handleFile}
            onCartoonize={cartoonize}
          />

          <AnimatePresence>
            {result && (
              <ResultSection
                ref={resultRef}
                result={result}
                processingTime={processingTime}
              />
            )}
          </AnimatePresence>

          <FeaturesSection />

          <footer className="text-center py-12 text-[#666] text-sm border-t border-border mt-16">
            <p>Built with OpenCV · React · Flask</p>
            <p className="mt-1 text-xs opacity-60">Press <kbd className="bg-panel border border-border rounded px-1.5 py-0.5 font-mono">⌘ Enter</kbd> to process</p>
          </footer>
        </div>

        <AnimatePresence>
          {toast && <Toast key={toast.id} {...toast} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
