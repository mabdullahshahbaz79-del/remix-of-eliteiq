import { useEffect, useCallback, useState } from 'react';

export interface ShortcutBinding {
  id: string;
  label: string;
  description: string;
  keys: string; // e.g. "Ctrl+A", "Delete", "Ctrl+Shift+G"
  category: 'selection' | 'actions' | 'navigation' | 'view';
}

export const DEFAULT_SHORTCUTS: ShortcutBinding[] = [
  { id: 'selectAll', label: 'Select All', description: 'Select all assets', keys: 'Ctrl+A', category: 'selection' },
  { id: 'deselectAll', label: 'Deselect All', description: 'Clear selection', keys: 'Escape', category: 'selection' },
  { id: 'deleteSelected', label: 'Delete Selected', description: 'Remove selected assets', keys: 'Delete', category: 'actions' },
  { id: 'generateSelected', label: 'Generate Metadata', description: 'Generate for selected assets', keys: 'Enter', category: 'actions' },
  { id: 'generateAll', label: 'Generate All', description: 'Generate metadata for all ready assets', keys: 'Ctrl+Shift+G', category: 'actions' },
  { id: 'openUpload', label: 'Upload Files', description: 'Open upload dialog', keys: 'Ctrl+U', category: 'navigation' },
  { id: 'openSettings', label: 'Open Settings', description: 'Open settings modal', keys: 'Ctrl+,', category: 'navigation' },
  { id: 'toggleSearch', label: 'Focus Search', description: 'Focus the search bar', keys: 'Ctrl+K', category: 'navigation' },
  { id: 'toggleView', label: 'Toggle View', description: 'Switch grid/list view', keys: 'Ctrl+L', category: 'view' },
];

const STORAGE_KEY = 'eliteiq-shortcuts';

const loadShortcuts = (): ShortcutBinding[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_SHORTCUTS;
    const parsed = JSON.parse(saved) as ShortcutBinding[];
    // Merge with defaults to pick up new shortcuts
    return DEFAULT_SHORTCUTS.map(def => {
      const saved = parsed.find(s => s.id === def.id);
      return saved ? { ...def, keys: saved.keys } : def;
    });
  } catch {
    return DEFAULT_SHORTCUTS;
  }
};

export const useShortcutSettings = () => {
  const [shortcuts, setShortcuts] = useState<ShortcutBinding[]>(loadShortcuts);

  const updateShortcut = useCallback((id: string, newKeys: string) => {
    setShortcuts(prev => {
      const next = prev.map(s => s.id === id ? { ...s, keys: newKeys } : s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetShortcuts = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setShortcuts(DEFAULT_SHORTCUTS);
  }, []);

  return { shortcuts, updateShortcut, resetShortcuts };
};

const parseKeys = (keys: string) => {
  const parts = keys.toLowerCase().split('+').map(p => p.trim());
  return {
    ctrl: parts.includes('ctrl') || parts.includes('cmd'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    key: parts.filter(p => !['ctrl', 'cmd', 'shift', 'alt'].includes(p))[0] || '',
  };
};

const keyMap: Record<string, string> = {
  delete: 'delete',
  backspace: 'backspace',
  enter: 'enter',
  escape: 'escape',
  ',': ',',
};

export const useKeyboardShortcuts = (
  shortcuts: ShortcutBinding[],
  handlers: Record<string, () => void>,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        // Allow Escape even in inputs
        if (e.key !== 'Escape') return;
      }

      for (const shortcut of shortcuts) {
        const parsed = parseKeys(shortcut.keys);
        const eventKey = e.key.toLowerCase();
        const matchedKey = eventKey === parsed.key || 
          (keyMap[eventKey] === parsed.key) ||
          (eventKey === parsed.key);

        if (
          matchedKey &&
          (e.ctrlKey || e.metaKey) === parsed.ctrl &&
          e.shiftKey === parsed.shift &&
          e.altKey === parsed.alt
        ) {
          const handler = handlers[shortcut.id];
          if (handler) {
            e.preventDefault();
            handler();
            return;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, handlers, enabled]);
};

export const formatShortcutDisplay = (keys: string): string[] => {
  return keys.split('+').map(k => {
    const t = k.trim();
    if (t.toLowerCase() === 'ctrl') return '⌃';
    if (t.toLowerCase() === 'cmd') return '⌘';
    if (t.toLowerCase() === 'shift') return '⇧';
    if (t.toLowerCase() === 'alt') return '⌥';
    if (t.toLowerCase() === 'delete') return '⌫';
    if (t.toLowerCase() === 'enter') return '↵';
    if (t.toLowerCase() === 'escape') return 'Esc';
    return t.toUpperCase();
  });
};
