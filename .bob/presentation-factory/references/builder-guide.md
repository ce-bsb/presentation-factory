# Builder e pacote gerado

## Descoberta da raiz

A factory pode considerar como raiz o diretório que contém:

- `catalog/models.toml`;
- `pyproject.toml`.

Execute a CLI dentro da raiz ou de um subdiretório.

## Processo do build

1. Localiza `presentation.toml` pelo slug.
2. Rejeita slug ausente ou ambíguo.
3. Carrega catálogo, apresentação e owner.
4. Seleciona modelo solicitado, default da apresentação ou default global.
5. Resolve template, brief e assets.
6. Confirma `template/index.html`, prompt, brief e assets.
7. Remove o destino existente.
8. Copia o template para `workspace/`.
9. Copia assets mapeados.
10. Copia o brief.
11. Compõe o prompt final.
12. Gera o manifest.

## Saída

```text
dist/<slug>/<modelo>/
├── brief.md
├── manifest.json
├── prompt.md
└── workspace/
```

## Manifest schema 2

O manifest normalmente contém:

- data UTC de criação;
- revisão Git;
- slug, nome, path e hash SHA-256 do brief;
- slug, nome e tipo do owner;
- template;
- alias, provider e variável de ambiente do modelo.

Ele não deve conter credencial ou ID secreto.

## Comandos

```bash
make list
make validate
make test
make build PRESENTATION=<slug> MODEL=<alias>
```

Uso direto:

```bash
PYTHONPATH=src python3 -m presentation_factory build <slug> --model <alias>
```

## Cuidados

- O destino é removido antes do build.
- Não use `--output` em pasta com arquivos manuais importantes.
- Validação pode usar caminho temporário fixo.
- Execute `validate` e `test` em sequência.
- Inspecione o workspace gerado, não apenas a configuração fonte.
