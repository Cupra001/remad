const SECRET = '672007';
const gate = document.getElementById('gate');
const overlay = document.getElementById('overlay');
const input = document.getElementById('codeInput');
const unlockBtn = document.getElementById('unlockBtn');
const closeBtn = document.getElementById('closeBtn');
const muteBtn = document.getElementById('muteBtn');
const errorEl = document.getElementById('error');
const song = document.getElementById('song');
const heartsRain = document.getElementById('heartsRain');
let rainTimer = null;

function tryUnlock() {
    if (input.value.trim() === SECRET) {
        errorEl.textContent = '';
        gate.hidden = true;
        overlay.hidden = false;
        startHeartsRain();
        song.currentTime = 0; song.volume = 0.85;
        const p = song.play(); if (p) p.catch(() => { });
    } else {
        errorEl.textContent = 'كلمة السر غير صحيحة 💔 حاولي مرة أخرى';
        errorEl.classList.remove('shake'); void errorEl.offsetWidth; errorEl.classList.add('shake');
        input.value = ''; input.focus();
    }
}
unlockBtn.addEventListener('click', tryUnlock);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlock(); });
closeBtn.addEventListener('click', () => { overlay.hidden = true; gate.hidden = false; input.value = ''; song.pause(); stopHeartsRain(); });
muteBtn.addEventListener('click', () => { song.muted = !song.muted; muteBtn.textContent = song.muted ? '🔇' : '🔊'; });

const RAIN = ['💗', '💖', '🌸', '🦋', '🤍', '✨', '🌷'];
function startHeartsRain() {
    stopHeartsRain();
    rainTimer = setInterval(() => {
        const s = document.createElement('span');
        s.className = 'fall';
        s.textContent = RAIN[Math.floor(Math.random() * RAIN.length)];
        s.style.left = Math.random() * 100 + '%';
        s.style.fontSize = (16 + Math.random() * 20) + 'px';
        s.style.animationDuration = (4 + Math.random() * 4) + 's';
        heartsRain.appendChild(s);
        setTimeout(() => s.remove(), 8000);
    }, 350);
}
function stopHeartsRain() { if (rainTimer) clearInterval(rainTimer); rainTimer = null; heartsRain.innerHTML = ''; }

const EMOJIS = ['🦋', '🌸', '✨', '💗', '🌷', '💖', '🦋', '🌸'];
const container = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
    const span = document.createElement('span'); span.className = 'particle';
    span.textContent = EMOJIS[i % EMOJIS.length];
    span.style.left = Math.random() * 100 + '%';
    span.style.fontSize = (16 + Math.random() * 20) + 'px';
    span.style.animationDuration = (9 + Math.random() * 10) + 's';
    span.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(span);
}