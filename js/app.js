/**
 * Main Application Orchestrator
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

import { initCustomCursor } from './cursor.js';
import { initNavigation } from './nav.js';
import { initHeroSequence } from './hero.js';
import { initBuildCore } from './buildCore.js';
import { initSkillsMatrix } from './skills.js';
import { initProjectsArchive } from './projects.js';
import { initBuildLog } from './buildLog.js';
import { initNextHorizon } from './horizon.js';
import { initContactActions } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initCustomCursor();
  initNavigation();
  initHeroSequence();
  initBuildCore();
  initSkillsMatrix();
  initProjectsArchive();
  initBuildLog();
  initNextHorizon();
  initContactActions();

  // Scroll reveal observer for general content sections
  const revealElements = document.querySelectorAll('.anim-fade-up');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => scrollObserver.observe(el));
});
