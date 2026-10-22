/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/map.js
 * 
 * FASE 5: MAPA HISTÓRICO INTERACTIVO (GEOGRAFÍA DE LA TAUROMAQUIA)
 * Cartografía Geográfica Real (Natural Earth 1:50m - Dominio Público)
 * Proyección matemática equirectangular conforme con estándar paralelo a 39.5° N.
 * 
 * Correcciones de estabilidad interactiva:
 * - Separación estricta entre hitbox de interacción y capas visuales decorativas.
 * - Hitbox invisible fija de radio constante (pointer-events: all).
 * - Elementos decorativos (pulsos, auras, glifos, etiquetas) con pointer-events: none.
 * - Sin transforms de escala en hover sobre el contenedor SVG, eliminando
 *   totalmente la vibración o fluctuación de eventos de puntero.
 * - 7 sedes históricas verificadas con coordenadas matemáticas exactas.
 * ==========================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. 🌐 PARÁMETROS MATEMÁTICOS DE PROYECCIÓN CARTOGRÁFICA
  // =========================================================================
  const PROJECTION = {
    mainland: { lonMin: -9.8, lonMax: 4.6, latMin: 35.7, latMax: 44.1, cosLat: 0.77162458338772, scale: 60.00000000000001, xOffset: 156.65817997650493, yOffset: 45.5 },
    canary: { lonMin: -18.3, lonMax: -13.2, latMin: 27.5, latMax: 29.4, cosLat: 0.880477353509162, scale: 43.64833734320424, xOffset: 47.0, yOffset: 491.534079523956 },
    project: function (lon, lat, isCanary) {
      if (isCanary) {
        var p = this.canary;
        var x = p.xOffset + (lon - p.lonMin) * p.cosLat * p.scale;
        var y = p.yOffset + (p.latMax - lat) * p.scale;
        return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
      } else {
        var m = this.mainland;
        var x = m.xOffset + (lon - m.lonMin) * m.cosLat * m.scale;
        var y = m.yOffset + (m.latMax - lat) * m.scale;
        return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
      }
    }
  };

  // =========================================================================
  // 2. 📍 DATOS DE LAS 7 SEDES HISTÓRICAS VERIFICADAS
  // =========================================================================
  const HISTORICAL_LOCATIONS = [
    {
      id: 'ronda',
      coordinates: { lat: 36.7462, lng: -5.1612 },
      isInset: false,
      svgPos: PROJECTION.project(-5.1612, 36.7462, false),
      labelOffsetY: 16,
      cityEs: "Ronda",
      cityEn: "Ronda",
      regionEs: "M\u00e1laga, Andaluc\u00eda",
      regionEn: "M\u00e1laga, Andalusia",
      eraEs: "1785 \u2022 Ilustraci\u00f3n",
      eraEn: "1785 \u2022 Enlightenment",
      titleEs: "Real Maestranza de Caballer\u00eda de Ronda",
      titleEn: "Real Maestranza of Cavalry of Ronda",
      category: 'fundacional',
      summaryEs: "Cuna can\u00f3nica del toreo moderno a pie. Su plaza de toros monumental, inaugurada en mayo de 1785 bajo el mecenazgo de la Real Maestranza (fundada por Felipe II en 1572), consagr\u00f3 la dinast\u00eda de los Romero (Pedro Romero), fijando las reglas de la lidia a pie frente a la tradici\u00f3n ecuestre aristocr\u00e1tica.",
      summaryEn: "Canonical cradle of modern bullfighting on foot. Its monumental bullring, inaugurated in May 1785 under the patronage of the Real Maestranza (founded by Philip II in 1572), established the Romero dynasty (Pedro Romero), defining the rules of foot-based lidia against aristocratic equestrian tradition.",
      image: 'assets/timeline/05-maestranza-de-ronda.png',
      imageCaptionEs: "Plaza de toros de la Real Maestranza de Caballer\u00eda de Ronda (inaugurada en mayo de 1785).",
      imageCaptionEn: "Bullring of the Real Maestranza of Cavalry of Ronda (inaugurated in May 1785).",
      timelineEventIndex: 4,
      eventTitleEs: "Hito 5: Inauguraci\u00f3n de la Real Maestranza de Ronda (1785)",
      eventTitleEn: "Event 5: Inauguration of the Real Maestranza of Ronda (1785)",
      sources: [{"title": "Libro de Actas de la Real Maestranza de Caballer\u00eda de Ronda (mayo 1785)", "repo": "Archivo RMC Ronda / BNE Digital", "url": "https://bdh.bne.es/bnesearch/detalle/bdh0000038848"}]
    },
    {
      id: 'sevilla',
      coordinates: { lat: 37.3861, lng: -5.9924 },
      isInset: false,
      svgPos: PROJECTION.project(-5.9924, 37.3861, false),
      labelOffsetY: -14,
      cityEs: "Sevilla",
      cityEn: "Seville",
      regionEs: "Sevilla, Andaluc\u00eda",
      regionEn: "Seville, Andalusia",
      eraEs: "Siglos XVIII\u2013XX (1700s\u20131914)",
      eraEn: "18th\u201320th Centuries (1700s\u20131914)",
      titleEs: "Real Maestranza de Sevilla & Arrabal de Triana",
      titleEn: "Real Maestranza of Seville & Triana District",
      category: 'escuelas',
      summaryEs: "Epicentro de la escuela taurina sevillana caracterizada por la gracia, el ritmo pl\u00e1stico y el temple. En el arrabal alfarero de Triana se cri\u00f3 Juan Belmonte, quien en 1914 consum\u00f3 la revoluci\u00f3n est\u00e9tica que suprimi\u00f3 el toreo de piernas y evasi\u00f3n para imponer la quietud geom\u00e9trica frente a las astas.",
      summaryEn: "Epicenter of the Seville school of bullfighting, characterized by grace, rhythm (temple), and sculptural stillness. In the potters' quarter of Triana, Juan Belmonte forged his 1914 aesthetic revolution, eliminating evasive footwork to establish geometric stillness in front of the horns.",
      image: 'assets/timeline/07-belmonte-temple-estetico.png',
      imageCaptionEs: "Juan Belmonte citando en corto con temple y quietud en el arrabal sevillano.",
      imageCaptionEn: "Juan Belmonte citing close with stillness and aesthetic control.",
      timelineEventIndex: 6,
      eventTitleEs: "Hito 7: La revoluci\u00f3n del temple est\u00e9tico de Juan Belmonte (Princ. S. XX)",
      eventTitleEn: "Event 7: The aesthetic revolution of Juan Belmonte (Early 20th C.)",
      sources: [{"title": "Manuel Chaves Nogales: \u00abJuan Belmonte, matador de toros\u00bb (1934)", "repo": "Alianza Editorial / Hemeroteca de Sevilla", "url": "https://www.worldcat.org/title/juan-belmonte-matador-de-toros-su-vida-y-sus-hazanas/oclc/828279815"}]
    },
    {
      id: 'talavera',
      coordinates: { lat: 39.9635, lng: -4.8308 },
      isInset: false,
      svgPos: PROJECTION.project(-4.8308, 39.9635, false),
      labelOffsetY: -14,
      cityEs: "Talavera de la Reina",
      cityEn: "Talavera de la Reina",
      regionEs: "Toledo, Castilla-La Mancha",
      regionEn: "Toledo, Castile-La Mancha",
      eraEs: "16 de mayo de 1920 \u2022 Edad de Oro",
      eraEn: "May 16, 1920 \u2022 Golden Age",
      titleEs: "Plaza de Toros de La Caprichosa",
      titleEn: "La Caprichosa Bullring",
      category: 'tragedias',
      summaryEs: "Escenario de la muerte en el ruedo de Jos\u00e9 G\u00f3mez Ortega \u00abJoselito el Gallo\u00bb, considerado el diestro m\u00e1s completo y consumado de la tauromaquia cl\u00e1sica. Su fallecimiento a los 25 a\u00f1os por la cornada del toro \u00abBailador\u00bb caus\u00f3 un duelo nacional y sell\u00f3 el fin mitol\u00f3gico de la Edad de Oro.",
      summaryEn: "Scene of the death in the ring of Jos\u00e9 G\u00f3mez Ortega \u00abJoselito el Gallo\u00bb, widely considered the most technically consummate matador in history. His death at age 25 from the goring of the bull \u00abBailador\u00bb triggered national mourning and marked the legendary end of the Golden Age.",
      image: 'assets/timeline/08-muerte-joselito-el-gallo.png',
      imageCaptionEs: "Enfermer\u00eda de la plaza de toros de Talavera de la Reina tras la cornada fatal (16/05/1920).",
      imageCaptionEn: "Infirmary of Talavera de la Reina bullring after the fatal goring (16/05/1920).",
      timelineEventIndex: 7,
      eventTitleEs: "Hito 8: Muerte de Joselito el Gallo en Talavera de la Reina (16 Mayo 1920)",
      eventTitleEn: "Event 8: Death of Joselito el Gallo in Talavera de la Reina (May 16, 1920)",
      sources: [{"title": "Certificaci\u00f3n facultativa de defunci\u00f3n (16 Mayo 1920) y cr\u00f3nicas de ABC y El Sol", "repo": "Archivo Municipal de Talavera / Hemeroteca Digital BNE", "url": "https://hemerotecadigital.bne.es"}]
    },
    {
      id: 'madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 },
      isInset: false,
      svgPos: PROJECTION.project(-3.7038, 40.4168, false),
      labelOffsetY: -14,
      cityEs: "Madrid",
      cityEn: "Madrid",
      regionEs: "Comunidad de Madrid",
      regionEn: "Community of Madrid",
      eraEs: "1785 \u2013 2016 \u2022 Ilustraci\u00f3n y Democracia",
      eraEn: "1785 \u2013 2016 \u2022 Enlightenment & Democracy",
      titleEs: "Sede de la Corona, Cortes Generales y Tribunal Constitucional",
      titleEn: "Seat of the Crown, Parliament & Constitutional Court",
      category: 'legal',
      summaryEs: "Centro neur\u00e1lgico del debate legislativo e institucional espa\u00f1ol. Desde el Consejo de Castilla de Carlos III (Real Pragm\u00e1tica de 1785) hasta las Cortes Generales (Ley 18/2013 regulando la tauromaquia como patrimonio cultural) y el Tribunal Constitucional (Sentencia STC 177/2016), Madrid ha sido la sede donde se defini\u00f3 el marco jur\u00eddico del espect\u00e1culo.",
      summaryEn: "Nerve center of Spanish legislative and constitutional debates. From Carlos III's Council of Castile (1785 Pragmatic Sanction) to the Spanish Parliament (Law 18/2013 declaring bullfighting cultural heritage) and the Constitutional Court (Judgment STC 177/2016), Madrid was the forum establishing the legal status of tauromaquia.",
      image: 'assets/timeline/12-sentencia-tc-177-2016.png',
      imageCaptionEs: "Pleno del Tribunal Constitucional en Madrid, sede de la Sentencia STC 177/2016.",
      imageCaptionEn: "Plenary of the Spanish Constitutional Court in Madrid, seat of Judgment STC 177/2016.",
      timelineEventIndex: 11,
      eventTitleEs: "Hito 12: Sentencia STC 177/2016 del Tribunal Constitucional (20 Oct 2016)",
      eventTitleEn: "Event 12: Judgment STC 177/2016 of the Constitutional Court (Oct 20, 2016)",
      sources: [{"title": "Sentencia del Tribunal Constitucional STC 177/2016 (BOE-A-2016-11197)", "repo": "Tribunal Constitucional de Espa\u00f1a / BOE", "url": "https://hj.tribunalconstitucional.es/es/Resolucion/Show/25134"}]
    },
    {
      id: 'barcelona',
      coordinates: { lat: 41.3879, lng: 2.1699 },
      isInset: false,
      svgPos: PROJECTION.project(2.1699, 41.3879, false),
      labelOffsetY: -14,
      cityEs: "Barcelona",
      cityEn: "Barcelona",
      regionEs: "Barcelon\u00e8s, Catalu\u00f1a",
      regionEn: "Barcelon\u00e8s, Catalonia",
      eraEs: "2010 (vigor 2012) \u2022 Debate Auton\u00f3mico",
      eraEn: "2010 (effective 2012) \u2022 Regional Debate",
      titleEs: "Parlament de Catalunya & Plaza Monumental",
      titleEn: "Parliament of Catalonia & Monumental Bullring",
      category: 'legal',
      summaryEs: "Sede de la hist\u00f3rica votaci\u00f3n del Parlament del 28 de julio de 2010 que aprob\u00f3 la Ley 28/2010 prohibiendo las corridas de toros en Catalu\u00f1a a ra\u00edz de la ILP ciudadana \u00abProu!\u00bb. La plaza Monumental de Barcelona celebr\u00f3 su \u00faltima corrida en septiembre de 2011, convirti\u00e9ndose en el epicentro del choque entre proteccionismo animal y competencias culturales del Estado.",
      summaryEn: "Seat of the historic parliamentary vote of July 28, 2010 passing Law 28/2010 banning bullfights in Catalonia following the \u00abProu!\u00bb citizen initiative. Barcelona's Monumental bullring held its last corrida in September 2011, becoming the epicenter of the conflict between animal welfare and state cultural jurisdiction.",
      image: 'assets/timeline/10-cataluna-abolicion-2010.png',
      imageCaptionEs: "Fachada del Parlament de Catalunya en el Parc de la Ciutadella de Barcelona.",
      imageCaptionEn: "Facade of the Parliament of Catalonia in Ciutadella Park, Barcelona.",
      timelineEventIndex: 9,
      eventTitleEs: "Hito 10: El Parlamento de Catalu\u00f1a vota la abolici\u00f3n (2010 / vigor 2012)",
      eventTitleEn: "Event 10: Parliament of Catalonia votes for abolition (2010 / 2012)",
      sources: [{"title": "Ley 28/2010, de 3 de agosto, de modificaci\u00f3n de la ley animal catalana (BOE-A-2010-13838)", "repo": "Parlament de Catalunya / Generalitat de Catalunya / BOE", "url": "https://www.boe.es/eli/es-ct/l/2010/08/03/28"}]
    },
    {
      id: 'canarias',
      coordinates: { lat: 28.4636, lng: -16.2518 },
      isInset: true,
      svgPos: PROJECTION.project(-16.2518, 28.4636, true),
      labelOffsetY: 16,
      cityEs: "Santa Cruz de Tenerife / Las Palmas",
      cityEn: "Santa Cruz de Tenerife / Las Palmas",
      regionEs: "Islas Canarias",
      regionEn: "Canary Islands",
      eraEs: "30 de abril de 1991 \u2022 Legislaci\u00f3n Auton\u00f3mica",
      eraEn: "April 30, 1991 \u2022 Regional Legislation",
      titleEs: "Parlamento de Canarias (Ley 8/1991)",
      titleEn: "Parliament of the Canary Islands (Law 8/1991)",
      category: 'legal',
      summaryEs: "El Parlamento de Canarias aprob\u00f3 la pionera Ley 8/1991 de protecci\u00f3n de los animales, cuyo art\u00edculo 5 prohibi\u00f3 espect\u00e1culos cruentos y peleas en el archipi\u00e9lago. Al carecer las islas de festejos taurinos arraigados desde 1984, el veto se aprob\u00f3 sin tensi\u00f3n social, pero mantuvo una excepci\u00f3n expresa para las tradicionales peleas de gallos.",
      summaryEn: "The Canary Islands Parliament enacted the pioneering Animal Protection Law 8/1991, whose Article 5 banned blood spectacles and fights. Lacking active bullfighting events since 1984, the prohibition passed without social friction, though it explicitly protected traditional cockfighting.",
      image: 'assets/timeline/09-canarias-ley-1991.png',
      imageCaptionEs: "Archipi\u00e9lago Canario, sede de la primera ley auton\u00f3mica que prohibi\u00f3 espect\u00e1culos con sangre (1991).",
      imageCaptionEn: "Canary Islands archipelago, home of the first regional law banning blood spectacles (1991).",
      timelineEventIndex: 8,
      eventTitleEs: "Hito 9: Canarias aprueba la Ley 8/1991 de protecci\u00f3n animal (1991)",
      eventTitleEn: "Event 9: Canary Islands enacts Animal Protection Law 8/1991 (1991)",
      sources: [{"title": "Ley 8/1991, de 30 de abril, de protecci\u00f3n de los animales (BOE-A-1991-12999)", "repo": "Parlamento de Canarias / BOE", "url": "https://www.boe.es/eli/es-cn/l/1991/04/30/8"}]
    },
    {
      id: 'toledo',
      coordinates: { lat: 39.8628, lng: -4.0273 },
      isInset: false,
      svgPos: PROJECTION.project(-4.0273, 39.8628, false),
      labelOffsetY: 16,
      cityEs: "Toledo",
      cityEn: "Toledo",
      regionEs: "Castilla-La Mancha / Reino de Castilla",
      regionEn: "Castile-La Mancha / Kingdom of Castile",
      eraEs: "Siglo XIII (1256\u20131265) \u2022 Edad Media",
      eraEn: "13th Century (1256\u20131265) \u2022 Middle Ages",
      titleEs: "Sede Regia de Alfonso X el Sabio",
      titleEn: "Royal Seat of Alfonso X the Wise",
      category: 'fundacional',
      summaryEs: "En la corte toledana del Rey Sabio se redact\u00f3 el magno c\u00f3digo medieval de Las Siete Partidas. Su Partida VII regul\u00f3 por vez primera la infamia legal de los hombres que lidiaban fieras por precio ante el pueblo, mientras exim\u00eda el alanceamiento nobiliario a caballo por gala y prueba de fortaleza militar.",
      summaryEn: "In the Toledo court of King Alfonso X the Wise, the landmark medieval code Las Siete Partidas was compiled. Partida VII first codified the legal infamy of men who fought wild beasts for money, while exempting noble equestrian bull-spearing as honorable martial exercise.",
      image: 'assets/timeline/02-siete-partidas-alfonso-x.png',
      imageCaptionEs: "C\u00f3dice regio de Las Siete Partidas de Alfonso X redactado en la corte de Toledo.",
      imageCaptionEn: "Royal codex of Las Siete Partidas of Alfonso X compiled at the court of Toledo.",
      timelineEventIndex: 1,
      eventTitleEs: "Hito 2: Las Siete Partidas de Alfonso X el Sabio (Siglo XIII)",
      eventTitleEn: "Event 2: Las Siete Partidas of Alfonso X the Wise (13th Century)",
      sources: [{"title": "Las Siete Partidas, Partida VII, T\u00edt. VI, Ley 4 (PUB-LH-1974-51)", "repo": "Biblioteca Jur\u00eddica Digital del BOE / BNE", "url": "https://www.boe.es/biblioteca_juridica/publicacion.php?id=PUB-LH-1974-51"}]
    }
  ];

  // =========================================================================
  // 3. 🗺️ DATOS GEOGRÁFICOS VECTORIALES (NATURAL EARTH 1:50M)
  // =========================================================================
  const GEO_PATHS = {
    attribution: "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
    spainMainland: "M 527.3,87.1 L 527.4,89.1 L 529.2,92.0 L 531.1,93.1 L 535.0,94.6 L 538.1,94.7 L 542.2,95.4 L 545.1,97.1 L 545.2,99.7 L 544.5,102.6 L 542.8,105.2 L 541.8,107.2 L 542.7,108.4 L 544.2,109.3 L 545.8,109.5 L 546.9,109.2 L 547.7,107.6 L 549.3,105.7 L 550.2,105.4 L 550.1,106.6 L 550.9,107.9 L 556.0,110.2 L 567.1,114.5 L 571.5,114.6 L 575.1,115.1 L 576.1,116.9 L 583.2,123.6 L 584.9,123.4 L 588.1,123.5 L 591.9,123.0 L 594.7,121.8 L 596.5,122.0 L 598.5,123.3 L 600.9,124.4 L 603.9,126.6 L 606.6,129.3 L 608.5,130.2 L 619.7,128.3 L 622.2,129.9 L 624.9,129.9 L 627.8,129.5 L 634.3,130.3 L 639.6,130.1 L 640.1,129.5 L 640.5,123.5 L 641.4,121.4 L 642.6,120.8 L 645.8,121.2 L 657.1,124.8 L 661.8,127.0 L 666.3,128.7 L 670.2,128.9 L 672.8,130.1 L 676.5,135.7 L 675.9,138.6 L 676.2,139.7 L 676.6,141.6 L 676.5,143.8 L 677.5,145.3 L 679.2,145.4 L 681.4,145.0 L 683.8,144.1 L 688.1,141.7 L 689.4,141.3 L 696.5,144.1 L 699.6,145.9 L 700.7,147.9 L 702.3,150.0 L 704.5,150.3 L 707.5,148.3 L 712.2,146.2 L 720.3,148.1 L 729.3,150.8 L 733.1,151.1 L 733.3,149.8 L 734.0,147.9 L 735.5,147.0 L 737.7,146.7 L 740.7,145.7 L 744.2,144.1 L 747.9,143.5 L 751.7,144.7 L 756.3,145.6 L 759.1,145.6 L 760.4,149.4 L 762.6,150.9 L 763.5,154.2 L 759.4,155.9 L 757.0,156.1 L 756.2,161.8 L 757.4,163.3 L 759.7,164.8 L 760.3,166.6 L 760.7,174.8 L 756.1,179.8 L 749.5,185.5 L 717.4,203.5 L 709.7,212.3 L 706.8,214.3 L 682.9,219.8 L 666.2,225.6 L 658.2,227.8 L 648.2,238.0 L 643.5,242.1 L 647.2,243.3 L 651.6,248.2 L 650.2,250.3 L 643.7,253.7 L 640.9,254.7 L 639.4,254.2 L 638.0,254.6 L 627.2,272.4 L 617.7,285.1 L 612.4,290.7 L 606.9,298.9 L 595.2,320.3 L 595.1,326.5 L 600.9,347.7 L 604.2,353.3 L 608.8,358.0 L 617.5,362.0 L 619.7,365.9 L 616.7,369.7 L 607.9,376.4 L 592.7,385.4 L 586.3,392.5 L 584.9,399.3 L 580.4,402.4 L 578.7,412.0 L 576.0,418.3 L 575.5,420.5 L 572.7,425.3 L 572.3,428.8 L 577.0,433.6 L 574.6,435.7 L 572.3,436.7 L 566.9,437.2 L 548.9,437.8 L 534.4,448.3 L 527.1,457.5 L 520.6,474.7 L 512.6,484.9 L 509.1,486.8 L 503.6,482.3 L 496.8,481.6 L 490.2,483.1 L 486.7,486.6 L 481.3,488.6 L 476.0,486.9 L 464.6,486.0 L 459.5,486.2 L 451.5,489.0 L 444.7,487.1 L 433.2,486.1 L 408.2,488.4 L 405.1,489.5 L 401.9,493.8 L 394.0,501.1 L 381.9,501.4 L 370.9,506.1 L 368.2,509.1 L 363.6,517.4 L 362.2,523.4 L 361.2,523.5 L 360.0,522.0 L 358.3,522.5 L 357.5,527.1 L 353.4,529.2 L 349.9,529.9 L 341.5,526.2 L 334.4,520.6 L 330.7,520.2 L 324.7,511.5 L 322.1,505.9 L 320.3,499.9 L 320.7,497.6 L 320.1,495.7 L 314.8,493.3 L 313.5,487.8 L 317.4,480.6 L 320.6,477.6 L 322.6,476.7 L 317.7,477.0 L 314.2,481.6 L 309.8,474.2 L 291.6,459.8 L 292.8,456.5 L 292.6,454.8 L 289.6,458.6 L 287.5,459.6 L 278.2,459.0 L 267.5,460.7 L 264.7,445.8 L 263.3,440.1 L 263.0,436.4 L 265.7,427.8 L 268.7,424.3 L 272.8,417.1 L 277.7,411.1 L 282.9,409.7 L 285.2,408.8 L 287.2,404.2 L 288.3,400.2 L 287.5,399.8 L 281.4,400.6 L 270.4,384.1 L 270.7,381.4 L 272.1,377.5 L 273.0,372.5 L 273.3,368.6 L 276.1,365.3 L 280.5,361.9 L 284.2,357.1 L 286.0,352.4 L 286.4,348.1 L 284.3,345.1 L 278.3,343.4 L 272.1,331.2 L 270.8,323.6 L 269.5,322.8 L 265.7,319.3 L 262.0,312.8 L 261.5,311.8 L 265.3,310.7 L 280.8,310.6 L 284.1,309.2 L 284.6,308.7 L 287.4,303.6 L 290.4,295.3 L 291.1,290.2 L 290.2,288.1 L 285.0,282.9 L 284.8,281.4 L 285.6,279.0 L 288.7,276.4 L 292.8,273.5 L 295.1,270.9 L 294.5,268.9 L 293.3,266.8 L 293.1,264.9 L 293.9,262.5 L 294.2,254.4 L 294.7,252.3 L 293.9,244.9 L 292.9,238.8 L 289.6,231.0 L 290.2,229.2 L 291.7,227.8 L 296.7,225.0 L 300.6,218.6 L 306.4,213.3 L 313.9,209.0 L 319.2,204.2 L 321.3,200.5 L 322.8,199.6 L 322.3,197.9 L 321.3,195.4 L 318.3,193.0 L 314.5,191.6 L 310.1,191.6 L 307.5,191.1 L 306.7,189.3 L 307.0,184.1 L 306.8,179.1 L 306.0,176.7 L 304.0,175.0 L 300.0,175.4 L 296.6,174.0 L 294.0,173.7 L 292.5,174.8 L 284.9,174.5 L 281.7,173.6 L 279.5,172.6 L 278.1,173.2 L 277.2,174.2 L 277.1,175.7 L 276.6,177.8 L 273.9,179.6 L 267.6,181.5 L 262.6,181.3 L 257.9,180.0 L 256.4,179.1 L 254.2,178.2 L 244.8,179.3 L 243.7,178.5 L 240.4,180.4 L 235.6,182.6 L 232.9,182.8 L 232.0,182.3 L 231.6,181.3 L 229.6,177.7 L 230.1,175.9 L 234.0,170.4 L 233.5,169.1 L 232.0,167.3 L 230.5,164.8 L 230.1,163.5 L 227.7,163.3 L 225.1,164.6 L 215.1,167.3 L 212.7,168.3 L 208.4,171.0 L 204.0,175.0 L 200.5,175.9 L 199.3,174.7 L 198.9,165.2 L 204.2,158.9 L 208.0,155.0 L 206.2,154.3 L 202.2,154.4 L 202.5,151.4 L 204.4,150.0 L 206.2,146.8 L 204.1,145.4 L 202.4,143.3 L 202.5,137.8 L 203.0,135.5 L 202.4,133.1 L 194.3,136.4 L 192.2,135.9 L 192.1,131.8 L 196.6,125.5 L 197.1,123.6 L 191.8,122.7 L 187.8,119.6 L 185.4,116.8 L 182.8,112.9 L 182.8,109.4 L 185.5,101.1 L 189.3,98.6 L 192.6,97.2 L 199.5,91.4 L 209.2,92.5 L 215.1,91.3 L 220.5,88.3 L 223.5,87.7 L 228.5,85.1 L 228.3,81.7 L 226.6,79.1 L 228.1,76.7 L 233.6,73.8 L 239.8,69.8 L 246.8,69.1 L 254.0,65.6 L 258.8,67.9 L 263.0,67.1 L 267.8,69.8 L 274.2,75.8 L 283.5,78.3 L 290.9,76.4 L 304.0,76.0 L 310.6,76.8 L 322.2,75.3 L 328.9,75.8 L 339.7,72.8 L 348.1,76.6 L 364.3,78.3 L 374.0,81.4 L 401.0,86.6 L 410.7,86.6 L 424.5,83.7 L 430.3,81.5 L 435.6,82.8 L 443.5,80.3 L 447.2,80.8 L 452.1,84.4 L 469.4,89.2 L 473.9,85.1 L 477.3,84.2 L 489.7,86.7 L 502.2,91.8 L 508.7,92.2 L 518.2,90.8 L 525.7,87.5 L 527.3,87.1 Z",
    portugalMainland: "M 204.0,175.0 L 208.4,171.0 L 212.7,168.3 L 215.1,167.3 L 225.1,164.6 L 227.7,163.3 L 230.1,163.5 L 230.5,164.8 L 232.0,167.3 L 233.5,169.1 L 234.0,170.4 L 230.1,175.9 L 229.6,177.7 L 231.6,181.3 L 232.0,182.3 L 232.9,182.8 L 235.6,182.6 L 240.4,180.4 L 243.7,178.5 L 244.8,179.3 L 254.2,178.2 L 256.4,179.1 L 257.9,180.0 L 262.6,181.3 L 267.6,181.5 L 273.9,179.6 L 276.6,177.8 L 277.1,175.7 L 277.2,174.2 L 278.1,173.2 L 279.5,172.6 L 281.7,173.6 L 284.9,174.5 L 292.5,174.8 L 294.0,173.7 L 296.6,174.0 L 300.0,175.4 L 304.0,175.0 L 306.0,176.7 L 306.8,179.1 L 307.0,184.1 L 306.7,189.3 L 307.5,191.1 L 310.1,191.6 L 314.5,191.6 L 318.3,193.0 L 321.3,195.4 L 322.3,197.9 L 322.8,199.6 L 321.3,200.5 L 319.2,204.2 L 313.9,209.0 L 306.4,213.3 L 300.6,218.6 L 296.7,225.0 L 291.7,227.8 L 290.2,229.2 L 289.6,231.0 L 292.9,238.8 L 293.9,244.9 L 294.7,252.3 L 294.2,254.4 L 293.9,262.5 L 293.1,264.9 L 293.3,266.8 L 294.5,268.9 L 295.1,270.9 L 292.8,273.5 L 288.7,276.4 L 285.6,279.0 L 284.8,281.4 L 285.0,282.9 L 290.2,288.1 L 291.1,290.2 L 290.4,295.3 L 287.4,303.6 L 284.6,308.7 L 284.1,309.2 L 280.8,310.6 L 265.3,310.7 L 261.5,311.8 L 262.0,312.8 L 265.7,319.3 L 269.5,322.8 L 270.8,323.6 L 272.1,331.2 L 278.3,343.4 L 284.3,345.1 L 286.4,348.1 L 286.0,352.4 L 284.2,357.1 L 280.5,361.9 L 276.1,365.3 L 273.3,368.6 L 273.0,372.5 L 272.1,377.5 L 270.7,381.4 L 270.4,384.1 L 281.4,400.6 L 287.5,399.8 L 288.3,400.2 L 287.2,404.2 L 285.2,408.8 L 282.9,409.7 L 277.7,411.1 L 272.8,417.1 L 268.7,424.3 L 265.7,427.8 L 263.0,436.4 L 263.3,440.1 L 264.7,445.8 L 267.5,460.7 L 263.4,461.4 L 247.7,471.2 L 242.8,471.2 L 233.7,466.9 L 217.6,465.5 L 212.3,464.2 L 205.8,467.0 L 200.7,467.0 L 196.7,470.5 L 193.8,469.6 L 197.1,461.5 L 202.3,445.7 L 202.1,436.0 L 203.3,427.5 L 201.9,419.2 L 199.3,414.0 L 202.9,400.5 L 202.4,393.5 L 199.2,384.7 L 209.1,386.0 L 206.0,382.6 L 203.0,380.4 L 200.1,380.9 L 197.6,380.8 L 189.3,384.2 L 185.1,385.2 L 183.8,384.6 L 184.3,379.2 L 182.1,372.1 L 185.5,370.2 L 189.4,369.7 L 192.7,366.7 L 194.8,363.3 L 193.7,357.3 L 196.6,351.6 L 203.3,346.8 L 199.8,347.5 L 195.8,350.5 L 189.5,361.4 L 187.4,366.9 L 182.0,368.7 L 177.2,369.6 L 174.7,369.0 L 171.7,367.6 L 171.5,363.6 L 171.7,360.3 L 173.7,353.9 L 174.5,344.8 L 177.4,336.6 L 177.2,334.4 L 176.3,331.2 L 178.9,328.0 L 182.1,325.9 L 186.8,318.9 L 193.5,302.3 L 201.2,284.6 L 200.6,282.4 L 198.9,280.7 L 199.6,276.0 L 204.2,255.2 L 206.1,252.4 L 208.3,246.3 L 208.8,236.5 L 209.6,229.7 L 209.4,226.3 L 208.8,222.2 L 205.8,214.4 L 202.7,197.9 L 202.5,192.4 L 205.0,189.6 L 200.8,189.2 L 198.9,185.6 L 199.3,181.6 L 204.0,175.0 Z",
    balearics: ["M 684.2,371.2 L 683.1,372.0 L 680.1,371.2 L 675.5,371.2 L 675.3,368.8 L 676.0,367.1 L 676.9,365.4 L 679.7,368.8 L 684.1,369.4 L 684.2,371.2 Z", "M 756.0,304.1 L 760.4,306.1 L 765.1,304.3 L 767.6,304.9 L 770.1,305.8 L 770.6,309.6 L 768.5,313.9 L 765.4,318.2 L 762.8,322.9 L 760.6,328.3 L 756.4,331.5 L 752.6,333.4 L 744.6,329.4 L 740.0,328.4 L 738.6,326.9 L 737.5,320.9 L 735.4,319.0 L 732.3,318.1 L 729.6,319.7 L 726.1,322.8 L 724.2,319.7 L 721.2,319.1 L 720.1,317.2 L 720.2,314.7 L 739.3,300.2 L 744.9,297.0 L 756.6,293.3 L 758.4,293.8 L 756.9,296.0 L 757.0,297.0 L 758.5,298.1 L 758.1,299.8 L 756.6,301.3 L 756.0,304.1 Z", "M 809.2,301.0 L 808.3,301.7 L 794.1,294.7 L 789.4,294.0 L 788.3,292.9 L 788.4,289.3 L 788.8,287.7 L 798.3,287.0 L 806.0,289.6 L 810.2,296.5 L 810.5,297.6 L 809.2,301.0 Z", "M 677.3,356.4 L 675.6,360.1 L 668.6,358.8 L 667.0,357.3 L 668.5,353.1 L 670.6,352.6 L 670.7,349.6 L 672.8,346.7 L 682.8,344.2 L 685.1,346.3 L 685.5,349.2 L 679.6,355.5 L 677.3,356.4 Z"],
    canaryInsetBox: { x: 35, y: 440, width: 220, height: 160 },
    canaryIslands: ["M 122.5,536.1 L 119.3,546.0 L 116.3,549.9 L 114.5,551.2 L 110.1,552.3 L 104.8,546.1 L 102.1,539.8 L 100.6,537.8 L 103.0,536.2 L 106.5,536.5 L 114.0,535.2 L 115.5,534.6 L 123.1,528.3 L 130.6,527.5 L 130.8,529.6 L 122.5,536.1 Z", "M 223.2,512.9 L 220.6,515.7 L 217.6,514.7 L 219.0,508.4 L 220.4,506.5 L 225.7,503.8 L 230.1,502.7 L 231.4,499.8 L 232.9,498.6 L 234.4,500.4 L 233.2,502.4 L 232.3,508.7 L 229.4,510.7 L 223.2,512.9 Z", "M 204.7,545.3 L 199.5,550.2 L 194.2,549.0 L 193.4,548.2 L 198.6,547.0 L 203.3,543.2 L 206.4,534.9 L 211.2,525.7 L 212.1,521.8 L 214.0,520.3 L 216.6,520.1 L 217.7,520.4 L 218.9,522.5 L 218.9,527.1 L 217.5,534.8 L 215.0,541.6 L 204.7,545.3 Z", "M 158.4,546.2 L 158.2,549.6 L 159.1,553.0 L 158.9,558.1 L 157.0,560.9 L 152.3,563.7 L 148.6,563.2 L 146.5,562.1 L 142.8,557.6 L 142.7,552.9 L 146.1,549.8 L 147.6,545.9 L 156.4,546.7 L 157.2,545.9 L 157.9,545.7 L 158.4,546.2 Z", "M 89.9,551.7 L 88.3,552.1 L 86.4,551.0 L 84.5,547.5 L 85.8,544.9 L 87.0,543.8 L 88.7,543.9 L 92.0,545.8 L 93.0,547.8 L 93.1,549.0 L 89.9,551.7 Z", "M 62.8,561.0 L 59.1,568.1 L 54.4,565.4 L 53.3,564.5 L 52.4,563.1 L 56.9,562.8 L 61.4,559.2 L 62.8,561.0 Z", "M 64.9,531.1 L 63.9,531.4 L 63.1,528.0 L 58.5,519.5 L 61.3,515.8 L 66.3,515.7 L 68.3,518.3 L 69.0,521.0 L 68.1,522.6 L 68.4,525.8 L 67.8,527.8 L 64.9,531.1 Z"]
  };

  // =========================================================================
  // 4. 🧠 ESTADO DEL MÓDULO DEL MAPA
  // =========================================================================
  let activeLocationId = null;
  let activeFilter = 'all';
  let currentLanguage = 'es';
  let isDossierOpen = false;
  let lastFocusedElement = null;

  // Referencias a elementos DOM
  let mapViewportEl = null;
  let locationsListEl = null;
  let dossierContainerEl = null;
  let filterButtons = [];
  let resetBtn = null;

  // =========================================================================
  // 5. 🎨 RENDERIZADO DEL MAPA VECTORIAL SVG
  // =========================================================================
  function renderSVGMap() {
    if (!mapViewportEl) return;
    const isEn = currentLanguage === 'en';

    const svgHTML = `
      <svg class="hist-svg-map" viewBox="0 0 960 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${isEn ? 'Interactive historical map of Spain' : 'Mapa histórico interactivo de España'}">
        <defs>
          <radialGradient id="hist-sea-gradient" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stop-color="#140606" />
            <stop offset="60%" stop-color="#0c0303" />
            <stop offset="100%" stop-color="#070202" />
          </radialGradient>

          <linearGradient id="hist-spain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2d0d0f" />
            <stop offset="45%" stop-color="#210809" />
            <stop offset="100%" stop-color="#180506" />
          </linearGradient>

          <linearGradient id="hist-portugal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#190607" />
            <stop offset="100%" stop-color="#110304" />
          </linearGradient>

          <filter id="hist-pin-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="hist-inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.8" />
          </filter>
        </defs>

        <!-- Fondo del Océano / Mar Mediterráneo -->
        <rect width="960" height="620" fill="url(#hist-sea-gradient)" />

        <!-- Cuadrícula Náutica / Graticule sutil -->
        <g class="hist-map-gridlines" stroke="rgba(224, 179, 45, 0.07)" stroke-width="1" stroke-dasharray="3,5" aria-hidden="true">
          <line x1="80" y1="0" x2="80" y2="620" />
          <line x1="240" y1="0" x2="240" y2="620" />
          <line x1="400" y1="0" x2="400" y2="620" />
          <line x1="560" y1="0" x2="560" y2="620" />
          <line x1="720" y1="0" x2="720" y2="620" />
          <line x1="880" y1="0" x2="880" y2="620" />

          <line x1="0" y1="120" x2="960" y2="120" />
          <line x1="0" y1="240" x2="960" y2="240" />
          <line x1="0" y1="360" x2="960" y2="360" />
          <line x1="0" y1="480" x2="960" y2="480" />
        </g>

        <!-- Marruecos / Norte de África -->
        <path d="M 270,580 C 330,560 380,560 450,575 C 510,590 560,610 600,620 L 270,620 Z" fill="#100304" opacity="0.6" stroke="rgba(224, 179, 45, 0.15)" stroke-width="1" aria-hidden="true" />

        <!-- Portugal (Silueta Oficial Natural Earth 1:50m) -->
        <path class="hist-map-portugal" d="${GEO_PATHS.portugalMainland}" fill="url(#hist-portugal-gradient)" stroke="rgba(224, 179, 45, 0.3)" stroke-width="1.2" stroke-dasharray="4,3" aria-hidden="true" />
        <text x="215" y="320" class="hist-map-country-label" fill="rgba(224, 179, 45, 0.28)" font-family="var(--font-serif-heading, serif)" font-size="11" letter-spacing="3" text-anchor="middle" aria-hidden="true">PORTUGAL</text>

        <!-- España Continental (Silueta Oficial Natural Earth 1:50m) -->
        <path class="hist-map-landmass" d="${GEO_PATHS.spainMainland}" fill="url(#hist-spain-gradient)" stroke="rgba(224, 179, 45, 0.55)" stroke-width="1.8" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.7))" />

        <!-- Islas Baleares (Natural Earth 1:50m) -->
        <g class="hist-map-balearics" fill="url(#hist-spain-gradient)" stroke="rgba(224, 179, 45, 0.55)" stroke-width="1.4">
          ${GEO_PATHS.balearics.map(bPath => `<path d="${bPath}" />`).join('')}
        </g>
        <text x="815" y="380" class="hist-map-country-label" fill="rgba(224, 179, 45, 0.4)" font-family="var(--font-sans, sans-serif)" font-size="9" letter-spacing="1.5" text-anchor="middle" aria-hidden="true">ILLES BALEARS</text>

        <!-- Rótulos Marítimos Históricos -->
        <text x="760" y="470" fill="rgba(224, 179, 45, 0.2)" font-family="var(--font-serif-heading, serif)" font-size="12" font-style="italic" letter-spacing="4" aria-hidden="true">MAR MEDITERRÁNEO</text>
        <text x="130" y="75" fill="rgba(224, 179, 45, 0.2)" font-family="var(--font-serif-heading, serif)" font-size="11" font-style="italic" letter-spacing="3" aria-hidden="true">OCÉANO ATLÁNTICO</text>

        <!-- Rosa de los Vientos -->
        <g class="hist-map-compass" transform="translate(875, 75)" aria-hidden="true">
          <circle r="32" fill="none" stroke="rgba(224, 179, 45, 0.25)" stroke-width="1" stroke-dasharray="2,2" />
          <circle r="22" fill="rgba(15, 4, 4, 0.6)" stroke="rgba(224, 179, 45, 0.35)" stroke-width="1" />
          <polygon points="0,-28 4,-7 0,0" fill="#e0b32d" />
          <polygon points="0,-28 -4,-7 0,0" fill="#917215" />
          <polygon points="0,28 4,7 0,0" fill="#917215" />
          <polygon points="0,28 -4,7 0,0" fill="#e0b32d" />
          <polygon points="28,0 7,4 0,0" fill="#e0b32d" />
          <polygon points="28,0 7,-4 0,0" fill="#917215" />
          <polygon points="-28,0 -7,4 0,0" fill="#917215" />
          <polygon points="-28,0 -7,-4 0,0" fill="#e0b32d" />
          <text x="0" y="-32" fill="#e0b32d" font-family="var(--font-serif-heading, serif)" font-size="9" font-weight="700" text-anchor="middle">N</text>
        </g>

        <!-- Escala Cartográfica (~ 200 km) -->
        <g class="hist-map-scale" transform="translate(730, 580)" aria-hidden="true">
          <line x1="0" y1="0" x2="160" y2="0" stroke="var(--color-gold, #c99700)" stroke-width="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--color-gold, #c99700)" stroke-width="2" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="var(--color-gold, #c99700)" stroke-width="1.5" />
          <line x1="160" y1="-4" x2="160" y2="4" stroke="var(--color-gold, #c99700)" stroke-width="2" />
          <text x="0" y="14" fill="rgba(224, 179, 45, 0.7)" font-family="var(--font-sans, sans-serif)" font-size="8">0</text>
          <text x="80" y="14" fill="rgba(224, 179, 45, 0.7)" font-family="var(--font-sans, sans-serif)" font-size="8" text-anchor="middle">100</text>
          <text x="160" y="14" fill="rgba(224, 179, 45, 0.7)" font-family="var(--font-sans, sans-serif)" font-size="8" text-anchor="middle">200 km</text>
        </g>

        <!-- RECUADRO INSET: ISLAS CANARIAS -->
        <g class="hist-map-inset-group">
          <rect x="${GEO_PATHS.canaryInsetBox.x}" y="${GEO_PATHS.canaryInsetBox.y}" width="${GEO_PATHS.canaryInsetBox.width}" height="${GEO_PATHS.canaryInsetBox.height}" rx="6" fill="#120404" stroke="rgba(224, 179, 45, 0.45)" stroke-width="1.5" filter="url(#hist-inset-shadow)" />
          <rect x="${GEO_PATHS.canaryInsetBox.x}" y="${GEO_PATHS.canaryInsetBox.y}" width="${GEO_PATHS.canaryInsetBox.width}" height="22" rx="5" fill="rgba(80, 15, 20, 0.85)" />
          <text x="${GEO_PATHS.canaryInsetBox.x + GEO_PATHS.canaryInsetBox.width / 2}" y="${GEO_PATHS.canaryInsetBox.y + 15}" fill="var(--color-gold-light, #f3d068)" font-family="var(--font-sans, sans-serif)" font-size="9" font-weight="700" letter-spacing="1" text-anchor="middle">
            ${isEn ? 'CANARY ISLANDS (Law 8/1991)' : 'ISLAS CANARIAS (Ley 8/1991)'}
          </text>
          <g fill="url(#hist-spain-gradient)" stroke="rgba(224, 179, 45, 0.55)" stroke-width="1.2">
            ${GEO_PATHS.canaryIslands.map(cPath => `<path d="${cPath}" />`).join('')}
          </g>
          <text x="123" y="555" fill="rgba(224, 179, 45, 0.4)" font-family="var(--font-sans, sans-serif)" font-size="7.5" text-anchor="middle" aria-hidden="true">Tenerife</text>
          <text x="168" y="566" fill="rgba(224, 179, 45, 0.4)" font-family="var(--font-sans, sans-serif)" font-size="7.5" text-anchor="middle" aria-hidden="true">Gran Canaria</text>
        </g>

        <!-- MARCADORES HISTÓRICOS INTERACTIVOS (Hitbox fija y no vibrante) -->
        <g class="hist-map-markers-layer" role="group" aria-label="${isEn ? 'Historical landmark markers' : 'Marcadores de sedes históricas'}">
          ${renderSVGMarkers(isEn)}
        </g>

        <!-- Atribución cartográfica integrada en el lienzo SVG -->
        <text x="948" y="612" text-anchor="end" fill="rgba(224, 179, 45, 0.35)" font-family="var(--font-sans, sans-serif)" font-size="7" aria-hidden="true">${isEn ? 'Cartography: Natural Earth 1:50m (Public Domain)' : 'Cartografía: Natural Earth 1:50m (Dominio Público)'}</text>
      </svg>
    `;

    mapViewportEl.innerHTML = svgHTML;
    attachMarkerListeners();
  }

  function renderSVGMarkers(isEn) {
    return HISTORICAL_LOCATIONS.map(loc => {
      const isSelected = loc.id === activeLocationId;
      const isFilteredOut = activeFilter !== 'all' && loc.category !== activeFilter;
      const displayClass = isFilteredOut ? 'hist-marker-dimmed' : '';
      const selectedClass = isSelected ? 'hist-marker-selected' : '';

      let icon = '🏛️';
      if (loc.category === 'escuelas') icon = '🎭';
      else if (loc.category === 'tragedias') icon = '🥀';
      else if (loc.category === 'legal') icon = '⚖️';

      const cityName = isEn ? loc.cityEn : loc.cityEs;
      const labelX = loc.svgPos.x;
      const labelY = loc.svgPos.y + (loc.labelOffsetY || -14);

      return `
        <g class="hist-map-marker ${displayClass} ${selectedClass}" 
           id="hist-marker-${loc.id}" 
           data-location-id="${loc.id}"
           role="button" 
           tabindex="${isFilteredOut ? '-1' : '0'}"
           aria-pressed="${isSelected ? 'true' : 'false'}"
           aria-label="${cityName} — ${isEn ? loc.titleEn : loc.titleEs}">
          
          <!-- 1. CAPA VISUAL DECORATIVA (pointer-events: none garantizado) -->
          <circle class="hist-marker-pulse" cx="${loc.svgPos.x}" cy="${loc.svgPos.y}" r="15" pointer-events="none" />
          <circle class="hist-marker-aura" cx="${loc.svgPos.x}" cy="${loc.svgPos.y}" r="10" filter="url(#hist-pin-glow)" pointer-events="none" />
          <circle class="hist-marker-pin" cx="${loc.svgPos.x}" cy="${loc.svgPos.y}" r="6.5" pointer-events="none" />
          <text class="hist-marker-icon" x="${loc.svgPos.x}" y="${loc.svgPos.y + 3.2}" text-anchor="middle" font-size="7" pointer-events="none" aria-hidden="true">${icon}</text>

          <!-- 2. ETIQUETA VISUAL (pointer-events: none) -->
          <g class="hist-marker-tag" transform="translate(${labelX}, ${labelY})" pointer-events="none">
            <rect class="hist-marker-tag-bg" x="-32" y="-11" width="64" height="14" rx="3" pointer-events="none" />
            <text class="hist-marker-tag-text" x="0" y="-1" text-anchor="middle" pointer-events="none">${cityName}</text>
          </g>

          <!-- 3. HITBOX ESTACIONARIA RÍGIDA (Único receptor de puntero y clic) -->
          <circle class="hist-marker-hitbox" cx="${loc.svgPos.x}" cy="${loc.svgPos.y}" r="14" fill="transparent" pointer-events="all" />
        </g>
      `;
    }).join('');
  }

  function attachMarkerListeners() {
    const markers = mapViewportEl.querySelectorAll('.hist-map-marker');
    markers.forEach(marker => {
      const locId = marker.getAttribute('data-location-id');

      marker.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectLocation(locId, true);
      });

      marker.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLocation(locId, true);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          focusNextMarker(locId, 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          focusNextMarker(locId, -1);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeDossier();
        }
      });
    });
  }

  function focusNextMarker(currentId, direction) {
    const visibleLocations = HISTORICAL_LOCATIONS.filter(l => activeFilter === 'all' || l.category === activeFilter);
    const currentIndex = visibleLocations.findIndex(l => l.id === currentId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = visibleLocations.length - 1;
    if (nextIndex >= visibleLocations.length) nextIndex = 0;

    const nextLoc = visibleLocations[nextIndex];
    const nextMarkerEl = document.getElementById(`hist-marker-${nextLoc.id}`);
    if (nextMarkerEl) {
      nextMarkerEl.focus();
    }
  }

  // =========================================================================
  // 6. 📋 RENDERIZADO DEL DIRECTORIO LATERAL ACCESIBLE
  // =========================================================================
  function renderLocationsList() {
    if (!locationsListEl) return;
    const isEn = currentLanguage === 'en';

    const visibleLocations = HISTORICAL_LOCATIONS.filter(loc => {
      if (activeFilter === 'all') return true;
      return loc.category === activeFilter;
    });

    const countEl = document.getElementById('hist-sidebar-count');
    if (countEl) {
      countEl.textContent = isEn 
        ? `${visibleLocations.length} locations` 
        : `${visibleLocations.length} sedes`;
    }

    if (visibleLocations.length === 0) {
      locationsListEl.innerHTML = `
        <div class="hist-empty-filter-state">
          <p>${isEn ? 'No historical sites in this category.' : 'No hay sedes en esta categoría.'}</p>
        </div>
      `;
      return;
    }

    locationsListEl.innerHTML = visibleLocations.map((loc, index) => {
      const isSelected = loc.id === activeLocationId;
      const cityName = isEn ? loc.cityEn : loc.cityEs;
      const regionName = isEn ? loc.regionEn : loc.regionEs;
      const eraName = isEn ? loc.eraEn : loc.eraEs;
      const titleName = isEn ? loc.titleEn : loc.titleEs;
      const eventTitle = isEn ? loc.eventTitleEn : loc.eventTitleEs;

      let categoryBadgeClass = 'hist-badge-fundacional';
      let categoryLabel = isEn ? 'Foundational' : 'Fundacional';
      if (loc.category === 'escuelas') {
        categoryBadgeClass = 'hist-badge-escuelas';
        categoryLabel = isEn ? 'School & Style' : 'Escuelas y Estilo';
      } else if (loc.category === 'tragedias') {
        categoryBadgeClass = 'hist-badge-tragedias';
        categoryLabel = isEn ? 'Tragedy' : 'Tragedia Histórica';
      } else if (loc.category === 'legal') {
        categoryBadgeClass = 'hist-badge-legal';
        categoryLabel = isEn ? 'Constitutional Law' : 'Sede Jurídica';
      }

      return `
        <article class="hist-loc-card ${isSelected ? 'hist-loc-selected' : ''}" 
                 id="hist-loc-card-${loc.id}" 
                 data-location-id="${loc.id}" 
                 role="button" 
                 tabindex="0" 
                 aria-pressed="${isSelected ? 'true' : 'false'}" 
                 aria-label="${cityName}: ${titleName}">
          
          <div class="hist-loc-card-header">
            <div class="hist-card-museum-tag">
              <span class="hist-tag-room">🏛️ SALA II</span>
              <span class="hist-tag-divider" aria-hidden="true">•</span>
              <span class="hist-tag-stop">SEDE ${index + 1}/7</span>
            </div>
            <span class="hist-loc-category-badge ${categoryBadgeClass}">${categoryLabel}</span>
            <span class="hist-loc-era-badge">${eraName}</span>
          </div>

          <h4 class="hist-loc-card-title">${cityName} — ${titleName}</h4>
          
          <div class="hist-loc-card-region">
            <span aria-hidden="true">📍</span>
            <span>${regionName}</span>
          </div>

          <p class="hist-loc-card-snippet">${(isEn ? loc.summaryEn : loc.summaryEs).slice(0, 110)}...</p>

          <div class="hist-loc-card-footer">
            <span class="hist-loc-event-link">
              <span aria-hidden="true">🎯</span>
              <span>${eventTitle}</span>
            </span>
            <span class="hist-loc-arrow" aria-hidden="true">→</span>
          </div>
        </article>
      `;
    }).join('');

    const cards = locationsListEl.querySelectorAll('.hist-loc-card');
    cards.forEach(card => {
      const locId = card.getAttribute('data-location-id');
      card.addEventListener('click', () => {
        selectLocation(locId, true);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLocation(locId, true);
        }
      });
    });
  }

  // =========================================================================
  // 7. 📜 DOSSIER DE DETALLE DE LA SEDE SELECCIONADA
  // =========================================================================
  function renderDossier(loc) {
    if (!dossierContainerEl) return;
    const isEn = currentLanguage === 'en';

    if (!loc) {
      dossierContainerEl.innerHTML = '';
      dossierContainerEl.setAttribute('aria-hidden', 'true');
      dossierContainerEl.classList.remove('hist-dossier-open');
      isDossierOpen = false;
      return;
    }

    const cityName = isEn ? loc.cityEn : loc.cityEs;
    const regionName = isEn ? loc.regionEn : loc.regionEs;
    const eraName = isEn ? loc.eraEn : loc.eraEs;
    const titleName = isEn ? loc.titleEn : loc.titleEs;
    const summaryText = isEn ? loc.summaryEn : loc.summaryEs;
    const eventTitle = isEn ? loc.eventTitleEn : loc.eventTitleEs;
    const imageCaption = isEn ? loc.imageCaptionEn : loc.imageCaptionEs;

    let categoryBadgeClass = 'hist-badge-fundacional';
    let categoryLabel = isEn ? 'Foundational Seat' : 'Sede Fundacional';
    if (loc.category === 'escuelas') {
      categoryBadgeClass = 'hist-badge-escuelas';
      categoryLabel = isEn ? 'School & Technique' : 'Escuelas y Estilo';
    } else if (loc.category === 'tragedias') {
      categoryBadgeClass = 'hist-badge-tragedias';
      categoryLabel = isEn ? 'Tragic Milestone' : 'Hito Trágico';
    } else if (loc.category === 'legal') {
      categoryBadgeClass = 'hist-badge-legal';
      categoryLabel = isEn ? 'Legal & Constitutional Seat' : 'Sede Jurídico-Constitucional';
    }

    dossierContainerEl.innerHTML = `
      <div class="hist-dossier-card">
        <div class="hist-dossier-header">
          <div class="hist-dossier-badges">
            <span class="hist-card-museum-tag">🏛️ SALA II • FICHA CARTOGRÁFICA</span>
            <span class="hist-loc-category-badge ${categoryBadgeClass}">${categoryLabel}</span>
            <span class="hist-dossier-era-badge">${eraName}</span>
          </div>

          <button type="button" class="hist-dossier-close-btn" id="hist-dossier-close-btn" aria-label="${isEn ? 'Close location dossier' : 'Cerrar ficha de la sede'}">
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div class="hist-dossier-body">
          <div class="hist-dossier-media">
            <div class="hist-dossier-img-wrap">
              <img src="${loc.image}" alt="${cityName}: ${titleName}" class="hist-dossier-img" loading="lazy" />
            </div>
            <p class="hist-dossier-caption">${imageCaption}</p>
          </div>

          <div class="hist-dossier-info">
            <div class="hist-dossier-geo">
              <span class="hist-dossier-pin-icon" aria-hidden="true">📍</span>
              <span class="hist-dossier-region">${regionName}</span>
              <span class="hist-dossier-coords">(${loc.coordinates.lat.toFixed(4)}° N, ${Math.abs(loc.coordinates.lng).toFixed(4)}° ${loc.coordinates.lng < 0 ? 'O' : 'E'})</span>
            </div>

            <h3 class="hist-dossier-title" id="hist-dossier-title">${cityName}: ${titleName}</h3>

            <p class="hist-dossier-text">${summaryText}</p>

            <div class="hist-dossier-event-box">
              <span class="hist-dossier-event-kicker">
                <span aria-hidden="true">⏱️</span>
                <strong>${isEn ? 'Timeline Connection:' : 'Hito Vinculado en la Cronología:'}</strong>
              </span>
              <p class="hist-dossier-event-name">${eventTitle}</p>
            </div>

            ${loc.sources && loc.sources.length > 0 ? `
              <div class="hist-dossier-sources">
                <span class="hist-dossier-source-kicker">${isEn ? 'Authoritative Document & Repository:' : 'Fondo Documental Cotejado:'}</span>
                ${loc.sources.map(s => `
                  <div class="hist-dossier-source-item">
                    <span class="hist-dossier-source-title">«${s.title}»</span>
                    <span class="hist-dossier-source-repo">(${s.repo})</span>
                    ${s.url ? `
                      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hist-dossier-source-link" aria-label="${isEn ? 'Open verified source in new tab' : 'Abrir fuente contrastada en nueva pestaña'}">
                        <span>${isEn ? 'Consult Repository ↗' : 'Consultar Repositorio ↗'}</span>
                      </a>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <div class="hist-dossier-actions">
              <a href="${document.getElementById('hist-journey-container') && !window.isSala2Standalone ? '#hist-museum-exterior' : 'index.html?lang=' + encodeURIComponent(currentLanguage) + '#hall'}" class="hist-btn-room-return-hall hist-dossier-return-btn" aria-label="${isEn ? 'Return to Grand Central Hall' : 'Volver al Gran Vestíbulo Central del Museo'}">
                <span class="hist-return-icon" aria-hidden="true">🏛️</span>
                <span>${isEn ? 'Central Hall' : 'Vestíbulo'}</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    `;

    dossierContainerEl.setAttribute('aria-hidden', 'false');
    dossierContainerEl.classList.add('hist-dossier-open');
    isDossierOpen = true;

    const closeBtn = document.getElementById('hist-dossier-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeDossier);
    }

    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 60);
    }
  }

  function closeDossier() {
    if (!isDossierOpen) return;
    activeLocationId = null;

    document.querySelectorAll('.hist-map-marker').forEach(m => {
      m.classList.remove('hist-marker-selected');
      m.setAttribute('aria-pressed', 'false');
    });

    document.querySelectorAll('.hist-loc-card').forEach(c => {
      c.classList.remove('hist-loc-selected');
      c.setAttribute('aria-pressed', 'false');
    });

    renderDossier(null);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // =========================================================================
  // 8. 🎯 INTEGRACIÓN BIDIRECCIONAL CON EL TIMELINE Y ARCHIVO DIGITAL
  // =========================================================================
  function jumpToTimelineEvent(index) {
    var eventNumber = index + 1; // Mapeo exacto 0-based a 1-based (?event=1..12)
    var journeyContainer = document.getElementById('hist-journey-container');

    // Si la sala está en modo independiente o no tiene el contenedor incrustado, navegar a Sala I standalone
    if (!journeyContainer || window.isSala2Standalone) {
      window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLanguage) + '&event=' + encodeURIComponent(eventNumber);
      return;
    }

    if (window.historiaJourney && typeof window.historiaJourney.scrollToEvent === 'function') {
      window.historiaJourney.scrollToEvent(index);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    journeyContainer.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  function openTimelineExhibit(index) {
    var eventNumber = index + 1; // Mapeo exacto 0-based a 1-based (?event=1..12)
    var journeyContainer = document.getElementById('hist-journey-container');

    // Si la sala está en modo independiente o no tiene el contenedor incrustado, navegar a Sala I standalone con exhibit=1
    if (!journeyContainer || window.isSala2Standalone) {
      window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLanguage) + '&event=' + encodeURIComponent(eventNumber) + '&exhibit=1';
      return;
    }

    if (window.historiaJourney && typeof window.historiaJourney.openExhibit === 'function') {
      window.historiaJourney.openExhibit(index);
    }
  }

  // =========================================================================
  // 9. 🔍 SELECCIÓN Y FILTRADO DE SEDES HISTÓRICAS
  // =========================================================================
  function selectLocation(locId, shouldFocus) {
    lastFocusedElement = document.activeElement;
    activeLocationId = locId;
    const loc = HISTORICAL_LOCATIONS.find(l => l.id === locId);
    if (!loc) return;

    document.querySelectorAll('.hist-map-marker').forEach(marker => {
      const mId = marker.getAttribute('data-location-id');
      const isCurrent = mId === locId;
      marker.classList.toggle('hist-marker-selected', isCurrent);
      marker.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    document.querySelectorAll('.hist-loc-card').forEach(card => {
      const cId = card.getAttribute('data-location-id');
      const isCurrent = cId === locId;
      card.classList.toggle('hist-loc-selected', isCurrent);
      card.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      if (isCurrent && shouldFocus) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    dismissTutorial();
    renderDossier(loc);
  }

  function applyFilter(category) {
    activeFilter = category || 'all';

    if (filterButtons && filterButtons.length) {
      filterButtons.forEach(btn => {
        const bCat = btn.getAttribute('data-filter');
        const isSelected = bCat === category;
        btn.classList.toggle('hist-filter-active', isSelected);
        btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      });
    }

    renderSVGMap();
    renderLocationsList();

    if (activeLocationId) {
      const currentLoc = HISTORICAL_LOCATIONS.find(l => l.id === activeLocationId);
      if (currentLoc && category !== 'all' && currentLoc.category !== category) {
        closeDossier();
      }
    }
  }

  // =========================================================================
  // 10. 🌐 BILINGÜISMO (ES / EN) Y EVENTOS DE SINCRONIZACIÓN
  // =========================================================================
  function setLanguage(lang) {
    currentLanguage = lang === 'en' ? 'en' : 'es';
    const isEn = currentLanguage === 'en';

    document.querySelectorAll('.hist-map-title-es, .hist-map-desc-es, .hist-filter-es, .hist-hint-es, .hist-reset-es, .hist-sidebar-title-es, .hist-attr-es').forEach(el => {
      el.style.display = isEn ? 'none' : 'inline';
    });
    document.querySelectorAll('.hist-map-title-en, .hist-map-desc-en, .hist-filter-en, .hist-hint-en, .hist-reset-en, .hist-sidebar-title-en, .hist-attr-en').forEach(el => {
      el.style.display = isEn ? 'inline' : 'none';
    });

    const tutorialEl = document.getElementById('hist-map-tutorial-guide');
    if (tutorialEl) {
      tutorialEl.querySelectorAll('.hist-lang-es').forEach(el => el.style.display = isEn ? 'none' : '');
      tutorialEl.querySelectorAll('.hist-lang-en').forEach(el => el.style.display = isEn ? '' : 'none');
    }

    renderSVGMap();
    renderLocationsList();
    if (activeLocationId) {
      const loc = HISTORICAL_LOCATIONS.find(l => l.id === activeLocationId);
      if (loc) renderDossier(loc);
    }
  }

  // =========================================================================
  // 11. 🚀 INICIALIZACIÓN DEL MÓDULO DEL MAPA
  // =========================================================================
  function initMap() {
    mapViewportEl = document.getElementById('hist-map-viewport');
    locationsListEl = document.getElementById('hist-locations-list');
    dossierContainerEl = document.getElementById('hist-location-dossier');
    resetBtn = document.getElementById('hist-map-reset-btn');
    filterButtons = Array.from(document.querySelectorAll('.hist-map-filter-btn'));

    if (!mapViewportEl) {
      return;
    }

    try {
      var urlParams = new URLSearchParams(window.location.search);
      var urlLang = urlParams.get('lang');
      if (urlLang === 'en' || urlLang === 'es') {
        currentLanguage = urlLang;
      } else if (window.historiaJourney && typeof window.historiaJourney.getLanguage === 'function') {
        currentLanguage = window.historiaJourney.getLanguage();
      }
    } catch (e) {
      if (window.historiaJourney && typeof window.historiaJourney.getLanguage === 'function') {
        currentLanguage = window.historiaJourney.getLanguage();
      }
    }

    window.addEventListener('historiaLanguageChange', (e) => {
      if (e.detail && e.detail.lang) {
        setLanguage(e.detail.lang);
      }
    });

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.getAttribute('data-filter');
        applyFilter(cat);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDossier();
        applyFilter('all');
      });
    }

    setLanguage(currentLanguage);
    initMapTutorial();

    window.historiaMap = {
      getLocations: () => HISTORICAL_LOCATIONS,
      getActiveLocationId: () => activeLocationId,
      selectLocation: (id) => selectLocation(id, true),
      closeDossier: closeDossier,
      applyFilter: applyFilter,
      setLanguage: setLanguage,
      getLanguage: () => currentLanguage,
      getProjection: () => PROJECTION,
      getGeoPaths: () => GEO_PATHS,
      dismissTutorial: dismissTutorial
    };
  }

  // =========================================================================
  // 12. 💡 TUTORIAL INTERACTIVO DEL MAPA (TEMA CLARO / PRIMERA VEZ)
  // =========================================================================
  let hasShownMapTutorial = false;

  function dismissTutorial() {
    const tutorialEl = document.getElementById('hist-map-tutorial-guide');
    if (tutorialEl) {
      tutorialEl.classList.remove('hist-tutorial-visible');
      tutorialEl.setAttribute('aria-hidden', 'true');
    }
    document.querySelectorAll('.hist-map-marker').forEach(m => m.classList.remove('hist-marker-tutorial-pulse'));
  }

  function initMapTutorial() {
    const mapSection = document.getElementById('hist-map-stage') || document.getElementById('hist-map-section');
    const tutorialEl = document.getElementById('hist-map-tutorial-guide');
    if (!mapSection || !tutorialEl) return;

    const closeBtn = document.getElementById('hist-map-tutorial-close');
    const confirmBtn = document.getElementById('hist-map-tutorial-btn-confirm');

    function showTutorial() {
      if (hasShownMapTutorial || activeLocationId) return;
      hasShownMapTutorial = true;
      tutorialEl.classList.add('hist-tutorial-visible');
      tutorialEl.setAttribute('aria-hidden', 'false');
      document.querySelectorAll('.hist-map-marker').forEach(m => m.classList.add('hist-marker-tutorial-pulse'));
    }

    if (closeBtn) closeBtn.addEventListener('click', dismissTutorial);
    if (confirmBtn) confirmBtn.addEventListener('click', dismissTutorial);

    // Ocultar si el usuario pulsa en cualquier marcador o control del mapa
    document.addEventListener('click', function (e) {
      if (e.target.closest('.hist-map-marker') || e.target.closest('.hist-map-filter-btn') || e.target.closest('.hist-map-reset-btn')) {
        dismissTutorial();
      }
    });

    // Detectar cuando el visitante llega al mapa por scroll (IntersectionObserver)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasShownMapTutorial && !activeLocationId) {
            setTimeout(showTutorial, 400);
            observer.disconnect();
          }
        });
      }, {
        threshold: 0.25
      });
      observer.observe(mapSection);
    } else {
      setTimeout(showTutorial, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
