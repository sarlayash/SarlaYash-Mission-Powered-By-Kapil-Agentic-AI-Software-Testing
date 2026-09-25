import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import LeftSidebar from './components/LeftSidebar';
import Navbar from './components/Navbar';
import CourseCurriculum from './components/CourseCurriculum';
import IDEWorkspace from './components/IDEWorkspace';
import BadgesShowcase from './components/BadgesShowcase';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import CertificateModal from './components/CertificateModal';
import MockAssessmentModal from './components/MockAssessmentModal';
import FinalAssessmentModal from './components/FinalAssessmentModal';
import ModuleDetailModal from './components/ModuleDetailModal';
import ERPShowcaseModal from './components/ERPShowcaseModal';
import Footer from './components/Footer';
import { MOCK_ASSESSMENTS } from './data/assessmentData';
import { 
  Terminal, 
  Award, 
  Crown, 
  Database, 
  BookOpen, 
  ArrowRight,
  Flame,
  Zap,
  Play
} from 'lucide-react';

export default function App() {
  const { setActiveFileId, progress } = useApp();
  
  // Navigation & Layout
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'ide' | 'mocks' | 'erp' | 'badges'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Filters (Options to hide and show)
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isFinalExamOpen, setIsFinalExamOpen] = useState(false);
  const [activeMockId, setActiveMockId] = useState(null);
  const [activeDetailModule, setActiveDetailModule] = useState(null);
  const [isERPModalOpen, setIsERPModalOpen] = useState(false);

  // Jump to IDE with specific challenge
  const handleLaunchIDE = (challengeId) => {
    if (challengeId) {
      setActiveFileId(challengeId);
    }
    setActiveTab('ide');
  };

  const handleOpenMock = (mockId) => {
    setActiveMockId(mockId);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex">
      
      {/* 1. Left Sidebar Navigation Bar (Desktop) */}
      <div className="hidden lg:block">
        <LeftSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenFinalExam={() => setIsFinalExamOpen(true)}
          onOpenCertificate={() => setIsCertModalOpen(true)}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-white shadow-2xl">
            <LeftSidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              isCollapsed={false}
              setIsCollapsed={() => setIsMobileSidebarOpen(false)}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              onOpenAuth={() => {
                setIsAuthModalOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              onOpenProfile={() => {
                setIsProfileModalOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              onOpenFinalExam={() => {
                setIsFinalExamOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              onOpenCertificate={() => {
                setIsCertModalOpen(true);
                setIsMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Main Content Wrapper */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        }`}
      >
        {/* Universal Top Header */}
        <Navbar
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setIsMobileSidebarOpen(!isMobileSidebarOpen);
            } else {
              setIsSidebarCollapsed(!isSidebarCollapsed);
            }
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenCertificate={() => setIsCertModalOpen(true)}
          onOpenFinalExam={() => setIsFinalExamOpen(true)}
        />

        {/* Dynamic View Tab */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          
          {/* Tab 1: Curriculum & 14 Modules */}
          {activeTab === 'curriculum' && (
            <CourseCurriculum
              onSelectModule={(mod) => setActiveDetailModule(mod)}
              onOpenIDE={handleLaunchIDE}
              onOpenMock={handleOpenMock}
              onOpenFinalExam={() => setIsFinalExamOpen(true)}
              selectedLevel={selectedLevel}
              selectedStatus={selectedStatus}
            />
          )}

          {/* Tab 2: Real Practice IDE */}
          {activeTab === 'ide' && (
            <IDEWorkspace />
          )}

          {/* Tab 3: Mock Assessments */}
          {activeTab === 'mocks' && (
            <div className="space-y-8 animate-fadeIn pb-12">
              <div className="rounded-3xl bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/50 border border-purple-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                    Agile STLC Evaluation Center
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 heading-gradient-purple">
                    Level-Wise Mock Assessments
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                    Timed multiple-choice scenario evaluations testing enterprise ERP requirements, multi-agent AI prompting, RTM formulation, and defect root cause analysis.
                  </p>
                </div>

                <button
                  onClick={() => setIsFinalExamOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/25 flex items-center gap-2 whitespace-nowrap transition"
                >
                  <Crown className="w-4 h-4" />
                  <span>Take 30-Min Final Exam</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MOCK_ASSESSMENTS.map((mock) => {
                  const score = progress.moduleScores[mock.id];
                  const isPassed = score !== undefined && score >= mock.passingScore;

                  return (
                    <div
                      key={mock.id}
                      className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition space-y-4 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                            Level {mock.level} Mock
                          </span>
                          <h3 className="text-base font-black text-slate-900 mt-1.5">{mock.title}</h3>
                        </div>
                        {score !== undefined && (
                          <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                            isPassed ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {score}% {isPassed ? 'PASSED' : 'RETAKE'}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                        <span>⏱️ {Math.round(mock.durationSeconds / 60)} Minutes</span>
                        <span>•</span>
                        <span>📋 {mock.questions.length} Questions</span>
                        <span>•</span>
                        <span>🎯 {mock.passingScore}% Pass Mark</span>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                        <span className="text-xs text-amber-700 font-mono font-bold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-amber-500" />
                          +400 XP on Pass
                        </span>

                        <button
                          onClick={() => handleOpenMock(mock.id)}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>{score !== undefined ? 'Retake Quiz' : 'Start Mock'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: ERP Sandbox */}
          {activeTab === 'erp' && (
            <div className="space-y-8 animate-fadeIn pb-12">
              <div className="rounded-3xl bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/50 border border-cyan-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 uppercase tracking-wider">
                    Enterprise ERP Testbed
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 heading-gradient-primary">
                    ApexEnterprise Cloud ERP v4.2
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                    Order-to-Cash (O2C) & Procure-to-Pay (P2P) live sandbox. Practice requirement decomposition, 3-way matching rules, and negative credit boundary testing.
                  </p>
                </div>

                <button
                  onClick={() => setIsERPModalOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 whitespace-nowrap transition"
                >
                  <Database className="w-4 h-4" />
                  <span>Launch ERP Sandbox</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 hover:shadow-md transition">
                  <div className="text-blue-700 font-bold text-sm">Order-to-Cash (O2C)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sales Order processing, $50K finance approval triggers, 15% discount escalation, and 120-minute inventory reservations.
                  </p>
                  <button
                    onClick={() => setIsERPModalOpen(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold pt-2 flex items-center gap-1"
                  >
                    <span>Test O2C Rules</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 hover:shadow-md transition">
                  <div className="text-blue-700 font-bold text-sm">Procure-to-Pay (P2P)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Purchase Order to Goods Receipt Note (GRN) to Vendor Invoice 3-way matching with strict 2% variance tolerances.
                  </p>
                  <button
                    onClick={() => setIsERPModalOpen(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold pt-2 flex items-center gap-1"
                  >
                    <span>Test 3-Way Match</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 hover:shadow-md transition">
                  <div className="text-blue-700 font-bold text-sm">Autonomous QA Agents</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    CrewAI, AutoGen, and LangGraph test crews monitoring sprint pipelines, updating RTM matrices, and logging Jira defects.
                  </p>
                  <button
                    onClick={() => handleLaunchIDE('crewai_qa_team')}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold pt-2 flex items-center gap-1"
                  >
                    <span>Run Crew in IDE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Badges Showcase */}
          {activeTab === 'badges' && (
            <BadgesShowcase
              onOpenFinalExam={() => setIsFinalExamOpen(true)}
              onOpenIDE={() => setActiveTab('ide')}
            />
          )}

        </main>

        {/* Universal Clean White Footer */}
        <Footer
          onOpenIDE={() => setActiveTab('ide')}
          onOpenFinalExam={() => setIsFinalExamOpen(true)}
          onOpenCertificate={() => setIsCertModalOpen(true)}
          onSelectTab={setActiveTab}
        />

      </div>

      {/* DIALOG MODALS */}
      {/* 1. Real Google Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* 2. User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenCertificate={() => setIsCertModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* 3. Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onOpenFinalExam={() => setIsFinalExamOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* 4. Mock Assessment Modal */}
      {activeMockId && (
        <MockAssessmentModal
          assessmentId={activeMockId}
          isOpen={Boolean(activeMockId)}
          onClose={() => setActiveMockId(null)}
        />
      )}

      {/* 5. Final Assessment Modal */}
      <FinalAssessmentModal
        isOpen={isFinalExamOpen}
        onClose={() => setIsFinalExamOpen(false)}
        onOpenCertificate={() => setIsCertModalOpen(true)}
      />

      {/* 6. Module Detailed Deep Dive Modal */}
      {activeDetailModule && (
        <ModuleDetailModal
          module={activeDetailModule}
          isOpen={Boolean(activeDetailModule)}
          onClose={() => setActiveDetailModule(null)}
          onLaunchIDE={handleLaunchIDE}
        />
      )}

      {/* 7. ERP Showcase Modal */}
      <ERPShowcaseModal
        isOpen={isERPModalOpen}
        onClose={() => setIsERPModalOpen(false)}
        onLaunchIDE={handleLaunchIDE}
      />

    </div>
  );
}
