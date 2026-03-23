// ── LIGHTBOX ──
const slides = [...document.querySelectorAll('.carousel-slide')];
const imgs = slides.map(s => ({
  src: s.querySelector('img').src,
  caption: s.querySelector('.carousel-caption').textContent
}));

const lb        = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbDots    = document.getElementById('lbDots');
let current     = 0;

lbImg.style.transition = 'opacity 0.15s ease';

// ── BUILD DOTS ──
imgs.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'lightbox-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  lbDots.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.lightbox-dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );
}

function goTo(i) {
  current = (i + imgs.length) % imgs.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = imgs[current].src;
    lbCaption.textContent = imgs[current].caption;
    lbImg.style.opacity = '1';
  }, 150);
  updateDots();
}

function openLightbox(i) {
  current = i;
  lbImg.src = imgs[current].src;
  lbCaption.textContent = imgs[current].caption;
  updateDots();
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('active');
  document.body.style.overflow = '';
}

// ── BIND EVENTS ──
slides.forEach((s, i) => s.querySelector('img').addEventListener('click', () => openLightbox(i)));
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('lbNext').addEventListener('click', () => goTo(current + 1));

// ── KEYBOARD ──
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   goTo(current - 1);
  if (e.key === 'ArrowRight')  goTo(current + 1);
});

// ── SWIPE (MOBILE) ──
let touchStartX = 0;
lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lb.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
});
