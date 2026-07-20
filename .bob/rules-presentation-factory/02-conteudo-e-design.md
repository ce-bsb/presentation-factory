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

## ⚠️ Account Planning — banco focal obrigatório

Toda vez que o usuário pedir uma apresentação de account planning (template `ibm-account-planning`)
ou qualquer deck comparativo de bancos, **você DEVE perguntar antes de gerar**:

> "Qual banco você representa / será o banco focal desta apresentação?"

### Regra de aplicação do banco focal

- Use as **cores oficiais de marca** (HEX) do banco focal em todos os elementos de destaque:
  borda esquerda das barras (`.bar-row.hl`), badges, KPIs, linha de acento, cover direito.
- **Nunca use as cores IBM (azul `#0f62fe`) para representar um banco concorrente.**
- Declare as cores via CSS custom property `--focal-color` e `--focal-accent`
  no elemento raiz ou no slide, e use-as em vez das variáveis IBM.

### Cores de marca dos principais bancos brasileiros

| Banco | Cor principal | Cor secundária | Logo disponível |
|-------|--------------|----------------|-----------------|
| **CAIXA Econômica Federal** | `#005CA5` (Azul Caixa — Pantone 286) | `#F18121` (Laranja Caixa) | `presentation-factory/clients/caixa/caixa-logo.png` (fundo claro) · `caixa-logo-dark.png` · `logo-caixa-white.png` (fundo escuro) |
| **Banco do Brasil** | `#003882` (azul) | `#F8E400` (amarelo) | `presentation-factory/clients/banco-do-brasil/logo_azul_bb.svg` · `logo_amarela_bb.svg` · `logo_icone_bb.svg` |
| **Itaú Unibanco** | `#EC7000` (laranja) | `#003D70` (azul escuro) | copiar de `ri-bancos-comparativo/assets/` se disponível |
| **Bradesco** | `#CC092F` (vermelho) | `#F05A24` (laranja) | copiar de `ri-bancos-comparativo/assets/` se disponível |
| **Santander** | `#EC0000` (vermelho) | `#CC0000` (vermelho escuro) | sem asset pré-existente |
| **BTG Pactual** | `#002C71` (azul marinho) | `#005FAD` (azul) | sem asset pré-existente |
| **Nubank** | `#820AD1` (roxo) | `#44003F` (roxo escuro) | sem asset pré-existente |

### Procedimento de cópia de logos

1. Para CAIXA: copie `presentation-factory/clients/caixa/caixa-logo.png` para `<slug>/assets/caixa-logo.png`
2. Para BB: copie `presentation-factory/clients/banco-do-brasil/logo_azul_bb.svg` para `<slug>/assets/bb-logo.svg`
3. Use sempre path relativo no HTML: `<img src="assets/caixa-logo.png" alt="CAIXA">`

## Referências sob demanda

- Regras Carbon → `organizations/ibm/design-systems/carbon/`
- Assets compartilhados → `organizations/ibm/assets/assets.yaml`
- Templates reais → `organizations/ibm/templates/`
