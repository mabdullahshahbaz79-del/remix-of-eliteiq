

## Plan: Overhaul /app Dashboard — UI Polish, Upload UX, and End-to-End AI Metadata Generation

### Overview
Three major improvements to the /app dashboard: visual upgrade matching the website's premium aesthetic, enhanced drag-and-drop upload with progress indicators, and fully functional AI-powered metadata generation with batch processing.

---

### 1. UI Polish and Animations

**AppDashboard.tsx** — Add animated background gradient overlay, smooth page transitions with framer-motion
- Add subtle animated gradient orbs in the background (reuse existing `FloatingOrbs` or lighter variant)
- Wrap content in framer-motion `AnimatePresence` for fade-in on load

**AppNavbar.tsx** — Glassmorphism upgrade
- Enhanced backdrop blur, subtle bottom glow line, smoother hover states on buttons
- Add asset count stats (total, processing, done) as animated badges

**EmptyState.tsx** — Premium empty state
- Animated floating icon with pulse glow effect
- Drag-and-drop zone built directly into the empty state (not just a button)
- Subtle particle/shimmer animation

**AssetCard.tsx** — Card animations and polish
- Staggered entrance animations using framer-motion
- Smooth status transition animations (ready → processing spinner → done checkmark)
- Hover lift effect with glow shadow
- Progress bar during processing state

**AssetGrid.tsx** — Layout improvements
- Animated grid layout transitions when cards are added/removed
- Better responsive breakpoints
- Smooth search filter transitions

### 2. Enhanced Upload with Progress Indicators

**UploadZone.tsx** — Complete rewrite
- Real drag-and-drop with visual feedback (border glow, icon animation, file count preview)
- File validation with size/type checking and error feedback
- Individual file progress bars showing processing state
- Thumbnail preview generation before adding to grid
- File queue display showing pending uploads
- Support paste from clipboard (Ctrl+V)

**AppContext.tsx** — Add upload queue state
- `uploadQueue` state for tracking files being processed
- `uploadProgress` map for per-file progress
- Batch upload handler that processes files with visual feedback

### 3. End-to-End AI Metadata Generation

The edge function `generate-metadata` already exists and works. The improvements:

**AssetCard.tsx** — Fix the generate flow
- The current flow converts blob URL to base64 correctly but wraps it in a nested callback; flatten to async/await
- Add a progress indicator (pulsing bar) during generation
- Show confidence score visually after generation
- Handle 429/402 errors with user-friendly toasts

**AssetGrid.tsx** — Batch processing improvements
- Sequential batch processing with progress counter ("Processing 3/12...")
- Configurable parallel workers from settings (use `settings.advanced.parallelWorkers`)
- Auto-retry on failure if `settings.advanced.autoRetry` is enabled
- Overall batch progress bar in the navbar area

**AssetSidePanel.tsx** — Enhanced metadata display
- Platform-specific tabs showing per-platform metadata (the edge function already returns this)
- Copy buttons for each platform's title/description/keywords
- Platform readiness indicators (green checkmark per platform)
- Regenerate button that actually calls the edge function

---

### Technical Details

**Files to create:**
- None (all changes are to existing files)

**Files to modify:**
- `src/pages/AppDashboard.tsx` — Background effects, layout animation wrapper
- `src/components/app/AppNavbar.tsx` — Glassmorphism, batch progress indicator, stats badges
- `src/components/app/EmptyState.tsx` — Animated empty state with inline drop zone
- `src/components/app/UploadZone.tsx` — Progress bars, file validation, clipboard paste
- `src/components/app/AssetCard.tsx` — Entrance animations, progress bar, smoother generate flow
- `src/components/app/AssetGrid.tsx` — Batch processing with parallel workers, progress tracking
- `src/components/app/AssetSidePanel.tsx` — Platform tabs, working regenerate/copy actions
- `src/components/app/AppContext.tsx` — Upload queue state, batch progress tracking

**Dependencies:** framer-motion (already installed)

**No database changes needed** — everything is client-side with the existing edge function.

