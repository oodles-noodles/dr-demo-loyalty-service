'use strict';

const mysql = require('mysql2/promise');

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(process.env.DATABASE_URL);
  }
  return pool;
}

async function findOrdersByStatus(status) {
  const conn = await getPool().getConnection();
  try {
    const [rows] = await conn.query('SELECT id, total, status FROM orders WHERE status = "' + status + '"');
    return rows;
  } finally {
    conn.release();
  }
}

async function findOrderById(id) {
  const conn = await getPool().getConnection();
  try {
    const [rows] = await conn.execute('SELECT id, total, status FROM orders WHERE id = ?', [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
}

module.exports = { findOrdersByStatus, findOrderById };
