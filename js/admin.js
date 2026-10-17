/**
 * ==============================================================================
 * PORTFOLIO ADMIN CONTROL SUITE
 * Allows the administrator to add, edit, and delete projects, skills, links,
 * and personal details. Persists to localStorage with instant live updates
 * and one-click configuration export.
 * ==============================================================================
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio_custom_data_v1';
  var AUTH_KEY = 'portfolio_admin_auth_v1';
  var DEFAULT_PASSCODE = 'admin123';

  // --- State Management ---
  var currentData = null;

  function cloneObject(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      console.error('Clone error:', e);
      return obj;
    }
  }

  function initData() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        currentData = JSON.parse(saved);
      } else {
        currentData = cloneObject(window.portfolioData || {});
      }
    } catch (e) {
      console.error('Failed to parse localStorage data, falling back to default:', e);
      currentData = cloneObject(window.portfolioData || {});
    }
  }

  function getData() {
    if (!currentData) initData();
    return currentData;
  }

  function saveData(newData) {
    currentData = cloneObject(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
    if (typeof window.refreshPortfolioUI === 'function') {
      window.refreshPortfolioUI();
    }
    showAdminToast('Changes saved & UI updated live');
  }

  function resetToDefault() {
    if (confirm('Are you sure you want to reset all modifications back to default? All custom edits will be reverted.')) {
      localStorage.removeItem(STORAGE_KEY);
      currentData = cloneObject(window.portfolioData || {});
      if (typeof window.refreshPortfolioUI === 'function') {
        window.refreshPortfolioUI();
      }
      renderAdminDashboard();
      showAdminToast('Reset to default configuration complete');
    }
  }

  // --- Admin Toast Notification ---
  function showAdminToast(msg) {
    if (typeof window.showToastNotice === 'function') {
      window.showToastNotice(msg);
    } else {
      var toast = document.getElementById('toast-notice');
      if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(function () {
          toast.classList.remove('show');
        }, 3000);
      }
    }
  }

  // --- Authentication Management ---
  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function setAuthenticated(val) {
    if (val) {
      sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_KEY);
    }
  }

  // --- Modal Open/Close ---
  var adminModal = null;

  function openAdminModal() {
    adminModal = document.getElementById('admin-modal');
    if (!adminModal) return;

    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (isAuthenticated()) {
      showDashboardView();
    } else {
      showLoginView();
    }
  }

  function closeAdminModal() {
    if (!adminModal) adminModal = document.getElementById('admin-modal');
    if (adminModal) {
      adminModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- View Switcher ---
  function showLoginView() {
    var loginBox = document.getElementById('admin-login-box');
    var dashBox = document.getElementById('admin-dashboard-box');
    if (loginBox) loginBox.style.display = 'block';
    if (dashBox) dashBox.style.display = 'none';

    var passInput = document.getElementById('admin-passcode-input');
    var errorMsg = document.getElementById('admin-login-error');
    if (passInput) {
      passInput.value = '';
      passInput.focus();
    }
    if (errorMsg) errorMsg.style.display = 'none';
  }

  function showDashboardView() {
    var loginBox = document.getElementById('admin-login-box');
    var dashBox = document.getElementById('admin-dashboard-box');
    if (loginBox) loginBox.style.display = 'none';
    if (dashBox) dashBox.style.display = 'block';

    renderAdminDashboard();
  }

  // --- Render Dashboard & Active Tab ---
  var currentTab = 'projects';

  function renderAdminDashboard() {
    // Tab buttons
    var tabs = document.querySelectorAll('.admin-tab-btn');
    tabs.forEach(function (btn) {
      var tab = btn.getAttribute('data-tab');
      if (tab === currentTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Tab panels
    var panels = document.querySelectorAll('.admin-tab-panel');
    panels.forEach(function (p) {
      if (p.getAttribute('data-panel') === currentTab) {
        p.style.display = 'block';
      } else {
        p.style.display = 'none';
      }
    });

    if (currentTab === 'projects') renderProjectsManager();
    if (currentTab === 'skills') renderSkillsManager();
    if (currentTab === 'links') renderLinksManager();
    if (currentTab === 'export') renderExportManager();
  }

  // --- Project Media Helpers ---
  function getYouTubeId(url) {
    if (!url) return null;
    var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
    return match ? match[1] : null;
  }

  function getProjectMedia(proj) {
    var media = proj.media || {};
    var placeholder = proj.mediaPlaceholder || {};
    var url = media.url || proj.mediaUrl || proj.imageUrl || placeholder.url || '';
    var type = media.type || placeholder.type || (url ? 'image' : 'blueprint');
    var badge = media.badge || placeholder.badge || '';
    var accentColor = media.accentColor || placeholder.accentColor || '#00F0FF';
    return { type: type, url: url, badge: badge, accentColor: accentColor };
  }

  function compressImageFile(file, maxWidth, maxHeight, quality, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var w = img.width;
        var h = img.height;
        if (w > maxWidth || h > maxHeight) {
          if (w / h > maxWidth / maxHeight) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxHeight) / h);
            h = maxHeight;
          }
        }
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        var dataUrl = canvas.toDataURL('image/jpeg', quality || 0.82);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ============================================================================
  // TAB 1: PROJECTS CRUD
  // ============================================================================
  function renderProjectsManager() {
    var container = document.getElementById('admin-projects-list');
    if (!container) return;

    var data = getData();
    var projects = data.projects || [];

    if (projects.length === 0) {
      container.innerHTML = '<div class="admin-empty-note">No projects currently registered. Click "+ Add New Project" below to add one.</div>';
      return;
    }

    container.innerHTML = projects
      .map(function (proj, idx) {
        var tagsHtml = (proj.techStack || [])
          .map(function (t) {
            return '<span class="tech-badge">' + t + '</span>';
          })
          .join('');

        var media = getProjectMedia(proj);
        var thumbHtml = '';
        if (media.url) {
          var ytId = getYouTubeId(media.url);
          var src = ytId ? ('https://img.youtube.com/vi/' + ytId + '/hqdefault.jpg') : media.url;
          thumbHtml = '<img src="' + src + '" alt="' + proj.title + '" class="admin-proj-thumb" onerror="this.style.display=\'none\'">';
        }

        return (
          '<div class="admin-item-card" data-idx="' + idx + '">' +
          '<div class="admin-item-header">' +
          '<div style="display: flex; align-items: flex-start; gap: 0.85rem;">' +
          thumbHtml +
          '<div>' +
          '<span class="project-category-tag" style="position: static; margin-bottom: 0.35rem; display: inline-block;">' + (proj.category || 'PROJECT') + '</span>' +
          '<h4 class="admin-item-title">' + proj.title + '</h4>' +
          '</div>' +
          '</div>' +
          '<div class="admin-item-actions">' +
          '<button type="button" class="btn-admin-action edit-proj-btn" data-idx="' + idx + '" title="Edit project">✏️ Edit</button>' +
          '<button type="button" class="btn-admin-action delete-proj-btn" data-idx="' + idx + '" title="Delete project">🗑️ Delete</button>' +
          '</div>' +
          '</div>' +
          '<p class="admin-item-sub">' + proj.tagline + '</p>' +
          '<div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.5rem;">' + tagsHtml + '</div>' +
          '</div>'
        );
      })
      .join('');

    // Attach Edit Handlers
    container.querySelectorAll('.edit-proj-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        openProjectFormModal(idx);
      });
    });

    // Attach Delete Handlers
    container.querySelectorAll('.delete-proj-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        var data = getData();
        var p = data.projects[idx];
        if (confirm('Delete project "' + (p ? p.title : 'this project') + '"?')) {
          data.projects.splice(idx, 1);
          saveData(data);
          renderProjectsManager();
        }
      });
    });
  }

  // Project Add / Edit Form Modal
  function openProjectFormModal(editIndex) {
    var isEdit = typeof editIndex === 'number' && editIndex >= 0;
    var data = getData();
    var proj = isEdit ? data.projects[editIndex] : null;

    var titleField = document.getElementById('proj-form-title');
    var taglineField = document.getElementById('proj-form-tagline');
    var catField = document.getElementById('proj-form-category');
    var descField = document.getElementById('proj-form-desc');
    var techField = document.getElementById('proj-form-tech');
    var ghField = document.getElementById('proj-form-github');
    var demoField = document.getElementById('proj-form-demo');
    var badgeField = document.getElementById('proj-form-badge');
    var mediaTypeField = document.getElementById('proj-form-media-type');
    var mediaUrlField = document.getElementById('proj-form-media-url');
    var mediaFileField = document.getElementById('proj-form-media-file');
    var previewBox = document.getElementById('proj-form-media-preview');
    var previewThumb = document.getElementById('proj-form-preview-thumb');
    var previewStatus = document.getElementById('proj-form-preview-status');
    var editIndexField = document.getElementById('proj-form-edit-index');
    var modalHeading = document.getElementById('proj-form-heading');

    if (modalHeading) {
      modalHeading.textContent = isEdit ? 'Edit Engineering Project' : 'Add New Engineering Project';
    }

    var media = proj ? getProjectMedia(proj) : { type: 'image', url: '', badge: '' };

    if (editIndexField) editIndexField.value = isEdit ? editIndex : '-1';
    if (titleField) titleField.value = proj ? proj.title : '';
    if (taglineField) taglineField.value = proj ? proj.tagline : '';
    if (catField) catField.value = proj ? (proj.category || 'robotics') : 'robotics';
    if (descField) descField.value = proj ? proj.description : '';
    if (techField) techField.value = proj && proj.techStack ? proj.techStack.join(', ') : '';
    if (ghField) ghField.value = proj ? (proj.githubLink || '') : '';
    if (demoField) demoField.value = proj ? (proj.liveDemo || '') : '';
    if (badgeField) badgeField.value = media.badge || '';
    if (mediaTypeField) mediaTypeField.value = media.type || 'image';
    if (mediaUrlField) mediaUrlField.value = media.url || '';
    if (mediaFileField) mediaFileField.value = '';

    // Update media preview box
    if (media.url && previewBox && previewThumb) {
      var ytId = getYouTubeId(media.url);
      var src = ytId ? ('https://img.youtube.com/vi/' + ytId + '/hqdefault.jpg') : media.url;
      previewThumb.src = src;
      previewBox.style.display = 'flex';
      if (previewStatus) previewStatus.textContent = ytId ? 'YouTube Video Attached' : 'Visual Media Loaded';
    } else if (previewBox) {
      previewBox.style.display = 'none';
      if (previewThumb) previewThumb.src = '';
    }

    var formModal = document.getElementById('admin-project-form-modal');
    if (formModal) {
      formModal.classList.add('active');
      formModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeProjectFormModal() {
    var formModal = document.getElementById('admin-project-form-modal');
    if (formModal) {
      formModal.classList.remove('active');
      formModal.setAttribute('aria-hidden', 'true');
    }
  }

  // ============================================================================
  // TAB 2: SKILLS & CATEGORY CRUD
  // ============================================================================
  function renderSkillsManager() {
    var container = document.getElementById('admin-skills-list');
    if (!container) return;

    var data = getData();
    var categories = (data.skills && data.skills.categories) || [];

    if (categories.length === 0) {
      container.innerHTML = '<div class="admin-empty-note">No skill matrices found. Click "+ Add Skill Matrix" above to create one.</div>';
      return;
    }

    container.innerHTML = categories
      .map(function (cat, catIdx) {
        var items = cat.items || [];
        var itemsHtml = items.length === 0
          ? '<div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic; padding: 0.75rem 0;">No skills in this category yet. Click "+ Add Skill" to add one.</div>'
          : items
            .map(function (item, itemIdx) {
              return (
                '<div class="admin-skill-row">' +
                '<div class="admin-skill-info">' +
                '<strong>' + item.name + '</strong>' +
                '<span class="skill-badge" style="margin-left: 0.5rem;">' + item.level + '</span>' +
                '<span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-left: 0.5rem;">' + item.proficiency + '%</span>' +
                '</div>' +
                '<div class="admin-skill-row-actions">' +
                '<button type="button" class="btn-admin-action edit-skill-btn" data-cat="' + catIdx + '" data-item="' + itemIdx + '" title="Edit skill">✏️ Edit</button>' +
                '<button type="button" class="btn-admin-action delete-skill-btn" data-cat="' + catIdx + '" data-item="' + itemIdx + '" title="Delete skill">🗑️ Delete</button>' +
                '</div>' +
                '</div>'
              );
            })
            .join('');

        return (
          '<div class="admin-category-box">' +
          '<div class="admin-category-header">' +
          '<div>' +
          '<h4 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">' +
          cat.name +
          ' <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500; font-family: var(--font-mono);">(' + items.length + ' skills)</span>' +
          '</h4>' +
          (cat.description ? '<p style="font-size: 0.825rem; color: var(--text-muted); margin: 0;">' + cat.description + '</p>' : '') +
          '</div>' +
          '<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">' +
          '<button type="button" class="btn btn-secondary btn-sm add-skill-btn" data-cat="' + catIdx + '">+ Add Skill</button>' +
          '<button type="button" class="btn-admin-action edit-cat-btn" data-cat="' + catIdx + '" title="Edit category name and description">✏️ Edit Matrix</button>' +
          '<button type="button" class="btn-admin-action delete-cat-btn" data-cat="' + catIdx + '" title="Delete entire category and all skills">🗑️ Delete Matrix</button>' +
          '</div>' +
          '</div>' +
          '<div class="admin-skills-sublist">' + itemsHtml + '</div>' +
          '</div>'
        );
      })
      .join('');

    // Wire Category Edit Buttons
    container.querySelectorAll('.edit-cat-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var catIdx = parseInt(btn.getAttribute('data-cat'), 10);
        openCategoryFormModal(catIdx);
      });
    });

    // Wire Category Delete Buttons
    container.querySelectorAll('.delete-cat-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var catIdx = parseInt(btn.getAttribute('data-cat'), 10);
        var data = getData();
        var cat = data.skills.categories[catIdx];
        if (!cat) return;
        var itemCount = cat.items ? cat.items.length : 0;
        if (confirm('Delete the entire "' + cat.name + '" skill matrix' + (itemCount > 0 ? ' and its ' + itemCount + ' skills?' : '?'))) {
          data.skills.categories.splice(catIdx, 1);
          saveData(data);
          renderSkillsManager();
        }
      });
    });

    // Wire Add Skill Buttons
    container.querySelectorAll('.add-skill-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var catIdx = parseInt(btn.getAttribute('data-cat'), 10);
        openSkillFormModal(catIdx, -1);
      });
    });

    // Wire Edit Skill Buttons
    container.querySelectorAll('.edit-skill-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var catIdx = parseInt(btn.getAttribute('data-cat'), 10);
        var itemIdx = parseInt(btn.getAttribute('data-item'), 10);
        openSkillFormModal(catIdx, itemIdx);
      });
    });

    // Wire Delete Skill Buttons
    container.querySelectorAll('.delete-skill-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var catIdx = parseInt(btn.getAttribute('data-cat'), 10);
        var itemIdx = parseInt(btn.getAttribute('data-item'), 10);
        var data = getData();
        var cat = data.skills.categories[catIdx];
        var item = cat && cat.items ? cat.items[itemIdx] : null;
        if (confirm('Delete skill "' + (item ? item.name : 'this skill') + '"?')) {
          cat.items.splice(itemIdx, 1);
          saveData(data);
          renderSkillsManager();
        }
      });
    });
  }

  function openSkillFormModal(catIdx, itemIdx) {
    var isEdit = itemIdx >= 0;
    var data = getData();
    var cat = data.skills.categories[catIdx];
    var item = isEdit && cat && cat.items ? cat.items[itemIdx] : null;

    var nameField = document.getElementById('skill-form-name');
    var levelField = document.getElementById('skill-form-level');
    var profField = document.getElementById('skill-form-proficiency');
    var profValEl = document.getElementById('skill-form-prof-val');
    var catIdxField = document.getElementById('skill-form-cat-idx');
    var itemIdxField = document.getElementById('skill-form-item-idx');
    var headingEl = document.getElementById('skill-form-heading');

    if (headingEl) {
      headingEl.textContent = isEdit ? 'Edit Skill in ' + (cat ? cat.name : 'Matrix') : 'Add New Skill to ' + (cat ? cat.name : 'Matrix');
    }

    if (catIdxField) catIdxField.value = catIdx;
    if (itemIdxField) itemIdxField.value = isEdit ? itemIdx : -1;
    if (nameField) nameField.value = item ? item.name : '';
    if (levelField) levelField.value = item ? item.level : 'Advanced';
    if (profField) {
      profField.value = item ? item.proficiency : 85;
      if (profValEl) profValEl.textContent = profField.value + '%';
    }

    var modal = document.getElementById('admin-skill-form-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeSkillFormModal() {
    var modal = document.getElementById('admin-skill-form-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function openCategoryFormModal(catIdx) {
    var isEdit = typeof catIdx === 'number' && catIdx >= 0;
    var data = getData();
    var cat = isEdit && data.skills && data.skills.categories ? data.skills.categories[catIdx] : null;

    var nameField = document.getElementById('cat-form-name');
    var idField = document.getElementById('cat-form-id');
    var descField = document.getElementById('cat-form-desc');
    var editIdxField = document.getElementById('cat-form-edit-index');
    var headingEl = document.getElementById('cat-form-heading');

    if (headingEl) {
      headingEl.textContent = isEdit ? 'Edit Skill Matrix: ' + cat.name : 'Add New Skill Matrix Category';
    }

    if (editIdxField) editIdxField.value = isEdit ? catIdx : -1;
    if (nameField) nameField.value = cat ? cat.name : '';
    if (idField) idField.value = cat ? cat.id : '';
    if (descField) descField.value = cat ? (cat.description || '') : '';

    var modal = document.getElementById('admin-category-form-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCategoryFormModal() {
    var modal = document.getElementById('admin-category-form-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // ============================================================================
  // TAB 3: LINKS & PERSONAL INFO CRUD
  // ============================================================================
  function renderLinksManager() {
    var data = getData();
    var p = data.personalInfo || {};
    var c = data.contact || {};

    var nameField = document.getElementById('admin-edit-name');
    var titleField = document.getElementById('admin-edit-title');
    var taglineField = document.getElementById('admin-edit-tagline');
    var bioField = document.getElementById('admin-edit-bio');
    var locField = document.getElementById('admin-edit-location');
    var ghField = document.getElementById('admin-edit-github');
    var liField = document.getElementById('admin-edit-linkedin');
    var emailField = document.getElementById('admin-edit-email');

    if (nameField) nameField.value = p.name || '';
    if (titleField) titleField.value = p.title || '';
    if (taglineField) taglineField.value = p.tagline || '';
    if (bioField) bioField.value = p.shortBio || '';
    if (locField) locField.value = p.location || '';

    // Find links
    var ghLink = (p.socialLinks || []).find(function (s) {
      return s.platform === 'GitHub';
    });
    var liLink = (p.socialLinks || []).find(function (s) {
      return s.platform === 'LinkedIn';
    });
    var emLink = (p.socialLinks || []).find(function (s) {
      return s.platform === 'Email';
    });

    if (ghField) ghField.value = ghLink ? ghLink.url : 'https://github.com';
    if (liField) liField.value = liLink ? liLink.url : 'https://linkedin.com';
    if (emailField) emailField.value = emLink ? emLink.url.replace('mailto:', '') : (c.email || '');
  }

  function saveLinksManager() {
    var data = getData();
    var p = data.personalInfo;
    var c = data.contact;

    var nameVal = document.getElementById('admin-edit-name').value.trim();
    var titleVal = document.getElementById('admin-edit-title').value.trim();
    var taglineVal = document.getElementById('admin-edit-tagline').value.trim();
    var bioVal = document.getElementById('admin-edit-bio').value.trim();
    var locVal = document.getElementById('admin-edit-location').value.trim();
    var ghVal = document.getElementById('admin-edit-github').value.trim();
    var liVal = document.getElementById('admin-edit-linkedin').value.trim();
    var emailVal = document.getElementById('admin-edit-email').value.trim();

    if (nameVal) p.name = nameVal;
    if (titleVal) p.title = titleVal;
    if (taglineVal) p.tagline = taglineVal;
    if (bioVal) p.shortBio = bioVal;
    if (locVal) {
      p.location = locVal;
      c.location = locVal;
    }
    if (emailVal) {
      c.email = emailVal;
    }

    // Update socialLinks
    p.socialLinks = [
      { platform: 'GitHub', url: ghVal || 'https://github.com', icon: 'github', handle: ghVal },
      { platform: 'LinkedIn', url: liVal || 'https://linkedin.com', icon: 'linkedin', handle: liVal },
      { platform: 'Email', url: 'mailto:' + (emailVal || 'contact@example.com'), icon: 'email', handle: emailVal }
    ];

    // Update contact.directSocials
    c.directSocials = [
      { name: 'LinkedIn', url: liVal || 'https://linkedin.com', label: 'Connect professionally' },
      { name: 'GitHub', url: ghVal || 'https://github.com', label: 'Review source code & repositories' }
    ];

    saveData(data);
  }

  // ============================================================================
  // TAB 4: EXPORT & SYNC CONFIGURATION
  // ============================================================================
  function renderExportManager() {
    var previewEl = document.getElementById('admin-export-preview');
    if (!previewEl) return;

    var data = getData();
    var jsCode = generateExportCode(data);
    previewEl.textContent = jsCode.substring(0, 450) + '\n\n// ... [Full configuration ready for download]';
  }

  function generateExportCode(data) {
    return (
      '/**\n' +
      ' * ==============================================================================\n' +
      ' * PORTFOLIO CONFIGURATION OBJECT - ' + (data.personalInfo.name || 'HARSHAL SONSARE').toUpperCase() + '\n' +
      ' * Exported from Admin Control Suite: ' + new Date().toISOString() + '\n' +
      ' * ==============================================================================\n' +
      ' */\n\n' +
      'const portfolioData = ' + JSON.stringify(data, null, 2) + ';\n\n' +
      'if (typeof window !== "undefined") {\n' +
      '  window.portfolioData = portfolioData;\n' +
      '}\n\n' +
      'if (typeof module !== "undefined" && module.exports) {\n' +
      '  module.exports = portfolioData;\n' +
      '}\n'
    );
  }

  function downloadConfigFile() {
    var data = getData();
    var jsContent = generateExportCode(data);
    var blob = new Blob([jsContent], { type: 'application/javascript;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showAdminToast('Downloaded updated portfolio-data.js');
  }

  function copyConfigToClipboard() {
    var data = getData();
    var jsContent = generateExportCode(data);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(jsContent).then(function () {
        showAdminToast('Full configuration copied to clipboard');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = jsContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showAdminToast('Full configuration copied to clipboard');
    }
  }

  // ============================================================================
  // EVENT LISTENERS INITIALIZATION
  // ============================================================================
  function initAdminEvents() {
    // 1. Hero Admin Trigger
    var heroTrigger = document.getElementById('admin-trigger-btn');
    if (heroTrigger) {
      heroTrigger.addEventListener('click', openAdminModal);
    }

    // 2. Close Admin Modal
    var closeBtn = document.getElementById('admin-modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeAdminModal);

    var modalOverlay = document.getElementById('admin-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeAdminModal();
      });
    }

    // Sub-modal overlay backdrop dismissers
    var projFormModal = document.getElementById('admin-project-form-modal');
    if (projFormModal) {
      projFormModal.addEventListener('click', function (e) {
        if (e.target === projFormModal) closeProjectFormModal();
      });
    }

    var skillFormModal = document.getElementById('admin-skill-form-modal');
    if (skillFormModal) {
      skillFormModal.addEventListener('click', function (e) {
        if (e.target === skillFormModal) closeSkillFormModal();
      });
    }

    var catFormModal = document.getElementById('admin-category-form-modal');
    if (catFormModal) {
      catFormModal.addEventListener('click', function (e) {
        if (e.target === catFormModal) closeCategoryFormModal();
      });
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var catModal = document.getElementById('admin-category-form-modal');
        if (catModal && catModal.classList.contains('active')) {
          closeCategoryFormModal();
          return;
        }
        var skillModal = document.getElementById('admin-skill-form-modal');
        if (skillModal && skillModal.classList.contains('active')) {
          closeSkillFormModal();
          return;
        }
        var formModal = document.getElementById('admin-project-form-modal');
        if (formModal && formModal.classList.contains('active')) {
          closeProjectFormModal();
          return;
        }
        if (modalOverlay && modalOverlay.classList.contains('active')) {
          closeAdminModal();
        }
      }
    });

    // 3. Login form
    var loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var passInput = document.getElementById('admin-passcode-input');
        var errorMsg = document.getElementById('admin-login-error');
        var entered = passInput ? passInput.value.trim() : '';

        if (entered === DEFAULT_PASSCODE || entered === 'admin') {
          setAuthenticated(true);
          showDashboardView();
        } else {
          if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Invalid authentication passcode. Default is "admin123".';
          }
        }
      });
    }

    // 4. Logout button
    var logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        setAuthenticated(false);
        showLoginView();
      });
    }

    // 5. Tab Buttons
    var tabBtns = document.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        currentTab = e.currentTarget.getAttribute('data-tab');
        renderAdminDashboard();
      });
    });

    // 6. Project Form Submit
    var addProjBtn = document.getElementById('admin-add-project-btn');
    if (addProjBtn) {
      addProjBtn.addEventListener('click', function () {
        openProjectFormModal(-1);
      });
    }

    var projFormClose = document.getElementById('proj-form-close-btn');
    var projFormCancel = document.getElementById('proj-form-cancel-btn');
    if (projFormClose) projFormClose.addEventListener('click', closeProjectFormModal);
    if (projFormCancel) projFormCancel.addEventListener('click', closeProjectFormModal);

    var projForm = document.getElementById('admin-project-form');
    if (projForm) {
      projForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var editIdx = parseInt(document.getElementById('proj-form-edit-index').value, 10);
        var title = document.getElementById('proj-form-title').value.trim();
        var tagline = document.getElementById('proj-form-tagline').value.trim();
        var category = document.getElementById('proj-form-category').value;
        var desc = document.getElementById('proj-form-desc').value.trim();
        var techStr = document.getElementById('proj-form-tech').value.trim();
        var gh = document.getElementById('proj-form-github').value.trim();
        var demo = document.getElementById('proj-form-demo').value.trim();
        var badge = document.getElementById('proj-form-badge').value.trim();
        var mediaType = document.getElementById('proj-form-media-type').value;
        var mediaUrl = document.getElementById('proj-form-media-url').value.trim();

        if (!title || !tagline) {
          alert('Project Title and Tagline are required.');
          return;
        }

        var techArray = techStr
          ? techStr.split(',').map(function (s) {
              return s.trim();
            }).filter(Boolean)
          : [];

        var data = getData();
        var newProj = {
          id: (editIdx >= 0 && data.projects[editIdx] ? data.projects[editIdx].id : 'proj-' + Date.now()),
          title: title,
          tagline: tagline,
          category: category,
          featured: true,
          description: desc,
          highlights: (editIdx >= 0 && data.projects[editIdx] && data.projects[editIdx].highlights) ? data.projects[editIdx].highlights : ['Production deployed robotics pipeline.'],
          techStack: techArray,
          githubLink: gh,
          liveDemo: demo,
          mediaUrl: mediaUrl,
          media: {
            type: mediaType,
            url: mediaUrl,
            badge: badge || (category.toUpperCase() + ' // SYSTEM'),
            accentColor: '#00F0FF'
          },
          mediaPlaceholder: {
            type: mediaType,
            url: mediaUrl,
            badge: badge || (category.toUpperCase() + ' // SYSTEM'),
            accentColor: '#00F0FF'
          }
        };

        if (editIdx >= 0 && editIdx < data.projects.length) {
          data.projects[editIdx] = newProj;
        } else {
          data.projects.unshift(newProj);
        }

        saveData(data);
        closeProjectFormModal();
        renderProjectsManager();
      });
    }

    // Media Controls in Project Form Modal
    var mediaUrlInput = document.getElementById('proj-form-media-url');
    var mediaFileInput = document.getElementById('proj-form-media-file');
    var clearMediaBtn = document.getElementById('proj-form-clear-media');
    var previewBox = document.getElementById('proj-form-media-preview');
    var previewThumb = document.getElementById('proj-form-preview-thumb');
    var previewStatus = document.getElementById('proj-form-preview-status');

    function updateFormMediaPreview(url) {
      if (!previewBox || !previewThumb) return;
      if (url) {
        var ytId = getYouTubeId(url);
        var src = ytId ? ('https://img.youtube.com/vi/' + ytId + '/hqdefault.jpg') : url;
        previewThumb.src = src;
        previewBox.style.display = 'flex';
        if (previewStatus) previewStatus.textContent = ytId ? 'YouTube Video Attached' : 'Visual Media Loaded';
      } else {
        previewBox.style.display = 'none';
        previewThumb.src = '';
      }
    }

    if (mediaUrlInput) {
      mediaUrlInput.addEventListener('input', function (e) {
        updateFormMediaPreview(e.target.value.trim());
      });
    }

    if (mediaFileInput) {
      mediaFileInput.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        compressImageFile(file, 1200, 800, 0.82, function (dataUrl) {
          if (mediaUrlInput) mediaUrlInput.value = dataUrl;
          updateFormMediaPreview(dataUrl);
        });
      });
    }

    if (clearMediaBtn) {
      clearMediaBtn.addEventListener('click', function () {
        if (mediaUrlInput) mediaUrlInput.value = '';
        if (mediaFileInput) mediaFileInput.value = '';
        updateFormMediaPreview('');
      });
    }

    // 7. Skill Form Submit
    var skillFormClose = document.getElementById('skill-form-close-btn');
    var skillFormCancel = document.getElementById('skill-form-cancel-btn');
    if (skillFormClose) skillFormClose.addEventListener('click', closeSkillFormModal);
    if (skillFormCancel) skillFormCancel.addEventListener('click', closeSkillFormModal);

    var profRange = document.getElementById('skill-form-proficiency');
    var profValEl = document.getElementById('skill-form-prof-val');
    if (profRange && profValEl) {
      profRange.addEventListener('input', function (e) {
        profValEl.textContent = e.target.value + '%';
      });
    }

    var skillForm = document.getElementById('admin-skill-form');
    if (skillForm) {
      skillForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var catIdx = parseInt(document.getElementById('skill-form-cat-idx').value, 10);
        var itemIdx = parseInt(document.getElementById('skill-form-item-idx').value, 10);
        var name = document.getElementById('skill-form-name').value.trim();
        var level = document.getElementById('skill-form-level').value;
        var prof = parseInt(document.getElementById('skill-form-proficiency').value, 10) || 85;

        if (!name) {
          alert('Skill Name is required.');
          return;
        }

        var data = getData();
        var cat = data.skills.categories[catIdx];
        if (!cat) return;

        var newSkill = { name: name, level: level, proficiency: prof };
        if (itemIdx >= 0 && itemIdx < cat.items.length) {
          cat.items[itemIdx] = newSkill;
        } else {
          cat.items.push(newSkill);
        }

        saveData(data);
        closeSkillFormModal();
        renderSkillsManager();
      });
    }

    // 8. Skill Matrix Category Form Listeners
    var addCatBtn = document.getElementById('admin-add-category-btn');
    if (addCatBtn) {
      addCatBtn.addEventListener('click', function () {
        openCategoryFormModal(-1);
      });
    }

    var catFormClose = document.getElementById('cat-form-close-btn');
    var catFormCancel = document.getElementById('cat-form-cancel-btn');
    if (catFormClose) catFormClose.addEventListener('click', closeCategoryFormModal);
    if (catFormCancel) catFormCancel.addEventListener('click', closeCategoryFormModal);

    var catForm = document.getElementById('admin-category-form');
    if (catForm) {
      catForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var editIdx = parseInt(document.getElementById('cat-form-edit-index').value, 10);
        var name = document.getElementById('cat-form-name').value.trim();
        var slug = document.getElementById('cat-form-id').value.trim();
        var desc = document.getElementById('cat-form-desc').value.trim();

        if (!name) {
          alert('Matrix Category Name is required.');
          return;
        }

        var genSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!genSlug) genSlug = 'matrix-' + Date.now();

        var data = getData();
        if (!data.skills) data.skills = { categories: [] };
        if (!data.skills.categories) data.skills.categories = [];

        if (editIdx >= 0 && editIdx < data.skills.categories.length) {
          data.skills.categories[editIdx].name = name;
          data.skills.categories[editIdx].id = genSlug;
          data.skills.categories[editIdx].description = desc;
        } else {
          data.skills.categories.push({
            id: genSlug,
            name: name,
            icon: 'cpu-chip',
            description: desc,
            items: []
          });
        }

        saveData(data);
        closeCategoryFormModal();
        renderSkillsManager();
      });
    }

    // 9. Save Links Form
    var saveLinksBtn = document.getElementById('admin-save-links-btn');
    if (saveLinksBtn) {
      saveLinksBtn.addEventListener('click', function () {
        saveLinksManager();
      });
    }

    // 9. Export Buttons
    var downloadBtn = document.getElementById('admin-download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadConfigFile);

    var copyBtn = document.getElementById('admin-copy-config-btn');
    if (copyBtn) copyBtn.addEventListener('click', copyConfigToClipboard);

    var resetBtn = document.getElementById('admin-reset-default-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetToDefault);
  }

  // --- Initialize on DOM Content Loaded ---
  document.addEventListener('DOMContentLoaded', function () {
    initData();
    initAdminEvents();
  });

  // Expose global interface for app.js
  window.AdminManager = {
    getData: getData,
    saveData: saveData,
    open: openAdminModal,
    close: closeAdminModal
  };
})();
