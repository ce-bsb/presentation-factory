# Workflow e validação

## Deck simples (HTML/CSS/JS direto)

1. Leia o template real mais próximo.
2. Crie os arquivos em `templates/<slug>/`.
3. Verifique sintaxe JS e paths absolutos proibidos.

Não rode `make build/validate/test` para decks simples.

## Apresentação registrada na factory

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
