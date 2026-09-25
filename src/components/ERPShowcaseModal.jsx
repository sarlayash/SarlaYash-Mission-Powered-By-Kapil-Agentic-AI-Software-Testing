import React, { useState } from 'react';
import { ERP_CASE_STUDY } from '../data/erpDatasets';
import { 
  X, 
  Database, 
  ShoppingCart, 
  Truck, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Terminal, 
  ArrowRight
} from 'lucide-react';

export default function ERPShowcaseModal({ isOpen, onClose, onLaunchIDE }) {
  const [activeTab, setActiveTab] = useState('o2c');

  // O2C Simulator State
  const [orderAmount, setOrderAmount] = useState(45000);
  const [discountPercent, setDiscountPercent] = useState(10);
  const [creditStatus, setCreditStatus] = useState('ACTIVE');
  const [simResult, setSimResult] = useState(null);

  // P2P Simulator State
  const [poAmount, setPoAmount] = useState(1000);
  const [invoiceAmount, setInvoiceAmount] = useState(1020);

  if (!isOpen) return null;

  const handleSimulateO2C = () => {
    if (creditStatus === 'HOLD') {
      setSimResult({
        status: 'REJECTED',
        code: 'ERR_CREDIT_HOLD',
        message: 'Order creation blocked: Customer account is on Credit Hold.',
        color: 'text-rose-700',
        bg: 'bg-rose-50 border-rose-200'
      });
      return;
    }

    const discountAmount = orderAmount * (discountPercent / 100);
    const net = orderAmount - discountAmount;
    const tax = net * 0.18;
    const total = net + tax;

    if (total > 50000 || discountPercent > 15) {
      setSimResult({
        status: 'PENDING_FINANCE_APPROVAL',
        code: 'WF_ESCALATION_P1',
        message: `Order total $${total.toFixed(2)} (or discount ${discountPercent}%) exceeds threshold. Escalated to Finance Manager.`,
        color: 'text-amber-800',
        bg: 'bg-amber-50 border-amber-200',
        total
      });
    } else {
      setSimResult({
        status: 'CONFIRMED',
        code: 'ORD_SUCCESS_200',
        message: `Order auto-approved. Tentative inventory lock placed for 120 mins. Total: $${total.toFixed(2)} (incl. 18% GST).`,
        color: 'text-emerald-800',
        bg: 'bg-emerald-50 border-emerald-200',
        total
      });
    }
  };

  const p2pVariance = ((invoiceAmount - poAmount) / poAmount) * 100;
  const p2pExceedsTolerance = Math.abs(p2pVariance) > 2.0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-8 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest">
              Real-Time ERP Sandbox
            </span>
            <span className="text-xs text-slate-500 font-medium">{ERP_CASE_STUDY.deployment}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {ERP_CASE_STUDY.systemName}
          </h2>
          <p className="text-xs text-slate-500">
            Interactive ERP testbed used across all 14 course modules for real QA practice.
          </p>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { id: 'o2c', label: 'Order-to-Cash (O2C)', icon: ShoppingCart },
              { id: 'p2p', label: 'Procure-to-Pay (P2P)', icon: Truck },
              { id: 'srs', label: 'BRD & SRS Specs', icon: FileCheck },
              { id: 'defects', label: 'Jira Defect Board', icon: AlertTriangle }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4">
          
          {/* TAB 1: O2C */}
          {activeTab === 'o2c' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-black text-slate-900 mb-1">Order-to-Cash Business Rules:</h3>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Order Total &gt; $50,000 OR Discount &gt; 15% requires Finance Manager approval.</li>
                  <li>• Customer accounts with 'HOLD' credit status must be blocked immediately.</li>
                  <li>• Inventory reservation lock active for 120 minutes. 18% standard VAT applies.</li>
                </ul>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Subtotal Amount ($)</label>
                  <input
                    type="number"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm"
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm"
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Credit Status</label>
                  <select
                    value={creditStatus}
                    onChange={(e) => setCreditStatus(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                  >
                    <option value="ACTIVE">ACTIVE (Good Standing)</option>
                    <option value="HOLD">HOLD (Suspended/Delinquent)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSimulateO2C}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition"
              >
                Test ERP Rule Execution
              </button>

              {simResult && (
                <div className={`p-4 rounded-xl border ${simResult.bg} space-y-1 animate-fadeIn`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold ${simResult.color}`}>
                      [{simResult.status}]
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Code: {simResult.code}</span>
                  </div>
                  <p className="text-xs text-slate-700">{simResult.message}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: P2P */}
          {activeTab === 'p2p' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-black text-slate-900 mb-1">3-Way Matching Engine:</h3>
                <p className="text-xs text-slate-600">
                  Compares Purchase Order (PO), Goods Receipt Note (GRN), and Vendor Invoice. Variance exceeding ±2.0% blocks automatic payment authorization.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Purchase Order (PO) Total ($)</label>
                  <input
                    type="number"
                    value={poAmount}
                    onChange={(e) => setPoAmount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm"
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Vendor Invoice Amount ($)</label>
                  <input
                    type="number"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm"
                  />
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                p2pExceedsTolerance
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold font-mono">
                  <span>Variance: {p2pVariance.toFixed(2)}%</span>
                  <span>{p2pExceedsTolerance ? "BLOCKED: EXCEEDS 2% TOLERANCE" : "MATCH APPROVED: WITHIN 2% TOLERANCE"}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {p2pExceedsTolerance
                    ? "Requires Accounts Payable Lead manual reconciliation or vendor credit note."
                    : "Payment scheduled for automatic batch disbursement."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SRS */}
          {activeTab === 'srs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono text-blue-700 font-bold">{ERP_CASE_STUDY.sampleSRS.id}</span>
                <h3 className="text-sm font-black text-slate-900 mt-0.5">{ERP_CASE_STUDY.sampleSRS.title}</h3>
              </div>

              <div className="space-y-2.5">
                {ERP_CASE_STUDY.sampleSRS.functionalRequirements.map((fr) => (
                  <div key={fr.reqId} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-700">{fr.reqId}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        Priority: {fr.priority}
                      </span>
                    </div>
                    <p className="text-slate-800">{fr.description}</p>
                    <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      Rule: {fr.validationRule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Defects */}
          {activeTab === 'defects' && (
            <div className="space-y-3">
              {ERP_CASE_STUDY.sampleDefects.map((def) => (
                <div key={def.id} className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-rose-700">{def.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                        {def.severity} ({def.priority})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                      {def.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{def.title}</h4>
                  <div className="text-slate-600">
                    <strong>Root Cause:</strong> {def.rootCause}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>Module: {def.module}</span>
                    <span>•</span>
                    <span>Reported by: {def.reportedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            SarlaYash Mission Powered By Kapil
          </span>
          <button
            onClick={() => {
              onClose();
              onLaunchIDE('test_erp_order_to_cash');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open Test Suite in IDE</span>
          </button>
        </div>

      </div>
    </div>
  );
}
