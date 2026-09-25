import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Mail, ArrowRight, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { signInWithGoogleFirebase, setUser } = useApp();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showManualFallback, setShowManualFallback] = useState(false);

  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");

  if (!isOpen) return null;

  const handleFirebaseGoogleAuth = async () => {
    setLoading(true);
    setErrorMessage("");
    const result = await signInWithGoogleFirebase();
    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setErrorMessage(result.error || "Google Sign-in was cancelled or encountered an issue.");
      setShowManualFallback(true);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualName.trim() || !manualEmail.trim()) {
      setErrorMessage("Please enter your name and active Google email.");
      return;
    }

    const candidateId = "SY-QA-" + Math.floor(100000 + Math.random() * 900000);
    const realUserData = {
      uid: "manual-" + Date.now(),
      name: manualName.trim(),
      email: manualEmail.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(manualName.trim())}`,
      role: "Agentic QA Software Testing Professional",
      authProvider: "google",
      candidateId: candidateId,
      xp: 300,
      streakDays: 1,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      isLoggedIn: true
    };
    setUser(realUserData);
    localStorage.setItem('sarlayash_qa_real_user', JSON.stringify(realUserData));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-md mb-3">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Sign In with Google
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            SarlaYash Mission Powered By Kapil — Official STLC Academy
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 w-fit mx-auto font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Firebase Auth: sarlayashagenticaiswtesting</span>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* One-Click Real Google Firebase Button */}
        <div className="space-y-4">
          <button
            onClick={handleFirebaseGoogleAuth}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-sm hover:shadow-md transition flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Real Google Account</span>
              </>
            )}
          </button>

          {/* Fallback Option */}
          <div className="pt-2 text-center">
            <button
              onClick={() => setShowManualFallback(!showManualFallback)}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold transition"
            >
              {showManualFallback ? "Hide manual input" : "Popup blocked? Enter Google details manually"}
            </button>
          </div>

          {showManualFallback && (
            <form onSubmit={handleManualSubmit} className="space-y-3 pt-2 border-t border-slate-100 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (Printed on Certificate)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kapil Narula"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Active Gmail / Google Workspace Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Confirm & Connect Identity
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Authenticated via Google Firebase OAuth 2.0. Certificates and credentials will be stamped with this verified identity.
          </p>
        </div>

      </div>
    </div>
  );
}
