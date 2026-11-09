const { TEST_TENANT_ID } = require('./tenant');
const { paginationPayload } = require('./payloads');

const SYNTHETIC = 'synthetic-automation-value';
const SYNTHETIC_EMAIL = 'qa.automation@example.com';
// Dot-separated 3-segment placeholder so JWT-format checks pass before the (expected) auth failure.
const SYNTHETIC_JWT = 'eyJhbGciOiJub25lIn0.eyJzdWIiOiJzeW50aGV0aWMifQ.synthetic-signature';
const SYNTHETIC_UUID = '00000000-0000-4000-8000-000000000001';

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
  'POST /api/v{version}/Auth/EmailTrigger': () => ({ data: SYNTHETIC_EMAIL }),
  'POST /api/v{version}/Auth/testDigestEmail': () => ({ params: { payload: SYNTHETIC } }),
  'POST /api/v{version}/Auth/DecryptValue': () => ({ data: { encryptedValue: SYNTHETIC } }),

  'GET /api/v{version}/Client/GetSyncStatus': () => ({ params: { tenantId: String(TEST_TENANT_ID) } }),
  'GET /api/v{version}/DashboardDetail/GetOverdueMissingBackupsCount': () => ({ params: { tenantId: String(TEST_TENANT_ID) } }),
  'GET /api/v{version}/DashboardDetail/GetFailedBackupsCount': () => ({ params: { tenantId: String(TEST_TENANT_ID) } }),
  'GET /api/v{version}/DashboardDetail/GetBackupManagementSummary': () => ({ params: { tenantId: String(TEST_TENANT_ID) } }),
  'GET /api/v{version}/Governance/all-findings': () => ({
    params: {
      category: '',
      severity: '',
      findingType: '',
      workspaceName: '',
      searchTerm: '',
      sortColumn: 'Id',
      sortDirection: 'desc',
      pageNumber: 1,
      pageSize: 10,
    },
  }),
  'GET /api/v{version}/RefreshHealth/runs': () => ({
    params: { TenantId: TEST_TENANT_ID, PageNumber: 1, PageSize: 10 },
  }),

  'POST /api/v{version}/BackupArtifactVersion/SaveUserArtifactVersionPreferences': () => ({
    data: { retentionDays: 30, maxVersions: 5, frequency: 'Daily', selectedWorkspaces: [] },
  }),
  'POST /api/v{version}/BackupArtifactVersion/RemoveSelectedWorkspace': () => ({ data: TEST_TENANT_ID }),
  'POST /api/v{version}/BackupArtifactVersion/GetPagedBackupVersions': () => ({
    data: { page: 1, pageSize: 10, sortField: 'Id', sortOrder: 'desc', searchTerm: '', artifactItemId: SYNTHETIC },
  }),
  'POST /api/v{version}/BackupArtifactVersion/Restore': () => ({
    data: {
      artifactItemId: SYNTHETIC,
      name: 'synthetic-artifact',
      versionNumber: '1',
      tenantId: TEST_TENANT_ID,
      type: 'Report',
      ownerUPN: SYNTHETIC_EMAIL,
      versions: '[]',
      workspaceName: 'synthetic-workspace',
      workspaceSourceKey: SYNTHETIC,
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
      versions: '[]',
      workspaceName: 'synthetic-workspace',
      workspaceSourceKey: SYNTHETIC,
    },
  }),
  'POST /api/v{version}/BackupArtifactVersion/SaveBlobConnectionString': () => ({
    data: { blobConnectionString: 'DefaultEndpointsProtocol=https;AccountName=synthetic;AccountKey=synthetic;EndpointSuffix=core.windows.net' },
  }),
  'POST /api/v{version}/BackupArtifactVersion/TriggerBlobConnectionIdWebhook': () => ({ data: SYNTHETIC }),

  'POST /api/v{version}/Client/GenerateSecretNotification': () => ({ data: {} }),
  'POST /api/v{version}/Client/GenerateEmailNotification': () => ({ data: { tenantId: TEST_TENANT_ID, productCode: 'PP' } }),
  'POST /api/v{version}/Client/GenerateEmailNotificationForSecret': () => ({ data: { tenantId: TEST_TENANT_ID, productCode: 'PP' } }),
  'POST /api/v{version}/Client/MarkNotifications': () => ({ data: [1] }),
  'POST /api/v{version}/Client/DeleteNotifications': () => ({ data: [1] }),
  'POST /api/v{version}/Client/Update': () => ({
    data: {
      appClientId: SYNTHETIC_UUID,
      appClientSecret: 'synthetic-client-secret',
      tenantId: String(TEST_TENANT_ID),
      appTenantId: SYNTHETIC_UUID,
      appObjectId: SYNTHETIC_UUID,
      ownerName: 'QA Automation',
      ownerEmailId: SYNTHETIC_EMAIL,
      organizationName: 'QA Automation Org',
      appSourceId: SYNTHETIC,
      appRedirectUri: 'https://example.com/callback',
    },
  }),
  'POST /api/v{version}/Client': () => ({
    data: {
      appClientId: SYNTHETIC_UUID,
      appClientSecret: 'synthetic-client-secret',
      tenantId: String(TEST_TENANT_ID),
      appTenantId: SYNTHETIC_UUID,
      appObjectId: SYNTHETIC_UUID,
      ownerName: 'QA Automation',
      ownerEmailId: SYNTHETIC_EMAIL,
      organizationName: 'QA Automation Org',
      appSourceId: SYNTHETIC,
      appRedirectUri: 'https://example.com/callback',
    },
  }),
  'POST /api/v{version}/Client/TriggerDataSync': () => ({ data: { tenantId: String(TEST_TENANT_ID) } }),
  'POST /api/v{version}/Client/CheckSecretExpiry': () => ({
    data: {
      appClientId: SYNTHETIC_UUID,
      appClientSecret: 'synthetic-client-secret',
      tenantId: String(TEST_TENANT_ID),
      appTenantId: SYNTHETIC_UUID,
      appObjectId: SYNTHETIC_UUID,
      ownerName: 'QA Automation',
      ownerEmailId: SYNTHETIC_EMAIL,
      organizationName: 'QA Automation Org',
      appSourceId: SYNTHETIC,
      appRedirectUri: 'https://example.com/callback',
    },
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
    data: {
      token: SYNTHETIC_JWT,
      userID: 1,
      emailAddress: SYNTHETIC_EMAIL,
      tenantID: String(TEST_TENANT_ID),
      frequency: 'Daily',
      timestamp: new Date().toISOString(),
    },
  }),

  'POST /api/v{version}/Onboarding/StartSession': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/ValidateAzureCredentials': () => ({
    data: {
      tenantId: SYNTHETIC_UUID,
      clientId: SYNTHETIC_UUID,
      objectId: SYNTHETIC_UUID,
      secretId: SYNTHETIC_UUID,
      clientSecret: SYNTHETIC,
    },
  }),
  'POST /api/v{version}/Onboarding/ValidateSecurityGroup': () => ({ data: { groupObjectId: SYNTHETIC_UUID } }),
  'POST /api/v{version}/Onboarding/VerifyFabricSettings': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/DownloadScript': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/VerifyScriptExecution': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/InitiateWorkspaceSync': () => ({ data: {} }),
  'POST /api/v{version}/Onboarding/CompleteStep': () => ({ data: { stepNumber: 1, stepName: 'synthetic-step' } }),
  'POST /api/v{version}/Onboarding/ReportError': () => ({
    data: { stepNumber: 1, errorCode: 'SYNTHETIC_ERROR', userMessage: 'Synthetic automated test error report' },
  }),

  'POST /api/v{version}/PlanConfig/GetMinimumBackup': () => ({ data: { code: SYNTHETIC, tenantID: TEST_TENANT_ID } }),

  'POST /api/v{version}/Report/GetEmbedInfo': () => ({ data: 'Dashboard' }),

  'POST /api/v{version}/Audit/GetAuditLog': () => ({ data: paginationPayload() }),

  'POST /api/v{version}/Gateway/GetGatewaySummary': () => ({ data: { tenantId: String(TEST_TENANT_ID) } }),
  'POST /api/v{version}/Gateway/GetGatewayList': () => ({
    data: {
      tenantId: String(TEST_TENANT_ID),
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'Id',
      sortOrder: 'desc',
      filters: '',
    },
  }),
  'POST /api/v{version}/Gateway/GetGatewayDataSources': () => ({
    data: { tenantId: String(TEST_TENANT_ID), gatewayId: SYNTHETIC },
  }),

  'POST /api/v{version}/Governance/GetPublicWebFindingDetail': () => ({ data: { id: SYNTHETIC_UUID } }),
  'POST /api/v{version}/Governance/GetExternalGuestUserActivityDetail': () => ({ data: { id: SYNTHETIC_UUID } }),
  'GET /api/v{version}/Governance/shared-report-findings': () => ({ params: { pageNumber: 1, pageSize: 10 } }),

  'POST /api/v{version}/GrowthAnalytics/GetSummaryDashboardSnapshotList': () => ({
    data: { tenantId: String(TEST_TENANT_ID), sortColumn: 'Id', sortOrder: 'desc', filters: '' },
  }),

  'GET /api/v{version}/LineageExplorer/GetDatasetSchema': () => ({
    params: { datasetSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID },
  }),
  'GET /api/v{version}/LineageExplorer/GetArtifactNeighborhood': () => ({
    params: { artifactSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID, maxDepth: 1 },
  }),
  'GET /api/v{version}/LineageExplorer/GetWorkspaceLineage': () => ({
    params: { workspaceSourceKey: SYNTHETIC, maxDepth: 1 },
  }),
  'GET /api/v{version}/LineageExplorer/GetDataflowMetadata': () => ({
    params: { dataflowSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID },
  }),
  'GET /api/v{version}/LineageExplorer/GetDataflowSchema': () => ({
    params: { dataflowSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID },
  }),
  'GET /api/v{version}/LineageExplorer/GetNodeDetails/{nodeSourceKey}': () => ({
    params: { tenantId: TEST_TENANT_ID },
  }),

  'POST /api/v{version}/LineageExplorer/GetLineageData': () => ({ data: { workspaceSourceKeys: SYNTHETIC, tenantId: TEST_TENANT_ID } }),
  'POST /api/v{version}/LineageExplorer/GetArtifacts': () => ({ data: { workspaceSourceKeys: SYNTHETIC, tenantId: TEST_TENANT_ID } }),
  'POST /api/v{version}/LineageExplorer/GetArtifactDetail': () => ({
    data: { artifactSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID },
  }),

  'POST /api/v{version}/LineageExplorer/GetImpactAnalysis': () => ({ data: { nodeSourceKey: SYNTHETIC, tenantId: TEST_TENANT_ID } }),

  'POST /api/v{version}/TenantExplorer/GetMostActiveItems': () => ({
    data: { type: 'Report', tenantId: TEST_TENANT_ID, topCount: 5, pageNumber: 1, pageSize: 10 },
  }),

  'POST /api/v{version}/DashboardDetail/GetDashboardTiles': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDashboardSourceReports': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDashboardAppInfo': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDashboardMetadata': () => ({ data: { tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC } }),
  'POST /api/v{version}/DashboardDetail/GetDashboardDetail': () => ({ data: { tenantId: TEST_TENANT_ID, dashboardId: SYNTHETIC } }),
  'POST /api/v{version}/DashboardDetail/GetOverdueMissingBackupsList': () => ({
    data: {
      tenantId: String(TEST_TENANT_ID),
      pageNumber: 1,
      pageSize: 10,
      searchTerm: '',
      typeFilter: '',
      sortColumn: 'Id',
      sortDirection: 'desc',
    },
  }),
  'POST /api/v{version}/DashboardDetail/GetFailedBackupsList': () => ({
    data: {
      tenantId: String(TEST_TENANT_ID),
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'Id',
      sortDirection: 'desc',
      searchTerm: '',
      typeFilter: '',
    },
  }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceUsers': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceReports': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceDatasets': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetWorkspaceDataflows': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, workspaceSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDatasetRefreshHistory': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, datasetSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDatasetUsers': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, datasetSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDatasetDetails': () => ({ data: { tenantId: TEST_TENANT_ID, datasetSourceKey: SYNTHETIC } }),
  'POST /api/v{version}/DashboardDetail/GetDataflowRefreshHistory': () => ({ data: paginationPayload({ tenantId: TEST_TENANT_ID, dataflowSourceKey: SYNTHETIC }) }),
  'POST /api/v{version}/DashboardDetail/GetDataflowDetails': () => ({ data: { tenantId: TEST_TENANT_ID, dataflowSourceKey: SYNTHETIC } }),
  'POST /api/v{version}/DashboardDetail/GetReportDetails': () => ({ data: { tenantId: TEST_TENANT_ID, reportSourceKey: SYNTHETIC } }),
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
  if (method === 'GET') return { params: {} };
  if (method !== 'POST') return {};
  return { data: paginationPayload({ tenantId: TEST_TENANT_ID }) };
}

/** Returns { data?, params? } request options for a Swagger operation using synthetic test data. */
function buildRequestOptions(method, path) {
  const builder = EXACT_BUILDERS[`${method} ${path}`];
  return builder ? builder() : defaultOptions(method);
}

module.exports = { buildRequestOptions };
