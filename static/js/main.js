/* ── Typed hero text ── */
(function () {
  const phrases = [
    'I build with Python and Django.',
    'I am learning to engineer with LLMs.',
    'I care about clean, tested software.',
    'I build tools for real problems.',
  ];
  const el = document.getElementById('typed-text');
  if (!el) return;
  let pi = 0, ci = 0, del = false;
  function tick() {
    const cur = phrases[pi];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; setTimeout(tick, 2000); return; }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, del ? 40 : 65);
  }
  setTimeout(tick, 800);
})();

/* ── Scroll reveal ── */
(function () {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  targets.forEach(el => observer.observe(el));
})();

/* ── Active nav on scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function onScroll() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--text-primary)'
        : 'var(--text-secondary)';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});