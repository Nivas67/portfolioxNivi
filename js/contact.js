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
  if (viewCvBtn) {
    viewCvBtn.addEventListener('click', (e) => {
      // If a resume file is added at assets/resume.pdf, it will open, otherwise scroll to contact
      const resumeUrl = 'assets/resume.pdf';
      fetch(resumeUrl, { method: 'HEAD' })
        .then(res => {
          if (res.ok) window.open(resumeUrl, '_blank');
          else {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        })
        .catch(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
  }
}
