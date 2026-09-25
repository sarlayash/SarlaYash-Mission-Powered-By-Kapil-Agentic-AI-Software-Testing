import React, { useState, useRef } from 'react';
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
  GitBranch,
  Download,
  FileImage,
  FileText,
  Check
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const { 
    progress, 
    user, 
    isEligibleForCertification, 
    isAllModulesCompleted, 
    completedModulesCount, 
    totalModules, 
    finalExamScore, 
    isFinalExamPassed 
  } = useApp();

  const [filter, setFilter] = useState('all');
  const [downloadingBadgeId, setDownloadingBadgeId] = useState(null);
  const [downloadType, setDownloadType] = useState("");
  const badgeCardRef = useRef(null);
  const [selectedBadgeToExport, setSelectedBadgeToExport] = useState(null);

  const unlockedSet = new Set(progress.unlockedBadgeIds);
  const totalBadges = BADGES_DATA.length;
  // Badges only unlock for official download once eligibility (14 modules + 80% score) is achieved
  const unlockedCount = isEligibleForCertification ? totalBadges : 0;

  const filteredBadges = BADGES_DATA.filter(b => {
    const isUnlocked = isEligibleForCertification;
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  // Download Individual Badge as PNG
  const handleDownloadBadgePNG = async (badge) => {
    if (!isEligibleForCertification) {
      alert("Badges remain locked until you complete all 14 modules and score 80%+ on the assessments.");
      return;
    }
    setSelectedBadgeToExport(badge);
    setDownloadingBadgeId(badge.id);
    setDownloadType("PNG");

    setTimeout(async () => {
      try {
        if (!badgeCardRef.current) return;
        const canvas = await html2canvas(badgeCardRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false
        });
        const link = document.createElement('a');
        link.download = `SarlaYash_Badge_${badge.name.replace(/\s+/g, '_')}_${(user.name || 'Scholar').replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error("Badge PNG download error:", err);
      } finally {
        setDownloadingBadgeId(null);
        setDownloadType("");
      }
    }, 150);
  };

  // Download Individual Badge as PDF
  const handleDownloadBadgePDF = async (badge) => {
    if (!isEligibleForCertification) {
      alert("Badges remain locked until you complete all 14 modules and score 80%+ on the assessments.");
      return;
    }
    setSelectedBadgeToExport(badge);
    setDownloadingBadgeId(badge.id);
    setDownloadType("PDF");

    setTimeout(async () => {
      try {
        if (!badgeCardRef.current) return;
        const canvas = await html2canvas(badgeCardRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`SarlaYash_Badge_${badge.name.replace(/\s+/g, '_')}_${(user.name || 'Scholar').replace(/\s+/g, '_')}.pdf`);
      } catch (err) {
        console.error("Badge PDF download error:", err);
      } finally {
        setDownloadingBadgeId(null);
        setDownloadType("");
      }
    }, 150);
  };

  // Download All Unlocked Badges as a Portfolio PDF
  const handleDownloadPortfolioPDF = async () => {
    if (!isEligibleForCertification) {
      alert("Complete all 14 modules and score 80%+ on the assessment to unlock and download your credentials portfolio!");
      return;
    }

    const unlockedBadges = BADGES_DATA;
    setDownloadingBadgeId("ALL");
    setDownloadType("PORTFOLIO");

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      for (let i = 0; i < unlockedBadges.length; i++) {
        setSelectedBadgeToExport(unlockedBadges[i]);
        // Wait for render
        await new Promise(res => setTimeout(res, 200));

        if (badgeCardRef.current) {
          const canvas = await html2canvas(badgeCardRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false
          });
          const imgData = canvas.toDataURL('image/png');

          if (i > 0) pdf.addPage();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const margin = 30;
          const imgWidth = pageWidth - (margin * 2);
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', margin, (pageHeight - imgHeight) / 2, imgWidth, imgHeight);
        }
      }

      pdf.save(`SarlaYash_Badges_Portfolio_${(user.name || 'Scholar').replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("Portfolio PDF generation error:", err);
    } finally {
      setDownloadingBadgeId(null);
      setDownloadType("");
    }
  };

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
            Quality Badges & Honors
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Every badge in the SarlaYash Mission represents verified enterprise STLC competency. Badges remain <strong>locked</strong> until you complete the eligibility requirement (all 14 modules + 80%+ assessment score), after which they can be downloaded as <strong>PNG</strong>, <strong>PDF</strong>, or a full <strong>Credentials Portfolio</strong>!
          </p>
        </div>

        {/* Badges Counter & Portfolio CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs shrink-0 ${
              isEligibleForCertification 
                ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}>
              {isEligibleForCertification ? `${totalBadges}/${totalBadges}` : `0/${totalBadges}`}
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">
                {isEligibleForCertification ? "Badges Unlocked" : "Badges Locked"}
              </div>
              <div className="text-xs text-amber-700 font-mono font-bold">
                {isEligibleForCertification ? "100% Eligible & Verified" : "Eligibility Criteria Incomplete"}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Candidate: <strong className="text-slate-800">{user.name || "Guest Scholar"}</strong>
              </div>
            </div>
          </div>

          {isEligibleForCertification ? (
            <button
              onClick={handleDownloadPortfolioPDF}
              disabled={downloadingBadgeId === 'ALL'}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingBadgeId === 'ALL' ? "Compiling Portfolio..." : "Download Badges Portfolio (PDF)"}</span>
            </button>
          ) : (
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 text-xs font-bold flex items-center gap-1.5 cursor-not-allowed">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Portfolio Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Governance Status Banner */}
      {!isEligibleForCertification ? (
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-2xl border border-amber-300 text-amber-800 shrink-0 mt-1">
              <Lock className="w-6 h-6 text-amber-700" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                  CREDENTIAL LOCK ACTIVE
                </span>
                <span className="text-xs font-black text-slate-900">
                  Badges Remain Locked Until 100% Modules & 80%+ Assessment Score
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                Under SarlaYash Mission governance, badges cannot be downloaded individually or as a portfolio until both prerequisites below are completed:
              </p>
              
              {/* Progress Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                  isAllModulesCompleted ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-amber-200 text-slate-700'
                }`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isAllModulesCompleted ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isAllModulesCompleted ? "✓" : "1"}
                  </span>
                  <span><strong>14 Modules:</strong> {completedModulesCount}/14 Completed ({Math.round((completedModulesCount/14)*100)}%)</span>
                </div>

                <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                  isFinalExamPassed ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-amber-200 text-slate-700'
                }`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isFinalExamPassed ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isFinalExamPassed ? "✓" : "2"}
                  </span>
                  <span><strong>Assessment Score:</strong> {progress.finalExam ? `${progress.finalExam.score}% (Need 80%+)` : "Not Attempted (Need 80%+)"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end lg:self-center">
            <button
              onClick={onOpenFinalExam}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 text-xs font-black transition shadow-xs flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-slate-950" />
              <span>{progress.finalExam ? "Retake Exam for 80%+" : "Take 30-Min Exam Now"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-100 rounded-2xl border border-emerald-300 text-emerald-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                ELIGIBILITY VERIFIED & CRITERIA MET
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                All 14 Modules Completed • Assessment Score: {finalExamScore}% PASS
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                All badges and portfolio downloads are unlocked. You may download each badge as PNG or PDF below!
              </p>
            </div>
          </div>
        </div>
      )}

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map((badge) => {
          const isUnlocked = isEligibleForCertification;
          const IconComp = ICON_MAP[badge.icon] || Award;
          const isThisDownloading = downloadingBadgeId === badge.id;

          return (
            <div
              key={badge.id}
              className={`relative rounded-3xl border p-6 transition flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-blue-200 shadow-md hover:shadow-lg'
                  : 'bg-slate-50 border-slate-200 opacity-75'
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

              {/* Action & Download Section */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="text-[11px] text-slate-500">
                  <strong className="text-slate-700">Requirement:</strong> {badge.requirement}
                </div>

                {isUnlocked ? (
                  <div className="flex items-center gap-2 pt-1">
                    {/* Download PNG Button */}
                    <button
                      onClick={() => handleDownloadBadgePNG(badge)}
                      disabled={isThisDownloading}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition"
                    >
                      <FileImage className="w-3.5 h-3.5 text-blue-600" />
                      <span>{isThisDownloading && downloadType === 'PNG' ? "Saving..." : "PNG"}</span>
                    </button>

                    {/* Download PDF Button */}
                    <button
                      onClick={() => handleDownloadBadgePDF(badge)}
                      disabled={isThisDownloading}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-bold border border-blue-200 flex items-center justify-center gap-1.5 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{isThisDownloading && downloadType === 'PDF' ? "Saving..." : "PDF"}</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <div className="w-full py-1.5 px-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-[11px] font-bold flex items-center justify-center gap-1.5 select-none">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Locked • 14 Modules & 80%+ Required</span>
                    </div>
                    {badge.id === 'badge_certified_lead' ? (
                      <button
                        onClick={onOpenFinalExam}
                        className="w-full py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-300 transition"
                      >
                        Take 30-Min Exam Now
                      </button>
                    ) : (
                      <button
                        onClick={onOpenIDE}
                        className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition"
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

      {/* HIDDEN OFF-SCREEN RENDERER FOR BADGE PNG/PDF EXPORT (Zero Overlapping, Crisp High-Res) */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {selectedBadgeToExport && (
          <div
            ref={badgeCardRef}
            className="w-[520px] bg-white text-slate-900 p-8 rounded-3xl border-4 border-slate-200 shadow-2xl relative overflow-hidden"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {/* Inner Border */}
            <div className="absolute inset-2 border-2 border-blue-600/30 rounded-2xl pointer-events-none" />

            {/* Header */}
            <div className="text-center space-y-1 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-black uppercase tracking-widest">
                <Crown className="w-3 h-3 text-blue-600" />
                <span>SARLAYASH MISSION • POWERED BY KAPIL</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight pt-1">
                Verified Quality Competency Badge
              </h2>
            </div>

            {/* Badge Graphic */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${selectedBadgeToExport.color} flex items-center justify-center text-white shadow-xl mb-3`}>
                {React.createElement(ICON_MAP[selectedBadgeToExport.icon] || Award, { className: "w-12 h-12" })}
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight text-center">
                {selectedBadgeToExport.name}
              </h3>
              <p className="text-xs font-bold text-blue-700 tracking-wide mt-0.5 text-center">
                {selectedBadgeToExport.title}
              </p>
            </div>

            {/* Description */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center my-4">
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedBadgeToExport.description}
              </p>
            </div>

            {/* Recipient Details & Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-end justify-between text-xs">
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conferred Upon</div>
                <div className="font-black text-slate-900 text-sm">
                  {user.name || "SarlaYash Certified Scholar"}
                </div>
                <div className="text-[10px] font-mono text-blue-700 font-bold">
                  ID: {user.candidateId || "SY-QA-VERIFIED"}
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <div className="font-serif italic text-base font-bold text-blue-900">Kapil</div>
                <div className="text-[10px] font-bold text-slate-800">Kapil • Founder</div>
                <div className="text-[9px] text-slate-400">sarlayash.github.io</div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
