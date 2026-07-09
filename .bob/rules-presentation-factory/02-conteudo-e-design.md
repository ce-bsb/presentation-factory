# Conteúdo e design

## Regras de conteúdo

- Um slide, uma ideia.
- Títulos afirmam a mensagem — não apenas nomeiam o tópico.
- Não invente dados, métricas, datas ou nomes. Use `[A confirmar]`.
- Não copie conteúdo dos exemplos; reuse só estrutura e CSS.

## Design

- Tema claro fixo; IBM Plex Sans; base 18 px; WCAG 2.1 AA.
- Logos e assets IBM vêm de `organizations/ibm/assets/`.
  Use path relativo no deck; copie os arquivos para a pasta da apresentação.
- Não recrie logo IBM com CSS ou SVG manual.

## Logo na topbar — regra IBM × Cliente

A topbar exibe `brand__ibm` (logo IBM) **×** `brand__bb` (logo do cliente).

- **Quando o cliente NÃO é IBM:** exiba os dois logos separados por `×`.
  ```html
  <span class="brand__ibm"><img src="assets/ibm-logo.svg" alt="IBM" height="14" /></span>
  <span class="brand__sep" aria-hidden="true">×</span>
  <span class="brand__bb"><img src="assets/client-logo.svg" alt="Nome do cliente" height="22" /></span>
  ```
- **Quando o cliente É IBM** (apresentação interna ou entre equipes IBM):
  exiba **apenas o logo IBM uma vez** — omita `brand__ibm`, `brand__sep` e `brand__bb`.
  ```html
  <span class="brand__ibm"><img src="assets/ibm-logo.svg" alt="IBM" height="14" /></span>
  ```
  Nunca renderize "IBM × IBM".

## Tipos de gráfico por contexto

- **Gráfico de crescimento** (evolução ao longo do tempo, tendência, projeção) → sempre **gráfico de linha**.
- **Gráfico de total** (comparação de valores absolutos, distribuição, ranking) → sempre **gráfico de colunas**.

## Referências sob demanda

- Regras Carbon → `organizations/ibm/design-systems/carbon/`
- Assets compartilhados → `organizations/ibm/assets/assets.yaml`
- Templates reais → `clients/*/templates/` e `organizations/*/templates/`
