# Harbour Culture Lens

An interactive, single-page tool that turns the evidence pack for **Harbour Payments** into a diagnosis of its culture. Harbour is a **fictional** company invented for teaching on H9LOCHFFT (Leadership, Organisational Culture and Human Factors in FinTech, National College of Ireland). Nothing here describes a real firm.

## The question

Why did reopened disputes on the early shift go from 9% to 17% after an AI dispute tool was piloted, while the dashboard looked good?

## What the tool lets you explore

| Tab | What it shows |
|---|---|
| Schein: three levels | Each piece of evidence placed as an artefact, an espoused value or a basic assumption, and the gap between the levels. |
| Martin: three views | The same evidence read as integration, differentiation and fragmentation, with what each view hides. |
| Power | One power asymmetry: who writes the reward rule and who pays for reopens. |
| Two explanations | **A**, the award rule, against **B**, the vendor's "resolved" template wording; the record's numbers for each; and the one observation that would tell them apart. |
| What the record can't say | The limits of the evidence. |

Every card carries its type label (**observed**, **claimed** or **inferred**), its source file and the filter behind any number. Filters let you show one type of evidence or one explanation.

## How it works

Plain HTML, CSS and JavaScript. No libraries, no build step, no network calls.

- `index.html` is the page shell.
- `css/styles.css` holds the styling (light and dark mode via CSS variables).
- `js/data.js` holds all content: the evidence items, labels and readings.
- `js/app.js` holds the behaviour: filters, tabs and one render function per tab.

The figures were computed from the full session-3 dispute export (`cases.csv`, `messages.jsonl`, `ai_drafts.csv` and others) and embedded as text. The raw data is not shipped. To check a number, apply the filter named on its card to the matching file. For example, the 9% to 17% figure comes from `cases.csv`: disputes, `shift=early`, grouped by `opened_at` before and after 3 Aug 2026, counting `reopened_at` within 14 days of `closed_at` (94/1,044 and 194/1,140).

## Rules followed

- Only the supplied evidence pack is used. Quotes are word for word.
- Findings that are conclusions are labelled **inferred**.
- The two explanations, the power asymmetry and the deciding observation are drafts for the author to confirm or change.

## Run it

Open `index.html` in a browser.

## Host it on GitHub Pages

1. Create a public repository and push this folder to it, with `index.html` at the top level.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then your main branch and `/ (root)`.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Folder layout

```
index.html
css/styles.css
js/data.js
js/app.js
ai-log/        prompts and key parts of each AI session
.nojekyll
```

## Decision log, build notes, contributions

To be written by the author from the real record of the work. See `ai-log/`.
