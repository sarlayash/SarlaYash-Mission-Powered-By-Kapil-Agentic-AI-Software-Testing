export const ERP_CASE_STUDY = {
  systemName: "ApexEnterprise Cloud ERP v4.2",
  clientDomain: "Global Manufacturing & Distribution Conglomerate",
  deployment: "Multi-tenant AWS Kubernetes (EKS), Aurora PostgreSQL, Kafka, Redis",
  businessModules: [
    {
      id: "O2C",
      name: "Order-to-Cash (O2C)",
      owner: "Sales & Supply Chain Operations",
      coreEntities: ["Customer Master", "Sales Quote", "Sales Order", "Pick List", "Delivery Note", "Invoice", "Payment Receipt"],
      criticalRules: [
        "Orders over $50,000 OR with discount > 15% must route to Finance Approval Queue.",
        "Customer accounts with 'CREDIT_HOLD' flag must be blocked at order entry.",
        "Inventory reservation holds are strictly time-bound to 120 minutes."
      ]
    },
    {
      id: "P2P",
      name: "Procure-to-Pay (P2P)",
      owner: "Procurement & Accounts Payable",
      coreEntities: ["Vendor Master", "Purchase Requisition (PR)", "Purchase Order (PO)", "Goods Receipt Note (GRN)", "Vendor Invoice"],
      criticalRules: [
        "3-Way Matching: PO Quantity & Price must match GRN received quantity and Vendor Invoice amount within 2% tolerance.",
        "Variance > 2% blocks payment dispatch and triggers Exception Defect flag.",
        "Automatic GST/VAT tax calculation based on Vendor state vs Shipping warehouse location."
      ]
    },
    {
      id: "INV",
      name: "Warehouse & Inventory",
      owner: "Logistics & Fulfillment",
      coreEntities: ["Warehouse Master", "Bin Location", "Stock Ledger", "Batch / Serial Trackers", "Stock Transfer Orders"],
      criticalRules: [
        "Real-time Available-to-Promise (ATP) computation must prevent overselling.",
        "Negative inventory balances are strictly prohibited by system constraints."
      ]
    }
  ],
  sampleBRD: {
    id: "BRD-APEX-2026-004",
    title: "Enterprise Order Fulfillment & Credit Policy Automation",
    author: "Global Operations Business Analyst",
    summary: "ApexEnterprise requires automated guardrails during order placement to prevent delinquent customers from placing orders, while streamlining high-volume order processing with automated inventory reservation and tax compliance."
  },
  sampleSRS: {
    id: "SRS-O2C-402",
    title: "Sales Order Discount & Credit Limit Verification Engine",
    functionalRequirements: [
      {
        reqId: "SRS-FR-01",
        description: "The system shall validate customer credit status before saving Sales Order draft.",
        validationRule: "If Customer.CreditStatus == 'HOLD', reject with HTTP 422 and payload {'errorCode': 'ERR_CREDIT_HOLD'}.",
        priority: "High"
      },
      {
        reqId: "SRS-FR-02",
        description: "The system shall route orders exceeding $50,000 to the Finance Approval Workflow.",
        validationRule: "If Order.NetTotal > 50000.00, set Order.ApprovalStatus = 'PENDING_FINANCE' and post Kafka event 'order.escalated'.",
        priority: "Critical"
      },
      {
        reqId: "SRS-FR-03",
        description: "Discounts exceeding 15.0% require VP Sales override.",
        validationRule: "If Order.DiscountPercent > 15.0, set Order.ApprovalStatus = 'PENDING_VP'.",
        priority: "High"
      },
      {
        reqId: "SRS-FR-04",
        description: "Tax Engine shall apply 18% standard VAT/GST to net merchandise amount.",
        validationRule: "TaxAmount = round(Order.NetTotal * 0.18, 2); FinalAmount = Order.NetTotal + TaxAmount.",
        priority: "Critical"
      }
    ]
  },
  sampleDefects: [
    {
      id: "DEF-O2C-101",
      title: "Invoice amount variance bypasses 3-way matching tolerance in P2P",
      severity: "Critical",
      priority: "P1",
      module: "Procure-to-Pay",
      status: "Fixed in Build 2",
      reportedBy: "SarlaYash Agentic QA Bot",
      assignedTo: "ERP Backend Team",
      rootCause: "application.yml tolerance set to 150 flat currency instead of 0.02 ratio."
    },
    {
      id: "DEF-O2C-102",
      title: "Credit hold error banner text truncated on mobile viewport",
      severity: "Low",
      priority: "P3",
      module: "Order-to-Cash",
      status: "Closed",
      reportedBy: "Lead QA Engineer",
      assignedTo: "Frontend UI Team",
      rootCause: "Missing flex-wrap property in Tailwind banner container."
    }
  ]
};
