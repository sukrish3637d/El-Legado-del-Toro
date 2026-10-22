/**
 * ==========================================================================
 * EL LEGADO DEL TORO - CONFIGURACIÓN Y RENDERIZADO DE LA PORTADA
 * Archivo: js/home.js
 * 
 * Configuración centralizada de los miembros del equipo y sus secciones.
 * Edita los nombres de los estudiantes y los datos de cada sección directamente
 * en este array sin necesidad de modificar el archivo HTML.
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. ARRAY DE MIEMBROS Y SECCIONES (CONFIGURACIÓN CENTRALIZADA)
// --------------------------------------------------------------------------
const MEMBERS = [
  {
    section: 1,
    title: 'La Historia',
    description: 'Orígenes ancestrales, evolución de la lidia y la metamorfosis del toreo a pie en España.',
    studentName: 'Sukrish (25BDS1058)',
    feature: 'Línea de tiempo interactiva',
    link: 'sections/historia/index.html',
    badge: 'Sección 01'
  },
  {
    section: 2,
    title: 'El Arte',
    description: 'Inspiración plástica en Goya, Picasso, literatura universal, música y estética de la tauromaquia.',
    studentName: 'Krishna Mishra (25BDS1135)',
    feature: 'Galería visual interactiva',
    link: 'sections/arte/index.html',
    badge: 'Sección 02'
  },
  {
    section: 3,
    title: 'La Cultura',
    description: 'Tradición popular, fiestas patronales, arraigo identitario y el toro como símbolo sociológico.',
    studentName: 'Abhishek Kumar (25BDS1018)',
    feature: 'Cuestionario interactivo',
    link: 'sections/cultura/index.html',
    badge: 'Sección 03'
  },
  {
    section: 4,
    title: 'La Controversia',
    description: 'Debate ético, bienestar animal, argumentos a favor de la tradición y posturas abolicionistas.',
    studentName: 'Saurabh Raj (25BDS1005)',
    feature: 'Encuesta y sondeo de opinión',
    link: 'sections/controversia/index.html',
    badge: 'Sección 04'
  },
  {
    section: 5,
    title: 'El Futuro',
    description: 'Marco legislativo moderno, relevo generacional y proyecciones de la fiesta en el siglo XXI.',
    studentName: 'Durgesh Tomar (25BDS1030)',
    feature: 'Simulación interactiva',
    link: 'sections/futuro/index.html',
    badge: 'Sección 05'
  }
];

// --------------------------------------------------------------------------
// 2. FUNCIÓN DE RENDERIZADO DE LOS BLOQUES DE MIEMBROS
// --------------------------------------------------------------------------
(function () {
  'use strict';

  /**
   * Genera el HTML de un bloque interactivo para cada miembro
   * @param {Object} member - Objeto de datos del miembro
   * @returns {string} - Cadena de HTML del bloque
   */
  function createMemberBlock(member) {
    return `
      <a 
        href="${member.link}" 
        class="member-block" 
        id="section-card-${member.section}" 
        aria-label="Ir a ${member.title}, Sección ${member.section}, por ${member.studentName}. Función interactiva: ${member.feature}"
      >
        <div class="member-block-top">
          <span class="member-block-num">${member.badge}</span>
          <span class="member-block-author">Por ${member.studentName}</span>
        </div>

        <h3 class="member-block-title">${member.title}</h3>

        <p class="member-block-desc">${member.description}</p>

        <div class="member-block-footer">
          <span class="member-block-feature">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            ${member.feature}
          </span>
          <span class="member-block-cta" aria-hidden="true">
            Explorar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </a>
    `;
  }

  /**
   * Renderiza todos los bloques en el contenedor de la cuadrícula
   */
  function renderMembersGrid() {
    const gridContainer = document.getElementById('members-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = MEMBERS.map(createMemberBlock).join('');
  }

  // Inicializar renderizado al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMembersGrid);
  } else {
    renderMembersGrid();
  }
})();
