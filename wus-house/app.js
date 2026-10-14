const header = document.querySelector('#header');
const menuToggle = document.querySelector('#menu-toggle');
const siteNav = document.querySelector('#site-nav');

function closeMenu() {
  siteNav.classList.remove('is-menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

function updateHeader() {
  header.classList.toggle('is-solid', window.scrollY > 8);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
