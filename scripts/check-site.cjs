const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
const root=path.resolve(__dirname,'../site');const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'site-config.js'),'utf8'),ctx);
const config=ctx.window.HEATBANK_CONFIG;
const pending=config?.applicationStatus==='pending' && config.applicationUrl==='';
if(!pending && (!config?.applicationUrl || !/^(https:\/\/|mailto:)/.test(config.applicationUrl))) throw new Error('Configure a real application destination or explicitly mark the entry pending.');
let count=0;
for(const match of html.matchAll(/(?:src|href)="\.\/([^"?#]+)(?:[?#][^"]*)?"/g)){
 const file=path.resolve(root,match[1]);if(!file.startsWith(root+path.sep)||!fs.existsSync(file))throw new Error(`Missing asset: ${match[1]}`);count++;
}
for(const match of html.matchAll(/href="#([^"]+)"/g))if(!html.includes(`id="${match[1]}"`))throw new Error(`Missing anchor: ${match[1]}`);
if((html.match(/class="poster-link"/g)||[]).length!==6)throw new Error('Expected all six real promotional screenshots.');
if(/TODO|TBD|example\.com|localhost|127\.0\.0\.1/.test(html))throw new Error('Placeholder content in published HTML');
for(const match of fs.readFileSync(path.join(root,'styles.css'),'utf8').matchAll(/url\(['"]?\.\/([^'"\)]+)['"]?\)/g))if(!fs.existsSync(path.join(root,match[1])))throw new Error(`Missing CSS asset: ${match[1]}`);
for(const name of ['app.js','site-config.js'])new vm.Script(fs.readFileSync(path.join(root,name),'utf8'),{filename:name});
console.log(`Site validated: ${count} local references, six promotional images, application ${pending?'explicitly pending (no active submission link)':'configured'}.`);
