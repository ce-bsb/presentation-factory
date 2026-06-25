# Guia dos arquivos de configuração

## entity.toml

```toml
slug = "acme"
name = "ACME"
kind = "client"

[design]
system = "IBM Carbon Design System v11"
font = "IBM Plex"
language = "pt-BR"
```

Regras:

- `slug` deve coincidir com a pasta;
- `kind` normalmente é `client` ou `organization`;
- use nome oficial;
- não grave secrets;
- design informa contexto, mas o CSS real continua sendo fonte visual.

## presentation.toml

```toml
name = "Nome da apresentação"
template = "clients/acme/templates/executive-deck"
brief = "clients/acme/presentations/nome-da-apresentacao/brief.md"
default_model = "primary"

[assets]
"assets/brand/styles.css" = "clients/acme/assets/css/styles.css"
"assets/brand/logo.svg" = "clients/acme/assets/img/logo.svg"
"assets/partner/logo.svg" = "organizations/ibm/assets/img/logo-dark.svg"
```

Campos:

- `name`: nome humano da apresentação;
- `template`: pasta que contém `index.html`;
- `brief`: roteiro de conteúdo;
- `default_model`: alias opcional;
- `[assets]`: destino no workspace para origem na factory.

## models.toml

```toml
default = "primary"

[models.primary]
provider = "watsonx"
model_id_env = "WATSONX_PRIMARY_MODEL_ID"
description = "Modelo principal"
```

IDs reais e credenciais permanecem em variáveis de ambiente ou secrets. O
manifest registra o nome da variável, não seu valor.

## Slugs

- Use kebab-case.
- Slugs de apresentação são únicos em `clients/` e `organizations/`.
- Não reutilize o mesmo slug em owners diferentes.
- O slug é o nome da pasta da apresentação.
