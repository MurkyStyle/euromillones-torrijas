import { readFile, writeFile } from 'node:fs/promises';

const YEARS=[2020,2021,2022,2023,2024,2025];
const DATA_FILE='data/results.json';
const players=[
  {name:'Manolax',numbers:[7,11,14,16,22],stars:[3,7]},
  {name:'Karim',numbers:[7,9,13,23,26],stars:[7,9]},
  {name:'Piti',numbers:[3,17,23,35,49],stars:[5,8]},
  {name:'Grego',numbers:[9,23,25,30,31],stars:[3,7]},
  {name:'Rosky',numbers:[9,17,22,28,49],stars:[1,3]},
  {name:'Irish',numbers:[6,7,18,22,50],stars:[7,12]}
];
const categoryOrder=['5+2','5+1','5+0','4+2','4+1','3+2','4+0','2+2','3+1','3+0','1+2','2+1','2+0'];
const headers={'User-Agent':'Euromillones-Torrijas/1.0 (+https://murkystyle.github.io/euromillones-torrijas/)','Accept':'text/html'};
const matchCount=(picked,winning)=>picked.filter(number=>winning.includes(number)).length;
const euro=value=>Number(String(value).replace(/<[^>]*>/g,'').replace(/\./g,'').replace(',','.').replace(/[^\d.]/g,''))||0;

async function page(url){
  const response=await fetch(url,{headers});
  if(!response.ok)throw new Error(`La fuente histórica devolvió ${response.status}: ${url}`);
  return response.text();
}

async function yearDraws(year){
  const html=await page(`https://www.euromillones.com/es/resultados/euromillones--resultados-a%C3%B1o-${year}`);
  const markers=[...html.matchAll(/onclick="location\.href='(https:\/\/www\.euromillones\.com\/es\/resultados\/euromillones--resultados-(\d{4})-(\d{2})-(\d{2})-[^']+)'; return false;">/g)];
  if(!markers.length)throw new Error(`No se encontraron sorteos para ${year}.`);
  return markers.map((marker,index)=>{
    const section=html.slice(marker.index,markers[index+1]?.index);
    const numbers=[...section.matchAll(/<span class="txt-color">(\d+)<\/span>/g)].map(value=>Number(value[1]));
    const stars=[...section.matchAll(/<span class="">\s*E(\d+)\s*<\/span>/g)].map(value=>Number(value[1]));
    if(numbers.length!==5||stars.length!==2)throw new Error(`Combinación incompleta en ${marker[2]}-${marker[3]}-${marker[4]}.`);
    return {date:`${marker[2]}-${marker[3]}-${marker[4]}`,numbers,stars,url:marker[1]};
  });
}

async function spanishPrizes(url){
  const html=await page(url);
  const table=html.match(/<th colspan="2" class="c"><span class="flag-ico es"><\/span>[\s\S]*?<\/table>/i)?.[0];
  if(!table)throw new Error(`No se encontró la tabla española de premios: ${url}`);
  const amounts=[...table.matchAll(/<td[^>]*class="d txt-color-dark"[^>]*>([\s\S]*?)<\/td>/gi)].map(value=>euro(value[1]));
  if(amounts.length!==categoryOrder.length)throw new Error(`Tabla de premios incompleta: ${url}`);
  return Object.fromEntries(categoryOrder.map((category,index)=>[category,amounts[index]]));
}

const allDraws=(await Promise.all(YEARS.map(year=>yearDraws(year)))).flat();
const candidates=allDraws.filter(draw=>players.some(player=>{
  const main=matchCount(player.numbers,draw.numbers),stars=matchCount(player.stars,draw.stars);
  return main>=2||(main>=1&&stars>=2);
}));
console.log(`Sorteos históricos leídos: ${allDraws.length}. Comprobaciones de premio necesarias: ${candidates.length}.`);

const tables=new Map();
for(let index=0;index<candidates.length;index+=4){
  const batch=candidates.slice(index,index+4);
  const values=await Promise.all(batch.map(async draw=>[draw.date,await spanishPrizes(draw.url)]));
  values.forEach(([date,table])=>tables.set(date,table));
}

const imported=allDraws.map(draw=>{
  const table=tables.get(draw.date)||{};
  const prizes={};
  players.forEach(player=>{
    const main=matchCount(player.numbers,draw.numbers),stars=matchCount(player.stars,draw.stars);
    const amount=table[`${main}+${stars}`]||0;
    if(amount>0)prizes[player.name]=amount;
  });
  return {date:draw.date,numbers:draw.numbers,stars:draw.stars,prizes,source:'euromillones.com'};
});

const existing=JSON.parse(await readFile(DATA_FILE,'utf8'));
const merged=new Map([...(existing.draws||[]),...imported].map(draw=>[draw.date,draw]));
const draws=[...merged.values()].sort((a,b)=>a.date.localeCompare(b.date));
await writeFile(DATA_FILE,`${JSON.stringify({updatedAt:new Date().toISOString(),draws},null,2)}\n`);
const prizeCount=imported.filter(draw=>Object.keys(draw.prizes).length).length;
const total=imported.reduce((sum,draw)=>sum+Object.values(draw.prizes).reduce((partial,amount)=>partial+amount,0),0);
console.log(`Importación terminada: ${imported.length} sorteos, ${prizeCount} con premio, ${total.toFixed(2)} €.`);
