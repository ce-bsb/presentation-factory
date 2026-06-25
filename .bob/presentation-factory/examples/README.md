# Como usar os exemplos

## Active slide

Arquivos:

- `active-slide/index.html`
- `active-slide/styles.css`
- `active-slide/deck.js`

Esse exemplo usa uma skin neutra IBM/Carbon. Ao adaptar:

- preencha cliente, pessoas, datas e áreas apenas com dados informados no
  roteiro ou briefing;
- substitua paths conforme o novo `presentation.toml`;
- preserve IDs, classes e contratos usados pelo JS;
- mantenha semântica e acessibilidade;
- atualize contagem e índice;
- não copie datas ou pessoas.

O `index.html` de origem também pode conter um bloco
`<script data-pplx-inline-edit>`. Esse script é infraestrutura auxiliar da
ferramenta que produziu/capturou o deck, não faz parte do controlador da
apresentação. Não copie esse bloco para novos templates. O controlador canônico
do deck é `active-slide/deck.js`.

## IBM complete deck

`ibm-complete-deck.html` demonstra:

- tokens Carbon;
- grid de 16 colunas;
- tiles;
- pictogramas;
- barras de navegação;
- reveal animations;
- diversidade de slides.

Ele é útil para estudo visual. Para manutenção, prefira arquivos separados.

## Scroll sidebar

`scroll-sidebar/` contém um exemplo didático menor. Use quando a apresentação
também precisa funcionar como documento rolável.

## Escolha

Use active slide para apresentação sequencial. Use scroll sidebar para leitura,
comparação e navegação não linear. Não misture estados das duas arquiteturas.
