import {auditLinks} from './audit-generated-links.mjs';
import config from '../site.config.json' with {type:'json'};
const result=auditLinks('dist',process.env.ASTRO_BASE_PATH||config.base||'/');
if(result.failures.length)throw Error(result.failures.join('\n'));
console.log('Independent internal routes PASS:',result.pages);
