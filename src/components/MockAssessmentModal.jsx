import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ASSESSMENTS } from '../data/assessmentData';
import { 
  X, 
  Timer, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Zap, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function MockAssessmentModal({ assessmentId, isOpen, onClose }) {
  const { submitMockAssessment } = useApp();
  
  const assessment = MOCK_ASSESSMENTS.find(a => a.id === assessmentId) || MOCK_ASSESSMENTS[0];
  
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(assessment.durationSeconds || 300);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    setTimeLeft(assessment.durationSeconds || 300);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);

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
  }, [isOpen, assessment.id]);

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleAutoSubmit = () => {
    calculateScore(selectedAnswers);
  };

  const handleSubmit = () => {
    calculateScore(selectedAnswers);
  };

  const calculateScore = (answers) => {
    let correctCount = 0;
    assessment.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / assessment.questions.length) * 100);
    const passed = scorePct >= assessment.passingScore;

    setScoreResult({
      score: scorePct,
      correctCount,
      total: assessment.questions.length,
      passed
    });
    setIsSubmitted(true);
    submitMockAssessment(assessment.id, scorePct);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
    setTimeLeft(assessment.durationSeconds || 300);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Live Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-widest border border-blue-200">
              SarlaYash Mock Assessment
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {assessment.title}
            </h2>
            <p className="text-xs text-slate-500">
              Passing Mark: {assessment.passingScore}% • {assessment.questions.length} Scenario Questions
            </p>
          </div>

          {/* Timer Display */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border font-mono font-black text-sm w-fit ${
            timeLeft < 60 
              ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse' 
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Score Summary Banner if Submitted */}
        {isSubmitted && scoreResult && (
          <div className={`my-6 p-5 rounded-2xl border ${
            scoreResult.passed 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50 border-rose-200 text-rose-900'
          } text-center space-y-2 animate-fadeIn`}>
            <div className="flex items-center justify-center gap-2">
              {scoreResult.passed ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              ) : (
                <ShieldAlert className="w-8 h-8 text-rose-600" />
              )}
              <h3 className="text-3xl font-black font-mono">
                {scoreResult.score}%
              </h3>
            </div>
            <p className="text-sm font-bold">
              {scoreResult.passed ? "Well done! You passed this mock assessment." : "Passing score is 75%. Review the explanations below and retake."}
            </p>
            <p className="text-xs text-slate-600 font-medium">
              Score: {scoreResult.correctCount} of {scoreResult.total} questions correct
            </p>
            {scoreResult.passed && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold font-mono">
                <Zap className="w-3.5 h-3.5 fill-amber-500" />
                <span>+400 XP Awarded</span>
              </div>
            )}
          </div>
        )}

        {/* Questions List */}
        <div className="my-6 space-y-6">
          {assessment.questions.map((q, idx) => {
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black font-mono shrink-0">
                    Q{idx + 1}
                  </span>
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {q.question}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    let optionStyle = 'border-slate-200 hover:border-blue-400 text-slate-700 bg-white';

                    if (isSubmitted) {
                      if (optIdx === q.correctAnswer) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected && optIdx !== q.correctAnswer) {
                        optionStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition flex items-start gap-2.5 ${optionStyle}`}
                      >
                        <span className="font-mono font-bold text-slate-400 shrink-0">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on Submission */}
                {isSubmitted && (
                  <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2 animate-fadeIn">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-700">Explanation: </span>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100">
          {!isSubmitted ? (
            <>
              <div className="text-xs text-slate-500 font-medium">
                Answered: <strong className="text-slate-900">{Object.keys(selectedAnswers).length}</strong> of {assessment.questions.length}
              </div>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
              >
                <span>Submit Mock Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleRetake}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
              >
                Done
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
