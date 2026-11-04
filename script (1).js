/* Tech Teach Programação: lógica dos jogos e do site. Carregado por index.html, no fim do body. */
const $=s=>document.querySelector(s),R=document.documentElement,P=["rosa","ambar","verde"];
const FL=[
{n:["rosa"],s:"justify-content:flex-end",t:"Cada pinguim deve chegar ao buraco da mesma cor. <code>justify-content</code> move os itens no eixo principal, que por padrão vai da esquerda para a direita. Leve o Tux para a direita com <code>flex-end</code>."},
{n:["rosa","ambar"],s:"justify-content:center",t:"Os dois pinguins vão para o meio do gelo. Valor: <code>center</code>."},
{n:P,s:"justify-content:space-around",t:"Espaço igual ao redor de cada pinguim: <code>space-around</code>."},
{n:P,s:"justify-content:space-between",t:"Um pinguim em cada ponta e o espaço dividido entre eles: <code>space-between</code>."},
{n:["rosa"],s:"align-items:flex-end",t:"<code>align-items</code> trabalha no eixo cruzado, de cima para baixo. Leve o Tux para o fundo."},
{n:["ambar"],s:"justify-content:center;align-items:center",t:"Para ficar no centro exato, use as duas propriedades juntas."},
{n:P,s:"justify-content:space-around;align-items:flex-end",t:"Combine: espaço ao redor na horizontal e todos no fundo."},
{n:P,s:"flex-direction:row-reverse",t:"<code>row-reverse</code> inverte a fila: o primeiro pinguim vai para a direita."},
{n:P,s:"flex-direction:column",t:"<code>column</code> troca o eixo principal: a fila passa a ir de cima para baixo."},
{n:["rosa","ambar"],s:"flex-direction:row-reverse;justify-content:flex-end",t:"Com <code>row-reverse</code> o começo da linha fica na direita, então <code>flex-end</code> leva o grupo para a esquerda."},
{n:P,sel:".rosa",s:"order:1",t:"<code>order</code> muda a posição de um item sem mexer no HTML. O padrão é 0 e números maiores vão para o fim. Agora você estiliza só o pinguim rosa."},
{n:P,b:"justify-content:space-between",sel:".ambar",s:"align-self:flex-end",t:"<code>align-self</code> alinha um único item no eixo cruzado. Leve só o pinguim âmbar para o fundo."}
];
let L=FL,G,nf=0,cur=0,hint=0,done=new Set();
try{const t=localStorage.getItem("tt-theme");if(t)R.dataset.theme=t}catch(e){}
$("#inv").setAttribute("aria-pressed",R.dataset.theme=="dark");
$("#inv").onclick=()=>{const t=R.dataset.theme=="dark"?"light":"dark";R.dataset.theme=t;$("#inv").setAttribute("aria-pressed",t=="dark");try{localStorage.setItem("tt-theme",t)}catch(e){}};
const names=l=>l.s.split(";").map(x=>x.split(":")[0]);
const st=(m,c)=>{const e=$("#st");e.textContent=m;e.className=c||""};
const css=(id,l,t)=>"#"+id+"{"+(l.b||"")+";"+(l.sel?"":t)+"}"+(l.sel?"#"+id+" "+l.sel+"{"+t+"}":"");
const paint=()=>{if(G.k!='p')return liveX();const l=L[cur],ps=[...$('#jog').children];if(!nf)ps.forEach(p=>p.getAnimations().forEach(x=>x.finish()));const a=ps.map(p=>p.getBoundingClientRect());$('#sty').textContent=css('alvo',l,l.s)+css('jog',l,$('#css').value.replace(/[{}<>]/g,''));if(rm||nf){nf=0;return}ps.forEach((p,i)=>{const r=p.getBoundingClientRect(),x=a[i].left-r.left,y=a[i].top-r.top;if(x||y)p.animate([{transform:`translate(${x}px,${y}px) rotate(-9deg)`},{transform:`translate(${x/2}px,${y/2}px) rotate(9deg)`,offset:.5},{transform:'none'}],{duration:520,easing:'cubic-bezier(.3,1.3,.5,1)'})})};
function load(i){
cur=i;hint=0;const l=L[i];if(G.k!='p')return loadX(i,l);nf=1;
$("#lt").textContent="Nível "+(i+1)+" de "+L.length+": "+names(l).join(" e ");
$("#txt").innerHTML=l.t;
$("#alvo").innerHTML=l.n.map(c=>'<i class="pad '+c+'"></i>').join("");
$("#jog").className="";
$("#jog").innerHTML=l.n.map(c=>'<svg class="pen '+c+'" viewBox="0 0 64 64"><use href="#tux"/></svg>').join("");
$("#css").value="";$("#nx").hidden=true;
$("#lk").textContent=G.id=='grid'?lockG(l):l.sel?"#gelo { display: flex"+(l.b?"; "+l.b:"")+" }\n"+l.sel+" {":"#gelo {\n  display: flex;"+(l.b?"\n  "+l.b+";":"");
st("");paint();
document.querySelectorAll("#lv button").forEach((b,k)=>{b.className=(k==i?"on ":"")+(done.has(k)?"dn":"");b.setAttribute("aria-label","Nível "+(k+1)+(done.has(k)?", concluído":""))});
}
function run(){if(G.k!='p')return runX();
const l=L[cur],j=$("#jog");j.classList.remove("win");paint();
if(!$("#css").value.trim())return st("Escreva uma declaração, por exemplo: "+names(l)[0]+": valor;","no");
const a=[...j.children],b=[...$("#alvo").children];
const bad=a.filter((p,i)=>{const x=p.getBoundingClientRect(),y=b[i].getBoundingClientRect();return Math.abs(x.left-y.left)>=2||Math.abs(x.top-y.top)>=2}).length;
if(bad)return st("Ainda há "+bad+(bad>1?" pinguins":" pinguim")+" fora do buraco. Confira o valor e o eixo.","no");
j.classList.add("win");win();
}

$("#run").onclick=run;$("#nx").onclick=()=>load(cur+1);
$("#css").oninput=paint;
$("#css").onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key=="Enter")run()};
$("#rs").onclick=()=>{$("#css").value="";$("#jog").classList.remove("win");paint();st("")};
$('#dica').onclick=()=>st(G.k=='h'?L[cur].d:G.k=='s'?'Releia o HTML: o que os elementos que estão pulando têm em comum e os outros não?':'Compare a posição do pinguim com a do buraco: o movimento é na horizontal, na vertical ou nos dois sentidos?');
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,GB='display:grid;grid-template:repeat(3,1fr)/repeat(4,1fr)';
const GL=[
{n:['rosa'],b:GB,sel:'.rosa',s:'grid-column:4',t:'O gelo agora é uma grade de 4 colunas e 3 linhas. <code>grid-column</code> escolhe a coluna do item, de 1 a 4. Leve o Tux ao buraco.'},
{n:['rosa'],b:GB,sel:'.rosa',s:'grid-row:3',t:'<code>grid-row</code> escolhe a linha, de 1 a 3.'},
{n:['rosa'],b:GB,sel:'.rosa',s:'grid-column:3;grid-row:2',t:'Combine <code>grid-column</code> e <code>grid-row</code> para chegar ao buraco.'},
{n:P,b:GB,s:'justify-items:end',t:'<code>justify-items</code> alinha cada pinguim dentro da própria célula, na horizontal. Valores: start, center e end.'},
{n:P,b:GB,s:'align-items:end',t:'<code>align-items</code> faz o mesmo na vertical.'},
{n:P,b:GB,s:'place-items:center',t:'<code>place-items</code> junta align-items e justify-items em uma só linha.'},
{n:P,b:GB,s:'grid-auto-flow:column',t:'Os itens preenchem a grade linha por linha. <code>grid-auto-flow</code> muda essa ordem.'},
{n:['ambar'],b:GB,sel:'.ambar',s:'grid-area:3/4',t:'<code>grid-area</code> aceita <code>linha / coluna</code> e posiciona o item de uma vez.'}
];
const SL=[
{h:'<peixe></peixe><bota></bota><peixe></peixe>',a:'peixe',t:'Cada tag do HTML pode ser um seletor, usando só o nome dela. Escolha os elementos que estão pulando.'},
{h:'<peixe class="rosa"></peixe><peixe></peixe><peixe class="rosa"></peixe>',a:'.rosa',t:'Para escolher pela classe, o seletor começa com um ponto.'},
{h:'<peixe id="rei"></peixe><peixe></peixe><peixe></peixe>',a:'#rei',t:'Para escolher pelo id, o seletor começa com #.'},
{h:'<gelo><peixe></peixe></gelo><peixe></peixe><peixe></peixe>',a:'gelo peixe',t:'Dois seletores separados por espaço escolhem o segundo dentro do primeiro, em qualquer nível.'},
{h:'<gelo><peixe></peixe><agua><peixe></peixe></agua></gelo>',a:'gelo > peixe',t:'O símbolo > escolhe só filhos diretos, sem netos.'},
{h:'<peixe class="rosa"></peixe><bota class="rosa"></bota><peixe></peixe>',a:'peixe.rosa',t:'Tag e classe coladas, sem espaço, exigem as duas condições.'},
{h:'<peixe></peixe><peixe></peixe><peixe></peixe>',a:'peixe:last-child',t:'<code>:first-child</code> e <code>:last-child</code> escolhem pela posição entre irmãos.'},
{h:'<peixe class="rosa"></peixe><peixe></peixe><bota></bota><peixe class="rosa"></peixe>',a:'peixe:not(.rosa)',t:'<code>:not()</code> exclui o que combina com o seletor entre os parênteses.'}
];
const HL=[
{t:'Crie o título principal da página com o texto Tux.',d:'É o título mais importante da página.',k:d=>d.querySelector('h1')?.textContent.trim()=='Tux'},
{t:'Escreva um parágrafo que contenha a palavra gelo.',d:'Pense na unidade básica de texto corrido.',k:d=>/gelo/i.test(d.querySelector('p')?.textContent)},
{t:'Crie uma lista com marcadores e três itens.',d:'Uma tag envolve a lista inteira e outra envolve cada item.',k:d=>d.querySelectorAll('ul>li').length==3},
{t:'Crie uma lista numerada com dois itens.',d:'É como a lista de marcadores, mas com ordem.',k:d=>d.querySelectorAll('ol>li').length==2},
{t:'Crie um link com o texto Kernel que leve para https://kernel.org.',d:'O destino do link vai em um atributo da tag.',k:d=>d.querySelector(`a[href='https://kernel.org']`)?.textContent.trim()=='Kernel'},
{t:'Insira a imagem tux.png com um texto alternativo.',d:'O arquivo e o texto alternativo vão em atributos da tag, que não tem fechamento.',k:d=>{const i=d.querySelector('img');return!!i&&i.getAttribute('src')=='tux.png'&&!!i.alt.trim()}},
{t:'Monte a estrutura da página com cabeçalho, conteúdo principal e rodapé.',d:'Use tags semânticas: o nome de cada uma diz a função.',k:d=>['header','main','footer'].every(x=>d.querySelector(x))},
{t:'Crie um formulário com um campo de texto e um rótulo ligado a ele.',d:'O rótulo se liga ao campo pelo id dele.',k:d=>{const i=d.querySelector('form input[id]');return!!i&&!!d.querySelector(`form label[for='${i.id}']`)}}
];
const GM={flex:{n:'Tux Flexbox',k:'p',L:FL},grid:{n:'Tux Grid',k:'p',L:GL},sel:{n:'Pesca de seletores',k:'s',L:SL},html:{n:'Monte o HTML',k:'h',L:HL}};
const key=id=>'tt-'+(id=='flex'?'tux':id);
const save=()=>{try{localStorage.setItem(key(G.id),JSON.stringify([...done]))}catch(e){}};
const lockG=l=>l.sel?`#gelo { display: grid; grid-template: repeat(3, 1fr) / repeat(4, 1fr) }
${l.sel} {`:`#gelo {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(4, 1fr);`;
const mark=i=>document.querySelectorAll('#lv button').forEach((b,k)=>{b.className=(k==i?'on ':'')+(done.has(k)?'dn':'');b.setAttribute('aria-label','Nível '+(k+1)+(done.has(k)?', concluído':''))});
function setGame(id){
G=GM[id];G.id=id;L=G.L;
try{done=new Set(JSON.parse(localStorage.getItem(key(id))||'[]'))}catch(e){done=new Set()}
document.querySelectorAll('#gm button').forEach(b=>b.classList.toggle('on',b.dataset.g==id));
$('#lv').innerHTML='';
L.forEach((_,k)=>{const b=document.createElement('button');b.textContent=k+1;b.onclick=()=>load(k);$('#lv').append(b)});
const kd=G.k;
$('#alvo').hidden=$('#jog').hidden=kd!='p';$('#tank').hidden=$('#mk').hidden=kd!='s';$('#pv').hidden=kd!='h';
$('#vw').dataset.k=kd;$('#alvo').classList.toggle('gr',id=='grid');$('#lc').textContent='}';
load(Math.max(0,L.findIndex((_,j)=>!done.has(j))));
}
function loadX(i,l){
$('#lt').textContent='Nível '+(i+1)+' de '+L.length;$('#txt').innerHTML=l.t;
$('#css').value='';$('#nx').hidden=true;st('');
if(G.k=='s'){const t=$('#tank');t.innerHTML=l.h;t.querySelectorAll(l.a).forEach(e=>e.classList.add('pj'));$('#mk').textContent=l.h.split('><').join('>\n<');$('#lk').textContent='document.querySelectorAll(';$('#lc').textContent=')'}
else{$('#lk').textContent='<body>';$('#lc').textContent='</body>'}
mark(i);liveX();
}
function liveX(){
const v=$('#css').value;$('#vw').classList.remove('win');
if(G.k=='h'){$('#pv').srcdoc=v.trim()?'<style>body{font:16px system-ui;margin:10px;color:#0c1d24}</style>'+v:'';return}
const t=$('#tank');t.querySelectorAll('.sel').forEach(e=>e.classList.remove('sel'));
if(v.trim())try{t.querySelectorAll(v).forEach(e=>e.classList.add('sel'))}catch(e){}
}
function runX(){
const l=L[cur],v=$('#css').value.trim();
if(!v)return st('Escreva algo no campo antes de rodar.','no');
if(G.k=='s'){let m;try{m=[...$('#tank').querySelectorAll(v)]}catch(e){return st('Esse seletor não é válido.','no')}
if(!m.length)return st('Esse seletor não pegou nenhum elemento.','no');
const t=[...$('#tank').querySelectorAll(l.a)];
if(m.length!=t.length||!t.every(e=>m.includes(e)))return st('Pegou '+m.length+(m.length>1?' elementos':' elemento')+', mas não são os que estão pulando.','no')}
else if(!l.k(new DOMParser().parseFromString(v,'text/html')))return st('A página ainda não atende ao pedido. Releia o enunciado e confira a prévia.','no');
win();
}
function win(){
done.add(cur);save();boom();if(G.k!='p')$('#vw').classList.add('win');
document.querySelectorAll('#lv button')[cur].classList.add('dn');
if(cur<L.length-1){st('Isso mesmo!','ok');$('#nx').hidden=false}else st('Você completou este jogo. Escolha outro acima.','ok');
}
function boom(){if(rm)return;const v=$('#vw');for(let i=0;i<20;i++){const e=document.createElement('i');e.className='cf';e.style.cssText='left:'+(4+i*4.8)+'%;background:'+['#d6164f','#e8890c','#15803d','#0b7285'][i%4]+';animation-delay:'+(i%5)*70+'ms';v.append(e);setTimeout(()=>e.remove(),1800)}}
Object.entries(GM).forEach(([id,g])=>{const b=document.createElement('button');b.className='gh';b.dataset.g=id;b.textContent=g.n;b.onclick=()=>setGame(id);$('#gm').append(b)});
function navbar(){const a=document.querySelector('nav.m a[aria-current]'),b=$('#nb');if(a&&b){b.style.setProperty('--x',a.offsetLeft+'px');b.style.setProperty('--w',a.offsetWidth+'px')}}
addEventListener('resize',navbar);if(document.fonts)document.fonts.ready.then(navbar);
{const h=document.querySelector('.hero svg');h.onclick=()=>{if(!rm)h.animate([{transform:'rotate(-7deg)'},{transform:'rotate(-7deg) translateY(-26px) scale(1.04,.96)',offset:.4},{transform:'rotate(-7deg)'}],{duration:500,easing:'cubic-bezier(.3,1.4,.5,1)'})}}
(()=>{
const $$=s=>document.querySelectorAll(s),cv=$('#cv'),cx=cv.getContext('2d'),D=[[1,0],[0,1],[-1,0],[0,-1]],IC=['↑','↶','↷','⤴︎','✦','F1','F2'],NM=['Avançar','Girar à esquerda','Girar à direita','Pular','Acender','Função 1','Função 2'],RW=['Principal','F1','F2'];
const LV=[
{m:['11111A'],l:[4,0,0],p:2,t:'Acenda a luz. ↑ avança e ✦ acende. Repetir ×N economiza espaços.'},
{m:['111','..1','..A'],l:[6,0,0],p:4,t:'Tux só muda de direção com ↶ e ↷.'},
{m:['112C'],l:[5,0,0],p:3,t:'Degraus pedem um pulo: ⤴ sobe ou desce um nível.'},
{m:['1A1A1A1A1'],l:[3,3,0],p:4,t:'F1 guarda uma sequência para reutilizar. Os espaços são poucos.'},
{m:['11A','1.1','A1A'],l:[3,4,0],p:4,t:'Funções e repetições juntas: o contorno tem um padrão.'},
{m:['A2C2A'],l:[6,2,0],p:5,t:'Subir e descer, acendendo cada luz.'},
{m:['11..','.A1.','..A1','...A'],l:[3,5,0],p:6,t:'Zigue-zague: procure o passo que se repete.'},
{m:['112','..2','C33'],l:[5,3,0],p:6,t:'A torre: suba até a luz mais alta.'}
];
let lv=0,P=[],sel=[0,0],rep=1,Hm=[],Tm=[],Lt=[],tx=0,ty=0,td=0,an=null,pt=[],run=0,stk=[],ops=0,spd=1,hl=null,W=0,Hh=0,u=0,ox=0,oy=0,raf=0,gx=1,gy=1,hx=1,won=0,t0=0,stars=[];
try{stars=JSON.parse(localStorage.getItem('tt-logica')||'[]')}catch(e){}
const hh=(x,y)=>(Hm[y]&&Hm[y][x])|0,X=(x,y)=>ox+(x-y)*u,Y=(x,y,h)=>oy+(x+y)*u/2-h*.55*u,dk=()=>R.dataset.theme=='dark';
const say=(m,c)=>{const e=$('#ls');e.textContent=m;e.className=c||''};
const busy=()=>an||pt.length||run;
const kick=()=>{if(!raf)raf=requestAnimationFrame(loop)};
const stop=()=>{run=0;$('#go').textContent='Rodar'};
const poly=(p,c)=>{cx.beginPath();cx.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)cx.lineTo(p[i],p[i+1]);cx.closePath();cx.fillStyle=c;cx.fill()};
function buildLv(){const el=$('#ll');el.innerHTML='';LV.forEach((_,i)=>{const b=document.createElement('button');b.textContent=i+1;b.onclick=()=>setLv(i);el.append(b)})}
function markLv(){$$('#ll button').forEach((b,i)=>{b.className=(i==lv?'on ':'')+(stars[i]?'dn':'');b.setAttribute('aria-label','Nível '+(i+1)+(stars[i]?', '+stars[i]+' estrelas':''))})}
function buildPg(){
const el=$('#pg');el.innerHTML='';
P.forEach((row,r)=>{if(!row.length)return;const d=document.createElement('div');d.className='pr';d.innerHTML='<b>'+RW[r]+'</b><div class="sls"></div>';const w=d.lastChild;row.forEach((_,i)=>{const b=document.createElement('button');b.className='sl';b.dataset.r=r;b.dataset.i=i;b.setAttribute('aria-label',RW[r]+', espaço '+(i+1));w.append(b)});el.append(d)})
}
function buildPal(){
const el=$('#pl'),rp=$('#rp');el.innerHTML=rp.innerHTML='';
IC.forEach((ic,c)=>{if(c>4&&!LV[lv].l[c-4])return;const b=document.createElement('button');b.className='cm';b.textContent=ic;b.setAttribute('aria-label',NM[c]);b.onclick=()=>put(c);el.append(b)});
const e=document.createElement('button');e.className='cm';e.textContent='✕';e.setAttribute('aria-label','Apagar espaço');e.onclick=()=>put(-1);el.append(e);
for(let n=1;n<6;n++){const b=document.createElement('button');b.className='gh'+(n==rep?' on':'');b.textContent='×'+n;b.setAttribute('aria-label','Repetir '+n+' vezes');b.onclick=()=>{rep=n;$$('#rp button').forEach((x,k)=>x.classList.toggle('on',k+1==n))};rp.append(b)}
}
function paintSl(){$$('.sl').forEach(b=>{const r=+b.dataset.r,i=+b.dataset.i,s=P[r][i];b.innerHTML=s?IC[s.c]+(s.n>1?'<sup>×'+s.n+'</sup>':''):'';b.className='sl'+(s?' on':'')+(sel[0]==r&&sel[1]==i?' sel':'')+(hl&&hl[0]==r&&hl[1]==i?' run':'')})}
function paintHl(){$$('.sl').forEach(b=>b.classList.toggle('run',!!hl&&hl[0]==+b.dataset.r&&hl[1]==+b.dataset.i))}
function put(c){
if(run==1)return;const r=sel[0],i=sel[1];if(!P[r]||i>=P[r].length)return;
P[r][i]=c<0?null:{c,n:rep};stk=[];hl=null;
if(c>=0&&i<P[r].length-1)sel=[r,i+1];
paintSl()
}
function setLv(i){
lv=i;const L=LV[i];
Hm=L.m.map(r=>[...r].map(c=>c=='.'?0:+c||'ABC'.indexOf(c)+1));
Tm=L.m.map(r=>[...r].map(c=>'ABC'.includes(c)));
gy=Hm.length;gx=Math.max(...Hm.map(r=>r.length));hx=Math.max(...Hm.flat());
P=L.l.map(n=>Array(n).fill(null));sel=[0,0];rep=1;
$('#lx').textContent='Nível '+(i+1)+' de '+LV.length+'. '+L.t;
buildPg();buildPal();markLv();fit();reset()
}
function reset(){tx=ty=td=0;Lt=Tm.map(r=>r.map(()=>0));an=null;pt=[];run=0;stk=[];ops=0;hl=null;won=0;$('#nl').hidden=true;$('#go').textContent='Rodar';say('');paintSl();kick()}
function fit(){
const r=cv.getBoundingClientRect();if(!r.width)return;
const d=Math.min(devicePixelRatio||1,2);W=r.width;Hh=r.height;cv.width=W*d|0;cv.height=Hh*d|0;cx.setTransform(d,0,0,d,0,0);
u=Math.min(W*.92/(gx+gy),Hh*.9/((gx+gy)/2+hx*.55+1.5));ox=W/2-(gx-gy)*u/2;oy=Hh*.95-((gx+gy-1)*u/2+.3*u);kick()
}
function nextOp(){
while(stk.length){
const f=stk[stk.length-1],row=P[f.r];
if(f.i>=row.length){stk.pop();continue}
const s=row[f.i];
if(!s||f.k>=s.n){f.i++;f.k=0;continue}
f.k++;
if(++ops>500||stk.length>30)return{e:1};
if(s.c>4){stk.push({r:s.c-4,i:0,k:0});continue}
return{c:s.c,r:f.r,i:f.i}
}
return 0
}
function next(now){
const o=nextOp();
if(!o){stop();const n=Tm.flat().filter((t,i)=>t&&!Lt.flat()[i]).length;say(n?'O programa acabou e faltam '+n+(n>1?' luzes':' luz')+'. Ajuste e rode de novo.':'','no');return}
if(o.e){stk=[];stop();say('Passos demais: parece um loop infinito. Revise as funções.','no');return}
begin(o,now)
}
function begin(o,now){
hl=[o.r,o.i];paintHl();
const c=o.c,d=D[td],nx=tx+d[0],ny=ty+d[1],h=hh(tx,ty),nh=hh(nx,ny);
an={c,s:now,p:0,d:c==0?440:c<3?300:c==3?520:380,nx,ny,nh,h,f:''};
if(c==0||c==3){if(!nh)an.f='Tux quase caiu na água!';else if(c==0&&nh!=h)an.f='Degrau diferente: use ⤴ para subir ou descer.';else if(c==3&&Math.abs(nh-h)!=1)an.f='Pular só vence um nível de diferença.'}
}
function lightUp(now){
const ok=Tm[ty][tx]&&!Lt[ty][tx];if(ok)Lt[ty][tx]=now;
pt.push({ring:ok?1:2,x:X(tx,ty),y:Y(tx,ty,hh(tx,ty)),l:ok?.6:.4})
}
function fin(){
const a=an;an=null;
if(a.f){stk=[];stop();say(a.f,'no');return}
if(a.c==0||a.c==3){tx=a.nx;ty=a.ny}else if(a.c==1)td=(td+3)%4;else if(a.c==2)td=(td+1)%4;
if(a.c==4&&Tm.every((r,y)=>r.every((t,x)=>!t||Lt[y][x])))return win();
if(run==2)run=0
}
function win(){
stop();stk=[];won=1;
const n=P.flat().filter(Boolean).length,p=LV[lv].p,s=n<=p?3:n<=p+2?2:1;
stars[lv]=Math.max(stars[lv]|0,s);try{localStorage.setItem('tt-logica',JSON.stringify(stars))}catch(e){}
say('Todas as luzes acesas com '+n+(n>1?' espaços':' espaço')+'. '+'★'.repeat(s)+'☆'.repeat(3-s),'ok');
$('#nl').hidden=lv>=LV.length-1;markLv();confetti()
}
function confetti(){if(rm)return;const cs=['#d6164f','#e8890c','#15803d','#0b7285','#ffffff'];for(let i=0;i<46;i++)pt.push({x:W/2+(Math.random()-.5)*W*.3,y:Hh*.4,vx:(Math.random()-.5)*320,vy:-Math.random()*320-60,l:1.4+Math.random()*.6,c:cs[i%5],r:2+Math.random()*3});kick()}
function tick(now){
const dt=Math.min(.05,(now-t0)/1000||.016);t0=now;
for(let i=pt.length;i--;){const p=pt[i];p.l-=dt;if(p.l<=0){pt.splice(i,1);continue}if(!p.ring){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=620*dt}}
if(an){an.p=Math.min(1,(now-an.s)*spd/an.d);if(an.c==4&&!an.l&&an.p>=.5){an.l=1;lightUp(now)}if(an.p>=1)fin()}
else if(run)next(now)
}
function vis(now){
const v={x:tx,y:ty,h:hh(tx,ty),d:td,sx:1,lift:rm?0:.04+Math.sin(now/450)*.03,sq:1,rot:0};
if(!an)return v;
const p=an.p,c=an.c,e=p<.5?2*p*p:1-2*(1-p)*(1-p);
if(c==1||c==2){v.sx=Math.abs(Math.cos(Math.PI*p));if(p>=.5)v.d=c==1?(td+3)%4:(td+1)%4;v.lift=Math.sin(Math.PI*p)*.1}
else if(c==0||c==3){
const k=an.f?Math.sin(Math.PI*p)*.3:e;
v.x=tx+(an.nx-tx)*k;v.y=ty+(an.ny-ty)*k;v.h=an.h+((an.nh||an.h)-an.h)*k;
v.lift=c==3?Math.sin(Math.PI*p)*.9:Math.abs(Math.sin(Math.PI*p*2))*.08;
v.rot=c==0?Math.sin(Math.PI*p*4)*.1:0;
if(c==3&&p>.82)v.sq=1-Math.sin((p-.82)*Math.PI/.18)*.15
}else v.lift=Math.sin(Math.PI*p)*.3;
return v
}
function tile(x,y,now){
const h=Hm[y][x];if(!h)return;
const d=dk(),sx=X(x,y),sy=Y(x,y,h),th=h*.55*u+.3*u,hot=d?'255,77,134':'214,22,79';
poly([sx,sy-u/2,sx+u,sy,sx,sy+u/2,sx-u,sy],d?'#3a7384':'#f6fcfe');
cx.strokeStyle=d?'rgba(255,255,255,.18)':'rgba(11,114,133,.3)';cx.lineWidth=1;cx.stroke();
poly([sx-u,sy,sx,sy+u/2,sx,sy+u/2+th,sx-u,sy+th],d?'#285866':'#cde3ea');
poly([sx+u,sy,sx,sy+u/2,sx,sy+u/2+th,sx+u,sy+th],d?'#1e4753':'#b0d1da');
if(Tm[y][x]){
const l=Lt[y][x],g=l?Math.min(1,(now-l)/350):0,k=.62,q=[sx,sy-u/2*k,sx+u*k,sy,sx,sy+u/2*k,sx-u*k,sy];
if(g){poly(q,'rgba('+hot+','+g+')');poly([sx,sy-u/5,sx+u*.4,sy,sx,sy+u/5,sx-u*.4,sy],'rgba(255,255,255,'+g*.85+')')}
else{cx.beginPath();cx.moveTo(q[0],q[1]);cx.lineTo(q[2],q[3]);cx.lineTo(q[4],q[5]);cx.lineTo(q[6],q[7]);cx.closePath();cx.strokeStyle='rgba('+hot+','+(.55+(rm?0:.25*Math.sin(now/300)))+')';cx.lineWidth=2;cx.stroke()}
}
}
function dTux(v){
const px=X(v.x,v.y),g0=Y(v.x,v.y,v.h),py=g0-v.lift*u,s=u*.5,fr=v.d<2,fx=v.d==0||v.d==3?1:-1,hot=dk()?'#ff4d86':'#d6164f';
cx.fillStyle='rgba(0,30,40,.2)';cx.beginPath();cx.ellipse(px,g0,s*.75*(1-v.lift*.25),s*.3,0,0,7);cx.fill();
cx.save();cx.translate(px+fx*s*.06,py);cx.rotate(v.rot);cx.scale(v.sx*(2-v.sq),v.sq);
cx.fillStyle='#f5a623';cx.beginPath();cx.ellipse(-s*.3,-s*.08,s*.32,s*.16,0,0,7);cx.ellipse(s*.3,-s*.08,s*.32,s*.16,0,0,7);cx.fill();
cx.fillStyle='#16252d';cx.strokeStyle='#7fa8b3';cx.lineWidth=1.2;
cx.beginPath();cx.ellipse(0,-s*1.05,s*.72,s*.98,0,0,7);cx.fill();cx.stroke();
cx.beginPath();cx.ellipse(-s*.76,-s*.95,s*.16,s*.5,.3,0,7);cx.ellipse(s*.76,-s*.95,s*.16,s*.5,-.3,0,7);cx.fill();
if(fr){
cx.fillStyle='#fff';cx.beginPath();cx.ellipse(fx*s*.12,-s*.7,s*.44,s*.56,0,0,7);cx.fill();
const ex=fx*s*.2;cx.beginPath();cx.arc(ex-s*.2,-s*1.55,s*.17,0,7);cx.arc(ex+s*.2,-s*1.55,s*.17,0,7);cx.fill();
cx.fillStyle='#16252d';cx.beginPath();cx.arc(ex-s*.2+fx*s*.05,-s*1.53,s*.08,0,7);cx.arc(ex+s*.2+fx*s*.05,-s*1.53,s*.08,0,7);cx.fill();
cx.fillStyle='#f5a623';cx.beginPath();cx.moveTo(ex-s*.2,-s*1.35);cx.quadraticCurveTo(ex,-s*1.45,ex+s*.2,-s*1.35);cx.quadraticCurveTo(ex,-s*1.1,ex-s*.2,-s*1.35);cx.fill()
}
cx.fillStyle=hot;cx.fillRect(-s*.62,-s*.98,s*1.24,s*.2);
cx.restore()
}
function draw(now){
if(!u)return;
cx.clearRect(0,0,W,Hh);
const v=vis(now),n=gx+gy-1,dg=Math.max(0,Math.min(n-1,Math.round(v.x+v.y+.2))),hot=dk()?'255,77,134':'214,22,79';
for(let s=0;s<n;s++){for(let y=Math.max(0,s-gx+1);y<=Math.min(s,gy-1);y++)tile(s-y,y,now);if(s==dg)dTux(v)}
for(const p of pt){
if(p.ring){const k=1-p.l/(p.ring==1?.6:.4);cx.strokeStyle=p.ring==1?'rgba('+hot+','+(1-k)+')':'rgba(120,140,150,'+(1-k)+')';cx.lineWidth=2;cx.beginPath();cx.ellipse(p.x,p.y,u*(.3+k*1.1),u*(.15+k*.55),0,0,7);cx.stroke()}
else{cx.globalAlpha=Math.min(1,p.l*2);cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.r*1.6,p.r);cx.globalAlpha=1}
}
}
function loop(now){
raf=0;
if(document.hidden||$('#logica').hidden)return;
tick(now);draw(now);
if(busy())raf=requestAnimationFrame(loop);else if(!rm)raf=setTimeout(()=>{raf=0;kick()},80)
}
$('#pg').onclick=e=>{const b=e.target.closest('.sl');if(b){sel=[+b.dataset.r,+b.dataset.i];paintSl()}};
$('#go').onclick=()=>{if(run==1){stop();return}reset();stk=[{r:0,i:0,k:0}];run=1;$('#go').textContent='Parar';kick()};
$('#sp').onclick=()=>{if(run==1||an)return;if(!stk.length||won){reset();stk=[{r:0,i:0,k:0}]}run=2;kick()};
$('#vl').onclick=()=>{spd=spd==1?2:spd==2?4:1;$('#vl').textContent='Velocidade ×'+spd};
$('#rt').onclick=reset;
$('#cl').onclick=()=>{if(run==1)return;P.forEach(r=>r.fill(null));sel=[0,0];reset()};
$('#nl').onclick=()=>setLv(lv+1);
new ResizeObserver(fit).observe(cv);
addEventListener('hashchange',()=>setTimeout(kick));document.addEventListener('visibilitychange',kick);$('#inv').addEventListener('click',()=>setTimeout(kick));
buildLv();setLv(Math.max(0,LV.findIndex((_,i)=>!stars[i])));
})();
function route(){
const h=location.hash.slice(1),id=["logica","python","html-css"].includes(h)?h:"inicio";
document.querySelectorAll("main>section").forEach(s=>s.hidden=s.id!=id);
document.querySelectorAll("nav.m a").forEach(a=>a.getAttribute("href")=="#"+id?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
scrollTo({top:0,behavior:'instant'});navbar();
}
addEventListener("hashchange",route);route();
setGame('flex');
