/* =============================================
   AI COMPLETE GUIDE — Interactive Animations
   ============================================= */

const dpr = window.devicePixelRatio || 1;

function px(container) {
  return { W: container.offsetWidth || 480, H: container.offsetHeight || 300 };
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

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ══════════ S1 — AI vs Traditional Code ══════════ */
function initAICompare() {
  const container = document.getElementById('aiCompareCanvas');
  if (!container) return;
  const { ctx, W, H } = initCanvas(container);
  const mid = W / 2;

  ctx.fillStyle = 'rgba(248,113,113,0.06)';
  rr(ctx, 12, 12, mid - 20, H - 24, 12); ctx.fill();
  ctx.strokeStyle = 'rgba(248,113,113,0.25)'; ctx.lineWidth = 1;
  rr(ctx, 12, 12, mid - 20, H - 24, 12); ctx.stroke();
  ctx.fillStyle = '#f87171'; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('TRADITIONAL CODE', mid / 2, 32);

  const nodes = [
    { y: 58,  text: 'Input: Animal Photo', color: '#56566e' },
    { y: 102, text: 'IF 4 legs?',          color: '#fbbf24', diamond: true },
    { y: 148, text: 'IF has fur?',          color: '#fbbf24', diamond: true },
    { y: 194, text: 'IF barks?',            color: '#fbbf24', diamond: true },
    { y: 238, text: 'Output: Dog ✓',        color: '#22d3a5' },
  ];
  nodes.forEach((n, i) => {
    const cx = mid / 2;
    if (n.diamond) {
      ctx.beginPath(); ctx.moveTo(cx, n.y - 14); ctx.lineTo(cx + 50, n.y);
      ctx.lineTo(cx, n.y + 14); ctx.lineTo(cx - 50, n.y); ctx.closePath();
      ctx.fillStyle = 'rgba(251,191,36,0.12)'; ctx.fill();
      ctx.strokeStyle = 'rgba(251,191,36,0.4)'; ctx.lineWidth = 1; ctx.stroke();
    } else {
      ctx.fillStyle = n.y > 200 ? 'rgba(34,211,165,0.1)' : 'rgba(86,86,110,0.15)';
      rr(ctx, cx - 55, n.y - 14, 110, 26, 6); ctx.fill();
      ctx.strokeStyle = n.y > 200 ? 'rgba(34,211,165,0.3)' : 'rgba(86,86,110,0.3)'; ctx.stroke();
    }
    ctx.fillStyle = n.color; ctx.font = '600 10px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText(n.text, cx, n.y + 4);
    if (i < nodes.length - 1) {
      ctx.beginPath(); ctx.moveTo(cx, n.y + 14); ctx.lineTo(cx, nodes[i+1].y - 14);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1.5; ctx.stroke();
    }
  });
  ctx.fillStyle = '#f87171'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('Rigid. Breaks on edge cases.', mid / 2, H - 14);

  ctx.fillStyle = 'rgba(34,211,165,0.06)';
  rr(ctx, mid + 8, 12, mid - 20, H - 24, 12); ctx.fill();
  ctx.strokeStyle = 'rgba(34,211,165,0.25)'; ctx.lineWidth = 1;
  rr(ctx, mid + 8, 12, mid - 20, H - 24, 12); ctx.stroke();
  const rx = mid + 8 + (mid - 20) / 2;
  ctx.fillStyle = '#22d3a5'; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('MACHINE LEARNING', rx, 32);

  const icons = ['🐕','🐈','🐕','🐈','🐕','🐱'];
  icons.forEach((ic, i) => { ctx.font = '18px sans-serif'; ctx.fillText(ic, rx - 55 + i * 22, 68); });
  ctx.fillStyle = '#56566e'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
  ctx.fillText('1. Feed thousands of labelled examples', rx, 84);

  ctx.beginPath(); ctx.moveTo(rx, 90); ctx.lineTo(rx, 112);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();

  const netY = 128;
  const lx = [rx - 48, rx, rx + 48];
  const nodes2 = lx.map(x => [{ x, y: netY - 18 }, { x, y: netY }, { x, y: netY + 18 }]);
  for (let l = 0; l < 2; l++) nodes2[l].forEach(a => nodes2[l+1].forEach(b => {
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = 'rgba(124,111,255,0.3)'; ctx.lineWidth = 0.7; ctx.stroke();
  }));
  nodes2.forEach((layer, li) => layer.forEach(n => {
    ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = li === 0 ? '#22d3ee' : li === 1 ? '#7c6fff' : '#22d3a5'; ctx.fill();
  }));
  ctx.fillStyle = '#9191a8'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('2. Network learns the pattern', rx, netY + 34);

  ctx.beginPath(); ctx.moveTo(rx, netY + 40); ctx.lineTo(rx, netY + 56);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();

  const outY = netY + 72;
  ctx.fillStyle = 'rgba(34,211,165,0.1)';
  rr(ctx, rx - 65, outY - 16, 130, 28, 8); ctx.fill();
  ctx.strokeStyle = 'rgba(34,211,165,0.35)'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = '#22d3a5'; ctx.font = '700 10px Plus Jakarta Sans,sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('3. Output: 96% Dog 🐕', rx, outY + 4);
  ctx.fillStyle = '#22d3a5'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
  ctx.fillText('Generalises. Handles new images.', rx, H - 14);
}

/* ══════════ S2 — Interactive Neuron ══════════ */
function initNeuron() {
  const canvasContainer = document.getElementById('neuronCanvas');
  const controlsContainer = document.getElementById('neuronControls');
  if (!canvasContainer || !controlsContainer) return;
  const weights = [0.7, -0.4, 0.5], bias = 0.1;
  let inputs = [0.8, 0.5, 0.7];
  const labels = ['x₁ (Input 1)', 'x₂ (Input 2)', 'x₃ (Input 3)'];
  const sliders = [];
  controlsContainer.innerHTML = '';
  labels.forEach((lbl, i) => {
    const row = document.createElement('div'); row.className = 'ctrl-row';
    row.innerHTML = `<span class="ctrl-label" style="min-width:110px">${lbl}: <span class="ctrl-val" id="iv${i}">${inputs[i].toFixed(2)}</span></span>
      <input class="ctrl-slider" type="range" min="0" max="100" value="${inputs[i] * 100}" id="is${i}" />
      <span style="font-size:0.7rem;color:#56566e;min-width:60px;text-align:right">×w=${weights[i]}</span>`;
    controlsContainer.appendChild(row); sliders.push(row.querySelector('input'));
  });

  function draw() {
    const { ctx, W, H } = initCanvas(canvasContainer);
    const sum = inputs.reduce((a, v, i) => a + v * weights[i], 0) + bias;
    const output = Math.max(0, sum);
    const inputX = W * 0.13, neuronX = W * 0.52, outX = W * 0.83, neuronR = 36;
    const inputYs = [H * 0.25, H * 0.5, H * 0.75];

    inputs.forEach((inp, i) => {
      const product = inp * weights[i], isPos = product >= 0;
      ctx.beginPath(); ctx.moveTo(inputX + 22, inputYs[i]); ctx.lineTo(neuronX - neuronR, H / 2);
      ctx.strokeStyle = isPos ? `rgba(34,211,238,${0.2 + Math.abs(product) * 0.5})` : `rgba(248,113,113,${0.2 + Math.abs(product) * 0.5})`;
      ctx.lineWidth = 1 + Math.abs(product) * 3; ctx.stroke();
      const lx = (inputX + 22 + neuronX - neuronR) / 2, ly = (inputYs[i] + H / 2) / 2;
      const prodStr = `${product >= 0 ? '+' : ''}${product.toFixed(2)}`;
      const tw = ctx.measureText(prodStr).width + 10;
      ctx.fillStyle = 'rgba(5,5,8,0.8)'; rr(ctx, lx - tw/2, ly - 9, tw, 17, 4); ctx.fill();
      ctx.fillStyle = isPos ? '#22d3ee' : '#f87171';
      ctx.font = '700 10px JetBrains Mono,monospace'; ctx.textAlign = 'center';
      ctx.fillText(prodStr, lx, ly + 3);
    });
    inputs.forEach((inp, i) => {
      ctx.beginPath(); ctx.arc(inputX, inputYs[i], 22, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34,211,238,${0.1 + inp * 0.15})`;
      ctx.shadowBlur = 12; ctx.shadowColor = '#22d3ee'; ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#f0f0ff'; ctx.font = '700 11px JetBrains Mono,monospace';
      ctx.textAlign = 'center'; ctx.fillText(inp.toFixed(2), inputX, inputYs[i] + 4);
      ctx.fillStyle = '#56566e'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
      ctx.fillText(['x₁','x₂','x₃'][i], inputX, inputYs[i] + 18);
    });
    const activated = sum > 0;
    ctx.beginPath(); ctx.arc(neuronX, H / 2, neuronR, 0, Math.PI * 2);
    ctx.fillStyle = activated ? 'rgba(124,111,255,0.2)' : 'rgba(86,86,110,0.1)';
    if (activated) { ctx.shadowBlur = 24; ctx.shadowColor = '#7c6fff'; }
    ctx.fill(); ctx.shadowBlur = 0;
    ctx.strokeStyle = activated ? '#7c6fff' : '#56566e'; ctx.lineWidth = activated ? 2 : 1; ctx.stroke();
    ctx.fillStyle = activated ? '#a78bfa' : '#56566e';
    ctx.font = '700 11px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText('Σ = ' + sum.toFixed(2), neuronX, H / 2 - 6);
    ctx.fillStyle = '#56566e'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.fillText('+b=' + bias, neuronX, H / 2 + 8);
    ctx.fillStyle = activated ? '#22d3a5' : '#f87171'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
    ctx.fillText(activated ? 'ReLU → active' : 'ReLU → 0 (dead)', neuronX, H / 2 + 22);
    ctx.beginPath(); ctx.moveTo(neuronX + neuronR, H / 2); ctx.lineTo(outX - 22, H / 2);
    ctx.strokeStyle = activated ? 'rgba(34,211,165,0.7)' : 'rgba(86,86,110,0.3)';
    ctx.lineWidth = activated ? 2.5 : 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(outX, H / 2, 22, 0, Math.PI * 2);
    ctx.fillStyle = activated ? 'rgba(34,211,165,0.15)' : 'rgba(86,86,110,0.08)';
    if (activated) { ctx.shadowBlur = 16; ctx.shadowColor = '#22d3a5'; }
    ctx.fill(); ctx.shadowBlur = 0;
    ctx.strokeStyle = activated ? '#22d3a5' : '#56566e'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = activated ? '#22d3a5' : '#56566e';
    ctx.font = '700 12px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText(output.toFixed(2), outX, H / 2 - 2);
    ctx.font = '600 9px Plus Jakarta Sans,sans-serif'; ctx.fillText('out', outX, H / 2 + 12);
    ctx.fillStyle = '#56566e'; ctx.font = '600 10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Inputs', inputX, H - 10);
    ctx.fillText('Neuron (Σ + ReLU)', neuronX, H - 10);
    ctx.fillText('Output', outX, H - 10);
  }
  draw();
  sliders.forEach((sl, i) => sl.addEventListener('input', () => {
    inputs[i] = parseInt(sl.value) / 100;
    document.getElementById(`iv${i}`).textContent = inputs[i].toFixed(2);
    draw();
  }));
}

/* ══════════ S3 — Neural Network ══════════ */
function initNetwork() {
  const container = document.getElementById('networkCanvas');
  if (!container) return;
  const LAYERS = [
    { n: 4, color: '#22d3ee', label: 'Input' },
    { n: 5, color: '#7c6fff', label: 'Hidden 1' },
    { n: 5, color: '#a78bfa', label: 'Hidden 2' },
    { n: 3, color: '#22d3a5', label: 'Output' },
  ];
  let activeUpTo = -1, autoId = null;
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
    if (activeUpTo >= 0 && activeUpTo < LAYERS.length) {
      const labels = ['Raw data in', 'Features detected', 'Patterns combined', 'Prediction!'];
      ctx.fillStyle = LAYERS[activeUpTo].color; ctx.font = '700 10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(labels[activeUpTo] || '', allPos[activeUpTo][Math.floor(allPos[activeUpTo].length / 2)].x, 16);
    }
  }
  draw();
  function runPass() {
    activeUpTo = -1;
    const go = () => { activeUpTo++; draw(); if (activeUpTo < LAYERS.length) setTimeout(go, 650); };
    go();
  }
  document.getElementById('btnRunNetwork')?.addEventListener('click', runPass);
  const btnAuto = document.getElementById('btnAutoNetwork');
  btnAuto?.addEventListener('click', () => {
    if (autoId) { clearInterval(autoId); autoId = null; btnAuto.textContent = '⟳ Auto Play'; return; }
    btnAuto.textContent = '⏹ Stop'; runPass(); autoId = setInterval(runPass, 3200);
  });
}

/* ══════════ S4 — Training Loop ══════════ */
function initTrainingLoop() {
  const container = document.getElementById('trainingCanvas');
  if (!container) return;
  let lossHistory = [], epoch = 0, autoId = null, currentStep = 0;
  const TARGET_LOSS = 0.04;
  function fakeLoss(ep) { return Math.max(TARGET_LOSS, 2.5 * Math.exp(-ep * 0.12) + 0.02 * (Math.sin(ep * 0.8) * 0.5 + 0.5)); }
  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const pad = { l: 48, r: 16, t: 24, b: 40 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * ch;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
      ctx.fillStyle = '#56566e'; ctx.font = '9px JetBrains Mono,monospace'; ctx.textAlign = 'right';
      ctx.fillText(((4 - i) / 4 * 2.5).toFixed(1), pad.l - 5, y + 3);
    }
    ctx.fillStyle = '#56566e'; ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Training Epochs →', pad.l + cw / 2, H - 6);
    ctx.save(); ctx.translate(12, pad.t + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Loss ↓', 0, 0); ctx.restore();
    if (lossHistory.length < 2) {
      ctx.fillStyle = '#56566e'; ctx.font = '700 13px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText('Click "Train One Epoch" to start', W / 2, H / 2);
      return;
    }
    const maxLoss = 2.5;
    const toX = ep => pad.l + (ep / Math.max(lossHistory.length - 1, 20)) * cw;
    const toY = l => pad.t + ch - Math.min((l / maxLoss) * ch, ch);
    const grad = ctx.createLinearGradient(pad.l, 0, pad.l + cw, 0);
    grad.addColorStop(0, '#f87171'); grad.addColorStop(0.5, '#fbbf24'); grad.addColorStop(1, '#22d3a5');
    ctx.beginPath();
    lossHistory.forEach((l, i) => i === 0 ? ctx.moveTo(toX(i), toY(l)) : ctx.lineTo(toX(i), toY(l)));
    ctx.strokeStyle = grad; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.lineTo(toX(lossHistory.length - 1), pad.t + ch); ctx.lineTo(toX(0), pad.t + ch); ctx.closePath();
    const fillGrad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
    fillGrad.addColorStop(0, 'rgba(248,113,113,0.12)'); fillGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = fillGrad; ctx.fill();
    const last = lossHistory[lossHistory.length - 1];
    const cx2 = toX(lossHistory.length - 1), cy2 = toY(last);
    ctx.beginPath(); ctx.arc(cx2, cy2, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#22d3a5'; ctx.shadowBlur = 12; ctx.shadowColor = '#22d3a5'; ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = '#22d3a5'; ctx.font = '700 11px JetBrains Mono,monospace'; ctx.textAlign = 'left';
    ctx.fillText(`Epoch ${epoch}  Loss: ${last.toFixed(3)}`, cx2 + 10, cy2 + 4);
    if (last <= TARGET_LOSS + 0.05) {
      ctx.fillStyle = '#22d3a5'; ctx.font = '700 12px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('✓ Converged — model trained!', W / 2, pad.t + 16);
    }
  }
  function trainStep() {
    epoch++; lossHistory.push(fakeLoss(epoch)); currentStep = (epoch - 1) % 5;
    document.querySelectorAll('.step-item').forEach((el, i) => el.classList.toggle('active', i === currentStep));
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
    if (autoId) { clearInterval(autoId); autoId = null; this.textContent = '⟳ Auto Train'; return; }
    this.textContent = '⏹ Stop';
    autoId = setInterval(() => {
      if (fakeLoss(epoch + 1) <= TARGET_LOSS + 0.02) { clearInterval(autoId); autoId = null; this.textContent = '⟳ Auto Train'; }
      trainStep();
    }, 180);
  });
}

/* ══════════ S5 — Gradient Descent ══════════ */
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
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * ch;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
    }
    const TMIN = -4, TMAX = 7, LMAX = 10;
    const toX = t => pad.l + ((t - TMIN) / (TMAX - TMIN)) * cw;
    const toY = l => pad.t + ch - ((l / LMAX) * ch);
    const curveGrad = ctx.createLinearGradient(pad.l, 0, pad.l + cw, 0);
    curveGrad.addColorStop(0, '#f87171'); curveGrad.addColorStop(0.5, '#fbbf24'); curveGrad.addColorStop(1, '#22d3a5');
    ctx.beginPath();
    for (let t = TMIN; t <= TMAX; t += 0.05) { t === TMIN ? ctx.moveTo(toX(t), toY(loss(t))) : ctx.lineTo(toX(t), toY(loss(t))); }
    ctx.strokeStyle = curveGrad; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(toX(optimal), toY(loss(optimal)), 5, 0, Math.PI * 2);
    ctx.fillStyle = '#22d3a5'; ctx.shadowBlur = 10; ctx.shadowColor = '#22d3a5'; ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = '#22d3a5'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('min', toX(optimal), toY(loss(optimal)) - 10);
    const g = gradient(theta);
    const arrowLen = Math.min(Math.abs(g) * 20, 60) * Math.sign(g);
    const bx = toX(theta), by = toY(loss(theta));
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + arrowLen, by);
    ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = 'rgba(251,191,36,0.8)'; ctx.font = '600 9px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('∇', bx + arrowLen / 2, by - 8);
    ctx.beginPath(); ctx.arc(bx, by, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24'; ctx.shadowBlur = 18; ctx.shadowColor = '#fbbf24'; ctx.fill(); ctx.shadowBlur = 0;
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.font = '700 10px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText(`θ = ${theta.toFixed(2)}`, bx, by < H - 50 ? by + 24 : by - 18);
    ctx.fillStyle = '#56566e'; ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('θ (parameter value) →', pad.l + cw / 2, H - 8);
    ctx.save(); ctx.translate(14, pad.t + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#56566e'; ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('J(θ) Loss ↓', 0, 0); ctx.restore();
    ctx.fillStyle = '#a78bfa'; ctx.font = '700 11px JetBrains Mono,monospace'; ctx.textAlign = 'right';
    ctx.fillText(`Loss = ${loss(theta).toFixed(3)}`, W - 12, 18);
  }
  draw();
  document.getElementById('lrSlider')?.addEventListener('input', function() {
    lr = lrValues[parseInt(this.value) - 1];
    document.getElementById('lrVal').textContent = lr.toFixed(2);
  });
  document.getElementById('btnGradStep')?.addEventListener('click', () => { theta -= lr * gradient(theta); draw(); });
  document.getElementById('btnGradReset')?.addEventListener('click', () => {
    if (autoId) { clearInterval(autoId); autoId = null; document.getElementById('btnGradAuto').textContent = '⚡ Auto'; }
    theta = -3.5 + Math.random() * 1; draw();
  });
  document.getElementById('btnGradAuto')?.addEventListener('click', function() {
    if (autoId) { clearInterval(autoId); autoId = null; this.textContent = '⚡ Auto'; return; }
    this.textContent = '⏹ Stop';
    autoId = setInterval(() => {
      if (Math.abs(gradient(theta)) < 0.02) { clearInterval(autoId); autoId = null; this.textContent = '⚡ Auto'; return; }
      theta -= lr * gradient(theta); draw();
    }, 100);
  });
}

/* ══════════ S7 — Live Tokenizer ══════════ */
const COMMON_WORDS = new Set(['the','of','and','a','to','in','is','it','you','that','he','was','for','on','are','with','as','i','his','they','at','be','this','have','from','or','one','had','by','not','but','what','all','were','we','when','your','can','said','there','an','how','their','if','will','up','other','do','its','who','my','than','first','been','no','way','could']);
const PREFIXES = ['un','pre','post','anti','over','under','re','dis','mis','non','inter','super','trans','counter'];
const SUFFIXES = ['tion','ation','ness','ment','ful','less','able','ible','ize','ise','ing','ized','izing','ation','er','est','ly','ity','ous','ious','ic','al','ive','ed'];

function splitSubword(word) {
  if (word.length <= 5) return [word];
  const low = word.toLowerCase();
  for (const p of PREFIXES) if (low.startsWith(p) && word.length - p.length >= 3) return [word.slice(0,p.length), ...splitSubword(word.slice(p.length))];
  for (const s of SUFFIXES) if (low.endsWith(s) && word.length - s.length >= 3) return [...splitSubword(word.slice(0, word.length - s.length)), s];
  if (word.length > 9) { const m = Math.ceil(word.length / 2); return [word.slice(0,m), word.slice(m)]; }
  return [word];
}

function simpleTokenize(text) {
  const parts = text.match(/[a-zA-Z']+|\d+|[^\w\s]+|\s+/g) || [];
  const tokens = [];
  for (const part of parts) {
    if (!part.trim()) {
      if (part.includes('\n')) tokens.push({ text: '↵', type: 'space' });
      continue;
    }
    if (/^\d+$/.test(part)) {
      if (part.length <= 3) tokens.push({ text: part, type: 'number' });
      else { for (let i = 0; i < part.length; i += 3) tokens.push({ text: part.slice(i, i+3), type: 'number' }); }
    } else if (/^[^a-zA-Z0-9]/.test(part)) {
      for (const ch of part) tokens.push({ text: ch, type: 'punct' });
    } else if (part.length <= 4 || COMMON_WORDS.has(part.toLowerCase())) {
      tokens.push({ text: part, type: 'word' });
    } else {
      const subs = splitSubword(part);
      subs.forEach((s, i) => tokens.push({ text: s, type: i === 0 ? 'word' : 'subword' }));
    }
  }
  return tokens;
}

window.updateTokens = function() {
  const text = document.getElementById('tokenInput')?.value || '';
  const out = document.getElementById('tokenOutput');
  const stats = document.getElementById('tokenStats');
  if (!out) return;
  const tokens = simpleTokenize(text);
  out.innerHTML = tokens.map(t => `<span class="token-chip ${t.type}" title="type: ${t.type}">${t.text.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`).join('');
  const nonSpace = tokens.filter(t => t.type !== 'space');
  if (stats) stats.textContent = `${nonSpace.length} tokens · ${text.length} characters · ~${(nonSpace.length * 0.75).toFixed(0)} words est.`;
};

function initTokenizer() {
  const input = document.getElementById('tokenInput');
  if (!input) return;
  input.addEventListener('input', updateTokens);
  updateTokens();
}

/* ══════════ S8 — Embeddings Scatter ══════════ */
function initEmbeddings() {
  const container = document.getElementById('embeddingCanvas');
  if (!container) return;

  const WORDS = [
    { w:'king',     x:0.38, y:0.15, c:'#fbbf24', cat:'royalty' },
    { w:'queen',    x:0.62, y:0.15, c:'#fbbf24', cat:'royalty' },
    { w:'prince',   x:0.50, y:0.24, c:'#fbbf24', cat:'royalty' },
    { w:'man',      x:0.35, y:0.30, c:'#22d3ee', cat:'person'  },
    { w:'woman',    x:0.55, y:0.30, c:'#22d3ee', cat:'person'  },
    { w:'child',    x:0.48, y:0.38, c:'#22d3ee', cat:'person'  },
    { w:'dog',      x:0.12, y:0.62, c:'#22d3a5', cat:'animal'  },
    { w:'cat',      x:0.18, y:0.54, c:'#22d3a5', cat:'animal'  },
    { w:'tiger',    x:0.08, y:0.72, c:'#22d3a5', cat:'animal'  },
    { w:'wolf',     x:0.14, y:0.80, c:'#22d3a5', cat:'animal'  },
    { w:'computer', x:0.80, y:0.18, c:'#a78bfa', cat:'tech'    },
    { w:'laptop',   x:0.86, y:0.26, c:'#a78bfa', cat:'tech'    },
    { w:'phone',    x:0.76, y:0.30, c:'#a78bfa', cat:'tech'    },
    { w:'code',     x:0.82, y:0.38, c:'#a78bfa', cat:'tech'    },
    { w:'pizza',    x:0.78, y:0.70, c:'#fb923c', cat:'food'    },
    { w:'bread',    x:0.84, y:0.78, c:'#fb923c', cat:'food'    },
    { w:'apple',    x:0.72, y:0.82, c:'#fb923c', cat:'food'    },
    { w:'red',      x:0.44, y:0.82, c:'#f87171', cat:'color'   },
    { w:'blue',     x:0.50, y:0.88, c:'#f87171', cat:'color'   },
    { w:'green',    x:0.38, y:0.88, c:'#f87171', cat:'color'   },
  ];

  let hovered = -1;
  const { canvas, ctx, W, H } = initCanvas(container);
  const R = 18;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // King - man + woman = queen annotation
    const king = WORDS.find(w => w.w === 'king'), man = WORDS.find(w => w.w === 'man'),
          woman = WORDS.find(w => w.w === 'woman'), queen = WORDS.find(w => w.w === 'queen');
    if (king && man && woman && queen) {
      [king, man, woman, queen].forEach((node, i) => {
        const ops = [null, '-', '+', '≈'];
        if (i > 0) {
          const prev = [king, man, woman][i - 1];
          const pct = 0.5;
          const mx = (prev.x * W + node.x * W) / 2, my = (prev.y * H + node.y * H) / 2;
          ctx.font = 'bold 11px JetBrains Mono'; ctx.fillStyle = '#fbbf2460'; ctx.textAlign = 'center';
          ctx.fillText(ops[i], mx, my);
        }
      });
    }

    // Cluster circles
    const clusters = {
      royalty: { color: '#fbbf24', words: WORDS.filter(w => w.cat === 'royalty') },
      person:  { color: '#22d3ee', words: WORDS.filter(w => w.cat === 'person')  },
      animal:  { color: '#22d3a5', words: WORDS.filter(w => w.cat === 'animal')  },
      tech:    { color: '#a78bfa', words: WORDS.filter(w => w.cat === 'tech')    },
      food:    { color: '#fb923c', words: WORDS.filter(w => w.cat === 'food')    },
      color:   { color: '#f87171', words: WORDS.filter(w => w.cat === 'color')   },
    };
    Object.values(clusters).forEach(cl => {
      const xs = cl.words.map(w => w.x * W), ys = cl.words.map(w => w.y * H);
      const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
      const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
      const maxD = Math.max(...cl.words.map(w => Math.hypot(w.x * W - cx, w.y * H - cy))) + R * 1.4;
      ctx.beginPath(); ctx.arc(cx, cy, maxD, 0, Math.PI * 2);
      ctx.fillStyle = cl.color + '0a'; ctx.fill();
      ctx.strokeStyle = cl.color + '25'; ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);
    });

    // Hover connections
    if (hovered >= 0) {
      const hw = WORDS[hovered];
      WORDS.forEach((w, i) => {
        if (i === hovered || w.cat !== hw.cat) return;
        const dist = Math.hypot(w.x - hw.x, w.y - hw.y);
        const alpha = Math.max(0, 1 - dist * 2);
        ctx.beginPath(); ctx.moveTo(hw.x * W, hw.y * H); ctx.lineTo(w.x * W, w.y * H);
        ctx.strokeStyle = hw.c + Math.round(alpha * 80).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5; ctx.stroke();
      });
    }

    // Word nodes
    WORDS.forEach((w, i) => {
      const x = w.x * W, y = w.y * H;
      const isH = i === hovered;
      ctx.beginPath(); ctx.arc(x, y, isH ? R + 4 : R, 0, Math.PI * 2);
      ctx.fillStyle = w.c + (isH ? '30' : '15'); ctx.fill();
      ctx.strokeStyle = w.c + (isH ? 'ff' : '60');
      ctx.lineWidth = isH ? 2 : 1;
      if (isH) { ctx.shadowColor = w.c; ctx.shadowBlur = 12; }
      ctx.stroke(); ctx.shadowBlur = 0;
      ctx.font = `${isH ? 'bold ' : ''}10px Plus Jakarta Sans,sans-serif`;
      ctx.fillStyle = w.c; ctx.textAlign = 'center';
      ctx.fillText(w.w, x, y + 4);
    });

    // king - man + woman = queen annotation box
    const qx = queen.x * W, qy = queen.y * H;
    ctx.fillStyle = 'rgba(5,5,8,0.85)';
    rr(ctx, qx - 80, qy - 52, 160, 28, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(251,191,36,0.4)'; ctx.lineWidth = 1;
    rr(ctx, qx - 80, qy - 52, 160, 28, 6); ctx.stroke();
    ctx.font = 'bold 9px JetBrains Mono'; ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'center';
    ctx.fillText('king − man + woman ≈ queen', qx, qy - 33);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const my = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;
    const prev = hovered;
    hovered = WORDS.findIndex(w => Math.hypot(mx - w.x * W, my - w.y * H) < R + 6);
    if (hovered !== prev) draw();
  });
  canvas.addEventListener('mouseleave', () => { hovered = -1; draw(); });
  draw();
}

/* ══════════ S9 — Self-Attention ══════════ */
function initAttention() {
  const container = document.getElementById('attentionCanvas');
  const ex1Btn = document.getElementById('attnEx1');
  const ex2Btn = document.getElementById('attnEx2');
  if (!container) return;

  const EXAMPLES = [
    {
      tokens: ['I', 'went', 'to', 'the', 'river', 'bank', 'to', 'fish'],
      attn: [
        [0.8,0.05,0.03,0.02,0.03,0.03,0.02,0.02],
        [0.1, 0.7,0.05,0.03,0.05,0.03,0.02,0.02],
        [0.05,0.05,0.7,0.05,0.05,0.05,0.03,0.02],
        [0.03,0.03,0.05,0.75,0.05,0.05,0.02,0.02],
        [0.03,0.03,0.03,0.04,0.75,0.07,0.02,0.03],
        [0.03,0.03,0.04,0.04,0.45,0.30,0.05,0.06], // bank attends to river
        [0.03,0.03,0.10,0.04,0.03,0.03,0.70,0.04],
        [0.03,0.03,0.03,0.03,0.12,0.20,0.05,0.51], // fish attends to bank + river
      ]
    },
    {
      tokens: ['I', 'deposited', 'money', 'at', 'the', 'bank'],
      attn: [
        [0.8,0.05,0.05,0.04,0.03,0.03],
        [0.1, 0.6,0.14,0.06,0.04,0.06],
        [0.06,0.14,0.65,0.05,0.04,0.06],
        [0.04,0.05,0.06,0.70,0.08,0.07],
        [0.04,0.05,0.05,0.10,0.68,0.08],
        [0.04,0.28,0.32,0.07,0.06,0.23], // bank attends to deposited + money
      ]
    }
  ];

  let current = 0, selectedToken = -1;
  const { canvas, ctx, W, H } = initCanvas(container);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const ex = EXAMPLES[current];
    const n = ex.tokens.length;
    const tW = Math.min(56, (W - 40) / n);
    const tH = 34;
    const startX = (W - n * tW - (n - 1) * 8) / 2;
    const tokY = H * 0.38;

    // Title
    ctx.font = 'bold 11px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.textAlign = 'center';
    ctx.fillText(current === 0 ? '"I went to the river bank to fish"' : '"I deposited money at the bank"', W / 2, 22);

    // Instruction
    ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
    ctx.fillText('Click a word to see what it attends to', W / 2, H - 10);

    // Attention lines from selected token
    if (selectedToken >= 0) {
      const weights = ex.attn[selectedToken];
      const sx = startX + selectedToken * (tW + 8) + tW / 2;
      weights.forEach((w, j) => {
        if (j === selectedToken || w < 0.05) return;
        const tx = startX + j * (tW + 8) + tW / 2;
        const alpha = Math.pow(w, 0.5);
        ctx.beginPath();
        ctx.moveTo(sx, tokY - 2);
        const cp1x = (sx + tx) / 2, cp1y = tokY - 60 - alpha * 50;
        ctx.quadraticCurveTo(cp1x, cp1y, tx, tokY - 2);
        ctx.strokeStyle = `rgba(124,111,255,${Math.min(alpha, 0.9)})`;
        ctx.lineWidth = alpha * 4;
        ctx.stroke();
        ctx.fillStyle = `rgba(124,111,255,${Math.min(alpha, 0.9)})`;
        ctx.font = 'bold 9px JetBrains Mono'; ctx.textAlign = 'center';
        ctx.fillText((w * 100).toFixed(0) + '%', (sx + tx) / 2, cp1y - 4);
      });
    }

    // Tokens
    ex.tokens.forEach((tok, i) => {
      const x = startX + i * (tW + 8);
      const isSel = i === selectedToken;
      const attnTo = selectedToken >= 0 ? ex.attn[selectedToken][i] : 0;
      const isHighAttn = attnTo > 0.15;

      ctx.fillStyle = isSel ? 'rgba(124,111,255,0.25)' : isHighAttn ? `rgba(124,111,255,${attnTo * 0.4})` : 'rgba(255,255,255,0.04)';
      rr(ctx, x, tokY - tH / 2, tW, tH, 8); ctx.fill();
      ctx.strokeStyle = isSel ? '#7c6fff' : isHighAttn ? `rgba(124,111,255,${attnTo * 0.8})` : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = isSel ? 2 : 1;
      if (isSel) { ctx.shadowColor = '#7c6fff'; ctx.shadowBlur = 12; }
      rr(ctx, x, tokY - tH / 2, tW, tH, 8); ctx.stroke(); ctx.shadowBlur = 0;

      ctx.font = `${isSel ? 'bold ' : ''}11px Plus Jakarta Sans,sans-serif`;
      ctx.fillStyle = isSel ? '#a78bfa' : isHighAttn ? '#e0e0ff' : '#9191a8';
      ctx.textAlign = 'center'; ctx.fillText(tok, x + tW / 2, tokY + 4);
    });

    // Legend below
    if (selectedToken >= 0) {
      const tokName = ex.tokens[selectedToken];
      ctx.font = 'bold 11px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#a78bfa'; ctx.textAlign = 'center';
      ctx.fillText(`"${tokName}" — line thickness = attention weight`, W / 2, tokY + tH / 2 + 28);
      if (current === 1 && selectedToken === 5) {
        ctx.font = '10px Plus Jakarta Sans'; ctx.fillStyle = '#22d3a5';
        ctx.fillText('"bank" strongly attends to "deposited" and "money" → financial context!', W / 2, tokY + tH / 2 + 46);
      } else if (current === 0 && selectedToken === 5) {
        ctx.font = '10px Plus Jakarta Sans'; ctx.fillStyle = '#22d3a5';
        ctx.fillText('"bank" attends to "river" and "fish" → natural context!', W / 2, tokY + tH / 2 + 46);
      }
    }
  }

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const my = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;
    const ex = EXAMPLES[current];
    const n = ex.tokens.length;
    const tW = Math.min(56, (W - 40) / n);
    const startX = (W - n * tW - (n - 1) * 8) / 2;
    const tokY = H * 0.38;
    let clicked = -1;
    ex.tokens.forEach((_, i) => {
      const x = startX + i * (tW + 8);
      if (mx >= x && mx <= x + tW && my >= tokY - 17 && my <= tokY + 17) clicked = i;
    });
    selectedToken = clicked === selectedToken ? -1 : clicked;
    draw();
  });

  ex1Btn?.addEventListener('click', () => { current = 0; selectedToken = -1; draw(); ex1Btn.className = 'btn-learn primary sm'; ex2Btn.className = 'btn-learn ghost sm'; });
  ex2Btn?.addEventListener('click', () => { current = 1; selectedToken = -1; draw(); ex2Btn.className = 'btn-learn primary sm'; ex1Btn.className = 'btn-learn ghost sm'; });
  draw();
}

/* ══════════ S10 — LLM Next-Token Prediction ══════════ */
function initLLM() {
  const container = document.getElementById('llmCanvas');
  const tempSlider = document.getElementById('tempSlider');
  const tempVal = document.getElementById('tempVal');
  if (!container) return;

  const COMPLETIONS = [
    { prompt: 'The capital of France is', tokens: [
      { t: 'Paris',    logit: 4.2 },
      { t: 'Lyon',     logit: 1.8 },
      { t: 'located',  logit: 1.4 },
      { t: 'a',        logit: 1.2 },
      { t: 'known',    logit: 0.9 },
    ]},
    { prompt: 'The capital of France is Paris. The capital of Germany is', tokens: [
      { t: 'Berlin',   logit: 4.5 },
      { t: 'Munich',   logit: 1.6 },
      { t: 'Frankfurt',logit: 1.2 },
      { t: 'a',        logit: 0.8 },
      { t: 'the',      logit: 0.7 },
    ]},
    { prompt: 'The capital of France is Paris. The capital of Germany is Berlin. The next AI model will be', tokens: [
      { t: 'GPT',      logit: 2.8 },
      { t: 'Claude',   logit: 2.5 },
      { t: 'released', logit: 2.2 },
      { t: 'more',     logit: 2.0 },
      { t: 'trained',  logit: 1.8 },
    ]},
  ];

  let step = 0, temp = 0.7;

  function softmax(logits, temperature) {
    const scaled = logits.map(l => l / temperature);
    const maxL = Math.max(...scaled);
    const exps = scaled.map(l => Math.exp(l - maxL));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sum);
  }

  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const ex = COMPLETIONS[Math.min(step, COMPLETIONS.length - 1)];
    const probs = softmax(ex.tokens.map(t => t.logit), temp);
    const pad = { l: 20, r: 20, t: 20, b: 16 };
    const barAreaH = H - 80;
    const barH = Math.min(28, (barAreaH - (ex.tokens.length - 1) * 6) / ex.tokens.length);
    const barGap = 8;
    const labelW = 90;

    // Prompt display
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    rr(ctx, pad.l, pad.t, W - pad.l - pad.r, 40, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    rr(ctx, pad.l, pad.t, W - pad.l - pad.r, 40, 8); ctx.stroke();

    const promptText = ex.prompt;
    const maxChars = Math.floor((W - 40) / 7);
    const display = promptText.length > maxChars ? '…' + promptText.slice(-(maxChars - 1)) : promptText;
    ctx.font = '11px JetBrains Mono,monospace'; ctx.fillStyle = '#a78bfa'; ctx.textAlign = 'left';
    ctx.fillText(display + ' ▌', pad.l + 10, pad.t + 25);

    // "Next token:" label
    ctx.font = 'bold 10px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'left';
    ctx.fillText('Next token probabilities:', pad.l, 78);

    // Probability bars
    ex.tokens.forEach((tok, i) => {
      const p = probs[i];
      const y = 90 + i * (barH + barGap);
      const maxBarW = W - pad.l - pad.r - labelW - 50;

      ctx.font = '11px JetBrains Mono,monospace'; ctx.fillStyle = '#9191a8'; ctx.textAlign = 'right';
      ctx.fillText(tok.t, pad.l + labelW - 6, y + barH * 0.68);

      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      rr(ctx, pad.l + labelW, y, maxBarW, barH, 5); ctx.fill();

      const barColor = i === 0 ? '#22d3a5' : i === 1 ? '#fbbf24' : '#7c6fff';
      ctx.fillStyle = barColor + (i === 0 ? '' : '80');
      rr(ctx, pad.l + labelW, y, Math.max(4, p * maxBarW), barH, 5); ctx.fill();
      if (i === 0 && p > 0.5) { ctx.shadowColor = barColor; ctx.shadowBlur = 8; rr(ctx, pad.l + labelW, y, p * maxBarW, barH, 5); ctx.fill(); ctx.shadowBlur = 0; }

      ctx.font = 'bold 10px JetBrains Mono,monospace'; ctx.fillStyle = i === 0 ? barColor : barColor;
      ctx.textAlign = 'left';
      ctx.fillText((p * 100).toFixed(1) + '%', pad.l + labelW + p * maxBarW + 6, y + barH * 0.68);
    });

    ctx.font = '9px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
    ctx.fillText(`Temperature ${temp.toFixed(1)} — ${temp < 0.5 ? 'deterministic (always picks top)' : temp > 1.2 ? 'creative (spread out)' : 'balanced'}`, W / 2, H - 4);
  }

  tempSlider?.addEventListener('input', function() {
    temp = parseInt(this.value) / 10;
    if (tempVal) tempVal.textContent = temp.toFixed(1);
    draw();
  });

  document.getElementById('btnGenToken')?.addEventListener('click', () => {
    if (step < COMPLETIONS.length - 1) step++;
    draw();
  });
  document.getElementById('btnGenReset')?.addEventListener('click', () => { step = 0; draw(); });

  draw();
}

/* ══════════ S11 — Diffusion Animation ══════════ */
function initDiffusion() {
  const container = document.getElementById('diffusionCanvas');
  const runBtn = document.getElementById('btnDiffuse');
  const resetBtn = document.getElementById('btnDiffuseReset');
  if (!container) return;

  const GRID = 20;
  let raf = null, t = 0, running = false;

  // Target: simple smiley face
  const TARGET = (() => {
    const g = Array.from({ length: GRID }, () => Array(GRID).fill(0));
    // Face circle
    for (let r = 0; r < GRID; r++) for (let c = 0; c < GRID; c++) {
      const dx = c - GRID / 2 + 0.5, dy = r - GRID / 2 + 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > GRID * 0.42 && dist < GRID * 0.48) g[r][c] = 1; // outline
      if (r >= 6 && r <= 8 && c >= 6 && c <= 8) g[r][c] = 2; // left eye
      if (r >= 6 && r <= 8 && c >= 12 && c <= 14) g[r][c] = 2; // right eye
      if (r >= 13 && r <= 14 && c >= 7 && c <= 13 && dist < GRID * 0.4) g[r][c] = 3; // smile
    }
    return g;
  })();

  // Noise colors (seeded pseudo-random)
  let noiseGrid;
  function initNoise() {
    let seed = 42;
    function rand() { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; }
    noiseGrid = Array.from({ length: GRID }, () => Array.from({ length: GRID }, () => ({ h: rand(), s: 0.5 + rand() * 0.5, l: 0.3 + rand() * 0.5 })));
  }

  function hsl(h, s, l) { return `hsl(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%)`; }

  function targetColor(v) {
    if (v === 0) return { r: 253, g: 224, b: 71 };  // face yellow
    if (v === 1) return { r: 245, g: 158, b: 11 };  // outline orange
    if (v === 2) return { r: 15, g: 15, b: 20 };    // eyes dark
    if (v === 3) return { r: 120, g: 50, b: 20 };   // smile
    return { r: 5, g: 5, b: 8 };
  }

  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const cellW = (W - 40) / GRID, cellH = (H - 60) / GRID;
    const ox = 20, oy = 36;

    // Progress bar
    ctx.fillStyle = 'rgba(255,255,255,0.06)'; rr(ctx, 20, 8, W - 40, 10, 4); ctx.fill();
    ctx.fillStyle = t < 1 ? '#7c6fff' : '#22d3a5'; rr(ctx, 20, 8, (W - 40) * t, 10, 4); ctx.fill();
    ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
    ctx.fillText(t === 0 ? 'Pure noise (step 0)' : t === 1 ? '✓ Diffusion complete — image generated!' : `Denoising… step ${Math.round(t * 40)}/40`, W / 2, 30);

    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        const noise = noiseGrid[r][c];
        const tgt = targetColor(TARGET[r][c]);
        const nr = Math.round(noise.h * 255), ng = Math.round(noise.s * 200), nb = Math.round(noise.l * 255);
        const lr = Math.round(nr + (tgt.r - nr) * t);
        const lg = Math.round(ng + (tgt.g - ng) * t);
        const lb = Math.round(nb + (tgt.b - nb) * t);
        ctx.fillStyle = `rgb(${lr},${lg},${lb})`;
        ctx.fillRect(ox + c * cellW, oy + r * cellH, cellW - 0.5, cellH - 0.5);
      }
    }

    // Step labels at bottom
    const steps = ['Noise', 'T=30', 'T=20', 'T=10', 'T=5', 'Image'];
    steps.forEach((s, i) => {
      const pct = i / (steps.length - 1);
      ctx.font = '8px JetBrains Mono'; ctx.fillStyle = t >= pct ? '#a78bfa' : '#2a2a3a';
      ctx.textAlign = 'center'; ctx.fillText(s, ox + pct * (W - 40), oy + GRID * cellH + 14);
    });
  }

  function animate() {
    if (!running) return;
    t = Math.min(1, t + 0.012);
    draw();
    if (t < 1) raf = requestAnimationFrame(animate);
    else { running = false; if (runBtn) runBtn.textContent = '▶ Run Again'; }
  }

  initNoise();
  draw();

  runBtn?.addEventListener('click', () => {
    if (running) return;
    t = 0; running = true; runBtn.textContent = '⏹ Running…';
    raf = requestAnimationFrame(animate);
  });
  resetBtn?.addEventListener('click', () => {
    running = false; if (raf) cancelAnimationFrame(raf);
    initNoise(); t = 0; draw(); if (runBtn) runBtn.textContent = '▶ Run Diffusion';
  });
}

/* ══════════ S13 — AI Agents ══════════ */
function initAgents() {
  const container = document.getElementById('agentCanvas');
  const runBtn = document.getElementById('btnAgentRun');
  const resetBtn = document.getElementById('btnAgentReset');
  if (!container) return;

  const STEPS = [
    { label: 'Perceive',  icon: '👁️',  color: '#22d3ee', desc: 'Read task + current context' },
    { label: 'Think',     icon: '🧠',  color: '#a78bfa', desc: 'Reason: what to do next?' },
    { label: 'Plan',      icon: '📋',  color: '#fbbf24', desc: 'Choose tool + arguments' },
    { label: 'Act',       icon: '⚙️',  color: '#f87171', desc: 'Call tool / execute action' },
    { label: 'Observe',   icon: '🔍',  color: '#22d3a5', desc: 'Read tool output, update context' },
  ];
  const TOOLS = [
    { label: 'Web Search', icon: '🌐', color: '#22d3ee' },
    { label: 'Run Code',   icon: '💻', color: '#a78bfa' },
    { label: 'Read File',  icon: '📄', color: '#fbbf24' },
    { label: 'Send Email', icon: '📧', color: '#f87171' },
  ];

  let current = -1, raf = null, running = false;

  const { canvas, ctx, W, H } = initCanvas(container);
  const cx = W * 0.42, cy = H * 0.5;
  const R = Math.min(W, H) * 0.28;
  const nodeR = 32;

  function nodePos(i) {
    const angle = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  }

  // Task log
  const LOG = [
    'Task: "Find top 3 AI papers from 2024 and summarize"',
    'Thinking… I need to search for recent AI papers.',
    'Action: Web Search("top AI papers 2024 arxiv")',
    'Observed: Found 12 results. Top: Mamba-2, Gemini 1.5, GPT-4o.',
    'Thinking… I have results. Now I need to summarize each.',
    'Action: Summarize each paper (internal reasoning)',
    'Observed: 3 summaries generated.',
    'Thinking… Task complete. Format the response.',
    '✓ Done — returning final answer to user.',
  ];

  let logStep = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Arc background ring
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = nodeR * 2 + 4; ctx.stroke();

    // Draw connecting arcs between steps
    STEPS.forEach((_, i) => {
      const from = nodePos(i), to = nodePos((i + 1) % STEPS.length);
      const active = i < current || (current === STEPS.length - 1 && i === STEPS.length - 1);
      ctx.beginPath();
      ctx.arc(cx, cy, R, (i / STEPS.length - 1/STEPS.length/2) * Math.PI * 2 - Math.PI / 2,
                         ((i + 0.9) / STEPS.length) * Math.PI * 2 - Math.PI / 2);
      ctx.strokeStyle = active ? STEPS[i].color + '60' : 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 3; ctx.stroke();
    });

    // Draw step nodes
    STEPS.forEach((step, i) => {
      const pos = nodePos(i);
      const isActive = i === current % STEPS.length;
      const isDone = current > i || (current === STEPS.length - 1);

      ctx.beginPath(); ctx.arc(pos.x, pos.y, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? step.color + '35' : isDone ? step.color + '18' : 'rgba(255,255,255,0.04)';
      if (isActive) { ctx.shadowColor = step.color; ctx.shadowBlur = 20; }
      ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = isActive ? step.color : isDone ? step.color + '60' : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = isActive ? 2 : 1; ctx.stroke();

      ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = isActive ? '#fff' : step.color + 'aa';
      ctx.fillText(step.icon, pos.x, pos.y + 3);

      ctx.font = `${isActive ? 'bold ' : ''}9px Plus Jakarta Sans,sans-serif`;
      ctx.fillStyle = isActive ? step.color : '#56566e';
      ctx.textAlign = 'center';
      // Place label away from center
      const lx = pos.x + (pos.x - cx) * 0.22, ly = pos.y + (pos.y - cy) * 0.22 + nodeR + 12;
      ctx.fillText(step.label, lx, ly);
      if (isActive) { ctx.font = '8px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#9191a8'; ctx.fillText(step.desc, lx, ly + 12); }
    });

    // Tools on right side
    const toolX = W * 0.80;
    ctx.font = 'bold 9px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
    ctx.fillText('TOOLS', toolX, H * 0.22);
    TOOLS.forEach((tool, i) => {
      const ty = H * 0.30 + i * 44;
      const isUsed = current >= 2 && current % STEPS.length === 3; // "Act" step
      ctx.fillStyle = isUsed ? tool.color + '18' : 'rgba(255,255,255,0.03)';
      rr(ctx, toolX - 44, ty - 16, 88, 30, 8); ctx.fill();
      ctx.strokeStyle = isUsed ? tool.color + '60' : 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
      rr(ctx, toolX - 44, ty - 16, 88, 30, 8); ctx.stroke();
      ctx.font = '10px sans-serif'; ctx.fillStyle = isUsed ? '#fff' : '#3a3a50'; ctx.textAlign = 'center';
      ctx.fillText(tool.icon + ' ' + tool.label, toolX, ty + 2);
    });

    // Arrow from Act to tools
    if (current >= 3) {
      const actPos = nodePos(3);
      ctx.beginPath(); ctx.moveTo(actPos.x + nodeR, actPos.y);
      ctx.lineTo(toolX - 44, H * 0.30);
      ctx.strokeStyle = 'rgba(248,113,113,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.stroke(); ctx.setLineDash([]);
    }

    // Log area at bottom
    const logY = H - 60;
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; rr(ctx, 10, logY, W - 20, 52, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; rr(ctx, 10, logY, W - 20, 52, 8); ctx.stroke();
    if (logStep < LOG.length) {
      ctx.font = '9px JetBrains Mono,monospace'; ctx.fillStyle = '#a78bfa'; ctx.textAlign = 'left';
      const msg = LOG[Math.min(logStep, LOG.length - 1)];
      ctx.fillText(msg.length > 68 ? msg.slice(0, 68) + '…' : msg, 18, logY + 20);
      if (logStep > 0) { ctx.fillStyle = '#56566e'; ctx.fillText(LOG[logStep - 1].length > 68 ? LOG[logStep - 1].slice(0,68)+'…' : LOG[logStep - 1], 18, logY + 38); }
    }
  }

  let interval = null;
  runBtn?.addEventListener('click', () => {
    if (running) return;
    if (current >= STEPS.length * 2) { current = -1; logStep = 0; }
    running = true; runBtn.textContent = '⏹ Running…';
    interval = setInterval(() => {
      current++; logStep = Math.min(logStep + 1, LOG.length - 1);
      draw();
      if (current >= STEPS.length * 2 - 1) {
        clearInterval(interval); running = false; runBtn.textContent = '▶ Run Agent';
      }
    }, 700);
  });
  resetBtn?.addEventListener('click', () => {
    clearInterval(interval); running = false; current = -1; logStep = 0;
    draw(); if (runBtn) runBtn.textContent = '▶ Run Agent';
  });

  draw();
}

/* ══════════ S14 — RAG Pipeline ══════════ */
function initRAG() {
  const container = document.getElementById('ragCanvas');
  const runBtn  = document.getElementById('btnRagRun');
  const resetBtn = document.getElementById('btnRagReset');
  if (!container) return;

  const STAGES = [
    { label: 'User Query',      sub: '"What is our refund policy?"',   icon: '❓', color: '#22d3ee' },
    { label: 'Embed Query',     sub: '[0.23, 0.87, −0.44, 0.61 …]',    icon: '🔢', color: '#a78bfa' },
    { label: 'Vector Search',   sub: 'Searching 10,000 doc chunks',     icon: '🔍', color: '#fbbf24' },
    { label: 'Retrieved Chunks',sub: '"Refunds accepted within 30 days"',icon: '📄', color: '#22d3a5' },
    { label: 'LLM + Context',   sub: 'Grounded answer generated',       icon: '🤖', color: '#f87171' },
  ];

  const ARROWS = ['embed', 'search', 'retrieve', 'generate', ''];
  let activeStage = -1, interval = null;

  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const pad = 18, stageW = (W - pad * 2 - (STAGES.length - 1) * 8) / STAGES.length;
    const stageH = 90, stageY = H / 2 - stageH / 2 - 10;

    // Title
    ctx.font = 'bold 10px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
    ctx.fillText('RAG retrieves context before answering — grounded in your documents', W / 2, 18);

    STAGES.forEach((stage, i) => {
      const x = pad + i * (stageW + 8);
      const isActive = i === activeStage;
      const isDone = i < activeStage;

      // Arrow between stages
      if (i > 0) {
        const arrowX = x - 6;
        ctx.beginPath(); ctx.moveTo(arrowX - 4, stageY + stageH / 2); ctx.lineTo(arrowX, stageY + stageH / 2);
        ctx.strokeStyle = isDone ? stage.color + '70' : 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1.5; ctx.stroke();
      }

      // Stage box
      ctx.fillStyle = isActive ? stage.color + '22' : isDone ? stage.color + '10' : 'rgba(255,255,255,0.03)';
      rr(ctx, x, stageY, stageW, stageH, 10); ctx.fill();
      ctx.strokeStyle = isActive ? stage.color : isDone ? stage.color + '50' : 'rgba(255,255,255,0.08)';
      ctx.lineWidth = isActive ? 1.5 : 1;
      if (isActive) { ctx.shadowColor = stage.color; ctx.shadowBlur = 12; }
      rr(ctx, x, stageY, stageW, stageH, 10); ctx.stroke(); ctx.shadowBlur = 0;

      // Icon
      ctx.font = '20px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(stage.icon, x + stageW / 2, stageY + 28);

      // Label
      ctx.font = `${isActive ? 'bold ' : ''}9px Plus Jakarta Sans,sans-serif`;
      ctx.fillStyle = isActive ? stage.color : isDone ? stage.color + 'cc' : '#56566e';
      ctx.textAlign = 'center';
      ctx.fillText(stage.label, x + stageW / 2, stageY + 44);

      // Sub label (visible when active or done)
      if (isActive || isDone) {
        ctx.font = '8px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.45)';
        const sub = stage.sub;
        const maxW = stageW - 8;
        // Wrap text
        const words = sub.split(' ');
        let line = '', lines = [];
        words.forEach(w => {
          const test = line ? line + ' ' + w : w;
          if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
          else line = test;
        });
        if (line) lines.push(line);
        lines.slice(0, 2).forEach((l, li) => ctx.fillText(l, x + stageW / 2, stageY + 58 + li * 12));
      }
    });

    // Status row
    ctx.font = '10px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    if (activeStage < 0) {
      ctx.fillStyle = '#56566e'; ctx.fillText('Click "Run RAG Query" to step through the pipeline', W / 2, stageY + stageH + 28);
    } else if (activeStage >= STAGES.length) {
      ctx.fillStyle = '#22d3a5'; ctx.fillText('✓ Answer grounded in documents — not hallucinated', W / 2, stageY + stageH + 28);
    } else {
      ctx.fillStyle = STAGES[activeStage].color;
      ctx.fillText('Stage ' + (activeStage + 1) + ' / ' + STAGES.length + ': ' + STAGES[activeStage].label, W / 2, stageY + stageH + 28);
    }

    // Contrast box at bottom
    const by = stageY + stageH + 44;
    ctx.fillStyle = 'rgba(34,211,165,0.06)'; rr(ctx, pad, by, W - pad * 2, 42, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(34,211,165,0.2)'; ctx.lineWidth = 1; rr(ctx, pad, by, W - pad * 2, 42, 8); ctx.stroke();
    ctx.font = '9px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#22d3a5'; ctx.textAlign = 'left';
    ctx.fillText('Without RAG: LLM guesses from training data → may hallucinate', pad + 10, by + 16);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('With RAG: LLM reads your docs → answers grounded in facts + cites sources', pad + 10, by + 30);
  }

  draw();

  runBtn?.addEventListener('click', () => {
    if (interval) return;
    activeStage = 0; draw();
    interval = setInterval(() => {
      activeStage++;
      draw();
      if (activeStage >= STAGES.length) { clearInterval(interval); interval = null; }
    }, 900);
  });

  resetBtn?.addEventListener('click', () => {
    if (interval) { clearInterval(interval); interval = null; }
    activeStage = -1; draw();
  });
}

/* ══════════ S17 — AI Safety & Hallucinations ══════════ */
function initSafety() {
  const container = document.getElementById('safetyCanvas');
  const runBtn      = document.getElementById('btnSafetyRun');
  const mitigateBtn = document.getElementById('btnSafetyMitigate');
  const resetBtn    = document.getElementById('btnSafetyReset');
  if (!container) return;

  let state = 'idle'; // idle | hallucinating | mitigated

  const HALLUCINATES = [
    { text: 'The Eiffel Tower was built in', ok: true },
    { text: '1887', ok: false, note: '← Wrong! Built 1887–1889, opened 1889' },
    { text: 'by architect', ok: true },
    { text: 'Gustave Eiffel Jr.', ok: false, note: '← Hallucinated! His name was Gustave Eiffel' },
    { text: 'It stands', ok: true },
    { text: '330 metres', ok: true },
    { text: 'tall and has', ok: true },
    { text: '1,789 steps', ok: false, note: '← Wrong! It has 1,665 steps' },
  ];

  const GROUNDED = [
    { text: 'The Eiffel Tower was built in', ok: true },
    { text: '1887–1889', ok: true, note: '✓ Source: doc_history.pdf p.2' },
    { text: 'by architect', ok: true },
    { text: 'Gustave Eiffel', ok: true, note: '✓ Source: doc_history.pdf p.2' },
    { text: 'It stands', ok: true },
    { text: '330 metres', ok: true },
    { text: 'tall and has', ok: true },
    { text: '1,665 steps', ok: true, note: '✓ Source: doc_facts.pdf p.1' },
  ];

  function draw() {
    const { ctx, W, H } = initCanvas(container);
    const halfW = W / 2 - 6, padX = 12, padY = 36;

    // Headers
    const labels = state === 'idle' ? ['LLM Response', 'LLM with RAG'] : state === 'hallucinating' ? ['LLM (No RAG)', 'LLM with RAG'] : ['LLM (No RAG)', 'LLM + RAG'];
    const colors = ['#f87171', '#22d3a5'];

    labels.forEach((label, side) => {
      const x = side === 0 ? padX : halfW + padX + 12;
      ctx.fillStyle = colors[side] + '12';
      rr(ctx, x, padY, halfW, H - padY - 10, 10); ctx.fill();
      ctx.strokeStyle = colors[side] + (state === 'idle' ? '25' : '40'); ctx.lineWidth = 1;
      rr(ctx, x, padY, halfW, H - padY - 10, 10); ctx.stroke();

      ctx.font = 'bold 10px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = colors[side]; ctx.textAlign = 'center';
      ctx.fillText(label, x + halfW / 2, padY - 8);

      if (side === 0 && state !== 'idle') {
        // Show hallucinating text
        let lineY = padY + 18;
        HALLUCINATES.forEach(chunk => {
          const isErr = !chunk.ok;
          const col = isErr && state === 'hallucinating' ? '#f87171' : 'rgba(255,255,255,0.55)';
          ctx.font = (isErr && state === 'hallucinating' ? 'bold ' : '') + '9px Plus Jakarta Sans,sans-serif';
          ctx.fillStyle = col; ctx.textAlign = 'left';
          ctx.fillText(chunk.text, x + 8, lineY);
          lineY += 16;
          if (chunk.note && state === 'hallucinating') {
            ctx.font = '8px JetBrains Mono,monospace'; ctx.fillStyle = '#f87171aa';
            ctx.fillText(chunk.note, x + 8, lineY);
            lineY += 14;
          }
        });
        ctx.font = 'bold 9px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#f87171'; ctx.textAlign = 'center';
        ctx.fillText('⚠ 3 hallucinations detected', x + halfW / 2, H - 20);
      } else if (side === 1 && state === 'mitigated') {
        let lineY = padY + 18;
        GROUNDED.forEach(chunk => {
          ctx.font = '9px Plus Jakarta Sans,sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.textAlign = 'left';
          ctx.fillText(chunk.text, x + 8, lineY);
          lineY += 16;
          if (chunk.note) {
            ctx.font = '8px JetBrains Mono,monospace'; ctx.fillStyle = '#22d3a570';
            ctx.fillText(chunk.note, x + 8, lineY);
            lineY += 13;
          }
        });
        ctx.font = 'bold 9px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#22d3a5'; ctx.textAlign = 'center';
        ctx.fillText('✓ All facts sourced — no hallucinations', x + halfW / 2, H - 20);
      } else if (state === 'idle') {
        ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
        ctx.fillText(side === 0 ? 'Click "Show Hallucination"' : 'Click "Apply Mitigations"', x + halfW / 2, H / 2);
        ctx.fillText(side === 0 ? 'to see a real example' : 'to see RAG in action', x + halfW / 2, H / 2 + 16);
      }
    });

    // VS divider
    ctx.font = 'bold 10px JetBrains Mono,monospace'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
    ctx.fillText('VS', W / 2, H / 2);
  }

  draw();

  runBtn?.addEventListener('click', () => {
    state = 'hallucinating'; draw();
  });
  mitigateBtn?.addEventListener('click', () => {
    state = 'mitigated'; draw();
  });
  resetBtn?.addEventListener('click', () => {
    state = 'idle'; draw();
  });
}

/* ══════════ S19 — AI Strategy Matrix ══════════ */
function initStrategy() {
  const container = document.getElementById('strategyCanvas');
  if (!container) return;

  const QUADRANTS = [
    { label: 'Use an API',       sub: 'Off-the-shelf LLM\nvia OpenAI / Anthropic / Google',  color: '#22d3ee', x: 0, y: 1 }, // low diff, high data uniqueness
    { label: 'Build & Own',      sub: 'Custom model on\nyour proprietary data',               color: '#fbbf24', x: 1, y: 1 }, // high diff, high data
    { label: 'Prompt + API',     sub: 'Tune prompts, system\nmessage, few-shot examples',     color: '#a78bfa', x: 0, y: 0 }, // low diff, low data
    { label: 'RAG or Fine-tune', sub: 'Index your data, or\nfine-tune a base model',          color: '#22d3a5', x: 1, y: 0 }, // high diff, low data
  ];

  let hovered = -1;
  const { canvas, ctx, W, H } = initCanvas(container);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const pad = 52, gap = 10;
    const qW = (W - pad * 2 - gap) / 2;
    const qH = (H - pad * 2 - gap) / 2;

    // Axis labels
    ctx.font = 'bold 10px Plus Jakarta Sans,sans-serif'; ctx.fillStyle = '#56566e'; ctx.textAlign = 'center';
    ctx.fillText('Data Uniqueness', W / 2, 14);
    ctx.fillText('Low', pad + qW / 2, H - 4);
    ctx.fillText('High', pad + gap + qW + qW / 2, H - 4);

    ctx.save(); ctx.translate(12, H / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Competitive Differentiation', 0, 0); ctx.restore();

    ctx.font = '9px Plus Jakarta Sans,sans-serif';
    ctx.save(); ctx.translate(12, pad + qH / 2 + 10); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Low', 0, 0); ctx.restore();
    ctx.save(); ctx.translate(12, pad + qH * 1.5 + gap + 10); ctx.rotate(-Math.PI / 2);
    ctx.fillText('High', 0, 0); ctx.restore();

    // Draw quadrants
    QUADRANTS.forEach((q, i) => {
      const qx = pad + q.x * (qW + gap);
      const qy = pad + (1 - q.y) * (qH + gap); // invert y (high at top)
      const isH = i === hovered;

      ctx.fillStyle = isH ? q.color + '22' : q.color + '0d';
      rr(ctx, qx, qy, qW, qH, 10); ctx.fill();
      ctx.strokeStyle = isH ? q.color : q.color + '40'; ctx.lineWidth = isH ? 1.5 : 1;
      if (isH) { ctx.shadowColor = q.color; ctx.shadowBlur = 12; }
      rr(ctx, qx, qy, qW, qH, 10); ctx.stroke(); ctx.shadowBlur = 0;

      ctx.font = `bold ${isH ? 11 : 10}px Plus Jakarta Sans,sans-serif`;
      ctx.fillStyle = q.color; ctx.textAlign = 'center';
      ctx.fillText(q.label, qx + qW / 2, qy + qH * 0.38);

      const sub = q.sub.split('\n');
      sub.forEach((line, li) => {
        ctx.font = `9px Plus Jakarta Sans,sans-serif`;
        ctx.fillStyle = isH ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)';
        ctx.fillText(line, qx + qW / 2, qy + qH * 0.38 + 18 + li * 14);
      });
    });

    // Center intersection dot
    ctx.beginPath(); ctx.arc(W / 2, H / 2, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill();
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const my = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;
    const pad = 52, gap = 10;
    const qW = (W - pad * 2 - gap) / 2, qH = (H - pad * 2 - gap) / 2;
    let found = -1;
    QUADRANTS.forEach((q, i) => {
      const qx = pad + q.x * (qW + gap), qy = pad + (1 - q.y) * (qH + gap);
      if (mx >= qx && mx <= qx + qW && my >= qy && my <= qy + qH) found = i;
    });
    if (found !== hovered) { hovered = found; draw(); }
  });
  canvas.addEventListener('mouseleave', () => { hovered = -1; draw(); });
  draw();
}

/* ══════════ INIT — trigger on scroll into view ══════════ */
function onVisible(id, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) { done = true; setTimeout(fn, 200); obs.disconnect(); }
  }, { threshold: 0.2 });
  obs.observe(el);
}

onVisible('s1',  initAICompare);
onVisible('s2',  initNeuron);
onVisible('s3',  initNetwork);
onVisible('s4',  initTrainingLoop);
onVisible('s5',  initGradientDescent);
onVisible('s7',  initTokenizer);
onVisible('s8',  initEmbeddings);
onVisible('s9',  initAttention);
onVisible('s10', initLLM);
onVisible('s11', initDiffusion);
onVisible('s13', initAgents);
onVisible('s14', initRAG);
onVisible('s17', initSafety);
onVisible('s19', initStrategy);
