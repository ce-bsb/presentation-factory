# Workflow e validação — Modo Febraban

## Geração automática (comportamento padrão neste modo)

**Toda mensagem com pergunta ou tema → gere o deck imediatamente.**
Não espere pedido explícito de "criar apresentação".

## Fluxo único

1. Derive slug kebab-case do tema recebido.
2. Crie `<workspace>/<slug>/` fora da factory.
3. Copie `organizations/ibm/templates/ibm-febraban-template/index.html` → `<workspace>/<slug>/index.html`.
4. Copie `organizations/ibm/templates/ibm-febraban-template/assets/` → `<workspace>/<slug>/assets/`.
5. Copie `organizations/ibm/assets/img/logo-dark.svg` → `<workspace>/<slug>/assets/ibm-logo.svg`.
6. Substitua todos os `{{PLACEHOLDER}}` com conteúdo real do tema.
7. Não rode `make build/validate/test` — não é necessário para este fluxo.

## Conteúdo dos 4 slides

| Slide | O que preencher |
|---|---|
| 01 Cover | Tema/pergunta como headline — `{{PERGUNTA_LINHA_1}}` e `{{PERGUNTA_LINHA_2}}` |
| 02 Visão geral | Contexto do tema + 3 pontos-chave do IBM watsonx ou solução relevante |
| 03 Cases IBM | 3 cases reais verificáveis; use `[A confirmar]` se sem fonte |
| 04 Closing | "Quer saber mais?" + `{{ESPECIALISTA_NOME}}` + `{{ESPECIALISTA_WHATSAPP}}` |

`assets/qr.png` é opcional — o template exibe fallback SVG se ausente.

## Critério de conclusão

- Todos os `{{PLACEHOLDER}}` substituídos; sem paths absolutos; sem dados inventados sem marcação.
- Responsividade e navegação funcionando (já garantidas pelo template).
