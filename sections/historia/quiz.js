/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/quiz.js
 * 
 * FASE 6: CUESTIONARIO HISTÓRICO INTERACTIVO (AUTOEVALUACIÓN BILINGÜE)
 * Módulo de evaluación de conocimientos históricos adquiridos en la cronología
 * y el mapa geográfico de la tauromaquia.
 * 
 * Características:
 * - 8 preguntas históricas rigurosas con 4 opciones contrastadas.
 * - Basadas en las fuentes primarias de la cronología y mapa.
 * - Bilingüismo sincrónico total (ES / EN) vía evento 'historiaLanguageChange'.
 * - Feedback inmediato con explicación histórica y cotejo documental.
 * - Bloqueo de cambio de respuesta tras la selección.
 * - Pantalla de resultados con puntuación, porcentaje, mensaje pedagógico
 *   y revisión detallada de respuestas.
 * - Navegación accesible (teclado Tab, Enter, Espacio, flechas, aria-live).
 * - Enlaces directos para reanudar el viaje en la cronología o en el mapa.
 * ==========================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. 📚 BANCO DE PREGUNTAS HISTÓRICAS RIGUROSAS (8 TEMAS BILINGÜES)
  // =========================================================================
  const QUIZ_QUESTIONS = [
    {
      id: 'q1-origen-medieval',
      timelineEventIndex: 0, // Hito 1: Primeras crónicas en Ávila (Siglo XI)
      mapLocation: null,
      categoryEs: 'Edad Media • Función Militar & Caballeresca',
      categoryEn: 'Middle Ages • Military & Equestrian Function',
      questionEs: '¿Cuál era el propósito original de la lidia de toros durante el período medieval en España?',
      questionEn: 'What was the original purpose of bullfighting during the medieval period in Spain?',
      options: [
        {
          id: 0,
          textEs: 'Ceremonias religiosas',
          textEn: 'Religious ceremonies'
        },
        {
          id: 1,
          textEs: 'Ejercicios militares y ecuestres para caballeros',
          textEn: 'Military and equestrian exercises for knights'
        },
        {
          id: 2,
          textEs: 'Fiestas agrícolas',
          textEn: 'Agricultural festivals'
        },
        {
          id: 3,
          textEs: 'Entretenimiento para comerciantes',
          textEn: 'Entertainment for merchants'
        }
      ],
      correctIndex: 1,
      explanationEs: 'Durante la Edad Media hispana, la lidia del toro bravo formaba parte de los ejercicios marciales y ecuestres de los caballeros feudales para adiestrarse en la monta a la jineta, el alanceamiento y la agilidad bélica.',
      explanationEn: 'In medieval Spain, confronting fighting bulls served as military and equestrian training for feudal knights, developing their horsemanship, lance handling, and combat agility in the face of sudden danger.',
      sourceEs: 'Crónicas medievales de Ávila (1080) y Crónicas de Alfonso XI (BNE MSS/10231)',
      sourceEn: 'Medieval Chronicles of Ávila (1080) & Chronicles of Alfonso XI (BNE MSS/10231)'
    },
    {
      id: 'q2-siete-partidas-1265',
      timelineEventIndex: 1, // Hito 2: Las Siete Partidas (1265)
      mapLocation: null,
      categoryEs: 'Derecho Medieval • Corona de Castilla',
      categoryEn: 'Medieval Law • Crown of Castile',
      questionEs: '¿Qué estableció Las Siete Partidas (1265) de Alfonso X respecto a la lidia de toros por dinero?',
      questionEn: 'What did Alfonso X’s Las Siete Partidas (1265) establish regarding fighting bulls for money?',
      options: [
        {
          id: 0,
          textEs: 'Animó a todos los ciudadanos a participar.',
          textEn: 'It encouraged all citizens to participate.'
        },
        {
          id: 1,
          textEs: 'Creó escuelas profesionales de tauromaquia.',
          textEn: 'It established professional bullfighting schools.'
        },
        {
          id: 2,
          textEs: 'Calificó de infames procesales a quienes lidiaban toros por lucro o recompensa económica.',
          textEn: 'It classified those who fought bulls for monetary gain as legally infamous.'
        },
        {
          id: 3,
          textEs: 'Prohibió todas las actividades ecuestres.',
          textEn: 'It prohibited all equestrian activities.'
        }
      ],
      correctIndex: 2,
      explanationEs: 'En la Partida VII, Título VI, Ley 4, Alfonso X el Sabio consagró la «infamia de derecho» para los hombres que arriesgaban su vida ante fieras por precio, inhabilitándolos como testigos, jueces o procuradores en los tribunales.',
      explanationEn: 'In Partida VII, Title VI, Law 4, Alfonso X enacted legal infamy for men risking their lives against wild beasts for monetary reward, barring them from testifying or serving in courtroom proceedings.',
      sourceEs: 'Las Siete Partidas de Alfonso X el Sabio, Partida VII, Tít. VI, Ley 4 (BOE / BNE)',
      sourceEn: 'Las Siete Partidas of Alfonso X the Wise, Partida VII, Tit. VI, Law 4 (BOE / BNE)'
    },
    {
      id: 'q3-de-salute-gregis-1567',
      timelineEventIndex: 2, // Hito 3: Bula de Pío V (1567)
      mapLocation: null,
      categoryEs: 'Siglo XVI • Censura Eclesiástica',
      categoryEn: '16th Century • Ecclesiastical Censorship',
      questionEs: '¿Qué papa promulgó la bula De Salute Gregis en 1567, amenazando a los lidiadores con la excomunión?',
      questionEn: 'Which pope issued De Salute Gregis in 1567, threatening bullfighters with excommunication?',
      options: [
        {
          id: 0,
          textEs: 'El papa Gregorio XIII',
          textEn: 'Pope Gregory XIII'
        },
        {
          id: 1,
          textEs: 'El papa Pío V',
          textEn: 'Pope Pius V'
        },
        {
          id: 2,
          textEs: 'El papa Urbano VIII',
          textEn: 'Pope Urban VIII'
        },
        {
          id: 3,
          textEs: 'El papa León X',
          textEn: 'Pope Leo X'
        }
      ],
      correctIndex: 1,
      explanationEs: 'El papa Pío V promulgó el 1 de noviembre de 1567 la constitución «De Salute Gregis», prohibiendo los festejos taurinos bajo pena de excomunión ipso facto y negando la sepultura cristiana a los lidiadores que muriesen en la plaza.',
      explanationEn: 'Pope Pius V issued the papal constitution «De Salute Gregis» on November 1, 1567, banning bull spectacles under penalty of immediate excommunication and denying Christian burial to those killed in the ring.',
      sourceEs: 'Bula Pontificia «De Salute Gregis», Roma, 1 de noviembre de 1567 (Archivum Secretum Vaticanum)',
      sourceEn: 'Papal Bull «De Salute Gregis», Rome, November 1, 1567 (Vatican Secret Archives)'
    },
    {
      id: 'q4-transicion-siglo-xviii',
      timelineEventIndex: 4, // Hito 5: Real Maestranza de Ronda (1785)
      mapLocation: 'ronda',
      categoryEs: 'Siglo XVIII • Ilustración y Profesionalización a Pie',
      categoryEn: '18th Century • Enlightenment & Professionalization on Foot',
      questionEs: '¿Qué cambio trascendental se produjo en la tauromaquia española durante el siglo XVIII?',
      questionEn: 'What major change occurred in Spanish bullfighting during the 18th century?',
      options: [
        {
          id: 0,
          textEs: 'La tauromaquia fue sustituida por las carreras de caballos.',
          textEn: 'Bullfighting was replaced by horse racing.'
        },
        {
          id: 1,
          textEs: 'La Iglesia introdujo la tauromaquia profesional.',
          textEn: 'The Church introduced professional bullfighting.'
        },
        {
          id: 2,
          textEs: 'La lidia transitó del toreo caballeresco a caballo hacia la tauromaquia profesional a pie.',
          textEn: 'Bullfighting shifted from aristocratic horseback traditions toward professional bullfighting on foot.'
        },
        {
          id: 3,
          textEs: 'Todas las plazas de toros fueron clausuradas de forma permanente.',
          textEn: 'All bullrings were closed permanently.'
        }
      ],
      correctIndex: 2,
      explanationEs: 'Con la dinastía de los Borbones y la desafección de la nobleza por la lidia ecuestre, los lidiadores populares de a pie asumieron el protagonismo en el ruedo, construyéndose plazas cerradas como la Real Maestranza de Ronda (1785) y codificándose la lidia moderna.',
      explanationEn: 'With the arrival of the Bourbon dynasty and noble withdrawal from equestrian jousting, plebeian foot assistants took center stage, establishing modern foot-based lidia, professional rules, and monumental arenas like Ronda (1785).',
      sourceEs: 'Libro de Actas de la Real Maestranza de Ronda (1785) y Tratado de Pepe-Hillo (1796, BNE R/12423)',
      sourceEn: 'Ronda Real Maestranza Minutes (1785) & Pepe-Hillo’s Treatise (1796, BNE R/12423)'
    },
    {
      id: 'q5-juan-belmonte-1914',
      timelineEventIndex: 6, // Hito 7: Temple Estético de Belmonte (1914)
      mapLocation: 'sevilla',
      categoryEs: 'Edad de Oro • Revolución Estética',
      categoryEn: 'Golden Age • Aesthetic Revolution',
      questionEs: '¿Qué principio introdujo Juan Belmonte que revolucionó la tauromaquia en 1914?',
      questionEn: 'Which principle did Juan Belmonte introduce that revolutionized bullfighting in 1914?',
      options: [
        {
          id: 0,
          textEs: 'Torear a caballo',
          textEn: 'Torear a caballo'
        },
        {
          id: 1,
          textEs: 'Parar, templar y mandar',
          textEn: 'Parar, templar y mandar'
        },
        {
          id: 2,
          textEs: 'De Salute Gregis',
          textEn: 'De Salute Gregis'
        },
        {
          id: 3,
          textEs: 'Las Siete Partidas',
          textEn: 'Las Siete Partidas'
        }
      ],
      correctIndex: 1,
      explanationEs: 'Juan Belmonte demolió el axioma decimonónico («o te quitas tú o te quita el toro»), demostrando que permaneciendo inmóvil en el albero e imponiendo el ritmo del engaño («parar, templar y mandar») se podía torear dentro de los terrenos naturales del animal, convirtiendo el toreo en arte escultórico.',
      explanationEn: 'Juan Belmonte shattered the traditional axiom ("either you move away or the bull removes you"), proving that planting one’s feet motionless and dictating the tempo («parar, templar y mandar») allowed fighting inside the bull’s natural ground, transforming the spectacle into sculptural art.',
      sourceEs: 'Manuel Chaves Nogales: «Juan Belmonte, matador de toros» (1934, Alianza Editorial)',
      sourceEn: 'Manuel Chaves Nogales: "Juan Belmonte, Matador de Toros" (1934, Alianza Editorial)'
    },
    {
      id: 'q6-tragedia-talavera-1920',
      timelineEventIndex: 7, // Hito 8: Tragedia de Talavera (1920)
      mapLocation: 'talavera',
      categoryEs: 'Edad de Oro • Tragedia y Leyenda',
      categoryEn: 'Golden Age • Tragedy & Legend',
      questionEs: '¿Qué célebre torero murió en el ruedo en 1920 durante la Edad de Oro de la tauromaquia española?',
      questionEn: 'Which famous bullfighter died in the arena in 1920 during Spain’s Golden Age of bullfighting?',
      options: [
        {
          id: 0,
          textEs: 'Pedro Romero',
          textEn: 'Pedro Romero'
        },
        {
          id: 1,
          textEs: 'Pepe-Hillo',
          textEn: 'Pepe-Hillo'
        },
        {
          id: 2,
          textEs: 'Juan Belmonte',
          textEn: 'Juan Belmonte'
        },
        {
          id: 3,
          textEs: 'Joselito «El Gallo»',
          textEn: 'Joselito “El Gallo”'
        }
      ],
      correctIndex: 3,
      explanationEs: 'El 16 de mayo de 1920, José Gómez Ortega «Joselito El Gallo», la mayor cumbre técnica y dominadora del toreo, falleció en la plaza de Talavera de la Reina a consecuencia de la cornada del toro «Bailador», marcando un hito trágico imborrable en la historia cultural de España.',
      explanationEn: 'On May 16, 1920, José Gómez Ortega «Joselito El Gallo», considered the supreme technical master of the Golden Age, died in Talavera de la Reina after being fatally gored by the bull «Bailador», leaving a profound tragedy in Spanish history.',
      sourceEs: 'Parte Facultativo de la Plaza de Talavera de la Reina (16 de mayo de 1920, Archivo Histórico)',
      sourceEn: 'Official Medical Certificate of Talavera de la Reina Bullring (May 16, 1920, Historical Archive)'
    },
    {
      id: 'q7-cataluna-2010',
      timelineEventIndex: 9, // Hito 10: Parlamento de Cataluña (2010)
      mapLocation: 'barcelona',
      categoryEs: 'Debate Contemporáneo • Iniciativa Ciudadana',
      categoryEn: 'Contemporary Debate • Citizen Initiative',
      questionEs: '¿Cuál fue el resultado de la iniciativa ciudadana en Cataluña en 2010?',
      questionEn: 'What was the outcome of the citizen-led initiative in Catalonia in 2010?',
      options: [
        {
          id: 0,
          textEs: 'La tauromaquia se convirtió en obligatoria en los festivales culturales.',
          textEn: 'Bullfighting became compulsory at cultural festivals.'
        },
        {
          id: 1,
          textEs: 'Cataluña prohibió las corridas de toros en la comunidad autónoma.',
          textEn: 'Catalonia banned bullfighting in the region.'
        },
        {
          id: 2,
          textEs: 'España abolió todas las fiestas tradicionales.',
          textEn: 'Spain abolished all traditional festivals.'
        },
        {
          id: 3,
          textEs: 'La tauromaquia se declaró derecho constitucional fundamental.',
          textEn: 'Bullfighting became a fundamental constitutional right.'
        }
      ],
      correctIndex: 1,
      explanationEs: 'Impulsada por la Iniciativa Legislativa Popular (ILP) «Prou!» con más de 180.000 firmas, el Parlamento de Cataluña aprobó el 28 de julio de 2010 la Ley 28/2010, prohibiendo las corridas de toros en Cataluña con efectos desde el 1 de enero de 2012.',
      explanationEn: 'Prompted by the citizen-backed Popular Legislative Initiative (ILP) «Prou!» with over 180,000 verified signatures, the Parliament of Catalonia enacted Law 28/2010 on July 28, 2010, banning bullfighting across the region effective January 1, 2012.',
      sourceEs: 'Ley catalana 28/2010, de 3 de agosto, de modificación de la ley animal (BOE-A-2010-13838)',
      sourceEn: 'Catalan Law 28/2010 on animal protection amendments (BOE-A-2010-13838)'
    },
    {
      id: 'q8-stc-177-2016',
      timelineEventIndex: 11, // Hito 12: Sentencia STC 177/2016 (2016)
      mapLocation: 'madrid',
      categoryEs: 'Jurisprudencia Constitucional • Competencias',
      categoryEn: 'Constitutional Jurisprudence • Jurisdictions',
      questionEs: '¿Qué resolvió el Tribunal Constitucional de España en la Sentencia STC 177/2016?',
      questionEn: 'What did the Spanish Constitutional Court decide in Judgment STC 177/2016?',
      options: [
        {
          id: 0,
          textEs: 'Prohibió definitivamente la tauromaquia en toda España.',
          textEn: 'It permanently banned bullfighting throughout Spain.'
        },
        {
          id: 1,
          textEs: 'Declaró la tauromaquia como derecho humano fundamental.',
          textEn: 'It declared bullfighting a fundamental human right.'
        },
        {
          id: 2,
          textEs: 'Anuló la prohibición de Cataluña, dictaminando que las competencias autonómicas de protección animal no pueden prohibir totalmente una tradición cultural reconocida por el Estado.',
          textEn: 'It overturned Catalonia’s ban, ruling that regional animal-protection powers could not completely prohibit a nationally recognized cultural tradition.'
        },
        {
          id: 3,
          textEs: 'Derogó la Ley estatal 18/2013.',
          textEn: 'It abolished Law 18/2013.'
        }
      ],
      correctIndex: 2,
      explanationEs: 'El Pleno del Tribunal Constitucional sentenció que las competencias autonómicas sobre espectáculos públicos o bienestar animal no pueden vaciar de contenido la competencia estatal para preservar el patrimonio cultural común protegido por la Ley 18/2013, declarando inconstitucional la prohibición absoluta.',
      explanationEn: 'The Constitutional Court Plenary ruled that regional powers over public events and animal welfare cannot extinguish a cultural tradition protected as common intangible heritage by state Law 18/2013, voiding Catalonia’s blanket ban.',
      sourceEs: 'Sentencia del Tribunal Constitucional STC 177/2016 (BOE-A-2016-11197, 20 Oct 2016)',
      sourceEn: 'Constitutional Court Judgment STC 177/2016 (BOE-A-2016-11197, Oct 20, 2016)'
    }
  ];

  // =========================================================================
  // 2. 🎯 ESTADO INTERNO DEL CUESTIONARIO
  // =========================================================================
  let currentLanguage = 'es';
  let currentView = 'intro'; // 'intro' | 'play' | 'results'
  let currentQuestionIndex = 0;
  let userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
  let isAnswerLocked = false;

  // Referencias a contenedores del DOM
  let quizContainerEl = null;

  // =========================================================================
  // 3. 🎨 TEXTOS BILINGÜES DE LA INTERFAZ
  // =========================================================================
  const UI_TEXTS = {
    badge: {
      es: 'Autoevaluación Histórica • 8 Preguntas',
      en: 'Historical Self-Assessment • 8 Questions'
    },
    mainTitle: {
      es: 'Cuestionario Histórico: El Legado del Toro',
      en: 'Historical Quiz: El Legado del Toro'
    },
    introLead: {
      es: 'Ponga a prueba sus conocimientos sobre las transformaciones jurídicas, estéticas y sociales de la tauromaquia a través de ocho preguntas extraídas de las fuentes primarias de nuestra cronología y mapa.',
      en: 'Test your understanding of the legal, aesthetic, and social transformations of tauromaquia through eight questions derived from our primary sources and historical map.'
    },
    introTopicsHeading: {
      es: 'Ejes temáticos evaluados:',
      en: 'Assessed thematic areas:'
    },
    topics: [
      {
        icon: '⚔️',
        es: 'Q1: Origen medieval: adiestramiento militar y ecuestre de los caballeros.',
        en: 'Q1: Medieval origins: military and equestrian training for knights.'
      },
      {
        icon: '⚖️',
        es: 'Q2: Las Siete Partidas (1265): infamia procesal por lidia remunerada.',
        en: 'Q2: Las Siete Partidas (1265): legal infamy for commercial fighting.'
      },
      {
        icon: '⛪',
        es: 'Q3: De Salute Gregis (1567): bula de Pío V y amenaza de excomunión.',
        en: 'Q3: De Salute Gregis (1567): Pope Pius V’s bull and excommunication threat.'
      },
      {
        icon: '🏛️',
        es: 'Q4: Siglo XVIII: transición del toreo ecuestre nobiliario a la lidia profesional a pie.',
        en: 'Q4: 18th century: transition from noble mounted jousts to professional foot lidia.'
      },
      {
        icon: '🎭',
        es: 'Q5: Juan Belmonte (1914): el canon de «parar, templar y mandar».',
        en: 'Q5: Juan Belmonte (1914): the canon of «parar, templar y mandar».'
      },
      {
        icon: '🥀',
        es: 'Q6: Tragedia de 1920: muerte de Joselito «El Gallo» en Talavera de la Reina.',
        en: 'Q6: 1920 Tragedy: death of Joselito “El Gallo” in Talavera de la Reina.'
      },
      {
        icon: '🗳️',
        es: 'Q7: Cataluña 2010: iniciativa ciudadana (ILP) y prohibición regional.',
        en: 'Q7: Catalonia 2010: citizen initiative (ILP) and regional ban.'
      },
      {
        icon: '⚖️',
        es: 'Q8: Tribunal Constitucional (STC 177/2016): anulación de la prohibición absoluta.',
        en: 'Q8: Constitutional Court (STC 177/2016): overturning the blanket regional ban.'
      }
    ],
    btnStart: {
      es: 'Comenzar Cuestionario ➔',
      en: 'Start Quiz ➔'
    },
    questionCounter: {
      es: (cur, total) => `Pregunta ${cur} de ${total}`,
      en: (cur, total) => `Question ${cur} of ${total}`
    },
    scoreLive: {
      es: (score, answered) => `Aciertos: ${score} / ${answered}`,
      en: (score, answered) => `Score: ${score} / ${answered}`
    },
    optionLabel: {
      es: (letter) => `Opción ${letter}`,
      en: (letter) => `Option ${letter}`
    },
    feedbackCorrect: {
      es: '✓ ¡Respuesta Correcta!',
      en: '✓ Correct Answer!'
    },
    feedbackIncorrect: {
      es: '✗ Respuesta Incorrecta',
      en: '✗ Incorrect Answer'
    },
    timelineRefPrefix: {
      es: 'Hito vinculado en la cronología:',
      en: 'Linked timeline milestone:'
    },
    sourcePrefix: {
      es: 'Fuente documental contrastada:',
      en: 'Verified primary source:'
    },
    btnNext: {
      es: 'Siguiente Pregunta ➔',
      en: 'Next Question ➔'
    },
    btnFinish: {
      es: 'Ver Resultados Finales ➔',
      en: 'View Final Results ➔'
    },
    resultsTitle: {
      es: 'Balance de la Autoevaluación',
      en: 'Self-Assessment Results'
    },
    scoreSummary: {
      es: (score, total, pct) => `Has acertado ${score} de ${total} preguntas (${pct}%)`,
      en: (score, total, pct) => `You answered ${score} out of ${total} correctly (${pct}%)`
    },
    performanceTiers: [
      {
        minScore: 7,
        badgeEs: '🏆 Dominio Historiográfico Sobresaliente',
        badgeEn: '🏆 Outstanding Historical Mastery',
        msgEs: '¡Magno rigor! Demuestras una comprensión profunda y exhaustiva del marco legal, la evolución estética y los complejos debates constitucionales de la tauromaquia.',
        msgEn: 'Exceptional rigor! You demonstrate a profound and exhaustive grasp of the legal framework, aesthetic evolution, and complex constitutional debates of tauromaquia.'
      },
      {
        minScore: 4,
        badgeEs: '🎖️ Conocimiento Histórico Sólido',
        badgeEn: '🎖️ Solid Historical Understanding',
        msgEs: '¡Muy buen trabajo! Has asimilado los principales hitos y controversias documentadas en la revista, distinguiendo con claridad las fuentes históricas.',
        msgEn: 'Great job! You have assimilated the major milestones and documented controversies in our digital magazine, clearly distinguishing historical sources.'
      },
      {
        minScore: 0,
        badgeEs: '📖 Recorrido en Aprendizaje',
        badgeEn: '📖 Developing Knowledge',
        msgEs: 'Has completado la autoevaluación. Te animamos a revisar con mayor detalle las cédulas documentales de la cronología y las sedes del mapa interactivo.',
        msgEn: 'You have completed the self-assessment. We encourage you to revisit the documentary records in the timeline and interactive map for deeper insights.'
      }
    ],
    reviewHeading: {
      es: 'Revisión Detallada de Preguntas y Respuestas:',
      en: 'Detailed Review of Questions & Answers:'
    },
    userSelection: {
      es: 'Tu respuesta:',
      en: 'Your answer:'
    },
    correctSelection: {
      es: 'Respuesta canónica correcta:',
      en: 'Correct canonical answer:'
    },
    btnRetry: {
      es: '↺ Reiniciar Cuestionario',
      en: '↺ Retake Quiz'
    },
    btnJumpTimeline: {
      es: '⏱️ Volver a la Cronología',
      en: '⏱️ Return to Timeline'
    },
    btnJumpMap: {
      es: '🗺️ Explorar Mapa de Sedes',
      en: '🗺️ Explore Historical Map'
    },
    btnReturnHall: {
      es: '🏛️ Volver al Gran Vestíbulo',
      en: '🏛️ Return to Central Hall'
    },
    inquiryLabel: {
      es: (cur, total) => `CUESTIÓN ${cur}/${total}`,
      en: (cur, total) => `INQUIRY ${cur}/${total}`
    }
  };

  // =========================================================================
  // 4. 🚀 RENDERIZADO DE LAS TRES VISTAS DEL CUESTIONARIO
  // =========================================================================

  function renderQuiz() {
    if (!quizContainerEl) return;
    const isEn = currentLanguage === 'en';

    if (currentView === 'intro') {
      renderIntroView(isEn);
    } else if (currentView === 'play') {
      renderPlayView(isEn);
    } else if (currentView === 'results') {
      renderResultsView(isEn);
    }
  }

  // -------------------------------------------------------------------------
  // 4A. VISTA DE INTRODUCCIÓN
  // -------------------------------------------------------------------------
  function renderIntroView(isEn) {
    const texts = UI_TEXTS;

    quizContainerEl.innerHTML = `
      <div class="hist-quiz-card hist-quiz-intro-card" role="region" aria-label="${isEn ? 'Quiz introduction' : 'Introducción del cuestionario'}">
        <div class="hist-quiz-header-banner">
          <span class="hist-quiz-category-badge">${isEn ? texts.badge.en : texts.badge.es}</span>
          <h2 class="hist-quiz-main-heading" id="hist-quiz-main-heading">
            <span class="hist-quiz-heading-icon" aria-hidden="true">📜</span>
            <span>${isEn ? texts.mainTitle.en : texts.mainTitle.es}</span>
          </h2>
          <p class="hist-quiz-intro-lead">
            ${isEn ? texts.introLead.en : texts.introLead.es}
          </p>
        </div>

        <div class="hist-quiz-intro-topics-wrap">
          <h3 class="hist-quiz-topics-subheading">${isEn ? texts.introTopicsHeading.en : texts.introTopicsHeading.es}</h3>
          <ul class="hist-quiz-topics-list">
            ${texts.topics.map(t => `
              <li class="hist-quiz-topic-item">
                <span class="hist-quiz-topic-icon" aria-hidden="true">${t.icon}</span>
                <span>${isEn ? t.en : t.es}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="hist-quiz-intro-footer">
          <div class="hist-quiz-intro-meta" aria-hidden="true">
            <span class="hist-quiz-meta-pill">⏱️ ~4 min</span>
            <span class="hist-quiz-meta-pill">🎯 ${QUIZ_QUESTIONS.length} ${isEn ? 'Inquiries' : 'Preguntas'}</span>
            <span class="hist-quiz-meta-pill">🏛️ ${isEn ? 'Primary Sources' : 'Fuentes BOE / BNE'}</span>
          </div>

          <button type="button" class="hist-quiz-btn-primary" id="hist-quiz-btn-start" aria-label="${isEn ? 'Start historical quiz' : 'Comenzar cuestionario histórico'}">
            <span>${isEn ? texts.btnStart.en : texts.btnStart.es}</span>
          </button>
        </div>
      </div>
    `;

    const startBtn = document.getElementById('hist-quiz-btn-start');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        startQuiz();
      });
    }
  }

  // -------------------------------------------------------------------------
  // 4B. VISTA DE PREGUNTA ACTIVA
  // -------------------------------------------------------------------------
  function renderPlayView(isEn) {
    const texts = UI_TEXTS;
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const totalQuestions = QUIZ_QUESTIONS.length;
    const currentNumber = currentQuestionIndex + 1;
    const progressPercent = Math.round((currentNumber / totalQuestions) * 100);

    const answeredCount = userAnswers.filter(a => a !== null).length;
    const currentScore = userAnswers.reduce((acc, ans, idx) => {
      return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
    }, 0);

    const currentSelection = userAnswers[currentQuestionIndex];
    const isAnswered = currentSelection !== null;
    const isCorrect = isAnswered && currentSelection === q.correctIndex;

    const letters = ['A', 'B', 'C', 'D'];

    quizContainerEl.innerHTML = `
      <div class="hist-quiz-card hist-quiz-play-card" role="region" aria-labelledby="hist-quiz-q-title">
        
        <!-- Barra de progreso superior -->
        <div class="hist-quiz-topbar">
          <div class="hist-quiz-progress-info">
            <span class="hist-quiz-step-count" id="hist-quiz-step-count">
              ${texts.questionCounter[isEn ? 'en' : 'es'](currentNumber, totalQuestions)}
            </span>
            <span class="hist-quiz-score-badge" aria-live="polite">
              ${texts.scoreLive[isEn ? 'en' : 'es'](currentScore, answeredCount)}
            </span>
          </div>

          <!-- Barra de progreso visual -->
          <div class="hist-quiz-progress-bar-wrap" role="progressbar" 
               aria-valuenow="${currentNumber}" aria-valuemin="1" aria-valuemax="${totalQuestions}" 
               aria-label="${isEn ? 'Quiz progress' : 'Progreso del cuestionario'}"
               style="--quiz-progress: ${progressPercent}%;">
            <div class="hist-quiz-progress-bar-fill"></div>
          </div>

          <!-- Indicadores circulares (8 dots) -->
          <div class="hist-quiz-dots-wrap" aria-hidden="true">
            ${QUIZ_QUESTIONS.map((item, idx) => {
              let dotClass = '';
              if (idx < currentQuestionIndex) {
                dotClass = userAnswers[idx] === item.correctIndex ? 'hist-dot-correct' : 'hist-dot-incorrect';
              } else if (idx === currentQuestionIndex) {
                dotClass = 'hist-dot-active';
              }
              return `<span class="hist-quiz-step-dot ${dotClass}"></span>`;
            }).join('')}
          </div>
        </div>

        <!-- Encabezado de la pregunta -->
        <div class="hist-quiz-q-header">
          <div class="hist-card-museum-tag" style="margin-bottom: 0.55rem;">
            <span class="hist-tag-room">🏛️ SALA IV</span>
            <span class="hist-tag-divider" aria-hidden="true">•</span>
            <span class="hist-tag-stop">${texts.inquiryLabel[isEn ? 'en' : 'es'](currentNumber, totalQuestions)}</span>
          </div>
          <span class="hist-quiz-q-category">
            ${isEn ? q.categoryEn : q.categoryEs}
          </span>
          <h3 class="hist-quiz-q-title" id="hist-quiz-q-title">
            ${isEn ? q.questionEn : q.questionEs}
          </h3>
        </div>

        <!-- Grupo de 4 opciones -->
        <div class="hist-quiz-options-group" role="group" aria-label="${isEn ? 'Answer choices' : 'Opciones de respuesta'}">
          ${q.options.map((opt, optIdx) => {
            const letter = letters[optIdx];
            let optionStateClass = '';
            let statusIcon = '';
            let ariaPressed = 'false';

            if (isAnswered) {
              if (optIdx === q.correctIndex) {
                optionStateClass = 'hist-option-correct';
                statusIcon = '<span class="hist-option-status-icon hist-status-correct" aria-hidden="true">✓</span>';
              } else if (optIdx === currentSelection) {
                optionStateClass = 'hist-option-incorrect';
                statusIcon = '<span class="hist-option-status-icon hist-status-incorrect" aria-hidden="true">✗</span>';
              } else {
                optionStateClass = 'hist-option-dimmed';
              }
              if (optIdx === currentSelection) {
                ariaPressed = 'true';
              }
            }

            return `
              <button type="button" 
                      class="hist-quiz-option-btn ${optionStateClass}" 
                      id="hist-quiz-opt-${optIdx}"
                      data-option-index="${optIdx}"
                      role="button"
                      ${isAnswered ? 'disabled' : ''}
                      aria-pressed="${ariaPressed}"
                      aria-label="${letter}: ${isEn ? opt.textEn : opt.textEs}">
                <span class="hist-option-letter" aria-hidden="true">${letter}</span>
                <span class="hist-option-text">${isEn ? opt.textEn : opt.textEs}</span>
                ${statusIcon}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Panel de Feedback Inmediato (Revelado tras seleccionar opción) -->
        <div class="hist-quiz-feedback-box ${isAnswered ? 'hist-feedback-visible' : ''} ${isCorrect ? 'hist-feedback-success' : 'hist-feedback-error'}" 
             id="hist-quiz-feedback-box" 
             aria-live="polite" 
             ${isAnswered ? '' : 'aria-hidden="true"'}>
          ${isAnswered ? `
            <div class="hist-feedback-header">
              <span class="hist-feedback-title">
                ${isCorrect ? (isEn ? texts.feedbackCorrect.en : texts.feedbackCorrect.es) : (isEn ? texts.feedbackIncorrect.en : texts.feedbackIncorrect.es)}
              </span>
              <div class="hist-feedback-links-row" style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
                <a href="sala-1-cronologia.html?lang=${currentLanguage}&event=${q.timelineEventIndex + 1}" 
                   class="hist-feedback-h-link hist-milestone-jump-link" 
                   data-timeline-event="${q.timelineEventIndex + 1}"
                   style="text-decoration: underline; cursor: pointer;">
                  ⏱️ ${isEn ? texts.timelineRefPrefix.en : texts.timelineRefPrefix.es} 
                  <strong>Hito ${q.timelineEventIndex + 1} ↗</strong>
                </a>
                ${q.mapLocation ? `
                  <a href="sala-2-cartografia.html?lang=${currentLanguage}&location=${q.mapLocation}" 
                     class="hist-feedback-map-link hist-map-jump-link" 
                     data-map-location="${q.mapLocation}"
                     style="text-decoration: underline; cursor: pointer; font-size: 0.8rem; color: var(--color-gold-light, #f3d068);">
                    🗺️ ${isEn ? 'Map: ' + q.mapLocation.toUpperCase() : 'Mapa: ' + q.mapLocation.toUpperCase()} ↗
                  </a>
                ` : ''}
              </div>
            </div>

            <p class="hist-feedback-explanation">
              ${isEn ? q.explanationEn : q.explanationEs}
            </p>

            <div class="hist-feedback-source">
              <span class="hist-feedback-source-tag">📜 ${isEn ? texts.sourcePrefix.en : texts.sourcePrefix.es}</span>
              <span class="hist-feedback-source-text">«${isEn ? q.sourceEn : q.sourceEs}»</span>
            </div>
          ` : ''}
        </div>

        <!-- Barra de pie con botón siguiente -->
        <div class="hist-quiz-action-footer">
          ${isAnswered ? `
            <button type="button" 
                    class="hist-quiz-btn-primary hist-btn-next-step" 
                    id="hist-quiz-btn-next" 
                    aria-label="${currentNumber === totalQuestions ? (isEn ? texts.btnFinish.en : texts.btnFinish.es) : (isEn ? texts.btnNext.en : texts.btnNext.es)}">
              <span>${currentNumber === totalQuestions ? (isEn ? texts.btnFinish.en : texts.btnFinish.es) : (isEn ? texts.btnNext.en : texts.btnNext.es)}</span>
            </button>
          ` : `
            <p class="hist-quiz-hint-text">
              <span aria-hidden="true">💡</span>
              <span>${isEn ? 'Select an answer to reveal the documentary verification.' : 'Selecciona una respuesta para contrastar con la documentación histórica.'}</span>
            </p>
          `}
        </div>

      </div>
    `;

    // Asignar listeners
    if (!isAnswered) {
      const optionButtons = quizContainerEl.querySelectorAll('.hist-quiz-option-btn');
      optionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const optIdx = parseInt(btn.getAttribute('data-option-index'), 10);
          if (!isNaN(optIdx)) {
            selectOption(optIdx);
          }
        });
      });
    } else {
      const nextBtn = document.getElementById('hist-quiz-btn-next');
      if (nextBtn) {
        nextBtn.focus();
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          nextQuestion();
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // 4C. VISTA DE RESULTADOS Y REVISIÓN CANÓNICA
  // -------------------------------------------------------------------------
  function renderResultsView(isEn) {
    const texts = UI_TEXTS;
    const totalQuestions = QUIZ_QUESTIONS.length;
    const finalScore = userAnswers.reduce((acc, ans, idx) => {
      return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    // Determinar nivel de logro
    let tier = texts.performanceTiers[2];
    for (const t of texts.performanceTiers) {
      if (finalScore >= t.minScore) {
        tier = t;
        break;
      }
    }

    const letters = ['A', 'B', 'C', 'D'];

    quizContainerEl.innerHTML = `
      <div class="hist-quiz-card hist-quiz-results-card" role="region" aria-labelledby="hist-quiz-results-heading">
        
        <!-- Cabecera de resultados -->
        <div class="hist-results-summary-box">
          <span class="hist-results-badge">${isEn ? tier.badgeEn : tier.badgeEs}</span>
          
          <h2 class="hist-results-heading" id="hist-quiz-results-heading">
            ${isEn ? texts.resultsTitle.en : texts.resultsTitle.es}
          </h2>

          <div class="hist-results-score-circle" aria-label="${isEn ? `Final score: ${finalScore} out of ${totalQuestions}` : `Puntuación final: ${finalScore} de ${totalQuestions}`}">
            <div class="hist-score-number">${finalScore} <span class="hist-score-total">/ ${totalQuestions}</span></div>
            <div class="hist-score-pct">${percentage}%</div>
          </div>

          <p class="hist-results-lead-desc">
            ${texts.scoreSummary[isEn ? 'en' : 'es'](finalScore, totalQuestions, percentage)}
          </p>

          <p class="hist-results-eval-msg">
            ${isEn ? tier.msgEn : tier.msgEs}
          </p>
        </div>

        <!-- Revisión de las 5 preguntas -->
        <div class="hist-quiz-review-section">
          <h3 class="hist-review-subheading">
            <span aria-hidden="true">📋</span>
            <span>${isEn ? texts.reviewHeading.en : texts.reviewHeading.es}</span>
          </h3>

          <div class="hist-review-list">
            ${QUIZ_QUESTIONS.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.correctIndex;
              const userOptText = uAns !== null ? (isEn ? q.options[uAns].textEn : q.options[uAns].textEs) : '—';
              const correctOptText = isEn ? q.options[q.correctIndex].textEn : q.options[q.correctIndex].textEs;

              return `
                <article class="hist-review-item ${isCorrect ? 'hist-review-correct' : 'hist-review-wrong'}">
                  <div class="hist-review-item-header">
                    <span class="hist-review-status-pill ${isCorrect ? 'pill-correct' : 'pill-wrong'}">
                      ${isCorrect ? (isEn ? '✓ Correct' : '✓ Correcto') : (isEn ? '✗ Incorrect' : '✗ Incorrecto')}
                    </span>
                    <span class="hist-review-q-num">${isEn ? `Question ${idx + 1}` : `Pregunta ${idx + 1}`}</span>
                    <div class="hist-review-links-row" style="margin-left: auto; display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
                      <a href="sala-1-cronologia.html?lang=${currentLanguage}&event=${q.timelineEventIndex + 1}" 
                         class="hist-review-h-ref hist-milestone-jump-link" 
                         data-timeline-event="${q.timelineEventIndex + 1}"
                         style="text-decoration: underline; cursor: pointer;">
                        ⏱️ Hito ${q.timelineEventIndex + 1} ↗
                      </a>
                      ${q.mapLocation ? `
                        <a href="sala-2-cartografia.html?lang=${currentLanguage}&location=${q.mapLocation}" 
                           class="hist-review-map-ref hist-map-jump-link" 
                           data-map-location="${q.mapLocation}"
                           style="text-decoration: underline; cursor: pointer; font-size: 0.75rem; color: var(--color-gold-light, #f3d068);">
                          🗺️ ${q.mapLocation.toUpperCase()} ↗
                        </a>
                      ` : ''}
                    </div>
                  </div>

                  <h4 class="hist-review-q-title">${isEn ? q.questionEn : q.questionEs}</h4>

                  <div class="hist-review-answers-box">
                    <div class="hist-review-ans-row ${isCorrect ? 'text-correct' : 'text-wrong'}">
                      <strong>${isEn ? texts.userSelection.en : texts.userSelection.es}</strong>
                      <span>${userOptText}</span>
                    </div>

                    ${!isCorrect ? `
                      <div class="hist-review-ans-row text-canonical">
                        <strong>${isEn ? texts.correctSelection.en : texts.correctSelection.es}</strong>
                        <span>(${letters[q.correctIndex]}) ${correctOptText}</span>
                      </div>
                    ` : ''}
                  </div>

                  <p class="hist-review-explanation">
                    <strong>💡 ${isEn ? 'Historical Record:' : 'Cédula Histórica:'}</strong>
                    ${isEn ? q.explanationEn : q.explanationEs}
                  </p>
                </article>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Acciones finales -->
        <div class="hist-results-actions-toolbar">
          <button type="button" class="hist-quiz-btn-primary" id="hist-quiz-btn-retry">
            <span>${isEn ? texts.btnRetry.en : texts.btnRetry.es}</span>
          </button>

          <button type="button" class="hist-quiz-btn-secondary" id="hist-quiz-btn-timeline">
            <span>${isEn ? texts.btnJumpTimeline.en : texts.btnJumpTimeline.es}</span>
          </button>

          <button type="button" class="hist-quiz-btn-secondary" id="hist-quiz-btn-map">
            <span>${isEn ? texts.btnJumpMap.en : texts.btnJumpMap.es}</span>
          </button>

          <a href="#hist-museum-exterior" class="hist-quiz-btn-secondary hist-btn-room-return-hall" id="hist-quiz-btn-hall" aria-label="${isEn ? 'Return to Central Hall' : 'Volver al Gran Vestíbulo Central'}">
            <span>${isEn ? texts.btnReturnHall.en : texts.btnReturnHall.es}</span>
          </a>
        </div>

      </div>
    `;

    // Asignar listeners de acciones finales
    const retryBtn = document.getElementById('hist-quiz-btn-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetQuiz();
      });
    }

    const timelineBtn = document.getElementById('hist-quiz-btn-timeline');
    if (timelineBtn) {
      timelineBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLanguage);
      });
    }

    const mapBtn = document.getElementById('hist-quiz-btn-map');
    if (mapBtn) {
      mapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'sala-2-cartografia.html?lang=' + encodeURIComponent(currentLanguage);
      });
    }

    const hallBtn = document.getElementById('hist-quiz-btn-hall');
    if (hallBtn) {
      hallBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html?lang=' + encodeURIComponent(currentLanguage) + '#hall';
      });
    }
  }

  // =========================================================================
  // 5. 🕹️ MÉTODOS DE CONTROL Y FLUJO DE INTERACCIÓN
  // =========================================================================

  function startQuiz() {
    currentView = 'play';
    currentQuestionIndex = 0;
    userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    isAnswerLocked = false;
    renderQuiz();

    // Llevar foco a la primera opción
    setTimeout(() => {
      const firstOpt = document.getElementById('hist-quiz-opt-0');
      if (firstOpt) firstOpt.focus();
    }, 80);
  }

  function selectOption(optionIndex) {
    if (isAnswerLocked || userAnswers[currentQuestionIndex] !== null) return;

    userAnswers[currentQuestionIndex] = optionIndex;
    isAnswerLocked = true;

    // Re-renderizar pregunta para mostrar feedback y deshabilitar opciones
    renderQuiz();

    // Enfocar botón siguiente tras responder para accesibilidad fluida con teclado
    setTimeout(() => {
      const nextBtn = document.getElementById('hist-quiz-btn-next');
      if (nextBtn) nextBtn.focus();
    }, 60);
  }

  function nextQuestion() {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      currentQuestionIndex++;
      isAnswerLocked = false;
      renderQuiz();

      // Enfocar primera opción de la nueva pregunta
      setTimeout(() => {
        const firstOpt = document.getElementById('hist-quiz-opt-0');
        if (firstOpt) firstOpt.focus();
      }, 60);
    } else {
      // Fin del cuestionario -> Mostrar resultados
      currentView = 'results';
      renderQuiz();

      // Desplazar suavemente a la cabecera de resultados si es necesario
      if (quizContainerEl) {
        quizContainerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  function resetQuiz() {
    currentView = 'intro';
    currentQuestionIndex = 0;
    userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    isAnswerLocked = false;
    renderQuiz();

    // Enfocar botón de inicio
    setTimeout(() => {
      const startBtn = document.getElementById('hist-quiz-btn-start');
      if (startBtn) startBtn.focus();
    }, 60);
  }

  function setLanguage(lang) {
    currentLanguage = lang === 'en' ? 'en' : 'es';
    renderQuiz();
  }

  // =========================================================================
  // 6. 🔌 INICIALIZACIÓN Y VINCULACIÓN CON LA PÁGINA
  // =========================================================================
  function initQuiz() {
    quizContainerEl = document.getElementById('hist-quiz-container');

    if (!quizContainerEl) {
      // Si el contenedor específico no existe todavía, buscar la sección general
      const quizSection = document.getElementById('hist-quiz-section');
      if (quizSection) {
        // Envolver o inyectar contenedor
        let container = quizSection.querySelector('.site-container');
        if (!container) {
          container = document.createElement('div');
          container.className = 'site-container';
          quizSection.appendChild(container);
        }
        let appDiv = document.getElementById('hist-quiz-container');
        if (!appDiv) {
          appDiv = document.createElement('div');
          appDiv.id = 'hist-quiz-container';
          appDiv.className = 'hist-quiz-container';
          container.appendChild(appDiv);
        }
        quizContainerEl = appDiv;
      }
    }

    if (!quizContainerEl) return;

    // Obtener idioma activo desde URL si está presente
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'en' || urlLang === 'es') {
        currentLanguage = urlLang;
      }
    } catch (e) {}

    // Obtener idioma activo de la cronología si está disponible
    if (window.historiaJourney && typeof window.historiaJourney.getLanguage === 'function') {
      currentLanguage = window.historiaJourney.getLanguage();
    } else if (window.historiaMap && typeof window.historiaMap.getLanguage === 'function') {
      currentLanguage = window.historiaMap.getLanguage();
    }

    // Escuchar sincronización bilingüe de la cabecera / cronología
    window.addEventListener('historiaLanguageChange', (e) => {
      if (e.detail && e.detail.lang) {
        setLanguage(e.detail.lang);
      }
    });

    // Renderizar vista inicial
    renderQuiz();

    // Exponer API pública en window.historiaQuiz
    window.historiaQuiz = {
      startQuiz: startQuiz,
      selectOption: selectOption,
      nextQuestion: nextQuestion,
      resetQuiz: resetQuiz,
      setLanguage: setLanguage,
      getLanguage: () => currentLanguage,
      getQuestions: () => QUIZ_QUESTIONS,
      getState: () => ({
        view: currentView,
        questionIndex: currentQuestionIndex,
        userAnswers: [...userAnswers],
        isLocked: isAnswerLocked,
        score: userAnswers.reduce((acc, ans, idx) => ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc, 0)
      })
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
  } else {
    initQuiz();
  }
})();
