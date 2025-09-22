/**
 * UI HELPERS
 * ==========
 *
 * Arquivo contendo todas as funções auxiliares relacionadas à
 * interface do usuário (modais, notificações, etc.).
 *
 * Funções incluídas:
 * - showNotification (alertas/toasts)
 * - showModal (modais dinâmicos)
 * - Utilitários de UI
 */

import $ from "jquery";
import * as bootstrap from "bootstrap";

/* ==========================================================================
   FUNÇÕES DE NOTIFICAÇÃO
   ========================================================================== */

/**
 * Exibe uma notificação toast no canto superior direito
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificação (info, success, error)
 */
export function showNotification(message, type = "info") {
  let alertClass = "alert-info";

  if (type === "success") {
    alertClass = "alert-success";
  } else if (type === "error") {
    alertClass = "alert-danger";
  }

  const $notification = $(`
    <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
         style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `);

  $("body").append($notification);

  setTimeout(() => {
    $notification.removeClass("show").addClass("fade");
    setTimeout(() => {
      $notification.remove();
    }, 150);
  }, 3000);
}

/* ==========================================================================
   FUNÇÕES DE MODAL
   ========================================================================== */

/**
 * Exibe um modal dinâmico centralizado
 * @param {string} title - Título do modal
 * @param {string} subtitle - Subtítulo do modal
 * @param {string} content - Conteúdo do modal
 */
export function showModal(title, subtitle, content) {
  const modalHtml = `
    <div class="modal fade" id="dynamicModal" tabindex="-1" aria-labelledby="dynamicModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="dynamicModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6 class="text-muted mb-3">${subtitle}</h6>
            <p style="white-space: pre-line;">${content}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove modal anterior se existir
  $("#dynamicModal").remove();

  // Adicionar modal ao body
  $("body").append(modalHtml);

  // Aguardar um tick para o DOM ser atualizado
  requestAnimationFrame(() => {
    const modalElement = document.getElementById("dynamicModal");

    if (modalElement) {
      try {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } catch (error) {
        console.error("Erro ao criar/exibir modal:", error);
      }
    } else {
      console.error("Elemento modal não encontrado no DOM");
    }
  });
}
