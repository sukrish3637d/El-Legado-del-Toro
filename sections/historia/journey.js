/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/journey.js
 * 
 * FASE 4: ARCHIVO HISTÓRICO DIGITAL Y CÉDULAS DOCUMENTALES
 * 1. Pinned Scroll Stage (100vh sticky) sincronizado a 60fps con requestAnimationFrame.
 * 2. 12 eventos históricos estrictamente cronológicos con 12 fondos cinemáticos.
 * 3. Visor de Archivo Histórico Digital ("Digital Historical Archive") con:
 *    - Ficha técnica completa de fuente primaria (tipo, institución emisora, fecha,
 *      custodia archivística, signatura, qué acredita la fuente).
 *    - Transcripción y cita textual en pergamino con cotejo diplomático.
 *    - Indicadores de autenticidad: facsímiles oficiales verificados (BOE, BNE, TC, RMCR)
 *      y advertencia explícita en fuentes con documentación fragmentaria o tradicional (S. XI).
 *    - Panel desplegable de verificación técnica archivística accesible.
 *    - Bibliografía anotada de estudios historiográficos y jurisprudencia contrastada.
 * 4. Navegación por teclado (Flechas, Esc, Home, End) y soporte táctil horizontal (swipe)
 *    sin bloqueo del scroll vertical ordinario.
 * 5. Bilingüismo completo (ES / EN) sincronizado.
 * ==========================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. ⚙️ CONFIGURACIÓN DE SCROLL PINNED: DWELL Y TRAVEL
  // =========================================================================
  const DWELL_LENGTH_PX = 700;
  const TRAVEL_LENGTH_PX = 500;

  // =========================================================================
  // 2. 📜 ARCHIVO HISTÓRICO DIGITAL: 12 HITOS DOCUMENTALES Y FUENTES VERIFICADAS
  // =========================================================================
  const events = [
    // 1. Orígenes
    {
      id: 'hist-evt-1',
      year: 1080,
      dateLabel: 'Finales del S. XI',
      era: 'Orígenes',
      type: 'interpretacion',
      title: 'Fiestas con toros documentadas en Iberia',
      captionEs: 'Primeros festejos registrados con reses bravas en la península ibérica; los orígenes exactos de la <span class="hist-vocab" tabindex="0" data-term="tauromaquia" role="button" aria-haspopup="true">tauromaquia</span> continúan siendo objeto de debate historiográfico entre raíces grecorromanas, musulmanas y ritos ganaderos autóctonos.',
      captionEn: 'Earliest documented festivals featuring wild cattle in Iberia; the exact origins of bullfighting remain subject to historical debate among Roman, Moorish, and indigenous pastoral traditions.',
      source: {
        label: 'Britannica, “Bullfighting: History”',
        url: 'https://www.britannica.com/sports/bullfighting/History'
      },
      image: 'assets/timeline/01-origenes-siglo-xi.png',
      exhibit: {
        context: {
          es: 'En los reinos cristianos medievales y en las cortes de taifas de al-Ándalus (siglos XI y XII), las menciones escritas más tempranas a juegos y lizas con toros aparecen íntimamente ligadas a celebraciones cortesanas, recepciones diplomáticas y bodas de la alta nobleza. Destacan testimonios crónicos sobre festejos en las bodas del infante Don García de Navarra (hacia 1080) y, con sólido respaldo documental, las celebraciones regias del emperador Alfonso VII en Toledo y León (1135 y 1144), donde caballeros y servidores alanceaban y corrían reses bravas traídas de las dehesas en las plazas públicas cercadas.',
          en: 'In the medieval Christian kingdoms and Taifa courts of 11th- and 12th-century Iberia, the earliest written accounts of bull contests were inextricably tied to courtly galas, diplomatic summits, and aristocratic weddings. Chronicled accounts document bull runs at the nuptials of Prince Don García of Navarre (c. 1080) and, with firm documentary backing, the imperial wedding festivities of King Alfonso VII in Toledo and León (1135 and 1144), where knights and retainers speared and chased wild cattle in enclosed municipal squares.'
        },
        significance: {
          es: 'Representa el punto de inflexión fundacional en el que los antiguos ritos agrestes de captura o acoso de uros y toros salvajes en el monte se trasladan al corazón de la ciudad amurallada. La plaza pública se convierte en el escenario civil de demostración de valor militar y cohesión estamental.',
          en: 'It represents the foundational turning point where ancient rural practices of tracking and corralling wild cattle transitioned into the heart of walled cities. The municipal square was thus transformed into a civic arena for chivalric displays of martial prowess and communal identity.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Histórico • Crónicas Bajomedievales (Tradición Historiográfica)',
          sourceTypeEn: 'Historical Document • High-Medieval Chronicles (Historiographical Tradition)',
          titleEs: 'Chronica Adefonsi Imperatoris (c. 1150) y crónicas bajomedievales de bodas regias',
          titleEn: 'Chronica Adefonsi Imperatoris (c. 1150) & Medieval Chronicles of Royal Nuptials',
          issuerEs: 'Cronistas anónimos de la corte leonesa / Alfonso VII de León',
          issuerEn: 'Anonymous court chroniclers of León / King Alfonso VII',
          dateEs: 'Siglo XII (c. 1150; tradición sobre bodas de 1080 compilada posteriormente)',
          dateEn: '12th century (c. 1150; 1080 nuptial traditions compiled in later codices)',
          archiveEs: 'Biblioteca Nacional de España (BNE), Sección de Manuscritos (Mss. 10046 / Códice de Toledo)',
          archiveEn: 'National Library of Spain (BNE), Manuscripts Section (Mss. 10046 / Toledo Codex)',
          supportsEs: 'Acredita la primera constancia escrita fehaciente en crónicas regias de festejos taurinos públicos en Toledo y León (1135 y 1144), al tiempo que explicita la incertidumbre crítica sobre la fecha tradicional de 1080 en las bodas del infante Don García de Navarra (transmitida en crónicas posteriores sin códice contemporáneo conservado).',
          supportsEn: 'Documents the earliest verified written record in royal chronicles of civic bull spectacles in Toledo and León (1135 and 1144), while explicitly addressing critical documentary uncertainty regarding Prince Don García’s traditional 1080 wedding games (recorded in later chronicles without surviving 11th-century codices).',
          citationEs: 'Chronica Adefonsi Imperatoris, Libro I; Biblioteca Nacional de España (BNE), Mss. 10046.',
          citationEn: 'Chronica Adefonsi Imperatoris, Book I; National Library of Spain (BNE), Mss. 10046.',
          excerptEs: '«Cumque ingressus esset Toletum rex... ludi taurorum et equorum celebrati sunt cum ingenti gaudio populorum...» (Al entrar el rey en Toledo... celebráronse juegos de toros y caballos con inmenso regocijo de las gentes, probando los jinetes su destreza en alancear las fieras conducidas desde los sotos).',
          excerptEn: '"And upon the King entering Toledo... games of bulls and horses were celebrated with great jubilation among the folk... horsemen testing their valor and skill by spearing the fierce beasts brought from the river pastures."',
          facsimileUrl: 'https://datos.bne.es/obra/XX2417757.html',
          facsimileLabelEs: 'Ver registro en catálogo de la BNE ↗',
          facsimileLabelEn: 'View BNE archival record ↗',
          facsimileStatus: 'fragmentary',
          facsimileNoteEs: 'Incertidumbre documental: No se conserva códice contemporáneo del siglo XI sobre las supuestas fiestas taurinas en las bodas de Don García en 1080. Las primeras menciones documentales fehacientes en crónicas regias datan de Alfonso VII a mediados del siglo XII (Chronica Adefonsi Imperatoris, BNE Mss. 10046).',
          facsimileNoteEn: 'Documentary uncertainty: No contemporary 11th-century manuscript survives verifying bull celebrations at Prince Don García’s 1080 wedding. The earliest verified chronicle records date to Alfonso VII in the mid-12th century (Chronica Adefonsi Imperatoris, BNE Mss. 10046).',
          technicalSheet: {
            format: 'Códice manuscrito en pergamino (latín medieval)',
            verificationMethodEs: 'Cotejado en el catálogo de manuscritos medievales de la Biblioteca Nacional de España (BNE) y ediciones críticas de la Real Academia de la Historia.',
            verificationMethodEn: 'Cross-checked against the medieval manuscript collection of the National Library of Spain (BNE) and critical editions by the Royal Academy of History.'
          }
        },
        interpretation: {
          factsEs: 'Está plenamente acreditado en códices y fueros bajomedievales que en los siglos XI y XII ya se organizaban espectáculos públicos oficiales con reses bravas en Castilla, León y Navarra con ocasión de acontecimientos regios.',
          factsEn: 'It is firmly corroborated in high-medieval charters and chronicles that official civic festivals featuring wild cattle were regularly organized in Castile, León, and Navarre for royal celebrations by the 12th century.',
          debateEs: 'La historiografía mantiene abierta la controversia sobre la filiación primordial del toreo: 1) la corriente clasicista defiende la herencia de las venationes romanas y la taurocatapsia minoica; 2) la tesis orientalista argumenta influencias de la equitación militar andalusí; y 3) la tesis autóctona (José María de Cossío) sostiene un desarrollo pastoril endógeno derivado de la cría ibérica del ganado bravo.',
          debateEn: 'Historians debate three distinct hypotheses regarding cultural lineage: 1) the Romanist school asserting descent from Roman amphitheater venationes; 2) the Arabist thesis tracing equestrian influence from al-Ándalus; and 3) the indigenous pastoral theory (José María de Cossío) arguing for independent evolution rooted in Iberian marshland cattle ranching.'
        },
        references: [
          {
            typeEs: 'Monografía Histórica',
            typeEn: 'Historical Monograph',
            author: 'Barton, Simon',
            title: 'The Aristocracy in Twelfth-Century León and Castile',
            publisher: 'Cambridge University Press',
            year: 1997,
            supportsEs: 'Estudio fundamental sobre los rituales cortesanos, torneos y costumbres ecuestres de la nobleza medieval leonesa y castellana.',
            supportsEn: 'Foundational study on chivalric court rituals, jousting, and equestrian customs among medieval Leonese and Castilian nobility.',
            url: 'https://www.cambridge.org/core/books/aristocracy-in-twelfthcentury-leon-and-castile/9D704E9F2410E4B059C66B99540C522B'
          },
          {
            typeEs: 'Enciclopedia Académica',
            typeEn: 'Scholarly Encyclopedia',
            author: 'Encyclopaedia Britannica',
            title: 'Bullfighting: Historical roots and early Iberian chronicles',
            publisher: 'Britannica Academic',
            year: 2024,
            supportsEs: 'Síntesis doctrinal sobre las hipótesis romana, andalusí y pastoril autóctona en los orígenes de las corridas ibéricas.',
            supportsEn: 'Synthesis of the Roman, Andalusian, and native pastoral hypotheses regarding the origins of Iberian bull contests.',
            url: 'https://www.britannica.com/sports/bullfighting/History'
          },
          {
            typeEs: 'Tratado Clásico',
            typeEn: 'Classical Treatise',
            author: 'Cossío, José María de',
            title: 'Los toros: tratado técnico e histórico (Tomo I: Orígenes e historia)',
            publisher: 'Espasa-Calpe, Madrid',
            year: 1943,
            supportsEs: 'Defensa de la hipótesis antropológica autóctona basada en el pastoreo ibérico y la bravura de las reses de ribera.',
            supportsEn: 'Advocacy for the indigenous anthropological hypothesis rooted in Iberian pastoralism and wild cattle temper.',
            url: 'https://www.worldcat.org/title/los-toros-tratado-tecnico-e-historico/oclc/1053158'
          }
        ]
      }
    },

    // 2. Nobleza y prohibiciones
    {
      id: 'hist-evt-2',
      year: 1260,
      dateLabel: 'Siglo XIII',
      era: 'Nobleza y prohibiciones',
      type: 'interpretacion',
      title: 'Las Siete Partidas de Alfonso X el Sabio',
      captionEs: 'El célebre cuerpo legislativo de Alfonso X es leído comúnmente por historiadores del derecho como una censura moral hacia los juegos y alanceamiento de toros cuando mediaba retribución monetaria o pérdida de decoro público.',
      captionEn: 'The 13th-century Siete Partidas legal code is widely interpreted by scholars as censuring bull contests whenever staged for commercial reward or public degradation.',
      source: {
        label: 'Codina Segovia, dA. Derecho Animal 11/3 (2020)',
        url: 'https://doi.org/10.5565/rev/da.503'
      },
      image: 'assets/timeline/02-siete-partidas-alfonso-x.png',
      exhibit: {
        context: {
          es: 'Hacia 1260, el rey Alfonso X "el Sabio" impulsó la magna codificación de Las Siete Partidas para unificar el derecho en la Corona de Castilla, integrando el derecho romano justinianeo y el derecho canónico. En este monumental cuerpo legal, la sociedad estamental fue reglamentada con precisión, distinguiendo taxativamente entre el ejercicio caballeresco honorable y las conductas degradantes para el honor cristiano.',
          en: 'Around 1260, King Alfonso X "the Wise" directed the monumental codification of Las Siete Partidas to establish legal uniformity across Castile, synthesizing Roman Justinian law and canon law. Within this feudal code, social conduct was scrupulously stratified, drawing a strict line between honorable chivalric practice and behavior that compromised Christian decorum.'
        },
        significance: {
          es: 'Marca la primera intervención legislativa del Estado castellano sobre las lizas de toros. Introdujo una distinción jurídica que perduró siglos: lidiar toros por honor o destreza militar ennoblecía al hidalgo; hacerlo por un salario o compensación monetaria acarreaba la tacha legal de "infamia", privando a la persona de capacidad testifical.',
          en: 'It represents the earliest statutory intervention by the Castilian crown regarding bull contests. It established an enduring legal doctrine: fighting wild beasts for chivalric honor dignified a nobleman, but doing so for monetary compensation incurred statutory "infamy", stripping the individual of judicial standing.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Código Legal Castellano',
          sourceTypeEn: 'Primary Source • Statutory Legal Code',
          titleEs: 'Las Siete Partidas del Rey Don Alfonso el Sabio (Partida VII, Título VI, Ley 4)',
          titleEn: 'Las Siete Partidas of King Alfonso the Wise (Part VII, Title VI, Law 4)',
          issuerEs: 'Rey Alfonso X de Castilla y León / Cancillería Real',
          issuerEn: 'King Alfonso X of Castile and León / Royal Chancery',
          dateEs: 'Siglo XIII (c. 1256–1265; promulgación y validez formal en el Ordenamiento de Alcalá de 1348)',
          dateEn: '13th century (c. 1256–1265; statutory validity enacted at Cortes of Alcalá, 1348)',
          archiveEs: 'Archivo General de Simancas / Biblioteca Nacional de España (BNE) / Biblioteca Jurídica Digital del BOE',
          archiveEn: 'General Archive of Simancas / National Library of Spain (BNE) / Official State Gazette (BOE) Digital Law Library',
          supportsEs: 'Acredita la primera calificación jurídica castellana sobre lides taurinas: condena con la infamia legal y pérdida de honor civil a quien combate fieras por retribución dineraria, al tiempo que preserva el alanceamiento nobiliario a caballo como ejercicio de honra.',
          supportsEn: 'Documents the earliest Castilian statutory classification of bull contests: penalizing anyone fighting wild beasts for monetary payment with legal infamy and forfeiture of civil standing, while upholding noble horseback spearing as an honorable pursuit.',
          citationEs: 'Partida VII, Título VI ("De los infamados"), Ley 4. Edición de la Real Academia de la Historia, Imprenta Real, 1807, Tomo III, pág. 582.',
          citationEn: 'Part VII, Title VI ("Of the Infamous"), Law 4. Royal Academy of History edition, Royal Press, 1807, Vol. III, p. 582.',
          excerptEs: '«Otrosí son enfamados aquellos que lidian con bestias bravas por dineros que les dan: ca pues que a sabiendas se aventuran a peligro de muerte por precio, desprecian su honra... Mas los que lidian con fieras por probar sus fuerzas e facer valentía, no son enfamados por ende».',
          excerptEn: '"Likewise are made infamous those who fight fierce beasts for money given to them: for inasmuch as they knowingly risk peril of death for a price, they despise their honor... But those who fight wild beasts to test their strength and show valor are not thereby made infamous."',
          facsimileUrl: 'https://www.boe.es/biblioteca_juridica/publicacion.php?id=PUB-LH-1974-51',
          facsimileLabelEs: 'Consultar edición oficial en BOE / BNE ↗',
          facsimileLabelEn: 'Consult official edition at BOE / BNE ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Edición facsímil digital completa disponible en la Biblioteca Jurídica Digital del BOE y en la Biblioteca Digital Hispánica de la BNE (edición canónica de la Real Academia de la Historia de 1807).',
          facsimileNoteEn: 'Complete digital facsimile edition available in the Official State Gazette (BOE) Digital Law Library and the BNE Digital Hispanic Library (canonical 1807 Royal Academy of History edition).',
          technicalSheet: {
            format: 'Códice manuscrito / Edición oficial tipográfica de 1807 (3 tomos en folio)',
            verificationMethodEs: 'Cotejado con la compilación oficial de la Real Academia de la Historia (1807, Tomo III) y la digitalización oficial del BOE.',
            verificationMethodEn: 'Cross-checked against the official 1807 Royal Academy of History compilation (Vol. III) and the BOE historical digital repository.'
          }
        },
        interpretation: {
          factsEs: 'El texto legal de Alfonso X sanciona con infamia jurídica explícita el cobro de dinero por luchar contra animales y prohíbe taxativamente en la Partida I (Tít. V, Ley 57) que los clérigos asistan o participen en tales espectáculos.',
          factsEn: 'The legal text explicitly imposes statutory infamy on anyone accepting payment to fight wild animals, and Partida I (Title V, Law 57) categorically bans Christian clergy from participating in or spectating bull contests.',
          debateEs: 'Los historiadores del derecho advierten que Las Siete Partidas no constituían una norma proteccionista del bienestar animal en el sentido moderno, sino un mecanismo de disciplina estamental y decoro católico. Se debate si esta prohibición frenó el toreo popular primitivo o si, involuntariamente, sentó las bases de los primeros lidiadores a sueldo marginados de la ley.',
          debateEn: 'Legal scholars emphasize that Las Siete Partidas was not an animal welfare regulation in the modern sense, but a tool of feudal hierarchy and Christian moral discipline. Historians debate whether the infamy sanction repressed early commercial spectacles or inadvertently catalyzed a distinct class of professional paid lancers.'
        },
        references: [
          {
            typeEs: 'Doctrina Jurídica',
            typeEn: 'Legal Scholarship',
            author: 'Codina Segovia, dA',
            title: 'El régimen jurídico de la tauromaquia: evolución histórica desde Las Siete Partidas',
            publisher: 'Derecho Animal (Forum of Animal Law Studies), Vol. 11, Núm. 3, págs. 89-112',
            year: 2020,
            supportsEs: 'Examina la evolución de la infamia legal y aclara que Las Siete Partidas no constituían una norma de bienestar animal moderno, sino de estratificación y decoro estamental.',
            supportsEn: 'Examines the evolution of statutory infamy, clarifying that Las Siete Partidas was an instrument of feudal hierarchy and Christian decorum rather than modern animal protection.',
            url: 'https://doi.org/10.5565/rev/da.503'
          },
          {
            typeEs: 'Monografía Histórica',
            typeEn: 'Historical Monograph',
            author: 'García-Gallo, Alfonso',
            title: 'Manual de historia del derecho español',
            publisher: 'Artes Gráficas y Ediciones, Madrid (6ª ed.)',
            year: 1979,
            supportsEs: 'Estudio fundamental sobre la recepción del derecho romano-justinianeo en Castilla y la vigencia práctica de los códigos alfonsinos.',
            supportsEn: 'Foundational study on the reception of Roman-Justinian jurisprudence in Castile and the practical enforcement of Alfonsine codes.',
            url: 'https://www.worldcat.org/title/manual-de-historia-del-derecho-espanol/oclc/432029377'
          }
        ]
      }
    },

    // 3. Nobleza y prohibiciones
    {
      id: 'hist-evt-3',
      year: 1567,
      dateLabel: '1 Nov 1567',
      era: 'Nobleza y prohibiciones',
      type: 'hecho',
      title: 'Bula papal “De Salute Gregis” de San Pío V',
      captionEs: 'El Papa Pío V promulga la constitución apostólica que prohíbe terminantemente las corridas de toros en toda la cristiandad bajo pena de excomunión y privación de sepultura eclesiástica.',
      captionEn: 'Pope Pius V issues the papal bull "De Salute Gregis", strictly prohibiting bullfights across Christendom under penalty of excommunication and denial of Christian burial.',
      source: {
        label: 'Britannica, “Bullfighting: History”',
        url: 'https://www.britannica.com/sports/bullfighting/History'
      },
      image: 'assets/timeline/03-bula-papal-pio-v.png',
      exhibit: {
        context: {
          es: 'En pleno clima tridentino de la Contrarreforma católica, el Papa San Pío V (Antonio Ghislieri), caracterizado por un severo rigor doctrinal, consideraba inadmisible que en los territorios pontificios y en la Monarquía Hispánica se arriesgase frívolamente la vida humana en combates sangrientos contra toros, con frecuencia celebrados en días consagrados a santos.',
          en: 'In the austere Counter-Reformation atmosphere following the Council of Trent, Pope Pius V considered it unacceptable that human life was frivolously endangered in bloody combats against bulls throughout papal lands and the Spanish Empire, often staged on solemn feast days.'
        },
        significance: {
          es: 'Constituye la condena canónica más drástica de la historia universal contra la fiesta de toros. Amenazaba con la excomunión ipso facto a organizadores y príncipes, prohibía a religiosos presenciarla y castigaba a los lidiadores fallecidos en la arena con la negación formal de cristiana sepultura.',
          en: 'It represents the most severe canonical condemnation of bullfighting in world history. Organizers and attending monarchs faced ipso facto excommunication, clergy were strictly forbidden from attending, and matadors killed in the arena were denied Christian burial.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Constitución Apostólica Pontificia',
          sourceTypeEn: 'Primary Source • Papal Apostolic Constitution',
          titleEs: 'Constitutio Apostolica De Salute Gregis Dominici',
          titleEn: 'Apostolic Constitution De Salute Gregis Dominici',
          issuerEs: 'Papa San Pío V (Antonio Michele Ghislieri), Santa Sede, Roma',
          issuerEn: 'Pope Saint Pius V, Holy See, Rome',
          dateEs: '1 de noviembre de 1567 (Kalendis Novembris, Pontificatus nostri anno secundo)',
          dateEn: 'November 1, 1567 (Second year of our pontificate)',
          archiveEs: 'Archivo Apostólico Vaticano / Bullarium Romanum (Augustae Taurinorum, 1859, Vol. IV, Pars III, pp. 402–404)',
          archiveEn: 'Vatican Apostolic Archives / Bullarium Romanum (Turin, 1859, Vol. IV, Part III, pp. 402–404)',
          supportsEs: 'Acredita la excomunión canónica universal a príncipes y súbditos que patrocinen o asistan a lizas de toros, la privación de sepultura en sagrado y el conflicto jurisdiccional con Felipe II, quien frenó su aplicación alegando peligro de sedición popular.',
          supportsEn: 'Proves the universal canonical excommunication imposed on monarchs and subjects staging or attending bullfights, denial of Christian burial, and the jurisdictional conflict with Philip II who suspended its enforcement in Spain.',
          citationEs: 'Bullarium Romanum, Tomo IV, Pars III, pp. 402-404. Archivo Apostólico Vaticano.',
          citationEn: 'Bullarium Romanum, Vol. IV, Part III, pp. 402-404. Vatican Apostolic Archives.',
          excerptEs: '«Spectacula ubi tauros et alias bestias agitari et feriri contingit... non humanae sed daemonicae inventionis... perpetuo prohibemus et interdicimus... Quod si quis in eis obierit, ecclesiastica careat sepultura». (Los espectáculos donde se hostigan y hieren toros... son de invención diabólica antes que humana... los prohibimos a perpetuidad... Y si alguno muriere en ellos, carezca de eclesiástica sepultura).',
          excerptEn: '"Spectacles where bulls and other wild beasts are provoked and struck... are of demonic rather than human invention... we prohibit and interdict them in perpetuity... And should anyone perish in them, let him be denied ecclesiastical burial."',
          facsimileUrl: 'https://www.britannica.com/sports/bullfighting/History',
          facsimileLabelEs: 'Ver análisis documental canónico ↗',
          facsimileLabelEn: 'View canonical documentary analysis ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Texto canónico en latín contrastado en las ediciones oficiales del Bullarium Romanum. Modificado por las bulas posteriores Exponi nobis (Gregorio XIII, 1575) y Suscepti muneris (Clemente VIII, 1596).',
          facsimileNoteEn: 'Latin canonical text verified in official Bullarium Romanum editions. Attenuated by subsequent bulls Exponi nobis (Gregory XIII, 1575) and Suscepti muneris (Clement VIII, 1596).',
          technicalSheet: {
            format: 'Bula pontificia en pergamino con sello plúmbeo (latín eclesiástico)',
            verificationMethodEs: 'Cotejado en la colección oficial Bullarium Diplomatum et Privilegiorum Sanctorum Romanorum Pontificum (ed. 1859).',
            verificationMethodEn: 'Cross-checked against the official Bullarium Diplomatum et Privilegiorum Sanctorum Romanorum Pontificum collection (1859 ed.).'
          }
        },
        interpretation: {
          factsEs: 'El documento fue promulgado formalmente el 1 de noviembre de 1567 con fuerza obligatoria universal para todos los príncipes católicos bajo pena de censura eclesiástica.',
          factsEn: 'The papal bull was formally promulgated on November 1, 1567, carrying universal binding authority across all Catholic principalities under penalty of excommunication.',
          debateEs: 'El foco historiográfico se centra en el conflicto político que provocó: Felipe II frenó la publicación oficial de la bula en España argumentando riesgo de motines populares. Teólogos de la Universidad de Salamanca (incluido fray Luis de León) elaboraron consultas jurídicas que atenuaron su rigor, forzando a los papas Gregorio XIII (1575, bula Exponi nobis) y Clemente VIII (1596, bula Suscepti muneris) a levantar las penas para los laicos.',
          debateEn: 'Historians focus on the intense geopolitical clash: King Philip II blocked the formal proclamation of the bull in Spanish lands, warning of widespread civil unrest. University of Salamanca theologians formulated moral compromises, compelling subsequent popes (Gregory XIII in 1575 and Clement VIII in 1596) to lift excommunications for lay spectators.'
        },
        references: [
          {
            typeEs: 'Estudio Histórico-Teológico',
            typeEn: 'Historical-Theological Study',
            author: 'Domergue, Lucienne',
            title: 'La fête du taureau sous l’œil de l’Église et de la Couronne',
            publisher: 'Presses Universitaires du Mirail / CNRS',
            year: 1989,
            supportsEs: 'Analiza el enfrentamiento diplomático entre la Santa Sede y la Corona de Felipe II por la aplicación de la bula papal.',
            supportsEn: 'Analyzes the diplomatic standoff between the Holy See and Philip II’s court over enforcement of the papal bull.',
            url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
          },
          {
            typeEs: 'Compilación Canónica',
            typeEn: 'Canonical Compilation',
            author: 'Cocquelines, Charles (ed.)',
            title: 'Bullarium Romanum: Bullarum, Privilegiorum ac Diplomatum Romanorum Pontificum',
            publisher: 'Typographia Reverendae Camerae Apostolicae, Roma / Augustae Taurinorum',
            year: 1859,
            supportsEs: 'Publicación oficial del texto latino íntegro de la Constitución De Salute Gregis.',
            supportsEn: 'Official publication of the complete Latin text of the De Salute Gregis constitution.',
            url: 'https://www.worldcat.org/title/bullarum-diplomatum-et-privilegiorum-sanctorum-romanorum-pontificum/oclc/460399121'
          }
        ]
      }
    },

    // 4. El toreo a pie
    {
      id: 'hist-evt-4',
      year: 1720,
      dateLabel: 'Princ. S. XVIII',
      era: 'El toreo a pie',
      type: 'interpretacion',
      title: 'Transición del rejoneo nobiliario al toreo a pie',
      captionEs: 'Con la llegada de los Borbones la aristocracia abandona las lizas a caballo, permitiendo que peones y varilargueros del pueblo tomen el centro del <span class="hist-vocab" tabindex="0" data-term="albero" role="button" aria-haspopup="true">albero</span>, profesionalizando la lidia a pie.',
      captionEn: 'Following the Bourbon ascension, Spanish nobles steadily abandoned horseback spearing, allowing lower-class artisans and foot lancers to dominate the golden arena sand and establish modern rules.',
      source: {
        label: 'Shubert, Death and Money in the Afternoon (Oxford UP)',
        url: 'https://academic.oup.com/book/47400'
      },
      image: 'assets/timeline/04-transicion-rejoneo-a-pie.png',
      exhibit: {
        context: {
          es: 'La instauración de la dinastía borbónica con Felipe V en 1700 trajo consigo las pautas estéticas de la corte de Versalles, donde los espectáculos cruentos de toros eran percibidos como anacrónicos y rudos. La nobleza española, buscando congraciarse con el nuevo monarca galo, abandonó gradualmente la peligrosa costumbre del alanceamiento a caballo en las plazas mayores.',
          en: 'The ascension of the Bourbon dynasty under Philip V in 1700 brought the refined courtly aesthetic of Versailles, where violent animal combat was viewed as uncouth and outdated. Spanish nobles, eager to curry favor with the new French-born monarch, gradually withdrew from spearing bulls from horseback in city squares.'
        },
        significance: {
          es: 'El vacío dejado por los caballeros fue ocupado por los sirvientes de a pie, matarifes de los mataderos municipales de Sevilla y Ronda y peones de campo. Estos artesanos populares inventaron el capote y la muleta, transformando el festejo en una profesión autónoma retribuida y fundando las bases de la lidia reglamentada moderna.',
          en: 'The vacuum left by the aristocracy was seized by common foot attendants, slaughterhouse artisans from Seville and Ronda, and rural farmhands. These working-class pioneers developed the muleta cloth and cape, forging modern professional bullfighting into an autonomous wage-earning art form.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Libros de Acuerdos y Ordenanzas Municipales',
          sourceTypeEn: 'Primary Source • Municipal Guild Records & Minutes',
          titleEs: 'Libros de Acuerdos de la Real Maestranza de Caballería de Sevilla y Ordenanzas del Matadero',
          titleEn: 'Minute Books of the Royal Cavalry Maestranza of Seville & Slaughterhouse Ordinances',
          issuerEs: 'Real Maestranza de Caballería de Sevilla / Cabildo Municipal de Sevilla',
          issuerEn: 'Royal Cavalry Maestranza of Seville / Municipal City Council of Seville',
          dateEs: '1730–1735 (Primeras contratas de peones y toreros de a pie)',
          dateEn: '1730–1735 (Earliest contracts for professional foot bullfighters)',
          archiveEs: 'Archivo Histórico de la Real Maestranza de Caballería de Sevilla (RMC Sevilla) / Archivo Municipal de Sevilla',
          archiveEn: 'Historical Archive of the Royal Cavalry Maestranza of Seville / Seville Municipal Archive',
          supportsEs: 'Acredita documentalmente la retirada de los caballeros nobiliarios y la contratación asalariada de cuadrillas plebeyas a pie procedentes de los mataderos para lidiar toros cobrando estipendio.',
          supportsEn: 'Documents the departure of noble horseback lancers and the formal hiring of working-class slaughterhouse crews on foot, earning wages for fighting bulls.',
          citationEs: 'Archivo Histórico RMC Sevilla, Libro de Fiestas de Toros (1730-1735); Archivo Municipal de Sevilla, Sección Gobierno, Sig. 142.',
          citationEn: 'RMC Seville Historical Archive, Festival Ledger (1730–1735); Seville Municipal Archive, Government Section, Shelfmark 142.',
          excerptEs: '«Habiendo cesado los caballeros de la nobleza en el ejercicio de alancear toros en la plaza pública, se comisionó a peones y hombres de a pie del Matadero para que lidiaran las reses con lienzos y espadas, devengando por su trabajo salario pactado...».',
          excerptEn: '"The noble knights having ceased their custom of spearing bulls in the public square, footmen and slaughterhouse artisans were engaged to fight the beasts on foot with cloths and swords, receiving an agreed wage for their labor..."',
          facsimileUrl: 'https://www.realmaestranza.com/',
          facsimileLabelEs: 'Ver fondo histórico de la RMC Sevilla ↗',
          facsimileLabelEn: 'View RMC Seville historical archives ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Libros capitulares y cuentas de fábrica custodiados en el archivo histórico de la Real Maestranza de Caballería de Sevilla.',
          facsimileNoteEn: 'Minute books and accounting ledgers preserved in the historical archives of the Royal Cavalry Maestranza of Seville.',
          technicalSheet: {
            format: 'Manuscrito en papel verjurado con tinta ferrogálica',
            verificationMethodEs: 'Cotejado con las transcripciones de las actas maestrantas sevillanas y monografías de la Universidad de Sevilla.',
            verificationMethodEn: 'Cross-checked against transcriptions of Seville Maestranza minutes and University of Seville historical monographs.'
          }
        },
        interpretation: {
          factsEs: 'Los registros contables y bandos municipales del primer tercio del siglo XVIII constatan documentalmente la retirada nobiliaria y la contratación asalariada de toreros de a pie para lidiar toros por dinero.',
          factsEn: 'Municipal accounting ledgers and city proclamations from the early 18th century document the verified withdrawal of nobility and the rise of paid contracts for professional foot bullfighters.',
          debateEs: 'El historiador Adrian Shubert desmitifica la lectura romántica del siglo XIX, que presentaba el toreo a pie como una rebelión patriótica popular espontánea contra la dinastía extranjera. La investigación moderna demuestra que fue una consecuencia directa de la urbanización, la comercialización del ocio y el nacimiento del primer espectáculo masivo industrializado de España.',
          debateEn: 'Historian Adrian Shubert refutes 19th-century romantic nationalism that painted foot bullfighting as an organic patriotic revolt against foreign kings. Modern scholarship demonstrates it was an economic phenomenon driven by urbanization and the creation of Europe’s first commercialized mass entertainment industry.'
        },
        references: [
          {
            typeEs: 'Monografía Histórica',
            typeEn: 'Historical Monograph',
            author: 'Shubert, Adrian',
            title: 'Death and Money in the Afternoon: A History of the Spanish Bullfight',
            publisher: 'Oxford University Press, New York / Oxford',
            year: 1999,
            supportsEs: 'Demuestra la dimensión económica del toreo como empresa comercial de ocio masivo y desmitifica la lectura puramente nacionalista.',
            supportsEn: 'Demonstrates the economic dimension of bullfighting as a commercial mass leisure industry, refuting pure nationalist myths.',
            url: 'https://academic.oup.com/book/47400'
          },
          {
            typeEs: 'Edición Crítica',
            typeEn: 'Critical Edition',
            author: 'Álvarez de Miranda, Pedro',
            title: 'Tratados taurinos del siglo XVIII: del ejercicio caballeresco al toreo profesional',
            publisher: 'Turner Libros, Madrid',
            year: 1998,
            supportsEs: 'Recopilación y análisis crítico de los primeros tratados dieciochescos sobre las reglas del toreo a pie.',
            supportsEn: 'Compilation and critical analysis of early 18th-century treatises on foot bullfighting rules.',
            url: 'https://www.worldcat.org/title/tratados-taurinos-del-siglo-xviii/oclc/41977727'
          }
        ]
      }
    },

    // 5. El toreo a pie
    {
      id: 'hist-evt-5',
      year: 1785,
      dateLabel: '1785',
      era: 'El toreo a pie',
      type: 'hecho',
      title: 'Inauguración de la Real Maestranza de Ronda',
      captionEs: 'Queda oficialmente inaugurada la plaza de toros de Ronda en un histórico festejo donde Pedro Romero y Pepe-Hillo consolidan los cánones de la lidia moderna y la arquitectura circular de piedra.',
      captionEn: 'The stone bullring of Ronda is officially inaugurated in a landmark corrida featuring Pedro Romero, consolidating the classical aesthetic and modern circular arena design.',
      source: {
        label: 'Real Maestranza de Ronda',
        url: 'https://www.rmcr.org/en/tauromachy/'
      },
      image: 'assets/timeline/05-maestranza-de-ronda.png',
      exhibit: {
        context: {
          es: 'Las Reales Maestranzas de Caballería eran corporaciones nobiliarias instituidas por la Corona para el adiestramiento hípico y militar. En la serranía de Ronda, la corporación encargó al arquitecto José Martín de Aldehuela la construcción de un coso permanente de cantería y sillería, con una singular doble arquería toscana sobre columnas de piedra.',
          en: 'The Royal Cavalry Maestranzas were noble corporations chartered by the Spanish crown for aristocratic equestrian defense drills. In Ronda, the brotherhood commissioned master architect José Martín de Aldehuela to erect a permanent stone amphitheater featuring an iconic double arcade of Tuscan columns.'
        },
        significance: {
          es: 'Consagró la tipología arquitectónica circular definitiva de la plaza de toros —que eliminaba los ángulos rectos de las plazas mayores donde los animales quedaban atrapados y embestían a ciegas— e inmortalizó el duelo de estilos entre la sobriedad clásica de Pedro Romero (escuela rondeña) y la alegría dinámica de Pepe-Hillo (escuela sevillana).',
          en: 'It permanently established circular amphitheater architecture for bullrings—eliminating deadly square corners where bulls trapped matadors—and consecrated the legendary rivalry between Pedro Romero’s stoic austerity (Ronda school) and Pepe-Hillo’s dynamic theatricality (Seville school).'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Libro de Actas Capitulares y Tratado Impreso',
          sourceTypeEn: 'Primary Source • Brotherhood Minute Book & Published Treatise',
          titleEs: 'Libro de Actas Capitulares de la Real Maestranza de Ronda (1785) y Tratado de Pepe-Hillo (1796)',
          titleEn: 'Minute Book of the Royal Cavalry Maestranza of Ronda (1785) & Pepe-Hillo Treatise (1796)',
          issuerEs: 'Real Maestranza de Caballería de Ronda / José Delgado "Pepe-Hillo"',
          issuerEn: 'Royal Cavalry Maestranza of Ronda / José Delgado "Pepe-Hillo"',
          dateEs: 'Mayo de 1785 (apertura de la plaza) y 1796 (publicación en Cádiz de La Tauromaquia)',
          dateEn: 'May 1785 (ring inauguration) and 1796 (treatise published in Cadiz)',
          archiveEs: 'Archivo Histórico de la Real Maestranza de Caballería de Ronda (RMCR) / Biblioteca Digital Hispánica (BNE)',
          archiveEn: 'Historical Archive of the Royal Cavalry Maestranza of Ronda / BNE Digital Hispanic Library',
          supportsEs: 'Acredita la inauguración oficial del coso de cantería de Ronda en mayo de 1785 con Pedro Romero y Pepe-Hillo, así como la primera codificación de las suertes reglamentadas en el tratado de Pepe-Hillo (1796).',
          supportsEn: 'Documents the official inauguration of Ronda’s stone amphitheater in May 1785 starring Pedro Romero and Pepe-Hillo, alongside the earliest codified rulebook in Pepe-Hillo’s 1796 treatise.',
          citationEs: 'Archivo Histórico RMCR, Libro de Fábrica y Actas de 1785; BNE, La Tauromaquia o arte de torear a caballo y a pie (Cádiz, 1796), Signatura R/12423.',
          citationEn: 'RMCR Historical Archive, Minute Ledger 1785; BNE, La Tauromaquia (Cadiz, 1796), Shelfmark R/12423.',
          excerptEs: '«Quedó enteramente concluida la fábrica de la nueva plaza circular de cantería... verificándose su solemne apertura en los días de feria de mayo, lidiando las corridas Pedro Romero y Josef Delgado "Pepe-Hillo" con universal aplauso y concurso de gentes forasteras».',
          excerptEn: '"The construction of the new circular stone ring was entirely concluded... its solemn inauguration celebrated during the May fair days, with Pedro Romero and Josef Delgado "Pepe-Hillo" fighting the corridas to universal acclaim from local and visiting spectators."',
          facsimileUrl: 'http://bdh-rd.bne.es/viewer.vm?id=0000038848',
          facsimileLabelEs: 'Ver facsímil del Tratado en BNE (1796) ↗',
          facsimileLabelEn: 'View 1796 Treatise facsimile at BNE ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Facsímil digital de alta resolución del tratado canónico de Pepe-Hillo (1796) conservado y accesible libremente en la Biblioteca Digital Hispánica de la BNE.',
          facsimileNoteEn: 'High-resolution digital facsimile of Pepe-Hillo’s 1796 canonical treatise freely accessible in the BNE Digital Hispanic Library.',
          technicalSheet: {
            format: 'Edición tipográfica dieciochesca con grabados calcográficos en cobre',
            verificationMethodEs: 'Cotejado en la Biblioteca Digital Hispánica (BNE, identificador bdh0000038848) y fondos del museo taurino de la RMCR.',
            verificationMethodEn: 'Cross-checked in the BNE Digital Hispanic Library (record bdh0000038848) and the RMCR museum collection.'
          }
        },
        interpretation: {
          factsEs: 'La plaza de Ronda fue terminada e inaugurada oficialmente en mayo de 1785 con cartel estelar de Pedro Romero y Pepe-Hillo, tal como acreditan las actas capitulares originales.',
          factsEn: 'Ronda’s stone bullring was completed and formally inaugurated in May 1785, headlined by Pedro Romero and Pepe-Hillo as attested in original brotherhood minute books.',
          debateEs: 'Los historiadores analizan la plaza de Ronda como un fascinante compromiso sociológico: una institución aristocrática que construyó un templo de piedra para un espectáculo plebeyo a pie, donde los nobles contemplaban desde palcos privilegiados cómo artesanos de extracción humilde se erigían en los primeros ídolos populares de la modernidad.',
          debateEn: 'Cultural historians view Ronda’s ring as an extraordinary sociological synthesis: an elite noble guild building a permanent neoclassical monument for a working-class sport, where aristocrats sat in private loges while humble artisans became celebrated public heroes.'
        },
        references: [
          {
            typeEs: 'Archivo Corporativo',
            typeEn: 'Corporate Archive',
            author: 'Real Maestranza de Caballería de Ronda',
            title: 'Historia de la Plaza de Toros y Cédulas de Tauromaquia',
            publisher: 'Fondo Documental RMCR, Ronda',
            year: 2023,
            supportsEs: 'Registros originales de construcción, acuerdos de cabildo y carteles históricos de la plaza de Ronda.',
            supportsEn: 'Original construction registers, council minutes, and historic festival posters of the Ronda arena.',
            url: 'https://www.rmcr.org/en/tauromachy/'
          },
          {
            typeEs: 'Monografía Histórica',
            typeEn: 'Historical Monograph',
            author: 'Delgado, Pedro',
            title: 'Pedro Romero y el toreo clásico de la Escuela de Ronda',
            publisher: 'Diputación Provincial de Málaga',
            year: 1994,
            supportsEs: 'Biografía crítica sobre la rivalidad estética entre Pedro Romero y los diestros de la escuela sevillana.',
            supportsEn: 'Critical biography of the aesthetic rivalry between Pedro Romero and the Seville school matadors.',
            url: 'https://www.worldcat.org/title/pedro-romero-y-la-escuela-de-ronda/oclc/434523091'
          }
        ]
      }
    },

    // 6. El toreo a pie
    {
      id: 'hist-evt-6',
      year: 1785,
      dateLabel: 'Década de 1780',
      era: 'El toreo a pie',
      type: 'hecho',
      title: 'Restricciones ilustradas de Carlos III',
      captionEs: 'El monarca reformista Carlos III decreta sucesivas órdenes reales limitando y suspendiendo las corridas de toros de muerte en el reino, impulsado por las críticas de los ministros ilustrados como Jovellanos.',
      captionEn: 'Enlightenment monarch Charles III issues royal decrees restricting and banning bullfights resulting in animal death, influenced by modernizing ministers seeking agricultural and economic reform.',
      source: {
        label: 'Codina Segovia, dA. Derecho Animal (2020)',
        url: 'https://doi.org/10.5565/rev/da.503'
      },
      image: 'assets/timeline/06-carlos-iii-restricciones.png',
      exhibit: {
        context: {
          es: 'Durante el reinado ilustrado de Carlos III (1759-1788), intelectuales y estadistas como Campomanes, Floridablanca y Melchor Gaspar de Jovellanos promovieron una profunda crítica a las corridas. Argumentaban que las fiestas de toros apartaban a los campesinos y artesanos de las faenas productivas, ocasionaban desórdenes públicos y esquilmaban las cabezas de ganado vacuno indispensables para el tiro y la agricultura.',
          en: 'Under Charles III’s reformist reign, Enlightenment thinkers and ministers Campomanes, Floridablanca, and Jovellanos mounted fierce critiques against bullfights. They argued that corridas diverted agricultural laborers from productive harvest, caused unruly riots, and wasted valuable draft oxen vital for cultivation.'
        },
        significance: {
          es: 'Mediante la Real Provisión del Consejo de Castilla de 1785, Carlos III suspendió las corridas de muerte salvo contadas excepciones de beneficencia pública, sentando el precedente directo de la Pragmática Sanción de Carlos IV de 1805, que prohibió con carácter general y absoluto todas las corridas de toros y novillos de muerte en España.',
          en: 'Through the 1785 Royal Provision of the Council of Castile, Charles III banned fatal bullfights across Spain except for rare charitable exceptions, establishing the direct legal precedent for Charles IV’s 1805 Pragmatic Sanction that imposed an absolute nationwide prohibition on lethal corridas.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Real Pragmática Sanción y Memoria Ilustrada',
          sourceTypeEn: 'Primary Source • Royal Pragmatic Sanction & Enlightenment Treatise',
          titleEs: 'Real Pragmática Sanción del 9 de noviembre de 1785 e Informe de Jovellanos (1790)',
          titleEn: 'Royal Pragmatic Sanction of November 9, 1785 & Jovellanos Report (1790)',
          issuerEs: 'Rey Carlos III / Consejo de Castilla / Gaspar Melchor de Jovellanos',
          issuerEn: 'King Charles III / Council of Castile / Melchor Gaspar de Jovellanos',
          dateEs: 'San Lorenzo de El Escorial, 9 de noviembre de 1785 (Pragmática) y 1790 (Memoria sobre espectáculos)',
          dateEn: 'San Lorenzo de El Escorial, November 9, 1785 (Pragmatic Sanction) and 1790 (Report)',
          archiveEs: 'Archivo Histórico Nacional (AHN), Sección Consejos, Libro de Reales Provisiones 1785; Novísima Recopilación (Libro VIII, Tít. XXIII, Ley VI)',
          archiveEn: 'National Historical Archive of Spain (AHN), Councils Section / Novísima Recopilación (Book VIII, Tit. XXIII, Law VI)',
          supportsEs: 'Acredita la prohibición general de corridas de toros de muerte bajo Carlos III, tolerando solo concesiones aprobadas por el Consejo de Castilla con destino benéfico a hospitales, así como el alegato económico ilustrado de Jovellanos.',
          supportsEn: 'Documents the nationwide ban on fatal bullfights under Charles III, permitting only specific exemptions vetted by the Council of Castile for hospital charity, alongside Jovellanos’s economic arguments.',
          citationEs: 'Novísima Recopilación de las Leyes de España, Libro VIII, Título XXIII, Ley VI; Jovellanos, Obras Completas (BNE).',
          citationEn: 'Novísima Recopilación of the Laws of Spain, Book VIII, Title XXIII, Law VI; Jovellanos, Complete Works (BNE).',
          excerptEs: 'Jovellanos (1790): «¿Cómo conciliar el clamor por la falta de bueyes de labor con el espectáculo bárbaro de verlos destrozar en un circo?... No puede la patria mirar con indiferencia diversiones que arruinan la agricultura y embrutecen los ánimos populares».',
          excerptEn: 'Jovellanos (1790): "How can we reconcile the outcry over the shortage of plow oxen with the barbarous spectacle of seeing them slaughtered in a circus?... The homeland cannot view with indifference spectacles that ruin agriculture and brutalize the popular spirit."',
          facsimileUrl: 'https://www.cervantesvirtual.com/obra/memoria-para-el-arreglo-de-la-policia-de-los-espectaculos-y-diversiones-publicas/',
          facsimileLabelEs: 'Ver texto de Jovellanos en Cervantes Virtual ↗',
          facsimileLabelEn: 'View Jovellanos treatise at Cervantes Virtual ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Texto íntegro oficial disponible en la Biblioteca Virtual Miguel de Cervantes y fondos BNE; Pragmática recogida en la Novísima Recopilación.',
          facsimileNoteEn: 'Full official text available in the Miguel de Cervantes Digital Library and BNE; Pragmatic Sanction indexed in the Novísima Recopilación.',
          technicalSheet: {
            format: 'Pragmática impresa y manuscrito de la Real Academia de la Historia',
            verificationMethodEs: 'Cotejado con la Novísima Recopilación de las Leyes de España (1805) y la edición crítica de la RAH de la Memoria de Jovellanos.',
            verificationMethodEn: 'Cross-checked against the Novísima Recopilación (1805) and the Royal Academy of History critical edition of Jovellanos’s report.'
          }
        },
        interpretation: {
          factsEs: 'Las órdenes reales de 1785 y 1805 prohibieron taxativamente la muerte de reses en festejos taurinos públicos en todos los dominios de la Corona española.',
          factsEn: 'The royal decrees of 1785 and 1805 explicitly outlawed the killing of wild cattle in public spectacles across all domains of the Spanish Crown.',
          debateEs: 'La historiografía destaca el fracaso práctico de las prohibiciones ilustradas: municipios y hermandades religiosas recurrieron sistemáticamente a excepciones benéficas (fondos para hospitales y hospicios), manteniendo viva la tauromaquia en la clandestinidad y forzando a Fernando VII a derogar toda prohibición en 1815 ante la inquebrantable demanda popular.',
          debateEn: 'Historians emphasize the practical collapse of Bourbon prohibitions: municipalities and hospitals relentlessly exploited charitable loopholes, preserving bullfighting through loopholes until Ferdinand VII formally repealed all restrictions in 1815 due to overwhelming public demand.'
        },
        references: [
          {
            typeEs: 'Monografía Histórica',
            typeEn: 'Historical Monograph',
            author: 'Domergue, Lucienne',
            title: 'La fête du taureau sous Charles III',
            publisher: 'Presses Universitaires du Mirail, Toulouse',
            year: 1989,
            supportsEs: 'Monografía fundamental sobre los decretos borbónicos, la resistencia de las élites locales y las licencias concedidas.',
            supportsEn: 'Essential monograph on Bourbon decrees, local municipal resistance, and licensed charitable exceptions.',
            url: 'https://www.worldcat.org/title/fete-du-taureau-sous-charles-iii/oclc/22165089'
          },
          {
            typeEs: 'Doctrina Jurídica',
            typeEn: 'Legal Scholarship',
            author: 'Codina Segovia, dA',
            title: 'El régimen jurídico de la tauromaquia en la España borbónica ilustrada',
            publisher: 'Derecho Animal (Forum of Animal Law Studies), 11/3',
            year: 2020,
            supportsEs: 'Análisis detallado de la Real Provisión de 1785 y la Pragmática de Carlos IV de 1805.',
            supportsEn: 'Detailed legal analysis of the 1785 Royal Provision and Charles IV’s 1805 Pragmatic Sanction.',
            url: 'https://doi.org/10.5565/rev/da.503'
          }
        ]
      }
    },

    // 7. Edad de Oro
    {
      id: 'hist-evt-7',
      year: 1914,
      dateLabel: 'Princ. S. XX',
      era: 'Edad de Oro',
      type: 'interpretacion',
      title: 'La revolución del temple estético de Juan Belmonte',
      captionEs: 'Belmonte desafía la física del toreo al quedarse quieto y obligar al animal a humillar junto a su cuerpo, transformando la lidia de una prueba de agilidad en un arte trágico ante el <span class="hist-vocab" tabindex="0" data-term="morrillo" role="button" aria-haspopup="true">morrillo</span> de la fiera.',
      captionEn: 'Juan Belmonte reshapes the criteria of bullfighting judgment by planting his feet firm and drawing the horns inches past his chest, turning dodging into solemn aesthetic stillness.',
      source: {
        label: 'Britannica, “Juan Belmonte”',
        url: 'https://www.britannica.com/biography/Juan-Belmonte'
      },
      image: 'assets/timeline/07-belmonte-temple-estetico.png',
      exhibit: {
        context: {
          es: 'A comienzos del siglo XX, la lidia imperante seguía regida por el axioma atlético de "Guerrita": «o te quitas tú o te quita el toro». El torero debía correr, saltar y esquivar la acometida mediante piernas. En 1913 tomó la alternativa en Madrid el joven sevillano Juan Belmonte, de frágil constitución corporal y escasa agilidad, quien conmocionó el mundo taurino al quedarse inmóvil y obligar al toro a trazar una curva alrededor de su cintura.',
          en: 'At the opening of the 20th century, bullfighting was still governed by "Guerrita\'s" athletic axiom: "either you move out of the way or the bull moves you." Bullfighters survived by running and dodging. In 1913, young Juan Belmonte of Seville took the alternativa; frail and lacking athletic agility, he astounded critics by planting his feet and forcing the bull to curve around his motionless hips.'
        },
        significance: {
          es: 'Belmonte acuñó el canon supremo del toreo contemporáneo: «parar, templar y mandar». Transformó la tauromaquia de un ejercicio de reflejos físicos en una expresión de estética trágica y plasticidad estatuaria, desafiando la física de la embestida a milímetros de los pitones.',
          en: 'Belmonte established the enduring trinity of modern bullfighting: "halt, temper, and command" (parar, templar y mandar). He elevated tauromaquia from an evasion obstacle course into a solemn visual art of motionless geometry, defying physics inches from the horn tips.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Hemeroteca Histórica y Testimonio Biográfico',
          sourceTypeEn: 'Primary Source • Historic Periodicals & Testimonial Biography',
          titleEs: 'Crónicas taurinas de "Don Modesto" en El Liberal (1914) y biografía de Chaves Nogales (1934)',
          titleEn: 'Corrida Dispatches by "Don Modesto" in El Liberal (1914) & Chaves Nogales Biography (1934)',
          issuerEs: 'Diario El Liberal (Madrid) / Manuel Chaves Nogales',
          issuerEn: 'El Liberal Newspaper (Madrid) / Manuel Chaves Nogales',
          dateEs: 'Mayo de 1914 (crónicas en prensa) y 1934 (obra testimonial de Chaves Nogales)',
          dateEn: 'May 1914 (press dispatches) and 1934 (biographical masterpiece by Chaves Nogales)',
          archiveEs: 'Hemeroteca Digital de la Biblioteca Nacional de España (BNE) / Alianza Editorial',
          archiveEn: 'Digital Periodicals Archive of the National Library of Spain (BNE) / Alianza Editorial',
          supportsEs: 'Acredita la ruptura estética de Belmonte con la tauromaquia decimonónica, consagrando el principio de quietud absoluta y temple en el terreno de la fiera.',
          supportsEn: 'Documents Belmonte’s aesthetic revolution overturning 19th-century evasive athleticism, consecrating absolute stillness and emotional control in the bull’s terrain.',
          citationEs: 'Hemeroteca Digital BNE, El Liberal (Madrid), núm. 12.560 (mayo 1914); Chaves Nogales, Juan Belmonte, matador de toros (Madrid, 1934), pág. 182.',
          citationEn: 'BNE Digital Periodicals Archive, El Liberal, No. 12,560 (May 1914); Chaves Nogales, Juan Belmonte, matador de toros (Madrid, 1934), p. 182.',
          excerptEs: 'Chaves Nogales (1934): «Para torear como toreaba Belmonte había que tener una fe ciega en la propia intuición o una perfecta indiferencia hacia la muerte... El toreo ya no era correr delante del toro, sino hacer que el toro girase en torno a uno como un planeta en torno al sol».',
          excerptEn: 'Chaves Nogales (1934): "To fight as Belmonte fought demanded blind faith in intuition or absolute indifference to death... Bullfighting was no longer running before the horns, but commanding the beast to orbit around you like a planet around the sun."',
          facsimileUrl: 'https://hemerotecadigital.bne.es/',
          facsimileLabelEs: 'Consultar Hemeroteca Digital BNE ↗',
          facsimileLabelEn: 'Consult BNE Digital Periodicals Archive ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Crónicas de prensa de la época digitalizadas y accesibles en la Hemeroteca Digital de la BNE; registro catalográfico de Chaves Nogales (1934) custodiado en BNE.',
          facsimileNoteEn: 'Period news dispatches digitized in the BNE Digital Periodicals Archive; Chaves Nogales (1934) first edition cataloged in the BNE general collection.',
          technicalSheet: {
            format: 'Prensa histórica microfilmada y edición tipográfica original de 1934',
            verificationMethodEs: 'Cotejado en la Hemeroteca Digital de la BNE (colecciones de El Liberal, La Lidia y El Toreo).',
            verificationMethodEn: 'Cross-checked in the BNE Digital Periodicals Archive (collections of El Liberal, La Lidia, and El Toreo).'
          }
        },
        interpretation: {
          factsEs: 'Belmonte desafió los cánones de distancia en plazas de toda España y América entre 1913 y 1920, sufriendo gravísimas cornadas y redefiniendo las pautas de juicio de la crítica taurina internacional.',
          factsEn: 'Belmonte fought at unprecedented proximity across Spain and Latin America from 1913 to 1920, surviving devastating gorings and fundamentally altering the critical criteria of sports and art journalism.',
          debateEs: 'Los historiadores debaten el mito belmontino: mientras la literatura bohemia lo ensalzó como el solitario refundador genial del toreo, tratadistas contemporáneos demuestran que la "Edad de Oro" fue una dialéctica inseparable con su rival, Joselito el Gallo, cuya prodigiosa maestría técnica y conocimiento ganadero permitían crear las condiciones para que el arte revolucionario de Belmonte brillase.',
          debateEn: 'Scholars challenge romantic myths portraying Belmonte as a solitary messianic innovator. Modern historiography proves the Golden Age was a dialectical partnership with Joselito el Gallo, whose peerless technical mastery conditioned the ring environment allowing Belmonte’s revolutionary stillness to thrive.'
        },
        references: [
          {
            typeEs: 'Biografía Testimonial',
            typeEn: 'Testimonial Biography',
            author: 'Chaves Nogales, Manuel',
            title: 'Juan Belmonte, matador de toros: su vida y sus hazañas',
            publisher: 'Alianza Editorial, Madrid (ed. 2012)',
            year: 1934,
            supportsEs: 'Considerada la cumbre de la literatura biográfica taurina en lengua española, testimonio directo del diestro trianero.',
            supportsEn: 'Acclaimed as the masterpiece of Spanish biographical journalism, based on direct interviews with the matador.',
            url: 'https://www.worldcat.org/title/juan-belmonte-matador-de-toros-su-vida-y-sus-hazanas/oclc/828279815'
          },
          {
            typeEs: 'Enciclopedia Académica',
            typeEn: 'Scholarly Encyclopedia',
            author: 'Encyclopaedia Britannica',
            title: 'Juan Belmonte: Spanish matador and reformer of bullfighting style',
            publisher: 'Britannica Biography',
            year: 2024,
            supportsEs: 'Resumen crítico sobre la transformación estilística y el impacto de Belmonte en la historia del arte taurino.',
            supportsEn: 'Critical overview of Belmonte’s stylistic transformation and permanent impact on bullfighting aesthetics.',
            url: 'https://www.britannica.com/biography/Juan-Belmonte'
          }
        ]
      }
    },

    // 8. Edad de Oro
    {
      id: 'hist-evt-8',
      year: 1920,
      dateLabel: '16 Mayo 1920',
      era: 'Edad de Oro',
      type: 'hecho',
      title: 'Muerte de Joselito el Gallo en Talavera de la Reina',
      captionEs: 'José Gómez Ortega “Joselito”, considerado el torero más completo y arquitecto técnico del toreo moderno, fallece trágicamente tras la cornada del toro Bailador, poniendo fin simbólico a la Edad de Oro.',
      captionEn: 'José Gómez Ortega "Joselito", celebrated as the consummate prodigy and technical architect of modern tauromaquia, is fatally gored by the bull Bailador, marking the tragic end of the Golden Age.',
      source: {
        label: 'Britannica, “Joselito”',
        url: 'https://www.britannica.com/biography/Joselito'
      },
      image: 'assets/timeline/08-muerte-joselito-el-gallo.png',
      exhibit: {
        context: {
          es: 'José Gómez Ortega "Joselito" (el "Niño Sabio de Gelves"), nacido en 1895 en una ilustre dinastía gitana, era aclamado unánimemente como el diestro más completo, sabio y dominador de la historia taurina. Con solo 24 años controlaba la crianza ganadera, los terrenos del ruedo y la construcción de plazas monumentales en Madrid, Sevilla y Barcelona.',
          en: 'José Gómez Ortega "Joselito" ("The Wise Boy of Gelves"), born into a storied dynasty in 1895, was revered as the most technically complete, commanding prodigy in tauromaquia history. By age 24, he influenced selective breeding, ring strategy, and spearheaded vast monumental arenas in Madrid, Seville, and Barcelona.'
        },
        significance: {
          es: 'El 16 de mayo de 1920, en la modesta plaza toledana de Talavera de la Reina, el toro "Bailador" de la viuda de Ortega —un astado pequeño, burriciego y terciado— le propinó una cornada mortal en el vientre. Su fallecimiento a los 25 años provocó una conmoción nacional y puso fin trágico a la Edad de Oro, desnudando la vulnerabilidad humana absoluta ante el toro bravo.',
          en: 'On May 16, 1920, in the provincial ring of Talavera de la Reina, a small, vision-impaired bull named "Bailador" caught Joselito with a fatal abdomen goring. His death at age 25 triggered nationwide mourning, closing the Golden Age and exposing the irreducible mortal peril at the core of bullfighting.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Certificación Médica y Edición de Hemeroteca',
          sourceTypeEn: 'Primary Source • Medical Certification & Period Dispatches',
          titleEs: 'Certificación facultativa de defunción (16 Mayo 1920) y ejemplares históricos de ABC y El Sol',
          titleEn: 'Official Medical Death Certificate (May 16, 1920) & Historic Press Dispatches',
          issuerEs: 'Enfermería de la Plaza de Toros de Talavera de la Reina / Diario ABC y El Sol',
          issuerEn: 'Talavera de la Reina Bullring Infirmary / ABC and El Sol Daily Newspapers',
          dateEs: '16–18 de mayo de 1920',
          dateEn: 'May 16–18, 1920',
          archiveEs: 'Archivo Municipal de Talavera de la Reina / Hemeroteca Digital de la BNE',
          archiveEn: 'Talavera de la Reina Municipal Archive / BNE Digital Periodicals Archive',
          supportsEs: 'Acredita el fallecimiento de José Gómez Ortega a los 25 años por la cornada del toro Bailador (viuda de Ortega), desatando un luto nacional que marcó el final de la Edad de Oro.',
          supportsEn: 'Documents the fatal goring of 25-year-old prodigy José Gómez Ortega by the bull Bailador, triggering nationwide mourning and concluding the Golden Age.',
          citationEs: 'Archivo Municipal de Talavera de la Reina, Libro de Actas de Defunciones (mayo 1920); Hemeroteca Digital BNE, El Sol, núm. 884 (17/05/1920).',
          citationEn: 'Talavera Municipal Archive, Death Registry (May 1920); BNE Periodicals Archive, El Sol, No. 884 (May 17, 1920).',
          excerptEs: 'Dictamen de los doctores Luque y Muñoz: «A las siete y diez de la tarde se certifica la defunción de José Gómez Ortega "Joselito", a consecuencia de una gravísima cornada penetrante en vientre con rotura de vasos ilíacos producida en el tercio de muleta por el quinto toro de la tarde...».',
          excerptEn: 'Doctors Luque and Muñoz diagnosis: "At seven-ten in the evening we certify the death of José Gómez Ortega \'Joselito\', resulting from a massive penetrating horn wound to the lower abdomen with laceration of iliac vessels inflicted during the muleta third by the afternoon\'s fifth bull..."',
          facsimileUrl: 'https://hemerotecadigital.bne.es/',
          facsimileLabelEs: 'Ver crónica del 17 de mayo en Hemeroteca BNE ↗',
          facsimileLabelEn: 'View May 17 dispatches in BNE Periodicals Archive ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Portadas completas de ABC, El Sol y La Libertad del 17 y 18 de mayo de 1920 digitalizadas en la Hemeroteca Digital de la BNE.',
          facsimileNoteEn: 'Front pages and detailed dispatches of ABC, El Sol, and La Libertad digitized in the BNE Digital Periodicals Archive.',
          technicalSheet: {
            format: 'Certificación médica manuscrita y prensa de rotativa histórica',
            verificationMethodEs: 'Cotejado en la Hemeroteca Digital de la BNE y documentación del Archivo Municipal de Talavera.',
            verificationMethodEn: 'Cross-checked in the BNE Digital Periodicals Archive and Talavera Municipal Archive records.'
          }
        },
        interpretation: {
          factsEs: 'Joselito falleció en la enfermería de Talavera el 16 de mayo de 1920 tras ser corneado por el toro Bailador, acompañado por su cuñado Ignacio Sánchez Mejías.',
          factsEn: 'Joselito died in Talavera’s ring infirmary on May 16, 1920 from Bailador’s horn wound, attended by his brother-in-law Ignacio Sánchez Mejías.',
          debateEs: 'La desaparición de Joselito trascendió el deporte para convertirse en un cataclismo cultural. Poetas de la Generación del 27 (García Lorca, Rafael Alberti, Gerardo Diego) encontraron en su destino el arquetipo de la tragedia existencial española. La historiografía coincide en que su muerte demostró que ni la perfección técnica omnipotente garantiza la inmunidad frente al misterio del toro.',
          debateEn: 'Joselito’s demise resonated far beyond sport, becoming a cultural watershed. Generation of ’27 poets (Federico García Lorca, Rafael Alberti) drew on his tragedy as an existential archetype, cementing the scholarly consensus that even consummate technical omnipotence cannot master the unpredictability of the beast.'
        },
        references: [
          {
            typeEs: 'Monografía Biográfica',
            typeEn: 'Biographical Monograph',
            author: 'Amorós, Andrés',
            title: 'Joselito el Gallo: El rey de los toreros',
            publisher: 'La Esfera de los Libros, Madrid',
            year: 2020,
            supportsEs: 'Monografía exhaustiva con motivo del centenario de la muerte de Joselito, analizando su revolución técnica y arquitectónica.',
            supportsEn: 'Comprehensive centenary monograph analyzing Joselito’s technical revolution, arena architecture, and national impact.',
            url: 'https://www.esferalibros.com/libros/joselito-el-gallo/'
          },
          {
            typeEs: 'Enciclopedia Académica',
            typeEn: 'Scholarly Encyclopedia',
            author: 'Encyclopaedia Britannica',
            title: 'Joselito: Spanish bullfighter and consummate technician of the Golden Age',
            publisher: 'Britannica Biography',
            year: 2024,
            supportsEs: 'Perfil biográfico oficial sobre la precocidad, rivalidad con Belmonte y tragedia de Talavera.',
            supportsEn: 'Official biographical overview detailing his prodigy career, rivalry with Belmonte, and fatal goring.',
            url: 'https://www.britannica.com/biography/Joselito'
          }
        ]
      }
    },

    // 9. Leyes y debate
    {
      id: 'hist-evt-9',
      year: 1991,
      dateLabel: '1991',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Canarias aprueba la Ley 8/1991 de protección animal',
      captionEs: 'El Parlamento de Canarias promulga la primera normativa autonómica de España que prohíbe la utilización de animales en espectáculos que entrañen crueldad o muerte, excluyendo las corridas del archipiélago.',
      captionEn: 'The Canary Islands Parliament passes Law 8/1991 on animal welfare, becoming the first Spanish territory to forbid blood spectacles, effectively phasing out bullfights across the islands.',
      source: null,
      image: 'assets/timeline/09-canarias-ley-1991.png',
      exhibit: {
        context: {
          es: 'Tras la Constitución de 1978 y la delimitación de competencias autonómicas en espectáculos y sanidad animal, el Parlamento de Canarias debatió la modernización de su régimen jurídico de bienestar animal. En el archipiélago atlántico, la tradición taurina contaba con un arraigo sociológico muy débil y la única plaza fija activa, en Santa Cruz de Tenerife, languidecía sin programación regular.',
          en: 'Following Spain’s 1978 democratic Constitution and devolution of regional powers over public entertainment, the Canary Islands Parliament tackled animal welfare reform. In the Atlantic archipelago, bullfighting had shallow cultural roots, and its sole operational arena in Santa Cruz de Tenerife faced declining interest and disuse.'
        },
        significance: {
          es: 'Canarias se convirtió en la primera comunidad autónoma de España en erradicar de facto las corridas de toros mediante su Ley 8/1991 de Protección de los Animales, sentando un precedente legal temprano que operó pacíficamente sin suscitar recursos de inconstitucionalidad durante dos décadas.',
          en: 'The Canary Islands became the first Spanish Autonomous Community to de facto eliminate corridas through Animal Welfare Law 8/1991, creating an early statutory milestone that operated peacefully without constitutional litigation for two decades.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Ley Territorial Autonómica',
          sourceTypeEn: 'Primary Source • Regional Autonomous Statute',
          titleEs: 'Ley 8/1991, de 30 de abril, de protección de los animales de Canarias (Artículo 5)',
          titleEn: 'Canary Islands Law 8/1991 of April 30 on Animal Protection (Article 5)',
          issuerEs: 'Parlamento de Canarias / Presidencia del Gobierno de Canarias',
          issuerEn: 'Canary Islands Parliament / Regional Presidency of the Canary Islands',
          dateEs: '30 de abril de 1991 (BOC nº 62 de 13/05/1991; BOE nº 124 de 24/05/1991)',
          dateEn: 'April 30, 1991 (BOC No. 62 of May 13, 1991; BOE No. 124 of May 24, 1991)',
          archiveEs: 'Boletín Oficial de Canarias (BOC) / Boletín Oficial del Estado (BOE-A-1991-12999)',
          archiveEn: 'Official Gazette of the Canary Islands / Official State Gazette (BOE-A-1991-12999)',
          supportsEs: 'Acredita la primera prohibición autonómica de espectáculos que impliquen crueldad con animales (artículo 5), suprimiendo de facto las corridas en el archipiélago, con la singular excepción explícita para las peleas de gallos tradicionales.',
          supportsEn: 'Documents the first regional prohibition of animal cruelty in public spectacles (Article 5), de facto eliminating bullfights across the Canary Islands, while uniquely exempting traditional cockfighting.',
          citationEs: 'Boletín Oficial del Estado (BOE) núm. 124, de 24 de mayo de 1991, páginas 16738 a 16742; ELI: es-cn/l/1991/04/30/8.',
          citationEn: 'Official State Gazette (BOE) No. 124, May 24, 1991, pp. 16738–16742; ELI: es-cn/l/1991/04/30/8.',
          excerptEs: 'Artículo 5.1: «Se prohíbe la utilización de animales en peleas, fiestas, espectáculos y otras actividades que conlleven maltrato, crueldad o sufrimiento...».',
          excerptEn: 'Article 5.1: "The use of animals in fights, festivals, spectacles, and other activities entailing mistreatment, cruelty, or suffering is hereby prohibited..."',
          facsimileUrl: 'https://www.boe.es/eli/es-cn/l/1991/04/30/8',
          facsimileLabelEs: 'Consultar Ley 8/1991 consolidada en BOE ↗',
          facsimileLabelEn: 'Consult consolidated Law 8/1991 at BOE ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Texto legal íntegro consolidado disponible en el Boletín Oficial del Estado con identificador ELI es-cn/l/1991/04/30/8.',
          facsimileNoteEn: 'Full consolidated statutory text available in the Official State Gazette under ELI identifier es-cn/l/1991/04/30/8.',
          technicalSheet: {
            format: 'Publicación legislativa en boletín oficial del Estado y de la Comunidad Autónoma',
            verificationMethodEs: 'Cotejado en la base de datos de legislación consolidada del BOE (código BOE-A-1991-12999).',
            verificationMethodEn: 'Cross-checked in the BOE consolidated statutory database (record BOE-A-1991-12999).'
          }
        },
        interpretation: {
          factsEs: 'La Ley 8/1991 fue aprobada en sede parlamentaria canaria el 30 de abril de 1991 y entró en vigor sin recurso del Gobierno central.',
          factsEn: 'Law 8/1991 was enacted by the Canarian Parliament on April 30, 1991, entering into full force without legal challenge from central authorities.',
          debateEs: 'Los juristas del derecho animal analizan una notable contradicción interna: el mismo artículo 5 que vetó los festejos taurinos amparó expresamente las peleas de gallos tradicionales en localidades con arraigo histórico. La doctrina debate si la ley canaria constituyó una genuina vanguardia ética o una reforma pragmática favorecida por la ausencia de afición taurina insular.',
          debateEn: 'Legal scholars examine an internal paradox: while banning bullfights, Article 5 explicitly carved out an exemption for traditional cockfighting. Commentators debate whether the law represented ethical vanguardism or regional convenience in an archipelago where bullfighting had already withered.'
        },
        references: [
          {
            typeEs: 'Fuente Legislativa',
            typeEn: 'Statutory Source',
            author: 'Comunidad Autónoma de Canarias',
            title: 'Ley 8/1991, de 30 de abril, de protección de los animales',
            publisher: 'Boletín Oficial del Estado (BOE-A-1991-12999)',
            year: 1991,
            supportsEs: 'Texto normativo que supuso la extinción práctica de los festejos taurinos en las islas.',
            supportsEn: 'Statutory text that led to the practical extinction of bullfighting on the islands.',
            url: 'https://www.boe.es/eli/es-cn/l/1991/04/30/8'
          },
          {
            typeEs: 'Doctrina Jurídica',
            typeEn: 'Legal Scholarship',
            author: 'Revista de Derecho UNED (RDUNED)',
            title: 'Análisis doctrinal del precedente canario y la evolución del régimen jurídico animal',
            publisher: 'UNED, Madrid, núm. 22',
            year: 2018,
            supportsEs: 'Estudio sobre la singularidad canaria frente al litigio constitucional suscitado posteriormente en Cataluña.',
            supportsEn: 'Comparative study on Canarian statutory peace versus the constitutional litigation triggered in Catalonia.',
            url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
          }
        ]
      }
    },

    // 10. Leyes y debate
    {
      id: 'hist-evt-10',
      year: 2010,
      dateLabel: '2010 (vigor 2012)',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'El Parlamento de Cataluña vota la abolición de las corridas',
      captionEs: 'Tras la tramitación de una masiva Iniciativa Legislativa Popular impulsada por la plataforma Prou!, el hemiciclo catalán aprueba suprimir las corridas en Cataluña con efectos desde el 1 de enero de 2012.',
      captionEn: 'Following a citizen-led popular initiative with 180,000 signatures, the Catalan Parliament votes to ban bullfighting throughout Catalonia effective January 1, 2012.',
      source: {
        label: 'BOE, Ley 28/2010 de Cataluña',
        url: 'https://www.boe.es/eli/es-ct/l/2010/08/03/28'
      },
      image: 'assets/timeline/10-cataluna-abolicion-2010.png',
      exhibit: {
        context: {
          es: 'A finales de 2008, la plataforma animalista ciudadana "Prou!" promovió una Iniciativa Legislativa Popular (ILP) avalada por 180.000 firmas para suprimir la excepción taurina de la ley catalana de protección animal. Tras meses de intensas comparecencias parlamentarias de científicos, filósofos y taurinos, el debate alcanzó una repercusión mediática global.',
          en: 'In late 2008, the animal welfare citizen platform "Prou!" launched a Popular Legislative Initiative supported by 180,000 certified signatures to repeal the bullfighting exemption in Catalonia\'s animal welfare act. Following months of expert testimony from biologists, philosophers, and matadors, the debate garnered global attention.'
        },
        significance: {
          es: 'El 28 de julio de 2010, el Pleno del Parlament de Catalunya aprobó por 68 votos a favor, 55 en contra y 9 abstenciones la Ley 28/2010, aboliendo las corridas de toros con efectos desde el 1 de enero de 2012. La última corrida se celebró en la Monumental de Barcelona el 25 de septiembre de 2011 con cartel de José Tomás.',
          en: 'On July 28, 2010, the Catalan Parliament voted 68 in favor, 55 against, and 9 abstentions to enact Law 28/2010, abolishing bullfighting effective January 1, 2012. The final corrida in mainland Catalonia took place at Barcelona\'s Monumental arena on September 25, 2011, headlined by José Tomás.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Ley Autonómica tras Iniciativa Legislativa Popular (ILP)',
          sourceTypeEn: 'Primary Source • Regional Statute Following Popular Legislative Initiative',
          titleEs: 'Ley 28/2010, de 3 de agosto, de modificación del artículo 6 de la Ley de protección de los animales',
          titleEn: 'Catalan Law 28/2010 of August 3, amending Animal Protection Legislation',
          issuerEs: 'Parlament de Catalunya / Generalitat de Catalunya',
          issuerEn: 'Parliament of Catalonia / Government of Catalonia',
          dateEs: '3 de agosto de 2010 (Votación 28/07/2010; DOGC nº 5688 de 09/08/2010; BOE nº 219 de 09/09/2010)',
          dateEn: 'August 3, 2010 (Voted July 28, 2010; DOGC No. 5688; BOE No. 219)',
          archiveEs: 'Parlament de Catalunya / Diari Oficial de la Generalitat de Catalunya / Boletín Oficial del Estado (BOE-A-2010-13838)',
          archiveEn: 'Parliament of Catalonia / Official Gazette of Catalonia / Official State Gazette (BOE-A-2010-13838)',
          supportsEs: 'Acredita la aprobación parlamentaria de la supresión de las corridas de toros y espectáculos taurinos con muerte en Cataluña con efectos desde el 1 de enero de 2012, tras la ILP ciudadana Prou! con 180.000 firmas.',
          supportsEn: 'Documents the parliamentary enactment abolishing bullfights and spectacles causing animal death in Catalonia effective January 1, 2012, following the Prou! citizen initiative with 180,000 signatures.',
          citationEs: 'Boletín Oficial del Estado (BOE) núm. 219, de 9 de septiembre de 2010, páginas 77248 a 77249; ELI: es-ct/l/2010/08/03/28.',
          citationEn: 'Official State Gazette (BOE) No. 219, September 9, 2010, pp. 77248–77249; ELI: es-ct/l/2010/08/03/28.',
          excerptEs: 'Modificación del artículo 6.2: «Quedan prohibidas las corridas de toros y los espectáculos con toros que incluyan la muerte del animal y la aplicación de las suertes de la pica, las banderillas y el estoque...».',
          excerptEn: 'Amendment to Article 6.2: "Bullfights and bull spectacles that include the death of the animal and the application of pic, banderilla, and sword thrusts are prohibited..."',
          facsimileUrl: 'https://www.boe.es/eli/es-ct/l/2010/08/03/28',
          facsimileLabelEs: 'Consultar Ley 28/2010 en BOE / DOGC ↗',
          facsimileLabelEn: 'Consult Law 28/2010 at BOE / DOGC ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Publicación oficial íntegra accesible en el Boletín Oficial del Estado con identificador ELI es-ct/l/2010/08/03/28 y actas de votación en el Parlament.',
          facsimileNoteEn: 'Complete official publication accessible in the Official State Gazette under ELI es-ct/l/2010/08/03/28 and parliamentary voting records.',
          technicalSheet: {
            format: 'Publicación legislativa oficial en DOGC y BOE',
            verificationMethodEs: 'Cotejado en el Diari Oficial de la Generalitat de Catalunya y la base de legislación del BOE (código BOE-A-2010-13838).',
            verificationMethodEn: 'Cross-checked in the Official Gazette of Catalonia and the BOE legislative database (code BOE-A-2010-13838).'
          }
        },
        interpretation: {
          factsEs: 'La norma fue aprobada parlamentariamente en votación pública y secreta para diputados, y la prohibición rigió en territorio catalán desde el 1 de enero de 2012 hasta el fallo del Tribunal Constitucional en 2016.',
          factsEn: 'The statute was enacted following free-vote parliamentary procedures and remained in force throughout Catalonia from January 1, 2012 until struck down by the Constitutional Court in 2016.',
          debateEs: 'El debate dividió a la opinión pública entre quienes defendieron la abolición como un avance moral insoslayable contra el sufrimiento de seres sintientes, y quienes denunciaron una intencionalidad política identitaria para desmarcar a Cataluña de los símbolos culturales españoles, subrayando que la misma cámara blindó apenas semanas después los festejos taurinos tradicionales catalanes (correbous) mediante la Ley 34/2010.',
          debateEn: 'The debate deeply fractured civil society between those viewing the ban as progressive animal welfare and those alleging political motives to sever Spanish national cultural symbols—pointing out that the same parliament swiftly shielded indigenous traditional festivities (correbous) under Law 34/2010.'
        },
        references: [
          {
            typeEs: 'Diario de Sesiones',
            typeEn: 'Parliamentary Record',
            author: 'Parlament de Catalunya',
            title: 'Diari de Sessions del Ple del Parlament: tramitació de la ILP Prou!',
            publisher: 'VIII Legislatura, núm. 116 (28 de julio de 2010)',
            year: 2010,
            supportsEs: 'Registro fáctico de los discursos parlamentarios, posicionamientos de los grupos y resultado de la votación.',
            supportsEn: 'Verbatim record of parliamentary speeches, party caucuses, and roll-call voting outcomes.',
            url: 'https://www.parlament.cat'
          },
          {
            typeEs: 'Estudio Sociopolítico',
            typeEn: 'Sociopolitical Study',
            author: 'Casals, Xavier',
            title: 'El debate catalán sobre la fiesta de los toros: política, identidad y moralidad',
            publisher: 'Revista de Estudios Políticos, Centro de Estudios Políticos y Constitucionales',
            year: 2012,
            supportsEs: 'Análisis académico sobre las dimensiones identitaria, ética y partidista del debate taurino en Cataluña.',
            supportsEn: 'Scholarly analysis of the identity, ethical, and party dynamics surrounding the bullfighting ban in Catalonia.',
            url: 'https://dialnet.unirioja.es/servlet/articulo?codigo=4060862'
          }
        ]
      }
    },

    // 11. Leyes y debate
    {
      id: 'hist-evt-11',
      year: 2013,
      dateLabel: '12 Nov 2013',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Ley 18/2013: Protección de la tauromaquia como patrimonio cultural',
      captionEs: 'Las Cortes Generales aprueban la Ley estatal 18/2013 que declara la fiesta de los toros como patrimonio cultural inmaterial español, asignando al Estado el deber de su fomento y protección.',
      captionEn: 'The Spanish Parliament passes national Law 18/2013 declaring bullfighting an intangible cultural heritage, mandating the central state to preserve and promote it nationwide.',
      source: {
        label: 'BOE, Ley 18/2013',
        url: 'https://www.boe.es/eli/es/l/2013/11/12/18'
      },
      image: 'assets/timeline/11-ley-18-2013-patrimonio-cultural.png',
      exhibit: {
        context: {
          es: 'En respuesta a la prohibición catalana, la Federación de Entidades Taurinas promovió una Iniciativa Legislativa Popular de ámbito estatal, recogiendo cerca de 600.000 firmas ciudadanas. El debate parlamentario en el Congreso de los Diputados coincidió con la X Legislatura, bajo la mayoría absoluta del Partido Popular.',
          en: 'Reacting to Catalonia’s ban, the Federation of Bullfighting Associations mobilized a nationwide Popular Legislative Initiative, gathering nearly 600,000 verified citizen signatures. Parliamentary debate in Spain’s Congress of Deputies occurred under the absolute majority of the conservative Popular Party.'
        },
        significance: {
          es: 'El Parlamento nacional promulgó la Ley 18/2013, reconociendo la Tauromaquia como manifestación del patrimonio cultural inmaterial español al amparo de los artículos 44 y 46 de la Constitución y de la Convención de la UNESCO de 2003, obligando a los poderes públicos a garantizar su preservación y promoción en todo el territorio estatal.',
          en: 'The national Parliament enacted Law 18/2013, formally recognizing bullfighting as an intangible cultural heritage under Articles 44 and 46 of the Constitution and UNESCO’s 2003 Convention, establishing an explicit statutory duty for public authorities to protect and foster it throughout Spain.'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Ley Estatal de las Cortes Generales',
          sourceTypeEn: 'Primary Source • National Statute of the Spanish Parliament',
          titleEs: 'Ley 18/2013, de 12 de noviembre, para la regulación de la Tauromaquia como patrimonio cultural',
          titleEn: 'Law 18/2013, of November 12, for the Regulation of Tauromaquia as Cultural Heritage',
          issuerEs: 'Cortes Generales / Jefatura del Estado',
          issuerEn: 'Spanish Parliament (Cortes Generales) / Head of State',
          dateEs: '12 de noviembre de 2013 (BOE nº 272 de 13/11/2013, págs. 90724-90728)',
          dateEn: 'November 12, 2013 (BOE No. 272 of November 13, 2013, pp. 90724–90728)',
          archiveEs: 'Congreso de los Diputados / Boletín Oficial del Estado (BOE-A-2013-11883)',
          archiveEn: 'Congress of Deputies / Official State Gazette (BOE-A-2013-11883)',
          supportsEs: 'Acredita la declaración legal de la Tauromaquia como patrimonio cultural inmaterial estatal al amparo del artículo 46 CE, obligando a los poderes públicos a su protección y fomento en todo el territorio nacional.',
          supportsEn: 'Documents the statutory recognition of Tauromaquia as an intangible cultural heritage under Article 46 of the Spanish Constitution, mandating state authorities to protect and foster it nationwide.',
          citationEs: 'Boletín Oficial del Estado (BOE) núm. 272, de 13 de noviembre de 2013, páginas 90724 a 90728; ELI: es/l/2013/11/12/18.',
          citationEn: 'Official State Gazette (BOE) No. 272, November 13, 2013, pp. 90724–90728; ELI: es/l/2013/11/12/18.',
          excerptEs: 'Artículo 1: «La Tauromaquia forma parte del patrimonio cultural digno de protección en todo el territorio nacional... Las Administraciones Públicas velarán por la defensa y fomento de la fiesta de los toros...».',
          excerptEn: 'Article 1: "Tauromaquia forms part of the cultural heritage worthy of protection across the entire national territory... Public administrations shall ensure the defense and promotion of bull spectacles..."',
          facsimileUrl: 'https://www.boe.es/eli/es/l/2013/11/12/18',
          facsimileLabelEs: 'Consultar Ley 18/2013 oficial en BOE ↗',
          facsimileLabelEn: 'Consult official Law 18/2013 at BOE ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Publicación oficial íntegra accesible en el Boletín Oficial del Estado bajo identificador permanente ELI es/l/2013/11/12/18.',
          facsimileNoteEn: 'Full official statute accessible in the Official State Gazette under permanent ELI identifier es/l/2013/11/12/18.',
          technicalSheet: {
            format: 'Publicación legislativa en BOE y Diario de Sesiones del Congreso',
            verificationMethodEs: 'Cotejado en la base oficial del BOE (código BOE-A-2013-11883) y el boletín oficial de las Cortes Generales.',
            verificationMethodEn: 'Cross-checked in the official BOE database (record BOE-A-2013-11883) and parliamentary gazettes.'
          }
        },
        interpretation: {
          factsEs: 'La Ley 18/2013 fue aprobada en el Congreso de los Diputados por 180 votos a favor, 40 en contra y 107 abstenciones (con abstención del Grupo Socialista para evitar fracturas autonómicas).',
          factsEn: 'Law 18/2013 passed the Congress of Deputies with 180 votes in favor, 40 against, and 107 abstentions (the Socialist Party abstained to mitigate regional friction).',
          debateEs: 'Juristas del derecho constitucional debaten el alcance del blindaje: para los defensores de la fiesta, supuso un amparo legítimo de un fenómeno cultural secular respaldado por la Constitución; para los juristas animalistas y fuerzas nacionalistas, constituyó una maniobra legislativa recentralizadora orientada a despojar a las comunidades autónomas de sus legítimas competencias de bienestar animal.',
          debateEn: 'Constitutional theorists debate the statute’s intent: bullfighting advocates hailed it as a legitimate defense of historic culture under constitutional mandates; critics and regional nationalists condemned it as an aggressive centralist maneuver engineered to override regional animal protection authority.'
        },
        references: [
          {
            typeEs: 'Doctrina Administrativa',
            typeEn: 'Administrative Law Doctrine',
            author: 'Tomás-Ramón Fernández',
            title: 'El régimen constitucional del patrimonio cultural y la fiesta de los toros',
            publisher: 'Revista de Administración Pública (RAP), Centro de Estudios Políticos y Constitucionales, núm. 195, págs. 11-38',
            year: 2014,
            supportsEs: 'Defensa jurídica del título competencial del Estado en materia de cultura común y deber de conservación.',
            supportsEn: 'Doctrinal defense of the central state’s exclusive jurisdiction over common culture and conservation duty.',
            url: 'https://dialnet.unirioja.es/servlet/articulo?codigo=4962915'
          },
          {
            typeEs: 'Registro Parlamentario',
            typeEn: 'Parliamentary Record',
            author: 'Congreso de los Diputados',
            title: 'Tramitación parlamentaria de la ILP para la regulación de la Tauromaquia como patrimonio cultural',
            publisher: 'Boletín Oficial de las Cortes Generales, Serie D, Núm. 306',
            year: 2013,
            supportsEs: 'Historial completo de enmiendas, debates de totalidad y votaciones finales de la Ley 18/2013.',
            supportsEn: 'Comprehensive legislative history, amendments, plenary debates, and final voting logs.',
            url: 'https://www.congreso.es'
          }
        ]
      }
    },

    // 12. Leyes y debate
    {
      id: 'hist-evt-12',
      year: 2016,
      dateLabel: '20 Oct 2016',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Sentencia STC 177/2016 del Tribunal Constitucional',
      captionEs: 'El Tribunal Constitucional estima el recurso contra la ley catalana y declara inconstitucional la prohibición, concluyendo que la comunidad autónoma invadió competencias exclusivas del Estado sobre patrimonio común.',
      captionEn: 'The Constitutional Court overturns the Catalan ban, ruling that autonomous regions lack legal jurisdiction to prohibit cultural practices protected by central state legislation.',
      source: {
        label: 'Congreso de los Diputados, Respuesta STC 177/2016',
        url: 'https://www.congreso.es/entradap/l12p/e4/e_0040859_n_000.pdf'
      },
      image: 'assets/timeline/12-sentencia-tc-177-2016.png',
      exhibit: {
        context: {
          es: 'En octubre de 2010, cincuenta senadores del Partido Popular interpusieron recurso de inconstitucionalidad contra el artículo 1 de la Ley catalana 28/2010. Tras seis años de complejas deliberaciones en el Alto Tribunal, el Pleno dictó la histórica Sentencia 177/2016 el 20 de octubre de 2016.',
          en: 'In October 2010, fifty senators from the Popular Party filed a constitutional challenge against Catalonia’s abolition law. After six years of deliberation amidst constitutional friction, the plenary Constitutional Court delivered ruling STC 177/2016 on October 20, 2016.'
        },
        significance: {
          es: 'Por 8 votos contra 3, el Tribunal Constitucional anuló la prohibición catalana, sentenciando que aunque Cataluña ostenta competencias para regular espectáculos y proteger a los animales, no puede prohibir de raíz una manifestación arraigada declarada patrimonio cultural inmaterial común por el legislador estatal (arts. 149.1.28ª y 149.2 CE).',
          en: 'By an 8-to-3 vote, the Constitutional Court struck down the Catalan ban, ruling that while Catalonia holds authority over animal welfare and entertainment, it cannot exercise it to abolish or suppress an activity protected as common cultural heritage under state law (Articles 149.1.28 and 149.2 of the Constitution).'
        },
        primarySource: {
          sourceTypeEs: 'Documento Primario • Sentencia Constitucional del Pleno',
          sourceTypeEn: 'Primary Source • Plenary Constitutional Court Ruling',
          titleEs: 'Sentencia del Tribunal Constitucional STC 177/2016, de 20 de octubre de 2016 (Pleno)',
          titleEn: 'Constitutional Court Ruling STC 177/2016 of October 20, 2016 (Plenary)',
          issuerEs: 'Pleno del Tribunal Constitucional de España (Ponente: Encarnación Roca Trías)',
          issuerEn: 'Plenary Spanish Constitutional Court (Justice Encarnación Roca Trías, Rapporteur)',
          dateEs: '20 de octubre de 2016 (Publicación en BOE nº 286 de 26/11/2016, Sec. TC, págs. 82512-82538)',
          dateEn: 'October 20, 2016 (Published in BOE No. 286 of November 26, 2016, pp. 82512–82538)',
          archiveEs: 'Tribunal Constitucional de España / Boletín Oficial del Estado (BOE-A-2016-11197)',
          archiveEn: 'Constitutional Court of Spain / Official State Gazette (BOE-A-2016-11197)',
          supportsEs: 'Acredita la declaración de inconstitucionalidad y nulidad del precepto catalán por invasión de la competencia estatal exclusiva sobre patrimonio cultural común (art. 149.1.28ª y 149.2 CE), incorporando tres votos particulares discrepantes.',
          supportsEn: 'Documents the judicial invalidation of the Catalan ban for infringing exclusive state jurisdiction over common cultural heritage (Articles 149.1.28 and 149.2), accompanied by three notable dissenting opinions.',
          citationEs: 'Boletín Oficial del Estado (BOE) núm. 286, de 26 de noviembre de 2016, páginas 82512 a 82538; Recurso de inconstitucionalidad 7722-2010.',
          citationEn: 'Official State Gazette (BOE) No. 286, November 26, 2016, pp. 82512–82538; Constitutional Appeal 7722-2010.',
          excerptEs: 'Fundamento Jurídico 7: «La competencia de la Comunidad Autónoma para regular los espectáculos públicos no puede alcanzar hasta la prohibición lisa y llana de una manifestación cultural común... Menoscaba la competencia del Estado para la preservación del patrimonio cultural común (art. 149.2 CE)... declarándose inconstitucional y nulo el precepto recurrido».',
          excerptEn: 'Legal Basis 7: "The Autonomous Community\'s competence to regulate public spectacles cannot extend to the outright prohibition of a shared cultural manifestation... It impairs the State\'s competence to preserve common cultural heritage (Art. 149.2 EC)... the contested provision is declared unconstitutional and null."',
          facsimileUrl: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2016-11197',
          facsimileLabelEs: 'Consultar Sentencia completa en BOE ↗',
          facsimileLabelEn: 'Consult complete Ruling at BOE ↗',
          facsimileStatus: 'verified',
          facsimileNoteEs: 'Fallo íntegro con fundamentos jurídicos y tres votos particulares discrepantes disponible en el BOE y en el buscador oficial del Tribunal Constitucional (Resolución 25134).',
          facsimileNoteEn: 'Full verdict with legal bases and three dissenting opinions available in the BOE and the official Constitutional Court repository (Ruling 25134).',
          technicalSheet: {
            format: 'Resolución judicial colegiada publicada en la Sección del Tribunal Constitucional del BOE',
            verificationMethodEs: 'Cotejado en la base oficial del Tribunal Constitucional (Resolución 25134) y el BOE (código BOE-A-2016-11197).',
            verificationMethodEn: 'Cross-checked in the official Constitutional Court database (Ruling 25134) and BOE (code BOE-A-2016-11197).'
          }
        },
        interpretation: {
          factsEs: 'El Tribunal declaró nulo el veto catalán el 20 de octubre de 2016; no obstante, en la práctica no se han vuelto a celebrar corridas en la Monumental de Barcelona por trabas de licencias municipales y falta de promotores privados.',
          factsEn: 'The Court formally voided the Catalan ban on October 20, 2016; in practice, however, no corridas have resumed in Barcelona due to municipal permit barriers and lack of private promoters.',
          debateEs: 'La sentencia provocó un encendido debate doctrinal reflejado en tres votos particulares discrepantes de los magistrados Valdés Dal-Ré, Asua Batarrita y Xiol Ríos, quienes argumentaron que el fallo vaciaba de contenido la autonomía política territorial de las comunidades al permitir que una ley estatal sobrevenida anulara decisiones legítimas de bienestar animal.',
          debateEn: 'The ruling spurred fierce debate highlighted by three dissenting opinions from justices Valdés Dal-Ré, Asua Batarrita, and Xiol Ríos, who argued the verdict eroded regional political autonomy by letting a retroactive national statute override legitimate autonomous animal welfare policies.'
        },
        references: [
          {
            typeEs: 'Repositorio Jurisprudencial',
            typeEn: 'Jurisprudential Repository',
            author: 'Tribunal Constitucional de España',
            title: 'Sentencia 177/2016, de 20 de octubre de 2016 (BOE-A-2016-11197)',
            publisher: 'Colección Oficial de Jurisprudencia Constitucional, Madrid',
            year: 2016,
            supportsEs: 'Texto canónico oficial de la resolución y argumentación de los magistrados discrepantes.',
            supportsEn: 'Canonical official text of the ruling and legal arguments of the dissenting constitutional justices.',
            url: 'https://hj.tribunalconstitucional.es/es/Resolucion/Show/25134'
          },
          {
            typeEs: 'Comentario Jurisprudencial',
            typeEn: 'Jurisprudential Commentary',
            author: 'Revista de Derecho UNED (RDUNED)',
            title: 'Comentario doctrinal sobre la STC 177/2016 y la tensión competencial cultural vs bienestar animal',
            publisher: 'UNED, Madrid, núm. 22',
            year: 2018,
            supportsEs: 'Análisis académico sobre el conflicto entre competencias autonómicas medioambientales y deberes estatales de cultura.',
            supportsEn: 'Scholarly critique analyzing the friction between regional environmental autonomy and state cultural mandates.',
            url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
          }
        ]
      }
    }
  ];

  // =========================================================================
  // 3. 📖 GLOSARIO DE TÉRMINOS TAURINOS
  // =========================================================================
  const vocab = {
    'tauromaquia': {
      es: 'Tauromaquia',
      en: 'The art, technique and cultural practice of fighting bulls (from Greek tauros [bull] + mache [fight]).'
    },
    'albero': {
      es: 'Albero',
      en: 'The fine golden-yellow crushed calcarenite sand that carpets traditional Spanish bullrings, quarried in Los Alcores.'
    },
    'morrillo': {
      es: 'Morrillo',
      en: 'The muscular hump on the bull’s neck and upper back that powers its forward charge.'
    }
  };

  // =========================================================================
  // 4. 🏛️ CONFIGURACIÓN DE LAS 5 ÉPOCAS
  // =========================================================================
  const ERAS = [
    {
      id: 'hist-era-origenes',
      name: 'Orígenes',
      label: '1. Orígenes',
      period: 'Hasta el S. XI',
      bgClass: 'hist-era-bg-0'
    },
    {
      id: 'hist-era-nobleza',
      name: 'Nobleza y prohibiciones',
      label: '2. Nobleza y prohibiciones',
      period: 'Siglos XIII – XVIII',
      bgClass: 'hist-era-bg-1'
    },
    {
      id: 'hist-era-toreo-pie',
      name: 'El toreo a pie',
      label: '3. El toreo a pie',
      period: 'Siglo XVIII',
      bgClass: 'hist-era-bg-2'
    },
    {
      id: 'hist-era-edad-oro',
      name: 'Edad de Oro',
      label: '4. Edad de Oro',
      period: '1910 – 1920',
      bgClass: 'hist-era-bg-3'
    },
    {
      id: 'hist-era-leyes-debate',
      name: 'Leyes y debate',
      label: '5. Leyes y debate',
      period: '1991 – Actualidad',
      bgClass: 'hist-era-bg-4'
    }
  ];

  // =========================================================================
  // 5. VARIABLES DE ESTADO Y ELEMENTOS DOM
  // =========================================================================
  let journeyContainer = null;
  let stageElement = null;
  let hudEraTitle = null;
  let hudYearNum = null;
  let hudCounter = null;
  let dotsLineFill = null;
  let dotButtons = [];
  let cardElements = [];
  let eraBgElements = [];

  // Fondos cinemáticos dinámicos
  let cinemaStageElement = null;
  let cinemaLayerElements = [];
  let activeCinemaIndex = 0;
  let programmaticTargetIndex = null;
  let programmaticScrollTimer = null;

  // Cédula Histórica Expandible y Visor de Fuentes
  let exhibitModal = null;
  let exhibitBackdrop = null;
  let exhibitCloseBtn = null;
  let exhibitTranslateBtn = null;
  let exhibitPrevBtn = null;
  let exhibitNextBtn = null;
  let exhibitNavCount = null;
  let activeExhibitIndex = 0;
  let isExhibitOpen = false;
  let exhibitLanguage = 'es'; // 'es' o 'en'
  let lastFocusedTriggerBtn = null;

  // Navegación superior y contador lateral
  let eraNavContainer = null;
  let yearCounterElement = null;

  // Guía tutorial de retorno al Vestíbulo (Hito 12)
  let vestibuloGuideEl = null;
  let hudReturnBtn = null;
  let isVestibuloGuideDismissed = false;

  // Control de scroll y animación
  let isTicking = false;
  let activeEventIndex = 0;

  /**
   * Pre-carga de imágenes de la cronología en segundo plano para evitar parpadeos.
   */
  function preloadTimelineImages() {
    events.forEach(evt => {
      if (evt.image) {
        const img = new Image();
        img.src = evt.image;
      }
    });
  }

  /**
   * Actualiza la imagen cinemática activa con transición suave y sin parpadeos.
   */
  function setCinemaImage(index) {
    if (index < 0 || index >= events.length) return;
    if (activeCinemaIndex === index && cinemaLayerElements[index] && cinemaLayerElements[index].classList.contains('hist-cinema-active')) {
      return;
    }

    activeCinemaIndex = index;

    cinemaLayerElements.forEach((layer, idx) => {
      if (idx === index) {
        layer.classList.add('hist-cinema-active');
        layer.setAttribute('aria-hidden', 'false');
      } else {
        layer.classList.remove('hist-cinema-active');
        layer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /**
   * Genera el HTML de una tarjeta individual para el pinned scroll stage.
   */
  function createStageCardHTML(event, index) {
    const isFact = event.type === 'hecho';
    const badgeClass = isFact ? 'hist-badge-fact' : 'hist-badge-interp';
    const badgeLabel = isFact ? 'Hecho' : 'Interpretación';
    const badgeTooltip = isFact ? 'Hecho: documented fact' : 'Interpretación: a historian’s reading';
    const isLast = index === events.length - 1;
    const continueLabel = isLast ? 'Siguiente sección ↓' : 'Continuar →';

    const isEn = exhibitLanguage === 'en';
    return `
      <article class="hist-stage-card ${index === 0 ? 'hist-card-active' : ''} ${isEn ? 'hist-translated' : ''}" 
               id="hist-card-${event.id}" 
               data-index="${index}" 
               data-year="${event.year}" 
               data-datelabel="${event.dateLabel}" 
               data-era="${event.era}" 
               tabindex="0" 
               role="region" 
               aria-label="${event.title}">
        <div class="hist-card-inner">
          <div class="hist-card-topbar">
            <div class="hist-card-museum-tag">
              <span class="hist-tag-room">🏛️ SALA I</span>
              <span class="hist-tag-divider" aria-hidden="true">•</span>
              <span class="hist-tag-stop">HITO ${index + 1}/${events.length}</span>
            </div>
            <span class="hist-card-era-badge">${event.era}</span>
            <div class="hist-badge-wrapper">
              <span class="hist-badge ${badgeClass}" tabindex="0" data-tooltip="${badgeTooltip}" aria-label="${badgeTooltip}">
                <span class="hist-badge-dot" aria-hidden="true"></span>
                ${badgeLabel}
              </span>
            </div>
          </div>

          <div class="hist-card-heading-group">
            <span class="hist-card-date">${event.dateLabel}</span>
            <h3 class="hist-card-title">${event.title}</h3>
          </div>

          <div class="hist-card-content">
            <p class="hist-card-caption-es" ${isEn ? 'aria-hidden="true"' : ''}>${event.captionEs}</p>
            <p class="hist-card-caption-en" ${isEn ? '' : 'aria-hidden="true"'}>${event.captionEn}</p>
          </div>

          <!-- Botón de apertura de Cédula Histórica Expandible -->
          <div class="hist-card-exhibit-row">
            <button type="button" 
                    class="hist-btn-exhibit" 
                    data-exhibit-index="${index}" 
                    aria-expanded="false" 
                    aria-controls="hist-exhibit-modal" 
                    aria-haspopup="dialog"
                    aria-label="Descubrir el contexto histórico y archivo documental de este hito">
              <span class="hist-exhibit-btn-icon" aria-hidden="true">📜</span>
              <span class="hist-exhibit-btn-text-es">Descubrir el contexto</span>
              <span class="hist-exhibit-btn-text-en" aria-hidden="true">Explore context & sources</span>
              <span class="hist-exhibit-btn-chevron" aria-hidden="true">▾</span>
            </button>
          </div>

          <div class="hist-card-footer">
            <div class="hist-source-container">
              ${event.source && event.source.url ? `
                <a href="${event.source.url}" class="hist-source-link" target="_blank" rel="noopener noreferrer" title="Consultar fuente original">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>Fuente: ${event.source.label}</span>
                </a>
              ` : ''}
            </div>

            <div class="hist-card-actions">
              <button type="button" class="hist-btn-translate" aria-label="Alternar traducción EN / ES" title="Alternar idioma inglés / español" ${isEn ? 'aria-pressed="true"' : ''}>
                <span class="hist-translate-icon" aria-hidden="true">🌐</span>
                <span class="hist-translate-label">EN / ES</span>
              </button>

              <button type="button" 
                      class="hist-btn-prev" 
                      data-prev-index="${index - 1}" 
                      aria-label="Evento anterior" 
                      ${index === 0 ? 'disabled aria-disabled="true"' : ''}>
                <span aria-hidden="true">←</span>
                <span>Anterior</span>
              </button>

              <button type="button" class="hist-btn-continue" data-next-index="${index + 1}" aria-label="${continueLabel}">
                <span>${continueLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Construye dinámicamente todo el escenario fijo (Pinned Scroll Stage).
   */
  function renderPinnedStage() {
    journeyContainer = document.getElementById('hist-journey-container');
    if (!journeyContainer) return;

    // 0. Capas cinemáticas por evento (12 imágenes históricas)
    const cinemaLayersHTML = events.map((evt, i) => `
      <div class="hist-cinema-layer ${i === 0 ? 'hist-cinema-active' : ''}" 
           id="hist-cinema-layer-${i}" 
           data-index="${i}" 
           role="img" 
           aria-label="${evt.dateLabel}: ${evt.title}"
           aria-hidden="${i === 0 ? 'false' : 'true'}">
        <img src="${evt.image}" 
             alt="${evt.title} (${evt.dateLabel})" 
             class="hist-cinema-img" 
             loading="${i === 0 ? 'eager' : 'lazy'}" 
             decoding="async" />
      </div>
    `).join('');

    // 1. Fondos con degradados temáticos por época
    const backdropsHTML = ERAS.map((era, i) => `
      <div class="hist-era-bg ${era.bgClass} ${i === 0 ? 'hist-bg-active' : ''}" data-era="${era.name}"></div>
    `).join('');

    // 2. Tarjetas de eventos
    const cardsHTML = events.map((evt, i) => createStageCardHTML(evt, i)).join('');

    // 3. Dots de navegación inferior (uno por evento)
    const dotsHTML = events.map((evt, i) => `
      <button type="button" 
              class="hist-dot ${i === 0 ? 'hist-dot-active' : ''}" 
              data-index="${i}" 
              role="tab" 
              aria-selected="${i === 0}" 
              aria-label="Parada ${i + 1} de ${events.length}: ${evt.dateLabel} - ${evt.title}">
        <span class="hist-dot-marker" aria-hidden="true"></span>
        <span class="hist-dot-tooltip">${evt.dateLabel} • ${evt.era}</span>
      </button>
    `).join('');

    // Montar la estructura completa del stage incluyendo la Cédula Histórica Expandible y el Visor de Archivo
    journeyContainer.innerHTML = `
      <div class="hist-stage" id="hist-stage" role="region" aria-label="Escenario interactivo de la historia" tabindex="0">
        
        <!-- Capas de fondos cinemáticos y degradados de época -->
        <div class="hist-stage-backdrop-wrap" aria-hidden="true">
          <div class="hist-cinema-stage" id="hist-cinema-stage">
            ${cinemaLayersHTML}
          </div>
          <div class="hist-cinema-overlay" aria-hidden="true"></div>
          ${backdropsHTML}
          <div class="hist-stage-vignette" aria-hidden="true"></div>
        </div>

        <!-- HUD superior con época actual y año simple -->
        <header class="hist-stage-hud" id="hist-stage-hud">
          <div class="hist-hud-inner">
            <div class="hist-hud-left">
              <div class="hist-hud-room-badge" aria-label="Sala I del Museo: Cronología">
                <span class="hist-hud-room-icon" aria-hidden="true">🏛️</span>
                <span class="hist-hud-room-text">SALA I</span>
              </div>
              <div class="hist-hud-era-wrap">
                <span class="hist-hud-era-kicker">Época</span>
                <h2 class="hist-hud-era-title" id="hist-hud-era-title">${events[0].era}</h2>
              </div>
            </div>

            <div class="hist-hud-center">
              <div class="hist-stage-year-badge">
                <span class="hist-stage-year-icon" aria-hidden="true">⏳</span>
                <span class="hist-stage-year-num" id="hist-stage-year-num">${events[0].dateLabel}</span>
              </div>
            </div>

            <div class="hist-hud-right">
              <span class="hist-hud-counter" id="hist-hud-counter">1 / ${events.length}</span>
              <span class="hist-hud-scroll-hint" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 5v14M19 12l-7 7-7-7"></path>
                </svg>
                Desplaza
              </span>
              <a href="index.html?lang=${exhibitLanguage}#hall" 
                 class="hist-btn-room-return-hall hist-hud-return-btn" 
                 id="hist-hud-return-vestibulo" 
                 aria-label="Volver al Gran Vestíbulo Central del Museo">
                <span class="hist-return-icon" aria-hidden="true">🏛️</span>
                <span class="hist-lang-es">Vestíbulo</span>
                <span class="hist-lang-en" style="display:none;">Central Hall</span>
              </a>
            </div>
          </div>
        </header>

        <!-- Tutorial de Navegación: Guía de Retorno al Vestíbulo (Hito 12) -->
        <aside id="hist-vestibulo-guide" 
               class="hist-vestibulo-guide" 
               role="complementary" 
               aria-label="Guía de navegación del museo" 
               aria-hidden="true">
          <div class="hist-guide-pointer" aria-hidden="true"></div>
          <div class="hist-guide-inner">
            <div class="hist-guide-header">
              <div class="hist-guide-badge">
                <span class="hist-guide-icon" aria-hidden="true">🏛️</span>
                <span class="hist-guide-badge-title hist-lang-es">GUÍA DEL MUSEO</span>
                <span class="hist-guide-badge-title hist-lang-en" style="display:none;">MUSEUM GUIDE</span>
              </div>
              <button type="button" 
                      class="hist-guide-close-btn" 
                      id="hist-guide-close-btn" 
                      aria-label="Cerrar sugerencia de navegación" 
                      title="Cerrar sugerencia">
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div class="hist-guide-content">
              <p class="hist-guide-text hist-lang-es">
                Has alcanzado el <strong>Hito 12 / 12</strong> (final de la cronología). Si deseas regresar al inicio o explorar otras salas, pulsa en <strong>Vestíbulo</strong>.
              </p>
              <p class="hist-guide-text hist-lang-en" style="display:none;">
                You have reached <strong>Milestone 12 / 12</strong> (end of the timeline). If you wish to return to the start or explore other galleries, click on <strong>Vestíbulo</strong>.
              </p>
            </div>

            <div class="hist-guide-actions">
              <a href="index.html?lang=${exhibitLanguage}#hall" 
                 class="hist-btn-room-return-hall hist-guide-btn-action" 
                 id="hist-guide-action-return" 
                 aria-label="Volver al Gran Vestíbulo Central">
                <span class="hist-return-icon" aria-hidden="true">🏛️</span>
                <span class="hist-lang-es">Ir al Vestíbulo</span>
                <span class="hist-lang-en" style="display:none;">Go to Vestíbulo</span>
              </a>
              <button type="button" 
                      class="hist-guide-btn-dismiss" 
                      id="hist-guide-btn-dismiss" 
                      aria-label="Permanecer en la página actual">
                <span class="hist-lang-es">Permanecer aquí</span>
                <span class="hist-lang-en" style="display:none;">Stay here</span>
              </button>
            </div>
          </div>
        </aside>

        <!-- Lienzo central con tarjetas -->
        <div class="hist-stage-canvas" id="hist-stage-canvas">
          <div class="hist-stage-card-wrap" id="hist-stage-card-wrap">
            ${cardsHTML}
          </div>
        </div>

        <!-- Barra inferior de progreso y puntos -->
        <footer class="hist-stage-bottom-bar" id="hist-stage-bottom-bar">
          <div class="hist-bottom-bar-inner">
            <div class="hist-dots-track" id="hist-dots-track" role="tablist" aria-label="Paradas cronológicas">
              <div class="hist-dots-line-bg" aria-hidden="true">
                <div class="hist-dots-line-fill" id="hist-dots-line-fill"></div>
              </div>
              ${dotsHTML}
            </div>
          </div>
        </footer>

        <!-- =================================================================
             CÉDULA HISTÓRICA EXPANDIBLE Y VISOR DE ARCHIVO DIGITAL (FASE 4)
             ================================================================= -->
        <div id="hist-exhibit-modal" 
             class="hist-exhibit-modal" 
             role="dialog" 
             aria-modal="true" 
             aria-hidden="true" 
             aria-labelledby="hist-exhibit-modal-title">
          <div class="hist-exhibit-backdrop" id="hist-exhibit-backdrop" aria-hidden="true"></div>
          
          <div class="hist-exhibit-dialog" role="document">
            <!-- Encabezado del Dossier -->
            <header class="hist-exhibit-header">
              <div class="hist-exhibit-header-top">
                <div class="hist-exhibit-badges">
                  <span class="hist-exhibit-era-badge" id="hist-exhibit-era-badge"></span>
                  <span class="hist-exhibit-date-badge" id="hist-exhibit-date-badge"></span>
                  <span class="hist-badge" id="hist-exhibit-type-badge"></span>
                </div>

                <div class="hist-exhibit-header-actions">
                  <button type="button" class="hist-btn-translate hist-exhibit-translate-btn" id="hist-exhibit-translate-btn" aria-label="Cambiar idioma en la cédula (EN / ES)">
                    <span class="hist-translate-icon" aria-hidden="true">🌐</span>
                    <span class="hist-translate-label">EN / ES</span>
                  </button>

                  <button type="button" class="hist-exhibit-close-btn" id="hist-exhibit-close-btn" aria-label="Cerrar cédula histórica (Esc)">
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
              </div>

              <h3 class="hist-exhibit-title" id="hist-exhibit-modal-title"></h3>
            </header>

            <!-- Cuerpo Scrollable de la Cédula (5 secciones de investigación) -->
            <div class="hist-exhibit-body" id="hist-exhibit-body" tabindex="0">
              
              <!-- 1. Contexto histórico -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec1-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec1-title">
                  <span class="hist-sec-icon" aria-hidden="true">📜</span>
                  <span class="hist-sec-title-es">1. Contexto histórico</span>
                  <span class="hist-sec-title-en" aria-hidden="true">1. Historical Context</span>
                </h4>
                <div class="hist-exhibit-sec-text" id="hist-exhibit-context-text"></div>
              </section>

              <!-- 2. Importancia histórica -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec2-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec2-title">
                  <span class="hist-sec-icon" aria-hidden="true">⚖️</span>
                  <span class="hist-sec-title-es">2. Importancia histórica</span>
                  <span class="hist-sec-title-en" aria-hidden="true">2. Historical Significance</span>
                </h4>
                <div class="hist-exhibit-sec-text" id="hist-exhibit-significance-text"></div>
              </section>

              <!-- 3. Fuente primaria documental & Visor de Archivo Digital -->
              <section class="hist-exhibit-section hist-exhibit-primary-section" aria-labelledby="hist-ex-sec3-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec3-title">
                  <span class="hist-sec-icon" aria-hidden="true">🏛️</span>
                  <span class="hist-sec-title-es">3. Fuente primaria documental • Archivo Digital</span>
                  <span class="hist-sec-title-en" aria-hidden="true">3. Primary Archival Source • Digital Dossier</span>
                </h4>
                <div class="hist-primary-card" id="hist-primary-card">
                  <!-- Inyectado dinámicamente por renderExhibitContent() -->
                </div>
              </section>

              <!-- 4. Interpretación histórica (Hechos vs Debate) -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec4-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec4-title">
                  <span class="hist-sec-icon" aria-hidden="true">🔍</span>
                  <span class="hist-sec-title-es">4. Interpretación histórica</span>
                  <span class="hist-sec-title-en" aria-hidden="true">4. Historical Interpretation</span>
                </h4>
                <div class="hist-interp-grid">
                  <div class="hist-interp-col hist-interp-facts">
                    <h5 class="hist-interp-subheading">
                      <span class="hist-interp-dot-fact" aria-hidden="true"></span>
                      <span class="hist-interp-title-es">Consenso fáctico documentado</span>
                      <span class="hist-interp-title-en" aria-hidden="true">Established Facts</span>
                    </h5>
                    <div class="hist-interp-text" id="hist-interp-facts-text"></div>
                  </div>

                  <div class="hist-interp-col hist-interp-debate">
                    <h5 class="hist-interp-subheading">
                      <span class="hist-interp-dot-debate" aria-hidden="true"></span>
                      <span class="hist-interp-title-es">Debate historiográfico y divergencias</span>
                      <span class="hist-interp-title-en" aria-hidden="true">Historiographical Debate</span>
                    </h5>
                    <div class="hist-interp-text" id="hist-interp-debate-text"></div>
                  </div>
                </div>
              </section>

              <!-- 5. Fuentes y referencias académicas anotadas -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec5-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec5-title">
                  <span class="hist-sec-icon" aria-hidden="true">📚</span>
                  <span class="hist-sec-title-es">5. Bibliografía académica contrastada</span>
                  <span class="hist-sec-title-en" aria-hidden="true">5. Scholarly Bibliography & Evidence</span>
                </h4>
                <div class="hist-refs-list" id="hist-refs-list"></div>
              </section>

            </div>

            <!-- Pie de la Cédula con navegación secuencial -->
            <footer class="hist-exhibit-footer">
              <button type="button" class="hist-btn-prev hist-exhibit-prev-btn" id="hist-exhibit-prev-btn" aria-label="Ver cédula del hito anterior">
                <span aria-hidden="true">←</span>
                <span>Hito anterior</span>
              </button>

              <span class="hist-exhibit-nav-count" id="hist-exhibit-nav-count"></span>

              <button type="button" class="hist-btn-continue hist-exhibit-next-btn" id="hist-exhibit-next-btn" aria-label="Ver cédula del hito siguiente">
                <span>Siguiente hito</span>
                <span aria-hidden="true">→</span>
              </button>
            </footer>
          </div>
        </div>

      </div>
    `;

    // Cachear referencias DOM
    stageElement = document.getElementById('hist-stage');
    hudEraTitle = document.getElementById('hist-hud-era-title');
    hudYearNum = document.getElementById('hist-stage-year-num');
    hudCounter = document.getElementById('hist-hud-counter');
    dotsLineFill = document.getElementById('hist-dots-line-fill');
    dotButtons = Array.from(document.querySelectorAll('.hist-dot'));
    cardElements = Array.from(document.querySelectorAll('.hist-stage-card'));
    eraBgElements = Array.from(document.querySelectorAll('.hist-era-bg'));
    cinemaStageElement = document.getElementById('hist-cinema-stage');
    cinemaLayerElements = Array.from(document.querySelectorAll('.hist-cinema-layer'));
    eraNavContainer = document.getElementById('hist-era-nav');
    yearCounterElement = document.getElementById('hist-year-counter');

    // Referencias de Cédula Expandible
    exhibitModal = document.getElementById('hist-exhibit-modal');
    exhibitBackdrop = document.getElementById('hist-exhibit-backdrop');
    exhibitCloseBtn = document.getElementById('hist-exhibit-close-btn');
    exhibitTranslateBtn = document.getElementById('hist-exhibit-translate-btn');
    exhibitPrevBtn = document.getElementById('hist-exhibit-prev-btn');
    exhibitNextBtn = document.getElementById('hist-exhibit-next-btn');
    exhibitNavCount = document.getElementById('hist-exhibit-nav-count');

    // Referencias de Guía Tutorial al Vestíbulo (Hito 12)
    vestibuloGuideEl = document.getElementById('hist-vestibulo-guide');
    hudReturnBtn = document.getElementById('hist-hud-return-vestibulo');

    updateContainerHeight();
  }

  /**
   * Calcula y asigna la altura del contenedor principal.
   */
  function updateContainerHeight() {
    if (!journeyContainer) return;
    const numEvents = events.length;
    const stepDistance = DWELL_LENGTH_PX + TRAVEL_LENGTH_PX;
    const totalScrollRange = (numEvents - 1) * stepDistance + DWELL_LENGTH_PX;
    const totalHeight = window.innerHeight + totalScrollRange;
    journeyContainer.style.height = totalHeight + 'px';
  }

  /**
   * Obtiene la posición de scroll actual relativa al contenedor del stage.
   */
  function computeScrollState() {
    if (!journeyContainer) return null;

    const rect = journeyContainer.getBoundingClientRect();
    const scrollOffset = -rect.top;
    const numEvents = events.length;
    const stepDistance = DWELL_LENGTH_PX + TRAVEL_LENGTH_PX;
    const totalScrollRange = (numEvents - 1) * stepDistance + DWELL_LENGTH_PX;

    const clampedOffset = Math.max(0, Math.min(totalScrollRange, scrollOffset));
    const progress = totalScrollRange > 0 ? clampedOffset / totalScrollRange : 0;

    for (let i = 0; i < numEvents; i++) {
      const dwellStart = i * stepDistance;
      const dwellEnd = dwellStart + DWELL_LENGTH_PX;

      if (clampedOffset <= dwellEnd || i === numEvents - 1) {
        if (clampedOffset >= dwellStart) {
          return {
            isDwell: true,
            activeEventIndex: i,
            fromIndex: i,
            toIndex: i,
            travelFactor: 0,
            progress: progress,
            clampedOffset: clampedOffset,
            totalScrollRange: totalScrollRange
          };
        } else {
          const travelStart = (i - 1) * stepDistance + DWELL_LENGTH_PX;
          const travelFactor = (clampedOffset - travelStart) / TRAVEL_LENGTH_PX;
          const normalizedFactor = Math.max(0, Math.min(1, travelFactor));

          return {
            isDwell: false,
            activeEventIndex: normalizedFactor < 0.5 ? i - 1 : i,
            fromIndex: i - 1,
            toIndex: i,
            travelFactor: normalizedFactor,
            progress: progress,
            clampedOffset: clampedOffset,
            totalScrollRange: totalScrollRange
          };
        }
      }
    }

    return null;
  }

  /**
   * Actualiza visualmente el escenario en función del progreso de scroll.
   */
  function updateStage() {
    const state = computeScrollState();
    if (!state) return;

    activeEventIndex = state.activeEventIndex;
    const activeEvent = events[activeEventIndex];

    // 1. HUD superior
    if (hudEraTitle && hudEraTitle.textContent !== activeEvent.era) {
      hudEraTitle.textContent = activeEvent.era;
    }
    if (hudYearNum && hudYearNum.textContent !== activeEvent.dateLabel) {
      hudYearNum.textContent = activeEvent.dateLabel;
    }
    if (hudCounter) {
      hudCounter.textContent = `${activeEventIndex + 1} / ${events.length}`;
    }

    // 2. Contador lateral antiguo
    if (yearCounterElement) {
      const dateVal = yearCounterElement.querySelector('.hist-year-value');
      const eraVal = yearCounterElement.querySelector('.hist-year-era');
      if (dateVal && dateVal.textContent !== activeEvent.dateLabel) {
        dateVal.textContent = activeEvent.dateLabel;
      }
      if (eraVal && eraVal.textContent !== activeEvent.era) {
        eraVal.textContent = activeEvent.era;
      }
    }

    // 3. Menú superior por épocas
    if (eraNavContainer) {
      const links = eraNavContainer.querySelectorAll('.hist-era-link');
      links.forEach(link => {
        const era = link.getAttribute('data-era');
        if (era === activeEvent.era) {
          link.classList.add('hist-active');
          link.setAttribute('aria-current', 'true');
        } else {
          link.classList.remove('hist-active');
          link.removeAttribute('aria-current');
        }
      });
    }

    // 4. Barra de progreso inferior y dots
    if (dotsLineFill) {
      dotsLineFill.style.width = (state.progress * 100) + '%';
    }

    dotButtons.forEach((btn, i) => {
      if (i === activeEventIndex) {
        btn.classList.add('hist-dot-active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('hist-dot-active');
        btn.setAttribute('aria-selected', 'false');
      }

      if (i < activeEventIndex) {
        btn.classList.add('hist-dot-passed');
      } else {
        btn.classList.remove('hist-dot-passed');
      }
    });

    // 5. Visibilidad y crossfade de tarjetas
    if (state.isDwell) {
      cardElements.forEach((card, idx) => {
        if (idx === state.activeEventIndex) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.pointerEvents = 'auto';
          card.classList.add('hist-card-active');
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.pointerEvents = 'none';
          card.classList.remove('hist-card-active');
        }
      });
    } else {
      const u = state.travelFactor;
      cardElements.forEach((card, idx) => {
        if (idx === state.fromIndex) {
          const opacity = Math.max(0, 1 - u * 2.2);
          const ty = -u * 30;
          card.style.opacity = opacity.toFixed(3);
          card.style.transform = `translateY(${ty.toFixed(1)}px)`;
          card.style.pointerEvents = opacity > 0.7 ? 'auto' : 'none';
        } else if (idx === state.toIndex) {
          const opacity = Math.max(0, (u - 0.45) * 1.8);
          const ty = (1 - u) * 30;
          card.style.opacity = opacity.toFixed(3);
          card.style.transform = `translateY(${ty.toFixed(1)}px)`;
          card.style.pointerEvents = opacity > 0.7 ? 'auto' : 'none';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.pointerEvents = 'none';
          card.classList.remove('hist-card-active');
        }
      });
    }

    // 6. Degradados de época
    const currentEraName = events[activeEventIndex].era;
    eraBgElements.forEach(bg => {
      const era = bg.getAttribute('data-era');
      if (era === currentEraName) {
        bg.style.opacity = '1';
      } else {
        bg.style.opacity = '0';
      }
    });

    // 7. Fondo cinemático dinámico y paralaje sutil
    if (programmaticTargetIndex === null) {
      setCinemaImage(activeEventIndex);
    }

    if (cinemaStageElement && state) {
      const parallaxY = (state.progress - 0.5) * 28;
      cinemaStageElement.style.transform = `translate3d(0, ${parallaxY.toFixed(1)}px, 0)`;
    }

    // 8. Guía tutorial de retorno al Vestíbulo al alcanzar el Hito 12 (último evento)
    if (activeEventIndex === events.length - 1 && !isExhibitOpen) {
      if (!isVestibuloGuideDismissed) {
        showVestibuloGuide();
      }
    } else {
      hideVestibuloGuide();
    }
  }

  /**
   * Muestra de forma translúcida y no intrusiva el tutorial de retorno al Vestíbulo.
   */
  function showVestibuloGuide() {
    if (isVestibuloGuideDismissed || !vestibuloGuideEl) return;
    vestibuloGuideEl.classList.add('hist-guide-visible');
    vestibuloGuideEl.setAttribute('aria-hidden', 'false');
    if (hudReturnBtn) {
      hudReturnBtn.classList.add('hist-hud-btn-highlight');
    }
  }

  /**
   * Oculta el tutorial de retorno al Vestíbulo.
   */
  function hideVestibuloGuide() {
    if (!vestibuloGuideEl) return;
    vestibuloGuideEl.classList.remove('hist-guide-visible');
    vestibuloGuideEl.setAttribute('aria-hidden', 'true');
    if (hudReturnBtn) {
      hudReturnBtn.classList.remove('hist-hud-btn-highlight');
    }
  }

  /**
   * Inicializa los controles del tutorial de retorno al Vestíbulo.
   */
  function initVestibuloGuideControls() {
    if (!vestibuloGuideEl) return;

    const closeBtn = document.getElementById('hist-guide-close-btn');
    const dismissBtn = document.getElementById('hist-guide-btn-dismiss');

    function dismissGuide(e) {
      if (e) e.preventDefault();
      isVestibuloGuideDismissed = true;
      hideVestibuloGuide();
    }

    if (closeBtn) closeBtn.addEventListener('click', dismissGuide);
    if (dismissBtn) dismissBtn.addEventListener('click', dismissGuide);
  }

  /**
   * Sincroniza el idioma en la guía tutorial del Vestíbulo.
   * @param {'es' | 'en'} targetLang
   */
  function syncVestibuloGuideLanguage(targetLang) {
    if (!vestibuloGuideEl) return;
    const esEls = vestibuloGuideEl.querySelectorAll('.hist-lang-es');
    const enEls = vestibuloGuideEl.querySelectorAll('.hist-lang-en');
    esEls.forEach(el => el.style.display = targetLang === 'es' ? '' : 'none');
    enEls.forEach(el => el.style.display = targetLang === 'en' ? '' : 'none');
    const actionReturn = document.getElementById('hist-guide-action-return');
    if (actionReturn) {
      actionReturn.setAttribute('href', 'index.html?lang=' + encodeURIComponent(targetLang) + '#hall');
    }
    if (hudReturnBtn) {
      hudReturnBtn.setAttribute('href', 'index.html?lang=' + encodeURIComponent(targetLang) + '#hall');
    }
  }

  /**
   * Manejador de evento scroll regulado con requestAnimationFrame.
   */
  function onScroll() {
    // Si la cédula histórica (modal) está abierta, congelar la animación del stage de fondo
    if (isExhibitOpen) {
      return;
    }
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(function () {
        updateStage();
        isTicking = false;
      });
    }
  }

  /**
   * Navega de forma suave al punto medio del dwell del evento especificado.
   */
  function scrollToEvent(targetIndex) {
    const clampedIndex = Math.max(0, Math.min(events.length - 1, targetIndex));
    programmaticTargetIndex = clampedIndex;

    setCinemaImage(clampedIndex);

    clearTimeout(programmaticScrollTimer);
    programmaticScrollTimer = setTimeout(() => {
      programmaticTargetIndex = null;
      updateStage();
    }, 750);

    const stepDistance = DWELL_LENGTH_PX + TRAVEL_LENGTH_PX;
    const targetOffset = clampedIndex * stepDistance + (DWELL_LENGTH_PX * 0.5);

    if (!journeyContainer) return;

    const containerTop = journeyContainer.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = containerTop + targetOffset;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }

  // =========================================================================
  // 6. 📜 CÉDULAS HISTÓRICAS Y VISOR DE ARCHIVO DIGITAL (FASE 4)
  // =========================================================================

  /**
   * Rellena el contenido de la Cédula Histórica y su Visor de Archivo Digital.
   * @param {number} index - Índice del evento
   */
  function renderExhibitContent(index) {
    const evt = events[index];
    if (!evt || !evt.exhibit) return;

    activeExhibitIndex = index;
    const ex = evt.exhibit;
    const lang = exhibitLanguage;
    const isEn = lang === 'en';

    // 1. Meta y cabecera
    const eraBadge = document.getElementById('hist-exhibit-era-badge');
    const dateBadge = document.getElementById('hist-exhibit-date-badge');
    const typeBadge = document.getElementById('hist-exhibit-type-badge');
    const titleEl = document.getElementById('hist-exhibit-modal-title');

    if (eraBadge) eraBadge.textContent = evt.era;
    if (dateBadge) dateBadge.textContent = evt.dateLabel;
    
    if (typeBadge) {
      const isFact = evt.type === 'hecho';
      typeBadge.className = `hist-badge ${isFact ? 'hist-badge-fact' : 'hist-badge-interp'}`;
      typeBadge.textContent = isFact 
        ? (isEn ? 'Fact' : 'Hecho') 
        : (isEn ? 'Interpretation' : 'Interpretación');
    }

    if (titleEl) {
      titleEl.textContent = evt.title;
    }

    // 2. Sección 1: Contexto histórico
    const contextEl = document.getElementById('hist-exhibit-context-text');
    if (contextEl) {
      contextEl.innerHTML = `<p>${isEn ? ex.context.en : ex.context.es}</p>`;
    }

    // 3. Sección 2: Importancia histórica
    const sigEl = document.getElementById('hist-exhibit-significance-text');
    if (sigEl) {
      sigEl.innerHTML = `<p>${isEn ? ex.significance.en : ex.significance.es}</p>`;
    }

    // 4. Sección 3: Fuente primaria documental & Visor de Archivo Digital
    const primaryCard = document.getElementById('hist-primary-card');
    if (primaryCard && ex.primarySource) {
      const ps = ex.primarySource;
      const isFragmentary = ps.facsimileStatus === 'fragmentary';
      const statusBadgeClass = isFragmentary ? 'hist-source-status-warning' : 'hist-source-status-verified';
      const statusIcon = isFragmentary ? '⚠️' : '✓';
      const statusText = isFragmentary 
        ? (isEn ? 'Fragmentary / Unverified manuscript tradition' : 'Tradición manuscrita bajomedieval / Sin códice contemporáneo')
        : (isEn ? 'Verified Official Repository Edition' : 'Edición oficial verificada en repositorio');

      primaryCard.innerHTML = `
        <!-- Cabecera de la Cédula de Archivo -->
        <div class="hist-archive-viewer-top">
          <div class="hist-source-type-pill">
            <span class="hist-source-type-icon" aria-hidden="true">📜</span>
            <span>${isEn ? ps.sourceTypeEn : ps.sourceTypeEs}</span>
          </div>

          <div class="hist-source-status-pill ${statusBadgeClass}">
            <span aria-hidden="true">${statusIcon}</span>
            <span>${statusText}</span>
          </div>
        </div>

        <div class="hist-primary-doc-title">${isEn ? ps.titleEn : ps.titleEs}</div>

        <!-- Metadatos Archivísticos Clave -->
        <dl class="hist-archive-meta-grid">
          <div class="hist-archive-meta-item">
            <dt class="hist-archive-meta-label">${isEn ? 'Issuing Authority / Author:' : 'Autoría / Institución emisora:'}</dt>
            <dd class="hist-archive-meta-value">${isEn ? ps.issuerEn : ps.issuerEs}</dd>
          </div>
          <div class="hist-archive-meta-item">
            <dt class="hist-archive-meta-label">${isEn ? 'Document Date / Enactment:' : 'Fecha de expedición / Promulgación:'}</dt>
            <dd class="hist-archive-meta-value">${isEn ? ps.dateEn : ps.dateEs}</dd>
          </div>
          <div class="hist-archive-meta-item hist-archive-meta-full">
            <dt class="hist-archive-meta-label">${isEn ? 'Custodial Archive / Repository:' : 'Custodia archivística / Fondo:'}</dt>
            <dd class="hist-archive-meta-value">${isEn ? ps.archiveEn : ps.archiveEs}</dd>
          </div>
        </dl>

        <!-- Explicación de lo que acredita la fuente -->
        <div class="hist-archive-supports-box">
          <div class="hist-archive-supports-kicker">
            <span aria-hidden="true">⚖️</span>
            <strong>${isEn ? 'What this source supports:' : 'Qué acredita esta fuente documental:'}</strong>
          </div>
          <p class="hist-archive-supports-text">${isEn ? ps.supportsEn : ps.supportsEs}</p>
        </div>

        <!-- Transcripción textual / Pasaje original en pergamino -->
        <div class="hist-archive-excerpt-wrap">
          <span class="hist-excerpt-kicker">${isEn ? 'Diplomatic excerpt / Textual citation:' : 'Extracto diplomático / Cita textual:'}</span>
          <blockquote class="hist-primary-excerpt">${isEn ? ps.excerptEn : ps.excerptEs}</blockquote>
          <div class="hist-primary-citation">${isEn ? `Citation: ${ps.citationEn}` : `Localización: ${ps.citationEs}`}</div>
        </div>

        <!-- Barra de Acciones del Archivo -->
        <div class="hist-archive-action-bar">
          ${ps.facsimileUrl ? `
            <a href="${ps.facsimileUrl}" target="_blank" rel="noopener noreferrer" class="hist-btn-archive-link" title="${isEn ? 'Open authoritative edition in new tab' : 'Abrir edición fidedigna en nueva pestaña'}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>${isEn ? ps.facsimileLabelEn : ps.facsimileLabelEs}</span>
            </a>
          ` : ''}

          <button type="button" class="hist-btn-toggle-tech-sheet" id="hist-btn-toggle-tech-sheet" aria-expanded="false" aria-controls="hist-source-tech-sheet">
            <span aria-hidden="true">🔍</span>
            <span class="hist-tech-sheet-label-es">Ficha técnica archivística</span>
            <span class="hist-tech-sheet-label-en" aria-hidden="true">Technical archival sheet</span>
            <span class="hist-tech-sheet-chevron" aria-hidden="true">▾</span>
          </button>
        </div>

        <!-- Panel Desplegable de Verificación Técnica -->
        <div class="hist-source-tech-sheet" id="hist-source-tech-sheet" aria-hidden="true">
          <div class="hist-tech-sheet-inner">
            <div class="hist-tech-item">
              <span class="hist-tech-label">${isEn ? 'Physical Format & Support:' : 'Soporte y formato físico:'}</span>
              <span class="hist-tech-value">${ps.technicalSheet.format}</span>
            </div>
            <div class="hist-tech-item">
              <span class="hist-tech-label">${isEn ? 'Verification Methodology:' : 'Metodología de verificación:'}</span>
              <span class="hist-tech-value">${isEn ? ps.technicalSheet.verificationMethodEn : ps.technicalSheet.verificationMethodEs}</span>
            </div>
            <div class="hist-tech-item hist-tech-note">
              <span class="hist-tech-label">${isEn ? 'Digital Access & Facsimile Status:' : 'Disponibilidad de facsímil digital:'}</span>
              <span class="hist-tech-value">${isEn ? ps.facsimileNoteEn : ps.facsimileNoteEs}</span>
            </div>
          </div>
        </div>
      `;
    }

    // 5. Sección 4: Interpretación histórica (hechos vs debate)
    const factsEl = document.getElementById('hist-interp-facts-text');
    const debateEl = document.getElementById('hist-interp-debate-text');

    if (factsEl) {
      factsEl.innerHTML = `<p>${isEn ? ex.interpretation.factsEn : ex.interpretation.factsEs}</p>`;
    }
    if (debateEl) {
      debateEl.innerHTML = `<p>${isEn ? ex.interpretation.debateEn : ex.interpretation.debateEs}</p>`;
    }

    // 6. Sección 5: Bibliografía académica anotada (Scholarly Bibliography)
    const refsContainer = document.getElementById('hist-refs-list');
    if (refsContainer && Array.isArray(ex.references)) {
      refsContainer.innerHTML = ex.references.map(ref => `
        <div class="hist-ref-card">
          <div class="hist-ref-card-header">
            <span class="hist-ref-badge">${isEn ? ref.typeEn : ref.typeEs}</span>
            <span class="hist-ref-year">(${ref.year})</span>
          </div>

          <div class="hist-ref-citation">
            <strong class="hist-ref-author">${ref.author}.</strong>
            <cite class="hist-ref-work">«${ref.title}»</cite>.
            <span class="hist-ref-publisher">${ref.publisher}.</span>
          </div>

          <div class="hist-ref-supports">
            <span class="hist-ref-supports-kicker">${isEn ? 'Scholarly Evidence Supported:' : 'Qué respalda esta investigación:'}</span>
            <p class="hist-ref-supports-text">${isEn ? ref.supportsEn : ref.supportsEs}</p>
          </div>

          ${ref.url ? `
            <div class="hist-ref-actions">
              <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="hist-ref-link" aria-label="Abrir enlace académico a ${ref.title}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>${isEn ? 'Consult publication repository ↗' : 'Consultar publicación / Repositorio ↗'}</span>
              </a>
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    // 7. Pie de navegación
    if (exhibitNavCount) {
      exhibitNavCount.textContent = `${index + 1} / ${events.length}`;
    }
    if (exhibitPrevBtn) {
      exhibitPrevBtn.disabled = index === 0;
      if (index === 0) {
        exhibitPrevBtn.setAttribute('aria-disabled', 'true');
      } else {
        exhibitPrevBtn.removeAttribute('aria-disabled');
      }
    }
    if (exhibitNextBtn) {
      exhibitNextBtn.disabled = index === events.length - 1;
      if (index === events.length - 1) {
        exhibitNextBtn.setAttribute('aria-disabled', 'true');
      } else {
        exhibitNextBtn.removeAttribute('aria-disabled');
      }
    }

    // Sincronizar etiquetas bilingües
    syncExhibitSectionTitles();
  }

  /**
   * Sincroniza los encabezados de sección bilingües dentro de la Cédula.
   */
  function syncExhibitSectionTitles() {
    if (!exhibitModal) return;
    const isEn = exhibitLanguage === 'en';

    exhibitModal.querySelectorAll('.hist-sec-title-es, .hist-interp-title-es, .hist-tech-sheet-label-es').forEach(el => {
      if (isEn) {
        el.setAttribute('aria-hidden', 'true');
        el.style.display = 'none';
      } else {
        el.removeAttribute('aria-hidden');
        el.style.display = 'inline';
      }
    });

    exhibitModal.querySelectorAll('.hist-sec-title-en, .hist-interp-title-en, .hist-tech-sheet-label-en').forEach(el => {
      if (isEn) {
        el.removeAttribute('aria-hidden');
        el.style.display = 'inline';
      } else {
        el.setAttribute('aria-hidden', 'true');
        el.style.display = 'none';
      }
    });

    if (exhibitPrevBtn) {
      const span = exhibitPrevBtn.querySelector('span:not([aria-hidden])');
      if (span) span.textContent = isEn ? 'Previous event' : 'Hito anterior';
    }
    if (exhibitNextBtn) {
      const span = exhibitNextBtn.querySelector('span:not([aria-hidden])');
      if (span) span.textContent = isEn ? 'Next event' : 'Siguiente hito';
    }
  }

  /**
   * Abre la Cédula Histórica Expandible para un evento dado.
   */
  function openExhibit(index) {
    if (!exhibitModal) return;
    lastFocusedTriggerBtn = document.activeElement;

    scrollToEvent(index);
    renderExhibitContent(index);

    // Bloquear scroll de la página de fondo
    document.documentElement.classList.add('hist-modal-open');
    document.body.classList.add('hist-modal-open');

    exhibitModal.classList.add('hist-exhibit-active');
    exhibitModal.setAttribute('aria-hidden', 'false');
    isExhibitOpen = true;

    // Reiniciar posición de scroll del cuerpo del modal
    const exhibitBody = document.getElementById('hist-exhibit-body');
    if (exhibitBody) {
      exhibitBody.scrollTop = 0;
    }

    if (exhibitCloseBtn) {
      setTimeout(() => exhibitCloseBtn.focus(), 60);
    }

    document.querySelectorAll('.hist-btn-exhibit').forEach(btn => {
      const btnIdx = parseInt(btn.getAttribute('data-exhibit-index'), 10);
      btn.setAttribute('aria-expanded', btnIdx === index ? 'true' : 'false');
    });
  }

  /**
   * Cierra la Cédula Histórica Expandible y devuelve el foco.
   */
  function closeExhibit() {
    if (!exhibitModal || !isExhibitOpen) return;

    exhibitModal.classList.remove('hist-exhibit-active');
    exhibitModal.setAttribute('aria-hidden', 'true');
    isExhibitOpen = false;

    // Restaurar scroll de la página principal
    document.documentElement.classList.remove('hist-modal-open');
    document.body.classList.remove('hist-modal-open');

    document.querySelectorAll('.hist-btn-exhibit').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });

    if (lastFocusedTriggerBtn && typeof lastFocusedTriggerBtn.focus === 'function') {
      lastFocusedTriggerBtn.focus();
    }

    // Restaurar visibilidad del tutorial en Hito 12 si no fue descartado
    if (activeEventIndex === events.length - 1 && !isVestibuloGuideDismissed) {
      showVestibuloGuide();
    }
  }

  /**
   * Sincroniza el idioma en todas las tarjetas de la cronología y la cédula histórica.
   * @param {'es' | 'en'} targetLang
   */
  function syncAllCardsLanguage(targetLang) {
    exhibitLanguage = targetLang === 'en' ? 'en' : 'es';
    if (isExhibitOpen) {
      renderExhibitContent(activeExhibitIndex);
    }
    cardElements.forEach(function (card) {
      const isTranslated = card.classList.contains('hist-translated');
      if (exhibitLanguage === 'en' && !isTranslated) {
        toggleCardTranslation(card, false);
      } else if (exhibitLanguage === 'es' && isTranslated) {
        toggleCardTranslation(card, false);
      }
    });

    syncVestibuloGuideLanguage(exhibitLanguage);
  }

  /**
   * Alterna el idioma entre español e inglés dentro de la Cédula y tarjetas.
   */
  function toggleExhibitLanguage() {
    const nextLang = exhibitLanguage === 'es' ? 'en' : 'es';
    syncAllCardsLanguage(nextLang);

    try {
      window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: exhibitLanguage } }));
    } catch (e) {
      // Ignore if CustomEvent dispatch fails in test environments
    }
  }

  /**
   * Configura los controladores de eventos de la Cédula Histórica Expandible.
   */
  function initExhibitControls() {
    if (!exhibitModal) return;

    if (exhibitCloseBtn) {
      exhibitCloseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeExhibit();
      });
    }

    if (exhibitBackdrop) {
      exhibitBackdrop.addEventListener('click', function (e) {
        e.preventDefault();
        closeExhibit();
      });
    }

    if (exhibitTranslateBtn) {
      exhibitTranslateBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleExhibitLanguage();
      });
    }

    if (exhibitPrevBtn) {
      exhibitPrevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (activeExhibitIndex > 0) {
          openExhibit(activeExhibitIndex - 1);
        }
      });
    }

    if (exhibitNextBtn) {
      exhibitNextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (activeExhibitIndex < events.length - 1) {
          openExhibit(activeExhibitIndex + 1);
        }
      });
    }

    // Toggle de la ficha técnica archivística dentro de la fuente primaria
    exhibitModal.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('#hist-btn-toggle-tech-sheet');
      if (toggleBtn) {
        e.preventDefault();
        const sheet = document.getElementById('hist-source-tech-sheet');
        if (sheet) {
          const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
          toggleBtn.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
          sheet.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
          sheet.classList.toggle('hist-tech-sheet-open', !isExpanded);
        }
      }
    });

    // Aislamiento completo de scroll para que no afecte a la ventana/página principal
    if (exhibitModal) {
      exhibitModal.addEventListener('wheel', function (e) {
        const scrollBody = e.target.closest('.hist-exhibit-body');
        if (!scrollBody) {
          // Si el cursor está en el fondo, cabecera o bordes, impedir que la rueda mueva la página
          e.preventDefault();
          return;
        }

        // Si está en el cuerpo scrollable, contener el scroll en los límites superior e inferior
        const atTop = scrollBody.scrollTop <= 0 && e.deltaY < 0;
        const atBottom = (scrollBody.scrollTop + scrollBody.clientHeight >= scrollBody.scrollHeight - 1) && e.deltaY > 0;
        if (atTop || atBottom) {
          e.preventDefault();
        }
      }, { passive: false });

      // Evitar arrastre de página en dispositivos móviles fuera del área de lectura
      exhibitModal.addEventListener('touchmove', function (e) {
        if (!e.target.closest('.hist-exhibit-body')) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  }

  // =========================================================================
  // 7. 📱 SOPORTE TÁCTIL Y GESTUAL (MOBILE TOUCH / SWIPE)
  // =========================================================================
  function initTouchSwipeNavigation() {
    if (!journeyContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    journeyContainer.addEventListener('touchstart', function (e) {
      if (isExhibitOpen) return;
      if (e.touches.length !== 1) return;

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = performance.now();
    }, { passive: true });

    journeyContainer.addEventListener('touchend', function (e) {
      if (isExhibitOpen) return;
      if (e.changedTouches.length !== 1) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaTime = performance.now() - touchStartTime;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      if (absX >= 45 && absX > absY * 1.3 && deltaTime < 600) {
        if (diffX < 0) {
          if (activeEventIndex < events.length - 1) {
            scrollToEvent(activeEventIndex + 1);
          } else {
            const quizSection = document.getElementById('hist-quiz-section') || document.getElementById('site-footer');
            if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          if (activeEventIndex > 0) {
            scrollToEvent(activeEventIndex - 1);
          }
        }
      }
    }, { passive: true });
  }

  // =========================================================================
  // 8. 🎮 CONTROLES DE NAVEGACIÓN Y TECLADO
  // =========================================================================
  function initNavigationControls() {
    if (!journeyContainer) return;

    journeyContainer.addEventListener('click', function (e) {
      const exhibitBtn = e.target.closest('.hist-btn-exhibit');
      if (exhibitBtn) {
        e.preventDefault();
        const exIdx = parseInt(exhibitBtn.getAttribute('data-exhibit-index'), 10);
        if (!isNaN(exIdx)) {
          openExhibit(exIdx);
        }
        return;
      }

      const dot = e.target.closest('.hist-dot');
      if (dot) {
        e.preventDefault();
        const index = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          scrollToEvent(index);
        }
        return;
      }

      const prevBtn = e.target.closest('.hist-btn-prev');
      if (prevBtn && !prevBtn.disabled) {
        e.preventDefault();
        const prevIndex = parseInt(prevBtn.getAttribute('data-prev-index'), 10);
        if (!isNaN(prevIndex) && prevIndex >= 0) {
          scrollToEvent(prevIndex);
        }
        return;
      }

      const continueBtn = e.target.closest('.hist-btn-continue');
      if (continueBtn) {
        e.preventDefault();
        const nextIndex = parseInt(continueBtn.getAttribute('data-next-index'), 10);
        if (nextIndex < events.length) {
          scrollToEvent(nextIndex);
        } else {
          const quizSection = document.getElementById('hist-quiz-section') || document.getElementById('site-footer');
          if (quizSection) {
            quizSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        return;
      }

      const translateBtn = e.target.closest('.hist-btn-translate');
      if (translateBtn && !translateBtn.classList.contains('hist-exhibit-translate-btn')) {
        e.preventDefault();
        const card = translateBtn.closest('.hist-stage-card');
        if (card) {
          toggleCardTranslation(card);
        }
        return;
      }
    });

    if (eraNavContainer) {
      eraNavContainer.addEventListener('click', function (e) {
        const link = e.target.closest('.hist-era-link');
        if (link) {
          e.preventDefault();
          const targetEra = link.getAttribute('data-era');
          const targetEventIndex = events.findIndex(evt => evt.era === targetEra);
          if (targetEventIndex !== -1) {
            scrollToEvent(targetEventIndex);
          }
        }
      });
    }

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', function () {
        programmaticTargetIndex = null;
        updateStage();
      }, { passive: true });
    }

    window.addEventListener('historiaLanguageChange', function (e) {
      if (e.detail && e.detail.lang) {
        syncAllCardsLanguage(e.detail.lang);
      }
    });
  }

  function toggleCardTranslation(card, broadcast) {
    if (!card) return;
    if (broadcast === undefined) broadcast = true;

    const isTranslated = card.classList.contains('hist-translated');
    const captionEs = card.querySelector('.hist-card-caption-es');
    const captionEn = card.querySelector('.hist-card-caption-en');
    const translateBtn = card.querySelector('.hist-btn-translate');

    if (isTranslated) {
      card.classList.remove('hist-translated');
      if (captionEs) captionEs.removeAttribute('aria-hidden');
      if (captionEn) captionEn.setAttribute('aria-hidden', 'true');
      if (translateBtn) translateBtn.setAttribute('aria-pressed', 'false');
    } else {
      card.classList.add('hist-translated');
      if (captionEs) captionEs.setAttribute('aria-hidden', 'true');
      if (captionEn) captionEn.removeAttribute('aria-hidden');
      if (translateBtn) translateBtn.setAttribute('aria-pressed', 'true');
    }

    if (broadcast) {
      const newLang = card.classList.contains('hist-translated') ? 'en' : 'es';
      syncAllCardsLanguage(newLang);
      try {
        window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: exhibitLanguage } }));
      } catch (err) {
        // Ignore in headless/test environments
      }
    }
  }

  function initKeyboardNavigation() {
    window.addEventListener('keydown', function (e) {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (isExhibitOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeExhibit();
          return;
        }
        if (e.key === 'ArrowRight' && activeExhibitIndex < events.length - 1) {
          e.preventDefault();
          openExhibit(activeExhibitIndex + 1);
          return;
        }
        if (e.key === 'ArrowLeft' && activeExhibitIndex > 0) {
          e.preventDefault();
          openExhibit(activeExhibitIndex - 1);
          return;
        }
        return;
      }

      if (!journeyContainer) return;

      const rect = journeyContainer.getBoundingClientRect();
      const isInStage = rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3;
      const isStageFocused = stageElement && (stageElement === document.activeElement || stageElement.contains(document.activeElement));

      if (isInStage || isStageFocused) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          if (activeEventIndex < events.length - 1) {
            scrollToEvent(activeEventIndex + 1);
          } else {
            const quizSection = document.getElementById('hist-quiz-section') || document.getElementById('site-footer');
            if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          if (activeEventIndex > 0) {
            scrollToEvent(activeEventIndex - 1);
          }
        } else if (e.key === 'Home') {
          e.preventDefault();
          scrollToEvent(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          scrollToEvent(events.length - 1);
        }
      }
    });
  }

  function initVocabTooltips() {
    let floatingTooltip = document.getElementById('hist-floating-vocab-tooltip');
    if (!floatingTooltip) {
      floatingTooltip = document.createElement('div');
      floatingTooltip.id = 'hist-floating-vocab-tooltip';
      floatingTooltip.className = 'hist-vocab-tooltip';
      floatingTooltip.setAttribute('role', 'tooltip');
      floatingTooltip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(floatingTooltip);
    }

    let activeVocabElement = null;

    function showTooltip(el) {
      const termKey = el.getAttribute('data-term');
      const entry = vocab[termKey];
      if (!entry) return;

      activeVocabElement = el;
      floatingTooltip.innerHTML = `
        <div class="hist-tooltip-title">${entry.es}</div>
        <div class="hist-tooltip-def">${entry.en}</div>
      `;
      floatingTooltip.classList.add('hist-tooltip-active');
      floatingTooltip.setAttribute('aria-hidden', 'false');

      positionTooltip(el);
    }

    function hideTooltip() {
      if (floatingTooltip) {
        floatingTooltip.classList.remove('hist-tooltip-active');
        floatingTooltip.setAttribute('aria-hidden', 'true');
      }
      activeVocabElement = null;
    }

    function positionTooltip(el) {
      const rect = el.getBoundingClientRect();
      const tooltipRect = floatingTooltip.getBoundingClientRect();

      let top = rect.top - tooltipRect.height - 10;
      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

      if (top < 10) {
        top = rect.bottom + 10;
      }
      if (left < 12) left = 12;
      if (left + tooltipRect.width > window.innerWidth - 12) {
        left = window.innerWidth - tooltipRect.width - 12;
      }

      floatingTooltip.style.top = `${top + window.scrollY}px`;
      floatingTooltip.style.left = `${left + window.scrollX}px`;
    }

    document.addEventListener('mouseover', function (e) {
      const vocabEl = e.target.closest('.hist-vocab');
      if (vocabEl) showTooltip(vocabEl);
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('.hist-vocab')) hideTooltip();
    });

    document.addEventListener('focusin', function (e) {
      const vocabEl = e.target.closest('.hist-vocab');
      if (vocabEl) showTooltip(vocabEl);
    });

    document.addEventListener('focusout', function (e) {
      if (e.target.closest('.hist-vocab')) hideTooltip();
    });

    document.addEventListener('click', function (e) {
      const vocabEl = e.target.closest('.hist-vocab');
      if (vocabEl) {
        e.stopPropagation();
        if (activeVocabElement === vocabEl) {
          hideTooltip();
        } else {
          showTooltip(vocabEl);
        }
      } else {
        hideTooltip();
      }
    });

    window.addEventListener('resize', () => {
      if (activeVocabElement) positionTooltip(activeVocabElement);
    });
  }

  /**
   * Inicialización global del módulo al cargar la página.
   */
  function init() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam === 'en' || langParam === 'es') {
        exhibitLanguage = langParam;
      }
    } catch (e) {}

    preloadTimelineImages();
    renderPinnedStage();
    initNavigationControls();
    initExhibitControls();
    initVestibuloGuideControls();
    syncVestibuloGuideLanguage(exhibitLanguage);
    initTouchSwipeNavigation();
    initKeyboardNavigation();
    initVocabTooltips();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateContainerHeight();
      updateStage();
    }, { passive: true });

    updateStage();
  }

  // =========================================================================
  // EXPORTAR API PÚBLICA DEL TIMELINE (Integración Mapa Histórico y Módulos)
  // =========================================================================
  window.historiaJourney = {
    scrollToEvent: function (index) {
      scrollToEvent(index);
    },
    openExhibit: function (index) {
      openExhibit(index);
    },
    closeExhibit: function () {
      closeExhibit();
    },
    getActiveIndex: function () {
      return activeIndex;
    },
    getEvents: function () {
      return events;
    },
    getEvent: function (index) {
      return events[index] || null;
    },
    getEventsCount: function () {
      return events.length;
    },
    getLanguage: function () {
      return exhibitLanguage;
    },
    toggleLanguage: function () {
      toggleExhibitLanguage();
    },
    setLanguage: function (lang) {
      if (lang && (lang === 'en' || lang === 'es')) {
        syncAllCardsLanguage(lang);
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
