// Conecte os endereços dos jogos publicados nestas três opções.
const GAME_LINKS = {
  handware: "",
  mounthard: "",
  farheavens: ""
};

const notice = document.getElementById('notice');
const cards = [...document.querySelectorAll('.game-card')];
let noticeTimer;
let selectedCard = null;

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add('show');
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.classList.remove('show'), 2800);
}

function selectCard(card) {
  cards.forEach(item => {
    const active = item === card;
    item.classList.toggle('selected', active);
    item.setAttribute('aria-pressed', String(active));
  });
  selectedCard = card;
  const title = card.querySelector('h3')?.textContent || 'jogo';
  showNotice(`${title} selecionado. Use o botão para entrar.`);
}

cards.forEach(card => {
  card.setAttribute('aria-pressed', 'false');
  card.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    selectCard(card);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target === card) {
        event.preventDefault();
        selectCard(card);
      }
    }
  });
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  });
});

document.querySelectorAll('[data-game]').forEach(link => {
  link.addEventListener('click', event => {
    const key = link.dataset.game;
    const destination = GAME_LINKS[key];
    if (!destination) {
      event.preventDefault();
      const name = link.textContent.trim().replace(/^Jogar\\s*/, '');
      showNotice(`${name}: endereço do jogo ainda não conectado.`);
      return;
    }
    link.href = destination;
  });
});

// Atalhos de teclado: 1 a 4 selecionam uma trilha.
document.addEventListener('keydown', event => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
  const index = Number(event.key) - 1;
  if (index >= 0 && index < cards.length) selectCard(cards[index]);
  if (event.key === 'Escape' && selectedCard) {
    selectedCard.classList.remove('selected');
    selectedCard.setAttribute('aria-pressed', 'false');
    selectedCard = null;
    showNotice('Seleção removida.');
  }
});
