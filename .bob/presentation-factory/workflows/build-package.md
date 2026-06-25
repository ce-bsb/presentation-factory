# Workflow: gerar e revisar pacote

1. Localize a raiz real.
2. Execute `make list`.
3. Execute `make validate`.
4. Execute `make test`.
5. Execute o build solicitado.
6. Abra `manifest.json`.
7. Confirme owner, template, brief e modelo.
8. Confirme hash do brief.
9. Leia `prompt.md`.
10. Inspecione o workspace.
11. Teste navegação e impressão.

Execute validação e testes em sequência. Nunca faça correção permanente
diretamente em `dist/`.
