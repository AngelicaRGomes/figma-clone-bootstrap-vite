# Portal Interno -Figma Clone Bootstrap Vite (Desafio NTT DATA)

Portal interno moderno desenvolvido com **Bootstrap 5**, **Vite**, **jQuery** e arquitetura modular.

## 🚀 Características

- ✅ **Design System** - tokens organizados
- ✅ **Arquitetura Modular** - JavaScript e CSS organizados em helpers/módulos
- ✅ **Bootstrap 5** + **Vite** para desenvolvimento responsivo, utilitário e build/bundler.
- ✅ **Responsividade** completa (mobile → 8K displays)
- ✅ **Dark Mode** nativo e otimizado
- ✅ **Acessibilidade** aprimorada (HHTML semântico e textos alternativos - alt)
- ✅ **Deploy automático** via GitHub Actions

## 📁 Estrutura do Projeto

```
figma-clone-bootstrap-vite/
├── 📄 index.html                    # Página principal
├── 📄 vite.config.js               # Configuração do Vite
├── 📄 package.json                 # Dependências
├── 📄 .gitignore                   # Arquivos ignorados
├── 📁 public/assets/               # Imagens e recursos estáticos
├── 📁 .github/workflows/           # GitHub Actions (deploy automático)
└── 📁 src/
    ├── 📄 main.js                  # Orquestrador principal (36 linhas)
    ├── 📄 styles.css               # Importador de estilos (89 linhas)
    ├── 📁 helpers/                 # Módulos JavaScript organizados
    │   ├── 📄 ui-helpers.js        # Modais e notificações
    │   ├── 📄 carousel-helpers.js  # Carrossel de destaque
    │   ├── 📄 navbar-helpers.js    # Navbar e pesquisa
    │   ├── 📄 news-helpers.js      # Notícias e bookmark
    │   ├── 📄 sidebar-helpers.js   # Sidebar, vagas e eventos
    │   ├── 📄 quick-access-helpers.js # Acesso rápido
    │   ├── 📄 time-clock-helpers.js   # Registro de ponto
    │   └── 📄 hover-helpers.js     # Efeitos de hover
    └── 📁 styles/                  # CSS modularizado
        ├── 📄 tokens.css           # Tokens de design e variáveis
        ├── 📄 layout.css           # Estilos principais e componentes
        └── 📄 responsive.css       # Media queries e responsividade
```

## 🎨 Design System

### Estrutura dos Estilos

```css
/* 1. Tokens de Design - Variáveis CSS */
@import "./styles/tokens.css";

/* 2. Estilos Principais - Layout e componentes */
@import "./styles/layout.css";

/* 3. Responsividade - Media queries */
@import "./styles/responsive.css";
```

### 🌈 Tokens Disponíveis

```css
/* Cores da Marca */
--color-brand-primary: #0d6efd;
--color-brand-secondary: #2169f6;
--color-brand-accent: #43a1f5;

/* Cores de Superfície */
--color-surface-primary: #ffffff;
--color-surface-secondary: #f5f5f5;
--color-surface-tertiary: #f8f9fa;

/* Cores de Texto */
--color-text-primary: #111827;
--color-text-secondary: #374151;
--color-text-nav: #343a45;
--color-text-body: #606877;

/* Cores das Tags */
--color-tag-purple: #7d2094;
--color-tag-yellow: #c5be0a;
--color-tag-blue: #46a4f5;

/* Sombras */
--shadow-sm: 0 1px 2px rgba(16, 24, 40, 0.04);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.15);

/* Fonte */
--font-family-primary: Arial, sans-serif;
```

## 🏗️ Arquitetura JavaScript

### Main.js - Orquestrador Limpo

```javascript
$(function () {
  setupCarouselEventListeners();
  setupNavbarEventListeners();
  setupNewsEventListeners(showNotification, showModal);
  setupQuickAccessEventListeners(showNotification, showModal);
  setupSidebarEventListeners(showNotification, showModal);
  setupTimeClockEventListeners(showNotification);
  setupHoverEffects();
});
```

### Helpers Modulares

- **`ui-helpers.js`** - Modais e notificações globais
- **`carousel-helpers.js`** - Carrossel de destaque
- **`navbar-helpers.js`** - Barra de pesquisa
- **`news-helpers.js`** - Notícias e bookmarks
- **`sidebar-helpers.js`** - Sidebar, vagas e eventos
- **`quick-access-helpers.js`** - Acesso rápido
- **`time-clock-helpers.js`** - Registro de ponto
- **`hover-helpers.js`** - Efeitos visuais

## 📱 Responsividade

### Breakpoints Suportados

- **Mobile:** 320px → 575px
- **Small:** 576px → 767px
- **Tablet:** 768px → 991px
- **Desktop:** 992px → 1199px
- **Large:** 1200px → 1420px
- **Ultra Wide:** 1421px → 1999px
- **Super Ultra:** 2000px → 2559px
- **Extreme:** 2560px → 3199px
- **Massive:** 3200px+ (4K/8K)

## 🌙 Dark Mode

Suporte nativo ao dark mode do sistema operacional:

```css
@media (prefers-color-scheme: dark) {
  /* Backgrounds escuros */
  --color-surface-soft: #111827;
  --color-surface-primary: #1f2937;

  /* Textos claros */
  --color-text-primary: #f9fafb;
  --color-text-nav: #f9fafb;
}
```

## ⚡ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento (porta 5173)

# Build
npm run build        # Build de produção

# Preview
npm run preview      # Preview do build local
```

## 🛠️ Tecnologias

- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida
- **[Bootstrap 5](https://getbootstrap.com/)** - Framework CSS responsivo
- **[jQuery](https://jquery.com/)** - Manipulação DOM e eventos
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** - Ícones vetoriais

## 🎯 Funcionalidades

### ✅ Implementadas

- **Carrossel** de destaque com indicadores customizados
- **Sistema de notícias** com bookmark e filtros
- **Acesso rápido** com efeitos visuais
- **Registro de ponto** (Entrada/Saída)
- **Sidebar** com seções colapsáveis
- **Vagas e eventos** com conteúdo expandível
- **Barra de pesquisa** expansível
- **Modais** dinâmicos centralizados
- **Notificações** toast
- **Efeitos de hover** em todos os elementos
- **Dark mode** completo
- **Responsividade** total

### 🎨 Design

- **Tipografia** consistente e hierarquizada
- **Cores** padronizadas via CSS variables
- **Espaçamentos** harmoniosos e padronizados
- **Sombras** sutis e elegantes
- **Animações** suaves e acessíveis
- **Layout** fluido e responsivo

## 📚 Como Contribuir

### Adicionar Novos Estilos

1. **Tokens/Variáveis:** `src/styles/tokens.css`
2. **Componentes/Layout:** `src/styles/layout.css`
3. **Responsividade:** `src/styles/responsive.css`

### Adicionar Novas Funcionalidades

1. **Criar helper:** `src/helpers/nova-funcionalidade-helpers.js`
2. **Importar no main:** `import { setupNovaFuncionalidade } from "./helpers/nova-funcionalidade-helpers.js"`
3. **Chamar na inicialização:** `setupNovaFuncionalidade()`
