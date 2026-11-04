const { spawnSync } = require('child_process');
const path = require('path');
const { generateReportFiles } = require('../utils/coverage-report');

const result = spawnSync('npx', ['playwright', 'test'], { stdio: 'inherit', shell: true, cwd: path.join(__dirname, '..') });

const summary = generateReportFiles(path.join(__dirname, '..'));
console.log(
  `Endpoint coverage: ${summary.executed} executed (${summary.passed} passed, ${summary.failed} failed), ` +
    `${summary.notExecuted} not executed, out of ${summary.total} (${summary.coveragePercent}%)`
);

let validationFailed = false;
if (summary.duplicates.length > 0) {
  console.error(`Duplicate test titles for endpoint(s): ${summary.duplicates.join(', ')}`);
  validationFailed = true;
}
if (summary.skipped.length > 0) {
  console.error(`Skipped (not allowed) endpoint(s): ${summary.skipped.join(', ')}`);
  validationFailed = true;
}
if (summary.notExecuted > 0) {
  const missing = summary.endpoints.filter((ep) => ep.status === 'not executed').map((ep) => `${ep.method} ${ep.path}`);
  console.error(`${summary.notExecuted} Swagger operation(s) did not execute: ${missing.join(', ')}`);
  validationFailed = true;
}
if (summary.passed + summary.failed !== summary.total) {
  console.error(`Executed count mismatch: passed(${summary.passed}) + failed(${summary.failed}) !== total(${summary.total})`);
  validationFailed = true;
}

process.exit(validationFailed ? 1 : result.status ?? 0);
