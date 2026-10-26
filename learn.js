/* =============================================
   SHARED LEARN PAGE JS
   - Scroll progress bar
   - Nav dot activation
   - Scroll-triggered entrance animations
   ============================================= */

// Scroll progress
const spFill = document.getElementById('spFill');
window.addEventListener('scroll', () => {
  if (!spFill) return;
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  spFill.style.width = `${Math.round(progress * 100)}%`;
}, { passive: true });

// Nav dot activation via IntersectionObserver
const dots = document.querySelectorAll('.nav-dot');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.dataset.dot);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.learn-section[data-dot]').forEach(s => sectionObserver.observe(s));

// Entrance animations
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-in').forEach(el => animObserver.observe(el));

// Utility: create a DPR-aware canvas inside a container
function makeCanvas(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.innerHTML = '';
  container.appendChild(canvas);
  const dpr = window.devicePixelRatio || 1;
  const W = container.offsetWidth || 480;
  const H = container.offsetHeight || 300;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { canvas, ctx, W, H };
}
