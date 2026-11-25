# Registration API contract (recovered snapshot)

This document records the interface observed in the uploaded Apps Script source snapshot. It is not a live endpoint verification.

## Transport

- Backend: Google Apps Script Web App.
- Method: `POST` with JSON request body.
- `GET` returns `{ "ok": false, "error": "Method not allowed" }`.
- Request body shape:

```json
{
  "secret": "<shared secret; never commit>",
  "data": {
    "name": "...",
    "gender": "男",
    "mobile": "09xxxxxxxx",
    "email": "",
    "birthYear": "",
    "areaCode": "",
    "landline": "",
    "extension": "",
    "city": "",
    "district": "",
    "address": "",
    "plan": "memberFull",
    "session": "",
    "meal": "葷食",
    "requestId": "<36-character UUID>"
  }
}
```

The payload above is a field-shape reference only; it contains no real registrant data or secret.

## Plan codes and fees

| Plan code | Display label | Fee (NTD) |
|---|---|---:|
| `memberFull` | 會員全天 | 1,200 |
| `guestFull` | 非會員全天 | 2,400 |
| `memberHalf` | 會員半天 | 800 |
| `guestHalf` | 非會員半天 | 1,600 |

Half-day plans require `session` to be `上午` or `下午`, and `meal` must be `不用餐`.

## Validation and behavior

- Name: string, 2–50 characters.
- Mobile: Taiwanese mobile format `09########`.
- Gender: `男` or `女`.
- Meal: `全素食`, `蔬食`, `葷食`, or `不用餐`.
- `requestId`: 36-character UUID-like value.
- Optional string fields are length-limited to 150 characters.
- Request body size is limited to 16,000 characters.
- A script lock serializes writes.
- Repeated `requestId` returns the previously assigned registration ID.
- Duplicate name + mobile combinations are rejected.
- Spreadsheet text is prefixed when needed to reduce formula injection risk.
- Registration cutoff in the recovered source: `2026-10-26T23:59:59+08:00`.

## Responses

Success:

```json
{ "ok": true, "registrationId": "NTLU-261031-XXXXXXXXXXXX" }
```

Duplicate:

```json
{ "ok": false, "duplicate": true }
```

Other validation, authentication or processing failures:

```json
{ "ok": false }
```

## Configuration and secrets

- `SHEET_ID` and `SHEETS_SECRET` are Script Properties.
- Neither value belongs in Git, browser code, logs or public assets.
- The Site runtime must continue to send the same shared secret and request structure.
- The exact deployed Web App URL and live deployment version were not present in the recovered source file and have not been inferred.
