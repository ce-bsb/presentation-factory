# Account Planning — Setor Bancário Brasileiro

## Contexto de uso

Deck comparativo interno IBM para abertura de account planning. Gerado a partir de PDFs de RI
(Relações com Investidores) de múltiplos bancos. Uso restrito ao time IBM — confidencial.

## Fluxo de geração

```bash
# 1. Criar estrutura de dados lendo os PDFs
node tools/extrair-ri.mjs \
  caixa    ~/Downloads/caixa-ri-2024.pdf \
  bradesco ~/Downloads/bradesco-ri-2024.pdf \
  itau     ~/Downloads/itau-ri-2024.pdf

# 2. Abrir tools/dados-bancos.json e preencher os campos extraídos de cada PDF
#    (lucro_liquido_bi, ativos_totais_bi, roe, carteira_total_bi, credito_imob_bi,
#     variações _var, highlights e oportunidade_*)

# 3. Gerar o deck
node tools/gerar-account-planning.mjs account-planning-bancos-2024

# O deck é criado em: ../account-planning-bancos-2024/index.html
```

## Estrutura de slides

| # | Slide | Conteúdo |
|---|---|---|
| 01 | Cover | Título + período + tags dos bancos |
| 02 | Contexto | Panorama macro + tendências e pressões do setor |
| 03 | Comparativo financeiro | Tabela: Lucro líquido, Ativos, ROE, Carteira crédito, Crédito imob. |
| 04 | Carteira de crédito | Barras SVG: carteira total e crédito imobiliário por banco |
| 05..N | Perfil por banco | KPIs + destaques do RI (1 slide por banco) |
| N+1 | Oportunidades IBM | Cards com oportunidade identificada por banco e solução IBM |
| N+2 | Próximos passos | Ações prioritárias + time IBM + fontes analisadas |

## Campos extraídos do RI por banco

| Campo | Descrição |
|---|---|
| `lucro_liquido_bi` | Lucro líquido em R$ bilhões |
| `ativos_totais_bi` | Ativos totais em R$ bilhões |
| `roe` | ROE em % |
| `carteira_total_bi` | Carteira de crédito total em R$ bilhões |
| `credito_imob_bi` | Crédito imobiliário em R$ bilhões |
| `*_var` | Variação YoY em % para cada métrica acima |
| `highlights` | Array de 3 destaques narrativos do período |
| `oportunidade_*` | Oportunidade IBM identificada (título, corpo, solução) |

## Campos de configuração geral (`meta`)

| Campo | Descrição |
|---|---|
| `titulo` | Título do deck |
| `periodo` | Período de referência (ex.: "2024") |
| `segmento` | Segmento analisado |
| `contexto_panorama` | Parágrafo de contexto macro |
| `contexto_bullets` | Array de tendências do setor |
| `proximos_passos` | Array de ações prioritárias |
| `time_ibm` | Time IBM responsável |
| `periodo_execucao` | Prazo de execução |

## Dados fictícios e lacunas

- Todos os valores numéricos devem ser extraídos dos PDFs reais
- Campos não disponíveis no RI: usar `null` → aparece como `[A confirmar]` no deck
- Oportunidades IBM devem ser validadas com o time de vendas antes de usar o deck
