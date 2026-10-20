/**
 * Pólya SDLC Coder - Global DOM Controller & Adapters
 * Source: DESIGN.md & REQ-001, REQ-006, REQ-009
 */

(function () {
  'use strict';

  // 1. One-Click Clipboard Copy Adapter
  function setupClipboardCopy() {
    document.addEventListener('click', function (e) {
      const copyBtn = e.target.closest('[data-copy-target], .btn-copy');
      if (!copyBtn) return;

      e.preventDefault();
      let textToCopy = '';

      if (copyBtn.dataset.copyText) {
        textToCopy = copyBtn.dataset.copyText;
      } else if (copyBtn.dataset.copyTarget) {
        const targetEl = document.querySelector(copyBtn.dataset.copyTarget);
        if (targetEl) {
          textToCopy = targetEl.innerText || targetEl.textContent || '';
        }
      }

      if (!textToCopy) return;

      // Copy text via Navigator API with legacy fallback
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => triggerCopySuccess(copyBtn))
          .catch(() => fallbackCopy(textToCopy, copyBtn));
      } else {
        fallbackCopy(textToCopy, copyBtn);
      }
    });
  }

  function fallbackCopy(text, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        triggerCopySuccess(btn);
      }
    } catch (err) {
      console.warn('Fallback copy failed', err);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  function triggerCopySuccess(btn) {
    const originalText = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied!
    `;

    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalText;
    }, 2000);
  }

  // 2. Mobile Navigation Drawer Controller
  function setupMobileNav() {
    const toggleBtn = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('global-nav-links');

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', function () {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('nav-open', !isExpanded);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav-open');
        toggleBtn.focus();
      }
    });
  }

  // 3. Sticky Bottom Install Bar Scroll Watcher
  function setupStickyBar() {
    const stickyBar = document.getElementById('sticky-install-bar');
    if (!stickyBar) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const scrollY = window.scrollY || window.pageYOffset;
          // Show bar once user scrolls past initial viewport / hero
          if (scrollY > 380) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // DOM Ready Initializer
  document.addEventListener('DOMContentLoaded', function () {
    setupClipboardCopy();
    setupMobileNav();
    setupStickyBar();
  });
})();
