import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Upload, 
  Compass, 
  Plus, 
  UserPlus, 
  Link2, 
  HardDrive, 
  FolderPlus, 
  ExternalLink,
  CheckCircle,
  FileCode,
  Sparkles,
  RefreshCw,
  Heart
} from 'lucide-react';
import { Game } from '../types';

interface PeerFriend {
  id: string;
  name: string;
  status: string;
  isPlaying: string;
  isSeeding: boolean;
  ping: number;
}

interface BottomRightDockProps {
  onAddLocalExeGame: (title: string, size: string, developer: string) => void;
  onSystemLog: (text: string, type?: 'system' | 'response' | 'error' | 'success') => void;
  onShowNotification: (text: string) => void;
}

export const BottomRightDock: React.FC<BottomRightDockProps> = ({
  onAddLocalExeGame,
  onSystemLog,
  onShowNotification,
}) => {
  // Toggle states
  const [activeTab, setActiveTab] = useState<'friends' | 'integration' | null>(null);

  // Friends & Peers list state setup
  const [peers, setPeers] = useState<PeerFriend[]>([
    {
      id: 'peer-1',
      name: 'sol_berlin_coop',
      status: 'playing',
      isPlaying: 'Hades II',
      isSeeding: true,
      ping: 28,
    },
    {
      id: 'peer-2',
      name: 'tokyo_peer_x2',
      status: 'seeding',
      isPlaying: 'Cyberpunk 2077',
      isSeeding: true,
      ping: 110,
    },
    {
      id: 'peer-3',
      name: 'paris_activist_net',
      status: 'idle',
      isPlaying: '',
      isSeeding: false,
      ping: 42,
    },
  ]);

  // Peer adding states
  const [newPeerName, setNewPeerName] = useState('');
  const [newPeerGame, setNewPeerGame] = useState('');

  // Storage / custom libraries list state
  const [libraries, setLibraries] = useState<string[]>([
    'C:\\Games\\ManifestoCoop',
    '/usr/local/share/sovereign-games',
  ]);
  const [newLibPath, setNewLibPath] = useState('');

  // .exe uploading states
  const [exeFileName, setExeFileName] = useState('');
  const [exeGameTitle, setExeGameTitle] = useState('');
  const [exeGameDeveloper, setExeGameDeveloper] = useState('');
  const [exeGameSize, setExeGameSize] = useState('4.2 GB');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPeer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPeerName.trim()) return;

    const newPeer: PeerFriend = {
      id: `peer-${Date.now()}`,
      name: newPeerName.trim().toLowerCase(),
      status: newPeerGame ? 'playing' : 'idle',
      isPlaying: newPeerGame || '',
      isSeeding: Math.random() > 0.4,
      ping: Math.floor(Math.random() * 80) + 15,
    };

    setPeers(prev => [...prev, newPeer]);
    onSystemLog(`PEER_REGISTERED: Integrated direct client route map to peer node "${newPeer.name}". Handshake ping verified at ${newPeer.ping}ms.`, 'success');
    onShowNotification(`👥 P2P NODE ESTABLISHED // Connected to user ${newPeer.name}`);

    // Reset fields
    setNewPeerName('');
    setNewPeerGame('');
  };

  const handleAddLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLibPath.trim()) return;

    const formattedPath = newLibPath.trim();
    if (libraries.includes(formattedPath)) {
      alert('This storage pathway is already registered.');
      return;
    }

    setLibraries(prev => [...prev, formattedPath]);
    onSystemLog(`STORAGE_MOUNT_ESTABLISHED: Registered new dynamic file storage library directory at [${formattedPath}]. Scanning catalog indices...`, 'success');
    onShowNotification(`📂 NEW DIRECTORY REGISTERED // Mounted path ${formattedPath}`);
    setNewLibPath('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, ""); // strip extension e.g., Celeste.exe -> Celeste
      
      setExeFileName(file.name);
      setExeGameTitle(nameWithoutExt);
      
      // Compute reasonable size to display
      const computedSize = (file.size / (1024 * 1024 * 1024)).toFixed(2);
      const displayedSize = parseFloat(computedSize) > 0.05 ? `${computedSize} GB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      setExeGameSize(displayedSize);
      setExeGameDeveloper('Mounted Local Binary');
    }
  };

  const handleExeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exeGameTitle.trim()) {
      alert('Please specify a title for the local executable.');
      return;
    }

    onAddLocalExeGame(exeGameTitle.trim(), exeGameSize, exeGameDeveloper.trim() || 'Mounted Local Binary');
    
    onSystemLog(`LOCAL_DISK_EXE_LINKED: Established instant operational link with dynamic executable "${exeFileName || exeGameTitle + '.exe'}". Syncing client configurations.`, 'success');
    onShowNotification(`💾 EXPLICIT LINK SECURED // ${exeGameTitle} compiled successfully!`);

    // Reset states after linking
    setExeFileName('');
    setExeGameTitle('');
    setExeGameDeveloper('');
    setExeGameSize('4.2 GB');
    setActiveTab(null); // Close panel
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Floating control trigger dock anchored in the bottom right corner */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-brand-slate/95 border-2 border-brand-slate px-3.5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
        id="bottom-floating-dock-bar"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-text-muted select-none mr-2 border-r border-brand-charcoal pr-3 font-mono hidden sm:inline flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> peer-node-c9
        </span>

        {/* Option 1: Friends Network Toggle */}
        <button
          onClick={() => setActiveTab(prev => prev === 'friends' ? null : 'friends')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'friends'
              ? 'bg-brand-crimson text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
              : 'text-brand-text-muted hover:text-white hover:bg-brand-charcoal'
          }`}
          title="Toggle Cooperative Peer Friends List"
          id="btn-trigger-peers"
        >
          <Users className="w-3.5 h-3.5" />
          <span>🗣️ PEERS ({peers.length})</span>
        </button>

        {/* Option 2: Add game / Local storage integration Toggle */}
        <button
          onClick={() => setActiveTab(prev => prev === 'integration' ? null : 'integration')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'integration'
              ? 'bg-brand-crimson text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
              : 'text-brand-text-muted hover:text-white hover:bg-brand-charcoal'
          }`}
          title="Toggle Local Executable and Directory Integration Options"
          id="btn-trigger-mountpoint"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>💾 LINK EXECUTABLE / LIB</span>
        </button>
      </div>

      {/* Floating Side Panels popup frame */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-[88px] right-6 z-50 w-full max-w-sm sm:max-w-md bg-brand-charcoal/95 border-2 border-brand-slate rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-md overflow-hidden p-5 space-y-5"
          >
            {/* Header with Exit */}
            <div className="flex items-center justify-between border-b border-brand-slate/60 pb-3">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
                  {activeTab === 'friends' ? (
                    <><Users className="w-4 h-4 text-brand-crimson-bright" /> SOVEREIGN PEER NETWORK</>
                  ) : (
                    <><Upload className="w-4 h-4 text-brand-crimson-bright" /> LOCAL NODE DRIVER / MOUNT</>
                  )}
                </h4>
                <p className="text-[10px] text-brand-text-muted font-mono leading-none mt-1 uppercase">
                  {activeTab === 'friends' ? 'DIRECT IP ENDPOINTS • LOCK FREE' : 'BROWSABLE MOUNTPOINTS • EXECUTABLE INTEGRATOR'}
                </p>
              </div>
              <button 
                onClick={() => setActiveTab(null)}
                className="text-brand-text-muted hover:text-white bg-brand-slate/40 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Switcher */}
            {activeTab === 'friends' ? (
              /* FRIENDS TAB CONTENT */
              <div className="space-y-4">
                {/* Active Connected Contacts list */}
                <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                  {peers.map(peer => (
                    <div 
                      key={peer.id} 
                      className="p-2.5 rounded-lg bg-brand-obsidian/45 border border-brand-slate/40 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className={`w-2.5 h-2.5 rounded-full ${peer.isSeeding ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'}`} />
                          {peer.isSeeding && <span className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-60" />}
                        </div>
                        <div>
                          <p className="font-mono font-bold text-white leading-none">{peer.name}</p>
                          {peer.isPlaying ? (
                            <p className="text-[10px] text-brand-text-muted mt-0.5">
                              🎮 Playing <span className="text-brand-crimson-bright font-bold">{peer.isPlaying}</span>
                            </p>
                          ) : (
                            <p className="text-[10px] text-brand-text-muted mt-0.5">🌐 Idle (Connected)</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right font-mono text-[10px] text-brand-text-muted">
                        <p className={peer.ping < 50 ? 'text-emerald-400' : 'text-brand-text-muted'}>
                          ⚡ {peer.ping}ms
                        </p>
                        {peer.isSeeding && <p className="text-[9px] text-cyan-400 uppercase font-bold">[SEEDING ACTIVE]</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adding dynamic peer friend */}
                <form onSubmit={handleAddPeer} className="border-t border-brand-slate/40 pt-3.5 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-brand-text-muted uppercase tracking-wider block">
                    🌐 Handshake With New Peer / Friend
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Peer Handle (e.g. giga_gamer)"
                      value={newPeerName}
                      onChange={(e) => setNewPeerName(e.target.value)}
                      className="bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-colors font-mono"
                    />
                    <input
                      type="text"
                      placeholder="e.g. Hades II"
                      value={newPeerGame}
                      onChange={(e) => setNewPeerGame(e.target.value)}
                      className="bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-slate hover:bg-brand-crimson font-mono text-[10px] font-bold py-2 px-3 rounded-lg border border-brand-slate text-brand-text hover:text-white uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> ESTABLISH P2P TUNNEL
                  </button>
                </form>

                <div className="bg-brand-crimson/5 border border-brand-crimson/20 rounded-lg p-3 text-[10px] font-mono text-brand-text-muted leading-relaxed">
                  🔐 <strong className="text-brand-crimson-bright">DECENTRALIZED P2P DIRECT SECURED:</strong> All updates and peers interact purely over dynamic browser-to-browser hashes. No central tracking database profiles your cooperative friends.
                </div>
              </div>
            ) : (
              /* INTEGRATION TAB CONTENT */
              <div className="space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                
                {/* 1. SECTOR EXPLICIT PORT STORAGE LIBRARIES */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono font-bold text-brand-text-muted uppercase tracking-wider flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-brand-crimson-bright" /> Mounted Game Storage Libraries
                  </h5>

                  <div className="space-y-1.5">
                    <div className="p-2 bg-brand-obsidian/45 border border-brand-slate/40 rounded text-xs font-mono flex items-center justify-between text-white">
                      <span>📁 [Primary Sandbox Cache] /src/games</span>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.5 rounded font-bold">SYSTEM DEFAULT</span>
                    </div>

                    {libraries.map((lib, idx) => (
                      <div 
                        key={idx} 
                        className="p-2 bg-brand-obsidian/45 border border-brand-slate/40 rounded text-xs font-mono flex items-center justify-between text-brand-text-muted"
                      >
                        <span className="truncate pr-2">📁 {lib}</span>
                        <span className="text-[9px] text-emerald-400 flex items-center gap-0.5 font-bold flex-shrink-0">
                          <CheckCircle className="w-3 h-3" /> ATTACHED
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Add library pathway form */}
                  <form onSubmit={handleAddLibrary} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      required
                      placeholder="e.g. E:\RetroGameLibrary"
                      value={newLibPath}
                      onChange={(e) => setNewLibPath(e.target.value)}
                      className="bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-colors font-mono flex-grow"
                    />
                    <button
                      type="submit"
                      className="bg-brand-slate hover:bg-brand-crimson text-brand-text hover:text-white px-3 py-2 rounded-lg border border-brand-slate text-xs font-mono flex items-center gap-1 cursor-pointer"
                      title="Mount Custom Library Directory"
                    >
                      <FolderPlus className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                <div className="border-t border-brand-slate/40 pt-3 space-y-3">
                  {/* 2. SECTOR LOCAL GAME EXEPENDENCY COUPLER */}
                  <h5 className="text-[10px] font-mono font-bold text-brand-text-muted uppercase tracking-wider flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5 text-brand-crimson-bright" /> Mount local .exe executable binary
                  </h5>

                  <div className="bg-brand-obsidian/60 border border-dashed border-brand-slate hover:border-brand-crimson/50 rounded-xl p-4 text-center cursor-pointer transition-colors"
                       onClick={handleTriggerFileInput}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".exe"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-6 h-6 text-brand-text-muted mx-auto mb-2 animate-bounce-slow" />
                    {exeFileName ? (
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-emerald-400 font-bold truncate">✓ {exeFileName}</p>
                        <p className="text-[10px] text-brand-text-muted font-mono">{exeGameSize} detected</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white font-sans">Click to browse your computer for .exe</p>
                        <p className="text-[9px] text-brand-text-muted font-mono uppercase">Local sandbox link • No binary is ever uploaded to server</p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleExeSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-mono text-brand-text-muted uppercase block mb-1">Game Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Celeste"
                          value={exeGameTitle}
                          onChange={(e) => setExeGameTitle(e.target.value)}
                          className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-brand-text-muted uppercase block mb-1">Developer</label>
                        <input
                          type="text"
                          placeholder="e.g. Maddy Makes Games"
                          value={exeGameDeveloper}
                          onChange={(e) => setExeGameDeveloper(e.target.value)}
                          className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!exeGameTitle}
                      className="w-full bg-brand-crimson disabled:bg-brand-slate disabled:text-brand-text-muted hover:bg-brand-crimson-bright text-white font-mono text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer font-bold uppercase tracking-wider"
                    >
                      <FileCode className="w-3.5 h-3.5" /> Direct Mount To Library
                    </button>
                  </form>
                </div>
                
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface XProps {
  className?: string;
}

export const X: React.FC<XProps> = ({ className = "w-4 h-4" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};
