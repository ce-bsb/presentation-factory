# Acessibilidade, responsividade e impressão

## WCAG 2.1 AA

- Texto normal: contraste mínimo 4.5:1.
- Texto grande e componentes: mínimo 3:1 quando aplicável.
- Todos os controles acessíveis por teclado.
- Foco visível.
- Nome acessível para botões, índice e slides.
- Ordem DOM coerente.
- Informação não depende apenas de cor.
- Movimento reduzido respeitado.

## Teste de teclado

1. Use Tab desde o início.
2. Confirme skip link.
3. Abra e feche índice.
4. Navegue por setas e PageUp/PageDown.
5. Teste Home e End.
6. Confirme que inputs continuam recebendo Espaço e setas.
7. Confirme retorno de foco ao fechar diálogo.

## Leitor de tela

- contador pode usar `aria-live="polite"`;
- progresso usa `role="progressbar"`;
- ícones decorativos usam `aria-hidden="true"`;
- slide deve ter título visível ou label claro;
- não duplique texto acessível desnecessariamente.

## Responsividade

- Colunas empilham em ordem lógica.
- Sidebar vira navegação compacta quando necessário.
- Controles não se sobrepõem ao conteúdo.
- Conteúdo essencial não desaparece.
- Slide pode rolar verticalmente em tela pequena.

## Print

Verifique:

- landscape;
- controles ocultos;
- todos os slides visíveis;
- uma página por slide;
- sem blur ou opacidade;
- fundos preservados;
- sem conteúdo cortado;
- último slide sem página vazia adicional.
