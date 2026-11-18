# Criar deck (caminho rápido)

Não leia HTML, CSS ou JS de template. Use o script; ele copia o template e preenche os tokens.

1. Escolha o template: `ibm` (executivo, 12 slides), `brief` (dossiê, 8) ou `edge` (pitch visual, 8).
2. `python3 presentation-factory/tools/new_deck.py tokens <template>` lista os tokens por slide.
3. Escreva um JSON plano `{"TOKEN": "texto"}` com o conteúdo, numa só passada.
   Sem dado real, omita o token: vira `[A confirmar]`. Nunca invente dados, métricas ou nomes.
4. `python3 presentation-factory/tools/new_deck.py create <template> <slug> content.json`
   cria `<workspace>/<slug>/` fora da factory (kebab-case). O logo IBM oficial já vai junto.
   Logo de cliente: só arquivo oficial, via `--client-logo <arquivo>`; sem ele, o espaço é removido.
5. Entregue o caminho do `index.html`. Não rode `make build/validate/test` (só para "registrar na factory").

Um slide, uma ideia; títulos afirmam a mensagem. Ícones: só `@carbon/icons` oficiais, nunca SVG
manual, CSS, Unicode ou emoji. Sem caminhos absolutos. Edite o HTML só para algo que os tokens não cobrem.
Regras visuais, sob demanda: `organizations/ibm/design-systems/carbon/AGENT_RULES.md`.
