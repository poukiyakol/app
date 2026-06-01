import React, { useState, useEffect } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useLocation 
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Library, 
  Coins, 
  Terminal, 
  MessageSquare, 
  Shield, 
  Heart, 
  CornerDownRight, 
  Info,
  Settings,
  Lock,
  UserCheck
} from 'lucide-react';

import { Game, ChestStats, ConsoleMessage } from './types';
import { CatalogPage } from './pages/CatalogPage';
import { ChestPage } from './pages/ChestPage';
import { HardshipPage } from './pages/HardshipPage';
import { HotlinePage } from './pages/HotlinePage';
import { AdminPage } from './pages/AdminPage';
import { Console } from './components/Console';
import { BottomRightDock } from './components/BottomRightDock';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Deduce active page tab highlights from the real route path!
  const path = location.pathname;
  const activeTab = path === '/chest' || path === '/mutual-aid'
    ? 'chest'
    : path === '/verify' || path === '/hardship'
    ? 'verify'
    : path === '/hotline'
    ? 'hotline'
    : path === '/admin'
    ? 'admin'
    : 'library';

  // Interactive console feedback layout alert notification
  const [engineNotification, setEngineNotification] = useState<string | null>(null);

  // Unlocked games count and claims state
  const [unlockedClaims, setUnlockedClaims] = useState<string[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Callback to insert new game as an Admin
  const handleAdminAddGame = (newGameData: Omit<Game, 'id'>) => {
    const freshId = `game-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const freshGame: Game = {
      ...newGameData,
      id: freshId,
    };
    setGames(prev => [...prev, freshGame]);
  };

  // Callback to destroy game from general database catalogue
  const handleAdminRemoveGame = (gameId: string) => {
    setGames(prev => prev.filter(g => g.id !== gameId));
  };

  // Callback to add customized .exe linked binary to user catalogue
  const handleLinkLocalExeGame = (title: string, size: string, developer: string) => {
    const freshId = `exe-${Date.now()}`;
    const localGame: Game = {
      id: freshId,
      title,
      developer,
      tag: 'Mounted .exe Executable',
      icon: '💾',
      status: 'Ready to Play',
      releaseYear: 'Local Mount',
      size,
      description: 'Linked local binary filesystem bridge initialized. Compiled and running under zero-room telemetry.',
    };
    setGames(prev => [...prev, localGame]);
  };

  // Statics matching baseline core application data blueprint exactly (Rule 1 & Rule 2)
  const [games, setGames] = useState<Game[]>([
    {
      id: 'hades-2',
      title: 'Hades II',
      developer: 'Supergiant Games',
      tag: 'Action Roguelike',
      icon: '🔥',
      status: 'Ready to Play',
      releaseYear: '2024',
      size: '18.4 GB',
      description: 'Battle out of the Underworld using dark magic to take on Chronos, the Titan of Time, in this mesmerizing rogue-like sequel.'
    },
    {
      id: 'cyberpunk-2077',
      title: 'Cyberpunk 2077',
      developer: 'CD Projekt Red',
      tag: 'RPG / Sci-Fi',
      icon: '🦾',
      status: 'Installed',
      releaseYear: '2020',
      size: '70.2 GB',
      description: 'An open-world action-adventure RPG set in Night City. Venture into a cybernetic society obsessed with bio-augmentation.'
    },
    {
      id: 'slay-the-spire-2',
      title: 'Slay the Spire 2',
      developer: 'Mega Crit',
      tag: 'Deckbuilder',
      icon: '🃏',
      status: 'Update Available',
      releaseYear: '2025',
      size: '2.1 GB',
      description: 'The legendary deckbuilder returns! Draft cards, encounter cosmic horrors, and unlock artifacts of catastrophic power.'
    }
  ]);

  const [chestStats, setChestStats] = useState<ChestStats>({
    treasuryPool: '$12,450.80',
    assistanceThreshold: '< $150.00',
    disbursedSubsidies: 342,
    recentGrants: [
      { id: '#A4F', gameTitle: 'Hades II', timeAgo: '2m ago' },
      { id: '#B92', gameTitle: 'Slay the Spire 2', timeAgo: '14m ago' }
    ]
  });

  // Telemetry engine startup logs representing cooperative anti-capitalist space
  const [logs, setLogs] = useState<ConsoleMessage[]>([
    {
      id: 'boot-1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      content: 'MANIFESTO_CLIENT_BOOTSTRAP_SUCCESSFUL: INITIALIZING MULTI-PAGE ROUTERS...'
    },
    {
      id: 'boot-2',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      content: 'ROUTE DETECTED: ' + path + ' // PARSING SUB-SCHEMA PATHWAYS...'
    },
    {
      id: 'boot-3',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      content: 'DRM ENFORCERS BYPASSED. PERMANENT USER ANONYMITY CRYPTO-SEALED.'
    },
    {
      id: 'boot-welcome',
      timestamp: new Date().toLocaleTimeString(),
      type: 'response',
      content: '🔴 WELCOME TO MANIFESTO. A worker-owned game store with 0% corporate tax. Use links or direct URL routes to navigate our independent pages.'
    }
  ]);

  // Log active page routing transitions
  useEffect(() => {
    appendSystemLog(`ROUTE MOUNTED: "${path.toUpperCase()}"`, 'system');
  }, [path]);

  const appendSystemLog = (text: string, type: 'system' | 'response' | 'error' | 'success' = 'system') => {
    setLogs(prev => [
      ...prev,
      {
        id: `sys-log-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        type,
        content: text
      }
    ]);
  };

  const showLayoutNotification = (alertText: string) => {
    setEngineNotification(alertText);
    setTimeout(() => {
      setEngineNotification(null);
    }, 4000);
  };

  // Mutator to simulate $20 donation (increases Treasury Pool nicely)
  const handleDonateSimulate = () => {
    // Parse existing number
    const currentNum = parseFloat(chestStats.treasuryPool.replace(/[$,]/g, ''));
    const nextNum = currentNum + 20.00;
    
    // Format back to currency representation
    const nextFormatted = `$${nextNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    setChestStats(prev => ({
      ...prev,
      treasuryPool: nextFormatted
    }));

    appendSystemLog(`CO-OP UPDATE: Peer Solidarity donation of $20.00 recorded! Treasury Reserve Pool updated dynamically to ${nextFormatted}.`, 'success');
    showLayoutNotification('SOLIDARITY CONTRIBUTION ALIGNED // +$20 Treasury Pool');
  };

  // Hardship claimed releases updating statuses directly
  const handleClaimGame = (gameTitle: string) => {
    if (unlockedClaims.includes(gameTitle)) return;

    setUnlockedClaims(prev => [...prev, gameTitle]);
    
    // Add transaction token ID (e.g. #C24) and push to feed
    const randomHexId = `#${Math.floor(Math.random() * 0xFFF).toString(16).toUpperCase().padStart(3, '0')}`;
    const newGrant = {
      id: randomHexId,
      gameTitle,
      timeAgo: 'Just now'
    };

    setChestStats(prev => ({
      ...prev,
      disbursedSubsidies: prev.disbursedSubsidies + 1,
      recentGrants: [newGrant, ...prev.recentGrants.slice(0, 4)]
    }));

    // Update matching game status to Installed / Ready to Play in library!
    setGames(prev => prev.map(g => {
      if (g.title === gameTitle) {
        return { ...g, status: 'Ready to Play' };
      }
      return g;
    }));

    appendSystemLog(`SOLIDARITY DISPATCH: Token ${randomHexId} compiled. Manifest files for ${gameTitle.toUpperCase()} have been successfully synced to your local node.`, 'success');
  };

  // Trigger from the verification portal
  const handleVerificationResult = (success: boolean, message: string, detectedBalance: number) => {
    setIsVerified(success);
    
    if (success) {
      showLayoutNotification(`⚡ SOLIDARITY CONTRACT SIGNED // Ledger Verified ($${detectedBalance.toFixed(2)})`);
    } else {
      showLayoutNotification(`❌ POLICY REJECTION // Balance exceeds $150 hardship threshold`);
    }
  };

  // Interactive Games Actions inside Catalog Grid
  const handleGameAction = (gameTitle: string, actionType: string) => {
    appendSystemLog(`TRIGGERING CLIENT CALL: ${actionType} -> [${gameTitle.toUpperCase()}]`);

    if (actionType === 'BOOT ENGINE') {
      appendSystemLog(`DECRYPTING GZIP CONTAINER... 100% SECURE MEMORY RANGE ALLOCATED.`, 'system');
      appendSystemLog(`LAUNCHING ${gameTitle.toUpperCase()} CLIENT... [DRM: NONE - DIRECT PLAY]`, 'success');
      showLayoutNotification(`🎬 ENGINE EXECUTION: ${gameTitle} launched successfully!`);
    } else if (actionType === 'PEER PATCH') {
      appendSystemLog(`LOCATING NEIGHBOR PEERS... (32 SEEDERS CONNECTED)`, 'system');
      appendSystemLog(`PATCH PIECES DOWNLOADED: 100% SHA-256 CHECK PASS... INTEGRATING LOCAL STORAGE.`, 'success');
      
      // Mark game as Installed/Ready to play
      setGames(prev => prev.map(g => {
        if (g.title === gameTitle) {
          return { ...g, status: 'Ready to Play' };
        }
        return g;
      }));
      showLayoutNotification(`✅ PATCH COMPLETE: ${gameTitle} updated successfully.`);
    } else if (actionType === 'CHECK MANIFEST') {
      const sha = Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      appendSystemLog(`[SHA-256 MANIFEST SUM]: ${sha}`, 'response');
    } else if (actionType === 'PEER STATUS') {
      appendSystemLog(`[P2P TRACKER]: Connected to manifest tracker peer-chain. Seeders active, speed unlimited.`, 'response');
    } else if (actionType === 'CLAIM SOLIDARITY') {
      navigate('/verify');
      appendSystemLog(`ROUTING PATH TRANSITION: '/verify' -> Hardship registration pipeline loaded.`, 'system');
    }
  };

  // CORE LOGIC REGARDING THE INTERACTIVE RUNTIME KEYWORDS OR PASTED VALUES (Operational Rules 1, 2, 3, 4)
  const handleConsoleCommand = (commandText: string) => {
    const norm = commandText.trim().toLowerCase();

    // Append standard prompt line
    setLogs(prev => [
      ...prev,
      {
        id: `inp-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'input',
        content: commandText
      }
    ]);

    // RULE 5: IF THE USER ASKS FOR "ADMIN", "LOGIN" OR "CONTROL"
    if (norm === 'admin' || norm === 'login' || norm === 'control' || norm === 'root') {
      navigate('/admin');
      setLogs(prev => [
        ...prev,
        {
          id: `sys-${Date.now()}-5`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'system',
          content: 'INTERACTIVE PORT ROUTER: Navigating route pathway to "/admin"...'
        },
        {
          id: `resp-${Date.now()}-5`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'success',
          content: '🔑 [ADMIN HANDSHAKE LAYER]: Cryptographic login prompt is ready. Initialize credentials signature.'
        }
      ]);
      showLayoutNotification('🔑 INTERACTIVE PORT ROUTER: PAGE "/admin" ALIGNED');
      return;
    }

    // RULE 1: IF THE USER ASKS FOR "LIBRARY" OR "GAMES"
    if (norm === 'library' || norm === 'games' || norm === 'game' || norm === 'lib') {
      navigate('/library');
      setLogs(prev => [
        ...prev,
        {
          id: `sys-${Date.now()}-1`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'system',
          content: 'INTERACTIVE PORT ROUTER: Navigating route pathway to "/library"...'
        },
        {
          id: `resp-${Date.now()}-1`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'success',
          content: '🔴 [CRIMSON ENGINE ONLINE] Store cut 0% initialized. Secure user accounts 100% DRM-Free.'
        }
      ]);
      showLayoutNotification('📺 INTERACTIVE PORT ROUTER: PAGE "/library" ALIGNED');
      return;
    }

    // RULE 2: IF THE USER ASKS FOR "COLLECTIVE CHEST", "MUTUAL AID", OR "FUND"
    if (
      norm === 'collective chest' || 
      norm === 'mutual aid' || 
      norm === 'fund' || 
      norm === 'chest' || 
      norm === 'mutual' || 
      norm === 'aid' || 
      norm === 'collective'
    ) {
      navigate('/chest');
      setLogs(prev => [
        ...prev,
        {
          id: `sys-${Date.now()}-2`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'system',
          content: 'INTERACTIVE PORT ROUTER: Navigating route pathway to "/chest"...'
        },
        {
          id: `resp-${Date.now()}-2`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'success',
          content: `🔴 [MUTUAL AID METRICS]: Reserve Treasury: ${chestStats.treasuryPool} | Hardship Upper Margin Threshold: ${chestStats.assistanceThreshold} | Total Disbursed: ${chestStats.disbursedSubsidies} Licences.`
        }
      ]);
      showLayoutNotification('📺 INTERACTIVE PORT ROUTER: PAGE "/chest" ALIGNED');
      return;
    }

    // RULE 3: IF THE USER PASTES A BANK STATEMENT OR BALANCE STRINGS
    const cleanTerm = norm.replace(/,/g, '');
    const moneyMatches = cleanTerm.match(/\$?\s*(\d+(\.\d{1,2})?)/g);
    let parsedBal: number | null = null;

    // Checks specifically for balance values
    if (/balance|ledger|total|available|ending|cash|funds/i.test(cleanTerm)) {
      const match = cleanTerm.match(/(\d+(\.\d{1,2})?)/);
      if (match) {
        parsedBal = parseFloat(match[1]);
      }
    }

    if (parsedBal === null && moneyMatches && moneyMatches.length > 0) {
      const candidates = moneyMatches
        .map(m => parseFloat(m.replace('$', '').trim()))
        .filter(n => n < 10000 && n >= 0);
      if (candidates.length > 0) {
        parsedBal = candidates[candidates.length - 1]; // Assume the final summary number is the ledger balance
      }
    }

    // If it's a statement with parsed balance or generic numbers
    const containsNumericValue = parsedBal !== null || /balance|ledger|statement|account|trx|holding|funds/i.test(norm);

    if (containsNumericValue) {
      const detectedVal = parsedBal ?? 0;
      navigate('/verify');
      
      setLogs(prev => [
        ...prev,
        {
          id: `sys-${Date.now()}-3`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'system',
          content: `VERIFICATION GATEWAY ACTIVE: ROUTING USER TO "/verify" AND SCANNING STATEMENT DATA ($${detectedVal.toFixed(2)})...`
        }
      ]);

      setTimeout(() => {
        if (detectedVal < 150.00) {
          setIsVerified(true);
          const succMsg = `🔴 [VALIDATION: VERIFIED] HARDSHIP CONFIRMED. Accessing Collective Chest pipeline to dispatch your game manifest...`;
          
          setLogs(prev => [
            ...prev,
            {
              id: `resp-success-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              type: 'success',
              content: succMsg
            }
          ]);
          showLayoutNotification('⚡ SECURE HANDSHAKE GRANTED // Hardship Approved');
        } else {
          const failMsg = `🔴 [VALIDATION: DENIED] Balance parameters exceed the current community threshold cycle.`;
          
          setLogs(prev => [
            ...prev,
            {
              id: `resp-fail-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              type: 'error',
              content: failMsg
            }
          ]);
          showLayoutNotification('❌ DECRYPTION REJECTED // Threshold exceeded');
        }
      }, 400);
      return;
    }

    // RULE 4: IF THE USER ASKS GENERAL QUESTIONS ABOUT THE PLATFORM OR STORE
    const faqs = [
      {
        keywords: ["different", "steam", "epic", "store", "gog", "platform"],
        answer: "We are worker-owned. Unlike multinational publishers taking 30% cuts to feed executive dividends, Manifesto operates on a 0% platform extraction fee, paying 100% of game values straight back to developer cooperatives. There is zero corporate boardroom oversight."
      },
      {
        keywords: ["cut", "commission", "fee", "0%", "zero", "percent", "profit"],
        answer: "We believe digital distribution is an infrastructure service, not an extractive taxing right. Our operational expenses are fully covered by voluntary solidarity pledges and a small 2% peer-to-peer ledger tax on standard users who can afford it. That means developer partners hold absolute sovereignty over their creations."
      },
      {
        keywords: ["anonymity", "privacy", "track", "data", "anonymous", "ledger", "cookies", "account"],
        answer: "We reject telemetry, mandatory email binds, and financial profiling trackers. Our launcher compiles locally, and game configurations reside on your local machine with peer authentication happening solely via static hashes. We don't build consumer metrics; we build local gaming freedom."
      },
      {
        keywords: ["owner", "own", "founder", "run", "coop", "cooperative", "who is", "who are"],
        answer: "Manifesto belongs to the makers and the players as an indivisible cooperative. Each developer team and active user holds single franchise votes on resource distribution schemes, removing corporate intermediaries entirely. We have no external venture investors or shareholders."
      },
      {
        keywords: ["chest", "mutual aid", "fund", "hardship", "subsidize", "verify", "pool"],
        answer: "It allows users in economic distress to download releases completely subsidized, funded by standard user purchases and solidarity donations. By verifying your current ledger ending balance falls under $150, our sandbox grants temporary crypto-manifest vouchers to download products immediately. High-tier contributors keep the pool replenished."
      },
      {
        keywords: ["piracy", "legal", "stole", "steal", "free", "copyright", "law"],
        answer: "This is fully authorized mutual aid, never piracy. Every single game manifest claimed via the Collective Chest has its licensing price fully paid back to the developer, funded directly by the cooperative's treasury reserve pool. We stand as a protective shield ensuring no creator or player goes hungry."
      }
    ];

    const matchFaq = faqs.find(f => f.keywords.some(k => norm.includes(k)));
    
    if (matchFaq) {
      navigate('/hotline');
      setLogs(prev => [
        ...prev,
        {
          id: `sys-${Date.now()}-4`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'system',
          content: 'INTERACTIVE SERVICE DIRECT ROUTE TO "/hotline"...'
        },
        {
          id: `resp-faq-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'response',
          content: `[HOTLINE RETRIEVAL]: ${matchFaq.answer}`
        }
      ]);
      showLayoutNotification('💬 SOVEREIGN PEER ROUTE TRIGGERED');
      return;
    }

    // Default Fallback
    navigate('/hotline');
    setLogs(prev => [
      ...prev,
      {
        id: `resp-db-default-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'response',
        content: `[PEER HOTLINE]: We stand together, peer. While our index databases expand, rest assured Manifesto is 100% worker-owned with a 0% platform tax. Anonymity is kept permanently secure for all developers and players.`
      }
    ]);
    showLayoutNotification('💬 PEER HOTLINE DIRECT COMMUNICATOR');
  };

  return (
    <div className="min-h-screen bg-brand-obsidian text-brand-text flex flex-col font-sans relative selection:bg-brand-crimson selection:text-white">
      {/* Decorative dark grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#151722_1px,transparent_1px),linear-gradient(to_bottom,#151722_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />
      
      {/* Top Header Navigation Strip */}
      <header className="border-b-2 border-brand-charcoal bg-brand-obsidian/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Anti-Corporate Branding Logo */}
        <Link to="/" className="flex items-center gap-3 select-none no-underline hover:opacity-90">
          <div className="w-10 h-10 bg-brand-crimson hover:bg-brand-crimson-bright border-2 border-brand-crimson-bright rounded-lg flex items-center justify-center font-bold text-xl text-white transform hover:rotate-6 transition-all shadow-[0_0_12px_rgba(220,38,38,0.4)]">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold font-sans tracking-wide uppercase text-white leading-none">
              Manifesto
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-[#ef4444] mt-1 uppercase flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-full animate-ping"></span>
              [WORKER-OWNED DEFIANT STOREFRONT]
            </p>
          </div>
        </Link>

        {/* Global application parameters visualizers */}
        <div className="hidden xl:flex items-center gap-5 text-xs font-mono border-l border-brand-slate/60 pl-5">
          <div className="flex flex-col">
            <span className="text-brand-text-muted uppercase text-[9px] font-bold">PLATFORM ROYALTY CUT</span>
            <span className="text-brand-crimson-bright font-bold">[0.00% EXTRACTIVE TAX]</span>
          </div>
          <div className="flex flex-col">
            <span className="text-brand-text-muted uppercase text-[9px] font-bold">CREATOR COMPENSATION SHARE</span>
            <span className="text-white font-bold">[100.00% TO HANDS OF LABOUR]</span>
          </div>
          <div className="flex flex-col">
            <span className="text-brand-text-muted uppercase text-[9px] font-bold">SECURITY ANONYMITY CRYPTO</span>
            <span className="text-emerald-400 font-bold">[PERMANENTLY SECURED]</span>
          </div>
        </div>

        {/* Navigation Router Links of our Multi-Page Setup */}
        <nav className="flex flex-wrap items-center gap-1.5 bg-brand-charcoal p-1.5 rounded-lg border border-brand-slate/60 w-full lg:w-auto overflow-x-auto justify-center">
          <Link
            to="/library"
            id="tab-btn-library"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-xs font-medium uppercase tracking-tight transition-all no-underline ${
              activeTab === 'library'
                ? 'bg-brand-crimson text-white shadow-[0_0_8px_rgba(220,38,38,0.35)]'
                : 'text-brand-text-muted hover:text-white hover:bg-brand-slate'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            🕹️ Catalogue
          </Link>

          <Link
            to="/chest"
            id="tab-btn-chest"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-xs font-medium uppercase tracking-tight transition-all no-underline ${
              activeTab === 'chest'
                ? 'bg-brand-crimson text-white shadow-[0_0_8px_rgba(220,38,38,0.35)]'
                : 'text-brand-text-muted hover:text-white hover:bg-brand-slate'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            🪙 Mutual Aid Chest
          </Link>

          <Link
            to="/verify"
            id="tab-btn-verify"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-xs font-medium uppercase tracking-tight transition-all no-underline ${
              activeTab === 'verify'
                ? 'bg-brand-crimson text-white shadow-[0_0_8px_rgba(220,38,38,0.35)]'
                : 'text-brand-text-muted hover:text-white hover:bg-brand-slate'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            🔒 Hardship Gateway
          </Link>

          <Link
            to="/hotline"
            id="tab-btn-hotline"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-xs font-medium uppercase tracking-tight transition-all no-underline ${
              activeTab === 'hotline'
                ? 'bg-brand-crimson text-white shadow-[0_0_8px_rgba(220,38,38,0.35)]'
                : 'text-brand-text-muted hover:text-white hover:bg-brand-slate'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            💬 Community Hotline
          </Link>

          <Link
            to="/admin"
            id="tab-btn-admin"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-xs font-bold uppercase tracking-tight transition-all no-underline ${
              activeTab === 'admin'
                ? 'bg-brand-crimson text-white shadow-[0_0_8px_rgba(220,38,38,0.35)] border border-brand-crimson-bright'
                : isAdmin
                ? 'text-emerald-400 border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10'
                : 'text-brand-text-muted hover:text-white hover:bg-brand-slate'
            }`}
          >
            {isAdmin ? <UserCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <Lock className="w-3.5 h-3.5" />}
            {isAdmin ? '🔑 ADMIN PORT' : '🔒 ADMIN PANEL'}
          </Link>
        </nav>
      </header>

      {/* Main Core View Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 flex flex-col gap-8 relative z-10 animate-fade-in">
        
        {/* Micro-Notification Banner for Interactive Feedback */}
        <AnimatePresence>
          {engineNotification && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              className="bg-brand-crimson/15 border border-brand-crimson/60 p-3 rounded-lg overflow-hidden"
              id="layout-action-alert"
            >
              <div className="flex items-center gap-2.5 font-mono text-xs text-brand-crimson-bright">
                <span className="w-2 h-2 rounded-full bg-brand-crimson-bright animate-ping" />
                <span className="font-bold flex items-center gap-1">
                  <Info className="w-4 h-4" /> ENGINE TELEMETRY REGISTERED:
                </span>
                <span>{engineNotification}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Route View Frame (Multi-page configuration via react-router Routes) */}
        <div className="bg-brand-charcoal/30 border border-brand-slate/40 p-6 rounded-2xl shadow-xl min-h-[460px] flex flex-col justify-between">
          <Routes>
            <Route path="/" element={<CatalogPage games={games} onAction={handleGameAction} />} />
            <Route path="/library" element={<CatalogPage games={games} onAction={handleGameAction} />} />
            
            <Route path="/chest" element={
              <ChestPage 
                stats={chestStats} 
                onDonateSimulate={handleDonateSimulate}
                onTransitionToVerify={() => navigate('/verify')}
              />
            } />
            <Route path="/mutual-aid" element={
              <ChestPage 
                stats={chestStats} 
                onDonateSimulate={handleDonateSimulate}
                onTransitionToVerify={() => navigate('/verify')}
              />
            } />

            <Route path="/verify" element={
              <HardshipPage
                onVerificationResult={handleVerificationResult}
                onSystemLog={appendSystemLog}
                onClaimGame={handleClaimGame}
                unlockedClaims={unlockedClaims}
              />
            } />
            <Route path="/hardship" element={
              <HardshipPage
                onVerificationResult={handleVerificationResult}
                onSystemLog={appendSystemLog}
                onClaimGame={handleClaimGame}
                unlockedClaims={unlockedClaims}
              />
            } />

            <Route path="/hotline" element={<HotlinePage onSystemLog={appendSystemLog} />} />
            
            <Route path="/admin" element={
              <AdminPage 
                games={games}
                isAdmin={isAdmin}
                onSetIsAdmin={setIsAdmin}
                onAddGame={handleAdminAddGame}
                onRemoveGame={handleAdminRemoveGame}
                onSystemLog={appendSystemLog}
              />
            } />
          </Routes>
        </div>

        {/* Global command prompt / live diagnostic logs shell terminal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-brand-text-muted flex items-center gap-1 uppercase font-bold tracking-wider">
              <CornerDownRight className="w-3.5 h-3.5 text-brand-crimson-bright" />
              Interactive Console Routing Interface
            </span>
            <span className="text-[9px] font-mono text-brand-text-muted select-none font-bold">
              MULTI-PAGE URI MODERATION: ACTIVE
            </span>
          </div>
          <Console 
            logs={logs} 
            onCommandRun={handleConsoleCommand}
            onClearLogs={() => {
              setLogs([{
                id: 'sys-cleared',
                timestamp: new Date().toLocaleTimeString(),
                type: 'system',
                content: 'TERMINAL HISTORIC RECORDS CLEARED. SESSION ENCRYPTED.'
              }]);
            }}
          />
        </div>
      </main>

      {/* Bottom Floating Peer and Executable Dock */}
      <BottomRightDock 
        onAddLocalExeGame={handleLinkLocalExeGame}
        onSystemLog={appendSystemLog}
        onShowNotification={showLayoutNotification}
      />

      {/* Atmospheric minimal bottom footer */}
      <footer className="border-t border-brand-charcoal py-4 px-6 text-center text-xs font-mono text-brand-text-muted/60 bg-brand-obsidian z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p>
            Manifesto Digital Distribution Guild © 2026. Permanent User Anonymity Vouched.
          </p>
          <p className="text-brand-crimson-bright flex items-center gap-1.5 font-bold">
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-brand-crimson-bright" />
            IN VOLUNTARY SOLIDARITY WITH LABOUR WORLDWIDE
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
