<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Harbour Culture Lens: an interactive diagnosis of a fictional payments company's culture (H9LOCHFFT).">
  <title>Harbour Culture Lens</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- Page header: fictional notice, label key, the question, and the tab bar (buttons are built by js/app.js) -->
  <header>
    <h1>Harbour Culture Lens</h1>
    <p class="fic"><b>Fictional.</b> Harbour Payments, its people, merchants and figures are invented teaching material (H9LOCHFFT, NCI).
      Every number below names its file and filter so you can rebuild it. Evidence is labelled
      <span class="t observed">observed</span> (a record, still chosen by someone),
      <span class="t claimed">claimed</span> (what a person said) or
      <span class="t inferred">inferred</span> (a conclusion, never stated in the pack).</p>
    <p><b>The question:</b> why did reopened disputes on the early shift go from 9% to 17% while the dashboard looked good?</p>
    <nav role="tablist" aria-label="Lenses" id="tablist"></nav>
  </header>

  <main>
    <!-- Filter bar: used by tabs 1 and 2 only (app.js hides it on the others) -->
    <div class="bar" id="filters">
      <label>Evidence type
        <select id="filter-type">
          <option value="">all</option><option>observed</option><option>claimed</option><option>inferred</option>
        </select></label>
      <label>Bears on
        <select id="filter-expl">
          <option value="">all</option>
          <option value="A">A · reward rule</option>
          <option value="B">B · template wording</option>
          <option value="N">neither / both</option>
        </select></label>
      <span class="mu" id="count"></span>
    </div>

    <!-- One panel per tab. Content is filled in by js/app.js -->
    <section id="panel-0" role="tabpanel" aria-labelledby="tab-0"></section>
    <section id="panel-1" role="tabpanel" aria-labelledby="tab-1" hidden></section>
    <section id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden></section>
    <section id="panel-3" role="tabpanel" aria-labelledby="tab-3" hidden></section>
    <section id="panel-4" role="tabpanel" aria-labelledby="tab-4" hidden></section>
    <noscript><p class="fic">This page needs JavaScript to show the evidence.</p></noscript>
  </main>

  <!-- Order matters: data first, then the code that uses it. Plain scripts (not modules) so it also opens from a local file. -->
  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
