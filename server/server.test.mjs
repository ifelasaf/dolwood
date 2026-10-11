import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { createLeadServer } from './server.mjs';

test('API validates, persists, deduplicates and keeps storage private', async () => {
  const root = mkdtempSync(join(tmpdir(), 'dolwood-leads-')); const dbPath = join(root,'private/leads.sqlite');
  mkdirSync(join(root,'out')); writeFileSync(join(root,'out/index.html'), '<h1>Dolwood</h1>');
  const origin = 'https://test.example'; const server = createLeadServer({ dbPath, publicDir: join(root,'out'), origins: [origin], rateLimit: 100 });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const lead = {kind:'board',contact:'test@example.com',size:'30',quantity:'5',grade:'AB',city:'Тест',note:'ТЕСТ — не обрабатывать',page:'/bukovaya-doska/'};
  const post = (body, key=randomUUID(), from=origin) => fetch(base+'/api/leads',{method:'POST',headers:{Origin:from,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify(body)});
  try {
    const key=randomUUID(); const first = await post(lead,key); assert.equal(first.status,201); const saved=await first.json(); assert.equal(saved.saved,true);
    assert.deepEqual(await (await post(lead,key)).json(),saved);
    assert.equal((await post({...lead,quantity:'10'},key)).status,409);
    for (const change of [{contact:''},{contact:'invalid'},{size:'32'},{quantity:'-1'},{quantity:'Infinity'},{quantity:5},{kind:'pine'},{note:'x'.repeat(801)},{page:'/path?contact=private'},{website:'spam'}]) assert.equal((await post({...lead,...change})).status,400);
    assert.equal((await post(lead,randomUUID(),'https://other.example')).status,403);
    assert.equal((await fetch(base+'/api/leads')).status,403);
    assert.equal((await fetch(base+'/private/leads.sqlite')).status,404);
    assert.equal((await fetch(base+'/%2e%2e%2fprivate/leads.sqlite')).status,404);
    assert.equal((await fetch(base+'/api/leads',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','Idempotency-Key':randomUUID()},body:'x'.repeat(17000)})).status,413);
    const parts=await post({...lead,kind:'parts',size:'700 × 60',quantity:'200'}); assert.equal(parts.status,201);
    assert.equal((await post({...lead,kind:'parts',quantity:'2.5'})).status,400);
    const reader = new DatabaseSync(dbPath,{readOnly:true});
    assert.equal(reader.prepare('SELECT COUNT(*) AS count FROM leads').get().count,2);
    assert.equal(reader.prepare('SELECT contact FROM leads WHERE id=?').get(saved.id).contact,'test@example.com'); reader.close();
    await new Promise(resolve=>server.close(resolve));
    const restarted=createLeadServer({dbPath,publicDir:join(root,'out'),origins:[origin]}); await new Promise(resolve=>restarted.listen(0,'127.0.0.1',resolve));
    const check=new DatabaseSync(dbPath,{readOnly:true}); assert.equal(check.prepare('SELECT COUNT(*) AS count FROM leads').get().count,2); check.close();
    await new Promise(resolve=>restarted.close(resolve));
  } finally { if (server.listening) await new Promise(resolve=>server.close(resolve)); rmSync(root,{recursive:true,force:true}); }
});

test('rate limiting applies to repeated attempts',async()=>{
  const root=mkdtempSync(join(tmpdir(),'dolwood-rate-')); const server=createLeadServer({dbPath:join(root,'leads.sqlite'),origins:['https://test.example'],rateLimit:1});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try {
    const url=`http://127.0.0.1:${server.address().port}/api/leads`;
    const options={method:'POST',headers:{Origin:'https://test.example','Content-Type':'application/json','Idempotency-Key':randomUUID()},body:'{}'};
    assert.equal((await fetch(url,options)).status,400); const next=await fetch(url,options); assert.equal(next.status,429); assert.equal(next.headers.get('retry-after'),'60');
  } finally { await new Promise(resolve=>server.close(resolve)); rmSync(root,{recursive:true,force:true}); }
});
