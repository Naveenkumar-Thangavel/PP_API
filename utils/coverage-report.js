const fs = require('fs');
const path = require('path');
const swaggerEndpoints = require('../test-data/swagger-endpoints.json');
const moduleEndpoints = require('../test-data/module-endpoints');

function testFileFor(tag) {
  return (moduleEndpoints[tag] && moduleEndpoints[tag].testFile) || 'unknown';
}

function loadJsonResults(rootDir) {
  const resultsPath = path.join(rootDir, 'test-results', 'results.json');
  if (!fs.existsSync(resultsPath)) return null;
  return JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
}

// Walks the Playwright JSON reporter's suite tree. Our endpoint test titles are
// exactly "METHOD /path", matching the Swagger inventory one-to-one.
function collectTestRecords(suite, records) {
  for (const spec of suite.specs || []) {
    for (const t of spec.tests || []) {
      const lastResult = t.results && t.results[t.results.length - 1];
      records.push({ title: spec.title, status: lastResult ? lastResult.status : 'unknown' });
    }
  }
  for (const child of suite.suites || []) collectTestRecords(child, records);
}

/** Coverage = Executed / Total * 100, based on unique Swagger method+path. */
function buildSummary(rootDir) {
  const total = swaggerEndpoints.length;
  const endpointKeys = new Set(swaggerEndpoints.map((ep) => `${ep.method} ${ep.path}`));
  const results = loadJsonResults(rootDir);

  if (!results) {
    return {
      total,
      executed: 0,
      passed: 0,
      failed: 0,
      notExecuted: total,
      duplicates: [],
      skipped: [],
      endpoints: swaggerEndpoints.map((ep) => ({ ...ep, testFile: testFileFor(ep.tag), status: 'not executed' })),
      coveragePercent: 0,
      note: 'No test-results/results.json found yet; run `npm run test:api` first.',
    };
  }

  const records = [];
  for (const suite of results.suites || []) collectTestRecords(suite, records);

  const seen = new Map();
  const duplicates = [];
  const skipped = [];
  for (const r of records) {
    if (!endpointKeys.has(r.title)) continue; // ignore non-endpoint tests (e.g. coverage validation)
    if (seen.has(r.title)) {
      duplicates.push(r.title);
      continue;
    }
    if (r.status === 'skipped') {
      skipped.push(r.title);
      seen.set(r.title, 'skipped');
    } else {
      seen.set(r.title, r.status === 'passed' ? 'passed' : 'failed');
    }
  }

  let passed = 0;
  let failed = 0;
  for (const status of seen.values()) {
    if (status === 'passed') passed++;
    else if (status === 'failed') failed++;
  }

  const executed = seen.size - skipped.length;
  const notExecuted = total - seen.size;
  const coveragePercent = total === 0 ? 0 : Number(((executed / total) * 100).toFixed(2));

  const endpoints = swaggerEndpoints.map((ep) => {
    const key = `${ep.method} ${ep.path}`;
    return { ...ep, testFile: testFileFor(ep.tag), status: seen.get(key) || 'not executed' };
  });

  return { total, executed, passed, failed, notExecuted, duplicates, skipped, endpoints, coveragePercent };
}

function toMarkdown(summary) {
  const { total, executed, passed, failed, notExecuted, duplicates, endpoints, coveragePercent, note } = summary;
  const lines = [];
  lines.push('# Endpoint Coverage Report');
  lines.push('');
  if (note) lines.push(`> ${note}`, '');
  lines.push(`- Total Swagger operations: ${total}`);
  lines.push(`- Executed: ${executed}`);
  lines.push(`- Passed: ${passed}`);
  lines.push(`- Failed: ${failed}`);
  lines.push(`- Not executed: ${notExecuted}`);
  if (duplicates && duplicates.length) lines.push(`- Duplicate test titles detected: ${duplicates.join(', ')}`);
  if (summary.skipped && summary.skipped.length) lines.push(`- Skipped (not allowed): ${summary.skipped.join(', ')}`);
  lines.push(`- Coverage: ${coveragePercent}% (Executed / Total)`);
  lines.push('');
  lines.push('| Module | Test File | Method | Path | Executed | Status |');
  lines.push('|---|---|---|---|---|---|');
  for (const ep of endpoints || []) {
    const executedFlag = ep.status === 'not executed' ? 'no' : 'yes';
    lines.push(`| ${ep.tag} | ${ep.testFile} | ${ep.method} | ${ep.path} | ${executedFlag} | ${ep.status} |`);
  }
  return lines.join('\n') + '\n';
}

function generateReportFiles(rootDir) {
  const summary = buildSummary(rootDir);
  fs.writeFileSync(path.join(rootDir, 'endpoint-coverage.json'), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(rootDir, 'endpoint-coverage.md'), toMarkdown(summary));
  return summary;
}

module.exports = { buildSummary, toMarkdown, generateReportFiles };

