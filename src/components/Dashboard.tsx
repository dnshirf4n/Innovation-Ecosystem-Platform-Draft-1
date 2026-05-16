import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  Sparkles,
  Rocket
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const mockPerformanceData = [
  { name: 'Jan', matches: 12, success: 85 },
  { name: 'Feb', matches: 18, success: 78 },
  { name: 'Mar', matches: 25, success: 92 },
  { name: 'Apr', matches: 32, success: 88 },
  { name: 'May', matches: 28, success: 94 },
];

const mockIndustryData = [
  { name: 'Fintech', value: 35 },
  { name: 'AI/ML', value: 45 },
  { name: 'Health', value: 20 },
];

const COLORS = ['#6366f1', '#a855f7', '#ec4899'];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
// Stats Grid - Bento Style
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Active Startups" 
          value="124" 
          trend="+12%" 
          icon={<Rocket className="text-indigo-400" />} 
          progress={65}
          color="indigo" 
        />
        <StatCard 
          label="Certified Mentors" 
          value="58" 
          trend="+4%" 
          icon={<Users className="text-emerald-400" />} 
          progress={42}
          color="emerald" 
        />
        <StatCard 
          label="Fundraising Rate" 
          value="72%" 
          trend="+5%" 
          icon={<Target className="text-purple-400" />} 
          progress={72}
          color="purple" 
        />
        <StatCard 
          label="Avg. Growth" 
          value="3.2x" 
          trend="+28%" 
          icon={<Zap className="text-amber-400" />} 
          progress={88}
          color="amber" 
        />
      </div>

      <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(300px,auto)]">
        {/* Learning Loop Visualization */}
        <div className="col-span-12 lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 p-8 glow-indigo group">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Ecosystem Intelligence</h3>
              <p className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Learning Loop Performance</p>
            </div>
            <div className="flex gap-2">
               <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-tighter">AI Active</span>
               </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="success" stroke="#6366f1" fillOpacity={1} fill="url(#colorSuccess)" strokeWidth={3} />
                <Area type="monotone" dataKey="matches" stroke="#a855f7" fill="none" strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Focus */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 p-8 glow-emerald group">
          <div className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Market Vectors</h3>
            <p className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Investment Focus</p>
          </div>
          <div className="h-[240px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockIndustryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockIndustryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold">85%</span>
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Growth</span>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {mockIndustryData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-7 bg-slate-900 rounded-3xl border border-slate-800 p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Node Pipeline</h3>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                 Live Feed <div className="w-1 h-1 bg-indigo-500 rounded-full" />
              </div>
           </div>
           <div className="space-y-6">
              <ActivityItem 
                title="FinFlow Match" 
                desc="Matched with Sarah Chen (ex-Stripe)" 
                time="2 mins ago" 
                status="auto-assigned" 
                score={94} 
              />
              <ActivityItem 
                title="MedTech Extraction" 
                desc="New startup data extracted from Pitch Deck" 
                time="1 hour ago" 
                status="processed" 
                score={82} 
              />
              <ActivityItem 
                title="Learning Loop" 
                desc="Redistributed success weights for 'Health' domain" 
                time="4 hours ago" 
                status="updated" 
                score={100} 
              />
           </div>
        </div>

        {/* Mentor Success Leaderboard */}
        <div className="col-span-12 lg:col-span-5 bg-slate-900 rounded-3xl border border-slate-800 p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Expert Scores</h3>
              <span className="text-[10px] text-indigo-400 font-bold font-mono">Performance Rank</span>
           </div>
           <div className="space-y-4">
              <MentorRank name="Sarah Chen" domain="Fintech" score={98} engagements={24} />
              <MentorRank name="James Wilson" domain="AI Infrastructure" score={95} engagements={18} />
              <MentorRank name="Elena Rodriguez" domain="Health Platform" score={92} engagements={31} />
              <MentorRank name="David Kim" domain="Logistics" score={89} engagements={12} />
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, trend, icon, color, progress }: { label: string, value: string, trend: string, icon: React.ReactNode, color: string, progress: number }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 group hover:shadow-2xl hover:shadow-indigo-500/5">
      <div className="flex items-center justify-between mb-5">
        <div className={cn("p-2.5 rounded-2xl flex items-center justify-center bg-slate-950 border border-slate-800 group-hover:border-indigo-500/30 transition-colors shadow-inner")}>
          {icon}
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Trend</span>
           <span className={cn(
             "text-xs font-black tracking-tighter px-2 py-0.5 rounded-lg",
             trend.startsWith('+') ? "text-emerald-400 bg-emerald-400/5 border border-emerald-400/10" : "text-rose-400 bg-rose-400/5 border border-rose-400/10"
           )}>
             {trend}
           </span>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] mb-1.5">{label}</h4>
        <p className="text-3xl font-black text-white tracking-tighter group-hover:text-indigo-400 transition-colors">{value}</p>
      </div>

      <div className="space-y-2">
         <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-500">
            <span>Utilization</span>
            <span className={cn(color === 'indigo' ? 'text-indigo-400' : color === 'emerald' ? 'text-emerald-400' : color === 'purple' ? 'text-purple-400' : 'text-amber-400')}>
              {progress}%
            </span>
         </div>
         <div className="h-1.5 w-full bg-slate-950 border border-slate-800/50 rounded-full overflow-hidden p-[1px]">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 1, ease: "easeOut" }}
               className={cn(
                  "h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]",
                  color === 'indigo' ? 'bg-indigo-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'purple' ? 'bg-purple-500' : 'bg-amber-500'
               )}
            />
         </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, status, score }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex flex-col items-center justify-center border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Score</span>
         <span className="text-sm font-bold text-indigo-400">{score}</span>
      </div>
      <div className="flex-1">
        <h5 className="text-sm font-bold">{title}</h5>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-500 font-medium mb-1">{time}</p>
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
          status === 'auto-assigned' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-800 text-slate-400"
        )}>
          {status}
        </span>
      </div>
    </div>
  );
}

function MentorRank({ name, domain, score, engagements }: any) {
  return (
    <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex items-center justify-between hover:border-slate-700 transition-all">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center font-bold text-slate-400">
            {name[0]}
          </div>
          <div>
             <h5 className="text-sm font-bold">{name}</h5>
             <p className="text-xs text-slate-500">{domain}</p>
          </div>
       </div>
       <div className="flex items-center gap-6">
          <div className="text-right">
             <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Engaged</p>
             <p className="text-sm font-bold">{engagements}</p>
          </div>
          <div className="text-right">
             <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Success</p>
             <p className="text-sm font-bold text-indigo-400">{score}%</p>
          </div>
       </div>
    </div>
  );
}
