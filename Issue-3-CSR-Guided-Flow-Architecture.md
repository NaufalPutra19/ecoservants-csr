# Issue #3: CSR Guided Screen-by-Screen Reporting Architecture

**Status:** Ready for team review. Real field names confirmed against source files, supersedes earlier placeholder-based draft.
**Depends on:** #4 (field-handler fixes, PR open, in review as of this doc)
**Deliverables covered:** flow map, required vs. optional fields, handler decision, documentation update plan
**Sources used:** `ecoservants-csr.php`, `form-handler.php`, `form-template.php`, `CSR_ROADMAP.md`, `IMPLEMENTATION_COMPARISON.md`, `PROCESS_MAPPING.md`, `README.md`

---

## 1. Flow map

The guided experience is seven sequential phases, wrapped by four cross-cutting behaviors that apply to every screen rather than being steps of their own.

```
1. Start CSR report          (name, email, date, location)
        |
2. Select waste categories    (#7, card-based, multi-select, 14 categories)
        |
3. Pick subcategories          (#8, per selected category: labels, counts, weight)
        |
4. Habitat restoration           (trees planted, invasive species, native plants, erosion control, branches on yes/no)
        |
5. Notes and photo upload         (#21, csr_notes, csr_photos[])
        |
6. Review and confirm              (#9, editable summary before submit)
        |
7. Submit report                     (saved as csr_report via existing form-handler.php)
```

**Change from the earlier draft:** Habitat Restoration is now its own phase. It was missing before. Found in `PROCESS_MAPPING.md`, confirmed against real fields in `ecoservants-csr.php`. It branches: if no restoration work was done, the flow skips straight to notes/photos.

**Wraps around all seven phases:**
- **Progress indicator (#11):** step-count based ("Step X of Y"), Y varies by how many categories are selected.
- **Save-and-continue draft (#12):** local draft state persists between screens, cleared on successful submit.
- **Validation (#20):** required-field checks and numeric rules run per-screen, not just at final submit.
- **Mobile layout (#10):** every screen single-column, touch-friendly, no horizontal scroll.

**Navigation rule:** users can move backward through completed screens without losing entered data. Forward navigation is blocked only by required-field validation on the current screen.

---

## 2. Required vs. optional fields (real names, confirmed against source)

| Phase | Field | Required? | Notes |
|---|---|---|---|
| 1. Start | `csr_name` | Required | `required` attribute in template |
| 1. Start | `csr_email` | Required | `required` attribute in template |
| 1. Start | `csr_date` | Required | `required` attribute in template |
| 1. Start | `csr_location` | Required | `required` attribute in template |
| 2-3. Categories/Subcategories | `csr_{category}_waste_weight` | Optional per category | 14 categories: plastic, paper, metal, glass, food, cigarette, textiles, medical, sanitary, fishing, styrofoam_hazardous, miscellaneous, derelict, unsorted_litter |
| 2-3. Categories/Subcategories | `csr_{category}_subcategories[]` | Optional | Checkbox array of selected subcategory labels, now saved for all 14 categories as of #4's fix |
| 2-3. Categories/Subcategories | `csr_{category}_subcategories_count[...]` | Optional | Per-subcategory count, keyed by label |
| 4. Habitat Restoration | `csr_trees_planted` | Optional | Number |
| 4. Habitat Restoration | `csr_invasive_species_removed` | Optional | Sq ft, number |
| 4. Habitat Restoration | `csr_invasive_species_names` | Optional | Free text |
| 4. Habitat Restoration | `csr_invasive_species_weight` | Optional | lbs |
| 4. Habitat Restoration | `csr_native_plants_seeded` / `csr_native_plants_seeded_other` | Optional | Dropdown plus "Other" text |
| 4. Habitat Restoration | `csr_erosion_control_methods[]` / `csr_erosion_control_notes` | Optional | Checkbox array plus notes |
| 4. Habitat Restoration | `csr_volunteers_involved` | Optional | Number |
| 5. Notes/Photos | `csr_notes` | Not yet collectible | Handler reads it (as of #4's fix), but template still has no matching field. Small follow-up needed before #6. |
| 5. Notes/Photos | `csr_photos[]` | Optional | File upload, multiple, image types only |

**Validation rules to confirm in #20:**
- At least one waste category recommended, but not currently enforced as required. Worth a team decision.
- Numeric fields should reject negative input server-side, not just via HTML `min="0"`.
- Photo uploads never block submission if skipped.

---

## 3. Handler decision (confirmed)

**Keep the existing `csr_report` post type and `form-handler.php`. Build the guided UI as a multi-step wrapper on top of it, not a replacement.**

- `ecoservants-csr.php` registers `csr_report` as a locked-down custom post type (`public => false`) with its own capabilities. This is stable infrastructure, not something to touch.
- `form-handler.php` (now fixed under #4) does the full job: nonce and honeypot validation, sanitization, photo upload, `wp_insert_post()` with `meta_input`. A guided wrapper only needs to collect the same POST fields across multiple screens and submit them once, at the end, through this same handler and `action=csr_form`.
- No architecture changes needed to support the guided flow. This is purely a frontend/UX layer change.

---

## 4. Status of Issue #4 dependency

As of this doc, #4's PR is **open and in review** (not yet merged). It fixed:
1. `csr_notes` PHP warning, guarded with `isset()`. Template field itself still needs to be added, see Section 2.
2. Hazardous subcategories, previously dropped entirely, now saved.
3. Subcategory label arrays for 8 categories that previously only saved counts, now saved for all 14.

**Recommendation:** wait for #4 to merge before starting #6's build, so the guided wrapper isn't built against a handler with known bugs.

---

## 5. Open decision needed: individual vs. team/corporate sequencing

Three source documents disagree on where the individual/team branch belongs, and this needs a team decision before #6 starts, since it changes the shape of the very first screen:

- `IMPLEMENTATION_COMPARISON.md`: says `csr_submission_type` and related fields are "future / optional," not part of the initial guided-wrapper implementation.
- `PROCESS_MAPPING.md`: places the individual/team choice at **Step 1**, before name/email.
- `README.md`: lists "separate paths based on individual or organization" as a core planned improvement, not a later phase.

This document does not resolve the conflict. It's flagged here so #6 doesn't get built against a guess.

---

## 6. Documentation update plan

- This doc replaces the earlier placeholder-based draft now that real field names are confirmed.
- Cross-link this doc from Issue #6 (guided wrapper build) so the first PR references the agreed architecture.
- Once the individual/team sequencing question (Section 5) is resolved, update Section 1's flow map accordingly.
- Feed the confirmed field list (Section 2) into #5's data dictionary work, since it overlaps significantly.

---

## Next steps
1. Get a team decision on Section 5 (individual/team sequencing).
2. Confirm #4 has merged before #6 starts.
3. Small follow-up: add the actual `csr_notes` field to `form-template.php` (tracked separately, referenced in #4's audit doc).
4. Once settled, this doc is ready to be the reference for Issue #6.
