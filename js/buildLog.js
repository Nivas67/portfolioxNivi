/**
 * Build Log Terminal Module
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const LOG_ENTRIES = [
  { text: "initializing digital laboratory environment...", type: "normal" },
  { text: "loading candidate profile: Pemma Lakshmi Nivas (CSE · AI/ML)", type: "normal" },
  { text: "Python execution engine loaded [v3.12]", type: "accent" },
  { text: "DSA algorithmic core active (Trees, Graphs, DP)", type: "normal" },
  { text: "DBMS & relational schema pipeline mounted", type: "normal" },
  { text: "FreshBasket e-commerce web platform deployed", type: "highlight" },
  { text: "Gym & Fitness mobile prototype running on Expo", type: "highlight" },
  { text: "IEEE Std 830 software engineering specifications mapped", type: "normal" },
  { text: "embedded systems & electrical signals synchronized", type: "normal" },
  { text: "machine learning models & neural graphs → NEXT", type: "accent" },
  { text: "next_target: impactful_ai_applications", type: "target" }
];

export function initBuildLog() {
  const terminalBody = document.getElementById('terminal-log-body');
  const section = document.getElementById('build-log');
  if (!terminalBody || !section) return;

  let hasTriggered = false;

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '.');
  const timeStr = now.toTimeString().slice(0, 5);
  const timestampPrefix = `[${dateStr} ${timeStr}]`;

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
              <span>lakshmi-nivas@lab:~$</span>
              <span class="terminal-cursor"></span>
            `;
            terminalBody.appendChild(promptLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }, 400);
        }
      }, idx * 280);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      streamLogs();
    }
  }, { threshold: 0.25 });

  observer.observe(section);
}
