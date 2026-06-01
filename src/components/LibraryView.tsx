import React from 'react';
import { motion } from 'motion/react';
import { Play, Download, RefreshCw, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { Game } from '../types';

interface LibraryViewProps {
  games: Game[];
  onAction: (gameTitle: string, actionType: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ games, onAction }) => {
  return (
    <div className="space-y-6">
      {/* Structural Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-crimson/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight uppercase text-brand-text">
            Sovereign Peer Library
          </h2>
          <p className="text-sm text-brand-text-muted mt-1 font-mono">
            Direct-to-developer compilation. No DRM. Permanent anonymous play offline.
          </p>
        </div>
        
        {/* Core telemetry tags required by instructions */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="bg-brand-crimson/15 border border-brand-crimson/50 text-brand-crimson-bright px-2.5 py-1 rounded flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 bg-brand-crimson-bright rounded-full"></span>
            [🔴 CRIMSON ENGINE ONLINE]
          </span>
          <span className="bg-brand-charcoal border border-brand-slate text-brand-text px-2.5 py-1 rounded flex items-center gap-1.5">
            [STORE CUT: 0%]
          </span>
          <span className="bg-brand-charcoal border border-brand-slate text-brand-text px-2.5 py-1 rounded hidden sm:inline-flex items-center gap-1.5">
            [TRUST SCORE: 100%]
          </span>
        </div>
      </div>

      {/* Grid of Sovereign Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => {
          const isHades = game.title.includes("Hades");
          const isCyberpunk = game.title.includes("Cyberpunk");
          const isSlay = game.title.includes("Slay");

          // Visual theme variant for the game cards representing their vibe
          const cardBorderGradient = isHades 
            ? 'hover:border-brand-crimson/60 focus:border-brand-crimson'
            : isCyberpunk 
            ? 'hover:border-cyan-500/50' 
            : 'hover:border-emerald-500/50';

          const shadowGlow = isHades 
            ? 'hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]'
            : isCyberpunk 
            ? 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
            : 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]';

          const accentColor = isHades 
            ? 'text-brand-crimson-bright'
            : isCyberpunk 
            ? 'text-cyan-400' 
            : 'text-emerald-400';

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`relative bg-brand-charcoal/90 border border-brand-slate/60 rounded-xl p-5 overflow-hidden transition-all duration-300 flex flex-col justify-between group ${cardBorderGradient} ${shadowGlow}`}
              id={`game-card-${game.id}`}
            >
              {/* Backglow element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-crimson/5 to-transparent rounded-bl-full pointer-events-none" />

              <div>
                {/* Header layout */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-3xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] select-none">
                    {game.icon}
                  </span>
                  
                  {/* Custom status tags mapped directly to criteria */}
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${
                    game.status === 'Ready to Play'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : game.status === 'Installed'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : game.status === 'Update Available'
                      ? 'bg-brand-crimson/15 text-brand-crimson-bright border-brand-crimson/20 animate-pulse'
                      : 'bg-brand-slate text-brand-text-muted border-brand-slate'
                  }`}>
                    {game.status.toUpperCase()}
                  </span>
                </div>

                {/* Title & Developer metadata */}
                <h3 className="text-xl font-bold text-brand-text tracking-tight group-hover:text-white transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-brand-text-muted mt-0.5 font-sans font-medium">
                  by {game.developer}
                </p>

                {/* Tag pill */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase bg-brand-slate border border-brand-slate/40 text-brand-text-muted px-2 py-0.5 rounded">
                    {game.tag}
                  </span>
                  <span className="text-[10px] font-mono text-brand-text-muted">
                    • {game.size}
                  </span>
                </div>

                <p className="text-sm font-sans text-brand-text-muted mt-3 line-clamp-2 leading-relaxed">
                  {game.description}
                </p>
              </div>

              {/* Action Utilities Footing */}
              <div className="mt-6 pt-4 border-t border-brand-slate/40 flex flex-col gap-2">
                {game.status === 'Ready to Play' || game.status === 'Installed' ? (
                  <button
                    id={`btn-play-${game.id}`}
                    onClick={() => onAction(game.title, 'BOOT ENGINE')}
                    className="w-full bg-brand-slate hover:bg-brand-crimson text-brand-text hover:text-white font-mono text-sm py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-brand-slate/60 hover:border-brand-crimson-bright shadow-sm cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current text-emerald-400 group-hover:text-white" />
                    BOOT ENGINE
                  </button>
                ) : game.status === 'Update Available' ? (
                  <button
                    id={`btn-update-${game.id}`}
                    onClick={() => onAction(game.title, 'PEER PATCH')}
                    className="w-full bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-sm py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] animate-pulse cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                    APPLY PEER PATCH
                  </button>
                ) : (
                  <button
                    id={`btn-claim-${game.id}`}
                    onClick={() => onAction(game.title, 'CLAIM SOLIDARITY')}
                    className="w-full bg-brand-slate hover:bg-brand-crimson/30 border border-brand-crimson/50 text-brand-crimson-bright font-mono text-sm py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    CLAIM SOLIDARITY LICENSE
                  </button>
                )}

                {/* Sub-actions for developer inspection */}
                <div className="flex justify-between items-center text-[10px] text-brand-text-muted font-mono px-1">
                  <button 
                    onClick={() => onAction(game.title, 'CHECK MANIFEST')}
                    className="hover:text-brand-crimson-bright cursor-pointer"
                  >
                    [SHA-256 SUM]
                  </button>
                  <button 
                    onClick={() => onAction(game.title, 'PEER STATUS')}
                    className="hover:text-brand-crimson-bright cursor-pointer"
                  >
                    [SEEDERS: {(game.id.charCodeAt(0) % 20) + 12}]
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Structural Anti-Capitalist Banner */}
      <div className="bg-brand-charcoal/50 border border-brand-slate/40 rounded-xl p-4 font-mono text-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-brand-crimson-bright flex-shrink-0" />
          <p className="text-brand-text-muted leading-relaxed">
            <strong className="text-brand-text">CO-OP PRINCIPLE:</strong> We compile game manifests directly from repositories. 0% of transaction values go to corporate rents or hosting margins. Play locally, copy freely to physical drives, seed back to the network.
          </p>
        </div>
        <div className="flex gap-4 self-end md:self-center text-brand-crimson-bright">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> DRM: NONE
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> TRUST: VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
};
