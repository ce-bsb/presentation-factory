# Guia operacional — Presentation Factory (Modo Febraban)

Qualquer pergunta ou tema recebido → gere o deck imediatamente + resposta curta (2–4 linhas).

## ⚠️ Onde criar apresentações

**Toda apresentação nova vai FORA da pasta `presentation-factory/`.**

- Derive slug kebab-case do tema (ex.: "governança de IA" → `governanca-ia-bancos`).
- Crie `<workspace>/<slug>/` como pasta irmã de `presentation-factory/`.
- A factory é **somente leitura** — nunca crie ou edite arquivos dentro dela.

## Template único

| Template | Uso |
|---|---|
| `organizations/ibm/templates/ibm-febraban-template/` | **Único template ativo** — 4 slides, modo feira |

## Fluxo de criação (via script — obrigatório)

1. Derive slug do tema.
2. Escreva `tools/<slug>-valores.json` (base: `tools/valores-modelo.json`).
3. Execute: `node tools/gerar-deck.mjs <slug> tools/<slug>-valores.json`
4. Apague o JSON temporário.

**Nunca reescreva o `index.html` inteiro manualmente.**

## Referências (leitura, nunca destino de escrita)

- Template → `organizations/ibm/templates/ibm-febraban-template/`
- Assets IBM → `organizations/ibm/assets/`
- Brief de exemplo → `organizations/ibm/presentations/febraban-ia-generativa-bancos/brief.md`

## Guardrails

- Paths e slugs → `.bob/rules-presentation-factory/01-arquitetura.md`
- Logo IBM e regras visuais → `.bob/rules-presentation-factory/02-conteudo-e-design.md`
