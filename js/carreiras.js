/* "Qual caminho combina com você?" — sugestão simples, calculada no navegador.
   Nada é enviado. Não é teste vocacional nem garantia de emprego. */
(function () {
  'use strict';
  var form = document.getElementById('form-caminho');
  if (!form) return;

  // gosto: gente | maos | dados | negocio
  // prazo: 1 = começa a ganhar em meses, 2 = 1-2 anos, 3 = vários anos
  // custo: 0 = gratuito possível, 1 = baixo/médio, 2 = alto
  // estudo: horas semanais mínimas recomendadas (1 = pouco, 2 = médio, 3 = muito)
  // escol: escolaridade mínima para começar (1 = fundamental, 2 = médio, 3 = superior)
  var AREAS = [
    { id: 'cuidador', nome: 'Cuidador de idosos', gosto: ['gente'], prazo: 1, custo: 0, estudo: 1, escol: 1,
      passo: 'Procure um curso de qualificação gratuito de cuidador na sua cidade e reserve 2 noites por semana para ele na agenda.' },
    { id: 'enfermagem', nome: 'Técnico em enfermagem', gosto: ['gente'], prazo: 2, custo: 0, estudo: 2, escol: 2,
      passo: 'Veja o calendário de inscrição das escolas técnicas públicas (ETEC, Institutos Federais) e monte uma caixinha para material e transporte.' },
    { id: 'medicina', nome: 'Medicina', gosto: ['gente'], prazo: 3, custo: 2, estudo: 3, escol: 2,
      passo: 'Monte um plano de estudo para o Enem com blocos diários e pesquise Sisu, Prouni e Fies. É um caminho longo: comece pela constância.' },
    { id: 'educacao-especial', nome: 'Educação especial', gosto: ['gente'], prazo: 3, custo: 1, estudo: 2, escol: 2,
      passo: 'Pesquise licenciaturas via Sisu ou Prouni e formações gratuitas em educação inclusiva de universidades públicas.' },
    { id: 'manutencao', nome: 'Eletricista e manutenção industrial', gosto: ['maos'], prazo: 1, custo: 0, estudo: 1, escol: 1,
      passo: 'Procure cursos de qualificação em elétrica no Senai, ETEC ou Instituto Federal mais próximo; depois, o técnico.' },
    { id: 'solar', nome: 'Energia solar', gosto: ['maos'], prazo: 1, custo: 1, estudo: 1, escol: 2,
      passo: 'Comece pela base de elétrica e segurança (NR-10) e depois faça um curso de instalação de sistemas fotovoltaicos.' },
    { id: 'refrigeracao', nome: 'Refrigeração e climatização', gosto: ['maos'], prazo: 1, custo: 1, estudo: 1, escol: 1,
      passo: 'Busque um curso de refrigeração no Senai ou em escola técnica e guarde numa caixinha para as primeiras ferramentas.' },
    { id: 'construcao', nome: 'Construção e ofícios técnicos', gosto: ['maos'], prazo: 1, custo: 0, estudo: 1, escol: 1,
      passo: 'Escolha um ofício (elétrica predial, hidráulica, acabamento) e faça a qualificação gratuita do Senai ou de programas públicos.' },
    { id: 'logistica', nome: 'Logística e transporte', gosto: ['maos', 'negocio'], prazo: 1, custo: 0, estudo: 1, escol: 1,
      passo: 'Procure qualificações em logística, estoque ou operação de empilhadeira no Senai, Senat ou ETEC.' },
    { id: 'agro', nome: 'Agro e agropecuária', gosto: ['maos'], prazo: 2, custo: 0, estudo: 2, escol: 2,
      passo: 'Veja os cursos técnicos agrícolas dos Institutos Federais e do Senar na sua região.' },
    { id: 'engenharias', nome: 'Engenharias', gosto: ['maos', 'dados'], prazo: 3, custo: 2, estudo: 3, escol: 2,
      passo: 'Considere começar pelo técnico na mesma área e fazer a engenharia depois, via Sisu, Prouni ou Fies.' },
    { id: 'dados', nome: 'Dados aplicados ao negócio', gosto: ['dados'], prazo: 2, custo: 1, estudo: 2, escol: 2,
      passo: 'Comece com planilhas e um curso gratuito de análise de dados; aplique no setor em que você já trabalha.' },
    { id: 'ciberseguranca', nome: 'Cibersegurança', gosto: ['dados'], prazo: 2, custo: 1, estudo: 3, escol: 2,
      passo: 'Comece por redes e suporte de TI (cursos gratuitos e Institutos Federais) e avance para segurança.' },
    { id: 'contabil', nome: 'Contabilidade consultiva e tributária', gosto: ['dados', 'negocio'], prazo: 3, custo: 1, estudo: 2, escol: 2,
      passo: 'Se for para a contabilidade, mire o lado consultivo e tributário, menos exposto à automação.' },
    { id: 'vendas', nome: 'Vendas consultivas', gosto: ['negocio', 'gente'], prazo: 1, custo: 0, estudo: 1, escol: 2,
      passo: 'Faça um curso gratuito de negociação e escolha um setor para conhecer a fundo (agro, saúde, tecnologia).' },
    { id: 'gestao', nome: 'Gestão de pessoas e operações', gosto: ['negocio', 'gente'], prazo: 2, custo: 1, estudo: 2, escol: 2,
      passo: 'Destaque-se onde você já trabalha e busque um tecnólogo em gestão; supervisor é o primeiro degrau.' },
    { id: 'consultoria', nome: 'Consultoria e direito especializado', gosto: ['negocio', 'dados'], prazo: 3, custo: 2, estudo: 3, escol: 2,
      passo: 'Se escolher direito ou consultoria, defina um nicho cedo (tributário, proteção de dados, compliance).' }
  ];

  function valor(nome) {
    var m = form.querySelector('input[name="' + nome + '"]:checked');
    return m ? m.value : null;
  }

  function calcular(e) {
    if (e) e.preventDefault();
    var tempo = valor('c-tempo'), dinheiro = valor('c-dinheiro'), gosto = valor('c-gosto'),
        prazo = valor('c-prazo'), escol = valor('c-escol');
    var falta = document.getElementById('c-falta');
    var faltam = [tempo, dinheiro, gosto, prazo, escol].filter(function (v) { return v === null; }).length;
    if (faltam) {
      falta.hidden = false;
      falta.textContent = 'Responda todas as perguntas (faltam ' + faltam + ').';
      return;
    }
    falta.hidden = true;
    tempo = +tempo; dinheiro = +dinheiro; prazo = +prazo; escol = +escol;

    var lista = AREAS.map(function (a) {
      var p = 0;
      if (a.gosto.indexOf(gosto) === 0) p += 4; else if (a.gosto.indexOf(gosto) > 0) p += 2; else p -= 2;
      if (a.prazo === prazo) p += 1.5;   // aproveita o tempo disponível para um teto maior
      p += a.prazo <= prazo ? 2 : -3 * (a.prazo - prazo);
      p += a.custo <= dinheiro ? 1 : -2 * (a.custo - dinheiro);
      p += a.estudo <= tempo ? 1 : -1.5 * (a.estudo - tempo);
      if (a.escol > escol) p -= 1.5;     // ainda dá, mas precisa concluir os estudos antes
      return { a: a, p: p };
    }).sort(function (x, y) { return y.p - x.p; }).slice(0, 3);

    var ul = document.getElementById('c-lista');
    ul.innerHTML = '';
    lista.forEach(function (it, i) {
      var li = document.createElement('li');
      var precisaEscol = it.a.escol > escol;
      li.innerHTML = '<b>' + (i + 1) + '. <a href="#area-' + it.a.id + '">' + it.a.nome + '</a></b>' +
        '<span>' + it.a.passo + (precisaEscol ? ' Antes, vale concluir o ensino médio (há EJA e Encceja gratuitos).' : '') + '</span>';
      ul.appendChild(li);
    });
    var res = document.getElementById('c-resultado');
    res.hidden = false;
    document.getElementById('c-espera').hidden = true;
    res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', calcular);
  form.addEventListener('reset', function () {
    setTimeout(function () {
      document.getElementById('c-resultado').hidden = true;
      document.getElementById('c-espera').hidden = false;
      document.getElementById('c-falta').hidden = true;
    }, 0);
  });
  // ao clicar numa área sugerida, mostra todos os cartões (tira o filtro) para o destino existir
  document.getElementById('c-lista').addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#area-"]');
    if (!a) return;
    var todos = document.querySelector('[data-filtros] [data-f="todos"]');
    if (todos) todos.click();
  });
})();
