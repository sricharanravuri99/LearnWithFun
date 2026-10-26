/* =============================================
   AI BASICS — Interactive Animations
   Each function is triggered when its section
   scrolls into view.
   ============================================= */

const dpr = window.devicePixelRatio || 1;

function px(container) {
  return {
    W: container.offsetWidth || 480,
    H: container.offsetHeight || 300
  };
}

function initCanvas(container) {
  container.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.appendChild(canvas);
  const { W, H } = px(container);
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { canvas, ctx, W, H };
}

/* ══════════════════════════════════════════════
   S1 — AI vs Traditional Code comparison
   ══════════════════════════════════════════════ */
function initAICompare() {
  const container = document.getElementById('aiCompareCanvas');
  if (!container) return;
  const { ctx, W, H } = initCanvas(container);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const mid = W / 2;

    // Left panel: Traditional
    ctx.fillStyle = 'rgba(248,113,113,0.06)';
    ctx.beginPath(); ctx.roundRect(12, 12, mid - 20, H - 24, 12); ctx.fill();
    ctx.strokeStyle = 'rgba(248,113,113,0.25)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(12, 12, mid - 20, H - 24, 12); ctx.stroke();

    ctx.fillStyle = '#f87171'; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TRADITIONAL CODE', mid / 2, 32);

    // Flowchart nodes
    const nodes = [
      { y: 58, text: 'Input: Animal Photo', color: '#56566e' },
      { y: 102, text: 'IF 4 legs?', color: '#fbbf24', diamond: true },
      { y: 148, text: 'IF has fur?', color: '#fbbf24', diamond: true },
      { y: 194, text: 'IF barks?', color: '#fbbf24', diamond: true },
      { y: 238, text: 'Output: Dog ✓', color: '#22d3a5' },
    ];

    nodes.forEach((n, i) => {
      const cx = mid / 2;
      if (n.diamond) {
        ctx.beginPath();
        ctx.moveTo(cx, n.y - 14); ctx.lineTo(cx + 50, n.y);
        ctx.lineTo(cx, n.y + 14); ctx.lineTo(cx - 50, n.y);
        ctx.closePath();
        ctx.fillStyle = 'rgba(251,191,36,0.12)'; ctx.fill();
        ctx.strokeStyle = 'rgba(251,191,36,0.4)'; ctx.lineWidth = 1; ctx.stroke();
      } else {
        ctx.fillStyle = n.y > 200 ? 'rgba(34,211,165,0.1)' : 'rgba(86,86,110,0.15)';
        ctx.beginPath(); ctx.roundRect(cx - 55, n.y - 14, 110, 26, 6); ctx.fill();
        ctx.strokeStyle = n.y > 200 ? 'rgba(34,211,165,0.3)' : 'rgba(86,86,110,0.3)'; ctx.stroke();
      }
      ctx.fillStyle = n.color; ctx.font = `600 ${n.diamond ? 10 : 10}px Plus Jakarta Sans,sans-serif`;
      ctx.textAlign = 'center'; ctx.fillText(n.text, cx, n.y + 4);
      if (i < nodes.length - 1) {
        ctx.beginPath(); ctx.moveTo(cx, n.y + (n.diamond ? 14 : 14));
        ctx.lineTo(cx, nodes[i+1].y - (nodes[i+1].diamond ? 14 : 14));
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1.5; ctx.stroke();
      }
    });
    ctx.fillStyle = '#f87171'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('Rigid. Breaks on edge cases.', mid / 2, H - 14);

    // Right panel: ML
    ctx.fillStyle = 'rgba(34,211,165,0.06)';
    ctx.beginPath(); ctx.roundRect(mid + 8, 12, mid - 20, H - 24, 12); ctx.fill();
    ctx.strokeStyle = 'rgba(34,211,165,0.25)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(mid + 8, 12, mid - 20, H - 24, 12); ctx.stroke();

    const rx = mid + 8 + (mid - 20) / 2;
    ctx.fillStyle = '#22d3a5'; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('MACHINE LEARNING', rx, 32);

    // Training data icons
    const dataY = 65;
    const icons = ['🐕','🐈','🐕','🐈','🐕','🐱'];
    icons.forEach((ic, i) => {
      ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(ic, rx - 55 + i * 22, dataY);
    });
    ctx.fillStyle = '#56566e'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('1. Feed thousands of labelled examples', rx, dataY + 16);

    // Arrow down
    ctx.beginPath(); ctx.moveTo(rx, dataY + 22); ctx.lineTo(rx, dataY + 44);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();

    // Neural net
    const netY = dataY + 60;
    const nlayers = [[3,130],[3,165],[3,200]]; // x positions for 3-layer mini network
    const lx = [rx - 48, rx, rx + 48];
    const nodes2 = lx.map((x, li) => [
      { x, y: netY - 18 },
      { x, y: netY },
      { x, y: netY + 18 },
    ]);
    for (let l = 0; l < 2; l++) nodes2[l].forEach(a => nodes2[l+1].forEach(b => {
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = 'rgba(124,111,255,0.3)'; ctx.lineWidth = 0.7; ctx.stroke();
    }));
    nodes2.forEach((layer, li) => layer.forEach(n => {
      ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = li === 0 ? '#22d3ee' : li === 1 ? '#7c6fff' : '#22d3a5';
      ctx.fill();
    }));
    ctx.fillStyle = '#9191a8'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('2. Network learns the pattern', rx, netY + 34);

    // Arrow
    ctx.beginPath(); ctx.moveTo(rx, netY + 40); ctx.lineTo(rx, netY + 56);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();

    // Output
    const outY = netY + 72;
    ctx.fillStyle = 'rgba(34,211,165,0.1)';
    ctx.beginPath(); ctx.roundRect(rx - 65, outY - 16, 130, 28, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(34,211,165,0.35)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#22d3a5'; ctx.font = '700 10px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('3. Output: 96% Dog 🐕', rx, outY + 4);

    ctx.fillStyle = '#22d3a5'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('Generalises. Handles new images.', rx, H - 14);
  }

  // Divider
  const { W: CW } = px(container);
  requestAnimationFrame(draw);

  const lazyObserver = new IntersectionObserver(e => {
    if (e[0].isIntersecting) { requestAnimationFrame(draw); lazyObserver.disconnect(); }
  }, { threshold: 0.3 });
  lazyObserver.observe(container);
}

/* ══════════════════════════════════════════════
   S2 — Interactive Neuron
   ══════════════════════════════════════════════ */
function initNeuron() {
  const canvasContainer = document.getElementById('neuronCanvas');
  const controlsContainer = document.getElementById('neuronControls');
  if (!canvasContainer || !controlsContainer) return;

  const weights = [0.7, -0.4, 0.5];
  const bias = 0.1;
  let inputs = [0.8, 0.5, 0.7];

  // Build slider controls
  const labels = ['x₁ (Input 1)', 'x₂ (Input 2)', 'x₃ (Input 3)'];
  const sliders = [];
  controlsContainer.innerHTML = '';
  labels.forEach((lbl, i) => {
    const row = document.createElement('div');
    row.className = 'ctrl-row';
    row.innerHTML = `
      <span class="ctrl-label" style="min-width:110px">${lbl}: <span class="ctrl-val" id="iv${i}">${inputs[i].toFixed(2)}</span></span>
      <input class="ctrl-slider" type="range" min="0" max="100" value="${inputs[i] * 100}" id="is${i}" />
      <span style="font-size:0.7rem;color:#56566e;min-width:60px;text-align:right">×w=${weights[i]}</span>`;
    controlsContainer.appendChild(row);
    sliders.push(row.querySelector('input'));
  });

  function draw() {
    const { ctx, W, H } = initCanvas(canvasContainer);
    const sum = inputs.reduce((a, v, i) => a + v * weights[i], 0) + bias;
    const output = Math.max(0, sum); // ReLU

    const inputX = W * 0.13;
    const neuronX = W * 0.52;
    const outX = W * 0.83;
    const inputYs = [H * 0.25, H * 0.5, H * 0.75];
    const neuronR = 36;

    // Draw connections with animated thickness based on weight magnitude
    inputs.forEach((inp, i) => {
      const product = inp * weights[i];
      const isPos = product >= 0;
      ctx.beginPath();
      ctx.moveTo(inputX + 22, inputYs[i]);
      ctx.lineTo(neuronX - neuronR, H / 2);
      ctx.strokeStyle = isPos ? `rgba(34,211,238,${0.2 + Math.abs(product) * 0.5})` : `rgba(248,113,113,${0.2 + Math.abs(product) * 0.5})`;
      ctx.lineWidth = 1 + Math.abs(product) * 3;
      ctx.stroke();

      // Product label on connection
      const lx = (inputX + 22 + neuronX - neuronR) / 2;
      const ly = (inputYs[i] + H / 2) / 2;
      ctx.fillStyle = 'rgba(5,5,8,0.8)';
      const prodStr = `${product >= 0 ? '+' : ''}${product.toFixed(2)}`;
      const tw = ctx.measureText(prodStr).width + 10;
      ctx.beginPath(); ctx.roundRect(lx - tw/2, ly - 9, tw, 17, 4); ctx.fill();
      ctx.fillStyle = isPos ? '#22d3ee' : '#f87171';
      ctx.font = '700 10px JetBrains Mono,monospace'; ctx.textAlign = 'center';
      ctx.fillText(prodStr, lx, ly + 3);
    });

    // Input circles
    inputs.forEach((inp, i) => {
      ctx.beginPath(); ctx.arc(inputX, inputYs[i], 22, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34,211,238,${0.1 + inp * 0.15})`;
      ctx.shadowBlur = 12; ctx.shadowColor = '#22d3ee'; ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#f0f0ff'; ctx.font = '700 11px JetBrains Mono,monospace';
      ctx.textAlign = 'center'; ctx.fillText(inp.toFixed(2), inputX, inputYs[i] + 4);

      const lbl = ['x₁','x₂','x₃'][i];
      ctx.fillStyle = '#56566e'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
      ctx.fillText(lbl, inputX, inputYs[i] + 18);
    });

    // Neuron body
    const activated = sum > 0;
    ctx.beginPath(); ctx.arc(neuronX, H / 2, neuronR, 0, Math.PI * 2);
    ctx.fillStyle = activated ? 'rgba(124,111,255,0.2)' : 'rgba(86,86,110,0.1)';
    if (activated) { ctx.shadowBlur = 24; ctx.shadowColor = '#7c6fff'; }
    ctx.fill(); ctx.shadowBlur = 0;
    ctx.strokeStyle = activated ? '#7c6fff' : '#56566e';
    ctx.lineWidth = activated ? 2 : 1; ctx.stroke();

    // Sum inside neuron
    ctx.fillStyle = activated ? '#a78bfa' : '#56566e';
    ctx.font = '700 11px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText('Σ = ' + sum.toFixed(2), neuronX, H / 2 - 6);
    ctx.fillStyle = '#56566e'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.fillText('+b=' + bias, neuronX, H / 2 + 8);
    ctx.fillStyle = activated ? '#22d3a5' : '#f87171';
    ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.fillText(activated ? 'ReLU → active' : 'ReLU → 0 (dead)', neuronX, H / 2 + 22);

    // Connection to output
    ctx.beginPath(); ctx.moveTo(neuronX + neuronR, H / 2); ctx.lineTo(outX - 22, H / 2);
    ctx.strokeStyle = activated ? 'rgba(34,211,165,0.7)' : 'rgba(86,86,110,0.3)';
    ctx.lineWidth = activated ? 2.5 : 1; ctx.stroke();

    // Output circle
    ctx.beginPath(); ctx.arc(outX, H / 2, 22, 0, Math.PI * 2);
    ctx.fillStyle = activated ? 'rgba(34,211,165,0.15)' : 'rgba(86,86,110,0.08)';
    if (activated) { ctx.shadowBlur = 16; ctx.shadowColor = '#22d3a5'; }
    ctx.fill(); ctx.shadowBlur = 0;
    ctx.strokeStyle = activated ? '#22d3a5' : '#56566e'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = activated ? '#22d3a5' : '#56566e';
    ctx.font = '700 12px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText(output.toFixed(2), outX, H / 2 - 2);
    ctx.font = '600 9px Plus Jakarta Sans,sans-serif'; ctx.fillText('out', outX, H / 2 + 12);

    // Labels
    ctx.fillStyle = '#56566e'; ctx.font = '600 10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Inputs', inputX, H - 10);
    ctx.fillText('Neuron (Σ + ReLU)', neuronX, H - 10);
    ctx.fillText('Output', outX, H - 10);
  }

  draw();

  sliders.forEach((sl, i) => {
    sl.addEventListener('input', () => {
      inputs[i] = parseInt(sl.value) / 100;
      document.getElementById(`iv${i}`).textContent = inputs[i].toFixed(2);
      draw();
    });
  });
}

/* ══════════════════════════════════════════════
   S3 — Neural Network Forward Pass
   ══════════════════════════════════════════════ */
function initNetwork() {
  const container = document.getElementById('networkCanvas');
  if (!container) return;

  // Layer config: [node-count, color, label]
  const LAYERS = [
    { n: 4, color: '#22d3ee', label: 'Input' },
    { n: 5, color: '#7c6fff', label: 'Hidden 1' },
    { n: 5, color: '#a78bfa', label: 'Hidden 2' },
    { n: 3, color: '#22d3a5', label: 'Output' },
  ];

  let activeUpTo = -1;
  let autoId = null;

  function getPositions() {
    const { W, H } = px(container);
    return LAYERS.map((l, li) => {
      const x = W * (0.12 + li * 0.26);
      const spacing = (H - 60) / (l.n + 1);
      return Array.from({ length: l.n }, (_, ni) => ({ x, y: 30 + spacing * (ni + 1) }));
    });
  }

  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const allPos = getPositions();

    // Connections
    for (let li = 0; li < LAYERS.length - 1; li++) {
      allPos[li].forEach(a => allPos[li + 1].forEach(b => {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        const active = li < activeUpTo;
        ctx.strokeStyle = active ? `rgba(${li === 0 ? '34,211,238' : '124,111,255'},0.5)` : 'rgba(255,255,255,0.05)';
        ctx.lineWidth = active ? 1.2 : 0.5;
        if (active) { ctx.shadowBlur = 3; ctx.shadowColor = '#7c6fff'; }
        ctx.stroke(); ctx.shadowBlur = 0;
      }));
    }

    // Nodes
    LAYERS.forEach((layer, li) => {
      const active = li <= activeUpTo;
      allPos[li].forEach(pos => {
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 13, 0, Math.PI * 2);
        ctx.fillStyle = active ? layer.color : '#13131a';
        if (active) { ctx.shadowBlur = 16; ctx.shadowColor = layer.color; }
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.strokeStyle = active ? layer.color : 'rgba(255,255,255,0.1)';
        ctx.lineWidth = active ? 2 : 1; ctx.stroke();
      });
      ctx.fillStyle = active ? layer.color : '#56566e';
      ctx.font = '600 10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(layer.label, allPos[li][0].x, H - 8);
    });

    // Data flow arrows (if active)
    if (activeUpTo >= 0 && activeUpTo < LAYERS.length) {
      const li = activeUpTo;
      const midX = allPos[li][Math.floor(allPos[li].length / 2)].x;
      const midY = allPos[li][Math.floor(allPos[li].length / 2)].y;
      ctx.fillStyle = LAYERS[li].color; ctx.font = '700 10px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center';
      const labels = ['Raw data in', 'Features detected', 'Patterns combined', 'Prediction!'];
      ctx.fillText(labels[li] || '', midX, 16);
    }
  }

  draw();

  function runPass() {
    activeUpTo = -1;
    const go = () => {
      activeUpTo++;
      draw();
      if (activeUpTo < LAYERS.length) setTimeout(go, 650);
    };
    go();
  }

  document.getElementById('btnRunNetwork')?.addEventListener('click', runPass);

  const btnAuto = document.getElementById('btnAutoNetwork');
  btnAuto?.addEventListener('click', () => {
    if (autoId) { clearInterval(autoId); autoId = null; btnAuto.textContent = '⟳ Auto Play'; return; }
    btnAuto.textContent = '⏹ Stop';
    runPass();
    autoId = setInterval(runPass, 3200);
  });
}

/* ══════════════════════════════════════════════
   S4 — Training Loop (loss curve + step highlight)
   ══════════════════════════════════════════════ */
function initTrainingLoop() {
  const container = document.getElementById('trainingCanvas');
  if (!container) return;

  let lossHistory = [];
  let epoch = 0;
  let autoId = null;
  let currentStep = 0; // 0-4 for the 5 training steps

  const TARGET_LOSS = 0.04;

  function fakeLoss(ep) {
    return Math.max(TARGET_LOSS, 2.5 * Math.exp(-ep * 0.12) + 0.02 * (Math.sin(ep * 0.8) * 0.5 + 0.5));
  }

  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const pad = { l: 48, r: 16, t: 24, b: 40 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * ch;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
      ctx.fillStyle = '#56566e'; ctx.font = '9px JetBrains Mono,monospace'; ctx.textAlign = 'right';
      ctx.fillText(((4 - i) / 4 * 2.5).toFixed(1), pad.l - 5, y + 3);
    }

    // Axis labels
    ctx.fillStyle = '#56566e'; ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Training Epochs →', pad.l + cw / 2, H - 6);

    ctx.save(); ctx.translate(12, pad.t + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Loss ↓', 0, 0); ctx.restore();

    if (lossHistory.length < 2) {
      ctx.fillStyle = '#56566e'; ctx.font = '700 13px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText('Click "Train One Epoch" to start', W / 2, H / 2);
      return;
    }

    // Loss curve
    const maxEp = Math.max(lossHistory.length - 1, 1);
    const maxLoss = 2.5;
    const toX = ep => pad.l + (ep / Math.max(maxEp, 20)) * cw;
    const toY = l => pad.t + ch - Math.min((l / maxLoss) * ch, ch);

    const grad = ctx.createLinearGradient(pad.l, 0, pad.l + cw, 0);
    grad.addColorStop(0, '#f87171'); grad.addColorStop(0.5, '#fbbf24'); grad.addColorStop(1, '#22d3a5');

    ctx.beginPath();
    lossHistory.forEach((l, i) => {
      i === 0 ? ctx.moveTo(toX(i), toY(l)) : ctx.lineTo(toX(i), toY(l));
    });
    ctx.strokeStyle = grad; ctx.lineWidth = 2.5; ctx.stroke();

    // Area fill under curve
    ctx.lineTo(toX(lossHistory.length - 1), pad.t + ch);
    ctx.lineTo(toX(0), pad.t + ch); ctx.closePath();
    const fillGrad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
    fillGrad.addColorStop(0, 'rgba(248,113,113,0.12)'); fillGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = fillGrad; ctx.fill();

    // Current point
    const last = lossHistory[lossHistory.length - 1];
    const cx2 = toX(lossHistory.length - 1), cy2 = toY(last);
    ctx.beginPath(); ctx.arc(cx2, cy2, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#22d3a5'; ctx.shadowBlur = 12; ctx.shadowColor = '#22d3a5'; ctx.fill(); ctx.shadowBlur = 0;

    ctx.fillStyle = '#22d3a5'; ctx.font = '700 11px JetBrains Mono,monospace'; ctx.textAlign = 'left';
    ctx.fillText(`Epoch ${epoch}  Loss: ${last.toFixed(3)}`, cx2 + 10, cy2 + 4);

    // Done label
    if (last <= TARGET_LOSS + 0.05) {
      ctx.fillStyle = '#22d3a5'; ctx.font = '700 12px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('✓ Converged — model trained!', W / 2, pad.t + 16);
    }
  }

  function trainStep() {
    epoch++;
    lossHistory.push(fakeLoss(epoch));
    currentStep = (epoch - 1) % 5;

    // Highlight step in sidebar
    document.querySelectorAll('.step-item').forEach((el, i) => {
      el.classList.toggle('active', i === currentStep);
    });

    draw();
  }

  function reset() {
    epoch = 0; lossHistory = []; currentStep = 0;
    if (autoId) { clearInterval(autoId); autoId = null; document.getElementById('btnTrainAuto').textContent = '⟳ Auto Train'; }
    document.querySelectorAll('.step-item').forEach((el, i) => el.classList.toggle('active', i === 0));
    draw();
  }

  draw();

  document.getElementById('btnTrain')?.addEventListener('click', trainStep);
  document.getElementById('btnTrainReset')?.addEventListener('click', reset);
  document.getElementById('btnTrainAuto')?.addEventListener('click', function() {
    if (autoId) {
      clearInterval(autoId); autoId = null; this.textContent = '⟳ Auto Train'; return;
    }
    this.textContent = '⏹ Stop';
    autoId = setInterval(() => {
      if (fakeLoss(epoch + 1) <= TARGET_LOSS + 0.02) { clearInterval(autoId); autoId = null; this.textContent = '⟳ Auto Train'; }
      trainStep();
    }, 180);
  });
}

/* ══════════════════════════════════════════════
   S5 — Gradient Descent
   ══════════════════════════════════════════════ */
function initGradientDescent() {
  const container = document.getElementById('gradCanvas');
  if (!container) return;

  const lrValues = [0.02, 0.05, 0.10, 0.20, 0.30, 0.45, 0.60, 0.80, 1.0, 1.3];
  let lr = 0.3, theta = -3.5, autoId = null;
  const optimal = 2.5;

  function loss(t) { return 0.4 * (t - optimal) ** 2 + 0.3; }
  function gradient(t) { return 0.8 * (t - optimal); }

  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const pad = { l: 44, r: 16, t: 22, b: 36 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * ch;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
    }

    const TMIN = -4, TMAX = 7;
    const LMIN = 0, LMAX = 10;
    const toX = t => pad.l + ((t - TMIN) / (TMAX - TMIN)) * cw;
    const toY = l => pad.t + ch - ((l - LMIN) / (LMAX - LMIN)) * ch;

    // Loss curve
    const curveGrad = ctx.createLinearGradient(pad.l, 0, pad.l + cw, 0);
    curveGrad.addColorStop(0, '#f87171'); curveGrad.addColorStop(0.5, '#fbbf24'); curveGrad.addColorStop(1, '#22d3a5');
    ctx.beginPath();
    for (let t = TMIN; t <= TMAX; t += 0.05) {
      const x = toX(t), y = toY(loss(t));
      t === TMIN ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = curveGrad; ctx.lineWidth = 3; ctx.stroke();

    // Minimum marker
    ctx.beginPath(); ctx.arc(toX(optimal), toY(loss(optimal)), 5, 0, Math.PI * 2);
    ctx.fillStyle = '#22d3a5'; ctx.shadowBlur = 10; ctx.shadowColor = '#22d3a5'; ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = '#22d3a5'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('min', toX(optimal), toY(loss(optimal)) - 10);

    // Gradient arrow
    const g = gradient(theta);
    const arrowLen = Math.min(Math.abs(g) * 20, 60) * Math.sign(g);
    const bx = toX(theta), by = toY(loss(theta));
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + arrowLen, by);
    ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = 'rgba(251,191,36,0.8)'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('∇', bx + arrowLen / 2, by - 8);

    // Ball (current position)
    ctx.beginPath(); ctx.arc(bx, by, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24'; ctx.shadowBlur = 18; ctx.shadowColor = '#fbbf24'; ctx.fill(); ctx.shadowBlur = 0;
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();

    // Labels
    ctx.fillStyle = '#fbbf24'; ctx.font = '700 10px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText(`θ = ${theta.toFixed(2)}`, bx, by < H - 50 ? by + 24 : by - 18);

    ctx.fillStyle = '#56566e'; ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('θ (parameter value) →', pad.l + cw / 2, H - 8);

    ctx.save(); ctx.translate(14, pad.t + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#56566e'; ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('J(θ) Loss ↓', 0, 0); ctx.restore();

    // Loss value
    ctx.fillStyle = '#a78bfa'; ctx.font = '700 11px JetBrains Mono,monospace'; ctx.textAlign = 'right';
    ctx.fillText(`Loss = ${loss(theta).toFixed(3)}`, W - 12, 18);
  }

  draw();

  document.getElementById('lrSlider')?.addEventListener('input', function() {
    lr = lrValues[parseInt(this.value) - 1];
    document.getElementById('lrVal').textContent = lr.toFixed(2);
  });

  document.getElementById('btnGradStep')?.addEventListener('click', () => {
    theta = theta - lr * gradient(theta);
    draw();
  });

  document.getElementById('btnGradReset')?.addEventListener('click', () => {
    if (autoId) { clearInterval(autoId); autoId = null; document.getElementById('btnGradAuto').textContent = '⚡ Auto'; }
    theta = -3.5 + Math.random() * 1;
    draw();
  });

  document.getElementById('btnGradAuto')?.addEventListener('click', function() {
    if (autoId) { clearInterval(autoId); autoId = null; this.textContent = '⚡ Auto'; return; }
    this.textContent = '⏹ Stop';
    autoId = setInterval(() => {
      const g = gradient(theta);
      if (Math.abs(g) < 0.02) { clearInterval(autoId); autoId = null; this.textContent = '⚡ Auto'; return; }
      theta -= lr * g;
      draw();
    }, 100);
  });
}

/* ══════════════════════════════════════════════
   INIT — trigger each section when visible
   ══════════════════════════════════════════════ */
function onVisible(id, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      setTimeout(fn, 200);
      obs.disconnect();
    }
  }, { threshold: 0.25 });
  obs.observe(el);
}

onVisible('s1', initAICompare);
onVisible('s2', initNeuron);
onVisible('s3', initNetwork);
onVisible('s4', initTrainingLoop);
onVisible('s5', initGradientDescent);
