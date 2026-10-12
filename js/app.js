/* app.js · Harbour Culture Lens
   Behaviour only. All content comes from data.js (loaded first).
   No libraries, no network calls, no build step. Fictional teaching material (H9LOCHFFT). */
'use strict';

/* ============ 1. Small helpers ============ */

const $ = (selector) => document.querySelector(selector);

const typeFilter = $('#filter-type');   // observed / claimed / inferred
const explFilter = $('#filter-expl');   // A / B / neither
const state = { martinView: null };     // remembers which Martin view is open when filters change

/* Evidence passing the current filters. */
function visibleEvidence() {
  return EVIDENCE.filter((e) =>
    (!typeFilter.value || e.t === typeFilter.value) &&
    (!explFilter.value || e.ex === explFilter.value));
}

/* Small tag pills under a card: Schein level, Martin views, explanation. */
function chipsHtml(e) {
  const views = e.mv.map((m) => `<span class="chip">${MV[m]}</span>`).join('');
  return `<span class="chip">${LV[e.lv]}</span>${views}<span class="chip">${EXL[e.ex]}</span>`;
}

/* One evidence card. The type label is always shown with the evidence. */
function cardHtml(e) {
  return `<article class="card">
    <span class="t ${e.t}">${e.t}</span> <b>${e.h}</b>
    <q>${e.q}</q>
    <div>${chipsHtml(e)}</div>
    <div class="src">Source: ${e.s}</div>
  </article>`;
}

const cardsFor = (items) => items.map(cardHtml).join('');

/* ============ 2. One render function per tab ============ */

/* Tab 1: Schein. Evidence grouped by level, plus the gap between the levels. */
function renderSchein(items) {
  const levels = Object.keys(LV).map((k) => `
    <div class="lvl"><h3>${LV[k]}</h3>
      <div class="grid">${cardsFor(items.filter((e) => e.lv === k)) ||
        '<p class="mu">Nothing at this level for the current filter.</p>'}</div>
    </div>`).join('');

  $('#panel-0').innerHTML = `
    <h2>Schein: where does the evidence sit?</h2>
    <p class="mu">Placing an item at a level is itself an inference. The interesting part is the distance between levels.</p>
    ${levels}
    <div class="gap"><b>Gap (inferred):</b> the espoused value (item 1) says "until the merchant is helped";
    the artefacts (items 2 and 12) measure and reward "closed". The assumption people act on (items 3, 17)
    is a closed case is a helped merchant. A reader who only read the wall would miss it.</div>`;
}

/* Tab 2: Martin. Same evidence, three readings. Buttons switch the reading. */
function renderMartin(items) {
  $('#panel-1').innerHTML = `
    <h2>Martin: three readings of the same evidence</h2>
    <p class="mu">Pick a view. The evidence is the same; what it means changes.</p>
    <div class="bar" role="group" aria-label="Martin view">
      ${Object.keys(MV).map((k) =>
        `<button class="mvb" data-k="${k}" aria-pressed="${state.martinView === k}">${MV[k]}</button>`).join('')}
    </div>
    <div id="martin-out"></div>`;

  const show = (k) => {
    state.martinView = k;
    document.querySelectorAll('.mvb').forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === k));
    const [title, reading, hides] = MARTIN[k];
    $('#martin-out').innerHTML = `
      <div class="gap"><b>${title}</b>
        <p>${reading} <span class="t inferred">inferred</span></p>
        <p class="mu">${hides}</p></div>
      <div class="grid">${cardsFor(items.filter((e) => e.mv.includes(k)))}</div>`;
  };
  document.querySelectorAll('.mvb').forEach((b) => (b.onclick = () => show(b.dataset.k)));
  if (state.martinView) show(state.martinView);
}

/* Tab 3: one power asymmetry. Static. Bars are drawn with plain divs (no chart library). */
function renderPower() {
  const bars = (values, cls) => values.map((n) => `<div class="b ${cls}" style="width:${n / 12}px" title="${n}"></div>`).join('');
  const last = (a) => a[a.length - 1];

  $('#panel-2').innerHTML = `
    <h2>One power asymmetry: whoever writes the rule is not whoever pays</h2>
    <p class="gap"><b>Draft choice, yours to confirm or swap.</b> The rule is set by operations and applied by early handlers' closures,
    but the cost of a reopen is charged to the <i>next</i> shift. Late-shift staff asked to change it and were told to wait.</p>
    <p><b>Observed:</b> of all reopens in the record, 484 were closed by early and charged to late; 163 were closed by late
    and charged to early (cases.csv · dispute, reopened_at not blank, group by shift and reopen_charged_to).</p>
    <p>Weekly award points, 22 Jun to 7 Sep (shift_board.csv · award_points; the pilot starts at the 7th bar):</p>
    <div class="row"><b>Early</b>${bars(AWARD_EARLY, '')}<span>${AWARD_EARLY[0]} → ${last(AWARD_EARLY)}</span></div>
    <div class="row"><b>Late</b>${bars(AWARD_LATE, 'l')}<span>${AWARD_LATE[0]} → ${last(AWARD_LATE)}</span></div>
    <div class="grid">${cardsFor(EVIDENCE.filter((e) => [5, 6, 15].includes(e.id)))}</div>
    <p class="mu">Merchants hold the least power: they cannot see case status, only the email and the portal word "Closed" (inferred).</p>`;
}

/* Tab 4: the two competing explanations and the deciding observation. Static plus a radio-driven verdict. */
function renderExplanations() {
  const outcomes = [['b', 'falls to about 6.5%'], ['m', 'falls part of the way'], ['h', 'stays near 17%']]
    .map(([v, text]) => `<label><input type="radio" name="outcome" value="${v}"> ${text}</label> `).join('');

  $('#panel-3').innerHTML = `
    <h2>Two explanations of the doubled reopen rate</h2>
    <div class="grid">
      <div class="card"><b>A · The reward rule</b>
        <p>Predicts: handlers avoid reopening; nearly-right drafts get closed; cost lands on the late shift.</p>
        <p>Fits (observed): handler reopens 2.0% → 0.3%; "tomorrow" notes; 484 vs 163 charged.</p>
        <p>Cannot explain alone: the rule existed before the pilot, when merchant reopens were 7.0% (73 of 1,044).</p></div>
      <div class="card"><b>B · Vendor template wording</b>
        <p>Predicts: merchant reopens jump with the "resolved" line, not before it.</p>
        <p>Fits (observed): table below.</p>
        <p>Cannot explain alone: 19 system reopens already appeared before the wording changed, and the handler drop.</p></div>
    </div>
    <h3>Early shift, merchant-reopened within 14 days (cases.csv + ai_drafts.csv)</h3>
    <table>
      <tr><th>Group</th><th>Cases</th><th>Merchant reopened</th></tr>
      <tr><td>Before pilot (no AI)</td><td>1,044</td><td>7.0%</td></tr>
      <tr><td>AI draft, no "resolved" line (v2.3)</td><td>369</td><td>6.5%</td></tr>
      <tr><td>AI draft, line removed by handler</td><td>125</td><td>2.4%</td></tr>
      <tr><td>AI draft, line left in</td><td>646</td><td>17.6%</td></tr>
    </table>
    <p class="gap"><b>Caution (inferred):</b> handlers who deleted the line chose to. They may also be the more careful ones,
    so the 2.4% vs 17.6% gap fits B but cannot separate it from A. The 50 system reopens (item 14) fit neither.</p>
    <h3>The one observation that would tell them apart <span class="mu">(draft, yours to confirm)</span></h3>
    <p>Remove the "resolved" line from <b>every</b> early-shift reply for one week, so handlers do not choose, and keep the award
    rule unchanged. What happens to merchant reopens, currently 17.6% where the line is left in?</p>
    <fieldset><legend>If the result were…</legend>${outcomes}</fieldset>
    <div class="verdict" id="verdict" aria-live="polite">Pick an outcome to see what it would mean.</div>`;

  document.querySelectorAll('[name=outcome]').forEach((r) =>
    (r.onchange = () => ($('#verdict').textContent = VERDICTS[r.value])));
}

/* Tab 5: limits of the record. Static. */
function renderLimits() {
  $('#panel-4').innerHTML = `
    <h2>What the record cannot say</h2>
    <ul>
      <li>Why a handler closed a case. The record shows what was done and what was said, never intent (item 3 is a claim).</li>
      <li>Whether removing the line causes fewer reopens, or careful handlers remove it (see Two explanations).</li>
      <li>How many unhappy merchants never reopened. 289 of 311 enquiries have no linked dispute (cases.csv · case_type=enquiry, linked_case_id blank), so they are not counted as reopens.</li>
      <li>Satisfaction after the reopen: the survey is sent one hour after first close and not again (DATA-DICTIONARY.md · csat_survey.csv).</li>
      <li>Other support topics (payouts, terminals, onboarding): not in this export.</li>
      <li>The vendor contract cost (session-1-evidence.md, open questions).</li>
    </ul>`;
}

/* ============ 3. Wiring: filters and tabs ============ */

/* Only tabs 1 and 2 use the filters, so only those re-render when a filter changes. */
function renderFiltered() {
  const items = visibleEvidence();
  $('#count').textContent = `${items.length} of ${EVIDENCE.length} evidence items shown`;
  renderSchein(items);
  renderMartin(items);
}

/* Show one tab. Hides the filter bar on tabs that do not use it. */
function selectTab(index) {
  [...$('#tablist').children].forEach((btn, i) => {
    btn.setAttribute('aria-selected', i === index);
    btn.tabIndex = i === index ? 0 : -1;
    $(`#panel-${i}`).hidden = i !== index;
  });
  $('#filters').hidden = index > 1;
}

/* Build the tab buttons (with left/right arrow-key support). */
function buildTabs() {
  const tablist = $('#tablist');
  TABS.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.id = `tab-${i}`;
    btn.textContent = name;
    btn.setAttribute('aria-controls', `panel-${i}`);
    btn.onclick = () => selectTab(i);
    btn.onkeydown = (ev) => {
      const step = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      const next = (i + step + TABS.length) % TABS.length;
      selectTab(next);
      $(`#tab-${next}`).focus();
    };
    tablist.append(btn);
  });
}

/* ============ 4. Start-up ============ */
typeFilter.onchange = explFilter.onchange = renderFiltered;
buildTabs();
renderFiltered();
renderPower();
renderExplanations();
renderLimits();
selectTab(0);
