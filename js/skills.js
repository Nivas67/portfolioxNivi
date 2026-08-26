/**
 * My Skills & Capability Cards Module
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const TECHNICAL_SKILLS = [
  {
    name: "Python",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 6 4.5 6 6v3h6v2H5c-2.5 0-3 1.5-3 5s1 5 3.5 5H8v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5-1 2.5-2.5V6c0-2-1.5-4-6-4z"/><circle cx="9" cy="5.5" r="0.75" fill="currentColor"/><path d="M12 22c5.52 0 6-2.5 6-4.5v-3h-6v-2h7c2.5 0 3-1.5 3-5s-1-5-3.5-5H16v2.5c0 1.5-1 2.5-2.5 2.5h-5c-1.5 0-2.5 1-2.5 2.5V18c0 2 1.5 4 6 4z"/><circle cx="15" cy="18.5" r="0.75" fill="currentColor"/></svg>`
  },
  {
    name: "C",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 7.5A6.5 6.5 0 1 0 16.5 16.5"/><polyline points="19 12 16 12"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>`
  },
  {
    name: "Data Structures & Algorithms",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="6" cy="19" r="3"/><circle cx="18" cy="19" r="3"/><line x1="12" y1="8" x2="6" y2="16"/><line x1="12" y1="8" x2="18" y2="16"/></svg>`
  },
  {
    name: "Databases (SQL)",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
  },
  {
    name: "HTML / CSS / JavaScript",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`
  },
  {
    name: "Bootstrap 5",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 8h4.5a2 2 0 0 1 0 4H9V8z"/><path d="M9 12h5a2 2 0 0 1 0 4H9v-4z"/></svg>`
  },
  {
    name: "React Native",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`
  },
  {
    name: "Firebase",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18l4-15 4 7-2 3z"/><path d="M12 10l3-5 5 13-10 6-6-4z"/><path d="M15 14l-3-4-2 3z"/></svg>`
  },
  {
    name: "Embedded Systems",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/></svg>`
  }
];

const SOFT_SKILLS = [
  {
    name: "Problem-Solving & Critical Thinking",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/><path d="M12 6v3M10 8l2-2 2 2"/></svg>`
  },
  {
    name: "Communication",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>`
  },
  {
    name: "Collaboration & Teamwork",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    name: "Adaptability",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M22 11.5A10 10 0 0 0 3.2 7.2L2.5 8M2 12.5a10 10 0 0 0 18.8 4.3l.7.7"/></svg>`
  }
];

export function initSkillsMatrix() {
  const techContainer = document.getElementById('tech-skills-grid');
  const softContainer = document.getElementById('soft-skills-grid');

  if (techContainer) {
    techContainer.innerHTML = TECHNICAL_SKILLS.map((skill, index) => `
      <div class="skill-card stagger-card" style="transition-delay: ${index * 60}ms;">
        <div class="skill-card-icon">
          ${skill.icon}
        </div>
        <div class="skill-card-label">${skill.name}</div>
      </div>
    `).join('');
  }

  if (softContainer) {
    softContainer.innerHTML = SOFT_SKILLS.map((skill, index) => `
      <div class="skill-card stagger-card" style="transition-delay: ${(index + TECHNICAL_SKILLS.length) * 60}ms;">
        <div class="skill-card-icon">
          ${skill.icon}
        </div>
        <div class="skill-card-label">${skill.name}</div>
      </div>
    `).join('');
  }

  // Staggered reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.stagger-card').forEach((el) => {
    observer.observe(el);
  });
}
