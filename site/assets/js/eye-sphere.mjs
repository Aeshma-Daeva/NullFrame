const root = document.querySelector('[data-eye-sphere]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (root && !reduceMotion.matches) {
  const pupil = root.querySelector('[data-pupil]');
  const eye = root.querySelector('[data-eye]');
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let raf = 0;

  const clamp = (value) => Math.max(-1, Math.min(1, value));

  const updateTarget = (event) => {
    const rect = eye?.getBoundingClientRect() ?? root.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    targetX = clamp((event.clientX - centerX) / Math.max(rect.width * 0.85, 1));
    targetY = clamp((event.clientY - centerY) / Math.max(rect.height * 1.1, 1));
  };

  const settle = () => {
    targetX = 0;
    targetY = 0;
  };

  const tick = () => {
    currentX += (targetX - currentX) * 0.085;
    currentY += (targetY - currentY) * 0.085;

    root.style.setProperty('--pupil-x', `${(currentX * 17).toFixed(2)}px`);
    root.style.setProperty('--pupil-y', `${(currentY * 10).toFixed(2)}px`);
    root.style.setProperty('--sphere-tilt-y', `${(currentX * 4.2).toFixed(2)}deg`);
    root.style.setProperty('--sphere-tilt-x', `${(-currentY * 3.2).toFixed(2)}deg`);
    root.style.setProperty('--signal-shift', `${(currentX * 10).toFixed(2)}px`);

    raf = requestAnimationFrame(tick);
  };

  window.addEventListener('pointermove', updateTarget, { passive: true });
  document.documentElement.addEventListener('pointerleave', settle);
  window.addEventListener('blur', settle);
  raf = requestAnimationFrame(tick);

  reduceMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    cancelAnimationFrame(raf);
    settle();
    root.style.removeProperty('--pupil-x');
    root.style.removeProperty('--pupil-y');
    root.style.removeProperty('--sphere-tilt-y');
    root.style.removeProperty('--sphere-tilt-x');
    root.style.removeProperty('--signal-shift');
  }, { once: true });
}
