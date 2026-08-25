/**
 * Floating Navigation & Active Section Observer
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

export function initNavigation() {
  const headerNav = document.getElementById('header-nav');
  const navLinks = document.querySelectorAll('.nav-link-item a');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  // Scroll morphing
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      headerNav?.classList.add('is-scrolled');
    } else {
      headerNav?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Active section observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}
