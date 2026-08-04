#!/usr/bin/env node
/**
 * gerar-deck.mjs
 * Uso: node tools/gerar-deck.mjs <slug> <arquivo-valores.json> [template]
 *
 * Copia um template IBM Febraban para <workspace>/<slug>/,
 * substitui todos os {{PLACEHOLDER}} pelos valores do JSON,
 * e copia os assets necessários.
 *
 * Se [template] não for fornecido, sorteia aleatoriamente entre os disponíveis.
 *
 * Exemplo:
 *   node tools/gerar-deck.mjs governanca-ia-bancos /tmp/valores.json
 *   node tools/gerar-deck.mjs governanca-ia-bancos /tmp/valores.json ibm-febraban-dark
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const FACTORY   = path.resolve(__dir, '..');
const WORKSPACE = path.resolve(FACTORY, '..');
const TEMPLATES_DIR = path.join(FACTORY, 'organizations/ibm/templates');

/** Templates disponíveis (sorteio aleatório) */
const TEMPLATES = [
  'ibm-febraban-template', // Original: barra azul lateral, cards IBM
  'ibm-febraban-dark',     // Dark Edition: fundo preto, neon azul
  'ibm-febraban-split',    // Split: metade cinza/branco, QR invertido
  'ibm-febraban-pulse',    // Pulse: cover full-azul, stripes diagonais
  'ibm-febraban-minimal',  // Minimal: tipografia-first, grid limpo
];

const [,, slug, valoresPath, templateArg] = process.argv;

if (!slug || !valoresPath) {
  console.error('Uso: node tools/gerar-deck.mjs <slug> <valores.json> [template]');
  console.error('Templates disponíveis:', TEMPLATES.join(', '));
  process.exit(1);
}

// Seleciona template: argumento fornecido ou sorteio
let templateName;
if (templateArg) {
  if (!TEMPLATES.includes(templateArg)) {
    console.error(`Template "${templateArg}" não encontrado. Disponíveis: ${TEMPLATES.join(', ')}`);
    process.exit(1);
  }
  templateName = templateArg;
} else {
  templateName = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  console.log(`🎲 Template sorteado: ${templateName}`);
}

const TEMPLATE_DIR = path.join(TEMPLATES_DIR, templateName);
const ASSETS_IBM   = path.join(FACTORY, 'organizations/ibm/assets/img/logo-dark.svg');
const DEST         = path.join(WORKSPACE, slug);
const DEST_ASSETS  = path.join(DEST, 'assets');

// Lê valores
const valores = JSON.parse(fs.readFileSync(valoresPath, 'utf8'));

// Cria pasta destino
fs.mkdirSync(DEST_ASSETS, { recursive: true });

// Copia assets do template (qr.png placeholder etc.)
const templateAssets = path.join(TEMPLATE_DIR, 'assets');
if (fs.existsSync(templateAssets)) {
  for (const f of fs.readdirSync(templateAssets)) {
    fs.copyFileSync(path.join(templateAssets, f), path.join(DEST_ASSETS, f));
  }
}

// Copia logo IBM
fs.copyFileSync(ASSETS_IBM, path.join(DEST_ASSETS, 'ibm-logo.svg'));

// Lê e processa index.html
let html = fs.readFileSync(path.join(TEMPLATE_DIR, 'index.html'), 'utf8');
for (const [chave, valor] of Object.entries(valores)) {
  html = html.replaceAll(`{{${chave}}}`, valor ?? '');
}

// Alerta placeholders não substituídos
const restantes = [...html.matchAll(/\{\{([A-Z_0-9]+)\}\}/g)].map(m => m[1]);
if (restantes.length) {
  console.warn(`⚠️  Placeholders não preenchidos: ${restantes.join(', ')}`);
}

fs.writeFileSync(path.join(DEST, 'index.html'), html, 'utf8');
console.log(`✅  Deck gerado em: ${path.relative(WORKSPACE, DEST)}/index.html`);
console.log(`🎨  Template usado: ${templateName}`);
