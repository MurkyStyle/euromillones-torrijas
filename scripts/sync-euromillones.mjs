import { readFile, writeFile } from 'node:fs/promises';

const SOURCE_URL='https://www.euromillones.com.es/resultados-anteriores.html';
const HISTORY_TABLE_URL='https://www.euromillones.com.es/historial.php';
const DATA_FILE='data/results.json';
const players=[
  {name:'Manolax',numbers:[7,11,14,16,22],stars:[3,7]},
  {name:'Karim',numbers:[7,9,13,23,26],stars:[7,9]},
  {name:'Piti',numbers:[3,17,23,35,49],stars:[5,8]},
  {name:'Grego',numbers:[9,23,25,30,31],stars:[3,7]},
  {name:'Rosky',numbers:[9,17,22,28,49],stars:[1,3]},
  {name:'Irish',numbers:[6,7,18,22,50],stars:[7,12]}
];

const monthNumber={enero:'01',febrero:'02',marzo:'03',abril:'04',mayo:'05',junio:'06',julio:'07',agosto:'08',septiembre:'09',octubre:'10',noviembre:'11',diciembre:'12'};
const stripTags=value=>String(value).replace(/<[^>]*>/g,' ').replace(/&nbsp;/gi,' ').replace(/\s+/g,' ').trim();
const money=value=>{
  const text=stripTags(value).replace(/€/g,'').trim();
  if(!/\d/.test(text))return 0;
  return Number(text.replace(/\./g,'').replace(',','.').replace(/[^\d.]/g,''))||0;
};
const matchCount=(picked,winning)=>picked.filter(number=>winning.includes(number)).length;
const headers={'User-Agent':'Euromillones-Torrijas/1.0 (+https://murkystyle.github.io/euromillones-torrijas/)','Accept':'text/html'};
const getPage=async url=>{
  const response=await fetch(url,{headers});
  if(!response.ok)throw new Error(`La fuente de resultados devolvió ${response.status}.`);
  return response.text();
};

const prizeTable=async token=>{
  const response=await fetch(HISTORY_TABLE_URL,{method:'POST',headers:{...headers,'Content-Type':'application/x-www-form-urlencoded'},body:`data=${encodeURIComponent(token)}`});
  if(!response.ok)throw new Error(`La tabla de premios devolvió ${response.status}.`);
  const table=await response.text();
  const categories={};
  for(const row of table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)){
    const cells=[...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(cell=>cell[1]);
    const category=stripTags(cells[0]||'').match(/\(\s*(\d+)\s*\+\s*(\d+)\s*\)/);
    if(category)categories[`${category[1]}+${category[2]}`]=money(cells.at(-1));
  }
  return categories;
};

const html=await getPage(SOURCE_URL);
const rawDraws=[...html.matchAll(/<li\s+class=["']blq["']>[\s\S]*?<h4>Euromillones\s*-\s*[^,]+,\s*(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})<\/h4>[\s\S]*?<div\s+class=["']numhisto["']>[\s\S]*?<ul>([\s\S]*?)<\/ul>[\s\S]*?<div\s+class=["']cargar["']\s+data-sorteo=["']([^"']+)["']/gi)];
if(!rawDraws.length)throw new Error('No se encontraron sorteos recientes en la fuente.');

const recentDraws=rawDraws.map(([,day,monthName,year,combination,token])=>{
  const month=monthNumber[monthName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')];
  if(!month)throw new Error(`No se pudo interpretar el mes ${monthName}.`);
  const values=[...combination.matchAll(/<li\b[^>]*class=["'](?:numeros|estrellas)["'][^>]*>\s*(\d+)\s*<\/li>/gi)].map(match=>Number(match[1]));
  if(values.length!==7)throw new Error(`No se pudo leer una combinación completa del ${day}/${month}/${year}.`);
  return {date:`${year}-${month}-${day.padStart(2,'0')}`,numbers:values.slice(0,5),stars:values.slice(5),token};
});

const existing=JSON.parse(await readFile(DATA_FILE,'utf8'));
// Conserva en el archivo de datos el histórico ya validado de la aplicación.
const appSource=await readFile('app.js','utf8');
const resultsText=appSource.match(/const officialResults=`([\s\S]*?)`;/)?.[1];
const prizesText=appSource.match(/const officialPrizes=({[\s\S]*?});\s*function getMatches/)?.[1];
if(!resultsText||!prizesText)throw new Error('No se pudo leer el histórico validado de la aplicación.');
const knownPrizes=Function(`return (${prizesText})`)();
const knownDraws=resultsText.trim().split('\n').map(row=>{
  const [knownDate,main,lucky]=row.split('|');
  return {date:knownDate,numbers:main.split(',').map(Number),stars:lucky.split(',').map(Number),prizes:knownPrizes[knownDate]||{},source:'SELAE'};
});
const updated=new Map([...knownDraws,...(existing.draws||[])].map(draw=>[draw.date,draw]));

for(const draw of recentDraws){
  const contenders=players.filter(player=>{
    const main=matchCount(player.numbers,draw.numbers),star=matchCount(player.stars,draw.stars);
    return main>=2||(main>=1&&star>=2);
  });
  const categories=contenders.length?await prizeTable(draw.token):{};
  const prizes={};
  for(const player of contenders){
    const main=matchCount(player.numbers,draw.numbers),star=matchCount(player.stars,draw.stars);
    const amount=categories[`${main}+${star}`]||0;
    if(amount>0)prizes[player.name]=amount;
  }
  updated.set(draw.date,{date:draw.date,numbers:draw.numbers,stars:draw.stars,prizes,source:'euromillones.com.es'});
}

const draws=[...updated.values()].sort((a,b)=>a.date.localeCompare(b.date));
if(JSON.stringify(draws)!==JSON.stringify(existing.draws||[])){
  await writeFile(DATA_FILE,`${JSON.stringify({updatedAt:new Date().toISOString(),draws},null,2)}\n`);
  console.log(`Resultados sincronizados: ${recentDraws.length} sorteos recientes.`);
}else console.log('Sin cambios: los sorteos recientes ya estaban actualizados.');
