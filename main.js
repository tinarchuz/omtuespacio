// ── BANNER CLOSE ──
const banner = document.getElementById('topBanner');
const bannerClose = document.getElementById('bannerClose');
const navbar = document.getElementById('navbar');

bannerClose.addEventListener('click', () => {
  banner.style.transition = 'opacity 0.3s, transform 0.3s';
  banner.style.opacity = '0';
  banner.style.transform = 'translateY(-100%)';
  setTimeout(() => {
    banner.style.display = 'none';
    navbar.style.top = '0';
  }, 300);
});

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  mobileOverlay.classList.toggle('visible', isOpen);
  mobileOverlay.style.pointerEvents = isOpen ? 'auto' : 'none';
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMenu() {
  navLinks.classList.remove('open');
  mobileOverlay.classList.remove('visible');
  mobileOverlay.style.pointerEvents = 'none';
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
// Se expone en window porque el HTML usa onclick="closeMenu()" inline
window.closeMenu = closeMenu;

// ── COPYRIGHT YEAR ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── SMOOTH SCROLL CON OFFSET ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const bannerH = (banner.style.display === 'none') ? 0 : (banner.offsetHeight || 0);
    const navH = navbar.offsetHeight || 0;
    const offset = bannerH + navH + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => observer.observe(el));
