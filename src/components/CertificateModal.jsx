import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  Check, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Crown,
  Edit2,
  FileImage,
  FileText,
  Lock,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificateModal({ isOpen, onClose, onOpenFinalExam, onOpenAuth }) {
  const { 
    user, 
    progress, 
    setUser,
    isEligibleForCertification,
    isAllModulesCompleted,
    completedModulesCount,
    totalModules,
    finalExamScore,
    isFinalExamPassed
  } = useApp();

  const certRef = useRef(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name || "");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState("");

  if (!isOpen) return null;

  const finalExam = progress.finalExam;
  const isPassed = isFinalExamPassed;
  const certId = finalExam?.certId || "SY-AAI-2026-88419";
  const issueDate = finalExam?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const score = finalExamScore >= 80 ? finalExamScore : (finalExam?.score || 85);
  const displayName = user.name || "SarlaYash Certified QA Professional";

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUser(prev => ({ ...prev, name: nameInput.trim() }));
    }
    setIsEditingName(false);
  };

  const handlePrint = () => {
    if (!isEligibleForCertification) {
      alert("Certificate printing is locked until you complete all 14 modules and score 80%+ on the assessment.");
      return;
    }
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!isEligibleForCertification) {
      alert("Certificate download is locked until you complete all 14 modules and score 80%+ on the assessment.");
      return;
    }
    if (!certRef.current) return;
    setIsDownloading(true);
    setDownloadType("PDF");
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`SarlaYash_Certificate_${displayName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("Certificate PDF download error:", err);
    } finally {
      setIsDownloading(false);
      setDownloadType("");
    }
  };

  const handleDownloadImage = async () => {
    if (!isEligibleForCertification) {
      alert("Certificate download is locked until you complete all 14 modules and score 80%+ on the assessment.");
      return;
    }
    if (!certRef.current) return;
    setIsDownloading(true);
    setDownloadType("PNG");
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const link = document.createElement('a');
      link.download = `SarlaYash_Certificate_${displayName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Certificate image download error:", err);
    } finally {
      setIsDownloading(false);
      setDownloadType("");
    }
  };

  const handleCopyVerification = () => {
    const url = `https://sarlayash.github.io/SarlaYash-Mission-Powered-By-Kapil-Agentic-AI-Software-Testing/#verify=${certId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 my-auto">
        
        {/* Top Control Bar (Hidden during Print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 ${
              isEligibleForCertification 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              {isEligibleForCertification ? <Award className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5 text-amber-600" />}
              <span>{isEligibleForCertification ? "Verifiable Credential" : "Certificate Locked"}</span>
            </span>
            {isEligibleForCertification && (
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                ID: <strong className="text-slate-800">{certId}</strong>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isEligibleForCertification ? (
              <>
                <button
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Name</span>
                </button>

                {/* Download PDF Button */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isDownloading && downloadType === 'PDF' ? "Exporting PDF..." : "Download PDF"}</span>
                </button>

                {/* Download PNG Button */}
                <button
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                >
                  <FileImage className="w-3.5 h-3.5" />
                  <span>{isDownloading && downloadType === 'PNG' ? "Exporting PNG..." : "Download PNG"}</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                {/* Verification Link Copy */}
                <button
                  onClick={handleCopyVerification}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Link Copied!" : "Verify URL"}</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 font-bold text-xs flex items-center gap-1.5 border border-amber-200 cursor-not-allowed">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Downloads Locked (14 Modules & 80%+ Required)</span>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Edit Name Bar */}
        {isEditingName && isEligibleForCertification && (
          <form onSubmit={handleSaveName} className="no-print mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Name on Certificate:</span>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Update
            </button>
          </form>
        )}

        {/* Guest warning if not signed in */}
        {!user.isLoggedIn && (
          <div className="no-print mb-4 p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3 text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Sign in with your real Google account to permanently link this certificate to your verified identity.</span>
            </div>
            <button
              onClick={onOpenAuth}
              className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold whitespace-nowrap"
            >
              Sign In with Google
            </button>
          </div>
        )}

        {/* IF NOT ELIGIBLE: RENDER THE OFFICIAL LOCKED ELIGIBILITY RESOLUTION PORTAL */}
        {!isEligibleForCertification ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-6">
            <div className="inline-flex p-4 rounded-3xl bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-xs">
              <Lock className="w-12 h-12 text-amber-600" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                SARLAYASH MISSION CREDENTIAL GOVERNANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Official Certificate of Excellence is Locked
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
                Under SarlaYash Mission governance, official certificates and badges remain locked until you fulfill the two mandatory qualification criteria below:
              </p>
            </div>

            {/* Interactive 2-Step Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {/* Step 1: Modules */}
              <div className={`p-5 rounded-2xl border transition ${
                isAllModulesCompleted ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">Criterion 1: Complete Curriculum</span>
                  </div>
                  {isAllModulesCompleted ? (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      ✓ 14/14 Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {completedModulesCount}/14 Done
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Complete all 14 Modules across Levels 1–10 covering STLC, ERP O2C/P2P, and Agentic AI workflows.
                </p>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3 border border-slate-200">
                  <div 
                    className={`h-full transition-all duration-500 ${isAllModulesCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`}
                    style={{ width: `${Math.min(100, Math.round((completedModulesCount / 14) * 100))}%` }}
                  />
                </div>

                {!isAllModulesCompleted && (
                  <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <span>Resume Modules ({14 - completedModulesCount} Remaining)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Step 2: Assessment 80%+ */}
              <div className={`p-5 rounded-2xl border transition ${
                isFinalExamPassed ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">Criterion 2: Score 80%+ on Exam</span>
                  </div>
                  {isFinalExamPassed ? (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      ✓ Score: {progress.finalExam?.score}%
                    </span>
                  ) : (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      {progress.finalExam ? `${progress.finalExam.score}% (Need 80%)` : "Not Attempted"}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Pass the timed 30-Minute Capstone Assessment with a verified score of 80% or higher.
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenFinalExam();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <Crown className="w-3.5 h-3.5 text-slate-950" />
                    <span>{progress.finalExam ? "Retake Exam for 80%+" : "Take 30-Minute Exam Now"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Watermarked Certificate Silhouette */}
            <div className="relative max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 opacity-60 pointer-events-none select-none overflow-hidden">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-4 text-center">
                <Lock className="w-8 h-8 text-amber-600 mb-2" />
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Official Certificate Watermark Preview
                </span>
                <span className="text-[11px] text-slate-500 max-w-sm mt-1">
                  Unlocks with candidate name, score, issue date, SarlaYash Council seal, and Kapil's signature once criteria are met.
                </span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-xs font-bold text-slate-400">SARLAYASH MISSION • POWERED BY KAPIL</div>
                <div className="text-lg font-serif font-black text-slate-700">Certificate of Excellence & Completion</div>
                <div className="h-0.5 w-32 bg-slate-200 mx-auto" />
                <div className="text-xs font-bold text-slate-500">Conferred Upon: {user.name || "Learner"}</div>
              </div>
            </div>

          </div>
        ) : (
          /* THE CERTIFICATE DOCUMENT (White Theme with Gold & Royal Blue Accents) */
          <div
            ref={certRef}
            className="certificate-print-area relative bg-white text-slate-900 p-8 sm:p-12 rounded-3xl border-8 border-slate-100 shadow-xl select-text overflow-hidden"
            style={{ minHeight: '580px' }}
          >
          {/* Ornamental Inner Double Border */}
          <div className="absolute inset-3 border-2 border-amber-400/40 rounded-2xl pointer-events-none" />
          <div className="absolute inset-5 border border-blue-600/20 rounded-xl pointer-events-none" />

          {/* Corner Flourishes */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-blue-700 pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-blue-700 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-blue-700 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-blue-700 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            
            {/* Header / Mission */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-black tracking-widest text-[11px] uppercase">
                <Crown className="w-3.5 h-3.5 text-blue-600" />
                <span>SARLAYASH MISSION • POWERED BY KAPIL</span>
                <Crown className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-wide text-slate-900 uppercase pt-2">
                Certificate of Excellence & Completion
              </h1>
              <p className="text-[11px] text-slate-500 font-bold tracking-widest uppercase">
                THIS IS OFFICIALLY PRESENTED TO
              </p>
            </div>

            {/* Recipient Name */}
            <div className="py-2">
              <div className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-wide border-b-2 border-amber-400/60 pb-2 inline-block max-w-2xl px-8">
                {displayName}
              </div>
              <div className="text-xs text-blue-700 font-mono font-bold mt-2">
                Candidate ID: {user.candidateId || "SY-QA-VERIFIED"} • Verification Hash: {certId}
              </div>
            </div>

            {/* Course Title & Syllabus */}
            <div className="max-w-2xl mx-auto space-y-1.5 text-xs text-slate-700">
              <p className="font-semibold text-slate-500">For successfully completing the comprehensive masterclass and practical assessments in:</p>
              <div className="text-base sm:text-xl font-black text-blue-900 uppercase tracking-tight">
                AGENTIC AI SOFTWARE TESTING USING AGILE TESTING PROCESS
              </div>
              <div className="text-xs sm:text-sm font-bold text-indigo-700">
                Real-Time ERP Product Testing with Agentic AI (Order-to-Cash & Procure-to-Pay)
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-xl mx-auto pt-1">
                Demonstrated practical mastery across all 14 STLC Modules: Autonomous Requirement Decomposition, AI Test Scenario & Case Generation, Automated RTM Synthesis, Build Smoke Gates, AI Root Cause Analysis with Jira, and Executive QA Dashboards.
              </p>
            </div>

            {/* Competencies */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto pt-2">
              {['CrewAI Multi-Agent', 'AutoGen Triage', 'LangGraph Stateful QA', 'Order-to-Cash ERP', 'Procure-to-Pay', 'Automated RTM', 'Defect RCA', 'DSR / DDR / WSR'].map((c, i) => (
                <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold">
                  ✓ {c}
                </span>
              ))}
            </div>

            {/* Signatures & Seal Section: Exclusively Kapil & SarlaYash Mission Governance */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end max-w-3xl mx-auto border-t border-slate-200">
              
              {/* Authorized Signature: Kapil */}
              <div className="text-center sm:text-left space-y-1">
                <div className="font-serif italic text-2xl text-blue-900 font-black tracking-wide">Kapil</div>
                <div className="h-0.5 w-36 mx-auto sm:mx-0 bg-slate-400" />
                <div className="text-xs font-black text-slate-900">Kapil</div>
                <div className="text-[10px] text-slate-600 font-bold">Founder & Principal AI QA Architect</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-wider">SarlaYash Mission</div>
              </div>

              {/* Center Official Crest Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-2 border-yellow-500 flex items-center justify-center text-slate-950 shadow-md">
                  <div className="w-12 h-12 rounded-full border border-dashed border-slate-900 flex flex-col items-center justify-center text-center p-1">
                    <Crown className="w-4 h-4 fill-slate-950" />
                    <span className="text-[8px] font-black uppercase">OFFICIAL</span>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-amber-700 mt-1 font-black">
                  GRADE: {score}% PASS
                </div>
              </div>

              {/* Official Credential Verification Block */}
              <div className="text-center sm:text-right space-y-1">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  SarlaYash Quality Council
                </div>
                <div className="h-0.5 w-36 mx-auto sm:ml-auto sm:mr-0 bg-slate-400" />
                <div className="text-[10px] text-slate-600 font-bold">
                  Date of Issuance: {issueDate}
                </div>
                <div className="text-[9px] text-blue-700 font-mono font-bold">
                  Verified Credential Hash: {certId}
                </div>
                <div className="text-[9px] text-slate-400">
                  sarlayash.github.io
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      </div>
    </div>
  );
}
