import React, { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '../../config';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'init',
      output: `[OMIK-DEVOPS-KERNEL v2.4.0-PROD]
Cluster subsystem operational. All services healthy.
Type 'help' for available commands.`
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const output = terminalCommands[cleanCmd] || `zsh: command not recognized: '${cleanCmd}'. Type 'help' for available commands.`;
    setHistory(prev => [...prev, { command: cleanCmd, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div
        className={`glass-panel rounded-2xl flex flex-col font-mono shadow-2xl transition-all duration-200 overflow-hidden ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[520px]'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.08] text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-300 font-semibold tracking-wide ml-2 text-[11px]">
              omik@infrastructure-core:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white transition-colors"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-red-400 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-5 overflow-y-auto text-xs text-slate-300 space-y-4 bg-[#05070e]/95">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-slate-500 font-mono">user@cluster:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap text-xs leading-relaxed pl-3 border-l-2 border-cyan-500/30">
                {item.output}
              </pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-t border-white/[0.08]"
        >
          <span className="text-cyan-400 text-xs font-bold font-mono">user@cluster:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' for available commands..."
            className="flex-1 bg-transparent text-white text-xs font-mono outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
