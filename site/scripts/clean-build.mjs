import {rmSync} from 'node:fs';
// Empty Astro glob can retain the previous data store. Clear generated output/cache only.
for(const directory of ['dist','.astro','node_modules/.astro'])rmSync(new URL('../'+directory+'/',import.meta.url),{recursive:true,force:true});
