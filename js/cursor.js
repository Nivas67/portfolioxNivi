/**
 * Custom Desktop Cursor System
 * PEMMA LAKSHMI NIVAS // DIGITAL LABORATORY & AI/ML PORTFOLIO
 */

export function initCustomCursor() {
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
    return;
  }

  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    // Interpolation (lerp) for smooth cinematic motion
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Attach interactive cursor states
  document.querySelectorAll('a, button, .interactive-btn').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering-btn');
      follower.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1.4)`;
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering-btn');
      follower.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1)`;
    });
  });

  document.querySelectorAll('.project-blueprint-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering-project');
      cursor.innerHTML = 'VIEW<br>BUILD ↗';
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering-project');
      cursor.innerHTML = '';
    });
  });

  document.querySelectorAll('[data-cursor="open"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering-link');
      cursor.innerHTML = 'OPEN ↗';
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering-link');
      cursor.innerHTML = '';
    });
  });
}
