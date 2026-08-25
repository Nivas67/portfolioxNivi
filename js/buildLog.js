/**
 * Build Log Terminal Module
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const LOG_ENTRIES = [
  { text: "portfolio initialized", type: "normal" },
  { text: "Python foundations active", type: "accent" },
  { text: "DSA foundations active", type: "normal" },
  { text: "FreshBasket built [Web / E-Commerce]", type: "highlight" },
  { text: "GymFlex in development [Mobile + Smart Devices]", type: "highlight" },
  { text: "LPUQuick concept mapped [Campus Quick-Commerce]", type: "highlight" },
  { text: "software systems documented [IEEE Std 830]", type: "normal" },
  { text: "AI/ML → next", type: "accent" },
  { text: "next_target: AI/ML ENGINEER", type: "target" }
];

export function initBuildLog() {
  const terminalBody = document.getElementById('terminal-log-body');
  const section = document.getElementById('build-log');
  if (!terminalBody || !section) return;

  let hasTriggered = false;

  const now = new Date();
  const yearStr = now.getFullYear();
  const timestampPrefix = `[${yearStr}]`;

  function streamLogs() {
    if (hasTriggered) return;
    hasTriggered = true;

    terminalBody.innerHTML = '';

    LOG_ENTRIES.forEach((entry, idx) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'log-line';
        
        let contentClass = 'log-content';
        if (entry.type === 'accent') contentClass += ' is-accent';
        if (entry.type === 'highlight') contentClass += ' is-highlight';
        if (entry.type === 'target') contentClass += ' is-target';

        line.innerHTML = `
          <span class="log-timestamp">${timestampPrefix}</span>
          <span class="${contentClass}">&gt; ${entry.text}</span>
        `;
        terminalBody.appendChild(line);

        // Trigger animation
        requestAnimationFrame(() => {
          line.classList.add('is-rendered');
          terminalBody.scrollTop = terminalBody.scrollHeight;
        });

        // Add final prompt line on completion
        if (idx === LOG_ENTRIES.length - 1) {
          setTimeout(() => {
            const promptLine = document.createElement('div');
            promptLine.className = 'terminal-prompt-line';
            promptLine.innerHTML = `
              <span>nivas@lab:~$</span>
              <span class="terminal-cursor"></span>
            `;
            terminalBody.appendChild(promptLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }, 350);
        }
      }, idx * 250);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      streamLogs();
    }
  }, { threshold: 0.25 });

  observer.observe(section);
}
