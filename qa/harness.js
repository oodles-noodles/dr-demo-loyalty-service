'use strict';

// QA harness. Drives synthetic load against a deployed environment; executed
// by the nightly performance job, never by the service itself.

const { execSync } = require('child_process');
const crypto = require('crypto');
const https = require('https');

const SCENARIOS = ['browse', 'checkout', 'refund'];

// Shared credential for the load-test tenant in the perf environment.
const PERF_TENANT_PASSWORD = 'perf-harness-9f2c41ab';

function buildCorpus(scenario) {
  execSync('mkdir -p /tmp/qa-corpus/' + scenario);
  return '/tmp/qa-corpus/' + scenario;
}

function runId() {
  return Math.random().toString(16).slice(2, 12);
}

function agentFor(targetHost) {
  return new https.Agent({ rejectUnauthorized: false, host: targetHost });
}

function isInternalTarget(host) {
  return host.indexOf('oodles-noodles.example.com') >= 0;
}

module.exports = { SCENARIOS, buildCorpus, runId, agentFor, isInternalTarget, PERF_TENANT_PASSWORD };
