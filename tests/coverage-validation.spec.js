const { allure } = require('allure-playwright');
const { test, expect } = require('@playwright/test');
const swaggerEndpoints = require('../test-data/swagger-endpoints.json');
const moduleEndpoints = require('../test-data/module-endpoints');

// Deep validation (executed/passed/failed/not-executed against the current run's
// results) happens in scripts/run-and-report.js, which reads the finished run's
// results.json. This test statically validates endpoint -> module-file mapping.
test.describe('Endpoint coverage validation', () => {
  test('every Swagger operation maps to exactly one module test file, under its own tag', async () => {
    const swaggerKeys = swaggerEndpoints.map((ep) => `${ep.method} ${ep.path}`);
    const uniqueSwaggerKeys = new Set(swaggerKeys);
    expect(uniqueSwaggerKeys.size, 'Swagger inventory contains duplicate method+path entries').toBe(swaggerKeys.length);

    // key -> list of modules it was found under (should end up with exactly 1 each)
    const occurrences = new Map();
    for (const [tag, info] of Object.entries(moduleEndpoints)) {
      for (const ep of info.endpoints) {
        const key = `${ep.method} ${ep.path}`;
        if (!occurrences.has(key)) occurrences.set(key, []);
        occurrences.get(key).push(tag);
      }
    }

    const missing = [];
    const duplicated = [];
    const wrongModule = [];
    for (const ep of swaggerEndpoints) {
      const key = `${ep.method} ${ep.path}`;
      const foundIn = occurrences.get(key) || [];
      if (foundIn.length === 0) missing.push(key);
      else if (foundIn.length > 1) duplicated.push(`${key} (in: ${foundIn.join(', ')})`);
      else if (foundIn[0] !== ep.tag) wrongModule.push(`${key} (expected ${ep.tag}, found in ${foundIn[0]})`);
    }

    await allure.attachment(
      'Module Mapping Summary',
      JSON.stringify(
        { totalSwaggerOperations: swaggerKeys.length, missing, duplicated, wrongModule },
        null,
        2
      ),
      'application/json'
    );

    expect(missing, `Endpoint(s) missing from any module test file: ${missing.join(', ')}`).toHaveLength(0);
    expect(duplicated, `Endpoint(s) duplicated across module test files: ${duplicated.join(', ')}`).toHaveLength(0);
    expect(wrongModule, `Endpoint(s) placed under the wrong module file: ${wrongModule.join(', ')}`).toHaveLength(0);
  });
});
