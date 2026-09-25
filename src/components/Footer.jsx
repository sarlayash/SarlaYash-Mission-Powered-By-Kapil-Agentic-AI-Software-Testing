import React from 'react';
import { COURSE_INFO } from '../data/courseData';
import { Sparkles, Terminal, Award, BookOpen, ShieldCheck, Heart, Crown, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenIDE, onOpenFinalExam, onOpenCertificate, onSelectTab }) {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Mission Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
                SY
              </div>
              <div>
                <h3 className="text-slate-900 font-black text-base tracking-tight">
                  SarlaYash <span className="text-blue-600">Mission</span>
                </h3>
                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">
                  Powered By Kapil
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              A premier educational initiative empowering QA Engineers, SDETs, and Test Leads with autonomous Agentic AI skills, rigorous Agile STLC frameworks, and real-time enterprise ERP product testing excellence.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                14 STLC Modules
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                Multi-Agent Frameworks (CrewAI / AutoGen / LangGraph)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                Verifiable Certificates
              </span>
            </div>
          </div>

          {/* Tools Covered */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Enterprise Tools Covered
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {['CrewAI', 'AutoGen', 'LangGraph', 'Gemini AI', 'ChatGPT', 'Claude AI', 'Cursor AI', 'Copilot', 'Jira Software', 'Confluence', 'Azure DevOps', 'TestRail'].map((t, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-600">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Genuine Verified Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Verified Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/sarlayash/SarlaYash-Mission-Powered-By-Kapil-Agentic-AI-Software-Testing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5 font-semibold"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('curriculum')}
                  className="text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Curriculum (14 Modules)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenIDE}
                  className="text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive Practice IDE</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFinalExam}
                  className="text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span>30-Min Final Capstone Exam</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCertificate}
                  className="text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Certificate Verification</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Deliverables List */}
        <div className="pt-6 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            14 Project Deliverables Built In Course:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Requirement Analysis Document', 'Test Scenario Document', 'Scenario RTM', 'Test Case Document',
              'Test Case RTM', 'Smoke Test Reports', 'Functional Execution Reports', 'Defect Reports',
              'Daily Status Reports (DSR)', 'Daily Defect Reports (DDR)', 'Weekly Status Reports (WSR)',
              'Re-Testing Reports (RTR)', 'Regression Test Reports', 'Final Test Closure Report'
            ].map((d, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 SarlaYash Mission • Powered By Kapil. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Enterprise Agile Testing</span>
            <span>•</span>
            <span>Agentic AI Automation</span>
            <span>•</span>
            <span>ISO/IEC 29119 Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
