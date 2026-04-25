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

// ── Cookie banner ────────────────────────────────────────────────────────────────
const cookieBanner = document.getElementById('cookie-banner');
if (cookieBanner && !localStorage.getItem('svea_cookies')) {
  setTimeout(() => cookieBanner.classList.add('show'), 900);
  const dismissCookie = (accepted) => {
    cookieBanner.classList.remove('show');
    if (accepted) localStorage.setItem('svea_cookies', '1');
  };
  document.getElementById('accept-cookies')?.addEventListener('click', () => dismissCookie(true));
  document.getElementById('decline-cookies')?.addEventListener('click', () => dismissCookie(false));
}

// ── Movie Slider ─────────────────────────────────────────────────────────────────
const movieData = [
  { title: 'Dune: Part Two',              genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg' },
  { title: 'Oppenheimer',                 genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
  { title: 'The Batman',                  genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg' },
  { title: 'Avatar: The Way of Water',    genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' },
  { title: 'Top Gun: Maverick',           genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/62HCnUTziyWcpDaBO2i1DX17ljH.jpg' },
  { title: 'John Wick 4',                 genre: 'HD',    poster: 'https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg' },
  { title: 'Barbie',                      genre: 'HD',    poster: 'https://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg' },
  { title: 'Spider-Man: No Way Home',     genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg' },
  { title: 'Stranger Things',             genre: 'Series', poster: 'https://image.tmdb.org/t/p/w300/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
  { title: 'Wednesday',                   genre: 'Series', poster: 'https://image.tmdb.org/t/p/w300/9PFonBhy4cQy7Jz20NpMygczOkv.jpg' },
  { title: 'House of the Dragon',         genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg' },
  { title: 'The Last of Us',              genre: 'Series', poster: 'https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg' },
  { title: 'Breaking Bad',                genre: 'Series', poster: 'https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { title: 'Peaky Blinders',              genre: 'HD',    poster: 'https://image.tmdb.org/t/p/w300/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg' },
  { title: 'The Crown',                   genre: 'Series', poster: 'https://image.tmdb.org/t/p/w300/1M876KPjulVwppEpldhdc8V4o68.jpg' },
  { title: 'Succession',                  genre: 'Series', poster: 'https://image.tmdb.org/t/p/w300/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg' },
  { title: 'The Bear',                    genre: 'Series', poster: 'https://image.tmdb.org/t/p/w300/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg' },
  { title: 'Mission: Impossible',         genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/NNxYkU70HPurnNCSiCjYAmacwm.jpg' },
  { title: 'Fast X',                      genre: 'HD',    poster: 'https://image.tmdb.org/t/p/w300/fiVW06jE7z9YnO4trhaMEdclSiC.jpg' },
  { title: 'Guardians of the Galaxy 3',   genre: '4K',    poster: 'https://image.tmdb.org/t/p/w300/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg' },
];

function buildMovieCard(m) {
  const qKey = m.genre === '4K' ? '4k' : m.genre.toLowerCase();
  return `<div class="movie-card">
    <img class="movie-poster" src="${m.poster}" alt="${m.title}" loading="lazy">
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
const pricingBasePrices  = { 1: 15, 3: 35, 6: 55, 12: 90 };
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
      const label = card.dataset.months === '1' ? '1 Month' : card.dataset.months + ' Months';
      const deviceWord = devices === 1 ? 'device' : 'devices';
      const msg = `Hi! I'd like to subscribe to SveaStream — ${label} plan for ${devices} ${deviceWord}. Total: kr${total}. Please guide me through the activation.`;
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
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
  const hideLoader = () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 520);
    }, 280);
  };
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
}

// ── Theme Toggle ─────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = theme === 'light' ? 'fa-moon' : 'fa-sun';
  const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
    btn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
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
