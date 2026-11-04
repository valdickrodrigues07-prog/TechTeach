'use strict';

/* ===== Edições ===== */
const CONFIG = {
  whatsapp: '(11) 96769 6884',
  whatsappTexto: 'Olá! Vim pelo site da Tech Teach e gostaria de saber mais.',
  email: 'Valprograming07@outlook.com,
  jogosUrl: ''    // link da página dos jogos
};

document.addEventListener('DOMContentLoaded', () => {
  /* Contatos: preenche links e textos a partir da CONFIG */
  let wa = CONFIG.whatsapp.replace(/\D/g, '');
  if (wa && wa.length <= 11) wa = '55' + wa;
  const links = {
    whatsapp: wa && `https://wa.me/${wa}?text=${encodeURIComponent(CONFIG.whatsappTexto)}`,
    email: CONFIG.email && `mailto:${CONFIG.email}`,
    jogos: CONFIG.jogosUrl
  };
  const textos = {
    whatsapp: wa && wa.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3'),
    email: CONFIG.email
  };
  document.querySelectorAll('[data-contact]').forEach(el => {
    const k = el.dataset.contact;
    if (links[k]) el.href = links[k];
    if (el.hasAttribute('data-show') && textos[k]) el.textContent = textos[k];
  });

  /* Menu no celular */
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  const setMenu = aberto => {
    menu.classList.toggle('open', aberto);
    btn.setAttribute('aria-expanded', String(aberto));
  };
  btn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Destaca no menu a seção que está na tela */
  const itens = new Map(
    [...menu.querySelectorAll('a[href^="#"]:not(.btn)')].map(a => [a.getAttribute('href').slice(1), a])
  );
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (!en.isIntersecting || !itens.has(en.target.id)) return;
      itens.forEach(a => a.classList.remove('active'));
      itens.get(en.target.id).classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => observador.observe(s));

  /* Ano do rodapé */
  document.getElementById('ano').textContent = new Date().getFullYear();
});
