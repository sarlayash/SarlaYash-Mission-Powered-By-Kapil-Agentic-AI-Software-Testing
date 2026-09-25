export const IDE_FILES = [
  {
    id: "crewai_qa_team",
    name: "crewai_qa_team.py",
    language: "python",
    category: "CrewAI Multi-Agent Testing",
    module: "MODULE 3 & 5: AI Scenario & Test Case Generation",
    description: "Multi-Agent CrewAI system: RequirementAnalyst, TestScenarioDesigner, and QALead orchestrating autonomous test design for ApexEnterprise ERP.",
    initialCode: `# ==============================================================================
# SARLAYASH MISSION POWERED BY KAPIL - AGENTIC AI QA ACADEMY
# CrewAI Autonomous Testing Team: ERP Order-to-Cash (O2C) Module
# ==============================================================================
from crewai import Agent, Task, Crew, Process

# 1. Define Autonomous QA Agents with specialized Personas & Goals
requirement_analyst = Agent(
    role="Senior ERP Business & QA Analyst",
    goal="Extract all functional paths, boundary conditions, and business rules from ERP SRS",
    backstory="12+ years experience in SAP/Oracle ERP Order-to-Cash and Procure-to-Pay workflows. Expert at detecting subtle requirement ambiguities.",
    verbose=True,
    memory=True
)

scenario_designer = Agent(
    role="Principal QA Automation Architect",
    goal="Synthesize high-coverage positive, negative, and integration test scenarios",
    backstory="Specialist in risk-based Agile testing, boundary value analysis, and multi-tenant security verification.",
    verbose=True
)

qa_lead = Agent(
    role="Agile QA Lead & Release Gatekeeper",
    goal="Audit test scenarios, eliminate duplicates, verify RTM coverage, and enforce quality gate approval",
    backstory="Guardian of production quality. Ensures 100% acceptance criteria coverage before sprint sign-off.",
    verbose=True
)

# 2. Define Granular QA Tasks
srs_snippet = """
ERP SPECIFICATION: [O2C-US-104] Sales Order Discount Approval
- Any order with total > $50,000 OR discount > 15% requires Finance Manager approval.
- Orders under credit hold must be rejected immediately with error code ERR_CREDIT_HOLD.
- Inventory must be tentatively reserved for 120 minutes upon order draft creation.
"""

task_analyze_srs = Task(
    description=f"Analyze the following SRS snippet and identify all business rules, boundary values, and potential gaps:\n{srs_snippet}",
    expected_output="Detailed requirement breakdown report with positive rules, negative triggers, and identified edge-case gaps.",
    agent=requirement_analyst
)

task_generate_scenarios = Task(
    description="Using the requirement analysis, generate 5 comprehensive test scenarios (Positive, Negative, Boundary, Integration, Security).",
    expected_output="Structured Test Scenario Document with Scenario ID, Type, Preconditions, Steps, Expected Results.",
    agent=scenario_designer
)

task_lead_review = Task(
    description="Review generated scenarios against IEEE 829 standards, remove any duplicate scenarios, verify coverage, and issue formal approval.",
    expected_output="Final Approved Scenario Repository with QA Lead sign-off confidence score (0-100%).",
    agent=qa_lead
)

# 3. Form the Crew and Execute Hierarchical / Sequential Process
qa_crew = Crew(
    agents=[requirement_analyst, scenario_designer, qa_lead],
    tasks=[task_analyze_srs, task_generate_scenarios, task_lead_review],
    process=Process.sequential,
    verbose=2
)

if __name__ == "__main__":
    print("[INIT] Starting CrewAI Autonomous QA Team for ApexEnterprise ERP...")
    result = qa_crew.kickoff()
    print("\n[SUCCESS] Final QA Deliverable Generated:\n", result)
`,
    expectedLogs: [
      "[INIT] Starting CrewAI Autonomous QA Team for ApexEnterprise ERP...",
      "[Agent: Senior ERP Business & QA Analyst] Thinking: Analyzing SRS snippet for O2C-US-104...",
      "[Agent: Senior ERP Business & QA Analyst] Identified 3 Core Rules: $50,000 threshold, 15% discount gate, 120-min reservation lock.",
      "[Agent: Senior ERP Business & QA Analyst] Edge Gap Detected: What happens if customer credit status changes during the 120-minute reservation window?",
      "[Agent: Principal QA Automation Architect] Generating 5 High-Value Scenarios (SC_O2C_001 to SC_O2C_005)...",
      "  - SC_O2C_001 [Positive]: Order $49,999 with 10% discount -> Auto-approved without Finance escalation.",
      "  - SC_O2C_002 [Boundary]: Order exactly $50,000.01 -> Routes to Finance Manager inbox with SLA 4 hours.",
      "  - SC_O2C_003 [Negative]: Customer under Credit Hold attempts $1,000 order -> Immediate ERR_CREDIT_HOLD.",
      "  - SC_O2C_004 [Boundary]: Discount exactly 15.01% -> Triggers secondary VP approval workflow.",
      "  - SC_O2C_005 [Integration]: Tentative inventory lock decrements stock in Warehouse W-01 and releases at 120m01s.",
      "[Agent: Agile QA Lead] Performing Semantic Duplicate & Quality Audit...",
      "  - Duplicate Check: 0 redundant scenarios detected.",
      "  - RTM Coverage: 100% across all 3 business clauses.",
      "[QA LEAD APPROVAL] Status: APPROVED | Quality Confidence Score: 98.4%",
      "[SUCCESS] Final QA Deliverable Generated and exported to approved_scenarios_o2c.json"
    ],
    executionMetrics: {
      passed: 5,
      failed: 0,
      scenariosGenerated: 5,
      coverage: "100%",
      leadApproval: "APPROVED"
    }
  },
  {
    id: "autogen_qa_workflow",
    name: "autogen_qa_workflow.py",
    language: "python",
    category: "AutoGen Conversational Triage",
    module: "MODULE 9: Defect Management & Root Cause Analysis",
    description: "AutoGen Conversational Multi-Agent system: QA_Lead, Developer, and Defect_Triage_Agent collaboratively root-causing an ERP invoice calculation discrepancy.",
    initialCode: `# ==============================================================================
# SARLAYASH MISSION POWERED BY KAPIL - AGENTIC AI QA ACADEMY
# AutoGen Conversational QA: 3-Way Matching Defect Root Cause Analysis (P2P)
# ==============================================================================
import autogen

config_list = [{"model": "gemini-1.5-pro", "api_key": "MOCK_STUDENT_KEY"}]

# Define QA Persona
qa_tester = autogen.AssistantAgent(
    name="QA_Tester_Agent",
    system_message="""You are an expert ERP Defect Triager. You found a critical discrepancy in Procure-to-Pay (P2P):
    PO #9042 was issued for 100 widgets @ $10/unit ($1,000). Goods Receipt Note (GRN) confirms 100 widgets received.
    However, Vendor Invoice #INV-8812 was billed for $1,150 ($100 freight + $50 unexplained line item).
    The ERP automatically approved payment without flagging a 3-way matching exception!""",
    llm_config={"config_list": config_list}
)

# Define Developer Persona
developer = autogen.AssistantAgent(
    name="ERP_Backend_Developer",
    system_message="""You are the Spring Boot ERP Backend Engineer responsible for the 3-Way Matching Engine.
    Explain the algorithm and review the matching tolerances defined in application.yml.""",
    llm_config={"config_list": config_list}
)

# Define Lead QA Persona
qa_lead = autogen.UserProxyAgent(
    name="Agile_QA_Lead",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=3,
    code_execution_config={"work_dir": "scratch/autogen_p2p", "use_docker": False}
)

# Initiate Collaborative Agent Triage Group Chat
groupchat = autogen.GroupChat(
    agents=[qa_tester, developer, qa_lead],
    messages=[],
    max_round=6
)
manager = autogen.GroupChatManager(groupchat=groupchat, llm_config={"config_list": config_list})

if __name__ == "__main__":
    print("[INIT] Starting AutoGen Multi-Agent Defect Triaging Session...")
    qa_lead.initiate_chat(
        manager,
        message="TRIAGE DEFECT P2P-BUG-401: Investigate why Invoice #INV-8812 bypassed 3-way matching tolerance validation!"
    )
`,
    expectedLogs: [
      "[INIT] Starting AutoGen Multi-Agent Defect Triaging Session...",
      "[Agile_QA_Lead -> GroupChatManager]: TRIAGE DEFECT P2P-BUG-401: Investigate why Invoice #INV-8812 bypassed 3-way matching tolerance validation!",
      "[QA_Tester_Agent]: Observed Behavior: PO total = $1,000, Invoice = $1,150 (+15% variance). Tolerance in BRD is strictly capped at $0 or +/- 2%.",
      "[ERP_Backend_Developer]: Checking matching rule in 'MatchingEngineService.java': Line 142 checks 'Math.abs(poTotal - invoiceTotal) <= toleranceLimit'.",
      "[ERP_Backend_Developer]: BUG FOUND: 'toleranceLimit' was configured in application.yml as '150.00' (flat USD) instead of '0.02' (2% percentage ratio)!",
      "[QA_Tester_Agent]: Defect Root Cause Confirmed: Configuration typo in application.yml. Flat amount tolerance allowed $150 variance.",
      "[Agile_QA_Lead]: Triaging complete! Logging Jira Defect with Severity: CRITICAL, Priority: P1, Target: Build 2 hotfix."
    ],
    executionMetrics: {
      passed: 3,
      failed: 0,
      defectSeverity: "CRITICAL (P1)",
      rootCauseFound: true,
      timeToTriage: "1.4s (Simulated)"
    }
  },
  {
    id: "langgraph_qa_pipeline",
    name: "langgraph_qa_pipeline.py",
    language: "python",
    category: "LangGraph Stateful QA Graph",
    module: "MODULE 6 & 8: Build Validation & Execution State Graph",
    description: "Stateful QA Graph using LangGraph: Validates Build Release 1 -> Runs Smoke Suite -> Generates RTM -> Escalates blockages.",
    initialCode: `# ==============================================================================
# SARLAYASH MISSION POWERED BY KAPIL - AGENTIC AI QA ACADEMY
# LangGraph Stateful Pipeline: Build 1 Release Verification & Smoke Gate
# ==============================================================================
from typing import TypedDict, List
from langgraph.graph import StateGraph, END

class QAState(TypedDict):
    build_version: str
    env_health: bool
    smoke_tests_passed: int
    smoke_tests_failed: int
    blockers: List[str]
    release_decision: str

def verify_build_artifacts(state: QAState) -> QAState:
    print(f"--> [Node 1] Inspecting Docker artifacts & DB migrations for {state['build_version']}...")
    # Simulated check of microservices health endpoints
    state["env_health"] = True
    print("    [Status] DB Migrations V4.2.1 applied successfully. Redis cache warm.")
    return state

def execute_smoke_suite(state: QAState) -> QAState:
    print(f"--> [Node 2] Dispatching Autonomous Playwright Smoke Suite...")
    # Critical paths: Auth -> Tenant -> Sales Order -> Invoice
    state["smoke_tests_passed"] = 12
    state["smoke_tests_failed"] = 0
    state["blockers"] = []
    print(f"    [Result] Smoke Suite: {state['smoke_tests_passed']} Passed, {state['smoke_tests_failed']} Failed.")
    return state

def evaluate_quality_gate(state: QAState) -> str:
    print(f"--> [Gate Router] Evaluating Go/No-Go Criteria...")
    if state["smoke_tests_failed"] == 0 and state["env_health"]:
        return "approved"
    return "rejected"

def issue_go_verdict(state: QAState) -> QAState:
    state["release_decision"] = "GO - READY FOR FUNCTIONAL EXECUTION"
    print(f"==> [DECISION]: {state['release_decision']}")
    return state

def issue_no_go_verdict(state: QAState) -> QAState:
    state["release_decision"] = "NO-GO - BUILD REJECTED"
    print(f"==> [DECISION]: {state['release_decision']}")
    return state

# Construct Stateful Graph
workflow = StateGraph(QAState)
workflow.add_node("verify_build", verify_build_artifacts)
workflow.add_node("run_smoke", execute_smoke_suite)
workflow.add_node("gate_approved", issue_go_verdict)
workflow.add_node("gate_rejected", issue_no_go_verdict)

workflow.set_entry_point("verify_build")
workflow.add_edge("verify_build", "run_smoke")
workflow.add_conditional_edges(
    "run_smoke",
    evaluate_quality_gate,
    {"approved": "gate_approved", "rejected": "gate_rejected"}
)
workflow.add_edge("gate_approved", END)
workflow.add_edge("gate_rejected", END)

qa_app = workflow.compile()

if __name__ == "__main__":
    initial_state = {
        "build_version": "Build-Release-4.2.0-RC1",
        "env_health": False,
        "smoke_tests_passed": 0,
        "smoke_tests_failed": 0,
        "blockers": [],
        "release_decision": "PENDING"
    }
    final_state = qa_app.invoke(initial_state)
    print("\n[PIPELINE FINISHED] Final State:", final_state)
`,
    expectedLogs: [
      "--> [Node 1] Inspecting Docker artifacts & DB migrations for Build-Release-4.2.0-RC1...",
      "    [Status] DB Migrations V4.2.1 applied successfully. Redis cache warm.",
      "--> [Node 2] Dispatching Autonomous Playwright Smoke Suite...",
      "    [Result] Smoke Suite: 12 Passed, 0 Failed.",
      "--> [Gate Router] Evaluating Go/No-Go Criteria...",
      "==> [DECISION]: GO - READY FOR FUNCTIONAL EXECUTION",
      "\n[PIPELINE FINISHED] Quality Gate Cleared. Triggering Module 8 Functional Suite."
    ],
    executionMetrics: {
      passed: 12,
      failed: 0,
      gateStatus: "GO",
      graphNodesExecuted: 4
    }
  },
  {
    id: "test_erp_order_to_cash",
    name: "test_erp_order_to_cash.py",
    language: "python",
    category: "Pytest & Automation Suite",
    module: "MODULE 8: Functional Test Execution & Verification",
    description: "Executable Pytest test suite testing ApexEnterprise ERP Order-to-Cash with positive, negative, and tax boundary checks.",
    initialCode: `# ==============================================================================
# SARLAYASH MISSION POWERED BY KAPIL - AGENTIC AI QA ACADEMY
# Pytest Functional Suite: ApexEnterprise ERP Order-to-Cash (O2C)
# ==============================================================================
import pytest

class ERPOrderService:
    def create_order(self, customer_id: str, items: list, discount_pct: float, credit_status: str):
        if credit_status == "HOLD":
            raise ValueError("ERR_CREDIT_HOLD: Customer account suspended")
        if discount_pct < 0 or discount_pct > 100:
            raise ValueError("ERR_INVALID_DISCOUNT")
        
        subtotal = sum(item["price"] * item["qty"] for item in items)
        discount_amount = subtotal * (discount_pct / 100.0)
        net_total = subtotal - discount_amount
        tax = round(net_total * 0.18, 2) # Standard 18% GST/VAT
        total = round(net_total + tax, 2)
        
        needs_finance_approval = (total > 50000.0) or (discount_pct > 15.0)
        
        return {
            "order_id": f"ORD-{customer_id[:3]}-9901",
            "subtotal": subtotal,
            "discount_amount": discount_amount,
            "tax": tax,
            "total": total,
            "status": "PENDING_APPROVAL" if needs_finance_approval else "CONFIRMED"
        }

# --- TEST CASES IMPLEMENTATION ---

def test_TC_O2C_001_standard_order_confirmed():
    """Verify standard happy-path order under approval threshold is immediately CONFIRMED."""
    service = ERPOrderService()
    items = [{"price": 100.0, "qty": 10}]
    order = service.create_order("CUST_ALPHA", items, discount_pct=5.0, credit_status="ACTIVE")
    
    assert order["subtotal"] == 1000.0
    assert order["discount_amount"] == 50.0
    assert order["tax"] == 171.0 # 950 * 0.18
    assert order["total"] == 1121.0
    assert order["status"] == "CONFIRMED"

def test_TC_O2C_002_high_value_escalates_to_finance():
    """Verify order over $50,000 escalates to PENDING_APPROVAL."""
    service = ERPOrderService()
    items = [{"price": 60000.0, "qty": 1}]
    order = service.create_order("CUST_MEGA", items, discount_pct=2.0, credit_status="ACTIVE")
    
    assert order["total"] > 50000.0
    assert order["status"] == "PENDING_APPROVAL"

def test_TC_O2C_003_credit_hold_negative_rejection():
    """Verify customer on credit hold triggers immediate error code."""
    service = ERPOrderService()
    items = [{"price": 50.0, "qty": 2}]
    
    with pytest.raises(ValueError, match="ERR_CREDIT_HOLD"):
        service.create_order("CUST_DELINQUENT", items, discount_pct=0, credit_status="HOLD")

def test_TC_O2C_004_boundary_15_percent_discount():
    """Boundary test: 15.0% discount does not require approval; 15.1% does."""
    service = ERPOrderService()
    items = [{"price": 100.0, "qty": 10}]
    
    # Exactly 15.0%
    order_15 = service.create_order("CUST_TEST", items, discount_pct=15.0, credit_status="ACTIVE")
    assert order_15["status"] == "CONFIRMED"
    
    # 15.1% triggers escalation
    order_15_1 = service.create_order("CUST_TEST", items, discount_pct=15.1, credit_status="ACTIVE")
    assert order_15_1["status"] == "PENDING_APPROVAL"
`,
    expectedLogs: [
      "============================= test session starts ==============================",
      "platform win32 -- Python 3.12.0, pytest-8.3.2, pluggy-1.5.0",
      "rootdir: C:\\SarlaYash\\AgenticQA\\tests",
      "collected 4 items",
      "",
      "test_erp_order_to_cash.py::test_TC_O2C_001_standard_order_confirmed PASSED [ 25%]",
      "test_erp_order_to_cash.py::test_TC_O2C_002_high_value_escalates_to_finance PASSED [ 50%]",
      "test_erp_order_to_cash.py::test_TC_O2C_003_credit_hold_negative_rejection PASSED [ 75%]",
      "test_erp_order_to_cash.py::test_TC_O2C_004_boundary_15_percent_discount PASSED [100%]",
      "",
      "============================== 4 passed in 0.08s =============================="
    ],
    executionMetrics: {
      passed: 4,
      failed: 0,
      duration: "0.08s",
      coverage: "100%"
    }
  },
  {
    id: "context_prompt_srs_analyzer",
    name: "context_prompt_srs_analyzer.md",
    language: "markdown",
    category: "Prompt & Context Engineering",
    module: "MODULE 2: Requirement Analysis & Context Prompting",
    description: "Context Engineering template used with ChatGPT / Claude / Gemini to perform autonomous gap analysis on ERP specifications.",
    initialCode: `<!-- ==============================================================================
 SARLAYASH MISSION POWERED BY KAPIL - AGENTIC AI QA ACADEMY
 System Prompt: ERP Requirement Gap & Ambiguity Detection Agent
============================================================================== -->

# SYSTEM ROLE DEFINITION
You are "ApexQA-Auditor", a world-class Principal Quality Assurance Engineer and ISO 29119 testing specialist.
Your objective is to inspect enterprise ERP Software Requirement Specifications (SRS) for:
1. Ambiguities & Unquantified Adjectives (e.g., "fast response", "reasonable delay", "normal load").
2. Negative Paths & Missing Exception Workflows (What happens when API times out? What if database lock fails?).
3. Boundary Conditions (Zero values, upper limits, off-by-one errors).
4. Business Rule Contradictions across related modules.

---

# INPUT SRS CONTEXT: APEXENTERPRISE ERP (MODULE: P2P - VENDOR INVOICE)
[REQ-P2P-2024-08]:
"The system shall allow Accounts Payable clerks to upload Vendor PDF Invoices. The OCR engine will extract:
- Vendor Name, Tax Identification Number (TIN/GSTIN)
- PO Number, Line Items, Unit Quantities, Total Billed Amount.
If the PO Number matches an approved PO and the items match the Goods Receipt Note (GRN), the invoice shall be marked 'APPROVED FOR PAYMENT' automatically. If the amount differs by less than $10, it will auto-adjust."

---

# CONTEXT PROMPTING EXECUTION
[TASK FOR AGENT]:
Analyze the above specification and generate:
A. 3 Critical Missing Requirements / Edge Gaps.
B. 2 Severe Business Risk Contradictions.
C. Clarification Questions for the Product Owner (PO) in standard Agile format.
`,
    expectedLogs: [
      "[ApexQA-Auditor Agent] Reading System Persona & SRS Specifications...",
      "[ANALYSIS COMPLETE]:",
      "",
      "A. CRITICAL MISSING REQUIREMENTS / EDGE GAPS:",
      "  1. [GAP-01] Partial Deliveries: If a PO has 100 units ordered, but GRN only received 50 units, does the system auto-approve the invoice if billed for 50 or 100?",
      "  2. [GAP-02] Duplicate Invoice Protection: The spec does not mandate checking if the Vendor Invoice Number has already been submitted and paid.",
      "  3. [GAP-03] Currency Discrepancies: No mention of foreign exchange rates when PO currency differs from Invoice currency.",
      "",
      "B. SEVERE BUSINESS RISK CONTRADICTIONS:",
      "  1. Flat $10 tolerance without percentage cap allows a $5 PO to be billed $15 (300% variance auto-approved).",
      "",
      "C. CLARIFICATION QUESTIONS FOR PRODUCT OWNER:",
      "  - Question 1: What is the maximum acceptable percentage variance alongside the $10 threshold?",
      "  - Question 2: What is the exact fallback status when OCR confidence is below 85%?",
      "",
      "[DELIVERABLE]: Requirement Clarification Document (RCD) successfully synthesized."
    ],
    executionMetrics: {
      passed: 1,
      failed: 0,
      gapsIdentified: 3,
      risksFound: 1,
      clarificationQuestions: 2
    }
  },
  {
    id: "rtm_matrix_generator",
    name: "rtm_matrix_generator.py",
    language: "python",
    category: "RTM & Traceability",
    module: "MODULE 4 & 5: Requirement Traceability Matrix (RTM)",
    description: "Automated Traceability Matrix script mapping User Stories to Test Cases with live pass/fail status and coverage calculation.",
    initialCode: `# ==============================================================================
# SARLAYASH MISSION POWERED BY KAPIL - AGENTIC AI QA ACADEMY
# Automated Requirement Traceability Matrix (RTM) Engine
# ==============================================================================
import json

RTM_DATA = [
    {
        "req_id": "REQ-O2C-01",
        "description": "Customer order entry with valid credit",
        "test_scenario_id": "TS_O2C_01",
        "test_case_id": "TC_O2C_001",
        "test_type": "Positive",
        "status": "PASS",
        "execution_date": "2026-09-25",
        "defect_id": None
    },
    {
        "req_id": "REQ-O2C-02",
        "description": "Orders > $50K require Finance Manager approval",
        "test_scenario_id": "TS_O2C_02",
        "test_case_id": "TC_O2C_002",
        "test_type": "Boundary",
        "status": "PASS",
        "execution_date": "2026-09-25",
        "defect_id": None
    },
    {
        "req_id": "REQ-O2C-03",
        "description": "Immediate rejection on customer credit hold",
        "test_scenario_id": "TS_O2C_03",
        "test_case_id": "TC_O2C_003",
        "test_type": "Negative",
        "status": "PASS",
        "execution_date": "2026-09-25",
        "defect_id": None
    },
    {
        "req_id": "REQ-P2P-01",
        "description": "3-Way Matching for Goods Receipt vs Invoice",
        "test_scenario_id": "TS_P2P_01",
        "test_case_id": "TC_P2P_008",
        "test_type": "Integration",
        "status": "FAIL",
        "execution_date": "2026-09-25",
        "defect_id": "DEF-P2P-401"
    }
]

def calculate_rtm_metrics(matrix):
    total = len(matrix)
    passed = sum(1 for row in matrix if row["status"] == "PASS")
    failed = sum(1 for row in matrix if row["status"] == "FAIL")
    coverage_pct = round((total / total) * 100, 2) if total else 0
    pass_rate = round((passed / total) * 100, 2) if total else 0
    
    return {
        "total_requirements_mapped": total,
        "passed": passed,
        "failed": failed,
        "coverage_percentage": f"{coverage_pct}%",
        "pass_rate": f"{pass_rate}%"
    }

if __name__ == "__main__":
    print("[RTM GENERATOR] Synthesizing Live Traceability Matrix...")
    metrics = calculate_rtm_metrics(RTM_DATA)
    print(f"Total Requirements Mapped: {metrics['total_requirements_mapped']}")
    print(f"Coverage: {metrics['coverage_percentage']} | Pass Rate: {metrics['pass_rate']}")
    print("\nLive Traceability Output:")
    print(json.dumps(RTM_DATA, indent=2))
`,
    expectedLogs: [
      "[RTM GENERATOR] Synthesizing Live Traceability Matrix...",
      "Total Requirements Mapped: 4",
      "Coverage: 100.0% | Pass Rate: 75.0%",
      "Identified Defect Linkage: REQ-P2P-01 linked to DEF-P2P-401 (Jira Status: OPEN)",
      "[SUCCESS] RTM exported in CSV and JSON formats."
    ],
    executionMetrics: {
      passed: 3,
      failed: 1,
      coverage: "100%",
      passRate: "75%"
    }
  }
];
