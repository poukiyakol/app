import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Send, User, ShieldAlert, Check } from 'lucide-react';

interface FAQItem {
  question: string;
  keywords: string[];
  answer: string;
}

interface CommunityHotlineProps {
  onSystemLog: (logText: string) => void;
}

export const CommunityHotline: React.FC<CommunityHotlineProps> = ({ onSystemLog }) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'peer'; text: string }[]>([
    {
      sender: 'peer',
      text: "Salutations, peer. I am monitoring the community node. Ask me anything about our cooperative storefront, server layouts, anonymity claims, or state guidelines. I am here to protect our space."
    }
  ]);
  const [inputText, setInputText] = useState('');

  // 2-3 Sentence short FAQ mappings matching the requested style and topics
  const faqDatabase: FAQItem[] = [
    {
      question: "What makes Manifesto different from Steam or Epic?",
      keywords: ["different", "steam", "epic", "store", "gog", "platform"],
      answer: "We are worker-owned. Unlike multinational publishers taking 30% cuts to feed executive dividends, Manifesto operates on a 0% platform extraction fee, paying 100% of game values straight back to developer cooperatives. There is zero corporate boardroom oversight."
    },
    {
      question: "Why is the store cut exactly 0%?",
      keywords: ["cut", "commission", "fee", "0%", "zero", "percent", "profit"],
      answer: "We believe digital distribution is an infrastructure service, not an extractive taxing right. Our operational expenses are fully covered by voluntary solidarity pledges and a small 2% peer-to-peer ledger tax on standard users who can afford it. That means developer partners hold absolute sovereignty over their creations."
    },
    {
      question: "How does player anonymity work here?",
      keywords: ["anonymity", "privacy", "track", "data", "anonymous", "ledger", "cookies", "account"],
      answer: "We reject telemetry, mandatory email binds, and financial profiling trackers. Our launcher compiles locally, and game configurations reside on your local machine with peer authentication happening solely via static hashes. We don't build consumer metrics; we build local gaming freedom."
    },
    {
      question: "Who owns and runs Manifesto?",
      keywords: ["owner", "own", "founder", "run", "coop", "cooperative", "who is", "who are"],
      answer: "Manifesto belongs to the makers and the players as an indivisible cooperative. Each developer team and active user holds single franchise votes on resource distribution schemes, removing corporate intermediaries entirely. We have no external venture investors or shareholders."
    },
    {
      question: "How does the mutual aid Mutual / Collective Chest work?",
      keywords: ["chest", "mutual aid", "fund", "hardship", "subsidize", "verify", "pool"],
      answer: "It allows users in economic distress to download releases completely subsidized, funded by standard user purchases and solidarity donations. By verifying your current ledger ending balance falls under $150, our sandbox grants temporary crypto-manifest vouchers to download products immediately. High-tier contributors keep the pool replenished."
    },
    {
      question: "Is this legal, or is it piracy?",
      keywords: ["piracy", "legal", "stole", "steal", "free", "copyright", "law"],
      answer: "This is fully authorized mutual aid, never piracy. Every single game manifest claimed via the Collective Chest has its licensing price fully paid back to the developer, funded directly by the cooperative's treasury reserve pool. We stand as a protective shield ensuring no creator or player goes hungry."
    }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    onSystemLog(`HOTLINE: MATCHING PEER LOG TO "${userMsg.toUpperCase().substring(0, 20)}..."`);
    setInputText('');

    // Keyword matching algorithm to retrieve corresponding FAQ responses
    setTimeout(() => {
      const normalized = userMsg.toLowerCase();
      let matchedAnswer = "";

      // Loop through database to find best match
      for (const faq of faqDatabase) {
        if (faq.keywords.some(keyword => normalized.includes(keyword))) {
          matchedAnswer = faq.answer;
          break;
        }
      }

      // Default backup response
      if (!matchedAnswer) {
        matchedAnswer = "We stand together. While our database indices continue to expand, let's keep things direct: Manifesto has 0% corporate overhead, 100% developer payout, and absolute privacy for you, our peer. What else can I secure for you?";
      }

      setMessages(prev => [...prev, { sender: 'peer', text: matchedAnswer }]);
      onSystemLog('HOTLINE: RESPONDED IN PEER VOICE SUCCESSFULLY.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Structural Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-crimson/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight uppercase text-brand-text flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-brand-crimson-bright" />
            Cooperative Hotline
          </h2>
          <p className="text-sm text-brand-text-muted mt-1 font-mono">
            Direct secure communication line with community peer moderators.
          </p>
        </div>
        <div className="text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded">
          ● PEER MONITOR ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quick Click Questions for Interactive layouts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-brand-charcoal border border-brand-slate/60 rounded-xl p-4">
            <h3 className="text-xs font-mono font-bold text-brand-crimson-bright uppercase mb-3 text-center sm:text-left">
              💬 KEY CONCEPTS & FAQ HOTLINKS
            </h3>
            
            <div className="space-y-2">
              {faqDatabase.map((faq, idx) => (
                <button
                  key={idx}
                  id={`faq-btn-${idx}`}
                  onClick={() => handleSendMessage(faq.question)}
                  className="w-full text-left bg-brand-obsidian hover:bg-brand-crimson/10 border border-brand-slate/50 hover:border-brand-crimson/40 text-brand-text hover:text-brand-crimson-bright text-xs p-3 rounded-lg font-sans font-medium hover:font-bold transition-all duration-250 flex items-start gap-2.5 group cursor-pointer"
                >
                  <span className="text-brand-crimson-bright font-mono text-[10px] bg-brand-charcoal px-1.5 py-0.5 rounded border border-brand-slate/60 flex-shrink-0 group-hover:bg-brand-crimson group-hover:text-white group-hover:border-brand-crimson transition-all">
                    Q{idx+1}
                  </span>
                  <span className="leading-tight">{faq.question}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messaging Chat Shell */}
        <div className="lg:col-span-8">
          <div className="bg-brand-charcoal border border-brand-slate/60 rounded-xl p-5 h-[400px] flex flex-col justify-between" id="hotline-chatbox">
            {/* Conversations list area */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[300px]">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-xl p-3.5 font-sans text-sm relative ${
                      msg.sender === 'user'
                        ? 'bg-brand-slate text-brand-text border border-brand-slate'
                        : 'bg-brand-obsidian text-brand-text border border-brand-crimson/25 bg-radial from-brand-charcoal to-brand-obsidian'
                    }`}>
                      {/* Sender label tag */}
                      <span className={`text-[9px] font-mono absolute -top-2.5 px-2 py-0.5 rounded border ${
                        msg.sender === 'user'
                          ? 'bg-brand-slate text-brand-text-muted border-brand-slate/80 right-2'
                          : 'bg-brand-crimson/20 text-brand-crimson-bright border-brand-crimson/40 left-2'
                      }`}>
                        {msg.sender === 'user' ? 'PEER USER' : 'SOVEREIGN MODERATOR'}
                      </span>
                      
                      <p className="leading-relaxed mt-0.5">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Send input text bar */}
            <div className="mt-4 pt-3 border-t border-brand-slate/40 flex gap-2">
              <input
                id="hotline-chat-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputText);
                  }
                }}
                placeholder="Ask our peer hotline directly... (Type e.g. '0%', 'anonymity', 'piracy', 'owners')"
                className="flex-grow bg-brand-obsidian text-brand-text font-mono text-xs px-4 py-3 rounded-lg border border-brand-slate/80 focus:outline-none focus:ring-1 focus:ring-brand-crimson placeholder-brand-text-muted/60"
              />
              <button
                id="btn-hotline-send"
                onClick={() => handleSendMessage(inputText)}
                className="bg-brand-crimson hover:bg-brand-crimson-bright text-white px-5 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow active:scale-95 border border-brand-crimson-bright/40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
