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
  ExternalLink
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificateModal({ isOpen, onClose, onOpenFinalExam, onOpenAuth }) {
  const { user, progress, setUser } = useApp();
  const certRef = useRef(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name || "");
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const finalExam = progress.finalExam;
  const isPassed = finalExam?.passed;
  const certId = finalExam?.certId || "SY-AAI-2026-88419";
  const issueDate = finalExam?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const score = finalExam?.score || 95;
  const displayName = user.name || "SarlaYash Certified QA Engineer";

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUser(prev => ({ ...prev, name: nameInput.trim() }));
    }
    setIsEditingName(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`SarlaYash_Certificate_${displayName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("Certificate PDF download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `SarlaYash_Certificate_${displayName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Certificate image download error:", err);
    } finally {
      setIsDownloading(false);
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
        
        {/* Top Control Bar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Verifiable Certificate</span>
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              ID: <strong className="text-slate-800">{certId}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingName(!isEditingName)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Name</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? "Preparing..." : "Download PDF"}</span>
            </button>

            <button
              onClick={handleCopyVerification}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Link Copied!" : "Verify URL"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Edit Name Bar */}
        {isEditingName && (
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
              <span>Sign in with your real Google account to permanently link this certificate to your identity.</span>
            </div>
            <button
              onClick={onOpenAuth}
              className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold whitespace-nowrap"
            >
              Sign In with Google
            </button>
          </div>
        )}

        {/* THE CERTIFICATE DOCUMENT (White Theme with Gold & Royal Blue Accents) */}
        <div
          ref={certRef}
          className="certificate-print-area relative bg-white text-slate-900 p-8 sm:p-12 rounded-3xl border-8 border-slate-100 shadow-xl select-text overflow-hidden"
          style={{ minHeight: '580px' }}
        >
          {/* Ornamental Inner Double Border */}
          <div className="absolute inset-3 border-2 border-amber-400/40 rounded-2xl pointer-events-none" />
          <div className="absolute inset-5 border border-blue-600/20 rounded-xl pointer-events-none" />

          {/* Corner Badges */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-blue-700" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-blue-700" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-blue-700" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-blue-700" />

          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            
            {/* Header / Mission */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-black tracking-widest text-[11px] uppercase">
                <Crown className="w-3.5 h-3.5 text-blue-600" />
                <span>SARLAYASH MISSION • POWERED BY KAPIL</span>
                <Crown className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-slate-900 uppercase pt-2">
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
                Candidate ID: {user.candidateId || "SY-QA-VERIFIED"} • Credential Verification Hash: {certId}
              </div>
            </div>

            {/* Course Title & Syllabus */}
            <div className="max-w-2xl mx-auto space-y-1.5 text-xs text-slate-700">
              <p className="font-semibold text-slate-500">For successfully completing the comprehensive masterclass and practical assessments in:</p>
              <div className="text-base sm:text-lg font-black text-blue-900 uppercase tracking-tight">
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

            {/* Signatures & Seal */}
            <div className="pt-6 grid grid-cols-3 items-end max-w-3xl mx-auto border-t border-slate-200">
              
              {/* Signature 1 */}
              <div className="text-left space-y-1">
                <div className="font-serif italic text-lg text-blue-900 font-bold">Kapil</div>
                <div className="h-0.5 w-32 bg-slate-400" />
                <div className="text-xs font-bold text-slate-900">Kapil</div>
                <div className="text-[10px] text-slate-500 font-semibold">Founder & Principal AI QA Architect</div>
                <div className="text-[9px] text-slate-400">SarlaYash Mission</div>
              </div>

              {/* Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-2 border-yellow-500 flex items-center justify-center text-slate-950 shadow-md">
                  <div className="w-12 h-12 rounded-full border border-dashed border-slate-900 flex flex-col items-center justify-center text-center p-1">
                    <Crown className="w-4 h-4 fill-slate-950" />
                    <span className="text-[8px] font-black uppercase">OFFICIAL</span>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-amber-700 mt-1 font-bold">
                  GRADE: {score}% PASS
                </div>
              </div>

              {/* Signature 2 */}
              <div className="text-right space-y-1 flex flex-col items-end">
                <div className="font-serif italic text-lg text-blue-900 font-bold">Dr. Yashoda S.</div>
                <div className="h-0.5 w-32 bg-slate-400" />
                <div className="text-xs font-bold text-slate-900">Dr. Yashoda Sharma</div>
                <div className="text-[10px] text-slate-500 font-semibold">Director of Academic Excellence</div>
                <div className="text-[9px] text-slate-400">Issued: {issueDate}</div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
