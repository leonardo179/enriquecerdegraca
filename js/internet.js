/* "Esse caminho combina comigo?" — checklist simples, calculado no navegador.
   Nada é enviado. Não é teste científico nem previsão de renda. */
(function () {
  'use strict';
  var form = document.getElementById('form-internet');
  if (!form) return;
  var BASE = ['i-base', 'i-reserva'];
  var PERFIL = ['i-tempo', 'i-longo', 'i-nicho', 'i-gosto', 'i-critica', 'i-medir'];

  function marcado(nome) {
    var c = form.querySelector('input[name="' + nome + '"]');
    return !!(c && c.checked);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var base = BASE.filter(marcado).length;
    var perfil = PERFIL.filter(marcado).length;
    var titulo, texto;
    if (perfil >= 5) {
      titulo = 'Combina com você';
      texto = 'Você tem o perfil de quem costuma durar o suficiente para colher resultado. Comece pelo plano de 90 dias, com um formato só e frequência fixa — e lembre que nem quem faz tudo certo tem garantia de viralizar.';
    } else if (perfil >= 3) {
      titulo = 'Pode combinar, com ajustes';
      texto = 'Dá para tentar, mas veja os itens que você não marcou: são justamente os motivos mais comuns de desistência. Talvez valha começar por serviços online (freelancer), que dão retorno mais rápido.';
    } else {
      titulo = 'Talvez não agora';
      texto = 'Hoje, outros caminhos tendem a dar mais retorno pelo seu tempo: bicos presenciais ou serviços para quem já ganha na internet. Dá para voltar a este plano mais tarde.';
    }
    document.getElementById('i-titulo').textContent = titulo;
    document.getElementById('i-texto').textContent = texto + ' (' + perfil + ' de ' + PERFIL.length + ' itens de perfil marcados.)';
    var alerta = document.getElementById('i-alerta');
    if (base < BASE.length) {
      alerta.hidden = false;
      alerta.textContent = 'Antes de tudo: falta base financeira. Cuide do orçamento e comece a reserva (veja o Passo a passo). Internet é aposta de longo prazo, não solução para o aperto deste mês.';
    } else {
      alerta.hidden = true;
    }
    var res = document.getElementById('i-resultado');
    res.hidden = false;
    document.getElementById('i-espera').hidden = true;
    res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  form.addEventListener('reset', function () {
    setTimeout(function () {
      document.getElementById('i-resultado').hidden = true;
      document.getElementById('i-espera').hidden = false;
    }, 0);
  });
})();
