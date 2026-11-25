# AGENTS.md

## Project identity

This repository is exclusively for「新北市土地利用學會｜活動與課程」.

The main association website and the October 2026 event registration page are parts of ONE integrated website system. Maintain them in this repository with shared branding, navigation, design conventions, and deployment practices.

## Hard boundaries

- Do not mix in the Northern Moluccas Digital Historical Atlas project.
- Do not read from, copy, edit, or deploy the `northern-moluccas-historical-atlas` repository as part of this task.
- Do not split the association homepage and October event registration page into unrelated repositories.
- Do not overwrite the existing ChatGPT Sites production pages while importing or testing code.

## Before changing code

1. Inspect the existing repository and imported source before choosing a framework or rewriting files.
2. Preserve existing page content, visual identity, URLs, form behavior, and backend contracts unless the user explicitly requests a change.
3. Identify the boundary between the main-site experience, event pages, and the registration backend.
4. Check the current state of the October 2026 event page. Its event date has passed; do not reopen registration or imply that registration is available.
5. Do not invent missing source files, API endpoints, credentials, deployment configuration, or test results.

## Registration and data safety

- The existing registration backend uses a Google Apps Script Web App and Google Sheets. Confirm the actual source and deployment configuration before modifying it.
- Preserve request-ID idempotency and duplicate-registration protections when modifying the registration flow.
- Never commit `SHEETS_SECRET`, API keys, tokens, private credentials, attendee data, or spreadsheets containing personal information.
- Keep secrets in Apps Script Properties or an appropriate protected environment.
- Avoid logging or exposing registrant personal information.

## Code quality and workflow

- Prefer small, reviewable changes over wholesale rewrites.
- Keep shared styles and components consistent across the homepage and event pages.
- Add or update tests for registration validation and critical navigation when the source supports them.
- Run the project's existing checks after changes; report commands and actual outcomes accurately.
- Separate preview from production deployment. Do not claim that a GitHub commit updates ChatGPT Sites automatically.
- Document any manual publishing or environment configuration required.

## Current repository status

On 2026-11-26 the user explicitly authorized a complete UI UX Pro Max redesign. This repository now contains that redesigned static association website, shared event detail pages, design records, build scripts, and automated checks. The existing October Apps Script backend and original Sites server source have not been imported or modified. See README.md and docs/integrations.md for the actual boundaries. GitHub CI builds artifacts; it does not publish over existing production.

