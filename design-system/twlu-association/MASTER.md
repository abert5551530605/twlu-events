# TWLU Association Website — UI/UX Pro Max Redesign System

> Status: design specification prepared; implementation is blocked until the original Sites source and assets are imported.
> Scope: 「新北市土地利用學會｜活動與課程」母網站、活動列表、活動詳細頁、歷史活動頁與報名介面.
> Source of design guidance: [UI UX Pro Max Skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), especially its product/style/color/landing/typography catalogs and accessibility-first workflow.

## 1. Product and design direction

Treat this as a **public-interest professional association website with an event-discovery and registration service**, not as a generic SaaS dashboard or a flashy marketing landing page.

- Primary style: **Accessible & Ethical + Minimalism & Swiss Style**.
- Product-pattern reference: **Government/Public Service** for trust, clarity, accessibility and direct information architecture; **B2B Service** for professional credibility.
- Landing pattern: **Minimal & Direct**, with a clear institutional introduction, upcoming activities and focused calls to action.
- Visual character: contemporary, editorial, calm, credible, precise and welcoming.
- Default theme: light. Do not add dark mode unless the existing brand or user explicitly requires it.
- Avoid: glassmorphism, excessive gradients, decorative animation, neon palettes, emoji-as-icons, dense dashboard patterns, autoplay carousels and generic AI-generated hero art.

The goal is a substantial visual and information-architecture redesign while preserving the association's identity, actual content and working services.

## 2. Design tokens

The core palette follows the Skill's Government/Public Service / B2B Service palette direction. Use semantic tokens rather than scattering raw hex values through components.

| Token | Value | Use |
|---|---|---|
| Primary | #0F172A | Main brand anchor, headings, strong navigation |
| On Primary | #FFFFFF | Text on primary surfaces |
| Secondary | #334155 | Secondary controls and supporting emphasis |
| On Secondary | #FFFFFF | Text on secondary surfaces |
| Accent | #0369A1 | Links, primary actions, active states |
| On Accent | #FFFFFF | Text on accent surfaces |
| Background | #F8FAFC | Main page background |
| Foreground | #020617 | Main text |
| Card | #FFFFFF | Content cards and form surfaces |
| Card Foreground | #020617 | Card text |
| Muted | #E8ECF1 | Subtle surface and separators |
| Muted Foreground | #475569 | Secondary copy and metadata |
| Border | #E2E8F0 | Dividers, outlines and input borders |
| Destructive | #DC2626 | Errors and destructive actions |
| Ring | #0F172A | Keyboard focus ring |

Rules:
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text/UI boundaries; aim for 7:1 for primary reading text where practical.
- Do not communicate event status, validation or meaning by color alone. Pair color with text and/or an icon.
- Keep surfaces mostly white/light neutral; use the accent blue sparingly for links and high-value actions.
- Do not use the palette as permission to recolor an existing official logo. Preserve original logo artwork and colors after source import.

## 3. Typography

Skill reference: **Corporate Trust** (Lexend / Source Sans 3). Adapt for Traditional Chinese rendering:

- Latin headings: Lexend, with a Traditional Chinese sans-serif fallback such as Noto Sans TC and then system sans-serif.
- Body and interface: Source Sans 3, with Noto Sans TC and system sans-serif fallbacks.
- Use the same readable family consistently; do not introduce decorative display fonts.
- Base body size: 16px; body line-height: 1.5–1.7.
- Long-form descriptions and policy text should use comfortable line length (about 65–80 Latin characters per line, with responsive Chinese line wrapping).
- Use clear type hierarchy: one H1 per page, meaningful H2/H3 structure, consistent weight and spacing. Avoid tiny metadata.

## 4. Layout and navigation

### Global shell
- Use a consistent shared header, navigation, content container and footer across the homepage and all event pages.
- Desktop: concise top navigation with no more than five primary destinations; group secondary links rather than overcrowding the header.
- Mobile: accessible menu button with an explicit label, visible open/close state and keyboard support.
- Keep the association name/logo visible and provide a persistent, clearly named route back to the homepage.
- Provide a skip-to-content link and semantic landmarks.
- Use a centered responsive container (target max width around 1200px); do not hardcode fixed page widths.
- Mobile-first breakpoints should be based on content fit, with no horizontal page scrolling at 320px and above.

### Homepage information architecture
1. Institutional hero: concise association positioning, one clear primary action and one secondary action.
2. Upcoming activities: visually prominent, date-first cards with title, category, date/time, venue or online status, and registration status.
3. What the association does: activities, courses, professional exchange and public information, using only verified existing content.
4. About / mission: concise introduction with a route to the full association profile.
5. Latest news or resources: only if those sections exist in the source/content inventory.
6. Contact and institutional footer: verified contact details, links and required notices.

Do not invent testimonials, member counts, partner logos, achievements, addresses or activity data.

### Event listing and detail pages
- Event cards must expose title, date, format/location and current status without requiring hover.
- Provide useful filters only when supported by real data (e.g. upcoming / completed, category, year); preserve deep links and URL behavior.
- Event detail order: title and status → key facts → overview → agenda/speakers (if verified) → registration information/action → contact/notes.
- Make date, time, timezone, venue and registration deadline unambiguous.
- Completed events must be visibly marked as historical/ended. Never show an active registration CTA for the October 2026 event after its event date has passed.
- Historical pages may retain their original content and route, but forms must not imply that registration is open.

## 5. Registration UX and integration boundaries

The registration interface is part of the redesign, but its business logic is not to be rewritten as a visual task.

- Preserve the existing Google Apps Script Web App request contract, Google Sheets mapping, field names, option codes, validation, request-ID idempotency and duplicate-registration protection.
- Preserve all existing success, validation, duplicate, closed-registration and network-error states; improve their presentation without changing semantics.
- Every form field needs a visible label, helper text where useful, inline validation and a clear error message near the field.
- Keep entered values after recoverable errors; show loading feedback during submission and a clear success/error result.
- Never expose API keys, `SHEETS_SECRET`, tokens, Apps Script properties, private credentials or attendee data in client code or Git.
- Do not log or expose registrant personal information.
- Do not alter backend code or deployment configuration as part of a UI-only change unless separately reviewed and explicitly authorized.

## 6. Components and interaction standards

Build reusable shared components after identifying the actual stack and source boundaries:

- Header / desktop navigation / mobile navigation
- Skip link and breadcrumb (where useful)
- Page hero / section heading
- Event card / event status label / event metadata
- Event filters and empty state
- Content section / announcement panel
- Form field / select / checkbox / radio / validation message
- Primary, secondary and text buttons
- Success, warning, error and loading feedback
- Footer

Interaction requirements:
- Minimum target size: 44×44px for primary touch controls; keep at least 8px separation between adjacent controls.
- All interactive elements must work with keyboard and expose visible focus states.
- Icon-only controls require accessible names; use a consistent SVG icon family, not emoji.
- Provide hover, focus-visible, active, disabled and loading states.
- Use subtle transitions (roughly 150–250ms) only when they clarify state. Respect `prefers-reduced-motion`; no essential information may depend on animation.
- Avoid hover-only content, auto-rotating carousels and layout-shifting animations.

## 7. Responsive behavior

- Design and verify at 320/375/768/1024/1440px widths.
- Header navigation must collapse cleanly; buttons and forms must remain usable on touch screens.
- Event cards should move from a multi-column grid to a single-column mobile layout without clipping.
- Forms should become one column on narrow screens; labels, error messages and submit controls must remain visible.
- Images must use responsive sizing, descriptive alt text when meaningful, lazy loading below the fold and reserved aspect ratios to avoid layout shift.
- Respect browser zoom and text scaling; never disable user zoom.

## 8. Quality gates before release

- Inventory and compare all original pages, assets, links, content, form fields and backend request/response examples before implementation.
- Confirm the actual framework/build system from imported source; do not assume React, Tailwind or any other stack.
- Verify all existing URLs and navigation destinations.
- Test valid, invalid, duplicate and closed-registration flows against a safe test environment.
- Test keyboard-only navigation, focus order, screen-reader names, contrast, reduced motion and mobile reflow.
- Check console/network errors, image loading and layout shift.
- Run the repository's actual tests/build checks and report only commands that were run and results observed.
- Deploy a preview first. Production Sites pages must remain untouched until the preview and all critical flows are approved.

## 9. Blocking dependency

The current `abert5551530605/twlu-events` repository contains only `README.md` and `AGENTS.md`; it does not yet contain the actual Sites HTML/CSS/JavaScript, images/fonts, or Apps Script source. Therefore this document is a design-system specification, **not an implementation and not evidence that the website has been changed**.

Next implementation prerequisite: import the genuine source and static assets from the existing ChatGPT Sites project, plus a sanitized copy of the Apps Script source (no secrets or attendee data). Only then can the full redesign be applied without fabricating or breaking existing behavior.
