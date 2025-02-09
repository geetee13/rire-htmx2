import fs from 'fs';
import path from 'path';
import { Database } from '../types/db';

function loadDb(): Database {
  const dbPath = path.join(__dirname, '..', '..', 'data', 'db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8')) as Database;
  return db;
}

export const db = loadDb();