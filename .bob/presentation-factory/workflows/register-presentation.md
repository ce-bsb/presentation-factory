# Workflow: cadastrar apresentação

1. Identifique owner, objetivo, público e decisão.
2. Liste apresentações existentes.
3. Escolha slug globalmente único.
4. Crie `presentations/<slug>/brief.md`.
5. Crie `presentations/<slug>/presentation.toml`.
6. Reuse template compatível ou crie um separado.
7. Mapeie assets por destino e origem.
8. Confirme todos os paths.
9. Execute `make validate`.
10. Execute `make test`.
11. Gere o pacote.
12. Inspecione manifest, prompt, brief e workspace.

Não coloque HTML completo dentro da pasta da apresentação.
