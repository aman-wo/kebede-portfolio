// ==========================================================================
// Theme toggle (light / dark)
// ==========================================================================
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let current = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', current);
  updateToggleState();

  toggle.addEventListener('click', () => {
    current = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    updateToggleState();
  });

  function updateToggleState() {
    const isDark = current === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }
})();

// ==========================================================================
// Mobile nav
// ==========================================================================
(function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
})();

// ==========================================================================
// Contact form
// ==========================================================================
(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
        status.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      btnText.textContent = originalText;
      submitBtn.disabled = false;
      status.textContent = 'Sorry, something went wrong. Please try again.';
    }
  });
})();

// ==========================================================================
// Footer year
// ==========================================================================
document.getElementById('year').textContent = new Date().getFullYear();
