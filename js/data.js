/* data.js · Harbour Culture Lens
   All content lives here so the app code (app.js) stays short.
   Every item names its source (file + filter) so a reader can rebuild the number.
   Fictional teaching material (H9LOCHFFT, Harbour Payments). Nothing here describes a real firm.

   EVIDENCE fields:
     id    number shown in the page and used in cross-references
     t     evidence type: observed | claimed | inferred
     lv    Schein level: art (artefacts) | val (espoused values) | ass (basic assumptions)
     mv    Martin views it supports: int | dif | fra
     ex    which explanation it bears on: A (reward rule) | B (template wording) | N (neither or both)
     h     short heading     q  the verbatim quote or the figure     s  where it comes from
   The level, view and explanation tags are OUR coding (inferred), not part of the pack. */

/* ---------- The evidence items ---------- */
const EVIDENCE=[
{id:1,t:'observed',lv:'val',mv:['int'],ex:'N',h:'The published value',q:'Take ownership until the merchant is helped.',s:'documents/staff-handbook-award-rule.md · "On the office wall and in every job advert"'},
{id:2,t:'observed',lv:'art',mv:['int'],ex:'A',h:'The award rule',q:'The award counts cases closed per shift. A case that is reopened is charged to the next shift, not to the shift that closed it.',s:'documents/staff-handbook-award-rule.md · Section 7.2'},
{id:3,t:'claimed',lv:'ass',mv:['dif'],ex:'A',h:'Jamie Walsh, early handler',q:'If I reopen a case, my shift looks worse. So when the agent\'s draft looks nearly right, I close it and leave a note for tomorrow.',s:'data/team_chat.jsonl · 2026-09-10T15:12 (also session-1 card E4)'},
{id:4,t:'observed',lv:'art',mv:['dif'],ex:'A',h:'The pattern behind Jamie\'s words',q:'Early-shift handlers reopened 21 disputes before the pilot (2.0%) and 3 during it (0.3%). 46 internal notes on early cases mention "tomorrow" (Jamie 19, Aoife 15, Darragh 12); 23 of those 46 cases were later reopened.',s:'cases.csv · case_type=dispute, shift=early, reopened_by=handler, reopen ≤14d of closed_at · messages.jsonl · channel=internal, body contains "tomorrow"'},
{id:5,t:'claimed',lv:'art',mv:['int'],ex:'A',h:'Tomás Byrne, on charging system reopens',q:'Same rule as always, next shift.',s:'data/team_chat.jsonl · 2026-07-30T11:41, answering whether auto-reopens are charged to the next shift'},
{id:6,t:'claimed',lv:'ass',mv:['dif','fra'],ex:'A',h:'Siobhán Murphy (late) and the reply',q:'Late is getting hammered for closures we never touched.',s:'data/team_chat.jsonl · 2026-08-26T15:40. Priya Nair replied at 17:55: "Sorry, meetings most of today. Can we pick this up next week?"'},
{id:7,t:'observed',lv:'art',mv:['fra'],ex:'B',h:'Vendor 2.4 and the internal handoff',q:'Warmer, more conclusive closing language. … Nothing for us to do.',s:'documents/dispute-assist-release-notes.md (v2.4, 17 Aug 10:00) and documents/email-vendor-update.md (Oisín Kelly to Tomás Byrne, 09:58)'},
{id:8,t:'claimed',lv:'art',mv:['fra'],ex:'B',h:'Jamie Walsh, the day after 2.4',q:'We haven\'t heard from the bank on most of these. Is that ok to send?',s:'data/team_chat.jsonl · 2026-08-18T13:47. Aoife Brennan, 24 Aug: "I\'ve started deleting the \'resolved\' line from decision drafts."'},
{id:9,t:'observed',lv:'art',mv:['dif','fra'],ex:'B',h:'Who got "resolved", and when',q:'646 outbound emails say the dispute "has been resolved": all early shift, all AI-assisted, none sent after a bank decision was known. 125 of 771 drafts with the line had it removed by the handler.',s:'messages.jsonl · direction=outbound, body contains "your dispute has been resolved" · ai_drafts.csv · draft_type starts "decision", closing_line_in_draft not blank, sent_msg_id → messages.jsonl'},
{id:10,t:'claimed',lv:'art',mv:['dif'],ex:'B',h:'Merchant on the phone',q:'The word resolved was wrong, yes.',s:'calls/CALL-008.md · Siobhán Murphy to Lorcan Walsh, Aura Salon, 2026-09-02'},
{id:11,t:'claimed',lv:'art',mv:['dif'],ex:'B',h:'The café owner',q:'The email said my dispute was resolved. It wasn\'t. I use a screen reader, the letter was a scanned PDF, and they only take calls at lunchtime, my busiest hour.',s:'session-1-evidence.md E6 · data/messages.jsonl ENQ-9257 · all 1,504 drafts use attachment_format=scanned_pdf_image · documents/phone-line-hours.md'},
{id:12,t:'observed',lv:'art',mv:['int'],ex:'N',h:'The dashboard, as chosen',q:'First response 26h → 4h; closed per shift 31 → 44; satisfaction 4.1 → 4.3 (212 replies). Reopen rate not shown.',s:'documents/pilot-dashboard.md · reproduced from cases.csv (median opened_at→first_response_at) and csat_survey.csv (early, pilot, mean 4.28 vs 4.12)'},
{id:13,t:'observed',lv:'art',mv:['dif'],ex:'N',h:'What the dashboard left out: the late shift',q:'Late shift (no AI) reopen rate 10.1% → 10.4%, but median first response 29.0h → 35.3h and satisfaction 4.02 → 3.81.',s:'cases.csv · dispute, shift=late, opened_at before/after 2026-08-03 · csat_survey.csv · shift=late'},
{id:14,t:'observed',lv:'art',mv:['fra'],ex:'N',h:'A third cause neither explanation covers',q:'Rule outcome_sync reopens a Closed case automatically when a bank outcome of lost or pre-arbitration arrives. 50 early-shift reopens (4.4%) were made by the system: 44 lost, 6 pre-arbitration.',s:'documents/integration-change-log.md CHG-0412 · cases.csv · reopened_by=system, shift=early, opened_at ≥ 2026-08-03'},
{id:15,t:'claimed',lv:'ass',mv:['fra'],ex:'N',h:'Priya Nair, the only approver',q:'Reversing a draft that has already gone out needs me, and I\'m in meetings for about half of every shift. By the time I see a request, the handler has usually moved on.',s:'session-1-evidence.md E7 · reversal_requests.csv: 35 requests, 8 "too_late_merchant_already_replied"; 18 made while Priya was in a meeting (median wait 70 vs 38 min) · priya_calendar.csv'},
{id:16,t:'claimed',lv:'art',mv:['dif'],ex:'B',h:'A merchant leaving',q:'Told a dispute was resolved when it wasn\'t.',s:'data/merchants.csv · closure_reason (as typed by staff). 13 of 27 closed accounts give a reason that mentions disputes, support, complaints or hassle.'},
{id:17,t:'inferred',lv:'ass',mv:['int'],ex:'A',h:'Inferred assumption 1 (yours to confirm)',q:'A closed case is a helped merchant.',s:'Not said by anyone. Inferred from items 2, 3 and 12: the award and the dashboard both count closures, and "helped" is never measured.'},
{id:18,t:'inferred',lv:'ass',mv:['dif'],ex:'B',h:'Inferred assumption 2 (yours to confirm)',q:'"Resolved" means the money is coming back.',s:'Not said in the abstract. Inferred from item 10 and the merchant calls CALL-001, 002, 004, 008, 010 (merchants acted on the word, then found the amount still held).'}];
/* ---------- Lookup tables: codes to display labels ---------- */
const LV={art:'Artefacts',val:'Espoused values',ass:'Basic assumptions'},MV={int:'Integration',dif:'Differentiation',fra:'Fragmentation'},EXL={A:'A · reward rule',B:'B · template wording',N:'neither / both'};
/* ---------- Tab names, and the three Martin readings: [title, reading, what the view hides].
   The readings are interpretation (inferred), written by the author. ---------- */
const TABS=['Schein: three levels','Martin: three views','Power','Two explanations','What the record can\'t say'];
const MARTIN={int:['Integration: one shared culture','Everyone is pulling the same way: the wall, the award, the dashboard and the team\'s own "Earlies flying!" celebrations all say that closing fast is helping. Read this way, Harbour has a strong, consistent culture and the problem is the tool.','Hides: who disagrees. The late shift, merchants and the risk lead are silent in this view.'],
dif:['Differentiation: subcultures that see the same event differently','Early handlers, late handlers, merchants and the leadership each read "closed" and "resolved" differently, and each group\'s costs land somewhere else. Read this way, there is no single Harbour culture, only groups whose views collide at handover.','Hides: what is shared. It can make a common cause (the same award rule) look like separate quarrels.'],
fra:['Fragmentation: ambiguity nobody owns','Nobody is clearly responsible: the vendor pushed 2.4 and engineering called it "nothing for us to do"; Priya is the only approver and is in meetings; "Closed" means different things on different shifts. Read this way, the culture is unclear rather than strong or split.','Hides: patterns and power. It can turn a rule someone wrote into mere confusion.']};

/* ---------- Weekly award points, 22 Jun to 7 Sep (data/shift_board.csv, column award_points).
   The pilot starts at the 7th value (week of 3 Aug). ---------- */
const AWARD_EARLY = [459,466,452,457,453,444,630,636,650,649,677,639];
const AWARD_LATE  = [314,294,297,299,293,298,294,273,263,237,232,209];

/* ---------- What each outcome of the deciding observation would mean (Two explanations tab) ---------- */
const VERDICTS = {
  b: 'It points to B: the wording alone drove most merchant reopens, whatever the handlers did. A would still explain the handler drop, not the merchant rise.',
  m: 'Both matter: wording explains part, and something else (the rule, or the system reopens) explains the rest. Say how much, not which.',
  h: 'It points away from B and toward A, or toward a cause outside both: closing behaviour or timing would be the next place to look.'
};
