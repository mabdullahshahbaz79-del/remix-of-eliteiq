

# Software Dashboard (AdobeMeta AI) — Implementation Plan

This is the main software interface that Electron will load at `/app`. It's a standalone route with its own layout — completely separate from the marketing website.

## Overview

Build a full-featured asset management dashboard at `/app` with: file upload, grid/list view, metadata generation (via Lovable AI), inline editing, CSV export, and a settings panel. All state stored locally (localStorage/IndexedDB) since this is desktop software.

## Architecture

```text
/app (hidden route, no website nav link)
├── AppDashboard.tsx (main page)
├── components/app/
│   ├── AppNavbar.tsx         — fixed top bar (logo, search, actions)
│   ├── AssetGrid.tsx         — grid/list view of uploaded assets
│   ├── AssetCard.tsx         — individual asset card with thumbnail
│   ├── EmptyState.tsx        — "No Assets Yet" placeholder
│   ├── UploadZone.tsx        — drag & drop upload area
│   ├── MetadataEditor.tsx    — table view for editing metadata
│   ├── AssetSidePanel.tsx    — right panel for selected asset details
│   ├── SettingsModal.tsx     — settings dialog with 4 tabs
│   └── types.ts              — shared types (Asset, Metadata, etc.)
```

## Implementation Steps

### 1. Create Types & State Management (`src/components/app/types.ts`)
- Define `Asset` type: id, file, thumbnail, name, size, compressedSize, status (ready/processing/done/error), metadata (title, keywords, description, confidence)
- Define `Settings` type: aiMode, apiKeys, metadataRules, advanced options
- Use React context + localStorage for persistence

### 2. App Route & Layout (`src/pages/AppDashboard.tsx`)
- Add `/app` route in `App.tsx` (standalone, no Layout wrapper)
- Full-screen dark dashboard with its own navbar
- State: assets array, selectedAssets, viewMode (grid/list), showUpload, showSettings, selectedAsset for side panel

### 3. Top Navbar (`src/components/app/AppNavbar.tsx`)
- Fixed top bar matching dark theme
- Left: "AdobeMeta AI" logo + PRO/FREE badge
- Center: Search input
- Right: Download Zip, Export CSV, Generate All, Upload Assets (cyan gradient), Settings gear
- Counters update dynamically based on assets state

### 4. Empty State (`src/components/app/EmptyState.tsx`)
- Large upload icon, heading, subtext, CTA button
- Shown when no assets uploaded

### 5. Upload Zone (`src/components/app/UploadZone.tsx`)
- Drag & drop with dashed gradient border
- File type indicators (JPEG, PNG, WebP, MP4, MOV, AI, EPS, SVG)
- Browse Files button using hidden file input
- Drag-over glow effect
- Creates thumbnails via canvas/URL.createObjectURL
- Close button to collapse

### 6. Asset Card & Grid (`src/components/app/AssetCard.tsx`, `AssetGrid.tsx`)
- Grid layout (4 cols desktop, 2 tablet, 1 mobile)
- Card: thumbnail, file size badge, status badge, filename, Generate button, delete button, select checkbox
- Hover: scale-105, gradient border glow
- List view alternative with table-like rows
- View toggle buttons (grid/list)
- Multi-select mode with bulk actions bar

### 7. Metadata Generation (Edge Function + Lovable AI)
- Create `supabase/functions/generate-metadata/index.ts`
- Uses Lovable AI (google/gemini-3-flash-preview) to analyze uploaded images
- Accepts base64 image, returns: title, description, keywords array, confidence scores
- Platform-specific metadata for all 9 platforms
- Frontend shows loading spinner per card during generation

### 8. Metadata Editor (`src/components/app/MetadataEditor.tsx`)
- Table view: File Name, Title (editable), Keywords (tag input), Description (textarea), Confidence bar, Platform readiness badges
- Inline editing: click cell to edit, save on blur/enter
- Bulk edit mode for applying same keywords to multiple assets

### 9. Asset Side Panel (`src/components/app/AssetSidePanel.tsx`)
- Slides in from right when asset selected
- Large preview, file details (name, size, dimensions)
- Metadata preview with tags
- Actions: Regenerate, Edit, Download

### 10. Settings Modal (`src/components/app/SettingsModal.tsx`)
- Dialog with 4 tabs using shadcn Tabs
- Tab 1 - AI Mode: Auto/Cloud/Offline toggle, provider dropdown, test connection
- Tab 2 - API Keys: inputs for OpenAI/Gemini/Groq/Ollama with show/hide, saved to localStorage
- Tab 3 - Metadata Rules: keyword strategy toggles, count slider, negative keywords textarea, auto-capitalize/dedup toggles
- Tab 4 - Advanced: parallel workers slider, description length, confidence threshold, export format

### 11. CSV Export
- Generate CSV per platform with platform-specific column formats
- Download as zip when multiple platforms selected
- Uses client-side CSV generation (no backend needed)

### 12. Route Registration
- Add `/app` to `App.tsx` as standalone route (no Layout wrapper)
- No link to this page from the marketing site

## Database
- No new tables needed — this dashboard works with local state (files stored in memory/IndexedDB)
- Metadata generation uses existing edge function infrastructure

## Technical Notes
- All file processing happens client-side (FileReader, canvas for thumbnails)
- Settings persist in localStorage
- AI metadata generation calls edge function with base64-encoded images
- CSV export uses Blob + download link pattern
- Designed for Electron wrapping: no server dependencies for core UI

