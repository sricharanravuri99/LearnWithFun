/* =============================================
   DEVOPS LEARNING PAGE — ANIMATIONS
   ============================================= */

function onVisible(id, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { fn(); obs.disconnect(); }
  }, { threshold: 0.25 });
  obs.observe(el);
}

onVisible('s1', initDevopsCompare);
onVisible('s2', initCICD);
onVisible('s3', initDocker);
onVisible('s4', initK8s);

/* ── S1: Old vs DevOps ── */
function initDevopsCompare() {
  const wrap = document.getElementById('devopsCompareCanvas');
  if (!wrap) return;
  const { ctx, W, H } = makeCanvas(wrap);

  const oldStages = ['Dev writes code', 'Hand off to QA', 'QA tests (weeks)', 'Hand off to Ops', 'Ops deploys (days)', 'Incident → blame'];
  const newStages = ['Commit code', 'Auto tests (<5 min)', 'Auto build+scan', 'Auto deploy (staging)', 'Auto to prod', 'Monitor + fix fast'];
  const colors = ['#f87171', '#f87171', '#f87171', '#fb923c', '#fb923c', '#f87171'];
  const newColors = ['#22d3a5', '#22d3a5', '#22d3a5', '#22d3a5', '#22d3a5', '#22d3a5'];

  const cw = W / 2;
  const lineH = 34;
  const startY = 48;

  function header(label, x, color) {
    ctx.fillStyle = color + '18';
    roundRect(ctx, x + 6, 10, cw - 12, 34, 8); ctx.fill();
    ctx.strokeStyle = color + '50'; ctx.lineWidth = 1;
    roundRect(ctx, x + 6, 10, cw - 12, 34, 8); ctx.stroke();
    ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = color; ctx.textAlign = 'center';
    ctx.fillText(label, x + cw / 2, 32);
  }

  header('❌  Old Way', 0, '#f87171');
  header('✅  DevOps Way', cw, '#22d3a5');

  [oldStages, newStages].forEach((stages, side) => {
    const ox = side * cw;
    const palette = side === 0 ? colors : newColors;
    stages.forEach((s, i) => {
      const y = startY + i * lineH;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent';
      roundRect(ctx, ox + 8, y, cw - 16, lineH - 3, 6); ctx.fill();

      ctx.font = '11px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = palette[i];
      ctx.textAlign = 'left';
      ctx.fillText(s, ox + 18, y + 18);

      if (i < stages.length - 1) {
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(ox + cw / 2, y + lineH - 3);
        ctx.lineTo(ox + cw / 2, y + lineH + 2);
        ctx.stroke(); ctx.setLineDash([]);
      }
    });
  });

  // Middle divider
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.moveTo(cw, 0); ctx.lineTo(cw, H); ctx.stroke();
  ctx.setLineDash([]);
}

/* ── S2: CI/CD Pipeline ── */
function initCICD() {
  const wrap = document.getElementById('cicdCanvas');
  const runBtn = document.getElementById('cicdRunBtn');
  const resetBtn = document.getElementById('cicdResetBtn');
  if (!wrap) return;
  const { ctx, W, H } = makeCanvas(wrap);

  const stages = [
    { label: 'Commit', icon: '📝', color: '#7c6fff' },
    { label: 'Build',  icon: '🔨', color: '#22d3ee' },
    { label: 'Test',   icon: '✅', color: '#22d3a5' },
    { label: 'Scan',   icon: '🔍', color: '#fbbf24' },
    { label: 'Deploy', icon: '🚀', color: '#f472b6' },
  ];

  const stepEls = Array.from({ length: 5 }, (_, i) => document.getElementById(`cicd${i}`));
  let current = -1;
  let interval = null;

  const bW = 64, bH = 54;
  const gap = (W - stages.length * bW) / (stages.length + 1);
  const startY = (H - bH) / 2 - 10;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    stages.forEach((s, i) => {
      const x = gap + i * (bW + gap);
      const state = i < current ? 'done' : (i === current ? 'active' : 'idle');

      // Arrow between stages
      if (i > 0) {
        const prevX = gap + (i - 1) * (bW + gap) + bW;
        const arrowX = prevX + (x - prevX) / 2;
        ctx.strokeStyle = state === 'idle' ? 'rgba(255,255,255,0.1)' : s.color + '80';
        ctx.lineWidth = 1.5;
        ctx.setLineDash(state === 'idle' ? [3, 3] : []);
        ctx.beginPath(); ctx.moveTo(prevX + 2, startY + bH / 2);
        ctx.lineTo(x - 2, startY + bH / 2); ctx.stroke();
        ctx.setLineDash([]);
        // Arrowhead
        ctx.fillStyle = state === 'idle' ? 'rgba(255,255,255,0.1)' : s.color + '80';
        ctx.beginPath();
        ctx.moveTo(x - 2, startY + bH / 2);
        ctx.lineTo(x - 8, startY + bH / 2 - 4);
        ctx.lineTo(x - 8, startY + bH / 2 + 4);
        ctx.closePath(); ctx.fill();
      }

      // Box
      const alpha = state === 'idle' ? '10' : (state === 'done' ? '25' : '35');
      ctx.fillStyle = s.color + alpha;
      roundRect(ctx, x, startY, bW, bH, 12); ctx.fill();
      ctx.strokeStyle = state === 'idle' ? 'rgba(255,255,255,0.08)' : s.color + (state === 'active' ? 'cc' : '60');
      ctx.lineWidth = state === 'active' ? 2 : 1;
      roundRect(ctx, x, startY, bW, bH, 12); ctx.stroke();

      // Glow on active
      if (state === 'active') {
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 16;
        roundRect(ctx, x, startY, bW, bH, 12); ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.font = '18px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = state === 'idle' ? 'rgba(255,255,255,0.2)' : '#fff';
      ctx.fillText(state === 'done' ? '✓' : s.icon, x + bW / 2, startY + 24);

      ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = state === 'idle' ? 'rgba(255,255,255,0.3)' : s.color;
      ctx.fillText(s.label, x + bW / 2, startY + 44);
    });

    // Status line
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    if (current === -1) {
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fillText('Ready — click Run Pipeline', W / 2, startY + bH + 36);
    } else if (current < stages.length) {
      ctx.fillStyle = stages[current].color;
      ctx.fillText(`Running: ${stages[current].label}...`, W / 2, startY + bH + 36);
    } else {
      ctx.fillStyle = '#22d3a5';
      ctx.fillText('✓  Pipeline complete — deployed to production!', W / 2, startY + bH + 36);
    }
  }

  function step() {
    if (current < stages.length) {
      stepEls.forEach((el, i) => el && el.classList.toggle('active', i === current));
      current++;
      draw();
      if (current >= stages.length) {
        stepEls.forEach(el => el && el.classList.remove('active'));
        clearInterval(interval); interval = null;
        runBtn.textContent = '▶ Run Again';
      }
    }
  }

  runBtn && runBtn.addEventListener('click', () => {
    if (interval) return;
    current = 0; draw();
    interval = setInterval(step, 900);
  });

  resetBtn && resetBtn.addEventListener('click', () => {
    clearInterval(interval); interval = null;
    current = -1;
    stepEls.forEach(el => el && el.classList.remove('active'));
    runBtn.textContent = '▶ Run Pipeline';
    draw();
  });

  draw();
}

/* ── S3: VM vs Container ── */
function initDocker() {
  const wrap = document.getElementById('dockerCanvas');
  if (!wrap) return;
  const { ctx, W, H } = makeCanvas(wrap);

  const cw = W / 2;

  function drawStack(ox, label, layers, highlight) {
    const lH = 30;
    const startY = H - 20;

    ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = highlight;
    ctx.textAlign = 'center';
    ctx.fillText(label, ox + cw / 2, 22);

    layers.forEach((l, i) => {
      const y = startY - (layers.length - i) * (lH + 4);
      const alpha = l.shared ? '15' : '28';
      ctx.fillStyle = l.color + alpha;
      roundRect(ctx, ox + 12, y, cw - 24, lH, 7); ctx.fill();
      ctx.strokeStyle = l.shared ? l.color + '25' : l.color + '70';
      ctx.lineWidth = 1;
      roundRect(ctx, ox + 12, y, cw - 24, lH, 7); ctx.stroke();

      ctx.font = l.shared ? '10px Plus Jakarta Sans' : 'bold 10px Plus Jakarta Sans';
      ctx.fillStyle = l.shared ? 'rgba(255,255,255,0.4)' : l.color;
      ctx.textAlign = 'center';
      ctx.fillText(l.label, ox + cw / 2, y + 19);
    });
  }

  // VM side
  drawStack(0, '🖥️  Virtual Machines', [
    { label: 'Hardware', color: '#7c6fff', shared: false },
    { label: 'Hypervisor', color: '#7c6fff', shared: false },
    { label: 'Guest OS (full, ~1 GB)', color: '#f87171', shared: false },
    { label: 'Binaries / Libraries', color: '#f87171', shared: false },
    { label: 'App A', color: '#fbbf24', shared: false },
    { label: 'Guest OS (full, ~1 GB)', color: '#f87171', shared: false },
    { label: 'Binaries / Libraries', color: '#f87171', shared: false },
    { label: 'App B', color: '#fbbf24', shared: false },
  ], '#7c6fff');

  // Container side
  drawStack(cw, '🐳  Containers', [
    { label: 'Hardware', color: '#22d3a5', shared: true },
    { label: 'Host OS (shared kernel)', color: '#22d3ee', shared: false },
    { label: 'Docker Engine', color: '#22d3ee', shared: false },
    { label: 'Libs A (small)', color: '#22d3a5', shared: false },
    { label: 'App A', color: '#fbbf24', shared: false },
    { label: 'Libs B (small)', color: '#22d3a5', shared: false },
    { label: 'App B', color: '#fbbf24', shared: false },
  ], '#22d3a5');

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.moveTo(cw, 0); ctx.lineTo(cw, H); ctx.stroke();
  ctx.setLineDash([]);

  // Size labels
  ctx.font = 'bold 10px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f87171';
  ctx.fillText('~2–8 GB each, ~60s start', cw / 2, H - 4);
  ctx.fillStyle = '#22d3a5';
  ctx.fillText('~100 MB each, <1s start', cw + cw / 2, H - 4);
}

/* ── S4: Kubernetes cluster ── */
function initK8s() {
  const wrap = document.getElementById('k8sCanvas');
  const resetBtn = document.getElementById('k8sResetBtn');
  if (!wrap) return;
  const { canvas, ctx, W, H } = makeCanvas(wrap);

  const pods = [
    { label: 'web-1', color: '#22d3a5', status: 'running', x: 0.18, y: 0.35 },
    { label: 'web-2', color: '#22d3a5', status: 'running', x: 0.38, y: 0.35 },
    { label: 'web-3', color: '#22d3a5', status: 'running', x: 0.58, y: 0.35 },
    { label: 'api-1', color: '#22d3ee', status: 'running', x: 0.28, y: 0.65 },
    { label: 'api-2', color: '#22d3ee', status: 'running', x: 0.52, y: 0.65 },
    { label: 'db-1',  color: '#fbbf24', status: 'running', x: 0.78, y: 0.5  },
  ];

  const pR = 28;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Cluster border
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    roundRect(ctx, 10, 10, W - 20, H - 26, 16); ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.textAlign = 'left';
    ctx.fillText('K8s Cluster', 18, 26);

    // Load balancer
    const lbX = W * 0.05, lbY = H * 0.5 - 18;
    ctx.fillStyle = 'rgba(124,111,255,0.18)';
    roundRect(ctx, lbX, lbY, 60, 36, 8); ctx.fill();
    ctx.strokeStyle = '#7c6fff60'; ctx.lineWidth = 1;
    roundRect(ctx, lbX, lbY, 60, 36, 8); ctx.stroke();
    ctx.font = 'bold 8px Plus Jakarta Sans'; ctx.fillStyle = '#a78bfa';
    ctx.textAlign = 'center';
    ctx.fillText('Load', lbX + 30, lbY + 14);
    ctx.fillText('Balancer', lbX + 30, lbY + 26);

    // Lines from LB to web pods
    pods.filter(p => p.label.startsWith('web')).forEach(p => {
      ctx.strokeStyle = p.status === 'failed' ? 'rgba(248,113,113,0.2)' : 'rgba(34,211,165,0.2)';
      ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(lbX + 60, lbY + 18);
      ctx.lineTo(p.x * W, p.y * H - pR);
      ctx.stroke(); ctx.setLineDash([]);
    });

    // Pods
    pods.forEach(pod => {
      const px = pod.x * W, py = pod.y * H;
      const status = pod.status;
      const color = status === 'failed' ? '#f87171' : (status === 'restarting' ? '#fbbf24' : pod.color);

      ctx.beginPath(); ctx.arc(px, py, pR, 0, Math.PI * 2);
      ctx.fillStyle = color + '18'; ctx.fill();
      ctx.strokeStyle = color + (status === 'running' ? '80' : 'ff');
      ctx.lineWidth = status === 'running' ? 1 : 2;
      ctx.stroke();

      if (status === 'restarting') {
        ctx.shadowColor = '#fbbf24'; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(px, py, pR, 0, Math.PI * 2); ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = color; ctx.textAlign = 'center';
      ctx.fillText(pod.label, px, py + 3);

      const statusText = status === 'running' ? '▶' : (status === 'failed' ? '✗' : '↺');
      ctx.font = '9px Plus Jakarta Sans'; ctx.fillStyle = color;
      ctx.fillText(statusText, px, py + 15);
    });

    // Hint
    ctx.font = '9px Plus Jakarta Sans'; ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.textAlign = 'center';
    ctx.fillText('Click any pod to simulate failure — watch K8s restart it', W / 2, H - 6);
  }

  let healTimers = {};

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const my = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;

    pods.forEach((pod, i) => {
      const dist = Math.hypot(mx - pod.x * W, my - pod.y * H);
      if (dist < pR && pod.status === 'running') {
        pod.status = 'failed';
        draw();
        clearTimeout(healTimers[i]);
        healTimers[i] = setTimeout(() => {
          pod.status = 'restarting'; draw();
          healTimers[i] = setTimeout(() => { pod.status = 'running'; draw(); }, 1200);
        }, 800);
      }
    });
  });

  resetBtn && resetBtn.addEventListener('click', () => {
    Object.values(healTimers).forEach(clearTimeout);
    healTimers = {};
    pods.forEach(p => p.status = 'running');
    draw();
  });

  draw();
}

/* ── Shared roundRect helper ── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
