/**
 * Contact & Collaboration Module
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

export function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyHint = document.getElementById('copy-email-hint');

  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'nivasnaidu07@gmail.com';
      
      navigator.clipboard.writeText(email).then(() => {
        if (copyHint) {
          const orig = copyHint.textContent;
          copyHint.textContent = 'COPIED TO CLIPBOARD ✓ (nivasnaidu07@gmail.com)';
          copyHint.style.color = 'var(--color-electric-mint)';
          setTimeout(() => {
            copyHint.textContent = orig;
            copyHint.style.color = '';
          }, 3500);
        }
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  const viewCvBtn = document.getElementById('view-cv-btn');
  const cvModalOverlay = document.getElementById('cv-modal-overlay');
  const cvModalClose = document.getElementById('cv-modal-close');

  if (viewCvBtn && cvModalOverlay) {
    viewCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cvModalOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    if (cvModalClose) {
      cvModalClose.addEventListener('click', () => {
        cvModalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }

    cvModalOverlay.addEventListener('click', (e) => {
      if (e.target === cvModalOverlay) {
        cvModalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cvModalOverlay.classList.contains('is-open')) {
        cvModalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
}
