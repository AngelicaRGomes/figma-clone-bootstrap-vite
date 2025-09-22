/**
 * CAROUSEL HELPERS
 * ================
 *
 * Arquivo contendo todas as funções auxiliares relacionadas ao
 * carrossel de destaque (hero carousel) do portal.
 *
 * Funções incluídas:
 * - Sincronização de indicadores customizados
 * - Controle de slides do carrossel
 */

/* ==========================================================================
   FUNÇÕES DO CARROSSEL
   ========================================================================== */

/**
 * Configura a sincronização dos indicadores customizados com o carrossel
 */
function setupCarouselIndicators() {
  const carousel = document.querySelector("#carouselHero");
  const customIndicators = document.querySelectorAll(
    "#customIndicators button"
  );

  if (carousel && customIndicators.length > 0) {
    carousel.addEventListener("slid.bs.carousel", function (e) {
      // Remove active de todos os indicadores
      customIndicators.forEach((indicator) => {
        indicator.classList.remove("active");
        indicator.removeAttribute("aria-current");
      });

      // Adiciona active no indicador atual
      const activeIndex = e.to;
      if (customIndicators[activeIndex]) {
        customIndicators[activeIndex].classList.add("active");
        customIndicators[activeIndex].setAttribute("aria-current", "true");
      }
    });
  }
}

/* ==========================================================================
   FUNÇÕES DE CONFIGURAÇÃO DOS EVENT LISTENERS
   ========================================================================== */

/**
 * Configura todos os event listeners relacionados ao carrossel
 */
export function setupCarouselEventListeners() {
  // Configurar indicadores customizados
  setupCarouselIndicators();
}
