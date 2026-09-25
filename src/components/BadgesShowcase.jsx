import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BADGES_DATA } from '../data/badgesData';
import { 
  Award, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Crown, 
  Terminal, 
  Bug, 
  Workflow, 
  Search, 
  Layers, 
  Radio, 
  PlayCircle, 
  BarChart3, 
  GitBranch 
} from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  Search,
  Layers,
  GitBranch,
  Radio,
  PlayCircle,
  Bug,
  BarChart3,
  Workflow,
  Terminal,
  Award,
  Crown
};

export default function BadgesShowcase({ onOpenFinalExam, onOpenIDE }) {
  const { progress, user } = useApp();
  const [filter, setFilter] = useState('all');

  const unlockedSet = new Set(progress.unlockedBadgeIds);
  const totalBadges = BADGES_DATA.length;
  const unlockedCount = unlockedSet.size;

  const filteredBadges = BADGES_DATA.filter(b => {
    const isUnlocked = unlockedSet.has(b.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header Banner on Clean White */}
      <div className="relative rounded-3xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border border-amber-200 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-amber-600" />
            <span>SarlaYash Mission Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight heading-gradient-sunset">
            Quality Badges & Milestones
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Every badge in the SarlaYash Mission represents verified enterprise STLC competency: from SRS decomposition and automated RTM engineering to multi-agent defect triaging and capstone certification.
          </p>
        </div>

        {/* Progress Card */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xl shadow-xs">
            {unlockedCount}/{totalBadges}
          </div>
          <div>
            <div className="text-sm font-black text-slate-900">Badges Unlocked</div>
            <div className="text-xs text-amber-700 font-mono font-bold">
              {Math.round((unlockedCount / totalBadges) * 100)}% Milestone Progress
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Candidate: <strong className="text-slate-800">{user.name || "Guest Scholar"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
            filter === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          All Badges ({totalBadges})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
            filter === 'unlocked'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Unlocked ({unlockedCount})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
            filter === 'locked'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Locked ({totalBadges - unlockedCount})
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBadges.map((badge) => {
          const isUnlocked = unlockedSet.has(badge.id);
          const IconComp = ICON_MAP[badge.icon] || Award;

          return (
            <div
              key={badge.id}
              className={`relative rounded-3xl border p-6 transition flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-blue-200 shadow-md hover:shadow-lg'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
                    isUnlocked
                      ? `bg-gradient-to-tr ${badge.color}`
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isUnlocked ? <IconComp className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isUnlocked
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                    <div className="text-xs font-mono font-black text-amber-700 mt-1 flex items-center justify-end gap-1">
                      <Zap className="w-3 h-3 fill-amber-500" />
                      +{badge.xpValue} XP
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-900">
                  {badge.name}
                </h3>
                <div className="text-xs font-bold text-blue-700 mb-2">
                  {badge.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] text-slate-500">
                  <strong className="text-slate-700">Requirement:</strong> {badge.requirement}
                </div>

                {!isUnlocked && (
                  <div className="mt-3">
                    {badge.id === 'badge_certified_lead' ? (
                      <button
                        onClick={onOpenFinalExam}
                        className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 transition"
                      >
                        Take Certification Exam
                      </button>
                    ) : (
                      <button
                        onClick={onOpenIDE}
                        className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                      >
                        Practice in IDE
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
