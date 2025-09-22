/**
 * QUICK ACCESS HELPERS
 * ===================
 *
 * Arquivo contendo todas as funções auxiliares relacionadas aos
 * itens de acesso rápido do portal.
 *
 * Funções incluídas:
 * - Clique nos itens de acesso rápido
 * - Efeitos visuais de clique
 * - Ações específicas (Ver mais, outras opções)
 */

import $ from "jquery";

/* ==========================================================================
   FUNÇÕES DE INTERAÇÃO COM ACESSO RÁPIDO
   ========================================================================== */

/**
 * Manipula o clique nos itens de acesso rápido
 * @param {Event} e - Evento do clique
 * @param {Function} showNotification - Função para mostrar notificações
 * @param {Function} showModal - Função para mostrar modal
 */
function handleQuickAccessClick(e, showNotification, showModal) {
  const $item = $(e.currentTarget);
  const label = $item.find(".quick-access-label").text();

  // Efeito visual
  $item.addClass("clicked");
  setTimeout(() => {
    $item.removeClass("clicked");
  }, 200);

  // Simular ação
  if (label === "Ver mais") {
    showModal(
      "Acesso Rápido",
      "Mais Opções",
      "Aqui seriam exibidas mais opções de acesso rápido disponíveis no sistema."
    );
    return;
  }

  showNotification(`Abrindo: ${label}`, "info");
}

/* ==========================================================================
   FUNÇÕES DE CONFIGURAÇÃO DOS EVENT LISTENERS
   ========================================================================== */

/**
 * Configura todos os event listeners relacionados ao acesso rápido
 * @param {Function} showNotification - Função para mostrar notificações
 * @param {Function} showModal - Função para mostrar modal
 */
export function setupQuickAccessEventListeners(showNotification, showModal) {
  // Interação com itens de acesso rápido
  $(".quick-access-item").on("click", function (e) {
    handleQuickAccessClick(e, showNotification, showModal);
  });
}
