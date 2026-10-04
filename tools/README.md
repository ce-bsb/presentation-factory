# Manutenção dos templates IBM

Os quatro templates compartilham tokens, estrutura de navegação e comportamento responsivo. Cada um mantém seu CSS de composição. As saídas são autônomas: copiar a pasta do template é suficiente para abrir a apresentação sem servidor ou build.

Fontes dos estilos: `template-assets/base.css`, `template-assets/expressive.css` e `template-assets/<template>.css`. Fonte do controlador: `organizations/ibm/assets/js/deck.js`.

```sh
python3 tools/sync_template_assets.py
python3 tools/sync_template_assets.py --check
python3 tools/preview_templates.py
PYTHONPATH=src python3 -m unittest discover -s tests
```

`preview_templates.py` gera apenas `preview.html` com conteúdo ilustrativo. Os placeholders dos arquivos `index.html` são preservados.

## Verificação visual e funcional

Com Playwright disponível para o Node (instalado no ambiente ou via `NODE_PATH`) e Google Chrome instalado:

```sh
node tools/review_templates.cjs
```

O teste percorre os 35 slides em sete viewports: 1280×720, 1920×1080, 1056×700, 768×1024, 390×844, 320×568 e 844×390. Verifica overflow, cortes, isolamento dos slides inativos, fonte base, navegação, sumário, checklist, fontes ampliadas e impressão. Defina `SCREENSHOT_DIR` como um diretório existente para salvar capturas das capas.

As fontes IBM Plex são carregadas do Google Fonts. O CSS mantém 18 px de corpo no tamanho padrão do navegador, usando `rem` para respeitar preferências de ampliação. Se o conteúdo não couber, o modo de leitura permite rolagem natural da página, sem encolher a tipografia.

## Referências

- [IBM Plex e tipografia Carbon](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview)
- [Tokens de cores Carbon](https://www.carbondesignsystem.com/building-blocks/foundations/color/tokens)
- [IBM 2x Grid e breakpoints](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview)
- [Carbon v11](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md)

A implementação é HTML/CSS/JavaScript nativo com identidade visual e tokens Carbon v11; não é uma dependência dos componentes React Carbon.

## Patterns e movimento

Cada slide declara `data-pattern="orbits|matrix|weave|contour"`. Os fundos usam a paleta IBM, com máscaras suaves que preservam a área de leitura. As ilustrações geométricas são decoração CSS; logos e pictogramas oficiais continuam separados.

O controlador prepara entradas escalonadas com `data-reveal`. Texto, módulos e gráficos animam uma vez por entrada; não há loops ambientais. A troca de slide continua horizontal. `prefers-reduced-motion: reduce` e impressão desativam os movimentos, mantendo o conteúdo visível.

Referência de curvas e coreografia: [Carbon Motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview).
