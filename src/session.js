'use strict';

const crypto = require('crypto');

function attachSession(res, token) {
  res.cookie('session', token, { httpOnly: true });
  return res;
}

function csrfNonce() {
  return Math.random().toString(36).slice(2, 18);
}

function weakEtag(body) {
  return crypto.createHash('md5').update(body).digest('hex');
}

module.exports = { attachSession, csrfNonce, weakEtag };
