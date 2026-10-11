import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { createHash, randomUUID } from 'node:crypto';
import { mkdirSync, chmodSync, existsSync, realpathSync, statSync, createReadStream } from 'node:fs';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = dirname(fileURLToPath(import.meta.url));
const MAX_BODY = 16384;
export function createLeadServer({ dbPath = resolve(directory, 'data/leads.sqlite'), publicDir = resolve(directory, '../out'), origins = ['http://127.0.0.1:4174', 'http://localhost:4174'], trustProxy = false, rateLimit = 10 } = {}) {
  process.umask(0o077);
  mkdirSync(dirname(dbPath), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(dbPath); chmodSync(dbPath, 0o600);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, fingerprint TEXT NOT NULL,
      created_at TEXT NOT NULL, kind TEXT NOT NULL, contact TEXT NOT NULL,
      size TEXT NOT NULL, quantity TEXT NOT NULL, grade TEXT NOT NULL,
      city TEXT NOT NULL, note TEXT NOT NULL, page TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    );`);
  const lookup = db.prepare('SELECT id, fingerprint FROM leads WHERE request_key = ?');
  const insert = db.prepare('INSERT INTO leads (id,request_key,fingerprint,created_at,kind,contact,size,quantity,grade,city,note,page) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
  const allowed = new Set(origins); const requests = new Map();
  const publicRoot = existsSync(publicDir) ? realpathSync(publicDir) : null;
  const json = (res, status, value) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(JSON.stringify(value)); };
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const path = (req.url || '/').split('?')[0];
    if (path === '/api/leads') {
      const origin = req.headers.origin;
      if (!origin || !allowed.has(origin)) return json(res, 403, { error: 'origin_denied' });
      res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin');
      if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key', 'Access-Control-Max-Age': '600' }); return res.end(); }
      if (req.method !== 'POST') return json(res, 405, { error: 'method_not_allowed' });
      if (req.headers['content-type']?.split(';')[0].trim() !== 'application/json') return json(res, 415, { error: 'json_required' });
      const key = req.headers['idempotency-key'];
      if (typeof key !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)) return json(res, 400, { error: 'invalid_request_key' });
      if (Number(req.headers['content-length'] || 0) > MAX_BODY) { req.resume(); return json(res, 413, { error: 'too_large' }); }
      // Trust the last forwarded address only behind a proxy that appends the real peer IP.
      const forwarded = trustProxy && typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'].split(',').at(-1).trim() : null;
      const ip = forwarded || req.socket.remoteAddress || 'unknown'; const now = Date.now();
      for (const [address, bucket] of requests) if (now - bucket.start > 60000) requests.delete(address);
      let bucket = requests.get(ip);
      if (!bucket) { if (requests.size >= 10000) return json(res, 429, { error: 'busy' }); bucket = { start: now, count: 0 }; requests.set(ip, bucket); }
      if (++bucket.count > rateLimit) { res.setHeader('Retry-After', '60'); return json(res, 429, { error: 'too_many_requests' }); }
      try {
        const chunks = []; let bytes = 0;
        for await (const chunk of req) { bytes += chunk.length; if (bytes > MAX_BODY) { json(res, 413, { error: 'too_large' }); req.resume(); return; } chunks.push(chunk); }
        let input; try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return json(res, 400, { error: 'invalid_json' }); }
        const values = validateLead(input);
        if (!values) return json(res, 400, { error: 'invalid_fields' });
        const fingerprint = createHash('sha256').update(JSON.stringify(values)).digest('hex');
        const existing = lookup.get(key);
        if (existing) return existing.fingerprint === fingerprint ? json(res, 200, { saved: true, id: existing.id }) : json(res, 409, { error: 'request_key_conflict' });
        const id = randomUUID();
        insert.run(id, key, fingerprint, new Date().toISOString(), ...Object.values(values));
        return json(res, 201, { saved: true, id });
      } catch { return json(res, 503, { error: 'temporarily_unavailable' }); }
    }
    if (path === '/healthz' && req.method === 'GET') return json(res, 200, { ok: true });
    if (!['GET', 'HEAD'].includes(req.method)) return json(res, 405, { error: 'method_not_allowed' });
    // Only the static export is served. Database files and server source are outside it.
    if (!publicRoot) return json(res, 404, { error: 'not_found' });
    let file;
    try {
      file = resolve(publicRoot, '.' + decodeURIComponent(path));
      if (file !== publicRoot && !file.startsWith(publicRoot + sep)) return json(res, 404, { error: 'not_found' });
      if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
      file = realpathSync(file);
      if (!file.startsWith(publicRoot + sep) || !statSync(file).isFile()) return json(res, 404, { error: 'not_found' });
    } catch { return json(res, 404, { error: 'not_found' }); }
    const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.ttf':'font/ttf', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml' };
    const type = types[extname(file)]; if (!type) return json(res, 404, { error: 'not_found' });
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    if (req.method === 'HEAD') return res.end();
    createReadStream(file).on('error', () => res.destroy()).pipe(res);
  });
  server.requestTimeout = 20000; server.headersTimeout = 10000;
  server.on('close', () => db.close());
  return server;
}
export function validateLead(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  if (input.website) return null;
  const limits = { kind: 5, contact: 150, size: 200, quantity: 30, grade: 2, city: 120, note: 800, page: 200 };
  const value = {};
  for (const [name, limit] of Object.entries(limits)) { const v = input[name] ?? ''; if (typeof v !== 'string' || v.length > limit || v.includes('\0')) return null; value[name] = v.trim(); }
  if (!['board','parts'].includes(value.kind)) return null;
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.contact);
  const digits = value.contact.replace(/\D/g, '');
  const phone = /^[+\d\s()\-]+$/.test(value.contact) && digits.length >= 10 && digits.length <= 15;
  if (!email && !phone) return null;
  if (value.quantity && (!Number.isFinite(Number(value.quantity)) || Number(value.quantity) <= 0 || (value.kind === 'parts' && !Number.isInteger(Number(value.quantity))))) return null;
  if (value.kind === 'board' && value.size && !['30','40','50'].includes(value.size)) return null;
  if (value.grade && !['A','AB','B'].includes(value.grade)) return null;
  if (!value.page.startsWith('/') || /[?#\r\n]/.test(value.page)) return null;
  return value;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4174);
  const origins = (process.env.ALLOWED_ORIGINS || `http://127.0.0.1:${port},http://localhost:${port}`).split(',').map(s=>s.trim()).filter(Boolean);
  const server = createLeadServer({ dbPath: process.env.DB_PATH, publicDir: process.env.PUBLIC_DIR, origins, trustProxy: process.env.TRUST_PROXY === 'true' });
  server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Dolwood site and lead API: http://${process.env.HOST || '127.0.0.1'}:${port}`));
  for (const signal of ['SIGTERM','SIGINT']) process.on(signal, () => server.close());
}
