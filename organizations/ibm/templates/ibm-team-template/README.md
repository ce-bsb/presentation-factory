# IBM Team

Template IBM para apresentações de time — "Conheça nosso time".

## Slides

| # | Nome | Conteúdo |
|---|---|---|
| 01 | Apresentação do time | Capa com nome da squad, subtítulo e tags |
| 02 | Nosso time | Diagrama hierárquico (org chart) do maior para o menor poder de decisão: Manager → Peers → Estagiários |
| 03 | Como trabalhamos | Processo em 3 etapas: Discovery → Co-create → Entrega |
| 04 | Fale conosco | Encerramento com links e painel de contato |

## Como usar

1. Copie esta pasta para `<workspace>/<slug>/` (fora da factory).
2. Substitua os placeholders numerados (`Nome do time 1`, `Título 2`, etc.) por conteúdo real.
3. **Pessoas (slide 02)** — o time é um diagrama horizontal da esquerda para a direita (`.org-layout`), do maior para o menor poder de decisão:
   - Nível 1 — `.col-manager`: 1 Manager, cartão maior, badge `.mgr-badge`.
   - Nível 2 — `.col-peers`: 4 Peers, cartões médios, badge `.peer-badge`.
   - Nível 3 — `.col-interns`: 2 Estagiários, cartões menores, badge `.intern-badge`.
   - Os separadores `.org-sep` desenham as setas entre Manager → Peers → Estagiários.
   - **Se mudar a quantidade de pessoas por nível**, ajuste também no CSS: `grid-template-columns` / `grid-template-rows` de `.col-peers` e `.col-interns`.
   - Substitua `assets/person-placeholder.svg` pela foto real (proporção quadrada).
4. **Processo** — substitua `assets/image-placeholder.svg` nas etapas por imagens reais (proporção 16:9 recomendada). Se o cliente não tiver imagem, o placeholder já está sinalizado.
5. Copie o logo IBM oficial: `organizations/ibm/assets/img/logo-dark.svg` → `assets/ibm-logo.svg` (já feito neste template).

## Assets

| Arquivo | Substitua por |
|---|---|
| `assets/ibm-logo.svg` | Logo IBM oficial (já copiado) |
| `assets/person-placeholder.svg` | Foto real da pessoa (proporção 1:1) |
| `assets/image-placeholder.svg` | Imagem da etapa do processo (proporção 16:9) |

## Notas técnicas

- CSS, JavaScript e ícones Carbon incorporados no `index.html` (autocontido).
- Grade 16 colunas; slide 02 usa um diagrama horizontal de 3 níveis (1 Manager · 4 Peers · 2 Estagiários) em vez de grid livre.
- Animações de entrada (fade/linha) tocam a cada navegação; respeitam `prefers-reduced-motion`.
- Teclado: `←` `→` `PageUp/Down` `Home` `End` `Espaço` | `F` fullscreen | `I` índice.
- Swipe horizontal (mobile) e `aria-live` para contador de slide.
- `prefers-reduced-motion` e `@media print` implementados.

## Paleta e contraste

- Fundos: **branco** (`--white`) ou **Azul IBM** (`--b60`/`--b70`/`--b80`/`--b90` · `#0f62fe`) — nunca preto/cinza-escuro.
- Regra de texto sobre fundo azul (`--b60`/`--b70`): título/ênfase em `--white`; corpo, legendas e labels em `--b10` (sólido, não `rgba` com opacidade) — mantém ≥ 4.5:1 (WCAG AA) mesmo em texto pequeno.
- Números e marcas d'água gigantes (`.s01-big-num`, `.s03-left-num`, `.s04-right::before`, `.step-big-num`) são puramente decorativos e ficam em opacidade baixa de propósito — a informação que carregam está sempre duplicada em texto legível ao lado.
- Badges, conectores e áreas principais usam o azul IBM `#0f62fe` como cor dominante.
- Todos os fundos sólidos (branco e azul) recebem uma textura sutil em grade de pontos (`--tex-on-light` / `--tex-on-blue`), abaixo do texto e sem impacto perceptível no contraste.

## Micro-interações (JS)

- Transição de slide com leve crossfade + scale.
- Tilt 3D sutil nos cards (`peer-card`, `intern-card`, `manager-card`, `process-step`) seguindo o cursor, e parallax leve nos números decorativos das capas.
- Ambas só ativam com mouse fino (`hover:hover` + `pointer:fine`) e são desligadas automaticamente quando o sistema pede `prefers-reduced-motion: reduce`.
