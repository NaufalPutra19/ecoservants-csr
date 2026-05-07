# EcoServants CSR Plugin

Welcome to the official repository for the **EcoServants CSR Plugin** — a digital tool created to modernize and empower global environmental action.

---

# What Is the EcoServants CSR Plugin?

The EcoServants CSR Plugin is a custom WordPress plugin designed to replace paper-based Community Site Reports (CSRs) with a streamlined, mobile-friendly digital form. This form helps volunteers easily log the results of their cleanups — including detailed data on the types and quantities of litter collected — in a smarter, more sustainable way.

Built by a team of dedicated interns and environmental technologists, this plugin is crafted to support **global community cleanup efforts** hosted by the **EcoServants Project**.

**Please note:** This plugin is **not open-source**. It is proprietary software licensed under the *EcoServants® Project Cleanup Software Redistribution License, Version 1.0 – March 2025*. Redistribution or use is restricted as outlined in the license below.

---

## Why It Matters

Every year, millions of pounds of plastic, cigarette waste, metal, glass, and hazardous materials pollute our parks, coastlines, streets, and forests. Communities around the world step up to clean these places, but the impact of their work often goes undocumented or underutilized.

The EcoServants CSR Plugin solves this by:

- Making it easy for volunteers to **submit digital cleanup reports**
- Structuring the data in a way that helps us **track patterns** and **measure impact**
- Empowering communities to **organize smarter cleanups**
- Giving EcoServants the ability to use collected data for **education, awareness, funding, and advocacy**

By improving how we gather and organize this data, we’re building a cleaner, more resilient Earth together.

---

## Features

- **Smart Categorization** – Plastic, metal, food waste, textiles and more
- **Mobile-Responsive** – Works across devices in the field
- **Data-Ready** – Submissions are stored for analysis and impact reports
- **Safe Waste Handling Notes** – Clear flags for hazardous/medical waste
- **Modular Design** – Easy to improve, expand or adapt

---

## Intern Contributions Add As We Go

A special thanks to **Joudy Alkheder** for her help on stylesheets and datasets.\
Thank you **Lilianna Cordero**, **Dalcy Fouty**, **Oyku Akdeniz**, **Srivatsa Yanamandra**, **Dominique Maboulou**, and **Jordan Hill** for your contributions in data analysis and subcategorizing litter types.

---

## File Structure

This repository includes:

| Level | Folder/File | Purpose |
| --- | --- | --- |
| 1 | `EcoServants-CSR/` | Main plugin directory containing all core files |
| 2 | `ecoservants-csr.php` | Main plugin logic, registration, hooks and includes |
| 2 | `form-handler.php` | Backend logic for handling form submissions |
| 2 | `form-template.php` | HTML/PHP structure of the frontend form |
| 2 | `license.txt` | Software license file for redistribution and use |
| 2 | `README.md` | Documentation and installation guide |
| 2 | `assets/` | Folder for styling and design resources |
| 3 | `assets/css/` | Subfolder for stylesheets |
| 3 | `style.css` | Custom plugin stylesheet for UI/layout |
| 3 | `assets/js/` | Subfolder for JavaScript |
| 3 | `carousel.js` | Displays Wall of Fame carousel on the frontend |

---

## Embedding the Wall of Fame

To embed the Wall of Fame on another website, use the following iframe code:

```html
<iframe 
    src="https://esp-university.earth/?wall_of_fame_iframe=true" 
    width="100%" 
    height="600" 
    style="border: none;">
</iframe>
```

Replace `https://esp-university.earth/` with the URL of your WordPress site.

---

## Embedding the CSR Form and Total Impact Metrics

To embed the CSR form or Total Impact Metrics on another website, use the following iframe codes:

### CSR Form
```html
<iframe 
    src="https://esp-university.earth/?csr_form_iframe=true" 
    width="100%" 
    height="800" 
    style="border: none;">
</iframe>
```

### Total Impact Metrics
```html
<iframe 
    src="https://esp-university.earth/?total_impact_iframe=true" 
    width="100%" 
    height="600" 
    style="border: none;">
</iframe>
```

Replace `https://esp-university.earth/` with the URL of your WordPress site.

---

## Thank You

Whether you’re writing a line of code, creating a wireframe, or organizing item categories — **your contribution matters**. This plugin isn’t just a tool. It’s a statement: that we can build technology that heals, helps, and supports the Earth and the people who protect it.

With gratitude,\
**The EcoServants Team**\
[https://ecoservantsproject.org](https://ecoservantsproject.org)

---

## License

**EcoServants® Project Cleanup Software Redistribution License**\
**Version 1.0 – March 2025**

Copyright (c) 2025 Ecological Servants Project (EcoServants®)\
All rights reserved.

This software, known as EcoServants CSR, was developed exclusively by the Ecological Servants Project in collaboration with its interns under a binding Non-Disclosure Agreement (NDA). All source code, assets, and documentation are the intellectual property of the Ecological Servants Project and are protected by applicable copyright and trademark laws.

## Description

EcoServants CSR is a WordPress plugin designed for environmental volunteers to submit Community Site Reports (CSR) after cleanup events. The goal is to replace paper forms with a mobile-friendly digital form that categorizes and stores the results of cleanup efforts.

## Features

- Creates a custom post type called `csr_report`
- Adds a frontend form (via shortcode) where users can submit cleanup data
- Includes smart litter categorization
- Stores form data in custom fields for each category
- Includes basic input validation, anti-spam (honeypot or nonce), and success message on submission
- Adds an admin panel for staff to view and manage submissions
- Uses enqueue scripts/styles for clean UI
- Fully responsive/mobile-friendly

## Installation

1. Upload the `ecoservants-csr` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Use the `[csr_form]` shortcode to embed the form on any page.

## Usage

Use the following shortcodes to display various parts of the EcoServants CSR Plugin on your WordPress site:

- `[csr_form]` – Embeds the Community Site Report (CSR) submission form on a page.
- `[total_impact]` – Displays total impact metrics from all submitted cleanups (e.g., total trash removed, items recycled).
- `[wall_of_fame]` – Shows the latest cleanup results and publicly recognizes the volunteers involved.

Admins can view and manage submissions from the WordPress admin panel under the "CSR Reports" menu.

## Intended UI and System Enhancements

The next major phase of the EcoServants CSR Plugin is a user experience upgrade that keeps the same core reporting mechanics while making the submission process more guided, visual and useful for long-term environmental reporting.

### Screen-by-Screen Question Flow

The CSR form is intended to move from a long-form layout into a guided Q&A experience. Instead of requiring users to scroll through many fields at once, the system should ask one clear question per screen. This approach will make the CSR easier for first-time volunteers, cleanup leaders, interns and corporate users to complete accurately.

Planned improvements include:

- One focused question or decision per screen
- A clear progress indicator across the report process
- Save and exit functionality for longer submissions
- Simple help prompts or “how it’s done” guidance
- A cleaner mobile-friendly experience for field reporting
- Separate paths based on whether the report is submitted by an individual or an organization/company

### Category Cards

Waste and restoration categories should be presented as large, clear selection cards rather than long form fields. These cards should help users quickly identify what type of material they collected or documented.

Planned category card examples include:

- Plastic Waste
- Paper Waste
- Metal Waste
- Glass Waste
- Cigarette Litter
- Medical Waste
- Invasive Species
- Food Waste
- Textile Waste
- Other Waste

Each card should include a simple label, icon, brief description and examples so users can choose the correct category more confidently.

### Pinwheel Subcategory Selection

After a user selects a category, the next screen is intended to show a visual subcategory selector. For example, if a user chooses Plastic Waste, the system could display a circular pinwheel with Plastic in the center and subcategories around it.

Potential plastic subcategories include:

- Plastic bottles
- Bottle caps
- Straws and stirrers
- Plastic bags
- Food wrappers
- Plastic utensils
- Cups and lids
- Six-pack rings
- Microplastics
- Toys
- Hard plastics
- Packaging materials
- Fishing nets or plastic-based fishing gear

The goal is to make subcategory selection easier to teach, easier to use during cleanups and more consistent across reports submitted by different volunteers or teams.

### Weight and Item Count Inputs

The redesigned CSR should allow users to record both weight and item count when appropriate. The interface should keep these inputs simple and close to the selected category or subcategory, helping users enter useful data without feeling overwhelmed.

### Corporate CSR Path

A dedicated corporate path is intended for companies, sponsors, employee volunteer teams, schools, organizations and community groups. This experience should do more than ask what was collected. It should help the organization understand and communicate why the data matters.

The corporate path may support:

- Company or organization name
- Team size and participant tracking
- Activity type
- Cleanup, restoration or offset goals
- Waste categories and total impact
- Supporting documentation and photos
- Branded impact summaries
- Exportable reports
- Recognition tools for sponsors and partners
- Leaderboards or impact comparisons
- Integrations for future reporting, dashboards or partner systems

The corporate CSR experience should help EcoServants provide clean data, branded summaries, measurable impact and public recognition. Over time, this can turn the CSR from a reporting form into a stronger corporate engagement tool that supports environmental action, sponsorships, grant reporting and community partnerships.

### Long-Term Vision

The redesigned CSR should feel less like a static form and more like a guided environmental reporting assistant. Better user experience should lead to better data. Better data should lead to stronger reports, stronger public impact metrics and stronger evidence for grants, sponsors and community partnerships.
