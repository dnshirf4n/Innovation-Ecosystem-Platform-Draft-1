import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Award, 
  Target, 
  TrendingUp, 
  ShieldAlert,
  Star,
  Zap,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockMentorsData = [
  {
    id: 'm1',
    name: 'Sarah Chen',
    domain: 'Fintech & Payments',
    successScore: 98,
    avgStartupGrowth: '+140%',
    activeEngagements: 4,
    strengths: ['Regulatory compliance', 'APAC Market Entry', 'Series B Funding'],
    weaknesses: ['Early-stage MVP technicals', 'Hardware logistics'],
    feedbackScore: 4.9
  },
  {
    id: 'm2',
    name: 'James Wilson',
    domain: 'AI Infrastructure',
    successScore: 91,
    avgStartupGrowth: '+210%',
    activeEngagements: 2,
    strengths: ['LLM Optimization', 'Cloud Scalability', 'B2B Sales Pipe'],
    weaknesses: ['Consumer branding', 'Legal structures'],
    feedbackScore: 4.7
  },
  {
    id: 'm3',
    name: 'Elena Rodriguez',
    domain: 'Health Systems',
    successScore: 84,
    avgStartupGrowth: '+85%',
    activeEngagements: 6,
    strengths: ['HIPAA Data Privacy', 'Clinical Trials', 'MedTech IP'],
    weaknesses: ['Crypto integration', 'Retail strategy'],
    feedbackScore: 4.4
  }
];

export default function MentorDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 border border-slate-800 rounded-3xl p-8 glow-indigo group">
         <div className="relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Expert Network</h2>
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
               <Award className="w-6 h-6 text-indigo-500" /> Mentor Performance Vault
            </h3>
            <p className="text-slate-400 text-sm mt-1">Cross-industry success vectors used for programmatic weighting.</p>
         </div>
         <div className="relative max-w-md w-full z-10 group/search">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/search:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by expertise, domain, or success vector..." 
              className="w-full bg-slate-950 border border-slate-800/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 transition-all font-medium placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
         {mockMentorsData.map((mentor) => (
           <MentorCard key={mentor.id} mentor={mentor} />
         ))}
      </div>
    </div>
  );
}

function MentorCard({ mentor }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden group hover:border-indigo-500/30 transition-all shadow-xl shadow-slate-950/20 backdrop-blur-sm"
    >
      <div className="flex flex-col lg:flex-row">
         {/* Profile Header */}
         <div className="lg:w-80 p-8 border-b lg:border-b-0 lg:border-r border-slate-800/50 bg-slate-950/40 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center text-center">
               <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl font-black text-indigo-500 mb-5 shadow-inner group-hover:scale-105 transition-transform">
                  {mentor.name[0]}
               </div>
               <h3 className="text-xl font-black text-white tracking-tight mb-1 uppercase tracking-tight">{mentor.name}</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">{mentor.domain}</p>
               
               <div className="w-full grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 flex flex-col items-center">
                     <p className="text-[9px] text-slate-600 font-black uppercase tracking-tighter mb-1">Growth Index</p>
                     <p className="text-sm font-black text-emerald-400 tabular-nums">{mentor.avgStartupGrowth}</p>
                  </div>
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 flex flex-col items-center">
                     <p className="text-[9px] text-slate-600 font-black uppercase tracking-tighter mb-1">Feedback</p>
                     <div className="flex items-center justify-center gap-1">
                        <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-black text-white tabular-nums">{mentor.feedbackScore}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Performance Specs */}
         <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-900/20">
            {/* Strengths */}
            <div>
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-500" /> Positive Success Vectors
               </h4>
               <div className="space-y-3.5">
                  {mentor.strengths.map((s: string) => (
                    <div key={s} className="flex items-center gap-3 group/item">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover/item:scale-125 transition-transform" />
                       <span className="text-xs text-slate-300 font-bold uppercase tracking-tight">{s}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Weaknesses / Improvement */}
            <div>
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" /> Negative Correlation
               </h4>
               <div className="space-y-3.5">
                  {mentor.weaknesses.map((w: string) => (
                    <div key={w} className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-rose-500/20 border border-rose-500/40" />
                       <span className="text-xs text-slate-500 font-bold uppercase tracking-tight italic opacity-60">{w}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Final Score */}
         <div className="lg:w-48 p-8 flex flex-col items-center justify-center bg-indigo-500/[0.02] border-t lg:border-t-0 lg:border-l border-slate-800/50">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Master Score</p>
            <div className="relative w-24 h-24 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(99,102,241,0.2)]">
                  <circle 
                    cx="48" cy="48" r="40" 
                    fill="none" stroke="#0f172a" strokeWidth="8" 
                  />
                  <motion.circle 
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: 251 - (251 * mentor.successScore) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="48" cy="48" r="40" 
                    fill="none" stroke="#6366f1" strokeWidth="8" 
                    strokeDasharray={251}
                    strokeLinecap="round"
                  />
               </svg>
               <span className="absolute text-2xl font-black text-white tabular-nums tracking-tighter">{mentor.successScore}</span>
            </div>
            <button className="mt-8 flex items-center gap-1.5 text-[10px] font-black text-indigo-400 hover:text-white transition-colors uppercase tracking-widest bg-indigo-500/5 px-3 py-1.5 rounded-lg border border-indigo-500/10">
               Verification <ChevronRight className="w-3 h-3" />
            </button>
         </div>
      </div>
    </motion.div>
  );
}
