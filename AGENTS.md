# AGENTS.md

## Project identity
This repository is exclusively for「新北市土地利用學會」official website redesign and migration.

## Content authority
- The official public content source is https://twlu.site/.
- Use the official WordPress pages, posts, categories, board roster and published registration links as the primary source for association content.
- Record the source URL and date checked for migrated facts.
- Preserve original wording for the association mission, names, event titles, dates, fees, venue and registration instructions.
- Do not invent missing content. Clearly mark details that could not be verified.
- Do not scrape or republish attendee lists or other personal information.

## Hard boundaries
- Do not mix in the Northern Moluccas Digital Historical Atlas project.
- Do not read from, copy, edit, or deploy the `northern-moluccas-historical-atlas` repository as part of this task.
- The official WordPress site at `twlu.site` must remain unchanged during preview.
- Earlier ChatGPT Sites project URLs are separate legacy sources. Do not confuse their page content or registration backend with the WordPress source.
- Do not change DNS or production routing until the user-authorized release plan is ready and all checks pass.

## Registration and data safety
- The official WordPress posts reviewed here use BeClass registration links. Preserve the exact URL from each source post.
- A separate ChatGPT Sites project previously used/discussed a Google Apps Script Web App and Google Sheets. Treat it as a distinct integration until source code and API contracts prove otherwise.
- Never guess an API endpoint or replace a verified registration link with an unverified endpoint.
- Never commit SHEETS_SECRET, API keys, tokens, private credentials, attendee data, or spreadsheets containing personal information.
- Do not log or expose registrant personal information.

## Public / member-area boundary
- The original WordPress navigation includes public association profile documents and a member area (login, correspondence archive, minutes, member list, financial statements and downloads).
- Do not migrate member lists, financial records, private correspondence, meeting records or other restricted content into a public static site.
- Confirm access control and authorization before any member-area migration.
- Public contact information from older page footers must be labelled as provisional until the association reconfirms it.

## Assets
- Preserve the official logo and original media files when supplied.
- Do not present a temporary geometric icon as the official logo.
- Do not hotlink same-domain WordPress media in a build intended to replace the `twlu.site` domain; download and commit original media first.
- If image bytes cannot be obtained, document the missing assets and do not fabricate replacements.

## Code quality and workflow
- Maintain a consistent responsive shell, semantic landmarks, keyboard access, contrast and reduced-motion support.
- Add or update tests for critical navigation, event status and registration link integrity.
- Run actual repository checks and report observed outcomes accurately.
- Deploy a preview first. Production cutover requires local media, verified registration, redirect mapping, and smoke tests.
