/**
 * Project Archive & Blueprint Case Study Expansion
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const PROJECTS = [
  {
    id: "freshbasket",
    num: "01",
    title: "FreshBasket",
    category: "WEB / E-COMMERCE",
    status: "COMPLETED",
    description: "Fruit e-commerce platform featuring dark mode, localStorage cart persistence, glassmorphism UI accents, admin management concept, and fluid responsive grid.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "localStorage"],
    schematicType: "ecommerce",
    overview: "FreshBasket was built to master front-end state synchronization without heavyweight client frameworks. It demonstrates how persistent browser storage can manage multi-item checkouts, coupon codes, and dynamic inventory states.",
    objective: "Create an intuitive, high-performance shopping interface with instant cart reactivity and zero server dependency for cart persistence.",
    features: [
      "Dynamic product catalog with category filtering and instant search",
      "Persistent cart drawer using browser localStorage with quantity math",
      "Interactive dark/light theme switcher with CSS custom variables",
      "Admin inventory management concept with client-side modal CRUD",
      "Strict responsive layout tested across mobile, tablet, and wide desktop"
    ],
    learned: "Mastered vanilla JavaScript DOM manipulation, event delegation, client-side data serialization with JSON/localStorage, and modular CSS layout architecture."
  },
  {
    id: "gym-planner",
    num: "02",
    title: "Gym & Fitness Planner",
    category: "MOBILE / PRODUCT",
    status: "IN PROGRESS",
    description: "Cross-platform mobile lifestyle app built with React Native, Expo, and Firebase for workout planning, live set logging, diet macro tracking, and wearable sync.",
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "Health APIs"],
    schematicType: "fitness",
    overview: "A comprehensive personal training companion engineered for gym-goers who need precise workout split logging, progressive overload calculations, and daily caloric balance.",
    objective: "Consolidate health data, live workout tracking, nutritional balance, and smartwatch telemetry into one synchronized mobile experience.",
    features: [
      "Interactive workout split builder (PPL, Upper/Lower, Full Body)",
      "Live set logging table with rest timer countdown audio/visual bar",
      "Daily macro & calorie calculator with Mifflin-St Jeor formula",
      "Wearable sensor integration concept for continuous telemetry",
      "Firebase cloud sync for user profiles, workouts, and PR logs"
    ],
    learned: "Architecting cross-platform components in React Native, managing asynchronous device storage, mobile performance profiling, and state management hooks."
  },
  {
    id: "roadmap-visualization",
    num: "03",
    title: "3-Year B.Tech Roadmap",
    category: "INTERACTIVE VISUALIZATION",
    status: "ACTIVE EXPERIMENT",
    description: "Cyberpunk-inspired interactive visual system charting skill growth, milestones, and technical competency progression throughout my 4-year B.Tech journey.",
    tech: ["JavaScript", "HTML5 Canvas", "SVG Paths", "CSS Grid", "Animations"],
    schematicType: "roadmap",
    overview: "A visual timeline mapping out foundational computer science curricula into applied engineering goals across DSA, Web Development, ML/Python, Cloud, and DevOps.",
    objective: "Provide transparent, interactive telemetry on technical milestones achieved and upcoming specialization targets across three distinct academic phases.",
    features: [
      "Year 01: Foundation (C, Python, DSA, Electrical & Embedded Basics)",
      "Year 02: Build (Web/Mobile Apps, DBMS, Software Engineering, Firebase)",
      "Year 03: Specialize (Deep Learning, Neural Networks, Cloud Deployments, AI/ML)",
      "Interactive milestone checkpoints with hoverable competency breakdowns",
      "Evolving visual trajectory line with glowing progress indicators"
    ],
    learned: "SVG coordinate math, interactive milestone state machines, timeline data mapping, and narrative visual design."
  },
  {
    id: "srs-ride-booking",
    num: "04",
    title: "SRS — Ride Booking System",
    category: "SOFTWARE ENGINEERING",
    status: "COMPLETED",
    description: "Formal IEEE Std 830-1998 Software Requirements Specification document complete with system architecture, Data Flow Diagrams (DFDs), and functional matrices.",
    tech: ["LaTeX", "Overleaf", "TikZ", "IEEE 830-1998", "DFD Modeling"],
    schematicType: "blueprint-ride",
    overview: "An enterprise-grade IEEE Std 830 compliant requirements specification for an on-demand multi-tier urban ride-hailing platform.",
    objective: "Formulate unambiguous functional requirements, data flow hierarchies, security constraints, and external interface specifications for large-scale distributed dispatch.",
    features: [
      "Level-0 Context Diagrams and Level-1 & Level-2 TikZ Data Flow Diagrams",
      "Complete functional requirement catalog covering dispatch, pricing, and tracking",
      "Non-functional criteria covering 99.9% uptime SLA, latency, and fault tolerance",
      "State transition models for driver-passenger matching and transaction lifecycle",
      "Typeset entirely in LaTeX with structured cross-referencing and figures"
    ],
    learned: "Formal engineering documentation standards, precision requirements authoring, structural ambiguity elimination, and TikZ vector schematic drafting."
  },
  {
    id: "srs-spothero",
    num: "05",
    title: "SRS — SpotHero Parking Reservation",
    category: "SOFTWARE ENGINEERING",
    status: "COMPLETED",
    description: "Comprehensive IEEE 830 specification for a real-time parking spot reservation platform with location-based slot allocation and TikZ architecture schemas.",
    tech: ["LaTeX", "Overleaf", "TikZ Schematics", "Requirements Engineering"],
    schematicType: "blueprint-parking",
    overview: "Formal software specification detailing the architecture, slot occupancy algorithms, payment gateways, and telemetry pipelines for urban parking spot booking.",
    objective: "Define end-to-end system interactions between mobile drivers, garage sensor IoT gates, and cloud reservation ledgers under concurrent booking loads.",
    features: [
      "Detailed use case models and role-based privilege access hierarchies",
      "TikZ DFDs illustrating dynamic slot availability and payment gateway handshakes",
      "Concurrency and double-booking prevention constraint specifications",
      "Hardware interface specs for automated barrier sensors and QR validation",
      "Structured validation matrices ensuring requirement testability"
    ],
    learned: "Concurrent transaction analysis, hardware-software interface boundaries, structured engineering modeling, and academic LaTeX authoring."
  },
  {
    id: "software-exam-prep",
    num: "06",
    title: "Software Engineering Exam Prep",
    category: "EDUCATION / WEB",
    status: "COMPLETED",
    description: "Interactive study and exam preparation web application featuring distinct Study, Timed Exam, and Adaptive Quiz modes for software engineering concepts.",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Responsive Design"],
    schematicType: "examprep",
    overview: "A targeted revision and self-assessment engine designed to test understanding of SDLC models, agile practices, UML diagrams, testing methods, and design patterns.",
    objective: "Gamify technical exam preparation through simulated test environments, instant rationale explanations, and weak-area score diagnostics.",
    features: [
      "Mode 1 — Study Mode: Flashcards and topic summaries with expandable notes",
      "Mode 2 — Exam Mode: Countdown timer, randomized question banks, and locked review",
      "Mode 3 — Quiz Mode: Immediate feedback with detailed explanations on each answer",
      "Score tracker and topic mastery breakdown saved in local browser state",
      "Clean high-contrast reader view optimized for rapid cramming sessions"
    ],
    learned: "State-driven single page application logic, timed assessment loops, test result serialization, and user-centric study workflows."
  }
];

export function initProjectsArchive() {
  const gridContainer = document.getElementById('projects-archive-grid');
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalCloseBtn = document.getElementById('project-modal-close');

  if (!gridContainer) return;

  gridContainer.innerHTML = PROJECTS.map((p) => `
    <article class="project-blueprint-card" data-id="${p.id}">
      <div class="project-schematic-preview">
        <div class="schematic-canvas-layer"></div>
        <div class="schematic-content-visual">
          ${renderSchematicGraphic(p.schematicType, p.title)}
        </div>
      </div>
      <div class="project-card-body">
        <div class="project-card-meta">
          <span class="project-index">// ${p.num}</span>
          <span class="project-category-badge">${p.category}</span>
        </div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-description">${p.description}</p>
        <div class="project-tech-pills">
          ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-card-footer">
          <span class="project-status-indicator">
            <span class="status-dot"></span>
            ${p.status}
          </span>
          <span class="project-action-arrow">↗</span>
        </div>
      </div>
    </article>
  `).join('');

  // Attach card click handlers for fullscreen case study expansion
  const cards = gridContainer.querySelectorAll('.project-blueprint-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-id');
      const project = PROJECTS.find(p => p.id === pid);
      if (project) openProjectModal(project);
    });
  });

  // Modal close handlers
  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('is-open')) {
      closeProjectModal();
    }
  });

  function openProjectModal(project) {
    if (!modalOverlay) return;

    document.getElementById('modal-project-num').textContent = `// ${project.num} · ${project.category}`;
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-overview').textContent = project.overview;
    document.getElementById('modal-project-objective').textContent = project.objective;
    document.getElementById('modal-project-learned').textContent = project.learned;
    document.getElementById('modal-project-status').textContent = project.status;

    const featuresList = document.getElementById('modal-project-features');
    if (featuresList) {
      featuresList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
    }

    const techPills = document.getElementById('modal-project-tech');
    if (techPills) {
      techPills.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function renderSchematicGraphic(type, title) {
  switch (type) {
    case 'ecommerce':
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="180" height="80" rx="8" stroke="#46D9D2" stroke-width="1.5" stroke-dasharray="4 4" fill="rgba(70,217,210,0.03)"/>
          <circle cx="60" cy="60" r="18" stroke="#8DF2CF" stroke-width="1.5"/>
          <path d="M52 60L58 66L68 54" stroke="#8DF2CF" stroke-width="2" stroke-linecap="round"/>
          <line x1="95" y1="48" x2="175" y2="48" stroke="#EAF4F0" stroke-width="2" stroke-linecap="round"/>
          <line x1="95" y1="62" x2="150" y2="62" stroke="rgba(234,244,240,0.4)" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="95" y1="74" x2="130" y2="74" stroke="#46D9D2" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
    case 'fitness':
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="15" width="160" height="90" rx="10" stroke="#756BFF" stroke-width="1.5" fill="rgba(117,107,255,0.03)"/>
          <path d="M45 65L75 65L85 40L100 80L115 50L130 65L175 65" stroke="#8DF2CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="100" cy="80" r="4" fill="#FF9275"/>
          <circle cx="115" cy="50" r="4" fill="#8DF2CF"/>
        </svg>
      `;
    case 'roadmap':
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="60" x2="190" y2="60" stroke="rgba(234,244,240,0.2)" stroke-width="2"/>
          <line x1="30" y1="60" x2="130" y2="60" stroke="#8DF2CF" stroke-width="2"/>
          <circle cx="50" cy="60" r="8" fill="#07151A" stroke="#8DF2CF" stroke-width="2"/>
          <circle cx="110" cy="60" r="8" fill="#07151A" stroke="#8DF2CF" stroke-width="2"/>
          <circle cx="170" cy="60" r="8" fill="#07151A" stroke="#756BFF" stroke-width="2" stroke-dasharray="2 2"/>
          <text x="50" y="85" text-anchor="middle" fill="#8DF2CF" font-size="9" font-family="monospace">Y1:BASE</text>
          <text x="110" y="85" text-anchor="middle" fill="#8DF2CF" font-size="9" font-family="monospace">Y2:BUILD</text>
          <text x="170" y="85" text-anchor="middle" fill="#756BFF" font-size="9" font-family="monospace">Y3:AI/ML</text>
        </svg>
      `;
    case 'blueprint-ride':
    case 'blueprint-parking':
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="20" width="70" height="40" rx="4" stroke="#46D9D2" stroke-width="1.5" fill="rgba(70,217,210,0.05)"/>
          <text x="60" y="44" text-anchor="middle" fill="#46D9D2" font-size="8" font-family="monospace">DFD [0.0]</text>
          <path d="M95 40H125V80H145" stroke="#EAF4F0" stroke-width="1.5" stroke-dasharray="3 3"/>
          <rect x="145" y="60" width="55" height="40" rx="4" stroke="#8DF2CF" stroke-width="1.5" fill="rgba(141,242,207,0.05)"/>
          <text x="172" y="84" text-anchor="middle" fill="#8DF2CF" font-size="8" font-family="monospace">IEEE 830</text>
        </svg>
      `;
    case 'examprep':
    default:
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="25" width="45" height="70" rx="4" stroke="#8DF2CF" stroke-width="1.5" fill="rgba(141,242,207,0.05)"/>
          <rect x="85" y="25" width="45" height="70" rx="4" stroke="#46D9D2" stroke-width="1.5" fill="rgba(70,217,210,0.05)"/>
          <rect x="140" y="25" width="45" height="70" rx="4" stroke="#756BFF" stroke-width="1.5" fill="rgba(117,107,255,0.05)"/>
          <text x="52" y="62" text-anchor="middle" fill="#8DF2CF" font-size="8" font-family="monospace">STUDY</text>
          <text x="107" y="62" text-anchor="middle" fill="#46D9D2" font-size="8" font-family="monospace">EXAM</text>
          <text x="162" y="62" text-anchor="middle" fill="#756BFF" font-size="8" font-family="monospace">QUIZ</text>
        </svg>
      `;
  }
}
