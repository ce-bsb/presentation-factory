# Arquitetura

## Estrutura do repositório

- `clients/` — entidades cliente; `organizations/` — entidades corporativas.
- Cada entidade tem `entity.toml` e sua pasta `assets/`.
- `presentations/<slug>/` — `brief.md` e `presentation.toml`.
- `templates/<slug>/` — HTML, CSS e JS do deck.
- `dist/` — saída gerada; nunca edite diretamente.

## Localizar a factory

Procure nesta ordem: `./presentation-factory/` → raiz atual (se tiver
`catalog/models.toml`) → diretórios irmãos com esse arquivo.

## Regras de path

- Slugs globalmente únicos, em kebab-case.
- Sem `/Users/`, `Desktop`, `file://` ou URLs externas no deck.
- Assets via `[assets]` no `presentation.toml`, paths relativos.
