# Modelos de apresentação

Use este guia para escolher o tipo de apresentação antes de definir roteiro,
componentes, ritmo visual e arquitetura de navegação. Não force todo briefing no
mesmo modelo de deck.

## Como escolher

Antes de criar slides, classifique a apresentação por:

- público principal;
- decisão ou ação esperada;
- nível de detalhe necessário;
- contexto de uso: reunião executiva, workshop, venda, treinamento, revisão,
  demonstração, documento consultivo ou entrega técnica;
- tempo disponível;
- maturidade do conteúdo: hipótese, proposta, resultado validado ou instrução.

Se o usuário não informar o tipo, infira pelo objetivo e pelo público. Quando
houver ambiguidade relevante, registre a escolha no README e siga com o modelo
mais conservador.

Escolha um modelo principal, mas não limite todos os slides a um único padrão.
Use padrões secundários quando eles melhorarem uma parte específica da narrativa:
roadmap para fases, técnico/arquitetura para solução, pesquisa/insights para
evidências, status executivo para acompanhamento, produto/demo para jornada ou
case/resultados para impacto. A mistura deve ser explícita e funcional, sem
transformar o deck em colagem de layouts.

## Matriz de modelos

| Modelo | Use quando | Estrutura sugerida | Ritmo visual |
|---|---|---|---|
| Executivo de decisão | A audiência precisa decidir, aprovar ou priorizar | Contexto, tensão, recomendação, evidências, opções, risco, decisão | Poucos slides, títulos assertivos, síntese forte |
| Executivo narrativo | A intenção é alinhar visão, direção ou transformação | Abertura, tese, mudança de contexto, implicações, caminho, chamada à ação | Expressivo, com pausas narrativas e slides de respiro |
| Proposta comercial | A meta é vender solução, serviço ou próximo passo | Dor, oportunidade, abordagem, escopo, diferenciais, plano, investimento, próximos passos | Comercial consultivo, benefícios claros, prova e CTA |
| Discovery/workshop | A meta é preparar, conduzir ou documentar uma sessão | Objetivo, contexto, hipótese, agenda, dinâmica, participantes, decisões, tarefas | Operacional, tabelas e checklists úteis |
| Técnico/arquitetura | A audiência precisa entender solução, integração ou riscos técnicos | Problema, requisitos, arquitetura, fluxos, segurança, operação, trade-offs, próximos passos | Denso, diagramas, tabelas, camadas e estados |
| Status executivo | A reunião acompanha progresso, impedimentos e decisões | Sumário, progresso, indicadores, riscos, decisões pendentes, plano da próxima etapa | Direto, comparável, orientado a exceções |
| Roadmap | A conversa é sobre sequência, prioridades e dependências | Norte, fases, marcos, dependências, riscos, critérios de avanço | Timeline, swimlanes e marcos legíveis |
| Treinamento | O objetivo é ensinar uma prática, ferramenta ou processo | Objetivo, conceito, passo a passo, exemplos, exercício, recap, recursos | Didático, progressivo, com exemplos e checagens |
| Produto/demo | O objetivo é demonstrar uma experiência ou protótipo | Problema, usuários, jornada, demo, capacidades, limitações, próximos passos | Visual, com telas, fluxos e momentos de demonstração |
| Pesquisa/insights | O objetivo é compartilhar achados e implicações | Pergunta, método, amostra, achados, evidências, implicações, recomendações | Evidência primeiro, cards de insight e citações curtas |
| Case/resultados | O objetivo é mostrar trabalho realizado e impacto | Contexto, desafio, abordagem, solução, resultados, aprendizados, expansão | Antes/depois, métricas validadas e evidência |
| Documento rolável | A entrega precisa funcionar como apresentação e documento de consulta | Sumário persistente, seções, blocos explicativos, anexos | Use arquitetura `scroll-sidebar` |

## Regras por modelo

### Executivo de decisão

- Comece pela decisão esperada ou recomendação.
- Use no máximo uma mensagem principal por slide.
- Mostre alternativas apenas quando elas ajudam a decidir.
- Riscos devem ser explícitos e ligados à decisão.
- Métricas sem fonte ficam como `[A confirmar]`.

Estrutura comum:

1. Por que esta decisão importa agora.
2. Recomendação.
3. Evidência ou racional.
4. Opções e trade-offs.
5. Riscos e mitigação.
6. Decisão solicitada.

### Executivo narrativo

- Construa arco com tese, mudança e implicação.
- Use slides de respiro para mensagens centrais.
- Evite excesso de tabela e checklist.
- Termine com uma direção clara.

Estrutura comum:

1. Tese.
2. O que mudou.
3. Por que importa.
4. Nova possibilidade.
5. Como isso se materializa.
6. O caminho de adoção.
7. Chamada à ação.

### Proposta comercial

- Conecte dor, solução, escopo e próximo passo.
- Diferenciais devem ser demonstráveis.
- Evite prometer resultado sem fonte.
- Inclua limites e premissas quando o escopo não estiver fechado.

Estrutura comum:

1. Situação do cliente.
2. Problema ou oportunidade.
3. Abordagem proposta.
4. Solução e capacidades.
5. Plano de trabalho.
6. Modelo de colaboração.
7. Investimento ou premissas comerciais, se informado.
8. Próximos passos.

### Discovery/workshop

- Priorize clareza operacional.
- Inclua objetivos, agenda, papéis e tarefas.
- Datas, participantes e local só entram se fornecidos.
- Use checklists, tabelas e timeline curta.

### Técnico/arquitetura

- Separe visão executiva de detalhe técnico.
- Diagrama não pode ser a única fonte da informação.
- Mostre integrações, dados, segurança e operação.
- Deixe trade-offs e lacunas explícitos.

### Status executivo

- Comece por estado geral e mudanças desde a última leitura.
- Destaque exceções, riscos e decisões pendentes.
- Use indicadores apenas com fonte ou status `[A confirmar]`.
- Evite histórico detalhado que não afeta a próxima decisão.

### Roadmap

- Mostre fase, objetivo, entregáveis e dependências.
- Distingua compromisso de hipótese.
- Use critérios de avanço para não transformar roadmap em promessa vaga.

### Treinamento

- Explique conceito antes de procedimento.
- Use exemplos reais somente se fornecidos.
- Inclua exercícios ou perguntas de checagem quando fizer sentido.
- Termine com recap e recursos.

### Produto/demo

- Organize pela jornada do usuário.
- Use telas, fluxos ou placeholders claramente marcados.
- Mostre capacidades e limitações.
- Reserve um slide para próximos experimentos ou validações.

### Pesquisa/insights

- Diferencie dado observado, interpretação e recomendação.
- Use uma evidência por insight.
- Não invente citações, amostra ou método.
- A recomendação deve derivar dos achados.

### Case/resultados

- Só use resultados validados.
- Mostre baseline, intervenção e impacto quando existirem.
- Se não houver métrica, trate como aprendizado ou evidência qualitativa.

## Arquitetura visual

- `active-slide`: padrão para reunião, decisão, proposta, técnico, treinamento,
  demo e status.
- `scroll-sidebar`: use quando a apresentação também deve ser lida como
  documento consultivo, relatório, playbook ou material de estudo.
- `ibm-complete-deck.html`: referência visual para executivo narrativo,
  expressivo e com maior diversidade de layouts.

Use os modelos visuais IBM como referência de CSS e composição. A saída final
deve adaptar tokens, escala, grid, componentes e estados ao modelo narrativo
escolhido, sem depender de um único HTML de exemplo para todos os casos.

## Saída esperada no README

Toda apresentação nova deve registrar:

- modelo escolhido;
- padrões secundários usados, quando existirem;
- motivo da escolha;
- público presumido;
- decisão ou ação esperada;
- lacunas que afetaram conteúdo, dados ou agenda.
