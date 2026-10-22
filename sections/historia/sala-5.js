/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/sala-5.js
 * 
 * Controlador dedicado para la Sala V: Reflexión Crítica y Legado Histórico (Página Standalone).
 * Milestone 2E:
 * 1. Inicialización y preservación de idioma bilingüe (ES / EN) vía URL query string (?lang=es / ?lang=en).
 * 2. Prohibición estricta de localStorage, sessionStorage y cookies según directrices del repositorio.
 * 3. Preservación íntegra del tríptico interpretativo de 3 pilares y la caja editorial verbatim.
 * 4. Navegación cross-room a Sala I (sala-1-cronologia.html?lang=...).
 * 5. Navegación cross-room a Sala II (sala-2-cartografia.html?lang=...).
 * 6. Navegación cross-room a Sala III (sala-3-archivo.html?lang=...).
 * 7. Navegación cross-room a Sala IV (sala-4-cuestionario.html?lang=...).
 * 8. Actualización y control accesible de enlaces de retorno al Gran Vestíbulo (index.html?lang=...#hall).
 * ==========================================================================
 */

(function () {
  'use strict';

  // Señalizar modo standalone para scripts auxiliares y pruebas automatizadas
  window.isSala5Standalone = true;

  /**
   * Obtiene y valida el parámetro de idioma desde la URL actual.
   * Regla de negocio: sólo se aceptan 'es' y 'en'. Si está ausente o no es válido,
   * se utiliza 'es' de manera predeterminada.
   * @returns {'es' | 'en'}
   */
  function getLangFromUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      var lang = params.get('lang');
      if (lang === 'en') return 'en';
      return 'es';
    } catch (e) {
      return 'es';
    }
  }

  var currentLang = getLangFromUrl();

  // API pública de Sala V disponible de inmediato
  window.historiaSala5 = {
    getLanguage: function () { return currentLang; },
    setLanguage: function (lang) {
      applyLanguage(lang);
      syncUrlParam(lang);
    },
    toggleLanguage: function () { toggleGlobalLanguage(); }
  };

  /**
   * Actualiza el parámetro ?lang en la barra de direcciones del navegador sin recargar la página.
   * Preserva cualquier otro parámetro presente.
   * @param {'es' | 'en'} lang
   */
  function syncUrlParam(lang) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  /**
   * Actualiza todos los enlaces de retorno al Gran Vestíbulo Central para preservar el idioma.
   * Formato exigido: index.html?lang=es#hall o index.html?lang=en#hall
   * @param {'es' | 'en'} lang
   */
  function updateReturnLinks(lang) {
    var returnLinks = document.querySelectorAll('.hist-btn-room-return-hall');
    returnLinks.forEach(function (link) {
      link.setAttribute('href', 'index.html?lang=' + encodeURIComponent(lang) + '#hall');
    });
  }

  /**
   * Actualiza todos los enlaces de "Finalizar el Viaje" para preservar el idioma hacia la portada principal.
   * Formato: ../../index.html?lang=es o ../../index.html?lang=en
   * @param {'es' | 'en'} lang
   */
  function updateEndJourneyLinks(lang) {
    var endJourneyLinks = document.querySelectorAll('.hist-btn-end-journey');
    endJourneyLinks.forEach(function (link) {
      link.setAttribute('href', '../../index.html?lang=' + encodeURIComponent(lang));
    });
  }

  /**
   * Actualiza todos los enlaces cross-room a las Salas I, II, III y IV preservando el idioma activo.
   * @param {'es' | 'en'} lang
   */
  function updateCrossRoomLinks(lang) {
    // 1. Enlaces dentro de los 3 pilares historiográficos
    var pillarArchive = document.getElementById('hist-pillar-link-archive');
    if (pillarArchive) {
      pillarArchive.setAttribute('href', 'sala-3-archivo.html?lang=' + encodeURIComponent(lang));
    }

    var pillarMap = document.getElementById('hist-pillar-link-map');
    if (pillarMap) {
      pillarMap.setAttribute('href', 'sala-2-cartografia.html?lang=' + encodeURIComponent(lang));
    }

    var pillarQuiz = document.getElementById('hist-pillar-link-quiz');
    if (pillarQuiz) {
      pillarQuiz.setAttribute('href', 'sala-4-cuestionario.html?lang=' + encodeURIComponent(lang));
    }

    // 2. Accesos de reexploración en el pie curatorial
    var reexploreSala1 = document.getElementById('reexplore-sala-1');
    if (reexploreSala1) {
      reexploreSala1.setAttribute('href', 'sala-1-cronologia.html?lang=' + encodeURIComponent(lang));
    }

    var reexploreSala2 = document.getElementById('reexplore-sala-2');
    if (reexploreSala2) {
      reexploreSala2.setAttribute('href', 'sala-2-cartografia.html?lang=' + encodeURIComponent(lang));
    }

    var reexploreSala3 = document.getElementById('reexplore-sala-3');
    if (reexploreSala3) {
      reexploreSala3.setAttribute('href', 'sala-3-archivo.html?lang=' + encodeURIComponent(lang));
    }

    var reexploreSala4 = document.getElementById('reexplore-sala-4');
    if (reexploreSala4) {
      reexploreSala4.setAttribute('href', 'sala-4-cuestionario.html?lang=' + encodeURIComponent(lang));
    }
  }

  /**
   * Propaga el parámetro de idioma a los enlaces de la barra de navegación compartida (nav.js).
   * Mantiene rutas 100% relativas según directriz técnica.
   * @param {'es' | 'en'} lang
   */
  function updateNavLinks(lang) {
    var navLinks = document.querySelectorAll('#main-header a, #site-nav-container a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
      try {
        var hashIndex = href.indexOf('#');
        var hashPart = hashIndex !== -1 ? href.substring(hashIndex) : '';
        var withoutHash = hashIndex !== -1 ? href.substring(0, hashIndex) : href;
        var qIndex = withoutHash.indexOf('?');
        var pathPart = qIndex !== -1 ? withoutHash.substring(0, qIndex) : withoutHash;
        var queryPart = qIndex !== -1 ? withoutHash.substring(qIndex + 1) : '';
        var params = new URLSearchParams(queryPart);
        params.set('lang', lang);
        link.setAttribute('href', pathPart + '?' + params.toString() + hashPart);
      } catch (err) {}
    });
  }

  /**
   * Aplica la visibilidad de elementos bilingües estáticos y sincroniza el atributo lang en <html>.
   * @param {'es' | 'en'} lang
   */
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'es';
    if (document.documentElement) {
      document.documentElement.lang = currentLang;
    }

    // Spans en línea (badges, kickers, enlaces breves)
    var esSpans = document.querySelectorAll('.hist-lang-es');
    var enSpans = document.querySelectorAll('.hist-lang-en');

    esSpans.forEach(function (el) {
      el.style.display = currentLang === 'es' ? '' : 'none';
      if (currentLang === 'es') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    enSpans.forEach(function (el) {
      el.style.display = currentLang === 'en' ? '' : 'none';
      if (currentLang === 'en') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    // Párrafos completos (reflexión editorial, descripciones)
    var esParagraphs = document.querySelectorAll('.hist-lang-p-es');
    var enParagraphs = document.querySelectorAll('.hist-lang-p-en');

    esParagraphs.forEach(function (el) {
      el.style.display = currentLang === 'es' ? 'block' : 'none';
      if (currentLang === 'es') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    enParagraphs.forEach(function (el) {
      el.style.display = currentLang === 'en' ? 'block' : 'none';
      if (currentLang === 'en') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    updateReturnLinks(currentLang);
    updateEndJourneyLinks(currentLang);
    updateCrossRoomLinks(currentLang);
    updateNavLinks(currentLang);
  }

  /**
   * Alterna entre español e inglés de forma global en la sala.
   */
  function toggleGlobalLanguage() {
    var targetLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(targetLang);
    syncUrlParam(targetLang);
    try {
      window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: targetLang } }));
    } catch (e) {}
  }

  /**
   * Inicialización al cargar el DOM.
   */
  function init() {
    currentLang = getLangFromUrl();
    applyLanguage(currentLang);

    // Escuchar el evento de cambio de idioma propagado por otros componentes
    window.addEventListener('historiaLanguageChange', function (e) {
      if (e.detail && e.detail.lang) {
        currentLang = e.detail.lang;
        applyLanguage(currentLang);
        syncUrlParam(currentLang);
      }
    });

    // Botón de alternancia de idioma en la cabecera de la sala
    var headerLangBtn = document.getElementById('btn-toggle-language');
    if (headerLangBtn) {
      headerLangBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleGlobalLanguage();
      });
    }

    // Delegación accesible para botones y enlaces de retorno y navegación cross-room
    document.addEventListener('click', function (e) {
      // 0. Botón de Finalizar el Viaje -> Aterrizar directamente en la portada principal
      var endJourneyBtn = e.target.closest('.hist-btn-end-journey');
      if (endJourneyBtn) {
        e.preventDefault();
        window.location.href = '../../index.html?lang=' + encodeURIComponent(currentLang);
        return;
      }

      // 1. Botones de retorno al Gran Vestíbulo Central
      var returnBtn = e.target.closest('.hist-btn-room-return-hall');
      if (returnBtn) {
        e.preventDefault();
        window.location.href = 'index.html?lang=' + encodeURIComponent(currentLang) + '#hall';
        return;
      }

      // 2. Enlaces de pilares historiográficos
      var pillarLink = e.target.closest('.hist-pillar-link');
      if (pillarLink) {
        var href = pillarLink.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
          e.preventDefault();
          var targetUrl = href.replace(/\?lang=[^#&]+/, '');
          targetUrl += (targetUrl.indexOf('?') === -1 ? '?' : '&') + 'lang=' + encodeURIComponent(currentLang);
          window.location.href = targetUrl;
          return;
        }
      }

      // 3. Píldoras de reexploración de salas
      var reexplorePill = e.target.closest('.hist-reexplore-pill');
      if (reexplorePill) {
        var pillHref = reexplorePill.getAttribute('href');
        if (pillHref && !pillHref.startsWith('http') && !pillHref.startsWith('#')) {
          e.preventDefault();
          var targetPillUrl = pillHref.replace(/\?lang=[^#&]+/, '');
          targetPillUrl += (targetPillUrl.indexOf('?') === -1 ? '?' : '&') + 'lang=' + encodeURIComponent(currentLang);
          window.location.href = targetPillUrl;
          return;
        }
      }
    });

    // Actualizar enlaces de navegación tras la renderización asíncrona de nav.js
    setTimeout(function () {
      updateNavLinks(currentLang);
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
