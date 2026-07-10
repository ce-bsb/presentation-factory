# Teste do modo Presentation Factory

> Workspace assumido: `/IBM` (raiz que contém `presentation-factory/`).
> O deck deve ser criado em `/IBM/bob-smoke-test/` — fora da factory.

1. Reabra o workspace raiz (`/IBM`) no Bob.
2. Abra **Settings → Modes**.
3. Selecione o modo de projeto **Presentation Factory**.
4. Inicie uma conversa nova.
5. Envie:

```text
Crie um deck HTML de teste com três slides em bob-smoke-test/.

Use o template default
`presentation-factory/organizations/ibm/templates/ibm-template/` e implemente
sem parar em uma proposta longa.

Crie:
- index.html
- assets/ com as cópias locais dos logos oficiais
- README.md

Slides:
1. Abertura
2. Arquivos consultados
3. Resultado

No slide 2, liste pelo menos três arquivos reais consultados.
Use tema claro, base de 18px, slide ativo, teclado, índice, hash, swipe,
prefers-reduced-motion e impressão.

Valide o JavaScript e procure caminhos absolutos proibidos.
```

O teste passa se o Bob usar o novo template default, manter CSS e JavaScript
dentro de `index.html`, copiar os logos oficiais para `assets/` e implementar
os requisitos sem depender de Skill.
