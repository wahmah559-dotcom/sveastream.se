document.querySelectorAll('.language-switcher').forEach((switcher) => {
  const toggle = switcher.querySelector('summary');
  const close = () => {
    switcher.open = false;
    toggle.setAttribute('aria-expanded', 'false');
  };
  switcher.addEventListener('toggle', () => {
    toggle.setAttribute('aria-expanded', String(switcher.open));
  });
  switcher.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && switcher.open) {
      event.preventDefault();
      close();
      toggle.focus();
    }
  });
  switcher.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('click', (event) => {
    if (!switcher.contains(event.target)) close();
  });
  switcher.addEventListener('focusout', (event) => {
    if (!switcher.contains(event.relatedTarget)) close();
  });
});
