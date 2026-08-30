/**
 * Verified Certifications & Credentials Matrix
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

export const CERTIFICATIONS = [
  {
    id: "saylor-cs205-ai",
    num: "01",
    title: "CS205: Building with Artificial Intelligence",
    issuer: "Saylor Academy",
    issuerTag: "ACADEMIC ACCREDITATION",
    date: "February 9, 2026",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    badge: "VERIFIED ACCREDITED",
    certId: "4831994964PL",
    duration: "48 Hours · 4.8 CEUs · Grade: 70.59%",
    image: "assets/certificates/saylor_building_ai.png",
    verifyUrl: "https://www.saylor.org/",
    description: "Rigorous academic certification covering foundational AI concepts, prompt engineering, generative architectures, machine learning workflows, and practical AI application development.",
    skills: ["Artificial Intelligence", "Prompt Engineering", "Neural Concepts", "Applied AI", "CEU Accredited"],
    syllabus: [
      "Core principles of artificial intelligence and automated reasoning",
      "Building and testing applications using generative AI models",
      "Prompt engineering methodologies and zero/few-shot architectures",
      "Ethics, safety guidelines, and production validation for AI models"
    ]
  },
  {
    id: "infosys-intro-ai",
    num: "02",
    title: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    issuerTag: "INDUSTRY ACCREDITED",
    date: "March 30, 2026",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    badge: "VERIFIED ENTERPRISE",
    certId: "INF-AI-2026-03",
    duration: "Enterprise Foundation Track",
    image: "assets/certificates/infosys_intro_to_ai.png",
    verifyUrl: "https://verify.onwingspan.com",
    description: "Industry-aligned foundational course by Infosys covering artificial intelligence paradigms, search strategies, knowledge representation, reasoning systems, and machine intelligence.",
    skills: ["AI Fundamentals", "Knowledge Representation", "Search Strategies", "Machine Intelligence"],
    syllabus: [
      "Search and optimization algorithms in AI problem solving",
      "Knowledge graphs, symbolic reasoning, and semantic structures",
      "Supervised vs Unsupervised learning paradigms and real-world cases",
      "Enterprise deployment fundamentals for AI systems"
    ]
  },
  {
    id: "iamneo-programming-150h",
    num: "03",
    title: "Certificate of Appreciation — Computer Programming (150h)",
    issuer: "iamneo (NIIT Venture) & LPU",
    issuerTag: "UNIVERSITY & INDUSTRY",
    date: "Jan 18 — May 20, 2026",
    category: "programming",
    categoryLabel: "Programming & Python",
    badge: "150-HOUR DISTINCTION",
    certId: "13BH1CI2ce6Af0Dg3Bh1",
    duration: "150 Hours Intensive Hands-On Lab",
    image: "assets/certificates/iamneo_programming_150h.png",
    verifyUrl: "https://iamneo.ai",
    description: "Prestigious 150-hour computer programming immersion awarded for demonstrating strong commitment, consistency, and technical excellence across complex algorithmic problem sets.",
    skills: ["Computer Programming", "Data Structures", "Algorithmic Speed", "150h Lab Immersion"],
    syllabus: [
      "150 Hours of intensive live competitive coding and algorithmic labs",
      "Dynamic memory management, pointers, and low-level optimization",
      "Advanced problem-solving with complex edge cases and runtime limits",
      "Rigorous test-case benchmarking and code maintainability standards"
    ]
  },
  {
    id: "infosys-python-part1",
    num: "04",
    title: "Programming Fundamentals using Python — Part 1",
    issuer: "Infosys Springboard",
    issuerTag: "INDUSTRY ACCREDITED",
    date: "June 24, 2026",
    category: "programming",
    categoryLabel: "Programming & Python",
    badge: "VERIFIED ENTERPRISE",
    certId: "INF-PY1-2026",
    duration: "Python Foundation Core",
    image: "assets/certificates/infosys_python_part1.png",
    verifyUrl: "https://verify.onwingspan.com",
    description: "Comprehensive enterprise-grade foundation in Python programming covering computational thinking, structured data handling, loops, conditions, and algorithmic logic.",
    skills: ["Python 3", "Control Flow", "Data Collections", "Algorithmic Logic"],
    syllabus: [
      "Python data types, operators, and expression evaluation",
      "Control structures: Nested branching, loops, and iterations",
      "Sequences: Lists, Tuples, Sets, and Dictionary manipulation",
      "Modular programming with functions, scope, and namespace management"
    ]
  },
  {
    id: "infosys-python-part2",
    num: "05",
    title: "Programming Fundamentals using Python — Part 2",
    issuer: "Infosys Springboard",
    issuerTag: "INDUSTRY ACCREDITED",
    date: "June 29, 2026",
    category: "programming",
    categoryLabel: "Programming & Python",
    badge: "VERIFIED ENTERPRISE",
    certId: "INF-PY2-2026",
    duration: "Advanced Python & OOP",
    image: "assets/certificates/infosys_python_part2.png",
    verifyUrl: "https://verify.onwingspan.com",
    description: "Advanced Python engineering covering Object-Oriented Programming (OOP), inheritance, encapsulation, custom exception handling, file streams, and recursive problem solving.",
    skills: ["OOP Python", "Inheritance & Polymorphism", "Exception Architecture", "File Streams"],
    syllabus: [
      "Class design, encapsulation, data hiding, and abstraction",
      "Single and multi-level inheritance, method overriding, and polymorphism",
      "Robust error handling, custom exception hierarchies, and assertions",
      "File I/O pipelines and serialization workflows in Python"
    ]
  },
  {
    id: "upgrad-dsa-leadership",
    num: "06",
    title: "Leadership Course — Data Structures & Algorithms (Series I)",
    issuer: "upGrad Education",
    issuerTag: "ACADEMIC SEAL",
    date: "October 2025",
    category: "dsa",
    categoryLabel: "Data Structures & Algorithms",
    badge: "LEADERSHIP SERIES",
    certId: "UPG-DSA-2025",
    duration: "DSA Masterclass Series",
    image: "assets/certificates/upgrad_dsa_leadership.png",
    verifyUrl: "https://www.upgrad.com",
    description: "Rigorous training in foundational computer science data structures, asymptotic time-space analysis, linked list operations, queues, stacks, and search-sort algorithms.",
    skills: ["Data Structures", "Asymptotic Analysis", "Stacks & Queues", "Memory Efficiency"],
    syllabus: [
      "Asymptotic complexity analysis: Big-O, Omega, and Theta notations",
      "Linear data structures: Singly & Doubly Linked Lists, Stacks, Queues",
      "Searching and sorting algorithms with empirical runtime benchmarking",
      "Algorithmic design patterns for resource-constrained environments"
    ]
  }
];

export function initCertificationsMatrix() {
  const gridContainer = document.getElementById('certifications-grid');
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const modalOverlay = document.getElementById('cert-modal-overlay');
  const modalCloseBtn = document.getElementById('cert-modal-close');

  if (!gridContainer) return;

  let activeCategory = 'all';

  function renderCards() {
    const filtered = activeCategory === 'all' 
      ? CERTIFICATIONS 
      : CERTIFICATIONS.filter(c => c.category === activeCategory);

    gridContainer.innerHTML = filtered.map(cert => `
      <article class="cert-credential-card" data-id="${cert.id}">
        <div class="cert-preview-wrapper">
          <img src="${cert.image}" alt="${cert.title} Certificate" class="cert-card-img" loading="lazy">
          <div class="cert-img-overlay"></div>
          <div class="cert-issuer-badge">
            <span class="status-dot"></span>
            <span>${cert.issuerTag}</span>
          </div>
          <div class="cert-view-hint">
            <span>VIEW CREDENTIAL ↗</span>
          </div>
        </div>

        <div class="cert-card-content">
          <div class="cert-meta-row">
            <span class="cert-index">// ${cert.num}</span>
            <span class="cert-issuer-name">${cert.issuer}</span>
          </div>

          <h3 class="cert-title">${cert.title}</h3>
          
          <p class="cert-desc">${cert.description}</p>

          <div class="cert-stats-row">
            <span class="cert-stat-item">📅 ${cert.date}</span>
            <span class="cert-stat-item">⏱ ${cert.duration}</span>
          </div>

          <div class="cert-skills-pills">
            ${cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('')}
          </div>

          <div class="cert-card-footer">
            <span class="cert-badge-status">
              <span class="status-dot"></span>
              ${cert.badge}
            </span>
            <span class="cert-click-cta">INSPECT ↗</span>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to cards
    const cards = gridContainer.querySelectorAll('.cert-credential-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const certId = card.getAttribute('data-id');
        const cert = CERTIFICATIONS.find(c => c.id === certId);
        if (cert) openCertModal(cert);
      });
    });
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCategory = btn.getAttribute('data-category');
      renderCards();
    });
  });

  // Modal open & close
  function openCertModal(cert) {
    if (!modalOverlay) return;

    document.getElementById('modal-cert-num').textContent = `// ${cert.num} · ${cert.categoryLabel}`;
    document.getElementById('modal-cert-title').textContent = cert.title;
    document.getElementById('modal-cert-issuer').textContent = cert.issuer;
    document.getElementById('modal-cert-date').textContent = cert.date;
    document.getElementById('modal-cert-duration').textContent = cert.duration;
    document.getElementById('modal-cert-id').textContent = cert.certId;
    document.getElementById('modal-cert-desc').textContent = cert.description;
    
    const imgEl = document.getElementById('modal-cert-img');
    if (imgEl) {
      imgEl.src = cert.image;
      imgEl.alt = `${cert.title} Certificate Full Preview`;
    }

    const verifyLink = document.getElementById('modal-cert-verify-link');
    if (verifyLink) {
      verifyLink.href = cert.verifyUrl;
    }

    const skillsContainer = document.getElementById('modal-cert-skills');
    if (skillsContainer) {
      skillsContainer.innerHTML = cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('');
    }

    const syllabusList = document.getElementById('modal-cert-syllabus');
    if (syllabusList) {
      syllabusList.innerHTML = cert.syllabus.map(item => `<li>${item}</li>`).join('');
    }

    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    modalOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeCertModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCertModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('is-open')) {
      closeCertModal();
    }
  });

  // Initial render
  renderCards();
}
