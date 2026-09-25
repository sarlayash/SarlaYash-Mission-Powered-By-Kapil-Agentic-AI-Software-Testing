import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSE_INFO, COURSE_MODULES } from '../data/courseData';
import { 
  CheckCircle2, 
  Circle, 
  Terminal, 
  Award, 
  ArrowRight, 
  BookOpen, 
  Zap, 
  Sparkles, 
  Search, 
  Layers, 
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Brain,
  SlidersHorizontal,
  Crown,
  Lock
} from 'lucide-react';

export default function CourseCurriculum({ 
  onSelectModule, 
  onOpenIDE, 
  onOpenMock, 
  onOpenFinalExam,
  selectedLevel = "all",
  selectedStatus = "all"
}) {
  const { progress, markModuleComplete, isEligibleForCertification, isFinalExamPassed } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModuleId, setExpandedModuleId] = useState(1);
  const [showAllSubtopics, setShowAllSubtopics] = useState(false);

  // Filter modules
  const filteredModules = COURSE_MODULES.filter((m) => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtopics.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.points.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesLevel = selectedLevel === "all" || m.level.toString() === selectedLevel;
    const isCompleted = progress.completedModules.includes(m.id);
    const matchesStatus = 
      selectedStatus === "all" || 
      (selectedStatus === "completed" && isCompleted) || 
      (selectedStatus === "pending" && !isCompleted);

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const completedCount = progress.completedModules.length;
  const totalCount = COURSE_MODULES.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Scroll-Stopping Hero Section on Clean White */}
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 border border-blue-100 p-6 sm:p-10 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-200/30 to-indigo-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-200/30 to-teal-200/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-4xl">
          {/* Mission Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-200 shadow-xs mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-black tracking-wide text-blue-800 uppercase">
              SarlaYash Mission • Powered By Kapil
            </span>
          </div>

          {/* Colorful Vibrant Headings */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight heading-gradient-primary">
            {COURSE_INFO.title}
          </h1>
          <p className="text-xl sm:text-2xl font-extrabold heading-gradient-purple mt-2">
            {COURSE_INFO.subtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed font-normal max-w-3xl">
            {COURSE_INFO.overview}
          </p>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200/80">
            <div className="bg-white/90 p-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-blue-600 font-mono">{COURSE_INFO.levelsCount}</div>
              <div className="text-xs font-semibold text-slate-500">Mastery Levels</div>
            </div>
            <div className="bg-white/90 p-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-indigo-600 font-mono">{COURSE_INFO.modulesCount}</div>
              <div className="text-xs font-semibold text-slate-500">STLC Modules</div>
            </div>
            <div className="bg-white/90 p-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-purple-600 font-mono">{COURSE_INFO.toolsCount}</div>
              <div className="text-xs font-semibold text-slate-500">Enterprise AI Tools</div>
            </div>
            <div className="bg-white/90 p-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-emerald-600 font-mono">{COURSE_INFO.deliverablesCount}</div>
              <div className="text-xs font-semibold text-slate-500">Real Deliverables</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={() => onOpenIDE(COURSE_MODULES[0].ideChallengeId)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Real Practice IDE</span>
            </button>

            <button
              onClick={onOpenFinalExam}
              className="px-6 py-3 rounded-xl bg-white hover:bg-amber-50 text-amber-800 font-bold text-xs sm:text-sm border-2 border-amber-300 shadow-xs flex items-center gap-2 transition"
            >
              <Crown className="w-4 h-4 text-amber-500" />
              <span>Take 30-Min Certification Exam (80% to Pass)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Course Progress */}
        <div className="w-full md:w-auto flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-black font-mono text-base">
              {progressPercent}%
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Overall Course Completion</div>
              <div className="text-xs text-slate-500 font-medium">
                {completedCount} of {totalCount} Modules Completed
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-36 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Search Input & Expand All Toggle */}
        <div className="w-full md:w-auto flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, ERP rules, prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <button
            onClick={() => setShowAllSubtopics(!showAllSubtopics)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAllSubtopics ? "Collapse All" : "Expand All"}</span>
          </button>
        </div>
      </div>

      {/* Credential Governance Milestone Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs ${
        isEligibleForCertification
          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
          : 'bg-amber-50/70 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-center gap-2.5">
          {isEligibleForCertification ? (
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <Lock className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <div>
            <strong className="font-black">
              {isEligibleForCertification 
                ? "Academic Credentials Unlocked!" 
                : "Certificate & Badges Lock Governance:"}
            </strong>{" "}
            {isEligibleForCertification 
              ? "All 14 modules completed and 80%+ assessment score achieved. Your official Certificate & Badges are ready to download (PNG/PDF)." 
              : "Complete all 14 modules and score 80%+ on the final assessment to unlock official Certificate and Badges for download."}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
            completedCount === totalCount ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
          }`}>
            Modules: {completedCount}/{totalCount}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
            isFinalExamPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
          }`}>
            Exam: {progress.finalExam ? `${progress.finalExam.score}%` : "Pending (≥80%)"}
          </span>
        </div>
      </div>

      {/* Modules List (14 Modules / Level 1 to 10) */}
      <div className="space-y-4">
        {filteredModules.map((mod) => {
          const isCompleted = progress.completedModules.includes(mod.id);
          const isExpanded = showAllSubtopics || expandedModuleId === mod.id;

          return (
            <div
              key={mod.id}
              className={`rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-50/30 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {/* Module Header Bar */}
              <div
                onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markModuleComplete(mod.id);
                    }}
                    className={`p-2 rounded-xl transition ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                        : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                    }`}
                    title={isCompleted ? "Completed" : "Mark as Complete"}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5" />}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                        Level {mod.level} • {mod.levelTitle}
                      </span>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                        <Zap className="w-3 h-3 fill-amber-500" />
                        +{mod.xp} XP
                      </span>
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                        Badge: {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1.5">
                      {mod.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenIDE(mod.ideChallengeId);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition"
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Practice in IDE</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMock(`mock_level_${mod.level}`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold hidden sm:flex items-center gap-1.5 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Mock Quiz</span>
                  </button>

                  <div className="text-slate-400 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Subtopics & Deliverables */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-3 border-t border-slate-100 bg-slate-50/60 space-y-5 animate-fadeIn">
                  
                  {/* Subtopics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mod.subtopics.map((sub) => (
                      <div key={sub.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {sub.id}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">
                            {sub.title}
                          </h4>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {sub.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-500 font-bold">•</span>
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables Bar */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Official Deliverables for this Module:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mod.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-xs px-3 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 flex items-center gap-1.5 font-medium"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{del}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Module Footer Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => markModuleComplete(mod.id)}
                      className={`text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCompleted ? "Completed (+XP Awarded)" : "Mark Module Complete"}</span>
                    </button>

                    <button
                      onClick={() => onSelectModule(mod)}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-bold"
                    >
                      <span>View Deep Dive & Agentic Prompts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
