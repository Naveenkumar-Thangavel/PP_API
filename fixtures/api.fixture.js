const base = require('@playwright/test');
const { authHeaders } = require('../utils/auth-helper');

const test = base.test.extend({
  // Request context with Authorization header applied when AUTH_TOKEN is configured
  authedRequest: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: { 'Content-Type': 'application/json', ...authHeaders() },
    });
    await use(context);
    await context.dispose();
  },

  // Request context with no Authorization header, for auth-negative tests
  anonRequest: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
    await use(context);
    await context.dispose();
  },
});

module.exports = { test, expect: base.expect };
