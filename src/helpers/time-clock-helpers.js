/**
 * TIME CLOCK HELPERS
 * ==================
 *
 * Arquivo contendo todas as funções auxiliares relacionadas ao
 * sistema de registro de ponto (entrada/saída).
 *
 * Funções incluídas:
 * - Registro de entrada/saída
 * - Estados do botão de ponto
 * - Animações e feedback visual
 */

import $ from "jquery";

/* ==========================================================================
   FUNÇÕES DE REGISTRO DE PONTO
   ========================================================================== */

/**
 * Manipula o clique no botão de registro de ponto
 * @param {Event} e - Evento do clique
 * @param {Function} showNotification - Função para mostrar notificações
 */
function handleTimeClockClick(e, showNotification) {
  const $btn = $(e.currentTarget);
  const currentText = $btn.text().trim();

  // Determina o próximo estado baseado no texto atual
  const isEntrada = currentText === "Entrada";
  const nextText = isEntrada ? "Saída" : "Entrada";
  const loadingText = isEntrada
    ? "Registrando entrada..."
    : "Registrando saída...";
  const successMessage = isEntrada
    ? "Entrada registrada com sucesso!"
    : "Saída registrada com sucesso!";

  $btn.prop("disabled", true).text(loadingText);

  setTimeout(() => {
    $btn.prop("disabled", false).text(nextText);
    showNotification(successMessage, "success");
  }, 1500);
}

/* ==========================================================================
   FUNÇÕES DE CONFIGURAÇÃO DOS EVENT LISTENERS
   ========================================================================== */

/**
 * Configura todos os event listeners relacionados ao registro de ponto
 * @param {Function} showNotification - Função para mostrar notificações
 */
export function setupTimeClockEventListeners(showNotification) {
  // Interação com botão de registro de ponto
  $(".btn-primary.btn-big").on("click", function (e) {
    handleTimeClockClick(e, showNotification);
  });
}
