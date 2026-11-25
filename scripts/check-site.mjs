import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html",
  "events.html",
  "event-2026-10-31.html",
  "about.html",
  "contact.html",
  "assets/css/site.css",
  "assets/js/site.js",
  "assets/favicon.svg"
];

const errors = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push("Missing required file: " + file);
}

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
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(ref)) continue;
    const localPath = ref.split("#")[0].split("?")[0];
    if (!localPath) continue;
    const target = path.resolve(root, path.dirname(file), localPath);
    if (!target.startsWith(root + path.sep) && target !== root) {
      errors.push(file + ": reference escapes repository: " + ref);
    } else if (!fs.existsSync(target)) {
      errors.push(file + ": broken local reference: " + ref);
    }
  }
}

const archived = fs.readFileSync(path.join(root, "event-2026-10-31.html"), "utf8");
if (/報名.{0,12}(立即|前往|登記)|立即.{0,12}報名/.test(archived)) {
  errors.push("Archived 2026-10-31 event page must not contain an active registration CTA");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Static site checks passed: required pages, landmarks, local references, and archived-event guard.");
