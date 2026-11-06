/* Main-only navigation and dialogs; no changes to the legacy subpage runtime. */
(() => {
  'use strict';
  const header = document.getElementById('mainHeader');
  const menu = document.getElementById('homeMenu');
  const trigger = document.querySelector('._viewSideMenu');
  const close = menu.querySelector('._sideMenuClose');
  const backdrop = document.querySelector('.home-menu-backdrop');
  const main = document.getElementById('main');
  const footer = document.querySelector('footer');
  let previousFocus;
  let previousOverflow = '';
  const setBackgroundInert = (value) => {
    [header, main, footer].forEach((element) => { if (element) element.inert = value; });
  };
  function closeMenu(restoreFocus = true) {
    if (!menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.inert = true;
    trigger.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('is-visible');
    backdrop.hidden = true;
    setBackgroundInert(false);
    document.body.style.overflow = previousOverflow;
    if (restoreFocus) previousFocus?.focus();
  }
  trigger.addEventListener('click', () => {
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    menu.inert = false;
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    setBackgroundInert(true);
    // Move focus after the hidden-to-visible CSS state and inert tree update.
    requestAnimationFrame(() => {
      if (menu.classList.contains('is-open')) close.focus({ preventScroll: true });
    });
  });
  close.addEventListener('click', () => closeMenu());
  backdrop.addEventListener('click', () => closeMenu());
  const submenuButton = menu.querySelector('.home-submenu-toggle');
  submenuButton.addEventListener('click', () => {
    const expanded = submenuButton.getAttribute('aria-expanded') !== 'true';
    submenuButton.setAttribute('aria-expanded', String(expanded));
    submenuButton.setAttribute('aria-label', `진료과목 하위 메뉴 ${expanded ? '닫기' : '펼치기'}`);
    submenuButton.textContent = expanded ? '−' : '＋';
    submenuButton.closest('li').classList.toggle('is_open', expanded);
  });
  // The parent remains a real page link; its adjacent button expands the children.
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (!menu.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll('a, button')].filter((element) => element.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  function updateHeader() { header.classList.toggle('is_active', window.scrollY > 0); }
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('pageshow', updateHeader);
  updateHeader();
  function openDialog(dialog) {
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  document.querySelectorAll('[data-home-dialog]').forEach((button) => {
    button.addEventListener('click', () => openDialog(document.getElementById(button.dataset.homeDialog)));
  });
  document.getElementById('quickReserve').addEventListener('click', (event) => {
    if (window.matchMedia('(min-width: 901px)').matches) {
      event.preventDefault();
      openDialog(document.getElementById('reserveModal'));
    }
  });
  document.querySelectorAll('.home-dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
  });
})();
