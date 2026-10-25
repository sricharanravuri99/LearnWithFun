/* =============================================
   NAV SCROLL EFFECT
   ============================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* =============================================
   PARTICLE CANVAS
   ============================================= */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const COUNT = 90;
  const COLORS = ['#7c6fff', '#a78bfa', '#c084fc', '#f472b6', '#22d3ee'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.pulse += 0.02;
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x -= (dx / dist) * 0.5;
        this.y -= (dy / dist) * 0.5;
      }
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset(false);
    }
    draw() {
      const alpha = this.opacity * (0.75 + Math.sin(this.pulse) * 0.25);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.12;
          ctx.strokeStyle = '#7c6fff';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* =============================================
   ANIMATED STAT COUNTERS
   ============================================= */
function animateCounter(el, target, suffix) {
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(ease * target);
    el.textContent = value >= 1000 ? (value / 1000).toFixed(value < 10000 ? 1 : 0) + 'k' : value;
    if (suffix) el.textContent += suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => statsObserver.observe(el));

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

function addReveal(selectors) {
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  });
}
addReveal(['.track-card', '.game-card', '.step', '.testimonial', '.section-title', '.section-sub']);

/* =============================================
   TERMINAL TYPEWRITER LOOP
   ============================================= */
(function terminalLoop() {
  const lines = [
    { type: 'cmd', text: 'start-quest --track devops' },
    { type: 'out', text: '🔄 Loading DevOps Pipeline Quest...' },
    { type: 'out', text: '✅ Docker Basics — <green>COMPLETED</green>' },
    { type: 'out', text: '✅ Kubernetes 101 — <green>COMPLETED</green>' },
    { type: 'out', text: '🎯 CI/CD Pipelines — <yellow>IN PROGRESS</yellow>' },
    { type: 'pause', text: '' },
    { type: 'clear', text: '' },
    { type: 'cmd', text: 'start-quest --track security' },
    { type: 'out', text: '🔐 Loading Security CTF Quest...' },
    { type: 'out', text: '✅ OWASP Top 10 — <green>COMPLETED</green>' },
    { type: 'out', text: '🎯 SQL Injection Lab — <yellow>IN PROGRESS</yellow>' },
    { type: 'out', text: '🔒 XSS Challenge — <blue>UNLOCKED</blue>' },
    { type: 'pause', text: '' },
    { type: 'clear', text: '' },
    { type: 'cmd', text: 'check-progress --all' },
    { type: 'out', text: '📊 Cloud: 68% complete — <yellow>Level 4</yellow>' },
    { type: 'out', text: '🔐 Security: 42% complete — <yellow>Level 2</yellow>' },
    { type: 'out', text: '🔄 DevOps: 55% complete — <yellow>Level 3</yellow>' },
    { type: 'out', text: '🏆 Total XP: <green>4,280 pts</green> — Keep going!' },
    { type: 'pause', text: '' },
    { type: 'clear', text: '' },
  ];

  const body = document.getElementById('terminalBody');
  if (!body) return;

  let lineIndex = 0;

  function renderLine(line) {
    const div = document.createElement('div');
    div.className = 't-line';
    if (line.type === 'cmd') {
      div.innerHTML = `<span class="t-prompt">$</span><span class="t-cmd"> ${line.text}</span>`;
    } else if (line.type === 'out') {
      const formatted = line.text
        .replace(/<green>(.*?)<\/green>/g, '<span class="t-green">$1</span>')
        .replace(/<yellow>(.*?)<\/yellow>/g, '<span class="t-yellow">$1</span>')
        .replace(/<blue>(.*?)<\/blue>/g, '<span class="t-blue">$1</span>');
      div.innerHTML = `<span class="t-output">${formatted}</span>`;
    }
    return div;
  }

  function nextLine() {
    const line = lines[lineIndex % lines.length];
    lineIndex++;

    if (line.type === 'pause') {
      setTimeout(nextLine, 2200);
      return;
    }

    if (line.type === 'clear') {
      body.innerHTML = '';
      setTimeout(nextLine, 300);
      return;
    }

    const el = renderLine(line);
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;

    const delay = line.type === 'cmd' ? 600 : 350;
    setTimeout(nextLine, delay);
  }

  // Reset initial content and start loop
  body.innerHTML = '';
  setTimeout(nextLine, 800);
})();

/* =============================================
   TRACK CARD TILT EFFECT
   ============================================= */
document.querySelectorAll('.track-card, .game-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
});

/* =============================================
   HAMBURGER MENU
   ============================================= */
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    if (navLinks) {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(5,5,8,0.97)';
      navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
      navLinks.style.padding = '12px 24px';
      navLinks.style.backdropFilter = 'blur(20px)';
    }
  });
}

/* =============================================
   ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        a.style.background = a.getAttribute('href') === `#${id}` ? 'rgba(124,111,255,0.1)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
