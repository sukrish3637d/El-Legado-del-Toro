(function() {
  'use strict';

  function initArteGallery() {
    // Cache DOM elements
    const filterBar = document.getElementById('arte-filter-bar');
    const galleryGrid = document.getElementById('arte-gallery-grid');
    if (!filterBar || !galleryGrid) return;

    const filterButtons = filterBar.querySelectorAll('.arte-filter-btn');
    const cards = galleryGrid.querySelectorAll('.arte-card');
    const countNumber = document.getElementById('arte-count-number');
    const noResults = document.getElementById('arte-no-results');

    const modal = document.getElementById('arte-lightbox-modal');
    const modalCloseBtn = document.getElementById('arte-lightbox-close');
    const modalFooterCloseBtn = document.getElementById('arte-lightbox-footer-close');
    const modalImg = document.getElementById('arte-lightbox-img');
    const modalTitle = document.getElementById('arte-lightbox-title');
    const modalCategory = document.getElementById('arte-lightbox-category');
    const modalYear = document.getElementById('arte-lightbox-year');
    const modalOrigin = document.getElementById('arte-lightbox-origin');
    const modalTechnique = document.getElementById('arte-lightbox-technique');
    const modalMedium = document.getElementById('arte-lightbox-medium');
    const modalMuseum = document.getElementById('arte-lightbox-museum');
    const modalContext = document.getElementById('arte-lightbox-context-text');

    // Helper to update visible count and empty state
    function updateCount() {
      const visible = galleryGrid.querySelectorAll('.arte-card:not([hidden]):not(.arte-hidden)');
      if (countNumber) {
        countNumber.textContent = visible.length;
      }
      if (noResults) {
        const hasVisible = visible.length > 0;
        noResults.hidden = hasVisible;
        noResults.classList.toggle('arte-hidden', hasVisible);
        noResults.style.display = hasVisible ? 'none' : 'block';
      }
    }

    // Filter logic using event delegation on filter bar
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button.arte-filter-btn') || e.target.closest('.arte-filter-btn') || e.target.closest('button');
      if (!btn || !filterBar.contains(btn)) return;

      // Update active state on all buttons
      filterButtons.forEach(b => {
        const isCurrent = (b === btn);
        b.classList.toggle('active', isCurrent);
        b.classList.toggle('arte-active', isCurrent);
        b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });

      const rawFilter = btn.getAttribute('data-filter') || btn.dataset.filter || 'all';
      const filter = rawFilter.trim().toLowerCase();
      const isAll = (filter === 'all' || filter === 'todas');

      cards.forEach(card => {
        const rawCategory = card.getAttribute('data-category') || card.dataset.category || '';
        const category = rawCategory.trim().toLowerCase();
        const matches = isAll || (category === filter);

        card.hidden = !matches;
        card.classList.toggle('arte-hidden', !matches);
        card.style.display = matches ? '' : 'none';
      });

      updateCount();
    });

    // Track last focused card for return focus after closing modal
    let lastFocusedCard = null;

    // Open modal for a card
    function openModal(card) {
      if (!modal) return;
      const imgEl = card.querySelector('img');
      const imgSrc = imgEl ? imgEl.src : '';
      const imgAlt = imgEl ? imgEl.alt : '';
      const title = card.getAttribute('data-title') || card.dataset.title || '';
      const category = card.getAttribute('data-category') || card.dataset.category || '';
      const year = card.getAttribute('data-year') || card.dataset.year || '';
      const origin = card.getAttribute('data-origin') || card.dataset.origin || '';
      const medium = card.getAttribute('data-medium') || card.dataset.medium || '';
      const technique = card.getAttribute('data-technique') || card.dataset.technique || '';
      const context = card.getAttribute('data-context') || card.dataset.context || '';
      const museum = card.getAttribute('data-museum') || card.dataset.museum || '';

      if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt || title;
      }
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) {
        modalCategory.textContent = category ? (category.charAt(0).toUpperCase() + category.slice(1)) : '';
      }
      if (modalYear) modalYear.textContent = year;
      if (modalOrigin) modalOrigin.textContent = origin;
      if (modalMedium) modalMedium.textContent = medium;
      if (modalTechnique) modalTechnique.textContent = technique;
      if (modalMuseum) modalMuseum.textContent = museum;
      if (modalContext) modalContext.textContent = context;

      modal.hidden = false;
      modal.classList.remove('arte-hidden');
      modal.style.display = 'flex';

      // Focus close button for accessibility
      if (modalCloseBtn) {
        modalCloseBtn.focus();
      }
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    // Close modal
    function closeModal() {
      if (!modal) return;
      modal.hidden = true;
      modal.classList.add('arte-hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
      // Return focus to the last active card if any
      if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') {
        lastFocusedCard.focus();
      }
    }

    // Card button click handling via delegation on gallery grid
    galleryGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.arte-card-btn');
      if (!btn) return;
      const card = btn.closest('.arte-card');
      if (!card) return;
      lastFocusedCard = card;
      openModal(card);
    });

    // Keyboard accessibility for cards (Enter / Space)
    galleryGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target && e.target.tagName === 'BUTTON') return;
        const card = e.target.closest('.arte-card');
        if (card) {
          e.preventDefault();
          lastFocusedCard = card;
          openModal(card);
        }
      }
    });

    // Modal close events
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }
    if (modalFooterCloseBtn) {
      modalFooterCloseBtn.addEventListener('click', closeModal);
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hidden) {
        closeModal();
      }
    });

    // Initialize count and state on page load
    updateCount();
  }

  // Taller del Curador: Descubre la Falsificación (Art Authentication Mini-Game)
  function initCuratorGame() {
    const gameSection = document.getElementById('arte-curator-game');
    if (!gameSection) return;

    const caseCounter = document.getElementById('arte-game-case-counter');
    const scoreCounter = document.getElementById('arte-game-score-counter');
    const gameCard = document.getElementById('arte-game-card');
    const gameImg = document.getElementById('arte-game-img');
    const gameEraBadge = document.getElementById('arte-game-era-badge');
    const gameArtworkTitle = document.getElementById('arte-game-artwork-title');
    const claimsList = document.getElementById('arte-game-claims-list');
    const feedbackBox = document.getElementById('arte-game-feedback');
    const feedbackIcon = document.getElementById('arte-game-feedback-icon');
    const feedbackTitle = document.getElementById('arte-game-feedback-title');
    const feedbackText = document.getElementById('arte-game-feedback-text');
    const nextBtn = document.getElementById('arte-game-next-btn');
    const resultsBox = document.getElementById('arte-game-results');
    const resultsScore = document.getElementById('arte-game-results-score');
    const resultsSummary = document.getElementById('arte-game-results-summary');
    const restartBtn = document.getElementById('arte-game-restart-btn');

    if (!claimsList || !gameCard || !resultsBox) return;

    // Fact-checked Spanish art cases
    const cases = [
      {
        title: 'La Tauromaquia — Francisco de Goya',
        era: '1815–1816 · Madrid, España',
        image: 'img/goya_tauromaquia_grabado_1792658945066.jpg',
        alt: 'Grabado de La Tauromaquia de Francisco de Goya',
        claims: [
          {
            text: 'Técnica de aguafuerte y aguatinta sobre planchas de cobre para generar contrastes lumínicos y claroscuros dramáticos.',
            isFake: false
          },
          {
            text: 'Serie monográfica original compuesta por 33 estampas que capturan la crudeza, el riesgo y el dinamismo del ruedo.',
            isFake: false
          },
          {
            text: 'Goya empleó pinturas acrílicas sintéticas sobre tela de nailon impermeable para conseguir un secado ultrarrápido y tonos brillantes.',
            isFake: true,
            explanation: '¡Falsificación detectada con precisión! Las pinturas acrílicas y el nailon son inventos sintéticos del siglo XX. Goya realizó sus 33 estampas en 1816 mediante grabado tradicional al aguafuerte y aguatinta sobre papel verjurado.'
          }
        ]
      },
      {
        title: 'La Tauromachie — Pablo Picasso',
        era: '1957–1959 · Cannes, Francia',
        image: 'img/picasso_tauromachie_cubist_1792659093092.jpg',
        alt: 'Linograbado cubista de Pablo Picasso representando el toreo',
        claims: [
          {
            text: 'Fue concebida en técnica de linograbados sobre papel en Cannes, fusionando el cubismo moderno con la memoria taurina de su infancia andaluza.',
            isFake: false
          },
          {
            text: 'Fue un encargo ceremonial del rey Felipe II en el siglo XVI para decorar la Real Basílica de El Escorial con frescos barrocos.',
            isFake: true,
            explanation: '¡Excelente peritaje! Existe un anacronismo de cuatro siglos: el rey Felipe II gobernó en el siglo XVI (Renacimiento), mientras que Pablo Picasso creó estos linograbados cubistas a mediados del siglo XX (1957–1959).'
          },
          {
            text: 'Descompone las siluetas del matador y del toro en geometrías esenciales, planos de color contrastados y trazos de gran fuerza expresiva.',
            isFake: false
          }
        ]
      },
      {
        title: 'El Traje de Luces Clásico',
        era: 'Siglo XIX – presente · Sevilla y Madrid',
        image: 'img/traje_luces_classic_1792658899163.jpg',
        alt: 'Traje de luces clásico bordado en oro expuesto en vitrina',
        claims: [
          {
            text: 'Los primeros trajes de luces del siglo XVIII se confeccionaban con fibras elásticas de kevlar y cremalleras de acero inoxidable para mayor ligereza.',
            isFake: true,
            explanation: '¡Gran deducción histórica! Tanto el polímero kevlar como las cremalleras metálicas son inventos patentados en el siglo XX. La sastrería taurina histórica utiliza seda natural, terciopelo, hilos de oro de ley y alamares cosidos a mano.'
          },
          {
            text: 'La chaquetilla (terno) y la taleguilla están recubiertas de bordados artesanales en oro, plata o seda que pueden superar los 4 kg de peso total.',
            isFake: false
          },
          {
            text: 'Cada terno completo requiere habitualmente entre 250 y 400 horas de minuciosa labor artesanal en los talleres de maestros sastres taurinos.',
            isFake: false
          }
        ]
      }
    ];

    // In-memory game state
    let currentCaseIndex = 0;
    let score = 0;
    let hasAnswered = false;

    function renderScoreboard() {
      if (caseCounter) {
        caseCounter.textContent = 'Caso: ' + (currentCaseIndex + 1) + ' de ' + cases.length;
      }
      if (scoreCounter) {
        scoreCounter.textContent = 'Obras autenticadas: ' + score;
      }
    }

    function renderCase(index) {
      const current = cases[index];
      if (!current) return;

      hasAnswered = false;
      renderScoreboard();

      if (gameImg) {
        gameImg.src = current.image;
        gameImg.alt = current.alt || current.title;
      }
      if (gameEraBadge) {
        gameEraBadge.textContent = current.era;
      }
      if (gameArtworkTitle) {
        gameArtworkTitle.textContent = current.title;
      }

      // Hide feedback box
      if (feedbackBox) {
        feedbackBox.hidden = true;
        feedbackBox.classList.add('arte-hidden');
        feedbackBox.classList.remove('arte-game-feedback--correct', 'arte-game-feedback--incorrect');
      }

      // Clear & populate claim buttons
      claimsList.innerHTML = '';
      const letters = ['A', 'B', 'C'];

      current.claims.forEach((claim, claimIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'arte-claim-btn';
        btn.id = 'arte-claim-btn-' + index + '-' + claimIdx;
        btn.setAttribute('data-fake', claim.isFake ? 'true' : 'false');
        btn.setAttribute('data-claim-index', String(claimIdx));

        const letterSpan = document.createElement('span');
        letterSpan.className = 'arte-claim-btn-letter';
        letterSpan.textContent = letters[claimIdx] || String(claimIdx + 1);
        letterSpan.setAttribute('aria-hidden', 'true');

        const textSpan = document.createElement('span');
        textSpan.className = 'arte-claim-btn-text';
        textSpan.textContent = claim.text;

        btn.appendChild(letterSpan);
        btn.appendChild(textSpan);

        btn.addEventListener('click', () => handleClaimSelect(claim, btn, current));
        claimsList.appendChild(btn);
      });
    }

    function handleClaimSelect(selectedClaim, selectedBtn, currentCase) {
      if (hasAnswered) return;
      hasAnswered = true;

      const allBtns = claimsList.querySelectorAll('.arte-claim-btn');
      allBtns.forEach((b) => {
        b.disabled = true;
      });

      const isCorrectChoice = (selectedClaim.isFake === true);

      if (isCorrectChoice) {
        score++;
        selectedBtn.classList.add('arte-claim-btn--success');
        if (feedbackBox) {
          feedbackBox.classList.add('arte-game-feedback--correct');
          if (feedbackIcon) feedbackIcon.textContent = '✓';
          if (feedbackTitle) feedbackTitle.textContent = '¡Falsificación detectada con éxito!';
          if (feedbackText) feedbackText.textContent = selectedClaim.explanation || 'Has identificado correctamente el error histórico.';
        }
      } else {
        selectedBtn.classList.add('arte-claim-btn--error');
        // Find and highlight the actual fake claim
        const fakeClaim = currentCase.claims.find(c => c.isFake);
        allBtns.forEach((b) => {
          if (b.getAttribute('data-fake') === 'true') {
            b.classList.add('arte-claim-btn--reveal-fake');
          }
        });
        if (feedbackBox) {
          feedbackBox.classList.add('arte-game-feedback--incorrect');
          if (feedbackIcon) feedbackIcon.textContent = '✕';
          if (feedbackTitle) feedbackTitle.textContent = '¡Error de peritaje! Esa afirmación es auténtica.';
          if (feedbackText) {
            const explanation = fakeClaim ? fakeClaim.explanation : 'Revisa las fechas y materiales de la época.';
            feedbackText.textContent = 'La afirmación seleccionada es un hecho real documentado. ' + explanation;
          }
        }
      }

      renderScoreboard();

      if (feedbackBox) {
        feedbackBox.hidden = false;
        feedbackBox.classList.remove('arte-hidden');
      }

      if (nextBtn) {
        const isLastCase = (currentCaseIndex + 1 >= cases.length);
        nextBtn.innerHTML = isLastCase ? 'Ver Resultados Finales <span aria-hidden="true">→</span>' : 'Siguiente Caso <span aria-hidden="true">→</span>';
        nextBtn.focus();
      }
    }

    function showResults() {
      if (gameCard) {
        gameCard.hidden = true;
        gameCard.classList.add('arte-hidden');
      }
      if (resultsBox) {
        resultsBox.hidden = false;
        resultsBox.classList.remove('arte-hidden');
      }

      if (resultsScore) {
        resultsScore.textContent = 'Puntuación: ' + score + ' de ' + cases.length + ' obras autenticadas';
      }

      if (resultsSummary) {
        if (score === 3) {
          resultsSummary.textContent = '¡Ojo de Maestro Curador! Has detectado todas las inconsistencias temporales y técnicas sin dejarte engañar por ningún anacronismo. Tu criterio pericial sobre el arte taurino español es sobresaliente.';
        } else if (score === 2) {
          resultsSummary.textContent = '¡Curador Avanzado! Posees un conocimiento sólido de los períodos, estilos y manufacturas artísticas. Solo un detalle histórico logró sortear tu inspección.';
        } else {
          resultsSummary.textContent = 'Aprendiz de Conservación. Los falsificadores son astutos al mezclar hechos reales con fechas o materiales modernos. Te sugerimos revisar las piezas de la galería superior para afilar tu mirada crítica.';
        }
      }

      if (restartBtn) {
        restartBtn.focus();
      }
    }

    function restartGame() {
      currentCaseIndex = 0;
      score = 0;
      hasAnswered = false;

      if (resultsBox) {
        resultsBox.hidden = true;
        resultsBox.classList.add('arte-hidden');
      }
      if (gameCard) {
        gameCard.hidden = false;
        gameCard.classList.remove('arte-hidden');
      }

      renderCase(0);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentCaseIndex + 1 < cases.length) {
          currentCaseIndex++;
          renderCase(currentCaseIndex);
        } else {
          showResults();
        }
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', restartGame);
    }

    // Initial case render
    renderCase(0);
  }

  function initAll() {
    initArteGallery();
    initCuratorGame();
  }

  // Ensure DOM is ready before initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
