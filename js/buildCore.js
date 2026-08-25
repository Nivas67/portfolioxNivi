/**
 * Signature Experience: NIVAS // BUILD CORE
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 * Exact Pipeline: PYTHON → DSA → SYSTEMS → DATA → MACHINE LEARNING → AI → APPLICATIONS
 */

const CORE_NODES = [
  {
    id: "python",
    step: "01 // SYNTAX & SYSTEMS",
    title: "PYTHON",
    role: "Programming & Prototyping Foundation",
    usedFor: "AI / ML, Scripting, Automation, Scientific Computing, Backends",
    description: "The core programming foundation for rapid prototyping, computational logic, and algorithmic execution.",
    skills: ["Python 3", "OOP Architecture", "File I/O", "NumPy", "Automation"]
  },
  {
    id: "dsa",
    step: "02 // LOGICAL RIGOR",
    title: "DSA",
    role: "Data Structures & Algorithmic Optimization",
    usedFor: "Trees, Graphs, Dynamic Programming, Time-Space Complexity",
    description: "Rigorous computational problem-solving ensuring optimal execution efficiency before scaling to machine intelligence.",
    skills: ["Trees & Graphs", "Dynamic Programming", "Recursion", "Big-O Analysis", "C & Memory"]
  },
  {
    id: "systems",
    step: "03 // HARDWARE & SPECS",
    title: "SYSTEMS",
    role: "Low-Level & Software Engineering Architecture",
    usedFor: "Embedded Systems, Electrical Fundamentals, IEEE 830 Standards",
    description: "Bridging software abstractions with physical hardware signals, microcontrollers, and formal engineering design specifications.",
    skills: ["Embedded Systems", "Electrical Fundamentals", "IEEE Std 830", "DFD Modeling", "System Design"]
  },
  {
    id: "data",
    step: "04 // PERSISTENCE & PIPELINES",
    title: "DATA",
    role: "Database Management & Information Flow",
    usedFor: "DBMS, SQL, Relational Modeling, Firebase Realtime Sync",
    description: "Managing structured and unstructured inputs, schema design, and high-integrity data streams for downstream learning.",
    skills: ["DBMS / SQL", "ER Modeling", "Firebase Cloud DB", "Data Normalization", "Indexing"]
  },
  {
    id: "machine-learning",
    step: "05 // PATTERN SYNTHESIS",
    title: "MACHINE LEARNING",
    role: "Statistical Learning & Predictive Models",
    usedFor: "Regression, Classification, Gradient Descent, Feature Engineering",
    description: "Mathematical formulations and statistical algorithms that uncover patterns and generalize from empirical datasets.",
    skills: ["Scikit-Learn", "Model Training", "Loss Functions", "Evaluation Metrics", "Feature Extraction"]
  },
  {
    id: "ai",
    step: "06 // NEURAL INTELLIGENCE",
    title: "AI",
    role: "Deep Representation & Decision Systems",
    usedFor: "Neural Networks, Vision Inference, Recommendation Engines",
    description: "Multi-layered representation learning and intelligent reasoning engines powering next-generation autonomous systems.",
    skills: ["Deep Learning Concepts", "Neural Architectures", "Computer Vision Concepts", "Recommendation Systems"]
  },
  {
    id: "applications",
    step: "07 // REAL-WORLD IMPACT",
    title: "APPLICATIONS",
    role: "Deployed Products & User Utility",
    usedFor: "Web Platforms, Mobile Apps, Connected Smart Devices, Campus Logistics",
    description: "Translating computational intelligence and software engineering into tangible, responsive products that solve real-world problems.",
    skills: ["FreshBasket (Web)", "GymFlex (Mobile & Smart Devices)", "LPUQuick (Campus Platform)", "SRS Blueprints"]
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
