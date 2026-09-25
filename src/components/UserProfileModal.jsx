import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, Flame, Zap, Shield, CheckCircle, RefreshCw, LogOut, Edit2 } from 'lucide-react';
import { COURSE_MODULES } from '../data/courseData';

export default function UserProfileModal({ isOpen, onClose, onOpenCertificate, onOpenAuth }) {
  const { user, setUser, progress, logout, resetProgress } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [roleInput, setRoleInput] = useState(user.role);

  if (!isOpen) return null;

  const completedCount = progress.completedModules.length;
  const totalModules = COURSE_MODULES.length;
  const progressPct = Math.round((completedCount / totalModules) * 100);

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: nameInput,
      role: roleInput
    }));
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your local learning progress?")) {
      resetProgress();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Section */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100">
          <div className="relative">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-200 shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
              VERIFIED
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            {!isEditing ? (
              <>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{user.name || "Guest Scholar"}</h2>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-0.5 rounded-full">
                    {user.authProvider === 'google' ? 'Real Google Account' : 'Guest'}
                  </span>
                </div>
                <p className="text-xs font-bold text-blue-700 mt-0.5">{user.role}</p>
                <p className="text-xs text-slate-500">{user.email || "No Google email linked yet"}</p>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <span>Candidate ID: <code className="text-blue-700 font-mono font-bold">{user.candidateId || "PENDING"}</code></span>
                  <span>•</span>
                  <span>Joined: {user.joinedDate}</span>
                </div>
              </>
            ) : (
              <form onSubmit={handleSave} className="space-y-2 mt-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium"
                  placeholder="Designation / Role"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Name</span>
              </button>
            )}
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition"
            >
              <span>{user.isLoggedIn ? "Switch Google Account" : "Sign In with Google"}</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center text-amber-500 mb-1">
              <Zap className="w-5 h-5 fill-amber-500" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">{user.xp.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total XP</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center text-orange-500 mb-1">
              <Flame className="w-5 h-5 fill-orange-500" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">{user.streakDays} Days</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Streak</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center text-blue-500 mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">{completedCount} / {totalModules}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Modules Cleared</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center text-purple-500 mb-1">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">{progress.unlockedBadgeIds.length}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Badges</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-800 font-bold">Curriculum Completion</span>
            <span className="text-blue-700 font-mono font-black">{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-bold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Local Progress</span>
          </button>

          {user.isLoggedIn && (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-bold transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
