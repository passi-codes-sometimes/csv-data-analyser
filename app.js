const fileInput=document.querySelector('#fileInput');
const dropZone=document.querySelector('#dropZone');
const statusNode=document.querySelector('#uploadStatus');
const results=document.querySelector('#results');
const toast=document.querySelector('#toast');
let analysis=null;

if(location.protocol==='file:')document.querySelector('#fileWarning').hidden=false;

document.querySelector('#browseButton').addEventListener('click',()=>fileInput.click());
document.querySelector('#chooseButton').addEventListener('click',()=>fileInput.click());
dropZone.addEventListener('click',e=>{if(!e.target.closest('button'))fileInput.click()});
dropZone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fileInput.click()}});
fileInput.addEventListener('change',()=>{if(fileInput.files[0])analyse(fileInput.files[0]);fileInput.value=''});
['dragenter','dragover'].forEach(name=>dropZone.addEventListener(name,e=>{e.preventDefault();dropZone.classList.add('dragover')}));
['dragleave','drop'].forEach(name=>dropZone.addEventListener(name,e=>{e.preventDefault();dropZone.classList.remove('dragover')}));
dropZone.addEventListener('drop',e=>{const file=e.dataTransfer.files[0];if(file)analyse(file)});
document.querySelector('#newAnalysis').addEventListener('click',()=>{results.hidden=true;analysis=null;statusNode.textContent='';document.querySelector('#upload').scrollIntoView({behavior:'smooth',block:'center'})});
document.querySelector('#columnSelect').addEventListener('change',e=>renderChart(Number(e.target.value)));
document.querySelector('#helpButton').addEventListener('click',()=>showToast('Upload a CSV and CSV Atelier will summarise its rows, columns, and values.'));

async function analyse(file){
  if(!file.name.toLowerCase().endsWith('.csv')&&file.type!=='text/csv'){showStatus('That does not look like a CSV file. Choose a .csv file to continue.',true);return}
  if(file.size>8*1024*1024){showStatus('This file is larger than the 8 MB upload limit.',true);return}
  showStatus(`Reading ${file.name}…`);statusNode.className='upload-status loading';
  try{
    const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'text/csv','X-Filename':encodeURIComponent(file.name)},body:file});
    const data=await response.json();if(!response.ok)throw new Error(data.error||'Could not analyse this file.');
    analysis=data;renderResults(data);statusNode.textContent='';statusNode.className='upload-status';results.hidden=false;results.scrollIntoView({behavior:'smooth',block:'start'});
  }catch(error){showStatus(error.message||'Could not reach the Python analyser. Is the app running?',true)}
}
function showStatus(message,error=false){statusNode.textContent=message;statusNode.className=`upload-status${error?' error':''}`}
function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function pretty(value){if(value===null||value===undefined)return'—';if(Number.isInteger(value))return value.toLocaleString();return Number(value).toLocaleString(undefined,{maximumFractionDigits:2})}
function renderResults(data){
  document.querySelector('#resultFile').textContent=data.filename;
  const missing=data.columns.reduce((sum,c)=>sum+c.missing,0),cells=data.row_count*data.column_count;
  const cards=[['ROWS',pretty(data.row_count),'records found'],['COLUMNS',pretty(data.column_count),'fields to explore'],['NUMERIC FIELDS',pretty(data.columns.filter(c=>c.type==='numeric').length),'ready for a range check'],['EMPTY CELLS',pretty(missing),cells?`${(missing/cells*100).toFixed(1)}% of all cells`:'no data rows']];
  document.querySelector('#summaryCards').innerHTML=cards.map(c=>`<div class="summary-card"><div class="card-label">${c[0]}</div><div class="card-value">${c[1]}</div><div class="card-foot">${c[2]}</div></div>`).join('');
  document.querySelector('#columnCount').textContent=`${data.columns.length} TOTAL`;
  document.querySelector('#columnList').innerHTML=data.columns.map(c=>`<div class="column-row"><span class="column-name" title="${esc(c.name)}">${esc(c.name)}</span><span class="type-pill">${c.type==='numeric'?'NUMBER':'TEXT'}</span><span class="column-meta">${pretty(c.filled)} filled · ${pretty(c.missing)} missing · ${pretty(c.unique)} unique${c.stats?` · avg ${pretty(c.stats.mean)}`:''}${c.top_values?.length?` · often “${esc(c.top_values[0].label)}”`:''}</span></div>`).join('');
  const select=document.querySelector('#columnSelect'),numeric=data.columns.map((c,i)=>({c,i})).filter(x=>x.c.type==='numeric');
  select.innerHTML=numeric.length?numeric.map(x=>`<option value="${x.i}">${esc(x.c.name)}</option>`).join(''):'<option value="-1">No numeric columns</option>';
  if(numeric.length)renderChart(numeric[0].i);else{document.querySelector('#chartTitle').textContent='No numeric columns';document.querySelector('#chartArea').innerHTML='<div class="empty-chart">A range chart appears when your CSV has number columns.</div>';document.querySelector('#chartHint').textContent=''}
  const table=document.querySelector('#tableWrap');
  if(data.preview.length){table.innerHTML=`<table class="data-table"><thead><tr>${data.headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${data.preview.map(row=>`<tr>${row.map(value=>`<td title="${esc(value)}">${esc(value)||'<span style="color:#c7cbc3">—</span>'}</td>`).join('')}</tr>`).join('')}</tbody></table>`}else{table.innerHTML='<p class="empty-chart">Headers are ready. Add a few data rows to see a preview.</p>'}
}
function renderChart(index){if(!analysis||index<0)return;const column=analysis.columns[index];if(!column?.histogram)return;document.querySelector('#chartTitle').textContent=column.name;document.querySelector('#chartHint').textContent=`${pretty(column.stats.min)} to ${pretty(column.stats.max)}`;const bins=column.histogram,max=Math.max(1,...bins.map(b=>b.count)),w=480,h=152,left=27,right=8,top=12,bottom=27,plotH=h-top-bottom,plotW=w-left-right,gap=8,bw=Math.max(12,(plotW-gap*(bins.length-1))/bins.length);
  const grid=[0,.5,1].map(p=>{const y=top+plotH*(1-p),label=Math.round(max*p);return `<line x1="${left}" y1="${y}" x2="${w-right}" y2="${y}" stroke="#edf0ea"/><text x="${left-7}" y="${y+3}" text-anchor="end" fill="#a7aca4" font-size="9" font-family="DM Mono">${label}</text>`}).join('');
  const bars=bins.map((b,i)=>{const bh=Math.max(2,b.count/max*plotH),x=left+i*(bw+gap),y=top+plotH-bh;return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="3" fill="#91ae8f"><title>${esc(b.count)} rows from ${esc(b.label)}</title></rect><text x="${x+bw/2}" y="${h-7}" text-anchor="middle" fill="#9a9f96" font-size="8" font-family="DM Mono">${esc(b.label)}</text>`}).join('');
  document.querySelector('#chartArea').innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Distribution of ${esc(column.name)}">${grid}${bars}</svg>`;
}
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),3200)}
