# AGENTS.md

Use este repositório com Bob (modo **Presentation Factory**), agente de IA, Claude ou qualquer agente com acesso aos arquivos.

## Evento de referência

**Febraban Tech 2026** — use este nome em todos os novos decks (campo `EVENTO`).
Nunca gere decks com "2025" ou sem ano explícito.

## Regra principal

Tarefa clara → leia o mínimo → implemente. Pergunte só se uma decisão ausente bloquear a execução.

## ⚠️ Fontes de conteúdo — regras obrigatórias

### 1. Sempre use fontes oficiais IBM

Todo conteúdo factual (cases, métricas, produtos, funcionalidades) deve ser baseado
em fontes publicadas em domínios oficiais IBM:

| Domínio aceito | Uso típico |
|---|---|
| `ibm.com` | Produto, solução, comunicados |
| `newsroom.ibm.com` | Press releases, resultados financeiros |
| `research.ibm.com` | Pesquisa, papers, tecnologia |
| `developer.ibm.com` | APIs, SDKs, documentação técnica |
| `ibm.com/case-studies` | Cases de clientes verificados |

Se não houver fonte verificável, marque o campo com `[A confirmar — ibm.com]` e
**nunca invente métricas ou atribua resultados a clientes sem fonte**.

### 2. Valide unidades de negócio IBM antes de mencionar

Antes de citar qualquer IBM Business Unit ou marca interna, verifique se ainda existe.
Unidades descontinuadas ou renomeadas conhecidas:

| ❌ Não usar | ✅ Substituto correto |
|---|---|
| IBM Security (divisão standalone) | IBM Consulting — Cybersecurity Services |
| IBM Research (como produto/oferta) | IBM Research (laboratório — cite apenas descobertas científicas, não como BU comercial) |
| IBM Watson (marca guarda-chuva) | watsonx (plataforma atual) — use `watsonx.ai`, `watsonx.data`, `watsonx.governance` |
| IBM Cloud Pak for Data | watsonx.data / IBM OpenPages (conforme contexto) |
| IBM iX | IBM Consulting (iX foi integrado) |
| IBM Services | IBM Consulting |
| IBM Global Technology Services | IBM Infrastructure / Kyndryl (spin-off em 2021) |

Regra prática: se a divisão não tiver uma página ativa em `ibm.com/products` ou
`ibm.com/consulting`, não use o nome como se fosse uma oferta atual.

### 3. Cases IBM — padrão de citação

- Fonte primária: `ibm.com/case-studies` ou press release em `newsroom.ibm.com`.
- Se o case for conhecido mas sem URL verificável no momento, escreva:
  `[Fonte: ibm.com/case-studies — A confirmar]`
- Nunca cite porcentagens de redução/aumento sem fonte. Use faixas genéricas
  (ex.: "significativa redução de custos operacionais") se a métrica não for confirmada.

## ⚠️ Onde criar apresentações novas

**Apresentações novas vão FORA desta pasta, como irmãs de `presentation-factory/`.**

- Derive o slug kebab-case do nome pedido (ex.: `febraban-ia-generativa-bancos`).
- Crie `<workspace>/<slug>/` — nunca dentro de `presentation-factory/`.
- Copie o template para a nova pasta, preservando `index.html` e `assets/`.
- Esta pasta é **somente leitura** para o agente ao criar decks.

## O que ler antes de agir

1. Este arquivo.
2. O `index.html` do template para entender os `{{PLACEHOLDER}}`.

Não leia tudo de uma vez. Localize o alvo e implemente.

## Onde cada coisa vai

| Item | Local |
|---|---|
| **Nova apresentação (deck HTML)** | **`<workspace>/<slug>/` — fora da factory** |
| Template ativo | `organizations/ibm/templates/ibm-febraban-template/` |
| Roteiro de referência | `organizations/ibm/presentations/febraban-ia-generativa-bancos/brief.md` |
| Logo IBM | `organizations/ibm/assets/img/logo-dark.svg` → copie para `<slug>/assets/ibm-logo.svg` |

## Template único: ibm-febraban-template

4 slides fixos para responder a **uma pergunta de visitante em feira ou evento** (Febraban, CIAB, etc.) em menos de 1 minuto.

| Slide | Layout | Função |
|---|---|---|
| 01 | `slide--cover` | Pergunta do visitante em display grande + contexto |
| 02 | Branco (dois painéis) | Visão geral do tema + 3 pontos-chave numerados |
| 03 | `slide--cases` (fundo azul) | 3 cases reais IBM com tag, título, corpo e resultado |
| 04 | `slide--closing` (split) | "Quer saber mais?" + QR code WhatsApp do especialista |

**Fluxo de criação (via script — obrigatório):**
1. Derive o slug kebab-case do tema (ex.: `governanca-ia-bancos`).
2. Escreva `tools/<slug>-valores.json` com os valores (base: `tools/valores-modelo.json`).
3. Execute: `node tools/gerar-deck.mjs <slug> tools/<slug>-valores.json`
4. Apague o JSON temporário após a geração.
5. O deck tem exatamente 4 slides — não adicione nem remova.
6. Instrua o operador a gerar `assets/qr.png` a partir de `https://wa.me/55XXXXXXXXXXX` (400×400 px, fundo branco).

## Regras inegociáveis

- Não invente logos, cores, fontes ou dados.
- Logo IBM: copie `organizations/ibm/assets/img/logo-dark.svg` para `<slug>/assets/ibm-logo.svg`.
- Sem caminhos absolutos (`/Users/`, `Desktop`, `file://`).
- Não ponha HTML executável dentro de `presentations/`.
