#!/usr/bin/env node
/**
 * extrair-ri.mjs
 * Lê um ou mais PDFs de RI (Relações com Investidores) e produz um JSON
 * estruturado com os dados financeiros de cada banco, pronto para ser
 * consumido por gerar-account-planning.mjs.
 *
 * Uso:
 *   node tools/extrair-ri.mjs <banco-slug> <arquivo.pdf> [<banco2-slug> <arquivo2.pdf> ...]
 *
 * Exemplo:
 *   node tools/extrair-ri.mjs \
 *     caixa    ~/Downloads/caixa-ri-2024.pdf \
 *     bradesco ~/Downloads/bradesco-ri-2024.pdf
 *
 * Saída:
 *   tools/dados-bancos.json  (criado/atualizado)
 *
 * Dependências: apenas Node.js built-ins + leitura de PDF via read_file do Bob.
 * O script imprime instruções para o agente extrair os dados manualmente quando
 * a extração automática não for possível.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dir, 'dados-bancos.json');

const args = process.argv.slice(2);
if (args.length === 0 || args.length % 2 !== 0) {
  console.error('Uso: node tools/extrair-ri.mjs <slug> <pdf> [<slug2> <pdf2> ...]');
  console.error('Exemplo: node tools/extrair-ri.mjs caixa ~/Downloads/caixa-ri.pdf');
  process.exit(1);
}

// Carrega dados existentes (para merge incremental)
let dados = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, 'utf8')) : { bancos: [] };

for (let i = 0; i < args.length; i += 2) {
  const slug = args[i];
  const pdfPath = path.resolve(args[i + 1]);

  if (!fs.existsSync(pdfPath)) {
    console.error(`❌  Arquivo não encontrado: ${pdfPath}`);
    process.exit(1);
  }

  console.log(`\n📄  Processando: ${slug} → ${path.basename(pdfPath)}`);
  console.log('─'.repeat(60));

  // Estrutura de dados esperada para cada banco
  const entrada = {
    slug,
    nome: slug.toUpperCase(),          // será refinado pelo agente
    pdf: path.basename(pdfPath),
    periodo: "[extrair do PDF]",
    // ── Financeiro ──
    lucro_liquido_bi:    null,         // R$ bilhões
    lucro_liquido_var:   null,         // % YoY
    ativos_totais_bi:    null,
    ativos_totais_var:   null,
    roe:                 null,         // %
    roe_var:             null,
    // ── Crédito ──
    carteira_total_bi:   null,
    carteira_total_var:  null,
    credito_imob_bi:     null,
    credito_imob_var:    null,
    // ── Destaques narrativos ──
    highlights: [
      "[Destaque 1 extraído do RI]",
      "[Destaque 2 extraído do RI]",
      "[Destaque 3 extraído do RI]"
    ],
    // ── Oportunidade IBM (preenchida pelo analista) ──
    oportunidade_titulo: "[Oportunidade IBM identificada]",
    oportunidade_corpo:  "[Contexto da oportunidade baseado nos gaps do RI]",
    oportunidade_solucao:"[Produto/solução IBM recomendada]"
  };

  // Remove banco se já existia (merge)
  dados.bancos = dados.bancos.filter(b => b.slug !== slug);
  dados.bancos.push(entrada);

  console.log(`⚠️   Leia o PDF "${path.basename(pdfPath)}" e preencha os campos abaixo em tools/dados-bancos.json:`);
  console.log(`     Banco: ${slug}`);
  console.log(`     Campos: lucro_liquido_bi, ativos_totais_bi, roe, carteira_total_bi, credito_imob_bi`);
  console.log(`             (variações _var em % YoY), highlights[0..2], oportunidade_*`);
}

fs.writeFileSync(OUTPUT, JSON.stringify(dados, null, 2), 'utf8');
console.log(`\n✅  Estrutura criada em: tools/dados-bancos.json`);
console.log(`    Abra o arquivo, leia os PDFs e preencha os campos [extrair do PDF].`);
console.log(`    Depois execute: node tools/gerar-account-planning.mjs <slug-deck>`);
