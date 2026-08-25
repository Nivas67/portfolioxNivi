/**
 * Next Horizon Progression Path Module
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const HORIZON_STEPS = [
  { step: "01", title: "FOUNDATIONS" },
  { step: "02", title: "SOFTWARE" },
  { step: "03", title: "DATA" },
  { step: "04", title: "MACHINE LEARNING" },
  { step: "05", title: "INTELLIGENT PRODUCTS" },
  { step: "06", title: "AI/ML ENGINEER" }
];

export function initNextHorizon() {
  const container = document.getElementById('horizon-flow-container');
  if (!container) return;

  container.innerHTML = HORIZON_STEPS.map((s, index) => `
    <div class="horizon-step-node" data-index="${index}">
      <span class="core-node-step">// STEP ${s.step}</span>
      <h4>${s.title}</h4>
    </div>
  `).join('');

  const nodes = container.querySelectorAll('.horizon-step-node');

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      nodes.forEach((node, idx) => {
        setTimeout(() => {
          node.classList.add('is-active');
        }, idx * 180);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(container);
}
