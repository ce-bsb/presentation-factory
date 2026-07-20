#!/usr/bin/env node
/**
 * gerar-account-planning.mjs
 * Gera deck HTML de account planning a partir de valores-modelo-account-planning.json
 * usando o template ibm-account-planning (visual light, estilo resultados-bancos).
 *
 * Uso:
 *   node tools/gerar-account-planning.mjs <slug-deck> [--dados <arquivo.json>]
 *
 * Saída:
 *   <workspace>/<slug-deck>/index.html  +  assets/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir     = path.dirname(fileURLToPath(import.meta.url));
const FACTORY   = path.resolve(__dir, '..');
const WORKSPACE = path.resolve(FACTORY, '..');
const TEMPLATE_DIR = path.join(FACTORY, 'organizations/ibm/templates/ibm-account-planning');
const ASSETS_IBM   = path.join(FACTORY, 'organizations/ibm/assets/img/logo-dark.svg');

const args    = process.argv.slice(2);
const slugIdx = args.findIndex(a => !a.startsWith('--'));
if (slugIdx === -1) { console.error('Uso: node tools/gerar-account-planning.mjs <slug-deck>'); process.exit(1); }
const slug = args[slugIdx];
const dadosFlag = args.indexOf('--dados');
const dadosPath = dadosFlag !== -1 ? path.resolve(args[dadosFlag + 1]) : path.join(__dir, 'valores-modelo-account-planning.json');

if (!fs.existsSync(dadosPath)) {
  console.error(`❌  Dados não encontrados: ${dadosPath}`);
  process.exit(1);
}

const { bancos, meta = {} } = JSON.parse(fs.readFileSync(dadosPath, 'utf8'));
if (!bancos || bancos.length === 0) { console.error('❌  Nenhum banco nos dados'); process.exit(1); }

const DEST        = path.join(WORKSPACE, slug);
const DEST_ASSETS = path.join(DEST, 'assets');
fs.mkdirSync(DEST_ASSETS, { recursive: true });

// Copia assets do template + logo IBM
const tAssets = path.join(TEMPLATE_DIR, 'assets');
for (const f of fs.readdirSync(tAssets)) fs.copyFileSync(path.join(tAssets, f), path.join(DEST_ASSETS, f));
fs.copyFileSync(ASSETS_IBM, path.join(DEST_ASSETS, 'ibm-logo.svg'));

// Copia logo da Caixa se existir
const caixaLogo = path.join(FACTORY, 'clients/caixa/logo-caixa-white.png');
if (fs.existsSync(caixaLogo)) fs.copyFileSync(caixaLogo, path.join(DEST_ASSETS, 'logo-caixa.png'));

// ── Helpers ──────────────────────────────────────────────────────────────
const esc    = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fmt    = v => v != null ? String(v) : '[A confirmar]';
const fmtPct = v => v != null ? (v > 0 ? `+${v}%` : `${v}%`) : '—';
const pctClass = v => v == null ? 'kpi-neutral' : v > 0 ? 'kpi-up' : v < 0 ? 'kpi-down' : 'kpi-neutral';

const COLORS_CSS = ['#0f62fe','#1192e8','#009d9a','#8a3ffc','#198038','#f1c21b','#ff832b'];
const maxVal = (key) => Math.max(...bancos.map(b => b[key] || 0), 1);

const focal = bancos.find(b => b.focal || b.slug === meta.banco_focal) || bancos[0];

// ── Numeração de slides dinâmicos ─────────────────────────────────────────
// 1=cover, 2=contexto, 3=financeiro, 4=crédito, 5..N=banco-profiles, N+1=opps, N+2=closing
const slideNumOpps    = 5 + bancos.length;
const slideNumClosing = slideNumOpps + 1;
const totalSlides     = slideNumClosing;
const periodo = meta.periodo || bancos[0]?.periodo || '2024';

// ── Cover tags dos bancos ────────────────────────────────────────────────
const coverBankTags = bancos.map(b => {
  const isFocal = b.focal || b.slug === meta.banco_focal;
  return `<span class="cover-tag${isFocal ? ' focal' : ''}">${esc(b.nome)}</span>`;
}).join('\n');

// ── Cover focal stats (painel azul direito) ──────────────────────────────
const coverFocalStats = [
  focal.credito_imob_bi != null && {
    val:   `R$ ${focal.credito_imob_bi}<span style="font-size:.5em;opacity:.65"> bi</span>`,
    label: 'Crédito imobiliário',
    delta: focal.credito_imob_var != null ? `${fmtPct(focal.credito_imob_var)} YoY` : '',
  },
  focal.carteira_total_bi != null && {
    val:   `R$ ${focal.carteira_total_bi}<span style="font-size:.5em;opacity:.65"> bi</span>`,
    label: 'Carteira de crédito total',
    delta: focal.carteira_total_var != null ? `${fmtPct(focal.carteira_total_var)} YoY` : '',
  },
  focal.lucro_liquido_bi != null && {
    val:   `R$ ${focal.lucro_liquido_bi}<span style="font-size:.5em;opacity:.65"> bi</span>`,
    label: 'Lucro líquido',
    delta: focal.lucro_liquido_var != null ? `${fmtPct(focal.lucro_liquido_var)} YoY` : '',
  },
].filter(Boolean).map(s => `
  <div class="cover-stat">
    <span class="cover-stat__val">${s.val}</span>
    <span class="cover-stat__label">${esc(s.label)}</span>
    ${s.delta ? `<span class="cover-stat__delta">${esc(s.delta)}</span>` : ''}
  </div>`).join('');

// ── Contexto cards ───────────────────────────────────────────────────────
const contextoBullets = meta.contexto_bullets || [];
const contextoCards = contextoBullets.slice(0, 4).map((b, i) => {
  const kickers = ['Tendência', 'Regulação', 'Tecnologia', 'Competição', 'Estratégia'];
  return `<div class="intro-card">
  <span class="intro-card__kicker">${esc(kickers[i] || `Fator ${i+1}`)}</span>
  <h3 class="intro-card__title">${esc(b)}</h3>
  <p class="intro-card__body"></p>
</div>`;
}).join('\n');

// ── Barras financeiras (slide 03 — Lucro Líquido) ────────────────────────
function buildBarRows(key, unit, focusBanco) {
  const sorted = [...bancos].sort((a, b) => (b[key] || 0) - (a[key] || 0));
  const mx = maxVal(key);
  const rankClasses = ['rank-1','rank-2','rank-3','rank-4','rank-5'];
  return sorted.map((b, i) => {
    const val = b[key];
    const pct = val != null ? Math.round((val / mx) * 100) : 0;
    const isFocal = b.focal || b.slug === meta.banco_focal;
    const bankColor = b.cor || COLORS_CSS[bancos.indexOf(b) % COLORS_CSS.length];
    const badgeHtml = isFocal ? `<span class="focal-badge">${esc(b.nome.split(' ')[0])}</span>` : `<small>${esc(b.tipo || 'Banco')}</small>`;
    return `<div class="bar-row${isFocal ? ' hl' : ''}">
  <div class="rank ${rankClasses[i] || 'rank-4'}">${i+1}</div>
  <div class="bname"><strong>${esc(b.nome)}</strong>${badgeHtml}</div>
  <div class="bar-track"><div class="bar-fill" style="--bw:${pct}%;background:${bankColor}"></div></div>
  <div class="bval">${val != null ? val : '—'}<small>${esc(unit)}</small></div>
</div>`;
  }).join('\n');
}

// Insight financeiro (lucro líquido)
function buildFinInsight() {
  const sorted = [...bancos].sort((a,b)=>(b.lucro_liquido_bi||0)-(a.lucro_liquido_bi||0));
  const f = sorted.find(b => b.focal || b.slug === meta.banco_focal);
  if (!f) return 'Comparativo dos principais indicadores financeiros do período.';
  const rank = sorted.indexOf(f) + 1;
  const delta = f.lucro_liquido_var != null ? `, crescimento de <strong>${fmtPct(f.lucro_liquido_var)} YoY</strong>` : '';
  return `A <strong>${esc(f.nome)}</strong> registrou <strong>R$ ${f.lucro_liquido_bi} bilhões de lucro líquido</strong>${delta}. Posicionamento <strong>${rank}º lugar</strong> no comparativo entre os bancos analisados.`;
}

// Insight crédito
function buildCreditInsight() {
  const sorted = [...bancos].sort((a,b)=>(b.carteira_total_bi||0)-(a.carteira_total_bi||0));
  const f = sorted.find(b => b.focal || b.slug === meta.banco_focal);
  if (!f) return 'Comparativo das carteiras de crédito total do período.';
  const rank = sorted.indexOf(f) + 1;
  const delta = f.carteira_total_var != null ? ` com crescimento de <strong>${fmtPct(f.carteira_total_var)} YoY</strong>` : '';
  return `A <strong>${esc(f.nome)}</strong> possui carteira total de <strong>R$ ${f.carteira_total_bi} bilhões</strong>${delta}, ocupando o <strong>${rank}º lugar</strong> no setor. ${f.credito_imob_bi != null ? `O crédito imobiliário representa <strong>R$ ${f.credito_imob_bi} bi</strong> desta carteira.` : ''}`;
}

// ── Slides de perfil de banco ─────────────────────────────────────────────
function buildGrowthRows(b) {
  const metrics = [
    { label:'Lucro líquido', val: b.lucro_liquido_var },
    { label:'Ativos totais',  val: b.ativos_totais_var },
    { label:'ROE',            val: b.roe_var },
    { label:'Cart. crédito',  val: b.carteira_total_var },
    { label:'Créd. imob.',    val: b.credito_imob_var },
  ];
  const allVals = metrics.map(m=>m.val).filter(v=>v!=null);
  const maxAbs  = Math.max(...allVals.map(Math.abs), 1);
  return metrics.map(m => {
    if (m.val == null) return `<div class="growth-row">
  <span class="growth-row__label">${esc(m.label)}</span>
  <div class="growth-track"></div>
  <span class="growth-val kpi-neutral">—</span>
</div>`;
    const pct = Math.min(Math.round((Math.abs(m.val)/maxAbs)*50), 50);
    const isPos = m.val >= 0;
    return `<div class="growth-row">
  <span class="growth-row__label">${esc(m.label)}</span>
  <div class="growth-track">
    <div class="growth-bar growth-bar--${isPos ? 'pos' : 'neg'}" data-w="${pct}%" style="width:0%"></div>
  </div>
  <span class="growth-val ${pctClass(m.val)}">${fmtPct(m.val)}</span>
</div>`;
  }).join('\n');
}

let bankProfileSlides = '';
bancos.forEach((b, i) => {
  const slideNum = 5 + i;
  const isFocal  = b.focal || b.slug === meta.banco_focal;
  const bankColor  = b.cor  || COLORS_CSS[i % COLORS_CSS.length];
  const bankAccent = b.cor_accent || bankColor;
  const isCompare  = !isFocal;

  const kpis = [
    { label:'Lucro líquido', value: b.lucro_liquido_bi != null ? `R$ ${b.lucro_liquido_bi}<sup> bi</sup>` : '—', delta: b.lucro_liquido_var },
    { label:'Ativos totais',  value: b.ativos_totais_bi != null ? `R$ ${b.ativos_totais_bi}<sup> bi</sup>` : '—',  delta: b.ativos_totais_var },
    { label:'ROE',            value: b.roe != null ? `${b.roe}<sup> %</sup>` : '—', delta: b.roe_var },
    { label:'Cart. crédito',  value: b.carteira_total_bi != null ? `R$ ${b.carteira_total_bi}<sup> bi</sup>` : '—', delta: b.carteira_total_var },
    { label:'Créd. imob.',    value: b.credito_imob_bi != null ? `R$ ${b.credito_imob_bi}<sup> bi</sup>` : '—', delta: b.credito_imob_var },
  ];

  const kpiHtml = kpis.map(k => `<div class="kpi-cell">
  <div class="kpi-label">${esc(k.label)}</div>
  <div class="kpi-value">${k.value}</div>
  ${k.delta != null ? `<div class="kpi-delta ${pctClass(k.delta)}">${fmtPct(k.delta)} YoY</div>` : ''}
</div>`).join('');

  const highlightsHtml = (b.highlights || []).map(h => `<li class="highlight-item">
  <div class="highlight-item__icon" aria-hidden="true">
    <img src="assets/icon-checkmark.svg" alt="">
  </div>
  <span class="highlight-item__text">${esc(h)}</span>
</li>`).join('');

  const dataSlide = String(slideNum).padStart(2,'0');
  bankProfileSlides += `
    <section class="slide bank-slide" id="slide-${slideNum}" data-slide="${dataSlide}" data-n="${dataSlide} / ${String(totalSlides).padStart(2,'0')}"
      style="--bank-color:${bankColor};--bank-accent:${bankAccent}">
      <div class="bank-inner">
        <div class="bank-side-accent" aria-hidden="true"></div>
        <div class="bank-head">
          <div class="bank-head-left">
            <span class="bank-kicker">${String(slideNum).padStart(2,'0')} — ${isFocal ? 'Banco focal' : 'Comparativo'}</span>
            <h2 class="bank-title">${esc(b.nome)}</h2>
          </div>
          <span class="bank-period">${esc(b.periodo || meta.periodo || periodo)}</span>
        </div>
        <div class="bank-kpis">
          ${kpiHtml}
        </div>
        <div class="bank-body">
          <div class="bank-body-col">
            <span class="bank-body-col__title">Crescimento YoY (%)</span>
            <div class="growth-list">
              ${buildGrowthRows(b)}
            </div>
          </div>
          <div class="bank-body-col">
            <span class="bank-body-col__title">Destaques do período</span>
            <ul class="highlight-list">
              ${highlightsHtml}
            </ul>
          </div>
        </div>
      </div>
    </section>`;
});

// ── Opp cards ─────────────────────────────────────────────────────────────
const oppCards = bancos.map(b => `
  <article class="opp-card">
    <span class="opp-card__bank">${esc(b.nome)}</span>
    <h3 class="opp-card__title">${esc(b.oportunidade_titulo || '[Oportunidade a definir]')}</h3>
    <p class="opp-card__body">${esc(b.oportunidade_corpo || '')}</p>
    <span class="opp-card__solution">${esc(b.oportunidade_solucao || '')}</span>
  </article>`).join('');

// ── Closing cards e KPIs ──────────────────────────────────────────────────
const nextSteps = meta.proximos_passos || [
  'Agendar discovery sessions com CTO/CIO de cada conta',
  'Mapear iniciativas de tecnologia vs. portfólio IBM',
  'Preparar proposta de valor customizada por banco',
  'Definir executivo IBM sponsor e equipe de conta',
  'Revisão trimestral do account plan com liderança IBM Brasil',
];

const closingCards = nextSteps.slice(0, 3).map((s, i) => {
  const kickers = ['Descoberta','Proposta','Execução'];
  return `<div class="closing-card">
  <span class="closing-card__kicker">${esc(kickers[i] || `Passo ${i+1}`)}</span>
  <h3 class="closing-card__title">${esc(s)}</h3>
  <p class="closing-card__body">${nextSteps[i+3] ? esc(nextSteps[i+3]) : ''}</p>
</div>`;
}).join('');

const closingKpis = [
  { label:'Banco focal',          value: esc(focal.nome), sup:'',     desc:`${esc(meta.periodo_execucao || periodo)}` },
  { label:'Período de execução',  value: esc(meta.periodo_execucao || 'Q1–Q2'), sup:'', desc:'Account Planning ativo' },
  { label:'Fontes analisadas',    value: String(bancos.length), sup:' bancos', desc: esc(bancos.map(b=>b.nome).join(' · ')) },
].map(k => `<div class="closing-kpi">
  <div class="closing-kpi__label">${k.label}</div>
  <div class="closing-kpi__value">${k.value}<sup>${k.sup}</sup></div>
  <div class="closing-kpi__desc">${k.desc}</div>
</div>`).join('');

// ── Substitui placeholders no template ───────────────────────────────────
let html = fs.readFileSync(path.join(TEMPLATE_DIR, 'index.html'), 'utf8');

const replacements = {
  '{{TITULO}}':             esc(meta.titulo || 'Account Planning'),
  '{{PERIODO}}':            esc(periodo),
  '{{TOTAL_SLIDES}}':       String(totalSlides).padStart(2,'0'),
  '{{SEGMENTO}}':           esc(meta.segmento || 'Setor Bancário'),
  '{{TITULO_LINHA_1}}':     esc(meta.titulo_linha_1 || 'Account Planning'),
  '{{TITULO_LINHA_2}}':     esc(meta.titulo_linha_2 || 'Setor Bancário'),
  '{{COVER_BANK_TAGS}}':    coverBankTags,
  '{{COVER_FOCAL_STATS}}':  coverFocalStats,
  '{{CONTEXTO_TITULO}}':    esc(meta.contexto_titulo || 'Panorama do setor'),
  '{{CONTEXTO_PANORAMA}}':  esc(meta.contexto_panorama || ''),
  '{{CONTEXTO_CARDS}}':     contextoCards,
  '{{FIN_BAR_ROWS}}':       buildBarRows('lucro_liquido_bi', 'R$ bi'),
  '{{FIN_INSIGHT}}':        buildFinInsight(),
  '{{CREDIT_BAR_ROWS}}':    buildBarRows('carteira_total_bi', 'R$ bi'),
  '{{CREDIT_INSIGHT}}':     buildCreditInsight(),
  '{{BANK_PROFILE_SLIDES}}': bankProfileSlides,
  '{{SLIDE_NUM_OPPS}}':     String(slideNumOpps).padStart(2,'0'),
  '{{OPP_CARDS}}':          oppCards,
  '{{SLIDE_NUM_CLOSING}}':  String(slideNumClosing).padStart(2,'0'),
  '{{CLOSING_TITULO}}':     esc(meta.closing_titulo || 'Próximos passos e ações prioritárias'),
  '{{CLOSING_CARDS}}':      closingCards,
  '{{CLOSING_KPIS}}':       closingKpis,
};

for (const [k, v] of Object.entries(replacements)) html = html.replaceAll(k, v);

const restantes = [...html.matchAll(/\{\{([A-Z_0-9]+)\}\}/g)].map(m => m[1]);
if (restantes.length) console.warn(`⚠️   Placeholders não substituídos: ${restantes.join(', ')}`);

fs.writeFileSync(path.join(DEST, 'index.html'), html, 'utf8');
console.log(`✅  Deck gerado: ${slug}/index.html  (${totalSlides} slides, ${bancos.length} bancos)`);
