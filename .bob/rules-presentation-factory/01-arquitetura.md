# Arquitetura

## Estrutura do repositório

- `clients/` — entidades cliente; `organizations/` — entidades corporativas.
- Cada entidade tem `entity.toml` e sua pasta `assets/`.
- `presentations/<slug>/` — `brief.md` e `presentation.toml`.
- `templates/<slug>/` — HTML, CSS e JS do deck (referência interna da factory).
- `dist/` — saída gerada; nunca edite diretamente.

## Onde criar apresentações novas

**Apresentações solicitadas pelo usuário NUNCA são criadas dentro de `presentation-factory/`.**

Quando o usuário pedir uma apresentação:
1. Derive um slug kebab-case do nome/tema fornecido (ex.: "Proposta Acme 2025" → `proposta-acme-2025`).
2. Crie a pasta **fora** do `presentation-factory`, como irmã dele:
   - `../<slug>/` relativo à raiz do workspace (ex.: `/Users/eguchi/VsCode/IBM/<slug>/`).
3. Coloque todos os arquivos do deck (`index.html`, `style.css`, `script.js`, assets) dentro dessa pasta.
4. **Nunca** crie a apresentação em `presentation-factory/templates/`, `presentation-factory/dist/` ou qualquer subpasta da factory.

A factory (`presentation-factory/`) serve apenas como **referência** — leia seus templates para copiar estrutura e CSS, mas escreva os arquivos finais na pasta externa.

## Localizar a factory

Procure nesta ordem: `./presentation-factory/` → raiz atual (se tiver
`catalog/models.toml`) → diretórios irmãos com esse arquivo.

## Regras de path

- Slugs globalmente únicos, em kebab-case.
- Sem `/Users/`, `Desktop`, `file://` ou URLs externas no deck.
- Assets via paths relativos dentro da pasta da apresentação.
