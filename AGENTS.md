# AGENTS.md

Use este repositório com Bob (modo **Presentation Factory**), Claude ou qualquer agente com acesso aos arquivos.

Tarefa clara → leia o mínimo → implemente. Pergunte só se uma decisão ausente bloquear a execução.

## Criar uma apresentação (caminho rápido)

Apresentações novas vão **fora** desta pasta, em `<workspace>/<slug>/` (irmã de `presentation-factory/`).
Não leia nem reescreva o HTML/CSS/JS dos templates:

```bash
python3 presentation-factory/tools/new_deck.py tokens edge            # tokens por slide
python3 presentation-factory/tools/new_deck.py create edge meu-deck content.json
```

`content.json` é um objeto plano `{"TOKEN": "texto"}`; token ausente vira `[A confirmar]`.
Templates: `ibm` (executivo, 12 slides), `brief` (dossiê, 8), `edge` (pitch visual, 8).
Logo de cliente só com arquivo oficial: `--client-logo <arquivo>`.
Não rode `make build/validate/test` para decks simples.

## Regras inegociáveis

- Não invente logos, cores, fontes, componentes, dados ou assets.
- Ícones: somente `@carbon/icons` oficiais; nunca SVG manual, CSS, Unicode ou emoji.
- Sem caminhos absolutos (`/Users/`, `Desktop`, `file://`).
- Não edite `dist/` como fonte. Não ponha HTML executável dentro de `presentations/`.
- Esta pasta é somente leitura ao criar decks.

## Onde está cada coisa

| Item | Local |
|---|---|
| Templates IBM | `organizations/ibm/templates/{ibm-template,ibm-brief-template,ibm-edge-template}/` |
| CSS fonte dos templates | `tools/template-assets/` (gerar com `tools/sync_template_assets.py`) |
| Regras visuais Carbon | `organizations/ibm/design-systems/carbon/AGENT_RULES.md` |
| Registro na factory (avançado) | `.bob/presentation-factory/README.md` |
