// Luna Cute 🌸 — versión HTML/CSS/JS puro. Datos solo en localStorage.
const KEY='lunaCute.v1',UK='lunaCute.unlock',$=s=>document.querySelector(s);
const ANIMOS=[['feliz','😊','Feliz'],['tranquila','😌','Tranquila'],['motivada','💪','Motivada'],['amorosa','🥰','Amorosa'],['neutral','😐','Meh'],['sensible','🥺','Sensible'],['irritable','😤','Irritable'],['triste','😢','Triste'],['ansiosa','😰','Ansiosa'],['agotada','😴','Agotada']];
const MSG={feliz:'¡Qué bonito! Disfruta este buen momento 🌈',tranquila:'Qué paz. Aprovecha esa calma 🍃',motivada:'¡A por todo! Tu energía está de tu lado 🔥',amorosa:'Reparte ese cariño, empezando por ti 💞',neutral:'Un día normalito también cuenta 🌤️',sensible:'Está bien sentir fuerte. Sé amable contigo 🫶',irritable:'Respira hondo: hoy no tienes que ser perfecta 🍵',triste:'Gracias por contarlo. Date cariño y descanso 🤍',ansiosa:'Respira lento: 4 segundos dentro, 6 fuera 🌬️',agotada:'Tu cuerpo pide pausa. Descansar también es avanzar 🛌'};
const FLUJOS=[['🙈','Nada'],['💧','Manchado'],['🩸','Ligero'],['🩸','Medio'],['🌊','Abundante']];
const SINT=['🤕 Cólicos','🫧 Hinchazón','🧠 Niebla mental','😣 Dolor de cabeza','🌸 Acné','💗 Senos sensibles','😴 Cansancio','💤 Insomnio','🤤 Antojos','🤢 Náuseas','🚻 Digestión rara','🥺 Sensible','😤 Irritable','😰 Ansiosa','😄 Ánimo feliz','⚡ Energía alta','💖 Libido alta','🫤 Libido baja'];
const MOCOS=[['seco','🏜️','Seco'],['pegajoso','🧴','Pegajoso'],['cremoso','🥛','Cremoso'],['clara','🥚','Clara de huevo'],['acuoso','💧','Acuoso']];
const FASES={menstrual:['🩸','Fase menstrual','Días de pausa y calorcito','Estrógeno y progesterona en lo más bajo. Es tu invierno interno: ve despacio, sin culpa.','Hierro (lentejas, espinacas), chocolate oscuro, cosas calientitas y mucha agua.','Descansar también es ejercicio. Estiramientos suaves o caminatas cortas.'],folicular:['🌱','Fase folicular','Tu energía va en subida','El estrógeno sube y con él tu energía, foco y ánimo. Es tu primavera interna.','Proteína, verduras frescas y fermentados.','Buen momento para rutinas nuevas, cardio y fuerza.'],fertile:['🌸','Ventana fértil','Tus días más fértiles','Ovulación cerca: más energía, más sociable, moco cremoso o de clara de huevo.','Mucha hidratación, fruta y fibra.','Ejercicio intenso y planes sociales. Ninguna app es anticonceptivo.'],lutea:['🍂','Fase lútea','Autocuidado y bajita intensidad','La progesterona manda. El ánimo puede ser montaña rusa pre-período.','Carbohidratos complejos (avena, camote), magnesio y menos azúcar.','Yoga, pilates y caminatas. Escucha el cansancio.']};
const MESES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
// ── fechas ──
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const de=s=>{const[a,b,c]=s.split('-').map(Number);return new Date(a,b-1,c)};
const add=(d,n)=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()+n);return x};
const diff=(a,b)=>Math.round((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/864e5);
const fmt=d=>d.toLocaleDateString('es-MX',{day:'numeric',month:'short'});
const fmtL=d=>d.toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long'});
// ── estado ──
let D=null,tab='hoy',diaAbierto=null,mes=new Date(),unlocked=sessionStorage.getItem(UK)==='1';
const PD={nombre:'',objetivo:'conocer',duracionCiclo:28,duracionPeriodo:5,fechaUltimoPeriodo:null,pin:'',camuflaje:false,camuflajeNombre:'Notas de la semana',tema:'claro'};
try{const r=JSON.parse(localStorage.getItem(KEY));if(r&&r.perfil&&r.registros)D={...r,perfil:{...PD,...r.perfil}}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){}};
const reg=i=>(D&&D.registros[i])||{};
const set=(i,p)=>{D.registros[i]={...reg(i),...p};save()};
// ── ciclo ──
function episodios(){const f=Object.keys(D.registros).filter(k=>(D.registros[k].flujo||0)>=1).sort(),b=[];
 for(const x of f){const u=b[b.length-1];if(u&&diff(de(u.fin),de(x))<=2)u.fin=x;else b.push({inicio:x,fin:x})}return b}
function calc(){const hoy=new Date(),P=D.perfil,eps=episodios(),L=[];
 for(let i=1;i<eps.length;i++){const d=diff(de(eps[i-1].inicio),de(eps[i].inicio));if(d>=15&&d<=60)L.push(d)}
 const u=L.slice(-6),prom=u.length?Math.round(u.reduce((a,b)=>a+b,0)/u.length):P.duracionCiclo,ciclo=Math.min(45,Math.max(20,prom));
 const h=iso(hoy),sang=(reg(h).flujo||0)>=1,ep=eps.find(e=>h>=e.inicio&&h<=e.fin);
 const ini=ep?de(ep.inicio):eps.length?de(eps[eps.length-1].inicio):P.fechaUltimoPeriodo?de(P.fechaUltimoPeriodo):hoy;
 const desde=Math.max(0,diff(ini,hoy)),dia=desde+1,ovu=add(ini,Math.max(1,ciclo-15)),dOvu=ciclo-14;
 const fase=(sang||dia<=P.duracionPeriodo)?'menstrual':dia>=dOvu-5&&dia<=dOvu+1?'fertile':dia<dOvu-5?'folicular':'lutea';
 return{hoy,h,eps,ciclo,u,ini,dia,sang,prox:add(ini,ciclo),dias:diff(hoy,add(ini,ciclo)),retraso:sang||ep?0:Math.max(0,desde-ciclo),ovu,fi:add(ovu,-5),ff:add(ovu,1),fase,rmin:u.length>=2?Math.min(...u):ciclo-2,rmax:u.length>=2?Math.max(...u):ciclo+2}}
function tipoDia(d,p){const k=iso(d);if(p.eps.some(e=>k>=e.inicio&&k<=e.fin)||(reg(k).flujo||0)>=1)return'sangrado';
 const df=diff(p.ini,d);if(df<0)return'';const x=df%p.ciclo+1,o=p.ciclo-14;
 return x<=D.perfil.duracionPeriodo?'prev':x===o?'ovu':x>=o-5&&x<=o+1?'fertil':''}
function racha(){const t=i=>{const r=D.registros[i];return r&&((r.flujo||0)>0||r.animo||r.nota||(r.sintomas||[]).length||r.dolor!==undefined||r.agua!==undefined||r.sueno!==undefined||r.moco||r.temp!==undefined)};
 let c=new Date(),n=0;if(!t(iso(c)))c=add(c,-1);while(t(iso(c))){n++;c=add(c,-1)}return n}
// ── vistas ──
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const chip=(on,a,v,t)=>`<button class="chip ${on?'on':''}" data-a="${a}" data-v="${esc(v)}">${t}</button>`;
function moodCard(i){const a=reg(i).animo,s=ANIMOS.find(x=>x[0]===a);
 return`<div class="card"><div class="row sp"><h2>💭 ¿Cómo te sientes hoy?</h2>${s?`<button class="link" data-a="animo" data-v="${a}">Quitar</button>`:''}</div>
 <div class="moods">${ANIMOS.map(x=>`<button class="mood ${a===x[0]?'on':''}" data-a="animo" data-v="${x[0]}"><b>${x[1]}</b>${x[2]}</button>`).join('')}</div>
 <p class="sub c" style="margin-top:10px;${s?'color:var(--ac)':''}">${s?`${s[1]} Hoy te sientes ${s[2].toLowerCase()}. ${MSG[a]}`:'Toca una carita para guardar cómo te sientes hoy 🔒'}</p></div>`}
function campos(i){const r=reg(i);return`
 <label>Flujo</label><div class="scroll">${FLUJOS.map((f,n)=>`<button class="fl ${(r.flujo||0)===n?'on':''}" data-a="flujo" data-v="${n}"><b>${f[0]}</b>${f[1]}</button>`).join('')}</div>
 <label>Dolor: ${['😌 Sin dolor','🙂 Leve','😕 Molestia','😣 Medio','😩 Fuerte','🥵 Insoportable'][r.dolor||0]}</label><input type="range" min="0" max="5" value="${r.dolor||0}" data-c="dolor">
 <div class="row" style="margin-top:12px"><span style="font-weight:700">💧 Agua</span><button class="chip" data-a="agua" data-v="-1">−</button><b class="ac">${r.agua||0}</b><button class="chip" data-a="agua" data-v="1">+</button><span class="f1"></span><button class="chip ${r.pastilla?'on':''}" data-a="pill">💊 Pastilla ${r.pastilla?'✓':''}</button></div>
 <label>Síntomas</label><div class="row wrap">${SINT.map(s=>chip((r.sintomas||[]).includes(s),'sint',s,s)).join('')}</div>`}
function vistaHoy(p){const i=p.h,r=reg(i),f=FASES[p.fase],C=2*Math.PI*84,rc=racha();
 let b=['🌸','','','rosa'];
 if(p.retraso>=2&&!p.sang)b=['🌙',`Tu período lleva ${p.retraso} días de retraso`,'Tranquila: estrés, viajes y cambios de rutina también mueven fechas. Cuando llegue, regístralo y todo se recalibra.'];
 else if(p.sang)b=['🩸','Estás en tu período','Calorcito, agua y descanso. Si algo te duele más de lo normal, sé amable contigo y toma nota.'];
 else if(p.dias<=2&&p.dias>=0)b=['🩸',p.dias===0?'Tu período podría empezar hoy':`Tu período llega en ${p.dias} día${p.dias>1?'s':''}`,'Ten a mano lo que te consuela: compresa térmica, chocolate, tu serie favorita.'];
 else if(p.fase==='fertile')b=['🌸','Estás en tu ventana fértil',D.perfil.objetivo==='buscar'?'Tus días más fértiles son ahora. ¡Mucha suerte! 🍀':D.perfil.objetivo==='evitar'?'Si evitas embarazo, hoy toca precaución extra. Ninguna app es anticonceptivo.':'Observa tu cuerpo: puede contarte cosas.'];
 else b=[f[0],f[2],f[3]];
 return`<div class="card"><div class="row" style="gap:16px"><div class="ring"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="84" fill="none" stroke="var(--lav)" stroke-width="13"/><circle cx="100" cy="100" r="84" fill="none" stroke="var(--ac)" stroke-width="13" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-Math.min(1,p.dia/p.ciclo))}" transform="rotate(-90 100 100)"/></svg><div><span style="font-size:22px">${f[0]}</span><b class="ac" style="font-size:30px;line-height:1">${p.dia}</b><span class="sub">de ${p.ciclo} días</span></div></div>
 <div class="f1" style="font-size:13px;line-height:1.5"><span class="pill">${f[0]} ${f[1]}</span><p><b>🩸 Próximo período</b><br><span class="sub" style="font-size:12px">${fmt(p.prox)} · ${p.retraso>0?`retrasado ${p.retraso} día(s)`:p.dias===0?'es hoy':`en ${p.dias} día(s)`}</span></p><p><b>🌸 Ventana fértil</b><br><span class="sub" style="font-size:12px">${fmt(p.fi)} – ${fmt(p.ff)}</span></p><p><b>🥚 Ovulación</b><br><span class="sub" style="font-size:12px">${fmt(p.ovu)}</span></p></div></div>
 <p class="sub c" style="margin-top:10px">${p.u.length?`🔮 Aprendida de tus últimos ${p.u.length} ciclos (${p.rmin}–${p.rmax} días)`:'💡 Predicción inicial: se afina con cada período que registres'}${rc?` · 🌟 ${rc} día(s) de racha`:''}</p></div>
 <div class="banner"><b>${b[0]} ${b[1]}</b><p>${b[2]}</p></div>${moodCard(i)}
 <div class="card"><div class="row sp"><h2>📝 Registro de hoy</h2><button class="link" data-a="abrir" data-v="${i}">Día completo ✨</button></div><p class="sub">Todo se guarda en este dispositivo 🔒</p>${campos(i)}
 <input style="margin-top:12px" placeholder="Nota rápida ✨" maxlength="280" value="${esc(r.nota||'')}" data-c="nota"></div>
 <div class="card"><h2>🗓️ Próximos períodos</h2><div class="row">${[1,2,3].map(n=>`<div class="f1 c" style="background:var(--rosa);color:var(--rosai);border-radius:16px;padding:10px;font-weight:700;font-size:13px">${fmt(add(p.ini,p.ciclo*n))}</div>`).join('')}</div></div>
 <p class="sub c">Luna Cute no es un método anticonceptivo ni un diagnóstico médico 💌</p>`}
function vistaCal(p){const y=mes.getFullYear(),m=mes.getMonth(),primero=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate(),hoy=iso(new Date());
 let c='';for(let k=0;k<primero;k++)c+='<span></span>';
 for(let d=1;d<=n;d++){const f=new Date(y,m,d),k=iso(f),t=tipoDia(f,p),r=reg(k);c+=`<button class="d ${t} ${k===hoy?'hoy':''}" data-a="abrir" data-v="${k}">${d}${r.animo?`<i>${ANIMOS.find(x=>x[0]===r.animo)[1]}</i>`:''}</button>`}
 return`<div class="card"><div class="row sp"><button class="chip" data-a="mes" data-v="-1">‹</button><h2 style="margin:0">${MESES[m]} ${y}</h2><button class="chip" data-a="mes" data-v="1">›</button></div><div class="cal" style="margin-top:12px">${'LMXJVSD'.split('').map(x=>`<span>${x}</span>`).join('')}${c}</div>
 <p class="sub" style="margin-top:10px">🟥 Sangrado · 🌸 Período previsto · 🟩 Fértil · 🟢 Ovulación · 👆 Toca un día para registrarlo</p></div>`}
function vistaHist(p){const eps=[...p.eps].reverse(),dias=Object.keys(D.registros).sort().reverse().slice(0,30);
 return`<div class="card"><h2>🩸 Tus períodos</h2>${eps.length?eps.map(e=>`<p style="font-size:13px;margin-bottom:6px">${fmt(de(e.inicio))} – ${fmt(de(e.fin))} · ${diff(de(e.inicio),de(e.fin))+1} días</p>`).join(''):'<p class="sub">Aún no hay períodos registrados.</p>'}
 ${p.u.length?`<p class="sub">Duración media del ciclo: ${p.ciclo} días (${p.rmin}–${p.rmax})</p>`:''}</div>
 <div class="card"><h2>📖 Últimos registros</h2>${dias.length?dias.map(k=>{const r=D.registros[k],a=ANIMOS.find(x=>x[0]===r.animo);return`<button class="btn sec" style="width:100%;text-align:left;margin-bottom:6px;border-radius:14px" data-a="abrir" data-v="${k}">${fmt(de(k))} ${a?a[1]:''} ${(r.flujo||0)>0?'🩸':''} ${r.dolor?'😣'+r.dolor:''} ${r.nota?'· '+esc(r.nota.slice(0,30)):''}</button>`}).join(''):'<p class="sub">Nada todavía.</p>'}</div>`}
function vistaAprende(p){return Object.entries(FASES).map(([k,f])=>`<div class="card" ${k===p.fase?'style="border:2px solid var(--ac)"':''}><h2>${f[0]} ${f[1]} ${k===p.fase?'<span class="pill">Estás aquí</span>':''}</h2><p style="font-size:13px;line-height:1.5">${f[3]}</p><p style="font-size:13px;margin-top:8px"><b>🍽️ Comida:</b> ${f[4]}</p><p style="font-size:13px;margin-top:6px"><b>🏃 Movimiento:</b> ${f[5]}</p></div>`).join('')}
function vistaAjustes(){const P=D.perfil;return`<div class="card"><h2>👤 Tu perfil</h2><label>Nombre</label><input value="${esc(P.nombre)}" data-p="nombre"><label>Duración del ciclo (días)</label><input type="number" min="20" max="45" value="${P.duracionCiclo}" data-p="duracionCiclo"><label>Duración del período (días)</label><input type="number" min="2" max="10" value="${P.duracionPeriodo}" data-p="duracionPeriodo"><label>Objetivo</label><div class="row wrap">${[['conocer','💡 Conocerme'],['evitar','🛡️ Evitar'],['buscar','🌱 Buscar']].map(o=>chip(P.objetivo===o[0],'obj',o[0],o[1])).join('')}</div></div>
 <div class="card"><h2>🎨 Tema</h2><div class="row">${chip(P.tema==='claro','tema','claro','☀️ Claro')}${chip(P.tema==='luna','tema','luna','🌙 Luna')}</div></div>
 <div class="card"><h2>🔒 Privacidad</h2><div class="row wrap"><button class="btn sec" data-a="pin">${P.pin?'Cambiar / quitar PIN':'Crear PIN de 4 dígitos'}</button><button class="btn sec" data-a="camu">${P.camuflaje?'✅ Camuflaje activo':'🕶️ Modo camuflaje'}</button></div><p class="sub" style="margin-top:8px">El camuflaje esconde la app como una libreta de notas gris.</p></div>
 <div class="card"><h2>💾 Tus datos</h2><div class="row wrap"><button class="btn sec" data-a="export">⬇️ Exportar</button><label class="btn sec" style="margin:0">⬆️ Importar<input type="file" accept=".json" data-c="imp" hidden></label><button class="btn red" data-a="borrar">🗑️ Borrar todo</button></div></div>`}
function dialogo(i){const r=reg(i),d=de(i);return`<div class="modal" data-a="cerrar"><div class="sheet"><div class="row sp"><h2 style="margin:0">${fmtL(d)}</h2><button class="link" data-a="cerrar">Cerrar ✕</button></div>${campos(i)}
 <label>Ánimo</label><div class="scroll">${ANIMOS.map(a=>`<button class="mood ${r.animo===a[0]?'on':''}" style="min-width:60px" data-a="animo" data-v="${a[0]}"><b>${a[1]}</b>${a[2]}</button>`).join('')}</div>
 <label>Energía (1–5): ${r.energia||'–'}</label><input type="range" min="1" max="5" value="${r.energia||3}" data-c="energia">
 <label>Moco cervical</label><div class="row wrap">${MOCOS.map(m=>chip(r.moco===m[0],'moco',m[0],m[1]+' '+m[2])).join('')}</div>
 <label>Sueño (horas)</label><input type="number" step="0.5" min="0" max="16" value="${r.sueno??''}" data-c="sueno">
 <label>Temperatura basal (°C)</label><input type="number" step="0.01" min="35" max="39" value="${r.temp??''}" data-c="temp">
 <label>Nota</label><textarea rows="3" maxlength="280" data-c="nota">${esc(r.nota||'')}</textarea>
 <div class="row" style="margin-top:14px"><button class="btn sec" data-a="limpiar">Borrar día</button><button class="btn f1" data-a="cerrar">Listo 🌸</button></div></div></div>`}
function onboarding(){return`<main><div class="card c"><div style="font-size:46px">🌸</div><h1>Luna Cute</h1><p class="sub" style="margin:6px 0 14px">Tu ciclo, a tu ritmo. 100% privado: tus datos nunca salen de este dispositivo.</p>
 <label>¿Cómo te llamas?</label><input id="o-n" placeholder="Tu nombre"><label>Duración habitual del ciclo</label><input id="o-c" type="number" value="28" min="20" max="45"><label>Duración del período</label><input id="o-p" type="number" value="5" min="2" max="10"><label>Primer día de tu último período</label><input id="o-f" type="date" max="${iso(new Date())}">
 <label>Objetivo</label><select id="o-o"><option value="conocer">💡 Conocerme mejor</option><option value="evitar">🛡️ Evitar embarazo</option><option value="buscar">🌱 Buscar embarazo</option></select><button class="btn" style="width:100%;margin-top:16px" data-a="empezar">Empezar ✨</button></div></main>`}
function bloqueo(){return`<main><div class="card c"><div style="font-size:40px">🔒</div><h2>Ingresa tu PIN</h2><input id="pin" type="password" inputmode="numeric" maxlength="4" style="text-align:center;font-size:24px;letter-spacing:8px"><p id="pe" class="sub" style="margin-top:8px"></p><button class="btn" style="margin-top:12px" data-a="entrar">Entrar</button></div></main>`}
function render(){const a=$('#app');
 if(!D){document.documentElement.dataset.tema='claro';a.innerHTML=onboarding();return}
 const P=D.perfil,t=P.camuflaje?'camuflaje':P.tema;document.documentElement.dataset.tema=t;document.title=P.camuflaje?P.camuflajeNombre:'Luna Cute 🌸 · Tu ciclo, a tu ritmo';
 if(P.pin&&!unlocked){a.innerHTML=bloqueo();return}
 const p=calc(),V={hoy:vistaHoy,ciclo:vistaCal,historial:vistaHist,aprende:vistaAprende,tu:vistaAjustes};
 const T=[['hoy','🌸','Hoy'],['ciclo','📅','Ciclo'],['historial','📖','Historial'],['aprende','📚','Aprende'],['tu','💖','Tú']];
 a.innerHTML=`<main><div style="margin:6px 0 14px"><h1>${P.nombre?`Hola, ${esc(P.nombre)} 🌸`:'Hola 🌸'}</h1><p class="sub">${fmtL(new Date())}</p></div>${V[tab](p)}</main><nav>${T.map(x=>`<button class="${tab===x[0]?'on':''}" data-a="tab" data-v="${x[0]}"><b>${x[1]}</b>${x[2]}</button>`).join('')}</nav>${diaAbierto?dialogo(diaAbierto):''}`}
// ── eventos ──
const hoyK=()=>iso(new Date()),dk=()=>diaAbierto||hoyK();
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el)return;const a=el.dataset.a,v=el.dataset.v,k=dk(),r=reg(k);
 if(a==='cerrar'&&e.target.closest('.sheet')&&!el.matches('button'))return;
 if(a==='tab')tab=v;else if(a==='abrir')diaAbierto=v;else if(a==='cerrar')diaAbierto=null;
 else if(a==='flujo')set(k,{flujo:+v});else if(a==='animo')set(k,{animo:r.animo===v?undefined:v});
 else if(a==='sint'){const l=r.sintomas||[];set(k,{sintomas:l.includes(v)?l.filter(x=>x!==v):[...l,v]})}
 else if(a==='agua')set(k,{agua:Math.max(0,Math.min(12,(r.agua||0)+ +v))});else if(a==='pill')set(k,{pastilla:!r.pastilla});
 else if(a==='moco')set(k,{moco:r.moco===v?undefined:v});else if(a==='limpiar'){delete D.registros[k];save();diaAbierto=null}
 else if(a==='mes')mes=new Date(mes.getFullYear(),mes.getMonth()+ +v,1);
 else if(a==='obj'){D.perfil.objetivo=v;save()}else if(a==='tema'){D.perfil.tema=v;save()}else if(a==='camu'){D.perfil.camuflaje=!D.perfil.camuflaje;save()}
 else if(a==='pin'){const n=prompt('Nuevo PIN de 4 dígitos (vacío para quitarlo):','');if(n===null)return;if(n&&!/^\d{4}$/.test(n))return alert('Debe tener 4 dígitos');D.perfil.pin=n;save();unlocked=true}
 else if(a==='entrar'){if($('#pin').value===D.perfil.pin){sessionStorage.setItem(UK,'1');unlocked=true}else{$('#pe').textContent='PIN incorrecto 💔';return}}
 else if(a==='export'){const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([JSON.stringify(D)],{type:'application/json'}));l.download='luna-cute-respaldo.json';l.click();return}
 else if(a==='borrar'){if(confirm('¿Borrar TODOS tus datos? No se puede deshacer.')){localStorage.removeItem(KEY);sessionStorage.removeItem(UK);D=null;unlocked=false}}
 else if(a==='empezar'){D={version:1,creadoEn:new Date().toISOString(),registros:{},perfil:{...PD,nombre:$('#o-n').value.trim(),duracionCiclo:+$('#o-c').value||28,duracionPeriodo:+$('#o-p').value||5,fechaUltimoPeriodo:$('#o-f').value||null,objetivo:$('#o-o').value}};save()}
 render()});
document.addEventListener('change',e=>{const t=e.target,k=dk();
 if(t.dataset.c==='imp'){const f=t.files[0];if(!f)return;f.text().then(s=>{try{const x=JSON.parse(s);if(x.perfil&&x.registros){D={...x,perfil:{...PD,...x.perfil}};save();render()}else alert('Archivo no válido')}catch{alert('Archivo no válido')}});return}
 if(t.dataset.p){const n=t.dataset.p;D.perfil[n]=t.type==='number'?+t.value:t.value;save();return}
 const c=t.dataset.c;if(!c)return;
 if(['dolor','energia'].includes(c)){set(k,{[c]:+t.value});render()}
 else if(['sueno','temp'].includes(c))set(k,{[c]:t.value===''?undefined:+t.value});
 else if(c==='nota'){set(k,{nota:t.value||undefined})}});
document.addEventListener('input',e=>{if(e.target.dataset.c==='nota')set(dk(),{nota:e.target.value||undefined})});
render();
