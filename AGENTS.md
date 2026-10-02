# AGENTS.md

Use este repositório com Bob (modo **Presentation Factory**), agente de IA, Claude ou qualquer agente com acesso aos arquivos.

## Regra principal

Tarefa clara → leia o mínimo → implemente. Pergunte só se uma decisão ausente bloquear a execução.

## ⚠️ Caminho rápido — obrigatório para pedidos simples

Uma apresentação simples deve ser entregue em poucos minutos de trabalho, não em
iterações longas. Para isso:

1. **Nunca escreva CSS ou JavaScript do zero.** Copie o template inteiro
   (`index.html` + `assets/`) e só substitua os tokens `{{PLACEHOLDER}}` e o conteúdo.
   Os 3 templates IBM ativos já são Carbon v11 completos — reescrever estilos do zero é
   sempre mais lento e sai pior do que copiar.
2. **Não rode `make build`, `make validate` ou `make test`** a menos que o usuário peça
   explicitamente para "registrar na factory" (uso avançado). Decks simples não passam
   pelo builder Python.
3. **Gere a apresentação completa em uma única passada.** Na falta de um dado real, use
   `[A confirmar]` e siga — não trave em idas e voltas sobre conteúdo.
4. **Decida o template pela tabela em `.bob/presentation-factory/README.md`, sem abrir e
   comparar os 3 HTMLs.** Só leia o HTML/CSS do template já escolhido.

## ⚠️ Onde criar apresentações novas

**Apresentações novas vão FORA desta pasta, como irmãs de `presentation-factory/`.**

- Derive o slug kebab-case do nome pedido (ex.: `proposta-acme-2025`).
- Crie `<workspace>/<slug>/` — nunca dentro de `presentation-factory/`.
- Copie o template escolhido para a nova pasta, preservando `index.html` e `assets/`.
- Esta pasta é **somente leitura** para o agente ao criar decks.

## O que ler antes de agir

1. Este arquivo.
2. Os arquivos reais do deck afetado (template HTML/CSS/JS).
3. Se precisar de referência visual: `organizations/ibm/design-systems/carbon/AGENT_RULES.md`.

Não leia tudo de uma vez. Localize o alvo e implemente.

## Onde cada coisa vai

| Item | Local |
|---|---|
| **Nova apresentação (deck HTML)** | **`<workspace>/<slug>/` — fora da factory** |
| Roteiro da apresentação (uso avançado) | `organizations/ibm/presentations/<slug>/brief.md` |
| Configuração da apresentação (uso avançado) | `organizations/ibm/presentations/<slug>/presentation.toml` |
| Templates IBM ativos | `organizations/ibm/templates/ibm-template/`, `ibm-brief-template/`, `ibm-edge-template/` |
| Saída gerada | `dist/` — nunca edite diretamente |

## Regras inegociáveis

- Não invente logos, cores, fontes, componentes, dados ou assets.
- Logo IBM: copie `organizations/ibm/assets/img/logo-dark.svg` (fundo claro) ou
  `logo-light.svg` (fundo escuro) para `<workspace>/<slug>/assets/ibm-logo.svg`
  e use `<img src="assets/ibm-logo.svg" alt="IBM">`. Regras completas em
  `.bob/rules-presentation-factory/02-conteudo-e-design.md`.
- Ícones: somente `@carbon/icons` oficiais, copiados para o deck. Nunca gere com IA, SVG manual, CSS ou emoji.
- Sem caminhos absolutos (`/Users/`, `Desktop`, `file://`).
- Não ponha HTML executável dentro de `presentations/`.
- Não edite `dist/` como fonte.
