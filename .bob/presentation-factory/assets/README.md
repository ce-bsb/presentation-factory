# Assets compartilhados

Este diretório guarda assets de referência que o Bob deve reutilizar ao criar
apresentações.

## Regras de uso

- Sempre que uma apresentação usar logo, wordmark ou lockup IBM, use os arquivos
  deste diretório como fonte.
- Sempre que uma apresentação precisar de imagem, pictograma, logo, textura ou
  SVG reutilizável, procure primeiro nos assets do owner e neste diretório.
- Copie o asset necessário para a pasta `assets/` do deck final.
- Use paths relativos dentro do HTML e CSS.
- Não referencie arquivos diretamente de `.bob/` no deck gerado.
- Não use URLs externas, caminhos absolutos ou imagens fora do mapa de assets
  sem pedido explícito do usuário.
- Não recrie o logo IBM com texto, CSS, SVG manual novo ou imagem externa quando
  existir asset equivalente neste diretório.
- Não misture logo institucional IBM com identidade de cliente sem orientação
  explícita do briefing.
- Preserve `alt` adequado quando o asset carregar informação de marca.

## IBM

Logos e lockups neutros ficam em `ibm/logos/`.

Arquivos disponíveis:

- `logo_IBM_preto.svg`: logo IBM preto para tema claro;
- `logo_IBM_branco.svg`: logo IBM branco para fundos escuros ou coloridos.

Escolha padrão:

- Use `logo_IBM_preto.svg` em topbar, capa ou rodapé de tema claro.
- Use `logo_IBM_branco.svg` somente quando o fundo garantir contraste adequado.
- Para IBM Consulting, componha o texto "Consulting" separado do logo, usando
  IBM Plex Sans, sem alterar o SVG do logo IBM.

Estes SVGs são assets leves para apresentações internas e templates neutros. Se
o trabalho exigir asset oficial de marca, substitua pelo arquivo oficial
fornecido pelo owner ou pelo briefing.
