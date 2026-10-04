# IBM Executive

Apresentações executivas: contexto, jornada, solução, comparação, evidências, resultados e próximos passos. 12 slides, IBM Plex Sans/Mono e paleta Carbon v11.

Abra [preview.html](preview.html) para revisar uma demonstração com conteúdo e métricas **ilustrativos**. O [index.html](index.html) preserva os campos `{{PLACEHOLDER}}` para criar apresentações reais.

## Uso

1. Copie `index.html` e toda a pasta `assets/` para uma pasta irmã de `presentation-factory/`.
2. Substitua os campos `{{...}}`, imagens e textos alternativos por conteúdo real.
3. Remova `.brand-mark-client` se não houver marca parceira. Use os logos IBM oficiais já incluídos.
4. Abra `index.html` no navegador. As fontes IBM Plex precisam de conexão na primeira carga.

## Navegação e responsividade

- Setas visíveis, indicadores clicáveis, swipe horizontal e links diretos `#slide-N`.
- Teclas ←/→, Home/End e F. Em modo apresentação: ↑/↓, PageUp/PageDown e Espaço.
- Em telas menores que 1056 px, telas baixas ou conteúdo maior que a área disponível, o slide ativo usa a rolagem natural da página. As teclas verticais mantêm a função de leitura.
- Controles continuam visíveis em dispositivos touch. Slides inativos ficam fora da navegação e da árvore de acessibilidade.
- Foco visível, respeito a movimento reduzido e impressão de todos os slides.

## Manutenção

Edite `tools/template-assets/base.css`, `tools/template-assets/expressive.css` e `tools/template-assets/ibm-template.css`; o runtime está em `organizations/ibm/assets/js/deck.js`.

```sh
python3 tools/sync_template_assets.py
python3 tools/sync_template_assets.py --check
python3 tools/preview_templates.py
```

Os CSS/JS em `assets/` são cópias autônomas geradas por esse comando; não dependem de caminhos externos à pasta do deck. A factory mantém HTML/CSS/JS nativos, com tokens visuais Carbon v11; não carrega a biblioteca React Carbon.
