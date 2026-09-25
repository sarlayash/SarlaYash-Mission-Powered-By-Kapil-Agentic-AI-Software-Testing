export const COURSE_INFO = {
  title: "AGENTIC AI SOFTWARE TESTING USING AGILE TESTING PROCESS",
  subtitle: "Real-Time ERP Product Testing with Agentic AI",
  mission: "SarlaYash Mission Powered By Kapil",
  tagline: "Empowering Next-Gen QA Engineers & Leaders with Autonomous AI Testing Agents and Agile Rigor",
  duration: "10-12 Weeks Mastery Program",
  levelsCount: 10,
  modulesCount: 14,
  toolsCount: 13,
  deliverablesCount: 14,
  overview: "This program is designed for QA Engineers, Test Leads, Freshers, and Working Professionals who want to learn how Agentic AI can be integrated into the complete Software Testing Life Cycle (STLC) within Agile projects. The course uses a real-time ERP product to demonstrate requirement analysis, test design, execution, defect management, reporting, and test closure activities.",
  outcomes: [
    "Work confidently on real-time Enterprise Resource Planning (ERP) Agile projects.",
    "Master prompt engineering & context engineering for automated QA workflows.",
    "Orchestrate multi-agent QA teams with CrewAI, AutoGen, and LangGraph.",
    "Generate comprehensive Test Scenarios, Positive/Negative/Boundary Test Cases using AI.",
    "Build and maintain dynamic Requirement Traceability Matrices (RTM) automatically.",
    "Execute Smoke, Functional, Re-Testing, and Impact-Driven Regression Testing with AI assistance.",
    "Automate industry-standard Agile QA reporting (DSR, DDR, WSR, RTR, Closure Reports).",
    "Gain deep hands-on expertise in Jira, Confluence, Azure DevOps, TestRail, and Excel RTMs.",
    "Become fully job-ready for modern AI-powered QA, SDET, and Test Leadership roles."
  ],
  tools: [
    { name: "ChatGPT", category: "LLM / QA Prompting", icon: "Bot", color: "from-emerald-500 to-teal-700" },
    { name: "Claude AI", category: "Complex SRS Analysis & Context", icon: "Brain", color: "from-amber-500 to-orange-700" },
    { name: "Gemini AI", category: "Multimodal & Long-Context QA", icon: "Sparkles", color: "from-blue-500 to-indigo-700" },
    { name: "Cursor AI", category: "AI-Assisted Code IDE", icon: "Terminal", color: "from-purple-500 to-violet-700" },
    { name: "GitHub Copilot", category: "Inline Test Script Automation", icon: "Code", color: "from-sky-500 to-cyan-700" },
    { name: "CrewAI", category: "Autonomous Multi-Agent QA Crews", icon: "Users", color: "from-rose-500 to-pink-700" },
    { name: "AutoGen", category: "Conversational QA Agent Orchestration", icon: "Cpu", color: "from-indigo-500 to-purple-700" },
    { name: "LangGraph", category: "Stateful QA Graph & Execution Loops", icon: "GitFork", color: "from-teal-500 to-emerald-700" },
    { name: "Jira", category: "Agile Defect & Sprint Tracking", icon: "Kanban", color: "from-blue-600 to-blue-800" },
    { name: "Confluence", category: "Requirement & SRS Documentation", icon: "FileText", color: "from-cyan-600 to-blue-700" },
    { name: "Azure DevOps", category: "CI/CD & Agile Backlog Management", icon: "Cloud", color: "from-blue-500 to-sky-600" },
    { name: "TestRail", category: "Test Management & Execution Hub", icon: "CheckSquare", color: "from-emerald-600 to-teal-800" },
    { name: "Excel RTM Templates", category: "Traceability & Coverage Matrices", icon: "Table", color: "from-green-600 to-emerald-800" }
  ]
};

export const COURSE_MODULES = [
  {
    id: 1,
    level: 1,
    levelTitle: "Foundation & System Understanding",
    title: "MODULE 1: QA EXPECTATIONS IN REAL-TIME PROJECTS",
    badge: "QA Vanguard",
    xp: 500,
    subtopics: [
      {
        id: "1.1",
        title: "QA Resource Expectations",
        points: [
          "Roles and Responsibilities of QA Engineer & QA Lead in Agile",
          "Agile Team Structure: Scrum Master, Product Owner, Dev, QA, AI Agents",
          "QA Deliverables & Quality Gates per Sprint",
          "Quality Metrics: Defect Density, Test Effectiveness, Velocity",
          "Test Planning Activities & Sprint Kickoff Strategy"
        ]
      },
      {
        id: "1.2",
        title: "Understanding ERP Product Documents",
        points: [
          "Business Requirement Documents (BRD) Decomposition",
          "Software Requirement Specification (SRS) Deep Dive",
          "Functional Specification Documents (FSD)",
          "User Stories and Gherkin Acceptance Criteria (Given-When-Then)",
          "Product Workflow Analysis: Order-to-Cash (O2C) & Procure-to-Pay (P2P)",
          "System Study Activities & Architecture Topology Walkthrough"
        ]
      },
      {
        id: "1.3",
        title: "Agentic AI Activities",
        points: [
          "AI-assisted project onboarding and context engineering",
          "Context engineering techniques: System personas, few-shot ERP constraints",
          "Requirement summarization and entity extraction using AI agents"
        ]
      }
    ],
    deliverables: [
      "Sprint QA Readiness Checklist",
      "ERP Product Context Knowledge Card",
      "Executive Requirement Summary Document"
    ],
    ideChallengeId: "mod1_context_prompting"
  },
  {
    id: 2,
    level: 2,
    levelTitle: "SRS Decomposition & AI Gap Analysis",
    title: "MODULE 2: REQUIREMENT ANALYSIS USING AGENTIC AI",
    badge: "SRS Investigator",
    xp: 650,
    subtopics: [
      {
        id: "2.1",
        title: "Understanding SRS through Context Prompting",
        points: [
          "Requirement decomposition into atomic testable units",
          "Context-based prompting techniques for enterprise business domains",
          "Ambiguity resolution and requirement interpretation"
        ]
      },
      {
        id: "2.2",
        title: "Manual SRS Analysis",
        points: [
          "Functional Requirements Analysis (Sales, Inventory, Billing)",
          "Non-Functional Requirements (NFR): Performance, Concurrency, Security",
          "Business Rules Verification (Tax rules, credit limits, multi-currency)",
          "Field-level Validation Rules (Regex, bounds, mandatory indicators)",
          "End-to-End Workflow Analysis across ERP modules"
        ]
      },
      {
        id: "2.3",
        title: "Agentic AI Requirement Analysis",
        points: [
          "Deploying AI Agents for autonomous requirement extraction",
          "Automated Functional Flow Diagram generation via Mermaid & DOT",
          "Missing Requirement Detection: Edge cases unaccounted for by PO",
          "Gap Analysis & Contradiction Identification between BRD and SRS"
        ]
      }
    ],
    deliverables: [
      "Requirement Analysis Report (RAR)",
      "Functional Flow Diagram (Mermaid / SVG)",
      "Requirement Clarification Document (RCD) for Product Owner"
    ],
    ideChallengeId: "mod2_gap_analysis"
  },
  {
    id: 3,
    level: 3,
    levelTitle: "AI Scenario Engineering & Peer Review",
    title: "MODULE 3: TEST SCENARIO DESIGN",
    badge: "Scenario Architect",
    xp: 800,
    subtopics: [
      {
        id: "3.1",
        title: "Designing Test Scenarios from ERP Requirements",
        points: [
          "Requirement-to-Scenario Mapping Strategy",
          "Positive Scenarios: Standard happy paths for sales order approval",
          "Negative Scenarios: Over-credit limit orders, expired discounts",
          "Boundary Scenarios: Zero inventory checkout, maximum batch limits",
          "Integration Scenarios: Purchase Order to Goods Receipt to Invoice matching"
        ]
      },
      {
        id: "3.2",
        title: "Agentic AI Test Scenario Generation",
        points: [
          "Prompt Engineering for high-coverage scenario design",
          "AI-assisted Coverage Analysis across user personas (Admin, Clerk, Auditor)",
          "Scenario Optimization & Deduplication using Semantic Clustering"
        ]
      },
      {
        id: "3.3",
        title: "Peer Review Process",
        points: [
          "Agile Peer Review Checklist & Guidelines",
          "Review Template for ERP functional accuracy",
          "Defect Identification during early review"
        ]
      },
      {
        id: "3.4",
        title: "Agentic AI Review Process",
        points: [
          "Autonomous AI Reviewer Agent evaluating scenario depth",
          "Coverage Verification against business risk matrices",
          "Duplicate Scenario Detection using vector embeddings"
        ]
      },
      {
        id: "3.5",
        title: "Test Lead Approval Process",
        points: [
          "Test Lead Sign-off Criteria and Quality Gates",
          "Business risk coverage validation",
          "Quality Assessment Matrix for approved scenarios"
        ]
      },
      {
        id: "3.6",
        title: "Agentic AI Approval Workflow",
        points: [
          "Automated Quality Verification checks",
          "Scenario Approval Recommendations with AI confidence ratings"
        ]
      }
    ],
    deliverables: [
      "Test Scenario Document (TSD)",
      "Scenario Review Report with AI Audit Scores",
      "Approved Scenario Repository (TestRail / Jira ready)"
    ],
    ideChallengeId: "mod3_scenario_generator"
  },
  {
    id: 4,
    level: 4,
    levelTitle: "End-to-End Traceability (RTM)",
    title: "MODULE 4: REQUIREMENT TRACEABILITY MATRIX (RTM)",
    badge: "Traceability Maestro",
    xp: 750,
    subtopics: [
      {
        id: "4.1",
        title: "Designing RTM for Test Scenarios",
        points: [
          "Bidirectional Traceability: Forward (Req -> Test) & Backward (Test -> Req)",
          "Requirement Mapping across ERP modules",
          "Coverage Matrix Creation to avoid orphaned requirements"
        ]
      },
      {
        id: "4.2",
        title: "Agentic AI Generated RTM",
        points: [
          "Automated Requirement-to-Scenario Mapping using LLM matching",
          "Traceability Gap Validation & orphan detector",
          "Real-time coverage analytics and missing link warnings"
        ]
      }
    ],
    deliverables: [
      "Scenario Requirement Traceability Matrix (Excel / CSV)",
      "Live Requirement Coverage Dashboard"
    ],
    ideChallengeId: "mod4_rtm_matrix"
  },
  {
    id: 5,
    level: 4,
    levelTitle: "Autonomous Test Case Crafting",
    title: "MODULE 5: TEST CASE DESIGN",
    badge: "Test Case Crafter",
    xp: 900,
    subtopics: [
      {
        id: "5.1",
        title: "Test Case Design Standards",
        points: [
          "Test Case Standards: IEEE 829 & ISO/IEC 29119 compliance",
          "Positive Test Cases with explicit preconditions & test data",
          "Negative Test Cases with expected system recovery & error codes",
          "End-to-End Test Cases spanning 3-way matching in ERP"
        ]
      },
      {
        id: "5.2",
        title: "Agentic AI Test Case Generation",
        points: [
          "Automated Test Case Design via CrewAI Multi-Agent Prompts",
          "AI-assisted Synthetic Data Creation (Valid GSTIN, credit cards, SKUs)",
          "Test Step Optimization: Consolidating redundant setup steps"
        ]
      },
      {
        id: "5.3",
        title: "RTM with Respect to Test Cases",
        points: [
          "Granular Requirement-to-Test Case Mapping",
          "Traceability Verification for 100% functional test coverage"
        ]
      },
      {
        id: "5.4",
        title: "Agentic AI Generated RTM for Test Cases",
        points: [
          "Automated Deep Traceability Matrix generation",
          "Test Case to Requirement Coverage Analytics"
        ]
      },
      {
        id: "5.5",
        title: "Test Case Approval Process",
        points: [
          "Test Lead Review Activities & peer sign-off",
          "Lead Approval Process and baseline version control"
        ]
      }
    ],
    deliverables: [
      "Production-Grade Test Case Repository (100+ ERP Cases)",
      "Granular Test Case RTM",
      "Lead Approval Sign-off Reports"
    ],
    ideChallengeId: "mod5_testcase_crew"
  },
  {
    id: 6,
    level: 5,
    levelTitle: "Release Governance & Smoke Automation",
    title: "MODULE 6: BUILD RELEASE MANAGEMENT",
    badge: "Release Sentinel",
    xp: 700,
    subtopics: [
      {
        id: "6.1",
        title: "Build Release 1 Management",
        points: [
          "Build Deployment Process in Staging / QA Environment",
          "Release Notes Analysis: Commit diffs, database migrations, changelogs",
          "Pre-flight Environment Readiness Inspection"
        ]
      },
      {
        id: "6.2",
        title: "Agentic AI Build Validation",
        points: [
          "Autonomous Release Verification Agent inspecting artifacts",
          "Build Readiness Assessment & deployment health checks",
          "Sanity probe automated dispatch"
        ]
      }
    ],
    deliverables: [
      "Build Validation Report (BVR)",
      "Release Readiness Report (RRR)"
    ],
    ideChallengeId: "mod6_build_validation"
  },
  {
    id: 7,
    level: 5,
    levelTitle: "Build Acceptance & Smoke Gate",
    title: "MODULE 7: SMOKE TESTING",
    badge: "Smoke Commander",
    xp: 750,
    subtopics: [
      {
        id: "7.1",
        title: "Manual Smoke Testing",
        points: [
          "Smoke Test Suite Design: Critical ERP pathways (Login, Tenant select, Order create)",
          "Build Verification: Pass/Fail criteria for accepting Build 1",
          "Go/No-Go decision making for QA team"
        ]
      },
      {
        id: "7.2",
        title: "Agentic AI Smoke Test Support",
        points: [
          "Automated Smoke Coverage Review using autonomous Playwright scripts",
          "AI Risk Assessment: Flagging fragile modules based on commit churn",
          "Instant Slack/Teams notification dispatch via AI Agent"
        ]
      }
    ],
    deliverables: [
      "Build 1 Smoke Test Execution Report",
      "Environment Health Certificate"
    ],
    ideChallengeId: "mod7_smoke_runner"
  },
  {
    id: 8,
    level: 6,
    levelTitle: "Execution Rigor & Live RTM Dynamics",
    title: "MODULE 8: FUNCTIONAL TEST EXECUTION",
    badge: "Execution Maestro",
    xp: 950,
    subtopics: [
      {
        id: "8.1",
        title: "Functional Testing Activities",
        points: [
          "Comprehensive Test Execution across all ERP sub-modules",
          "Result Documentation: Pass, Fail, Blocked, Skipped statuses",
          "Evidence Collection: Network logs, console dumps, screenshots, payload diffs"
        ]
      },
      {
        id: "8.2",
        title: "Agentic AI Execution Support",
        points: [
          "Execution Monitoring via autonomous agents",
          "Coverage Tracking in real-time as tests complete",
          "Dynamic anomaly detection during execution"
        ]
      },
      {
        id: "8.3",
        title: "AI Generated RTM During Execution",
        points: [
          "Real-time Traceability Updates with live pass/fail status",
          "Coverage Status Reports by business module",
          "Automated blockage alerts for high-priority stories"
        ]
      }
    ],
    deliverables: [
      "Test Execution Report (TER) with audit-ready evidence",
      "Functional Coverage & Status Report",
      "Dynamic Live-Updated RTM"
    ],
    ideChallengeId: "mod8_functional_runner"
  },
  {
    id: 9,
    level: 7,
    levelTitle: "Defect Triaging & AI Root Cause Analysis",
    title: "MODULE 9: DEFECT MANAGEMENT",
    badge: "Defect Hunter",
    xp: 900,
    subtopics: [
      {
        id: "9.1",
        title: "Defect Reporting in Agile Tools",
        points: [
          "Defect Lifecycle: New, Open, In Progress, Fixed, Re-Test, Closed, Re-Open",
          "Severity (Critical, Major, Moderate, Low) vs Priority (P1, P2, P3, P4)",
          "Root Cause Analysis (RCA): Code defect, data defect, environment, requirement miss"
        ]
      },
      {
        id: "9.2",
        title: "Agentic AI Defect Analysis",
        points: [
          "Duplicate Defect Detection via semantic embedding similarity",
          "AI-powered Root Cause Suggestions based on stack traces & logs",
          "Defect Trend Analysis & module defect density forecasting"
        ]
      }
    ],
    deliverables: [
      "Standard Defect Report (Jira format with reproduction steps)",
      "Interactive Defect Metrics Dashboard",
      "AI Root Cause Analysis Log"
    ],
    ideChallengeId: "mod9_defect_ai"
  },
  {
    id: 10,
    level: 8,
    levelTitle: "Agile Metrics & Automated DSR/WSR",
    title: "MODULE 10: QA REPORTING AND METRICS",
    badge: "Metrics Champion",
    xp: 850,
    subtopics: [
      {
        id: "10.1",
        title: "Daily Test Execution Report (DSR)",
        points: [
          "Execution Metrics: Planned vs Actual execution velocity",
          "Pass/Fail Statistics, Blocked tests breakdown"
        ]
      },
      {
        id: "10.2",
        title: "Daily Defect Report (DDR)",
        points: [
          "Open vs Closed Defects by severity",
          "Defect Ageing & Developer Turnaround Time (TAT)",
          "Defect Trends & Re-opened defect rate"
        ]
      },
      {
        id: "10.3",
        title: "Weekly Status Report (WSR)",
        points: [
          "Sprint Progress vs Commitments",
          "Risk Summary & mitigation plans",
          "Executive Coverage Summary for stakeholders"
        ]
      },
      {
        id: "10.4",
        title: "Agentic AI Report Generation",
        points: [
          "Autonomous synthesis of DSR, DDR, and WSR in Markdown/PDF",
          "Executive Dashboards generation with automated commentary"
        ]
      }
    ],
    deliverables: [
      "Daily Status Report (DSR)",
      "Daily Defect Report (DDR)",
      "Weekly Status Report (WSR)",
      "Executive QA Management Dashboard"
    ],
    ideChallengeId: "mod10_qa_reporting"
  },
  {
    id: 11,
    level: 8,
    levelTitle: "Build 2 Deployment & Re-Testing",
    title: "MODULE 11: BUILD RELEASE 2 ACTIVITIES",
    badge: "Re-Test Specialist",
    xp: 800,
    subtopics: [
      {
        id: "11.1",
        title: "Smoke Testing on Build 2",
        points: [
          "Build 2 Verification & bug-fix patch deployment review",
          "Sanity confirmation on resolved defects"
        ]
      },
      {
        id: "11.2",
        title: "Re-Testing Activities",
        points: [
          "Fixed Defect Validation against exact reproduction steps",
          "Negative boundary re-checks on corrected logic",
          "Evidence Collection & screenshot proof of resolution"
        ]
      },
      {
        id: "11.3",
        title: "Agentic AI Re-Testing Reports",
        points: [
          "Automated Defect Validation Reports",
          "Updated RTM Reports with verified fix status"
        ]
      }
    ],
    deliverables: [
      "Build 2 Re-Testing Report (RTR)",
      "Updated Post-Fix Traceability Matrix"
    ],
    ideChallengeId: "mod11_retest_agent"
  },
  {
    id: 12,
    level: 9,
    levelTitle: "AI Impact Analysis & Regression Orchestration",
    title: "MODULE 12: REGRESSION TESTING USING AGENTIC AI",
    badge: "Regression Maestro",
    xp: 1000,
    subtopics: [
      {
        id: "12.1",
        title: "Impact Analysis",
        points: [
          "Requirement Changes & Code Delta evaluation",
          "Side-effect risk assessment on upstream/downstream ERP modules"
        ]
      },
      {
        id: "12.2",
        title: "AI Agent Impact Identification",
        points: [
          "Impacted Module Detection using AST code parsing & git diff analysis",
          "Intelligent Regression Scope Selection: Pruning unnecessary tests",
          "Prioritizing high-risk regression test cases"
        ]
      },
      {
        id: "12.3",
        title: "Regression Testing Execution",
        points: [
          "Automated Regression Planning in CI/CD pipeline",
          "Parallel regression execution across worker agents",
          "Zero-defect regression confirmation"
        ]
      }
    ],
    deliverables: [
      "Regression Test Report (RTR)",
      "AI Code & Functional Impact Analysis Report"
    ],
    ideChallengeId: "mod12_regression_crew"
  },
  {
    id: 13,
    level: 10,
    levelTitle: "Enterprise Dashboards & Release Intelligence",
    title: "MODULE 13: ADVANCED QA REPORTING",
    badge: "QA Intelligence Lead",
    xp: 900,
    subtopics: [
      {
        id: "13.1",
        title: "AI Generated Consolidated QA Reports",
        points: [
          "Automated cross-sprint Daily Status Reports (DSR)",
          "Aggregated Daily Defect Reports (DDR) with AI insights",
          "Re-Testing Reports (RTR) with delta comparisons",
          "Weekly Status Reports (WSR) synthesized for C-Suite"
        ]
      },
      {
        id: "13.2",
        title: "Executive Dashboards",
        points: [
          "Sprint QA Dashboard with real-time velocity & defect escape rate",
          "Release Readiness Dashboard with automated Go/No-Go score"
        ]
      }
    ],
    deliverables: [
      "Automated QA Metrics Repository",
      "Executive Release Readiness Portal"
    ],
    ideChallengeId: "mod13_executive_dashboards"
  },
  {
    id: 14,
    level: 10,
    levelTitle: "STLC Test Closure & Final Sign-Off",
    title: "MODULE 14: TEST CLOSURE ACTIVITIES",
    badge: "Certified Agentic QA Lead",
    xp: 1200,
    subtopics: [
      {
        id: "14.1",
        title: "Manual Test Closure",
        points: [
          "Exit Criteria Validation: 100% planned tests executed, 0 critical open bugs",
          "Lessons Learned & Retrospective facilitation",
          "Final Quality Assessment and Stakeholder confidence rating"
        ]
      },
      {
        id: "14.2",
        title: "Agentic AI Test Closure",
        points: [
          "Autonomous generation of Test Closure Reports (TCR)",
          "Deep Coverage Analysis & Defect Leakage Analysis",
          "Test Effectiveness Metrics (TEM) and ROI calculations",
          "Automated QA Knowledge Repository curation for future releases"
        ]
      }
    ],
    deliverables: [
      "Final Test Closure Report (TCR)",
      "Project Sign-Off Report signed by QA Lead & Stakeholders",
      "QA Knowledge Repository & Agentic Automation Playbook"
    ],
    ideChallengeId: "mod14_closure_report"
  }
];

export const ERP_SYSTEM_SPECS = {
  name: "ApexEnterprise ERP v4.2 (Order-to-Cash & Procure-to-Pay)",
  architecture: "Microservices Architecture (Spring Boot, Node.js, PostgreSQL, Redis, Kafka)",
  modules: [
    {
      code: "O2C-01",
      name: "Order-to-Cash (Sales Order Management)",
      description: "Handles customer quotes, order entry, credit checks, pricing engine, discount approvals, and sales order fulfillment."
    },
    {
      code: "INV-02",
      name: "Inventory & Warehouse Allocation",
      description: "Real-time stock checks, multi-warehouse reservation, batch/serial tracking, pick-pack-ship workflows."
    },
    {
      code: "P2P-03",
      name: "Procure-to-Pay (Vendor Management)",
      description: "Purchase Requisitions, Purchase Orders, Goods Receipt Note (GRN), and 3-Way Invoice Matching (PO vs GRN vs Invoice)."
    },
    {
      code: "FIN-04",
      name: "Financials & General Ledger",
      description: "Accounts Receivable, Accounts Payable, Tax calculation (GST/VAT/Sales Tax), Journal entries, and credit limits."
    }
  ]
};
