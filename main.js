const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const circleData = [
  { selector: '.cr-fill-1', pct: 0.92 },
  { selector: '.cr-fill-2', pct: 0.87 },
  { selector: '.cr-fill-3', pct: 0.95 },
  { selector: '.cr-fill-4', pct: 0.78 },
];
const CIRC = 315;
circleData.forEach(({ selector, pct }) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.style.strokeDashoffset = CIRC;
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.style.strokeDashoffset = CIRC * (1 - pct);
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(el.closest('.c-card'));
});

document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  btn.textContent = '✓ 訊息已送出，我們會盡快回覆';
  btn.disabled = true;
  btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
  setTimeout(() => {
    btn.textContent = '送出';
    btn.disabled = false;
    btn.style.background = '';
    e.target.reset();
  }, 3500);
});
