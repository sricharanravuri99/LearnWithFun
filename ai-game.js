/* ==========================================================
   AI MASTERY QUEST — Full Game Engine
   15 lessons × 3 levels with interactive diagrams
   ========================================================== */

/* ── LESSON DATA ─────────────────────────────────────────── */
const LESSONS = [
  /* ───── BEGINNER ───── */
  {
    id:1, level:'beginner', icon:'🤖', order:1, xp:50,
    title:'What is AI?',
    subtitle:'The big picture of Artificial Intelligence',
    time:'4 min',
    intro:'Artificial Intelligence (AI) is the ability of machines to mimic human intelligence — learning from data, reasoning, problem-solving, and understanding language. Unlike traditional programs that follow rigid rules, AI systems discover patterns on their own.',
    points:[
      'AI learns from data, not hand-written rules',
      'It powers search engines, recommendations, voice assistants',
      'AI is a broad field: ML, NLP, Computer Vision, Robotics',
      'Modern AI has surpassed humans in chess, Go, protein folding'
    ],
    funfact:'💡 The term "Artificial Intelligence" was coined by John McCarthy in 1956 at the Dartmouth Conference — before computers could even run programs reliably.',
    diagram:'timeline',
    quiz:{
      q:'What makes AI different from traditional programming?',
      opts:['AI uses more lines of code','AI learns patterns from data instead of following explicit rules','AI runs faster on supercomputers','AI only works with images'],
      correct:1,
      exp:'Traditional programs follow hand-crafted rules. AI systems discover rules automatically by training on large datasets — enabling tasks that are impossible to explicitly program (like recognising faces).'
    }
  },
  {
    id:2, level:'beginner', icon:'🔬', order:2, xp:60,
    title:'AI vs ML vs Deep Learning',
    subtitle:'Understanding the nested relationship',
    time:'5 min',
    intro:'These three terms are often used interchangeably but have distinct meanings. Think of them as nested circles: AI is the broadest concept, Machine Learning is a subset of AI, and Deep Learning is a subset of ML.',
    points:[
      'AI: Any technique enabling machines to mimic intelligence',
      'Machine Learning: AI that learns patterns from data automatically',
      'Deep Learning: ML using deep neural networks (many layers)',
      'Deep Learning is behind ChatGPT, image recognition, voice cloning'
    ],
    funfact:'💡 Before 2012, Deep Learning was considered too slow to be practical. The AlexNet breakthrough on GPUs launched the modern AI revolution.',
    diagram:'venn',
    quiz:{
      q:'Which statement correctly describes the relationship between these three fields?',
      opts:['ML is a subset of Deep Learning','All three are completely separate','Deep Learning ⊂ ML ⊂ AI (nested subsets)','Deep Learning and ML are identical'],
      correct:2,
      exp:'Every Deep Learning algorithm is a form of Machine Learning, and every ML algorithm is a form of AI. They are nested — like Russian dolls — not separate fields.'
    }
  },
  {
    id:3, level:'beginner', icon:'📚', order:3, xp:70,
    title:'Types of Machine Learning',
    subtitle:'Three ways machines can learn',
    time:'6 min',
    intro:'There are three main learning paradigms. Supervised Learning trains on labelled examples. Unsupervised Learning finds hidden patterns without labels. Reinforcement Learning trains an agent through rewards and penalties.',
    points:[
      'Supervised: Input → Correct Output (labelled data required)',
      'Unsupervised: Find structure in data without labels',
      'Reinforcement: Agent learns via trial-and-error with rewards',
      '~80% of real-world ML is Supervised Learning'
    ],
    funfact:'💡 AlphaGo used Reinforcement Learning to become better than any human at Go — a game with more positions than atoms in the universe.',
    diagram:'ml-sort',
    quiz:{
      q:'You train a model using 50,000 emails each labelled "spam" or "not spam". Which type of ML is this?',
      opts:['Unsupervised Learning','Reinforcement Learning','Supervised Learning','Self-supervised Learning'],
      correct:2,
      exp:'You have labelled examples (spam/not-spam), so this is Supervised Learning. The model learns the boundary between classes from these labels and applies it to new emails.'
    }
  },
  {
    id:4, level:'beginner', icon:'📊', order:4, xp:60,
    title:'Training Data & Features',
    subtitle:'The fuel that powers machine learning',
    time:'5 min',
    intro:'Training data is the raw material of ML. Features are the measurable properties (age, price, pixel values). Labels are the correct answers. More high-quality data almost always means a better model.',
    points:[
      'Feature: A measurable attribute of an example (e.g., age, color)',
      'Label: The correct answer the model should predict',
      'Training set: Used to fit the model\'s parameters',
      'Test set: Held out to estimate real-world performance'
    ],
    funfact:'💡 GPT-4 was trained on ~1 trillion tokens of text — more than a human could read in several thousand lifetimes.',
    diagram:'data-chart',
    quiz:{
      q:'Why do we keep a separate test set that the model never sees during training?',
      opts:['To train faster','To save storage','To measure how well it generalises to unseen data','To reduce the number of features'],
      correct:2,
      exp:'If we evaluate on training data, the model could just memorise the answers. A held-out test set reveals whether the model learned genuine patterns — not just the training examples.'
    }
  },
  {
    id:5, level:'beginner', icon:'🧠', order:5, xp:80,
    title:'Neural Networks Basics',
    subtitle:'The building blocks of modern AI',
    time:'7 min',
    intro:'A neural network consists of layers of connected nodes (neurons). Each neuron receives weighted inputs, sums them, and passes the result through an activation function. By stacking many layers, networks learn increasingly complex patterns.',
    points:[
      'Input layer: receives raw data (pixels, numbers, tokens)',
      'Hidden layers: learn progressively abstract representations',
      'Output layer: produces the final prediction',
      'Weights: numerical connections adjusted during training'
    ],
    funfact:'💡 The human brain has ~86 billion neurons. GPT-4 has ~1.8 trillion parameters — but parameters and neurons are very different things!',
    diagram:'network',
    quiz:{
      q:'What do the "weights" in a neural network represent?',
      opts:['The number of layers','Speed of computation','Learnable connection strengths between neurons','Amount of GPU memory used'],
      correct:2,
      exp:'Weights are learnable numbers on each connection. During training, the network adjusts weights to minimise prediction error — the "knowledge" of a trained model lives in its weights.'
    }
  },
  /* ───── INTERMEDIATE ───── */
  {
    id:6, level:'intermediate', icon:'⚡', order:1, xp:90,
    title:'Backpropagation',
    subtitle:'The algorithm that teaches neural networks',
    time:'8 min',
    intro:'Backpropagation computes how much each weight contributed to the prediction error, then nudges every weight in the direction that reduces that error. It uses the chain rule of calculus applied backward through the network.',
    points:[
      'Forward pass: input flows right, prediction produced',
      'Loss: measures how wrong the prediction was',
      'Backward pass: error flows left, gradients computed',
      'Weight update: each weight adjusted proportional to its gradient'
    ],
    funfact:'💡 Backpropagation was popularised by Rumelhart, Hinton & Williams in 1986 — though the mathematical idea existed since the 1970s.',
    diagram:'backprop',
    quiz:{
      q:'What is the purpose of the "backward pass" in backpropagation?',
      opts:['Run the network in reverse','Compute the gradient of the loss w.r.t. every weight','Flip the training data order','Undo the forward pass'],
      correct:1,
      exp:'The backward pass uses the chain rule to compute how much each weight increased or decreased the loss. These gradients tell us exactly which direction to adjust each weight.'
    }
  },
  {
    id:7, level:'intermediate', icon:'📉', order:2, xp:90,
    title:'Gradient Descent',
    subtitle:'How AI minimises its errors step by step',
    time:'7 min',
    intro:'Gradient Descent is the optimisation algorithm that minimises the loss function. Imagine a ball rolling down a hilly loss landscape — at each step it moves in the direction of steepest downhill slope until it finds a valley.',
    points:[
      'Loss function: scalar that measures how wrong predictions are',
      'Gradient: direction of steepest increase in loss',
      'Learning rate (η): step size — too large overshoots, too small is slow',
      'Convergence: when loss stops decreasing meaningfully'
    ],
    funfact:'💡 Modern LLMs use AdamW — an adaptive version of gradient descent that gives each weight its own dynamic learning rate.',
    diagram:'gradient',
    quiz:{
      q:'What happens if you set the learning rate too high in gradient descent?',
      opts:['Training becomes slower','Model overfits immediately','Optimizer overshoots the minimum and may diverge','Model uses more memory'],
      correct:2,
      exp:'A high learning rate means each step is too large. The ball flies over the valley and bounces to the other side, potentially exploding to infinity instead of converging.'
    }
  },
  {
    id:8, level:'intermediate', icon:'⚙️', order:3, xp:80,
    title:'Activation Functions',
    subtitle:'The non-linearities that give networks power',
    time:'6 min',
    intro:'Without activation functions, stacking layers is pointless — they would collapse to a single linear transformation. Activation functions inject non-linearity, enabling networks to approximate any function.',
    points:[
      'ReLU max(0,x): simplest, fast, prevents vanishing gradients',
      'Sigmoid σ(x): squashes to (0,1) — used for probabilities',
      'Tanh: squashes to (−1,1), zero-centered',
      'Softmax: converts logits to probability distribution (multi-class output)'
    ],
    funfact:'💡 The "dying ReLU" problem — neurons stuck at zero — is solved by Leaky ReLU which allows a tiny gradient for negative inputs.',
    diagram:'activations',
    quiz:{
      q:'Why are activation functions essential in deep neural networks?',
      opts:['They speed up GPU computation','They introduce non-linearity so networks can learn complex patterns','They normalise input data','They reduce overfitting'],
      correct:1,
      exp:'Without non-linearity, any number of linear layers equals a single linear layer. Activation functions give each layer the ability to learn non-linear boundaries, unlocking the power of depth.'
    }
  },
  {
    id:9, level:'intermediate', icon:'🎯', order:4, xp:80,
    title:'Overfitting & Regularisation',
    subtitle:'Why models fail on new data — and how to fix it',
    time:'7 min',
    intro:'Overfitting is when a model memorises the training data instead of learning general rules. It achieves near-perfect training accuracy but fails on unseen examples. Regularisation techniques force the model to stay simpler.',
    points:[
      'Underfitting: model too simple — misses patterns (high bias)',
      'Overfitting: model too complex — memorises noise (high variance)',
      'Dropout: randomly zero out neurons during training',
      'Weight Decay (L2): penalises large weights, keeps model simple'
    ],
    funfact:'💡 Dropout was introduced by Hinton in 2012. Conceptually, it trains an exponential number of different sub-networks simultaneously.',
    diagram:'overfit',
    quiz:{
      q:'Your model is 99% accurate on training data but only 58% on test data. What is this classic symptom?',
      opts:['Underfitting','Perfect generalisation','Overfitting','Transfer learning failure'],
      correct:2,
      exp:'A large gap between training accuracy (99%) and test accuracy (58%) is the hallmark of overfitting — the model memorised training examples rather than learning the underlying pattern.'
    }
  },
  {
    id:10, level:'intermediate', icon:'🖼️', order:5, xp:100,
    title:'Convolutional Neural Networks',
    subtitle:'How AI sees and understands images',
    time:'8 min',
    intro:'CNNs are specialised networks for grid-like data. Small filters slide over the input, detecting local patterns (edges, textures). Deeper layers combine these into increasingly complex features (shapes, objects).',
    points:[
      'Convolution: filter slides over input, computing dot products',
      'Feature map: output showing where a filter activated strongly',
      'Pooling: downsamples feature maps for translation invariance',
      'Early layers detect edges; deep layers detect semantic concepts'
    ],
    funfact:'💡 AlexNet (2012) achieved 85% top-5 accuracy on ImageNet — 10 percentage points better than the previous best. It launched the deep learning era in computer vision.',
    diagram:'cnn',
    quiz:{
      q:'What does a convolutional filter actually do as it slides over an image?',
      opts:['Resizes the image','Computes a weighted dot product to detect a specific local pattern','Removes colour information','Converts the image to grayscale'],
      correct:1,
      exp:'Each filter is a small learnable matrix. The dot product it computes with each local region of the input is high when the region matches the pattern the filter has learned to detect.'
    }
  },
  /* ───── ADVANCED ───── */
  {
    id:11, level:'advanced', icon:'👁️', order:1, xp:120,
    title:'Attention & Transformers',
    subtitle:'The architecture powering ChatGPT, Claude, and Gemini',
    time:'10 min',
    intro:'The Transformer (2017) replaced RNNs as the go-to architecture. Its key innovation — self-attention — lets every token directly attend to every other token, capturing long-range dependencies in a single step.',
    points:[
      'Self-attention: each token computes relevance scores with all others',
      'Multi-head attention: multiple attention patterns learned in parallel',
      'Positional encoding: injects position info (no built-in order)',
      '"Attention is All You Need" eliminated the need for recurrence'
    ],
    funfact:'💡 The original Transformer paper (Vaswani et al., 2017) is now cited over 100,000 times — one of the most influential papers in AI history.',
    diagram:'attention',
    quiz:{
      q:'In "The bank can guarantee deposits", how does self-attention resolve the ambiguity in "bank"?',
      opts:['It picks the most common meaning','It ignores ambiguous words','It attends to words like "deposits" and "guarantee" which strongly signal the financial sense','It randomly selects a meaning'],
      correct:2,
      exp:'"bank" attends to all other tokens and assigns high weights to "deposits" and "guarantee". These context words pull the representation of "bank" toward the financial meaning — not the river sense.'
    }
  },
  {
    id:12, level:'advanced', icon:'💬', order:2, xp:120,
    title:'Large Language Models',
    subtitle:'How GPT, Claude, and Gemini actually work',
    time:'9 min',
    intro:'LLMs are massive Transformer models trained on one objective: predict the next token given all previous tokens. At enormous scale, this simple task produces models that can reason, code, translate, and create.',
    points:[
      'Next-token prediction: the only training objective',
      'Emergent abilities appear at scale (reasoning, in-context learning)',
      'Context window: how many tokens the model can attend to at once',
      'RLHF: fine-tuning with human preferences to make models helpful'
    ],
    funfact:'💡 Scaling laws (Hoffmann et al., 2022) showed that training data matters as much as model size — leading to the "Chinchilla-optimal" training regime.',
    diagram:'llm-tokens',
    quiz:{
      q:'What is the single training objective of a Large Language Model?',
      opts:['Answer questions correctly','Summarise text','Predict the next token given all previous tokens','Translate between languages'],
      correct:2,
      exp:'LLMs are trained purely on next-token prediction (causal language modelling). This deceptively simple objective, applied at scale on trillions of tokens, produces emergent capabilities across nearly every language task.'
    }
  },
  {
    id:13, level:'advanced', icon:'🎨', order:3, xp:110,
    title:'Generative AI & GANs',
    subtitle:'How AI creates images, music, and video',
    time:'8 min',
    intro:'Generative models learn the distribution of training data and can sample new examples from it. GANs pit a Generator against a Discriminator in an adversarial game — forcing both to improve until generated data is indistinguishable from real.',
    points:[
      'Generator G: maps noise vector z → fake data sample',
      'Discriminator D: outputs P(real | sample)',
      'Training: G minimises log(1−D(G(z))), D maximises log(D(x))',
      'Diffusion models (DALL-E, Stable Diffusion) have largely surpassed GANs'
    ],
    funfact:'💡 StyleGAN generates photorealistic human faces that belong to nobody. Visit "thispersondoesnotexist.com" — every refresh is a new fake face.',
    diagram:'gans',
    quiz:{
      q:'In a GAN, what drives the Generator to produce increasingly realistic samples?',
      opts:['A fixed quality target','Feedback from the Discriminator which improves at spotting fakes','Random noise added during training','The size of the training dataset'],
      correct:1,
      exp:'The Generator receives gradient signal from the Discriminator. As D gets better at detecting fakes, G must produce more realistic samples to fool it — an arms race that yields high-quality generation.'
    }
  },
  {
    id:14, level:'advanced', icon:'🕹️', order:4, xp:110,
    title:'Reinforcement Learning',
    subtitle:'Teaching AI through rewards and consequences',
    time:'9 min',
    intro:'RL trains an agent to make sequential decisions by maximising cumulative reward. The agent observes the environment state, picks an action, receives a reward signal, and updates its policy. No labelled data needed — just a reward function.',
    points:[
      'Agent: the learner / decision-maker',
      'Environment: everything the agent interacts with',
      'Reward: scalar feedback on how good each action was',
      'Policy π: learned mapping from states to actions'
    ],
    funfact:'💡 DeepMind\'s AlphaFold used RL to solve the 50-year protein folding problem — a breakthrough that could accelerate drug discovery by decades.',
    diagram:'rl-maze',
    quiz:{
      q:'In Reinforcement Learning, what is a "policy"?',
      opts:['The reward function','The environment rules','The agent\'s learned strategy: given a state, which action to take','The memory of past experiences'],
      correct:2,
      exp:'A policy π is the brain of the RL agent — a mapping from observed states to actions. The entire goal of RL training is to find the optimal policy that maximises expected cumulative reward.'
    }
  },
  {
    id:15, level:'advanced', icon:'✍️', order:5, xp:100,
    title:'Prompt Engineering',
    subtitle:'The art of communicating effectively with AI',
    time:'7 min',
    intro:'Prompt engineering is crafting inputs that elicit accurate, helpful, and safe outputs from LLMs. The same model can perform dramatically differently based on how it\'s prompted. It\'s equal parts science and art.',
    points:[
      'Zero-shot: direct ask with no examples',
      'Few-shot: 2-5 examples in the prompt to demonstrate format',
      'Chain-of-thought: ask the model to "reason step by step"',
      'System prompt: sets persona, constraints, output format'
    ],
    funfact:'💡 "Let\'s think step by step" (Kojima et al., 2022) improved LLM accuracy on math benchmarks by over 40% with zero extra training.',
    diagram:'prompts',
    quiz:{
      q:'Which prompting technique most reliably improves performance on complex multi-step reasoning tasks?',
      opts:['Using ALL CAPS for key words','Zero-shot prompting','Chain-of-thought: asking the model to reason step-by-step','Making the prompt shorter'],
      correct:2,
      exp:'Chain-of-thought (CoT) prompting forces the model to externalise its reasoning. This dramatically improves accuracy on arithmetic, logic, and multi-step problems because each step is checked by subsequent steps.'
    }
  }
];

const ACHIEVEMENTS = [
  { id:'first', title:'First Steps', icon:'👶', condition: s => s.completed.length >= 1 },
  { id:'beginner', title:'Beginner Graduate', icon:'🌱', condition: s => s.completed.filter(id => LESSONS.find(l=>l.id===id)?.level==='beginner').length >= 5 },
  { id:'intermediate', title:'Intermediate Scholar', icon:'🔥', condition: s => s.completed.filter(id => LESSONS.find(l=>l.id===id)?.level==='intermediate').length >= 5 },
  { id:'master', title:'AI Master', icon:'⚡', condition: s => s.completed.length >= 15 },
  { id:'streak3', title:'On A Roll', icon:'🎯', condition: s => s.completed.length >= 3 },
];

/* ── STATE ───────────────────────────────────────────────── */
const STORAGE_KEY = 'lwf_ai_state';
let state = { xp: 0, completed: [], achievements: [], currentLesson: null };
let activeRAF = null;
let currentLevel = 'beginner';

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (s) state = { ...state, ...s };
  } catch(e) {}
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ── UI HELPERS ──────────────────────────────────────────── */
function updateHeader() {
  const total = LESSONS.length;
  const done = state.completed.length;
  const maxXP = LESSONS.reduce((a,l) => a + l.xp, 0);

  document.getElementById('totalXP').textContent = state.xp.toLocaleString();
  document.getElementById('completedCount').textContent = `${done} / ${total}`;
  document.getElementById('xpFill').style.width = `${Math.min((state.xp / maxXP) * 100, 100)}%`;
  document.getElementById('xpCurrent').textContent = `${state.xp.toLocaleString()} XP`;
  document.getElementById('xpMax').textContent = `${maxXP.toLocaleString()} XP Total`;

  const rank = done >= 15 ? '🤖 AI Master' : done >= 10 ? '⚡ Advanced' : done >= 5 ? '🔥 Intermediate' : '🌱 Beginner';
  document.getElementById('currentLevel').textContent = rank;

  const bCount = state.completed.filter(id => LESSONS.find(l=>l.id===id)?.level==='beginner').length;
  const iCount = state.completed.filter(id => LESSONS.find(l=>l.id===id)?.level==='intermediate').length;
  const aCount = state.completed.filter(id => LESSONS.find(l=>l.id===id)?.level==='advanced').length;
  document.getElementById('cntBeginner').textContent = `${bCount}/5`;
  document.getElementById('cntInter').textContent = `${iCount}/5`;
  document.getElementById('cntAdv').textContent = `${aCount}/5`;

  const interUnlocked = bCount >= 5;
  const advUnlocked = iCount >= 5;

  const tabInter = document.getElementById('tabInter');
  const tabAdv = document.getElementById('tabAdv');
  document.getElementById('lockInter').style.display = interUnlocked ? 'none' : '';
  document.getElementById('lockAdv').style.display = advUnlocked ? 'none' : '';
  tabInter.classList.toggle('locked', !interUnlocked);
  tabAdv.classList.toggle('locked', !advUnlocked);
}

function renderCards(level) {
  const grid = document.getElementById('lessonsGrid');
  const levelLessons = LESSONS.filter(l => l.level === level);
  const bDone = state.completed.filter(id => LESSONS.find(l=>l.id===id)?.level==='beginner').length;
  const iDone = state.completed.filter(id => LESSONS.find(l=>l.id===id)?.level==='intermediate').length;
  const levelUnlocked = level === 'beginner' || (level === 'intermediate' && bDone >= 5) || (level === 'advanced' && iDone >= 5);

  grid.innerHTML = levelLessons.map(lesson => {
    const done = state.completed.includes(lesson.id);
    const locked = !levelUnlocked;
    const cls = done ? 'completed' : locked ? 'locked' : '';
    const statusIcon = done ? '✅' : locked ? '🔒' : '▶';
    return `
      <div class="lesson-card ${cls}" data-id="${lesson.id}">
        <div class="card-top">
          <span class="card-icon">${lesson.icon}</span>
          <span class="card-status">${statusIcon}</span>
        </div>
        <div class="card-order">Lesson ${lesson.order}</div>
        <div class="card-title">${lesson.title}</div>
        <div class="card-subtitle">${lesson.subtitle}</div>
        <div class="card-footer">
          <span class="card-xp">${done ? '✓ ' : '+'}${lesson.xp} XP</span>
          <span class="card-time">⏱ ${lesson.time}</span>
        </div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.lesson-card:not(.locked)').forEach(card => {
    card.addEventListener('click', () => openLesson(parseInt(card.dataset.id)));
  });
}

function setLevel(level) {
  currentLevel = level;
  document.querySelectorAll('.level-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.level === level);
  });
  const descs = {
    beginner: 'Master the fundamentals — no prior knowledge needed. Start here.',
    intermediate: 'Dive deeper into how networks actually learn. Prerequisite: complete all 5 beginner lessons.',
    advanced: 'State-of-the-art architectures and techniques powering modern AI. Prerequisite: all intermediate lessons.'
  };
  document.getElementById('levelDesc').textContent = descs[level];
  renderCards(level);
}

/* ── MODAL ───────────────────────────────────────────────── */
function openLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  state.currentLesson = id;

  document.getElementById('modalIcon').textContent = lesson.icon;
  document.getElementById('modalTitle').textContent = lesson.title;
  document.getElementById('modalSubtitle').textContent = lesson.subtitle;
  document.getElementById('modalXPTag').textContent = `+${lesson.xp} XP`;
  document.getElementById('lessonIntro').textContent = lesson.intro;
  document.getElementById('lessonPoints').innerHTML = lesson.points.map(p => `<li>${p}</li>`).join('');
  document.getElementById('lessonFunfact').textContent = lesson.funfact;

  renderQuiz(lesson);

  const diagramArea = document.getElementById('diagramArea');
  diagramArea.innerHTML = '';
  if (activeRAF) { cancelAnimationFrame(activeRAF); activeRAF = null; }

  document.getElementById('lessonModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => renderDiagram(lesson.diagram, diagramArea));
}

function closeLesson() {
  document.getElementById('lessonModal').classList.add('hidden');
  document.body.style.overflow = '';
  if (activeRAF) { cancelAnimationFrame(activeRAF); activeRAF = null; }
  document.getElementById('diagramArea').innerHTML = '';
  state.currentLesson = null;
}

document.getElementById('modalClose').addEventListener('click', closeLesson);
document.getElementById('modalBackdrop').addEventListener('click', closeLesson);
document.getElementById('btnCloseDone')?.addEventListener('click', closeLesson);

/* ── QUIZ ────────────────────────────────────────────────── */
let quizAnswered = false;

function renderQuiz(lesson) {
  quizAnswered = false;
  const alreadyDone = state.completed.includes(lesson.id);

  document.getElementById('quizQ').textContent = lesson.quiz.q;
  document.getElementById('quizAttempts').textContent = alreadyDone ? '✅ Already completed' : '';
  document.getElementById('quizExp').classList.add('hidden');
  document.getElementById('quizExp').classList.remove('correct-exp');
  document.getElementById('btnNext').classList.add('hidden');
  document.getElementById('btnCloseDone').classList.add('hidden');

  const opts = document.getElementById('quizOpts');
  opts.innerHTML = lesson.quiz.opts.map((opt, i) =>
    `<button class="quiz-opt" data-idx="${i}">${opt}</button>`
  ).join('');

  if (alreadyDone) {
    opts.querySelectorAll('.quiz-opt').forEach(btn => {
      if (parseInt(btn.dataset.idx) === lesson.quiz.correct) btn.classList.add('correct');
      btn.disabled = true;
    });
    document.getElementById('btnCloseDone').classList.remove('hidden');
    return;
  }

  opts.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx), lesson));
  });
}

function handleAnswer(idx, lesson) {
  if (quizAnswered) return;
  quizAnswered = true;

  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(btn => { btn.disabled = true; });

  const correct = idx === lesson.quiz.correct;
  opts[idx].classList.add(correct ? 'correct' : 'wrong');
  if (!correct) opts[lesson.quiz.correct].classList.add('correct');

  const expEl = document.getElementById('quizExp');
  expEl.textContent = (correct ? '✅ ' : '❌ ') + lesson.quiz.exp;
  expEl.classList.remove('hidden');
  if (correct) expEl.classList.add('correct-exp');

  if (correct && !state.completed.includes(lesson.id)) {
    state.xp += lesson.xp;
    state.completed.push(lesson.id);
    saveState();
    showXPFloat(lesson.xp);
    updateHeader();
    renderCards(currentLevel);
    setTimeout(() => checkAchievements(), 600);
  }

  const nextLesson = LESSONS.find(l => l.level === lesson.level && l.order === lesson.order + 1);
  const btnNext = document.getElementById('btnNext');
  const btnClose = document.getElementById('btnCloseDone');
  if (correct && nextLesson) {
    btnNext.textContent = `Next: ${nextLesson.title} →`;
    btnNext.classList.remove('hidden');
    btnNext.onclick = () => { closeLesson(); setTimeout(() => openLesson(nextLesson.id), 200); };
  } else {
    btnClose.classList.remove('hidden');
  }
}

/* ── XP FLOAT ────────────────────────────────────────────── */
function showXPFloat(xp) {
  const el = document.getElementById('xpFloat');
  el.textContent = `+${xp} XP`;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 1600);
}

/* ── ACHIEVEMENTS ────────────────────────────────────────── */
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.condition(state)) {
      state.achievements.push(ach.id);
      saveState();
      showAchievement(ach);
    }
  });
}

function showAchievement(ach) {
  const popup = document.getElementById('achPopup');
  document.getElementById('achIcon').textContent = ach.icon;
  document.getElementById('achTitle').textContent = ach.title;
  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('hidden'), 4200);
}

/* ── BRAIN CANVAS HERO ───────────────────────────────────── */
function initBrainCanvas() {
  const canvas = document.getElementById('brainCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
  resize();
  window.addEventListener('resize', resize);

  const N = 50;
  const nodes = Array.from({ length: N }, () => ({
    x: canvas.width * (0.1 + Math.random() * 0.8),
    y: canvas.height * (0.1 + Math.random() * 0.8),
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    act: 0
  }));

  function fire() {
    const src = nodes[Math.floor(Math.random() * N)];
    src.act = 1;
    setTimeout(() => { src.act = 0; }, 500);
    nodes.forEach(n => {
      const dx = n.x - src.x, dy = n.y - src.y;
      if (Math.sqrt(dx*dx+dy*dy) < 140 && n !== src) {
        setTimeout(() => { n.act = 1; setTimeout(() => { n.act = 0; }, 400); }, 200);
      }
    });
    setTimeout(fire, 1200 + Math.random() * 1000);
  }
  fire();

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 10 || n.x > W - 10) n.vx *= -1;
      if (n.y < 10 || n.y > H - 10) n.vy *= -1;
    });
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 130) {
          const act = (nodes[i].act + nodes[j].act) / 2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(124,111,255,${0.04 + act * 0.35})`;
          ctx.lineWidth = 0.4 + act * 1.2;
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      n.act *= 0.93;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2.5 + n.act * 3, 0, Math.PI * 2);
      ctx.shadowBlur = n.act > 0.3 ? 14 : 0;
      ctx.shadowColor = '#7c6fff';
      ctx.fillStyle = n.act > 0.3 ? '#a78bfa' : 'rgba(124,111,255,0.35)';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================
   DIAGRAM RENDERERS
   ========================================================== */

function renderDiagram(type, container) {
  const renderers = {
    timeline, venn, 'ml-sort': mlSort, 'data-chart': dataChart,
    network, backprop, gradient, activations, overfit, cnn,
    attention, 'llm-tokens': llmTokens, gans, 'rl-maze': rlMaze, prompts
  };
  const fn = renderers[type];
  if (fn) fn(container);
}

/* ── 1. TIMELINE ─────────────────────────────────────────── */
function timeline(container) {
  const events = [
    { year: '1956', label: 'AI Born', desc: 'Dartmouth Conference', color: '#22d3ee' },
    { year: '1980s', label: 'Expert Systems', desc: 'Rule-based AI peaks', color: '#7c6fff' },
    { year: '1997', label: 'Deep Blue', desc: 'Beats Chess champion', color: '#c084fc' },
    { year: '2012', label: 'Deep Learning', desc: 'AlexNet revolution', color: '#f472b6' },
    { year: '2017', label: 'Transformer', desc: '"Attention is All You Need"', color: '#fbbf24' },
    { year: '2022+', label: 'LLM Era', desc: 'ChatGPT, Claude, Gemini', color: '#22d3a5' },
  ];
  container.innerHTML = `<div style="padding:16px;height:100%;display:flex;flex-direction:column;justify-content:center;gap:10px;overflow-y:auto">
    ${events.map((e, i) => `
      <div style="display:flex;align-items:center;gap:12px;animation:fadeUp 0.4s ${i * 0.1}s both">
        <div style="flex-shrink:0;width:52px;text-align:right;font-size:0.7rem;font-weight:700;color:${e.color};font-family:'JetBrains Mono',monospace">${e.year}</div>
        <div style="flex-shrink:0;width:10px;height:10px;border-radius:50%;background:${e.color};box-shadow:0 0 8px ${e.color}"></div>
        <div>
          <div style="font-size:0.82rem;font-weight:700;color:#f0f0ff">${e.label}</div>
          <div style="font-size:0.72rem;color:#9191a8">${e.desc}</div>
        </div>
      </div>
    `).join('')}
  </div>
  <style>@keyframes fadeUp{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}</style>`;
}

/* ── 2. VENN ─────────────────────────────────────────────── */
function venn(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const W = container.offsetWidth || 380, H = container.offsetHeight || 300;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  const cx = W / 2, cy = H / 2 - 10;
  const rings = [
    { r: 120, color: 'rgba(34,211,238,0.15)', border: '#22d3ee', label: 'AI', desc: 'Reasoning, Planning, Robotics, Expert Systems', labelY: cy - 100 },
    { r: 80, color: 'rgba(124,111,255,0.2)', border: '#7c6fff', label: 'Machine Learning', desc: 'SVM, Random Forests, Gradient Boosting', labelY: cy - 60 },
    { r: 40, color: 'rgba(192,132,252,0.3)', border: '#c084fc', label: 'Deep Learning', desc: 'CNNs, Transformers, LLMs', labelY: cy - 10 },
  ];

  let hovered = -1;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    rings.forEach((ring, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
      ctx.fillStyle = hovered === i ? ring.color.replace('0.15','0.3').replace('0.2','0.35').replace('0.3','0.5') : ring.color;
      ctx.fill();
      ctx.strokeStyle = ring.border;
      ctx.lineWidth = hovered === i ? 2 : 1;
      ctx.stroke();
    });
    rings.forEach((ring, i) => {
      ctx.fillStyle = i === 0 ? '#22d3ee' : i === 1 ? '#a78bfa' : '#e879f9';
      ctx.font = `${i === 2 ? 700 : 600} ${i === 0 ? 13 : i === 1 ? 11 : 10}px Plus Jakarta Sans,sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(ring.label, cx, ring.labelY);
    });
    if (hovered >= 0) {
      const ring = rings[hovered];
      ctx.fillStyle = 'rgba(5,5,8,0.85)';
      const tw = ctx.measureText(ring.desc).width + 20;
      const bx = Math.max(6, Math.min(cx - tw/2, W - tw - 6));
      ctx.beginPath();
      ctx.roundRect(bx, H - 44, tw, 28, 8);
      ctx.fill();
      ctx.fillStyle = ring.border;
      ctx.font = '600 11px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ring.desc, bx + tw/2, H - 25);
    }
  }
  draw();

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left), my = (e.clientY - rect.top);
    const dist = Math.sqrt((mx-cx)**2 + (my-cy)**2);
    hovered = dist < 40 ? 2 : dist < 80 ? 1 : dist < 120 ? 0 : -1;
    draw();
  });
  canvas.addEventListener('mouseleave', () => { hovered = -1; draw(); });
}

/* ── 3. ML SORT (drag-drop) ──────────────────────────────── */
function mlSort(container) {
  const cards = [
    { text: '🐱 Classify cat vs dog photos', type: 'supervised' },
    { text: '📧 Detect spam emails', type: 'supervised' },
    { text: '🛍️ Group similar customers', type: 'unsupervised' },
    { text: '🎵 Find music genres', type: 'unsupervised' },
    { text: '🎮 Train a game-playing agent', type: 'reinforcement' },
    { text: '🤖 Robot learning to walk', type: 'reinforcement' },
  ];
  let score = 0;
  container.innerHTML = `<div class="ml-sort-wrap">
    <div style="font-size:0.72rem;color:#56566e;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Drag each scenario to the correct bucket</div>
    <div class="ml-cards" id="mlCardSource">
      ${cards.map((c,i) => `<div class="ml-card" draggable="true" data-idx="${i}" data-type="${c.type}">${c.text}</div>`).join('')}
    </div>
    <div class="ml-buckets">
      <div class="ml-bucket" data-correct="supervised"><div class="ml-bucket-title">Supervised</div></div>
      <div class="ml-bucket" data-correct="unsupervised"><div class="ml-bucket-title">Unsupervised</div></div>
      <div class="ml-bucket" data-correct="reinforcement"><div class="ml-bucket-title">Reinforcement</div></div>
    </div>
    <div class="ml-score" id="mlScore">Drop the cards above into the right buckets</div>
  </div>`;

  let dragging = null;
  container.querySelectorAll('.ml-card').forEach(card => {
    card.addEventListener('dragstart', e => { dragging = card; card.classList.add('dragging'); });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });
  container.querySelectorAll('.ml-bucket').forEach(bucket => {
    bucket.addEventListener('dragover', e => { e.preventDefault(); bucket.classList.add('drag-over'); });
    bucket.addEventListener('dragleave', () => bucket.classList.remove('drag-over'));
    bucket.addEventListener('drop', e => {
      e.preventDefault();
      bucket.classList.remove('drag-over');
      if (!dragging) return;
      const correct = dragging.dataset.type === bucket.dataset.correct;
      dragging.classList.add('placed');
      const dropped = document.createElement('div');
      dropped.className = `ml-dropped ${correct ? 'correct' : 'wrong'}`;
      dropped.textContent = (correct ? '✓ ' : '✗ ') + dragging.textContent;
      bucket.appendChild(dropped);
      if (correct) score++;
      const remaining = container.querySelectorAll('.ml-card:not(.placed)').length;
      document.getElementById('mlScore').textContent = remaining === 0 ? `🎉 ${score}/6 correct!` : `${score} correct so far`;
      dragging = null;
    });
  });
}

/* ── 4. DATA CHART ───────────────────────────────────────── */
function dataChart(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:calc(100% - 50px);display:block';
  container.innerHTML = `<div style="padding:12px 14px 4px;display:flex;flex-direction:column;gap:8px;height:100%">
    <div style="font-size:0.75rem;font-weight:600;color:#9191a8;text-align:center">Model Accuracy vs Training Data Size</div>
  </div>`;
  container.querySelector('div').appendChild(canvas);

  const sliderWrap = document.createElement('div');
  sliderWrap.style.cssText = 'padding:0 16px;display:flex;align-items:center;gap:12px;flex-shrink:0';
  sliderWrap.innerHTML = `<span style="font-size:0.72rem;color:#56566e;font-weight:600">Data:</span>
    <input type="range" min="1" max="10" value="3" style="flex:1;accent-color:#7c6fff">
    <span id="dcVal" style="font-size:0.75rem;font-weight:700;color:#a78bfa;min-width:70px">3,000 samples</span>`;
  container.querySelector('div').appendChild(sliderWrap);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function draw(steps) {
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    if (!W || !H) return;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);
    const pad = { l: 48, r: 16, t: 16, b: 36 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;

    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + ch - (i / 4) * ch;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
      ctx.fillStyle = '#56566e'; ctx.font = '10px JetBrains Mono,monospace'; ctx.textAlign = 'right';
      ctx.fillText(`${i * 25}%`, pad.l - 6, y + 4);
    }
    const labels = ['1k','2k','5k','10k','20k','50k','100k','200k','500k','1M'];
    ctx.fillStyle = '#56566e'; ctx.font = '9px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    labels.forEach((lbl, i) => {
      ctx.fillText(lbl, pad.l + (i / 9) * cw, H - pad.b + 14);
    });

    const accuracies = [38, 52, 64, 71, 77, 82, 86, 89, 92, 95];
    const grad = ctx.createLinearGradient(pad.l, 0, pad.l + cw, 0);
    grad.addColorStop(0, '#7c6fff'); grad.addColorStop(1, '#22d3a5');

    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t + ch - (accuracies[0] / 100) * ch);
    for (let i = 1; i <= Math.min(steps, 9); i++) {
      const x = pad.l + (i / 9) * cw;
      const y = pad.t + ch - (accuracies[i] / 100) * ch;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = grad; ctx.lineWidth = 2.5; ctx.stroke();

    for (let i = 0; i <= Math.min(steps, 9); i++) {
      const x = pad.l + (i / 9) * cw;
      const y = pad.t + ch - (accuracies[i] / 100) * ch;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = i === Math.min(steps, 9) ? '#22d3a5' : '#7c6fff';
      if (i === Math.min(steps, 9)) {
        ctx.shadowBlur = 12; ctx.shadowColor = '#22d3a5';
        ctx.fillText(`${accuracies[i]}%`, x + (i < 9 ? 6 : -6), y - 10);
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }
    ctx.fillStyle = '#9191a8'; ctx.font = '10px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Training Dataset Size →', pad.l + cw / 2, H - 4);
  }

  const slider = sliderWrap.querySelector('input');
  const valEl = document.getElementById('dcVal');
  const sizes = ['1k','2k','5k','10k','20k','50k','100k','200k','500k','1M'];
  slider.addEventListener('input', () => {
    const v = parseInt(slider.value);
    valEl.textContent = sizes[v - 1] + ' samples';
    draw(v - 1);
  });
  requestAnimationFrame(() => draw(2));
}

/* ── 5. NEURAL NETWORK FORWARD PASS ─────────────────────── */
function network(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.appendChild(canvas);

  const W = container.offsetWidth || 420, H = (container.offsetHeight || 320) - 44;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);

  const layers = [
    { x: W * 0.15, nodes: 3, color: '#22d3ee', label: 'Input' },
    { x: W * 0.45, nodes: 4, color: '#7c6fff', label: 'Hidden' },
    { x: W * 0.78, nodes: 2, color: '#22d3a5', label: 'Output' },
  ];

  function positions(layer) {
    const spacing = H / (layer.nodes + 1);
    return Array.from({ length: layer.nodes }, (_, i) => ({ x: layer.x, y: spacing * (i + 1) }));
  }
  const allPos = layers.map(positions);

  function draw(activatedUpTo = -1) {
    ctx.clearRect(0, 0, W, H);
    for (let li = 0; li < layers.length - 1; li++) {
      const active = li < activatedUpTo;
      allPos[li].forEach(from => {
        allPos[li + 1].forEach(to => {
          ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = active ? `rgba(124,111,255,0.55)` : 'rgba(255,255,255,0.07)';
          ctx.lineWidth = active ? 1.4 : 0.6;
          if (active) { ctx.shadowBlur = 4; ctx.shadowColor = '#7c6fff'; }
          ctx.stroke(); ctx.shadowBlur = 0;
        });
      });
    }
    layers.forEach((layer, li) => {
      const active = li <= activatedUpTo;
      allPos[li].forEach(pos => {
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
        if (active) { ctx.shadowBlur = 18; ctx.shadowColor = layer.color; }
        ctx.fillStyle = active ? layer.color : '#1a1a2e';
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.strokeStyle = active ? layer.color : 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 2; ctx.stroke();
      });
      ctx.fillStyle = layer.color; ctx.font = '600 11px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(layer.label, layer.x, H - 6);
    });
  }
  draw();

  const btn = document.createElement('button');
  btn.className = 'diag-btn'; btn.textContent = '▶ Run Forward Pass';
  container.appendChild(btn);
  let running = false;
  btn.addEventListener('click', () => {
    if (running) return;
    running = true; btn.textContent = '⏳ Running...';
    let step = -1;
    const go = () => {
      step++;
      draw(step);
      if (step < layers.length) { setTimeout(go, 700); }
      else { running = false; btn.textContent = '▶ Run Again'; }
    };
    go();
  });
}

/* ── 6. BACKPROPAGATION ──────────────────────────────────── */
function backprop(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.appendChild(canvas);

  const W = container.offsetWidth || 420, H = (container.offsetHeight || 320) - 44;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);

  const layers = [
    { x: W * 0.12, nodes: 3 },
    { x: W * 0.45, nodes: 4 },
    { x: W * 0.78, nodes: 2 },
  ];

  function positions(layer) {
    const sp = H / (layer.nodes + 1);
    return Array.from({ length: layer.nodes }, (_, i) => ({ x: layer.x, y: sp * (i + 1) }));
  }
  const allPos = layers.map(positions);

  let phase = 'idle'; // idle | forward | backward

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let li = 0; li < layers.length - 1; li++) {
      allPos[li].forEach(from => {
        allPos[li + 1].forEach(to => {
          ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = phase === 'forward' ? 'rgba(34,211,238,0.4)' : phase === 'backward' ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.07)';
          ctx.lineWidth = phase !== 'idle' ? 1.2 : 0.6; ctx.stroke();
        });
      });
    }
    layers.forEach((layer, li) => {
      allPos[li].forEach(pos => {
        const color = phase === 'forward' ? '#22d3ee' : phase === 'backward' ? '#f87171' : '#1a1a2e';
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
        if (phase !== 'idle') { ctx.shadowBlur = 14; ctx.shadowColor = color; }
        ctx.fillStyle = color; ctx.fill(); ctx.shadowBlur = 0;
        ctx.strokeStyle = phase !== 'idle' ? color : 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 2; ctx.stroke();
      });
    });
    const labels = ['Input', 'Hidden', 'Output'];
    labels.forEach((lbl, li) => {
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '600 11px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(lbl, layers[li].x, H - 6);
    });
    if (phase !== 'idle') {
      const arrow = phase === 'forward' ? '→ Forward Pass (blue)' : '← Backward Pass (red gradients)';
      const color = phase === 'forward' ? '#22d3ee' : '#f87171';
      ctx.fillStyle = color; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(arrow, W / 2, 18);
    }
  }
  draw();

  const btnRow = document.createElement('div'); btnRow.className = 'diag-btn-row';
  ['▶ Forward Pass', '◀ Backward Pass'].forEach((label, i) => {
    const btn = document.createElement('button'); btn.className = 'diag-btn-sm'; btn.textContent = label;
    btn.addEventListener('click', () => {
      phase = i === 0 ? 'forward' : 'backward'; draw();
      setTimeout(() => { phase = 'idle'; draw(); }, 1800);
    });
    btnRow.appendChild(btn);
  });
  container.appendChild(btnRow);
}

/* ── 7. GRADIENT DESCENT ─────────────────────────────────── */
function gradient(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:calc(100% - 50px);display:block';
  const sliderWrap = document.createElement('div');
  sliderWrap.style.cssText = 'padding:6px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0';
  sliderWrap.innerHTML = `<span style="font-size:0.72rem;color:#56566e;font-weight:600">LR:</span>
    <input type="range" min="1" max="8" value="3" step="1" style="flex:1;accent-color:#7c6fff">
    <span id="gdLR" style="font-size:0.75rem;font-weight:700;color:#a78bfa;min-width:32px">0.3</span>`;
  container.appendChild(canvas); container.appendChild(sliderWrap);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const lrValues = [0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 0.9, 1.2];
  let lr = 0.3, theta = 0.5, animId = null;

  function loss(t) { return (t - 6) * (t - 6) * 0.4 + 0.3; }
  function grad(t) { return 2 * (t - 6) * 0.4; }

  function draw(theta) {
    const W = canvas.offsetWidth, H = canvas.offsetHeight || 220;
    if (!W) return;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);
    const pad = { l: 44, r: 16, t: 20, b: 32 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * ch;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
    }

    const toX = t => pad.l + (t / 12) * cw;
    const toY = l => pad.t + ch - Math.min((l / 15) * ch, ch);

    const grad2 = ctx.createLinearGradient(pad.l, 0, pad.l + cw, 0);
    grad2.addColorStop(0, '#f87171'); grad2.addColorStop(0.5, '#7c6fff'); grad2.addColorStop(1, '#22d3a5');
    ctx.beginPath();
    for (let t = 0; t <= 12; t += 0.1) ctx.lineTo(toX(t), toY(loss(t)));
    ctx.strokeStyle = grad2; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.fillStyle = '#56566e'; ctx.font = '10px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText('θ (parameter) →', pad.l + cw / 2, H - 4);
    ctx.textAlign = 'right';
    ctx.save(); ctx.translate(12, pad.t + ch/2); ctx.rotate(-Math.PI/2);
    ctx.fillText('J(θ) Loss', 0, 0); ctx.restore();

    const bx = toX(theta), by = toY(loss(theta));
    ctx.beginPath(); ctx.arc(bx, by, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24'; ctx.shadowBlur = 16; ctx.shadowColor = '#fbbf24'; ctx.fill();
    ctx.shadowBlur = 0; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();

    ctx.fillStyle = '#fbbf24'; ctx.font = '700 10px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    ctx.fillText(`θ=${theta.toFixed(2)}  J=${loss(theta).toFixed(2)}`, bx, by - 14);
  }

  draw(theta);

  const btnRow = document.createElement('div'); btnRow.className = 'diag-btn-row';
  const stepBtn = document.createElement('button'); stepBtn.className = 'diag-btn-sm'; stepBtn.textContent = '▶ Step';
  const autoBtn = document.createElement('button'); autoBtn.className = 'diag-btn-sm'; autoBtn.textContent = '⚡ Auto';
  const resetBtn = document.createElement('button'); resetBtn.className = 'diag-btn-sm'; resetBtn.textContent = '↺ Reset';
  btnRow.append(stepBtn, autoBtn, resetBtn); container.appendChild(btnRow);

  stepBtn.addEventListener('click', () => {
    theta = theta - lr * grad(theta);
    draw(theta);
  });
  autoBtn.addEventListener('click', () => {
    if (animId) { clearInterval(animId); animId = null; autoBtn.textContent = '⚡ Auto'; return; }
    autoBtn.textContent = '⏹ Stop';
    animId = setInterval(() => {
      const g = grad(theta);
      if (Math.abs(g) < 0.01) { clearInterval(animId); animId = null; autoBtn.textContent = '⚡ Auto'; return; }
      theta -= lr * g; draw(theta);
    }, 120);
  });
  resetBtn.addEventListener('click', () => {
    theta = 0.5 + Math.random() * 2;
    if (animId) { clearInterval(animId); animId = null; autoBtn.textContent = '⚡ Auto'; }
    draw(theta);
  });

  const slider = sliderWrap.querySelector('input');
  const lrEl = document.getElementById('gdLR');
  slider.addEventListener('input', () => {
    lr = lrValues[parseInt(slider.value) - 1];
    lrEl.textContent = lr;
  });
}

/* ── 8. ACTIVATION FUNCTIONS ─────────────────────────────── */
function activations(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:calc(100% - 44px);display:block';
  container.appendChild(canvas);

  const btnRow = document.createElement('div'); btnRow.className = 'diag-btn-row';
  const fns = ['ReLU', 'Sigmoid', 'Tanh', 'Softmax*'];
  let active = 0;
  fns.forEach((name, i) => {
    const b = document.createElement('button'); b.className = 'diag-btn-sm'; b.textContent = name;
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => {
      active = i;
      btnRow.querySelectorAll('.diag-btn-sm').forEach((btn, j) => btn.classList.toggle('active', j === i));
      draw();
    });
    btnRow.appendChild(b);
  });
  container.appendChild(btnRow);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const colors = ['#22d3ee', '#a78bfa', '#f472b6', '#fbbf24'];

  function fn(i, x) {
    if (i === 0) return Math.max(0, x);
    if (i === 1) return 1 / (1 + Math.exp(-x));
    if (i === 2) return Math.tanh(x);
    return 1 / (1 + Math.exp(-x));
  }

  function draw() {
    const W = canvas.offsetWidth, H = canvas.offsetHeight || 220;
    if (!W) return;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);
    const pad = { l: 44, r: 16, t: 20, b: 28 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
    ctx.clearRect(0, 0, W, H);

    const toX = x => pad.l + ((x + 4) / 8) * cw;
    const toY = y => pad.t + ch / 2 - (y / 2) * ch;

    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.l, pad.t + ch/2); ctx.lineTo(pad.l + cw, pad.t + ch/2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(toX(0), pad.t); ctx.lineTo(toX(0), pad.t + ch); ctx.stroke();

    [-4,-3,-2,-1,0,1,2,3,4].forEach(x => {
      ctx.fillStyle = '#56566e'; ctx.font = '9px JetBrains Mono,monospace'; ctx.textAlign = 'center';
      ctx.fillText(x, toX(x), pad.t + ch/2 + 12);
    });

    const color = colors[active];
    ctx.beginPath();
    for (let xi = -4; xi <= 4; xi += 0.05) {
      const y = fn(active, xi);
      const px = toX(xi), py = toY(y);
      xi === -4 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    ctx.shadowBlur = 10; ctx.shadowColor = color; ctx.stroke(); ctx.shadowBlur = 0;

    ctx.fillStyle = color; ctx.font = '700 12px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'left'; ctx.fillText(fns[active], pad.l + 4, pad.t + 14);
    ctx.fillStyle = '#56566e'; ctx.font = '9px Plus Jakarta Sans,sans-serif';
    ctx.fillText(active === 3 ? '*Per-class output' : '', pad.l + 4, H - 2);
  }
  requestAnimationFrame(draw);
}

/* ── 9. OVERFITTING ──────────────────────────────────────── */
function overfit(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const seed = 42;
  function seededRand(s) { const x = Math.sin(s) * 10000; return x - Math.floor(x); }
  const pts = Array.from({ length: 18 }, (_, i) => ({
    x: seededRand(seed + i * 7) * 0.8 + 0.1,
    y: seededRand(seed + i * 7 + 1) * 0.6 + 0.2
  }));

  function draw() {
    const W = container.offsetWidth || 380, H = container.offsetHeight || 280;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const panels = [
      { x: 0, title: 'Underfitting', color: '#f87171', subtitle: 'Too simple' },
      { x: W/3, title: 'Good Fit', color: '#22d3a5', subtitle: 'Just right ✓' },
      { x: 2*W/3, title: 'Overfitting', color: '#fbbf24', subtitle: 'Too complex' },
    ];

    panels.forEach((panel, pi) => {
      const pw = W / 3 - 2, px = panel.x + 1;
      if (pi > 0) {
        ctx.beginPath(); ctx.moveTo(panel.x, 0); ctx.lineTo(panel.x, H);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.fillStyle = '#56566e'; ctx.font = '700 10px Plus Jakarta Sans,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(panel.title, px + pw/2, 16);
      ctx.fillStyle = panel.color; ctx.font = '600 9px Plus Jakarta Sans,sans-serif';
      ctx.fillText(panel.subtitle, px + pw/2, 28);

      const mx = (x) => px + x * pw;
      const my = (y) => H * 0.85 - y * (H * 0.55);

      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(mx(p.x), my(p.y), 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
      });

      ctx.beginPath();
      ctx.strokeStyle = panel.color; ctx.lineWidth = 2;
      if (pi === 0) {
        ctx.moveTo(mx(0), my(0.5)); ctx.lineTo(mx(1), my(0.5));
      } else if (pi === 1) {
        ctx.moveTo(mx(0), my(0.65));
        for (let x = 0; x <= 1; x += 0.02) ctx.lineTo(mx(x), my(0.15 + x * 0.7 - x*x*0.2));
      } else {
        ctx.moveTo(mx(0), my(0.65));
        for (let x = 0; x <= 1; x += 0.01) {
          const y = 0.6 + Math.sin(x * 14) * 0.2 + x * 0.1;
          ctx.lineTo(mx(x), my(y));
        }
      }
      ctx.shadowBlur = 8; ctx.shadowColor = panel.color; ctx.stroke(); ctx.shadowBlur = 0;
    });
  }
  requestAnimationFrame(draw);
}

/* ── 10. CNN FILTER ──────────────────────────────────────── */
function cnn(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:calc(100% - 44px);display:block';
  container.appendChild(canvas);

  const input = [
    [1,0,2,1,0,1,2],
    [0,2,1,0,2,1,0],
    [1,1,0,2,1,0,1],
    [2,0,1,1,0,2,1],
    [0,1,2,0,1,1,0],
    [1,2,0,1,2,0,1],
    [0,1,1,0,1,2,0],
  ];
  const filter = [[-1,0,1],[-2,0,2],[-1,0,1]];
  let pr = 0, pc = 0;
  const outputH = 5, outputW = 5;
  const output = Array.from({ length: outputH }, () => Array(outputW).fill(null));

  function conv(r, c) {
    let s = 0;
    filter.forEach((row, fr) => row.forEach((val, fc) => {
      s += val * input[r + fr][c + fc];
    }));
    return Math.abs(s);
  }

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function draw() {
    const W = canvas.offsetWidth, H = canvas.offsetHeight || 220;
    if (!W) return;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    const cs = Math.min((W * 0.38) / 7, (H - 40) / 7);
    const ox = 8, oy = 28;
    const fox = W * 0.44, foy = oy + cs * 2, fcs = cs * 0.9;
    const outx = W * 0.64, outy = oy;

    ctx.fillStyle = '#56566e'; ctx.font = '10px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Input 7×7', ox + cs * 3.5, 14);
    ctx.fillText('Filter 3×3', fox + fcs * 1.5, foy - 10);
    ctx.fillText('Feature Map 5×5', outx + cs * 2.5, 14);

    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
      const highlight = (r >= pr && r < pr + 3 && c >= pc && c < pc + 3);
      ctx.fillStyle = highlight ? 'rgba(34,211,238,0.25)' : 'rgba(255,255,255,0.04)';
      ctx.fillRect(ox + c * cs, oy + r * cs, cs - 1, cs - 1);
      ctx.strokeStyle = highlight ? 'rgba(34,211,238,0.6)' : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = highlight ? 1.5 : 0.5; ctx.strokeRect(ox + c * cs, oy + r * cs, cs - 1, cs - 1);
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = `${Math.floor(cs * 0.4)}px JetBrains Mono,monospace`;
      ctx.textAlign = 'center'; ctx.fillText(input[r][c], ox + c * cs + cs/2, oy + r * cs + cs * 0.65);
    }
    filter.forEach((row, fr) => row.forEach((val, fc) => {
      const col = val < 0 ? `rgba(248,113,113,${Math.abs(val) * 0.5})` : val > 0 ? `rgba(34,211,165,${val * 0.5})` : 'rgba(255,255,255,0.04)';
      ctx.fillStyle = col; ctx.fillRect(fox + fc * fcs, foy + fr * fcs, fcs - 1, fcs - 1);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 0.5;
      ctx.strokeRect(fox + fc * fcs, foy + fr * fcs, fcs - 1, fcs - 1);
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = `${Math.floor(fcs * 0.45)}px JetBrains Mono,monospace`;
      ctx.textAlign = 'center'; ctx.fillText(val, fox + fc * fcs + fcs/2, foy + fr * fcs + fcs * 0.7);
    }));
    for (let r = 0; r < outputH; r++) for (let c = 0; c < outputW; c++) {
      const val = output[r][c];
      const isCurrent = r === pr && c === pc;
      ctx.fillStyle = val !== null ? `rgba(124,111,255,${Math.min(val / 10, 0.8)})` : 'rgba(255,255,255,0.03)';
      ctx.fillRect(outx + c * cs, outy + r * cs, cs - 1, cs - 1);
      ctx.strokeStyle = isCurrent ? '#7c6fff' : 'rgba(255,255,255,0.1)'; ctx.lineWidth = isCurrent ? 1.5 : 0.5;
      ctx.strokeRect(outx + c * cs, outy + r * cs, cs - 1, cs - 1);
      if (val !== null) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = `${Math.floor(cs * 0.4)}px JetBrains Mono,monospace`;
        ctx.textAlign = 'center'; ctx.fillText(val.toFixed(0), outx + c * cs + cs/2, outy + r * cs + cs * 0.65);
      }
    }
  }
  requestAnimationFrame(draw);

  const stepBtn = document.createElement('button'); stepBtn.className = 'diag-btn'; stepBtn.textContent = '▶ Next Step';
  stepBtn.style.bottom = '8px';
  container.appendChild(stepBtn);
  stepBtn.addEventListener('click', () => {
    output[pr][pc] = conv(pr, pc);
    pc++;
    if (pc >= outputW) { pc = 0; pr++; }
    if (pr >= outputH) { pr = 0; pc = 0; stepBtn.textContent = '↺ Reset'; }
    else { stepBtn.textContent = '▶ Next Step'; }
    draw();
  });
}

/* ── 11. ATTENTION HEATMAP ───────────────────────────────── */
function attention(container) {
  const words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
  const weights = {
    'The':  [0.50, 0.20, 0.08, 0.06, 0.10, 0.06],
    'cat':  [0.12, 0.42, 0.22, 0.06, 0.10, 0.08],
    'sat':  [0.06, 0.28, 0.14, 0.18, 0.06, 0.28],
    'on':   [0.06, 0.08, 0.20, 0.32, 0.14, 0.20],
    'the':  [0.40, 0.14, 0.08, 0.10, 0.18, 0.10],
    'mat':  [0.06, 0.10, 0.22, 0.18, 0.10, 0.34],
  };
  let sel = 1;

  container.innerHTML = `<div class="attention-wrap">
    <div style="font-size:0.72rem;color:#56566e;font-weight:600;text-transform:uppercase;letter-spacing:.1em">Click a word to see its attention pattern</div>
    <div class="attention-words" id="attWords">
      ${words.map((w, i) => `<div class="att-word${i === sel ? ' selected' : ''}" data-idx="${i}">${w}</div>`).join('')}
    </div>
    <div class="attention-grid-wrap" id="attGridWrap"></div>
  </div>`;

  function buildGrid() {
    const wrap = document.getElementById('attGridWrap');
    if (!wrap) return;
    const ws = weights[words[sel]];
    const size = 42;
    wrap.innerHTML = `<div style="display:flex;flex-direction:column;gap:3px;align-items:center">
      <div style="display:flex;gap:3px;margin-bottom:2px;margin-left:52px">
        ${words.map(w => `<div style="width:${size}px;text-align:center;font-size:0.68rem;color:#56566e;font-family:'JetBrains Mono',monospace">${w}</div>`).join('')}
      </div>
      ${words.map((w, i) => `
        <div style="display:flex;gap:3px;align-items:center">
          <div style="width:48px;text-align:right;font-size:0.7rem;color:${i === sel ? '#a78bfa' : '#56566e'};font-weight:${i === sel ? 700 : 400};padding-right:6px;font-family:'JetBrains Mono',monospace">${w}</div>
          ${(i === sel ? ws : Array(6).fill(0)).map((v, j) => {
            const alpha = Math.max(0.04, v * 1.1);
            return `<div style="width:${size}px;height:${size}px;border-radius:6px;background:rgba(124,111,255,${alpha});border:1px solid rgba(124,111,255,${alpha + 0.1});display:flex;align-items:center;justify-content:center;font-size:0.65rem;color:rgba(255,255,255,${v > 0.15 ? 0.9 : 0.4});font-weight:700;font-family:'JetBrains Mono',monospace;transition:background 0.3s">${i === sel ? Math.round(v * 100) + '%' : ''}</div>`;
          }).join('')}
        </div>
      `).join('')}
      <div style="margin-top:6px;font-size:0.72rem;color:#56566e;text-align:center">Attention from "<span style="color:#a78bfa">${words[sel]}</span>" to each word</div>
    </div>`;
  }
  buildGrid();
  document.querySelectorAll('.att-word').forEach(el => {
    el.addEventListener('click', () => {
      sel = parseInt(el.dataset.idx);
      document.querySelectorAll('.att-word').forEach((w, i) => w.classList.toggle('selected', i === sel));
      buildGrid();
    });
  });
}

/* ── 12. LLM TOKENS ──────────────────────────────────────── */
function llmTokens(container) {
  const sequences = [
    {
      prompt: 'The neural network learned to recognize',
      tokens: [' cats', ' patterns', ' faces', ' objects'],
      probs: [0.31, 0.28, 0.22, 0.19],
    },
    {
      prompt: 'The model was trained on a large',
      tokens: [' dataset', ' corpus', ' collection', ' amount'],
      probs: [0.45, 0.30, 0.15, 0.10],
    },
    {
      prompt: 'Gradient descent minimizes the',
      tokens: [' loss', ' error', ' cost', ' function'],
      probs: [0.52, 0.26, 0.14, 0.08],
    },
  ];
  let seqIdx = 0, generated = '';

  container.innerHTML = `<div class="llm-wrap">
    <div style="font-size:0.72rem;color:#56566e;font-weight:600;text-transform:uppercase;letter-spacing:.1em">LLM predicts the next token by computing probabilities</div>
    <div class="llm-prompt" id="llmPromptEl"></div>
    <div style="font-size:0.72rem;color:#56566e;font-weight:600;margin-top:4px">Top candidate tokens</div>
    <div class="llm-candidates" id="llmCands"></div>
    <div class="llm-top-pick" id="llmTop"></div>
  </div>`;

  function render() {
    const seq = sequences[seqIdx];
    const promptEl = document.getElementById('llmPromptEl');
    const candsEl = document.getElementById('llmCands');
    const topEl = document.getElementById('llmTop');
    if (!promptEl) return;

    promptEl.innerHTML = `<span style="color:#9191a8">${seq.prompt}</span><span class="llm-token new" style="color:#a78bfa">${generated}</span><span style="color:#7c6fff;animation:blink 1s step-end infinite">▋</span>`;
    candsEl.innerHTML = seq.tokens.map((tok, i) => `
      <div class="llm-candidate">
        <span class="llm-cand-word">"${tok.trim()}"</span>
        <div class="llm-cand-bar-wrap"><div class="llm-cand-bar" style="width:${seq.probs[i] * 100}%;background:${i === 0 ? '#7c6fff' : 'rgba(124,111,255,0.4)'}"></div></div>
        <span class="llm-cand-prob">${Math.round(seq.probs[i] * 100)}%</span>
      </div>`).join('');
    topEl.textContent = generated ? `✓ Predicted: "${generated.trim()}" (${Math.round(seq.probs[0] * 100)}% probability)` : 'Click "Generate" to predict the next token';
  }

  render();

  const btnRow = document.createElement('div'); btnRow.className = 'diag-btn-row';
  const genBtn = document.createElement('button'); genBtn.className = 'diag-btn-sm'; genBtn.textContent = '▶ Generate Token';
  const nextBtn = document.createElement('button'); nextBtn.className = 'diag-btn-sm'; nextBtn.textContent = '⟳ New Prompt';
  btnRow.append(genBtn, nextBtn); container.appendChild(btnRow);

  genBtn.addEventListener('click', () => {
    generated = sequences[seqIdx].tokens[0];
    render();
  });
  nextBtn.addEventListener('click', () => {
    seqIdx = (seqIdx + 1) % sequences.length;
    generated = '';
    render();
  });
}

/* ── 13. GANs ────────────────────────────────────────────── */
function gans(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:calc(100% - 44px);display:block';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let epoch = 0;

  function genGrid(ep) {
    return Array.from({ length: 64 }, (_, i) => {
      const noise = Math.sin(i * 137.5 + ep * 0.8) * 0.5 + 0.5;
      const clarity = Math.min(ep / 50, 1);
      const base = i % 8 < 4 ? 0.3 : 0.7;
      return base * clarity + noise * (1 - clarity);
    });
  }

  function draw() {
    const W = canvas.offsetWidth, H = canvas.offsetHeight || 220;
    if (!W) return;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const midX = W / 2;
    const grid = genGrid(epoch);
    const gridSize = 8, cs = Math.min(Math.floor(Math.min(W * 0.3, H * 0.55) / gridSize), 16);
    const gx = midX * 0.3, gy = H / 2 - cs * gridSize / 2;

    ctx.fillStyle = '#a78bfa'; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('Generator', gx + cs * 4, gy - 14);
    ctx.fillStyle = '#56566e'; ctx.font = '9px Plus Jakarta Sans,sans-serif';
    ctx.fillText(`Epoch ${epoch}`, gx + cs * 4, gy - 2);

    grid.forEach((v, i) => {
      const gr = Math.floor(i / gridSize), gc = i % gridSize;
      const lightness = Math.floor(v * 220);
      ctx.fillStyle = `rgb(${lightness},${Math.floor(lightness * 0.8)},${Math.floor(lightness * 1.2)})`;
      ctx.fillRect(gx + gc * cs, gy + gr * cs, cs - 1, cs - 1);
    });

    ctx.beginPath(); ctx.moveTo(midX - 16, H/2); ctx.lineTo(midX + 16, H/2);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('vs', midX, H/2 + 4);

    const discX = midX * 1.55;
    const score = Math.min(0.1 + epoch * 0.018, 0.95);
    const discColor = score > 0.7 ? '#f87171' : score > 0.4 ? '#fbbf24' : '#22d3a5';

    ctx.fillStyle = '#f87171'; ctx.font = '700 11px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('Discriminator', discX, H / 2 - 50);

    ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.strokeStyle = discColor; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(discX - 44, H/2 - 38, 88, 52, 10); ctx.fill(); ctx.stroke();

    const barW = 70, barH = 10;
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath(); ctx.roundRect(discX - barW/2, H/2 - 22, barW, barH, 5); ctx.fill();
    ctx.fillStyle = discColor;
    ctx.beginPath(); ctx.roundRect(discX - barW/2, H/2 - 22, barW * score, barH, 5); ctx.fill();
    ctx.fillStyle = '#f0f0ff'; ctx.font = '700 12px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText(score > 0.6 ? '🔴 FAKE' : '🟢 REAL', discX, H/2 + 14);
    ctx.fillStyle = discColor; ctx.font = '700 10px JetBrains Mono,monospace';
    ctx.fillText(`P(fake) = ${(score*100).toFixed(0)}%`, discX, H/2 - 6);

    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '10px Plus Jakarta Sans,sans-serif';
    ctx.textAlign = 'center';
    const desc = epoch < 10 ? 'Generator outputs noise' : epoch < 30 ? 'Patterns emerging…' : epoch < 50 ? 'Getting realistic' : 'Near-photorealistic!';
    ctx.fillText(desc, W/2, H - 8);
  }
  requestAnimationFrame(draw);

  const btn = document.createElement('button'); btn.className = 'diag-btn'; btn.textContent = '⚡ Train Epoch';
  container.appendChild(btn);
  btn.addEventListener('click', () => {
    epoch = Math.min(epoch + 10, 80);
    btn.textContent = epoch >= 80 ? '↺ Reset' : '⚡ Train Epoch';
    if (epoch >= 80) epoch = 0;
    draw();
  });
}

/* ── 14. RL MAZE ─────────────────────────────────────────── */
function rlMaze(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:calc(100% - 44px);display:block';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const SIZE = 5;
  const walls = new Set(['1,1','1,2','2,1','3,2','3,3']);
  const GOAL = [4, 4];
  let qTable = {}, episodes = 0, agentPos = [0, 0], path = [];

  function stateKey(r, c) { return `${r},${c}`; }
  function isWall(r, c) { return walls.has(stateKey(r, c)) || r < 0 || r >= SIZE || c < 0 || c >= SIZE; }

  const DIRS = [[-1,0],[1,0],[0,-1],[0,1]];
  const ARROWS = ['↑','↓','←','→'];

  function initQ() {
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
      if (!isWall(r, c)) qTable[stateKey(r, c)] = [0, 0, 0, 0];
    }
  }

  function trainEpisodes(n) {
    const LR = 0.8, GAMMA = 0.9, EPS = Math.max(0.05, 0.5 - episodes * 0.01);
    for (let ep = 0; ep < n; ep++) {
      let pos = [0, 0], steps = 0;
      while (!(pos[0] === GOAL[0] && pos[1] === GOAL[1]) && steps < 60) {
        const sk = stateKey(...pos);
        const q = qTable[sk] || [0,0,0,0];
        const action = Math.random() < EPS ? Math.floor(Math.random() * 4) : q.indexOf(Math.max(...q));
        const [dr, dc] = DIRS[action];
        const nr = pos[0] + dr, nc = pos[1] + dc;
        if (isWall(nr, nc)) {
          q[action] += LR * (-0.5 - q[action]);
        } else {
          const nsk = stateKey(nr, nc);
          const nq = qTable[nsk] || [0,0,0,0];
          const reward = (nr === GOAL[0] && nc === GOAL[1]) ? 10 : -0.1;
          q[action] += LR * (reward + GAMMA * Math.max(...nq) - q[action]);
          pos = [nr, nc];
        }
        steps++;
        if (pos[0] === GOAL[0] && pos[1] === GOAL[1]) break;
      }
    }
    episodes += n;
  }

  function getLearnedPath() {
    const visited = new Set();
    let pos = [0, 0]; const p = [[...pos]];
    for (let s = 0; s < 30; s++) {
      const sk = stateKey(...pos);
      if (visited.has(sk)) break;
      visited.add(sk);
      const q = qTable[sk] || [0,0,0,0];
      const action = q.indexOf(Math.max(...q));
      const [dr, dc] = DIRS[action];
      const nr = pos[0] + dr, nc = pos[1] + dc;
      if (isWall(nr, nc)) break;
      pos = [nr, nc]; p.push([...pos]);
      if (pos[0] === GOAL[0] && pos[1] === GOAL[1]) break;
    }
    return p;
  }

  function draw() {
    const W = canvas.offsetWidth, H = canvas.offsetHeight || 220;
    if (!W) return;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    const cs = Math.min((W - 80) / SIZE, (H - 50) / SIZE, 44);
    const gx = (W - cs * SIZE - 60) / 2 + 28, gy = (H - cs * SIZE) / 2;

    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
      const isGoal = r === GOAL[0] && c === GOAL[1];
      const isSt = r === 0 && c === 0;
      const isW = isWall(r, c);
      ctx.fillStyle = isW ? '#1a1a2e' : isGoal ? 'rgba(251,191,36,0.18)' : isSt ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.03)';
      ctx.strokeStyle = isW ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 0.5;
      ctx.fillRect(gx + c * cs, gy + r * cs, cs - 1, cs - 1);
      ctx.strokeRect(gx + c * cs, gy + r * cs, cs - 1, cs - 1);
      if (isGoal) { ctx.font = `${cs * 0.55}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText('⭐', gx + c * cs + cs/2, gy + r * cs + cs * 0.7); }
      if (isW) { ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.font = `${cs * 0.55}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText('🧱', gx + c * cs + cs/2, gy + r * cs + cs * 0.7); }
      if (!isW && !isGoal && episodes > 0 && qTable[stateKey(r,c)]) {
        const q = qTable[stateKey(r,c)];
        const best = q.indexOf(Math.max(...q));
        ctx.fillStyle = 'rgba(124,111,255,0.5)'; ctx.font = `${cs * 0.42}px sans-serif`;
        ctx.textAlign = 'center'; ctx.fillText(ARROWS[best], gx + c * cs + cs/2, gy + r * cs + cs * 0.68);
      }
    }

    if (path.length > 1) {
      ctx.strokeStyle = '#22d3a5'; ctx.lineWidth = 2.5; ctx.shadowBlur = 8; ctx.shadowColor = '#22d3a5';
      ctx.beginPath();
      path.forEach(([r, c], i) => {
        const px = gx + c * cs + cs/2, py = gy + r * cs + cs/2;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke(); ctx.shadowBlur = 0;
    }

    const [ar, ac] = agentPos;
    ctx.beginPath(); ctx.arc(gx + ac * cs + cs/2, gy + ar * cs + cs/2, cs * 0.28, 0, Math.PI*2);
    ctx.fillStyle = '#22d3ee'; ctx.shadowBlur = 12; ctx.shadowColor = '#22d3ee'; ctx.fill(); ctx.shadowBlur = 0;

    ctx.fillStyle = '#56566e'; ctx.font = '11px Plus Jakarta Sans,sans-serif'; ctx.textAlign = 'center';
    const status = episodes === 0 ? 'Untrained — agent doesn\'t know the path' : episodes < 30 ? 'Learning…' : 'Learned optimal path! ✓';
    ctx.fillText(`${status}  |  ${episodes} episodes`, W/2, H - 8);
    ctx.fillStyle = '#22d3ee'; ctx.font = '700 10px JetBrains Mono,monospace';
    ctx.fillText('🟦 Start', gx - 2, gy + cs * 0.7);
  }

  initQ(); draw();

  const btnRow = document.createElement('div'); btnRow.className = 'diag-btn-row';
  const trainBtn = document.createElement('button'); trainBtn.className = 'diag-btn-sm'; trainBtn.textContent = '🧠 Train (25 eps)';
  const resetBtn = document.createElement('button'); resetBtn.className = 'diag-btn-sm'; resetBtn.textContent = '↺ Reset';
  btnRow.append(trainBtn, resetBtn); container.appendChild(btnRow);

  trainBtn.addEventListener('click', () => {
    trainEpisodes(25);
    path = getLearnedPath();
    agentPos = path[path.length - 1] || [0, 0];
    draw();
  });
  resetBtn.addEventListener('click', () => {
    qTable = {}; episodes = 0; path = []; agentPos = [0, 0];
    initQ(); draw();
  });
}

/* ── 15. PROMPT BUILDER ──────────────────────────────────── */
function prompts(container) {
  const blocks = [
    { key: 'role', label: '🎭 Role', desc: 'You are an expert AI tutor', on: false, score: 15 },
    { key: 'task', label: '📋 Task', desc: 'Explain backpropagation clearly', on: true, score: 20 },
    { key: 'context', label: '🌍 Context', desc: 'For a beginner audience with no math background', on: false, score: 20 },
    { key: 'examples', label: '💡 Examples', desc: 'Use analogies like "rolling a ball down a hill"', on: false, score: 25 },
    { key: 'format', label: '📐 Format', desc: 'Step-by-step, with a summary at the end', on: false, score: 20 },
  ];

  function rebuild() {
    const active = blocks.filter(b => b.on);
    const score = active.reduce((a, b) => a + b.score, 0);
    const preview = active.length === 0
      ? '(empty prompt — no components selected)'
      : active.map(b => b.desc + '.').join('\n');
    container.querySelector('#promptPreview').textContent = preview;
    container.querySelector('#promptScoreBar').style.width = score + '%';
    container.querySelector('#promptScoreVal').textContent = score + '%';
  }

  container.innerHTML = `<div class="prompt-wrap">
    <div style="font-size:0.72rem;color:#56566e;font-weight:600;text-transform:uppercase;letter-spacing:.1em">Toggle components to build a better prompt</div>
    <div class="prompt-blocks">
      ${blocks.map((b, i) => `
        <div class="prompt-block ${b.on ? 'on' : 'off'}" data-idx="${i}">
          <div>
            <div class="prompt-block-label">${b.label}</div>
            <div class="prompt-block-desc">${b.desc}</div>
          </div>
          <span class="prompt-toggle">${b.on ? '✅' : '⬜'}</span>
        </div>`).join('')}
    </div>
    <div style="font-size:0.72rem;color:#56566e;font-weight:600;margin-top:2px">Resulting prompt</div>
    <div class="prompt-preview" id="promptPreview"></div>
    <div class="prompt-score-wrap">
      <span class="prompt-score-label">Quality</span>
      <div class="prompt-score-bar-wrap"><div class="prompt-score-bar" id="promptScoreBar" style="width:20%"></div></div>
      <span class="prompt-score-val" id="promptScoreVal">20%</span>
    </div>
  </div>`;

  rebuild();
  container.querySelectorAll('.prompt-block').forEach(el => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.idx);
      blocks[i].on = !blocks[i].on;
      el.className = `prompt-block ${blocks[i].on ? 'on' : 'off'}`;
      el.querySelector('.prompt-toggle').textContent = blocks[i].on ? '✅' : '⬜';
      rebuild();
    });
  });
}

/* ── LEVEL TABS ──────────────────────────────────────────── */
document.querySelectorAll('.level-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('locked')) return;
    setLevel(tab.dataset.level);
  });
});

/* ── INIT ────────────────────────────────────────────────── */
loadState();
initBrainCanvas();
updateHeader();
setLevel('beginner');
