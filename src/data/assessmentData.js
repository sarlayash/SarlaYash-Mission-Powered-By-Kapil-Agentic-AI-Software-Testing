export const MOCK_ASSESSMENTS = [
  {
    id: "mock_level_1",
    level: 1,
    title: "Level 1 Mock: QA Foundations & ERP Architecture",
    moduleRefs: [1],
    durationSeconds: 300, // 5 mins
    passingScore: 75,
    questions: [
      {
        id: "m1_q1",
        question: "In an Agile team utilizing Agentic AI, what is the primary role of the QA Engineer regarding AI test agents?",
        options: [
          "To manually write every single test script line by line without AI assistance",
          "To orchestrate, prompt, audit, and validate autonomous AI agents, ensuring business accuracy and compliance",
          "To replace all developers with AI prompts",
          "To disable all automated testing tools"
        ],
        correctAnswer: 1,
        explanation: "In modern AI-powered QA, the QA Engineer shifts from repetitive manual scripting to an AI orchestrator and quality gatekeeper who engineers context, audits outputs, and ensures compliance."
      },
      {
        id: "m1_q2",
        question: "Which ERP document defines the granular business requirements and functional rules before technical implementation begins?",
        options: [
          "Software Architecture Document (SAD)",
          "Business Requirement Document (BRD) & Software Requirement Specification (SRS)",
          "Daily Defect Report (DDR)",
          "Test Closure Report (TCR)"
        ],
        correctAnswer: 1,
        explanation: "BRD outlines the high-level business vision and user needs, while SRS decomposes these into concrete software requirements and functional specifications."
      },
      {
        id: "m1_q3",
        question: "What is 'Context Engineering' in the context of QA testing an ERP product with LLMs?",
        options: [
          "Formatting code in visual IDE themes",
          "Providing the AI with domain constraints, ERP business rules, system topology, and user personas to generate accurate test assets",
          "Translating Python into C++",
          "Deleting stale requirements from Jira"
        ],
        correctAnswer: 1,
        explanation: "Context engineering equips the LLM/Agent with necessary domain boundaries, ERP data models, and business logic to eliminate hallucinations and generate production-grade test cases."
      },
      {
        id: "m1_q4",
        question: "Which of the following represents an Order-to-Cash (O2C) workflow sequence in an ERP?",
        options: [
          "Purchase Requisition -> Goods Receipt -> Vendor Invoice -> Payment",
          "Sales Order Entry -> Credit Check -> Inventory Allocation -> Pick-Pack-Ship -> Invoicing -> Payment Receipt",
          "Sprint Planning -> Daily Standup -> Code Review -> Retrospective",
          "Defect Discovery -> Defect Triage -> Patch -> Close"
        ],
        correctAnswer: 1,
        explanation: "Order-to-Cash starts with receiving a customer order, performing credit and inventory verification, fulfilling shipping, issuing invoice, and reconciling payment."
      }
    ]
  },
  {
    id: "mock_level_3",
    level: 3,
    title: "Level 3 Mock: Test Scenario Engineering & AI Peer Review",
    moduleRefs: [3],
    durationSeconds: 420, // 7 mins
    passingScore: 80,
    questions: [
      {
        id: "m3_q1",
        question: "When designing test scenarios for an ERP credit-limit rule, what constitutes an essential 'Boundary Scenario'?",
        options: [
          "Testing an order placed on a weekend",
          "Testing orders placed at credit_limit - $0.01, credit_limit exactly, and credit_limit + $0.01",
          "Testing user password changes",
          "Logging in with an invalid username"
        ],
        correctAnswer: 1,
        explanation: "Boundary value analysis tests values directly at the threshold boundaries (just below, exact, and just above) where off-by-one bugs frequently lurk."
      },
      {
        id: "m3_q2",
        question: "How does an autonomous AI agent detect duplicate test scenarios across large enterprise repositories?",
        options: [
          "By counting the number of characters in the scenario title",
          "By utilizing semantic vector embeddings and cosine similarity to cluster logically identical verification paths",
          "By randomly deleting 50% of test cases",
          "By checking if the author name is the same"
        ],
        correctAnswer: 1,
        explanation: "Semantic vector embeddings enable AI agents to detect duplicate intent even if scenarios are phrased with different vocabulary."
      },
      {
        id: "m3_q3",
        question: "Why is human Test Lead approval required even when using AI test generation agents?",
        options: [
          "Because AI agents are not legally permitted to write text",
          "To validate business risk alignment, strategic quality gates, and prevent hallucinated test expectations",
          "To slow down the Agile sprint deliberately",
          "Because AI cannot run on weekends"
        ],
        correctAnswer: 1,
        explanation: "The human Test Lead ensures accountability, audits business risk alignment, and guarantees that edge-cases align with contractual acceptance criteria."
      }
    ]
  },
  {
    id: "mock_level_4",
    level: 4,
    title: "Level 4 Mock: Traceability Matrix (RTM) & Test Case Design",
    moduleRefs: [4, 5],
    durationSeconds: 480, // 8 mins
    passingScore: 80,
    questions: [
      {
        id: "m4_q1",
        question: "What is Bidirectional Traceability in an RTM?",
        options: [
          "Tracing code forward from requirements to test cases, and backward from test cases/defects to source requirements",
          "Running tests both forwards and backwards in time",
          "Translating test cases into two languages",
          "Allowing developers and testers to swap roles"
        ],
        correctAnswer: 0,
        explanation: "Bidirectional traceability ensures you can verify both forward (every requirement is tested) and backward (every test case and bug maps to a valid requirement)."
      },
      {
        id: "m4_q2",
        question: "According to IEEE 829 standards, which components are mandatory in a formal test case?",
        options: [
          "Developer name, coffee count, and commit hash",
          "Test Case ID, Description, Preconditions, Test Data, Step-by-Step Actions, Expected Result, and Actual Result",
          "Only a one-line title",
          "Just a screenshot of the bug"
        ],
        correctAnswer: 1,
        explanation: "Formal test case standards require unambiguous identification, clear preconditions, exact test data, repeatable steps, and verifiable expected outcomes."
      },
      {
        id: "m4_q3",
        question: "In CrewAI, how do you define a specialized agent for synthetic test data creation?",
        options: [
          "By writing a simple print statement",
          "By defining an Agent with role='Synthetic Test Data Specialist', tailored goal, backstory, and domain tools",
          "By deleting the database",
          "By configuring a CSS stylesheet"
        ],
        correctAnswer: 1,
        explanation: "CrewAI uses role, goal, and backstory parameters to anchor the agent's persona and focus on generating compliant synthetic test datasets."
      }
    ]
  },
  {
    id: "mock_level_7",
    level: 7,
    title: "Level 7 Mock: Defect Management & AI Root Cause Analysis",
    moduleRefs: [9],
    durationSeconds: 420, // 7 mins
    passingScore: 80,
    questions: [
      {
        id: "m7_q1",
        question: "What is the key difference between Defect Severity and Defect Priority?",
        options: [
          "Severity measures the technical impact on system operation; Priority determines the urgency of fixing it based on business needs",
          "Severity is decided by developers; Priority is decided by AI",
          "There is no difference; they are identical",
          "Severity is only used for UI colors; Priority is used for backend code"
        ],
        correctAnswer: 0,
        explanation: "Severity is an objective technical impact (e.g. system crash = Critical), while Priority is business urgency (e.g. logo misspelled on homepage = Low Severity, High Priority)."
      },
      {
        id: "m7_q2",
        question: "An AI Defect Triager analyzes an ERP invoice failure with stack trace 'NullPointerException at MatchingEngine.java:88'. What is its primary diagnostic step?",
        options: [
          "Delete the invoice record immediately",
          "Analyze git commit logs, inspect null checks on line 88, and compare against PO/GRN matching tolerances",
          "Mark the defect as 'Won't Fix'",
          "Restart the developer's laptop"
        ],
        correctAnswer: 1,
        explanation: "The AI agent correlates the stack trace with recent git commits and code paths to isolate the missing null guard or boundary violation."
      }
    ]
  }
];

export const FINAL_ASSESSMENT = {
  id: "final_capstone_exam",
  title: "FINAL CERTIFICATION ASSESSMENT: AGENTIC AI QA MASTER",
  subtitle: "SarlaYash Mission Powered By Kapil - Real-Time ERP STLC Assessment",
  durationSeconds: 1800, // 30 minutes
  passingScore: 80, // 80% passing grade
  totalQuestions: 20,
  badgeUnlockedOnPass: "Certified Agentic QA Lead",
  questions: [
    {
      id: "fa_1",
      module: "MODULE 1",
      question: "In an Agile team testing an enterprise ERP product, what is the role of an autonomous QA Agent in Sprint 0?",
      options: [
        "To immediately deploy untested code directly into production",
        "To ingest the BRD and SRS, generate context knowledge graphs, and formulate a Sprint QA Readiness Checklist",
        "To replace the Scrum Master and cancel sprint ceremonies",
        "To rewrite the enterprise database in SQLite"
      ],
      correctAnswer: 1,
      explanation: "During Sprint 0, AI agents parse business documentation, establish domain context, and prepare the foundational QA checklist and RTM skeleton."
    },
    {
      id: "fa_2",
      module: "MODULE 2",
      question: "When performing Agentic SRS Analysis on an ERP Procure-to-Pay specification, what does 'Missing Requirement Detection' specifically uncover?",
      options: [
        "Unspecified behavior during partial deliveries, currency mismatches, or network timeouts during payment settlement",
        "The font family used by the marketing team",
        "Missing semicolons in the README.md file",
        "The physical office address of the vendor"
      ],
      correctAnswer: 0,
      explanation: "AI gap analysis identifies critical functional omissions such as partial fulfillment handling, concurrent inventory locking, and currency conversion fallbacks."
    },
    {
      id: "fa_3",
      module: "MODULE 2",
      question: "Which prompting technique is most effective for forcing an LLM to identify edge-case boundary scenarios in an ERP pricing engine?",
      options: [
        "Zero-shot casual prompt with no constraints",
        "Context-based Few-Shot Prompting with explicit domain constraints, system persona, and schema-enforced output",
        "Asking the LLM to write a poem about software quality",
        "Sending a screenshot without any text description"
      ],
      correctAnswer: 1,
      explanation: "Few-shot prompting with strict domain boundaries and schema-enforced output guarantees consistent, hallucination-free boundary test scenarios."
    },
    {
      id: "fa_4",
      module: "MODULE 3",
      question: "In ERP Order-to-Cash (O2C), what is the expected outcome of an 'Integration Test Scenario' spanning Sales and Warehouse modules?",
      options: [
        "Validating that customer login works on Chrome",
        "Confirming that approving a Sales Order atomically reserves inventory in the Warehouse and updates available-to-promise (ATP) stock",
        "Checking if the company logo is centered",
        "Restarting the Redis cache cluster"
      ],
      correctAnswer: 1,
      explanation: "Integration testing verifies seamless data flow and atomic state transitions between modular boundaries like Sales and Inventory."
    },
    {
      id: "fa_5",
      module: "MODULE 3",
      question: "How does a multi-agent review workflow in CrewAI improve test scenario quality before human sign-off?",
      options: [
        "By allowing one agent (Designer) to draft scenarios and another specialized agent (Auditor) to challenge coverage and identify duplicates",
        "By sending 1,000 spam emails to the client",
        "By removing all negative test scenarios",
        "By merging all tests into a single giant script"
      ],
      correctAnswer: 0,
      explanation: "A collaborative crew separates generation from auditing, enabling adversarial or peer-review dynamics that drastically enhance quality."
    },
    {
      id: "fa_6",
      module: "MODULE 4",
      question: "What critical risk is mitigated by maintaining an automated Requirement Traceability Matrix (RTM)?",
      options: [
        "High CPU utilization on developer laptops",
        "Orphaned requirements going untested into production, and unmapped rogue features causing compliance violations",
        "CSS stylesheet compilation delays",
        "Running out of hard drive space in Staging"
      ],
      correctAnswer: 1,
      explanation: "RTM guarantees 100% test coverage visibility and prevents orphaned requirements from escaping into production."
    },
    {
      id: "fa_7",
      module: "MODULE 5",
      question: "When generating synthetic test data for ERP Tax calculation (GST/VAT), why is AI-assisted data creation preferred over static mock data?",
      options: [
        "It can dynamically generate valid checksum-compliant Tax IDs, multi-jurisdiction tax slabs, and real-world edge monetary values",
        "Static mock data is illegal under copyright law",
        "AI data uses 0 bytes of RAM",
        "Static mock data cannot be typed into text boxes"
      ],
      correctAnswer: 0,
      explanation: "AI can generate mathematically valid checksums (e.g. GSTIN, VAT IDs) and realistic cross-border tax scenarios that match enterprise compliance."
    },
    {
      id: "fa_8",
      module: "MODULE 6",
      question: "In Build Release 1 Management, what is the role of an autonomous Release Verification Agent?",
      options: [
        "Writing promotional marketing emails",
        "Verifying container digests, inspecting DB migration scripts, checking microservice health probes, and validating release notes against Jira commits",
        "Approving developer salary raises",
        "Shutting down the Staging cluster after hours"
      ],
      correctAnswer: 1,
      explanation: "The release verification agent inspects build artifacts, verifies schema migration scripts, and confirms environment readiness before testing commences."
    },
    {
      id: "fa_9",
      module: "MODULE 7",
      question: "What is the primary objective of Smoke Testing on Build Release 1?",
      options: [
        "Executing all 2,000 regression test cases over 48 hours",
        "Verifying critical core pathways (Sanity/Health) to determine if the build is stable enough to proceed to detailed functional testing",
        "Stress testing the server to the point of hardware failure",
        "Refactoring the database indexing strategy"
      ],
      correctAnswer: 1,
      explanation: "Smoke testing verifies fundamental application stability (e.g. can login, can navigate, can submit primary transaction) as a Go/No-Go gate."
    },
    {
      id: "fa_10",
      module: "MODULE 8",
      question: "During Functional Test Execution in an ERP, why must test evidence (payloads, logs, screenshots) be systematically captured?",
      options: [
        "To fill up cloud storage quotas",
        "To provide non-repudiation, audit compliance, and indisputable proof for defect triaging and regulatory sign-offs",
        "Because developers refuse to read text defect descriptions",
        "To train a separate video streaming model"
      ],
      correctAnswer: 1,
      explanation: "Enterprise ERP audits require full evidence artifacts for traceability and rapid developer root-cause diagnosis."
    },
    {
      id: "fa_11",
      module: "MODULE 8",
      question: "How does a Live-Updated RTM behave during real-time test execution?",
      options: [
        "It locks the spreadsheet so nobody can edit it",
        "It dynamically updates requirement test status (Passed, Failed, Blocked) in real time as automation runners finish execution",
        "It automatically passes all failed tests after 10 minutes",
        "It converts all test results into binary files"
      ],
      correctAnswer: 1,
      explanation: "A dynamic RTM reflects live sprint health, highlighting blocked requirements and coverage deficits instantly."
    },
    {
      id: "fa_12",
      module: "MODULE 9",
      question: "An AI Defect Deduplication agent flags a newly logged bug as a duplicate of an existing ticket. How does it determine this?",
      options: [
        "It checks if the word 'error' appears in both titles",
        "It computes semantic embedding similarity between stack traces, reproduction steps, affected endpoints, and error codes",
        "It only checks if both bugs were logged on the same day",
        "It assigns duplicate status randomly"
      ],
      correctAnswer: 1,
      explanation: "Semantic embedding and contextual matching detect identical underlying defects across varied descriptions and testers."
    },
    {
      id: "fa_13",
      module: "MODULE 9",
      question: "Which defect severity is appropriate for a bug where the ERP 3-Way Matching engine automatically approves unauthorized invoice variances over $100,000?",
      options: [
        "Low / Trivial",
        "Minor UI Glitch",
        "Critical / Showstopper (Immediate financial and audit risk)",
        "Enhancement Request"
      ],
      correctAnswer: 2,
      explanation: "A flaw allowing unauthorized six-figure payouts represents catastrophic financial loss and regulatory non-compliance — a Critical severity showstopper."
    },
    {
      id: "fa_14",
      module: "MODULE 10",
      question: "What is the core distinction between a Daily Status Report (DSR) and a Daily Defect Report (DDR)?",
      options: [
        "DSR tracks overall test execution progress and planned vs actual velocity; DDR focuses specifically on defect counts, severities, ageing, and resolution turnaround",
        "DSR is for developers; DDR is for accountants",
        "They are exact synonyms in Agile",
        "DSR is written only on Fridays"
      ],
      correctAnswer: 0,
      explanation: "DSR gives the high-level execution progress, while DDR drills into defect metrics, backlog health, and turnaround bottlenecks."
    },
    {
      id: "fa_15",
      module: "MODULE 11",
      question: "When Build Release 2 is deployed with bug fixes, what is the mandatory testing protocol before full regression?",
      options: [
        "Immediately sign off on production release",
        "Smoke Test Build 2 -> Re-test all verified defect fixes with negative boundary verification -> Confirm bug status in Jira",
        "Delete all previous test cases and write new ones",
        "Ignore the fixed defects and only test new features"
      ],
      correctAnswer: 1,
      explanation: "Re-testing validates that the specific defect is truly resolved without side-effects, verified via rigorous positive and negative boundary checks."
    },
    {
      id: "fa_16",
      module: "MODULE 12",
      question: "What is 'AI-Driven Impact Analysis' in Regression Testing?",
      options: [
        "Running the entire test suite from scratch every 10 minutes",
        "Using AI to analyze code diffs, database schema alterations, and API dependency graphs to pinpoint exactly which modules need regression testing",
        "Randomly picking 10 test cases from the pool",
        "Asking the developer if they made any mistakes"
      ],
      correctAnswer: 1,
      explanation: "AI impact analysis prunes test suites intelligently by isolating upstream and downstream dependencies affected by code changes."
    },
    {
      id: "fa_17",
      module: "MODULE 13",
      question: "In an Executive Release Readiness Dashboard, what does the 'Defect Escape Rate' metric indicate?",
      options: [
        "The number of defects found by QA during sprint testing",
        "The percentage of defects that slipped past QA testing and were discovered in UAT or Production",
        "The speed at which developers close tickets",
        "The number of lines of code written per day"
      ],
      correctAnswer: 1,
      explanation: "Defect Escape Rate measures testing effectiveness: lower escape rates prove higher quality verification before release."
    },
    {
      id: "fa_18",
      module: "MODULE 14",
      question: "Which of the following is a mandatory Exit Criterion for STLC Test Closure?",
      options: [
        "100% of planned critical test cases executed, 0 open Critical/Major defects, and all residual risks formally signed off by stakeholders",
        "100% of tests passed on the first attempt without any defects discovered",
        "The sprint duration reached exactly 14 days regardless of software status",
        "The team exhausted the entire cloud budget"
      ],
      correctAnswer: 0,
      explanation: "Exit criteria demand execution completion, resolution or acceptance of all severe defects, and formal stakeholder risk agreement."
    },
    {
      id: "fa_19",
      module: "TOOLS & ORCHESTRATION",
      question: "In a LangGraph QA state machine, how are conditional edges utilized during testing?",
      options: [
        "To route the workflow dynamically (e.g. if smoke tests fail, transition to 'Halt & Alert'; if passed, transition to 'Functional Test Runner')",
        "To change the font color of the terminal output",
        "To delete git branches automatically",
        "To pause execution forever"
      ],
      correctAnswer: 0,
      explanation: "LangGraph conditional edges route state transitions based on test results, quality gates, and error conditions."
    },
    {
      id: "fa_20",
      module: "SARLAYASH MISSION",
      question: "Under the SarlaYash Mission Powered By Kapil philosophy, how does mastering Agentic AI testing elevate a QA professional?",
      options: [
        "It makes them completely reliant on auto-generated code without understanding business logic",
        "It transforms them into high-impact AI Quality Engineers who master enterprise ERP domains, orchestrate autonomous multi-agent systems, and drive agile release governance",
        "It eliminates the need for software testing altogether",
        "It restricts testing to simple manual entry only"
      ],
      correctAnswer: 1,
      explanation: "SarlaYash Mission empowers professionals to lead the AI transformation: combining deep domain expertise (ERP) with autonomous multi-agent testing rigor."
    }
  ]
};
