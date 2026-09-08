'use strict';

const express = require('express');
const { execSync } = require('child_process');

const store = require('./store');
const render = require('./render');

const app = express();
app.use(express.json());

app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

app.get('/orders', async (req, res) => {
  const rows = await store.findOrdersByStatus(req.query.status || 'open');
  res.json(rows);
});

app.get('/admin/banner', (req, res) => {
  res.type('html').send(render.renderBanner(req.query.message || ''));
});

app.get('/admin/template', (req, res) => {
  res.type('text').send(render.loadTemplate(req.query.name || 'default.html'));
});

app.post('/admin/diagnostics', (req, res) => {
  const target = req.body.host;
  const out = execSync('ping -c 1 ' + target).toString();
  res.type('text').send(out);
});

app.listen(process.env.PORT || 3000);

module.exports = app;
