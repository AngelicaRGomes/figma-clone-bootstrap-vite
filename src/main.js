import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import $ from "jquery";
import * as bootstrap from "bootstrap";

window.bootstrap = bootstrap;

import { setupNewsEventListeners } from "./helpers/news-helpers.js";
import { setupNavbarEventListeners } from "./helpers/navbar-helpers.js";
import { setupQuickAccessEventListeners } from "./helpers/quick-access-helpers.js";
import { setupCarouselEventListeners } from "./helpers/carousel-helpers.js";
import { setupSidebarEventListeners } from "./helpers/sidebar-helpers.js";
import { setupTimeClockEventListeners } from "./helpers/time-clock-helpers.js";
import { setupHoverEffects } from "./helpers/hover-helpers.js";
import { showNotification, showModal } from "./helpers/ui-helpers.js";

// Funcionalidades interativas do Portal
$(function () {
  setupCarouselEventListeners();
  setupNavbarEventListeners();
  setupNewsEventListeners(showNotification, showModal);
  setupQuickAccessEventListeners(showNotification, showModal);
  setupSidebarEventListeners(showNotification, showModal);
  setupTimeClockEventListeners(showNotification);
  setupHoverEffects();
});

// - showNotification e showModal → ./helpers/ui-helpers.js
// - Registro de ponto → ./helpers/time-clock-helpers.js
// - Sidebar, vagas e eventos → ./helpers/sidebar-helpers.js
// - Notícias → ./helpers/news-helpers.js
// - Acesso rápido → ./helpers/quick-access-helpers.js
// - Carrossel → ./helpers/carousel-helpers.js
// - Navbar e pesquisa → ./helpers/navbar-helpers.js
// - Efeitos de hover → ./helpers/hover-helpers.js
