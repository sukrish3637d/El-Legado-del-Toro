/**
 * ==========================================================================
 * SECCIÓN 3: LA CULTURA — DEL RUEDO A LA VIDA
 * Archivo: sections/cultura/script.js
 * Proyecto: El Legado del Toro — Revista Digital
 * 
 * Funcionalidades interactivas simplificadas para Español Nivel 1 (A1):
 * 1. Cuestionario interactivo (5 preguntas secuenciales con puntuación y medalla).
 * 2. Control flotante "Volver arriba".
 * 
 * Código encapsulado en una IIFE privada sin variables globales.
 * No utiliza localStorage ni dependencias externas.
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // BANCO DE DATOS: 3 PREGUNTAS DEL CUESTIONARIO
  // --------------------------------------------------------------------------
  const PREGUNTAS_QUIZ = [
    {
      id: 1,
      pregunta: "¿Qué significa la expresión «ver los toros desde la barrera»?",
      opciones: [
        "Comprar las entradas más baratas en la plaza.",
        "Mirar un problema desde un lugar seguro, sin participar.",
        "Trabajar como voluntario en una fiesta popular.",
        "Ignorar las normas de tráfico en una ciudad."
      ],
      correcta: 1,
      explicacion: "Significa observar un problema sin involucrarse ni correr riesgos, como quien mira la corrida detrás de la madera de protección.",
      fuente: "Diccionario de la Lengua Española (RAE)"
    },
    {
      id: 2,
      pregunta: "¿Por qué se llama «traje de luces» la ropa del torero?",
      opciones: [
        "Porque los bordados de oro y plata brillan con la luz del sol.",
        "Porque tiene pequeñas bombillas eléctricas en las hombreras.",
        "Porque solo se usa en corridas de noche.",
        "Por el color blanco de la camisa."
      ],
      correcta: 0,
      explicacion: "Se llama así por el brillo que producen los bordados de oro y plata cuando reciben la luz directa del sol.",
      fuente: "Museo del Traje de Madrid"
    },
    {
      id: 3,
      pregunta: "En una conversación, si alguien dice «te voy a echar un capote», ¿qué significa?",
      opciones: [
        "Te ofrece una chaqueta para no tener frío.",
        "Quiere empezar una discusión contigo.",
        "Te ofrece su ayuda en un momento difícil.",
        "Te pide dinero prestado."
      ],
      correcta: 2,
      explicacion: "Esta frase viene del toreo, cuando un compañero ayuda a otro con su capote para protegerlo en un momento difícil.",
      fuente: "Diccionario de la Lengua Española (RAE)"
    }
  ];

  // --------------------------------------------------------------------------
  // INICIALIZACIÓN AL CARGAR EL DOM
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initQuizInteractivo();
    initBackToTop();
  });

  // --------------------------------------------------------------------------
  // CONTROLADOR DEL CUESTIONARIO VERTICAL (5 PREGUNTAS EN ORDEN)
  // --------------------------------------------------------------------------
  function initQuizInteractivo() {
    const btnComprobar = document.getElementById('cultura-btn-comprobar');
    const btnReset = document.getElementById('cultura-btn-reset-quiz');
    const resultCard = document.getElementById('cultura-quiz-result');
    const finalScoreEl = document.getElementById('cultura-final-score');
    const finalMsgEl = document.getElementById('cultura-final-msg');
    const honorBadgeEl = document.getElementById('cultura-badge-honor');

    if (!btnComprobar || !resultCard) return;

    btnComprobar.addEventListener('click', function () {
      let puntuacion = 0;
      let respondidas = 0;

      PREGUNTAS_QUIZ.forEach((item, index) => {
        const qNum = index + 1;
        const selector = `input[name="quiz-q${qNum}"]:checked`;
        const selectedRadio = document.querySelector(selector);
        const card = document.getElementById(`cultura-quiz-card-${qNum}`);
        const feedbackBox = document.getElementById(`cultura-feedback-${qNum}`);

        if (!card) return;

        // Limpiar marcas previas
        const allLabels = card.querySelectorAll('.cultura-radio-label');
        allLabels.forEach(lbl => {
          lbl.classList.remove('is-correct', 'is-incorrect');
          const status = lbl.querySelector('.cultura-radio-status');
          if (status) status.textContent = '';
        });

        if (selectedRadio) {
          respondidas++;
          const selectedVal = parseInt(selectedRadio.value, 10);
          const esCorrecta = selectedVal === item.correcta;

          if (esCorrecta) {
            puntuacion++;
          }

          // Marcar opción correcta
          const correctLabel = card.querySelector(`label[for="q${qNum}-opt${item.correcta}"]`);
          if (correctLabel) {
            correctLabel.classList.add('is-correct');
            const status = correctLabel.querySelector('.cultura-radio-status');
            if (status) status.textContent = '✓ Correcto';
          }

          // Marcar incorrecta si falló
          if (!esCorrecta) {
            const chosenLabel = card.querySelector(`label[for="q${qNum}-opt${selectedVal}"]`);
            if (chosenLabel) {
              chosenLabel.classList.add('is-incorrect');
              const status = chosenLabel.querySelector('.cultura-radio-status');
              if (status) status.textContent = '✗ Incorrecto';
            }
          }

          // Mostrar retroalimentación
          if (feedbackBox) {
            feedbackBox.className = `cultura-feedback-box is-visible ${esCorrecta ? 'correct' : 'incorrect'}`;
            feedbackBox.innerHTML = `
              <strong>${esCorrecta ? '¡Muy bien!' : 'Respuesta no correcta.'}</strong> ${item.explicacion}
              <div class="cultura-feedback-cite">Fuente verificada: ${item.fuente}</div>
            `;
          }
        } else {
          // Si no contestó esta pregunta
          if (feedbackBox) {
            feedbackBox.className = 'cultura-feedback-box is-visible incorrect';
            feedbackBox.innerHTML = `<strong>Sin responder:</strong> Por favor, selecciona una opción para esta pregunta.`;
          }
        }
      });

      // Puntuación total sobre el número de preguntas
      if (finalScoreEl) {
        finalScoreEl.textContent = `${puntuacion} / ${PREGUNTAS_QUIZ.length}`;
      }

      let mensaje = '';
      let insignia = '';

      if (puntuacion === PREGUNTAS_QUIZ.length) {
        insignia = '🥇 ¡Excelente!';
        mensaje = '¡Muy bien! Has acertado todas las preguntas sobre la cultura española.';
      } else if (puntuacion >= 2) {
        insignia = '🥈 ¡Buen trabajo!';
        mensaje = '¡Muy bien! Conoces las expresiones y las obras culturales más importantes.';
      } else {
        insignia = '🥉 Sigue practicando';
        mensaje = 'Sigue practicando. Puedes repasar las imágenes y expresiones para mejorar.';
      }

      if (honorBadgeEl) honorBadgeEl.textContent = insignia;
      if (finalMsgEl) finalMsgEl.textContent = mensaje;

      resultCard.classList.add('is-visible');
      if (btnReset) btnReset.style.display = 'inline-block';
    });

    if (btnReset) {
      btnReset.addEventListener('click', function () {
        for (let i = 1; i <= PREGUNTAS_QUIZ.length; i++) {
          const radios = document.querySelectorAll(`input[name="quiz-q${i}"]`);
          radios.forEach(r => { r.checked = false; });

          const card = document.getElementById(`cultura-quiz-card-${i}`);
          if (card) {
            const allLabels = card.querySelectorAll('.cultura-radio-label');
            allLabels.forEach(lbl => {
              lbl.classList.remove('is-correct', 'is-incorrect');
              const status = lbl.querySelector('.cultura-radio-status');
              if (status) status.textContent = '';
            });
          }

          const feedbackBox = document.getElementById(`cultura-feedback-${i}`);
          if (feedbackBox) {
            feedbackBox.className = 'cultura-feedback-box';
            feedbackBox.innerHTML = '';
          }
        }

        resultCard.classList.remove('is-visible');
        btnReset.style.display = 'none';
      });
    }
  }

  // --------------------------------------------------------------------------
  // BOTÓN "VOLVER ARRIBA"
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const backBtn = document.getElementById('cultura-back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        backBtn.classList.add('is-visible');
      } else {
        backBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
