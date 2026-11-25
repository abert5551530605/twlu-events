# Official website content inventory and route map

## Primary content source

- Official association website: https://twlu.site/
- WordPress category: https://twlu.site/category/最新消息/
- WordPress category: https://twlu.site/category/課程報名/
- Current 8th-term roster: https://twlu.site/理監事名單/
- Author archive: https://twlu.site/author/master/
- Crawled / reviewed: 2026-11-25.
- The official site is the authority for public association content, event facts, published registration URLs, and officer roster. If the source changes, re-verify before updating this repository.

## Routes

| Route | Purpose |
|---|---|
| `index.html` | Home, mission and next upcoming seminar |
| `events.html` | Upcoming and recently held events |
| `event-2026-12-05.html` | December 5, 2026 seminar and BeClass link |
| `event-2026-10-31.html` | October 31, 2026 historical event |
| `archive.html` | 2025–2026 historical event index |
| `about.html` | Mission and association profile |
| `board.html` | 8th-term board and supervisors |
| `gallery.html` | Official photo archive links and migration notes |
| `contact.html` | Official website and registration guidance |

## Verified mission

「致力研習土地利用法規 整合土地最有價值資訊 協助政府推動土地政策 創造土地最有利之價值」

## Verified 8th-term roster

Term: 2025-12-31 through 2028-12-30 (ROC 114-12-31 through 117-12-30).

- Chair: 李旻達
- Vice chairs: 黃佩玉、陳敏琪
- Directors: 鄧淑富、黃韻真、陳瑞惠、林冠伶、楊庭安、鄭宇致、黃聖芳、鄭宗裕
- Standing supervisor: 陳月梅
- Supervisors: 李月雲、談仁民
- Secretary-general: 沈思宥

## Verified 2026 event data

### 2026-12-05 (published 2026-11-05)
- Event: 115年十一月份專題講座
- Lecturer: 黃偉政老師
- Topic: 抵押權法令實務眉角解析
- Registration deadline: 2026-11-30
- Class time: 09:30–12:30, 13:45–16:45 (six hours)
- Venue: 新北市板橋區農會, 新北市板橋區府中路29-1號15樓
- BeClass: https://www.beclass.com/rid=31528ee6ae84276cc736

### 2026-10-31
- Lecturer: 鄭竹祐老師
- Topics: 意定監護法令與實務研討；遺囑登記事件重點與實例研討
- Registration deadline: 2026-10-26
- Class time: 09:30–12:30, 13:45–16:45
- Venue: 新北市板橋區農會, 新北市板橋區府中路29-1號15樓
- BeClass: https://www.beclass.com/rid=30528426abcc68158c02

### Other 2026 events verified from the public archive
- 2026-09-19: 王世隆總經理; land-use law / investment intermediary practical topics; BeClass https://www.beclass.com/rid=30527db6a8fe052be4cd
- 2026-08-22: 工業用地開發策略與產業布局實務; 王世隆總經理; BeClass https://www.beclass.com/rid=305277a6a6b016b5f83d
- 2026-07-25: 區域計畫至國土計畫之土地使用管制法令解析與實務; 袁世芬老師; BeClass https://www.beclass.com/rid=305275d6a44df94814cf
- 2026-06-25–26: 特富野古道二日遊 (public archive has photo gallery; detailed itinerary not extracted)
- 2026-05-23: 工業用地管制實務及商機開發與陷阱; 郭永元老師
- 2026-04-25: 上午黃振國老師「115年新修正遺贈稅法…實例解析」；下午李忠憲老師「農地申請容許使用實務及執行業務稅務申報實務案例分析」
- 2026-03-28: 農業用地多元化使用商機歸納與實務解析; 崔富治老師

## Verified historical events
- 2025-12-31: 第八屆第一次會員大會、理事會、監事會暨專題演講; annual fee and event attendance notes were published; registration deadline 2025-12-15.
- 2025-11-22: 曾明宗老師; 非都市土地更正、變更編定暨容許使用作業實務研討.
- 2025-10-25: 鄭竹祐老師; 不動產特殊登記案例法令與實務分析.
- 2025-09-27: 上午郭永元老師、下午袁世芬老師; non-urban land building-line/setback and rural land zoning.
- 2025-07-26: 黃偉政老師; 買賣契約之法律及實務解析、優先購買權法律與實務解析.
- 2023-02-24: 第六、七屆理事長交接暨理監事授證典禮.
- 2022-12-29: 第七屆第一次會員大會.

## Important distinction: registration systems

The WordPress source pages reviewed here link to BeClass for event registration. The earlier ChatGPT Sites project also had a separately discussed Google Apps Script / Google Sheets workflow for its October event page. These are distinct integrations until original code and request/response contracts prove otherwise.

- Do not replace BeClass URLs with guessed Apps Script endpoints.
- Do not assume the ChatGPT Sites form and WordPress event registration are the same system.
- Do not publish attendee data, sheet exports, API keys, Apps Script properties, or credentials.
- The 2026-12-05 event should link to the exact BeClass URL above; confirm live status on BeClass before promoting registration.

## Assets not yet migrated

The public WordPress archive references original photographs under `/wp-content/uploads/`, including 2026 July course photos and historical event galleries. Browser extraction in this environment exposed the URLs but did not provide downloadable file bytes. The current preview links to the official photo archive rather than hotlinking assets that would break after a domain cutover.

Before switching the production domain:
1. Export/download original media from the WordPress media library or hosting backup.
2. Copy the original approved logo, photos, PDF attachments and other files into this repository.
3. Update local asset references and verify image dimensions/alt text.
4. Do not present the temporary geometric UI mark as the official logo.

## Production safety

- Official WordPress site: https://twlu.site/ (keep unchanged during preview).
- Earlier ChatGPT Sites project URLs remain separate legacy sources and must not be overwritten without a separate migration review.
- Do not point `twlu.site` DNS to GitHub Pages until all content, original media, registration and redirect tests are complete.
- Preview deployment must use a separate URL/domain.
- No production deployment or DNS change is performed by this content migration commit.


## Additional official-site navigation discovered

The original WordPress main menu includes:
- 學會簡介: 立案證書、學會成立沿革、歷任理事長、理監事名單、章程、學會組織表、專務委員會組織表、理監事選舉罷免辦法、專務委員會組織簡則.
- 課程報名、最新消息、加入會員.
- 會員專區: 會員登入、公文存檔、會議記錄、會員名單、收支結算、檔案下載.
- 聯絡我們、活動剪影.

The member-area items may contain restricted or personal/member financial information. Do not copy them into a public static website. Confirm access rules and preserve a secure authenticated system before migrating any member portal.

### Newly verified association history and public footer
- Association name: 新北市土地利用學會.
- Founding date: 2004-08-27 (ROC 93-08-27), official page: https://twlu.site/學會成立沿革/
- Original public footer (older page version): TEL (02) 2961-8835; FAX (02) 2961-7156; E-mail f540419@yahoo.com.tw. These details are marked as needing reconfirmation before production.
- Original navigation confirms the existence of public pages for registration certificate, charter, past chairs, organization charts, committee organization, election/recall rules and committee rules. Their full contents or original attachments were not available in the current browser extraction and remain migration blockers.


## Additional public routes and migration gaps
- `history.html`: verified founding date and major public governance milestones.
- `past-presidents.html`: only 7th and 8th chairpersons are currently verified; earlier terms await the original official list.
- `organization.html`: records that the official site lists organization charts and committee rules; actual chart/document bytes are not yet imported.
- `documents.html`: lists registration certificate, charter, organization charts, election/recall rules and committee rules as pending original-file import.
- `membership.html`: public membership application page exists on the original site, but eligibility, fee, application and privacy text were not retrievable; no guessed form is published.

## Official menu inventory / member portal
The original WordPress navigation also includes member-only areas for login, correspondence archive, meeting records, member lists, financial statements and downloads. These must not be copied to public static pages. Preserve an authenticated portal or arrange a separately secured migration; obtain the association's authorization and current access-control details first.


## Source freshness and conflicting cached versions
The direct browser-opened `/理監事名單/` page returned a stale 7th-term snapshot (crawled as an older page), while a current search-indexed official result crawled 2026-11-25 reports the 8th-term roster and term 114-12-31 to 117-12-30. The new public board page uses the current 8th-term result; do not regress to the stale 7th-term snapshot. The 7th-term roster is retained only as historical context.

## Final domain-cutover blockers
- Import and verify original media/logo/PDF attachments.
- Reconstruct public pages for registration certificate, charter, organization charts, committee rules, election rules and membership application content.
- Decide how to preserve the member-only login and restricted member documents without exposing private records.
- Reconfirm public phone, fax and email before publishing them as current.
- Replace all source-site links that point back to `twlu.site` with local routes or an approved legacy subdomain before the DNS cutover.
