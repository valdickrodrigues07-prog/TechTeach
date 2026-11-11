const $=s=>document.querySelector(s),
ld=k=>{try{return localStorage.getItem(k)}catch(e){return null}},
sv=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
if(matchMedia('(pointer:coarse)').matches)$('#touch').hidden=false;

/* Jogo 1: Caça-Cliques */
(()=>{
const st=$('#ms'),ov=$('#mo'),mm=$('#mm'),mh=$('#mh'),mn=$('#mn'),me=$('#me'),mt=$('#mt'),mpB=$('#mp'),lvB=$('#lv'),
nm={L:'esquerdo',R:'direito'},dica='Escolha o mapa e o nível e aperte Começar.',
MP=['Alvos livres','Área de trabalho','Página da internet','Pasta de arquivos','Editor de texto'],
LV=[['Primeiros cliques','L',10,84,0],['Agora o direito','R',10,84,0],['Os dois botões','B',15,84,0],['Mais rápido','B',15,64,3000],['Mão firme','B',20,48,2000]],
M1=[['Fotos',3,6,'L','p','Abrir a pasta Fotos'],['Navegador',3,38,'L','g','Abrir o programa Navegador'],['Carta.txt',17,6,'R','a','Ver as opções do arquivo Carta.txt (copiar, renomear)'],['Lixeira',17,38,'R','l','Ver as opções da Lixeira (esvaziar)'],['✕',91,9,'L','x','Fechar a janela'],['Foto da praia',45,22,'R','i','Ver as opções da imagem (copiar, salvar como)'],['Saiba mais',72,34,'L','t','Abrir o link Saiba mais'],['Salvar',72,50,'L','b','Salvar o documento'],['Iniciar',2,85,'L','b','Abrir o menu Iniciar'],['área vazia',45,69,'R','v','Ver as opções da área vazia (novo, atualizar)']],
M2=[['Pesquisar…',8,22,'L','f','Clicar no campo de busca para digitar','width:44%'],
['Entrar',84,22,'L','b','Apertar o botão Entrar'],
['Notícias do dia',8,36,'L','t','Abrir o link Notícias do dia'],
['texto selecionado',50,36,'R','s','Copiar o texto selecionado (menu de opções)'],
['Foto da capa',8,50,'R','i','Ver as opções da imagem (salvar imagem como)'],
['Comprar',50,54,'L','b','Apertar o botão Comprar'],
['Contato',72,54,'L','t','Abrir o link Contato'],
['espaço em branco',40,78,'R','v','Ver as opções da página (voltar, atualizar)','width:34%']],
M3=[['Voltar',4,12,'L','b','Voltar para a pasta anterior'],
['Nova pasta',16,12,'L','b','Apertar o botão Nova pasta'],
['✕',92,6,'L','x','Fechar a janela'],
['Fotos',6,32,'L','p','Abrir a pasta Fotos'],
['Músicas',26,32,'L','p','Abrir a pasta Músicas'],
['Trabalhos',46,32,'L','p','Abrir a pasta Trabalhos'],
['Receita.pdf',6,58,'R','a','Ver as opções do arquivo Receita.pdf (renomear, excluir)'],
['Lista.txt',26,58,'R','a','Ver as opções do arquivo Lista.txt (copiar, enviar)'],
['Planilha.xlsx',46,58,'R','a','Ver as opções do arquivo Planilha.xlsx (copiar, recortar)'],
['área vazia',68,40,'R','v','Ver as opções da pasta (novo, colar)','width:28%']],
M4=[['Salvar',5,15,'L','b','Apertar o botão Salvar'],
['Negrito',17,15,'L','b','Apertar o botão Negrito'],
['Desfazer',31,15,'L','b','Desfazer a última ação'],
['Imprimir',46,15,'L','b','Apertar o botão Imprimir'],
['✕',92,5,'L','x','Fechar o documento'],
['Prezado cliente,',16,36,'R','s','Copiar o texto selecionado (menu de opções)'],
['recebimeto',16,48,'R','e','Ver sugestões para a palavra com erro (sublinhada de vermelho)'],
['parágrafo em branco',16,62,'R','v','Ver as opções de colar neste parágrafo','width:36%'],
['Logo da empresa',58,38,'R','i','Ver as opções da imagem (tamanho, cortar)']],
MS=[0,M1,M2,M3,M4],
DEC=['','<i class="win"><b>Documento</b></i><i class="tbar"></i>',
'<i class="win" style="left:2%;top:3%;width:96%;height:94%"><b>Navegador</b></i><i class="ur" style="left:6%;top:10%;width:66%">www.exemplo.com.br</i>',
'<i class="win" style="left:2%;top:3%;width:96%;height:94%"><b>Documentos</b></i>',
'<i class="win" style="left:2%;top:3%;width:96%;height:94%"><b>Carta.docx</b></i><i class="tbar" style="left:3%;right:3%;top:11%;bottom:auto;height:15%;border:2px solid var(--bd);border-radius:6px"></i><i class="win" style="left:12%;top:30%;width:76%;height:66%;border-radius:2px"></i>'];
let DK=M1,mp=0,lv=0,n=0,err=0,t0=0,tgt=null,need='L',run=false,tk,tm,cur=-1,T=10,mode='L',sz=84,lim=0;
const secs=()=>(performance.now()-t0)/1000,key=i=>'tt-m-'+mp+'-'+i;
function ui(){
 mpB.innerHTML=MP.map((m,i)=>'<button type="button" data-k="'+i+'"'+(i==mp?' class="on"':'')+'>'+m+'</button>').join('');
 lvB.innerHTML=LV.map((l,i)=>'<button type="button" data-v="'+i+'"'+(i==lv?' class="on"':'')+'>Nível '+(i+1)+(ld(key(i))?' ✓':'')+'</button>').join('');
}
function build(){
 st.querySelectorAll('.mw').forEach(e=>e.remove());
 if(!mp)return;
 const w=document.createElement('div');w.className='mw';
 w.innerHTML=DEC[mp]+DK.map((d,i)=>'<button type="button" class="it k'+d[4]+'" data-i="'+i+'" style="left:'+d[1]+'%;top:'+d[2]+'%;'+(d[6]||'')+'">'+d[0]+'</button>').join('');
 st.insertBefore(w,ov);
}
function cfg(){[,mode,T,sz,lim]=LV[lv];if(mp)lim*=2}
function menu(h,x,l,f){
 run=false;clearInterval(tk);clearTimeout(tm);if(tgt){tgt.remove();tgt=null}
 mm.setAttribute('class','mouse');
 ov.innerHTML='<h3>'+h+'</h3>'+x+'<button type="button" class="go" id="mgo">'+l+'</button>';
 ov.hidden=false;$('#mgo').onclick=f||go;
}
function intro(){
 cfg();const b=ld(key(lv)),q=mp?'tarefas':'alvos';
 mh.textContent=dica;me.textContent=0;mn.textContent='0/'+T;mt.textContent='0.0s';
 menu('Nível '+(lv+1)+' · '+LV[lv][0],'<p>'+{L:'Só o botão esquerdo',R:'Só o botão direito',B:'Os dois botões, misturados'}[mode]+'. '+T+' '+q+(lim?', '+lim/1000+' s para cada.':', sem limite de tempo.')+'</p>'+(mp&&mode=='B'?'<p>Aqui você decide o botão pela tarefa.</p>':'')+(b?'<p class="best">Seu melhor tempo: '+b+'s</p>':''),'Começar');
}
function sel(){DK=MS[mp]||M1;ui();build();intro()}
mpB.onclick=e=>{const b=e.target.closest('button');if(b){mp=+b.dataset.k;sel()}};
lvB.onclick=e=>{const b=e.target.closest('button');if(b){lv=+b.dataset.v;sel()}};
function go(){
 n=0;err=0;cur=-1;run=true;ov.hidden=true;me.textContent=0;t0=performance.now();next();
 tk=setInterval(()=>{mt.textContent=secs().toFixed(1)+'s'},100);
}
function next(){
 clearTimeout(tm);
 if(n>=T)return fin();
 if(mp){
  const p=DK.map((d,i)=>i).filter(i=>i!=cur&&(mode=='B'||DK[i][3]==mode));
  cur=p[Math.random()*p.length|0];need=DK[cur][3];mh.textContent=(n+1)+'. '+DK[cur][5];
 }else{
  need=mode=='B'?(Math.random()<.5?'L':'R'):mode;
  if(!tgt){tgt=document.createElement('button');tgt.type='button';st.appendChild(tgt)}
  tgt.className='tg '+need;tgt.textContent=need=='L'?'ESQ':'DIR';
  tgt.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(4+Math.random()*(st.clientWidth-sz-8))+'px;top:'+(4+Math.random()*(st.clientHeight-sz-8))+'px';
  mh.textContent='Clique com o botão '+nm[need]+'.';
 }
 mm.setAttribute('class','mouse'+(mp&&mode=='B'?'':' '+need));mn.textContent=(n+1)+'/'+T;
 if(lim)tm=setTimeout(()=>{err++;me.textContent=err;n++;next();if(run)mh.textContent='Tempo esgotado. '+mh.textContent},lim);
}
function press(b,i){
 if(!run||!b)return;
 const e=mp?st.querySelector('[data-i="'+i+'"]'):tgt;
 if(mp?i==cur&&b==need:b==need){
  const r=document.createElement('i');r.className='burst '+need;
  r.style.left=e.offsetLeft+e.offsetWidth/2-42+'px';r.style.top=e.offsetTop+e.offsetHeight/2-42+'px';
  st.appendChild(r);setTimeout(()=>r.remove(),400);n++;next();
 }else{
  err++;me.textContent=err;
  mh.textContent=mp&&i!=cur?'Esse item é «'+DK[i][0]+'». A tarefa é: '+DK[cur][5]+'.':mp?'Item certo, mas use o botão '+nm[need]+(need=='L'?': ele abre e aperta.':': ele abre o menu de opções.'):'Esse alvo pede o botão '+nm[need]+'. Tente de novo.';
  e.classList.remove('bad');void e.offsetWidth;e.classList.add('bad');
 }
}
function fin(){
 const s=secs(),k=key(lv),b=parseFloat(ld(k)),last=lv>=LV.length-1;let m='';
 if(!b||s<b){sv(k,s.toFixed(1));m='<p class="best">Novo recorde neste nível!</p>'}
 menu('Nível concluído','<p><b>'+s.toFixed(1)+'s</b> para '+T+(mp?' tarefas':' alvos')+', com <b>'+err+'</b> '+(err==1?'erro':'erros')+'.</p>'+m,last?'Jogar de novo':'Próximo nível',last?go:()=>{lv++;ui();cfg();go()});
 ui();mt.textContent=s.toFixed(1)+'s';mh.textContent=dica;
}
st.addEventListener('pointerdown',e=>{const t=e.target.closest('.tg,.it');if(t)press(e.button==2?'R':e.button==0?'L':0,t.dataset.i)});
st.addEventListener('contextmenu',e=>e.preventDefault());
st.addEventListener('click',e=>{const t=e.target.closest('.tg,.it');if(!e.detail&&t)press('L',t.dataset.i)});
sel();
})();

/* Jogo 2: Chuva de Palavras */
(()=>{
const st=$('#ts'),ov=$('#to'),ti=$('#ti'),
A='mouse tela senha pasta menu texto site link rede wifi tecla enter login'.split(' '),
B='arquivo janela clique salvar copiar colar cursor pixel baixar abrir fechar email backup tablet'.split(' '),
C='teclado internet monitor excluir arrastar imprimir notebook pendrive impressora planilha programa desligar reiniciar atualizar navegador aplicativo'.split(' ');
let ws=[],lives=5,score=0,hits=0,keys=0,wrong=0,chars=0,prev=0,sp=0,run=false,raf=0,last=0,t0=0;
const lvl=()=>1+Math.floor(hits/8);
function hud(){
 $('#tp').textContent=score;$('#tl').textContent='●'.repeat(lives)+'○'.repeat(5-lives);
 $('#tn').textContent=lvl();$('#tb').textContent=ld('tt-t')||0;
}
function mark(v){
 ws.forEach(w=>{w.el.innerHTML=v&&w.t.startsWith(v)?'<u>'+w.t.slice(0,v.length)+'</u>'+w.t.slice(v.length):w.t});
}
function spawn(){
 const p=lvl()>2?A.concat(B,C):lvl()>1?A.concat(B):A;let t;
 for(let i=0;i<9;i++){t=p[Math.random()*p.length|0];if(!ws.some(w=>w.t==t))break}
 const el=document.createElement('span');el.className='wd';el.textContent=t;st.appendChild(el);
 el.style.left=4+Math.random()*Math.max(0,st.clientWidth-el.offsetWidth-8)+'px';
 ws.push({t,el,y:0});mark(ti.value.toLowerCase().trim());
}
function drop(w){
 if(!run)return;
 w.el.remove();ws.splice(ws.indexOf(w),1);lives--;hud();
 if(lives<1)end();
}
function loop(now){
 const dt=Math.min(.05,(now-last)/1000),H=st.clientHeight;last=now;sp-=dt;
 if(sp<=0){spawn();sp=Math.max(1.1,2.8-lvl()*.25)}
 ws.slice().forEach(w=>{w.y+=dt*(24+lvl()*9);w.el.style.transform='translateY('+w.y+'px)';if(w.y>H-44)drop(w)});
 if(run)raf=requestAnimationFrame(loop);
}
function start(){
 ws.forEach(w=>w.el.remove());ws=[];lives=5;score=0;hits=0;keys=0;wrong=0;chars=0;prev=0;sp=.3;run=true;
 ov.hidden=true;ti.disabled=false;ti.value='';ti.focus();hud();
 t0=last=performance.now();raf=requestAnimationFrame(loop);
}
function end(){
 run=false;cancelAnimationFrame(raf);ti.disabled=true;ti.classList.remove('err');
 const min=(performance.now()-t0)/6e4,ppm=chars&&min?Math.round(chars/5/min):0,
 acc=keys?Math.round((keys-wrong)/keys*100):100,b=+ld('tt-t')||0;
 let m='';if(score>b){sv('tt-t',score);m='<p class="best">Novo recorde!</p>'}
 hud();
 ov.innerHTML='<h3>Fim de jogo</h3><p><b>'+score+'</b> pontos · nível <b>'+lvl()+'</b></p><p>'+hits+' palavras · '+ppm+' palavras por minuto · '+acc+'% de acerto</p>'+m+'<button type="button" class="go" id="tgo">Jogar de novo</button>';
 ov.hidden=false;$('#tgo').onclick=start;
}
ti.oninput=()=>{
 if(!run)return;
 const v=ti.value.toLowerCase().trim(),n=ti.value.length;
 if(n>prev)keys++;
 const full=ws.filter(w=>w.t==v).sort((a,b)=>b.y-a.y)[0];
 if(full){
  chars+=v.length;hits++;score+=v.length*10;
  const e=full.el;e.classList.add('zap');setTimeout(()=>e.remove(),300);
  ws.splice(ws.indexOf(full),1);ti.value='';prev=0;ti.classList.remove('err');mark('');hud();return;
 }
 const ok=!v||ws.some(w=>w.t.startsWith(v));
 if(!ok&&n>prev)wrong++;
 prev=n;ti.classList.toggle('err',!ok);mark(v);
};
ov.innerHTML='<h3>Pronto para digitar?</h3><p>Dedos nos F e J. Cada palavra certa vale 10 pontos por letra. A cada 8 palavras o nível sobe e elas caem mais rápido.</p><button type="button" class="go" id="tgo">Começar</button>';
$('#tgo').onclick=start;hud();
})();
/* Jogo 3: Texto Cronometrado */
(()=>{
const dl=$('#dl'),dt=$('#dt'),dp=$('#dp'),de=$('#de'),dh=$('#dh'),dtb=$('#dtb'),tx=$('#dtx'),ov=$('#do'),kbd=$('#kbd'),
S='casa gato bola mesa livro tela mouse pasta rede tecla sol mar rio pao fogo lua vento amigo chave nuvem'.split(' '),
M='teclado janela arquivo internet salvar copiar colar cursor navegar escola caderno cozinha estrada bateria'.split(' '),
G='computador impressora aplicativo atualizar navegador mensagem ferramenta aprendizado fotografia caminhada telefone pesquisar digitando'.split(' '),
AL='abcdefghijklmnopqrstuvwxyzç',
W=S.concat(M,G,'porta tapete sala salada falar quase pouco tarde jogo rato pato prato queijo leite poeta dedo fato pera lado filho jaqueta papel torre trigo aula quatro projeto terra folha fortes ruas'.split(' ')),
TH=['casa mesa cadeira panela fogao geladeira prato copo faca garfo colher cozinha sofa janela porta quarto',
'escola caderno lapis caneta livro mochila professor aula prova lousa recreio giz nota merenda tarefa leitura',
'teclado mouse monitor tela cursor arquivo pasta salvar copiar colar impressora janela programa clique pendrive notebook',
'internet site link email senha login baixar perfil rede wifi busca mensagem navegador conta enviar pesquisa'],
SE=['o sol nasce cedo, e a casa acorda.','maria abre a janela, depois liga o computador.','salve o arquivo na pasta, antes de fechar o programa.','o mouse clica, o teclado escreve, e a tela mostra tudo.','aprender devagar e melhor do que correr e errar.','cada tecla tem seu dedo, e cada dedo tem seu lugar.','pesquise com calma, leia o texto e confira a fonte.','ontem eu digitei devagar, hoje eu digito mais rapido.'],
CH=['Fileira do meio','Fileira de cima','Fileira de baixo','Palavras do dia a dia','Frases com pontuação','Velocidade'],
LV=[['Indicadores',12,100,6,[0,'fjgh']],['Dedos do meio',12,95,6,[0,'fjghdk']],['Anelares',14,95,5,[0,'fjghdksl']],['Mindinhos',14,90,5,[0,'asdfghjklç'],1],
['Esquerda em cima',14,90,5,[0,'asdfghjklçqwert']],['Direita em cima',14,90,5,[0,'asdfghjklçyuiop']],['Cima e meio',14,85,4,[1,'asdfghjklçqwertyuiop']],['Desafio da fileira de cima',16,80,4,[1,'asdfghjklçqwertyuiop'],1],
['Esquerda embaixo',14,90,5,[0,'asdfghjklçzxcvb']],['Direita embaixo',14,90,5,[0,'asdfghjklçnm']],['Alfabeto inteiro',16,85,4,[1,AL]],['Desafio do alfabeto',18,80,4,[1,AL],1],
['Casa e cozinha',16,80,4,[2,0]],['Escola',18,78,4,[2,1]],['Computador',20,75,3,[2,2]],['Desafio da internet',20,70,3,[2,3],1],
['Frase curta',2,70,4,[3]],['Vírgula e ponto',3,80,4,[3]],['Textinho',4,100,3,[3]],['Desafio das frases',5,120,3,[3],1],
['Aquecimento veloz',20,60,3,[1,AL]],['Ritmo de escritório',24,65,3,[1,AL]],['Digitador veloz',27,65,2,[1,AL]],['Mestre do teclado',30,65,1,[1,AL],1],['Contra o Tempo · 30 s',150,30,0,[4]],['Contra o Tempo · 60 s',150,60,0,[4]],['Contra o Tempo · 120 s',150,120,0,[4]]],
R=['qwertyuiop','asdfghjklç','zxcvbnm,.'],F=[0,1,2,3,3,3,3,2,1,0],FN=['mindinho','anelar','médio','indicador'],
dica='Aperte qualquer tecla para testar o teclado.',sg=i=>+ld('tt-d-'+i)||0,ct=()=>lv>23,
fing=c=>{if(c==' ')return 'polegar';const r=R.findIndex(s=>s.includes(c)),j=R[r].indexOf(c);return FN[F[j]]+(j<5?' esquerdo':' direito')};
let cl=0,lv=0,txt='',wi=[],cs=[],ws=[],pos=0,tot=0,bad=0,er=new Set(),t0=0,run=false,iv=0;
kbd.innerHTML=R.map((r,i)=>'<div class="kr r'+i+'">'+[...r].map((c,j)=>'<i class="k f'+F[j]+'" data-k="'+c+'">'+c+'</i>').join('')+'</div>').join('')+'<div class="kr"><i class="k f4 sp" data-k="sp">espaço</i></div>';
function ui(){
 const all=ld('tt-d-all'),open=i=>all||i==0||sg(i-1)>0,bt=(i,t,x)=>'<button type="button" data-v="'+i+'"'+(i==lv?' class="on"':'')+(x?'':' disabled')+'>'+t+'</button>';
 dl.className='modes dg';
 dl.innerHTML='<div class="ch"><b>Modo</b><button type="button" data-t="0"'+(ct()?'':' class="on"')+'>Curso · 24 níveis</button><button type="button" data-t="1"'+(ct()?' class="on"':'')+'>Contra o Tempo</button></div>'+(ct()
  ?'<div class="ch"><b>Quanto tempo?</b>'+[24,25,26].map(i=>bt(i,LV[i][2]+' segundos'+(ld('tt-dw-'+i)?' · recorde '+ld('tt-dw-'+i):''),1)).join('')+'</div>'
  :CH.map((c,k)=>'<div class="ch"><b>'+(k+1)+'. '+c+'</b>'+[0,1,2,3].map(j=>{const i=k*4+j;return bt(i,(i+1)+(sg(i)?' '+'★'.repeat(sg(i)):''),open(i))}).join('')+'</div>').join('')+'<div class="ch"><button type="button" data-v="all">'+(all?'Voltar a bloquear níveis':'Liberar todos os níveis')+'</button></div>');
}
function stop(){run=false;clearInterval(iv)}
function menu(h,x,l,f){ov.innerHTML='<h3>'+h+'</h3>'+x+'<button type="button" class="go" id="dgo">'+l+'</button>';ov.hidden=false;$('#dgo').onclick=f||start}
function cur(){cs.forEach((c,i)=>c.classList.toggle('cur',run&&i==pos));if(run&&ct()&&cs[pos])tx.scrollTop=cs[pos].offsetTop-tx.clientHeight*.3}
function nxt(){
 kbd.querySelectorAll('.nx').forEach(e=>e.classList.remove('nx'));
 if(!run||pos>=txt.length){dh.textContent=dica;return}
 if(LV[lv][5]){dh.textContent='Desafio sem dicas: confie nos seus dedos.';return}
 const c=txt[pos],e=kbd.querySelector('[data-k="'+(c==' '?'sp':c)+'"]');
 if(e)e.classList.add('nx');
 dh.textContent='Próxima tecla: '+(c==' '?'espaço':c.toUpperCase())+' · '+fing(c);
}
function lit(k,ok){const e=kbd.querySelector('[data-k="'+(k==' '?'sp':k)+'"]');if(!e)return;e.classList.add('pr',ok?'ok':'bad');setTimeout(()=>e.classList.remove('pr','ok','bad'),160)}
function gen(l){
 const [k,a]=l[4],n=l[1];
 if(k==3)return SE.slice().sort(()=>Math.random()-.5).slice(0,n).join(' ');
 const p=k==2?TH[a].split(' '):k==4?W:k==1?W.filter(x=>[...x].every(c=>a.includes(c))):0,w=[];
 while(w.length<n){
  let x;
  if(p&&p.length>5)x=p[Math.random()*p.length|0];
  else{x='';for(let i=0,L=3+(Math.random()*3|0);i<L;i++)x+=a[Math.random()*a.length|0]}
  if(x!=w[w.length-1])w.push(x);
 }
 return w.join(' ');
}
function intro(){
 stop();const l=LV[lv],k=l[4][0];tx.innerHTML='';dt.textContent=l[2]+' s';dp.textContent=0;de.textContent=ct()?'0':'0/'+l[3];dtb.style.width='100%';nxt();
 if(ct())return menu(l[0],'<p>Digite o máximo de palavras que conseguir em '+l[2]+' segundos. Não há limite de erros: tecla errada não avança, só faz você perder tempo.</p><p>O tempo só começa na primeira tecla.</p>'+(ld('tt-dw-'+lv)?'<p class="best">Seu recorde: '+ld('tt-dw-'+lv)+' palavras</p>':''),'Começar');
 menu('Nível '+(lv+1)+' · '+l[0],'<p>Capítulo '+((lv>>2)+1)+': '+CH[lv>>2]+'</p><p>'+(k?'':'Teclas: '+[...l[4][1]].map(c=>c.toUpperCase()).join(' ')+'. ')+l[1]+' '+['sequências','palavras','palavras','frases'][k]+' em '+l[2]+' segundos. Máximo de '+l[3]+(l[3]==1?' palavra errada':' palavras erradas')+'.</p>'+(l[5]?'<p><b>Desafio:</b> o teclado não mostra a próxima tecla.</p>':'')+'<p>O tempo só começa na primeira tecla.</p>'+(sg(lv)?'<p class="best">Seu melhor: '+'★'.repeat(sg(lv))+' · '+ld('tt-dp-'+lv)+' ppm</p>':''),'Começar');
}
function start(){
 const l=LV[lv],w=gen(l).split(' ');
 txt=w.join(' ');wi=[];let h='';
 w.forEach((x,k)=>{h+='<span class="w">'+[...x].map(c=>'<span class="c">'+c+'</span>').join('')+'</span>';[...x].forEach(()=>wi.push(k));if(k<w.length-1){h+='<span class="c"> </span>';wi.push(k)}});
 tx.className='txt'+(ct()?' ct':'');tx.innerHTML=h;tx.scrollTop=0;cs=[...tx.querySelectorAll('.c')];ws=[...tx.querySelectorAll('.w')];
 pos=0;tot=0;bad=0;er=new Set();t0=0;run=true;ov.hidden=true;ui();
 dt.textContent=l[2]+' s';dp.textContent=0;de.textContent=ct()?'0':'0/'+l[3];dtb.style.width='100%';
 if(document.activeElement)document.activeElement.blur();
 clearInterval(iv);iv=setInterval(tick,100);cur();nxt();
}
function endCT(){
 stop();nxt();cur();
 const l=LV[lv],el=Math.min(l[2],(performance.now()-t0)/1000),full=pos>=txt.length,
 words=txt.slice(0,pos).split(' ').length-1+(full?1:0),ppm=Math.round(pos/5/(el/60)),acc=tot?Math.round((tot-bad)/tot*100):100;
 let m='';
 if(words>(+ld('tt-dw-'+lv)||0)){sv('tt-dw-'+lv,words);m='<p class="best">Novo recorde para '+l[2]+' segundos!</p>'}
 menu(full?'Você zerou o texto!':'Tempo!','<p class="best">'+words+(words==1?' palavra':' palavras')+'</p><p><b>'+ppm+'</b> palavras por minuto · <b>'+acc+'%</b> de precisão</p><p>'+['Iniciante','Aprendiz','Bom ritmo','Rápido','Veloz'][Math.min(4,ppm/15|0)]+' · '+er.size+(er.size==1?' palavra':' palavras')+' com erro</p>'+m,'Jogar de novo');
 ui();
}
function tick(){
 if(!t0)return;
 const l=LV[lv],el=(performance.now()-t0)/1000,left=Math.max(0,l[2]-el);
 dt.textContent=Math.ceil(left)+' s';dtb.style.width=left/l[2]*100+'%';dp.textContent=el>3?Math.round(pos/5/(el/60)):0;
 if(left<=0)ct()?endCT():end(0,'O tempo acabou: você digitou '+(txt.slice(0,pos).split(' ').length-1)+' de '+txt.split(' ').length+' palavras.');
}
function end(win,msg){
 stop();nxt();cur();
 const l=LV[lv],el=(performance.now()-t0)/1000,left=Math.max(0,l[2]-el);
 if(!win)return menu('Não foi dessa vez','<p>'+msg+'</p>','Tentar de novo');
 const ppm=Math.round(txt.length/5/(el/60)),acc=Math.round((tot-bad)/tot*100),s=1+(er.size<=Math.floor(l[3]/2)?1:0)+(left>=l[2]*.25?1:0),last=lv>=23;
 let m='';
 if(s>sg(lv))sv('tt-d-'+lv,s);
 if(ppm>(+ld('tt-dp-'+lv)||0)){sv('tt-dp-'+lv,ppm);m='<p class="best">Novo recorde de velocidade!</p>'}
 menu('Texto concluído!','<p class="best">'+'★'.repeat(s)+'</p><p><b>'+ppm+'</b> palavras por minuto · <b>'+acc+'%</b> de precisão</p><p>'+er.size+' de '+l[3]+' erros permitidos · sobraram '+left.toFixed(0)+' s</p>'+m+(lv%4==3?'<p class="best">Capítulo “'+CH[lv>>2]+'” concluído!</p>':'')+(last?'<p class="best">Você zerou os 24 níveis!</p>':''),last?'Jogar de novo':'Próximo nível',last?start:()=>{lv++;start()});
 ui();
}
document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||/INPUT|TEXTAREA/.test(e.target.tagName))return;
 const k=e.key.length==1?e.key.toLowerCase():'';
 if(!k)return;
 const ok=!run||k==txt[pos];
 if(/^[a-zç,. ]$/.test(k))lit(k,ok);
 if(!run)return;
 e.preventDefault();
 if(!t0)t0=performance.now();
 tot++;
 if(ok){cs[pos].classList.add('dn');pos++;cur();nxt();if(pos>=txt.length)ct()?endCT():end(1)}
 else{
  bad++;const w=wi[pos],mx=LV[lv][3];
  if(!er.has(w)){er.add(w);ws[w].classList.add('er');de.textContent=er.size+(ct()?'':'/'+mx);if(!ct()&&er.size>mx)end(0,'Você passou do limite: o máximo era '+mx+(mx==1?' palavra errada.':' palavras erradas.'))}
 }
});
dl.onclick=e=>{const b=e.target.closest('button');if(b){if(b.dataset.t)lv=b.dataset.t=='1'?25:cl;else if(b.dataset.v=='all')sv('tt-d-all',ld('tt-d-all')?'':'1');else lv=+b.dataset.v;if(lv<24)cl=lv;ui();intro()}};
$('#dnote').hidden=!matchMedia('(pointer:coarse)').matches;
ui();intro();
})();
