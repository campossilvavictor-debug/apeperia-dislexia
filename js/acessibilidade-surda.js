
(() => {
  const root = document.documentElement;
  const body = document.body;
  const status = document.getElementById('mensagemAcessibilidade');
  let scale = 1;
  const announce = (message) => {
    if (status) status.textContent = message;
  };

  document.getElementById('aumentarFonte')?.addEventListener('click', () => {
    scale = Math.min(1.4, +(scale + 0.1).toFixed(2));
    root.style.setProperty('--acessibilidade-fonte', scale);
    announce(`Tamanho do texto aumentado para ${Math.round(scale * 100)} por cento.`);
  });
  document.getElementById('diminuirFonte')?.addEventListener('click', () => {
    scale = Math.max(0.8, +(scale - 0.1).toFixed(2));
    root.style.setProperty('--acessibilidade-fonte', scale);
    announce(`Tamanho do texto ajustado para ${Math.round(scale * 100)} por cento.`);
  });
  document.getElementById('altoContraste')?.addEventListener('click', (event) => {
    const active = body.classList.toggle('alto-contraste');
    event.currentTarget.setAttribute('aria-pressed', String(active));
    announce(active ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
  });
  document.getElementById('ativarAlertas')?.addEventListener('click', (event) => {
    const active = body.classList.toggle('alertas-visuais');
    event.currentTarget.setAttribute('aria-pressed', String(active));
    event.currentTarget.textContent = `Alertas visuais: ${active ? 'ligados' : 'desligados'}`;
    announce(active ? 'Alertas visuais ligados. Avisos importantes serão destacados na tela.' : 'Alertas visuais desligados.');
  });
  document.getElementById('resetAcessibilidade')?.addEventListener('click', () => {
    scale = 1;
    root.style.setProperty('--acessibilidade-fonte', 1);
    body.classList.remove('alto-contraste', 'alertas-visuais');
    document.getElementById('altoContraste')?.setAttribute('aria-pressed', 'false');
    const alerts = document.getElementById('ativarAlertas');
    if (alerts) { alerts.setAttribute('aria-pressed', 'false'); alerts.textContent = 'Alertas visuais: desligados'; }
    announce('Preferências de acessibilidade restauradas.');
  });

  function showVisualAlert(message) {
    document.querySelector('.alerta-tela')?.remove();
    const box = document.createElement('div');
    box.className = 'alerta-tela';
    box.setAttribute('role', 'alert');
    box.innerHTML = `<span></span><button type="button">Fechar</button>`;
    box.querySelector('span').textContent = message;
    box.querySelector('button').addEventListener('click', () => box.remove());
    document.body.appendChild(box);
    box.querySelector('button').focus();
  }
  document.getElementById('testarAlerta')?.addEventListener('click', () => {
    showVisualAlert('Este é um exemplo de aviso visual. Nenhum som é necessário para receber esta mensagem.');
    announce('Alerta visual de demonstração exibido na tela.');
  });

  document.getElementById('abrirLibras')?.addEventListener('click', () => {
    const widgetButton = document.querySelector('[vw-access-button]');
    if (widgetButton) {
      widgetButton.click();
      announce('O assistente VLibras foi acionado. Se não abrir, procure o ícone de Libras no canto da tela.');
    } else {
      announce('O assistente VLibras não carregou. Verifique sua conexão com a internet ou use o ícone quando estiver disponível.');
    }
  });

  document.getElementById('formContato')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = document.getElementById('retornoFormulario');
    if (feedback) feedback.textContent = 'Demonstração: formulário validado no navegador. Para enviar mensagens de verdade, é necessário conectar este formulário a um serviço ou backend.';
    showVisualAlert('Formulário de demonstração preenchido. Nenhuma mensagem foi enviada.');
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
