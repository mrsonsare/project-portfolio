/**
 * ==============================================================================
 * DYNAMIC RENDERING & INTERACTION CONTROLLER
 * Consumes portfolioData and dynamically injects all content into the DOM.
 * ZERO personal details, skill tags, or project items are hardcoded in HTML.
 * ==============================================================================
 */

(function () {
  'use strict';

  // Ensure data exists
  var data = window.portfolioData;
  if (!data) {
    console.error('CRITICAL: portfolioData is not defined. Ensure portfolio-data.js is loaded.');
    return;
  }

  // --- SVG Icons Helper ---
  function getIconSvg(name) {
    switch (name) {
      case 'github':
        return '<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>';
      case 'linkedin':
        return '<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>';
      case 'email':
        return '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
      case 'scholar':
        return '<svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4 3.18v6.82h3v-4.43l5 3.93 12-9.5L12 0z"/></svg>';
      case 'external':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
      case 'arrow-right':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
      case 'check':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      case 'copy':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
      case 'control':
        return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path><circle cx="12" cy="12" r="4"></circle></svg>';
      case 'perception':
        return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>';
      case 'chip':
        return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>';
      default:
        return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"></circle></svg>';
    }
  }

  // --- Document Meta & Title Injection ---
  function injectDocumentMetadata() {
    var p = data.personalInfo;
    if (!p) return;

    // Document title
    document.title = p.name + ' | ' + p.title;

    // Set meta tags if found
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && p.tagline) descMeta.setAttribute('content', p.tagline);

    var authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta && p.name) authorMeta.setAttribute('content', p.name);

    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && p.name) ogTitle.setAttribute('content', p.name + ' | ' + p.title);

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && p.tagline) ogDesc.setAttribute('content', p.tagline);
  }

  // --- Toast Notification Utility ---
  function showToast(message) {
    var toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.innerHTML = getIconSvg('check') + ' <span>' + message + '</span>';
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  // ============================================================================
  // 1. RENDER HEADER & NAVIGATION
  // ============================================================================
  function renderHeader() {
    var personalInfo = data.personalInfo;

    // Logo Monogram, Name & Link
    var logoLink = document.getElementById('nav-logo-link');
    var logoBadge = document.getElementById('nav-logo-badge');
    var logoName = document.getElementById('nav-logo-name');
    var logoTitle = document.getElementById('nav-logo-title');

    if (logoLink) logoLink.setAttribute('aria-label', personalInfo.name + ' - Home');
    if (logoBadge) logoBadge.textContent = (personalInfo.avatar && personalInfo.avatar.initials) ? personalInfo.avatar.initials : 'HS';
    if (logoName) logoName.textContent = personalInfo.name;
    if (logoTitle) logoTitle.textContent = (personalInfo.title.split('&')[0] || 'Robotics').trim();

    // Status beacon in header
    var statusTextEl = document.getElementById('nav-status-text');
    if (statusTextEl) {
      statusTextEl.textContent = personalInfo.statusText || 'SYSTEMS ONLINE';
    }

    // Header scroll background transition
    var header = document.querySelector('.site-header');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        if (header) header.classList.add('scrolled');
      } else {
        if (header) header.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    var mobileBtn = document.getElementById('mobile-toggle-btn');
    var navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', function () {
        var isOpen = navMenu.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', isOpen);
      });

      // Close menu on navigation link click
      navMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          navMenu.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ============================================================================
  // 2. RENDER HERO SECTION
  // ============================================================================
  function renderHero() {
    var personalInfo = data.personalInfo;

    // Badges / Pills
    var badgeEl = document.getElementById('hero-badge-text');
    if (badgeEl) badgeEl.textContent = personalInfo.badge || 'Embodied Intelligence';

    var subBadgeEl = document.getElementById('hero-subbadge-text');
    if (subBadgeEl) subBadgeEl.textContent = personalInfo.subBadge || 'ROS 2 // EMBODIED AI';

    // Name & Highlight
    var titleEl = document.getElementById('hero-name-target');
    if (titleEl) {
      titleEl.innerHTML = '<span class="name-highlight">' + personalInfo.name + '</span>';
    }

    // Role Subtitle
    var roleEl = document.getElementById('hero-role-target');
    if (roleEl) {
      roleEl.innerHTML = '<span class="hero-role-accent">' + personalInfo.title + '</span>';
    }

    // Description / Tagline
    var descEl = document.getElementById('hero-desc-target');
    if (descEl) {
      descEl.textContent = personalInfo.tagline;
    }

    // Social Links in Hero
    var socialsContainer = document.getElementById('hero-socials-target');
    if (socialsContainer && personalInfo.socialLinks) {
      socialsContainer.innerHTML = personalInfo.socialLinks
        .map(function (link) {
          return '<a href="' + link.url + '" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="' + link.platform + ': ' + link.handle + '" title="' + link.platform + '">' +
            getIconSvg(link.icon) +
            '</a>';
        })
        .join('');
    }

    // Telemetry Stats Grid
    var telemetryContainer = document.getElementById('telemetry-stats-target');
    if (telemetryContainer && personalInfo.telemetryStats) {
      telemetryContainer.innerHTML = personalInfo.telemetryStats
        .map(function (stat) {
          return '<div class="telemetry-item">' +
            '<div class="telemetry-val">' + stat.value + '</div>' +
            '<div class="telemetry-lbl">' + stat.label + '</div>' +
            '<div class="telemetry-meta">' + stat.meta + '</div>' +
            '</div>';
        })
        .join('');
    }

    // HUD Footer Info
    var hudArch = document.getElementById('hud-arch-target');
    if (hudArch && personalInfo.architectureStack) {
      hudArch.textContent = personalInfo.architectureStack;
    }

    var hudClock = document.getElementById('hud-clock-target');
    if (hudClock && personalInfo.systemClock) {
      hudClock.textContent = personalInfo.systemClock;
    }
  }

  // ============================================================================
  // 3. RENDER ABOUT SECTION & PHILOSOPHY PILLARS
  // ============================================================================
  function renderAbout() {
    var personalInfo = data.personalInfo;
    var pillars = data.philosophyPillars || [];

    var bioTarget = document.getElementById('about-bio-target');
    if (bioTarget) {
      bioTarget.textContent = personalInfo.shortBio;
    }

    var pillarsTarget = document.getElementById('about-pillars-target');
    if (pillarsTarget && pillars.length > 0) {
      pillarsTarget.innerHTML = pillars
        .map(function (p) {
          return '<div class="pillar-item">' +
            '<div class="pillar-icon">' + getIconSvg(p.icon) + '</div>' +
            '<h3 class="pillar-title">' + p.title + '</h3>' +
            '<p class="pillar-desc">' + p.description + '</p>' +
            '</div>';
        })
        .join('');
    }
  }

  // ============================================================================
  // 4. RENDER SKILL MATRIX SECTION
  // ============================================================================
  var activeSkillCategory = 'all';

  function renderSkills() {
    var skills = data.skills;
    var filterTabsContainer = document.getElementById('skill-tabs-target');
    var skillsGridContainer = document.getElementById('skills-grid-target');

    if (!skills || !skills.categories) return;

    // 1. Render Filter Tabs
    if (filterTabsContainer) {
      var tabs = [{ id: 'all', name: 'All Competencies' }].concat(
        skills.categories.map(function (c) {
          return { id: c.id, name: c.name };
        })
      );

      filterTabsContainer.innerHTML = tabs
        .map(function (t) {
          return '<button type="button" class="skill-tab-btn ' + (t.id === activeSkillCategory ? 'active' : '') + '" data-cat="' + t.id + '">' +
            t.name +
            '</button>';
        })
        .join('');

      filterTabsContainer.querySelectorAll('.skill-tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          activeSkillCategory = e.currentTarget.getAttribute('data-cat');
          filterTabsContainer.querySelectorAll('.skill-tab-btn').forEach(function (b) {
            b.classList.remove('active');
          });
          e.currentTarget.classList.add('active');
          renderSkillCards();
        });
      });
    }

    // 2. Render Cards Helper
    function renderSkillCards() {
      if (!skillsGridContainer) return;

      var filtered = activeSkillCategory === 'all'
        ? skills.categories
        : skills.categories.filter(function (c) {
            return c.id === activeSkillCategory;
          });

      skillsGridContainer.innerHTML = filtered
        .map(function (cat) {
          var itemsHtml = cat.items
            .map(function (item) {
              var prof = item.proficiency || 85;
              return '<div class="skill-item">' +
                '<div class="skill-meta">' +
                '<span class="skill-name">' + item.name + '</span>' +
                '<span class="skill-badge">' + item.level + '</span>' +
                '</div>' +
                '<div class="skill-bar-track">' +
                '<div class="skill-bar-fill" style="width: ' + prof + '%"></div>' +
                '</div>' +
                '</div>';
            })
            .join('');

          return '<article class="skill-category-card">' +
            '<div class="skill-category-header">' +
            '<div class="skill-cat-icon">⚙</div>' +
            '<div>' +
            '<h3 class="skill-cat-title">' + cat.name + '</h3>' +
            '</div>' +
            '</div>' +
            '<p class="skill-cat-desc">' + cat.description + '</p>' +
            '<div class="skill-items-list">' +
            itemsHtml +
            '</div>' +
            '</article>';
        })
        .join('');
    }

    renderSkillCards();
  }

  // ============================================================================
  // 5. RENDER PROJECTS SECTION & MODAL
  // ============================================================================
  var activeProjectCategory = 'all';

  function renderProjects() {
    var projects = data.projects;
    var filterContainer = document.getElementById('project-filters-target');
    var projectsGrid = document.getElementById('projects-grid-target');

    if (!projectsGrid) return;

    // Handle empty state gracefully if user empties projects array
    if (!projects || projects.length === 0) {
      projectsGrid.innerHTML =
        '<div class="projects-empty">' +
        '<div class="projects-empty-icon">📂</div>' +
        '<h3>No Projects Registered In Config</h3>' +
        '<p>Add project entries to the <code>portfolioData.projects</code> array inside <code>js/portfolio-data.js</code> to dynamically populate this showcase.</p>' +
        '</div>';
      if (filterContainer) filterContainer.style.display = 'none';
      return;
    }

    // Extract unique categories
    var catSet = {};
    projects.forEach(function (p) {
      if (p.category) catSet[p.category] = true;
    });
    var categories = ['all'].concat(Object.keys(catSet));

    // Filter Buttons
    if (filterContainer) {
      var categoryLabels = {
        all: 'All Projects',
        robotics: 'Robotics & Autonomy',
        'ai-vision': 'AI & Computer Vision',
        control: 'Control Systems',
        embedded: 'Embedded & Hardware'
      };

      filterContainer.innerHTML = categories
        .map(function (cat) {
          var label = categoryLabels[cat] || cat.toUpperCase();
          return '<button type="button" class="proj-filter-btn ' + (cat === activeProjectCategory ? 'active' : '') + '" data-cat="' + cat + '">' +
            label +
            '</button>';
        })
        .join('');

      filterContainer.querySelectorAll('.proj-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          activeProjectCategory = e.currentTarget.getAttribute('data-cat');
          filterContainer.querySelectorAll('.proj-filter-btn').forEach(function (b) {
            b.classList.remove('active');
          });
          e.currentTarget.classList.add('active');
          renderCards();
        });
      });
    }

    // Render Cards Helper
    function renderCards() {
      var filtered = activeProjectCategory === 'all'
        ? projects
        : projects.filter(function (p) {
            return p.category === activeProjectCategory;
          });

      projectsGrid.innerHTML = filtered
        .map(function (proj) {
          var badgeText = (proj.mediaPlaceholder && proj.mediaPlaceholder.badge) ? proj.mediaPlaceholder.badge : 'SYSTEMS ARCHITECTURE';
          var techStack = proj.techStack || [];
          var visibleTech = techStack.slice(0, 4);
          var overflowCount = techStack.length > 4 ? techStack.length - 4 : 0;

          var badgesHtml = visibleTech
            .map(function (t) {
              return '<span class="tech-badge">' + t + '</span>';
            })
            .join('');

          if (overflowCount > 0) {
            badgesHtml += '<span class="tech-badge">+' + overflowCount + '</span>';
          }

          var githubHtml = proj.githubLink
            ? '<a href="' + proj.githubLink + '" target="_blank" rel="noopener noreferrer" class="proj-link-icon" title="View Source Code" aria-label="GitHub Repository">' + getIconSvg('github') + '</a>'
            : '';

          var liveHtml = proj.liveDemo
            ? '<a href="' + proj.liveDemo + '" target="_blank" rel="noopener noreferrer" class="proj-link-icon" title="Live Video / Demo" aria-label="Live Demonstration">' + getIconSvg('external') + '</a>'
            : '';

          return '<article class="project-card" data-id="' + proj.id + '">' +
            '<div class="project-media-wrap">' +
            '<span class="project-category-tag">' + (proj.category || 'PROJECT') + '</span>' +
            '<div class="project-blueprint-badge">' + badgeText + '</div>' +
            '</div>' +
            '<div class="project-card-body">' +
            '<h3 class="project-card-title">' + proj.title + '</h3>' +
            '<p class="project-card-tagline">' + proj.tagline + '</p>' +
            '<div class="project-tech-stack">' + badgesHtml + '</div>' +
            '<div class="project-card-actions">' +
            '<button type="button" class="btn-project-detail" data-proj-id="' + proj.id + '">' +
            '<span>Inspect Specs</span>' +
            getIconSvg('arrow-right') +
            '</button>' +
            '<div class="project-links">' + githubHtml + liveHtml + '</div>' +
            '</div>' +
            '</div>' +
            '</article>';
        })
        .join('');

      // Wire detail buttons
      projectsGrid.querySelectorAll('.btn-project-detail').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          var id = e.currentTarget.getAttribute('data-proj-id');
          openProjectModal(id);
        });
      });
    }

    renderCards();
  }

  // --- Modal Logic ---
  var modalOverlay = document.getElementById('project-modal');
  var modalCloseBtn = document.getElementById('modal-close-btn');

  function openProjectModal(id) {
    var project = data.projects.find(function (p) {
      return p.id === id;
    });
    if (!project || !modalOverlay) return;

    var catEl = document.getElementById('modal-category-target');
    if (catEl) catEl.textContent = (project.category || 'PROJECT').toUpperCase();

    var titleEl = document.getElementById('modal-title-target');
    if (titleEl) titleEl.textContent = project.title;

    var descEl = document.getElementById('modal-desc-target');
    if (descEl) descEl.textContent = project.description;

    // Highlights
    var highlightsContainer = document.getElementById('modal-highlights-target');
    if (highlightsContainer && project.highlights) {
      highlightsContainer.innerHTML = project.highlights
        .map(function (h) {
          return '<li class="modal-highlight-item">' + h + '</li>';
        })
        .join('');
    }

    // Tech Stack
    var techContainer = document.getElementById('modal-tech-target');
    if (techContainer && project.techStack) {
      techContainer.innerHTML = project.techStack
        .map(function (t) {
          return '<span class="tech-badge">' + t + '</span>';
        })
        .join('');
    }

    // Links
    var linksContainer = document.getElementById('modal-links-target');
    if (linksContainer) {
      var repoBtn = project.githubLink
        ? '<a href="' + project.githubLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">' + getIconSvg('github') + ' <span>Repository</span></a>'
        : '';
      var demoBtn = project.liveDemo
        ? '<a href="' + project.liveDemo + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary">' + getIconSvg('external') + ' <span>Demo Video</span></a>'
        : '';
      linksContainer.innerHTML = repoBtn + demoBtn;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // ============================================================================
  // 6. RENDER EXPERIENCE & TIMELINE
  // ============================================================================
  function renderTimeline() {
    var experience = data.experience;
    var education = data.education;
    var expContainer = document.getElementById('experience-timeline-target');
    var eduContainer = document.getElementById('education-timeline-target');

    // Experience Items
    if (expContainer && experience) {
      expContainer.innerHTML = experience
        .map(function (item) {
          var bulletsHtml = (item.contributions || [])
            .map(function (bullet) {
              return '<li class="timeline-bullet">' + bullet + '</li>';
            })
            .join('');

          var techHtml = (item.techUsed || [])
            .map(function (t) {
              return '<span class="tech-badge">' + t + '</span>';
            })
            .join('');

          return '<div class="timeline-item">' +
            '<div class="timeline-node"></div>' +
            '<article class="timeline-card">' +
            '<div class="timeline-meta-header">' +
            '<h3 class="timeline-role">' + item.role + '</h3>' +
            '<span class="timeline-period-badge">' + item.period + '</span>' +
            '</div>' +
            '<div class="timeline-company">' +
            '<strong>' + item.organization + '</strong>' +
            '<span class="timeline-company-loc">• ' + item.location + '</span>' +
            '<span class="timeline-period-badge" style="margin-left: auto;">' + item.type + '</span>' +
            '</div>' +
            '<p class="timeline-desc">' + item.description + '</p>' +
            '<ul class="timeline-bullets">' + bulletsHtml + '</ul>' +
            '<div class="project-tech-stack">' + techHtml + '</div>' +
            '</article>' +
            '</div>';
        })
        .join('');
    }

    // Education Items
    if (eduContainer && education) {
      eduContainer.innerHTML = education
        .map(function (edu) {
          var bulletsHtml = (edu.keyHighlights || [])
            .map(function (h) {
              return '<li class="timeline-bullet">' + h + '</li>';
            })
            .join('');

          return '<div class="timeline-item">' +
            '<div class="timeline-node"></div>' +
            '<article class="timeline-card">' +
            '<div class="timeline-meta-header">' +
            '<h3 class="timeline-role">' + edu.degree + '</h3>' +
            '<span class="timeline-period-badge">' + edu.period + '</span>' +
            '</div>' +
            '<div class="timeline-company">' +
            '<strong>' + edu.institution + '</strong>' +
            '<span class="timeline-company-loc">• ' + edu.location + '</span>' +
            '</div>' +
            '<div style="margin-bottom: 0.75rem;">' +
            '<span class="skill-badge">' + edu.honors + '</span>' +
            '</div>' +
            '<p class="timeline-desc">' + edu.description + '</p>' +
            '<ul class="timeline-bullets">' + bulletsHtml + '</ul>' +
            '</article>' +
            '</div>';
        })
        .join('');
    }
  }

  // ============================================================================
  // 7. RENDER CONTACT & MESSAGE FORM
  // ============================================================================
  function renderContact() {
    var contact = data.contact;
    if (!contact) return;

    // Contact Card Info
    var headingEl = document.getElementById('contact-heading-target');
    var subheadEl = document.getElementById('contact-subheading-target');
    var emailEl = document.getElementById('contact-email-target');
    var locEl = document.getElementById('contact-location-target');
    var tzEl = document.getElementById('contact-timezone-target');

    if (headingEl) headingEl.textContent = contact.heading;
    if (subheadEl) subheadEl.textContent = contact.subheading;
    if (emailEl) emailEl.textContent = contact.email;
    if (locEl) locEl.textContent = contact.location;
    if (tzEl) tzEl.textContent = contact.timeZone;

    // Direct Socials in Contact Card
    var socialsList = document.getElementById('contact-socials-target');
    if (socialsList && contact.directSocials) {
      socialsList.innerHTML = contact.directSocials
        .map(function (s) {
          return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: flex-start;">' +
            getIconSvg('external') +
            '<span>' + s.name + ' - ' + s.label + '</span>' +
            '</a>';
        })
        .join('');
    }

    // Copy Email to Clipboard
    var copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(contact.email).then(function () {
            showToast('Email address copied to clipboard');
          }).catch(function () {
            fallbackCopy(contact.email);
          });
        } else {
          fallbackCopy(contact.email);
        }
      });
    }

    function fallbackCopy(text) {
      var temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast('Email address copied to clipboard');
    }

    // Contact Form Submission
    var contactForm = document.getElementById('contact-form');
    var feedbackEl = document.getElementById('form-feedback');

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameInput = document.getElementById('form-name');
        var emailInput = document.getElementById('form-email');
        var subjectInput = document.getElementById('form-subject');
        var messageInput = document.getElementById('form-message');

        var name = nameInput ? nameInput.value.trim() : '';
        var email = emailInput ? emailInput.value.trim() : '';
        var subject = subjectInput ? subjectInput.value.trim() : '';
        var message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback error';
            feedbackEl.textContent = 'Please fill out all required fields (Name, Email, Message).';
          }
          return;
        }

        function handleSuccess() {
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback success';
            feedbackEl.textContent = 'Transmission received. Reviewing telemetry shortly.';
          }
          contactForm.reset();
          showToast('Message transmitted successfully');
        }

        // If formEndpoint is configured, send actual POST request
        if (contact.formEndpoint && contact.formEndpoint.trim() !== '') {
          fetch(contact.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
          })
            .then(function (res) {
              if (res.ok) {
                handleSuccess();
              } else {
                throw new Error('Transmission error');
              }
            })
            .catch(function () {
              if (feedbackEl) {
                feedbackEl.className = 'form-feedback error';
                feedbackEl.textContent = 'Transmission failed. Direct email: ' + contact.email;
              }
            });
        } else {
          // Simulated telemetry transmission
          handleSuccess();
        }
      });
    }
  }

  // ============================================================================
  // 8. RENDER FOOTER & UTILITY CONTROLS
  // ============================================================================
  function renderFooter() {
    var personalInfo = data.personalInfo;
    var yearEl = document.getElementById('footer-year-target');
    var nameEl = document.getElementById('footer-name-target');

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (nameEl) nameEl.textContent = personalInfo.name;

    // Back to top
    var backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Active Section Spy
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
      var current = '';
      sections.forEach(function (section) {
        var sectionTop = section.offsetTop - 120;
        var sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  // Initialize all sections on DOM load
  document.addEventListener('DOMContentLoaded', function () {
    injectDocumentMetadata();
    renderHeader();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderTimeline();
    renderContact();
    renderFooter();
  });
})();
