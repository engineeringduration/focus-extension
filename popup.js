const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const timerRing = document.getElementById('timer-progress');
const FULL_DASH_ARRAY = 2 * Math.PI * 54; // Circumference of the circle (r=54)
const DEFAULT_DURATION = 25 * 60; // 1500 seconds
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Timer ring setup
if (timerRing) {
  timerRing.setAttribute('stroke-dasharray', FULL_DASH_ARRAY);
  timerRing.setAttribute('stroke-dashoffset', 0);
}

function setRingProgress(timeLeft) {
  const percent = timeLeft / DEFAULT_DURATION;
  const offset = FULL_DASH_ARRAY * percent;
  if (timerRing) timerRing.setAttribute('stroke-dashoffset', FULL_DASH_ARRAY - offset);
}

function updateDisplay() {
  chrome.runtime.sendMessage({ action: 'getTime' }, (response) => {
    if (chrome.runtime.lastError || !response) return;
    const timeLeft = response.timeLeft;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (timerDisplay) timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    setRingProgress(timeLeft);
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
    if (themeIcon) themeIcon.textContent = '🌙';
  }
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else {
    applyTheme(getSystemTheme());
  }
}

if (startBtn) {
  startBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'start' });
    updateDisplay();
  });
}
if (pauseBtn) {
  pauseBtn.addEventListener('click', () => chrome.runtime.sendMessage({ action: 'pause' }));
}
if (resetBtn) {
  resetBtn.addEventListener('click', () => chrome.runtime.sendMessage({ action: 'reset' }));
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

loadTheme();
setInterval(updateDisplay, 1000);
updateDisplay();

// Music player for local files
const playMusicBtn = document.getElementById('playMusic');
const musicSelect = document.getElementById('music-select');
const audioPlayer = document.getElementById('audioPlayer');

if (playMusicBtn && musicSelect && audioPlayer) {
  playMusicBtn.addEventListener('click', () => {
    const selectedFile = musicSelect.value;
    const audioPath = chrome.runtime.getURL(`music/${selectedFile}`);
    audioPlayer.src = audioPath;
    audioPlayer.play();
  });
}
