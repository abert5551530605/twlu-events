# TWLU Association Website — UI/UX Pro Max Redesign System

> Status: first-pass static implementation exists on `redesign/ui-ux-pro-max-v2`; official public content has now been researched and migrated into the preview branch. Original media assets and final brand artwork are still pending.
> Content authority: https://twlu.site/ (official WordPress site; reviewed 2026-11-25).
> Scope: association homepage, mission, activities, course registration links, historical archive, governance roster, photo archive and contact information.

## 1. Product and design direction
- Product: public-interest professional association website with event discovery and registration.
- Style: Accessible & Ethical + Minimalism & Swiss Style.
- Pattern: Government/Public Service for trust and clarity; B2B Service for professional credibility.
- Character: contemporary, editorial, calm, credible, precise and welcoming.
- Light theme; avoid excessive gradients, decorative animation, neon, generic AI hero imagery and dashboard patterns.

## 2. Design tokens
Primary #0F172A; secondary #334155; accent #0369A1; background #F8FAFC; surface #FFFFFF; muted #E8ECF1; text #020617; muted text #475569; border #E2E8F0.
Preserve the official logo's own artwork and colors when the source asset is obtained. Do not recolor it to fit the design tokens.

## 3. Typography
Lexend headings; Source Sans 3 body; Noto Sans TC / system sans-serif fallback. Base 16px, line-height 1.5–1.7. Keep clear H1/H2/H3 structure and comfortable line lengths.

## 4. Information architecture
- Home: mission, upcoming seminar, latest activities.
- Activities: upcoming / archive filters and clear event statuses.
- Event detail: title, status, lecturer, date, time, venue, outline and exact registration link.
- About: official mission and verified association description.
- Governance: current term board / supervisor roster.
- Archive: dated historical events.
- Gallery: preserve photo archive entry points; migrate original media before domain cutover.
- Contact: official website and confirmed contact channels only.

## 5. Content and registration
- Primary content source is official WordPress site https://twlu.site/.
- Preserve the exact BeClass URLs published on each event post.
- Distinguish official WordPress / BeClass flow from any separate ChatGPT Sites Google Apps Script workflow.
- Do not claim an event is open solely because a URL exists; show deadline and direct users to the actual form to confirm status.
- Historical events must not display an active registration CTA.
- Never expose API credentials or registrant data.

## 6. Accessibility and responsive behavior
- Semantic HTML, skip link, labelled navigation, keyboard focus and accessible button names.
- 44px minimum primary touch target; visible hover/focus/active/disabled states.
- 320px and above without horizontal overflow.
- Test 320/375/768/1024/1440px widths.
- Respect prefers-reduced-motion and browser zoom.

## 7. Quality gates before release
- Verify content, names, event date/time/venue, exact BeClass links.
- Import original logo, event photographs, PDFs and other media locally.
- Verify legacy URL redirects and page metadata.
- Test keyboard navigation, mobile reflow, image loading, contrast and console/network errors.
- Confirm December 2026 registration link and deadline on BeClass.
- Deploy preview first. Do not change production DNS until all checks pass.

## 8. Asset limitations
The public WordPress pages expose original media URLs, but the current environment did not provide downloadable image bytes. The preview therefore links to the official photo archive rather than hotlinking images that would fail after the domain cutover. Export the original media from WordPress hosting / media library before launch.
