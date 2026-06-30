const loadingScreen = document.getElementById('loadingScreen');
const openSurprise = document.getElementById('openSurprise');
const scene1Text = document.getElementById('scene1Text');
const scene2Words = document.getElementById('scene2Words');
const timelineList = document.getElementById('timelineList');
const finalText = document.getElementById('finalText');
const musicToggle = document.getElementById('musicToggle');
const birthdayAudio = document.getElementById('birthdayAudio');
const confettiLayer = document.getElementById('confettiLayer');
const candles = document.querySelectorAll('.candle .flame');
const sections = [
  document.getElementById('sceneWelcome'),
  document.getElementById('scene1'),
  document.getElementById('scene2'),
  document.getElementById('scene3'),
  document.getElementById('scene4'),
  document.getElementById('scene5'),
  document.getElementById('scene6'),
  document.getElementById('scene7')
];

let currentScene = 0;
let hasStarted = false;
let canPlayAudio = false;

/**
 * Utility to show a scene and hide the others.
 */
function showScene(index) {
  sections.forEach((section, idx) => {
    section.classList.toggle('active', idx === index);
  });
  currentScene = index;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Type text one character at a time.
 */
function typeText(target, text, speed = 60) {
  target.textContent = '';
  let index = 0;
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      target.textContent += text[index] || '';
      index += 1;
      if (index > text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

/**
 * Build a list of lines for scene 2.
 */
function buildScene2() {
  const words = ['You deserve', 'more happiness', 'more laughter', 'more success', 'more peace'];
  scene2Words.innerHTML = words.map((word) => `<span>${word}</span>`).join('');
}

/**
 * Build the timeline list with animation delays.
 */
function buildTimeline() {
  const entries = ['Another year...', 'Another chapter...', 'More memories...', 'More dreams...', 'More blessings...'];
  timelineList.innerHTML = entries.map((entry) => `<li>${entry}</li>`).join('');
}

/**
 * Update the footer text at the end.
 */
function revealEnding() {
  finalText.textContent = '✨ The End ✨';
  setTimeout(() => {
    finalText.classList.add('fade-out');
    finalText.addEventListener('transitionend', () => {
      finalText.textContent = 'Enjoy Your Day Maryam';
      finalText.classList.remove('fade-out');
    }, { once: true });
  }, 2800);
}

/**
 * Animate confetti pieces around the cake.
 */
function launchConfetti() {
  confettiLayer.innerHTML = '';
  const colors = ['#facc15', '#f8fafc', '#38bdf8', '#fde68a'];
  for (let i = 0; i < 24; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'confetti-item';
    const size = 8 + Math.random() * 8;
    dot.style.width = `${size}px`;
    dot.style.height = `${size * 1.6}px`;
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.left = `${30 + Math.random() * 40}%`;
    dot.style.top = `${20 + Math.random() * 10}%`;
    dot.style.transform = `rotate(${Math.random() * 360}deg)`;
    dot.style.animationDelay = `${Math.random() * 0.4}s`;
    dot.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
    confettiLayer.appendChild(dot);
  }
}

/**
 * Extinguish candle flames and trigger confetti.
 */
function blowOutCandles() {
  candles.forEach((flame) => {
    flame.style.opacity = '0';
    flame.style.transform = 'translateX(-50%) translateY(-6px) scaleY(0.95)';
  });
  launchConfetti();
}

/**
 * Initialize ambient environment effects.
 */
function initBackground() {
  const count = 24;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('div');
    particle.className = 'float-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.width = `${2 + Math.random() * 3}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${8 + Math.random() * 12}s`;
    particle.style.animationDelay = `${Math.random() * 4}s`;
    document.querySelector('.particle-layer').appendChild(particle);
  }
}

/**
 * Play or pause audio with UI sync.
 */
function toggleMusic(forcePlay = null) {
  if (forcePlay !== null) {
    if (forcePlay) {
      birthdayAudio.play().catch(() => {});
    } else {
      birthdayAudio.pause();
    }
  } else if (birthdayAudio.paused) {
    birthdayAudio.play().catch(() => {});
  } else {
    birthdayAudio.pause();
  }
  musicToggle.textContent = birthdayAudio.paused ? '▶︎ Play' : '⏸ Pause';
}

/**
 * Sequence the scenes with cinematic timing.
 */
async function playSequence() {
  showScene(1);
  await typeText(scene1Text, 'Some people enter our lives quietly...\nyet leave beautiful memories everywhere.', 60);
  await new Promise((resolve) => setTimeout(resolve, 2800));

  showScene(2);
  buildScene2();
  await new Promise((resolve) => setTimeout(resolve, 4200));

  showScene(3);
  launchConfetti();
  setTimeout(blowOutCandles, 4200);
  await new Promise((resolve) => setTimeout(resolve, 6200));

  showScene(4);
  await new Promise((resolve) => setTimeout(resolve, 5200));

  showScene(5);
  buildTimeline();
  const items = timelineList.querySelectorAll('li');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 280 * index + 400);
  });
  await new Promise((resolve) => setTimeout(resolve, 3800));

  showScene(6);
  await new Promise((resolve) => setTimeout(resolve, 5200));

  showScene(7);
  revealEnding();
}

/**
 * Activate the welcome screen and allow the user to begin.
 */
function startExperience() {
  if (hasStarted) return;
  hasStarted = true;
  canPlayAudio = true;
  toggleMusic(true);
  showScene(0);
  setTimeout(() => {
    showScene(0);
  }, 100);
  playSequence();
}

/**
 * Hide the loading overlay after the initial delay.
 */
function hideLoader() {
  loadingScreen.classList.remove('active');
}

window.addEventListener('DOMContentLoaded', () => {
  initBackground();
  buildScene2();
  hideLoader();
  setTimeout(hideLoader, 3000);
});

// Fallback: start the experience on first user click anywhere (except audio control).
document.addEventListener('click', (e) => {
  const target = e.target;
  if (!hasStarted) {
    // ignore clicks on the music toggle so its own handler runs
    if (target && (target.id === 'musicToggle' || (target.closest && target.closest('#musicToggle')))) return;
    // only start if we're on the welcome scene
    const welcome = document.getElementById('sceneWelcome');
    if (welcome && welcome.classList.contains('active')) {
      try { openSurprise.click(); } catch (err) { startExperience(); }
    }
  }
}, { capture: true });
openSurprise.addEventListener('click', () => {
  if (!canPlayAudio) {
    canPlayAudio = true;
  }
  startExperience();
});

musicToggle.addEventListener('click', () => {
  if (!canPlayAudio) canPlayAudio = true;
  toggleMusic();
});

birthdayAudio.addEventListener('play', () => {
  musicToggle.textContent = '⏸ Pause';
});

birthdayAudio.addEventListener('pause', () => {
  musicToggle.textContent = '▶︎ Play';
});

// Mouse glow effect
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);
window.addEventListener('mousemove', (event) => {
  glow.style.transform = `translate(${event.clientX - 70}px, ${event.clientY - 70}px)`;
});
