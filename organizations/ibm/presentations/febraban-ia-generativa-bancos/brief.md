# IA Generativa para Bancos — Febraban

## Modelo de apresentação

Resposta rápida — feira/evento (ibm-febraban-template, 4 slides)

## Contexto de uso

Apresentação gerada no estande da IBM na Febraban para responder à pergunta de um visitante sobre
IA Generativa no setor bancário. Deve ser concluída em menos de 1 minuto de navegação.

## Objetivo

Apresentar, de forma direta e impactante, o que é IA Generativa, como ela se aplica ao setor
bancário e quais resultados concretos a IBM já gerou com clientes, terminando com um CTA claro
para continuar a conversa via WhatsApp.

## Público

Executivos e líderes de tecnologia de bancos visitantes do estande IBM na Febraban.

## Roteiro dos 4 slides

1. **Capa (Pergunta)**: "Como a IA Generativa pode transformar o meu banco?"
2. **Visão geral**: O que é IA Generativa e os 3 pilares de aplicação em bancos
3. **Cases IBM**: 3 referências reais de uso da IBM com bancos
4. **Closing + QR**: "Quer saber mais? Fale com nosso especialista." + QR WhatsApp

## Dados e referências para o slide de cases

Use exclusivamente referências verificáveis da IBM. Sugestões de base:

- **IBM watsonx para atendimento**: Redução de tempo de resposta em centrais de atendimento de
  grandes bancos com IA conversacional (watsonx Assistant).
- **IBM watsonx.data para análise de crédito**: Modernização de modelos de risco com AI/ML em
  plataforma de dados unificada.
- **IBM Consulting + watsonx Code Assistant**: Modernização de código COBOL legado em bancos,
  acelerando migração para cloud.

Se não houver dado quantitativo verificado, use `[A confirmar com especialista]`.

## Placeholders a preencher no index.html

### Topbar
- `{{TITULO}}` → `IA Generativa para Bancos`
- `{{EVENTO}}` → `Febraban Tech 2025`

### Slide 01 — Capa
- `{{LABEL_BARRA}}` → `IBM · IA Generativa`
- `{{TAG_TEMA}}` → `Setor Bancário`
- `{{EYEBROW_COVER}}` → `Sua pergunta`
- `{{PERGUNTA_LINHA_1}}` → `Como a IA Generativa`
- `{{PERGUNTA_LINHA_2}}` → `transforma bancos?`
- `{{CONTEXTO_COVER}}` → `IBM está liderando a adoção de IA Generativa em mais de 40 instituições financeiras globais com watsonx.`

### Slide 02 — Visão geral
- `{{EYEBROW_S2}}` → `O que é`
- `{{TITULO_S2}}` → `IA Generativa no setor financeiro`
- `{{PANEL_A_LABEL}}` → `Contexto`
- `{{PANEL_A_TEXTO}}` → `IA Generativa são modelos de linguagem de grande escala (LLMs) capazes de criar, resumir e raciocinar sobre dados textuais e estruturados. Para bancos, isso significa automatizar processos complexos, personalizar experiências e acelerar decisões com segurança e governança.`
- `{{PANEL_B_LABEL}}` → `3 pilares de aplicação`
- `{{PONTO_1_TITULO}}` → `Atendimento ao cliente`
- `{{PONTO_1_DESC}}` → `Assistentes virtuais e copilotos de agente com respostas em linguagem natural`
- `{{PONTO_2_TITULO}}` → `Operações e risco`
- `{{PONTO_2_DESC}}` → `Análise de crédito, detecção de fraudes e automação de compliance`
- `{{PONTO_3_TITULO}}` → `Modernização tecnológica`
- `{{PONTO_3_DESC}}` → `Migração de código legado COBOL e aceleração de time-to-market`

### Slide 03 — Cases IBM
- `{{EYEBROW_S3}}` → `IBM em ação`
- `{{TITULO_S3}}` → `Resultados reais com watsonx`
- `{{SUBTITULO_S3}}` → `Bancos que já transformaram operações com IBM`
- Case 1: `{{CASE_1_TAG}}` → `Atendimento · Contact Center` | `{{CASE_1_TITULO}}` → `IA Conversacional com watsonx Assistant` | `{{CASE_1_CORPO}}` → `Automação de chamadas repetitivas em central de atendimento, liberando agentes humanos para casos complexos.` | `{{CASE_1_RESULTADO}}` → `↓ Tempo médio de atendimento`
- Case 2: `{{CASE_2_TAG}}` → `Crédito · Risk` | `{{CASE_2_TITULO}}` → `Modelos de risco com watsonx.data` | `{{CASE_2_CORPO}}` → `Unificação de dados estruturados e não-estruturados para análise de crédito mais precisa e auditável.` | `{{CASE_2_RESULTADO}}` → `↑ Precisão de modelos preditivos`
- Case 3: `{{CASE_3_TAG}}` → `Modernização · Cloud` | `{{CASE_3_TITULO}}` → `Migração COBOL com watsonx Code Assistant` | `{{CASE_3_CORPO}}` → `Aceleração da modernização de sistemas legados em bancos com IA generativa para entendimento e tradução de código.` | `{{CASE_3_RESULTADO}}` → `↑ Velocidade de migração [A confirmar]`

### Slide 04 — Closing + QR
- `{{EYEBROW_S4}}` → `Próximos passos`
- `{{CLOSING_LINHA_1}}` → `Quer saber`
- `{{CLOSING_LINHA_2}}` → `mais?`
- `{{CLOSING_SUB}}` → `Fale agora com nosso especialista IBM e descubra como começar a jornada de IA Generativa no seu banco.`
- `{{ESPECIALISTA_LABEL}}` → `Fale com`
- `{{ESPECIALISTA_NOME}}` → `[Nome do Especialista]`
- `{{ESPECIALISTA_CARGO}}` → `[Cargo] · IBM Brasil`
- `{{QR_LABEL}}` → `WhatsApp direto`
- `{{ESPECIALISTA_WHATSAPP}}` → `[+55 11 9 XXXX-XXXX]`

## Diretrizes específicas

- Máximo de 4 slides — não adicionar slides, não remover slides
- Tom direto e objetivo — sem jargão técnico excessivo
- Dados sem fonte verificada → usar `[A confirmar]`
- Não mencionar concorrentes
- QR code: gerar via `https://wa.me/55XXXXXXXXXXX` e salvar como `assets/qr.png`
- Manter fundo IBM Blue no slide 03 (cases) e na coluna direita do slide 04 (closing)

## Lacunas

- Nome, cargo e WhatsApp do especialista IBM no estande
- Métricas quantitativas verificadas dos cases (usar `[A confirmar]` quando necessário)
- QR code real do WhatsApp (`assets/qr.png`)
