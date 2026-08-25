/**
 * Technical Constellation & Capability Matrix
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const SKILLS_DATA = [
  {
    category: "LANGUAGES",
    items: [
      { name: "Python", foundation: "Programming", focus: "AI / ML, Algorithms, Automation", status: "ACTIVE" },
      { name: "C", foundation: "Systems & Memory", focus: "Low-level structures, Pointers, Speed", status: "ACTIVE" },
      { name: "JavaScript", foundation: "Web Execution", focus: "Client interactions, Asynchronous logic", status: "ACTIVE" },
      { name: "HTML5", foundation: "Semantic Markup", focus: "Accessible DOM architecture", status: "ACTIVE" },
      { name: "CSS3", foundation: "Visual Styling", focus: "Custom properties, Grid, Fluid layouts", status: "ACTIVE" }
    ]
  },
  {
    category: "CS FOUNDATIONS",
    items: [
      { name: "Data Structures & Algorithms", foundation: "Computer Science", focus: "Trees, Graphs, DP, Sorting", status: "INTENSIVE" },
      { name: "DBMS", foundation: "Data Systems", focus: "Relational modeling, SQL, Indexing", status: "ACTIVE" },
      { name: "Software Engineering", foundation: "Architecture", focus: "SDLC, Design Patterns, Agile", status: "ACTIVE" },
      { name: "IEEE Std 830", foundation: "Specification", focus: "Formal SRS documents, DFD models", status: "COMPLETED" }
    ]
  },
  {
    category: "SYSTEMS",
    items: [
      { name: "Embedded Systems", foundation: "Hardware & Edge", focus: "Microcontrollers, Sensors, GPIO", status: "ACTIVE" },
      { name: "Electrical Fundamentals", foundation: "Circuit Physics", focus: "Signals, Logic gates, Current flow", status: "ACTIVE" },
      { name: "Firebase", foundation: "Backend-as-a-Service", focus: "Firestore, Auth, Realtime DB", status: "ACTIVE" }
    ]
  },
  {
    category: "WEB / MOBILE",
    items: [
      { name: "React Native", foundation: "Cross-Platform", focus: "Native UI components, State hooks", status: "BUILDING" },
      { name: "Expo", foundation: "Mobile Tooling", focus: "Rapid build & device telemetry", status: "BUILDING" },
      { name: "Bootstrap 5", foundation: "CSS Framework", focus: "Grid systems & utility-first markup", status: "ACTIVE" },
      { name: "Responsive UI", foundation: "Design Systems", focus: "Fluid typography & adaptive breakpoints", status: "ACTIVE" }
    ]
  },
  {
    category: "TOOLS & DOCUMENTATION",
    items: [
      { name: "GitHub", foundation: "Version Control", focus: "Branching, Collaboration, Actions", status: "ACTIVE" },
      { name: "LaTeX", foundation: "Typesetting", focus: "Formal academic & technical publishing", status: "ACTIVE" },
      { name: "Overleaf", foundation: "Cloud Documentation", focus: "Collaborative engineering write-ups", status: "ACTIVE" },
      { name: "TikZ", foundation: "Vector Schematics", focus: "DFDs, Flowcharts & Architecture diagrams", status: "ACTIVE" }
    ]
  }
];

export function initSkillsMatrix() {
  const container = document.getElementById('skills-matrix-grid');
  const detailName = document.getElementById('skill-detail-name');
  const detailFoundation = document.getElementById('skill-detail-foundation');
  const detailFocus = document.getElementById('skill-detail-focus');
  const detailStatus = document.getElementById('skill-detail-status');

  if (!container) return;

  container.innerHTML = SKILLS_DATA.map((cat) => `
    <div class="skill-category-card">
      <div class="skill-card-header">
        <h3>// ${cat.category}</h3>
      </div>
      <ul class="skill-node-list">
        ${cat.items.map(item => `
          <li class="skill-item" data-name="${item.name}">
            <span class="skill-item-name">${item.name}</span>
            <span class="skill-item-status">${item.status}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  const allItems = container.querySelectorAll('.skill-item');

  function updateDetail(item) {
    if (!item) return;
    if (detailName) detailName.textContent = item.name;
    if (detailFoundation) detailFoundation.textContent = item.foundation;
    if (detailFocus) detailFocus.textContent = item.focus;
    if (detailStatus) detailStatus.textContent = item.status;
  }

  // Set default inspector to Python
  updateDetail(SKILLS_DATA[0].items[0]);

  allItems.forEach((el) => {
    const itemName = el.getAttribute('data-name');
    let itemData = null;
    for (const cat of SKILLS_DATA) {
      const match = cat.items.find(i => i.name === itemName);
      if (match) { itemData = match; break; }
    }

    el.addEventListener('mouseenter', () => {
      allItems.forEach(i => {
        if (i === el) {
          i.classList.add('is-active');
          i.classList.remove('is-dimmed');
        } else {
          i.classList.remove('is-active');
          i.classList.add('is-dimmed');
        }
      });
      updateDetail(itemData);
    });

    el.addEventListener('mouseleave', () => {
      allItems.forEach(i => {
        i.classList.remove('is-active', 'is-dimmed');
      });
    });
  });
}
