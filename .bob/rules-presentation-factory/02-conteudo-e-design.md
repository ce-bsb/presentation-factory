# Conteúdo e design

## Regras de conteúdo

- Um slide, uma ideia.
- Títulos afirmam a mensagem — não apenas nomeiam o tópico.
- Não invente dados, métricas, datas ou nomes. Use `[A confirmar]`.
- Não copie conteúdo dos exemplos; reuse só estrutura e CSS.

## Design

- Tema claro fixo; IBM Plex Sans; base 18 px; WCAG 2.1 AA.
- Logos e assets IBM vêm de `organizations/ibm/assets/`.
  Copie os arquivos para a pasta da apresentação e use path relativo no deck.

## ⚠️ Logo IBM — procedimento canônico (fonte de verdade)

Para toda apresentação que exiba a marca IBM:

1. Escolha o arquivo oficial em `organizations/ibm/assets/img/`:
   - `logo-dark.svg` para fundo claro
   - `logo-light.svg` para fundo escuro
2. Copie o arquivo escolhido para `<workspace>/<slug>/assets/ibm-logo.svg`.
3. No HTML use exclusivamente `<img src="assets/ibm-logo.svg" alt="IBM">`.
4. Antes de concluir, confirme que o arquivo copiado existe e que o `src` resolve para ele.

**Proibido:** recriar, aproximar ou embutir o logo IBM com SVG inline, CSS,
texto estilizado, canvas ou geração de imagem. Também é proibido apontar
o deck diretamente para o asset dentro da factory — cada apresentação deve
ter sua própria cópia local.

## Logo na topbar — regra IBM × Cliente

A topbar exibe `brand__ibm` (logo IBM) **×** `brand__bb` (logo do cliente).

- **Quando o cliente NÃO é IBM:** exiba os dois logos separados por `×`.
  ```html
  <span class="brand__ibm"><img src="assets/ibm-logo.svg" alt="IBM" height="14" /></span>
  <span class="brand__sep" aria-hidden="true">×</span>
  <span class="brand__bb"><img src="assets/client-logo.svg" alt="Nome do cliente" height="22" /></span>
  ```
- **Quando o cliente É IBM** (apresentação interna):
  exiba **apenas o logo IBM uma vez** — omita `brand__sep` e `brand__bb`.
  ```html
  <span class="brand__ibm"><img src="assets/ibm-logo.svg" alt="IBM" height="14" /></span>
  ```
  Nunca renderize "IBM × IBM".

## ⚠️ Ícones — procedimento canônico (fonte de verdade)

Use exclusivamente ícones oficiais do Carbon Design System (`@carbon/icons`).

- Antes de usar um ícone, localize o equivalente em `@carbon/icons`.
- Copie o arquivo SVG oficial para a pasta da apresentação ou incorpore-o sem
  alterar sua geometria.
- Se não houver equivalente Carbon, use texto; não invente substitutos.

**Proibido:** criar, desenhar, aproximar ou gerar ícones com IA, SVG manual,
formas CSS, caracteres Unicode ou emojis.

## Referências sob demanda

- Regras Carbon → `organizations/ibm/design-systems/carbon/`
- Assets compartilhados → `organizations/ibm/assets/assets.yaml`
- Templates reais → `organizations/ibm/templates/`
