(function () {
  var CONSENT_KEY = 'sveastream_cookie_consent';

  function getSettingsUrl() {
    var path = window.location.pathname;
    var inArticles = path.indexOf('/articles/') !== -1;
    return inArticles ? '../cookie-policy.html' : 'cookie-policy.html';
  }

  function dismiss(banner) {
    banner.classList.remove('cc-visible');
    banner.addEventListener('transitionend', function () {
      banner.remove();
    }, { once: true });
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookiesamtycke');
    banner.innerHTML =
      '<div class="cc-inner">' +
        '<p class="cc-text">' +
          'Vi använder cookies för att förbättra din upplevelse. Läs mer i vår ' +
          '<a href="' + getSettingsUrl() + '">Cookiepolicy</a>.' +
        '</p>' +
        '<div class="cc-actions">' +
          '<button class="cc-btn cc-accept">Acceptera</button>' +
          '<button class="cc-btn cc-reject">Avvisa</button>' +
          '<a href="' + getSettingsUrl() + '" class="cc-btn cc-settings">Inställningar</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    setTimeout(function () {
      banner.classList.add('cc-visible');
    }, 50);

    banner.querySelector('.cc-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      dismiss(banner);
    });

    banner.querySelector('.cc-reject').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'rejected');
      dismiss(banner);
    });
  }

  if (!localStorage.getItem(CONSENT_KEY)) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(buildBanner, 600);
      });
    } else {
      setTimeout(buildBanner, 600);
    }
  }
})();
