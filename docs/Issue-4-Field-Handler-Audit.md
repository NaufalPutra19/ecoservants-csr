[Issue-4-Field-Handler-Audit.md](https://github.com/user-attachments/files/29620643/Issue-4-Field-Handler-Audit.md)
# Issue #4: Fix CSR form-handler field mismatches and missing saved fields

**Status:** Fix drafted, ready for review
**Deliverables:** field audit, sanitization review, documented field gaps, corrected `form-handler.php`
**Method:** cross-checked `form-template.php` (what the browser actually submits) against `form-handler.php` (what the server actually reads and saves) and `ecoservants-csr.php` (what the admin UI and totals calculator expect to find)

---

## Field audit summary

| # | Bug | Where | Impact | Fixed in this PR? |
|---|---|---|---|---|
| 1 | `csr_notes` read via `$_POST['csr_notes']` with no `isset()` guard | `form-handler.php` | PHP warning on every single submission | Yes — guarded with `isset()` |
| 2 | `csr_notes` has no matching field in the frontend form at all | `form-template.php` | Even after fixing #1, notes are never actually collected from users — the field silently doesn't exist | **No — see "Not fixed here" below** |
| 3 | `csr_hazardous_subcategories[]` and `csr_hazardous_subcategories_count[...]` rendered in the form and submitted by the browser, but never read or saved | `form-handler.php` | Total data loss — hazardous waste subcategory selections (batteries, paint cans, chemical containers, etc.) vanish on submit | Yes — now read, sanitized, and saved |
| 4 | 8 of 14 categories (cigarette, textiles, medical, sanitary, fishing, styrofoam, miscellaneous, derelict) submit a subcategory label checkbox array that the handler never reads — only the count JSON is saved | `form-handler.php` | Partial data loss — the count numbers are saved, but which specific subcategory each count belongs to is only recoverable via the JSON keys, and the standalone label list (used elsewhere the same way the other 6 categories use it) is missing | Yes — all 8 now save both the label array and the count JSON, matching the pattern already used by plastic/paper/metal/glass/food/unsorted litter |

## Sanitization review

Every field already passes through an appropriate sanitizer (`sanitize_text_field`, `sanitize_email`, `sanitize_textarea_field`, `floatval`, `intval`) before being saved — this part was already solid and unchanged. No sanitization gaps found. Input **validation** (required fields, range limits, business rules) is intentionally out of scope here — that's Issue #20.

## Not fixed in this PR: `csr_notes` template gap

Bug #2 needs a `form-template.php` change, not just a handler change. Since Issue #4 is scoped to the handler, I've only guarded the read so it stops throwing warnings — but notes still won't be collected until the field is added to the template. Recommend either:
- Adding this to Issue #4's scope explicitly (small template addition), or
- Filing it as a fast-follow so it doesn't get lost.

The addition itself is small — a `<textarea id="csr_notes" name="csr_notes">` block near the photo upload field, matching the pattern of `csr_erosion_control_notes` already in the template.

## Test submission notes

Before merging, a manual test submission should confirm:
- A report with at least one hazardous subcategory checked saves `csr_hazardous_subcategories` and `csr_hazardous_subcategories_count` correctly and they appear in the admin meta box.
- A report with subcategories checked in one of the previously-broken 8 categories (e.g. textiles) now saves the label array, not just counts.
- No PHP warnings appear in the debug log on a normal submission (notes field still empty until the template fix lands, but no warning should fire).

## What was intentionally left unchanged

- Handler architecture, `csr_report` post type, nonce/honeypot logic, photo upload flow — all confirmed correct in the earlier audit, no changes made.
- The 6 categories that already saved both label array and count (unsorted litter, plastic, paper, metal, glass, food) — untouched, used as the reference pattern for fixing the other 8.
