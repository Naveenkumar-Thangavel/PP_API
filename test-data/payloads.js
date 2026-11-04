function paginationPayload(overrides = {}) {
  return { pageNumber: 1, pageSize: 10, sortColumn: 'Id', sortOrder: 'desc', ...overrides };
}

module.exports = { paginationPayload };
