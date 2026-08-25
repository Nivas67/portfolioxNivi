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
}
