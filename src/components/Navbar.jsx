import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Menu, 
  Terminal, 
  Award, 
  Crown, 
  Flame, 
  Zap, 
  User, 
  Search, 
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function Navbar({
  onToggleSidebar,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenProfile,
  onOpenFinalExam,
  onOpenCertificate
}) {
  const { user, isEligibleForCertification } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Sidebar Toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
            title="Toggle Left Navigation Bar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm font-black tracking-tight text-slate-900">
              SarlaYash <span className="text-blue-600">Mission</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Powered By Kapil
            </span>
          </div>
        </div>

        {/* Middle Quick Navigation Pills (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              activeTab === 'curriculum'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Curriculum
          </button>

          <button
            onClick={() => setActiveTab('ide')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'ide'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Practice IDE</span>
          </button>

          <button
            onClick={() => setActiveTab('mocks')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              activeTab === 'mocks'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Mock Tests
          </button>

          <button
            onClick={onOpenCertificate}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              isEligibleForCertification
                ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isEligibleForCertification ? (
              <Crown className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>Certificate</span>
            {!isEligibleForCertification && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono font-bold">
                Locked
              </span>
            )}
          </button>
        </div>

        {/* Right Stats & Authentication */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Streak Indicator */}
          <div 
            onClick={onOpenProfile} 
            title={`${user.streakDays} Day Learning Streak`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 cursor-pointer hover:bg-orange-100 transition"
          >
            <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
            <span className="text-xs font-bold font-mono text-orange-700">{user.streakDays}d</span>
          </div>

          {/* XP Indicator */}
          <div 
            onClick={onOpenProfile} 
            title={`${user.xp} Total XP`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 cursor-pointer hover:bg-amber-100 transition hidden sm:flex"
          >
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span className="text-xs font-bold font-mono text-amber-800">{user.xp.toLocaleString()}</span>
          </div>

          {/* GitHub Live Repository Link */}
          <a
            href="https://github.com/sarlayash/SarlaYash-Mission-Powered-By-Kapil-Agentic-AI-Software-Testing"
            target="_blank"
            rel="noopener noreferrer"
            title="View Official GitHub Repository"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200 hidden sm:flex items-center"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>

          {/* User Profile or Real Google Sign In */}
          {user.isLoggedIn ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition"
            >
              <div className="text-left hidden lg:block pr-1">
                <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                  {user.name}
                </div>
                <div className="text-[10px] text-emerald-600 font-bold truncate">
                  Google Verified
                </div>
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
