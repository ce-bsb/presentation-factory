# Teste do modo Presentation Factory

1. Reabra o workspace no Bob.
2. Abra **Settings → Modes**.
3. Selecione o modo de projeto **Presentation Factory**.
4. Inicie uma conversa nova.
5. Envie:

```text
Crie um deck HTML de teste com três slides em bob-smoke-test/.

Consulte somente um template real próximo, por exemplo
`clients/ibm-enterprise/templates/standard-deck/`, e implemente sem parar em
uma proposta longa.

Crie:
- index.html
- assets/css/styles.css
- assets/js/deck.js
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

O teste passa se o Bob consultar arquivos reais do repositório, criar os quatro
arquivos e implementar os requisitos sem depender de Skill.
