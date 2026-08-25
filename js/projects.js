/**
 * Finalized Project Archive & Case Study Expansion (Exact 5 Projects)
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

export const PROJECTS = [
  {
    id: "freshbasket",
    num: "01",
    title: "FreshBasket",
    category: "WEB / E-COMMERCE",
    status: "COMPLETED",
    badge: "COMPLETED",
    description: "A modern fruit e-commerce website focused on creating a smooth and visually engaging online shopping experience.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap 5", "localStorage"],
    positioning: "FreshBasket represents my foundation in web development and interactive product building.",
    schematicType: "ecommerce",
    systemFlow: ["BROWSE CATALOG", "ADD TO CART", "LOCALSTORAGE SYNC", "CHECKOUT FLOW", "ADMIN CONCEPT"],
    overview: "FreshBasket was built to master client-side state synchronization, UI reactivity, and clean DOM manipulation without relying on heavy frameworks. It demonstrates how persistent browser storage can manage multi-item checkouts, coupon codes, and dynamic inventory states with high visual fidelity.",
    objective: "Create a modern, intuitive, high-performance fruit commerce platform with instant cart reactivity and zero server dependency for cart persistence.",
    features: [
      "Dark mode & light theme toggle with CSS custom property variables",
      "Glassmorphism UI styling with responsive high-contrast layouts",
      "localStorage cart persistence preserving items and quantities across sessions",
      "Dynamic product catalog with category filtering and real-time search",
      "Shopping cart drawer with live subtotal, tax calculations, and quantity adjustments",
      "Responsive interface optimized across mobile, tablet, and wide desktop viewports",
      "Admin panel concept for client-side product management"
    ],
    learned: "Mastered vanilla JavaScript DOM manipulation, event delegation, JSON data serialization with localStorage, and modular CSS layout architecture."
  },
  {
    id: "gymflex",
    num: "02",
    title: "GymFlex",
    category: "MOBILE / FITNESS / SMART DEVICES",
    status: "IN DEVELOPMENT",
    badge: "IN DEVELOPMENT",
    description: "GymFlex is my fitness application concept and development project focused on combining workout planning, diet logging, fitness progress and connected smart-device experiences.",
    tech: ["React Native", "Expo", "Firebase", "Bluetooth LE", "Health Sensors"],
    positioning: "GymFlex represents my transition from web development into mobile applications, connected devices and intelligent fitness experiences.",
    schematicType: "fitness-smart",
    systemFlow: ["SMART WATCH", "BLUETOOTH", "GYMFLEX APP", "FIREBASE", "FITNESS DATA", "PERSONALIZATION"],
    overview: "GymFlex is engineered as a unified health ecosystem bridging mobile workout tracking with real-time biometric telemetry from smartwatches and fitness wearables over Bluetooth. It centralizes progressive overload logging, nutritional balance, and telemetry analytics.",
    objective: "Consolidate health data, live workout tracking, nutritional balance, and smart-device synchronization into one synchronized mobile experience.",
    features: [
      "Workout planning: Interactive split creation (Push/Pull/Legs, Upper/Lower) [IN DEVELOPMENT]",
      "Diet logging: Daily caloric and macronutrient tracking with custom meal creation [IN DEVELOPMENT]",
      "Fitness progress: Visual strength trends, 1RM trajectory, and body weight logs [IN DEVELOPMENT]",
      "Smart-watch & Wearable integration: Telemetry sync via Bluetooth Low Energy [PLANNED]",
      "Bluetooth connectivity: Sensor data streaming for heart rate and active burn [PLANNED]",
      "Firebase Cloud backend: Secure user authentication, profile sync, and workout cloud history [IN DEVELOPMENT]",
      "Personalized fitness experience: Dynamic progression targets based on historical workout volume [FUTURE]"
    ],
    learned: "Architecting cross-platform components in React Native, managing asynchronous device storage, mobile performance profiling, Bluetooth LE protocols, and Firebase synchronization."
  },
  {
    id: "lpuquick",
    num: "03",
    title: "LPUQuick",
    category: "CAMPUS / QUICK COMMERCE / STUDENT PLATFORM",
    status: "PRODUCT CONCEPT / DEVELOPMENT",
    badge: "CONCEPT / DEV",
    description: "LPUQuick is a campus-focused quick-commerce product concept designed around the everyday needs of Lovely Professional University students.",
    tech: ["React / Web", "Mobile UI", "Firebase / DBMS", "Geolocation", "Payment Gateway Concept"],
    positioning: "LPUQuick demonstrates my ability to identify real problems within the student/campus environment and think about them as scalable digital products.",
    schematicType: "campus-quick",
    systemFlow: ["STUDENT", "HOSTEL / BLOCK", "PRODUCTS", "CART", "PAYMENT", "LIVE ORDER", "CAMPUS DELIVERY"],
    overview: "Designed specifically for the micro-economy of university campuses, LPUQuick solves delivery delays and retail fragmentation by enabling block-wise and hostel-wise instant ordering of daily student essentials.",
    objective: "Streamline campus retail logistics with hyper-local delivery mapping, vendor dashboards, and student-friendly pricing structures.",
    productCategories: [
      "Snacks & Beverages", "Groceries & Instant Meals", "Stationery & Academic Supplies",
      "Personal-care Essentials", "Fresh Food", "Campus Merchandise", "Daily Necessities"
    ],
    features: [
      "Hostel / Block selection: Tailored delivery routing to specific campus residence halls [IN DEVELOPMENT]",
      "Campus delivery & Live order tracking: Real-time status updates from dispatch to doorstep [IN DEVELOPMENT]",
      "Digital payment integration concept: Fast student wallet and UPI checkouts [PLANNED]",
      "Student offers & discount engine: Micro-promotions tied to university seasons [PLANNED]",
      "Categorized catalog: 7 core categories tailored for university lifestyle [IN DEVELOPMENT]",
      "Vendor dashboard & Inventory management: Stock alerts and merchant order queue [PLANNED]",
      "Admin control panel: Campus zone dispatch and delivery telemetry [PLANNED]",
      "AI Recommendation Engine: AI-powered product recommendations based on user purchase patterns [FUTURE / PLANNED]"
    ],
    learned: "Hyper-local marketplace architecture, role-based multi-tier interfaces (Student / Vendor / Admin), delivery queue algorithms, and product-market fit analysis."
  },
  {
    id: "srs-ride-booking",
    num: "04",
    title: "SRS — Ride Booking System",
    category: "SOFTWARE ENGINEERING / SYSTEM DESIGN",
    status: "ACADEMIC / COMPLETED",
    badge: "COMPLETED",
    description: "A formal Software Requirements Specification for a Ride Booking System following IEEE Std 830-1998 standards.",
    tech: ["LaTeX", "Overleaf", "TikZ", "IEEE 830-1998", "DFD Modeling"],
    positioning: "Demonstrates my understanding of requirements engineering, system analysis and software design.",
    schematicType: "srs-ride",
    systemFlow: ["USER", "RIDE REQUEST", "SYSTEM DISPATCH", "DRIVER MATCH", "BOOKING", "CONFIRMATION"],
    overview: "A comprehensive IEEE Std 830-1998 compliant requirements specification for an on-demand multi-tier urban ride-hailing and dispatch system.",
    objective: "Formulate unambiguous functional requirements, data flow hierarchies, security constraints, and external interface specifications for large-scale distributed dispatch.",
    features: [
      "Functional requirements: Ride requests, surge pricing calculation, live GPS tracking, and trip settlement",
      "System requirements: Scalability parameters, 99.9% uptime SLA, latency constraints (<500ms dispatch)",
      "Requirements analysis: Stakeholder matrix, use-case models, and exception handling trees",
      "Data Flow Diagrams (DFDs): Level-0 Context Diagram, Level-1 System DFD, and Level-2 Dispatch DFDs in TikZ",
      "System design: State-transition diagrams capturing driver-passenger matching lifecycle",
      "Technical documentation: Structured academic LaTeX typesetting with formal mathematical notation"
    ],
    learned: "Formal engineering documentation standards, precision requirements authoring, structural ambiguity elimination, and TikZ vector schematic drafting."
  },
  {
    id: "srs-spothero",
    num: "05",
    title: "SRS — SpotHero Parking Reservation",
    category: "SOFTWARE ENGINEERING / SYSTEM DESIGN",
    status: "ACADEMIC / COMPLETED",
    badge: "COMPLETED",
    description: "A formal Software Requirements Specification for a parking reservation system following IEEE Std 830-1998 standards.",
    tech: ["LaTeX", "Overleaf", "TikZ Schematics", "IEEE 830-1998", "System Architecture"],
    positioning: "Demonstrates requirements engineering, system thinking and the ability to translate a real-world problem into a structured software system.",
    schematicType: "srs-parking",
    systemFlow: ["USER", "SEARCH PARKING", "AVAILABLE SLOT", "RESERVATION", "PAYMENT", "CONFIRMATION"],
    overview: "Formal software specification detailing the architecture, slot occupancy algorithms, payment gateways, and telemetry pipelines for urban parking spot reservation.",
    objective: "Define end-to-end system interactions between mobile drivers, garage sensor IoT gates, and cloud reservation ledgers under concurrent booking loads.",
    features: [
      "Requirements specification: Complete IEEE Std 830-1998 software requirements baseline",
      "Functional requirements: Geospatial search, live slot reservation, barrier QR validation, and extensions",
      "Parking reservation flow: Atomicity rules preventing concurrent double-booking of identical slots",
      "System design: IoT gate sensor interfaces and cloud ledger sync protocols",
      "TikZ Data Flow Diagrams: Level-0, Level-1, and Level-2 architectural schemas",
      "Technical documentation: Comprehensive validation matrices ensuring 100% testable specifications"
    ],
    learned: "Concurrent transaction analysis, hardware-software interface boundaries, structured engineering modeling, and academic LaTeX authoring."
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
          ${renderSchematicGraphic(p.schematicType)}
        </div>
      </div>
      <div class="project-card-body">
        <div class="project-card-meta">
          <span class="project-index">// ${p.num}</span>
          <span class="project-category-badge">${p.category}</span>
        </div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-description">${p.description}</p>
        
        <!-- System Flow Mini-Track -->
        <div class="project-mini-flow">
          <span class="mini-flow-label">PIPELINE:</span>
          <span class="mini-flow-path">${p.systemFlow.join(' → ')}</span>
        </div>

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

    // Positioning callout
    const posEl = document.getElementById('modal-project-positioning');
    if (posEl) posEl.textContent = project.positioning;

    // System Flow
    const flowEl = document.getElementById('modal-project-flow');
    if (flowEl) {
      flowEl.innerHTML = project.systemFlow.map((step, idx) => `
        <span class="modal-flow-step">${step}</span>
        ${idx < project.systemFlow.length - 1 ? '<span class="modal-flow-arrow">→</span>' : ''}
      `).join('');
    }

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

function renderSchematicGraphic(type) {
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
    case 'fitness-smart':
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="20" width="50" height="80" rx="10" stroke="#8DF2CF" stroke-width="1.5" fill="rgba(141,242,207,0.04)"/>
          <path d="M35 50H65M35 70H55" stroke="#8DF2CF" stroke-width="1.5" stroke-linecap="round"/>
          <!-- Bluetooth wave -->
          <path d="M90 60L100 50L100 70L90 60" stroke="#46D9D2" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M100 50L106 56L96 66" stroke="#46D9D2" stroke-width="1.5"/>
          <rect x="120" y="15" width="75" height="90" rx="8" stroke="#756BFF" stroke-width="1.5" fill="rgba(117,107,255,0.04)"/>
          <path d="M130 65L145 65L152 45L160 75L168 55L175 65L185 65" stroke="#8DF2CF" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
    case 'campus-quick':
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="25" width="45" height="70" rx="6" stroke="#FF9275" stroke-width="1.5" fill="rgba(255,146,117,0.04)"/>
          <text x="42" y="63" text-anchor="middle" fill="#FF9275" font-size="8" font-family="monospace">HOSTEL</text>
          <path d="M68 60H95" stroke="#46D9D2" stroke-width="1.5" stroke-dasharray="2 2"/>
          <circle cx="110" cy="60" r="15" stroke="#8DF2CF" stroke-width="1.5" fill="rgba(141,242,207,0.04)"/>
          <text x="110" y="63" text-anchor="middle" fill="#8DF2CF" font-size="7" font-family="monospace">EXPRESS</text>
          <path d="M128 60H155" stroke="#46D9D2" stroke-width="1.5" stroke-dasharray="2 2"/>
          <rect x="158" y="25" width="45" height="70" rx="6" stroke="#756BFF" stroke-width="1.5" fill="rgba(117,107,255,0.04)"/>
          <text x="180" y="63" text-anchor="middle" fill="#756BFF" font-size="8" font-family="monospace">DELIVERY</text>
        </svg>
      `;
    case 'srs-ride':
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="65" height="38" rx="4" stroke="#46D9D2" stroke-width="1.5" fill="rgba(70,217,210,0.05)"/>
          <text x="52" y="43" text-anchor="middle" fill="#46D9D2" font-size="8" font-family="monospace">USER (0.1)</text>
          <path d="M88 39H115V80H135" stroke="#EAF4F0" stroke-width="1.5" stroke-dasharray="3 3"/>
          <rect x="135" y="60" width="65" height="38" rx="4" stroke="#8DF2CF" stroke-width="1.5" fill="rgba(141,242,207,0.05)"/>
          <text x="167" y="83" text-anchor="middle" fill="#8DF2CF" font-size="8" font-family="monospace">DRIVER (0.2)</text>
          <text x="110" y="108" text-anchor="middle" fill="rgba(234,244,240,0.4)" font-size="7" font-family="monospace">IEEE 830 SPEC</text>
        </svg>
      `;
    case 'srs-parking':
    default:
      return `
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="80" height="80" rx="6" stroke="#756BFF" stroke-width="1.5" stroke-dasharray="4 4"/>
          <rect x="30" y="30" width="25" height="25" rx="3" stroke="#8DF2CF" stroke-width="1.5" fill="rgba(141,242,207,0.1)"/>
          <text x="42" y="46" text-anchor="middle" fill="#8DF2CF" font-size="8" font-family="monospace">P1</text>
          <rect x="65" y="30" width="25" height="25" rx="3" stroke="#FF9275" stroke-width="1.5"/>
          <text x="77" y="46" text-anchor="middle" fill="#FF9275" font-size="8" font-family="monospace">OCC</text>
          <rect x="30" y="65" width="25" height="25" rx="3" stroke="#8DF2CF" stroke-width="1.5" fill="rgba(141,242,207,0.1)"/>
          <text x="42" y="81" text-anchor="middle" fill="#8DF2CF" font-size="8" font-family="monospace">P2</text>
          <path d="M110 60H140" stroke="#46D9D2" stroke-width="1.5"/>
          <rect x="145" y="35" width="55" height="50" rx="4" stroke="#46D9D2" stroke-width="1.5" fill="rgba(70,217,210,0.05)"/>
          <text x="172" y="63" text-anchor="middle" fill="#46D9D2" font-size="8" font-family="monospace">LEDGER</text>
        </svg>
      `;
  }
}
