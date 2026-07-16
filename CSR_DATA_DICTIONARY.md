# CSR Data Dictionary

**Status:** Ready for team review
**Deliverables covered:** field list, categories, required status, exports, public display
**Sources used:** `ecoservants-csr.php`, `form-handler.php`, `form-template.php`, `ecoservants-csr.js`

This document lists every `csr_*` field used by the plugin, what it means, whether it is required, and everywhere it surfaces: the frontend form, the admin meta box, CSV exports, and public shortcodes/endpoints.

---

## 1. Core identity fields

| Field | Meaning | Required | Type | Surfaces in |
|---|---|---|---|---|
| `csr_name` | Volunteer's name | Yes | Text | Frontend form, admin meta box, single CSV export, Wall of Fame display |
| `csr_email` | Volunteer's email | Yes | Email | Frontend form, admin meta box, single CSV export |
| `csr_date` | Date the cleanup happened | Yes | Date | Frontend form, admin meta box, single CSV export, yearly export filtering (`meta_query` on this field) |
| `csr_location` | Where the cleanup happened | Yes | Text | Frontend form, admin meta box, single CSV export, Wall of Fame display |

---

## 2. Waste category fields (14 categories, repeating pattern)

Every category below follows the same three-field pattern:

- `csr_{category}_weight` (or category-specific weight field name, see table) - total weight in lbs, optional, number
- `csr_{category}_subcategories[]` - checkbox array of which subcategory labels were selected, optional
- `csr_{category}_subcategories_count[...]` - JSON object mapping each selected subcategory label to a count, optional

| Category | Weight field | Subcategories field | Count field |
|---|---|---|---|
| Unsorted Litter | `csr_unsorted_litter_weight` | `csr_unsorted_litter_subcategories` | `csr_unsorted_litter_subcategories_count` |
| Plastic | `csr_plastic_waste_weight` | `csr_plastic_subcategories` | `csr_plastic_subcategories_count` |
| Paper | `csr_paper_waste_weight` | `csr_paper_subcategories` | `csr_paper_subcategories_count` |
| Metal | `csr_metal_waste_weight` | `csr_metal_subcategories` | `csr_metal_subcategories_count` |
| Glass | `csr_glass_waste_weight` | `csr_glass_subcategories` | `csr_glass_subcategories_count` |
| Food | `csr_food_waste_weight` | `csr_food_subcategories` | `csr_food_subcategories_count` |
| Cigarette Litter | `csr_cigarette_litter_weight` | `csr_cigarette_subcategories` | `csr_cigarette_subcategories_count` |
| Textiles | `csr_textiles_weight` | `csr_textiles_subcategories` | `csr_textiles_subcategories_count` |
| Medical Waste | `csr_medical_waste_weight` | `csr_medical_subcategories` | `csr_medical_subcategories_count` |
| Sanitary Products | `csr_sanitary_products_weight` | `csr_sanitary_subcategories` | `csr_sanitary_subcategories_count` |
| Fishing Gear | `csr_fishing_gear_weight` | `csr_fishing_subcategories` | `csr_fishing_subcategories_count` |
| Styrofoam & Hazardous | `csr_styrofoam_hazardous_waste_weight` | `csr_styrofoam_subcategories` (plus a separate `csr_hazardous_subcategories` for the hazardous half) | `csr_styrofoam_subcategories_count` (plus `csr_hazardous_subcategories_count`) |
| Miscellaneous | `csr_miscellaneous_weight` | `csr_miscellaneous_subcategories` | `csr_miscellaneous_subcategories_count` |
| Derelict Items | `csr_derelict_items_weight` | `csr_derelict_subcategories` | `csr_derelict_subcategories_count` |

**Note:** Styrofoam & Hazardous is the one category split into two independent subcategory groups under a single shared weight field. This is intentional per the admin meta box code, not a bug.

**Category and subcategory labels** (used as the literal string values inside the `_subcategories[]` arrays and as JSON keys in the `_count` fields):

- Plastic: Plastic bottles, Bottle caps, Straws & stirrers, Plastic bags, Food wrappers, Plastic utensils, Cups & lids, Six-pack rings, Microplastics, Toys, Containers (non-food), Hard plastics, Packaging materials, Fishing nets (plastic-based)
- Paper: Newspapers, Magazines, Flyers / brochures, Food packaging (paper-based), Cardboard, Paper bags, Napkins / tissues, Notebooks / loose paper, Cigarette packs (paper-based), Receipts, Coffee cups (paper with lining)
- Food: Fruit peels, Vegetable scraps, Meat scraps, Fish scraps, Egg shells
- Metal: Aluminum cans, Metal bottle caps, Metal lids, Metal utensils, Metal containers, Metal scraps, Metal wires, Metal tools, Metal toys, Metal furniture, Metal appliances
- Glass: Glass bottles, Glass jars, Glass containers, Glass fragments, Glass cups, Glass plates, Glass utensils, Glass toys, Glass furniture, Glass appliances
- Cigarette: Cigarette butts, Cigarette packs, Cigarette filters, Cigarette wrappers, Cigarette lighters
- Textiles: Clothing, Shoes, Bags, Hats, Scarves, Gloves, Socks, Underwear, Bedding, Towels, Curtains
- Medical: Syringes, Medicine bottles, Medicine packaging, Bandages, Gloves, Masks, Medical tools, Medical containers, Medical waste bags
- Sanitary: Sanitary pads, Tampons, Diapers, Wet wipes, Cotton swabs, Toilet paper, Tissues
- Fishing: Fishing nets, Fishing lines, Fishing hooks, Fishing lures, Fishing weights, Fishing floats, Fishing rods, Fishing reels, Fishing bait containers
- Styrofoam: Styrofoam cups, Styrofoam plates, Styrofoam containers, Styrofoam packaging, Styrofoam fragments
- Hazardous: Batteries, Paint cans, Chemical containers, Oil containers, Pesticide containers, Cleaning product containers, Medical waste, Electronic waste
- Miscellaneous: Rubber items, Wood items, Ceramic items, Leather items, Electronic items, Miscellaneous fragments
- Derelict: Derelict fishing gear, Derelict boats, Derelict vehicles, Derelict furniture, Derelict appliances, Derelict building materials, Derelict tools, Derelict toys
- Unsorted Litter: Number of Unsorted Bags Collected (this one is unusual, see quirk below)

**Surfaces in:** frontend form, admin meta box, `ecoservants_calculate_totals()` (site-wide totals), `ecoservants_get_yearly_totals()` (per-year totals), single report CSV export, yearly CSV export, `[total_impact]` shortcode, `[top_impact]` shortcode, `top_impact_json` public endpoint.

---

## 3. Habitat restoration and volunteer fields

| Field | Meaning | Required | Type | Surfaces in |
|---|---|---|---|---|
| `csr_trees_planted` | Count of trees planted | No | Number | Frontend form, admin meta box, totals, CSV exports, `[total_impact]`, `[top_impact]`, Wall of Fame (if greater than 0) |
| `csr_invasive_species_removed` | Square feet of invasive species removed | No | Number | Same as above |
| `csr_invasive_species_names` | Free text list of species removed | No | Text | Frontend form, admin meta box |
| `csr_invasive_species_weight` | Weight of invasive species collected, lbs | No | Number | Frontend form, admin meta box, totals, CSV exports, `[total_impact]`, `[top_impact]`, Wall of Fame (if greater than 0) |
| `csr_native_plants_seeded` | Dropdown selection (Milkweed, Oak, Pine, Other) | No | Select | Frontend form, admin meta box |
| `csr_native_plants_seeded_other` | Free text if "Other" selected | No | Text | Frontend form, admin meta box |
| `csr_erosion_control_methods[]` | Checkbox array (Mulching, Terracing, Planting ground cover, Other) | No | Array, stored as comma string | Frontend form, admin meta box |
| `csr_erosion_control_notes` | Free text notes | No | Textarea | Frontend form, admin meta box |
| `csr_volunteers_involved` | Number of volunteers on this report | No | Number | Frontend form, admin meta box, totals (summed across all reports, plus a hardcoded baseline, see quirk below), CSV exports |

---

## 4. Notes and media

| Field | Meaning | Required | Type | Surfaces in |
|---|---|---|---|---|
| `csr_notes` | Free text notes about the cleanup | Not currently collectible, see quirk below | Textarea | Handler reads it (post #4 fix), admin meta box displays it, single CSV export includes it. Frontend form does not currently have this field. |
| `csr_photos[]` | Uploaded photo attachment IDs | No | File upload, multiple | Frontend form, admin meta box (thumbnail display), Wall of Fame (thumbnails plus lightbox), Wall of Fame AJAX lazy-load |

---

## 5. Where data is surfaced publicly

| Shortcode / endpoint | What it shows | Privacy notes |
|---|---|---|
| `[csr_form]` | The submission form itself | N/A |
| `[wall_of_fame]` | Carousel of recent reports: name, location, category totals, photos | Permalinks intentionally omitted. Name and location are shown as entered, no anonymization. |
| `[total_impact]` | Circular metric display plus a "view all" expandable list of every category total | Aggregate only, no per-report data exposed |
| `[top_impact]` | Same style as `[total_impact]` but only the highest-N metrics, configurable via shortcode attributes `limit` and `min` | Aggregate only |
| `top_impact_json` (`?top_impact_json=1`) | JSON version of the top-impact metrics, with CORS restricted to EcoServants domains | Aggregate only, no PII |
| `wof_json` (`?wof_json=1`) | JSON version of Wall of Fame entries, with CORS restricted to EcoServants domains | Includes name and location per report, no permalink |
| Iframe endpoints (`csr_form_iframe`, `wall_of_fame_iframe`, `total_impact_iframe`, `top_impact_iframe`) | Embeddable versions of the above for external sites | Wall of Fame and Top Impact iframes include a `postMessage` auto-resize script scoped to an allowed-origins list |

---

## 6. Quirks worth documenting explicitly

**Hardcoded volunteer baseline.** `ecoservants_calculate_totals()` adds a fixed `+1452` to the real, computed sum of `csr_volunteers_involved` across all reports, before this number is ever shown publicly (`[total_impact]`, `[top_impact]`, `top_impact_json`). There is no label distinguishing the real total from the padded one. Anyone using this number for funder or sponsor reporting should know it is not purely derived from submitted reports.

**Unsorted litter bag-to-weight auto-derivation.** In `ecoservants-csr.js`, if `csr_unsorted_litter_weight` is left at 0 or empty but `csr_unsorted_bags_count` (mapped to the "Number of Unsorted Bags Collected" subcategory) has a value greater than 0, the browser auto-fills the weight field as `bags x 10` before submission. This happens client-side, in the browser, not on the server, so it can be bypassed or may not fire consistently depending on which script runs.

**Disabled voice assistant uses a different, incompatible field schema.** The voice assistant in `ecoservants-csr.js` references individual per-item field IDs, for example `csr_plastic_bottles`, `csr_plastic_bottle_caps`, one ID per subcategory item. This does not match the real schema described in Sections 2 and 3 above, which uses array-based `csr_{category}_subcategories[]` plus JSON count objects instead. The voice assistant is currently disabled (`voiceBtn.style.display = 'none'`) and would need a rewrite to actually work against the real fields if it is ever re-enabled.

**Styrofoam and Hazardous share one weight field but have two independent subcategory groups.** `csr_styrofoam_hazardous_waste_weight` covers both halves, but subcategory selection and counts are tracked separately (`csr_styrofoam_subcategories` versus `csr_hazardous_subcategories`). This is intentional, not a mismatch, but easy to misread as one category.

**REST API is disabled for all CSR meta.** Every `csr_*` meta key is registered with `show_in_rest => false`. Any future dashboard or integration work planning to use WordPress's REST API directly will need this changed, or will need to go through a custom endpoint instead (as the plugin already does for `top_impact_json` and `wof_json`).
