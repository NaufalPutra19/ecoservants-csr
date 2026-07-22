# Issue #6: Build guided CSR wrapper using existing csr_* field names

**Status:** Ready for review
**Deliverables:** guided wrapper, backward navigation, preserved field names, valid csr_report submissions
**Files changed:** `form-template.php`, `assets/js/csr-guided-wrapper.js` (new)

---

## What this does

Wraps the existing long-form CSR form into five steps: Basic Info, Waste Categories, Habitat Restoration, Photos, Review and Submit. All existing field names, IDs, and the checkbox/fieldset layout are untouched, only wrapping `<div class="csr-step">` containers were added around existing blocks. No changes to `form-handler.php` were needed since the form still submits the same fields in one request, exactly as before.

## How backward navigation works

Steps are hidden with `display:none` rather than removed from the DOM, so field values are preserved automatically when a user goes back to an earlier step, no extra draft storage needed for this. Full save-and-continue across page reloads is Issue #12's separate scope.

## Decision made without a team answer: individual/team path left out

`IMPLEMENTATION_COMPARISON.md`, `PROCESS_MAPPING.md`, and `README.md` disagree on whether the individual vs team/organization choice belongs in the first guided screen. This PR follows `IMPLEMENTATION_COMPARISON.md`'s explicit recommendation to keep the initial wrapper limited to existing `csr_*` fields only, so that path is not included here. This is a judgment call, not a resolved team decision, flagged so it is not mistaken for one. Issue #13 owns adding it later.

## What was intentionally left out of scope

- Category cards (#7) and subcategory picker (#8): step 2 still uses the original checkbox/fieldset layout, only wrapped for navigation.
- Full editable review screen (#9): step 5 is a bare final step with a note to use Back, not a field-by-field summary.
- Mobile-specific layout work (#10).
- Progress indicator styling beyond plain text (#11).
- Save-and-continue draft persistence across page reloads (#12).
- Per-step validation beyond the browser's native `required`/type checks (#20).
- `csr_notes` textarea addition (small follow-up tracked separately from the Issue #4 audit).

## Testing notes

- Submit a full report through all five steps, confirm it saves identically to before this change (same fields, same `csr_report` post).
- Use Back on each step, confirm previously entered values are still there.
- Try clicking Next on step 1 with a required field empty, confirm the browser blocks navigation and highlights the field.
- Confirm the Submit button is only visible on step 5, not earlier steps.
