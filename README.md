# PowerPulse API Automation

Minimal Playwright + JavaScript API test suite for `PowerPulseRestAPI`, with Allure reporting.

OpenAPI source: `https://ubti-t-powerpulse-api.azurewebsites.net/swagger/v1/swagger.json`

## Setup

```bash
npm install
copy .env.example .env   # fill in AUTH_TOKEN to run authenticated checks
```

## Run

```bash
npm run test:api
npm run allure:generate
npm run allure:open
```

`npm run test:api` runs the suite then regenerates `endpoint-coverage.json` / `endpoint-coverage.md` (via `scripts/run-and-report.js`, which always runs the report step even if tests fail).
Run `npm run coverage:report` to regenerate them standalone without running tests.

## Environment variables

| Var | Purpose |
|---|---|
| `BASE_URL` | API host |
| `API_VERSION` | Value substituted into `{version}` path segments |
| `AUTH_TOKEN` | Bearer JWT. Without it, every test still executes anonymously and fails with the exact auth-unavailable reason (no `test.skip` is used). |
| `ALLOW_MUTATION` | Reserved; all 153 operations execute regardless using synthetic test data. |
| `TEST_TENANT_ID` | Placeholder tenant id used by payload builders. |
| `RESPONSE_TIME_THRESHOLD_MS` | Response time assertion threshold. |

## Design

- `utils/api-client.js` – sends requests, times them, attaches Allure detail (full detail only on failure).
- `utils/auth-helper.js` – bearer token helper.
- `utils/allure-helper.js` – masks `Authorization`, tokens, secrets, cookies, connection strings, credentials before attaching; `summarizeBody` formats masked failure reasons.
- `utils/assertions.js` – response-time and other generic assertion helpers.
- `utils/coverage-report.js` – builds the endpoint coverage summary and writes the JSON/MD reports.
- `fixtures/api.fixture.js` – `authedRequest` / `anonRequest` API request contexts.
- `tests/<module>.spec.js` – one file per Swagger tag/module (e.g. `tests/app.spec.js`, `tests/auth.spec.js`). Each file owns its endpoints' requests, synthetic payloads merge, and `expect()` assertions — no endpoint assertions live in `utils/`. No `test.skip` is used anywhere; every operation executes and reports pass or fail with an exact reason.
- `tests/coverage-validation.spec.js` – statically fails if any Swagger operation is missing from, duplicated across, or placed under the wrong module test file.
- `test-data/swagger-endpoints.json` – raw method/path/tag/summary snapshot extracted from the live OpenAPI spec (ground truth, 153 operations).
- `test-data/module-endpoints.js` – generated manifest mapping each module/tag to its test file and endpoint list; used by both the module spec files and the coverage validator.
- `test-data/synthetic-payloads.js` – synthetic request bodies/params for operations that need more than a generic pagination payload.

## Coverage

Coverage is computed on unique `method + path`, not test count: `Coverage% = Executed / Total * 100`.
See `endpoint-coverage.md` / `endpoint-coverage.json` at the repo root for the full per-endpoint breakdown (module, test file, method, path, executed, status).
- All 153 Swagger operations execute every run; none are skipped. Without a real `AUTH_TOKEN`, most fail with the exact reason attached to Allure (e.g. `401`, or `400` for endpoints whose custom auth/validation runs first).
- Successful responses from one endpoint in a module can feed dynamically captured IDs (`tenantId`, `id`, etc.) into later requests in the same module file instead of hardcoding resource IDs.
