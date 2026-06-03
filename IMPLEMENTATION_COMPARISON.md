# CSR Implementation Comparison

## 1. Existing fields we can reuse

### Core fields
- `csr_name`
- `csr_email`
- `csr_date`
- `csr_location`

### Waste category fields
- `csr_unsorted_litter_weight`
- `csr_unsorted_litter_subcategories[]`
- `csr_unsorted_litter_subcategories_count[...]`
- `csr_plastic_waste_weight`
- `csr_plastic_subcategories[]`
- `csr_plastic_subcategories_count[...]`
- `csr_paper_waste_weight`
- `csr_paper_subcategories[]`
- `csr_paper_subcategories_count[...]`
- `csr_food_waste_weight`
- `csr_food_subcategories[]`
- `csr_food_subcategories_count[...]`
- `csr_metal_waste_weight`
- `csr_metal_subcategories[]`
- `csr_metal_subcategories_count[...]`
- `csr_glass_waste_weight`
- `csr_glass_subcategories[]`
- `csr_glass_subcategories_count[...]`
- `csr_cigarette_litter_weight`
- `csr_cigarette_subcategories[]`
- `csr_cigarette_subcategories_count[...]`
- `csr_textiles_weight`
- `csr_textiles_subcategories[]`
- `csr_textiles_subcategories_count[...]`
- `csr_medical_waste_weight`
- `csr_medical_subcategories[]`
- `csr_medical_subcategories_count[...]`
- `csr_sanitary_products_weight`
- `csr_sanitary_subcategories[]`
- `csr_sanitary_subcategories_count[...]`
- `csr_fishing_gear_weight`
- `csr_fishing_subcategories[]`
- `csr_fishing_subcategories_count[...]`
- `csr_styrofoam_hazardous_waste_weight`
- `csr_styrofoam_subcategories[]`
- `csr_styrofoam_subcategories_count[...]`
- `csr_hazardous_subcategories[]`
- `csr_hazardous_subcategories_count[...]`
- `csr_miscellaneous_weight`
- `csr_miscellaneous_subcategories[]`
- `csr_miscellaneous_subcategories_count[...]`
- `csr_derelict_items_weight`
- `csr_derelict_subcategories[]`
- `csr_derelict_subcategories_count[...]`

### Restoration and volunteer fields
- `csr_trees_planted`
- `csr_invasive_species_removed`
- `csr_invasive_species_names`
- `csr_invasive_species_weight`
- `csr_native_plants_seeded`
- `csr_native_plants_seeded_other`
- `csr_erosion_control_methods[]`
- `csr_erosion_control_notes`
- `csr_volunteers_involved`

### Photos
- `csr_photos[]`

### Existing submission handler behavior
- Uses `admin-post.php` with `action=csr_form`
- Validates nonce and honeypot
- Sanitizes all `csr_*` POST fields
- Uploads photos and saves attachment IDs
- Inserts a `csr_report` post with `meta_input`
- Redirects back with a submitted status

## 2. New interface components we need to build

### Guided wrapper around existing fields
- Step-based navigation layer on top of the current form
- One step at a time UI with a Next/Back flow
- Progress indicator showing current step and overall progress
- Save-and-exit support using localStorage or browser state
- Step review summary before final submit

### Waste category selection
- Category card selection screen for waste types
- Adaptive step flow that shows only selected categories
- Visual card UI instead of the current long list of fields

### Subcategory selection UI
- Pinwheel or tile-based subcategory picker
- Weight and count inputs per selected subcategory
- A cleaner alternative to the current large checkbox + count table

### Corporate/team path UI
- A selection screen for individual vs corporate/team
- Conditionally shown fields based on the chosen path
- Separate UX for corporate metrics and context

### Additional UI components
- Review/confirm screen showing all entered values
- Error validation UI for required step inputs
- Optional save state notifications or buttons
- Mobile-friendly layout and touch targets

## 3. New data fields or logic needed for the corporate/team path

### Suggested new fields
- `submission_type` (e.g. `individual` or `team`)
- `team_name` or `organization_name`
- `team_lead_name`
- `team_lead_email` (if different from `csr_email`)
- `team_size` / `team_category`
- `corporate_purpose` / `cleanup_goal` / `impact_goal`
- `corporate_reporting_notes`

### Existing field alignment
- `csr_volunteers_involved` already exists and can support team size
- existing waste and restoration fields can be reused for both paths
- the handler can preserve existing meta storage while adding new corporate meta

### Required logic
- Keep the current POST handler intact for existing fields
- Add a new branch in the handler to capture `submission_type` and any team-specific meta
- Use the same `wp_insert_post` flow and `csr_report` post type
- Ensure the new corporate/team fields do not break the current long-form submission
- Preserve backward compatibility by accepting all current `csr_*` names

## Practical milestone recommendation

1. Build a step wrapper UI that still submits the current `csr_*` fields
2. Keep the existing `form-handler.php` unchanged as much as possible
3. Add only the new corporate/team metadata once the step wrapper is working
4. Use the current form field names in the guided UI so the backend does not need a full rewrite

## Notes / gaps found

- `form-handler.php` expects `csr_notes`, but the current template does not include it
- `csr_hazardous_subcategories[]` exists in the template, but the handler does not store it in `meta_input`
- Some category weights or subcategory counts are saved without the matching checkbox label arrays in the handler
- A guided wrapper should keep the same POST field names to avoid major backend changes
