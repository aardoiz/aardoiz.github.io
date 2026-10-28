export const profile = {
  name: "Alfonso Ardoiz",
  role: "Senior AI Engineer & Technical Lead",
  email: "aardoiz14@gmail.com",
  github: "https://github.com/aardoiz",
  linkedin: "https://www.linkedin.com/in/alfonso-ardoiz-galaz-b1a2171a1/",
  location: "Burgos, Spain · Open to remote roles",
};

export interface Decision {
  title: string;
  description: string;
}
export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  seoDescription: string;
  headline: string;
  role: string;
  stack: string[];
  problem: string;
  contribution: string;
  flow: { name: string; detail: string }[];
  decisions: Decision[];
  results: string[];
  evaluation: string;
  limitations: string;
  links: {
    label: string;
    href: string;
    availability: "available" | "pending";
  }[];
}

export const projects: Project[] = [
  {
    slug: "nba-game-lab",
    number: "01",
    title: "NBA Analytics Agent",
    category: "Independent project · MVP",
    summary:
      "An AI agent that turns basketball questions into interactive dashboards using Python analysis and traceable NBA data.",
    seoDescription:
      "NBA analytics agent combining tool use, isolated Python execution and data provenance to turn basketball questions into interactive dashboards.",
    headline: "NBA analytics. From question to dashboard.",
    role: "AI agent architecture, backend and dashboard implementation",
    stack: ["AI agents", "Python", "Docker", "Pandas", "SQLite", "SSE"],
    problem:
      "Answering a basketball question takes more than retrieving a statistic. The system needs to identify players and teams, choose relevant sources, define a comparison and make the resulting analysis easy to inspect.",
    contribution:
      "I designed and built the MVP from the agent workflow to the dashboard interface. I implemented entity resolution, source selection, dataset persistence and isolated Python execution, then connected the analysis to charts, tables and conclusions with recorded data provenance.",
    flow: [
      { name: "Question", detail: "Resolve players, teams and season" },
      { name: "Tools", detail: "Select and retrieve NBA sources" },
      { name: "Analysis", detail: "Run Python in an isolated container" },
      { name: "Evidence", detail: "Persist datasets and their lineage" },
      { name: "Dashboard", detail: "Compose charts, tables and conclusions" },
    ],
    decisions: [
      {
        title: "Keep the numbers outside the model",
        description:
          "Chart and metric values are extracted by the backend from persisted datasets. The model composes the analysis, while the underlying evidence remains inspectable.",
      },
      {
        title: "Execute generated code in isolation",
        description:
          "Generated Python runs in a Docker container without network access, with a read-only filesystem, an unprivileged user and resource limits. An AST checker adds code-level restrictions. Execution requires Docker.",
      },
      {
        title: "Preserve missing evidence",
        description:
          "Failed sources remain explicit limitations. Missing statistics do not become zeroes, and ambiguous names return candidates rather than silently selecting a player.",
      },
      {
        title: "Make a public demo reproducible",
        description:
          "The planned public demo uses saved results from actual queries, letting visitors inspect datasets, charts and methodology without credentials or live model calls.",
      },
    ],
    results: [
      "A working MVP connecting natural-language questions to Python analysis and interactive dashboards.",
      "Inspectable analysis with saved source arguments, dataset schemas and lineage.",
      "Query-level tracking of tokens, estimated cost, phase timings and retries.",
    ],
    evaluation:
      "Automated evaluation checks player identities, seasons, source references and displayed values against saved datasets. Tests cover altered values, invalid references and private metadata exclusion, with separate integration tests for Docker execution. Ranking criteria and causal interpretations require human review.",
    limitations:
      "An independent MVP with a planned public demo based on saved analyses. Source availability and small samples limit the conclusions. Query costs are tracked, but automatic spending cutoffs are not implemented.",
    links: [
      {
        label: "Explore the demo",
        href: "https://aardoiz.github.io/nba-analyser/",
        availability: "pending",
      },
      {
        label: "View repository",
        href: "https://github.com/aardoiz/nba-analyser",
        availability: "pending",
      },
    ],
  },
  {
    slug: "english-coach",
    number: "02",
    title: "Voice AI Interview Coach",
    category: "Independent project · Voice AI",
    summary:
      "A voice AI application for practicing technical interviews in English, combining speech recognition, LLM feedback and speech synthesis.",
    seoDescription:
      "Voice AI interview coach built with FastAPI and Azure, connecting speech recognition, LLM feedback and speech synthesis for technical interview practice.",
    headline: "Voice AI. Built for technical interview practice.",
    role: "Voice pipeline, FastAPI backend and browser interface",
    stack: [
      "Voice AI",
      "Speech recognition",
      "Speech synthesis",
      "LLMs",
      "FastAPI",
      "Azure",
    ],
    problem:
      "Explaining an AI concept out loud is a different challenge from knowing the answer. I wanted a way to rehearse technical interviews in English, review my response and hear a suggested version within the same session.",
    contribution:
      "I built a FastAPI backend and browser interface connecting microphone recording, speech recognition, LLM feedback and synthesized audio. The application presents AI interview questions and separates the transcript, feedback and suggested answer so users can compare each step.",
    flow: [
      { name: "Speak", detail: "Record an answer in the browser" },
      { name: "Transcribe", detail: "Convert recorded speech into text" },
      { name: "Coach", detail: "Evaluate the answer and suggest improvements" },
      { name: "Listen", detail: "Synthesize the improved response" },
    ],
    decisions: [
      {
        title: "Build a complete voice loop",
        description:
          "I connected speech recognition and synthesis around the feedback step, so a user can record an answer, review it and listen to a suggested response without switching tools.",
      },
      {
        title: "Make the feedback inspectable",
        description:
          "The interface displays the transcript, improvement suggestions, feedback and model answer separately. Users can see what was recognized and compare their response with the suggested version.",
      },
      {
        title: "Keep the service reusable",
        description:
          "I exposed the voice pipeline through FastAPI independently of the browser interface. Configurable models, persistent session history and reset support keep the service adaptable to different practice sessions.",
      },
    ],
    results: [
      "A complete voice workflow from browser recording to answer feedback and audio playback.",
      "A reusable FastAPI service with configurable transcription, language and speech synthesis models.",
      "AI interview questions with persistent session history and a reset flow for fresh practice.",
    ],
    evaluation:
      "The recorded demo shows the complete workflow: record an answer, review its transcription and feedback, then play the suggested response. It demonstrates the integration; transcription accuracy and learning outcomes have not been formally benchmarked.",
    limitations:
      "Designed for personal interview practice. Model-generated feedback can need correction, and the application does not provide validated language or pronunciation assessment.",
    links: [
      {
        label: "Project notes",
        href: "https://github.com/aardoiz/aardoiz.github.io/tree/main/public/projects/teacher/readme.md",
        availability: "available",
      },
    ],
  },
  {
    slug: "legal-search",
    number: "03",
    title: "Agentic Legal Search Engine",
    category: "Professional work · Anonymized",
    summary:
      "Multilingual hybrid search with query-routing agents and reranking, improving Recall@5 from 26% to 97% on the project benchmark.",
    seoDescription:
      "Legal document retrieval combining multilingual semantic search, lexical search, query agents and reranking. Recall@5 improved from 26% to 97%.",
    headline: "Built from scratch for 5M+ documents. From 26% to 97% Recall@5.",
    role: "Retrieval architecture, implementation and benchmark evaluation within a delivery team",
    stack: [
      "Hybrid search",
      "Multilingual retrieval",
      "Query-routing agents",
      "Query optimization",
      "Reranking",
      "Retrieval evaluation",
      "Python",
    ],
    problem:
      "A law firm needed to find internal documents using legal terminology and queries in different languages. The existing model reached 26% Recall@5 on the project benchmark. Improving retrieval required handling both semantic meaning across languages and exact terminology, then selecting and ranking results for each query.",
    contribution:
      "I evaluated the existing model and established a benchmark to measure improvements. I implemented multilingual semantic search and lexical search, a decision agent to select the retrieval approach based on the query, and a query-optimization agent that refined the query and added tags and metadata. I then implemented a reranker combining results from both search methods with the agents’ contributions, working with AI and full-stack engineers on the wider product.",
    flow: [
      {
        name: "Route",
        detail: "Select the retrieval approach based on the query",
      },
      {
        name: "Optimize",
        detail: "Refine the query and add tags and metadata",
      },
      {
        name: "Semantic search",
        detail: "Retrieve by meaning across languages",
      },
      {
        name: "Lexical search",
        detail: "Retrieve using exact words and legal terms",
      },
      {
        name: "Rerank",
        detail: "Combine search results and agent contributions",
      },
    ],
    decisions: [
      {
        title: "Establish a benchmark before changing the system",
        description:
          "I evaluated the existing model first and established a retrieval benchmark. This gave me a baseline for measuring the combined system’s improvement in Recall@5.",
      },
      {
        title: "Search by meaning and exact terminology",
        description:
          "Multilingual semantic search addresses meaning across languages, while lexical search captures exact words and legal terms. I implemented both to cover complementary retrieval needs.",
      },
      {
        title: "Adapt retrieval to the query",
        description:
          "A decision agent selects the search approach based on the query. A separate optimization agent refines the query and adds tags and metadata to provide more retrieval context.",
      },
      {
        title: "Combine the signals through reranking",
        description:
          "I implemented a reranker to combine results from semantic and lexical search with the agents’ contributions into a final ranked result set.",
      },
    ],
    results: [
      "Recall@5 improved from 26% to 97% on the project benchmark: a gain of 71 percentage points.",
      "A retrieval pipeline combining multilingual semantic search, lexical search, query-routing and optimization agents, and reranking.",
      "The client extended the initial contract after the retrieval solution exceeded the agreed threshold.",
      "Successful delivery led to technical responsibility on another challenging client project.",
    ],
    evaluation:
      "I evaluated the original model and benchmarked the revised retrieval system. Recall@5 increased from 26% to 97%, a gain of 71 percentage points. These are reported project results; the client dataset and evaluation artifacts remain confidential. The combined result does not isolate the contribution of each search method or agent.",
    limitations:
      "An anonymized professional case delivered by a wider engineering team. This account covers my retrieval contribution and excludes client documents, code and internal architecture. The benchmark result applies to the evaluated retrieval task; it does not establish performance on every legal query or document collection.",
    links: [],
  },
  {
    slug: "agentic-automation",
    number: "04",
    title: "Automatized Workflow Orchestrator",
    category: "Professional work · Anonymized",
    summary:
      "A FastAPI multi-agent backend on Azure, combining dynamic MCP tools, dependency graphs, persistent execution state and human review.",
    seoDescription:
      "Multi-agent orchestration with FastAPI, Azure OpenAI and MCP. Dependency graphs, MongoDB execution state, human review and OpenTelemetry monitoring.",
    headline: "Automating manual workflows within existing environments",
    role: "Technical lead · Architecture, implementation and client delivery",
    stack: [
      "MCP",
      "FastAPI",
      "Azure OpenAI",
      "Agent orchestration",
      "Dependency graphs",
      "MongoDB",
      "Human-in-the-loop",
      "OpenTelemetry",
      "Docker",
      "Python",
    ],
    problem:
      "The client wanted to automate internal processes across existing applications and support different assistant providers. I needed to turn those broad requirements into an architecture, a working MVP and a phased delivery plan.",
    contribution:
      "As technical lead, I owned the proposal, architecture and delivery across three phases. I built a FastAPI multi-agent backend using Azure OpenAI, dynamic MCP tool discovery and dependency-based execution graphs. The system persists execution state and human interactions in MongoDB, supports clarification and review during execution, and records model and workflow telemetry. I also led client communication, internal training and product delivery.",
    flow: [
      { name: "Plan", detail: "Build a graph of tasks and dependencies" },
      { name: "Review", detail: "Clarify intent and review the proposed plan" },
      { name: "Execute", detail: "Invoke dynamically registered MCP tools" },
      {
        name: "Persist",
        detail: "Store execution state and human interactions",
      },
      { name: "Observe", detail: "Trace workflow timing and model usage" },
    ],
    decisions: [
      {
        title: "Discover tools through MCP contracts",
        description:
          "MCP tools are discovered and registered dynamically, with runtime arguments for invocation. FastAPI manages MCP connections through its application lifecycle, separating API delivery from tool integration.",
      },
      {
        title: "Make dependencies and execution state explicit",
        description:
          "Plans use dependency graphs to represent tool calls, human input and result composition. MongoDB stores node results and interactions, with revision checks and execution ownership protecting against concurrent updates.",
      },
      {
        title: "Support human review throughout execution",
        description:
          "The workflow distinguishes clarification before execution from human interactions during a run. Execution can pause for approval, selection or correction, then continue after a structured response.",
      },
      {
        title: "Ground planning in bounded evidence gathering",
        description:
          "The planner gathers relevant read-only context before critical decisions, checks choices against retrieved evidence and deduplicates reads. Configurable time, tool-call and context limits keep evidence gathering bounded, with access revalidated when an analysis resumes.",
      },
      {
        title: "Instrument and test the orchestration layer",
        description:
          "OpenTelemetry and Application Insights track model usage, latency and workflow performance. The backend includes tests for dependency graphs, persistent runs, human interactions, authentication and REST contract compatibility, with Docker packaging for deployment.",
      },
    ],
    results: [
      "A functional MVP delivered over six months, with deployment, testing and logging in Azure.",
      "Approximately 70% less time spent on targeted manual tasks, as reported from project telemetry.",
      "A graph-based orchestration backend with dynamically registered MCP tools, persistent execution state and structured human interactions.",
    ],
    evaluation:
      "OpenTelemetry workflow timing informed the reported reduction of approximately 70% in time spent on targeted manual tasks. Backend tests cover graph execution, persistent state, human interactions and API contracts. External-service integration tests require configured access. The underlying project telemetry remains confidential.",
    limitations:
      "An anonymized professional MVP. Client code and operational details remain confidential. The measured time reduction applies to the targeted workflows, rather than all processes in the organization.",
    links: [],
  },
];

export interface Publication {
  title: string;
  venue: string;
  year: string;
  status: "Published" | "Preprint";
  href: string;
}
export const publications: Publication[] = [
  {
    title:
      "Recommendation System of Scientific Articles from Discharge Summaries",
    venue: "Engineering Applications of Artificial Intelligence",
    year: "2024",
    status: "Published",
    href: "https://www.sciencedirect.com/science/article/pii/S0952197624011862",
  },
  {
    title: "RADIA — Radio Advertisement Detection with Intelligent Analytics",
    venue: "arXiv · Speech recognition & NLP",
    year: "2024",
    status: "Preprint",
    href: "https://arxiv.org/abs/2403.03538",
  },
  {
    title: "Spanish-BFF: the first AI-generated free dictionary",
    venue: "arXiv · Generative language models",
    year: "2023",
    status: "Preprint",
    href: "https://arxiv.org/abs/2302.12746",
  },
  {
    title: "Linguistic ambiguity analysis in ChatGPT",
    venue: "arXiv · Language model evaluation",
    year: "2023",
    status: "Preprint",
    href: "https://arxiv.org/abs/2302.06426",
  },
  {
    title: "dezzai@SMM4H’22: Tasks 5 & 10 — Hybrid models everywhere",
    venue: "SMM4H · ACL Anthology",
    year: "2022",
    status: "Published",
    href: "https://aclanthology.org/2022.smm4h-1.3/",
  },
  {
    title: "MMG at SemEval-2022: A Reverse Dictionary approach",
    venue: "SemEval · ACL Anthology",
    year: "2022",
    status: "Published",
    href: "https://aclanthology.org/2022.semeval-1.7/",
  },
];
