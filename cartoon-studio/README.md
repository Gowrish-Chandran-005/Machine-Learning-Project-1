# AI Cartoon Studio 🎨

Transform ordinary photos into stunning cartoon artwork using OpenCV and AI-powered image processing.

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Python Flask, OpenCV, NumPy

## Project Structure

```
cartoon-studio/
├── frontend/        # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── UploadSection.jsx
│   │   │   ├── ResultSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── ParticleCanvas.jsx
│   │   │   └── Toast.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/
    ├── app.py
    └── requirements.txt
```

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
# Server starts at http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# App opens at http://localhost:5173
```

## Algorithm Pipeline

1. **Edge Mask** — Convert to grayscale → Median blur → Adaptive threshold
2. **Color Quantization** — K-Means clustering with k=9 colors
3. **Bilateral Filter** — Edge-preserving smoothing (d=7, σ=200)
4. **Cartoon Render** — Bitwise AND of blurred + edge mask

## API

### `POST /cartoonize`

**Input**: `multipart/form-data` with `image` field (JPG/PNG, max 10MB)

**Output**:
```json
{
  "success": true,
  "original": "data:image/png;base64,...",
  "cartoon": "data:image/png;base64,...",
  "processing_time_ms": 842,
  "dimensions": { "width": 800, "height": 600 }
}
```

## Features

- Drag & drop upload with validation
- Real-time progress bar
- Side-by-side comparison with zoom
- One-click PNG download
- Processing time display
- Keyboard shortcut: `Ctrl/⌘ + Enter` to process
- Animated particle background
- Dark glassmorphism UI
- Mobile responsive
