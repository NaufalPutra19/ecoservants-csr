# EcoServants CSR Form — Step-by-Step Process Map

**Document Type:** User Journey & Process Flow for Form Redesign  
**Status:** Draft (For Intern Planning & Review)  
**Last Updated:** June 2026  

---

## Overview

This document maps the proposed future user flow. It shows:
- What step comes next
- What question is asked
- What data is collected
- How users navigate between steps
- Decision points and branching logic

**Goal:** Transform from a single long form into a guided, step-by-step experience.

> Note: Screen labels and counts are illustrative. The actual form may use a slightly different number of steps depending on the final UX implementation.

---

## Phase 1: Entry & Basic Info (Approximate Steps 1–4)

| Step | Question/Purpose | Input Type | Data Collected | Next Step |
|--------|-----------------|-----------|-----------------|------------|
| **1** | "Welcome! Are you submitting alone or as part of a team/organization?" | Radio buttons | `submission_type: individual OR team` | Step 2 |
| **2** | "What's your name?" | Text input | `volunteer_name` | Step 3 |
| **3** | "What's your email?" | Email input | `volunteer_email` | Step 4 |
| **4** | "When did this cleanup happen? Where was it?" | Date picker + Location text | `cleanup_date`, `cleanup_location` | Step 5 |

---

## Phase 2: Primary Waste Categories (Approximate Steps 5–20)

After basic info, user sees a **category card menu** with all waste types available.

**Category Card Options:**
1. Plastic Waste
2. Paper Waste
3. Metal Waste
4. Glass Waste
5. Food Waste
6. Cigarette Litter
7. Textiles
8. Medical Waste
9. Sanitary Products
10. Fishing Gear
11. Styrofoam & Hazardous Waste
12. Miscellaneous
13. Derelict Items
14. Unsorted Litter

| Step | Purpose | UI Element | Data Collected | Next Step |
|--------|---------|-----------|-----------------|------------|
| **5** | "What types of waste did you collect? (Select as many as apply)" | Category card grid | `selected_waste_categories[]` | Step 6 |
| **6–19** | For *each* selected category, ask subcategory + weight | Pinwheel selector + weight input | `category_subcategories[]`, `category_weight` | Next category step or Step 20 |
| **20** | Summary of all waste data collected | Review card | None (just display) | Step 21 |

### Example: Entering Plastic Waste (Step 6)

```
User selects "Plastic Waste" card from Step 5
↓
Step 6 appears:
"You selected Plastic Waste. What types did you collect?"
[Pinwheel: Plastic Bottles | Bottle Caps | Straws | ... | (center: Plastic)]
Input: "How many lbs of plastic waste?"
[Number field: 0.00]
↓
Save → Move to next selected category OR Step 20 if this was the last one
```

---

## Phase 3: Habitat Restoration (Approximate Steps 21–25)

After all waste categories are complete, ask about restoration work.

| Step | Question | Input Type | Data Collected | Next Step |
|--------|----------|-----------|-----------------|------------|
| **21** | "Did you do any habitat restoration work?" | Yes/No toggle | `did_restoration` | If Yes → 22, If No → 26 |
| **22** | "How many trees did you plant?" | Number input | `trees_planted` | Step 23 |
| **23** | "Did you remove invasive species? How many sq ft?" | Yes/No + Number | `invasive_removed_sqft` | Step 24 |
| **24** | "What invasive species? How much did you collect (lbs)?" | Text + Number | `invasive_names`, `invasive_weight` | Step 25 |
| **25** | "What erosion control methods did you use?" | Checkboxes | `erosion_methods[]` | Step 26 |

---

## Phase 4: Team & Volunteer Info (Approximate Steps 26–27)

| Step | Question | Input Type | Data Collected | Next Step |
|--------|----------|-----------|-----------------|------------|
| **26** | "How many volunteers were involved?" | Number input | `total_volunteers` | Step 27 |
| **27** | "Any notes or photos from this cleanup?" | Textarea + File upload | `notes`, `uploaded_photos[]` | Step 28 |

---

## Phase 5: Review & Submit (Approximate Steps 28–29)

| Step | Purpose | Display | Action | Next Step |
|--------|---------|---------|--------|------------|
| **28** | Full report review | All collected data formatted nicely | "Edit" button (returns to relevant steps) OR "Submit" | Step 29 |
| **29** | Success confirmation | "Report submitted!" + Summary | Close or view Wall of Fame | Done |

---

## Key Features to Implement

### Progress Indicator
- Show at top of each step: **"Step 6 of 29"** (or similar; actual step count may vary)
- Visual bar showing how far through the form user is

### Save & Exit
- "Save & Continue Later" button on every step
- Stores form state in browser (localStorage) or database
- User can return via unique link or login

### Mobile Responsiveness
- Full-width cards
- Large touch targets (buttons, inputs)
- Single column layout
- Pinwheel scales based on screen size

### Data Validation
- Before moving to the next step, validate current input
- Show error message if invalid (e.g., "Please enter a number")

---

## Decision Branches

### Branch 1: Individual vs. Team Submission
- **Step 1:** Determines submission type
- **Effect:** May show different team lead fields or additional contact info for team submissions

### Branch 2: Did You Do Restoration?
- **Step 21:** If "No" → skip to Step 26
- **If "Yes"** → go through Steps 22–25

### Branch 3: Any Invasive Species?
- **Step 23:** If "No" → skip to Step 25
- **If "Yes"** → go to Step 24

---

## Data Flow Summary

All collected data eventually flows to:
1. **WordPress custom post type:** `csr_report`
2. **Post meta:** Individual fields (name, email, date, etc.)
3. **Custom meta for each category:** Weight + subcategories (JSON encoded)
4. **Attached media:** Uploaded photos

**Result:** CSR becomes a single post with all structured data in custom fields.

---

## Open Questions for Implementation

- Validate screen flow with team

- Confirm required vs optional fields per step

- Decide final UX pattern for category + pinwheel selection

- Define technical approach for state persistence

---

## Questions for Review

- [ ] Should individual and team submissions have different paths?
- [ ] What should happen if a user closes mid-form? Auto-save or clear?
- [ ] Should the progress bar show percentages or step numbers?
- [ ] Any other categories or questions missing?
- [ ] Should we allow editing photos after upload?

---

## Notes

- This map is a **working draft**—expect changes after review
- Actual step count may differ based on categories selected
- The pinwheel UI component doesn't exist yet, will need to be built or adopted from a library

