/**
 * Pólya SDLC Coder - Interactive Catalog Hub Controller
 * Source: REQ-002, REQ-003, REQ-004, REQ-009, REQ-010
 */

(function () {
  'use strict';

  const data = window.PolyaPortal || {};
  const skills = data.skills || [];
  const platforms = data.platforms || [];

  let currentCategory = 'all';
  let searchQuery = '';
  let debounceTimer = null;

  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear');
  const filterPills = document.querySelectorAll('.filter-pill');
  const skillsGrid = document.getElementById('skills-grid');
  const resultsCount = document.getElementById('results-count');
  const platformChipsContainer = document.getElementById('platform-chips');
  const platformCommandEl = document.getElementById('platform-command');
  const platformCopyBtn = document.getElementById('platform-copy-btn');
  const platformNotesEl = document.getElementById('platform-notes');

  // 1. Initialize Platform Configurator
  function initPlatformConfigurator() {
    if (!platformChipsContainer || !platforms.length) return;

    platformChipsContainer.innerHTML = '';
    platforms.forEach((platform, index) => {
      const chip = document.createElement('button');
      chip.className = `configurator-chip ${index === 0 ? 'active' : ''}`;
      chip.type = 'button';
      chip.dataset.platformId = platform.id;
      chip.textContent = platform.name;

      chip.addEventListener('click', () => {
        document.querySelectorAll('.configurator-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        updatePlatformDetails(platform);
      });

      platformChipsContainer.appendChild(chip);
    });

    // Set initial platform
    updatePlatformDetails(platforms[0]);
  }

  function updatePlatformDetails(platform) {
    if (platformCommandEl) {
      platformCommandEl.textContent = platform.command;
    }
    if (platformCopyBtn) {
      platformCopyBtn.dataset.copyText = platform.command;
    }
    if (platformNotesEl) {
      platformNotesEl.textContent = platform.notes;
    }
  }

  // 1b. Initialize Install Method Switcher & Script Selector
  function initInstallMethodSwitcher() {
    const tabAgentic = document.getElementById('tab-method-agentic');
    const tabScript = document.getElementById('tab-method-script');
    const panelAgentic = document.getElementById('method-panel-agentic');
    const panelScript = document.getElementById('method-panel-script');
    const linkSwitchToScript = document.getElementById('link-switch-to-script');
    const linkSwitchToAgentic = document.getElementById('link-switch-to-agentic');

    function activateTab(tab) {
      if (tab === 'agentic') {
        if (tabAgentic) {
          tabAgentic.classList.add('active');
          tabAgentic.setAttribute('aria-selected', 'true');
        }
        if (tabScript) {
          tabScript.classList.remove('active');
          tabScript.setAttribute('aria-selected', 'false');
        }
        if (panelAgentic) panelAgentic.style.display = 'block';
        if (panelScript) panelScript.style.display = 'none';
      } else if (tab === 'script') {
        if (tabScript) {
          tabScript.classList.add('active');
          tabScript.setAttribute('aria-selected', 'true');
        }
        if (tabAgentic) {
          tabAgentic.classList.remove('active');
          tabAgentic.setAttribute('aria-selected', 'false');
        }
        if (panelScript) panelScript.style.display = 'block';
        if (panelAgentic) panelAgentic.style.display = 'none';
      }
    }

    if (tabAgentic) {
      tabAgentic.addEventListener('click', () => activateTab('agentic'));
    }
    if (tabScript) {
      tabScript.addEventListener('click', () => activateTab('script'));
    }
    if (linkSwitchToScript) {
      linkSwitchToScript.addEventListener('click', () => activateTab('script'));
    }
    if (linkSwitchToAgentic) {
      linkSwitchToAgentic.addEventListener('click', () => activateTab('agentic'));
    }

    // OS Script Toggle
    const chipUnix = document.getElementById('chip-os-unix');
    const chipWin = document.getElementById('chip-os-win');
    const scriptCommandEl = document.getElementById('script-command');
    const scriptPromptSymbolEl = document.getElementById('script-prompt-symbol');
    const scriptCopyBtn = document.getElementById('script-copy-btn');
    const scriptNotesEl = document.getElementById('script-notes');

    const unixCmd = 'curl -fsSL https://raw.githubusercontent.com/GulajavaMinistudio/polya-sdlc-coder/main/install.sh | bash';
    const winCmd = 'irm https://raw.githubusercontent.com/GulajavaMinistudio/polya-sdlc-coder/main/install.ps1 | iex';

    if (chipUnix && chipWin && scriptCommandEl) {
      chipUnix.addEventListener('click', () => {
        chipUnix.classList.add('active');
        chipWin.classList.remove('active');
        scriptCommandEl.textContent = unixCmd;
        if (scriptPromptSymbolEl) scriptPromptSymbolEl.textContent = '$';
        if (scriptCopyBtn) scriptCopyBtn.dataset.copyText = unixCmd;
        if (scriptNotesEl) {
          scriptNotesEl.innerHTML = 'Runs the automated interactive installer for <strong>macOS</strong> (Terminal / Zsh) and <strong>Linux</strong>. Asks which platform directories to configure (<code>.agents/</code>, <code>.claude/</code>, or <code>.cursor/</code>) and safely merges existing rules.';
        }
      });

      chipWin.addEventListener('click', () => {
        chipWin.classList.add('active');
        chipUnix.classList.remove('active');
        scriptCommandEl.textContent = winCmd;
        if (scriptPromptSymbolEl) scriptPromptSymbolEl.textContent = 'PS>';
        if (scriptCopyBtn) scriptCopyBtn.dataset.copyText = winCmd;
        if (scriptNotesEl) {
          scriptNotesEl.innerHTML = 'Runs the automated PowerShell installer for <strong>Windows 10/11</strong> (PowerShell 5.1+ / pwsh 7+). Asks which platform directories to configure (<code>.agents/</code>, <code>.claude/</code>, or <code>.cursor/</code>) and safely merges existing rules.';
        }
      });
    }
  }

  // 2. Safe Substring Filter Engine
  function filterSkills() {
    const query = searchQuery.trim().toLowerCase();

    const filtered = skills.filter(skill => {
      // Category match
      const matchesCategory = (currentCategory === 'all') || (skill.phaseCategory === currentCategory);
      if (!matchesCategory) return false;

      // Text query match (safe substring containment via includes)
      if (!query) return true;

      const inCommand = skill.command.toLowerCase().includes(query);
      const inName = skill.name.toLowerCase().includes(query);
      const inDesc = skill.description.toLowerCase().includes(query);
      const inTags = Array.isArray(skill.tags) && skill.tags.some(tag => tag.toLowerCase().includes(query));

      return inCommand || inName || inDesc || inTags;
    });

    renderSkills(filtered);
    updateResultsMeta(filtered.length);
  }

  // 3. Render Skill Cards
  function renderSkills(items) {
    if (!skillsGrid) return;

    if (items.length === 0) {
      skillsGrid.innerHTML = `
        <div class="empty-state-card" role="status">
          <h3 class="empty-state-title">No skills found</h3>
          <p class="empty-state-desc">No Pólya SDLC skills match your current search query or phase filter.</p>
          <button type="button" class="btn-primary" id="reset-filters-btn">
            Reset Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
      }
      return;
    }

    skillsGrid.innerHTML = items.map(skill => `
      <article class="skill-card">
        <div class="skill-card-header">
          <span class="skill-command-badge">${escapeHtml(skill.command)}</span>
          <span class="skill-phase-tag">${escapeHtml(skill.polyaStage)}</span>
        </div>
        <h3 class="skill-card-title">${escapeHtml(skill.name)}</h3>
        <div class="skill-card-stage">${escapeHtml(skill.phase)}</div>
        <p class="skill-card-description">${escapeHtml(skill.description)}</p>
        <a href="${escapeHtml(skill.detailUrl)}" class="skill-card-footer" aria-label="View deep-dive details for ${escapeHtml(skill.command)}">
          <span>View Skill Details</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </article>
    `).join('');
  }

  function updateResultsMeta(count) {
    if (!resultsCount) return;
    resultsCount.textContent = `Showing ${count} of ${skills.length} skills`;
  }

  function resetAllFilters() {
    searchQuery = '';
    currentCategory = 'all';

    if (searchInput) {
      searchInput.value = '';
    }
    if (searchClearBtn) {
      searchClearBtn.classList.remove('visible');
    }

    filterPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === 'all');
    });

    filterSkills();
    if (searchInput) {
      searchInput.focus();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 4. Setup Event Listeners
  function setupCatalogListeners() {
    // Search input with 80ms trailing debounce
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        clearTimeout(debounceTimer);
        searchQuery = e.target.value;

        if (searchClearBtn) {
          searchClearBtn.classList.toggle('visible', searchQuery.length > 0);
        }

        debounceTimer = setTimeout(filterSkills, 80);
      });
    }

    // Search clear button
    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', function () {
        searchQuery = '';
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        searchClearBtn.classList.remove('visible');
        filterSkills();
      });
    }

    // Category filter pills
    filterPills.forEach(pill => {
      pill.addEventListener('click', function () {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.dataset.category || 'all';
        filterSkills();
      });
    });
  }

  // Initializer
  document.addEventListener('DOMContentLoaded', function () {
    initPlatformConfigurator();
    initInstallMethodSwitcher();
    setupCatalogListeners();
    renderSkills(skills);
    updateResultsMeta(skills.length);
  });
})();
