/**
 * HOVER HELPERS
 * =============
 *
 * Arquivo contendo todas as funções auxiliares relacionadas aos
 * efeitos de hover e interações visuais.
 *
 * Funções incluídas:
 * - Efeitos de hover em cards de notícias
 * - Efeitos de hover em itens de acesso rápido
 */

import $ from "jquery";

/* ==========================================================================
   FUNÇÕES DE EFEITOS DE HOVER
   ========================================================================== */

/**
 * Configura efeitos de hover para cards de notícias
 */
function setupNewsCardHoverEffects() {
  $(".news-card, .news-card-small").hover(
    function () {
      $(this).addClass("hover-effect");
    },
    function () {
      $(this).removeClass("hover-effect");
    }
  );
}

/**
 * Configura efeitos de hover para itens de acesso rápido
 */
function setupQuickAccessHoverEffects() {
  $(".quick-access-item").hover(
    function () {
      $(this).addClass("hover-effect");
    },
    function () {
      $(this).removeClass("hover-effect");
    }
  );
}

/* ==========================================================================
   FUNÇÕES DE CONFIGURAÇÃO DOS EVENT LISTENERS
   ========================================================================== */

/**
 * Configura todos os efeitos de hover do sistema
 */
export function setupHoverEffects() {
  // Efeitos de hover nos cards de notícias
  setupNewsCardHoverEffects();

  // Efeitos de hover nos itens de acesso rápido
  setupQuickAccessHoverEffects();
}
