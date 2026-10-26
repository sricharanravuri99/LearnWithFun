/* =============================================
   CLOUD LEARNING PAGE — ANIMATIONS
   ============================================= */

function onVisible(id, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { fn(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(el);
}

/* ── S1: On-premises vs Cloud compare ── */
onVisible('s1', initCloudCompare);
onVisible('s2', initPyramid);
onVisible('s4', initScaling);

function initCloudCompare() {
  const wrap = document.getElementById('cloudCompareCanvas');
  if (!wrap) return;
  const { ctx, W, H } = makeCanvas(wrap);

  const cols = [
    { label: 'On-Premises', icon: '🏢', color: '#f87171', items: ['Buy servers', 'Build data center', 'Hire sysadmins', 'Pay upfront', 'Wait 6 months', 'Fixed capacity'] },
    { label: 'Cloud', icon: '☁️', color: '#22d3ee', items: ['Click → provision', 'Global in minutes', 'Managed for you', 'Pay per second', 'Live in hours', 'Scale unlimited'] }
  ];

  const cw = W / 2;
  const lineH = 32;

  cols.forEach((col, ci) => {
    const x = ci * cw;
    const cx = x + cw / 2;

    // Header
    ctx.fillStyle = col.color + '20';
    roundRect(ctx, x + 8, 12, cw - 16, 44, 10);
    ctx.fill();
    ctx.strokeStyle = col.color + '50';
    ctx.lineWidth = 1;
    roundRect(ctx, x + 8, 12, cw - 16, 44, 10);
    ctx.stroke();

    ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = col.color;
    ctx.textAlign = 'center';
    ctx.fillText(col.icon + '  ' + col.label, cx, 40);

    col.items.forEach((item, i) => {
      const y = 80 + i * lineH;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent';
      roundRect(ctx, x + 10, y - 2, cw - 20, lineH - 2, 6);
      ctx.fill();

      ctx.font = '11px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = i < 2 ? col.color : 'rgba(255,255,255,0.65)';
      ctx.textAlign = 'left';
      ctx.fillText((ci === 0 ? '✗ ' : '✓ ') + item, x + 22, y + 16);
    });
  });

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
  ctx.stroke(); ctx.setLineDash([]);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── S2: IaaS / PaaS / SaaS pyramid ── */
function initPyramid() {
  const wrap = document.getElementById('pyramidCanvas');
  if (!wrap) return;
  const { canvas, ctx, W, H } = makeCanvas(wrap);

  const layers = [
    { label: 'SaaS', sub: 'Software as a Service', eg: 'Gmail, Salesforce, Slack', color: '#7c6fff', you: 'Use the app', them: 'Everything else', pct: 0.28 },
    { label: 'PaaS', sub: 'Platform as a Service', eg: 'Heroku, Vercel, App Engine', color: '#22d3ee', you: 'Code + Data', them: 'Runtime, OS, Infra', pct: 0.48 },
    { label: 'IaaS', sub: 'Infrastructure as a Service', eg: 'AWS EC2, Azure VMs, GCP GCE', color: '#22d3a5', you: 'OS + Runtime + Code', them: 'Hardware, Network', pct: 0.72 },
  ];

  let selected = -1;
  const rowH = 72;
  const startY = (H - layers.length * rowH) / 2;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    layers.forEach((l, i) => {
      const y = startY + i * rowH;
      const isSelected = selected === i;
      const w = W * l.pct;
      const x = (W - w) / 2;

      // Bar
      ctx.fillStyle = isSelected ? l.color + '40' : l.color + '15';
      roundRect(ctx, x, y + 4, w, rowH - 10, 10);
      ctx.fill();
      ctx.strokeStyle = isSelected ? l.color : l.color + '40';
      ctx.lineWidth = isSelected ? 1.5 : 1;
      roundRect(ctx, x, y + 4, w, rowH - 10, 10);
      ctx.stroke();

      // Label
      ctx.font = 'bold 14px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = l.color;
      ctx.textAlign = 'center';
      ctx.fillText(l.label, W / 2, y + 24);

      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(l.eg, W / 2, y + 40);

      if (isSelected) {
        ctx.font = '11px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('You manage: ' + l.you, W / 2, y + 55);
      }
    });
  }

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const my = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;
    layers.forEach((l, i) => {
      const y = startY + i * rowH;
      if (my >= y && my <= y + rowH) selected = (selected === i ? -1 : i);
    });
    draw();
  });

  draw();
}

/* ── S4: Auto-scaling ── */
function initScaling() {
  const wrap = document.getElementById('scalingCanvas');
  const slider = document.getElementById('trafficSlider');
  const valEl = document.getElementById('trafficVal');
  if (!wrap || !slider) return;
  const { ctx, W, H } = makeCanvas(wrap);

  function draw(traffic) {
    ctx.clearRect(0, 0, W, H);
    const needed = Math.max(1, Math.ceil(traffic / 20));
    const maxServers = 5;

    // Title
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.textAlign = 'center';
    ctx.fillText(`CPU Load: ${traffic}%  →  ${needed} active server${needed > 1 ? 's' : ''}`, W / 2, 24);

    // Load balancer box
    const lbW = 100, lbH = 36;
    const lbX = W / 2 - lbW / 2;
    const lbY = 44;
    ctx.fillStyle = 'rgba(124,111,255,0.15)';
    roundRect(ctx, lbX, lbY, lbW, lbH, 8); ctx.fill();
    ctx.strokeStyle = '#7c6fff80';
    ctx.lineWidth = 1;
    roundRect(ctx, lbX, lbY, lbW, lbH, 8); ctx.stroke();
    ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#a78bfa'; ctx.textAlign = 'center';
    ctx.fillText('Load Balancer', W / 2, lbY + 22);

    // Servers
    const serversY = 120;
    const sW = 56, sH = 60;
    const totalW = maxServers * sW + (maxServers - 1) * 14;
    const startX = (W - totalW) / 2;

    for (let i = 0; i < maxServers; i++) {
      const sx = startX + i * (sW + 14);
      const active = i < needed;
      const color = active ? '#22d3a5' : '#2a2a3a';
      const textColor = active ? '#22d3a5' : '#44445a';

      // Line from LB
      ctx.strokeStyle = active ? '#22d3a540' : '#1e1e2a';
      ctx.lineWidth = active ? 1.5 : 1;
      ctx.setLineDash(active ? [] : [3, 3]);
      ctx.beginPath();
      ctx.moveTo(W / 2, lbY + lbH);
      ctx.lineTo(sx + sW / 2, serversY - 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Server box
      ctx.fillStyle = active ? 'rgba(34,211,165,0.1)' : 'rgba(255,255,255,0.02)';
      roundRect(ctx, sx, serversY, sW, sH, 10); ctx.fill();
      ctx.strokeStyle = active ? '#22d3a550' : 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      roundRect(ctx, sx, serversY, sW, sH, 10); ctx.stroke();

      ctx.font = 'bold 16px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = active ? '#22d3a5' : '#2e2e45';
      ctx.textAlign = 'center';
      ctx.fillText('🖥️', sx + sW / 2, serversY + 26);
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = textColor;
      ctx.fillText(active ? 'ACTIVE' : 'IDLE', sx + sW / 2, serversY + 46);

      if (active) {
        ctx.font = '8px JetBrains Mono, monospace';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(Math.round(traffic / needed) + '%', sx + sW / 2, serversY + 57);
      }
    }

    // Cost bar
    const costY = serversY + sH + 22;
    ctx.font = '10px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.textAlign = 'left';
    ctx.fillText('Cost (active servers only)', 20, costY);
    ctx.fillStyle = '#fbbf2420';
    roundRect(ctx, 20, costY + 8, W - 40, 12, 4); ctx.fill();
    ctx.fillStyle = '#fbbf24';
    roundRect(ctx, 20, costY + 8, (W - 40) * (needed / maxServers), 12, 4); ctx.fill();
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'right';
    ctx.fillText(`$${(needed * 0.023).toFixed(3)}/hr`, W - 20, costY + 19);
  }

  slider.addEventListener('input', () => {
    const v = parseInt(slider.value);
    valEl.textContent = v + '%';
    draw(v);
  });

  draw(parseInt(slider.value));
}
