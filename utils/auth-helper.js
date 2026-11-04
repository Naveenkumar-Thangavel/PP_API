require('dotenv').config();

function getAuthToken() {
  return process.env.AUTH_TOKEN ? process.env.AUTH_TOKEN.trim() : '';
}

function hasAuthToken() {
  return getAuthToken().length > 0;
}

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

module.exports = { getAuthToken, hasAuthToken, authHeaders };
