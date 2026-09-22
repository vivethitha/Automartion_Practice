const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

function loadJson(fileName) {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function loadCsv(fileName) {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  const csv = fs.readFileSync(filePath, 'utf8');
  return parse(csv, { columns: true, skip_empty_lines: true, trim: true });
}

module.exports = { loadJson, loadCsv };
