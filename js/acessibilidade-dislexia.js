(() => {
 const body=document.body, status=document.getElementById('mensagemDislexia'), say=t=>{if(status)status.textContent=t;};
 const toggle=(id,cls,on,off)=>{const b=document.getElementById(id);b?.addEventListener('click',()=>{const active=body.classList.toggle(cls);b.setAttribute('aria-pressed',String(active));b.textContent=active?on:off;say(active?on+' ativado.':off+' restaurado.');});};
 toggle('modoLeitura','dislexia-apoio','Apoio à leitura: ligado','Apoio à leitura');
 toggle('espacamentoLinhas','espacamento-linhas','Espaço entre linhas: aumentado','Aumentar espaço entre linhas');
 toggle('espacamentoLetras','espacamento-letras','Espaço entre letras: aumentado','Aumentar espaço entre letras');
 toggle('fundoSuave','fundo-dislexia','Fundo suave: ligado','Ativar fundo suave');
 toggle('destacarParagrafos','destacar-paragrafos','Destaque de parágrafo: ligado','Destacar parágrafo ao apontar');
 const font=document.getElementById('fonteLeitura');font?.addEventListener('change',()=>{body.classList.remove('fonte-atkinson','fonte-opendyslexic');if(font.value==='atkinson')body.classList.add('fonte-atkinson');if(font.value==='opendyslexic')body.classList.add('fonte-opendyslexic');say('Fonte de leitura atualizada.');});
 const ruler=document.createElement('div');ruler.id='reguaLeituraOverlay';ruler.setAttribute('aria-hidden','true');document.body.append(ruler);
 const rulerBtn=document.getElementById('reguaLeitura');rulerBtn?.addEventListener('click',()=>{const active=ruler.classList.toggle('ativa');rulerBtn.setAttribute('aria-pressed',String(active));rulerBtn.textContent=active?'Régua de leitura: ligada':'Régua de leitura';say(active?'Régua ativada. Mova o ponteiro para acompanhar a linha.':'Régua desativada.');});
 document.addEventListener('mousemove',e=>{if(ruler.classList.contains('ativa'))ruler.style.top=Math.max(0,Math.min(innerHeight-40,e.clientY-18))+'px';});
 const speech=window.speechSynthesis;let utterance=null;
 function read(text){if(!speech){say('Este navegador não oferece leitura em voz alta.');return;}if(!text.trim()){say('Selecione um texto ou use a leitura do conteúdo principal.');return;}speech.cancel();utterance=new SpeechSynthesisUtterance(text);utterance.lang='pt-BR';utterance.onstart=()=>say('Leitura em andamento.');utterance.onend=()=>say('Leitura concluída.');utterance.onerror=()=>say('Não foi possível concluir a leitura neste dispositivo.');speech.speak(utterance);}
 function mainText(){const main=document.querySelector('main');return main?main.innerText:'';}
 ['lerPagina','lerPaginaAtalho'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>read(mainText())));
 document.getElementById('lerSelecao')?.addEventListener('click',()=>read(window.getSelection()?.toString()||''));
 ['pararLeitura','pararLeituraAtalho'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>{speech?.cancel();say('Leitura interrompida.');}));
 document.getElementById('pausarLeitura')?.addEventListener('click',()=>{if(!speech)return;if(speech.paused){speech.resume();say('Leitura retomada.');}else if(speech.speaking){speech.pause();say('Leitura pausada.');}else say('Inicie uma leitura primeiro.');});
 document.getElementById('resetAcessibilidade')?.addEventListener('click',()=>{body.classList.remove('dislexia-apoio','fonte-atkinson','fonte-opendyslexic','espacamento-linhas','espacamento-letras','fundo-dislexia','destacar-paragrafos');if(font)font.value='padrao';[...document.querySelectorAll('#modoLeitura,#espacamentoLinhas,#espacamentoLetras,#fundoSuave,#destacarParagrafos')].forEach(b=>b?.setAttribute('aria-pressed','false'));if(rulerBtn){ruler.classList.remove('ativa');rulerBtn.setAttribute('aria-pressed','false');rulerBtn.textContent='Régua de leitura';}speech?.cancel();say('Apoios de leitura restaurados.');});
})();
