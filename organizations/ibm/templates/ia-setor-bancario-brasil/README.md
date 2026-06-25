# IA no Setor Bancário Brasileiro

Template de apresentação executiva sobre os impactos da inteligência artificial no setor bancário brasileiro.

## Modelo de apresentação

**Executivo narrativo**

## Características

- 9 slides
- Arquitetura: active-slide (um slide visível por vez)
- Design: IBM Design Language / Carbon v11
- Tipografia: IBM Plex Sans e IBM Plex Mono
- Base: 18px
- Tema: claro fixo
- Responsivo: desktop, tablet, mobile
- Print: uma página por slide

## Estrutura

1. **Capa**: Título e apresentadores
2. **Contexto**: Transformação digital no setor financeiro brasileiro
3. **Áreas de impacto**: Panorama das transformações
4. **Operações**: Automação e eficiência
5. **Experiência do cliente**: Personalização e atendimento
6. **Gestão de risco**: Detecção de fraudes e análise de crédito
7. **Novos modelos**: Open banking e serviços baseados em dados
8. **Desafios**: Regulação, segurança e governança
9. **Próximos passos**: Jornada de adoção estratégica

## Componentes utilizados

- Cover grid com marca gráfica
- Two-column panels
- Card grid (4 e 6 colunas)
- Bullets com marcadores alternados
- Tabelas especificadas
- Timeline horizontal
- Highlight box
- Closing com regra

## Navegação

- Teclado: ← → (setas), PageUp/PageDown, Espaço, Home, End, 1-9, Esc, F
- Mouse: botões Anterior/Próximo, Índice
- Touch: swipe horizontal
- Hash routing: `#slide-N`

## Assets necessários

- `assets/logo_IBM_preto.svg`: Logo IBM para topbar

## Público

Executivos, diretores e líderes de tecnologia e negócios do setor bancário brasileiro.

## Decisão esperada

Compreender o panorama de transformação e identificar áreas prioritárias para investimento em IA.

## Padrões secundários

Nenhum. Apresentação executiva narrativa pura com diversidade de componentes para manter engajamento visual.

## Lacunas documentadas

- Métricas específicas de ROI
- Casos detalhados de instituições
- Dados de investimento por banco
- Cronogramas de implementação
- Nomes de apresentadores e data

## Acessibilidade

- Skip link
- ARIA labels e roles
- Foco visível
- Contraste WCAG 2.1 AA
- Navegação por teclado completa
- Screen reader friendly
- Reduced motion support

## Validação

Execute na raiz da factory:

```bash
make validate
make test