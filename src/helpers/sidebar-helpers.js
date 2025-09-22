/**
 * SIDEBAR HELPERS
 * ===============
 *
 * Arquivo contendo todas as funções auxiliares relacionadas às
 * seções laterais (sidebar) do portal.
 *
 * Funções incluídas:
 * - Controle de ponto (registro, opções, histórico)
 * - Vagas (toggle, criação de conteúdo)
 * - Eventos (toggle, criação de conteúdo)
 * - Seções colapsáveis (toggle, criação)
 */

import $ from "jquery";

/* ==========================================================================
   FUNÇÕES DE SEÇÕES COLAPSÁVEIS
   ========================================================================== */

/**
 * Alterna a visibilidade de uma seção colapsável
 * @param {jQuery} $tile - Elemento tile clicado
 * @param {string} sectionId - ID da seção a ser alternada
 */
function toggleCollapsibleSection($tile, sectionId) {
  const $panel = $tile.closest(".panel");
  const $chevron = $tile.find(".chev");
  let $content = $panel.find(`#${sectionId}`);

  if ($content.length === 0) {
    // Criar conteúdo colapsável se não existir
    createCollapsibleContent($tile, sectionId);
    $content = $panel.find(`#${sectionId}`);
  }

  if ($content.is(":visible")) {
    // Colapsar seção principal
    $content.slideUp(300);
    $chevron.removeClass("bi-chevron-down").addClass("bi-chevron-right");

    // Resetar todos os subitens dentro desta seção
    $content.find(".option-content:visible").slideUp(200);
    $content
      .find(".list-tile .chev")
      .removeClass("bi-chevron-down")
      .addClass("bi-chevron-right");
    return;
  }

  // Fechar outros conteúdos abertos no mesmo painel
  $panel.find(".collapsible-content:visible").slideUp(300);
  $panel
    .find(".chev")
    .removeClass("bi-chevron-down")
    .addClass("bi-chevron-right");

  // Expandir o conteúdo atual
  $content.slideDown(300);
  $chevron.removeClass("bi-chevron-right").addClass("bi-chevron-down");
}

/**
 * Cria o conteúdo HTML para seções colapsáveis
 * @param {jQuery} $tile - Elemento tile clicado
 * @param {string} sectionId - ID da seção a ser criada
 */
function createCollapsibleContent($tile, sectionId) {
  let contentHtml = "";

  switch (sectionId) {
    case "registration-options":
      contentHtml = `
        <div id="${sectionId}" class="collapsible-content" style="display: none;">
          <div class="list-tile">
            <span class="label">Registro manual</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Justificar atraso</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Solicitar horas extras</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Registro em lote</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
        </div>
      `;
      break;

    case "recent-records":
      contentHtml = `
        <div id="${sectionId}" class="collapsible-content" style="display: none;">
          <div class="list-tile">
            <span class="label">Hoje - 08:30 (Entrada)</span>
            <small class="text-muted">Confirmado</small>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Hoje - 12:00 (Saída almoço)</span>
            <small class="text-muted">Confirmado</small>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Hoje - 13:00 (Retorno almoço)</span>
            <small class="text-muted">Confirmado</small>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Ontem - 18:00 (Saída)</span>
            <small class="text-muted">Confirmado</small>
          </div>
        </div>
      `;
      break;

    case "time-control":
      contentHtml = `
        <div id="${sectionId}" class="collapsible-content" style="display: none;">
          <div class="list-tile">
            <span class="label">Relatório mensal</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Histórico de registros</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Configurações de ponto</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Exportar dados</span>
            <i class="bi bi-chevron-right chev"></i>
          </div>
        </div>
      `;
      break;

    case "time-pending":
      contentHtml = `
        <div id="${sectionId}" class="collapsible-content" style="display: none;">
          <div class="list-tile">
            <span class="label">Justificativa pendente - 15/11</span>
            <span class="badge bg-warning text-dark">Pendente</span>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Aprovação horas extras - 10/11</span>
            <span class="badge bg-info">Em análise</span>
          </div>
          <div class="list-divider"></div>
          <div class="list-tile">
            <span class="label">Registro manual - 08/11</span>
            <span class="badge bg-success">Aprovado</span>
          </div>
        </div>
      `;
      break;
  }

  // Inserir o conteúdo logo após o divisor do item clicado
  const $nextDivider = $tile.next(".list-divider");
  if ($nextDivider.length > 0) {
    $nextDivider.after(contentHtml);
  } else {
    $tile.after(contentHtml);
  }

  // Adicionar event listeners para os novos itens
  const $panel = $tile.closest(".panel");
  $panel.find(`#${sectionId} .list-tile`).on("click", function () {
    const $item = $(this);
    const label = $item.find(".label").text();

    // Verificar se é uma opção colapsável
    if (isCollapsibleOption(label)) {
      toggleOptionContent($item, label);
      return;
    }

    showNotification(`Abrindo: ${label}`, "info");
  });
}

/* ==========================================================================
   FUNÇÕES DE OPÇÕES (SUBITENS)
   ========================================================================== */

/**
 * Verifica se uma opção é colapsável
 * @param {string} label - Label da opção
 * @returns {boolean}
 */
function isCollapsibleOption(label) {
  const collapsibleOptions = [
    "Registro manual",
    "Justificar atraso",
    "Solicitar horas extras",
    "Registro em lote",
    "Relatório mensal",
    "Histórico de registros",
    "Configurações de ponto",
    "Exportar dados",
  ];
  return collapsibleOptions.includes(label);
}

/**
 * Alterna a visibilidade do conteúdo de uma opção
 * @param {jQuery} $item - Item clicado
 * @param {string} label - Label da opção
 */
function toggleOptionContent($item, label) {
  const $chevron = $item.find(".chev");
  const optionId = `option-${label.toLowerCase().replace(/\s+/g, "-")}`;
  let $content = $item.parent().find(`#${optionId}`);

  if ($content.length === 0) {
    // Criar conteúdo da opção se não existir
    createOptionContent($item, label, optionId);
    $content = $item.parent().find(`#${optionId}`);
  }

  if ($content.is(":visible")) {
    // Colapsar
    $content.slideUp(200);
    $chevron.removeClass("bi-chevron-down").addClass("bi-chevron-right");
    return;
  }

  // Expandir
  $content.slideDown(200);
  $chevron.removeClass("bi-chevron-right").addClass("bi-chevron-down");
}

/**
 * Cria o conteúdo HTML para opções específicas
 * @param {jQuery} $item - Item clicado
 * @param {string} label - Label da opção
 * @param {string} optionId - ID da opção
 */
function createOptionContent($item, label, optionId) {
  let contentHtml = "";

  switch (label) {
    case "Registro manual":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Registre seu ponto manualmente quando houver problemas com o sistema automático.</p>
            <div class="option-actions">
              <button class="btn btn-primary btn-sm">Registrar Agora</button>
              <button class="btn btn-outline-secondary btn-sm">Ver Histórico</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "Justificar atraso":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Justifique atrasos ou ausências com documentação apropriada.</p>
            <div class="option-actions">
              <button class="btn btn-warning btn-sm">Justificar Atraso</button>
              <button class="btn btn-outline-secondary btn-sm">Minhas Justificativas</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "Solicitar horas extras":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Solicite autorização para trabalhar horas extras com antecedência.</p>
            <div class="option-actions">
              <button class="btn btn-info btn-sm">Nova Solicitação</button>
              <button class="btn btn-outline-secondary btn-sm">Status Solicitações</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "Registro em lote":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Registre múltiplos pontos de uma vez usando planilha ou importação.</p>
            <div class="option-actions">
              <button class="btn btn-success btn-sm">Importar Planilha</button>
              <button class="btn btn-outline-secondary btn-sm">Modelo Excel</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "Relatório mensal":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Visualize e baixe relatórios detalhados do seu ponto mensal.</p>
            <div class="option-filters">
              <select class="form-select form-select-sm mb-2">
                <option>Novembro 2024</option>
                <option>Outubro 2024</option>
                <option>Setembro 2024</option>
              </select>
            </div>
            <div class="option-actions">
              <button class="btn btn-primary btn-sm">Gerar Relatório</button>
              <button class="btn btn-outline-secondary btn-sm">Exportar PDF</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "Histórico de registros":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Consulte todo o histórico de seus registros de ponto.</p>
            <div class="option-filters">
              <input type="date" class="form-control form-control-sm mb-2" placeholder="Data inicial">
              <input type="date" class="form-control form-control-sm mb-2" placeholder="Data final">
            </div>
            <div class="option-actions">
              <button class="btn btn-primary btn-sm">Consultar</button>
              <button class="btn btn-outline-secondary btn-sm">Exportar</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "Configurações de ponto":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Configure suas preferências e notificações do sistema de ponto.</p>
            <div class="option-settings">
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" checked>
                <label class="form-check-label">Notificar sobre atrasos</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" checked>
                <label class="form-check-label">Lembrete de saída</label>
              </div>
            </div>
            <div class="option-actions">
              <button class="btn btn-primary btn-sm">Salvar Configurações</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "Exportar dados":
      contentHtml = `
        <div class="option-content" id="${optionId}" style="display: none;">
          <div class="option-details">
            <p class="option-description">Exporte seus dados de ponto em diferentes formatos.</p>
            <div class="option-formats">
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="format" value="excel" checked>
                <label class="form-check-label">Excel (.xlsx)</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="format" value="pdf">
                <label class="form-check-label">PDF</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="format" value="csv">
                <label class="form-check-label">CSV</label>
              </div>
            </div>
            <div class="option-actions">
              <button class="btn btn-success btn-sm">Exportar</button>
            </div>
          </div>
        </div>
      `;
      break;
  }

  $item.after(contentHtml);
}

/* ==========================================================================
   FUNÇÕES DE VAGAS
   ========================================================================== */

/**
 * Verifica se uma vaga é colapsável
 * @param {string} title - Título da vaga
 * @returns {boolean}
 */
function isCollapsibleVacancy(title) {
  const collapsibleVacancies = [
    "Assistente Administrativo | pessoas com deficiência",
    "Analista Engenharia de software sênior | SRE",
    "Analista de Implantação SR.",
  ];

  // Normalizar o título (remover espaços extras e quebras de linha)
  const normalizedTitle = title.trim().replace(/\s+/g, " ");

  // Verificar se contém palavras-chave das vagas
  const isAssistant =
    normalizedTitle.includes("Assistente Administrativo") &&
    normalizedTitle.includes("pessoas com deficiência");
  const isAnalyst =
    normalizedTitle.includes("Analista Engenharia de software sênior") &&
    normalizedTitle.includes("SRE");
  const isImplementation = normalizedTitle.includes(
    "Analista de Implantação SR"
  );

  return isAssistant || isAnalyst || isImplementation;
}

/**
 * Alterna o conteúdo de uma vaga
 * @param {jQuery} $item - Item da vaga clicado
 * @param {string} title - Título da vaga
 * @param {string} category - Categoria da vaga
 */
function toggleVacancyContent($item, title, category) {
  const $chevron = $item.find("i");
  const vacancyId = `vacancy-${title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\|/g, "")
    .replace(/[^a-z0-9-]/g, "")}`;
  let $content = $item.parent().find(`#${vacancyId}`);

  if ($content.length === 0) {
    // Criar conteúdo da vaga se não existir
    createVacancyContent($item, title, category, vacancyId);
    $content = $item.parent().find(`#${vacancyId}`);
  }

  if ($content.is(":visible")) {
    // Colapsar
    $content.slideUp(200);
    $chevron.removeClass("bi-chevron-down").addClass("bi-chevron-right");
    return;
  }

  // Fechar outros conteúdos abertos na mesma seção
  const $panel = $item.closest(".panel");
  $panel.find(".vacancy-content:visible").slideUp(200);
  $panel
    .find(".vacancy-item i")
    .removeClass("bi-chevron-down")
    .addClass("bi-chevron-right");

  // Expandir o conteúdo atual
  $content.slideDown(200);
  $chevron.removeClass("bi-chevron-right").addClass("bi-chevron-down");
}

/**
 * Cria o conteúdo HTML para vagas específicas
 * @param {jQuery} $item - Item da vaga
 * @param {string} title - Título da vaga
 * @param {string} category - Categoria da vaga
 * @param {string} vacancyId - ID da vaga
 */
function createVacancyContent($item, title, category, vacancyId) {
  let contentHtml = "";

  // Normalizar o título para comparação
  const normalizedTitle = title.trim().replace(/\s+/g, " ");

  if (
    normalizedTitle.includes("Assistente Administrativo") &&
    normalizedTitle.includes("pessoas com deficiência")
  ) {
    contentHtml = `
        <div class="vacancy-content" id="${vacancyId}" style="display: none;">
          <div class="vacancy-details">
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Descrição da Vaga</h6>
              <p class="vacancy-description">Oportunidade para pessoas com deficiência atuarem como Assistente Administrativo na área comercial e marketing, desenvolvendo atividades de apoio administrativo e atendimento ao cliente.</p>
            </div>
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Requisitos</h6>
              <ul class="vacancy-requirements">
                <li>Ensino médio completo</li>
                <li>Experiência em atividades administrativas</li>
                <li>Conhecimento em pacote Office</li>
                <li>Boa comunicação</li>
              </ul>
            </div>
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Benefícios</h6>
              <ul class="vacancy-benefits">
                <li>Vale refeição</li>
                <li>Vale transporte</li>
                <li>Plano de saúde</li>
                <li>Seguro de vida</li>
              </ul>
            </div>
            <div class="vacancy-actions">
              <button class="btn btn-primary btn-sm">Candidatar-se</button>
              <button class="btn btn-outline-secondary btn-sm">Salvar Vaga</button>
              <button class="btn btn-outline-info btn-sm">Compartilhar</button>
            </div>
          </div>
        </div>
      `;
  } else if (
    normalizedTitle.includes("Analista Engenharia de software sênior") &&
    normalizedTitle.includes("SRE")
  ) {
    contentHtml = `
        <div class="vacancy-content" id="${vacancyId}" style="display: none;">
          <div class="vacancy-details">
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Descrição da Vaga</h6>
              <p class="vacancy-description">Buscamos um Analista de Engenharia de Software Sênior com foco em SRE (Site Reliability Engineering) para atuar na área de Seguros, garantindo a confiabilidade e performance dos sistemas.</p>
            </div>
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Requisitos</h6>
              <ul class="vacancy-requirements">
                <li>Formação superior em Ciência da Computação ou áreas afins</li>
                <li>5+ anos de experiência em desenvolvimento</li>
                <li>Conhecimento em AWS/Azure</li>
                <li>Experiência com Docker e Kubernetes</li>
                <li>Conhecimento em monitoramento (Prometheus, Grafana)</li>
              </ul>
            </div>
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Tecnologias</h6>
              <div class="tech-tags">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">AWS</span>
                <span class="tech-tag">Docker</span>
                <span class="tech-tag">Kubernetes</span>
                <span class="tech-tag">Terraform</span>
              </div>
            </div>
            <div class="vacancy-actions">
              <button class="btn btn-primary btn-sm">Candidatar-se</button>
              <button class="btn btn-outline-secondary btn-sm">Salvar Vaga</button>
              <button class="btn btn-outline-info btn-sm">Compartilhar</button>
            </div>
          </div>
        </div>
      `;
  } else if (normalizedTitle.includes("Analista de Implantação SR")) {
    contentHtml = `
        <div class="vacancy-content" id="${vacancyId}" style="display: none;">
          <div class="vacancy-details">
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Descrição da Vaga</h6>
              <p class="vacancy-description">Analista Sênior de Implantação para atuar na área de Serviços, responsável por coordenar e executar implantações de sistemas, garantindo a entrega de soluções de qualidade.</p>
            </div>
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Responsabilidades</h6>
              <ul class="vacancy-requirements">
                <li>Coordenar projetos de implantação</li>
                <li>Realizar testes de sistemas</li>
                <li>Treinar usuários finais</li>
                <li>Documentar processos</li>
                <li>Suporte pós-implantação</li>
              </ul>
            </div>
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Requisitos</h6>
              <ul class="vacancy-requirements">
                <li>Formação superior em TI ou áreas afins</li>
                <li>3+ anos de experiência em implantações</li>
                <li>Conhecimento em metodologias ágeis</li>
                <li>Experiência com ERP</li>
                <li>Boa comunicação e liderança</li>
              </ul>
            </div>
            <div class="vacancy-info-section">
              <h6 class="vacancy-section-title">Informações Adicionais</h6>
              <div class="vacancy-meta">
                <div class="meta-item">
                  <strong>Salário:</strong> A combinar
                </div>
                <div class="meta-item">
                  <strong>Modalidade:</strong> Presencial
                </div>
                <div class="meta-item">
                  <strong>Prazo:</strong> 30 dias
                </div>
              </div>
            </div>
            <div class="vacancy-actions">
              <button class="btn btn-primary btn-sm">Candidatar-se</button>
              <button class="btn btn-outline-secondary btn-sm">Salvar Vaga</button>
              <button class="btn btn-outline-info btn-sm">Compartilhar</button>
            </div>
          </div>
        </div>
      `;
  }

  $item.after(contentHtml);
}

/* ==========================================================================
   FUNÇÕES DE EVENTOS
   ========================================================================== */

/**
 * Verifica se um evento é colapsável
 * @param {string} title - Título do evento
 * @returns {boolean}
 */
function isCollapsibleEvent(title) {
  const collapsibleEvents = [
    "Café da manhã com líderes",
    "Festa de fim de ano",
  ];
  return collapsibleEvents.includes(title);
}

/**
 * Alterna o conteúdo de um evento
 * @param {jQuery} $item - Item do evento clicado
 * @param {string} title - Título do evento
 * @param {string} date - Data do evento
 * @param {string} time - Horário do evento
 */
function toggleEventContent($item, title, date, time) {
  const $chevron = $item.find("i");
  const eventId = `event-${title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;
  let $content = $item.parent().find(`#${eventId}`);

  if ($content.length === 0) {
    // Criar conteúdo do evento se não existir
    createEventContent($item, title, date, time, eventId);
    $content = $item.parent().find(`#${eventId}`);
  }

  if ($content.is(":visible")) {
    // Colapsar
    $content.slideUp(200);
    $chevron.removeClass("bi-chevron-down").addClass("bi-chevron-right");
    return;
  }

  // Fechar outros conteúdos abertos na mesma seção
  const $panel = $item.closest(".panel");
  $panel.find(".event-content-detail:visible").slideUp(200);
  $panel
    .find(".event-item i")
    .removeClass("bi-chevron-down")
    .addClass("bi-chevron-right");

  // Expandir o conteúdo atual
  $content.slideDown(200);
  $chevron.removeClass("bi-chevron-right").addClass("bi-chevron-down");
}

/**
 * Cria o conteúdo HTML para eventos específicos
 * @param {jQuery} $item - Item do evento
 * @param {string} title - Título do evento
 * @param {string} date - Data do evento
 * @param {string} time - Horário do evento
 * @param {string} eventId - ID do evento
 */
function createEventContent($item, title, date, time, eventId) {
  let contentHtml = "";

  if (title === "Café da manhã com líderes") {
    contentHtml = `
      <div class="event-content-detail" id="${eventId}" style="display: none;">
        <div class="event-details">
          <div class="event-info-section">
            <h6 class="event-section-title">Descrição do Evento</h6>
            <p class="event-description">Um encontro especial para promover networking e troca de experiências entre colaboradores e líderes da empresa. Uma oportunidade única para conversas informais e fortalecimento da cultura organizacional.</p>
          </div>
          <div class="event-info-section">
            <h6 class="event-section-title">Detalhes</h6>
            <div class="event-meta">
              <div class="meta-item">
                <strong>Data:</strong> 28 de novembro de 2024
              </div>
              <div class="meta-item">
                <strong>Horário:</strong> 16:00 às 18:00
              </div>
              <div class="meta-item">
                <strong>Local:</strong> Auditório Principal - Sede
              </div>
              <div class="meta-item">
                <strong>Modalidade:</strong> Presencial
              </div>
            </div>
          </div>
          <div class="event-info-section">
            <h6 class="event-section-title">Programação</h6>
            <ul class="event-schedule">
              <li>16:00 - Abertura e boas-vindas</li>
              <li>16:15 - Apresentação dos líderes</li>
              <li>16:45 - Networking e café da manhã</li>
              <li>17:30 - Perguntas e respostas</li>
              <li>18:00 - Encerramento</li>
            </ul>
          </div>
          <div class="event-actions">
            <button class="btn btn-primary btn-sm">Inscrever-se</button>
            <button class="btn btn-outline-secondary btn-sm">Adicionar ao Calendário</button>
            <button class="btn btn-outline-info btn-sm">Compartilhar</button>
          </div>
        </div>
      </div>
    `;
  } else if (title === "Festa de fim de ano") {
    contentHtml = `
      <div class="event-content-detail" id="${eventId}" style="display: none;">
        <div class="event-details">
          <div class="event-info-section">
            <h6 class="event-section-title">Descrição do Evento</h6>
            <p class="event-description">A tradicional festa de fim de ano da empresa! Um momento especial para celebrar as conquistas do ano, reconhecer o trabalho em equipe e desfrutar de uma noite de confraternização com todos os colaboradores.</p>
          </div>
          <div class="event-info-section">
            <h6 class="event-section-title">Detalhes</h6>
            <div class="event-meta">
              <div class="meta-item">
                <strong>Data:</strong> 19 de novembro de 2024
              </div>
              <div class="meta-item">
                <strong>Horário:</strong> 19:00 às 23:00
              </div>
              <div class="meta-item">
                <strong>Local:</strong> Salão de Eventos - Centro de Convenções
              </div>
              <div class="meta-item">
                <strong>Dress Code:</strong> Traje social
              </div>
            </div>
          </div>
          <div class="event-info-section">
            <h6 class="event-section-title">Programação</h6>
            <ul class="event-schedule">
              <li>19:00 - Recepção e coquetel de boas-vindas</li>
              <li>19:30 - Abertura oficial e discurso da diretoria</li>
              <li>20:00 - Jantar de gala</li>
              <li>21:00 - Premiação dos colaboradores</li>
              <li>21:30 - Show musical e dança</li>
              <li>23:00 - Encerramento</li>
            </ul>
          </div>
          <div class="event-info-section">
            <h6 class="event-section-title">Incluso</h6>
            <ul class="event-included">
              <li>Jantar completo</li>
              <li>Bebidas (alcoólicas e não alcoólicas)</li>
              <li>Estacionamento gratuito</li>
              <li>Transporte de ida e volta (pontos específicos)</li>
            </ul>
          </div>
          <div class="event-actions">
            <button class="btn btn-primary btn-sm">Confirmar Presença</button>
            <button class="btn btn-outline-secondary btn-sm">Adicionar ao Calendário</button>
            <button class="btn btn-outline-info btn-sm">Compartilhar</button>
          </div>
        </div>
      </div>
    `;
  }

  $item.after(contentHtml);
}

/* ==========================================================================
   FUNÇÕES DE EVENT LISTENERS
   ========================================================================== */

/**
 * Manipula o clique nos links da sidebar
 * @param {Event} e - Evento do clique
 * @param {Function} showNotification - Função para mostrar notificações
 */
function handleSidebarLinkClick(e, showNotification) {
  const $tile = $(e.currentTarget);
  const label = $tile.find(".label").text();

  // Verificar se é uma seção colapsável
  if (label === "Outras opções de registro") {
    toggleCollapsibleSection($tile, "registration-options");
    return;
  }

  if (label === "Últimos registros") {
    toggleCollapsibleSection($tile, "recent-records");
    return;
  }

  if (label === "Controle de ponto") {
    toggleCollapsibleSection($tile, "time-control");
    return;
  }

  if (label === "Pendências no seu ponto") {
    toggleCollapsibleSection($tile, "time-pending");
    return;
  }

  showNotification(`Abrindo: ${label}`, "info");
}

/**
 * Manipula o clique nas vagas
 * @param {Event} e - Evento do clique
 * @param {Function} showModal - Função para mostrar modal
 */
function handleVacancyClick(e, showModal) {
  const $item = $(e.currentTarget);
  const title = $item.find(".vacancy-title").text().trim();
  const category = $item.find(".vacancy-category").text().trim();

  // Verificar se é uma vaga colapsável
  if (isCollapsibleVacancy(title)) {
    toggleVacancyContent($item, title, category);
    return;
  }

  showModal(
    "Vaga",
    title,
    "Esta é uma simulação da visualização da vaga. Em um sistema real, aqui seria exibida a descrição completa da vaga e opções para se candidatar."
  );
}

/**
 * Manipula o clique nos eventos
 * @param {Event} e - Evento do clique
 * @param {Function} showModal - Função para mostrar modal
 */
function handleEventClick(e, showModal) {
  const $item = $(e.currentTarget);
  const title = $item.find(".event-title").text();
  const day = $item.find(".event-day").text();
  const month = $item.find(".event-month").text();
  const date = day + " " + month;
  const time = $item.find(".event-time").text();

  // Verificar se é um evento colapsável
  if (isCollapsibleEvent(title)) {
    toggleEventContent($item, title, date, time);
    return;
  }

  showModal(
    "Evento",
    title,
    `Data: ${date} - ${time}\n\nEsta é uma simulação da visualização do evento. Em um sistema real, aqui seria exibida a descrição completa do evento e opções para se inscrever.`
  );
}

/**
 * Configura todos os event listeners relacionados à sidebar
 * @param {Function} showNotification - Função para mostrar notificações
 * @param {Function} showModal - Função para mostrar modal
 */
export function setupSidebarEventListeners(showNotification, showModal) {
  // 1. Interação com links da sidebar
  $(".list-tile").on("click", function (e) {
    handleSidebarLinkClick(e, showNotification);
  });

  // 2. Interação com vagas
  $(".vacancy-item").on("click", function (e) {
    handleVacancyClick(e, showModal);
  });

  // 3. Interação com eventos
  $(".event-item").on("click", function (e) {
    handleEventClick(e, showModal);
  });
}
