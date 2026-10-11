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
      output: `[OMIK-DEVOPS-KERNEL v3.0.0-PROD]
Subsystem operational. Security clearance: LEVEL 0.
Type 'help' for command matrix.`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm">
      <div
        className={`bg-[#0a0a0c] border border-[#1e242f] flex flex-col font-mono shadow-2xl transition-all duration-150 ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[520px]'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#101216] border-b border-[#1e242f] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600"></span>
            <span className="text-white font-bold tracking-wider">
              ROOT@OMIK-SRE-NODE01:~ (ZSH)
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-red-500"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-4 overflow-y-auto text-xs text-slate-300 space-y-3 bg-[#08090b]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-red-500">
                <span className="text-slate-500">root@edge:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap text-xs leading-relaxed pl-2 border-l border-red-900/50">
                {item.output}
              </pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Line Input */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 px-3 py-2.5 bg-[#101216] border-t border-[#1e242f]">
          <span className="text-red-500 text-xs">root@edge:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="help, skills, projects, architecture, contact, clear..."
            className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-slate-600"
          />
          <button type="submit" className="text-slate-500 hover:text-white">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
