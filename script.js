// GitHUb-владелец/репозиторий — замени на свои
const REPO_OWNER = 'YOUR_GITHUB_USERNAME';
const REPO_NAME = 'kinetic-dlc';
// Прямая ссылка на последний релиз (замени на свою, если нужна конкретная)
const LATEST_URL = 'https://github.com/' + REPO_OWNER + '/' + REPO_NAME + '/releases/latest/download/kinetic-1.0.0.jar';
// Если у тебя GitHub Pages в том же репо — файлы лежат рядом, можно ссылаться локально:
// const LATEST_URL = 'releases/kinetic-1.0.0.jar';

const TYPING = [
  'преврати свой майнкрафт в имбу',
  'не пожалеешь а афигеешь',
  'есть 3d текст песен в майне кста',
];

const VERSIONS = [
  { v: '1.0.0', date: '04.09.2026', changes: 'Релиз. TextLyrics через Genius, Themes, классический GUI, HitColor/HitBubbles', url: LATEST_URL },
];

function renderVersions() {
  const t = document.getElementById('versionsBody');
  t.innerHTML = VERSIONS.map(v =>
    `<tr>
       <td class="vsmall">${v.v}</td>
       <td class="vsmall">${v.date}</td>
       <td>${v.changes}</td>
       <td><a class="btn-mini" href="${v.url}">Скачать</a></td>
     </tr>`).join('');
}

function setupDownload() {
  const btn = document.getElementById('dlBtn');
  btn.href = LATEST_URL;
}

// Печатающийся текст
(function typing() {
  let idx = 0, ci = 0, del = false;
  const el = document.getElementById('typing');
  if (!el) return;
  const phrase = () => TYPING[idx % TYPING.length];
  setInterval(() => {
    const cur = phrase();
    el.textContent = cur.slice(0, ci);
    if (!del) {
      if (ci < cur.length) ci++;
      else { del = true; setTimeout(()=>{}, 900); }
    } else {
      if (ci > 0) ci--;
      else { del = false; idx++; }
    }
  }, 60);
})();

// Фон-частицы
(function bg() {
  const c = document.getElementById('bg');
  const ctx = c.getContext('2d');
  let w, h, parts;
  function size() { w = c.width = innerWidth; h = c.height = innerHeight; }
  function init() {
    size();
    const n = Math.min(90, Math.floor(w / 18));
    parts = Array.from({length:n}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      r: Math.random()*2.4+0.6,
      vy: -(Math.random()*0.4+0.15),
      col: Math.random() > 0.5 ? '124,58,237' : '168,85,247',
      tw: Math.random()*Math.PI*2
    }));
  }
  function draw() {
    ctx.clearRect(0,0,w,h);
    for (const p of parts) {
      p.y += p.vy;
      p.tw += 0.03;
      if (p.y < -10) { p.y = h+10; p.x = Math.random()*w; }
      const a = 0.25 + Math.abs(Math.sin(p.tw))*0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${p.col},${a})`;
      ctx.fill();
    }
    // соединяющие линии
    for (let i=0;i<parts.length;i++){
      for(let j=i+1;j<parts.length;j++){
        const dx=parts[i].x-parts[j].x, dy=parts[i].y-parts[j].y, d=dx*dx+dy*dy;
        if(d<12000){ ctx.strokeStyle=`rgba(124,58,237,${0.07*(1-d/12000)})`; ctx.beginPath(); ctx.moveTo(parts[i].x,parts[i].y); ctx.lineTo(parts[j].x,parts[j].y); ctx.stroke(); }
      }
    }
    requestAnimationFrame(draw);
  }
  init();
  draw();
  addEventListener('resize', init);
})();

// Reveal on scroll
(function reveal() {
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show','visible'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.card, .reveal').forEach(el => io.observe(el));
})();

setupDownload();
renderVersions();
