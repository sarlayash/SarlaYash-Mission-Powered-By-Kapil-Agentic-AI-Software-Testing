import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Terminal, 
  CheckCircle2, 
  FileText, 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Cpu,
  BrainCircuit
} from 'lucide-react';

export default function ModuleDetailModal({ module, isOpen, onClose, onLaunchIDE }) {
  const { progress, markModuleComplete } = useApp();
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen || !module) return null;

  const isCompleted = progress.completedModules.includes(module.id);

  const samplePrompt = `SYSTEM PROMPT: You are Principal QA Agent for ApexEnterprise ERP (${module.title}).
TASK:
- Analyze functional rules and boundary conditions.
- Detect missing requirements and exception paths.
- Generate IEEE 829 test cases covering positive, negative, and edge scenarios.
Format the output as a formal Agile QA Deliverable for sprint review.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
              Level {module.level} • {module.levelTitle}
            </span>
            <span className="text-xs text-amber-800 font-mono font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-500" />
              +{module.xp} XP
            </span>
            <span className="text-xs text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
              Badge: {module.badge}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {module.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            SarlaYash Mission Powered By Kapil • Real-Time Enterprise ERP STLC
          </p>
        </div>

        {/* Subtopics Detailed Breakdown */}
        <div className="my-6 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-blue-600" />
            <span>Curriculum Subtopics & Technical Deep Dive</span>
          </h3>

          <div className="space-y-3">
            {module.subtopics.map((sub) => (
              <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                    {sub.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{sub.title}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {sub.points.map((pt, idx) => (
                    <div key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agentic Prompt Engineering Playbook */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Recommended Agentic AI Prompt (ChatGPT / Claude / Gemini)</span>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="text-xs flex items-center gap-1.5 text-slate-700 hover:text-slate-900 px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs transition font-semibold"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? "Copied!" : "Copy Prompt"}</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-xl bg-white text-slate-800 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-200">
            {samplePrompt}
          </pre>
        </div>

        {/* Deliverables */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Formal STLC Deliverables</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {module.deliverables.map((del, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center gap-2 font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{del}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100">
          <button
            onClick={() => markModuleComplete(module.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? "Completed (+XP Earned)" : "Mark Module Complete"}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onLaunchIDE(module.ideChallengeId);
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Practice in IDE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
