// Resource-identifier field names seen across Swagger request/response models.
const WATCHED_KEYS = [
  'id', 'tenantId', 'notificationId', 'notificationIds', 'workspaceId', 'workspaceSourceKey',
  'artifactItemId', 'artifactSourceKey', 'groupObjectId', 'clientId', 'appClientId', 'datasetId',
  'datasetSourceKey', 'dataflowId', 'dataflowSourceKey', 'reportId', 'reportSourceKey',
  'userIdentifier', 'dashboardId', 'nodeSourceKey', 'appSourceKey',
];

function pickWatched(source, context) {
  if (!source || typeof source !== 'object') return;
  for (const key of WATCHED_KEYS) {
    if (source[key] !== undefined && source[key] !== null) context[key] = source[key];
  }
}

/** Captures resource identifiers from a successful response (top-level and first list item) for later requests. */
function captureContext(context, body) {
  if (!body || typeof body !== 'object') return;
  pickWatched(body, context);
  const list = Array.isArray(body.items) ? body.items : Array.isArray(body.records) ? body.records : null;
  if (list && list.length > 0) pickWatched(list[0], context);
}

/** Merges previously captured context values into a request payload, overriding matching placeholder keys. */
function applyContext(context, data) {
  if (!data || typeof data !== 'object') return;
  for (const key of Object.keys(data)) {
    if (context[key] !== undefined) data[key] = context[key];
  }
}

module.exports = { captureContext, applyContext, WATCHED_KEYS };
