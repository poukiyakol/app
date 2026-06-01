import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Game } from '../types';
import { 
  Key, 
  Trash2, 
  Plus, 
  Database, 
  ShieldAlert, 
  UserCheck, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  X,
  FileCode,
  HardDrive
} from 'lucide-react';

interface AdminPageProps {
  games: Game[];
  isAdmin: boolean;
  onSetIsAdmin: (val: boolean) => void;
  onAddGame: (game: Omit<Game, 'id'>) => void;
  onRemoveGame: (gameId: string) => void;
  onSystemLog: (text: string, type?: 'system' | 'response' | 'error' | 'success') => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  games,
  isAdmin,
  onSetIsAdmin,
  onAddGame,
  onRemoveGame,
  onSystemLog,
}) => {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Add game Form states
  const [title, setTitle] = useState('');
  const [developer, setDeveloper] = useState('');
  const [tag, setTag] = useState('Action / Sci-Fi');
  const [icon, setIcon] = useState('🎮');
  const [status, setStatus] = useState<Game['status']>('Ready to Play');
  const [releaseYear, setReleaseYear] = useState('2026');
  const [size, setSize] = useState('15.0 GB');
  const [description, setDescription] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Sub-tab under admin panel: either "Add Game" or "Review/Delete Catalogue"
  const [adminTab, setAdminTab] = useState<'add' | 'manage'>('add');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'admin' || password.trim().toLowerCase() === 'coop') {
      onSetIsAdmin(true);
      setLoginError('');
      onSystemLog('ADMIN_SESSION_INITIATED: Validated cryptographic key signature. Core database permission scope unlocked.', 'success');
    } else {
      setLoginError('CRYPTOGRAPHIC VERIFICATION FAILED: Invalid passcode signature.');
      onSystemLog('ADMIN_LOGIN_REJECTED: Unauthorized authentication handshake attempt.', 'error');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !developer || !description) {
      alert('Please fill out the Title, Developer, and Description parameters.');
      return;
    }

    onAddGame({
      title,
      developer,
      tag,
      icon,
      status,
      releaseYear,
      size,
      description
    });

    setFormSuccess(true);
    onSystemLog(`MANIFEST_COMPILED_SUCCESSFULLY: Added "${title.toUpperCase()}" to global catalogue. Broadcasted metadata to peer network.`, 'success');

    // Reset Form fields appropriately
    setTitle('');
    setDeveloper('');
    setDescription('');
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleQuickBypass = () => {
    onSetIsAdmin(true);
    setLoginError('');
    onSystemLog('DEMO ACCESS ALIGNED: Switched system role to Administrator bypassing prompt.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Route Header */}
      <div className="flex items-center justify-between border-b border-brand-crimson/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
          <span>MANIFESTO</span>
          <span>/</span>
          <span className="text-brand-crimson-bright font-bold uppercase">Admin Centre</span>
          <span>/</span>
          <span className="text-[10px] bg-brand-charcoal px-2 py-0.5 rounded border border-brand-slate text-brand-crimson-bright">
            {isAdmin ? 'SESSION: UNLOCKED' : 'SESSION: RESTRICTED'}
          </span>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              onSetIsAdmin(false);
              onSystemLog('ADMIN_SESSION_TERMINATED: Secure memory purge completed.', 'system');
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-brand-slate hover:bg-brand-crimson hover:text-white rounded text-[11px] font-mono border border-brand-slate text-brand-text-muted leading-none shadow transition-all cursor-pointer"
          >
            🔒 Terminate Console
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isAdmin ? (
          /* Sleek Passcode Authentication Lockbox */
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto bg-brand-charcoal border-2 border-brand-slate/80 p-8 rounded-2xl relative overflow-hidden shadow-2xl space-y-6 mt-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-crimson/15 to-transparent pointer-events-none" />
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-brand-crimson/10 border border-brand-crimson/50 text-brand-crimson-bright rounded-xl flex items-center justify-center mx-auto text-xl shadow-lg">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                ADMIN ACCESS HANDSHAKE
              </h3>
              <p className="text-xs text-brand-text-muted font-mono">
                Verify credential key signature to administer developer manifests.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider block">
                  Console Key / Code
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 'admin' or 'coop'"
                  className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none transition-colors"
                />
              </div>

              {loginError && (
                <p className="text-xs text-brand-crimson-bright font-mono bg-brand-crimson/10 border border-brand-crimson/40 p-2.5 rounded text-center">
                  ⚠️ {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-xs py-2.5 px-4 rounded-lg tracking-wider uppercase font-bold transition-all hover:shadow-[0_0_12px_rgba(220,38,38,0.4)] cursor-pointer"
              >
                Unlock Management Pipeline
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-brand-slate/40"></div>
              <span className="flex-shrink mx-4 text-[10px] font-mono text-brand-text-muted/60 uppercase">DEMO SHORTCUT</span>
              <div className="flex-grow border-t border-brand-slate/40"></div>
            </div>

            <button
              onClick={handleQuickBypass}
              className="w-full border border-brand-slate hover:bg-brand-slate/40 text-brand-text-muted hover:text-white font-mono text-xs py-2 rounded-lg transition-all"
            >
              🔓 Instant Developer Bypass (Demo Unlock)
            </button>
          </motion.div>
        ) : (
          /* unlocked control desk interface */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Header statistics section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-brand-charcoal p-4 rounded-xl border border-brand-slate/60 space-y-1">
                <p className="text-[10px] font-mono text-brand-text-muted uppercase">ACTIVE COMPILATIONS</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-mono text-brand-crimson-bright">
                    {games.length}
                  </span>
                  <Database className="w-4 h-4 text-brand-text-muted" />
                </div>
              </div>
              <div className="bg-brand-charcoal p-4 rounded-xl border border-brand-slate/60 space-y-1">
                <p className="text-[10px] font-mono text-brand-text-muted uppercase">CUMULATIVE BANDWIDTH</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    94.2 TB
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="bg-brand-charcoal p-4 rounded-xl border border-brand-slate/60 space-y-1">
                <p className="text-[10px] font-mono text-brand-text-muted uppercase">SEEDED TORRENT CLUSTERS</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold font-mono text-cyan-400">
                    24 Active
                  </span>
                  <Compass className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="bg-brand-charcoal p-4 rounded-xl border border-brand-slate/60 space-y-1">
                <p className="text-[10px] font-mono text-brand-text-muted uppercase">ROLE CREDENTIALS</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> ROOT_OWNER
                  </span>
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Toggle tabs */}
            <div className="flex border-b border-brand-slate/80 font-mono text-xs">
              <button
                onClick={() => setAdminTab('add')}
                className={`py-3 px-6 px-4 font-bold border-b-2 transition-colors uppercase cursor-pointer ${
                  adminTab === 'add'
                    ? 'border-brand-crimson text-white bg-brand-charcoal/30'
                    : 'border-transparent text-brand-text-muted hover:text-white'
                }`}
              >
                ⚡ Insert Game Manifest
              </button>
              <button
                onClick={() => setAdminTab('manage')}
                className={`py-3 px-6 px-4 font-bold border-b-2 transition-colors uppercase cursor-pointer ${
                  adminTab === 'manage'
                    ? 'border-brand-crimson text-white bg-brand-charcoal/30'
                    : 'border-transparent text-brand-text-muted hover:text-white'
                }`}
              >
                🗑️ Manage / Prune Library ({games.length})
              </button>
            </div>

            {/* Sub views */}
            <div>
              {adminTab === 'add' ? (
                /* ADD GAME FORM */
                <form onSubmit={handleFormSubmit} className="bg-brand-charcoal border border-brand-slate/60 p-6 rounded-xl space-y-5">
                  <div className="flex justify-between items-center border-b border-brand-slate/40 pb-3">
                    <h3 className="font-bold text-sm text-white font-mono uppercase flex items-center gap-2">
                      <Plus className="w-4 h-4 text-brand-crimson-bright animate-pulse" /> Compilation Builder Engine
                    </h3>
                    <span className="text-[10px] font-mono text-brand-text-muted">STATUS: VERIFIED SECURE</span>
                  </div>

                  {formSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-lg flex items-center gap-2 font-mono"
                    >
                      <CheckCircle2 className="w-4 h-4" /> SUCCESS: Manifest built & synced across active seeds immediately.
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Game Title */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider">
                        Game Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hollow Knight: Silksong"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Developer Cooperative */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider">
                        Developer / Studio Coop *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Team Cherry"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Tag genre */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider">
                        Genre Tags
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Metroidvania / Atmos"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Visual Asset Icon */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider">
                        Visual Icon Symbol (Emoji)
                      </label>
                      <select
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors font-sans"
                      >
                        <option value="🎮">🎮 standard controller</option>
                        <option value="🔥">🔥 blaze fire</option>
                        <option value="🦾">🦾 mechanical arm</option>
                        <option value="🃏">🃏 card deck</option>
                        <option value="🚀">🚀 rocket spacer</option>
                        <option value="💾">💾 retro floppy</option>
                        <option value="👾">👾 direct bios monster</option>
                        <option value="🦊">🦊 wildlife mascot</option>
                        <option value="⚡">⚡ quantum spark</option>
                        <option value="⚔️">⚔️ dynamic blades</option>
                      </select>
                    </div>

                    {/* Game size */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider">
                        Compile Size (disk weight)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 18.5 GB"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Release Year */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider">
                        Manifest Year of Release
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2026"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Starting client status */}
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider">
                        Initial Local Sync Status
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['Ready to Play', 'Installed', 'Update Available', 'Claimable Subsidized'] as Game['status'][]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setStatus(s)}
                            className={`p-2.5 rounded-lg border text-xs font-mono transition-all text-center uppercase cursor-pointer ${
                              status === s
                                ? 'bg-brand-crimson border-brand-crimson text-white font-bold'
                                : 'bg-brand-obsidian border-brand-slate/60 text-brand-text-muted hover:text-white'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description prompt statement */}
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-mono text-brand-text-muted uppercase font-bold tracking-wider col-span-2">
                        Chronological Game Description *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Explain the work, anti-boardroom subversions, cooperative elements, or atmospheric traits..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-slate focus:border-brand-crimson rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-slate/40 flex justify-end">
                    <button
                      type="submit"
                      className="bg-brand-crimson hover:bg-brand-crimson-bright text-white px-5 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(220,38,38,0.3)] hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] bg-red-600"
                    >
                      <FileCode className="w-4 h-4" /> Assemble Manifest & Sync Seed
                    </button>
                  </div>
                </form>
              ) : (
                /* MANAGE AND DELETE LIBRARY CATALOG */
                <div className="bg-brand-charcoal border border-brand-slate/60 rounded-xl overflow-hidden">
                  <div className="p-4 bg-brand-obsidian/40 border-b border-brand-slate/60 flex justify-between items-center font-mono text-xs">
                    <span className="text-brand-text-muted">MANIFEST SIGNATURE INDICES</span>
                    <span className="text-brand-crimson-bright font-bold">WARNING: IMMEDIATE PURGE PROCESS</span>
                  </div>

                  <div className="divide-y divide-brand-slate/50">
                    {games.map((g) => (
                      <div key={g.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-brand-slate/25 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl filter drop-shadow">{g.icon}</span>
                          <div>
                            <h4 className="font-bold text-white tracking-tight flex items-center gap-2">
                              {g.title}
                              <span className="text-[9px] font-mono bg-brand-slate px-1.5 py-0.5 rounded text-brand-text-muted border border-brand-slate/40">
                                {g.releaseYear}
                              </span>
                            </h4>
                            <p className="text-xs text-brand-text-muted">
                              compiled by {g.developer} • {g.size} ({g.tag})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <span className="text-[10px] font-mono text-brand-text-muted uppercase border border-brand-slate px-2 py-0.5 rounded bg-brand-obsidian">
                            status: {g.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onRemoveGame(g.id);
                              onSystemLog(`PURGED_MANIFEST_INDEX: Destroyed local and network manifest references for "${g.title.toUpperCase()}".`, 'error');
                            }}
                            className="bg-brand-crimson/10 hover:bg-brand-crimson border border-brand-crimson/40 hover:border-brand-crimson text-brand-crimson-bright hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Purge
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {games.length === 0 && (
                    <div className="p-8 text-center text-brand-text-muted font-mono text-xs space-y-2">
                      <p>⚠️ INDEX TREE IS EMPTY: No active software manifolds registered.</p>
                      <button 
                        onClick={() => setAdminTab('add')}
                        className="text-brand-crimson-bright hover:underline text-xs"
                      >
                        [Assemble new manifest]
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
