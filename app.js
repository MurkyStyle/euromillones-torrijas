const players=[
  {name:'Manolax',numbers:[7,11,14,16,22],stars:[3,7],avatar:'assets/avatars/manolax.png'},
  {name:'Karim',numbers:[7,9,13,23,26],stars:[7,9],avatar:'assets/avatars/karim.png',paid:true},
  {name:'Piti',numbers:[3,17,23,35,49],stars:[5,8],avatar:'assets/avatars/piti.png',paid:true},
  {name:'Grego',numbers:[9,23,25,30,31],stars:[3,7],avatar:'assets/avatars/grego.png',paid:true},
  {name:'Rosky',numbers:[9,17,22,28,49],stars:[1,3],avatar:'assets/avatars/rosky.png'},
  {name:'Irish',numbers:[6,7,18,22,50],stars:[7,12],avatar:'assets/avatars/irish.png'}
];
const officialResults=`2025-12-05|9,15,25,34,46|8,12
2025-12-09|2,8,13,29,49|2,11
2025-12-12|7,25,30,37,41|5,11
2025-12-16|14,16,40,41,44|2,10
2025-12-19|17,21,39,43,44|1,11
2025-12-23|8,26,27,29,44|11,12
2025-12-26|12,22,32,36,48|3,4
2025-12-30|11,26,29,34,44|1,10
2026-01-02|8,27,42,44,46|1,10
2026-01-06|5,14,17,18,31|10,12
2026-01-09|1,7,10,26,34|2,4
2026-01-13|6,10,18,44,47|2,10
2026-01-16|5,17,24,29,50|5,10
2026-01-20|11,18,19,22,50|1,11
2026-01-23|4,5,13,21,42|3,10
2026-01-27|4,23,42,43,47|3,9
2026-01-30|14,18,31,35,46|7,11
2026-02-03|26,27,28,34,37|4,9
2026-02-06|10,13,20,23,24|6,11
2026-02-10|1,17,19,34,42|5,8
2026-02-13|9,13,31,37,40|6,9
2026-02-17|1,4,6,10,41|5,12
2026-02-20|13,24,28,33,35|5,9
2026-02-24|10,27,40,43,47|6,10
2026-02-27|14,24,27,39,42|6,10
2026-03-03|6,7,24,34,50|5,7
2026-03-06|15,16,19,28,37|6,9
2026-03-10|12,14,27,44,50|4,12
2026-03-13|13,17,26,41,48|4,10
2026-03-17|5,17,28,33,41|3,9
2026-03-20|5,12,16,37,46|8,10
2026-03-24|12,16,17,18,27|1,3
2026-03-27|4,10,43,44,48|2,4
2026-03-31|5,8,10,33,38|2,7
2026-04-03|8,27,29,46,49|2,10
2026-04-07|11,14,19,36,49|6,7
2026-04-10|10,13,14,38,41|6,9
2026-04-14|1,2,4,28,44|5,12
2026-04-17|22,23,28,41,47|6,8
2026-04-21|13,16,29,40,47|3,4
2026-04-24|25,26,30,40,45|1,5
2026-04-28|26,29,41,46,47|8,9
2026-05-01|3,9,42,46,47|1,11
2026-05-05|3,4,8,20,31|6,8
2026-05-08|2,17,19,34,37|8,11
2026-05-12|4,26,32,35,36|5,7
2026-05-15|3,10,38,41,43|2,9
2026-05-19|2,12,20,38,45|2,5
2026-05-22|6,22,26,31,37|5,8
2026-05-26|6,23,25,35,37|6,12
2026-05-29|5,14,18,31,35|2,12
2026-06-02|6,9,17,18,42|7,9
2026-06-05|5,6,16,17,49|2,12
2026-06-09|2,7,23,44,46|3,5
2026-06-12|4,7,14,22,23|1,7
2026-06-16|18,25,31,37,45|4,9
2026-06-19|8,34,39,41,42|2,7
2026-06-23|3,33,36,45,46|5,6
2026-06-26|6,16,26,34,35|11,12
2026-06-30|1,8,37,44,48|2,6
2026-07-03|2,12,17,25,39|1,2
2026-07-07|5,29,33,45,47|5,8
2026-07-10|2,14,28,33,48|8,10
2026-07-14|10,19,37,42,47|9,12`;
const officialPrizes={
 '2025-12-05':{Grego:3.94},'2025-12-12':{Grego:4.05},'2025-12-16':{Manolax:4.48},
 '2026-01-09':{Karim:3.71},'2026-01-13':{Irish:3.99},'2026-01-20':{Manolax:3.55,Irish:8.50},'2026-02-06':{Karim:3.20},'2026-02-10':{Piti:4.88},'2026-02-13':{Karim:5.38,Grego:4.08},'2026-03-03':{Irish:11.32},'2026-03-13':{Karim:3.77},'2026-03-17':{Rosky:5.03},'2026-03-24':{Rosky:6.77},'2026-04-07':{Manolax:5.15},'2026-04-17':{Rosky:4.23},'2026-04-24':{Grego:4.42},'2026-05-22':{Irish:4.13},'2026-05-26':{Piti:3.95,Grego:3.95},'2026-06-02':{Karim:5.48,Rosky:3.76,Irish:4.60},'2026-06-05':{Piti:3.72,Rosky:3.72},'2026-06-09':{Karim:3.99},'2026-06-12':{Manolax:6.77,Karim:4.24,Irish:4.24},'2026-06-16':{Grego:4.33}
};
function getMatches(numbers,stars){return Object.fromEntries(players.map(p=>{const main=p.numbers.filter(n=>numbers.includes(n)).length,star=p.stars.filter(n=>stars.includes(n)).length;return [p.name,{main,star}] }))}
const currentResults=officialResults.split('\n');
const officialDraws=currentResults.map(row=>{const [date,numbers,stars]=row.split('|');const main=numbers.split(',').map(Number),lucky=stars.split(',').map(Number);return {date,numbers:main,stars:lucky,revenue:0,prizes:officialPrizes[date]||{},matches:getMatches(main,lucky),official:true,source:'SELAE'}});
const savedDraws=JSON.parse(localStorage.getItem('euromillonesDraws')||'[]').filter(draw=>draw.date>='2025-01-01');
localStorage.setItem('euromillonesDraws',JSON.stringify(savedDraws));
let draws=[...officialDraws,...savedDraws.filter(saved=>!officialDraws.some(official=>official.date===saved.date))];
// El saldo ya incluye la apuesta del 17/07/2026; el siguiente cargo será el 27/07.
const accountStartDate='2026-07-20';
const accountStartBalance=86.01;
const drawFromRemote=item=>({date:item.date,numbers:item.numbers.map(Number),stars:item.stars.map(Number),revenue:0,prizes:item.prizes||{},matches:getMatches(item.numbers.map(Number),item.stars.map(Number)),official:true,source:item.source||'Actualización automática'});
async function loadLatestResults(){try{const response=await fetch('./data/results.json',{cache:'no-store'});if(!response.ok)return;const data=await response.json();if(!Array.isArray(data.draws))return;const remoteDraws=data.draws.map(drawFromRemote);const combined=new Map([...officialDraws,...remoteDraws,...savedDraws].map(draw=>[draw.date,draw]));draws=[...combined.values()];render();checkPrizeNotification();checkLowBalanceNotification()}catch{}}
let seasonStart=localStorage.getItem('euromillonesSeasonStart')||'2025-12-05';
const activeDraws=()=>draws.filter(d=>d.date>=seasonStart);
const euro=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n||0);
const balls=(nums,stars=[])=>`<div class="number-row">${nums.map(n=>`<span class="ball">${n}</span>`).join('')}${stars.map(n=>`<span class="ball star">${n}</span>`).join('')}</div>`;
function save(){localStorage.setItem('euromillonesDraws',JSON.stringify(draws));render()}
function renderYearTabs(){const seasonYear=new Date(seasonStart+'T12:00').getFullYear()+1;document.querySelector('#yearTabs').innerHTML=`<button class="year-tab active" type="button">Temporada ${seasonYear}</button>`}
function avatar(player,small=false){return `<img class="avatar ${small?'avatar-small':''}" src="${player.avatar}" alt="${player.name}" loading="lazy">`}
function renderPlayers(){document.querySelector('#playersGrid').innerHTML=players.map(p=>`<article class="player-card"><div class="player-head"><span class="player-name">${avatar(p)}${p.name}${p.paid?'<span class="payment-status" title="Ingreso realizado" aria-label="Ingreso realizado">€</span>':''}</span><span>${euro(totalFor(p.name))}</span></div>${balls(p.numbers,p.stars)}</article>`).join('')}
function totalFor(name){return activeDraws().reduce((sum,d)=>sum+(d.prizes[name]||0),0)}
function accountSnapshot(){const start=new Date(`${accountStartDate}T12:00:00`),today=new Date();today.setHours(12,0,0,0);let mondays=0;for(const date=new Date(start);date<=today;date.setDate(date.getDate()+1))if(date>start&&date.getDay()===1)mondays+=1;const prizes=draws.filter(draw=>draw.date>accountStartDate).reduce((sum,draw)=>sum+Object.values(draw.prizes||{}).reduce((total,amount)=>total+amount,0),0),balance=Math.round((accountStartBalance-(mondays*30)+prizes)*100)/100;return {balance,mondays,weeks:Math.max(0,Math.floor(balance/30)),low:balance<61}}
function renderAccountBalance(){const account=accountSnapshot(),balance=document.querySelector('#accountBalance'),weeks=document.querySelector('#playWeeks');if(!balance||!weeks)return;balance.textContent=`Saldo: ${euro(account.balance)}`;weeks.textContent=`${account.weeks} ${account.weeks===1?'semana':'semanas'} de juego`;weeks.classList.toggle('low-balance',account.low)}
function renderSummary(){const scoped=activeDraws(),prizes=players.reduce((sum,p)=>sum+totalFor(p.name),0),leader=[...players].sort((a,b)=>totalFor(b.name)-totalFor(a.name))[0],latest=[...scoped].sort((a,b)=>b.date.localeCompare(a.date))[0];document.querySelector('#summaryCards').innerHTML=[['Sorteos oficiales',scoped.length],['Último resultado',latest?new Date(latest.date+'T12:00').toLocaleDateString('es-ES'):'—'],['Premios obtenidos',euro(prizes)],['Mayor premio acumulado',leader?`${leader.name} · ${euro(totalFor(leader.name))}`:'—']].map(([l,v])=>`<article class="stat-card"><span>${l}</span><strong>${v}</strong></article>`).join('');const byYear={};scoped.forEach(d=>{const y=d.date.slice(0,4);byYear[y]=(byYear[y]||0)+Object.values(d.prizes).reduce((a,b)=>a+b,0)});const vals=Object.values(byYear),max=Math.max(...vals,1);document.querySelector('#yearlyChart').innerHTML=Object.entries(byYear).length?Object.entries(byYear).sort().map(([y,v])=>`<div class="year-bar"><div class="bar" style="height:${Math.max(8,v/max*80)}px"></div><strong>${y}</strong><span>${euro(v)}</span></div>`).join(''):'<div class="empty"><strong>Sin datos anuales todavía.</strong><span>La evolución aparecerá al recibir resultados oficiales.</span></div>'}
function frequencies(key,max){const counts={};activeDraws().forEach(d=>d[key].forEach(n=>counts[n]=(counts[n]||0)+1));return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,max)}
function frequencyHTML(data,isStar=false){if(!data.length)return document.querySelector('#emptyState').innerHTML;const high=data[0][1];return data.map(([n,c])=>`<div class="frequency-row"><span class="ball ${isStar?'star':''}">${n}</span><div class="track"><div class="fill" style="width:${c/high*100}%"></div></div><span>${c}×</span></div>`).join('')}
function rankTone(index,count){const ratio=count>1?index/(count-1):0;return `hsla(${Math.round(138-(134*ratio))}, 72%, 72%, .62)`}
function rankMarker(index,count){if(index===0)return {icon:'🥇',kind:'medal'};if(index===1)return {icon:'🥈',kind:'medal'};if(index===2)return {icon:'🥉',kind:'medal'};if(index===count-1)return {icon:'🏮',kind:'lantern'};return {icon:index+1,kind:'number'}}
function renderStats(){
  const scoped=activeDraws(),most=frequencies('numbers',1)[0],annual={};
  scoped.forEach(d=>{const y=d.date.slice(0,4);annual[y]=annual[y]||{};players.forEach(p=>annual[y][p.name]=(annual[y][p.name]||0)+(d.prizes[p.name]||0))});
  document.querySelector('#statCards').innerHTML=[['Número más repetido',most?`${most[0]} (${most[1]}×)`:'—'],['Sorteos analizados',scoped.length],['Año con más premio',Object.keys(annual).sort((a,b)=>Object.values(annual[b]).reduce((x,y)=>x+y,0)-Object.values(annual[a]).reduce((x,y)=>x+y,0))[0]||'—'],['Premio medio por sorteo',scoped.length?euro(players.reduce((sum,p)=>sum+totalFor(p.name),0)/scoped.length):'—']].map(([l,v])=>`<article class="stat-card"><span>${l}</span><strong>${v}</strong></article>`).join('');
  document.querySelector('#numberStats').innerHTML=frequencyHTML(frequencies('numbers',10));document.querySelector('#starStats').innerHTML=frequencyHTML(frequencies('stars',10),true);
  const years=Object.keys(annual).sort(),ranked=[...players].sort((a,b)=>totalFor(b.name)-totalFor(a.name)),highest=Math.max(...ranked.map(p=>totalFor(p.name)),1);
  const rows=ranked.map((p,index)=>{const total=totalFor(p.name),marker=rankMarker(index,ranked.length);return `<tr class="rank-row" style="--rank-color:${rankTone(index,ranked.length)}"><td><span class="rank-position ${marker.kind}">${marker.icon}</span></td><td><span class="rank-person">${avatar(p,true)}<strong>${p.name}</strong></span></td><td class="rank-total"><strong>${euro(total)}</strong></td></tr>`}).join(''),totalCollected=players.reduce((sum,player)=>sum+totalFor(player.name),0);
  document.querySelector('#rankingTable').innerHTML=years.length?`<table class="ranking-table"><thead><tr><th>Pos.</th><th>Amigo</th><th>Total</th></tr></thead><tbody>${rows}</tbody><tfoot><tr class="global-total-row"><td colspan="2">Total de premios</td><td>${euro(totalCollected)}</td></tr></tfoot></table>`:document.querySelector('#emptyState').innerHTML;
}
function globalFrequencies(key,max,onlyOurNumbers=false){const allowed=new Set(players.flatMap(player=>key==='numbers'?player.numbers:player.stars));const counts={};draws.forEach(draw=>draw[key].forEach(value=>{if(!onlyOurNumbers||allowed.has(value))counts[value]=(counts[value]||0)+1}));return Object.entries(counts).sort((a,b)=>b[1]-a[1]||Number(a[0])-Number(b[0])).slice(0,max)}
function renderGlobal(){const verifiedDraws=draws.filter(draw=>Object.keys(draw.prizes||{}).length),annual={};verifiedDraws.forEach(draw=>{const year=draw.date.slice(0,4);annual[year]=annual[year]||{};players.forEach(player=>annual[year][player.name]=(annual[year][player.name]||0)+(draw.prizes[player.name]||0))});const years=Object.keys(annual).sort(),total=name=>verifiedDraws.reduce((sum,draw)=>sum+(draw.prizes[name]||0),0),ranked=[...players].sort((a,b)=>total(b.name)-total(a.name)),totalCollected=players.reduce((sum,player)=>sum+total(player.name),0);const rows=ranked.map((player,index)=>{const amount=total(player.name),marker=rankMarker(index,ranked.length);return `<tr class="rank-row" style="--rank-color:${rankTone(index,ranked.length)}"><td><span class="rank-position ${marker.kind}">${marker.icon}</span></td><td><span class="rank-person">${avatar(player,true)}<strong>${player.name}</strong></span></td>${years.map(year=>`<td>${euro(annual[year][player.name])}</td>`).join('')}<td class="rank-total"><strong>${euro(amount)}</strong></td></tr>`}).join('');const totalsByYear=years.map(year=>euro(players.reduce((sum,player)=>sum+(annual[year][player.name]||0),0)));document.querySelector('#globalRanking').innerHTML=years.length?`<table class="ranking-table"><thead><tr><th>Pos.</th><th>Amigo</th>${years.map(year=>`<th>${year}</th>`).join('')}<th>Total</th></tr></thead><tbody>${rows}</tbody><tfoot><tr class="global-total-row"><td colspan="2">Total recaudado</td>${totalsByYear.map(amount=>`<td>${amount}</td>`).join('')}<td>${euro(totalCollected)}</td></tr></tfoot></table>`:document.querySelector('#emptyState').innerHTML;document.querySelector('#globalPrizeTotal').textContent=euro(totalCollected);document.querySelector('#ourNumberFrequency').innerHTML=frequencyHTML(globalFrequencies('numbers',10,true));document.querySelector('#ourStarFrequency').innerHTML=frequencyHTML(globalFrequencies('stars',10,true),true);document.querySelector('#globalNumberFrequency').innerHTML=frequencyHTML(globalFrequencies('numbers',10));document.querySelector('#globalStarFrequency').innerHTML=frequencyHTML(globalFrequencies('stars',10),true)}
function renderHistory(){const el=document.querySelector('#historyList'),scoped=activeDraws();el.innerHTML=scoped.length?[...scoped].sort((a,b)=>b.date.localeCompare(a.date)).map(d=>{const winners=players.filter(p=>d.prizes[p.name]>0).map(p=>{const m=d.matches?.[p.name];return `${p.name}: ${euro(d.prizes[p.name])}${m?` (${m.main}+${m.star})`:''}`});const label=d.official?'Resultado oficial · SELAE':`Recaudación: ${euro(d.revenue)}`;return `<article class="draw-card ${winners.length?'has-prize':''}"><div class="draw-head"><strong>${new Date(d.date+'T12:00').toLocaleDateString('es-ES',{dateStyle:'long'})}</strong><span>${winners.length?'✓ Premio':label}</span></div>${balls(d.numbers,d.stars)}<div class="winners">${winners.length?`Premios · ${winners.join(' · ')}`:'Sin premios en las combinaciones de Los Torrijas'}</div></article>`}).join(''):document.querySelector('#emptyState').innerHTML}
function checkPrizeNotification(){if(!('Notification'in window)||Notification.permission!=='granted')return;const latest=[...activeDraws()].sort((a,b)=>b.date.localeCompare(a.date))[0];if(!latest)return;const amount=Object.values(latest.prizes).reduce((sum,prize)=>sum+prize,0),key='euromillonesLastPrizeNotice';if(amount>0&&localStorage.getItem(key)!==latest.date){new Notification('¡Premio para Los Torrijas!',{body:`Sorteo ${new Date(latest.date+'T12:00').toLocaleDateString('es-ES')} · ${euro(amount)} en premios.`});localStorage.setItem(key,latest.date)}}
function checkLowBalanceNotification(){if(!('Notification'in window)||Notification.permission!=='granted')return;const account=accountSnapshot(),key='euromillonesLowBalanceNotice';if(!account.low){localStorage.removeItem(key);return}if(localStorage.getItem(key)!==String(account.mondays)){new Notification('Saldo bajo de Los Torrijas',{body:`Quedan ${euro(account.balance)} para ${account.weeks} ${account.weeks===1?'semana':'semanas'} de juego. Hay que echar pasta.`});localStorage.setItem(key,String(account.mondays))}}
function render(){renderYearTabs();renderPlayers();renderAccountBalance();renderSummary();renderStats();renderHistory();renderGlobal()}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tab,.view').forEach(x=>x.classList.remove('active'));t.classList.add('active');document.querySelector('#'+t.dataset.view).classList.add('active')}));
document.querySelector('#seasonStart').value=seasonStart;
document.querySelector('#saveSeason').addEventListener('click',()=>{const value=document.querySelector('#seasonStart').value;if(!value){alert('Elige la fecha de inicio de la temporada.');return}seasonStart=value;localStorage.setItem('euromillonesSeasonStart',seasonStart);localStorage.removeItem('euromillonesScope');render()});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
checkPrizeNotification();
checkLowBalanceNotification();
loadLatestResults();
