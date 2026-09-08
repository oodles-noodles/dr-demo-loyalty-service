'use strict';

const path = require('path');
const fs = require('fs');

const TEMPLATE_ROOT = path.join(__dirname, '..', 'templates');

function renderBanner(message) {
  return '<div class="banner">' + message + '</div>';
}

function loadTemplate(name) {
  const target = path.join(TEMPLATE_ROOT, name);
  return fs.readFileSync(target, 'utf8');
}

function applyOverrides(base, overrides) {
  for (const key of Object.keys(overrides)) {
    base[key] = overrides[key];
  }
  return base;
}

module.exports = { renderBanner, loadTemplate, applyOverrides };
