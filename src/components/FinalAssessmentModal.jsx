import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FINAL_ASSESSMENT } from '../data/assessmentData';
import { 
  X, 
  Timer, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Crown, 
  Flag, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function FinalAssessmentModal({ isOpen, onClose, onOpenCertificate }) {
  const { submitFinalAssessment, user } = useApp();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(FINAL_ASSESSMENT.durationSeconds || 1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examResult, setExamResult] = useState(null);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    setTimeLeft(FINAL_ASSESSMENT.durationSeconds || 1800);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentIdx(0);
    setIsSubmitted(false);
    setExamResult(null);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const toggleFlag = (qId) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleAutoSubmit = () => {
    finishExam(selectedAnswers);
  };

  const handleManualSubmit = () => {
    const unansweredCount = FINAL_ASSESSMENT.questions.length - Object.keys(selectedAnswers).length;
    if (unansweredCount > 0) {
      if (!window.confirm(`You have ${unansweredCount} unanswered questions. Are you sure you want to finalize your exam submission?`)) {
        return;
      }
    }
    finishExam(selectedAnswers);
  };

  const finishExam = (answers) => {
    let correctCount = 0;
    FINAL_ASSESSMENT.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / FINAL_ASSESSMENT.questions.length) * 100);
    const result = submitFinalAssessment(scorePct);

    setExamResult({
      score: scorePct,
      correctCount,
      total: FINAL_ASSESSMENT.questions.length,
      passed: result.passed,
      certId: result.certId
    });
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const currentQ = FINAL_ASSESSMENT.questions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-8 max-h-[95vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-widest flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-600" />
                <span>30-Minute Capstone Certification</span>
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Candidate: <strong className="text-slate-900">{user.name || "Guest Scholar"}</strong>
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 mt-1">
              {FINAL_ASSESSMENT.title}
            </h2>
            <p className="text-xs font-bold text-blue-700">
              SarlaYash Mission Powered By Kapil • Passing Mark: 80%
            </p>
          </div>

          {/* Timer Display */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-black text-base w-fit ${
            timeLeft < 300 
              ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
              : 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
          }`}>
            <Timer className="w-5 h-5 text-amber-600" />
            <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Exam Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          
          {/* Result View */}
          {isSubmitted && examResult ? (
            <div className="space-y-6 text-center py-6 animate-fadeIn">
              <div className="inline-flex p-4 rounded-3xl bg-amber-100 border-2 border-amber-300 text-amber-700 mb-2 shadow-xs">
                <Crown className="w-16 h-16" />
              </div>

              <h3 className="text-3xl font-black text-slate-900">
                {examResult.passed ? "CERTIFICATION EARNED!" : "EXAM ATTEMPT COMPLETED"}
              </h3>

              <div className="text-5xl font-black text-amber-600 font-mono tracking-tight">
                {examResult.score}%
              </div>

              <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                {examResult.passed ? (
                  <>
                    Outstanding work! You scored <strong>{examResult.correctCount} of {examResult.total}</strong> correct and unlocked the official <strong className="text-blue-700 font-bold">Certified Agentic QA Lead</strong> credential under SarlaYash Mission Powered By Kapil.
                  </>
                ) : (
                  <>
                    You scored <strong>{examResult.correctCount} of {examResult.total}</strong>. A minimum score of <strong>80%</strong> is required for official certification. Review the explanations below and retake!
                  </>
                )}
              </p>

              {examResult.passed && (
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCertificate();
                    }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition"
                  >
                    <Award className="w-5 h-5" />
                    <span>View & Download Certificate of Completion</span>
                  </button>
                </div>
              )}

              {/* Review Questions */}
              <div className="pt-6">
                <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-4">
                  Review All Question Explanations
                </h4>
                <div className="space-y-4 text-left max-w-2xl mx-auto">
                  {FINAL_ASSESSMENT.questions.map((q, qIndex) => {
                    const ans = selectedAnswers[q.id];
                    const isRight = ans === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-700">Q{qIndex + 1} ({q.module})</span>
                          <span className={isRight ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>
                            {isRight ? "Correct (+1)" : "Incorrect (0)"}
                          </span>
                        </div>
                        <p className="text-slate-900 font-bold">{q.question}</p>
                        <div className="text-slate-600">
                          <strong>Your Answer:</strong> {ans !== undefined ? q.options[ans] : "Unanswered"}
                        </div>
                        <div className="text-emerald-800 font-semibold">
                          <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                        </div>
                        <div className="text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                          <em>{q.explanation}</em>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            // Active Exam Questions
            <div className="space-y-6">
              
              {/* Question Navigation Palette */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                  <span>Questions: <strong className="text-slate-800">{answeredCount} of {FINAL_ASSESSMENT.questions.length} answered</strong></span>
                  <span className="text-blue-700 font-bold">{currentQ.module}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FINAL_ASSESSMENT.questions.map((q, idx) => {
                    const isAns = selectedAnswers[q.id] !== undefined;
                    const isCurr = idx === currentIdx;
                    const isFlag = flaggedQuestions[q.id];

                    let btnClass = "bg-white text-slate-600 border-slate-200 hover:border-slate-400";
                    if (isAns) btnClass = "bg-blue-600 text-white border-blue-600 font-bold shadow-xs";
                    if (isFlag) btnClass = "bg-amber-100 text-amber-900 border-amber-400 font-bold";
                    if (isCurr) btnClass += " ring-2 ring-blue-700";

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono border transition flex items-center justify-center ${btnClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Question Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-700">Question {currentIdx + 1} of {FINAL_ASSESSMENT.questions.length}</span>
                    <span>•</span>
                    <span className="text-blue-700 font-mono font-bold">{currentQ.module}</span>
                  </div>
                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flaggedQuestions[currentQ.id] ? "Flagged" : "Flag for Review"}</span>
                  </button>
                </div>

                <div className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
                  {currentQ.question}
                </div>

                {/* Option Buttons */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === oIdx;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(currentQ.id, oIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-xs'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white font-bold' : 'border-slate-300 text-slate-500 bg-white'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 shrink-0">
            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                disabled={currentIdx === FINAL_ASSESSMENT.questions.length - 1}
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleManualSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Submit & Finalize Certification Exam</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
