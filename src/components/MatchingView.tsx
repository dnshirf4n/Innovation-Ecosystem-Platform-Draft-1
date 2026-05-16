import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  BrainCircuit, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Zap,
  ArrowRightLeft,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockStartups = [
  { id: '1', name: 'FinFlow', industry: 'Fintech', stage: 'growth', needs: ['Scaling', 'Compliance'] },
  { id: '2', name: 'HealthSync', industry: 'Health', stage: 'mvp', needs: ['Regulatory AI', 'Growth'] },
  { id: '3', name: 'CyberGuard', industry: 'Cybersecurity', stage: 'ideation', needs: ['MVP Dev', 'Funding'] },
];

const mockMentors = [
  { 
    id: 'm1', 
    name: 'Sarah Chen', 
    domain: 'Fintech & Payments', 
    matchScore: 98, 
    reasoning: "Matched because she has scaled 3 cross-border payment platforms and has strong connections in APAC regulation.",
    status: 'auto-assigned'
  },
  { 
    id: 'm2', 
    name: 'Dr. Marcus Aris', 
    domain: 'Health Systems', 
    matchScore: 84, 
    reasoning: "Strong background in HIPAA compliance and EHR integrations, which aligns with HealthSync's current bottlenecks.",
    status: 'pending-approval'
  },
  { 
    id: 'm3', 
    name: 'Jessica Wu', 
    domain: 'General Strategy', 
    matchScore: 65, 
    reasoning: "Broad experience in early stage SaaS, but lacks the specific cybersecurity depth required for CyberGuard.",
    status: 'manual-review'
  }
];

export default function MatchingView() {
  const [selectedStartup, setSelectedStartup] = useState(mockStartups[0]);
  const [isMatching, setIsMatching] = useState(false);
  const [resultsShown, setResultsShown] = useState(true);

  const runMatching = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setResultsShown(true);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-280px)]">
        {/* Startup Selector */}
        <div className="lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col">
           <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="font-bold flex items-center gap-2">
                 <Rocket className="w-4 h-4 text-indigo-400" /> Intake Queue
              </h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{mockStartups.length} Startups</span>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {mockStartups.map(s => (
                <button 
                  key={s.id}
                  onClick={() => setSelectedStartup(s)}
                  className={cn(
                    "w-full p-4 rounded-2xl border transition-all text-left group",
                    selectedStartup.id === s.id 
                      ? "bg-indigo-600/10 border-indigo-500/50" 
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                  )}
                >
                   <div className="flex items-center justify-between mb-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                        selectedStartup.id === s.id ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-500"
                      )}>{s.industry}</span>
                      {selectedStartup.id === s.id && <ChevronRight className="w-4 h-4 text-indigo-400" />}
                   </div>
                   <h4 className="font-bold text-slate-100">{s.name}</h4>
                   <p className="text-xs text-slate-500 mt-1">Stage: {s.stage}</p>
                </button>
              ))}
           </div>

           <button 
            onClick={runMatching}
            disabled={isMatching}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3"
           >
              {isMatching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Analyzing Ecosystem...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5" />
                  Perform AI Match
                </>
              )}
           </button>
        </div>

        {/* Matching Visualization */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 p-8 relative flex flex-col">
           <AnimatePresence mode="wait">
             {isMatching ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                >
                   <div className="relative">
                      <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <BrainCircuit className="w-12 h-12 text-indigo-400" />
                      </div>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute inset-[-20px] border border-dashed border-indigo-500/30 rounded-full"
                      />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI Reasoner Computing...</h4>
                      <p className="text-slate-500 text-sm mt-2">Checking cross-industry compatibility and success history</p>
                   </div>
                </motion.div>
             ) : resultsShown ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col h-full overflow-hidden"
                >
                   {/* Relationship Node Visualizer */}
                   <div className="h-48 border-b border-slate-800/50 mb-6 relative flex items-center justify-center overflow-hidden shrink-0">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-500" />
                        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-indigo-500" />
                      </div>

                      {/* Matching Visualization Elements */}
                      <div className="flex-1 flex items-center justify-center relative w-full scale-75 lg:scale-90">
                        {/* Center Connection Line */}
                        <div className="absolute w-1/2 h-[2px] bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                        
                        {/* Startup Node */}
                        <div className="z-20 flex flex-col items-center gap-2 absolute left-10 lg:left-20 group">
                          <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform">
                            <span className="text-[10px] font-black uppercase text-white truncate max-w-[50px]">{selectedStartup.name}</span>
                          </div>
                          <span className="text-[9px] uppercase font-black tracking-widest text-slate-500">Startup</span>
                        </div>

                        {/* Match Score Bubble */}
                        <div className="z-30 w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800 flex flex-col items-center justify-center shadow-2xl">
                          <span className="text-3xl font-black text-white">98</span>
                          <span className="text-[9px] uppercase font-black text-emerald-400 tracking-tighter">Confidence</span>
                        </div>

                        {/* Mentor Node */}
                        <div className="z-20 flex flex-col items-center gap-2 absolute right-10 lg:right-20 group">
                          <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockMentors[0].name}`} className="w-12 h-12 rounded-full" alt="Mentor" />
                          </div>
                          <span className="text-[9px] uppercase font-black tracking-widest text-slate-500">Optimum Match</span>
                        </div>
                      </div>
                   </div>

                   <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                      {mockMentors.map((m, i) => (
                        <MatchCard key={m.id} mentor={m} index={i} />
                      ))}
                   </div>
                </motion.div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 italic text-sm">
                   Select a startup to start the intelligence layer analysis.
                </div>
             )}
           </AnimatePresence>

           {/* Connection Visual (Mock) */}
           <div className="absolute top-1/2 left-[-40px] hidden lg:block">
              <div className="w-10 h-[1px] bg-indigo-500/50 relative">
                 <div className="absolute right-0 top-[-2px] w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MatchCard({ mentor, index }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-5 bg-slate-950/40 border border-slate-800/80 rounded-2xl hover:border-indigo-500/30 transition-all group relative overflow-hidden"
    >
      <div className="flex items-start gap-5 relative z-10">
        <div className="w-16 h-20 flex flex-col items-center justify-center bg-slate-900/80 rounded-xl border border-slate-800 group-hover:border-indigo-500/50 transition-colors shrink-0 shadow-inner">
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Score</span>
           <span className={cn(
            "text-xl font-black tabular-nums",
            mentor.matchScore >= 90 ? "text-emerald-400" : mentor.matchScore >= 80 ? "text-indigo-400" : "text-amber-400"
           )}>
             {mentor.matchScore}
           </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-sm font-black group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{mentor.name}</h4>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-bold text-slate-500 uppercase font-mono tracking-widest">{mentor.domain}</span>
            </div>
          </div>
          
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/50 relative group/reason">
             <p className="text-[11px] text-slate-400 leading-relaxed italic">
                <span className="text-indigo-400 font-black not-italic mr-1.5 uppercase text-[9px] tracking-widest">Logic:</span>
                "{mentor.reasoning}"
             </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
             <div className="flex gap-4">
                {mentor.matchScore >= 80 ? (
                  <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Auto-Assign
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] font-black text-amber-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Hold Admin
                  </span>
                )}
             </div>
             <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black rounded-lg transition-all shadow-lg shadow-indigo-600/10 uppercase tracking-widest">
                    Accept Match
                </button>
                <button className="p-1.5 border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-white rounded-lg transition-colors">
                    <ChevronRight className="w-3 h-3" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Rocket({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/></svg>
  )
}
