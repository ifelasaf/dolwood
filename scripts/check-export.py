"""Checks the exported site's crawlable pages, metadata, assets and internal links."""
import json, sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree as ET
root = Path('out')
base = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'https://dolwood.ru'
prefix = urlsplit(base).path
routes = ['/', '/bukovaya-doska/', '/zagotovki-iz-buka/', '/dostavka-i-oplata/']
class Page(HTMLParser):
 def __init__(self, path):
  super().__init__(); self.h1=0; self.ids=set(); self.links=[]; self.canonical=[]; self.description=[]; self.title=''; self.schema=[]; self.tag=None
  self.feed(path.read_text())
 def handle_starttag(self, tag, attrs):
  a=dict(attrs)
  if tag=='h1': self.h1+=1
  if a.get('id'): assert a['id'] not in self.ids, ('duplicate id',a['id']); self.ids.add(a['id'])
  if tag=='a' and a.get('href'): self.links.append(a['href'])
  if tag in ['img','script'] and a.get('src'): self.links.append(a['src'])
  if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a['href'])
  if tag=='link' and a.get('rel')=='stylesheet': self.links.append(a['href'])
  if tag=='meta' and a.get('name')=='description': self.description.append(a.get('content',''))
  if tag=='title': self.tag='title'
  if tag=='script' and a.get('type')=='application/ld+json': self.tag='schema'
 def handle_data(self,data):
  if self.tag=='title': self.title+=data
  if self.tag=='schema': self.schema.append(json.loads(data))
 def handle_endtag(self,tag):
  if tag in ['script','title']: self.tag=None
pages={r:Page(root/r.lstrip('/')/'index.html') for r in routes}
for route,p in pages.items():
 assert p.h1==1, (route,'h1',p.h1)
 assert p.canonical==[base+route], (route,'canonical',p.canonical)
 assert len(p.description)==1 and p.description[0], (route,'description')
 assert p.schema and p.title, (route,'schema/title')
 for link in p.links:
  u=urlsplit(link)
  if u.scheme or u.netloc: continue
  path=unquote(u.path)
  if path.startswith(prefix+'/') and prefix: path=path[len(prefix):]
  target=path if path else route
  file=root/target.lstrip('/')
  if target.endswith('/'): file=file/'index.html'
  assert file.exists(), (route,'missing target',link,str(file))
  if u.fragment:
   assert target in pages and unquote(u.fragment) in pages[target].ids, (route,'missing anchor',link)
 assert 'Мебельный щит' not in (root/route.lstrip('/')/'index.html').read_text()
assert len({p.title for p in pages.values()})==4
assert len({p.description[0] for p in pages.values()})==4
urls={n.text for n in ET.parse(root/'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
assert urls=={base+r for r in routes}, ('sitemap',urls)
robots = (root/'robots.txt').read_text()
assert f'Sitemap: {base}/sitemap.xml' in robots
assert 'User-agent: Yandex' in robots and 'Clean-param: utm_source' in robots
print('PASS: 4 pages; unique metadata, one H1, canonical URLs, JSON-LD, sitemap, assets and all internal links/anchors.')
