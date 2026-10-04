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
  // Keep links visible until the browser completes their native navigation.
  // Hiding a touched link during focus/click handling can cancel activation.
  document.addEventListener('click', (event) => {
    if (!switcher.contains(event.target)) close();
  });
  switcher.addEventListener('focusout', (event) => {
    // Touch browsers can report no focus destination when tapping a link.
    // Outside clicks still dismiss the menu in that case.
    if (event.relatedTarget && !switcher.contains(event.relatedTarget)) close();
  });
});
