(() => {
  const body = document.body;
  const status = document.getElementById('mensagemAutismo');
  const announce = (text) => { if (status) status.textContent = text; };
  const calm = document.getElementById('modoCalmo');
  const motion = document.getElementById('reduzirMovimento');
  function setCalm(active) {
    body.classList.toggle('modo-calmo', active);
    calm?.setAttribute('aria-pressed', String(active));
    if (calm) calm.textContent = `Modo calmo: ${active ? 'ligado' : 'desligado'}`;
    announce(active ? 'Modo calmo ativado.' : 'Modo calmo desativado.');
  }
  calm?.addEventListener('click', () => setCalm(!body.classList.contains('modo-calmo')));
  document.getElementById('atalhoModoCalmo')?.addEventListener('click', () => setCalm(!body.classList.contains('modo-calmo')));
  motion?.addEventListener('click', () => {
    const active = body.classList.toggle('reduzir-movimento');
    motion.setAttribute('aria-pressed', String(active));
    motion.textContent = active ? 'Movimentos reduzidos: ligado' : 'Reduzir movimentos';
    announce(active ? 'Animações e transições foram reduzidas.' : 'Redução de movimentos desativada.');
  });
  const list = document.getElementById('listaRotina');
  const progress = document.getElementById('progressoRotina');
  function updateProgress() {
    if (!list || !progress) return;
    const checks = [...list.querySelectorAll('input[type="checkbox"]')];
    const done = checks.filter(c => c.checked).length;
    progress.textContent = `${done} de ${checks.length} atividades concluídas.`;
  }
  list?.addEventListener('change', updateProgress);
  document.getElementById('adicionarTarefa')?.addEventListener('click', () => {
    const input = document.getElementById('novaTarefa');
    const value = input?.value.trim();
    if (!value || !list) { announce('Digite o nome da atividade antes de adicionar.'); input?.focus(); return; }
    const li = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox';
    const span = document.createElement('span'); span.textContent = value;
    label.append(checkbox, span); li.append(label); list.append(li);
    input.value = ''; updateProgress(); announce(`Atividade adicionada: ${value}.`); input.focus();
  });
  document.getElementById('limparRotina')?.addEventListener('click', () => {
    list?.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
    updateProgress(); announce('As atividades foram desmarcadas.');
  });
  const steps = [
    ['Leia o que precisa ser feito','Comece lendo o objetivo da atividade. Não é necessário fazer tudo de uma vez.'],
    ['Separe o que será necessário','Reúna os materiais ou informações de que você precisa.'],
    ['Faça uma parte por vez','Concentre-se apenas na próxima ação. Faça uma pausa se desejar.'],
    ['Confira e finalize','Veja se concluiu o que queria. Você pode pedir ajuda ou repetir uma etapa.']
  ];
  let current = 0;
  const previous = document.getElementById('etapaAnterior');
  const next = document.getElementById('proximaEtapa');
  function renderStep() {
    document.getElementById('contadorEtapa').textContent = `Etapa ${current + 1} de ${steps.length}`;
    document.getElementById('numeroEtapa').textContent = String(current + 1).padStart(2, '0');
    document.getElementById('tituloEtapa').textContent = steps[current][0];
    document.getElementById('textoEtapa').textContent = steps[current][1];
    previous.disabled = current === 0; next.disabled = current === steps.length - 1;
  }
  previous?.addEventListener('click', () => { if (current > 0) current--; renderStep(); });
  next?.addEventListener('click', () => { if (current < steps.length - 1) current++; renderStep(); });
  document.querySelectorAll('[data-frase]').forEach(button => button.addEventListener('click', async () => {
    const phrase = button.dataset.frase;
    const feedback = document.getElementById('retornoComunicacao');
    try { await navigator.clipboard.writeText(phrase); if (feedback) feedback.textContent = `Frase copiada: “${phrase}”`; }
    catch { if (feedback) feedback.textContent = `Frase selecionada: “${phrase}” — selecione e copie o texto manualmente.`; }
  }));
  document.getElementById('resetAcessibilidade')?.addEventListener('click', () => {
    setCalm(false); body.classList.remove('reduzir-movimento');
    motion?.setAttribute('aria-pressed', 'false'); if (motion) motion.textContent = 'Reduzir movimentos';
  });
  renderStep(); updateProgress();
})();
