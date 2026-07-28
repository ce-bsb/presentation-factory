# Workflow e validação

## ⚠️ Esta branch é exclusivamente Account Planning

**Toda apresentação pedida nesta branch é um deck de account planning.**
Use sempre o template `ibm-account-planning`. Não use outros templates.

## Criar apresentação de account planning

1. Pergunte o banco focal (se não informado).
2. Derive o slug kebab-case: ex. `account-planning-caixa-2025`.
3. Crie a pasta **fora** da factory: `<workspace>/<slug>/` (irmã de `presentation-factory/`).
4. **Copie byte a byte** `presentation-factory/organizations/ibm/templates/ibm-account-planning/index.html` → `<slug>/index.html`.
   Não reescreva nem refatore — copie o arquivo exatamente como está.
5. Copie os assets necessários para `<slug>/assets/` (logos, ícones Carbon).
6. **Leia os RIs** do banco focal para extrair os dados dos placeholders.
   - Leia apenas as seções relevantes: resultados financeiros, KPIs, destaques estratégicos.
   - Não varra todo o RI — localize as tabelas de resultado e extraia o necessário.
7. Substitua todos os `{{PLACEHOLDERS}}` pelos dados extraídos dos RIs. Nenhum placeholder pode ser visível no deck final.
8. Verifique que não há paths absolutos proibidos.

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
- Todos os logos usam arquivos clonados da factory — nenhum logo foi criado ou aproximado.
- Todos os `font-size` de conteúdo respeitam os mínimos (18px para descrições/importantes, 16px para secundários).

## ⚠️ Mensagem de entrega obrigatória

Ao concluir e entregar **qualquer apresentação**, a última mensagem deve sempre incluir:

> "⚠️ **Verifique todos os dados antes de usar esta apresentação.**
> Métricas, nomes, datas, porcentagens e quaisquer informações factuais podem conter erros ou dados sintéticos gerados incorretamente. Por favor, valide cada número e afirmação com suas fontes reais antes de apresentar."
