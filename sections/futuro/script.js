/**
 * ==========================================================================
 * EL LEGADO DEL TORO — SECCIÓN 5: EL FUTURO
 * Escenarios 2050: Viaje en el Tiempo hacia el Futuro de la Tauromaquia
 * Archivo: sections/futuro/script.js
 * 
 * Controlador interactivo para la experiencia cinematográfica de viaje temporal.
 * - Secuencia: Salida (2026) -> Salto -> Q1 (2030) -> Salto -> Q2 (2035) -> 
 *   Salto -> Q3 (2040) -> Salto -> Q4 (2045) -> Salto -> Q5 (2049) -> 
 *   Salto final acelerado -> Llegada a 2050 -> Revelación del Escenario.
 * - Retención de respuestas en memoria JavaScript (sin persistencia en navegador).
 * - Ponderación determinista y transparente de 4 escenarios futuros.
 * - Soporte para navegación hacia atrás y recálculo dinámico libre de estados obsoletos.
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. BANCO DE DATOS: PREGUNTAS, OPCIONES, PONDERACIONES Y DATOS REALES
  // --------------------------------------------------------------------------

  /**
   * Ponderación determinista:
   * Cada opción asigna puntos específicos a uno o más de los 4 escenarios:
   * - continua: Tradición continua
   * - reformada: Tradición reformada
   * - museo: Patrimonio de museo
   * - nueva_etapa: Nueva etapa
   */
  const QUESTIONS = [
    { id: 1, axis: 'Pregunta 1: La tradición', prompt: '¿Qué debe pasar con las fiestas de toros en el futuro?',
      options: [
        { heading: 'Seguir con las fiestas', desc: 'Mantener las corridas y otras fiestas de toros. Enseñar esta tradición a las personas jóvenes.', scores: { continua: 3, reformada: 1, museo: 0, nueva_etapa: 0 }, primaryScenario: 'Tradición continua' },
        { heading: 'Que cada ciudad decida', desc: 'Cada ciudad puede hablar con sus vecinos y decidir, según la ley, si quiere estas fiestas.', scores: { continua: 0, reformada: 2, museo: 1, nueva_etapa: 2 }, primaryScenario: 'Tradición reformada' },
        { heading: 'Cambiar las fiestas poco a poco', desc: 'Cambiar las fiestas de toros por otras actividades de arte y cultura.', scores: { continua: 0, reformada: 0, museo: 2, nueva_etapa: 3 }, primaryScenario: 'Nueva etapa' },
        { heading: 'Hacer fiestas en menos plazas', desc: 'Celebrar estas fiestas en menos plazas y seguir las normas de seguridad.', scores: { continua: 1, reformada: 3, museo: 0, nueva_etapa: 0 }, primaryScenario: 'Tradición reformada' }
      ],
      fact: 'El Ministerio de Cultura pregunta a personas de 15 años o más por sus actividades culturales. Estos datos muestran qué hace la gente. Por sí solos, no dicen si las personas apoyan o no las fiestas de toros.',
      source: 'Ministerio de Cultura • Encuesta de Hábitos y Prácticas Culturales', sourceHref: 'https://www.cultura.gob.es/servicios-a-la-ciudadania/estadisticas/cultura/mc/ehpc.html' },
    { id: 2, axis: 'Pregunta 2: El dinero', prompt: '¿Cómo se deben pagar las fiestas de toros?',
      options: [
        { heading: 'Usar el dinero de las entradas', desc: 'Pagar las fiestas con la venta de entradas y con dinero privado.', scores: { continua: 0, reformada: 2, museo: 2, nueva_etapa: 1 }, primaryScenario: 'Tradición reformada' },
        { heading: 'Pedir ayudas públicas', desc: 'Permitir que los proyectos taurinos pidan ayudas públicas si cumplen las mismas reglas que otros proyectos.', scores: { continua: 3, reformada: 1, museo: 0, nueva_etapa: 0 }, primaryScenario: 'Tradición continua' },
        { heading: 'Ayudar al campo y a la naturaleza', desc: 'Dar prioridad a proyectos que cuidan el campo y los animales, no a las fiestas como espectáculo.', scores: { continua: 0, reformada: 2, museo: 1, nueva_etapa: 2 }, primaryScenario: 'Tradición reformada' },
        { heading: 'Pagar museos y nuevos usos', desc: 'Usar dinero para guardar documentos, hacer museos y dar otros usos a las plazas.', scores: { continua: 0, reformada: 0, museo: 3, nueva_etapa: 2 }, primaryScenario: 'Patrimonio de museo' }
      ],
      fact: 'La Ley General de Subvenciones explica cuándo el dinero público puede ayudar a un proyecto. Una ayuda pública, una ventaja fiscal y el dinero de las entradas son cosas diferentes. Esta ley no dice cuánto dinero recibe el mundo taurino.',
      source: 'Ley 38/2003, General de Subvenciones • artículo 2', sourceHref: 'https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977' },
    { id: 3, axis: 'Pregunta 3: Los animales', prompt: '¿Qué debe pasar con el cuidado de los animales?',
      options: [
        { heading: 'Mantener las fiestas actuales', desc: 'Mantener las reglas actuales de las corridas, incluida la muerte del toro en la plaza.', scores: { continua: 3, reformada: 0, museo: 0, nueva_etapa: 0 }, primaryScenario: 'Tradición continua' },
        { heading: 'Cambiar las reglas', desc: 'Cambiar las corridas para que el toro no muera en la plaza. Esto no asegura que el animal no sufra.', scores: { continua: 0, reformada: 3, museo: 1, nueva_etapa: 0 }, primaryScenario: 'Tradición reformada' },
        { heading: 'Terminar las fiestas con animales', desc: 'Prohibir los espectáculos taurinos con animales y buscar opciones para las ganaderías.', scores: { continua: 0, reformada: 0, museo: 2, nueva_etapa: 3 }, primaryScenario: 'Nueva etapa' },
        { heading: 'Guardar la historia y cambiar poco a poco', desc: 'Cambiar las fiestas con el tiempo y guardar fotos, documentos y obras de arte.', scores: { continua: 0, reformada: 1, museo: 3, nueva_etapa: 1 }, primaryScenario: 'Patrimonio de museo' }
      ],
      fact: 'La Ley 7/2023 no se aplica a los animales usados en espectáculos taurinos. Esto no significa que estos espectáculos no tengan otras normas.',
      source: 'Ley 7/2023, de protección de los derechos y el bienestar de los animales • BOE', sourceHref: 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-7936' },
    { id: 4, axis: 'Pregunta 4: Las plazas', prompt: '¿Qué uso deben tener las plazas de toros?',
      options: [
        { heading: 'Seguir con las fiestas de toros', desc: 'Usar las plazas para las fiestas y cuidar los edificios importantes.', scores: { continua: 3, reformada: 1, museo: 0, nueva_etapa: 0 }, primaryScenario: 'Tradición continua' },
        { heading: 'Darles otros usos', desc: 'Usar las plazas para deporte, cultura y actividades de la comunidad.', scores: { continua: 0, reformada: 1, museo: 1, nueva_etapa: 3 }, primaryScenario: 'Nueva etapa' },
        { heading: 'Hacer museos y exposiciones', desc: 'Guardar los edificios y usarlos para museos, exposiciones y actividades culturales.', scores: { continua: 0, reformada: 0, museo: 3, nueva_etapa: 1 }, primaryScenario: 'Patrimonio de museo' },
        { heading: 'Usarlas para varias actividades', desc: 'Hacer fiestas de toros con nuevas reglas y otras actividades durante el año.', scores: { continua: 1, reformada: 3, museo: 0, nueva_etapa: 1 }, primaryScenario: 'Tradición reformada' }
      ],
      fact: 'Las Arenas de Barcelona es hoy un centro comercial. Este ejemplo muestra que un edificio puede tener otro uso. No significa que todas las plazas puedan cambiar de la misma manera.',
      source: 'Arenas de Barcelona • web oficial', sourceHref: 'https://www.arenasdebarcelona.com/' },
    { id: 5, axis: 'Pregunta 5: La historia y la educación', prompt: '¿Cómo debemos enseñar esta historia a las nuevas generaciones?',
      options: [
        { heading: 'Guardar documentos y objetos', desc: 'Guardar fotos, documentos y objetos en archivos, museos y universidades.', scores: { continua: 0, reformada: 0, museo: 3, nueva_etapa: 1 }, primaryScenario: 'Patrimonio de museo' },
        { heading: 'Enseñar la tradición taurina', desc: 'Enseñar cómo se hacen las fiestas y respetar las normas, también las que protegen a los menores.', scores: { continua: 3, reformada: 1, museo: 0, nueva_etapa: 0 }, primaryScenario: 'Tradición continua' },
        { heading: 'Enseñar otras actividades culturales', desc: 'Dar más espacio a otras actividades culturales y no enseñar prácticas taurinas.', scores: { continua: 0, reformada: 1, museo: 1, nueva_etapa: 3 }, primaryScenario: 'Nueva etapa' },
        { heading: 'Mostrar varias opiniones', desc: 'Enseñar la historia de los toros y hablar de la cultura, las leyes y el cuidado animal.', scores: { continua: 0, reformada: 3, museo: 1, nueva_etapa: 0 }, primaryScenario: 'Tradición reformada' }
      ],
      fact: 'La UNESCO dice que algunas costumbres y conocimientos pasan de una generación a otra. También habla de enseñar y cuidar este patrimonio. La Convención no dice qué opinión debemos tener sobre las fiestas de toros.',
      source: 'UNESCO • Convención para la Salvaguardia del Patrimonio Cultural Inmaterial (2003)', sourceHref: 'https://ich.unesco.org/en/convention' }
  ];

  /**
   * Catálogo de los 4 Escenarios posibles y sus contenidos editoriales.
   */
  const SCENARIOS = {
    continua: { key: 'continua', title: 'Tradición continua', subtitle: 'Las fiestas siguen en algunas zonas (futuro posible)', tag: 'Futuro 1 • Las fiestas continúan',
      descPlaceholder: 'En este futuro posible, las fiestas de toros siguen en algunas ciudades y pueblos. La gente puede enseñar esta tradición a nuevas generaciones. Pero el futuro depende de las leyes, el dinero, el público y las opiniones sobre el cuidado de los animales. No sabemos si pasará.',
      rationale: 'Este futuro tiene más puntos en tus respuestas. Los puntos siguen las reglas de este juego. No son una predicción ni una encuesta.', bgGradient: 'linear-gradient(135deg, #5C1010 0%, #8B1E1E 50%, #C99700 100%)' },
    reformada: { key: 'reformada', title: 'Tradición reformada', subtitle: 'Las fiestas cambian sus reglas (futuro posible)', tag: 'Futuro 2 • Las fiestas cambian',
      descPlaceholder: 'En este futuro posible, algunas fiestas cambian sus reglas. Las plazas también pueden tener otras actividades. Para hacer estos cambios, hacen falta acuerdos, dinero y leyes. Las personas pueden tener opiniones diferentes. No sabemos si pasará.',
      rationale: 'Este futuro tiene más puntos en tus respuestas. Tus respuestas apoyan algunos cambios, pero no dicen qué hará la sociedad.', bgGradient: 'linear-gradient(135deg, #8B1E1E 0%, #C99700 60%, #EFE9DD 100%)' },
    museo: { key: 'museo', title: 'Patrimonio de museo', subtitle: 'La historia se guarda en museos (futuro posible)', tag: 'Futuro 3 • La historia se conserva',
      descPlaceholder: 'En este futuro posible, hay menos fiestas de toros o dejan de hacerse. Los museos y archivos guardan fotos, objetos e historias. Algunas plazas pueden tener nuevos usos. Estos cambios necesitan dinero y decisiones de la gente. No sabemos si pasará.',
      rationale: 'Este futuro tiene más puntos en tus respuestas. Guardar la historia es una opción, pero tus respuestas no deciden el futuro real.', bgGradient: 'linear-gradient(135deg, #3A322D 0%, #7E746D 60%, #C99700 100%)' },
    nueva_etapa: { key: 'nueva_etapa', title: 'Nueva etapa', subtitle: 'Las plazas tienen nuevos usos (futuro posible)', tag: 'Futuro 4 • Nuevos usos',
      descPlaceholder: 'En este futuro posible, algunas plazas se usan para deporte, arte y otras actividades. Las fiestas de toros pueden dejar de hacerse en algunos lugares. Los cambios necesitan dinero, permisos y nuevas opciones de trabajo. No sabemos si pasará.',
      rationale: 'Este futuro tiene más puntos en tus respuestas. Los puntos muestran tus elecciones en este juego, no lo que hará toda la sociedad.', bgGradient: 'linear-gradient(135deg, #231F20 0%, #574F4A 60%, #B83232 100%)' }
  };

  /**
   * Hitos cronológicos del viaje en el tiempo.
   * La salida es 2026, las 5 preguntas corresponden a 2030, 2035, 2040, 2045 y 2049,
   * y la revelación del destino es 2050.
   */
  const TIMELINE_STOPS = [
    { index: 0, year: 2030, label: 'Año 2030 • Primera parada', statusText: 'Viajando en el tiempo... Llegando al año 2030' },
    { index: 1, year: 2035, label: 'Año 2035 • Segundo hito', statusText: 'Avanzando hacia el futuro... Llegando al año 2035' },
    { index: 2, year: 2040, label: 'Año 2040 • Tercera etapa', statusText: 'Cruzando la década... Llegando al año 2040' },
    { index: 3, year: 2045, label: 'Año 2045 • Cuarta etapa', statusText: 'Acercándonos al destino... Llegando al año 2045' },
    { index: 4, year: 2049, label: 'Año 2049 • Última decisión', statusText: 'Última parada antes de 2050... Llegando al año 2049' }
  ];

  const DEPARTURE_YEAR = 2026;
  const DESTINATION_YEAR = 2050;

  // --------------------------------------------------------------------------
  // 2. MODELO DE ESTADO EN MEMORIA (SIN PERSISTENCIA EN NAVEGADOR)
  // --------------------------------------------------------------------------

  const state = {
    currentQuestionIndex: 0,
    answers: [null, null, null, null, null], // Índice de opción elegida (0 a 3) por cada pregunta
    isTraveling: false,                     // Bloquea clics duplicados durante las transiciones
    hasStartedJourney: false,
    displayedYear: DEPARTURE_YEAR
  };

  // --------------------------------------------------------------------------
  // 3. REFERENCIAS A ELEMENTOS DEL DOM
  // --------------------------------------------------------------------------

  const dom = {
    // Simulador y secciones principales
    simulatorSection: document.getElementById('futuro-simulador'),
    travelIntro: document.getElementById('futuro-travel-intro'),
    btnTravelStart: document.getElementById('futuro-btn-travel-start'),
    simulatorCard: document.getElementById('futuro-simulator-card'),
    srAnnouncer: document.getElementById('futuro-sr-announcer'),

    // Overlay cinematográfico de viaje en el tiempo
    timetravelOverlay: document.getElementById('futuro-timetravel-overlay'),
    timetravelBadge: document.getElementById('futuro-timetravel-badge'),
    timetravelYear: document.getElementById('futuro-timetravel-year'),
    timetravelStatus: document.getElementById('futuro-timetravel-status'),

    // Timeline y progreso
    timelineNodesContainer: document.getElementById('futuro-timeline-nodes'),
    stageYearBadge: document.getElementById('futuro-stage-year-badge'),
    stepCounter: document.getElementById('futuro-current-step'),
    axisLabel: document.getElementById('futuro-axis-label'),
    progressTrack: document.getElementById('futuro-progress-track'),
    progressFill: document.getElementById('futuro-progress-fill'),

    // Pregunta activa y opciones
    questionTitle: document.getElementById('futuro-question-title'),
    decisionForm: document.getElementById('futuro-decision-form'),
    optionCards: [
      document.getElementById('futuro-card-opt-0'),
      document.getElementById('futuro-card-opt-1'),
      document.getElementById('futuro-card-opt-2'),
      document.getElementById('futuro-card-opt-3')
    ],
    optionRadios: [
      document.getElementById('futuro-opt-0'),
      document.getElementById('futuro-opt-1'),
      document.getElementById('futuro-opt-2'),
      document.getElementById('futuro-opt-3')
    ],
    optionHeadings: [
      document.getElementById('futuro-heading-opt-0'),
      document.getElementById('futuro-heading-opt-1'),
      document.getElementById('futuro-heading-opt-2'),
      document.getElementById('futuro-heading-opt-3')
    ],
    optionDescs: [
      document.getElementById('futuro-desc-opt-0'),
      document.getElementById('futuro-desc-opt-1'),
      document.getElementById('futuro-desc-opt-2'),
      document.getElementById('futuro-desc-opt-3')
    ],

    // Caja de dato real investigado
    factText: document.getElementById('futuro-fact-text'),
    factSourceVal: document.querySelector('#futuro-fact-source .futuro-source-val'),

    // Botones de navegación del cuestionario
    btnPrev: document.getElementById('futuro-btn-prev'),
    btnNext: document.getElementById('futuro-btn-next'),
    btnNextText: document.getElementById('futuro-btn-next-text'),
    controlsHint: document.getElementById('futuro-controls-hint'),

    // Sección de resultados y llegada a 2050
    resultsSection: document.getElementById('futuro-resultados'),
    arrivalBanner: document.getElementById('futuro-arrival-banner'),
    resultBadge: document.getElementById('futuro-result-badge'),
    resultHeading: document.getElementById('futuro-result-heading'),
    resultSubtitle: document.getElementById('futuro-result-subtitle'),
    resultCanvas: document.getElementById('futuro-result-canvas'),
    resultOverlayTag: document.getElementById('futuro-result-overlay-tag'),
    resultDescBox: document.getElementById('futuro-result-desc-box'),
    resultRationale: document.getElementById('futuro-result-rationale'),
    influenceList: document.getElementById('futuro-influence-list'),
    barsContainer: document.getElementById('futuro-bars-container'),
    btnRestart: document.getElementById('futuro-btn-restart'),

    // Botón de inicio en el héroe editorial
    btnStart: document.getElementById('futuro-btn-start')
  };

  // --------------------------------------------------------------------------
  // 4. ANIMACIONES Y SECUENCIAS DEL VIAJE TEMPORAL
  // --------------------------------------------------------------------------

  /**
   * Anima un contador numérico entre dos años con interpolación suave.
   * @param {HTMLElement} element - Elemento DOM donde se muestra el número
   * @param {number} fromYear - Año inicial
   * @param {number} toYear - Año final
   * @param {number} duration - Duración en milisegundos
   * @param {Function} callback - Función al culminar la animación
   */
  function animateYearCounter(element, fromYear, toYear, duration, callback) {
    if (!element) {
      if (callback) callback();
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || fromYear === toYear) {
      element.textContent = String(toYear);
      if (callback) callback();
      return;
    }

    const direction = Math.sign(toYear - fromYear);
    const stepDuration = Math.min(250, duration / Math.abs(toYear - fromYear));
    let currentYear = fromYear;
    element.textContent = String(currentYear);

    function step() {
      currentYear += direction;
      element.textContent = String(currentYear);

      if (currentYear !== toYear) {
        setTimeout(step, stepDuration);
      } else if (callback) {
        callback();
      }
    }

    setTimeout(step, stepDuration);
  }

  /**
   * Ejecuta la secuencia visual de viaje temporal entre dos hitos.
   * @param {number} fromYear 
   * @param {number} toYear 
   * @param {string} badgeText 
   * @param {string} statusText 
   * @param {number} duration 
   * @param {Function} onComplete 
   */
  function playTimeTravel(fromYear, toYear, badgeText, statusText, duration, onComplete) {
    if (state.isTraveling) return;
    state.isTraveling = true;

    const startedAt = performance.now();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actualDuration = prefersReduced ? 150 : (duration || 1200);

    // Activar y mostrar overlay
    if (dom.timetravelOverlay) {
      dom.timetravelOverlay.hidden = false;
      dom.timetravelOverlay.classList.remove('futuro-hidden');
      dom.timetravelOverlay.setAttribute('aria-hidden', 'false');
      smoothScrollToElement(dom.timetravelOverlay);
    }

    if (dom.timetravelBadge) {
      dom.timetravelBadge.textContent = badgeText || 'Desplazamiento temporal';
    }
    if (dom.timetravelStatus) {
      dom.timetravelStatus.textContent = statusText || 'Acelerando a través de las décadas...';
    }

    // Anuncio auditivo para lectores de pantalla
    if (dom.srAnnouncer) {
      dom.srAnnouncer.textContent = 'Viajando en el tiempo desde el año ' + fromYear + ' hacia el año ' + toYear + '.';
    }

    // Ejecutar contador de años
    animateYearCounter(dom.timetravelYear, fromYear, toYear, actualDuration, function () {
      state.displayedYear = toYear;

      setTimeout(function () {
        if (dom.timetravelOverlay) {
          dom.timetravelOverlay.classList.add('futuro-hidden');
          dom.timetravelOverlay.setAttribute('aria-hidden', 'true');
        }
        state.isTraveling = false;
        if (onComplete) onComplete();
      }, Math.max(prefersReduced ? 50 : 350, 2000 - (performance.now() - startedAt)));
    });
  }

  /**
   * Renderiza la línea de tiempo interactiva superior que refleja la posición actual.
   * @param {number} currentYear 
   */
  function renderTimelineBar(currentYear) {
    if (!dom.timelineNodesContainer) return;

    const years = [2026, 2030, 2035, 2040, 2045, 2049, 2050];
    let html = '';

    years.forEach(function (year, idx) {
      let nodeClass = 'futuro-t-node';
      if (year === currentYear) {
        nodeClass += ' is-active';
      } else if (year < currentYear) {
        nodeClass += ' is-completed';
      }
      if (year === 2050) {
        nodeClass += ' is-final';
      }

      html += '<div class="' + nodeClass + '" data-year="' + year + '">' +
        '<span class="futuro-t-dot"></span>' +
        '<span class="futuro-t-year">' + year + '</span>' +
        '</div>';

      if (idx < years.length - 1) {
        const connClass = (year < currentYear) ? 'futuro-t-connector is-active' : 'futuro-t-connector';
        html += '<div class="' + connClass + '"></div>';
      }
    });

    dom.timelineNodesContainer.innerHTML = html;
  }

  /**
   * Inicia el viaje temporal desde la pantalla de salida (2026 -> 2030).
   */
  function startJourney() {
    if (state.isTraveling) return;

    // Ocultar pantalla de salida
    if (dom.travelIntro) {
      dom.travelIntro.classList.add('futuro-hidden');
    }

    // Ejecutar salto temporal hacia la primera pregunta (2026 -> 2030)
    playTimeTravel(
      DEPARTURE_YEAR,
      TIMELINE_STOPS[0].year,
      'Primer salto temporal',
      TIMELINE_STOPS[0].statusText,
      1300,
      function () {
        state.hasStartedJourney = true;
        state.currentQuestionIndex = 0;

        if (dom.simulatorCard) {
          dom.simulatorCard.classList.remove('futuro-hidden');
        }

        renderCurrentQuestion();
        smoothScrollToElement(dom.simulatorCard);

        if (dom.optionCards[0]) {
          dom.optionCards[0].focus();
        }
      }
    );
  }

  // --------------------------------------------------------------------------
  // 5. LÓGICA DE PONDERACIÓN Y RESOLUCIÓN DETERMINISTA
  // --------------------------------------------------------------------------

  /**
   * Calcula los puntos acumulados para los 4 escenarios según las 5 respuestas dadas.
   * Totalmente determinista, sin aleatoriedad.
   * @returns {Object} { continua: number, reformada: number, museo: number, nueva_etapa: number }
   */
  function calculateScores() {
    const totals = { continua: 0, reformada: 0, museo: 0, nueva_etapa: 0 };

    state.answers.forEach(function (selectedOptionIndex, qIndex) {
      if (selectedOptionIndex !== null && QUESTIONS[qIndex]) {
        const option = QUESTIONS[qIndex].options[selectedOptionIndex];
        if (option && option.scores) {
          totals.continua += option.scores.continua || 0;
          totals.reformada += option.scores.reformada || 0;
          totals.museo += option.scores.museo || 0;
          totals.nueva_etapa += option.scores.nueva_etapa || 0;
        }
      }
    });

    return totals;
  }

  /**
   * Determina el resultado ganador o genera un escenario mixto si existe un empate en el puntaje más alto.
   * @param {Object} scores 
   * @returns {Object} Objeto con la información del escenario a desplegar
   */
  function resolveOutcome(scores) {
    const keys = ['continua', 'reformada', 'museo', 'nueva_etapa'];
    let maxScore = -1;
    let winners = [];

    keys.forEach(function (key) {
      const score = scores[key];
      if (score > maxScore) {
        maxScore = score;
        winners = [key];
      } else if (score === maxScore) {
        winners.push(key);
      }
    });

    // Caso 1: Ganador único sin empate
    if (winners.length === 1) {
      return {
        isTie: false,
        scenario: SCENARIOS[winners[0]],
        tiedKeys: []
      };
    }

    // Caso 2: Empate metodológico entre dos o más escenarios con la máxima puntuación
    const tiedTitles = winners.map(function (k) {
      return SCENARIOS[k].title;
    }).join(' & ');

    return {
      isTie: true,
      scenario: {
        key: 'mixto',
        title: 'Dos futuros posibles: ' + tiedTitles,
        subtitle: 'Dos futuros tienen los mismos puntos (futuro posible)',
        tag: 'Futuro mixto • Año 2050',
        descPlaceholder: 'Dos futuros tienen los mismos puntos: ' + tiedTitles + '. Esto solo quiere decir que tus respuestas no dan un ganador único en este juego. No es una predicción de lo que pasará en España.',
        rationale: 'Tus respuestas dieron ' + maxScore + ' puntos a ' + tiedTitles + '. Es un empate en el juego, no una encuesta ni una predicción.',
        bgGradient: 'linear-gradient(135deg, #5C1010 0%, #3A322D 50%, #C99700 100%)'
      },
      tiedKeys: winners
    };
  }

  // --------------------------------------------------------------------------
  // 6. RENDERIZADO Y CONTROL DE NAVEGACIÓN
  // --------------------------------------------------------------------------

  /**
   * Actualiza la interfaz para mostrar la pregunta activa actual y su hito temporal.
   */
  function renderCurrentQuestion() {
    const qIndex = state.currentQuestionIndex;
    const currentQ = QUESTIONS[qIndex];
    const currentStop = TIMELINE_STOPS[qIndex];
    if (!currentQ || !currentStop) return;

    state.displayedYear = currentStop.year;

    // 1. Hito temporal y línea de tiempo
    if (dom.stageYearBadge) {
      dom.stageYearBadge.textContent = currentStop.label;
    }
    renderTimelineBar(currentStop.year);

    // 2. Contador de paso y etiqueta de eje
    if (dom.stepCounter) {
      dom.stepCounter.textContent = String(qIndex + 1).padStart(2, '0');
    }
    if (dom.axisLabel) {
      dom.axisLabel.textContent = currentQ.axis;
    }

    // 3. Barra de progreso accesible
    const progressPercent = Math.round(((qIndex + 1) / QUESTIONS.length) * 100);
    if (dom.progressTrack) {
      dom.progressTrack.setAttribute('aria-valuenow', String(progressPercent));
      dom.progressTrack.setAttribute('aria-label', 'Pregunta ' + (qIndex + 1) + ' de 5: ' + currentQ.axis);
    }
    if (dom.progressFill) {
      dom.progressFill.style.width = progressPercent + '%';
    }

    // 4. Título de la pregunta
    if (dom.questionTitle) {
      dom.questionTitle.textContent = currentQ.prompt;
    }

    // 5. Actualizar las 4 opciones de respuesta y restaurar la selección previa si existe
    const selectedAnswer = state.answers[qIndex];

    currentQ.options.forEach(function (opt, optIndex) {
      if (dom.optionHeadings[optIndex]) {
        dom.optionHeadings[optIndex].textContent = opt.heading;
      }
      if (dom.optionDescs[optIndex]) {
        dom.optionDescs[optIndex].textContent = opt.desc;
      }
      if (dom.optionRadios[optIndex]) {
        dom.optionRadios[optIndex].checked = (selectedAnswer === optIndex);
      }
      if (dom.optionCards[optIndex]) {
        dom.optionCards[optIndex].classList.toggle('is-selected', selectedAnswer === optIndex);
      }
    });

    // 6. Caja de dato de contexto y fuente
    if (dom.factText) {
      dom.factText.textContent = currentQ.fact;
    }
    if (dom.factSourceVal) {
      dom.factSourceVal.textContent = currentQ.source;
      dom.factSourceVal.href = currentQ.sourceHref;
    }

    // 7. Botón Anterior: siempre disponible (en Q1 regresa a la pantalla de salida de 2026)
    if (dom.btnPrev) {
      dom.btnPrev.disabled = false;
      if (qIndex === 0) {
        dom.btnPrev.setAttribute('title', 'Regresar al punto de partida (2026)');
      } else {
        dom.btnPrev.setAttribute('title', 'Volver a la pregunta anterior (' + TIMELINE_STOPS[qIndex - 1].year + ')');
      }
    }

    // 8. Botón Siguiente: habilitado solo si la pregunta tiene respuesta registrada
    if (dom.btnNext) {
      const isAnswered = (selectedAnswer !== null);
      dom.btnNext.disabled = !isAnswered;

      if (qIndex === QUESTIONS.length - 1) {
        if (dom.btnNextText) {
          dom.btnNextText.textContent = 'Llegar al 2050';
        }
      } else {
        const nextYear = TIMELINE_STOPS[qIndex + 1].year;
        if (dom.btnNextText) {
          dom.btnNextText.textContent = 'Viajar al ' + nextYear;
        }
      }
    }

    // 9. Texto de ayuda accesible
    if (dom.controlsHint) {
      if (selectedAnswer === null) {
        dom.controlsHint.textContent = 'Elige una respuesta para continuar el viaje';
      } else if (qIndex === QUESTIONS.length - 1) {
        dom.controlsHint.textContent = 'Decisión registrada. Pulsa para llegar al año 2050.';
      } else {
        const nextYear = TIMELINE_STOPS[qIndex + 1].year;
        dom.controlsHint.textContent = 'Decisión registrada. Listo para avanzar hacia ' + nextYear + '.';
      }
    }

    // 10. Anuncio auditivo para lectores de pantalla
    if (dom.srAnnouncer) {
      dom.srAnnouncer.textContent = 'Llegaste al año ' + currentStop.year + '. Pregunta ' + (qIndex + 1) + ' de 5: ' + currentQ.axis + '. ' + currentQ.prompt;
    }
  }

  /**
   * Registra la selección del usuario para la pregunta actual.
   * @param {number} optionIndex - Índice de la opción elegida (0 a 3)
   */
  function handleSelectOption(optionIndex) {
    if (state.isTraveling) return;

    state.answers[state.currentQuestionIndex] = optionIndex;

    // Actualizar visualmente las tarjetas y radios
    dom.optionCards.forEach(function (card, idx) {
      if (card) {
        card.classList.toggle('is-selected', idx === optionIndex);
      }
      if (dom.optionRadios[idx]) {
        dom.optionRadios[idx].checked = (idx === optionIndex);
      }
    });

    // Habilitar el botón siguiente
    if (dom.btnNext) {
      dom.btnNext.disabled = false;
    }

    // Actualizar el texto de ayuda
    if (dom.controlsHint) {
      if (state.currentQuestionIndex === QUESTIONS.length - 1) {
        dom.controlsHint.textContent = 'Decisión registrada. Pulsa para llegar al año 2050.';
      } else {
        const nextYear = TIMELINE_STOPS[state.currentQuestionIndex + 1].year;
        dom.controlsHint.textContent = 'Decisión registrada. Listo para avanzar hacia ' + nextYear + '.';
      }
    }
  }

  /**
   * Navega hacia la etapa anterior respetando las respuestas guardadas en memoria.
   * Permite retroceder sin perder información ni generar resultados obsoletos.
   */
  function handlePrev() {
    if (state.isTraveling) return;

    if (state.currentQuestionIndex > 0) {
      // Retroceder a la pregunta anterior
      state.currentQuestionIndex--;
      renderCurrentQuestion();
      smoothScrollToElement(dom.simulatorCard);
    } else {
      // Si está en la pregunta 1 y pulsa Volver: regresar a la pantalla de salida (2026)
      if (dom.simulatorCard) {
        dom.simulatorCard.classList.add('futuro-hidden');
      }
      if (dom.travelIntro) {
        dom.travelIntro.classList.remove('futuro-hidden');
        smoothScrollToElement(dom.travelIntro);
      }
      state.hasStartedJourney = false;
      state.displayedYear = DEPARTURE_YEAR;

      if (dom.srAnnouncer) {
        dom.srAnnouncer.textContent = 'Regresaste al punto de partida en el año 2026.';
      }
    }
  }

  /**
   * Avanza a la siguiente etapa temporal o, si es la última pregunta,
   * activa el viaje definitivo hacia el año 2050.
   */
  function handleNext() {
    if (state.isTraveling) return;

    // Exigir que la pregunta actual esté contestada
    if (state.answers[state.currentQuestionIndex] === null) {
      return;
    }

    const currentQIndex = state.currentQuestionIndex;

    if (currentQIndex < QUESTIONS.length - 1) {
      // Salto temporal hacia la siguiente pregunta
      const fromYear = TIMELINE_STOPS[currentQIndex].year;
      const targetQIndex = currentQIndex + 1;
      const targetYear = TIMELINE_STOPS[targetQIndex].year;

      if (dom.simulatorCard) {
        dom.simulatorCard.classList.add('futuro-hidden');
      }

      playTimeTravel(
        fromYear,
        targetYear,
        'Avanzando en la línea temporal',
        TIMELINE_STOPS[targetQIndex].statusText,
        1250,
        function () {
          state.currentQuestionIndex = targetQIndex;
          if (dom.simulatorCard) {
            dom.simulatorCard.classList.remove('futuro-hidden');
          }
          renderCurrentQuestion();
          smoothScrollToElement(dom.simulatorCard);
        }
      );
    } else {
      // Salto temporal definitivo hacia 2050 y revelación de la predicción
      triggerFinalArrivalSequence();
    }
  }

  /**
   * Secuencia cinematográfica final hacia el año 2050:
   * 1. Desvanece la última pregunta.
   * 2. Acelera hacia 2050 con mensajes de anticipación.
   * 3. Revela el resultado calculado por el algoritmo existente.
   */
  function triggerFinalArrivalSequence() {
    if (state.isTraveling) return;
    state.isTraveling = true;

    const fromYear = TIMELINE_STOPS[4].year; // 2049
    const toYear = DESTINATION_YEAR;         // 2050

    const startedAt = performance.now();

    // 1. Ocultar tarjeta de preguntas
    if (dom.simulatorCard) {
      dom.simulatorCard.classList.add('futuro-hidden');
    }

    // 2. Activar overlay de viaje temporal acelerado
    if (dom.timetravelOverlay) {
      dom.timetravelOverlay.hidden = false;
      dom.timetravelOverlay.classList.remove('futuro-hidden');
      dom.timetravelOverlay.setAttribute('aria-hidden', 'false');
      smoothScrollToElement(dom.timetravelOverlay);
    }

    if (dom.timetravelBadge) {
      dom.timetravelBadge.textContent = 'Salto temporal definitivo';
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fase 1: Cálculo
    if (dom.timetravelStatus) {
      dom.timetravelStatus.textContent = 'Calculando las posibilidades del futuro…';
    }

    // Acelerar el contador de años a 2050
    animateYearCounter(dom.timetravelYear, fromYear, toYear, prefersReduced ? 150 : 1000, function () {
      state.displayedYear = 2050;

      // Fase 2: Llegada a 2050
      if (dom.timetravelStatus) {
        dom.timetravelStatus.textContent = 'Has llegado al año 2050.';
      }

      setTimeout(function () {
        // Fase 3: Anticipación del futuro
        if (dom.timetravelStatus) {
          dom.timetravelStatus.textContent = '¿Qué futuro te espera?';
        }

        setTimeout(function () {
          // Ocultar overlay y desplegar el resultado
          if (dom.timetravelOverlay) {
            dom.timetravelOverlay.classList.add('futuro-hidden');
            dom.timetravelOverlay.setAttribute('aria-hidden', 'true');
          }
          state.isTraveling = false;
          showResults();
        }, Math.max(prefersReduced ? 100 : 750, 2000 - (performance.now() - startedAt)));
      }, prefersReduced ? 100 : 750);
    });
  }

  // --------------------------------------------------------------------------
  // 7. RENDERIZADO DEL ESCENARIO HIPOTÉTICO (RESULTADOS EN 2050)
  // --------------------------------------------------------------------------

  /**
   * Genera y muestra la sección de resultados basándose en las elecciones.
   */
  function showResults() {
    const scores = calculateScores();
    const resolved = resolveOutcome(scores);
    const scenario = resolved.scenario;

    // 1. Desocultar la sección de resultados
    if (dom.resultsSection) {
      dom.resultsSection.hidden = false;
    }

    // 2. Encabezado y títulos
    if (dom.resultBadge) {
      dom.resultBadge.textContent = scenario.tag;
    }
    if (dom.resultHeading) {
      dom.resultHeading.textContent = scenario.title;
    }
    if (dom.resultSubtitle) {
      dom.resultSubtitle.textContent = scenario.subtitle;
    }

    // 3. Lienzo visual con gradiente personalizado del escenario
    if (dom.resultCanvas) {
      dom.resultCanvas.style.background = scenario.bgGradient;
    }
    if (dom.resultOverlayTag) {
      dom.resultOverlayTag.textContent = scenario.tag;
    }

    // 4. Descripción del escenario hipotético proyectado
    if (dom.resultDescBox) {
      const descEl = dom.resultDescBox.querySelector('.placeholder-desc') || dom.resultDescBox.querySelector('.futuro-result-desc-text');
      if (descEl) {
        descEl.textContent = scenario.descPlaceholder;
      }
    }

    // 5. Explicación del resultado
    if (dom.resultRationale) {
      dom.resultRationale.textContent = scenario.rationale;
    }

    // 6. Lista detallada de la influencia de cada decisión
    if (dom.influenceList) {
      dom.influenceList.innerHTML = QUESTIONS.map(function (q, qIndex) {
        const chosenIdx = state.answers[qIndex];
        const chosenOption = q.options[chosenIdx];
        if (!chosenOption) return '';

        const contributions = [
          ['Futuro: siguen las fiestas', chosenOption.scores.continua],
          ['Futuro: cambian las fiestas', chosenOption.scores.reformada],
          ['Futuro: museos e historia', chosenOption.scores.museo],
          ['Futuro: nuevos usos', chosenOption.scores.nueva_etapa]
        ].filter(function (entry) {
          return entry[1] > 0;
        }).map(function (entry) {
          return entry[0] + ': ' + entry[1] + (entry[1] === 1 ? ' punto' : ' puntos');
        }).join('; ');

        return '<li class="futuro-influence-item">' +
          '<strong>' + q.axis + ':</strong> ' +
          'Elegiste <em>"' + chosenOption.heading + '"</em>. ' +
          'Tus puntos: ' + contributions + '.' +
          '</li>';
      }).join('');
    }

    // 7. Desglose transparente de puntuaciones en las barras medidoras
    if (dom.barsContainer) {
      const scenarioDefs = [
        { key: 'continua', label: 'Siguen las fiestas' },
        { key: 'reformada', label: 'Cambian las fiestas' },
        { key: 'museo', label: 'Museos e historia' },
        { key: 'nueva_etapa', label: 'Nuevos usos' }
      ];

      // Puntaje máximo posible en 5 preguntas ponderadas es aprox. 15 puntos
      const maxPossible = 15;

      dom.barsContainer.innerHTML = scenarioDefs.map(function (s) {
        const pts = scores[s.key] || 0;
        const pct = Math.min(100, Math.round((pts / maxPossible) * 100));
        const isLeader = !resolved.isTie ? (resolved.scenario.key === s.key) : resolved.tiedKeys.includes(s.key);
        const leaderStyle = isLeader ? ' style="font-weight: 700; color: var(--color-primary);"' : '';

        return '<div class="futuro-bar-row">' +
          '<span class="futuro-bar-name"' + leaderStyle + '>' + s.label + ':</span>' +
          '<div class="futuro-bar-track" role="meter" aria-label="Afinidad con ' + s.label + '" aria-valuenow="' + pts + '" aria-valuemin="0" aria-valuemax="' + maxPossible + '">' +
          '<div class="futuro-bar-fill" style="width: ' + pct + '%;"></div>' +
          '</div>' +
          '<span class="futuro-bar-val">' + pts + ' puntos</span>' +
          '</div>';
      }).join('');
    }

    // 8. Anuncio accesible y desplazamiento suave
    if (dom.srAnnouncer) {
      dom.srAnnouncer.textContent = 'Has llegado al año 2050. Tu escenario proyectado es: ' + scenario.title + '.';
    }

    smoothScrollToElement(dom.arrivalBanner || dom.resultsSection);
  }

  /**
   * Reinicia la experiencia completa de viaje temporal.
   */
  function handleRestart() {
    // Restablecer el estado en memoria
    state.currentQuestionIndex = 0;
    state.answers = [null, null, null, null, null];
    state.isTraveling = false;
    state.hasStartedJourney = false;
    state.displayedYear = DEPARTURE_YEAR;

    // Ocultar resultados y tarjeta de preguntas
    if (dom.resultsSection) {
      dom.resultsSection.hidden = true;
    }
    if (dom.simulatorCard) {
      dom.simulatorCard.classList.add('futuro-hidden');
    }

    // Mostrar nuevamente la pantalla de salida de 2026
    if (dom.travelIntro) {
      dom.travelIntro.classList.remove('futuro-hidden');
      smoothScrollToElement(dom.travelIntro);
    }

    if (dom.srAnnouncer) {
      dom.srAnnouncer.textContent = 'El viaje en el tiempo ha sido reiniciado. Te encuentras en el punto de partida en el año 2026.';
    }
  }

  // --------------------------------------------------------------------------
  // 8. UTILIDADES Y CONFIGURACIÓN DE EVENTOS
  // --------------------------------------------------------------------------

  /**
   * Desplazamiento suave con respeto a prefers-reduced-motion.
   * @param {HTMLElement} element 
   */
  function smoothScrollToElement(element) {
    if (!element) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  /**
   * Conecta los escuchadores de eventos para interactividad y accesibilidad.
   */
  function setupEventListeners() {
    // Botón inicial del Héroe editorial: desplaza suavemente hacia el simulador temporal
    if (dom.btnStart) {
      dom.btnStart.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScrollToElement(dom.simulatorSection);
        if (dom.btnTravelStart) {
          dom.btnTravelStart.focus();
        }
      });
    }

    // Botón de la pantalla de salida: Iniciar viaje
    if (dom.btnTravelStart) {
      dom.btnTravelStart.addEventListener('click', function () {
        startJourney();
      });
    }

    // Selección de opciones mediante click en las tarjetas
    dom.optionCards.forEach(function (card, index) {
      if (card) {
        card.addEventListener('click', function () {
          handleSelectOption(index);
        });

        // Soporte de selección por teclado (Enter y Espacio)
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelectOption(index);
          }
        });
      }
    });

    // Selección de opciones mediante cambio en los radio inputs nativos
    dom.optionRadios.forEach(function (radio, index) {
      if (radio) {
        radio.addEventListener('change', function () {
          if (radio.checked) {
            handleSelectOption(index);
          }
        });
      }
    });

    // Botones de navegación
    if (dom.btnPrev) {
      dom.btnPrev.addEventListener('click', handlePrev);
    }
    if (dom.btnNext) {
      dom.btnNext.addEventListener('click', handleNext);
    }

    // Botón de reinicio
    if (dom.btnRestart) {
      dom.btnRestart.addEventListener('click', handleRestart);
    }
  }

  // --------------------------------------------------------------------------
  // 9. INICIALIZACIÓN AL CARGAR EL DOM
  // --------------------------------------------------------------------------

  function init() {
    setupEventListeners();

    // Asegurar que la pantalla de salida de 2026 esté visible al cargar
    if (dom.travelIntro) {
      dom.travelIntro.classList.remove('futuro-hidden');
    }
    if (dom.simulatorCard) {
      dom.simulatorCard.classList.add('futuro-hidden');
    }
    if (dom.resultsSection) {
      dom.resultsSection.hidden = true;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
