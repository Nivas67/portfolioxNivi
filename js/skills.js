/**
 * My Skills & Capability Cards Module (Synchronized with CV)
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const TECHNICAL_SKILLS = [
  {
    name: "Python",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 6 4.5 6 6v3h6v2H5c-2.5 0-3 1.5-3 5s1 5 3.5 5H8v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5-1 2.5-2.5V6c0-2-1.5-4-6-4z"/><circle cx="9" cy="5.5" r="0.75" fill="currentColor"/><path d="M12 22c5.52 0 6-2.5 6-4.5v-3h-6v-2h7c2.5 0 3-1.5 3-5s-1-5-3.5-5H16v2.5c0 1.5-1 2.5-2.5 2.5h-5c-1.5 0-2.5 1-2.5 2.5V18c0 2 1.5 4 6 4z"/><circle cx="15" cy="18.5" r="0.75" fill="currentColor"/></svg>`
  },
  {
    name: "C / C++",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 7.5A6.5 6.5 0 1 0 16.5 16.5"/><polyline points="19 12 16 12"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>`
  },
  {
    name: "React.js",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`
  },
  {
    name: "Tailwind CSS",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12c.5-2.5 2.5-4 5-4 3 0 4.5 2 6 3.5 1.5 1.5 3 2.5 5 2.5M2 17c.5-2.5 2.5-4 5-4 3 0 4.5 2 6 3.5 1.5 1.5 3 2.5 5 2.5"/></svg>`
  },
  {
    name: "HTML5 / CSS3 / JS",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`
  },
  {
    name: "Node.js & Express",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>`
  },
  {
    name: "MySQL & PostgreSQL",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
  },
  {
    name: "MongoDB & Supabase",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s-6 6-6 12a6 6 0 0 0 12 0c0-6-6-12-6-12z"/><path d="M12 2v20"/></svg>`
  },
  {
    name: "Git & GitHub",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 15V9a9 9 0 0 0-9-9"/><line x1="6" y1="9" x2="6" y2="15"/></svg>`
  }
];

const SOFT_SKILLS = [
  {
    name: "Problem Solving",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/><path d="M12 6v3M10 8l2-2 2 2"/></svg>`
  },
  {
    name: "Team Collaboration",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    name: "Time Management",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  },
  {
    name: "Communication Skills",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>`
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
