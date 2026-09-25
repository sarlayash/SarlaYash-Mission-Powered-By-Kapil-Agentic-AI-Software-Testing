import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSE_MODULES } from '../data/courseData';
import { 
  BookOpen, 
  Terminal, 
  CheckSquare, 
  Database, 
  Award, 
  Crown, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Zap, 
  User, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Code2,
  Lock
} from 'lucide-react';

export default function LeftSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  selectedLevel,
  setSelectedLevel,
  selectedStatus,
  setSelectedStatus,
  onOpenAuth,
  onOpenProfile,
  onOpenFinalExam,
  onOpenCertificate
}) {
  const { user, progress, isEligibleForCertification } = useApp();
  const [showFilters, setShowFilters] = useState(true);
  const [showModuleJump, setShowModuleJump] = useState(false);

  const navItems = [
    { id: 'curriculum', label: 'Curriculum & Modules', icon: BookOpen, badge: '14 Modules', color: 'text-blue-600' },
    { id: 'ide', label: 'Real Practice IDE', icon: Terminal, badge: 'Agents Live', color: 'text-emerald-600' },
    { id: 'mocks', label: 'Mock Assessments', icon: CheckSquare, badge: 'Timed', color: 'text-purple-600' },
    { id: 'erp', label: 'ERP Sandbox (O2C/P2P)', icon: Database, badge: 'Interactive', color: 'text-cyan-600' },
    { 
      id: 'badges', 
      label: 'Badges & Honors', 
      icon: isEligibleForCertification ? Award : Lock, 
      badge: isEligibleForCertification ? '12 Unlocked' : 'Locked', 
      color: isEligibleForCertification ? 'text-amber-600' : 'text-slate-400' 
    },
    { 
      id: 'certificate', 
      label: 'Verified Certificate', 
      icon: isEligibleForCertification ? Crown : Lock, 
      badge: isEligibleForCertification ? 'Ready' : 'Locked', 
      color: isEligibleForCertification ? 'text-yellow-600' : 'text-slate-400', 
      isSpecial: true 
    }
  ];

  const completedCount = progress.completedModules.length;
  const totalCount = COURSE_MODULES.length;

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between shadow-sm select-none ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top Branding & Collapse Button */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => setActiveTab('curriculum')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
              SY
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-black text-slate-900 tracking-tight truncate">
                SarlaYash <span className="text-blue-600">Mission</span>
              </h2>
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider truncate">
                Powered By Kapil
              </div>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-md mx-auto cursor-pointer" onClick={() => setActiveTab('curriculum')}>
            SY
          </div>
        )}

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Navigation Bar" : "Hide / Collapse Navigation Bar"}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition hidden lg:block"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Middle Navigation Links & Options */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        
        {/* Main Links */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 pb-1">
              STLC Core Navigation
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'certificate') {
                    onOpenCertificate();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                title={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : item.color}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && (
                  <div>
                    {item.badge && (
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        item.badge === 'Agents Live'
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 30-Minute Final Exam Quick Launch */}
        {!isCollapsed && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-black uppercase tracking-wider">
              <Crown className="w-4 h-4 text-amber-600" />
              <span>Final Capstone Exam</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-snug">
              30-min timed assessment (80%+ required for verifiable certificate).
            </p>
            <button
              onClick={onOpenFinalExam}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition"
            >
              <span>Launch 30-Min Exam</span>
            </button>
          </div>
        )}

        {/* Options to Hide and Show Options (Filter Controls) */}
        {!isCollapsed && (
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between cursor-pointer px-2 text-slate-500 hover:text-slate-800 text-xs font-bold"
            >
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>Show / Hide Filter Options</span>
              </div>
              {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>

            {showFilters && (
              <div className="space-y-3 pl-2 pr-1 animate-fadeIn">
                {/* Level Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Mastery Level (1 to 10):
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Levels (1 to 10)</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(l => (
                      <option key={l} value={l.toString()}>Level {l}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Module Completion Status:
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Modules ({totalCount})</option>
                    <option value="completed">Completed Only ({completedCount})</option>
                    <option value="pending">Pending Only ({totalCount - completedCount})</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/80">
        {user.isLoggedIn ? (
          <div 
            onClick={onOpenProfile}
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 cursor-pointer transition ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover border border-blue-200 shrink-0"
            />
            {!isCollapsed && (
              <div className="overflow-hidden flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {user.name}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Google Verified</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {!isCollapsed ? (
              <button
                onClick={onOpenAuth}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google Sign In</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                title="Google Sign In"
                className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow mx-auto"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>

    </aside>
  );
}
