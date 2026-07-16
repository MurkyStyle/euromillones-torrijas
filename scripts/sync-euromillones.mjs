import { readFile, writeFile } from 'node:fs/promises';

const API_URL='https://api.loteriasapi.com/api/v1/results/euromillones/date';
const DATA_FILE='data/results.json';
const players=[
  {name:'Manolax',numbers:[7,11,14,16,22],stars:[3,7]},
  {name:'Karim',numbers:[7,9,13,23,26],stars:[7,9]},
  {name:'Piti',numbers:[3,17,23,35,49],stars:[5,8]},
  {name:'Grego',numbers:[9,23,25,30,31],stars:[3,7]},
  {name:'Rosky',numbers:[9,17,22,28,49],stars:[1,3]},
  {name:'Irish',numbers:[6,7,18,22,50],stars:[7,12]}
];

if(!process.env.LOTTERY_API_KEY)throw new Error('Falta el secreto LOTTERY_API_KEY.');

const isoDate=date=>date.toISOString().slice(0,10);
const today=new Date();
// El endpoint de rango de la API devuelve actualmente 400. Consultamos los
// martes y viernes recientes individualmente: es el formato que sí acepta.
const drawDates=[];
for(let daysAgo=0;daysAgo<=7;daysAgo+=1){
  const date=new Date(today);
  date.setUTCDate(date.getUTCDate()-daysAgo);
  if([2,5].includes(date.getUTCDay()))drawDates.push(isoDate(date));
}
const responses=await Promise.all(drawDates.map(async date=>{
  const response=await fetch(`${API_URL}/${date}`,{headers:{'X-API-Key':process.env.LOTTERY_API_KEY,Accept:'application/json'}});
  if(!response.ok){
    const detail=await response.text();
    throw new Error(`La API devolvió ${response.status} para ${date}: ${detail.slice(0,300)}`);
  }
  const payload=await response.json();
  if(!payload.success||!Array.isArray(payload.data))throw new Error(`Respuesta de resultados no válida para ${date}.`);
  return payload.data;
}));
const results=responses.flat();

const matchCount=(picked,winning)=>picked.filter(number=>winning.includes(number)).length;
const categoryKey=name=>{
  const pair=String(name||'').match(/(\d+)\s*\+\s*(\d+)/);
  if(pair)return `${pair[1]}+${pair[2]}`;
  const main=String(name||'').match(/^(\d+)/);
  return main?`${main[1]}+0`:null;
};
const prizeMap=prizes=>Object.fromEntries((prizes||[]).map(prize=>[categoryKey(prize.categoryName),Number(prize.prizeAmount||0)/100]).filter(([key,value])=>key&&Number.isFinite(value)&&value>0));
const formatDraw=result=>{
  // La API incluye también las dos estrellas al final de `combination`.
  const numbers=(result.combination||[]).slice(0,5).map(Number);
  const stars=(result.resultData?.estrellas||[]).map(Number);
  if(numbers.length!==5||stars.length!==2)return null;
  const categories=prizeMap(result.prizes);
  const prizes={};
  players.forEach(player=>{const main=matchCount(player.numbers,numbers),star=matchCount(player.stars,stars),amount=categories[`${main}+${star}`]||0;if(amount>0)prizes[player.name]=amount});
  return {date:result.drawDate,numbers,stars,prizes,source:'Lotería API · resultados de SELAE'};
};

const existing=JSON.parse(await readFile(DATA_FILE,'utf8'));
const updated=new Map((existing.draws||[]).map(draw=>[draw.date,draw]));
results.map(formatDraw).filter(Boolean).filter(draw=>draw.date>='2025-01-01').forEach(draw=>updated.set(draw.date,draw));
const nextDraws=[...updated.values()].sort((a,b)=>a.date.localeCompare(b.date));
if(JSON.stringify(nextDraws)!==JSON.stringify(existing.draws||[])){
  const output={updatedAt:new Date().toISOString(),draws:nextDraws};
  await writeFile(DATA_FILE,`${JSON.stringify(output,null,2)}\n`);
}
