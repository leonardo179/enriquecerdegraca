/* Ferramentas interativas — tudo é calculado aqui no seu navegador.
   Nenhum valor digitado é enviado para lugar nenhum. */
(function () {
  'use strict';

  var moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  var moeda0 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  function brl(v) { return moeda.format(isFinite(v) ? v : 0); }
  function brl0(v) { return moeda0.format(isFinite(v) ? v : 0); }

  // Aceita "1.234,56", "1234,56", "1234.56", "R$ 50"
  function lerNumero(txt) {
    if (typeof txt !== 'string') txt = String(txt || '');
    txt = txt.replace(/[^\d,.\-]/g, '');
    if (!txt) return 0;
    if (txt.indexOf(',') >= 0) txt = txt.replace(/\./g, '').replace(',', '.');
    else if ((txt.match(/\./g) || []).length > 1) txt = txt.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(txt)) txt = txt.replace('.', '');
    var n = parseFloat(txt);
    return isFinite(n) && n > 0 ? n : 0;
  }
  function fmtCampo(v) { return v ? v.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : ''; }
  function $(s, r) { return (r || document).querySelector(s); }

  /* ================= (a) Pequenos gastos ================= */
  var FREQ = [
    { v: 365, t: 'Todo dia' },
    { v: 260, t: '5x por semana' },
    { v: 156, t: '3x por semana' },
    { v: 104, t: '2x por semana' },
    { v: 52, t: '1x por semana' },
    { v: 24, t: '2x por mês' },
    { v: 12, t: '1x por mês' }
  ];
  var linhas = $('#gastos-linhas');
  var contador = 0;
  function novaLinha(nome, valor, freq) {
    contador++;
    var id = 'g' + contador;
    var div = document.createElement('div');
    div.className = 'linha-gasto';
    var opts = FREQ.map(function (f) {
      return '<option value="' + f.v + '"' + (f.v === freq ? ' selected' : '') + '>' + f.t + '</option>';
    }).join('');
    div.innerHTML =
      '<div class="campo"><label for="' + id + 'n">O que é</label>' +
      '<input type="text" id="' + id + 'n" data-campo="nome" maxlength="40" placeholder="Ex.: cafezinho" autocomplete="off"></div>' +
      '<div class="campo"><label for="' + id + 'v">Valor por vez</label>' +
      '<div class="entrada com-pref"><span class="pref">R$</span><input type="text" inputmode="decimal" id="' + id + 'v" data-campo="valor" placeholder="0,00" autocomplete="off"></div></div>' +
      '<div class="campo"><label for="' + id + 'f">Com que frequência</label>' +
      '<select id="' + id + 'f" data-campo="freq">' + opts + '</select></div>' +
      '<button type="button" class="remover" aria-label="Remover este gasto"><i data-i="x"></i></button>';
    div.querySelector('[data-campo="nome"]').value = nome || '';
    div.querySelector('[data-campo="valor"]').value = fmtCampo(valor);
    linhas.appendChild(div);
    if (window.desenharIcones) window.desenharIcones(div);
    return div;
  }
  function calcGastos() {
    var ano = 0, maior = null, maiorV = 0;
    linhas.querySelectorAll('.linha-gasto').forEach(function (l) {
      var v = lerNumero(l.querySelector('[data-campo="valor"]').value);
      var f = parseInt(l.querySelector('[data-campo="freq"]').value, 10) || 0;
      var total = v * f;
      ano += total;
      if (total > maiorV) { maiorV = total; maior = l.querySelector('[data-campo="nome"]').value.trim() || 'um dos itens'; }
    });
    $('#g-ano').textContent = brl(ano);
    $('#g-mes').textContent = brl(ano / 12);
    $('#g-dia').textContent = brl(ano / 365);
    $('#g-5anos').textContent = brl(ano * 5);
    var txt = $('#g-texto');
    if (ano <= 0) {
      txt.textContent = 'Preencha um valor para ver quanto esses gastos somam no ano.';
    } else {
      txt.textContent = 'O que mais pesa é “' + maior + '”: ' + brl(maiorV) + ' por ano. ' +
        'Não precisa cortar tudo — escolha o que realmente vale a pena para você e mande a diferença para uma meta.';
    }
  }
  if (linhas) {
    novaLinha('Cafezinho na rua', 6, 260);
    novaLinha('Delivery', 45, 104);
    calcGastos();
    linhas.addEventListener('input', calcGastos);
    linhas.addEventListener('change', calcGastos);
    linhas.addEventListener('click', function (e) {
      var r = e.target.closest('.remover');
      if (!r) return;
      r.closest('.linha-gasto').remove();
      if (!linhas.children.length) novaLinha('', 0, 260);
      calcGastos();
    });
    $('#g-add').addEventListener('click', function () {
      var l = novaLinha('', 0, 260);
      l.querySelector('input').focus();
      calcGastos();
    });
    document.querySelectorAll('[data-gasto]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = b.getAttribute('data-gasto').split('|');
        // reaproveita uma linha vazia, se houver
        var vazia = null;
        linhas.querySelectorAll('.linha-gasto').forEach(function (l) {
          if (!vazia && !lerNumero(l.querySelector('[data-campo="valor"]').value) && !l.querySelector('[data-campo="nome"]').value.trim()) vazia = l;
        });
        if (vazia) vazia.remove();
        novaLinha(p[0], parseFloat(p[1]), parseInt(p[2], 10));
        calcGastos();
      });
    });
    $('#g-limpar').addEventListener('click', function () {
      linhas.innerHTML = '';
      novaLinha('', 0, 260);
      calcGastos();
      linhas.querySelector('input').focus();
    });
  }

  /* ================= (b) Simulador de meta ================= */
  var fMeta = $('#form-meta');
  function calcMeta() {
    var alvo = lerNumero($('#m-valor').value);
    var tenho = lerNumero($('#m-tenho').value);
    var meses = Math.max(1, Math.min(600, parseInt($('#m-prazo').value, 10) || 1));
    var taxaAno = lerNumero($('#m-taxa').value) / 100;
    $('#m-prazo-txt').textContent = meses + (meses === 1 ? ' mês' : ' meses') +
      (meses >= 12 ? ' (' + (meses / 12).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' anos)' : '');

    var falta = Math.max(0, alvo - tenho);
    var semRend = falta / meses;
    var i = Math.pow(1 + taxaAno, 1 / 12) - 1;
    var comRend, cresceTenho = tenho;
    if (i > 0) {
      cresceTenho = tenho * Math.pow(1 + i, meses);
      var resto = alvo - cresceTenho;
      comRend = resto <= 0 ? 0 : resto * i / (Math.pow(1 + i, meses) - 1);
    } else {
      comRend = semRend;
    }
    var aportes = comRend * meses;
    var rendimento = Math.max(0, alvo - tenho - aportes);
    var principal = $('#m-mes');
    var texto = $('#m-texto');

    if (alvo <= 0) {
      principal.textContent = brl(0);
      texto.textContent = 'Digite o valor do seu objetivo para ver quanto guardar por mês.';
    } else if (falta <= 0) {
      principal.textContent = brl(0);
      texto.textContent = 'Você já tem o valor do objetivo. Que tal criar a próxima meta?';
    } else {
      principal.textContent = brl(semRend);
      texto.textContent = 'Guardando ' + brl(semRend) + ' por mês (cerca de ' + brl(semRend / 30) + ' por dia), você chega a ' +
        brl0(alvo) + ' em ' + meses + (meses === 1 ? ' mês.' : ' meses.') +
        (taxaAno > 0 ? ' Com rendimento de ' + (taxaAno * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '% ao ano, o esforço mensal cai para ' + brl(comRend) + '.' : '');
    }
    $('#m-sem').textContent = brl(semRend);
    $('#m-com').textContent = taxaAno > 0 ? brl(comRend) : '—';
    $('#m-aportes').textContent = brl(alvo > 0 && falta > 0 ? aportes : 0);
    $('#m-juros').textContent = brl(alvo > 0 && falta > 0 ? rendimento : 0);
    var base = Math.max(1, tenho + aportes + rendimento);
    $('#m-bar-tenho').style.width = (alvo > 0 ? tenho / base * 100 : 0) + '%';
    $('#m-bar-ap').style.width = (alvo > 0 && falta > 0 ? aportes / base * 100 : 0) + '%';
    $('#m-bar-ju').style.width = (alvo > 0 && falta > 0 ? rendimento / base * 100 : 0) + '%';
  }
  if (fMeta) {
    fMeta.addEventListener('input', function (e) {
      if (e.target.id === 'm-prazo-range') $('#m-prazo').value = e.target.value;
      if (e.target.id === 'm-prazo') $('#m-prazo-range').value = Math.min(120, parseInt(e.target.value, 10) || 1);
      calcMeta();
    });
    fMeta.addEventListener('submit', function (e) { e.preventDefault(); calcMeta(); });
    document.querySelectorAll('[data-meta]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = b.getAttribute('data-meta').split('|');
        $('#m-valor').value = fmtCampo(parseFloat(p[0]));
        $('#m-prazo').value = p[1];
        $('#m-prazo-range').value = Math.min(120, parseInt(p[1], 10));
        document.querySelectorAll('[data-meta]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        calcMeta();
      });
    });
    calcMeta();
  }

  /* ================= (c) Diagnóstico ================= */
  var fQuiz = $('#form-quiz');
  var PASSOS = {
    1: 'Descobrir para onde vai o dinheiro',
    3: 'Montar um orçamento simples',
    4: 'Sair das dívidas caras',
    5: 'Montar a reserva de emergência',
    6: 'Criar hábitos e revisão semanal',
    7: 'Aumentar a renda',
    10: 'Transformar sonhos em metas'
  };
  function calcQuiz(mostrar) {
    var grupos = fQuiz.querySelectorAll('fieldset[data-passo]');
    var resp = 0, pontos = 0, proximo = null;
    grupos.forEach(function (g) {
      var m = g.querySelector('input:checked');
      if (m) {
        resp++;
        var v = parseInt(m.value, 10);
        pontos += v;
        var p = parseInt(g.getAttribute('data-passo'), 10);
        if (v < 2 && (proximo === null || p < proximo)) proximo = p;
      }
    });
    var total = grupos.length;
    $('#q-barra').style.width = (resp / total * 100) + '%';
    $('#q-cont').textContent = resp + ' de ' + total;
    var caixa = $('#q-resultado');
    if (!mostrar && resp < total) return;
    if (resp < total) {
      $('#q-falta').hidden = false;
      $('#q-falta').textContent = 'Responda as ' + total + ' perguntas para ver o resultado (faltam ' + (total - resp) + ').';
      return;
    }
    $('#q-falta').hidden = true;
    var pct = Math.round(pontos / (total * 2) * 100);
    var nivel, texto;
    if (pct < 40) {
      nivel = 'Hora de arrumar a base';
      texto = 'Normal — quase todo mundo começa aqui. A boa notícia: os primeiros passos são os mais simples e já fazem diferença no primeiro mês.';
    } else if (pct < 75) {
      nivel = 'Você está no caminho';
      texto = 'Já existe alguma organização. Agora é ganhar constância e fechar os buracos que ainda deixam dinheiro escapar.';
    } else {
      nivel = 'Bem organizado';
      texto = 'Sua base está boa. O foco agora é crescer: aumentar a renda, investir com segurança e acelerar as metas grandes.';
    }
    if (proximo === null) proximo = pct >= 90 ? 9 : 7;
    $('#q-nivel').textContent = nivel;
    $('#q-pct').textContent = pct + '%';
    $('#q-medidor').style.left = pct + '%';
    $('#q-medidor').parentNode.setAttribute('aria-valuenow', pct);
    $('#q-texto').textContent = texto;
    $('#q-prox-n').textContent = proximo;
    $('#q-prox').textContent = PASSOS[proximo] || (proximo === 9 ? 'Poupar e investir o básico com segurança' : '');
    var ir = $('#q-ir');
    ir.setAttribute('data-n', proximo);
    caixa.hidden = false;
    $('#q-espera').hidden = true;
    if (mostrar) caixa.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  if (fQuiz) {
    fQuiz.addEventListener('change', function () { calcQuiz(false); });
    fQuiz.addEventListener('submit', function (e) { e.preventDefault(); calcQuiz(true); });
    fQuiz.addEventListener('reset', function () {
      setTimeout(function () { $('#q-resultado').hidden = true; $('#q-espera').hidden = false; $('#q-falta').hidden = true; calcQuiz(false); }, 0);
    });
    $('#q-ir').addEventListener('click', function () {
      var n = parseInt(this.getAttribute('data-n'), 10);
      if (window.abrirPassoTrilha) window.abrirPassoTrilha(n);
    });
    calcQuiz(false);
  }
})();
