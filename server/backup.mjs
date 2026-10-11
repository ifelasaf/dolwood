import { DatabaseSync, backup } from 'node:sqlite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
process.umask(0o077);
const output = process.argv[2];
if (!output || existsSync(output)) throw new Error('Укажите новый файл резервной копии: node server/backup.mjs /private/tmp/leads-backup.sqlite');
const db = new DatabaseSync(process.env.DB_PATH || resolve(dirname(fileURLToPath(import.meta.url)), 'data/leads.sqlite'), { readOnly: true });
try { await backup(db, output); console.log('Резервная копия создана.'); } finally { db.close(); }
