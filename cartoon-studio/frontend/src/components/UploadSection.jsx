import { forwardRef, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ImageIcon, X, Wand2, Loader2, Info } from 'lucide-react'

const UploadSection = forwardRef(function UploadSection(
  { file, preview, loading, progress, onFile, onCartoonize },
  ref
) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [imgDimensions, setImgDimensions] = useState(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) onFile(dropped)
  }, [onFile])

  const handleImageLoad = (e) => {
    setImgDimensions({ w: e.target.naturalWidth, h: e.target.naturalHeight })
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <section ref={ref} className="px-4 py-16 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Upload Your Photo</h2>
        <p className="text-center text-[#888] mb-10">JPG or PNG · Max 10MB</p>

        {/* Drop Zone */}
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 p-12 flex flex-col items-center gap-4 cursor-pointer
                ${dragging ? 'drop-active border-accent' : 'border-border hover:border-[#7C6EF8]/50'}`}
              style={{ background: dragging ? 'rgba(124,110,248,0.05)' : 'rgba(17,17,24,0.5)' }}
              onDragEnter={(e) => { e.preventDefault(); setDragging(true) }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <motion.div
                animate={{ y: dragging ? -8 : 0 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(124,110,248,0.15)', border: '1px solid rgba(124,110,248,0.3)' }}
              >
                <Upload size={28} className="text-accent-bright" style={{ color: '#A78BFA' }} />
              </motion.div>
              <div className="text-center">
                <p className="font-semibold text-white">Drag & drop your image</p>
                <p className="text-[#666] text-sm mt-1">or <span className="text-[#A78BFA] underline">browse files</span></p>
              </div>
              <div className="flex gap-2 mt-2">
                {['JPG', 'JPEG', 'PNG'].map(f => (
                  <span key={f} className="px-2.5 py-0.5 rounded text-xs font-mono glass"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#888' }}>
                    {f}
                  </span>
                ))}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={e => onFile(e.target.files[0])}
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative rounded-2xl overflow-hidden glass"
              style={{ border: '1px solid rgba(124,110,248,0.25)' }}
            >
              {/* Image preview */}
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-[420px] object-contain bg-black/30"
                  onLoad={handleImageLoad}
                />
                {/* Overlay label */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium glass"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="flex items-center gap-1.5">
                    <ImageIcon size={11} />
                    Original
                  </span>
                </div>
                {/* Remove button */}
                <button
                  onClick={() => { onFile(null); }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center glass hover:bg-red-500/20 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <X size={13} />
                </button>
              </div>

              {/* File info */}
              {file && (
                <div className="px-4 py-3 flex items-center gap-4 text-xs text-[#888]">
                  <span className="font-medium text-white truncate max-w-[180px]">{file.name}</span>
                  <span>{formatSize(file.size)}</span>
                  {imgDimensions && <span>{imgDimensions.w} × {imgDimensions.h}px</span>}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="h-1.5 rounded-full bg-panel overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7C6EF8, #2DD4BF)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-center text-xs text-[#888] mt-2 flex items-center justify-center gap-2">
                <Loader2 size={12} className="animate-spin" />
                Creating Cartoon Magic... {Math.round(progress)}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate button */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: preview ? 1 : 0.4 }}
        >
          <button
            onClick={onCartoonize}
            disabled={!preview || loading}
            className="btn-primary flex items-center gap-2.5 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wand2 size={16} />
                Generate Cartoon
                <span className="opacity-50 text-xs font-normal ml-1">⌘↵</span>
              </>
            )}
          </button>
        </motion.div>

        {!preview && (
          <p className="text-center text-xs text-[#555] mt-4 flex items-center justify-center gap-1">
            <Info size={11} />
            Upload an image to get started
          </p>
        )}
      </motion.div>
    </section>
  )
})

export default UploadSection
