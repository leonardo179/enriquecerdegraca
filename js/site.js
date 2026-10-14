/* Enriquecer passo a passo — comportamento comum a todas as páginas.
   Nada aqui envia dados a servidor; o progresso da trilha fica só no seu navegador. */

/* ===== Rastreamento de clique para baixar (plugar a conversão do Google Ads aqui) ===== */
window.rastrearDownload = function (origem) {
  if (!window.gtag) return;
  gtag('event', 'clique_baixar', { origem: origem });
  // Conversão do Google Ads "Site - clique Baixar GoTask".
  gtag('event', 'conversion', { send_to: 'AW-18362638900/M_80CNy7gZ0dELTE_rNE' });
};

(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.remove('sem-js');
  var reduzMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== Ícones (traços no estilo Lucide, SVG inline) ===== */
  var ICONES = {
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    'wallet': '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    'piggy': '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>',
    'calendar': '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    'calendar-check': '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    'trending-down': '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'card': '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    'mic': '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'eye-off': '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
    'cloud': '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    'book': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'scissors': '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    'pie': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    'buoy': '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    'repeat': '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    'cap': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    'plane': '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    'alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'coins': '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'minus': '<path d="M5 12h14"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'phone': '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    'sparkles': '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    'grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    'truck': '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    'palette': '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/>',
    'bag': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    'utensils': '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    'laptop': '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
    'camera': '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'message': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    'calculator': '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    'clipboard': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    'receipt': '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    'reset': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'zap': '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    'list': '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    'gift': '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'map': '<path d="M14.1 4.1 9.9 2 2 5.6v16.4l7.9-3.6 4.2 2.1 7.9-3.6V.5z"/><path d="M9.9 2v16.4"/><path d="M14.1 4.1v16.4"/>',
    'briefcase': '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    'smile': '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    'play': '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'
  };
  function desenharIcones(raiz) {
    (raiz || document).querySelectorAll('i[data-i]').forEach(function (el) {
      var p = ICONES[el.getAttribute('data-i')];
      if (!p) return;
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('class', 'i' + (el.className ? ' ' + el.className : ''));
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      svg.innerHTML = p;
      el.parentNode.replaceChild(svg, el);
    });
  }
  window.desenharIcones = desenharIcones;
  desenharIcones();

  /* ===== Cliques para a Play Store ===== */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-origem]');
    if (!a) return;
    var origem = a.getAttribute('data-origem');
    window.rastrearDownload(origem);
    // Se o gtag estiver plugado, segura a navegação um instante para o evento sair.
    var abreNovaAba = e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1 || a.target === '_blank';
    if (window.gtag && !abreNovaAba) {
      e.preventDefault();
      var foi = false;
      var ir = function () { if (!foi) { foi = true; window.location.href = a.href; } };
      setTimeout(ir, 350);
    }
  });

  /* ===== Menu do celular ===== */
  var btnMenu = document.querySelector('.btn-menu');
  var gaveta = document.getElementById('gaveta');
  if (btnMenu && gaveta) {
    var fechar = function () {
      gaveta.classList.remove('aberta');
      btnMenu.setAttribute('aria-expanded', 'false');
      btnMenu.setAttribute('aria-label', 'Abrir menu');
    };
    btnMenu.addEventListener('click', function () {
      var abre = !gaveta.classList.contains('aberta');
      gaveta.classList.toggle('aberta', abre);
      btnMenu.setAttribute('aria-expanded', String(abre));
      btnMenu.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
    });
    gaveta.addEventListener('click', function (e) { if (e.target.closest('a')) fechar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
  }

  /* ===== Topo, progresso de leitura e CTA fixo ===== */
  var topo = document.querySelector('.topo');
  var barra = document.querySelector('.progresso-leitura');
  var ctaFixo = document.querySelector('.cta-fixo');
  var hero = document.querySelector('.hero, .cab-pagina');
  var ctaFinal = document.querySelector('.cta-final');
  var agendado = false;
  function aoRolar() {
    agendado = false;
    var y = window.scrollY || window.pageYOffset;
    if (topo) topo.classList.toggle('rolou', y > 8);
    if (barra) {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.transform = 'scaleX(' + (total > 0 ? Math.min(1, y / total) : 0) + ')';
    }
    if (ctaFixo) {
      var passouHero = hero ? hero.getBoundingClientRect().bottom < 0 : y > 500;
      var noFinal = ctaFinal ? ctaFinal.getBoundingClientRect().top < window.innerHeight : false;
      ctaFixo.classList.toggle('visivel', passouHero && !noFinal);
    }
  }
  window.addEventListener('scroll', function () {
    if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  aoRolar();

  /* ===== Animações de entrada + contadores ===== */
  function animarNumero(el) {
    var alvo = parseFloat(el.getAttribute('data-contar'));
    var pre = el.getAttribute('data-pre') || '';
    var suf = el.getAttribute('data-suf') || '';
    if (reduzMovimento) { el.textContent = pre + alvo + suf; return; }
    var ini = null, dur = 1100;
    function passo(t) {
      if (!ini) ini = t;
      var p = Math.min(1, (t - ini) / dur);
      var v = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      el.textContent = pre + v + suf;
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  var revelaveis = document.querySelectorAll('.revela, [data-contar]');
  if ('IntersectionObserver' in window && !reduzMovimento) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.hasAttribute('data-contar')) animarNumero(el);
        el.classList.add('visto');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revelaveis.forEach(function (el) { io.observe(el); });
  } else {
    revelaveis.forEach(function (el) {
      el.classList.add('visto');
      if (el.hasAttribute('data-contar')) animarNumero(el);
    });
  }

  /* ===== Cartões que abrem (problemas) ===== */
  document.querySelectorAll('.dor').forEach(function (b) {
    var corpo = document.getElementById(b.getAttribute('aria-controls'));
    if (corpo) corpo.setAttribute('inert', '');
    b.addEventListener('click', function () {
      var abre = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(abre));
      if (b.parentNode) b.parentNode.classList.toggle('aberto', abre);
      if (corpo) { if (abre) corpo.removeAttribute('inert'); else corpo.setAttribute('inert', ''); }
    });
  });

  /* ===== Ver mais ===== */
  document.querySelectorAll('.btn-vermais').forEach(function (b) {
    var alvo = document.getElementById(b.getAttribute('aria-controls'));
    if (!alvo) return;
    var txtFechado = b.querySelector('span').textContent;
    b.addEventListener('click', function () {
      var abre = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(abre));
      alvo.classList.toggle('aberto', abre);
      alvo.setAttribute('aria-hidden', String(!abre));
      if (abre) alvo.removeAttribute('inert'); else alvo.setAttribute('inert', '');
      b.querySelector('span').textContent = abre ? 'Ver menos' : txtFechado;
    });
  });

  /* ===== Abas genéricas (role=tablist) ===== */
  document.querySelectorAll('[role="tablist"][data-abas]').forEach(function (lista) {
    var abas = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
    function ativar(aba, foco) {
      abas.forEach(function (a) {
        var sel = a === aba;
        a.setAttribute('aria-selected', String(sel));
        a.tabIndex = sel ? 0 : -1;
        var p = document.getElementById(a.getAttribute('aria-controls'));
        if (p) {
          p.hidden = !sel;
          if (sel) { p.classList.remove('entra'); void p.offsetWidth; p.classList.add('entra'); }
        }
      });
      if (foco) aba.focus();
      var ev = lista.getAttribute('data-abas');
      if (ev) document.dispatchEvent(new CustomEvent('aba:' + ev, { detail: aba }));
    }
    abas.forEach(function (a, i) {
      a.addEventListener('click', function () { ativar(a); });
      a.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = abas[(i + 1) % abas.length];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = abas[(i - 1 + abas.length) % abas.length];
        if (e.key === 'Home') n = abas[0];
        if (e.key === 'End') n = abas[abas.length - 1];
        if (n) { e.preventDefault(); ativar(n, true); }
      });
    });
    lista._ativar = ativar;
  });

  /* links que abrem uma aba específica (ex.: simulador de meta) */
  document.addEventListener('click', function (e) {
    var l = e.target.closest && e.target.closest('[data-ir-aba]');
    if (!l) return;
    var aba = document.getElementById(l.getAttribute('data-ir-aba'));
    var lista = aba && aba.closest('[role="tablist"]');
    if (lista && lista._ativar) lista._ativar(aba);
  });

  /* ===== Trilha do passo a passo ===== */
  var trilha = document.querySelector('[data-trilha]');
  if (trilha) {
    var CHAVE = 'enriquecer_trilha_v1';
    var feitos = {};
    try { feitos = JSON.parse(localStorage.getItem(CHAVE) || '{}') || {}; } catch (e) { feitos = {}; }
    var botoes = Array.prototype.slice.call(trilha.querySelectorAll('.passo-btn'));
    var barraT = document.querySelector('.trilha-progresso .barra i');
    var txtT = document.querySelector('.trilha-progresso [data-feitos]');
    function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify(feitos)); } catch (e) {} }
    function atualizarProgresso() {
      var n = 0;
      botoes.forEach(function (b) {
        var id = b.getAttribute('data-passo');
        var f = !!feitos[id];
        if (f) n++;
        b.classList.toggle('feito', f);
        var lbl = b.querySelector('.sr-only');
        if (lbl) lbl.textContent = f ? ' (concluído)' : '';
        var chk = document.querySelector('input[data-marcar="' + id + '"]');
        if (chk) chk.checked = f;
      });
      if (barraT) barraT.style.width = (n / botoes.length * 100) + '%';
      if (txtT) txtT.textContent = n;
    }
    function abrirPasso(b, rolar) {
      botoes.forEach(function (x) {
        var sel = x === b;
        x.setAttribute('aria-selected', String(sel));
        x.tabIndex = sel ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) { p.hidden = !sel; if (sel) { p.classList.remove('entra'); void p.offsetWidth; p.classList.add('entra'); } }
      });
      if (b.scrollIntoView && window.innerWidth < 960) {
        var lista = b.closest('.passos-lista');
        if (lista) lista.scrollTo({ left: b.parentNode.offsetLeft - 16, behavior: reduzMovimento ? 'auto' : 'smooth' });
      }
      if (rolar) {
        var painel = document.getElementById(b.getAttribute('aria-controls'));
        var topoP = painel.getBoundingClientRect().top + window.scrollY - 140;
        if (painel.getBoundingClientRect().top < 70 || painel.getBoundingClientRect().top > window.innerHeight * .6) {
          window.scrollTo({ top: topoP, behavior: reduzMovimento ? 'auto' : 'smooth' });
        }
      }
    }
    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () { abrirPasso(b); });
      b.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = botoes[Math.min(botoes.length - 1, i + 1)];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = botoes[Math.max(0, i - 1)];
        if (n) { e.preventDefault(); abrirPasso(n); n.focus(); }
      });
    });
    trilha.addEventListener('click', function (e) {
      var nav = e.target.closest('[data-ir]');
      if (!nav) return;
      var alvo = botoes[parseInt(nav.getAttribute('data-ir'), 10) - 1];
      if (alvo) abrirPasso(alvo, true);
    });
    trilha.addEventListener('change', function (e) {
      var c = e.target.closest('input[data-marcar]');
      if (!c) return;
      feitos[c.getAttribute('data-marcar')] = c.checked;
      salvar();
      atualizarProgresso();
    });
    // link externo para um passo específico (ex.: resultado do diagnóstico)
    window.abrirPassoTrilha = function (n) {
      var b = botoes[n - 1];
      if (b) { abrirPasso(b); document.getElementById('passo-a-passo').scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth' }); }
    };
    atualizarProgresso();
  }

  /* ===== Vitrine do app: troca a captura conforme a aba ===== */
  document.addEventListener('aba:app', function (e) {
    var img = document.getElementById('vitrine-img');
    var src = e.detail.getAttribute('data-img');
    if (img && src) { img.src = src; img.alt = e.detail.getAttribute('data-alt') || img.alt; }
  });

  /* ===== Filtros da página de renda extra ===== */
  var filtros = document.querySelector('[data-filtros]');
  if (filtros) {
    var cards = document.querySelectorAll('[data-tags]');
    var vazio = document.querySelector('.vazio');
    filtros.addEventListener('click', function (e) {
      var b = e.target.closest('.preset');
      if (!b) return;
      filtros.querySelectorAll('.preset').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var f = b.getAttribute('data-f');
      var vis = 0;
      cards.forEach(function (c) {
        var ok = f === 'todos' || c.getAttribute('data-tags').split(' ').indexOf(f) >= 0;
        c.hidden = !ok;
        if (ok) vis++;
      });
      if (vazio) vazio.hidden = vis > 0;
      var cont = document.querySelector('[data-contagem]');
      if (cont) cont.textContent = vis;
    });
  }

  /* ano no rodapé */
  document.querySelectorAll('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
