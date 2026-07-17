# Issue #7: Create CSR waste category card selection screen

**Status:** Ready for review
**Deliverables:** card-based category selection, multiple selection, mobile-friendly layout, brand styling
**Depends on:** #6 (guided wrapper, merged/in review), builds on the same Step 2 container
**Files changed:** `form-template.php`, `assets/js/csr-category-cards.js` (new), `assets/css/style.css`, `ecoservants-csr.php`

---

## What this does

Adds a 14-card grid at the top of Step 2 (Waste Categories), one card per waste category, using the brand color (`#243b7e`) and the existing form styling language. Checking a card reveals that category's existing weight/subcategory detail block below the grid, unchecking hides it again. All 14 existing detail blocks are unchanged internally, just tagged with `data-category-detail="..."` so the new script can find and toggle them.

## Why no new form fields

Card checkboxes are UI-only, they have no `name` attribute and are never submitted. The actual data collected is exactly what it was before this issue: the weight and subcategory fields inside each detail block. This means `form-handler.php` needed zero changes, and nothing about the real submission payload changed, category selection is just a visibility filter over fields that already existed.

## Icons

Used emoji as placeholder icons since no real icon set exists yet, `Issue #18` (category icon and visual asset system) is exactly the issue meant to replace these with proper brand assets. Noted directly in the UI (`csr-category-cards-note`) so nobody mistakes the emoji for the intended final design.

## What was intentionally left out of scope

- Subcategory picker redesign, pinwheel or otherwise (#8), detail blocks below each card still use the original checkbox/fieldset layout.
- Deeper mobile polish beyond the responsive grid included here (#10).
- Validation, such as requiring at least one category be selected (#20), still an open team decision per the Issue #3 doc.
- Fieldset/legend visual cleanup inside the detail blocks, already handled separately in the `style.css` fix from #6's review round, not duplicated here.

## Testing notes

- Load the form, confirm Step 2 shows the 14-card grid with no detail blocks visible by default.
- Click a few cards, confirm only the matching detail blocks appear, and the card itself gets a highlighted/selected look.
- Enter a value in a detail block, uncheck its card, recheck it, confirm the value is still there, hidden fields are not cleared.
- Submit a report with 2 or 3 categories selected, confirm it saves identically to before, same fields, same `csr_report` post.
- Resize the browser narrow (or test on a phone), confirm the card grid reflows to fewer columns and stays usable.
