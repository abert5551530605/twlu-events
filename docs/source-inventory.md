# Source export inventory

**Project:** 新北市土地利用學會｜活動與課程  
**Repository:** `abert5551530605/twlu-events`  
**Export date:** 2026-11-25  
**Status:** Partial source recovery; not a complete Site project export.

## Safety and scope

- This repository is exclusively for the association website and its event registration system.
- The separate Northern Moluccas Digital Historical Atlas is out of scope and was not accessed or copied.
- The existing ChatGPT Sites production pages were not edited, unpublished, or redeployed.
- The `main` branch was not changed. This inventory and recovered backend source are staged on `source-export/staging-2026-11-25`.
- No attendee records, bank-account details, personal contact details, API secrets, or credentials are included.

## Existing Site entry points

- Main site: https://twlu-events.rtfghggytjjj.chatgpt.site/
- October 2026 event page: https://land-seminar-october-2026.rtfghggytjjj.chatgpt.site/

These URLs were recorded in the repository's pre-existing README. The published pages could not be opened through the available browsing interface in this session. More importantly, the original Site project checkout/source-export operation was not available in the current tool environment.

## Recovered source

| Component | Status | Evidence / notes |
|---|---|---|
| Google Apps Script backend | Partial recovery available | Based on the uploaded `registration-google-script.txt` snapshot dated 2026-10-03. A sanitized copy is in `integrations/google-apps-script/Code.gs`. |
| Backend API contract | Recovered from source snapshot | See `docs/backend-api-contract.md`. |
| Main-site page text | Reference only | A text snapshot exists in the user's File Library; it is not the original HTML/CSS/JavaScript source. |
| October event-page text | Reference only | A text snapshot exists in the user's File Library; it is not the original HTML/CSS/JavaScript source. |

## Missing items — not exported

1. **Main-site original HTML** — no Site project checkout was available.
2. **Main-site original CSS** — no source checkout or stylesheet files were available.
3. **Main-site original JavaScript** — no source checkout or script files were available.
4. **October event-page original HTML/CSS/JavaScript** — no source checkout was available.
5. **Images, logos, posters, icons, fonts and other static assets** — no asset directory or binary source package was available.
6. **Live Apps Script project export and deployment configuration** — only the uploaded source snapshot was recoverable; live project metadata, deployment URL, version history and runtime properties were not available.
7. **Google Sheets schema/data export** — no live spreadsheet export was performed. No registrant data was copied.

## Backend sanitization

The recovered Apps Script snapshot originally contained a literal private Google Spreadsheet ID. In the staged copy, this value is no longer embedded in source code; configure it as the Script Property `SHEET_ID`. The existing `SHEETS_SECRET` remains a Script Property and its value is not included. This changes configuration storage only; the request/response contract, validation rules, plan codes, deadline, duplicate protection and request-ID idempotency are retained.

Required Script Properties for the staged backend:

- `SHEET_ID` — private spreadsheet ID; configure only in Apps Script settings.
- `SHEETS_SECRET` — shared secret; configure only in Apps Script settings and the Site runtime.

## Next step required for a complete export

Obtain the original Site project checkout through the ChatGPT Sites project export/edit capability, then copy the returned original source tree and assets into this repository without recreating missing files. After import, compare the original pages and API calls against the published pages and this backend contract before any deployment decision.
