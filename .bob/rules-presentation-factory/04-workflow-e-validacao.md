# Workflow e validação

## Criar nova apresentação (caso padrão)

1. Derive o slug kebab-case do nome pedido pelo usuário.
2. Crie a pasta **fora** da factory: `<workspace>/<slug>/` (irmã de `presentation-factory/`).
3. Leia o template real mais próximo na factory **apenas como referência**.
4. Escreva `index.html`, `style.css` e `script.js` (e assets necessários) dentro de `<workspace>/<slug>/`.
5. Verifique sintaxe JS e que não há paths absolutos proibidos.

Não rode `make build/validate/test` para decks simples.

## Apresentação registrada na factory (uso avançado, apenas quando explicitamente pedido)

1. `make list` → escolha slug único.
2. Crie `presentations/<slug>/brief.md` e `presentation.toml`.
3. Mapeie assets no `presentation.toml`.
4. `make validate && make test`.
5. `make build PRESENTATION=<slug> MODEL=<alias>`.

## Nova entidade

1. Escolha `clients/` ou `organizations/`, crie slug kebab-case.
2. Crie `entity.toml` e pasta `assets/` se necessário.

## Critério de conclusão

- Alteração na camada correta; sem dados inventados; sem paths absolutos.
- Navegação, acessibilidade e responsividade funcionando.
- `make validate` e `make test` passando quando aplicável.
