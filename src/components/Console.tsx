import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, ArrowUpRight, Play, RefreshCw, Send, Trash2 } from 'lucide-react';
import { ConsoleMessage } from '../types';

interface ConsoleProps {
  logs: ConsoleMessage[];
  onCommandRun: (commandText: string) => void;
  onClearLogs: () => void;
}

export const Console: React.FC<ConsoleProps> = ({ logs, onCommandRun, onClearLogs }) => {
  const [command, setCommand] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto Scroll to latest printed command logs for good immersive UX
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    onCommandRun(command);
    setCommand('');
  };

  // Predefined terminal hotkeys for easy testing
  const quickMacros = [
    { label: "go library", cmd: "library" },
    { label: "go collective", cmd: "collective chest" },
    { label: "simulate hardship statement ($45)", cmd: "Balance Statement: $45.20" },
    { label: "simulate standard statement ($2,400)", cmd: "Account Balance: $2,400.00" },
    { label: "ask platform cuts", cmd: "why is the store cut exactly 0%?" }
  ];

  return (
    <div className="bg-brand-charcoal/95 border border-brand-crimson/30 rounded-xl overflow-hidden shadow-2xl relative font-mono text-xs flex flex-col h-[280px]">
      {/* Decorative scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="bg-brand-obsidian border-b border-brand-slate px-4 py-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson animate-pulse" />
          <span className="text-brand-text font-bold text-[11px] flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-brand-crimson-bright" />
            MANIFESTO INTERACTIVE LAYOUT ENGINE // STD_PEER_OUT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-brand-text-muted hidden sm:inline">
            peer-node-9f15470c
          </span>
          <button
            onClick={onClearLogs}
            title="Clear prompt history"
            className="text-brand-text-muted hover:text-brand-crimson-bright transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Console Display Output */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2.5 custom-scrollbar relative z-10 bg-brand-obsidian/75">
        {logs.map((log) => {
          let textStyle = "text-brand-text-muted";
          if (log.type === 'input') textStyle = "text-brand-text font-semibold";
          if (log.type === 'system') textStyle = "text-brand-crimson-bright opacity-85 text-[10px]";
          if (log.type === 'response') textStyle = "text-brand-crimson-bright font-medium select-all leading-normal";
          if (log.type === 'success') textStyle = "text-emerald-400 font-medium select-all leading-normal";
          if (log.type === 'error') textStyle = "text-rose-500 font-bold";

          return (
            <div key={log.id} className="leading-relaxed break-all">
              {log.type === 'input' && (
                <span className="text-brand-crimson-bright font-bold mr-1.5">manifesto@peer:~$</span>
              )}
              {log.type === 'system' && (
                <span className="text-brand-slate font-bold mr-1.5">[SYS]</span>
              )}
              <span className={textStyle}>{log.content}</span>
            </div>
          );
        })}
        <div ref={logEndRef} />
      </div>

      {/* Quick click Command Assist Ribbon */}
      <div className="bg-brand-obsidian/90 border-t border-brand-slate px-4 py-2 flex items-center gap-2 overflow-x-auto relative z-10 scrollbar-none">
        <span className="text-[10px] text-brand-text-muted uppercase font-bold flex-shrink-0">
          [MACROS]:
        </span>
        <div className="flex gap-2">
          {quickMacros.map((macro, idx) => (
            <button
              key={idx}
              id={`macro-${idx}`}
              onClick={() => onCommandRun(macro.cmd)}
              className="bg-brand-slate hover:bg-brand-crimson/20 border border-brand-slate hover:border-brand-crimson-bright/40 text-[10px] text-brand-text-muted hover:text-white px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer font-mono"
            >
              {macro.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Command Input */}
      <form onSubmit={handleSubmit} className="bg-brand-obsidian border-t border-brand-slate p-2 flex gap-2 relative z-10">
        <div className="flex-grow relative flex items-center">
          <span className="absolute left-3 text-brand-crimson-bright font-bold font-mono">
            $
          </span>
          <input
            id="terminal-input"
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type 'library', 'mutual aid', paste a balance sheet, or search FAQ..."
            className="w-full bg-brand-charcoal text-brand-text font-mono text-xs pl-7 pr-3 py-2 rounded border border-brand-slate focus:outline-none focus:ring-1 focus:ring-brand-crimson placeholder-brand-text-muted/40"
          />
        </div>
        <button
          id="btn-terminal-submit"
          type="submit"
          className="bg-brand-crimson hover:bg-brand-crimson-bright text-white uppercase font-bold font-mono text-xs px-4 py-2 rounded transition-colors flex items-center gap-1 cursor-pointer"
        >
          EXEC
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
