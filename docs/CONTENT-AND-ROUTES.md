# Content inventory and route map

## New site routes

| Route | Purpose | Current content confidence |
|---|---|---|
| `index.html` | Main landing page | Association name and site scope verified from repository documentation |
| `events.html` | Activities and courses index | One historical activity verified; no upcoming activities verified |
| `event-2026-10-31.html` | Historical event page | Date and event type verified; remaining event details pending |
| `about.html` | Association / website information | Website scope described; official history and mission pending |
| `contact.html` | Contact and FAQ | Official email, phone, address and social links pending |

## Verified facts used

- Site identity: 新北市土地利用學會｜活動與課程.
- The main website and event registration page are one integrated website system.
- A 2026-10-31 special lecture event page existed.
- The 2026-10-31 event is in the past and must not show an active registration action.
- Existing registration backend is a Google Apps Script Web App and Google Sheets.

## Content intentionally not invented

- Official association mission, history, leadership and membership statistics.
- Exact lecture title, speakers, schedule, venue, fee and attachments.
- Future events or course dates.
- Official contact channels.
- API endpoint, field names, request payload, response payload, secret values or sheet IDs.

## Original production sites (unchanged)

- Main site: https://twlu-events.rtfghggytjjj.chatgpt.site/
- October 2026 event: https://land-seminar-october-2026.rtfghggytjjj.chatgpt.site

## Integration checklist

Before reconnecting registration:
1. Import the actual Apps Script source after removing secrets and attendee data.
2. Capture the exact request and response contract from the existing implementation.
3. Verify all field names, option codes and required/optional behavior.
4. Preserve request-ID idempotency and duplicate-registration prevention.
5. Test in a safe environment; do not submit live attendee data during preview.
6. Verify registration-open/closed states against actual event configuration.
