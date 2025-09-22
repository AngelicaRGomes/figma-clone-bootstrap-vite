/**
 * NEWS HELPERS
 * ============
 *
 * Arquivo contendo todas as funções auxiliares relacionadas às
 * notícias e cards de notícias do portal.
 *
 * Funções incluídas:
 * - Salvar/remover notícias (bookmark)
 * - Abrir cards de notícias (modal)
 * - Filtrar notícias salvas
 * - Toggle do botão "Notícias salvas"
 */

import $ from "jquery";

/* ==========================================================================
   FUNÇÕES DE INTERAÇÃO COM NOTÍCIAS
   ========================================================================== */

/**
 * Manipula o clique nos botões de salvar/remover notícias
 * @param {Event} e - Evento do clique
 * @param {Function} showNotification - Função para mostrar notificações
 */
function handleBookmarkClick(e, showNotification) {
  e.stopPropagation();
  const $btn = $(e.target).closest(".btn-link");
  const $icon = $btn.find("i");

  if ($icon.hasClass("bi-bookmark")) {
    // Salvar notícia
    $icon.removeClass("bi-bookmark").addClass("bi-bookmark-fill");
    $btn.contents().last()[0].textContent = " Salvo";

    // Mostrar notificação
    showNotification("Notícia salva com sucesso!", "success");
    return;
  }

  // Remover da lista de salvas
  $icon.removeClass("bi-bookmark-fill").addClass("bi-bookmark");
  $btn.contents().last()[0].textContent = " Salvar";
  $btn.addClass("saved");

  showNotification("Notícia removida da lista de salvas", "info");
}

/**
 * Manipula o clique nos cards de notícias para abrir modal
 * @param {Event} e - Evento do clique
 * @param {Function} showModal - Função para mostrar modal
 */
function handleNewsCardClick(e, showModal) {
  if (!$(e.target).closest(".btn-link").length) {
    const $card = $(e.currentTarget);
    const title = $card.find(".news-title, .news-title-small").text();

    // Simular abertura de notícia
    showModal(
      "Notícia",
      title,
      "Esta é uma simulação da abertura da notícia. Em um sistema real, aqui seria carregado o conteúdo completo da notícia."
    );
  }
}

/**
 * Manipula o toggle do botão "Notícias salvas"
 * @param {Event} e - Evento do clique
 */
function handleSavedNewsToggle(e) {
  const $btn = $(e.currentTarget);
  const $icon = $btn.find("i");

  if ($icon.hasClass("bi-bookmark")) {
    $icon.removeClass("bi-bookmark").addClass("bi-bookmark-fill");
    $btn.contents().last()[0].textContent = " Notícias salvas";

    // Filtrar apenas notícias salvas
    filterSavedNews(true);
    return;
  }

  $icon.removeClass("bi-bookmark-fill").addClass("bi-bookmark");
  $btn.removeClass("btn-primary").addClass("btn-outline-primary");
  $btn.contents().last()[0].textContent = " Notícias salvas";

  // Mostrar todas as notícias
  filterSavedNews(false);
}

/**
 * Filtra notícias para mostrar apenas as salvas ou todas
 * @param {boolean} showOnlySaved - Se deve mostrar apenas as salvas
 */
function filterSavedNews(showOnlySaved) {
  if (showOnlySaved) {
    $(".news-card, .news-card-small").hide();
    $(".news-card, .news-card-small")
      .filter(function () {
        return $(this).find(".bi-bookmark-fill").length > 0;
      })
      .show();
    return;
  }

  $(".news-card, .news-card-small").show();
}

/* ==========================================================================
   FUNÇÕES DE CONFIGURAÇÃO DOS EVENT LISTENERS
   ========================================================================== */

/**
 * Configura todos os event listeners relacionados às notícias
 * @param {Function} showNotification - Função para mostrar notificações
 * @param {Function} showModal - Função para mostrar modal
 */
export function setupNewsEventListeners(showNotification, showModal) {
  // 1. Funcionalidade de salvar notícias
  $(".news-card, .news-card-small").on("click", ".btn-link", function (e) {
    handleBookmarkClick(e, showNotification);
  });

  // 2. Interação com cards de notícias
  $(".news-card, .news-card-small").on("click", function (e) {
    handleNewsCardClick(e, showModal);
  });

  // 3. Funcionalidade do botão "Notícias salvas"
  $(".btn-outline-primary").on("click", function (e) {
    handleSavedNewsToggle(e);
  });
}
