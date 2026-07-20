#!/usr/bin/env node
/**
 * gerar-deck.mjs
 * Uso: node tools/gerar-deck.mjs <slug> <arquivo-valores.json>
 *
 * Copia o ibm-febraban-template para <workspace>/<slug>/,
 * substitui todos os {{PLACEHOLDER}} pelos valores do JSON,
 * e copia os assets necessários.
 *
 * Exemplo:
 *   node tools/gerar-deck.mjs governanca-ia-bancos /tmp/valores.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const FACTORY = path.resolve(__dir, '..');
const WORKSPACE = path.resolve(FACTORY, '..');

const [,, slug, valoresPath] = process.argv;

if (!slug || !valoresPath) {
  console.error('Uso: node tools/gerar-deck.mjs <slug> <valores.json>');
  process.exit(1);
}

const TEMPLATE_DIR = path.join(FACTORY, 'organizations/ibm/templates/ibm-febraban-template');
const ASSETS_IBM   = path.join(FACTORY, 'organizations/ibm/assets/img/logo-dark.svg');
const DEST         = path.join(WORKSPACE, slug);
const DEST_ASSETS  = path.join(DEST, 'assets');

// Lê valores
const valores = JSON.parse(fs.readFileSync(valoresPath, 'utf8'));

// Cria pasta destino
fs.mkdirSync(DEST_ASSETS, { recursive: true });

// Copia assets do template
const templateAssets = path.join(TEMPLATE_DIR, 'assets');
for (const f of fs.readdirSync(templateAssets)) {
  fs.copyFileSync(path.join(templateAssets, f), path.join(DEST_ASSETS, f));
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
