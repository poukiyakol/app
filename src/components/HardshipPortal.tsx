import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertOctagon, Terminal, FileText, FileUp, UploadCloud, Copy, ArrowRight, BookOpen, Coins } from 'lucide-react';

interface HardshipPortalProps {
  onVerificationResult: (success: boolean, message: string, detectedBalance: number) => void;
  onSystemLog: (logText: string) => void;
  onClaimGame: (gameTitle: string) => void;
  unlockedClaims: string[];
}

export const HardshipPortal: React.FC<HardshipPortalProps> = ({
  onVerificationResult,
  onSystemLog,
  onClaimGame,
  unlockedClaims
}) => {
  const [statementText, setStatementText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'success' | 'denied'>('idle');
  const [resultMessage, setResultMessage] = useState('');
  const [parsedBalance, setParsedBalance] = useState<number | null>(null);

  // MOCK SAMPLE STATEMENTS TO LET THE USER TEST SO THEY DO NOT NEED REAL STATEMENTS
  const sampleStatements = [
    {
      label: 'Low Balance ($35.40)',
      text: `NATIONAL COOP TRUST BANK
STATEMENT PERIOD: MAY 01 - MAY 30 2026
ACCOUNT NO: *******4920
=======================================
PREVIOUS LEDGER TOTAL: $400.00
WITHDRAWALS / PYMT:   -$364.60
---------------------------------------
CURRENT ENDING BALANCE: $35.40
STATUS: REVENUE HARDSHIP LIMIT ACTIVE`,
      balance: 35.4
    },
    {
      label: 'Typical Hardship ($114.12)',
      text: `Sovereign Credit Union — Ledger Summary
ID: Peer-8840
Ledger Balance: $114.12 USD
Authorized Holds: $0.00
Available Cash Reserve: $114.12
[Anonymity Vault Token: a92f4e]`,
      balance: 114.12
    },
    {
      label: 'Exceeds Threshold ($1,420.50)',
      text: `METROPOLITAN APEX LEASING LEDGER
STATEMENT TOKEN: CORP-992F
=======================================
AVAILABLE CASH CAPITAL: $1,420.50
PENDING ESCROW SHIFT: +$8,000.00
WARNING: SURPLUS VALUE TAX THRESHOLD EXCEEDED`,
      balance: 1420.5
    }
  ];

  // SECURE CLIENT-SIDE BALANCE PARSER
  const parseStatement = (text: string) => {
    setStatus('analyzing');
    onSystemLog('INITIALIZING LOCAL VERIFICATION SANDBOX...');
    onSystemLog('isomorphic-crypto-salt: e83b2...');
    onSystemLog('Scanning statement tokens for financial balances...');

    setTimeout(() => {
      // Clean text and check values
      // Regex looking for patterns like Balance: $X, Balance X, $X.XX, ending with or containing is acceptable
      const cleanText = text.replace(/,/g, '');
      
      // Look for currency amounts like $100.00 or $ 100 or 100.00 or Balance: 100
      // Let's search for matches
      const moneyMatches = cleanText.match(/\$?\s*(\d+(\.\d{1,2})?)/g);
      let foundBalance: number | null = null;

      // Let's search specifically for keywords indicating balance
      // Like "balance", "ledger", "total", "available", "ending"
      const lines = cleanText.split('\n');
      for (const line of lines) {
        if (/balance|ledger|total|available|ending|cash|funds/i.test(line)) {
          const match = line.match(/(\d+(\.\d{1,2})?)/);
          if (match) {
            foundBalance = parseFloat(match[1]);
            break;
          }
        }
      }

      // Fallback: If no keyword matches, look for any currency match in the text
      if (foundBalance === null && moneyMatches) {
        // Find the lowest amount or the ending one
        // Let's filter out numbers likely to be dates (like 2026, 2077) or account numbers
        const candidates = moneyMatches
          .map(m => {
            const numStr = m.replace('$', '').trim();
            return parseFloat(numStr);
          })
          .filter(n => n < 10000 && n >= 0); // exclude dates or account numbers
        
        if (candidates.length > 0) {
          // Let's assume the ending balance is usually the last one or lowest candidate
          foundBalance = candidates[candidates.length - 1];
        }
      }

      if (foundBalance === null) {
        // Fallback for random text if no numbers found
        foundBalance = 0; 
      }

      setParsedBalance(foundBalance);

      if (foundBalance < 150.00) {
        const successLog = `🔴 [VALIDATION: VERIFIED] HARDSHIP CONFIRMED. Accessing Collective Chest pipeline to dispatch your game manifest...`;
        setStatus('success');
        setResultMessage(successLog);
        onVerificationResult(true, successLog, foundBalance);
        onSystemLog(`LOCAL GATEWAY PASSED: Balance detected as $${foundBalance.toFixed(2)} (< $150.00)`);
        onSystemLog(`CRYPTOGRAPHIC LICENSE TOKENS ISSUED SECURELY.`);
      } else {
        const denyLog = `🔴 [VALIDATION: DENIED] Balance parameters exceed the current community threshold cycle.`;
        setStatus('denied');
        setResultMessage(denyLog);
        onVerificationResult(false, denyLog, foundBalance);
        onSystemLog(`LOCAL GATEWAY REJECTED: Balance detected as $${foundBalance.toFixed(2)} (>= $150.00)`);
      }
    }, 1200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onSystemLog(`READING METADATA FOR: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        setStatementText(fileContent);
        parseStatement(fileContent);
      };
      reader.readAsText(file);
    }
  };

  const loadSample = (sample: typeof sampleStatements[0]) => {
    setStatementText(sample.text);
    onSystemLog(`LOADED DEMO STATEMENT: ${sample.label}`);
    parseStatement(sample.text);
  };

  return (
    <div className="space-y-6">
      {/* Structural Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-crimson/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight uppercase text-brand-text flex items-center gap-2">
            <Terminal className="w-6 h-6 text-brand-crimson-bright" />
            Verification Gateway
          </h2>
          <p className="text-sm text-brand-text-muted mt-1 font-mono">
            Pure client-side zero-knowledge evaluation ledger sandbox.
          </p>
        </div>
        <div className="text-xs font-mono bg-brand-charcoal border border-brand-slate text-brand-text-muted px-2.5 py-1 rounded">
          SANDBOX VERSION: v1.02-LOCAL
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Entry area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-brand-charcoal border border-brand-slate/60 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-brand-text flex items-center gap-1.5 font-mono">
                <FileText className="w-4 h-4 text-brand-crimson-bright" />
                RAW TEXT STATEMENT OR DATA STRING
              </label>
              
              <button 
                onClick={() => {
                  setStatementText('');
                  setStatus('idle');
                  onSystemLog('CLEARED VERIFICATION FORM.');
                }}
                className="text-xs font-mono text-brand-text-muted hover:text-brand-crimson-bright cursor-pointer"
              >
                [RESET]
              </button>
            </div>

            {/* Simulated Drag & Drop and Text Box */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-1 transition-all ${
                dragActive 
                  ? 'border-brand-crimson bg-brand-crimson/5Scale' 
                  : 'border-brand-slate/60 hover:border-brand-crimson/30'
              }`}
            >
              <textarea
                value={statementText}
                onChange={(e) => setStatementText(e.target.value)}
                placeholder="Paste account balances, transactional strings, bank PDFs exported to text, or ledger files here... For instance: 'Ending Ledger Balance: $45.20'"
                className="w-full h-44 bg-brand-obsidian/70 text-brand-text font-mono text-xs p-4 rounded focus:outline-none focus:ring-1 focus:ring-brand-crimson resize-none"
              />
              
              {dragActive && (
                <div className="absolute inset-0 bg-brand-obsidian/95 rounded-lg flex flex-col items-center justify-center gap-2 border border-brand-crimson font-mono text-xs text-brand-crimson-bright">
                  <UploadCloud className="w-8 h-8 animate-bounce" />
                  [DROP SIMULATED TEXT FILE TO ANALYZE]
                </div>
              )}
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="btn-trigger-verify"
                disabled={!statementText.trim() || status === 'analyzing'}
                onClick={() => parseStatement(statementText)}
                className={`flex-1 font-mono text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
                  statementText.trim() && status !== 'analyzing'
                    ? 'bg-brand-crimson text-white hover:bg-brand-crimson-bright hover:shadow-[0_0_12px_rgba(220,38,38,0.25)]'
                    : 'bg-brand-slate text-brand-text-muted cursor-not-allowed border border-brand-slate/40'
                }`}
              >
                {status === 'analyzing' ? 'RUNNING ISOLATED DECRYPTION...' : 'RUN VERIFICATION GATEWAY'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SIMULATOR QUICK REFS (Operational Helper) */}
          <div className="bg-brand-charcoal/50 border border-brand-slate/40 rounded-xl p-5">
            <h4 className="text-xs font-mono font-bold uppercase text-brand-text-muted mb-3">
              🔋 SIMULATOR HOTKEYS (No real document required. Click to load samples)
            </h4>
            <div className="flex flex-col sm:flex-row gap-2.5">
              {sampleStatements.map((sample, idx) => (
                <button
                  key={idx}
                  id={`demo-statement-${idx}`}
                  onClick={() => loadSample(sample)}
                  className="flex-1 bg-brand-obsidian hover:bg-brand-crimson/10 border border-brand-slate/80 hover:border-brand-crimson/50 text-brand-text hover:text-white font-mono text-xs p-2.5 rounded text-left transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson-bright"></span>
                  <div className="line-clamp-1">{sample.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Verification log readout / Output verdicts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-charcoal border border-brand-slate/60 rounded-xl p-5 flex flex-col justify-between h-full min-h-[350px]">
            <div>
              <div className="text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-3">
                [OUTPUT RESPONSE ENGINE]
              </div>

              <div className="min-h-[140px] bg-brand-obsidian border border-brand-slate p-4 rounded-lg relative overflow-hidden font-mono flex flex-col justify-center">
                {/* Visual grid behind matching cyber vibe */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />

                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-brand-text-muted text-xs space-y-2 p-4"
                    >
                      <Terminal className="w-8 h-8 text-brand-slate mx-auto animate-pulse" />
                      <p>Awaiting statement submission.</p>
                      <p className="text-[10px]">Use the hotkeys on the left or paste balance statements to run parsing rules.</p>
                    </motion.div>
                  )}

                  {status === 'analyzing' && (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-xs text-brand-crimson-bright space-y-3 font-mono"
                    >
                      <div className="w-6 h-6 border-2 border-brand-crimson border-t-transparent rounded-full animate-spin mx-auto" />
                      <div>PARSING TEXT FOR BALANCES...</div>
                    </motion.div>
                  )}

                  {/* HIGH CONTRAST SUCCESS RESPONSE BASED ON USER CRITERIA 3 */}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-emerald-500/20 pb-2">
                        <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                        [CRYPTO-INTEGRITY SECURED]
                      </div>
                      
                      {/* Precise bold Crimson validation response of user instructions */}
                      <p className="text-xs text-brand-crimson-bright font-bold leading-relaxed border border-brand-crimson/55 p-3.5 bg-brand-crimson/10 rounded-lg animate-pulse whitespace-pre-wrap">
                        {resultMessage}
                      </p>

                      <div className="text-[10px] text-emerald-400/80">
                        • SOLIDARITY LICENSE UNLOCKED: "Hades II" & "Slay the Spire 2" claim slots active.
                      </div>
                    </motion.div>
                  )}

                  {/* HIGH CONTRAST DENIED RESPONSE BASED ON USER CRITERIA 3 */}
                  {status === 'denied' && (
                    <motion.div
                      key="denied"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 text-rose-500 font-bold border-b border-rose-500/20 pb-2">
                        <AlertOctagon className="w-5 h-5 flex-shrink-0" />
                        [MUTUAL AID ADJUSTMENT NEEDED]
                      </div>

                      {/* Precise Crimson reject string from user instructions */}
                      <p className="text-xs text-brand-crimson font-bold leading-relaxed border border-brand-crimson/40 p-3.5 bg-brand-charcoal/80 rounded-lg whitespace-pre-wrap">
                        {resultMessage}
                      </p>

                      <div className="text-[10px] text-brand-text-muted">
                        • Current active community threshold margin limits subsidization to accounts with balances below $150.00 . If this was a mistake, re-export statements within the required parameters.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Solidarity Grant Claims Area (Dynamically active if verified) */}
            <div className="mt-4 pt-4 border-t border-brand-slate">
              <div className="text-xs font-mono text-brand-text-muted mb-2 uppercase">
                Claimable Subsidized Releases
              </div>
              
              {status === 'success' ? (
                <div className="space-y-2">
                  {['Hades II', 'Slay the Spire 2'].map((gameTitle) => {
                    const isClaimed = unlockedClaims.includes(gameTitle);
                    return (
                      <div 
                        key={gameTitle} 
                        className="bg-brand-obsidian/85 p-2.5 rounded border border-brand-crimson/30 flex items-center justify-between"
                      >
                        <div className="font-mono text-xs text-brand-text flex items-center gap-2">
                          <Coins className="w-3.5 h-3.5 text-brand-crimson-bright" />
                          {gameTitle}
                        </div>
                        
                        <button
                          id={`claim-action-${gameTitle.replace(/\s+/g, '-').toLowerCase()}`}
                          disabled={isClaimed}
                          onClick={() => {
                            onClaimGame(gameTitle);
                            onSystemLog(`MUTUAL-AID: SOLIDARITY MANIFEST SIGNED FOR ${gameTitle.toUpperCase()}`);
                          }}
                          className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all cursor-pointer ${
                            isClaimed 
                              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/30' 
                              : 'bg-brand-crimson text-white hover:bg-brand-crimson-bright cursor-pointer'
                          }`}
                        >
                          {isClaimed ? '[SIGNED & COMPILING]' : 'CLAIM FREE LICENSE'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-[11px] font-mono text-brand-text-muted bg-brand-obsidian/40 border border-brand-slate/40 p-3 rounded-lg text-center">
                  Unlock this panel automatically by loading a statement under $150.00 above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
