# Índice operacional

Criar deck: siga `.bob/rules-presentation-factory/01-criar-deck.md` (script `tools/new_deck.py`).
Apresentações novas vão **fora** de `presentation-factory/`, nunca dentro.

| Template | Alias | Quando usar |
|---|---|---|
| `organizations/ibm/templates/ibm-template/` | `ibm` | Padrão: executivo, 12 slides, dashboards e métricas |
| `organizations/ibm/templates/ibm-brief-template/` | `brief` | Dossiê/relatório técnico, 8 slides, tom editorial |
| `organizations/ibm/templates/ibm-edge-template/` | `edge` | Pitch visual e assimétrico, 8 slides |

Outros templates IBM foram descontinuados.

## Uso avançado (só se pedirem "registrar na factory")

1. `make list` e escolha um slug único.
2. Crie `organizations/ibm/presentations/<slug>/brief.md` e `presentation.toml` (ou em `clients/<org>/presentations/`).
3. `make validate && make test`, depois `make build PRESENTATION=<slug> MODEL=<alias>`.
4. `dist/` é saída gerada; nunca edite como fonte. CSS dos templates: edite `tools/template-assets/*.css`
   e rode `python3 tools/sync_template_assets.py` (veja `tools/README.md`).

## Referências

Assets IBM `organizations/ibm/assets/` · Design `organizations/ibm/design-systems/carbon/` ·
Builder `src/presentation_factory/` · Testes `tests/`
