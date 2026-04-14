import { useState } from 'react';
import { Keyboard, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShortcutBinding, formatShortcutDisplay } from '@/hooks/use-keyboard-shortcuts';

interface Props {
  shortcuts: ShortcutBinding[];
  onUpdate: (id: string, newKeys: string) => void;
  onReset: () => void;
}

const KeyboardShortcutsPanel = ({ shortcuts, onUpdate, onReset }: Props) => {
  const [recording, setRecording] = useState<string | null>(null);

  const handleRecord = (id: string) => {
    setRecording(id);
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Ignore modifier-only presses
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;

      const parts: string[] = [];
      if (e.ctrlKey || e.metaKey) parts.push('Ctrl');
      if (e.shiftKey) parts.push('Shift');
      if (e.altKey) parts.push('Alt');

      let key = e.key;
      if (key === ' ') key = 'Space';
      else if (key.length === 1) key = key.toUpperCase();
      else if (key === 'Backspace') key = 'Delete';
      parts.push(key);

      onUpdate(id, parts.join('+'));
      setRecording(null);
      window.removeEventListener('keydown', handler);
    };
    window.addEventListener('keydown', handler);
  };

  const categories = [
    { key: 'selection', label: 'Selection' },
    { key: 'actions', label: 'Actions' },
    { key: 'navigation', label: 'Navigation' },
    { key: 'view', label: 'View' },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-cyan-400" />
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Keyboard Shortcuts</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-[10px] text-white/30 hover:text-white/60 gap-1"
          onClick={onReset}
        >
          <RotateCcw className="h-3 w-3" />
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        {categories.map(cat => {
          const items = shortcuts.filter(s => s.category === cat.key);
          if (items.length === 0) return null;
          return (
            <div key={cat.key}>
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">{cat.label}</p>
              <div className="space-y-1.5">
                {items.map(shortcut => (
                  <div
                    key={shortcut.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70">{shortcut.label}</p>
                      <p className="text-[10px] text-white/30 truncate">{shortcut.description}</p>
                    </div>
                    <button
                      onClick={() => handleRecord(shortcut.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all ${
                        recording === shortcut.id
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse'
                          : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70'
                      }`}
                    >
                      {recording === shortcut.id ? (
                        'Press keys...'
                      ) : (
                        formatShortcutDisplay(shortcut.keys).map((k, i) => (
                          <span key={i}>
                            <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px]">{k}</kbd>
                            {i < formatShortcutDisplay(shortcut.keys).length - 1 && (
                              <span className="text-white/20 mx-0.5">+</span>
                            )}
                          </span>
                        ))
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-white/20 mt-3">Click any shortcut to reassign it. Changes are saved automatically.</p>
    </section>
  );
};

export default KeyboardShortcutsPanel;
