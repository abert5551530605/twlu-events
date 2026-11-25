/**
 * Google Apps Script registration backend.
 *
 * Sanitized source snapshot based on registration-google-script.txt (2026-10-03).
 * The original private Spreadsheet ID literal has been moved to Script Properties.
 *
 * Required Script Properties:
 *   SHEET_ID      - private Google Spreadsheet ID (do not commit)
 *   SHEETS_SECRET - shared secret expected by the Site runtime (do not commit)
 *
 * Deploy as a Web App: execute as owner; access anyone.
 * This file must never be served from a public/ directory.
 */

const PLAN_NAMES = {
  memberFull: '會員全天',
  guestFull: '非會員全天',
  memberHalf: '會員半天',
  guestHalf: '非會員半天'
};

const FEES = {
  memberFull: 1200,
  guestFull: 2400,
  memberHalf: 800,
  guestHalf: 1600
};

function output(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeText(value) {
  const s = String(value || '').trim();
  return /^[=+@\-\t\r]/.test(s) ? "'" + s : s;
}

function getRegistrationSheet_() {
  const sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!sheetId) throw new Error('Missing Script Property: SHEET_ID');

  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('報名資料');
  if (!sheet) throw new Error('找不到報名資料工作表');
  return sheet;
}

function doGet() {
  return output({ ok: false, error: 'Method not allowed' });
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 16000) {
      return output({ ok: false });
    }

    const body = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('SHEETS_SECRET');
    if (!secret || body.secret !== secret) return output({ ok: false });

    const d = body.data;
    if (
      !d ||
      typeof d.name !== 'string' ||
      d.name.length < 2 ||
      d.name.length > 50 ||
      !/^09\d{8}$/.test(d.mobile) ||
      !Object.prototype.hasOwnProperty.call(FEES, d.plan) ||
      !['男', '女'].includes(d.gender) ||
      !['全素食', '蔬食', '葷食', '不用餐'].includes(d.meal) ||
      !/^[a-f0-9-]{36}$/.test(d.requestId)
    ) {
      return output({ ok: false });
    }

    if (
      d.plan.endsWith('Half') &&
      (!['上午', '下午'].includes(d.session) || d.meal !== '不用餐')
    ) {
      return output({ ok: false });
    }

    for (const key of [
      'email', 'birthYear', 'areaCode', 'landline',
      'extension', 'city', 'district', 'address'
    ]) {
      if (typeof d[key] !== 'string' || d[key].length > 150) {
        return output({ ok: false });
      }
    }

    lock = LockService.getScriptLock();
    lock.waitLock(25000);

    const sheet = getRegistrationSheet_();
    const last = sheet.getLastRow();
    const rows = last > 1
      ? sheet.getRange(2, 1, last - 1, 20).getValues()
      : [];

    // Preserve idempotency: retries with the same requestId return the original ID.
    const prior = rows.find(row => String(row[19]) === d.requestId);
    if (prior) return output({ ok: true, registrationId: prior[0] });

    if (Date.now() > Date.parse('2026-10-26T23:59:59+08:00')) {
      return output({ ok: false });
    }

    // Preserve duplicate-registration protection.
    if (
      rows.some(row =>
        String(row[2]) === safeText(d.name) &&
        String(row[4]) === d.mobile
      )
    ) {
      return output({ ok: false, duplicate: true });
    }

    const registrationId =
      'NTLU-261031-' +
      Utilities.getUuid().replace(/-/g, '').slice(0, 12).toUpperCase();

    const row = [
      registrationId,
      new Date(),
      d.name,
      d.gender,
      d.mobile,
      d.email,
      d.birthYear,
      d.areaCode,
      d.landline,
      d.extension,
      d.city,
      d.district,
      d.address,
      PLAN_NAMES[d.plan],
      d.session,
      d.meal,
      FEES[d.plan],
      '待確認',
      '',
      d.requestId
    ];

    const target = sheet.getRange(last + 1, 1, 1, 20);
    target.setNumberFormat('@');
    target.setValues([row.map((value, index) =>
      index === 1 || index === 16 ? value : safeText(value)
    )]);

    sheet.getRange(last + 1, 2).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange(last + 1, 17).setNumberFormat('#,##0');
    SpreadsheetApp.flush();

    return output({ ok: true, registrationId });
  } catch (_) {
    return output({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

/**
 * Run once after setting SHEET_ID in Script Properties.
 * Generates SHEETS_SECRET only when one does not already exist.
 */
function setupConnection() {
  const properties = PropertiesService.getScriptProperties();

  if (!properties.getProperty('SHEET_ID')) {
    throw new Error(
      '請先在「專案設定」→「指令碼屬性」設定 SHEET_ID，勿將其提交至 Git。'
    );
  }

  if (!properties.getProperty('SHEETS_SECRET')) {
    properties.setProperty(
      'SHEETS_SECRET',
      Utilities.getUuid().replace(/-/g, '') +
      Utilities.getUuid().replace(/-/g, '')
    );
  }

  const sheet = getRegistrationSheet_();
  if (!sheet) throw new Error('找不到報名資料工作表');

  SpreadsheetApp.getUi().alert(
    '初始化完成。請確認 SHEETS_SECRET 與網站執行環境中的設定一致，勿公開分享。'
  );
}
