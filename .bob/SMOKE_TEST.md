# Teste do modo Presentation Factory

> Workspace assumido: `/IBM` (raiz que contém `presentation-factory/`).
> O deck deve ser criado em `/IBM/bob-smoke-test/` — fora da factory.

1. Reabra o workspace raiz (`/IBM`) no Bob.
2. Abra **Settings → Modes**.
3. Selecione o modo de projeto **Presentation Factory**.
4. Inicie uma conversa nova.
5. Envie:

```text
Crie uma apresentação de teste de três slides chamada bob-smoke-test.
Use o template ibm e o script tools/new_deck.py. Conteúdo livre, sem inventar dados.
```

O teste passa se o Bob usar `tools/new_deck.py` (tokens → JSON → create) sem ler nem
reescrever o HTML/CSS/JS do template, criar `bob-smoke-test/` fora da factory com
`index.html` e `assets/` (inclui `ibm-logo.svg`), e entregar o caminho do `index.html`.
