# Failed API Report
## Summary
- Total endpoints: 154
- Passed: 96 tests (95 tracked API operations; the remaining pass is coverage validation)
- Automation issues fixed: 8 root-cause fixes
- API failures: 22
- Environment failures: 10
- Skipped: 0
- Not executed: 27 live Swagger operations absent from the tracked suite; 0 of the tracked 153 operations

Run totals: 96 passed, 58 failed, 0 skipped across 154 tests. Endpoint coverage: 95 passed, 58 failed, 0 skipped across 153 tracked operations.
Inventory note: the user-provided 154 count matches the full Playwright test count, including one static validator. The checked-in inventory contains 153 API operations; the live OpenAPI document contains 180 operations.

## Failure Details
### POST /api/v{version}/App/GetAppDetail
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object fields: appSourceKey, tenantId.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"App not found.","instance":"/api/v1/App/GetAppDetail","message":"App not found.","traceId":"40000fe2-0000-b100-b63f. The configured synthetic app key does not identify an existing app; this is test-data coverage, not an API defect.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/App/GetAppDetail; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "appSourceKey": "synthetic-automation-value",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"App not found.","instance":"/api/v1/App/GetAppDetail","message":"App not found.","traceId":"40000fe2-0000-b100-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object fields: appSourceKey, tenantId.
- Reproduction command: npx playwright test tests/app.spec.js --grep "POST /api/v{version}/App/GetAppDetail"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/App/GetAppWithPages
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object fields: appSourceKey, tenantId.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"App not found.","instance":"/api/v1/App/GetAppWithPages","message":"App not found.","traceId":"40001028-0000-db00-b. The configured synthetic app key does not identify an existing app; this is test-data coverage, not an API defect.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/App/GetAppWithPages; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "appSourceKey": "synthetic-automation-value",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"App not found.","instance":"/api/v1/App/GetAppWithPages","message":"App not found.","traceId":"40001028-0000-db00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object fields: appSourceKey, tenantId.
- Reproduction command: npx playwright test tests/app.spec.js --grep "POST /api/v{version}/App/GetAppWithPages"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Audit/GetAuditLog
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filterColumn, filterValue.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"success":false,"message":"Internal server error occurred."}. A request matching the documented schema returned HTTP 500: {"success":false,"message":"Internal server error occurred."}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Audit/GetAuditLog; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc"
}
- Response evidence: {"success":false,"message":"Internal server error occurred."}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filterColumn, filterValue.
- Reproduction command: npx playwright test tests/audit.spec.js --grep "POST /api/v{version}/Audit/GetAuditLog"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/Auth/IsDomainAccepted
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object required: email fields: email.)
- Actual status: 400
- Reason: Assertion: Expected a successful response but got 400: Provided  Domain is restricted. The schema-valid synthetic email uses a domain the service explicitly restricts; no approved test domain is configured.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Auth/IsDomainAccepted; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "email": "qa.automation@example.com"
}
- Response evidence: Provided Domain is restricted
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object required: email fields: email.
- Reproduction command: npx playwright test tests/auth.spec.js --grep "POST /api/v{version}/Auth/IsDomainAccepted"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Auth/ValidateUnsubscribeToken
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object fields: token.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: Token decoding failed.. The payload has the documented shape, but its synthetic JWT is not a service-issued unsubscribe token.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Auth/ValidateUnsubscribeToken; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "token": "***MASKED***"
}
- Response evidence: Token decoding failed.
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object fields: token.
- Reproduction command: npx playwright test tests/auth.spec.js --grep "POST /api/v{version}/Auth/ValidateUnsubscribeToken"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Auth/EmailTrigger
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: string.)
- Actual status: 403
- Reason: Assertion: Expected a successful response but got 403: . The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: 
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Auth/EmailTrigger; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload "qa.automation@example.com"
- Response evidence: No response body
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: string.
- Reproduction command: npx playwright test tests/auth.spec.js --grep "POST /api/v{version}/Auth/EmailTrigger"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### POST /api/v{version}/Auth/testDigestEmail
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: query payload; JSON body: none.)
- Actual status: 403
- Reason: Assertion: Expected a successful response but got 403: . The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: 
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Auth/testDigestEmail?payload=synthetic-automation-value; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {"payload":"synthetic-automation-value"}; sanitized payload none
- Response evidence: No response body
- Swagger contract: Success: 200; other responses: none; query parameters: query payload; JSON body: none.
- Reproduction command: npx playwright test tests/auth.spec.js --grep "POST /api/v{version}/Auth/testDigestEmail"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### POST /api/v{version}/Auth/DecryptValue
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object required: encryptedValue fields: encryptedValue.)
- Actual status: 401
- Reason: Assertion: Expected a successful response but got 401: . The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: 
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Auth/DecryptValue; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "encryptedValue": "synthetic-automation-value"
}
- Response evidence: No response body
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object required: encryptedValue fields: encryptedValue.
- Reproduction command: npx playwright test tests/auth.spec.js --grep "POST /api/v{version}/Auth/DecryptValue"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### POST /api/v{version}/BackupArtifactVersion/SaveUserArtifactVersionPreferences
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: retentionDays, maxVersions, frequency, selectedWorkspaces.)
- Actual status: 400
- Reason: Assertion: Expected a successful response but got 400: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Invalid backup frequency.","instance":"/api/v1/BackupArtifactVersion/SaveUserArtifactVersionPreferences","message. The request shape matches Swagger, but the undocumented frequency enum rejects the synthetic value Daily.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/BackupArtifactVersion/SaveUserArtifactVersionPreferences; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "retentionDays": 30,
  "maxVersions": 5,
  "frequency": "Daily",
  "selectedWorkspaces": []
}
- Response evidence: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Invalid backup frequency.","instance":"/api/v1/BackupArtifactVersion/SaveUserArtifactVersionPreferences","message":"Invalid backup frequency.","traceId":"40000fe1-0000-b100-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: retentionDays, maxVersions, frequency, selectedWorkspaces.
- Reproduction command: npx playwright test tests/backup-artifact-version.spec.js --grep "POST /api/v{version}/BackupArtifactVersion/SaveUserArtifactVersionPreferences"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/BackupArtifactVersion/download
- Classification: API
- Expected: successful response (OpenAPI: Success: 200, 204; other responses: 500; query parameters: none; JSON body: object fields: artifactItemId, name, versionNumber, currentVersion, tenantId, type, workspaceSourceKey, workspaceName, ownerUPN, snapshotTimestamp, modifiedTimestamp, versionCount, versions, versionDetails.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/BackupArtifactVersion/download","message":"An unexpected erro. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/BackupArtifactVersion/download","message":"An unexpected error occurred.","traceId":"40000068-0000-a300-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/BackupArtifactVersion/download; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "artifactItemId": "synthetic-automation-value",
  "name": "synthetic-artifact",
  "versionNumber": "1",
  "tenantId": 253,
  "type": "Report",
  "ownerUPN": "qa.automation@example.com",
  "versions": "[]",
  "workspaceName": "synthetic-workspace",
  "workspaceSourceKey": "synthetic-automation-value"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/BackupArtifactVersion/download","message":"An unexpected error occurred.","traceId":"40000068-0000-a300-b63f-84710c7967bb"}
- Swagger contract: Success: 200, 204; other responses: 500; query parameters: none; JSON body: object fields: artifactItemId, name, versionNumber, currentVersion, tenantId, type, workspaceSourceKey, workspaceName, ownerUPN, snapshotTimestamp, modifiedTimestamp, versionCount, versions, versionDetails.
- Reproduction command: npx playwright test tests/backup-artifact-version.spec.js --grep "POST /api/v{version}/BackupArtifactVersion/download"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/BackupArtifactVersion/SaveBlobConnectionString
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: blobConnectionString.)
- Actual status: 400
- Reason: Assertion: Expected a successful response but got 400: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Invalid request parameters.","instance":"/api/v1/BackupArtifactVersion/SaveBlobConnectionString","message":"Inval. The configured connection string uses synthetic account credentials and cannot validate against Azure storage.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/BackupArtifactVersion/SaveBlobConnectionString; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "blobConnectionString": "***MASKED***"
}
- Response evidence: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Invalid request parameters.","instance":"/api/v1/BackupArtifactVersion/SaveBlobConnectionString","message":"Invalid request parameters.","traceId":"400023e0-0000-b000-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: blobConnectionString.
- Reproduction command: npx playwright test tests/backup-artifact-version.spec.js --grep "POST /api/v{version}/BackupArtifactVersion/SaveBlobConnectionString"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/BackupArtifactVersion/TriggerBlobConnectionIdWebhook
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: string.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Error","status":500,"detail":"Failed to trigger webhook.","instance":"/api/v1/BackupArtifactVersion/TriggerBlobConnectionIdWebhook","message":"Failed. The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: {"type":"https://httpstatuses.io/500","title":"Error","status":500,"detail":"Failed to trigger webhook.","instance":"/api/v1/BackupArtifactVersion/TriggerBlobConnectionIdWebhook","message":"Failed to trigger webhook.","traceId":"400041ab-0000-af00-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/BackupArtifactVersion/TriggerBlobConnectionIdWebhook; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload "synthetic-automation-value"
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Error","status":500,"detail":"Failed to trigger webhook.","instance":"/api/v1/BackupArtifactVersion/TriggerBlobConnectionIdWebhook","message":"Failed to trigger webhook.","traceId":"400041ab-0000-af00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: string.
- Reproduction command: npx playwright test tests/backup-artifact-version.spec.js --grep "POST /api/v{version}/BackupArtifactVersion/TriggerBlobConnectionIdWebhook"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### GET /api/v{version}/BackupArtifactVersion/GetBlobConnectionString
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: 404, 500; query parameters: none; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"No blob connection string found for the tenant.","instance":"/api/v1/BackupArtifactVersion/GetBlobConnectionString". The tenant has no blob connection string configured in this environment.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/BackupArtifactVersion/GetBlobConnectionString; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload none
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"No blob connection string found for the tenant.","instance":"/api/v1/BackupArtifactVersion/GetBlobConnectionString","message":"No blob connection string found for the tenant.","traceId":"40000b7a-0000-ad00-b63f-84710c79
- Swagger contract: Success: 200; other responses: 404, 500; query parameters: none; JSON body: none.
- Reproduction command: npx playwright test tests/backup-artifact-version.spec.js --grep "GET /api/v{version}/BackupArtifactVersion/GetBlobConnectionString"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### POST /api/v{version}/Client/GenerateEmailNotification
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object fields: tenantId, productCode.)
- Actual status: 401
- Reason: Assertion: Expected a successful response but got 401: . The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: 
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Client/GenerateEmailNotification; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": 253,
  "productCode": "PP"
}
- Response evidence: No response body
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object fields: tenantId, productCode.
- Reproduction command: npx playwright test tests/client.spec.js --grep "POST /api/v{version}/Client/GenerateEmailNotification"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### POST /api/v{version}/Client/GenerateEmailNotificationForSecret
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object fields: tenantId, productCode.)
- Actual status: 401
- Reason: Assertion: Expected a successful response but got 401: . The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: 
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Client/GenerateEmailNotificationForSecret; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": 253,
  "productCode": "PP"
}
- Response evidence: No response body
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object fields: tenantId, productCode.
- Reproduction command: npx playwright test tests/client.spec.js --grep "POST /api/v{version}/Client/GenerateEmailNotificationForSecret"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### GET /api/v{version}/Client/IsWorkspaceExist
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: 400; query parameters: none; JSON body: none.)
- Actual status: 400
- Reason: Assertion: Expected a successful response but got 400: {"isValid":false,"config":null,"message":"Client is yet to Configure"}. The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: {"isValid":false,"config":null,"message":"Client is yet to Configure"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Client/IsWorkspaceExist; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload none
- Response evidence: {"isValid":false,"config":null,"message":"Client is yet to Configure"}
- Swagger contract: Success: 200; other responses: 400; query parameters: none; JSON body: none.
- Reproduction command: npx playwright test tests/client.spec.js --grep "GET /api/v{version}/Client/IsWorkspaceExist"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### POST /api/v{version}/Client/Update
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object required: appClientId, appClientSecret fields: tenantId, appClientId, appTenantId, appClientSecret, appObjectId, appSecretKey, ownerName, ownerEmailId, organizationName, appRedirectUri, appSourceId, isActive, createdBy.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client/Update","message":"An unexpected error occurred.","tra. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client/Update","message":"An unexpected error occurred.","traceId":"400011db-0000-a900-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Client/Update; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "appClientId": "00000000-0000-4000-8000-000000000001",
  "appClientSecret": "***MASKED***",
  "tenantId": "253",
  "appTenantId": "00000000-0000-4000-8000-000000000001",
  "appObjectId": "00000000-0000-4000-8000-000000000001",
  "ownerName": "QA Automation",
  "ownerEmailId": "qa.automation@example.com",
  "organizationName": "QA Automation Org",
  "appSourceId": "synthetic-automation-value",
  "appRedirectUri": "https://example.com/callback"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client/Update","message":"An unexpected error occurred.","traceId":"400011db-0000-a900-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object required: appClientId, appClientSecret fields: tenantId, appClientId, appTenantId, appClientSecret, appObjectId, appSecretKey, ownerName, ownerEmailId, organizationName, appRedirectUri, appSourceId, isActive, createdBy.
- Reproduction command: npx playwright test tests/client.spec.js --grep "POST /api/v{version}/Client/Update"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/Client
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object required: appClientId, appClientSecret fields: tenantId, appClientId, appTenantId, appClientSecret, appObjectId, appSecretKey, ownerName, ownerEmailId, organizationName, appRedirectUri, appSourceId, isActive, createdBy.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client","message":"An unexpected error occurred.","traceId":". A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client","message":"An unexpected error occurred.","traceId":"40002461-0000-a200-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Client; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "appClientId": "00000000-0000-4000-8000-000000000001",
  "appClientSecret": "***MASKED***",
  "tenantId": "253",
  "appTenantId": "00000000-0000-4000-8000-000000000001",
  "appObjectId": "00000000-0000-4000-8000-000000000001",
  "ownerName": "QA Automation",
  "ownerEmailId": "qa.automation@example.com",
  "organizationName": "QA Automation Org",
  "appSourceId": "synthetic-automation-value",
  "appRedirectUri": "https://example.com/callback"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client","message":"An unexpected error occurred.","traceId":"40002461-0000-a200-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object required: appClientId, appClientSecret fields: tenantId, appClientId, appTenantId, appClientSecret, appObjectId, appSecretKey, ownerName, ownerEmailId, organizationName, appRedirectUri, appSourceId, isActive, createdBy.
- Reproduction command: npx playwright test tests/client.spec.js --grep "POST /api/v{version}/Client"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/Client/TriggerDataSync
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404; query parameters: none; JSON body: object fields: tenantId.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"Client configuration not found for the specified tenant.","instance":"/api/v1/Client/TriggerDataSync","message":"Cl. The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"Client configuration not found for the specified tenant.","instance":"/api/v1/Client/TriggerDataSync","message":"Client configuration not found for the specified tenant.","traceId":"40000b7c-0000-ad00-b63f-84710c7967bb"
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Client/TriggerDataSync; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": "253"
}
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"Client configuration not found for the specified tenant.","instance":"/api/v1/Client/TriggerDataSync","message":"Client configuration not found for the specified tenant.","traceId":"40000b7c-0000-ad00-b63f-84710c7967bb"
- Swagger contract: Success: 200; other responses: 400, 404; query parameters: none; JSON body: object fields: tenantId.
- Reproduction command: npx playwright test tests/client.spec.js --grep "POST /api/v{version}/Client/TriggerDataSync"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### POST /api/v{version}/Client/CheckSecretExpiry
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object required: appClientId, appClientSecret fields: tenantId, appClientId, appTenantId, appClientSecret, appObjectId, appSecretKey, ownerName, ownerEmailId, organizationName, appRedirectUri, appSourceId, isActive, createdBy.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client/CheckSecretExpiry","message":"An unexpected error occu. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client/CheckSecretExpiry","message":"An unexpected error occurred.","traceId":"40009734-0000-e700-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Client/CheckSecretExpiry; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "appClientId": "00000000-0000-4000-8000-000000000001",
  "appClientSecret": "***MASKED***",
  "tenantId": "253",
  "appTenantId": "00000000-0000-4000-8000-000000000001",
  "appObjectId": "00000000-0000-4000-8000-000000000001",
  "ownerName": "QA Automation",
  "ownerEmailId": "qa.automation@example.com",
  "organizationName": "QA Automation Org",
  "appSourceId": "synthetic-automation-value",
  "appRedirectUri": "https://example.com/callback"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Client/CheckSecretExpiry","message":"An unexpected error occurred.","traceId":"40009734-0000-e700-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object required: appClientId, appClientSecret fields: tenantId, appClientId, appTenantId, appClientSecret, appObjectId, appSecretKey, ownerName, ownerEmailId, organizationName, appRedirectUri, appSourceId, isActive, createdBy.
- Reproduction command: npx playwright test tests/client.spec.js --grep "POST /api/v{version}/Client/CheckSecretExpiry"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/DashboardDetail/GetDashboardMetadata
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object required: dashboardId fields: dashboardId, tenantId.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"message":"An error occurred while fetching dashboard metadata.","details":"Dashboard with ID synthetic-automation-value not found"}. The body matches the DashboardDetailRequest schema, but the synthetic dashboard ID is not present in the tenant.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetDashboardMetadata; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": 253,
  "dashboardId": "synthetic-automation-value"
}
- Response evidence: {"message":"An error occurred while fetching dashboard metadata.","details":"Dashboard with ID synthetic-automation-value not found"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object required: dashboardId fields: dashboardId, tenantId.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetDashboardMetadata"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/DashboardDetail/GetDashboardDetail
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object required: dashboardId fields: dashboardId, tenantId.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"message":"An error occurred while fetching dashboard detail.","details":"Dashboard with ID synthetic-automation-value not found"}. The body matches the DashboardDetailRequest schema, but the synthetic dashboard ID is not present in the tenant.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetDashboardDetail; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": 253,
  "dashboardId": "synthetic-automation-value"
}
- Response evidence: {"message":"An error occurred while fetching dashboard detail.","details":"Dashboard with ID synthetic-automation-value not found"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object required: dashboardId fields: dashboardId, tenantId.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetDashboardDetail"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/DashboardDetail/GetFailedDatasetRefreshesList
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetFailedDatasetRefreshesList","message":"An . A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetFailedDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"400000fa-0000-a000-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetFailedDatasetRefreshesList; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetFailedDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"400000fa-0000-a000-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetFailedDatasetRefreshesList"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/DashboardDetail/GetOnDemandDatasetRefreshesList
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetOnDemandDatasetRefreshesList","message":"A. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetOnDemandDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"40002463-0000-a200-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetOnDemandDatasetRefreshesList; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetOnDemandDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"40002463-0000-a200-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetOnDemandDatasetRefreshesList"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/DashboardDetail/GetScheduledDatasetRefreshesList
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetScheduledDatasetRefreshesList","message":". A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetScheduledDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"40000955-0000-b800-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetScheduledDatasetRefreshesList; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetScheduledDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"40000955-0000-b800-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetScheduledDatasetRefreshesList"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/DashboardDetail/GetSuccessfulDatasetRefreshesList
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetSuccessfulDatasetRefreshesList","message":. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetSuccessfulDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"40001031-0000-db00-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetSuccessfulDatasetRefreshesList; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/DashboardDetail/GetSuccessfulDatasetRefreshesList","message":"An unexpected error occurred.","traceId":"40001031-0000-db00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, startDate, endDate.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetSuccessfulDatasetRefreshesList"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/DashboardDetail/GetDatasetDetails
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object required: datasetSourceKey fields: datasetSourceKey, tenantId.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"message":"Dataset not found."}. The request matches Swagger, but its synthetic dataset key does not identify a tenant resource.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetDatasetDetails; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": 253,
  "datasetSourceKey": "synthetic-automation-value"
}
- Response evidence: {"message":"Dataset not found."}
- Swagger contract: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object required: datasetSourceKey fields: datasetSourceKey, tenantId.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetDatasetDetails"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/DashboardDetail/GetDataflowDetails
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object required: dataflowSourceKey fields: dataflowSourceKey, tenantId.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"message":"Dataflow not found."}. The request matches Swagger, but its synthetic dataflow key does not identify a tenant resource.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetDataflowDetails; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": 253,
  "dataflowSourceKey": "synthetic-automation-value"
}
- Response evidence: {"message":"Dataflow not found."}
- Swagger contract: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object required: dataflowSourceKey fields: dataflowSourceKey, tenantId.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetDataflowDetails"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/DashboardDetail/GetReportDetails
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object fields: reportSourceKey, tenantId.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"message":"Report not found."}. The request matches Swagger, but its synthetic report key does not identify a tenant resource.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DashboardDetail/GetReportDetails; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": 253,
  "reportSourceKey": "synthetic-automation-value"
}
- Response evidence: {"message":"Report not found."}
- Swagger contract: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object fields: reportSourceKey, tenantId.
- Reproduction command: npx playwright test tests/dashboard-detail.spec.js --grep "POST /api/v{version}/DashboardDetail/GetReportDetails"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### GET /api/v{version}/DigestAdmin/GetEmailSnapshot/{logId}
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 403, 404, 500; query parameters: path logId (required); JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"The requested item was not found.","instance":"/api/v1/DigestAdmin/GetEmailSnapshot/1","message":"The requested ite. The synthetic logId 1 has no corresponding email snapshot in the environment.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DigestAdmin/GetEmailSnapshot/1; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload none
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"The requested item was not found.","instance":"/api/v1/DigestAdmin/GetEmailSnapshot/1","message":"The requested item was not found.","traceId":"400041a9-0000-af00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 403, 404, 500; query parameters: path logId (required); JSON body: none.
- Reproduction command: npx playwright test tests/digest-admin.spec.js --grep "GET /api/v{version}/DigestAdmin/GetEmailSnapshot/{logId}"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/DigestEmail/SaveUserPreferences
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: notificationEnabled, isAdmin, canOverrideDigestPreference, frequency.)
- Actual status: 400
- Reason: Assertion: Expected a successful response but got 400: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Invalid notification frequency.","instance":"/api/v1/DigestEmail/SaveUserPreferences","message":"Invalid notifica. Swagger omits allowed frequency values; the synthetic Daily value is rejected by business validation.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DigestEmail/SaveUserPreferences; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "notificationEnabled": true,
  "isAdmin": false,
  "canOverrideDigestPreference": false,
  "frequency": "Daily"
}
- Response evidence: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Invalid notification frequency.","instance":"/api/v1/DigestEmail/SaveUserPreferences","message":"Invalid notification frequency.","traceId":"4000972f-0000-e700-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: notificationEnabled, isAdmin, canOverrideDigestPreference, frequency.
- Reproduction command: npx playwright test tests/digest-email.spec.js --grep "POST /api/v{version}/DigestEmail/SaveUserPreferences"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/DigestEmail/UnsubscribeDigestEmail
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: token, userID, emailAddress, tenantID, frequency, timestamp.)
- Actual status: 401
- Reason: Assertion: Expected a successful response but got 401: {"type":"https://httpstatuses.io/401","title":"Unauthorized","status":401,"detail":"Invalid or expired token.","instance":"/api/v1/DigestEmail/UnsubscribeDigestEmail","message":"Invalid or expired. The correctly shaped request contains a synthetic, non-issued token, which the API rejects as invalid or expired.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/DigestEmail/UnsubscribeDigestEmail; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "token": "***MASKED***",
  "userID": 1,
  "emailAddress": "qa.automation@example.com",
  "tenantID": "253",
  "frequency": "Daily",
  "timestamp": "2026-11-09T07:04:10.200Z"
}
- Response evidence: {"type":"https://httpstatuses.io/401","title":"Unauthorized","status":401,"detail":"Invalid or expired token.","instance":"/api/v1/DigestEmail/UnsubscribeDigestEmail","message":"Invalid or expired token.","traceId":"40009731-0000-e700-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: token, userID, emailAddress, tenantID, frequency, timestamp.
- Reproduction command: npx playwright test tests/digest-email.spec.js --grep "POST /api/v{version}/DigestEmail/UnsubscribeDigestEmail"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Gateway/GetGatewayDataSources
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: tenantId, gatewayId.)
- Actual status: 400
- Reason: Assertion: Expected a successful response but got 400: {"title":"One or more validation errors occurred.","status":400,"instance":"/api/v1/Gateway/GetGatewayDataSources","errors":{"request":["The request field is required."],"$.gatewayId":["The JSON v. The supplied body matches Swagger, but the runtime binder requires a request wrapper that Swagger does not declare.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Gateway/GetGatewayDataSources; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "tenantId": "253",
  "gatewayId": "synthetic-automation-value"
}
- Response evidence: {"title":"One or more validation errors occurred.","status":400,"instance":"/api/v1/Gateway/GetGatewayDataSources","errors":{"request":["The request field is required."],"$.gatewayId":["The JSON value could not be converted to System.Guid. Path: $.gatewayId | LineNumber: 0 | BytePositionInLine: 58."
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: tenantId, gatewayId.
- Reproduction command: npx playwright test tests/gateway.spec.js --grep "POST /api/v{version}/Gateway/GetGatewayDataSources"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/Governance/GetPublicWebFindingDetail
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 404, 500; query parameters: none; JSON body: object fields: id.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-f0236bde5c87f696af8e343c49b48233-6ae036fd4493d9b5-00"}. The request uses a well-formed synthetic UUID, but no matching finding exists in the tenant.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Governance/GetPublicWebFindingDetail; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "id": "00000000-0000-4000-8000-000000000001"
}
- Response evidence: {"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-f0236bde5c87f696af8e343c49b48233-6ae036fd4493d9b5-00"}
- Swagger contract: Success: 200; other responses: 404, 500; query parameters: none; JSON body: object fields: id.
- Reproduction command: npx playwright test tests/governance.spec.js --grep "POST /api/v{version}/Governance/GetPublicWebFindingDetail"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Governance/GetExternalGuestUserActivityDetail
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 404, 500; query parameters: none; JSON body: object fields: id.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-74269f1ea5921c2194d513ce3454a5d0-f320935d3244e039-00"}. The request uses a well-formed synthetic UUID, but no matching activity record exists in the tenant.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Governance/GetExternalGuestUserActivityDetail; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "id": "00000000-0000-4000-8000-000000000001"
}
- Response evidence: {"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-74269f1ea5921c2194d513ce3454a5d0-f320935d3244e039-00"}
- Swagger contract: Success: 200; other responses: 404, 500; query parameters: none; JSON body: object fields: id.
- Reproduction command: npx playwright test tests/governance.spec.js --grep "POST /api/v{version}/Governance/GetExternalGuestUserActivityDetail"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### GET /api/v{version}/Governance/shared-report-findings
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 401, 404, 500; query parameters: query pageNumber, query pageSize, query exposureType, query severity; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"No shared report findings found for the specified criteria","instance":"/api/v1/Governance/shared-report-findings",. The service reports no findings for the criteria; the endpoint documents 404 and the environment has no matching data.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Governance/shared-report-findings?pageNumber=1&pageSize=10; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {"pageNumber":1,"pageSize":10}; sanitized payload none
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"No shared report findings found for the specified criteria","instance":"/api/v1/Governance/shared-report-findings","message":"No shared report findings found for the specified criteria","traceId":"400017d9-0000-ba00-b63
- Swagger contract: Success: 200; other responses: 400, 401, 404, 500; query parameters: query pageNumber, query pageSize, query exposureType, query severity; JSON body: none.
- Reproduction command: npx playwright test tests/governance.spec.js --grep "GET /api/v{version}/Governance/shared-report-findings"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/LineageExplorer/GetLineageData
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: workspaceSourceKeys, tenantId, objectTypes, sourceSystems, includeInactive, scanId.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/LineageExplorer/GetLineageData","message":"An unexpected erro. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/LineageExplorer/GetLineageData","message":"An unexpected error occurred.","traceId":"4000102b-0000-db00-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/LineageExplorer/GetLineageData; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "workspaceSourceKeys": "synthetic-automation-value",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/LineageExplorer/GetLineageData","message":"An unexpected error occurred.","traceId":"4000102b-0000-db00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: workspaceSourceKeys, tenantId, objectTypes, sourceSystems, includeInactive, scanId.
- Reproduction command: npx playwright test tests/lineage-explorer.spec.js --grep "POST /api/v{version}/LineageExplorer/GetLineageData"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/LineageExplorer/GetArtifacts
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: workspaceSourceKeys, tenantId, objectTypes, sourceSystems, includeInactive, scanId.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/LineageExplorer/GetArtifacts","message":"An unexpected error . A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/LineageExplorer/GetArtifacts","message":"An unexpected error occurred.","traceId":"400023e1-0000-b000-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/LineageExplorer/GetArtifacts; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "workspaceSourceKeys": "synthetic-automation-value",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/LineageExplorer/GetArtifacts","message":"An unexpected error occurred.","traceId":"400023e1-0000-b000-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: workspaceSourceKeys, tenantId, objectTypes, sourceSystems, includeInactive, scanId.
- Reproduction command: npx playwright test tests/lineage-explorer.spec.js --grep "POST /api/v{version}/LineageExplorer/GetArtifacts"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/LineageExplorer/GetImpactAnalysis
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object fields: nodeSourceKey, tenantId, direction, nodeType, maxDepth.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"Node 'synthetic-automation-value' not found in lineage graph.","instance":"/api/v1/LineageExplorer/GetImpactAnalysi. The schema-valid node key is synthetic and absent from the lineage graph.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/LineageExplorer/GetImpactAnalysis; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "nodeSourceKey": "synthetic-automation-value",
  "tenantId": 253
}
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"Node 'synthetic-automation-value' not found in lineage graph.","instance":"/api/v1/LineageExplorer/GetImpactAnalysis","message":"Node 'synthetic-automation-value' not found in lineage graph.","traceId":"40000339-0000-a7
- Swagger contract: Success: 200; other responses: 400, 404, 500; query parameters: none; JSON body: object fields: nodeSourceKey, tenantId, direction, nodeType, maxDepth.
- Reproduction command: npx playwright test tests/lineage-explorer.spec.js --grep "POST /api/v{version}/LineageExplorer/GetImpactAnalysis"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### GET /api/v{version}/LineageExplorer/GetNodeDetails/{nodeSourceKey}
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404, 500; query parameters: path nodeSourceKey (required), query tenantId; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"message":"Node not found.","nodeSourceKey":"synthetic-automation-value","tenantId":253}. The path parameter is schema-valid but does not identify a node in the lineage graph.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/LineageExplorer/GetNodeDetails/synthetic-automation-value?tenantId=253; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {"tenantId":253}; sanitized payload none
- Response evidence: {"message":"Node not found.","nodeSourceKey":"synthetic-automation-value","tenantId":253}
- Swagger contract: Success: 200; other responses: 400, 404, 500; query parameters: path nodeSourceKey (required), query tenantId; JSON body: none.
- Reproduction command: npx playwright test tests/lineage-explorer.spec.js --grep "GET /api/v{version}/LineageExplorer/GetNodeDetails/{nodeSourceKey}"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### GET /api/v{version}/LineageExplorer/GetDataflowMetadata
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404, 500; query parameters: query dataflowSourceKey, query tenantId; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"message":"Dataflow metadata not found.","dataflowSourceKey":"synthetic-automation-value","tenantId":253}. The schema-valid dataflow key has no metadata in the tenant.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/LineageExplorer/GetDataflowMetadata?dataflowSourceKey=synthetic-automation-value&tenantId=253; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {"dataflowSourceKey":"synthetic-automation-value","tenantId":253}; sanitized payload none
- Response evidence: {"message":"Dataflow metadata not found.","dataflowSourceKey":"synthetic-automation-value","tenantId":253}
- Swagger contract: Success: 200; other responses: 400, 404, 500; query parameters: query dataflowSourceKey, query tenantId; JSON body: none.
- Reproduction command: npx playwright test tests/lineage-explorer.spec.js --grep "GET /api/v{version}/LineageExplorer/GetDataflowMetadata"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### GET /api/v{version}/LineageExplorer/GetDataflowSchema
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 404, 500; query parameters: query dataflowSourceKey, query tenantId; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"message":"No schema found for dataflow synthetic-automation-value"}. The schema-valid dataflow key has no schema in the tenant.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/LineageExplorer/GetDataflowSchema?dataflowSourceKey=synthetic-automation-value&tenantId=253; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {"dataflowSourceKey":"synthetic-automation-value","tenantId":253}; sanitized payload none
- Response evidence: {"message":"No schema found for dataflow synthetic-automation-value"}
- Swagger contract: Success: 200; other responses: 400, 404, 500; query parameters: query dataflowSourceKey, query tenantId; JSON body: none.
- Reproduction command: npx playwright test tests/lineage-explorer.spec.js --grep "GET /api/v{version}/LineageExplorer/GetDataflowSchema"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Onboarding/StartSession
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: none.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Onboarding/StartSession","message":"An unexpected error occur. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Onboarding/StartSession","message":"An unexpected error occurred.","traceId":"4000245f-0000-a200-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Onboarding/StartSession; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Onboarding/StartSession","message":"An unexpected error occurred.","traceId":"4000245f-0000-a200-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: none.
- Reproduction command: npx playwright test tests/onboarding.spec.js --grep "POST /api/v{version}/Onboarding/StartSession"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### GET /api/v{version}/Onboarding/GetSecurityGroupObjectId
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"Security Group Object ID not found. Please complete Step 2 first.","instance":"/api/v1/Onboarding/GetSecurityGroupO. No onboarding security-group state is available after the preceding session setup failure.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Onboarding/GetSecurityGroupObjectId; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload none
- Response evidence: {"type":"https://httpstatuses.io/404","title":"Not found","status":404,"detail":"Security Group Object ID not found. Please complete Step 2 first.","instance":"/api/v1/Onboarding/GetSecurityGroupObjectId","message":"Security Group Object ID not found. Please complete Step 2 first.","traceId":"400009
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: none.
- Reproduction command: npx playwright test tests/onboarding.spec.js --grep "GET /api/v{version}/Onboarding/GetSecurityGroupObjectId"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Onboarding/DownloadScript
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: none.)
- Actual status: 400
- Reason: Assertion: Expected a successful response but got 400: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Security Group Object ID not found. Please complete Step 2 (Security Group Validation) first.","instance":"/api/v. This operation depends on security-group state that is absent after onboarding setup did not complete.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Onboarding/DownloadScript; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {}
- Response evidence: {"type":"https://httpstatuses.io/400","title":"Bad request","status":400,"detail":"Security Group Object ID not found. Please complete Step 2 (Security Group Validation) first.","instance":"/api/v1/Onboarding/DownloadScript","message":"Security Group Object ID not found. Please complete Step 2 (Secu
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: none.
- Reproduction command: npx playwright test tests/onboarding.spec.js --grep "POST /api/v{version}/Onboarding/DownloadScript"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Onboarding/CompleteStep
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object required: stepName fields: stepNumber, stepName.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Onboarding/CompleteStep","message":"An unexpected error occur. This lifecycle operation ran without a successfully initialized onboarding session.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Onboarding/CompleteStep; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "stepNumber": 1,
  "stepName": "synthetic-step"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Onboarding/CompleteStep","message":"An unexpected error occurred.","traceId":"4000033c-0000-a700-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object required: stepName fields: stepNumber, stepName.
- Reproduction command: npx playwright test tests/onboarding.spec.js --grep "POST /api/v{version}/Onboarding/CompleteStep"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/Onboarding/ReportError
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: object required: errorCode, userMessage fields: stepNumber, errorCode, userMessage.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Onboarding/ReportError","message":"An unexpected error occurr. This lifecycle operation ran without a successfully initialized onboarding session.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Onboarding/ReportError; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "stepNumber": 1,
  "errorCode": "SYNTHETIC_ERROR",
  "userMessage": "Synthetic automated test error report"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/Onboarding/ReportError","message":"An unexpected error occurred.","traceId":"40005dbf-0000-fd00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: object required: errorCode, userMessage fields: stepNumber, errorCode, userMessage.
- Reproduction command: npx playwright test tests/onboarding.spec.js --grep "POST /api/v{version}/Onboarding/ReportError"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### GET /api/v{version}/Onboarding/DebugClaims
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: none; query parameters: none; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-a4b5ef3e1a15b4c80cb962a717e412e9-545ce759fb4a6401-00"}. A request matching the documented schema returned HTTP 404: {"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-a4b5ef3e1a15b4c80cb962a717e412e9-545ce759fb4a6401-00"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/Onboarding/DebugClaims; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload none
- Response evidence: {"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-a4b5ef3e1a15b4c80cb962a717e412e9-545ce759fb4a6401-00"}
- Swagger contract: Success: 200; other responses: none; query parameters: none; JSON body: none.
- Reproduction command: npx playwright test tests/onboarding.spec.js --grep "GET /api/v{version}/Onboarding/DebugClaims"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/PlanConfig/GetMinimumBackup
- Classification: ENVIRONMENT
- Expected: successful response (OpenAPI: Success: 200, 204; other responses: 500; query parameters: none; JSON body: object fields: code, tenantID.)
- Actual status: 401
- Reason: Assertion: Expected a successful response but got 401: . The request depends on endpoint authorization, tenant configuration, or a downstream service that is unavailable for this environment: 
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/PlanConfig/GetMinimumBackup; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "code": "synthetic-automation-value",
  "tenantID": 253
}
- Response evidence: No response body
- Swagger contract: Success: 200, 204; other responses: 500; query parameters: none; JSON body: object fields: code, tenantID.
- Reproduction command: npx playwright test tests/plan-config.spec.js --grep "POST /api/v{version}/PlanConfig/GetMinimumBackup"
- Suggested backend action: Environment: provision endpoint-authorized credentials and the required tenant configuration or downstream dependency; do not change the assertion.

### GET /api/v{version}/RefreshHealth/run-detail
- Classification: AUTOMATION
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 401, 404, 500; query parameters: query TenantId, query Type, query RefreshSourceKey; JSON body: none.)
- Actual status: 404
- Reason: Assertion: Expected a successful response but got 404: {"message":"Refresh run detail not found."}. No refresh run matches the synthetic tenant, source key, and type.
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/RefreshHealth/run-detail?TenantId=253&Type=Dataset&RefreshSourceKey=synthetic-automation-value; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {"TenantId":253,"Type":"Dataset","RefreshSourceKey":"synthetic-automation-value"}; sanitized payload none
- Response evidence: {"message":"Refresh run detail not found."}
- Swagger contract: Success: 200; other responses: 400, 401, 404, 500; query parameters: query TenantId, query Type, query RefreshSourceKey; JSON body: none.
- Reproduction command: npx playwright test tests/refresh-health.spec.js --grep "GET /api/v{version}/RefreshHealth/run-detail"
- Suggested backend action: Automation/data: replace the invalid synthetic prerequisite with approved test data or a valid lifecycle setup. Do not treat this response as a confirmed API defect.

### POST /api/v{version}/TenantExplorer/GetDatasetsByWorkspace
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetsByWorkspace","message":"An unexpect. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetsByWorkspace","message":"An unexpected error occurred.","traceId":"4000140b-0000-b500-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetDatasetsByWorkspace; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "workspaceId": "synthetic-automation-value"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetsByWorkspace","message":"An unexpected error occurred.","traceId":"4000140b-0000-b500-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetDatasetsByWorkspace"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/TenantExplorer/GetDataflowsByWorkspace
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDataflowsByWorkspace","message":"An unexpec. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDataflowsByWorkspace","message":"An unexpected error occurred.","traceId":"400000ef-0000-ab00-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetDataflowsByWorkspace; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "workspaceId": "synthetic-automation-value"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDataflowsByWorkspace","message":"An unexpected error occurred.","traceId":"400000ef-0000-ab00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetDataflowsByWorkspace"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/TenantExplorer/GetReportsByWorkspace
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetReportsByWorkspace","message":"An unexpecte. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetReportsByWorkspace","message":"An unexpected error occurred.","traceId":"4000140d-0000-b500-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetReportsByWorkspace; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "workspaceId": "synthetic-automation-value"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetReportsByWorkspace","message":"An unexpected error occurred.","traceId":"4000140d-0000-b500-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetReportsByWorkspace"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/TenantExplorer/GetUsersByWorkspace
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetUsersByWorkspace","message":"An unexpected . A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetUsersByWorkspace","message":"An unexpected error occurred.","traceId":"40001446-0000-c700-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetUsersByWorkspace; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "workspaceId": "synthetic-automation-value"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetUsersByWorkspace","message":"An unexpected error occurred.","traceId":"40001446-0000-c700-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetUsersByWorkspace"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/TenantExplorer/GetUserWorkspaceFootprint
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetUserWorkspaceFootprint","message":"An unexp. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetUserWorkspaceFootprint","message":"An unexpected error occurred.","traceId":"400000fd-0000-a000-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetUserWorkspaceFootprint; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "userIdentifier": "synthetic-automation-value"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetUserWorkspaceFootprint","message":"An unexpected error occurred.","traceId":"400000fd-0000-a000-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetUserWorkspaceFootprint"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/TenantExplorer/GetDatasetRefreshHistory
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetRefreshHistory","message":"An unexpe. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetRefreshHistory","message":"An unexpected error occurred.","traceId":"400000f1-0000-ab00-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetDatasetRefreshHistory; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "datasetId": "synthetic-automation-value",
  "days": 30
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetRefreshHistory","message":"An unexpected error occurred.","traceId":"400000f1-0000-ab00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetDatasetRefreshHistory"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/TenantExplorer/GetDataflowRefreshHistory
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDataflowRefreshHistory","message":"An unexp. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDataflowRefreshHistory","message":"An unexpected error occurred.","traceId":"400041af-0000-af00-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetDataflowRefreshHistory; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "dataflowId": "synthetic-automation-value",
  "days": 30
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDataflowRefreshHistory","message":"An unexpected error occurred.","traceId":"400041af-0000-af00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetDataflowRefreshHistory"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

### POST /api/v{version}/TenantExplorer/GetDatasetUsersByDataset
- Classification: API
- Expected: successful response (OpenAPI: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.)
- Actual status: 500
- Reason: Assertion: Expected a successful response but got 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetUsersByDataset","message":"An unexpe. A request matching the documented schema returned HTTP 500: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetUsersByDataset","message":"An unexpected error occurred.","traceId":"400017dc-0000-ba00-b63f-84710c7967bb"}
- Request evidence: URL https://ubti-t-powerpulse-api.azurewebsites.net/api/v1/TenantExplorer/GetDatasetUsersByDataset; headers Content-Type: application/json; Authorization: Bearer ***MASKED***; parameters {}; sanitized payload {
  "pageNumber": 1,
  "pageSize": 10,
  "sortColumn": "Id",
  "sortOrder": "desc",
  "tenantId": 253,
  "datasetId": "synthetic-automation-value"
}
- Response evidence: {"type":"https://httpstatuses.io/500","title":"Server error","status":500,"detail":"An unexpected error occurred.","instance":"/api/v1/TenantExplorer/GetDatasetUsersByDataset","message":"An unexpected error occurred.","traceId":"400017dc-0000-ba00-b63f-84710c7967bb"}
- Swagger contract: Success: 200; other responses: 400, 500; query parameters: none; JSON body: object fields: pageNumber, pageSize, sortColumn, sortOrder, filters, tenantId, days, workspaceId, datasetId, dataflowId, reportId, userIdentifier, topCount.
- Reproduction command: npx playwright test tests/tenant-explorer.spec.js --grep "POST /api/v{version}/TenantExplorer/GetDatasetUsersByDataset"
- Suggested backend action: Backend: reproduce with the attached schema-valid request, inspect the trace ID and server logs, and return the documented success or a deliberate validation/not-found response instead of an unexpected server error.

