import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { IDE_FILES } from '../data/ideChallenges';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal as TerminalIcon, 
  FileCode, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Cpu, 
  Download, 
  Layers, 
  Zap,
  Code2,
  FileText,
  Table,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function IDEWorkspace() {
  const { ideCodeMap, updateIdeCode, activeFileId, setActiveFileId, addXP, triggerCelebration } = useApp();
  
  const currentFile = IDE_FILES.find(f => f.id === activeFileId) || IDE_FILES[0];
  const [code, setCode] = useState(ideCodeMap[currentFile.id] || currentFile.initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState('terminal'); // 'terminal' | 'metrics' | 'deliverable'
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [executionDone, setExecutionDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const terminalEndRef = useRef(null);

  // Sync code when active file changes
  useEffect(() => {
    setCode(ideCodeMap[currentFile.id] || currentFile.initialCode);
    setExecutionDone(false);
    setTerminalLogs([]);
  }, [currentFile.id, ideCodeMap]);

  // Handle Code Change
  const handleCodeChange = (e) => {
    const val = e.target.value;
    setCode(val);
    updateIdeCode(currentFile.id, val);
  };

  // Run Code / Agent Simulation
  const handleRunExecution = () => {
    setIsRunning(true);
    setExecutionDone(false);
    setTerminalLogs([`[INITIALIZING] Launching Agentic AI Test Sandbox for ${currentFile.name}...`]);
    setActiveOutputTab('terminal');

    const expected = currentFile.expectedLogs || [];
    let logIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < expected.length) {
        const nextLog = expected[logIndex];
        setTerminalLogs(prev => [...prev, nextLog]);
        logIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionDone(true);
        addXP(150);
        triggerCelebration();
      }
    }, 350);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const handleResetCode = () => {
    if (window.confirm("Reset this file to its initial template?")) {
      setCode(currentFile.initialCode);
      updateIdeCode(currentFile.id, currentFile.initialCode);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 25) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] gap-3 animate-fadeIn">
      
      {/* Top Bar: Category & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-slate-900 tracking-tight">{currentFile.category}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                Live Simulator
              </span>
            </div>
            <p className="text-xs text-slate-500">{currentFile.description}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFileExplorer(!showFileExplorer)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>{showFileExplorer ? "Hide Files" : "Show Files"}</span>
          </button>

          <button
            onClick={handleRunExecution}
            disabled={isRunning}
            className={`px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition shadow-md ${
              isRunning
                ? 'bg-amber-500 text-white cursor-wait animate-pulse'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Agents Thinking...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Agent Suite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
        
        {/* Left: Practice Files Explorer */}
        {showFileExplorer && (
          <div className="lg:col-span-3 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-600" />
                Practice Files
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-mono font-bold">
                {IDE_FILES.length} Files
              </span>
            </div>

            <div className="p-2 space-y-1 overflow-y-auto flex-1">
              {IDE_FILES.map((f) => {
                const isSelected = f.id === currentFile.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFileId(f.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-blue-50 border border-blue-200 text-blue-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <Code2 className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div className="overflow-hidden">
                      <div className="truncate font-mono font-semibold">{f.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{f.module}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-600">
              <div className="font-bold text-slate-800 flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Hands-On Sandbox</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Directly edit ERP rules, threshold values, or prompts in the editor and click <strong className="text-emerald-700 font-bold">Run Agent Suite</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Center: Code Editor */}
        <div className={`${showFileExplorer ? 'lg:col-span-5' : 'lg:col-span-7'} flex flex-col bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden`}>
          
          {/* Header Bar */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-xs font-mono font-bold text-slate-800 ml-2">
                {currentFile.name}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                title="Copy code"
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDownload}
                title="Download file"
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetCode}
                title="Reset to template"
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editor Area with Line Numbers */}
          <div className="flex-1 flex overflow-hidden relative font-mono text-xs bg-slate-50/50">
            {/* Gutter */}
            <div className="select-none py-3 px-2 bg-slate-100 text-slate-400 text-right w-10 border-r border-slate-200 font-mono text-[11px] leading-5 shrink-0 overflow-hidden">
              {lineNumbers.map(num => (
                <div key={num}>{num}</div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              value={code}
              onChange={handleCodeChange}
              spellCheck="false"
              className="flex-1 w-full h-full p-3 bg-transparent text-slate-800 focus:outline-none resize-none font-mono text-xs leading-5 selection:bg-blue-100"
              style={{ tabSize: 2 }}
            />
          </div>
        </div>

        {/* Right: Output Console & Metrics */}
        <div className={`${showFileExplorer ? 'lg:col-span-4' : 'lg:col-span-5'} flex flex-col bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden`}>
          
          {/* Output Selector Tabs */}
          <div className="px-2 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveOutputTab('terminal')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  activeOutputTab === 'terminal'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Console</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('metrics')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  activeOutputTab === 'metrics'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Metrics</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('deliverable')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  activeOutputTab === 'deliverable'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Deliverable</span>
              </button>
            </div>

            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
              isRunning 
                ? 'bg-amber-100 text-amber-800 animate-pulse'
                : executionDone
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-500'
            }`}>
              {isRunning ? 'RUNNING' : executionDone ? 'COMPLETED' : 'IDLE'}
            </span>
          </div>

          {/* Tab 1: Terminal Console */}
          {activeOutputTab === 'terminal' && (
            <div className="flex-1 p-3.5 bg-slate-950 font-mono text-xs overflow-y-auto space-y-1.5 select-text">
              {terminalLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-4">
                  <TerminalIcon className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                  <p className="font-semibold text-slate-300">Ready to execute.</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Click "Run Agent Suite" to initiate autonomous agents in the ERP sandbox.
                  </p>
                </div>
              ) : (
                terminalLogs.map((log, index) => {
                  let color = "text-slate-300";
                  if (log.includes("[INIT]") || log.includes("Thinking:")) color = "text-cyan-400 font-semibold";
                  if (log.includes("[SUCCESS]") || log.includes("PASSED") || log.includes("APPROVED") || log.includes("GO")) color = "text-emerald-400 font-bold";
                  if (log.includes("BUG FOUND") || log.includes("FAILED") || log.includes("Critical") || log.includes("ERR_")) color = "text-rose-400 font-bold";
                  if (log.includes("Gate Router") || log.includes("Evaluating")) color = "text-amber-300";

                  return (
                    <div key={index} className={`leading-relaxed break-words ${color}`}>
                      {log}
                    </div>
                  );
                })
              )}
              <div ref={terminalEndRef} />
            </div>
          )}

          {/* Tab 2: Metrics */}
          {activeOutputTab === 'metrics' && (
            <div className="flex-1 p-4 bg-white overflow-y-auto space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Automated Quality Verification Metrics
              </h3>

              {currentFile.executionMetrics ? (
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(currentFile.executionMetrics).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-base font-black font-mono text-blue-700 mt-0.5">
                        {String(val)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Run code to capture metrics.</p>
              )}

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                <div className="font-bold text-blue-800 mb-1">Agile Sprint Alignment</div>
                <p className="text-[11px] text-blue-700 leading-normal">
                  All test metrics automatically export to the Sprint QA Dashboard and update the dynamic RTM in real-time.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Deliverable */}
          {activeOutputTab === 'deliverable' && (
            <div className="flex-1 p-4 bg-white overflow-y-auto text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-900">Generated STLC Deliverable</span>
                <span className="text-[10px] text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">IEEE 829</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] leading-relaxed text-slate-700 space-y-1.5">
                <div className="text-blue-900 font-bold">Artifact: ApexEnterprise ERP QA Specification</div>
                <div><strong>Author:</strong> SarlaYash Agentic AI Crew (Lead: Kapil)</div>
                <div><strong>Target ERP:</strong> Order-to-Cash & Procure-to-Pay</div>
                <div><strong>Status:</strong> Approved by Agile Test Lead</div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Export Artifact (.json / .py)</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
