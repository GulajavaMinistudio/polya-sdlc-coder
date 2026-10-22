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

    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      toggleBtn.setAttribute('aria-expanded', String(nextState));
      navLinks.classList.toggle('nav-open', nextState);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav-open');
        toggleBtn.focus();
      }
    });

    // Handle clicks inside drawer: close when tapping any link
    navLinks.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.closest('a')) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav-open');
      }
    });

    // Close on click outside (clicks outside toggleBtn & navLinks bubble to document)
    document.addEventListener('click', function () {
      if (toggleBtn.getAttribute('aria-expanded') === 'true') {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav-open');
      }
    });
  }

  // 3. Sticky Bottom Install Bar Scroll Watcher with Dismiss & Session Persistence
  function setupStickyBar() {
    const stickyBar = document.getElementById('sticky-install-bar');
    if (!stickyBar) return;

    const closeBtn = document.getElementById('sticky-bar-close');
    let isDismissed = sessionStorage.getItem('polya-sticky-bar-dismissed') === 'true';

    if (isDismissed) {
      stickyBar.remove();
      return;
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isDismissed = true;
        stickyBar.classList.remove('visible');
        sessionStorage.setItem('polya-sticky-bar-dismissed', 'true');
        setTimeout(() => {
          stickyBar.remove();
        }, 300);
      });
    }

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (isDismissed) return;
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
