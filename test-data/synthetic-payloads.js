const { TEST_TENANT_ID } = require('./tenant');
const { paginationPayload } = require('./payloads');

const SYNTHETIC = 'synthetic-automation-value';
const SYNTHETIC_EMAIL = 'qa.automation@example.com';
// Dot-separated 3-segment placeholder so JWT-format checks pass before the (expected) auth failure.
const SYNTHETIC_JWT = 'eyJhbGciOiJub25lIn0.eyJzdWIiOiJzeW50aGV0aWMifQ.synthetic-signature';

// Exact-match synthetic request options (data/params) for operations whose real schema
// requires fields beyond a generic pagination payload. Keyed by "METHOD templatedPath".
const EXACT_BUILDERS = {
  'GET /api/v{version}/RefreshHealth/run-detail': () => ({
    params: { TenantId: TEST_TENANT_ID, Type: 'Dataset', RefreshSourceKey: SYNTHETIC },
  }),

  'POST /api/v{version}/App/GetAppDetail': () => ({ data: { appSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID } }),
  'POST /api/v{version}/App/GetAppPages': () => ({ data: { appSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID } }),
  'POST /api/v{version}/App/GetAppWithPages': () => ({ data: { appSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID } }),

  'POST /api/v{version}/Auth/IsDomainAccepted': () => ({ data: { email: SYNTHETIC_EMAIL } }),
  'POST /api/v{version}/Auth/ValidateUnsubscribeToken': () => ({ data: { token: SYNTHETIC_JWT } }),
  'POST /api/v{version}/Auth/EmailTrigger': () => ({ data: { emailId: SYNTHETIC_EMAIL } }),
  'POST /api/v{version}/Auth/testDigestEmail': () => ({ params: { payload: SYNTHETIC } }),
  'POST /api/v{version}/Auth/DecryptValue': () => ({ data: { encryptedValue: SYNTHETIC } }),

  'POST /api/v{version}/BackupArtifactVersion/SaveUserArtifactVersionPreferences': () => ({
    data: { retentionDays: 30, maxVersions: 5, frequency: 'Daily', selectedWorkspaces: [] },
  }),
  'POST /api/v{version}/BackupArtifactVersion/RemoveSelectedWorkspace': () => ({ data: {} }),
  'POST /api/v{version}/BackupArtifactVersion/GetPagedBackupVersions': () => ({
    data: { page: 1, pageSize: 10, sortField: 'Id', sortOrder: 'desc', searchTerm: '' },
  }),
  'POST /api/v{version}/BackupArtifactVersion/Restore': () => ({
    data: {
      artifactItemId: SYNTHETIC,
      name: 'synthetic-artifact',
      versionNumber: '1',
      tenantId: TEST_TENANT_ID,
      type: 'Report',
      ownerUPN: SYNTHETIC_EMAIL,
      versions: 'v1',
      workspaceName: 'synthetic-workspace',
    },
  }),
  'POST /api/v{version}/BackupArtifactVersion/download': () => ({
    data: {
      artifactItemId: SYNTHETIC,
      name: 'synthetic-artifact',
      versionNumber: '1',
      tenantId: TEST_TENANT_ID,
      type: 'Report',
      ownerUPN: SYNTHETIC_EMAIL,
      versions: 'v1',
      workspaceName: 'synthetic-workspace',
    },
  }),
  'POST /api/v{version}/BackupArtifactVersion/SaveBlobConnectionString': () => ({
    data: { blobConnectionString: 'DefaultEndpointsProtocol=https;AccountName=synthetic;AccountKey=synthetic;EndpointSuffix=core.windows.net' },
  }),
  'POST /api/v{version}/BackupArtifactVersion/TriggerBlobConnectionIdWebhook': () => ({ data: {} }),

  'POST /api/v{version}/Client/GenerateSecretNotification': () => ({ data: {} }),
  'POST /api/v{version}/Client/GenerateEmailNotification': () => ({ data: { tenantId: TEST_TENANT_ID, productCode: 'PP' } }),
  'POST /api/v{version}/Client/GenerateEmailNotificationForSecret': () => ({ data: { tenantId: TEST_TENANT_ID, productCode: 'PP' } }),
  'POST /api/v{version}/Client/MarkNotifications': () => ({ data: [1] }),
  'POST /api/v{version}/Client/DeleteNotifications': () => ({ data: [1] }),
  'POST /api/v{version}/Client/Update': () => ({
    data: {
      appClientId: 'synthetic-client-id',
      appClientSecret: 'synthetic-client-secret',
      tenantId: String(TEST_TENANT_ID),
      ownerName: 'QA Automation',
      ownerEmailId: SYNTHETIC_EMAIL,
      organizationName: 'QA Automation Org',
      appTenantId: SYNTHETIC,
      appSourceId: SYNTHETIC,
      appRedirectUri: 'https://example.com/callback',
    },
  }),
  'POST /api/v{version}/Client': () => ({
    data: {
      appClientId: 'synthetic-client-id',
      appClientSecret: 'synthetic-client-secret',
      tenantId: String(TEST_TENANT_ID),
      ownerName: 'QA Automation',
      ownerEmailId: SYNTHETIC_EMAIL,
      organizationName: 'QA Automation Org',
      appTenantId: SYNTHETIC,
      appSourceId: SYNTHETIC,
      appRedirectUri: 'https://example.com/callback',
    },
  }),
  'POST /api/v{version}/Client/TriggerDataSync': () => ({ data: { tenantId: String(TEST_TENANT_ID) } }),
  'POST /api/v{version}/Client/CheckSecretExpiry': () => ({
    data: { appClientId: 'synthetic-client-id', appClientSecret: 'synthetic-client-secret', tenantId: String(TEST_TENANT_ID) },
  }),

  'POST /api/v{version}/DigestAdmin/SendOnDemand': () => ({
    data: {
      recipientEmail: SYNTHETIC_EMAIL,
      sections: ['Summary'],
      frequency: 'Daily',
      userId: 1,
      userEmail: SYNTHETIC_EMAIL,
    },
  }),
  'POST /api/v{version}/DigestEmail/SaveUserPreferences': () => ({
    data: { notificationEnabled: true, isAdmin: false, canOverrideDigestPreference: false, frequency: 'Daily' },
  }),
  'POST /api/v{version}/DigestEmail/UnsubscribeDigestEmail': () => ({
    data: { TenantID: String(TEST_TENANT_ID), Frequency: 'Daily', Timestamp: new Date().toISOString(), EmailAddress: SYNTHETIC_EMAIL },
  }),

  'POST /api/v{version}/Onboarding/StartSession': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/ValidateAzureCredentials': () => ({
    data: {
      tenantId: SYNTHETIC,
      clientId: SYNTHETIC,
      objectId: SYNTHETIC,
      secretId: SYNTHETIC,
      clientSecret: SYNTHETIC,
    },
  }),
  'POST /api/v{version}/Onboarding/ValidateSecurityGroup': () => ({ data: { groupObjectId: SYNTHETIC } }),
  'POST /api/v{version}/Onboarding/VerifyFabricSettings': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/DownloadScript': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/VerifyScriptExecution': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/InitiateWorkspaceSync': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/CompleteStep': () => ({ data: { stepNumber: 1, stepName: 'synthetic-step' } }),
  'POST /api/v{version}/Onboarding/ReportError': () => ({
    data: { stepNumber: 1, errorCode: 'SYNTHETIC_ERROR', userMessage: 'Synthetic automated test error report' },
  }),

  'POST /api/v{version}/PlanConfig/GetMinimumBackup': () => ({ data: { code: SYNTHETIC, tenantID: TEST_TENANT_ID } }),

  'POST /api/v{version}/LineageExplorer/GetLineageData': () => ({ data: { workspaceSourceKeys: SYNTHETIC, tenantId: TEST_TENANT_ID } }),
  'POST /api/v{version}/LineageExplorer/GetArtifacts': () => ({ data: { workspaceSourceKeys: SYNTHETIC, tenantId: TEST_TENANT_ID } }),
  'POST /api/v{version}/LineageExplorer/GetArtifactDetail': () => ({ data: { workspaceSourceKeys: SYNTHETIC, tenantId: TEST_TENANT_ID } }),

  'POST /api/v{version}/LineageExplorer/GetImpactAnalysis': () => ({ data: { nodeSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID } }),

  'POST /api/v{version}/TenantExplorer/GetMostActiveItems': () => ({
    data: { type: 'Report', tenantId: TEST_TENANT_ID, topCount: 5, pageNumber: 1, pageSize: 10 },
  }),

  'POST /api/v{version}/DashboardDetail/GetDashboardTiles': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDashboardSourceReports': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDashboardAppInfo': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDashboardMetadata': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDashboardDetail': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceUsers': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceReports': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceDatasets': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceDataflows': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDatasetRefreshHistory': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, datasetSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDatasetUsers': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, datasetSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDatasetDetails': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, datasetSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDataflowRefreshHistory': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dataflowSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDataflowDetails': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dataflowSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetReportDetails': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, reportSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetUserWorkspaces': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, userName: SYNTHETIC_EMAIL }) }),

  'POST /api/v{version}/TenantExplorer/GetDatasetsByWorkspace': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceId: SYNTHETIC }) }),
  'POST /api/v{version}/TenantExplorer/GetDataflowsByWorkspace': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceId: SYNTHETIC }) }),
  'POST /api/v{version}/TenantExplorer/GetReportsByWorkspace': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceId: SYNTHETIC }) }),
  'POST /api/v{version}/TenantExplorer/GetUsersByWorkspace': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceId: SYNTHETIC }) }),
  'POST /api/v{version}/TenantExplorer/GetUserWorkspaceFootprint': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, userIdentifier: SYNTHETIC }) }),
  'POST /api/v{version}/TenantExplorer/GetDatasetRefreshHistory': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, datasetId: SYNTHETIC, days: 30 }) }),
  'POST /api/v{version}/TenantExplorer/GetDataflowRefreshHistory': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dataflowId: SYNTHETIC, days: 30 }) }),
  'POST /api/v{version}/TenantExplorer/GetReportPagesByReport': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, reportId: SYNTHETIC }) }),
  'POST /api/v{version}/TenantExplorer/GetDatasetUsersByDataset': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, datasetId: SYNTHETIC }) }),
  'POST /api/v{version}/TenantExplorer/GetWorkspaceActivityLog': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceId: SYNTHETIC }) }),
};

function defaultOptions(method) {
  if (method === 'GET') return { params: { tenantId: TEST_TENANT_ID, pageNumber: 1, pageSize: 10 } };
  if (method !== 'POST') return {};
  return { data: paginationPayload({ tenantId: TEST_TENANT_ID }) };
}

/** Returns { data?, params? } request options for a Swagger operation using synthetic test data. */
function buildRequestOptions(method, path) {
  const builder = EXACT_BUILDERS[`${method} ${path}`];
  return builder ? builder() : defaultOptions(method);
}

module.exports = { buildRequestOptions };
