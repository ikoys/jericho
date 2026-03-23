// ── TYPING ANIMATION ──
const roles = [
  'Associate Software Engineer',
  'Product Manager',
  'Technical Product Manager',
  'Product Owner',
  'Mobile Developer'
];
const typedEl = document.getElementById('typed');
let ri = 0, ci = 0, del = false;

function type() {
  const w = roles[ri];
  typedEl.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
  if (!del && ci > w.length) { del = true; setTimeout(type, 1600); return; }
  if (del && ci < 0) { del = false; ri = (ri + 1) % roles.length; ci = 0; }
  setTimeout(type, del ? 38 : 68);
}
setTimeout(type, 900);

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── SKILL BARS ──
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      e.target.querySelectorAll('.s-fill').forEach(b => { b.style.width = b.dataset.w; });
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-group').forEach(g => barObserver.observe(g));

// ── CONTACT FORM ──
document.getElementById('sendBtn').addEventListener('click', () => {
  const btn = document.getElementById('sendBtn');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#4ade80';
  btn.style.color = '#0e0f11';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
});
