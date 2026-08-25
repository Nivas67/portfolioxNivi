/**
 * Signature Experience: NIVAS // BUILD CORE
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const CORE_NODES = [
  {
    id: "python",
    step: "01 // SYNTAX & SYSTEMS",
    title: "PYTHON",
    role: "Programming & Execution Foundation",
    usedFor: "AI / ML, Scripting, Automation, Scientific Computing, Backends",
    description: "The primary language for model development, rapid prototyping, and algorithmic implementation.",
    skills: ["Python 3", "NumPy", "Pandas", "OOP Architecture", "File I/O"]
  },
  {
    id: "data",
    step: "02 // STRUCTURING",
    title: "DATA",
    role: "Information Pipelines & Persistence",
    usedFor: "DBMS, SQL Queries, Feature Extraction, Preprocessing, Schema Design",
    description: "Managing structured and unstructured inputs to ensure clean, high-integrity data streams for downstream learning.",
    skills: ["SQL / DBMS", "Data Normalization", "ER Modeling", "Firebase Realtime DB", "Data Cleaning"]
  },
  {
    id: "algorithms",
    step: "03 // LOGICAL FOUNDATION",
    title: "ALGORITHMS",
    role: "Computational Optimization & Logic",
    usedFor: "DSA, Graph Traversal, Dynamic Programming, Time-Space Efficiency",
    description: "Rigorous problem-solving ensuring computational complexity is minimized before scaling to neural layers.",
    skills: ["Trees & Graphs", "Dynamic Programming", "Recursion", "Big-O Analysis", "C Programming"]
  },
  {
    id: "machine-learning",
    step: "04 // PATTERN SYNTHESIS",
    title: "MACHINE LEARNING",
    role: "Statistical Pattern Recognition",
    usedFor: "Regression, Classification, Gradient Descent, Supervised/Unsupervised",
    description: "Building predictive mathematical formulations that adapt and generalize from empirical dataset patterns.",
    skills: ["Scikit-Learn", "Loss Functions", "Feature Engineering", "Model Evaluation", "Cross-Validation"]
  },
  {
    id: "intelligence",
    step: "05 // NEURAL ARCHITECTURE",
    title: "INTELLIGENCE",
    role: "Deep Representation & Reasoning",
    usedFor: "Neural Networks, Vision Inference, Transformer Attention, Multi-Modal",
    description: "Deep learning representations capturing non-linear relationships across vision, text, and sensory telemetry.",
    skills: ["PyTorch / TensorFlow", "CNNs & Vision", "Embeddings", "Transfer Learning", "Backpropagation"]
  },
  {
    id: "applications",
    step: "06 // REAL-WORLD IMPACT",
    title: "APPLICATIONS",
    role: "Engineered Products & Deployment",
    usedFor: "Mobile Apps, Full-Stack Interfaces, Embedded Edge AI, User Utility",
    description: "Deploying intelligent models into cohesive, responsive web and mobile products that solve real-world problems.",
    skills: ["React Native", "Expo", "REST APIs", "Modern Web", "Embedded Systems"]
  }
];

export function initBuildCore() {
  const flowContainer = document.getElementById('build-core-flow');
  const inspectorRole = document.getElementById('core-inspector-role');
  const inspectorDesc = document.getElementById('core-inspector-desc');
  const inspectorTags = document.getElementById('core-inspector-tags');
  const inspectorTitle = document.getElementById('core-inspector-title');

  if (!flowContainer) return;

  flowContainer.innerHTML = CORE_NODES.map((node, index) => `
    <div class="core-node ${index === 0 ? 'is-active' : ''}" data-id="${node.id}">
      <div class="core-node-step">${node.step}</div>
      <div class="core-node-title">${node.title}</div>
    </div>
  `).join('');

  const nodeElements = flowContainer.querySelectorAll('.core-node');

  function updateInspector(nodeData) {
    if (!nodeData) return;
    if (inspectorTitle) inspectorTitle.textContent = nodeData.title;
    if (inspectorRole) inspectorRole.textContent = nodeData.role;
    if (inspectorDesc) inspectorDesc.textContent = nodeData.description;
    if (inspectorTags) {
      inspectorTags.innerHTML = nodeData.skills.map(skill => `
        <span class="tech-tag">${skill}</span>
      `).join('');
    }
  }

  // Initialize with the first node (Python)
  updateInspector(CORE_NODES[0]);

  nodeElements.forEach((nodeEl) => {
    const nodeId = nodeEl.getAttribute('data-id');
    const nodeData = CORE_NODES.find(n => n.id === nodeId);

    const activate = () => {
      nodeElements.forEach(n => n.classList.remove('is-active'));
      nodeEl.classList.add('is-active');
      updateInspector(nodeData);
    };

    nodeEl.addEventListener('mouseenter', activate);
    nodeEl.addEventListener('click', activate);
  });
}
