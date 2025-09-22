/**
 * NAVBAR HELPERS
 * ==============
 *
 * Arquivo contendo todas as funções auxiliares relacionadas à
 * navbar e barra de pesquisa do portal.
 *
 * Funções incluídas:
 * - Barra de pesquisa (toggle, abrir, fechar)
 * - Navegação e interações da navbar
 */

import $ from "jquery";

/* ==========================================================================
   FUNÇÕES DA BARRA DE PESQUISA
   ========================================================================== */

/**
 * Manipula o clique no botão de abrir pesquisa
 */
function handleSearchToggle() {
  const $searchBar = $(".search-bar");
  const $searchToggle = $(".search-toggle");

  $searchToggle.hide();
  $searchBar.show().find(".search-input").focus();
}

/**
 * Manipula o clique no botão de fechar pesquisa
 */
function handleSearchClose() {
  const $searchBar = $(".search-bar");
  const $searchToggle = $(".search-toggle");

  $searchBar.hide();
  $searchToggle.show();
}

/**
 * Manipula o fechamento da pesquisa com a tecla ESC
 * @param {Event} e - Evento do teclado
 */
function handleSearchKeydown(e) {
  if (e.key === "Escape" && $(".search-bar").is(":visible")) {
    $(".search-close").click();
  }
}

/* ==========================================================================
   FUNÇÕES DE CONFIGURAÇÃO DOS EVENT LISTENERS
   ========================================================================== */

/**
 * Configura todos os event listeners relacionados à navbar (pesquisa)
 */
export function setupNavbarEventListeners() {
  // Configurar barra de pesquisa
  $(".search-toggle").on("click", handleSearchToggle);
  $(".search-close").on("click", handleSearchClose);

  // Fechar pesquisa com ESC
  $(document).on("keydown", handleSearchKeydown);
}
