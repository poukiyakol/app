import React from 'react';
import { motion } from 'motion/react';
import { HardshipPortal } from '../components/HardshipPortal';
import { ShieldCheck } from 'lucide-react';

interface HardshipPageProps {
  onVerificationResult: (success: boolean, message: string, detectedBalance: number) => void;
  onSystemLog: (logText: string) => void;
  onClaimGame: (gameTitle: string) => void;
  unlockedClaims: string[];
}

export const HardshipPage: React.FC<HardshipPageProps> = ({
  onVerificationResult,
  onSystemLog,
  onClaimGame,
  unlockedClaims
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
        <span className="hover:text-white transition-colors cursor-pointer">COOPERATIVE CHEST</span>
        <span>/</span>
        <span className="text-brand-crimson-bright font-bold">HARDSHIP VALIDATION</span>
        <span>/</span>
        <span className="text-[10px] bg-brand-charcoal px-2 py-0.5 rounded border border-brand-slate text-brand-crimson-bright">
          ZK-PROOF: ACTIVE
        </span>
      </div>

      <div className="bg-gradient-to-r from-brand-charcoal via-brand-slate/40 to-transparent p-5 rounded-xl border border-brand-slate/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-brand-crimson/10 to-transparent pointer-events-none" />
        <h2 className="text-2xl font-bold font-sans text-white tracking-tight uppercase flex items-center gap-2">
          <span>🛡️</span> ZERO-KNOWLEDGE LEDGER VERIFIER
        </h2>
        <p className="text-sm text-brand-text-muted mt-2 max-w-2xl leading-relaxed">
          Upload or paste any ending balance statement. Our code runs entirely in your local browser sandbox, confirming you meet criteria while strictly protecting your financial data.
        </p>
      </div>

      <HardshipPortal 
        onVerificationResult={onVerificationResult}
        onSystemLog={onSystemLog}
        onClaimGame={onClaimGame}
        unlockedClaims={unlockedClaims}
      />
    </motion.div>
  );
};
