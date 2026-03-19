// SCROLL REVEAL
const animEls = document.querySelectorAll('.animate');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), (i % 5) * 80);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
animEls.forEach(el => io.observe(el));

// NAV ACTIVE STATE
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
  navLinks.forEach(a => {
    const match = a.getAttribute('href') === '#' + cur;
    a.style.color = match ? 'var(--text)' : '';
  });
});

// NAV SHADOW ON SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.4)' : '';
});

// COUNTER ANIMATION FOR HERO STATS
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1200;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * parseInt(target));
    el.textContent = (isNaN(val) ? target : val + (progress < 1 ? '' : '')) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

// Run counters once hero is visible
const heroStats = document.querySelectorAll('.hero-stat-num');const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      heroStats.forEach(el => {
        const txt = el.textContent;
        const num = txt.replace(/[^0-9]/g, '');
        if (num) animateCounter(el, txt, '');
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
if (heroStats.length) heroObserver.observe(heroStats[0]);

// ============================================================
// THEME TOGGLE — Dark / Light mode
// ============================================================
const toggle = document.getElementById('theme-toggle');
const thumb  = toggle.querySelector('.toggle-thumb');
const html   = document.documentElement;

// Load saved preference or default to dark
const saved = localStorage.getItem('theme');
if (saved === 'light') {
  html.classList.add('light');
  thumb.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  const isLight = html.classList.toggle('light');
  thumb.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  // Ripple flash effect
  toggle.style.transform = 'scale(0.9)';
  setTimeout(() => toggle.style.transform = '', 150);
});