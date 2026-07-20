#!/usr/bin/env node
/**
 * gerar-account-planning.mjs
 * Lê tools/dados-bancos.json e gera um deck HTML de account planning
 * a partir do ibm-account-planning template.
 *
 * Uso:
 *   node tools/gerar-account-planning.mjs <slug-deck> [--dados <arquivo.json>]
 *
 * Exemplo:
 *   node tools/gerar-account-planning.mjs account-planning-bancos-2024
 *
 * Saída:
 *   <workspace>/<slug-deck>/index.html  +  assets/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir  = path.dirname(fileURLToPath(import.meta.url));
const FACTORY = path.resolve(__dir, '..');
const WORKSPACE = path.resolve(FACTORY, '..');
const TEMPLATE_DIR = path.join(FACTORY, 'organizations/ibm/templates/ibm-account-planning');
const ASSETS_IBM   = path.join(FACTORY, 'organizations/ibm/assets/img/logo-dark.svg');

const args = process.argv.slice(2);
const slugIdx = args.findIndex(a => !a.startsWith('--'));
if (slugIdx === -1) { console.error('Uso: node tools/gerar-account-planning.mjs <slug-deck>'); process.exit(1); }
const slug = args[slugIdx];
const dadosFlag = args.indexOf('--dados');
const dadosPath = dadosFlag !== -1 ? path.resolve(args[dadosFlag + 1]) : path.join(__dir, 'dados-bancos.json');

if (!fs.existsSync(dadosPath)) {
  console.error(`❌  Dados não encontrados: ${dadosPath}`);
  console.error('    Execute primeiro: node tools/extrair-ri.mjs <slug> <pdf>');
  process.exit(1);
}

const { bancos, meta = {} } = JSON.parse(fs.readFileSync(dadosPath, 'utf8'));
if (!bancos || bancos.length === 0) { console.error('❌  Nenhum banco em dados-bancos.json'); process.exit(1); }

const DEST       = path.join(WORKSPACE, slug);
const DEST_ASSETS = path.join(DEST, 'assets');
fs.mkdirSync(DEST_ASSETS, { recursive: true });

// Copia assets do template + logo IBM
const tAssets = path.join(TEMPLATE_DIR, 'assets');
for (const f of fs.readdirSync(tAssets)) fs.copyFileSync(path.join(tAssets, f), path.join(DEST_ASSETS, f));
fs.copyFileSync(ASSETS_IBM, path.join(DEST_ASSETS, 'ibm-logo.svg'));

// ── Helpers ──────────────────────────────────────────────────────────────
const fmt  = v => v != null ? String(v) : '[A confirmar]';
const fmtPct = v => v != null ? (v > 0 ? `+${v}%` : `${v}%`) : '—';
const esc  = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const varClass = v => v == null ? 'val-neutral' : v > 0 ? 'val-up' : v < 0 ? 'val-down' : 'val-neutral';

const COLORS = ['blue','cyan','teal','purple','green','yellow'];
const COLORS_CSS = ['#0f62fe','#1192e8','#009d9a','#8a3ffc','#198038','#f1c21b'];
const maxVal  = (key) => Math.max(...bancos.map(b => b[key] || 0), 1);

// ── Barras de crédito ────────────────────────────────────────────────────
function buildBars(key) {
  const mx = maxVal(key);
  return bancos.map((b, i) => {
    const val = b[key];
    const pct = val != null ? Math.round((val / mx) * 100) : 0;
    const isFocal = b.focal || b.slug === meta.banco_focal;
    const bankColor = b.cor || COLORS_CSS[i % COLORS_CSS.length];
    return `<div class="bar-item${isFocal ? ' bar-item--focal' : ''}">
  <span class="bar-item__name">${esc(b.nome)}</span>
  <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${bankColor}" role="presentation"></div></div>
  <span class="bar-item__val">${val != null ? `R$ ${val}bi` : '[A confirmar]'}</span>
</div>`;
  }).join('\n');
}

// ── Tabela financeira ────────────────────────────────────────────────────
const METRICS = [
  { key: 'lucro_liquido_bi',  var: 'lucro_liquido_var',  label: 'Lucro líquido (R$ bi)' },
  { key: 'ativos_totais_bi',  var: 'ativos_totais_var',  label: 'Ativos totais (R$ bi)' },
  { key: 'roe',               var: 'roe_var',             label: 'ROE (%)' },
  { key: 'carteira_total_bi', var: 'carteira_total_var',  label: 'Carteira crédito total (R$ bi)' },
  { key: 'credito_imob_bi',   var: 'credito_imob_var',    label: 'Crédito imobiliário (R$ bi)' },
];

const tableHeaders = bancos.map(b => {
  const isFocal = b.focal || b.slug === meta.banco_focal;
  const bankColor = b.cor;
  const style = bankColor ? ` style="border-bottom-color:${bankColor}"` : '';
  return `<th scope="col" class="${isFocal ? 'focal' : ''}"${style}>${esc(b.nome)}</th>`;
}).join('');
const tableRows = METRICS.map(m => {
  const cells = bancos.map(b => {
    const isFocal = b.focal || b.slug === meta.banco_focal;
    const v = b[m.key]; const dv = b[m.var];
    return `<td class="${isFocal ? 'focal' : ''}">${fmt(v)}<br/><span class="${varClass(dv)} mono" style="font-size:.75rem">${fmtPct(dv)}</span></td>`;
  }).join('');
  return `<tr><td>${esc(m.label)}</td>${cells}</tr>`;
}).join('\n');

// ── Slides de perfil por banco ───────────────────────────────────────────

// Gráfico de barras divergentes para variações YoY
// Escala: o maior valor absoluto de variação entre todos os bancos = 50% da largura
const allVars = bancos.flatMap(b => [
  b.lucro_liquido_var, b.ativos_totais_var, b.roe_var,
  b.carteira_total_var, b.credito_imob_var
]).filter(v => v != null);
const maxAbsVar = Math.max(...allVars.map(Math.abs), 1);

function buildGrowthChart(b) {
  const rows = [
    { label: 'Lucro líquido', val: b.lucro_liquido_var },
    { label: 'Ativos totais', val: b.ativos_totais_var },
    { label: 'ROE',           val: b.roe_var },
    { label: 'Cart. crédito', val: b.carteira_total_var },
    { label: 'Créd. imob.',   val: b.credito_imob_var },
  ];
  const rowsHtml = rows.map(r => {
    if (r.val == null) {
      return `<div class="growth-row">
        <span class="growth-row__label">${esc(r.label)}</span>
        <div class="growth-track"></div>
        <span class="growth-row__val val-neutral">—</span>
      </div>`;
    }
    const pct = Math.min(Math.round((Math.abs(r.val) / maxAbsVar) * 50), 50);
    const isPos = r.val >= 0;
    return `<div class="growth-row">
        <span class="growth-row__label">${esc(r.label)}</span>
        <div class="growth-track" aria-label="${esc(r.label)}: ${fmtPct(r.val)} YoY">
          <div class="growth-bar growth-bar--${isPos ? 'pos' : 'neg'}${pct === 0 ? ' growth-bar--zero' : ''}" style="width:${pct}%" role="presentation"></div>
        </div>
        <span class="growth-row__val ${varClass(r.val)}">${fmtPct(r.val)}</span>
      </div>`;
  }).join('\n');
  return `<div class="growth-chart" role="img" aria-label="Variação YoY das métricas">
    ${rowsHtml}
    <div class="growth-legend" aria-hidden="true">
      <span class="growth-legend__item"><span class="growth-legend__dot growth-legend__dot--pos"></span>Crescimento</span>
      <span class="growth-legend__item"><span class="growth-legend__dot growth-legend__dot--neg"></span>Queda</span>
    </div>
  </div>`;
}

let profileSlides = '';
bancos.forEach((b, i) => {
  const slideNum = 5 + i;
  const kpiValues = [
    { label: 'Lucro líquido', value: b.lucro_liquido_bi != null ? `R$ ${b.lucro_liquido_bi}bi` : '[A conf.]', delta: b.lucro_liquido_var },
    { label: 'Ativos totais', value: b.ativos_totais_bi != null ? `R$ ${b.ativos_totais_bi}bi` : '[A conf.]', delta: b.ativos_totais_var },
    { label: 'ROE',           value: b.roe != null ? `${b.roe}%` : '[A conf.]',                               delta: b.roe_var },
    { label: 'Cart. crédito', value: b.carteira_total_bi != null ? `R$ ${b.carteira_total_bi}bi` : '[A conf.]', delta: b.carteira_total_var },
    { label: 'Créd. imob.',   value: b.credito_imob_bi != null ? `R$ ${b.credito_imob_bi}bi` : '[A conf.]',    delta: b.credito_imob_var },
  ];

  const kpiHtml = kpiValues.map(k => `
    <div class="bank-kpi">
      <span class="bank-kpi__value">${esc(k.value)}</span>
      <span class="bank-kpi__label">${esc(k.label)}</span>
      ${k.delta != null ? `<span class="bank-kpi__delta ${varClass(k.delta)}">${fmtPct(k.delta)} YoY</span>` : ''}
    </div>`).join('');

  const highlightHtml = (b.highlights || []).map(h => `
    <li class="highlight-item">
      <div class="highlight-item__icon" aria-hidden="true">
        <svg viewBox="0 0 12 12"><path d="M5 9.5L1.5 6 2.56 4.94 5 7.38 9.44 2.94 10.5 4z"/></svg>
      </div>
      <span class="highlight-item__text">${esc(h)}</span>
    </li>`).join('');

  const isFocal = b.focal || b.slug === meta.banco_focal;
  const bankColor  = b.cor || COLORS_CSS[i % COLORS_CSS.length];
  const bankAccent = b.cor_accent || bankColor;
  const sidebarClass = isFocal ? 'bank-sidebar' : 'bank-sidebar bank-sidebar--compare';

  // Logo do banco na sidebar (opcional)
  const logoHtml = b.logo
    ? `<img class="bank-sidebar__logo" src="${esc(b.logo)}" alt="${esc(b.nome)}">`
    : `<span class="bank-sidebar__name">${esc(b.nome)}</span>`;

  profileSlides += `
    <section class="slide slide--bank" id="slide-${slideNum}" data-slide="${slideNum}"
      aria-labelledby="s${slideNum}-title"
      style="--bank-color:${bankColor};--bank-accent:${bankAccent}">
      <div class="slide__inner" style="padding:0;max-width:none;flex-direction:row;gap:0;">
        <div class="${sidebarClass}" aria-hidden="true">
          ${logoHtml}
          <div class="bank-sidebar__accent"></div>
          <span class="bank-sidebar__period">${esc(b.periodo || meta.periodo || '')}</span>
        </div>
        <div class="bank-main">
          <header class="slide-head">
            <span class="eyebrow" style="color:${bankColor};border-color:${bankColor}">${String(slideNum).padStart(2,'0')} — ${isFocal ? 'Foco' : 'Comparativo'}</span>
            <h2 id="s${slideNum}-title" class="slide-title">${esc(b.nome)}</h2>
            <p class="slide-sub">Fonte: RI / ${esc(b.pdf || '')} · ${esc(b.periodo || meta.periodo || '')}</p>
          </header>
          <div class="bank-kpis">${kpiHtml}</div>
          <div class="bank-body">
            <div class="bank-chart">
              <span class="bank-chart__title">Crescimento YoY (%)</span>
              ${buildGrowthChart(b)}
            </div>
            <div class="bank-highlights">
              <span class="bank-highlights__title">Destaques do período</span>
              <ul class="highlight-list">${highlightHtml}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  /* fecha bank-main + slide__inner + section */
});

// ── Cards de oportunidades IBM ───────────────────────────────────────────
const oppCards = bancos.map(b => `
  <article class="opp-card" aria-labelledby="opp-${b.slug}">
    <span class="opp-card__bank">${esc(b.nome)}</span>
    <h3 class="opp-card__title" id="opp-${b.slug}">${esc(b.oportunidade_titulo || '[Oportunidade a definir]')}</h3>
    <p class="opp-card__body">${esc(b.oportunidade_corpo || '')}</p>
    <span class="opp-card__solution">${esc(b.oportunidade_solucao || '')}</span>
  </article>`).join('');

// ── Próximos passos ──────────────────────────────────────────────────────
const nextSteps = (meta.proximos_passos || [
  'Agendar reuniões de descoberta com cada conta',
  'Validar oportunidades com time de vendas IBM',
  'Preparar proposta de valor customizada por banco',
  'Definir executivo IBM sponsor por conta',
]).map((s, i) => `
  <li class="step-item">
    <span class="step-item__num">${String(i+1).padStart(2,'0')}</span>
    <span class="step-item__text">${esc(s)}</span>
  </li>`).join('');

// ── Cover bank tags ──────────────────────────────────────────────────────
const coverBankTags = bancos.map(b =>
  `<span class="cover-bank-tag">${esc(b.nome)}</span>`).join('\n');

// ── Contexto bullets ─────────────────────────────────────────────────────
const contextBullets = (meta.contexto_bullets || [
  'Setor bancário brasileiro em transformação digital acelerada',
  'Pressão crescente por eficiência operacional e redução de custos',
  'Expansão de crédito imobiliário e financiamento habitacional',
  'Regulação BACEN e LGPD exigindo governança de dados robusta',
  'Competição de fintechs e bancos digitais',
]).map(b => `
  <li class="context-bullet">
    <div class="context-bullet__dot" aria-hidden="true"></div>
    <span>${esc(b)}</span>
  </li>`).join('');

// ── Numeração dos slides dinâmicos ───────────────────────────────────────
const slideNumOpps     = 5 + bancos.length;
const slideNumClosing  = slideNumOpps + 1;
const totalSlides      = slideNumClosing;

// ── Monta HTML final ─────────────────────────────────────────────────────
const periodo = meta.periodo || bancos[0]?.periodo || '2024';
let html = fs.readFileSync(path.join(TEMPLATE_DIR, 'index.html'), 'utf8');

const replacements = {
  '{{TITULO}}':            esc(meta.titulo || 'Account Planning — Bancos'),
  '{{PERIODO}}':           esc(periodo),
  '{{TOTAL_SLIDES}}':      String(totalSlides).padStart(2,'0'),
  '{{SEGMENTO}}':          esc(meta.segmento || 'Setor Bancário Brasileiro'),
  '{{TITULO_LINHA_1}}':    esc(meta.titulo_linha_1 || 'Account Planning'),
  '{{TITULO_LINHA_2}}':    esc(meta.titulo_linha_2 || 'Setor Bancário'),
  '{{COVER_BANK_TAGS}}':   coverBankTags,
  '{{CONTEXTO_TITULO}}':   esc(meta.contexto_titulo || 'Panorama do setor bancário brasileiro'),
  '{{CONTEXTO_PANORAMA}}': esc(meta.contexto_panorama || '[Preencher com contexto macroeconômico do período]'),
  '{{CONTEXTO_BULLETS}}':  contextBullets,
  '{{FIN_TABLE_HEADERS}}': tableHeaders,
  '{{FIN_TABLE_ROWS}}':    tableRows,
  '{{BARS_CREDITO_TOTAL}}': buildBars('carteira_total_bi'),
  '{{BARS_CREDITO_IMOB}}':  buildBars('credito_imob_bi'),
  '{{BANK_PROFILE_SLIDES}}': profileSlides,
  '{{SLIDE_NUM_OPPS}}':    String(slideNumOpps),
  '{{OPP_CARDS}}':         oppCards,
  '{{SLIDE_NUM_CLOSING}}': String(slideNumClosing),
  '{{CLOSING_TITULO}}':    esc(meta.closing_titulo || 'Próximos passos e ações'),
  '{{NEXT_STEPS}}':        nextSteps,
  '{{TIME_IBM}}':          esc(meta.time_ibm || '[Time IBM responsável]'),
  '{{PERIODO_EXECUCAO}}':  esc(meta.periodo_execucao || '[Trimestre de execução]'),
  '{{FONTES}}':            esc(bancos.map(b => b.pdf || b.nome).join(', ')),
};

for (const [k, v] of Object.entries(replacements)) html = html.replaceAll(k, v);

const restantes = [...html.matchAll(/\{\{([A-Z_0-9]+)\}\}/g)].map(m => m[1]);
if (restantes.length) console.warn(`⚠️   Placeholders não substituídos: ${restantes.join(', ')}`);

fs.writeFileSync(path.join(DEST, 'index.html'), html, 'utf8');
console.log(`✅  Deck gerado: ${slug}/index.html  (${totalSlides} slides, ${bancos.length} bancos)`);
