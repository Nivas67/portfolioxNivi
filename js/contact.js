/**
 * Contact & Collaboration Module
 * P. LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

const PORTFOLIO_EMAIL = 'nivasnaidu07@gmail.com';

export function initContactActions() {
  initCollaborateSectionCopy();
  initCustomContactMeForm();
  initCvModal();
}

/**
 * Handle 07. Collaborate Section (Original Portfolio Channels)
 */
function initCollaborateSectionCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyHint = document.getElementById('copy-email-hint');

  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(PORTFOLIO_EMAIL).then(() => {
        if (copyHint) {
          const orig = copyHint.textContent;
          copyHint.textContent = `COPIED TO CLIPBOARD ✓ (${PORTFOLIO_EMAIL})`;
          copyHint.style.color = 'var(--color-electric-mint)';
          setTimeout(() => {
            copyHint.textContent = orig;
            copyHint.style.color = '';
          }, 3500);
        }
      }).catch(() => {
        window.location.href = `mailto:${PORTFOLIO_EMAIL}`;
      });
    });
  }
}

/**
 * Handle 08. Contact Me Section (Themed Form)
 */
function initCustomContactMeForm() {
  // Quick Copy Email
  const copyBtn = document.getElementById('contact-me-copy-btn');
  const toast = document.getElementById('contact-me-copy-toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(PORTFOLIO_EMAIL).then(() => {
        if (toast) {
          toast.classList.add('is-shown');
          setTimeout(() => {
            toast.classList.remove('is-shown');
          }, 2500);
        }
      }).catch(() => {
        window.location.href = `mailto:${PORTFOLIO_EMAIL}`;
      });
    });
  }

  // Character Counter
  const msgTextarea = document.getElementById('contact-sender-msg');
  const counter = document.getElementById('sender-msg-counter');
  if (msgTextarea && counter) {
    msgTextarea.addEventListener('input', () => {
      const len = msgTextarea.value.length;
      counter.textContent = `${len} / 1000`;
      if (len >= 950) {
        counter.style.color = 'var(--color-warm-signal)';
      } else if (len > 0) {
        counter.style.color = 'var(--color-electric-mint)';
      } else {
        counter.style.color = 'var(--color-mineral-dim)';
      }
    });
  }

  // Form Submission
  const form = document.getElementById('contact-me-form');
  const submitBtn = document.getElementById('contact-me-submit-btn');
  const feedbackBanner = document.getElementById('contact-me-feedback');

  const nameInput = document.getElementById('contact-sender-name');
  const emailInput = document.getElementById('contact-sender-email');
  const nameError = document.getElementById('sender-name-error');
  const emailError = document.getElementById('sender-email-error');
  const msgError = document.getElementById('sender-msg-error');

  if (!form || !submitBtn) return;

  // Clear errors on user input
  [nameInput, emailInput, msgTextarea].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const errEl = document.getElementById(
        input === nameInput ? 'sender-name-error' :
        input === emailInput ? 'sender-email-error' : 'sender-msg-error'
      );
      if (errEl) {
        errEl.classList.remove('is-visible');
        errEl.textContent = '';
      }
      if (feedbackBanner) {
        feedbackBanner.style.display = 'none';
        feedbackBanner.className = 'contact-me-feedback-banner';
        feedbackBanner.textContent = '';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      isValid = false;
      showInputError(nameInput, nameError, 'Please enter your name.');
    }

    // Validate Email
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      isValid = false;
      showInputError(emailInput, emailError, 'Please enter your email.');
    } else if (!emailRegex.test(emailVal)) {
      isValid = false;
      showInputError(emailInput, emailError, 'Please enter a valid email address.');
    }

    // Validate Message
    const msgVal = msgTextarea ? msgTextarea.value.trim() : '';
    if (!msgVal) {
      isValid = false;
      showInputError(msgTextarea, msgError, 'Please enter your message.');
    }

    if (!isValid) return;

    // Loading State
    const btnLabel = submitBtn.querySelector('.btn-send-label');
    const origLabel = btnLabel ? btnLabel.textContent : 'Send Message';

    submitBtn.classList.add('is-loading');
    if (btnLabel) btnLabel.textContent = 'Sending...';

    const subject = `Portfolio Inquiry from ${nameVal}`;
    const body = `Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${msgVal}\n\n---\nSent from P. Lakshmi Nivas Portfolio Contact Form`;

    // Copy to clipboard backup
    const copyContent = `To: ${PORTFOLIO_EMAIL}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(copyContent).catch(() => {});

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.classList.add('is-success');
      if (btnLabel) btnLabel.textContent = '✓ Message Sent';

      if (feedbackBanner) {
        feedbackBanner.className = 'contact-me-feedback-banner is-success';
        feedbackBanner.innerHTML = `
          <strong>✓ Message dispatched & copied to clipboard!</strong><br>
          Opening your email client to send to <em>${PORTFOLIO_EMAIL}</em>.
        `;
      }

      // Open mail client
      const mailtoUrl = `mailto:${PORTFOLIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      // Reset after 4.5s
      setTimeout(() => {
        form.reset();
        submitBtn.classList.remove('is-success');
        if (btnLabel) btnLabel.textContent = origLabel;
        if (counter) {
          counter.textContent = '0 / 1000';
          counter.style.color = 'var(--color-mineral-dim)';
        }
      }, 4500);
    }, 700);
  });
}

function showInputError(input, errorEl, msg) {
  if (input) {
    input.classList.add('is-invalid');
    input.focus();
  }
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.add('is-visible');
  }
}

/**
 * CV / Resume Modal Management
 */
function initCvModal() {
  const cvModalOverlay = document.getElementById('cv-modal-overlay');
  const cvModalClose = document.getElementById('cv-modal-close');

  if (cvModalOverlay) {
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



