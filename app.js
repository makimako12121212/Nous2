/**
 * POUR TOI - APPLICATION INTERACTIVE ROMANTIQUE & BIENVEILLANTE
 * Gestion de la lightbox, de la musique douce, du canvas de cœurs,
 * des onglets de réconfort et du générateur de mots doux.
 */

// ==========================================================================
// 1. GESTION DE LA LIGHTBOX (AGRANDISSEMENT DES SOUVENIRS)
// ==========================================================================
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');

function openLightbox(src, title, desc, element) {
  if (!lightboxModal) return;
  let targetSrc = src;
  if (element && element.querySelector) {
    const cardImg = element.querySelector('img');
    if (cardImg && (cardImg.currentSrc || cardImg.src)) {
      targetSrc = cardImg.currentSrc || cardImg.src;
    }
  }
  
  lightboxImg.onerror = function() {
    if (this.src.indexOf('.svg') === -1) {
      if (this.src.indexOf('illustration') !== -1 || this.src.indexOf('15456488623456909014') !== -1) {
        this.src = 'images/illustration_douce.svg';
      } else if (this.src.indexOf('7543') !== -1) {
        this.src = 'images/7543.svg';
      }
    }
  };

  lightboxImg.src = targetSrc;
  lightboxTitle.textContent = title || '';
  lightboxDesc.textContent = desc || '';
  lightboxModal.classList.add('active');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (!lightboxModal) return;
  if (event && event.target !== lightboxModal && !event.target.classList.contains('lightbox-close')) {
    return;
  }
  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
    closeLightbox();
  }
});

// ==========================================================================
// 2. LA BOÎTE À RÉCONFORT ("OUVRE QUAND...")
// ==========================================================================
const comfortTabs = document.querySelectorAll('.comfort-tab');
const comfortPanels = document.querySelectorAll('.comfort-panel');

comfortTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-tab');

    comfortTabs.forEach(t => t.classList.remove('active'));
    comfortPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// ==========================================================================
// 3. GÉNÉRATEUR DE MOTS DOUX À L'INFINI
// ==========================================================================
const complimentsList = [
  "Tu es la plus belle chose qui me soit arrivée, ne l'oublie jamais.",
  "Ton sourire a le pouvoir d'effacer instantanément ma pire journée.",
  "Nos petites disputes ne sont rien face à l'immensité de mon amour pour toi.",
  "Tu as une intelligence et une sensibilité rares qui me fascinent.",
  "Regarde-toi dans le miroir : tu es une reine, belle, fière et lumineuse.",
  "Quoi qu'il arrive, on est et on restera toujours dans la même équipe.",
  "Quand tu poses ta main sur moi, mon cœur trouve son refuge.",
  "Même quand tu boudes et que tu pinces les lèvres, tu es irrésistible.",
  "Tu as surmonté tant d'épreuves déjà : fais-toi confiance, tu es forte.",
  "Je serai toujours là pour t'écouter, même quand tu n'as pas les mots.",
  "Avec toi dans la voiture, la musique à fond, c'est mon bonheur absolu.",
  "Tu n'as rien à prouver à qui que ce soit. Tu es parfaite comme tu es.",
  "Ta présence apaise mon esprit comme aucune autre au monde.",
  "Je t'aime pour ce que tu es, dans tes forces comme dans tes doutes.",
  "Tu es mon choix chaque matin, et ma certitude chaque soir.",
  "Ne laisse jamais la fatigue te faire croire que tu n'es pas à la hauteur.",
  "Chaque seconde passée à tes côtés est un trésor que je garde précieusement.",
  "Tu as le droit de relâcher la pression. Je suis là pour veiller sur toi.",
  "Notre complicité est inestimable. Personne ne pourra nous enlever ça.",
  "Tu illumines ma vie d'une façon dont tu n'as même pas idée.",
  "Mon cœur t'appartient, hier, aujourd'hui et pour toute la vie.",
  "Tu es mon trophée d'homme du match, ma victoire quotidienne.",
  "Respire un grand coup : tout va bien se passer, je te tiens la main.",
  "Même sous les nuages, notre ciel est le plus beau.",
  "Pardonne-moi mes maladresses : mon seul souhait est de te rendre heureuse.",
  "Tu es la femme de ma vie, mon évidence absolue."
];

let lastComplimentIndex = -1;
let loveCount = parseInt(localStorage.getItem('loveCount') || '0', 10);

const complimentText = document.getElementById('complimentText');
const giveLoveBtn = document.getElementById('giveLoveBtn');
const counterValue = document.getElementById('counterValue');

if (counterValue) {
  counterValue.textContent = loveCount;
}

if (giveLoveBtn && complimentText) {
  giveLoveBtn.addEventListener('click', (e) => {
    // Choisir un compliment différent du précédent
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * complimentsList.length);
    } while (nextIndex === lastComplimentIndex && complimentsList.length > 1);
    
    lastComplimentIndex = nextIndex;

    // Animation de texte
    complimentText.style.opacity = '0';
    setTimeout(() => {
      complimentText.textContent = complimentsList[nextIndex];
      complimentText.style.opacity = '1';
    }, 200);

    // Incrémenter compteur
    loveCount++;
    if (counterValue) counterValue.textContent = loveCount;
    localStorage.setItem('loveCount', loveCount.toString());

    // Explosion de cœurs au clic
    spawnHeartBurst(e.clientX || (window.innerWidth / 2), e.clientY || (window.innerHeight / 2));
    
    // Haptique mobile si disponible
    if ('vibrate' in navigator) {
      navigator.vibrate(40);
    }
  });
}

// ==========================================================================
// 4. CÂLIN VIRTUEL & ENVOI SUR WHATSAPP
// ==========================================================================
const sendCuddleBtn = document.getElementById('sendCuddleBtn');
const cuddleMessage = document.getElementById('cuddleMessage');
const whatsappLink = document.getElementById('whatsappLink');

if (sendCuddleBtn && cuddleMessage) {
  sendCuddleBtn.addEventListener('click', (e) => {
    cuddleMessage.classList.remove('hidden');
    sendCuddleBtn.textContent = '🤍 Câlin envoyé !';
    sendCuddleBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

    // Giga pluie de cœurs
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        spawnHeartBurst(x, y, 3);
      }, i * 70);
    }

    // Pré-remplir le lien WhatsApp avec message affectueux
    if (whatsappLink) {
      const msg = encodeURIComponent("J'ai vu ton site mon amour... merci pour tout, je t'aime tellement fort ❤️");
      whatsappLink.href = `https://wa.me/?text=${msg}`;
    }

    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  });
}

// ==========================================================================
// 5. SYSTÈME D'EXPLOSION DE PARTICULES CŒURS (DOM)
// ==========================================================================
function spawnHeartBurst(x, y, count = 10) {
  const emojis = ['🤍', '🌸', '✨', '💖', '🥰', '💕'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 80;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 40;
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--dx', `${destX}px`);
    heart.style.setProperty('--dy', `${destY}px`);
    heart.style.fontSize = `${16 + Math.random() * 16}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  }
}

// Ajout du style dynamique pour les burst-hearts
const burstStyle = document.createElement('style');
burstStyle.innerHTML = `
.burst-heart {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: burstAnim 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes burstAnim {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.6);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.4);
  }
}
`;
document.head.appendChild(burstStyle);

// ==========================================================================
// 6. AMBIANCE SONORE : WEB AUDIO SYNTH / FICHIER MP3
// ==========================================================================
const musicToggleBtn = document.getElementById('musicToggleBtn');
const bgAudio = document.getElementById('bgAudio');
let isAudioPlaying = false;
let audioCtx = null;
let synthTimer = null;

// Séquence de mélodie douce style piano/boîte à musique (Notes douces apaisantes)
const softNotes = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50 // C6
];

function playSoftChime() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  // Filtre doux passe-bas
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, now);

  // Forme d'onde douce
  osc.type = 'sine';
  const noteFreq = softNotes[Math.floor(Math.random() * softNotes.length)];
  osc.frequency.setValueAtTime(noteFreq, now);

  // Enveloppe d'amplitude (attaque douce, déclin long)
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 2.6);
}

function startAmbientSound() {
  if (bgAudio) {
    bgAudio.volume = 0.8;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioPlaying = true;
        updateMusicButtonUI();
      }).catch((err) => {
        console.warn("Lecture mp3 bloquée ou introuvable, fallback synthé :", err);
        startSynthLoop();
      });
    } else {
      isAudioPlaying = true;
      updateMusicButtonUI();
    }
  } else {
    startSynthLoop();
  }
}

function startSynthLoop() {
  isAudioPlaying = true;
  updateMusicButtonUI();
  playSoftChime();
  synthTimer = setInterval(() => {
    if (isAudioPlaying) {
      playSoftChime();
    }
  }, 1600);
}

function stopAmbientSound() {
  isAudioPlaying = false;
  updateMusicButtonUI();
  if (bgAudio) {
    bgAudio.pause();
  }
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
}

function updateMusicButtonUI() {
  if (!musicToggleBtn) return;
  const label = musicToggleBtn.querySelector('.music-label');
  if (isAudioPlaying) {
    musicToggleBtn.classList.add('playing');
    if (label) label.textContent = 'Pause';
  } else {
    musicToggleBtn.classList.remove('playing');
    if (label) label.textContent = 'Ton chanteur favori';
  }
}

if (musicToggleBtn) {
  musicToggleBtn.addEventListener('click', () => {
    if (isAudioPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  });
}

// ==========================================================================
// 7. CANVAS DE PARTICULES FLOTTANTES (CŒURS & LUEURS PASTEL)
// ==========================================================================
const canvas = document.getElementById('ambientCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const PARTICLE_COUNT = window.innerWidth < 768 ? 20 : 35;

  class HeartParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = 6 + Math.random() * 12;
      this.speedY = 0.4 + Math.random() * 0.8;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = 0.15 + Math.random() * 0.45;
      this.color = Math.random() > 0.4 ? '#FDA4AF' : '#FECDD3';
      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      // Dessin d'un cœur doux
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, s / 4);
      ctx.quadraticCurveTo(0, 0, s / 4, 0);
      ctx.quadraticCurveTo(s / 2, 0, s / 2, s / 3);
      ctx.quadraticCurveTo(s / 2, 0, (3 * s) / 4, 0);
      ctx.quadraticCurveTo(s, 0, s, s / 4);
      ctx.quadraticCurveTo(s, s / 2, (3 * s) / 4, (3 * s) / 4);
      ctx.lineTo(s / 2, s);
      ctx.lineTo(s / 4, (3 * s) / 4);
      ctx.quadraticCurveTo(0, s / 2, 0, s / 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new HeartParticle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();
}

// ==========================================================================
// 8. ESCAPE GAME DE NOTRE AMOUR (7 ÉTAPES & COFFRE-FORT FINAL)
// ==========================================================================
const escapeStepsData = [
  {
    step: 1,
    tag: "Étape 1 sur 7",
    title: "La Femme de ma Vie",
    riddle: "Cinq lettres qui définissent la plus belle personne de cet univers. La seule à qui mon cœur appartiendra toujours... Qui es-tu ?",
    hint: "Indice : C'est le doux prénom de la fille que j'aime le plus au monde.",
    validCodes: ["aliya", "aliyah"]
  },
  {
    step: 2,
    tag: "Étape 2 sur 7",
    title: "La Racine de Notre Histoire",
    riddle: "Bien avant qu'on ne se rencontre, le destin préparait ma venue sur Terre pour un jour croiser ta route. Quelle est ma date de naissance ?",
    hint: "Indice : C'est le 23 décembre 2004 (format JJ/MM/AAAA ou 23/12/2004).",
    validCodes: ["23/12/2004", "23/12/04", "23122004", "231204", "23-12-2004", "23-12-04"]
  },
  {
    step: 3,
    tag: "Étape 3 sur 7",
    title: "Le Jour où le Monde a Gagné sa Plus Belle Étoile",
    riddle: "Ce jour-là, une petite merveille est née pour illuminer le monde et devenir toute ma vie. Quelle est ta date de naissance ?",
    hint: "Indice : C'est le 10 décembre 2006 (format JJ/MM/AA ou 10/12/06).",
    validCodes: ["10/12/06", "10/12/2006", "101206", "10122006", "10-12-06", "10-12-2006"]
  },
  {
    step: 4,
    tag: "Étape 4 sur 7",
    title: "Ton Éternel Protecteur & Complice",
    riddle: "Celui qui sera toujours ton copilote sur la route, ton trophée d'homme du match, ton protecteur et ton plus grand fan... Quel est mon prénom ?",
    hint: "Indice : C'est le prénom de ton homme qui t'aime.",
    validCodes: ["ryane", "ryan"]
  },
  {
    step: 5,
    tag: "Étape 5 sur 7",
    title: "Nos Mots Tendres du Quotidien",
    riddle: "Ce petit surnom d'amour que je te donne quand on se blottit l'un contre l'autre, ou quand je veux faire fondre ton cœur...",
    hint: "Indice : Deux petits mots d'amour : 'mon c...' ou 'mon b...'",
    validCodes: ["mon coeur", "mon coeuur", "mon cooeur", "mon bebe", "mon bb", "coeur", "bebe"]
  },
  {
    step: 6,
    tag: "Étape 6 sur 7",
    title: "Notre Date Gravée dans le Temps",
    riddle: "Un jour unique et magique qui reste et restera gravé à jamais dans nos mémoires et nos cœurs...",
    hint: "Indice : C'est le 2 août 2025 (format 02/08/25).",
    validCodes: ["02/08/25", "02/08/2025", "2/8/25", "2/8/2025", "020825", "02082025", "02-08-25", "02-08-2025"]
  },
  {
    step: 7,
    tag: "Étape 7 sur 7",
    title: "Le Code Ultime : La Clé de Mon Cœur",
    riddle: "Trois petits mots que rien ni personne ne pourra jamais effacer. La vérité la plus absolue de toute mon existence...",
    hint: "Indice : La plus belle et sincère des déclarations d'amour...",
    validCodes: ["je t aime", "je taime", "jeu taime", "jetaime"]
  }
];

let currentEscapeStep = parseInt(localStorage.getItem('escapeCurrentStep') || '1', 10);
if (isNaN(currentEscapeStep) || currentEscapeStep < 1) currentEscapeStep = 1;
if (currentEscapeStep > 8) currentEscapeStep = 8;

const escapeGameBox = document.getElementById('escapeGameBox');
const vaultUnlockedCard = document.getElementById('vaultUnlockedCard');
const enigmaStepTag = document.getElementById('enigmaStepTag');
const enigmaTitle = document.getElementById('enigmaTitle');
const enigmaRiddle = document.getElementById('enigmaRiddle');
const hintToggleBtn = document.getElementById('hintToggleBtn');
const hintText = document.getElementById('hintText');
const escapeInput = document.getElementById('escapeInput');
const enigmaFeedback = document.getElementById('enigmaFeedback');
const padlockIcon = document.getElementById('padlockIcon');
const stepperProgressFill = document.getElementById('stepperProgressFill');
const stepNodes = document.querySelectorAll('.step-node');

function normalizeEscapeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[œ]/g, "oe")
    .replace(/['’`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function updateStepperUI(stepIndex) {
  if (stepIndex > 7) {
    if (stepperProgressFill) stepperProgressFill.style.width = '100%';
    stepNodes.forEach(node => {
      node.classList.remove('active');
      node.classList.add('completed');
    });
    return;
  }

  const progressPercent = ((stepIndex - 1) / 6) * 100;
  if (stepperProgressFill) {
    stepperProgressFill.style.width = `${progressPercent}%`;
  }

  stepNodes.forEach(node => {
    const nodeStep = parseInt(node.getAttribute('data-step'), 10);
    node.classList.remove('active', 'completed');
    if (nodeStep < stepIndex) {
      node.classList.add('completed');
    } else if (nodeStep === stepIndex) {
      node.classList.add('active');
    }
  });
}

function renderEscapeStep(stepIndex) {
  if (stepIndex > 7) {
    if (escapeGameBox) escapeGameBox.classList.add('hidden');
    if (vaultUnlockedCard) vaultUnlockedCard.classList.remove('hidden');
    updateStepperUI(8);
    return;
  }

  if (escapeGameBox) escapeGameBox.classList.remove('hidden');
  if (vaultUnlockedCard) vaultUnlockedCard.classList.add('hidden');

  const data = escapeStepsData[stepIndex - 1];
  if (!data) return;

  if (enigmaStepTag) enigmaStepTag.textContent = data.tag;
  if (enigmaTitle) enigmaTitle.textContent = data.title;
  if (enigmaRiddle) enigmaRiddle.textContent = data.riddle;
  if (hintText) {
    hintText.textContent = data.hint;
    hintText.classList.add('hidden');
  }
  if (escapeInput) {
    escapeInput.value = '';
    escapeInput.focus();
  }
  if (enigmaFeedback) {
    enigmaFeedback.textContent = '';
    enigmaFeedback.className = 'enigma-feedback';
  }
  if (padlockIcon) {
    padlockIcon.textContent = '🔒';
    padlockIcon.className = 'padlock-badge';
  }

  updateStepperUI(stepIndex);
}

function toggleHint() {
  if (hintText) {
    hintText.classList.toggle('hidden');
  }
}

function submitEscapeCode(e) {
  if (e) e.preventDefault();
  if (!escapeInput) return;

  const rawVal = escapeInput.value;
  const cleanVal = normalizeEscapeText(rawVal);
  const data = escapeStepsData[currentEscapeStep - 1];
  if (!data) return;

  const isMatch = data.validCodes.some(code => {
    const cleanCode = normalizeEscapeText(code);
    return cleanVal === cleanCode || cleanVal.replace(/[\/\-]/g, '') === cleanCode.replace(/[\/\-]/g, '');
  });

  if (isMatch) {
    enigmaFeedback.textContent = '✨ Bravo mon amour ! Code secret validé 🤍';
    enigmaFeedback.className = 'enigma-feedback success';
    
    if (padlockIcon) {
      padlockIcon.textContent = '🔓';
      padlockIcon.classList.add('unlock');
    }

    const rect = escapeGameBox ? escapeGameBox.getBoundingClientRect() : null;
    const burstX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const burstY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    spawnHeartBurst(burstX, burstY, 15);

    if ('vibrate' in navigator) {
      navigator.vibrate([60, 40, 60]);
    }

    currentEscapeStep++;
    localStorage.setItem('escapeCurrentStep', currentEscapeStep.toString());

    setTimeout(() => {
      renderEscapeStep(currentEscapeStep);
      if (currentEscapeStep > 7) {
        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            spawnHeartBurst(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 4);
          }, i * 80);
        }
      }
    }, 1200);

  } else {
    enigmaFeedback.textContent = "Oups ! Ce n'est pas tout à fait ça... Regarde l'indice mon cœur 🤍";
    enigmaFeedback.className = 'enigma-feedback error';

    if (padlockIcon) {
      padlockIcon.classList.remove('shake');
      void padlockIcon.offsetWidth;
      padlockIcon.classList.add('shake');
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  }
}

function resetEscapeGame() {
  currentEscapeStep = 1;
  localStorage.setItem('escapeCurrentStep', '1');
  renderEscapeStep(1);
}

if (escapeGameBox) {
  renderEscapeStep(currentEscapeStep);
}

