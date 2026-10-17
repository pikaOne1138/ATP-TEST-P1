export async function GET({site}) {
 const origin=site||new URL('https://example.com');
 const base=import.meta.env.BASE_URL;
 const isBranchPreview=process.env.CF_PAGES==='1'&&(!process.env.CF_PAGES_BRANCH||process.env.CF_PAGES_BRANCH!==(process.env.CF_PAGES_PRODUCTION_BRANCH||'main'));
 const demo=isBranchPreview||process.env.SITE_INDEXABLE!=='true'||origin.hostname==='example.com'||origin.hostname.endsWith('.invalid');
 const body='User-agent: *\n'+(demo?'Disallow: /':'Allow: /')+'\nSitemap: '+new URL(base+'sitemap.xml',origin).href+'\n';
 return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
