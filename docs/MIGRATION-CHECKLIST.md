# Migration checklist — TWLU official website

Last reviewed: 2026-11-25
Target repository: `abert5551530605/twlu-events`
Working branch: `redesign/ui-ux-pro-max-v2`
Official source: https://twlu.site/

## Completed in the preview branch
- [x] Set the official WordPress website as the public-content authority.
- [x] Record the association's mission and founding date (2004-08-27).
- [x] Record the current 8th-term board / supervisor roster from the current indexed official listing.
- [x] Add the December 5, 2026 seminar with lecturer, outline, time, venue, deadline and exact BeClass URL.
- [x] Add the October 31, 2026 historical event with its original details and no active registration CTA.
- [x] Migrate partial 2025–2026 event history.
- [x] Add association history, past-presidents, organization, documents and membership information routes.
- [x] Record the original WordPress navigation structure and member-only portal boundary.
- [x] Distinguish BeClass registration from the separate ChatGPT Sites / Apps Script workflow.
- [x] Add GitHub Actions static-site checks; latest checked run passed.

## Still required before production deployment
- [ ] Export the official logo in original resolution and brand guidelines.
- [ ] Export all public WordPress media: event photos, activity galleries, PDF attachments and document scans.
- [ ] Import the original registration certificate, current charter, organization chart, committee chart, election/recall rules and committee rules.
- [ ] Retrieve the complete "歷任理事長" list and verify all term dates.
- [ ] Retrieve the original "加入會員" content, eligibility, fees, application form and privacy notice.
- [ ] Reconfirm the current public telephone, fax and email; current page copy only has older footer details.
- [ ] Decide whether the member-only portal is retained, moved to a legacy subdomain or migrated as an authenticated service. Never publish member lists, financial records, meeting minutes or private correspondence as static public files.
- [ ] Replace every `twlu.site` source-site link with a local route or approved legacy destination before domain cutover.
- [ ] Verify the December 5 BeClass form is still active, not full and using the intended registration fields.
- [ ] Import/compare the separate ChatGPT Sites project source and Apps Script only if it is still intended to be part of the final service. Do not merge its API with BeClass without evidence.
- [ ] Create a redirect map for old WordPress page URLs and media paths.
- [ ] Run visual QA at 320, 375, 768, 1024 and 1440px; keyboard, contrast, reduced-motion and screen-reader checks.
- [ ] Deploy to an isolated preview URL and test all pages, links, forms and media.
- [ ] Confirm rollback plan and only then switch `twlu.site` DNS / hosting.

## Notes
- The browser could extract public text and source image URLs but did not provide downloadable image bytes. Do not claim original photos have been migrated until the actual files are committed.
- Old cached pages can show the 7th-term roster; the current indexed source result shows the 8th-term roster. Use the current term and retain the old one only as historical data.
