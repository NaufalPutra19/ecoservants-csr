# EcoServants CSR: A Plain-English Guide for New Contributors

Welcome. This document is meant to be the first thing you read before touching any code in this repo. It explains what the plugin actually does today, how the pieces fit together, where the project is headed, and some safe places to start if this is your first contribution.

If you want deep technical detail on any specific field or table, see `CSR_DATA_DICTIONARY.md`. If you want the full phased development plan, see `CSR_ROADMAP.md` and `Issue-3-CSR-Guided-Flow-Architecture.md`. This document is the friendly overview that ties those together, not a replacement for them.

---

## 1. What this plugin actually does

EcoServants CSR is a WordPress plugin. Volunteers who clean up litter, plant trees, or do other environmental restoration work fill out a form describing what they did. That data gets saved, and later gets shown back publicly as impact totals, a "Wall of Fame" carousel, and downloadable reports for funders and partners.

Three things get placed on a WordPress page using shortcodes:

- `[csr_form]` puts the actual submission form on a page.
- `[wall_of_fame]` shows a scrolling carousel of recent reports.
- `[total_impact]` (and its sibling `[top_impact]`) show running totals like pounds of plastic collected or trees planted.

---

## 2. What happens today when someone submits a report

This is the current, working flow, in plain language, no guided steps yet at the handler level (the guided screens described in Section 4 are a frontend layer sitting on top of this same flow).

1. A volunteer visits a page with the `[csr_form]` shortcode and fills in their name, email, date, location, whichever waste categories apply (with subcategories and counts), any habitat restoration work, and optionally uploads photos.
2. They click Submit. The browser sends all of that data to `form-handler.php`.
3. `form-handler.php` checks a security token (nonce) and a hidden spam-trap field (honeypot), cleans up every field so nothing malicious can sneak through, uploads any photos to the WordPress media library, and saves everything as a new **CSR Report**, a custom WordPress post type called `csr_report`.
4. The volunteer is redirected back to the page with a "submitted" message.
5. From that point on, the report exists as a private WordPress post. Staff can see and edit it from the **CSR Reports** menu in `wp-admin`. It also automatically counts toward the public totals shown by `[total_impact]` and `[top_impact]`, and may show up in the `[wall_of_fame]` carousel.

That's the whole loop: form to handler to database post to public display.

---

## 3. The key files, in plain language

| File | What it actually is |
|---|---|
| `ecoservants-csr.php` | The plugin's control center. Registers the CSR Report post type, sets up all the shortcodes, handles the public JSON endpoints, and calculates totals. |
| `form-template.php` | What the form actually looks like, the HTML structure and all the input fields. |
| `form-handler.php` | What happens the instant someone clicks Submit, security checks, cleanup, and saving. |
| `assets/css/style.css` | All the visual styling, colors, spacing, layout. |
| `assets/js/` | The interactive behavior, guided step navigation, category card selection, the Wall of Fame carousel, and the currently-disabled voice assistant. |

If you're fixing something visual, you're almost always in `style.css`. If you're fixing something about what data gets saved, you're almost always in `form-handler.php`. If you're changing what fields exist or how they're laid out, you're in `form-template.php`.

---

## 4. Where the project is headed

The long-term goal is to turn the CSR form from one long page into a guided, screen-by-screen experience, without ever breaking the existing data or the admin panel that staff already rely on. This is already partly built:

- **Issue #6** wrapped the form into five steps: Basic Info, Waste Categories, Habitat Restoration, Photos, and Review and Submit. Users click Next and Back between them instead of scrolling one long page.
- **Issue #7** added a visual card grid for selecting which waste categories apply, instead of scanning a long list of checkboxes.

Still ahead, per the roadmap:

- A better subcategory picker (#8), possibly a pinwheel-style selector.
- A real review screen before final submit (#9).
- Deeper mobile polish (#10), a nicer progress indicator (#11), and save-and-continue support so a volunteer doesn't lose their work if they get interrupted (#12).
- Reporting paths for teams, schools, and corporate partners (#13), plus dashboards (#14, #15), better exports (#16), and improved admin review tools (#19).
- A public impact summary shortcode (#22) and a proper icon set (#18) to replace the placeholder emoji currently used on the category cards.

One important thing to know: **the underlying `form-handler.php` and the `csr_report` data structure are being deliberately left alone.** Every guided-flow change so far has been about the frontend experience, not a rewrite of how data gets saved. That's intentional, it protects the reports that already exist and keeps admin tools and exports working without disruption.

---

## 5. Good first issues

If this is your first contribution, here are some genuinely safe starting points, ranked roughly by how self-contained they are:

**Documentation and small content fixes.** Reading `CSR_DATA_DICTIONARY.md` and `CSR_ROADMAP.md` and pointing out anything unclear, outdated, or missing is genuinely useful and low-risk.

**CSS-only changes.** Anything about spacing, color, or layout in `assets/css/style.css` is safe to experiment with, since it can't affect what data gets saved.

**Adding the missing `csr_notes` field to the form.** This is a small, already-scoped follow-up: the form handler already reads a `csr_notes` field (fixed in Issue #4), but the actual textarea was never added to `form-template.php`. A good small task for someone comfortable with basic HTML forms.

**Category icon work (Issue #18).** The category cards from Issue #7 currently use plain emoji as placeholders. Replacing them with a real icon set is contained entirely to image assets and `style.css`, no risk to data handling.

**What to be more careful with:** anything touching `form-handler.php` directly. That file handles security checks and data saving for every single report submitted, small mistakes there can silently lose data (this has happened before, see Issue #4's audit). If you're working on something there, get a second pair of eyes on it before merging.

---

## 6. Where to go for more depth

- **Every field, what it means, and where it's used:** `CSR_DATA_DICTIONARY.md`
- **The full phased development plan:** `CSR_ROADMAP.md`
- **The guided-flow architecture and field confirmation:** `Issue-3-CSR-Guided-Flow-Architecture.md`
- **How to test changes locally:** install a local WordPress environment (Local by WP Engine is a simple free option), copy the plugin folder into `wp-content/plugins/`, activate it, and add `[csr_form]` to a test page.

Welcome aboard. Whether you're fixing a typo in a doc or building a whole new screen, it matters, this plugin exists to help real cleanup efforts get properly counted and recognized.
