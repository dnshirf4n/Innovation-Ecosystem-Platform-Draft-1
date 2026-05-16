import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Target, 
  BrainCircuit, 
  Rocket, 
  Settings, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { collection, query, onSnapshot, doc, getDocs } from 'firebase/firestore';
import { cn } from './lib/utils';

// Views
import Dashboard from './components/Dashboard';
import MatchingView from './components/MatchingView';
import StartupOnboarding from './components/StartupOnboarding';
import MentorDirectory from './components/MentorDirectory';
import EcosystemInsights from './components/EcosystemInsights';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = () => signOut(auth);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6">
            <BrainCircuit className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">EcoGraph AI</h1>
          <p className="text-slate-400 text-center text-sm leading-relaxed">
            Revolutionizing innovation through programmable relationships and explainable AI matching.
          </p>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 active:scale-95"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5 filter invert grayscale brightness-200" alt="Google" />
          Sign in to Platform
        </button>

        <div className="mt-8 flex justify-center gap-6 opacity-40">
           <Rocket className="w-5 h-5 text-indigo-400" />
           <Target className="w-5 h-5 text-purple-400" />
           <Users className="w-5 h-5 text-indigo-400" />
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500/30">
      {/* Sidebar - Integrated Bento Style */}
      <aside className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col p-6 sticky top-0 h-screen z-40">
        <div className="flex items-center gap-3 mb-10 px-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tighter block leading-none">ECOGRAPH</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1 block">Ecosystem.OS</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          <NavItem 
            icon={<BarChart3 />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<Users />} 
            label="Mentor Matching" 
            active={activeTab === 'matching'} 
            onClick={() => setActiveTab('matching')} 
          />
          <NavItem 
            icon={<Award />} 
            label="Mentor Performance" 
            active={activeTab === 'mentors'} 
            onClick={() => setActiveTab('mentors')} 
          />
          <NavItem 
            icon={<Rocket />} 
            label="Startup Hub" 
            active={activeTab === 'startups'} 
            onClick={() => setActiveTab('startups')} 
          />
          <NavItem 
            icon={<Target />} 
            label="Ecosystem Insights" 
            active={activeTab === 'insights'} 
            onClick={() => setActiveTab('insights')} 
          />
        </nav>

        <div className="mt-auto space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
             <div className="flex items-center gap-3 mb-2">
                <img src={user.photoURL} className="w-10 h-10 rounded-full border border-slate-600" alt="Profile" />
                <div className="overflow-hidden">
                   <p className="text-sm font-medium truncate">{user.displayName}</p>
                   <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
             </div>
             <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors py-2 mt-2 border-t border-slate-700"
             >
                <LogOut className="w-3 h-3" /> Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 sticky top-0 bg-slate-950/80 backdrop-blur-md z-30">
          <div>
            <h2 className="text-xl font-semibold capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mt-0.5">Innovation Ecosystem Management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">AI Intelligence Online</span>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <Dashboard key="dash" />}
            {activeTab === 'matching' && <MatchingView key="match" />}
            {activeTab === 'mentors' && <MentorDirectory key="mentors" />}
            {activeTab === 'startups' && <StartupOnboarding key="start" />}
            {activeTab === 'insights' && <EcosystemInsights key="insight" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
        active 
          ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20" 
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
      )}
    >
      <span className={cn("w-5 h-5", active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")}>
        {icon}
      </span>
      {label}
      {active && (
        <motion.div 
          layoutId="activeNav"
          className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full"
        />
      )}
    </button>
  );
}
