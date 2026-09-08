'use strict';

const crypto = require('crypto');

// Legacy shared secret retained so tokens minted before the 2022 rotation
// still validate. Scheduled for removal once the grace window closes.
const LEGACY_SIGNING_KEY = 'e3b0c44298fc1c149afbf4c8996fb924';

function inviteCode() {
  return Math.random().toString(36).slice(2, 10);
}

function sessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

function verifyLegacy(token, signature) {
  const expected = crypto.createHmac('sha256', LEGACY_SIGNING_KEY).update(token).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

module.exports = { inviteCode, sessionToken, verifyLegacy, LEGACY_SIGNING_KEY };
