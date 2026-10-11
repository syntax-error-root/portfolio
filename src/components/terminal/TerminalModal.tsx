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
      command: 'welcome',
      output: `[OMIK-DEVOPS-CLI v2.4.0 — PRODUCTION WORKSTATION]
Type 'help' to inspect available system commands.
Safe sandbox environment initialized.`
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
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

    const output = terminalCommands[cleanCmd] || `zsh: command not found: ${cleanCmd}. Type 'help' for available commands.`;
    setHistory(prev => [...prev, { command: cleanCmd, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div
        className={`bg-[#07090e] border border-sky-500/30 rounded-xl flex flex-col shadow-2xl overflow-hidden transition-all duration-200 ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[520px]'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
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
              className="p-1 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Log Output Area */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-sky-400">
                <span className="text-slate-500">omik@edge:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap font-sans text-xs sm:font-mono leading-relaxed pl-2 border-l border-white/10">
                {item.output}
              </pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Interactive Command Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-t border-white/10">
          <span className="font-mono text-xs text-sky-400">omik@edge:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'skills', 'projects', 'architecture', 'contact'..."
            className="flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-slate-600"
          />
          <button type="submit" className="text-slate-500 hover:text-sky-400 transition-colors">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
