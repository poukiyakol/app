import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, HeartHandshake, ShieldAlert, Cpu, CheckCircle, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ChestStats, MutualAidGrant } from '../types';

interface ChestViewProps {
  stats: ChestStats;
  onDonateSimulate: () => void;
  onTransitionToVerify: () => void;
}

export const ChestView: React.FC<ChestViewProps> = ({ stats, onDonateSimulate, onTransitionToVerify }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Structural Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-crimson/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight uppercase text-brand-text flex items-center gap-2">
            <Coins className="w-6 h-6 text-brand-crimson-bright" />
            The Collective Chest
          </h2>
          <p className="text-sm text-brand-text-muted mt-1 font-mono">
            Collective mutual aid pool built by the community, for the community.
          </p>
        </div>
        <div className="text-xs font-mono bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson-bright px-2.5 py-1 rounded">
          [SOLIDARITY MARGIN: 100% SECURED]
        </div>
      </div>

      {/* THREE SPECIALIZED CARDS REQUIRED BY OPERATIONAL RULE 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: TREASURY RESERVE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-brand-charcoal border border-brand-slate/80 hover:border-brand-crimson/50 rounded-xl p-5 flex flex-col justify-between relative group overflow-hidden"
          id="chest-card-treasury"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-crimson/5 to-transparent rounded-bl-full pointer-events-none" />
          
          <div>
            <div className="text-xs font-mono text-brand-crimson-bright uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse"></span>
              [CARD 1: TREASURY RESERVE]
            </div>
            <h4 className="text-brand-text-muted text-sm font-sans font-medium uppercase tracking-tight">
              Treasury Reserve Pool
            </h4>
            <div className="text-3xl font-bold font-mono tracking-tight text-brand-text mt-2">
              {stats.treasuryPool}
            </div>
            <p className="text-xs text-brand-text-muted mt-3 font-sans leading-relaxed">
              Accumulated automatically via a voluntary 2% flat peer transaction solidarity tax on standard purchases. No bank overhead.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-brand-slate flex justify-between items-center">
            <button
              onClick={onDonateSimulate}
              className="text-xs font-mono text-brand-crimson-bright hover:text-white flex items-center gap-1 group bg-brand-crimson/10 hover:bg-brand-crimson border border-brand-crimson/30 px-3 py-1.5 rounded transition-all cursor-pointer"
            >
              Simulate Aid $20.00 Contribution
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* CARD 2: ELIGIBILITY MARGIN */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-brand-charcoal border border-brand-slate/80 hover:border-brand-crimson/50 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
          id="chest-card-eligibility"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-crimson/5 to-transparent rounded-bl-full pointer-events-none" />
          
          <div>
            <div className="text-xs font-mono text-brand-crimson-bright uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-crimson-bright"></span>
              [CARD 2: ELIGIBILITY MARGIN]
            </div>
            <h4 className="text-brand-text-muted text-sm font-sans font-medium uppercase tracking-tight">
              Hardship Limit Policy
            </h4>
            <div className="text-3xl font-bold font-mono tracking-tight text-brand-text mt-2">
              {stats.assistanceThreshold}
            </div>
            <p className="text-xs text-brand-text-muted mt-3 font-sans leading-relaxed">
              Maximum allowed bank ledger balance to qualify for blind subsidization. Completely self-verified with immediate allocation.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-brand-slate flex justify-between items-center">
            <button
              onClick={onTransitionToVerify}
              className="text-xs font-mono text-brand-text hover:text-brand-crimson-bright flex items-center gap-1 cursor-pointer"
            >
              Verify Ledger Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* CARD 3: DISTRIBUTION FEED */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-brand-charcoal border border-brand-slate/80 hover:border-brand-crimson/50 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
          id="chest-card-distribution"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-crimson/5 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-brand-crimson-bright uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-crimson-bright animate-ping"></span>
                [CARD 3: DISTRIBUTION FEED]
              </div>
              <h4 className="text-brand-text-muted text-sm font-sans font-medium uppercase tracking-tight">
                Disbursed subsidies: <strong className="text-brand-text font-mono font-bold">{stats.disbursedSubsidies}</strong>
              </h4>

              {/* Feed mapping recent blind grants */}
              <div className="mt-4 space-y-2.5">
                {stats.recentGrants.map((grant) => (
                  <div key={grant.id} className="text-xs font-mono bg-brand-obsidian/60 p-2 rounded border border-brand-slate/40 flex items-center justify-between">
                    <div>
                      <span className="text-brand-crimson-bright font-bold mr-1">{grant.id}</span>
                      <span className="text-brand-text">{grant.gameTitle}</span>
                    </div>
                    <span className="text-[10px] text-brand-text-muted">{grant.timeAgo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🔒 SECURE VERIFICATION PORTAL EXPLANATION BANNER */}
      <div className="bg-brand-charcoal border border-brand-slate/60 rounded-xl p-6 relative overflow-hidden" id="sandbox-banner">
        <div className="flex flex-col md:flex-row gap-5 items-start">
          <div className="p-3 bg-brand-crimson/10 border border-brand-crimson/30 rounded-lg text-brand-crimson-bright flex-shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-grow">
            <h3 className="text-lg font-bold text-brand-text tracking-tight flex items-center gap-2">
              🔒 SECURE VERIFICATION PORTAL
            </h3>
            <p className="text-sm font-sans text-brand-text-muted leading-relaxed">
              To remain 100% peer-compliant, users upload or paste raw bank ledger statements into our local analyzer. The application parses the values <strong className="text-brand-text">completely client-side inside a secure application sandbox</strong>. No data leaves your machine, no network tracking is initiated, and authorization hashes remain strictly on-device to protect your permanent anonymity.
            </p>
            <div className="pt-3 flex flex-wrap gap-4 text-xs font-mono text-brand-crimson-bright">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> NO REMOTE ENDPOINTS
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> NO COOKIES / TRACKERS
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> 100% CRYPTOGRAPHIC ISOLATION
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-brand-slate/50 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-brand-text-muted bg-brand-obsidian p-2 rounded border border-brand-slate/40 max-w-xl">
            manifesto-vault://sha256-d41d8cd98f00b204e9800998ecf8427e
          </p>
          <button
            onClick={onTransitionToVerify}
            className="w-full sm:w-auto bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-xs font-semibold uppercase px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            ENTER SECURE GATEWAY
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
