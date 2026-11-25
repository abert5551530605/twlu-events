import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html",
  "events.html",
  "event-2026-12-05.html",
  "event-2026-10-31.html",
  "archive.html",
  "about.html",
  "board.html",
  "gallery.html",
  "contact.html",
  "assets/css/site.css",
  "assets/js/site.js",
  "assets/favicon.svg"
];
const errors = [];
for (const file of required) if (!fs.existsSync(path.join(root, file))) errors.push("Missing required file: " + file);
const htmlFiles = required.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  if (!fs.existsSync(path.join(root, file))) continue;
  const source = fs.readFileSync(path.join(root, file), "utf8");
  if (!/<html lang="zh-Hant">/.test(source)) errors.push(file + ": missing Traditional Chinese document language");
  if (!/<meta name="viewport"/.test(source)) errors.push(file + ": missing viewport meta");
  if (!/<main id="main-content">/.test(source)) errors.push(file + ": missing main landmark");
  if (!/<title>/.test(source)) errors.push(file + ": missing page title");
  const refs = [...source.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)) continue;
    const localPath = ref.split("#")[0].split("?")[0];
    if (!localPath) continue;
    const target = path.resolve(root, path.dirname(file), localPath);
    if (!target.startsWith(root + path.sep) && target !== root) errors.push(file + ": reference escapes repository: " + ref);
    else if (!fs.existsSync(target)) errors.push(file + ": broken local reference: " + ref);
  }
}
const upcoming = fs.readFileSync(path.join(root, "event-2026-12-05.html"), "utf8");
if (!upcoming.includes("https://www.beclass.com/rid=31528ee6ae84276cc736")) errors.push("December 2026 event is missing the exact official BeClass URL");
if (!upcoming.includes("2026 年 11 月 30 日")) errors.push("December 2026 event is missing the verified registration deadline");
const archived = fs.readFileSync(path.join(root, "event-2026-10-31.html"), "utf8");
if (/立即.{0,12}報名|前往報名/.test(archived)) errors.push("Archived October 2026 event must not contain an active registration CTA");
if (!fs.readFileSync(path.join(root, "about.html"), "utf8").includes("致力研習土地利用法規")) errors.push("Official mission statement missing from About page");
if (!fs.readFileSync(path.join(root, "board.html"), "utf8").includes("李旻達")) errors.push("Verified 8th-term chair missing from board page");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Static site checks passed: route files, local references, official mission, board roster, event registration URL/deadline, and archived-event guard.");
