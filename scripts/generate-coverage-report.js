const { generateReportFiles } = require('../utils/coverage-report');

const summary = generateReportFiles(__dirname + '/..');
console.log(
  `Endpoint coverage: ${summary.executed} executed (${summary.passed} passed, ${summary.failed} failed), ` +
    `${summary.notExecuted} not executed, out of ${summary.total} (${summary.coveragePercent}%)`
);
