/* Tech Teach Programação: lógica dos jogos e do site. Carregado por index.html, no fim do body. */
const $=s=>document.querySelector(s),R=document.documentElement,P=["rosa","ambar","verde"];
const FL=[
{n:["rosa"],s:"justify-content:flex-end",t:"Flexbox alinha itens dentro de um container. O eixo principal vai da esquerda para a direita, e <code>justify-content</code> decide onde os itens ficam nele. Valores possíveis: <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>space-between</code> e <code>space-around</code>. Cada pinguim deve chegar ao buraco da mesma cor. Passe o mouse (ou toque) nos códigos sublinhados para ver a sintaxe."},
{n:["rosa","ambar"],s:"justify-content:center",t:"Os dois pinguins vão juntos para o meio do gelo. Teste valores diferentes de <code>justify-content</code> e observe como os itens deslizam."},
{n:P,s:"justify-content:space-around",t:"Quando sobra espaço, <code>space-between</code> e <code>space-around</code> distribuem esse espaço de jeitos diferentes: um só entre os itens, o outro também nas bordas. Observe os buracos para escolher."},
{n:P,s:"justify-content:space-between",t:"Mais uma vez com três pinguins: compare o espaço nas bordas com o espaço entre os itens e escolha entre <code>space-between</code> e <code>space-around</code>."},
{n:["rosa"],s:"align-items:flex-end",t:"Existe um segundo eixo, o cruzado, que vai de cima para baixo. <code>align-items</code> alinha os itens nele, com valores como <code>flex-start</code>, <code>flex-end</code> e <code>center</code>."},
{n:["ambar"],s:"justify-content:center;align-items:center",t:"Para ficar no centro exato, use as duas propriedades juntas."},
{n:P,s:"justify-content:space-around;align-items:flex-end",t:"Combine: espaço ao redor na horizontal e todos no fundo."},
{n:P,s:"flex-direction:row-reverse",t:"<code>row-reverse</code> inverte a fila: o primeiro pinguim vai para a direita."},
{n:P,s:"flex-direction:column",t:"<code>column</code> troca o eixo principal: a fila passa a ir de cima para baixo."},
{n:["rosa","ambar"],s:"flex-direction:row-reverse;justify-content:flex-end",t:"Com <code>row-reverse</code> o começo da linha fica na direita, então <code>flex-end</code> leva o grupo para a esquerda."},
{n:P,sel:".rosa",s:"order:1",t:"<code>order</code> muda a posição de um item sem mexer no HTML. O padrão é 0 e números maiores vão para o fim. Agora você estiliza só o pinguim rosa."},
{n:P,b:"justify-content:space-between",sel:".ambar",s:"align-self:flex-end",t:"<code>align-self</code> alinha um único item no eixo cruzado. Leve só o pinguim âmbar para o fundo."},
{x:1,n:P,s:'flex-direction:column;justify-content:center',t:'Prática: coluna de pinguins, encostada na esquerda e centralizada na altura do gelo.'},
{x:1,n:P,s:'flex-direction:column;align-items:center',t:'Prática: coluna de pinguins saindo do topo e centralizada na largura.'},
{x:1,n:P,s:'flex-direction:column;justify-content:space-between;align-items:flex-end',t:'Prática: coluna na borda direita, com os pinguins espalhados do topo ao fundo.'},
{x:1,n:P,s:'flex-direction:row-reverse;justify-content:space-around;align-items:center',t:'Prática: fila invertida, com espaço igual ao redor e centralizada na altura.'},
{x:1,n:P,s:'flex-direction:column-reverse;justify-content:center;align-items:flex-end',t:'Prática: coluna invertida (o primeiro pinguim fica embaixo), na borda direita e centralizada na altura.'},
{x:1,n:P,b:'justify-content:space-around',sel:'.verde',s:'order:-1;align-self:flex-end',t:'Prática: só o pinguim verde muda. Ele vai para o começo da fila e para o fundo.'},
{x:1,n:P,b:'justify-content:center;align-items:center',sel:'.rosa',s:'order:1;align-self:flex-start',t:'Prática: só o pinguim rosa muda. Ele vai para o fim da fila e para o topo.'},
{x:1,n:[...P,'azul','cinza'],b:'width:200px',s:'flex-wrap:wrap',t:'Prática: os cinco pinguins não cabem em uma linha. Faça o excedente ir para a linha de baixo.'},
{x:1,n:[...P,'azul'],b:'width:150px',s:'flex-wrap:wrap;justify-content:center',t:'Prática: duas linhas, cada uma centralizada na largura do container.'},
{x:1,n:[...P,'azul','cinza'],b:'width:200px',s:'flex-wrap:wrap;align-content:center',t:'Prática: as linhas ficam agrupadas no meio da altura do container.'},
{x:1,n:[...P,'azul','cinza'],s:'flex-flow:column wrap;justify-content:space-between',t:'Prática: cinco pinguins em colunas que quebram quando a altura acaba.'},
{x:1,n:[...P,'azul'],b:'width:240px',s:'flex-wrap:wrap;gap:30px;justify-content:center;align-content:center',t:'Desafio final: quebra de linha, 30px entre os pinguins e tudo centralizado nos dois eixos.'}
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
$("#lt").textContent="Nível "+(i+1)+" de "+L.length+(l.x?" (prática)":": "+names(l).join(" e "));
$("#txt").innerHTML=l.t;tips();
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
if(!$("#css").value.trim())return st("Escreva uma declaração, por exemplo: "+(l.x?"propriedade":names(l)[0])+": valor;","no");
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
{n:['rosa'],b:GB,sel:'.rosa',s:'grid-column:4',t:'Grid organiza itens em linhas e colunas. Aqui o gelo tem 4 colunas e 3 linhas. <code>grid-column</code> escolhe a coluna do item, numerada de 1 a 4, e a regra já está aberta só para o pinguim rosa. Passe o mouse (ou toque) nos códigos sublinhados para ver a sintaxe.'},
{n:['rosa'],b:GB,sel:'.rosa',s:'grid-row:3',t:'Do mesmo jeito, <code>grid-row</code> escolhe a linha do item, de 1 a 3, contando de cima para baixo.'},
{n:['rosa'],b:GB,sel:'.rosa',s:'grid-column:3;grid-row:2',t:'Combine <code>grid-column</code> e <code>grid-row</code>: a célula é o cruzamento de uma coluna com uma linha.'},
{n:P,b:GB,s:'justify-items:end',t:'Em vez de posicionar um por um, o container pode alinhar todos de uma vez. <code>justify-items</code> alinha cada item dentro da própria célula, na horizontal: <code>start</code>, <code>center</code> ou <code>end</code>.'},
{n:P,b:GB,s:'align-items:end',t:'<code>align-items</code> faz o mesmo na vertical.'},
{n:P,b:GB,s:'place-items:center',t:'<code>place-items</code> junta align-items e justify-items em uma só linha.'},
{n:P,b:GB,s:'grid-auto-flow:column',t:'Os itens preenchem a grade linha por linha. <code>grid-auto-flow</code> muda essa ordem.'},
{n:['ambar'],b:GB,sel:'.ambar',s:'grid-area:3/4',t:'<code>grid-area</code> aceita <code>linha / coluna</code> e posiciona o item de uma vez.'},
{n:P,b:GB,s:'gap:20px',t:'O espaço entre as células também é configurável. <code>gap</code> define a distância entre linhas e colunas. Aqui, use 20px.'},
{n:['rosa'],b:GB,sel:'.rosa',s:'grid-column:2/4;justify-self:center',t:'Um item pode ocupar mais de uma célula. <code>grid-column</code> aceita início e fim, e <code>justify-self</code> alinha só esse item dentro da área que ele ocupa.'},
{n:['ambar'],b:GB,sel:'.ambar',s:'grid-column:3;grid-row:2/4;align-self:center',t:'O mesmo vale para linhas: <code>grid-row</code> aceita início e fim, e <code>align-self</code> alinha o item na vertical dentro da área.'},
{n:P,b:'display:grid',s:'grid-template-columns:repeat(3,100px)',t:'Agora você define as colunas. <code>grid-template-columns</code> lista o tamanho de cada uma. Aqui: três colunas de 100px.'},
{x:1,n:P,b:'display:grid',s:'grid-template-columns:1fr 2fr 1fr',t:'Prática: três colunas, e a do meio é duas vezes mais larga que as outras.'},
{x:1,n:[...P,'azul','cinza'],b:'display:grid;grid-template-columns:repeat(3,1fr)',s:'grid-template-rows:repeat(2,1fr);grid-auto-flow:column',t:'Prática: a grade tem 2 linhas e os pinguins descem pela coluna antes de passar para a próxima.'},
{x:1,n:['rosa','ambar'],b:GB,sel:'.ambar',s:'grid-area:2/2/4/4;place-self:center',t:'Prática: o pinguim âmbar ocupa um bloco de 2 linhas por 2 colunas e fica no centro desse bloco.'},
{x:1,n:P,b:GB,s:'place-items:end;grid-auto-flow:column;gap:10px',t:'Prática: tudo no canto inferior direito das células, preenchendo por coluna, com 10px de espaço.'}
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
const lockG=l=>{const b=(l.b||GB).split(';').map(x=>x.replace(':',': ')+';');return l.sel?'#gelo { '+b.join(' ')+' }\n'+l.sel+' {':'#gelo {\n  '+b.join('\n  ')};
const mark=i=>document.querySelectorAll('#lv button').forEach((b,k)=>{b.className=(k==i?'on ':'')+(done.has(k)?'dn':'');b.setAttribute('aria-label','Nível '+(k+1)+(done.has(k)?', concluído':''))});
const SY={
'justify-content':'justify-content: flex-start | flex-end | center | space-between | space-around;\nAlinha os itens no eixo principal.',
'align-items':'align-items: flex-start | flex-end | center | stretch;\nFlex: alinha no eixo cruzado. Grid: alinha na vertical dentro da célula (start | center | end).',
'align-self':'align-self: flex-start | flex-end | center;\nComo align-items, mas só para um item.',
'align-content':'align-content: flex-start | flex-end | center | space-between;\nAlinha as linhas quando os itens quebram de linha.',
'flex-direction':'flex-direction: row | row-reverse | column | column-reverse;\nDefine a direção do eixo principal.',
'flex-wrap':'flex-wrap: nowrap | wrap;\nPermite quebrar os itens em várias linhas.',
'flex-flow':'flex-flow: <direção> <quebra>;\nAtalho. Ex.: flex-flow: column wrap;',
'order':'order: <número>;\nMuda a posição do item. O padrão é 0; números maiores vão para o fim.',
'gap':'gap: <tamanho>;\nEspaço entre linhas e colunas. Ex.: gap: 20px;',
'flex-start':'flex-start\nEncosta os itens no início do eixo.',
'flex-end':'flex-end\nEncosta os itens no fim do eixo.',
'center':'center\nCentraliza no eixo.',
'space-between':'space-between\nPrimeiro e último nas pontas; espaço igual entre os itens.',
'space-around':'space-around\nEspaço igual ao redor de cada item.',
'start':'start\nEncosta no início da célula.',
'end':'end\nEncosta no fim da célula.',
'grid-column':'grid-column: <início> / <fim>;\nEscolhe a coluna do item. Ex.: grid-column: 2; ou grid-column: 2 / 4;',
'grid-row':'grid-row: <início> / <fim>;\nEscolhe a linha do item. Ex.: grid-row: 3;',
'grid-area':'grid-area: <linha> / <coluna>;\nAtalho de posição. Ex.: grid-area: 3 / 4;',
'justify-items':'justify-items: start | center | end;\nAlinha cada item na horizontal, dentro da célula.',
'justify-self':'justify-self: start | center | end;\nComo justify-items, mas só para um item.',
'place-items':'place-items: <vertical> <horizontal>;\nAtalho de align-items + justify-items. Ex.: place-items: center;',
'grid-auto-flow':'grid-auto-flow: row | column;\nOrdem em que os itens preenchem a grade.',
'grid-template-columns':'grid-template-columns: 100px 1fr 2fr;\nTamanho de cada coluna. Dá para usar repeat(3, 100px).',
':first-child':':first-child\nEscolhe o elemento que é o primeiro filho do pai. Ex.: peixe:first-child',
':last-child':':last-child\nEscolhe o elemento que é o último filho do pai. Ex.: peixe:last-child',
':not()':':not(seletor)\nExclui o que combina com o seletor. Ex.: peixe:not(.rosa)'
};
const tips=()=>document.querySelectorAll('#txt code').forEach(c=>{const s=SY[c.textContent.trim()];if(s){c.dataset.s=s;c.tabIndex=0}});
const tp=document.body.appendChild(document.createElement('div'));tp.id='tip';tp.hidden=true;
const hideTip=()=>{tp.hidden=true};
function showTip(e){const c=e.target.closest&&e.target.closest('code[data-s]');if(!c)return;tp.textContent=c.dataset.s;tp.hidden=false;const r=c.getBoundingClientRect(),w=tp.offsetWidth,h=tp.offsetHeight;tp.style.left=Math.max(8,Math.min(r.left,innerWidth-w-8))+'px';tp.style.top=(r.bottom+h+14>innerHeight?r.top-h-8:r.bottom+8)+'px'}
document.addEventListener('mouseover',showTip);document.addEventListener('focusin',showTip);
document.addEventListener('click',e=>e.target.closest&&e.target.closest('code[data-s]')?showTip(e):hideTip());
document.addEventListener('mouseout',e=>{if(e.target.closest&&e.target.closest('code[data-s]'))hideTip()});
document.addEventListener('focusout',hideTip);addEventListener('scroll',hideTip,{passive:true});
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
$('#lt').textContent='Nível '+(i+1)+' de '+L.length;$('#txt').innerHTML=l.t;tips();
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
const $$=s=>document.querySelectorAll(s),cv=$('#cv'),cx=cv.getContext('2d'),D=[[1,0],[0,1],[-1,0],[0,-1]],IC=['↑','↶','↷','⤴︎','✦','F1','F2','⇄'],NM=['Avançar','Girar à esquerda','Girar à direita','Pular','Acender','Função 1','Função 2','Trocar de personagem'],RW=['Principal','F1','F2'];
const LV=[
{"m": ["11111A"], "l": [3], "p": 2, "t": "Acenda a luz. ↑ avança e ✦ acende. Repetir ×N economiza espaços."},
{"m": ["111", "..1", "..A"], "l": [5], "p": 4, "t": "Tux só muda de direção com ↶ e ↷."},
{"m": ["112C"], "l": [4], "p": 3, "t": "Degraus pedem um pulo: ⤴ sobe ou desce um nível."},
{"m": ["1A1A1A1A1"], "l": [2, 3], "p": 4, "t": "F1 guarda uma sequência para reutilizar. Os espaços são poucos."},
{"m": ["11A", "1.1", "A1A"], "l": [1, 3], "p": 4, "t": "Funções e repetições juntas: o contorno tem um padrão."},
{"m": ["A2C2A"], "l": [2, 2], "p": 4, "t": "Subir e descer, acendendo cada luz. Repita o que se repete."},
{"m": ["11..", ".A1.", "..A1", "...A"], "l": [2, 5], "p": 7, "t": "Zigue-zague: procure o passo que se repete."},
{"m": ["112", "..2", "C33"], "l": [3, 3], "p": 6, "t": "A torre: suba até a luz mais alta."},
{"m": ["B111B", "1...1", "1...1", "1...1", "B111B"], "l": [2, 5], "p": 7, "t": "As luzes ficam nos cantos, no alto. Cuidado com os degraus."},
{"m": ["111B", "1..2", "B..2", "B33C"], "l": [3, 4], "p": 7, "t": "Contorne a borda: cada lado sobe um degrau. A última luz fica depois da curva."},
{"m": ["1B..", ".CB.", "..A."], "l": [1, 6], "p": 7, "t": "Escada em zigue-zague: ache o trecho que se repete."},
{"m": ["AAAA", "A..A", "A..A", "AAAA"], "l": [1, 2, 2], "p": 5, "t": "São 12 luzes e só 5 espaços. Funções podem chamar outras funções."},
{"m": ["1111A", "....1", "A1A.1", "1...1", "A111A"], "l": [4, 3, 2], "p": 9, "t": "Espiral: os lados encolhem. Use duas funções."},
{"m": [".A.A.A.", "1111111", ".A.A.A."], "l": [2, 4, 4], "p": 10, "t": "Dentes de pente: vai, acende, meia-volta (↷ ↷) e volta.", "s": [0, 1, 0]},
{"m": ["..A..", "..2..", "A232A", "..2..", "..A.."], "l": [2, 4, 2], "p": 8, "t": "Cruz de torres: cada braço desce e sobe. Pense em funções dentro de funções.", "s": [2, 2, 0]},
{"m": ["11A..12B", "..1....3", "..A....C"], "l": [10, 3], "p": 13, "t": "Último nível! Tux e Nolok estão em ilhas separadas. Use ⇄ para trocar quem recebe os comandos.", "o": [5, 0, 0], "sw": 1}
];
let lv=0,P=[],sel=[0,0],rep=1,Hm=[],Tm=[],Lt=[],tx=0,ty=0,td=0,an=null,pt=[],run=0,stk=[],ops=0,spd=1,oth=null,who=0,S0=[0,0,0],O0=null,hl=null,W=0,Hh=0,u=0,ox=0,oy=0,raf=0,gx=1,gy=1,hx=1,won=0,t0=0,stars=[];
try{stars=JSON.parse(localStorage.getItem('tt-logica2')||'[]')}catch(e){}
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
IC.forEach((ic,c)=>{if(c==7?!LV[lv].sw:c>4&&!LV[lv].l[c-4])return;const b=document.createElement('button');b.className='cm';b.textContent=ic;b.setAttribute('aria-label',NM[c]);b.onclick=()=>put(c);el.append(b)});
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
lv=i;const L=LV[i];S0=L.s||[0,0,0];O0=L.o||null;
Hm=L.m.map(r=>[...r].map(c=>c=='.'?0:+c||'ABC'.indexOf(c)+1));
Tm=L.m.map(r=>[...r].map(c=>'ABC'.includes(c)));
gy=Hm.length;gx=Math.max(...Hm.map(r=>r.length));hx=Math.max(...Hm.flat());
P=L.l.map(n=>Array(n).fill(null));sel=[0,0];rep=1;
$('#lx').textContent='Nível '+(i+1)+' de '+LV.length+'. '+L.t;
buildPg();buildPal();markLv();fit();reset()
}
function reset(){tx=S0[0];ty=S0[1];td=S0[2];oth=O0?{x:O0[0],y:O0[1],d:O0[2]}:null;who=0;Lt=Tm.map(r=>r.map(()=>0));an=null;pt=[];run=0;stk=[];ops=0;hl=null;won=0;$('#nl').hidden=true;$('#go').textContent='Rodar';say('');paintSl();kick()}
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
if(s.c>4&&s.c<7){stk.push({r:s.c-4,i:0,k:0});continue}
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
if(c==0||c==3){if(!nh)an.f='Tux quase caiu na água!';else if(c==0&&nh!=h)an.f='Degrau diferente: use ⤴ para subir ou descer.';else if(c==3&&Math.abs(nh-h)!=1)an.f='Pular só vence um nível de diferença.';if(!an.f&&oth&&nx==oth.x&&ny==oth.y)an.f='Tem alguém no caminho.'}
}
function lightUp(now){
const ok=Tm[ty][tx]&&!Lt[ty][tx];if(ok)Lt[ty][tx]=now;
pt.push({ring:ok?1:2,x:X(tx,ty),y:Y(tx,ty,hh(tx,ty)),l:ok?.6:.4})
}
function fin(){
const a=an;an=null;
if(a.f){stk=[];stop();say(a.f,'no');return}
if(a.c==0||a.c==3){tx=a.nx;ty=a.ny}else if(a.c==1)td=(td+3)%4;else if(a.c==2)td=(td+1)%4;else if(a.c==7&&oth){const q=oth;oth={x:tx,y:ty,d:td};tx=q.x;ty=q.y;td=q.d;who=1-who;say('Agora você controla '+(who?'o Nolok':'o Tux')+'.')}
if(a.c==4&&Tm.every((r,y)=>r.every((t,x)=>!t||Lt[y][x])))return win();
if(run==2)run=0
}
function win(){
stop();stk=[];won=1;
const n=P.flat().filter(Boolean).length,p=LV[lv].p,s=n<=p?3:n<=p+2?2:1;
stars[lv]=Math.max(stars[lv]|0,s);try{localStorage.setItem('tt-logica2',JSON.stringify(stars))}catch(e){}
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
function dTux(v,k,act){
const nk=k==1,cB=nk?'#3b1d5a':'#16252d',cW=nk?'#8f5bd1':'#fff',cF=nk?'#d9480f':'#f5a623';
const px=X(v.x,v.y),g0=Y(v.x,v.y,v.h),py=g0-v.lift*u,s=u*.5,fr=v.d<2,fx=v.d==0||v.d==3?1:-1,hot=dk()?'#ff4d86':'#d6164f';
cx.fillStyle='rgba(0,30,40,.2)';cx.beginPath();cx.ellipse(px,g0,s*.75*(1-v.lift*.25),s*.3,0,0,7);cx.fill();
if(act&&oth){cx.strokeStyle=nk?'#a78bfa':hot;cx.lineWidth=2.5;cx.beginPath();cx.ellipse(px,g0,s*1.05,s*.42,0,0,7);cx.stroke()}
cx.save();cx.translate(px+fx*s*.06,py);cx.rotate(v.rot);cx.scale(v.sx*(2-v.sq),v.sq);
cx.fillStyle=cF;cx.beginPath();cx.ellipse(-s*.3,-s*.08,s*.32,s*.16,0,0,7);cx.ellipse(s*.3,-s*.08,s*.32,s*.16,0,0,7);cx.fill();
cx.fillStyle=cB;cx.strokeStyle=nk?'#c4b5fd':'#7fa8b3';cx.lineWidth=1.2;
cx.beginPath();cx.ellipse(0,-s*1.05,s*.72,s*.98,0,0,7);cx.fill();cx.stroke();
cx.beginPath();cx.ellipse(-s*.76,-s*.95,s*.16,s*.5,.3,0,7);cx.ellipse(s*.76,-s*.95,s*.16,s*.5,-.3,0,7);cx.fill();
if(fr){
cx.fillStyle=cW;cx.beginPath();cx.ellipse(fx*s*.12,-s*.7,s*.44,s*.56,0,0,7);cx.fill();
const ex=fx*s*.2;cx.fillStyle=nk?'#ff5252':'#fff';cx.beginPath();cx.arc(ex-s*.2,-s*1.55,s*.17,0,7);cx.arc(ex+s*.2,-s*1.55,s*.17,0,7);cx.fill();
cx.fillStyle='#16252d';cx.beginPath();cx.arc(ex-s*.2+fx*s*.05,-s*1.53,s*.08,0,7);cx.arc(ex+s*.2+fx*s*.05,-s*1.53,s*.08,0,7);cx.fill();
cx.fillStyle=cF;cx.beginPath();cx.moveTo(ex-s*.2,-s*1.35);cx.quadraticCurveTo(ex,-s*1.45,ex+s*.2,-s*1.35);cx.quadraticCurveTo(ex,-s*1.1,ex-s*.2,-s*1.35);cx.fill()
}
if(nk){cx.fillStyle='#efe3b8';cx.beginPath();cx.moveTo(-s*.55,-s*1.95);cx.lineTo(-s*.85,-s*2.65);cx.lineTo(-s*.15,-s*2.05);cx.moveTo(s*.55,-s*1.95);cx.lineTo(s*.85,-s*2.65);cx.lineTo(s*.15,-s*2.05);cx.fill()}else{cx.fillStyle=hot;cx.fillRect(-s*.62,-s*.98,s*1.24,s*.2)}
cx.restore()
}
function draw(now){
if(!u)return;
cx.clearRect(0,0,W,Hh);
const v=vis(now),n=gx+gy-1,dg=Math.max(0,Math.min(n-1,Math.round(v.x+v.y+.2))),hot=dk()?'255,77,134':'214,22,79',od=oth?Math.max(0,Math.min(n-1,oth.x+oth.y)):-1;
for(let s=0;s<n;s++){for(let y=Math.max(0,s-gx+1);y<=Math.min(s,gy-1);y++)tile(s-y,y,now);if(oth&&s==od)dTux({x:oth.x,y:oth.y,h:hh(oth.x,oth.y),d:oth.d,sx:1,lift:rm?0:.04+Math.sin(now/450+2)*.03,sq:1,rot:0},1-who,0);if(s==dg)dTux(v,who,1)}
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
let curId="";
function route(forced){
const lh=location.hash.slice(1);if(typeof forced=="string")curId=forced;else if(lh)curId=lh;
const h=lh||curId,id=["logica","python","html-css"].includes(h)?h:"inicio";
document.querySelectorAll("main>section").forEach(s=>s.hidden=s.id!=id);
document.querySelectorAll("nav.m a").forEach(a=>a.getAttribute("href")=="#"+id?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
scrollTo({top:0,behavior:'instant'});navbar();
}
addEventListener("hashchange",()=>route());route();
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;const h=a.getAttribute("href").slice(1);if(!["inicio","logica","python","html-css"].includes(h))return;e.preventDefault();try{history.replaceState(null,"","#"+h)}catch(_){}route(h);setTimeout(()=>window.dispatchEvent(new Event("hashchange")));});
setGame('flex');
