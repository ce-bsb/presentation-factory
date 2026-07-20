# Workflow e validação — Modo Febraban

## Geração automática (comportamento padrão neste modo)

**Toda mensagem com pergunta ou tema → gere o deck imediatamente.**
Não espere pedido explícito de "criar apresentação".

## Fluxo único — via script (mais rápido)

1. Derive slug kebab-case do tema.
2. Escreva `tools/<slug>-valores.json` com os 46 valores (use `tools/valores-modelo.json` como base).
3. Execute: `node tools/gerar-deck.mjs <slug> tools/<slug>-valores.json`
4. O script gera `<workspace>/<slug>/index.html` + copia assets automaticamente.
5. Apague `tools/<slug>-valores.json` após geração (arquivo temporário).

**Nunca reescreva o `index.html` inteiro manualmente** — use sempre o script.

## Conteúdo dos 4 slides (o que preencher no JSON)

| Slide | Campos principais |
|---|---|
| 01 Cover | `PERGUNTA_LINHA_1`, `PERGUNTA_LINHA_2`, `CONTEXTO_COVER` |
| 02 Visão geral | `TITULO_S2`, `PANEL_A_TEXTO`, `PONTO_1..3_TITULO/DESC` |
| 03 Cases IBM | `CASE_1..3_TAG/TITULO/CORPO/RESULTADO` — use `[A confirmar]` se sem fonte |
| 04 Closing | `ESPECIALISTA_NOME`, `ESPECIALISTA_WHATSAPP` |

`assets/qr.png` é opcional — fallback SVG automático já está no template.

## Critério de conclusão

- Script rodou sem erros; nenhum placeholder `{{...}}` restante no HTML gerado.
- Responsividade e navegação garantidas pelo template.
