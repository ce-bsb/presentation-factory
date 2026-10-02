# IBM Executive

Template IBM reutilizável para apresentações executivas e orientadas a negócio, com
grid de 16 colunas, 12 slides e identidade visual Carbon v11 completa (fundos claros,
padrões sutis, acentos em azul Carbon — nunca fundo escuro).

- Todo conteúdo específico foi substituído por tokens nomeados `{{ASSIM}}`, iguais em
  convenção a `ibm-brief-template` e `ibm-edge-template` (ex.: `{{TITULO_S3}}`,
  `{{METRIC_1_VALOR}}`, `{{CAPACIDADE_2_TITULO}}`). O nome de cada token já indica o
  papel do campo na seção — não é necessário inferir pelo HTML ao redor.
- Toda mídia específica foi substituída por `assets/image-placeholder.svg`.
- Os logos IBM oficiais estão duplicados fisicamente em `assets/` nas versões clara e
  escura; `ibm-logo.svg` é a versão usada pelo template.
- CSS e JavaScript estão incorporados no próprio `index.html`/`assets/styles.css`;
  `assets/deck.js` é a cópia local do runtime compartilhado
  (`organizations/ibm/assets/js/deck.js`) — mantenha os dois idênticos.

Ao criar um deck, substitua os tokens `{{...}}` por conteúdo real, mantenha a estrutura
responsiva e copie a pasta `assets/` para a apresentação. Nunca desenhe SVGs de ícones
manualmente; escolha e copie o ícone equivalente do Carbon Design System.
