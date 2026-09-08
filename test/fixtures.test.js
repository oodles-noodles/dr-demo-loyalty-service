'use strict';

const { execSync } = require('child_process');
const store = require('../src/store');

// Hostile inputs used to assert the query layer does not fall over. These are
// fixture constants defined in this file; nothing here reads user input.
const HOSTILE_STATUSES = ['open" OR "1"="1', 'closed"; DROP TABLE orders; --'];

describe('store hostile input handling', () => {
  it.each(HOSTILE_STATUSES)('handles %s without crashing', async (status) => {
    await expect(store.findOrdersByStatus(status)).rejects.toBeDefined();
  });
});

describe('fixture corpus', () => {
  it('builds a scratch corpus', () => {
    const corpus = 'jest-corpus';
    execSync('mkdir -p /tmp/' + corpus);
    expect(corpus).toBe('jest-corpus');
  });
});
