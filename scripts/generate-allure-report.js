const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const resultsDir = path.join(root, 'allure-results');
const stagedDir = path.join(root, 'test-results', 'allure-final-inputs');
const reportDir = path.join(root, 'allure-report');
const reportIndex = path.join(reportDir, 'index.html');

function removeAnalyticsScriptsFromSingleFile() {
  if (!fs.existsSync(reportIndex)) return;
  let html = fs.readFileSync(reportIndex, 'utf8');
  html = html.replace(/\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-FVWC4GKEYS"><\/script>\s*/g, '\n');
  html = html.replace(
    /\s*<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];[\s\S]*?gtag\('config', 'G-FVWC4GKEYS'[\s\S]*?<\/script>\s*/g,
    '\n'
  );
  fs.writeFileSync(reportIndex, html, 'utf8');
}

function main() {
  const playwrightResults = JSON.parse(
    fs.readFileSync(path.join(root, 'test-results', 'results.json'), 'utf8')
  );
  const start = Date.parse(playwrightResults.stats.startTime) - 1000;
  const end = start + playwrightResults.stats.duration + 16000;
  const results = [];

  for (const filename of fs.readdirSync(resultsDir)) {
    if (!filename.endsWith('-result.json')) continue;
    const fullPath = path.join(resultsDir, filename);
    const result = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const timestamp = Number(result.start);
    if (timestamp >= start && timestamp <= end) results.push({ filename, fullPath, result });
  }

  if (results.length === 0) throw new Error('No Allure results match the latest Playwright run window.');

  fs.rmSync(stagedDir, { recursive: true, force: true });
  fs.mkdirSync(stagedDir, { recursive: true });

  const copiedAttachments = new Set();
  for (const entry of results) {
    fs.copyFileSync(entry.fullPath, path.join(stagedDir, entry.filename));
    for (const attachment of entry.result.attachments || []) {
      if (!attachment.source || copiedAttachments.has(attachment.source)) continue;
      const source = path.join(resultsDir, path.basename(attachment.source));
      if (!fs.existsSync(source)) continue;
      fs.copyFileSync(source, path.join(stagedDir, path.basename(source)));
      copiedAttachments.add(attachment.source);
    }
  }

  const allureArgs = ['allure', 'generate', stagedDir, '--clean', '--single-file', '-o', reportDir];
  const generated =
    process.platform === 'win32'
      ? spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'npx', ...allureArgs], {
          stdio: 'inherit',
          cwd: root,
        })
      : spawnSync('npx', allureArgs, { stdio: 'inherit', cwd: root });
  if (generated.error) throw generated.error;
  if (generated.status !== 0) process.exitCode = generated.status || 1;
  else {
    removeAnalyticsScriptsFromSingleFile();
    console.log(
      `Generated offline single-file Allure report from ${results.length} results in the latest Playwright run: ${reportIndex}`
    );
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}