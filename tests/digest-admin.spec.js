const { allure } = require('allure-playwright');
const { test, expect } = require('../fixtures/api.fixture');
const { sendRequest } = require('../utils/api-client');
const { assertResponseTime } = require('../utils/assertions');
const { hasAuthToken } = require('../utils/auth-helper');
const { summarizeBody } = require('../utils/allure-helper');
const { buildRequestOptions } = require('../test-data/synthetic-payloads');
const { captureContext, applyContext } = require('../test-data/context-capture');
const { DigestAdmin: { module: MODULE, testFile: TEST_FILE, endpoints: ENDPOINTS } } = require('../test-data/module-endpoints');

test.describe(MODULE, () => {
  const context = {};

  for (const ep of ENDPOINTS) {
    const title = `${ep.method} ${ep.path}`;

    test(title, async ({ anonRequest, authedRequest }) => {
      await allure.label('module', MODULE);
      await allure.label('testFile', TEST_FILE);
      await allure.label('endpoint', title);
      await allure.tag(MODULE);

      const options = buildRequestOptions(ep.method, ep.path);
      applyContext(context, options.data);
      applyContext(context, options.params);

      const client = hasAuthToken() ? authedRequest : anonRequest;
      const { response, body, durationMs } = await sendRequest(client, {
        method: ep.method,
        path: ep.path,
        ...options,
      });

      if (response.ok()) captureContext(context, body);

      assertResponseTime(durationMs);

      const reason = hasAuthToken()
        ? `Expected a successful response but got ${response.status()}: ${summarizeBody(body)}`
        : `AUTH_TOKEN not configured (authentication unavailable); request returned ${response.status()}: ${summarizeBody(body)}`;

      await allure.attachment('Verdict', response.ok() ? 'PASS' : `FAIL: ${reason}`, 'text/plain');

      expect(response.ok(), reason).toBeTruthy();
    });
  }
});
