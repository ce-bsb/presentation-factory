# Orientação de Design

- Siga rigorosamente o **IBM Design Language** (https://www.ibm.com/design/language/)
- Implemente componentes e padrões do **Carbon Design System** (https://carbondesignsystem.com)
- Use **IBM Plex** como fonte principal (https://www.ibm.com/plex/)
- Mantenha consistência visual com o ecossistema IBM em todos os slides


# Requisitos técnicos

- Reutilize o `index.html` e os assets deste template como referência de padrões e estrutura
- Reutilize imagens e CSS de acordo com o nome do cliente
- Estrutura de projeto: `index.html`, pasta `assets/` (contendo CSS, JavaScript, imagens e SVGs), e README curto baseado no modelo disponível
- Apresentação em tela cheia, totalmente responsiva (desktop, tablet, mobile)
- Navegação via teclado (setas, Enter) e botões na interface
- Barra de progresso visível indicando posição atual na apresentação
- Índice discreto (não intrusivo) para visualizar todas as slides
- Nenhuma dependência de backend; toda a lógica deve ser client-side


## Estrutura

```
ROTEIRO/
├── index.html
├── README.md
└── assets/
    ├── css/styles.css        # Tokens, layout, slides, navegação, print
    ├── js/deck.js            # Controlador (teclado, botões, hash, swipe e índice)
    └── img/                  # Imagens e assets usados na apresentação
        ├──
```


# Navegação Básica

- **→ / PageDown / Espaço**: próximo slide
- **← / PageUp**: slide anterior
- **Home / End**: primeiro / último slide
- **Teclado numérico**: ir direto para o slide do número de referência
- **Esc**: abrir/fechar índice
- **Swipe** horizontal em touch
- **Imprimir** (`Ctrl/Cmd + P`): CSS print produz uma página por slide

O slide atual fica em `#slide-N` na URL, então links profundos funcionam.


# Assets
- Escolher os assets de acordo com o cliente indicado no Roteiro
