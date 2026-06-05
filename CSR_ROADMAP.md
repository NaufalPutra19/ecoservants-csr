# CSR Redesign Roadmap

**Document Type:** Development Roadmap & Implementation Phasing
**Status:** Draft (Planning & Coordination)
**Last Updated:** June 2026

---

# Overview

This roadmap outlines a phased approach for evolving the current EcoServants CSR system from a long-form reporting experience into a guided, screen-by-screen environmental reporting flow.

The roadmap is intended to:

* Preserve the current backend and reporting structure
* Improve user experience incrementally
* Support mobile-first reporting
* Reduce implementation risk
* Organize future development tasks for the CSR team

The overall direction follows the CSR Captain’s Brief and prioritizes backward compatibility with the existing `csr_*` field structure and `csr_report` submission model.

---

# Core Development Principles

* Preserve existing `csr_*` backend fields wherever possible
* Avoid rewriting the current submission handler during early phases
* Improve UX incrementally rather than rebuilding everything at once
* Keep all current reports compatible with future dashboards and reporting tools
* Prioritize mobile usability and guided reporting flow
* Build reusable UI components for future expansion

---

# Phase 1 — Current System Stabilization & Mapping

## Goal

Understand and preserve the current CSR structure before major frontend redesign work begins.

## Focus Areas

* Review existing field names and post meta
* Audit `form-template.php`
* Audit `form-handler.php`
* Identify missing or inconsistent field handling
* Confirm current photo upload flow
* Preserve existing shortcode behavior

## Deliverables

* Process mapping document
* Implementation comparison document
* Field alignment review
* Backend compatibility notes

---

# Phase 2 — Guided Wrapper Prototype

## Goal

Convert the current long-form CSR into a guided multi-step flow without replacing the backend.

## Focus Areas

* Step-by-step navigation
* Next/Back controls
* Progress indicator
* Step validation
* Conditional screen flow
* Reuse existing field names

## Technical Direction

The first implementation should wrap the existing fields in a guided interface rather than replacing the submission system.

## Deliverables

* Multi-step frontend prototype
* Existing submission handler still functional
* Backward-compatible form submission

---

# Phase 3 — Category Card Interface

## Goal

Replace long checkbox-style category sections with visual category cards.

## Focus Areas

* Mobile-friendly category selection
* Card-based waste categories
* Visual selected states
* Responsive layouts
* Cleaner interaction flow

## Deliverables

* Reusable category card component
* Waste category selection screen
* Responsive mobile layout

---

# Phase 4 — Subcategory Selection System

## Goal

Improve subcategory selection with more visual interaction patterns.

## Focus Areas

* Pinwheel UI exploration
* Card-grid fallback option
* Weight and count entry flow
* Cleaner mobile interaction

## Notes

A grouped card layout may be used initially if the pinwheel interface proves too complex during early implementation.

## Deliverables

* Subcategory interaction prototype
* Count and weight integration
* Mobile usability testing

---

# Phase 5 — Team & Corporate Reporting Path

## Goal

Introduce optional team and corporate reporting support while preserving backward compatibility with the existing CSR submission flow and data model.

## Focus Areas

* Reporter type selection
* Conditional step rendering
* Optional team metadata fields
* Optional corporate reporting support

## Notes

This phase is an optional expansion path. The first guided wrapper implementation should keep current reporting behavior intact and only add new team/corporate metadata once the base flow is stable.

## Potential New Fields (moved)

Future team/corporate fields are documented in `IMPLEMENTATION_COMPARISON.md` to keep this roadmap focused on the guided-wrapper milestone. These fields are optional and out of scope for the initial implementation.

## Deliverables

* Branching workflow logic for optional reporter types
* Optional team/corporate metadata support
* Preserved compatibility with current reports

---

# Phase 6 — Review, Save State & Reliability

## Goal

Improve completion rate and reporting reliability.

## Focus Areas

* Review screen
* Edit-before-submit flow
* Draft save support
* Resume flow
* Validation improvements
* Safe defaults for skipped steps

## Deliverables

* Report review screen
* Save-and-resume prototype
* Improved validation handling

---

# Phase 7 — Gamification & Recognition

## Goal

Increase engagement while supporting EcoServants’ mission.

## Focus Areas

* Badge system concepts
* Milestone recognition
* Completion feedback
* Public impact visibility

## Possible Features

* First Report badge
* Cleanup milestone badges
* Restoration recognition
* Repeat participation tracking

## Deliverables

* Gamified completion concepts
* Recognition integration planning
* Expanded Wall of Fame ideas

---

# Suggested GitHub Issue Categories

* Backend compatibility
* Guided flow prototype
* Category card UI
* Pinwheel/subcategory UI
* Validation and safe defaults
* Mobile responsiveness
* Review screen
* Photo upload improvements
* Team/corporate reporting
* Gamification concepts

---

# Immediate Recommended Milestone

The safest first implementation milestone is:

> Build a guided multi-step wrapper around the existing CSR fields while preserving the current submission handler and `csr_*` backend structure.

This approach minimizes risk while allowing the team to improve user experience incrementally.

---

# Notes

* This roadmap is a working planning document and will evolve as development continues.
* Development phases may overlap depending on team size and implementation complexity.
* Frontend UX improvements should not break current CSR reporting or existing data structures.
