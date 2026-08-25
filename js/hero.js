/**
 * Cinematic Hero Sequence & Telemetry Status
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

export function initHeroSequence() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const revealElements = heroSection.querySelectorAll('.anim-fade-up');
  
  // Staggered reveal upon initial page load
  setTimeout(() => {
    revealElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 120);
    });
  }, 100);

  // Live real-time clock telemetry
  const timeDisplay = document.getElementById('hero-live-time');
  if (timeDisplay) {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString().split(' ')[4] + ' UTC';
      timeDisplay.textContent = utcString;
    };
    updateTime();
    setInterval(updateTime, 1000);
  }
}
