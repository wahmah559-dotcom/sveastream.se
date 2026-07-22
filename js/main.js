/* ─── SveaStream Main JS ─────────────────────────────────────────────────────── */

// ── Mobile menu ─────────────────────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

// ── Active nav link ──────────────────────────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Back to top ──────────────────────────────────────────────────────────────────
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Scroll animations (fade-up, fade-left, fade-right, scale-in) with stagger ───
const animEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
if (animEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).map(e => e.target);
    visible.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  animEls.forEach(el => io.observe(el));
}

// ── Channel tabs (homepage) ──────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + target);
    if (panel) panel.classList.add('active');
  });
});

// ── FAQ accordion ───────────────────────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Pricing billing toggle ───────────────────────────────────────────────────────
const billingToggle = document.getElementById('billing-toggle');
if (billingToggle) {
  billingToggle.addEventListener('change', () => {
    const annual = billingToggle.checked;
    document.querySelectorAll('[data-monthly]').forEach(el => {
      const monthly = parseFloat(el.dataset.monthly);
      const yr      = parseFloat(el.dataset.yearly || monthly * 10);
      el.textContent = annual ? yr.toFixed(0) : monthly.toFixed(0);
    });
    document.querySelectorAll('.per-label').forEach(el => {
      el.textContent = annual ? '/yr' : '/mo';
    });
    const saveBadge = document.querySelector('.save-badge');
    if (saveBadge) saveBadge.style.display = annual ? 'inline' : 'none';
  });
}

// ── Contact form ────────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type=submit]');
    const success = document.getElementById('form-success');
    btn.disabled    = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 1200);
  });
}

// ── Channels filter (channels page) ─────────────────────────────────────────────
const filterBtns = document.querySelectorAll('[data-filter]');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.channels-category').forEach(cat => {
        if (filter === 'all' || cat.dataset.cat === filter) {
          cat.style.display = '';
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
}

// ── Movie Slider ─────────────────────────────────────────────────────────────────
// Poster images are served locally from images/movies/ (converted to WebP).
// TMDB is not used for images; only local assets are loaded here.
const movieData = [
  { title: 'Dune: Part Two',              genre: '4K',    poster: 'images/movies/dune-part-two.webp' },
  { title: 'Oppenheimer',                 genre: '4K',    poster: 'images/movies/oppenheimer.webp' },
  { title: 'The Batman',                  genre: '4K',    poster: 'images/movies/the-batman.webp' },
  { title: 'Avatar: The Way of Water',    genre: '4K',    poster: 'images/movies/avatar-the-way-of-water.webp' },
  { title: 'Top Gun: Maverick',           genre: '4K',    poster: 'images/movies/top-gun-maverick.webp' },
  { title: 'John Wick 4',                 genre: 'HD',    poster: 'images/movies/john-wick-4.webp' },
  { title: 'Barbie',                      genre: 'HD',    poster: 'images/movies/barbie.webp' },
  { title: 'Spider-Man: No Way Home',     genre: '4K',    poster: 'images/movies/spider-man-no-way-home.webp' },
  { title: 'Stranger Things',             genre: 'Series', poster: 'images/movies/stranger-things.webp' },
  { title: 'Wednesday',                   genre: 'Series', poster: 'images/movies/wednesday.webp' },
  { title: 'House of the Dragon',         genre: '4K',    poster: 'images/movies/house-of-the-dragon.webp' },
  { title: 'The Last of Us',              genre: 'Series', poster: 'images/movies/the-last-of-us.webp' },
  { title: 'Breaking Bad',                genre: 'Series', poster: 'images/movies/breaking-bad.webp' },
  { title: 'Peaky Blinders',              genre: 'HD',    poster: 'images/movies/peaky-blinders.webp' },
  { title: 'The Crown',                   genre: 'Series', poster: 'images/movies/the-crown.webp' },
  { title: 'Succession',                  genre: 'Series', poster: 'images/movies/succession.webp' },
  { title: 'The Bear',                    genre: 'Series', poster: 'images/movies/the-bear.webp' },
  { title: 'Mission: Impossible',         genre: '4K',    poster: 'images/movies/mission-impossible.webp' },
  { title: 'Fast X',                      genre: 'HD',    poster: 'images/movies/fast-x.webp' },
  { title: 'Guardians of the Galaxy 3',   genre: '4K',    poster: 'images/movies/guardians-of-the-galaxy-3.webp' },
];

function buildMovieCard(m) {
  const qKey = m.genre === '4K' ? '4k' : m.genre.toLowerCase();
  return `<div class="movie-card">
    <img class="movie-poster" src="${m.poster}" alt="${m.title}" width="200" height="290" loading="lazy" decoding="async">
    <div class="movie-overlay"></div>
    <span class="movie-quality quality-${qKey}">${m.genre}</span>
    <div class="movie-info">
      <div class="movie-play"><i class="fa-solid fa-play"></i></div>
      <div class="movie-title">${m.title}</div>
    </div>
  </div>`;
}

function populateSlider(trackId, items) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const html = items.map(buildMovieCard).join('');
  track.innerHTML = html + html; // duplicate for seamless loop
}

populateSlider('slider-row-1', movieData.slice(0, 12));
populateSlider('slider-row-2', movieData.slice(8, 20));

// ── Device-Based Pricing ─────────────────────────────────────────────────────────
const pricingBasePrices  = { 1: 99, 3: 249, 6: 449, 12: 749 };
const pricingMultipliers = { 1: 1.0, 2: 1.6, 3: 2.1, 4: 2.5 };
const deviceNotes = {
  1: '1 device — standard rate (×1.0)',
  2: '2 devices — ×1.6 multiplier applied',
  3: '3 devices — ×2.1 multiplier applied',
  4: '4 devices — ×2.5 multiplier applied',
};

function updateDurationPrices(devices) {
  const mult     = pricingMultipliers[devices];
  const noteEl   = document.getElementById('device-note-text');
  if (noteEl) noteEl.textContent = deviceNotes[devices];

  document.querySelectorAll('.duration-card').forEach(card => {
    const base   = parseFloat(card.dataset.base);
    const months = parseInt(card.dataset.months);
    const total  = Math.round(base * mult);
    const perMo  = (total / months).toFixed(2);

    const amountEl  = card.querySelector('.dur-amount');
    const monthlyEl = card.querySelector('.dur-monthly');
    const btn       = card.querySelector('.subscribe-btn');
    if (!amountEl) return;

    // Number flip animation
    amountEl.classList.add('price-flash');
    setTimeout(() => {
      amountEl.textContent = total;
      if (monthlyEl) monthlyEl.textContent = perMo;
      amountEl.classList.remove('price-flash');
    }, 180);

    // Update WhatsApp deep-link with plan details
    if (btn) {
      const label = card.dataset.months === '1' ? '1 månad' : card.dataset.months + ' månader';
      const deviceWord = devices === 1 ? 'enhet' : 'enheter';
      const msg = `Hej! Jag vill beställa ${label} - ${total} kr för ${devices} ${deviceWord}. Tack!`;
      btn.href = `https://wa.me/17867352904?text=${encodeURIComponent(msg)}`;
    }
  });
}

const pricingDeviceBtns = document.querySelectorAll('.device-btn');
if (pricingDeviceBtns.length) {
  pricingDeviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pricingDeviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateDurationPrices(parseInt(btn.dataset.devices));
    });
  });
  updateDurationPrices(1); // set initial WhatsApp links
}

// ── Loading Screen ───────────────────────────────────────────────────────────────
// Shown only on the first page of a browser-tab session. On repeat navigations,
// the inline head script (see the head of each page) sets [data-no-loader] on
// <html> before first paint, so #loading-screen never renders at all — no flash.
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
  if (document.documentElement.hasAttribute('data-no-loader')) {
    loadingScreen.remove();
  } else {
    let hidden = false;
    const hideLoader = () => {
      if (hidden) return;
      hidden = true;
      loadingScreen.classList.add('hidden');
      loadingScreen.addEventListener('transitionend', () => loadingScreen.remove(), { once: true });
      setTimeout(() => loadingScreen.remove(), 400); // fallback if transitionend never fires
    };
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }
    setTimeout(hideLoader, 300); // hard cap: never show longer than 300ms
  }
}

// ── Theme Toggle ─────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const label = theme === 'light' ? 'Byt till mörkt läge' : 'Byt till ljust läge';
  document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
    btn.setAttribute('aria-label', label);
  });
}

(function initTheme() {
  const saved = localStorage.getItem('svea_theme') || 'dark';
  applyTheme(saved);
})();

document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('svea_theme', next);
    applyTheme(next);
  });
});
