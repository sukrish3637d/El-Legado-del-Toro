/**
 * ==========================================================================
 * EL LEGADO DEL TORO
 * Subtítulo: La Corrida de Toros: Arte, Cultura y Controversia
 * Archivo: js/nav.js
 * Inyecta y gestiona la barra de navegación responsiva en todas las páginas.
 * ==========================================================================
 */

(function () {
  'use strict';

  /**
   * Determina la ruta relativa a la raíz del proyecto basándose
   * en la ubicación del script o la ruta actual del documento.
   * Utiliza únicamente rutas relativas para soportar GitHub Pages bajo /El-Legado-del-Toro/.
   * @returns {string} Prefijo de ruta relativa (ej. '../../' o './')
   */
  function determineBasePath() {
    const scripts = document.querySelectorAll('script[src*="nav.js"]');
    for (let script of scripts) {
      const src = script.getAttribute('src');
      if (src && src.includes('js/nav.js')) {
        const prefix = src.substring(0, src.indexOf('js/nav.js'));
        return prefix || './';
      }
    }

    // Detección por ruta si no se encuentra el src relativo del script
    const pathname = window.location.pathname.replace(/\\/g, '/');
    if (pathname.includes('/sections/')) {
      return '../../';
    }
    return './';
  }

  const BASE_PATH = determineBasePath();

  /**
   * Estructura de enlaces del sitio:
   * Inicio y 5 secciones (historia, arte, cultura, controversia, futuro).
   */
  const NAV_ITEMS = [
    { label: 'Inicio', path: 'index.html', key: 'index' },
    { label: 'Historia', path: 'sections/historia/index.html', key: 'historia' },
    { label: 'Arte', path: 'sections/arte/index.html', key: 'arte' },
    { label: 'Cultura', path: 'sections/cultura/index.html', key: 'cultura' },
    { label: 'Controversia', path: 'sections/controversia/index.html', key: 'controversia' },
    { label: 'Futuro', path: 'sections/futuro/index.html', key: 'futuro' }
  ];

  /**
   * Determina si el enlace corresponde a la página activa actual.
   * @param {Object} item 
   * @returns {boolean}
   */
  function isLinkActive(item) {
    const currentPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();

    if (item.key === 'index') {
      return (currentPath.endsWith('/index.html') && !currentPath.includes('/sections/')) ||
             currentPath.endsWith('/el-legado-del-toro/') ||
             currentPath.endsWith('/el-legado-del-toro') ||
             currentPath.endsWith('/');
    }
    if (item.path.includes('/sections/')) {
      return currentPath.includes(`/sections/${item.key}/`);
    }
    return currentPath.endsWith(`/${item.path.toLowerCase()}`) || currentPath.endsWith(item.path.toLowerCase());
  }

  /**
   * Renderiza el componente de navegación en el DOM.
   */
  function renderNavbar() {
    let headerEl = document.getElementById('main-header');
    const containerPlaceholder = document.getElementById('site-nav-container');

    if (!headerEl) {
      headerEl = document.createElement('header');
      headerEl.id = 'main-header';
      headerEl.className = 'site-header';

      if (containerPlaceholder) {
        containerPlaceholder.appendChild(headerEl);
      } else {
        document.body.insertAdjacentElement('afterbegin', headerEl);
      }
    }

    const homeUrl = `${BASE_PATH}index.html`;

    const linksHtml = NAV_ITEMS.map((item) => {
      const activeClass = isLinkActive(item) ? ' active' : '';
      const ariaCurrent = isLinkActive(item) ? ' aria-current="page"' : '';
      const href = `${BASE_PATH}${item.path}`;
      return `
        <li class="nav-item">
          <a class="nav-link${activeClass}" href="${href}"${ariaCurrent} id="nav-link-${item.key}">
            ${item.label}
          </a>
        </li>
      `;
    }).join('');

    headerEl.innerHTML = `
      <div class="site-container">
        <nav class="site-nav" aria-label="Navegación principal">
          <a class="nav-brand" href="${homeUrl}" id="nav-brand-logo" title="Ir al inicio de El Legado del Toro">
            <span class="nav-brand-title">El Legado del Toro</span>
            <span class="nav-brand-subtitle">La Corrida de Toros: Arte, Cultura y Controversia</span>
          </a>

          <button 
            type="button" 
            class="nav-toggle" 
            id="nav-toggle-button" 
            aria-expanded="false" 
            aria-controls="nav-menu-wrapper" 
            aria-label="Abrir menú de navegación"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div class="nav-menu-wrapper" id="nav-menu-wrapper">
            <ul class="nav-menu" id="nav-menu-list">
              ${linksHtml}
            </ul>
          </div>
        </nav>
      </div>
    `;

    setupNavEvents();
  }

  /**
   * Configura eventos de apertura y cierre para el menú responsivo.
   */
  function setupNavEvents() {
    const toggleBtn = document.getElementById('nav-toggle-button');
    const menuWrapper = document.getElementById('nav-menu-wrapper');

    if (!toggleBtn || !menuWrapper) return;

    function toggleMenu() {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      toggleBtn.setAttribute('aria-label', !isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      menuWrapper.classList.toggle('is-open', !isExpanded);
    }

    function closeMenu() {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Abrir menú de navegación');
      menuWrapper.classList.remove('is-open');
    }

    toggleBtn.addEventListener('click', toggleMenu);

    // Cerrar al pulsar Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuWrapper.classList.contains('is-open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });

    // Cerrar al hacer click fuera del menú
    document.addEventListener('click', function (e) {
      if (
        menuWrapper.classList.contains('is-open') &&
        !menuWrapper.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();
