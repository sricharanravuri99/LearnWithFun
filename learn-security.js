/* =============================================
   SECURITY LEARNING PAGE — ANIMATIONS
   ============================================= */

function onVisible(id, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { fn(); obs.disconnect(); }
  }, { threshold: 0.25 });
  obs.observe(el);
}

onVisible('s1', initCIA);
onVisible('s2', initPhish);
onVisible('s3', initAuthn);
onVisible('s4', initEncrypt);

/* ── S1: CIA Triad ── */
function initCIA() {
  const wrap = document.getElementById('ciCanvas');
  if (!wrap) return;
  const { canvas, ctx, W, H } = makeCanvas(wrap);

  const circles = [
    { label: 'Confidentiality', color: '#7c6fff', x: 0.38, y: 0.38, desc: 'Only authorised\nusers can see data' },
    { label: 'Integrity',       color: '#22d3a5', x: 0.62, y: 0.38, desc: 'Data cannot be\nmodified undetected' },
    { label: 'Availability',    color: '#f87171', x: 0.50, y: 0.60, desc: 'Systems accessible\nwhen needed' },
  ];

  const R = Math.min(W, H) * 0.26;
  let hovered = -1;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw three overlapping circles
    circles.forEach((c, i) => {
      const cx = c.x * W, cy = c.y * H;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = c.color + (hovered === i ? '28' : '12');
      ctx.fill();
      ctx.strokeStyle = c.color + (hovered === i ? 'cc' : '50');
      ctx.lineWidth = hovered === i ? 2 : 1;
      ctx.stroke();
    });

    // Centre overlap label
    ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('Security', W * 0.5, H * 0.48);

    // Labels
    circles.forEach((c, i) => {
      const cx = c.x * W, cy = c.y * H;
      const offsetX = (c.x - 0.5) * 28;
      const offsetY = c.y < 0.5 ? -R * 0.9 : R * 0.85;

      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = c.color;
      ctx.textAlign = 'center';
      ctx.fillText(c.label, cx + offsetX, cy + offsetY);

      if (hovered === i) {
        const lines = c.desc.split('\n');
        lines.forEach((line, li) => {
          ctx.font = '10px Plus Jakarta Sans';
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.fillText(line, cx + offsetX, cy + offsetY + 16 + li * 14);
        });
      }
    });

    // Examples in each zone
    const examples = [
      { text: 'Encryption\nAccess control', x: 0.3, y: 0.28 },
      { text: 'Checksums\nDigital signing', x: 0.7, y: 0.28 },
      { text: 'Redundancy\nBackups', x: 0.5, y: 0.75 },
    ];
    examples.forEach(e => {
      const lines = e.text.split('\n');
      lines.forEach((line, i) => {
        ctx.font = '9px JetBrains Mono';
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.textAlign = 'center';
        ctx.fillText(line, e.x * W, e.y * H + i * 12);
      });
    });
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const my = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;
    const prev = hovered;
    hovered = circles.findIndex(c => Math.hypot(mx - c.x * W, my - c.y * H) < R);
    if (hovered !== prev) draw();
  });

  canvas.addEventListener('mouseleave', () => { hovered = -1; draw(); });
  draw();
}

/* ── S2: Phishing attack diagram ── */
function initPhish() {
  const wrap = document.getElementById('phishCanvas');
  if (!wrap) return;
  const { ctx, W, H } = makeCanvas(wrap);

  const steps = [
    { icon: '👤', label: 'Attacker', sub: 'crafts fake email', color: '#f87171', x: 0.12, y: 0.25 },
    { icon: '📧', label: 'Fake Email', sub: '"Your account is at risk!"', color: '#fb923c', x: 0.38, y: 0.25 },
    { icon: '😟', label: 'Victim', sub: 'clicks link', color: '#fbbf24', x: 0.62, y: 0.25 },
    { icon: '🎭', label: 'Fake Site', sub: 'identical to real login', color: '#f87171', x: 0.62, y: 0.6 },
    { icon: '🔑', label: 'Credentials', sub: 'stolen by attacker', color: '#f87171', x: 0.38, y: 0.6 },
    { icon: '💥', label: 'Breach', sub: 'account compromised', color: '#f87171', x: 0.12, y: 0.6 },
  ];

  const arrows = [[0,1],[1,2],[2,3],[3,4],[4,5]];
  const nodeR = 26;

  arrows.forEach(([a, b]) => {
    const s = steps[a], t = steps[b];
    ctx.strokeStyle = 'rgba(248,113,113,0.35)'; ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(s.x * W, s.y * H); ctx.lineTo(t.x * W, t.y * H); ctx.stroke();
    ctx.setLineDash([]);
  });

  steps.forEach(s => {
    const x = s.x * W, y = s.y * H;
    ctx.beginPath(); ctx.arc(x, y, nodeR, 0, Math.PI * 2);
    ctx.fillStyle = s.color + '18'; ctx.fill();
    ctx.strokeStyle = s.color + '70'; ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = '18px Plus Jakarta Sans';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(s.icon, x, y + 6);

    ctx.font = 'bold 10px Plus Jakarta Sans';
    ctx.fillStyle = s.color;
    ctx.fillText(s.label, x, y + nodeR + 14);

    ctx.font = '9px Plus Jakarta Sans';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText(s.sub, x, y + nodeR + 26);
  });

  // Counter box
  ctx.fillStyle = 'rgba(34,211,165,0.08)';
  roundRect(ctx, W * 0.72, H * 0.1, W * 0.25, H * 0.6, 12); ctx.fill();
  ctx.strokeStyle = 'rgba(34,211,165,0.3)'; ctx.lineWidth = 1;
  roundRect(ctx, W * 0.72, H * 0.1, W * 0.25, H * 0.6, 12); ctx.stroke();

  ctx.font = 'bold 10px Plus Jakarta Sans'; ctx.fillStyle = '#22d3a5';
  ctx.textAlign = 'center';
  ctx.fillText('🛡️ Defences', W * 0.845, H * 0.2);

  const defences = ['MFA enabled', 'Email filtering', 'User training', 'Link inspection'];
  defences.forEach((d, i) => {
    ctx.font = '9px Plus Jakarta Sans'; ctx.fillStyle = 'rgba(34,211,165,0.7)';
    ctx.fillText('✓ ' + d, W * 0.845, H * 0.3 + i * 16);
  });
}

/* ── S3: AuthN / AuthZ flow ── */
function initAuthn() {
  const wrap = document.getElementById('authnCanvas');
  const runBtn = document.getElementById('authRunBtn');
  const failBtn = document.getElementById('authFailBtn');
  const resetBtn = document.getElementById('authResetBtn');
  if (!wrap) return;
  const { ctx, W, H } = makeCanvas(wrap);

  const steps = [
    { label: 'User enters credentials', x: 0.15, color: '#7c6fff' },
    { label: 'AuthN: verify identity', x: 0.38, color: '#22d3ee' },
    { label: 'MFA check', x: 0.57, color: '#fbbf24' },
    { label: 'AuthZ: check permissions', x: 0.75, color: '#22d3a5' },
    { label: 'Access granted', x: 0.92, color: '#22d3a5' },
  ];

  let state = 'idle'; // idle | running | failed | done
  let current = -1;
  let interval = null;
  const nodeY = H / 2 - 10;
  const nodeR = 22;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Arrows
    for (let i = 0; i < steps.length - 1; i++) {
      const s = steps[i], t = steps[i + 1];
      const active = i < current;
      ctx.strokeStyle = active ? s.color + '70' : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash(active ? [] : [3, 3]);
      ctx.beginPath(); ctx.moveTo(s.x * W + nodeR, nodeY); ctx.lineTo(t.x * W - nodeR, nodeY); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Nodes
    steps.forEach((s, i) => {
      const x = s.x * W;
      let nodeColor = s.color;
      let icon = (i + 1).toString();

      if (state === 'failed' && i === 1) { nodeColor = '#f87171'; icon = '✗'; }
      else if (state === 'done' && i === steps.length - 1) icon = '✓';

      const isActive = i === current - 1;
      ctx.beginPath(); ctx.arc(x, nodeY, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = i < current ? nodeColor + '30' : 'rgba(255,255,255,0.04)';
      ctx.fill();
      ctx.strokeStyle = i < current ? nodeColor : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.stroke();

      if (isActive) { ctx.shadowColor = nodeColor; ctx.shadowBlur = 14; ctx.stroke(); ctx.shadowBlur = 0; }

      ctx.font = 'bold 12px JetBrains Mono'; ctx.textAlign = 'center';
      ctx.fillStyle = i < current ? nodeColor : 'rgba(255,255,255,0.2)';
      ctx.fillText(icon, x, nodeY + 5);

      ctx.font = '9px Plus Jakarta Sans';
      ctx.fillStyle = i < current ? nodeColor : 'rgba(255,255,255,0.25)';
      ctx.fillText(s.label, x, nodeY + nodeR + 14);
    });

    // Status
    ctx.font = '11px JetBrains Mono'; ctx.textAlign = 'center';
    if (state === 'idle') {
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fillText('Click "Simulate login" to run through the flow', W / 2, nodeY - nodeR - 20);
    } else if (state === 'failed') {
      ctx.fillStyle = '#f87171';
      ctx.fillText('✗  Authentication failed — access denied', W / 2, nodeY - nodeR - 20);
    } else if (state === 'done') {
      ctx.fillStyle = '#22d3a5';
      ctx.fillText('✓  Access granted — user authorised', W / 2, nodeY - nodeR - 20);
    }
  }

  function runFlow(fails) {
    if (interval) return;
    current = 0; state = 'running'; draw();
    interval = setInterval(() => {
      current++;
      if (fails && current === 2) {
        state = 'failed'; draw(); clearInterval(interval); interval = null;
      } else if (current > steps.length) {
        state = 'done'; draw(); clearInterval(interval); interval = null;
      } else {
        draw();
      }
    }, 700);
  }

  runBtn && runBtn.addEventListener('click', () => runFlow(false));
  failBtn && failBtn.addEventListener('click', () => runFlow(true));
  resetBtn && resetBtn.addEventListener('click', () => {
    clearInterval(interval); interval = null;
    current = -1; state = 'idle'; draw();
  });

  draw();
}

/* ── S4: Live encryption visualiser ── */
function initEncrypt() {
  const wrap = document.getElementById('encryptCanvas');
  const input = document.getElementById('encryptInput');
  if (!wrap) return;
  const { ctx, W, H } = makeCanvas(wrap);

  function xorCipher(text, key) {
    return Array.from(text).map(c => String.fromCharCode(c.charCodeAt(0) ^ key)).join('');
  }

  function toHex(text) {
    return Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  }

  function draw(text) {
    ctx.clearRect(0, 0, W, H);
    const key = 42;
    const encrypted = xorCipher(text, key);
    const decrypted = xorCipher(encrypted, key);
    const hexStr = toHex(encrypted);

    const colW = W / 3;
    const labels = ['Plaintext', 'Encrypted (XOR key=42)', 'Decrypted'];
    const values = [text, hexStr.slice(0, 28) + (hexStr.length > 28 ? '…' : ''), decrypted];
    const colors = ['#22d3a5', '#f87171', '#22d3a5'];

    labels.forEach((label, i) => {
      const x = i * colW;
      ctx.fillStyle = colors[i] + '12';
      roundRect(ctx, x + 8, 16, colW - 16, H - 32, 12); ctx.fill();
      ctx.strokeStyle = colors[i] + '40'; ctx.lineWidth = 1;
      roundRect(ctx, x + 8, 16, colW - 16, H - 32, 12); ctx.stroke();

      ctx.font = 'bold 10px Plus Jakarta Sans'; ctx.fillStyle = colors[i]; ctx.textAlign = 'center';
      ctx.fillText(label, x + colW / 2, 40);

      ctx.font = `${i === 1 ? '10' : '13'}px JetBrains Mono`;
      ctx.fillStyle = colors[i] + 'cc';
      ctx.textAlign = 'center';

      const lines = [];
      const val = values[i];
      let pos = 0;
      const maxChars = i === 1 ? 18 : 14;
      while (pos < val.length) { lines.push(val.slice(pos, pos + maxChars)); pos += maxChars; }
      lines.slice(0, 4).forEach((line, li) => {
        ctx.fillText(line, x + colW / 2, 68 + li * 20);
      });
    });

    // Arrow labels
    ['🔐 Encrypt', '🔓 Decrypt'].forEach((label, i) => {
      ctx.font = 'bold 9px Plus Jakarta Sans';
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.textAlign = 'center';
      ctx.fillText(label, (i + 1) * colW, H - 12);
    });
  }

  input && input.addEventListener('input', () => draw(input.value || ''));
  draw(input ? input.value : 'Hello World');
}

/* ── Shared roundRect ── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
