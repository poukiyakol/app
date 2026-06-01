import React from 'react';
import { motion } from 'motion/react';
import { ChestView } from '../components/ChestView';
import { ChestStats } from '../types';
import { Coins, Shield } from 'lucide-react';

interface ChestPageProps {
  stats: ChestStats;
  onDonateSimulate: () => void;
  onTransitionToVerify: () => void;
}

export const ChestPage: React.FC<ChestPageProps> = ({ 
  stats, 
  onDonateSimulate, 
  onTransitionToVerify 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Page Breadcrumb and Header */}
      <div className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
        <span className="hover:text-white transition-colors cursor-pointer">MANIFESTO</span>
        <span>/</span>
        <span className="text-brand-crimson-bright font-bold">MUTUAL AID CHEST</span>
        <span>/</span>
        <span className="text-[10px] bg-brand-charcoal px-2 py-0.5 rounded border border-brand-slate text-emerald-400">
          HEALTH: STABLE
        </span>
      </div>

      <div className="bg-gradient-to-r from-brand-charcoal via-brand-slate/40 to-transparent p-5 rounded-xl border border-brand-slate/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
        <h2 className="text-2xl font-bold font-sans text-white tracking-tight uppercase flex items-center gap-2">
          <span>🪙</span> DE-COMMODIFIED SOFTWARE DISTRIBUTION
        </h2>
        <p className="text-sm text-brand-text-muted mt-2 max-w-2xl leading-relaxed">
          The Collective Chest belongs to you. Voluntary contributions keep our pipeline filled, so any peer experiencing hardship holds immediate licensing access 100% paid back to developer collectives.
        </p>
      </div>

      <ChestView 
        stats={stats}
        onDonateSimulate={onDonateSimulate}
        onTransitionToVerify={onTransitionToVerify}
      />
    </motion.div>
  );
};
