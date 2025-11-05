#!/usr/bin/env node
/**
 * firebase-analyze.js
 * تحليل سريع لمشاريع Next.js + Firebase من Terminal (Firebase Studio)
 *
 * استخدم:
 *   node firebase-analyze.js           -> فقط تقرير (JSON + HTML) وطباعه بالعربية
 *   node firebase-analyze.js --fix     -> يطبّق تصحيحات آمنة (مثل إضافة via.placeholder.com)
 *
 * ملاحظة: السكربت يحاول إجراء تغييرات فقط عندما تحدد --fix. بدون --fix، لا يغير الملفات.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const cwd = process.cwd();
const outJson = path.join(cwd, 'project-analysis-report.json');
const outHtml = path.join(cwd, 'project-analysis-report.html');
const args = process.argv.slice(2);
const doFix = args.includes('--fix');

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
}

function fileExists(p) {
  try { return fs.existsSync(p); } catch { return false; }
}

function runCmd(cmd, opts = {}) {
  try {
    const out = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', ...opts });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, out: e.stdout ? String(e.stdout) : '', err: e.message };
  }
}

function scanFiles(root, exts = ['.js', '.jsx', '.ts', '.tsx']) {
  const items = [];
  (function walk(dir){
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        if (['node_modules', '.git', '.firebase'].includes(f)) continue;
        walk(full);
      } else {
        if (exts.includes(path.extname(full))) {
          items.push(full);
        }
      }
    }
  })(root);
  return items;
}

function findOccurrences(files, patterns) {
  const res = [];
  for (const file of files) {
    const content = readFileSafe(file);
    if (!content) continue;
    for (const p of patterns) {
      if (content.includes(p.string)) {
        res.push({ file, match: p.name, snippet: getSnippet(content, p.string) });
      }
    }
  }
  return res;
}
function getSnippet(content, token, len=80) {
  const i = content.indexOf(token);
  if (i === -1) return '';
  const start = Math.max(0, i - len/2);
  return content.substr(start, len).replace(/\n/g, ' ');
}

/* ------------------ Collect configs ------------------ */
const nextConfigPath = path.join(cwd, 'next.config.js');
const packageJsonPath = path.join(cwd, 'package.json');
const firebaseJsonPath = path.join(cwd, 'firebase.json');
const envLocalPath = path.join(cwd, '.env.local');

const nextConfig = readFileSafe(nextConfigPath);
const packageJsonRaw = readFileSafe(packageJsonPath);
let packageJson = null;
try { packageJson = packageJsonRaw ? JSON.parse(packageJsonRaw) : null; } catch(e) { packageJson = null; }

const firebaseJson = readFileSafe(firebaseJsonPath);
const envLocal = readFileSafe(envLocalPath);

/* ------------------ Static scans ------------------ */
const codeFiles = scanFiles(cwd);
const patterns = [
  { name: 'legacy-layout-next-image', string: 'layout=' },
  { name: 'via-placeholder', string: 'via.placeholder.com' },
  { name: 'AuthProvider', string: 'AuthProvider' },
  { name: 'next/image-import', string: "from 'next/image'" },
  { name: 'next-image-legacy-prop', string: 'legacy' }, // heuristic
];

const occurrences = findOccurrences(codeFiles, patterns);

/* ------------------ Checks & suggestions ------------------ */
const issues = [];
// next.config images.domains check
let domainsConfigured = false;
if (nextConfig) {
  const lower = nextConfig.toLowerCase();
  domainsConfigured = /images\s*:\s*{[^}]*domains\s*:/s.test(nextConfig);
  if (!domainsConfigured) {
    issues.push({ id: 'next-config-images', level: 'warning',
      message: 'لم يتم تكوين images.domains في next.config.js — سيمنع استخدام مضيفين خارجيين لخاصية next/image.'});
  } else {
    // check if via.placeholder.com present
    const hasVia = /via\.placeholder\.com/.test(nextConfig);
    if (!hasVia) {
      issues.push({ id: 'missing-via-placeholder', level: 'info',
        message: 'hostname "via.placeholder.com" غير موجود ضمن images.domains في next.config.js.'});
    }
  }
} else {
  issues.push({ id: 'missing-next-config', level: 'warning', message: 'ملف next.config.js غير موجود.'});
}

// allowedDevOrigins check (dev cross origin)
if (nextConfig) {
  if (!/allowedDevOrigins\s*:/.test(nextConfig)) {
    issues.push({ id: 'allowed-dev-origins', level: 'info',
      message: 'قد تحتاج لإضافة allowedDevOrigins في next.config.js لتفادي تحذيرات CORS أثناء التطوير (مثال مرفق).'});
  }
}

// Next.js version check
let nextVersion = null;
if (packageJson && (packageJson.dependencies || packageJson.devDependencies)) {
  nextVersion = (packageJson.dependencies && packageJson.dependencies.next) || (packageJson.devDependencies && packageJson.devDependencies.next) || null;
  if (nextVersion) {
    issues.push({ id: 'next-version', level: 'info', message: `نسخة Next.js المحددة: ${nextVersion}`});
  }
} else {
  issues.push({ id: 'package-json', level: 'warning', message: 'تعذر قراءة package.json أو لا يحوي dependencies.'});
}

// occurrences mapping to issues
for (const occ of occurrences) {
  if (occ.match === 'legacy-layout-next-image') {
    issues.push({ id: 'legacy-layout', level: 'error',
      message: `تم العثور على استعمال prop قديم "layout" مع next/image في الملف ${occ.file}. يجب تحديث استخدام الصورة لخصائص جديدة (width/height أو fill).`});
  } else if (occ.match === 'via-placeholder') {
    issues.push({ id: 'uses-via-placeholder', level: 'info',
      message: `يوجد إشارة إلى via.placeholder.com في ${occ.file}. تأكد من إضافة hostname في next.config.js.`});
  } else if (occ.match === 'AuthProvider') {
    issues.push({ id: 'authprovider', level: 'info',
      message: `تم العثور على AuthProvider في ${occ.file} — تأكد من إعداداته ومن عدم الاعتماد على fallback غير مرغوب.`});
  } else if (occ.match === 'next-image-import') {
    // note
  }
}

/* ------------------ Run quick commands ------------------ */
const cmdResults = {};
// npm outdated (non-fatal)
const npmOut = runCmd('npm outdated --json', { cwd });
if (npmOut.ok && npmOut.out.trim()) {
  try { cmdResults.npm_outdated = JSON.parse(npmOut.out); }
  catch { cmdResults.npm_outdated = npmOut.out; }
} else if (!npmOut.ok) {
  cmdResults.npm_outdated = npmOut.out || npmOut.err || 'npm outdated failed or no outdated packages.';
}

// eslint version (if npx present)
const eslintCheck = runCmd('npx eslint --version', { cwd });
cmdResults.eslint = eslintCheck.ok ? eslintCheck.out.trim() : 'eslint not available via npx or npx call failed.';

/* ------------------ Safe autofixes (only when --fix) ------------------ */
const fixesApplied = [];
if (doFix) {
  // 1) add via.placeholder.com to next.config.js if possible
  if (nextConfig && /images\s*:\s*{[^}]*domains\s*:\s*\[([^\]]*)\]/s.test(nextConfig)) {
    // insert via.placeholder.com into domains array if missing
    const newConfig = nextConfig.replace(/(images\s*:\s*{[^}]*domains\s*:\s*\[)([^\]]*)(\])/s, (m, p1, p2, p3) => {
      if (/via\.placeholder\.com/.test(p2)) return m;
      const trimmed = p2.trim();
      const add = trimmed.length === 0 ? `'via.placeholder.com'` : `${p2.trim().replace(/,\s*$/,'')}, 'via.placeholder.com'`;
      return p1 + add + p3;
    });
    if (newConfig !== nextConfig) {
      fs.writeFileSync(nextConfigPath, newConfig, 'utf8');
      fixesApplied.push({ fix: 'added-via-placeholder', file: nextConfigPath });
    }
  } else if (nextConfig) {
    // add an images.domains block
    const injection = `
/** auto-inserted by firebase-analyze.js to allow external images during dev **/
const __ANALYZE_INSERT__ = true;
if (typeof module !== 'undefined') {
  // NOTE: adjust this block manually if your next.config.js exports differently
}
`;
    // fallback: append a recommended snippet at end
    fs.appendFileSync(nextConfigPath, '\n\n// Recommended images/domains (added by analyzer):\n// images: { domains: [\'via.placeholder.com\'] }\n', 'utf8');
    fixesApplied.push({ fix: 'appended-suggestion-next-config', file: nextConfigPath });
  } else {
    // create minimal next.config.js
    const suggested = `/** next.config.js (auto-created suggestion) */
module.exports = {
  images: {
    domains: ['via.placeholder.com']
  },
  // add allowedDevOrigins in dev if needed:
  experimental: { },
  // allowedDevOrigins: ['http://localhost:9002'] // uncomment/modify if you hit cross-origin dev warnings
};
`;
    fs.writeFileSync(nextConfigPath, suggested, 'utf8');
    fixesApplied.push({ fix: 'created-next-config', file: nextConfigPath });
  }

  // 2) add allowedDevOrigins example if missing (append comment)
  if (nextConfig && !/allowedDevOrigins\s*:/.test(nextConfig)) {
    fs.appendFileSync(nextConfigPath, `\n// NOTE: you may add "allowedDevOrigins" to avoid cross-origin dev warnings\n// example:\n// allowedDevOrigins: ['http://localhost:9002'],\n`, 'utf8');
    fixesApplied.push({ fix: 'added-allowedDevOrigins-comment', file: nextConfigPath });
  }
}

/* ------------------ Build report ------------------ */
const report = {
  meta: { projectRoot: cwd, timestamp: new Date().toISOString(), node_version: process.version, fixMode: doFix },
  filesFound: { nextConfig: !!nextConfig, packageJson: !!packageJsonRaw, firebaseJson: !!firebaseJson, envLocal: !!envLocal },
  issues,
  occurrences,
  cmdResults,
  fixesApplied
};

/* ------------------ Write outputs ------------------ */
fs.writeFileSync(outJson, JSON.stringify(report, null, 2), 'utf8');

const html = `
<html>
<head><meta charset="utf-8"><title>Project Analysis Report</title></head>
<body style="font-family: sans-serif">
  <h1>تقرير تحليل المشروع</h1>
  <p>المشروع: ${cwd}</p>
  <p>الوقت: ${report.meta.timestamp}</p>
  <h2>ملخص المشاكل والتوصيات</h2>
  <ul>
    ${report.issues.map(i => `<li><strong>[${i.level}]</strong> ${i.message}</li>`).join('\n')}
  </ul>
  <h2>أحداث مفصّلة</h2>
  <pre>${JSON.stringify(report, null, 2)}</pre>
  <hr/>
  <p>ملف JSON: ${outJson}</p>
  <p>إصلاحات مُطبّقة: ${report.fixesApplied.length}</p>
</body>
</html>
`;
fs.writeFileSync(outHtml, html, 'utf8');

console.log('✅ تحليل المشروع اكتمل.');
console.log(`• تقرير JSON: ${outJson}`);
console.log(`• تقرير HTML: ${outHtml}`);
if (report.issues.length === 0) console.log('لا توجد مشاكل رئيسية مكتشفة.');
else {
  console.log(`تم العثور على ${report.issues.length} عنصر/عناصر تحتاج انتباهك:`);
  report.issues.forEach((i, idx) => console.log(`${idx+1}. [${i.level}] ${i.message}`));
}
if (doFix) {
  console.log('🛠️  تم تنفيذ أو محاولة تطبيق التصحيحات الآمنة التالية:');
  console.log(JSON.stringify(report.fixesApplied, null, 2));
} else {
  console.log('لإجراء تصحيحات آمنة تلقائياً: أعد تشغيل السكربت مع العلم --fix');
}
