import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BADGES_DATA } from '../data/badgesData';
import { COURSE_MODULES } from '../data/courseData';
import { IDE_FILES } from '../data/ideChallenges';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';

const AppContext = createContext();

const STORAGE_KEY_USER = 'sarlayash_qa_real_user';
const STORAGE_KEY_PROGRESS = 'sarlayash_qa_progress';
const STORAGE_KEY_IDE = 'sarlayash_qa_ide_code';

export function AppProvider({ children }) {
  // 1. User Authentication (Firebase Real Google Auth)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      uid: null,
      name: "",
      email: "",
      avatar: "",
      role: "Agentic QA Professional",
      authProvider: null,
      candidateId: null,
      xp: 0,
      streakDays: 1,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      isLoggedIn: false
    };
  });

  const [authLoading, setAuthLoading] = useState(true);

  // Listen to Firebase Real Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const candidateId = "SY-QA-" + firebaseUser.uid.slice(-6).toUpperCase();
        const realUserData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "QA Scholar",
          email: firebaseUser.email || "",
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseUser.displayName || 'QA')}`,
          role: "Agentic QA Software Testing Professional",
          authProvider: "google",
          candidateId: candidateId,
          xp: user.xp > 0 ? user.xp : 300,
          streakDays: user.streakDays || 1,
          joinedDate: user.joinedDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          isLoggedIn: true
        };
        setUser(realUserData);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(realUserData));
      } else {
        // If not authenticated via Firebase
        const saved = localStorage.getItem(STORAGE_KEY_USER);
        if (!saved) {
          setUser({
            uid: null,
            name: "",
            email: "",
            avatar: "",
            role: "Agentic QA Professional",
            authProvider: null,
            candidateId: null,
            xp: 0,
            streakDays: 1,
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            isLoggedIn: false
          });
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Learning Progress & Module Completion
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      completedModules: [],
      moduleScores: {},
      unlockedBadgeIds: [],
      finalExam: null,
      certificates: []
    };
  });

  // 3. IDE State (Code per challenge, active file)
  const [ideCodeMap, setIdeCodeMap] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_IDE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    const defaults = {};
    IDE_FILES.forEach(f => {
      defaults[f.id] = f.initialCode;
    });
    return defaults;
  });

  const [activeFileId, setActiveFileId] = useState(IDE_FILES[0].id);

  // Sync to LocalStorage
  useEffect(() => {
    if (user && user.isLoggedIn) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_IDE, JSON.stringify(ideCodeMap));
  }, [ideCodeMap]);

  // Real Google Sign-In with Firebase Popup
  const signInWithGoogleFirebase = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const candidateId = "SY-QA-" + fbUser.uid.slice(-6).toUpperCase();
      const realUserData = {
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || "QA Scholar",
        email: fbUser.email || "",
        avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fbUser.displayName || 'QA')}`,
        role: "Agentic QA Software Testing Professional",
        authProvider: "google",
        candidateId: candidateId,
        xp: user.xp > 0 ? user.xp : 300,
        streakDays: user.streakDays || 1,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        isLoggedIn: true
      };
      setUser(realUserData);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(realUserData));
      triggerCelebration();
      return { success: true, user: realUserData };
    } catch (error) {
      console.error("Firebase Google Sign-In Error:", error);
      return { success: false, error: error.message };
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setUser({
      uid: null,
      name: "",
      email: "",
      avatar: "",
      role: "Agentic QA Professional",
      authProvider: null,
      candidateId: null,
      xp: 0,
      streakDays: 1,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      isLoggedIn: false
    });
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  // Add XP
  const addXP = (amount) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  // Confetti Celebration
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Eligibility Calculation: Complete all 14 modules AND score >= 80% on assessment
  const totalModules = COURSE_MODULES.length; // 14
  const completedModulesCount = progress.completedModules.length;
  const isAllModulesCompleted = completedModulesCount >= totalModules;
  const finalExamScore = progress.finalExam?.score || 0;
  const isFinalExamPassed = Boolean(progress.finalExam?.passed && finalExamScore >= 80);
  const isEligibleForCertification = isAllModulesCompleted && isFinalExamPassed;

  // Mark Module Complete
  const markModuleComplete = (moduleId) => {
    if (!progress.completedModules.includes(moduleId)) {
      const updated = [...progress.completedModules, moduleId];
      const targetMod = COURSE_MODULES.find(m => m.id === moduleId);
      const earnedXP = targetMod ? targetMod.xp : 500;
      
      addXP(earnedXP);

      const newBadges = [...progress.unlockedBadgeIds];
      const badgeForMod = BADGES_DATA.find(b => b.moduleRef === moduleId);
      if (badgeForMod && !newBadges.includes(badgeForMod.id)) {
        newBadges.push(badgeForMod.id);
      }

      if (updated.length === COURSE_MODULES.length && !newBadges.includes("badge_full_stlc")) {
        newBadges.push("badge_full_stlc");
        addXP(2500);
      }

      // Check if both criteria are now met (14 modules completed + 80% exam passed)
      const examAlreadyPassed = Boolean(progress.finalExam?.passed && progress.finalExam?.score >= 80);
      let updatedCertificates = progress.certificates || [];
      if (updated.length === COURSE_MODULES.length && examAlreadyPassed) {
        if (!newBadges.includes("badge_certified_lead")) {
          newBadges.push("badge_certified_lead");
        }
        const certId = progress.finalExam?.certId || `SY-AAI-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const issueDate = progress.finalExam?.date || new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const studentName = user.name || "SarlaYash Certified Scholar";
        const newCert = {
          id: certId,
          studentName: studentName,
          candidateId: user.candidateId || ("SY-QA-" + Math.floor(100000 + Math.random() * 900000)),
          score: progress.finalExam.score,
          issueDate: issueDate,
          title: "AGENTIC AI SOFTWARE TESTING USING AGILE TESTING PROCESS",
          subtitle: "Real-Time ERP Product Testing with Agentic AI",
          mission: "SarlaYash Mission Powered By Kapil",
          verificationUrl: `https://sarlayash.github.io/SarlaYash-Mission-Powered-By-Kapil-Agentic-AI-Software-Testing/#verify=${certId}`
        };
        updatedCertificates = [newCert, ...updatedCertificates.filter(c => c.id !== certId)];
        triggerCelebration();
      }

      setProgress(prev => ({
        ...prev,
        completedModules: updated,
        unlockedBadgeIds: newBadges,
        certificates: updatedCertificates
      }));

      triggerCelebration();
    }
  };

  // Submit Mock Assessment
  const submitMockAssessment = (assessmentId, score) => {
    setProgress(prev => {
      const updatedScores = { ...prev.moduleScores, [assessmentId]: score };
      const newBadges = [...prev.unlockedBadgeIds];

      if (score >= 75) {
        addXP(400);
        triggerCelebration();
      }

      return {
        ...prev,
        moduleScores: updatedScores,
        unlockedBadgeIds: newBadges
      };
    });
  };

  // Submit Final Exam & Generate Certificate (Only if 80%+ and all 14 modules completed)
  const submitFinalAssessment = (score) => {
    const passed = score >= 80;
    const certId = `SY-AAI-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const issueDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const studentName = user.name || "SarlaYash Certified Scholar";
    const modulesAlreadyDone = progress.completedModules.length >= COURSE_MODULES.length;

    if (passed) {
      const newBadges = [...progress.unlockedBadgeIds];
      if (modulesAlreadyDone) {
        if (!newBadges.includes("badge_certified_lead")) {
          newBadges.push("badge_certified_lead");
        }
        if (!newBadges.includes("badge_full_stlc")) {
          newBadges.push("badge_full_stlc");
        }
      }

      const newCert = {
        id: certId,
        studentName: studentName,
        candidateId: user.candidateId || ("SY-QA-" + Math.floor(100000 + Math.random() * 900000)),
        score: score,
        issueDate: issueDate,
        title: "AGENTIC AI SOFTWARE TESTING USING AGILE TESTING PROCESS",
        subtitle: "Real-Time ERP Product Testing with Agentic AI",
        mission: "SarlaYash Mission Powered By Kapil",
        verificationUrl: `https://sarlayash.github.io/SarlaYash-Mission-Powered-By-Kapil-Agentic-AI-Software-Testing/#verify=${certId}`
      };

      setProgress(prev => ({
        ...prev,
        finalExam: { score, passed, date: issueDate, certId },
        unlockedBadgeIds: newBadges,
        certificates: modulesAlreadyDone ? [newCert, ...prev.certificates.filter(c => c.id !== certId)] : prev.certificates
      }));

      addXP(3000);
      triggerCelebration();
    } else {
      setProgress(prev => ({
        ...prev,
        finalExam: { score, passed, date: issueDate }
      }));
    }

    return { passed, score, certId, modulesCompleted: modulesAlreadyDone };
  };

  // Update IDE code
  const updateIdeCode = (fileId, newCode) => {
    setIdeCodeMap(prev => ({
      ...prev,
      [fileId]: newCode
    }));

    if (!progress.unlockedBadgeIds.includes("badge_ide_pro")) {
      setProgress(prev => ({
        ...prev,
        unlockedBadgeIds: [...prev.unlockedBadgeIds, "badge_ide_pro"]
      }));
      addXP(400);
    }
  };

  // Reset progress
  const resetProgress = () => {
    setProgress({
      completedModules: [],
      moduleScores: {},
      unlockedBadgeIds: [],
      finalExam: null,
      certificates: []
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        signInWithGoogleFirebase,
        logout,
        addXP,
        progress,
        markModuleComplete,
        submitMockAssessment,
        submitFinalAssessment,
        ideCodeMap,
        updateIdeCode,
        activeFileId,
        setActiveFileId,
        resetProgress,
        triggerCelebration,
        totalModules,
        completedModulesCount,
        isAllModulesCompleted,
        finalExamScore,
        isFinalExamPassed,
        isEligibleForCertification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
