const IC={
 vida:'<path d="M12 21s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 3.5C19 16.5 12 21 12 21z"/><path d="M8.5 12.5h2l1-2 1.5 3.5 1-1.5h1.5"/>',
 saude:'<path d="M3 12h4l2-5 3 10 2-5h7"/>',
 residencial:'<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
 condominio:'<path d="M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16"/><path d="M14 9h4a1 1 0 0 1 1 1v11"/><path d="M8 8h.01M11 8h.01M8 12h.01M11 12h.01M8 16h.01M11 16h.01"/>',
 empresarial:'<path d="M4 8h16v11H4z"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M4 13h16"/>',
 rc:'<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
 garantia:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M9.5 14.5l1.5 1.5 3.5-3.5"/>',
 dando:'<path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-4A3.5 3.5 0 0 0 5 18.5V20"/><circle cx="10.5" cy="8" r="3"/><path d="M17.5 20v-1.5a3.5 3.5 0 0 0-2.6-3.4"/><path d="M15 5.2a3 3 0 0 1 0 5.6"/>',
 consorcio:'<ellipse cx="12" cy="7" rx="6" ry="2.5"/><path d="M6 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7"/><path d="M6 12v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5"/>'
};
const svg=(k,sz=22)=>`<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;

const fx=(t,i)=>(t.find(f=>i>=f[0]&&i<=f[1])||t[t.length-1])[2];
const TAB={
 vida:{taxaMil:[[18,30,.28],[31,40,.42],[41,50,.78],[51,60,1.55],[61,70,3.1]],
   dit:{'0':0,'50':7,'100':13,'150':18.5,'200':24},fumante:1.45,risco:1.3,
   planos:[
    {seg:'Norte Vida',nome:'Essencial',fator:.95,cob:['Morte por qualquer causa','Invalidez por acidente','Assistência funeral']},
    {seg:'Vitalis',nome:'Proteção Plus',fator:1.35,cob:['Tudo do Essencial','Doenças graves','Diária de internação','Assistência residencial']},
    {seg:'Meridiano',nome:'Máximo',fator:1.8,cob:['Tudo do Plus','Invalidez por doença','Antecipação por doença terminal','Cobertura no exterior']}
   ]},
 saude:{faixa:[[0,18,182],[19,23,208],[24,28,244],[29,33,281],[34,38,322],[39,43,371],[44,48,432],[49,53,509],[54,58,612],[59,120,784]],copart:.18,
   planos:[
    {seg:'Âncora Saúde',nome:'Regional Enfermaria',fator:1,cob:['Rede regional','Enfermaria','Carência padrão ANS']},
    {seg:'Vitalis',nome:'Nacional Enfermaria',fator:1.38,cob:['Rede nacional','Enfermaria','Reembolso de consultas']},
    {seg:'Meridiano',nome:'Nacional Apartamento',fator:1.88,cob:['Rede nacional premium','Apartamento','Reembolso amplo','Obstetrícia']}
   ]},
 residencial:{taxaAno:{casa:.0024,apartamento:.0017},
   planos:[
    {seg:'Âncora Residencial',nome:'Essencial',fator:.9,cob:['Incêndio, raio e explosão','Danos elétricos','Assistência 24h']},
    {seg:'Vitalis',nome:'Completo',fator:1.2,cob:['Tudo do Essencial','Roubo de bens','Vendaval e granizo','RC familiar']},
    {seg:'Meridiano',nome:'Blindado',fator:1.55,cob:['Tudo do Completo','Danos por água','Equipamentos portáteis','Recomposição de documentos','Assistência pet']}
   ]},
 condominio:{taxaAno:.0012,tipoFator:{residencial:1,comercial:1.25,misto:1.12},
   planos:[
    {seg:'Âncora',nome:'Cobertura Obrigatória',fator:.85,cob:['Incêndio, raio e explosão (lei)','RC do condomínio básica','Assistência 24h']},
    {seg:'Vitalis',nome:'Completo',fator:1.15,cob:['Tudo da Obrigatória','Danos elétricos','Vidros e portões','Equipamentos e elevadores','Tanques']},
    {seg:'Meridiano',nome:'Master',fator:1.5,cob:['Tudo do Completo','RC ampliada','Roubo de bens comuns','Despesas fixas','Assistência predial 24h']}
   ]},
 empresarial:{taxaAno:{comercio:.0035,servicos:.0028,escritorio:.0022,industria:.0052},
   planos:[
    {seg:'Âncora Empresa',nome:'Essencial PME',fator:.9,cob:['Incêndio, raio e explosão','Roubo e furto qualificado','Assistência empresa 24h']},
    {seg:'Vitalis',nome:'Completo',fator:1.2,cob:['Tudo do Essencial','RC operações','Danos elétricos','Vidros e letreiros','Equipamentos']},
    {seg:'Meridiano',nome:'Master',fator:1.55,cob:['Tudo do Completo','Lucros cessantes','Fidelidade de funcionários','Cyber básica','Perda de aluguel']}
   ]},
 rc:{taxaLimite:{geral:.008,profissional:.011,obras:.014},
   planos:[
    {seg:'Âncora',nome:'Essencial',fator:.9,cob:['Danos materiais e corporais a terceiros','Despesas de defesa','Assistência jurídica']},
    {seg:'Vitalis',nome:'Ampla',fator:1.2,cob:['Tudo do Essencial','Danos morais','RC empregador','Poluição súbita']},
    {seg:'Meridiano',nome:'Master',fator:1.55,cob:['Tudo da Ampla','RC produtos','Operações em terceiros','Cobertura no Mercosul']}
   ]},
 garantia:{taxaAno:{proposta:.008,performance:.012,judicial:.018,aduaneira:.014},
   planos:[
    {seg:'Âncora Garantias',nome:'Standard',fator:.95,cob:['Garantia da obrigação principal','Emissão digital','Renovação simplificada']},
    {seg:'Vitalis',nome:'Plus',fator:1.1,cob:['Cobertura ampliada','Multas e encargos','Suporte para editais']},
    {seg:'Meridiano',nome:'Premium',fator:1.3,cob:['Limite ampliado','Trabalhista e previdenciária','Gestão de vencimentos']}
   ]},
 dando:{taxaLimite:{'1000000':.012,'2000000':.010,'5000000':.008,'10000000':.007},
   setorFator:{servicos:1,comercio:1.1,industria:1.25,financeiro:1.6,tecnologia:1.15},abertoFator:1.8,
   planos:[
    {seg:'Âncora D&O',nome:'Essencial',fator:.95,cob:['Defesa de administradores','Custos de defesa','Danos a terceiros']},
    {seg:'Vitalis',nome:'Ampla',fator:1.2,cob:['Tudo do Essencial','Investigações e processos','Multas seguráveis','Cônjuge e espólio']},
    {seg:'Meridiano',nome:'Global',fator:1.55,cob:['Tudo da Ampla','Cobertura internacional','Responsabilidade fiscal e trabalhista','Entidade segurada']}
   ]},
 consorcio:{txAdm:{imovel:.18,automovel:.16,servicos:.15,pesados:.19},
   planos:[
    {seg:'Âncora Consórcios',nome:'Flex',pf:1,cob:['Sem juros, só taxa de administração','Lance livre e embutido','Contemplação por sorteio ou lance']},
    {seg:'Vitalis',nome:'Turbo',pf:.96,cob:['Parcelas reduzidas no início','Seguro prestamista incluso','Uso do FGTS (imóveis)']},
    {seg:'Meridiano',nome:'Premium',pf:1.05,cob:['Maior chance de lance','Assembleias mensais','Redução após contemplação']}
   ]}
};

const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

const cotaVida=d=>{let base=(d.capital/1000)*fx(TAB.vida.taxaMil,d.idade);
  if(d.fumante==='sim')base*=TAB.vida.fumante; if(d.risco==='sim')base*=TAB.vida.risco;
  const dit=TAB.vida.dit[d.diaria]||0;
  return TAB.vida.planos.map(p=>({...p,
    cob:[...p.cob, d.diaria!=='0'?('Afastamento (DIT) '+brl(+d.diaria)+'/dia'):'Sem diária de afastamento'],
    valor:Math.max(24.9,(base+dit)*p.fator),per:'/mês'})).sort((a,b)=>a.valor-b.valor);};

const cotaSaude=d=>{const b=fx(TAB.saude.faixa,d.idade);
  return TAB.saude.planos.map(p=>{let v=b*p.fator; if(d.copart==='sim')v*=1-TAB.saude.copart; v*=d.vidas; if(d.vidas>=3)v*=.95;
    return{...p,cob:[...p.cob,d.copart==='sim'?'Com coparticipação':'Sem coparticipação'],valor:v,per:'/mês · '+d.vidas+(d.vidas>1?' vidas':' vida')};})
  .sort((a,b)=>a.valor-b.valor);};

const cotaResidencial=d=>{const anual=(+d.valorImovel)*TAB.residencial.taxaAno[d.tipo]*(d.alarme==='sim'?.92:1);
  return TAB.residencial.planos.map(p=>({...p,valor:anual*p.fator/12,per:'/mês · imóvel de '+brl(+d.valorImovel)})).sort((a,b)=>a.valor-b.valor);};

const cotaCondominio=d=>{const anual=(+d.valorRisco)*TAB.condominio.taxaAno*TAB.condominio.tipoFator[d.tipo]*(1+Math.min(+d.unidades,120)*0.0008);
  return TAB.condominio.planos.map(p=>({...p,valor:anual*p.fator/12,per:'/mês · '+d.unidades+' unidades'})).sort((a,b)=>a.valor-b.valor);};

const cotaEmpresarial=d=>{const anual=(+d.patrimonio)*TAB.empresarial.taxaAno[d.ramo];
  return TAB.empresarial.planos.map(p=>({...p,valor:anual*p.fator/12,per:'/mês · patrimônio de '+brl(+d.patrimonio)})).sort((a,b)=>a.valor-b.valor);};

const cotaRc=d=>{const anual=(+d.limite)*TAB.rc.taxaLimite[d.tipo];
  return TAB.rc.planos.map(p=>({...p,valor:Math.max(59,anual*p.fator/12),per:'/mês · limite de '+brl(+d.limite)})).sort((a,b)=>a.valor-b.valor);};

const cotaGarantia=d=>{const meses=+d.prazo,base=(+d.valorGarantido)*TAB.garantia.taxaAno[d.tipo]*(meses/12);
  return TAB.garantia.planos.map(p=>({...p,valor:Math.max(300,base*p.fator),per:'prêmio total · vigência de '+meses+' meses'})).sort((a,b)=>a.valor-b.valor);};

const cotaDando=d=>{const lim=+d.limite,anual=lim*TAB.dando.taxaLimite[d.limite]*TAB.dando.setorFator[d.setor]*(d.aberto==='sim'?TAB.dando.abertoFator:1)*(1+Math.min(+d.faturamento,50000000)/500000000);
  return TAB.dando.planos.map(p=>({...p,valor:anual*p.fator/12,per:'/mês · limite de '+brl(lim)})).sort((a,b)=>a.valor-b.valor);};

const cotaConsorcio=d=>{const carta=+d.valorCarta,meses=+d.prazo,tx=TAB.consorcio.txAdm[d.bem];
  return TAB.consorcio.planos.map(p=>({...p,valor:carta*(1+tx)/meses*p.pf,per:'/mês · carta de '+brl(carta)})).sort((a,b)=>a.valor-b.valor);};

const P={
 vida:{t:'Vida e Afastamento',full:'Seguro Vida e Afastamento (DIT)',imediato:true,tag:'Apólice na hora',d:'Vida, invalidez e diária por afastamento (DIT), com apólice emitida na hora.',cota:cotaVida,req:['idade']},
 saude:{t:'Saúde',full:'Seguro Saúde',imediato:false,tag:'Sujeito a análise',d:'Individual, familiar ou empresarial, com preço por faixa etária conforme a ANS.',cota:cotaSaude,req:['idade','cidade']},
 residencial:{t:'Residencial',full:'Seguro Residencial',imediato:true,tag:'Emissão rápida',d:'Sua casa ou apartamento protegidos contra incêndio, roubo, danos e mais.',cota:cotaResidencial,req:['cep']},
 condominio:{t:'Condomínio',full:'Seguro Condomínio',imediato:false,tag:'Sujeito a análise',d:'Cobertura obrigatória por lei e coberturas além dela para o prédio.',cota:cotaCondominio,req:['unidades','cep']},
 empresarial:{t:'Empresarial',full:'Seguro Empresarial',imediato:false,tag:'Sujeito a análise',d:'Patrimônio, operação e responsabilidade da sua empresa em uma só apólice.',cota:cotaEmpresarial,req:['cep']},
 rc:{t:'Responsabilidade Civil',full:'Seguro de Responsabilidade Civil (RC)',imediato:false,tag:'Sujeito a análise',d:'Danos causados a terceiros, na modalidade geral, empresarial ou profissional.',cota:cotaRc,req:['atividade']},
 garantia:{t:'Garantia',full:'Seguro Garantia',imediato:false,tag:'Análise de crédito',d:'Garantia para contratos, licitações, obras e processos judiciais.',cota:cotaGarantia,req:['valorGarantido']},
 dando:{t:'D&O',full:'Seguro D&O',imediato:false,tag:'Sob subscrição',d:'Proteção para administradores, diretores e conselheiros no exercício do cargo.',cota:cotaDando,req:[]},
 consorcio:{t:'Consórcio',full:'Consórcio',imediato:false,tag:'Simulação de parcela',d:'Imóvel, veículo, pesados ou serviços, sem juros, só taxa de administração.',cota:cotaConsorcio,req:['valorCarta']}
};

const F={
 vida:`<div class="f"><label>Sua idade</label><input id="idade" type="number" min="18" max="70" placeholder="35"></div>
  <div class="f"><label>Capital segurado</label><select id="capital">
   <option value="100000">R$ 100.000</option><option value="250000">R$ 250.000</option>
   <option value="500000" selected>R$ 500.000</option><option value="1000000">R$ 1.000.000</option><option value="2000000">R$ 2.000.000</option></select></div>
  <div class="f full"><label>Diária de afastamento (DIT) <span class="opt">valor por dia parado</span></label><select id="diaria">
   <option value="0">Não incluir</option><option value="50">R$ 50 / dia</option><option value="100" selected>R$ 100 / dia</option><option value="150">R$ 150 / dia</option><option value="200">R$ 200 / dia</option></select></div>
  <div class="f full"><label>Fumou nos últimos 12 meses?</label>
   <div class="chips" data-g="fumante"><button class="chip" data-v="nao" aria-pressed="true">Não</button><button class="chip" data-v="sim">Sim</button></div></div>
  <div class="f full"><label>Profissão de risco? <span class="opt">altura, eletricidade, transporte</span></label>
   <div class="chips" data-g="risco"><button class="chip" data-v="nao" aria-pressed="true">Não</button><button class="chip" data-v="sim">Sim</button></div></div>`,

 saude:`<div class="f"><label>Idade do titular</label><input id="idade" type="number" min="0" max="99" placeholder="34"></div>
  <div class="f"><label>Quantas vidas</label><select id="vidas"><option value="1">1 pessoa</option><option value="2">2 pessoas</option><option value="3">3 pessoas</option><option value="4">4 pessoas</option><option value="5">5 ou mais</option></select></div>
  <div class="f"><label>Cidade</label><input id="cidade" placeholder="Cotia, SP"></div>
  <div class="f"><label>Contratação</label><select id="tipo"><option value="pf">Individual / familiar</option><option value="mei">MEI</option><option value="pj">Empresarial (CNPJ)</option></select></div>
  <div class="f full"><label>Aceita coparticipação? <span class="opt">mensalidade menor</span></label>
   <div class="chips" data-g="copart"><button class="chip" data-v="sim" aria-pressed="true">Sim</button><button class="chip" data-v="nao">Não</button></div></div>`,

 residencial:`<div class="f"><label>CEP do imóvel</label><input id="cep" inputmode="numeric" placeholder="06700-000"></div>
  <div class="f"><label>Tipo</label><select id="tipo"><option value="casa">Casa</option><option value="apartamento" selected>Apartamento</option></select></div>
  <div class="f full"><label>Valor do imóvel / reconstrução</label><select id="valorImovel">
   <option value="150000">R$ 150.000</option><option value="300000" selected>R$ 300.000</option><option value="500000">R$ 500.000</option><option value="800000">R$ 800.000</option><option value="1200000">R$ 1.200.000</option></select></div>
  <div class="f full"><label>Possui alarme ou monitoramento? <span class="opt">reduz o prêmio</span></label>
   <div class="chips" data-g="alarme"><button class="chip" data-v="nao" aria-pressed="true">Não</button><button class="chip" data-v="sim">Sim</button></div></div>`,

 condominio:`<div class="f"><label>Nº de unidades</label><input id="unidades" type="number" min="2" max="500" placeholder="48"></div>
  <div class="f"><label>CEP do condomínio</label><input id="cep" inputmode="numeric" placeholder="06700-000"></div>
  <div class="f"><label>Perfil</label><select id="tipo"><option value="residencial" selected>Residencial</option><option value="comercial">Comercial</option><option value="misto">Misto</option></select></div>
  <div class="f"><label>Valor em risco (reconstrução)</label><select id="valorRisco">
   <option value="2000000">R$ 2.000.000</option><option value="5000000" selected>R$ 5.000.000</option><option value="10000000">R$ 10.000.000</option><option value="20000000">R$ 20.000.000</option></select></div>`,

 empresarial:`<div class="f"><label>Ramo de atividade</label><select id="ramo">
   <option value="comercio" selected>Comércio / loja</option><option value="servicos">Serviços</option><option value="escritorio">Escritório</option><option value="industria">Indústria / galpão</option></select></div>
  <div class="f"><label>CEP da empresa</label><input id="cep" inputmode="numeric" placeholder="06700-000"></div>
  <div class="f full"><label>Valor do patrimônio <span class="opt">conteúdo + edificação</span></label><select id="patrimonio">
   <option value="100000">R$ 100.000</option><option value="300000" selected>R$ 300.000</option><option value="600000">R$ 600.000</option><option value="1200000">R$ 1.200.000</option><option value="2500000">R$ 2.500.000</option></select></div>`,

 rc:`<div class="f"><label>Modalidade</label><select id="tipo">
   <option value="geral" selected>RC Geral / Empresarial</option><option value="profissional">RC Profissional</option><option value="obras">RC Obras / Instalação</option></select></div>
  <div class="f"><label>Limite de indenização</label><select id="limite">
   <option value="100000">R$ 100.000</option><option value="250000">R$ 250.000</option><option value="500000" selected>R$ 500.000</option><option value="1000000">R$ 1.000.000</option><option value="2000000">R$ 2.000.000</option></select></div>
  <div class="f full"><label>Atividade principal</label><input id="atividade" placeholder="Ex.: engenharia civil, clínica, evento"></div>`,

 garantia:`<div class="f"><label>Tipo de garantia</label><select id="tipo">
   <option value="proposta">Proposta (bid)</option><option value="performance" selected>Executante (performance)</option><option value="judicial">Judicial</option><option value="aduaneira">Aduaneira</option></select></div>
  <div class="f"><label>Prazo (meses)</label><select id="prazo"><option value="12">12 meses</option><option value="24" selected>24 meses</option><option value="36">36 meses</option><option value="48">48 meses</option></select></div>
  <div class="f full"><label>Valor garantido <span class="opt">valor do contrato ou processo</span></label><input id="valorGarantido" type="number" min="10000" placeholder="500000"></div>`,

 dando:`<div class="f"><label>Faturamento anual</label><select id="faturamento">
   <option value="2000000">Até R$ 2 mi</option><option value="10000000" selected>R$ 2 mi a R$ 10 mi</option><option value="50000000">R$ 10 mi a R$ 50 mi</option><option value="200000000">Acima de R$ 50 mi</option></select></div>
  <div class="f"><label>Setor</label><select id="setor">
   <option value="servicos" selected>Serviços</option><option value="comercio">Comércio</option><option value="industria">Indústria</option><option value="tecnologia">Tecnologia</option><option value="financeiro">Financeiro</option></select></div>
  <div class="f full"><label>Limite de indenização</label><select id="limite">
   <option value="1000000" selected>R$ 1.000.000</option><option value="2000000">R$ 2.000.000</option><option value="5000000">R$ 5.000.000</option><option value="10000000">R$ 10.000.000</option></select></div>
  <div class="f full"><label>Empresa de capital aberto?</label>
   <div class="chips" data-g="aberto"><button class="chip" data-v="nao" aria-pressed="true">Não</button><button class="chip" data-v="sim">Sim</button></div></div>`,

 consorcio:`<div class="f"><label>O que você quer</label><select id="bem">
   <option value="imovel" selected>Imóvel</option><option value="automovel">Automóvel</option><option value="pesados">Caminhão / pesados</option><option value="servicos">Serviços / reforma</option></select></div>
  <div class="f"><label>Prazo (meses)</label><select id="prazo">
   <option value="60">60 meses</option><option value="120">120 meses</option><option value="180" selected>180 meses</option><option value="200">200 meses</option><option value="240">240 meses</option></select></div>
  <div class="f full"><label>Valor da carta de crédito</label><input id="valorCarta" type="number" min="10000" placeholder="300000"></div>`
};

const SUB={
 vida:'Cinco campos e o preço aparece. Apólice emitida na hora.',
 saude:'Cálculo por faixa etária, conforme tabela ANS.',
 residencial:'Cálculo por valor do imóvel, tipo e localização.',
 condominio:'Cálculo pelo valor em risco, perfil e número de unidades.',
 empresarial:'Cálculo pelo ramo de atividade e patrimônio informado.',
 rc:'Cálculo pelo limite de indenização e pela atividade.',
 garantia:'Cálculo pelo valor garantido, tipo e prazo. Sujeito a análise de crédito.',
 dando:'Cálculo pelo porte, setor e limite escolhido.',
 consorcio:'Simulação da parcela pela carta de crédito e prazo, sem juros.'
};

function decl(prod){
 const H={
  vida:['Declaração de saúde',['Nos últimos 5 anos não fui diagnosticado com doença cardíaca, câncer, diabetes ou doença crônica em tratamento.','Não estive internado nem passei por cirurgia nos últimos 24 meses.','Declaro que as informações são verdadeiras e entendo que a omissão pode anular a cobertura.']],
  saude:['Declaração de saúde',['Nos últimos 5 anos não fui diagnosticado com doença cardíaca, câncer, diabetes ou doença crônica em tratamento.','Não estive internado nem passei por cirurgia nos últimos 24 meses.','Declaro que as informações são verdadeiras e entendo que a omissão pode anular a cobertura.']],
  residencial:['Sobre o imóvel',['O imóvel é de minha propriedade ou tenho autorização para segurá-lo.','Não há sinistro em aberto nem risco iminente conhecido.','Declaro que as informações prestadas são verdadeiras.']],
  condominio:['Sobre o condomínio',['Sou síndico(a) ou represento legalmente o condomínio.','A edificação corresponde ao valor em risco e ao perfil informados.','Declaro que as informações prestadas são verdadeiras.']],
  empresarial:['Sobre a empresa',['Represento a empresa e o patrimônio informado corresponde à realidade.','A atividade declarada é a efetivamente exercida no local.','Declaro que as informações prestadas são verdadeiras.']],
  rc:['Sobre a atividade',['A atividade e o limite informados correspondem à realidade.','Não há reclamação ou processo de terceiros em curso que eu não tenha informado.','Declaro que as informações prestadas são verdadeiras.']],
  garantia:['Sobre a garantia',['O contrato, edital ou processo informado é verdadeiro e está vigente.','Estou ciente de que a emissão passa por análise de crédito.','Declaro que as informações prestadas são verdadeiras.']],
  dando:['Sobre a empresa e os administradores',['As informações do questionário D&O correspondem à realidade da empresa.','Não há reclamação ou investigação em curso contra os administradores que eu não tenha informado.','Declaro que as informações prestadas são verdadeiras.']],
  consorcio:['Sobre a adesão',['Li e concordo com o regulamento do grupo de consórcio.','Entendo que não há juros, mas há taxa de administração, e que a contemplação ocorre por sorteio ou lance.','Declaro que as informações prestadas são verdadeiras.']]
 };
 return H[prod];
}

function timeline(prod){
 const T={
  vida:[['AGORA','Apólice e condições gerais no seu e-mail.'],['24 HORAS','Assistência e diária de afastamento (DIT) ativas na área do cliente.'],['SEMPRE','Beneficiários e capital você altera aqui, sem corretor.']],
  residencial:[['AGORA','Apólice emitida e enviada por e-mail.'],['24 HORAS','Assistência residencial 24h liberada.'],['SINISTRO','Aviso e acompanhamento pelo app, sem ligação.']],
  saude:[['ATÉ 5 DIAS','Análise da operadora e confirmação da vigência.'],['NA APROVAÇÃO','Primeira mensalidade e carteirinha digital.'],['CARÊNCIAS','Urgência 24h · consultas 30d · internação 180d · parto 300d.']],
  condominio:[['ATÉ 3 DIAS','Análise do condomínio e da cobertura obrigatória por lei.'],['APROVADO','Apólice emitida em nome do condomínio.'],['ASSISTÊNCIA','Assistência predial 24h ativada.']],
  empresarial:[['ATÉ 3 DIAS','Análise do ramo e do patrimônio informado.'],['APROVADO','Apólice empresarial emitida por e-mail.'],['ASSISTÊNCIA','Assistência empresa 24h ativada.']],
  rc:[['ATÉ 3 DIAS','Análise da atividade e do limite escolhido.'],['APROVADO','Apólice de RC emitida.'],['SINISTRO','Acionamento e defesa acompanhados pela LV.']],
  garantia:[['ATÉ 5 DIAS','Análise de crédito e do objeto garantido.'],['APROVADO','Apólice de garantia emitida e enviada ao tomador.'],['VIGÊNCIA','Controle de vencimentos e renovação com a LV.']],
  dando:[['ATÉ 7 DIAS','Subscrição do risco e do questionário D&O.'],['APROVADO','Apólice emitida para os administradores.'],['VIGÊNCIA','Revisão anual de limites e coberturas.']],
  consorcio:[['ATÉ 2 DIAS','Confirmação da adesão e do grupo.'],['MENSAL','Assembleias de contemplação por sorteio e lance.'],['CONTEMPLADO','Carta de crédito liberada para usar como quiser.']]
 };
 return T[prod];
}

let S={step:0,prod:null,d:{},ofertas:[],pick:null,pg:'cartao'};
const box=document.getElementById('cot'),head=document.getElementById('cot-h');
const $=s=>box.querySelector(s);
const LB=['escolha o seguro','seus dados','ofertas disponíveis','contratação','pronto'];

function chrome(){
  document.querySelectorAll('#steps i').forEach((n,i)=>n.classList.toggle('on',i<=Math.min(S.step,3)));
  document.getElementById('stepno').innerHTML=`<b>Passo 0${Math.min(S.step+1,4)}</b> · ${LB[S.step]}`;
}
function go(step,scroll=true){S.step=step;chrome();render();
  if(scroll&&step>0)document.getElementById('top').scrollIntoView({behavior:'smooth',block:'start'});}
function render(){[t0,t1,t2,t3,t4][S.step]()}

function t0(){
  head.innerHTML=`<h2>Cote seu seguro</h2><p>Sem cadastro. Você vê o preço antes de informar qualquer documento.</p>`;
  box.innerHTML=`<div class="prods two">${Object.entries(P).map(([k,p])=>`
    <button class="prod mini" data-p="${k}">
      <span class="ic">${svg(k,20)}</span>
      <span><h3>${p.t}</h3>
      <span class="badge2 ${p.imediato?'now':'an'}">${p.tag}</span></span>
    </button>`).join('')}</div>
    <p class="help">Prefere conversar? <a href="https://wa.me/5511966337576">Fale com um corretor.</a></p>`;
  box.querySelectorAll('.prod').forEach(b=>b.onclick=()=>{S.prod=b.dataset.p;S.d={};go(1)});
}

function t1(){
  head.innerHTML=`<h2>${P[S.prod].full}</h2><p>${SUB[S.prod]}</p>`;
  box.innerHTML=`<div class="fields">${F[S.prod]}</div><p class="err" id="erro" hidden>Preencha os campos destacados.</p>
    <div class="acts"><button class="btn ghost sm" id="back">Voltar</button><button class="btn" id="calc">Ver preços
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h13M13 6l6 6-6 6"/></svg></button></div>`;
  box.querySelectorAll('.chips').forEach(g=>{const k=g.dataset.g;
    if(!S.d[k])S.d[k]=g.querySelector('[aria-pressed="true"]').dataset.v;
    g.querySelectorAll('.chip').forEach(c=>{c.setAttribute('aria-pressed',String(S.d[k]===c.dataset.v));
      c.onclick=()=>{g.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed','false'));c.setAttribute('aria-pressed','true');S.d[k]=c.dataset.v};});});
  box.querySelectorAll('input,select').forEach(i=>{if(S.d[i.id]!==undefined&&S.d[i.id]!=='')i.value=S.d[i.id];else S.d[i.id]=i.value||'';
    i.oninput=()=>S.d[i.id]=i.value;});
  $('#back').onclick=()=>{S.prod=null;go(0)};
  $('#calc').onclick=()=>{
    const falta=P[S.prod].req.filter(k=>!S.d[k]);
    if(falta.length){$('#erro').hidden=false;box.querySelector('#'+falta[0]).focus();return}
    if(S.d.idade)S.d.idade=+S.d.idade; if(S.d.vidas)S.d.vidas=+S.d.vidas; if(S.d.capital)S.d.capital=+S.d.capital;
    go(2);
  };
}

function t2(){
  head.innerHTML=`<h2>Consultando ${S.prod==='consorcio'?'administradoras':'seguradoras'}</h2><p>Enviando seu perfil para cotação em tempo real.</p>`;
  box.innerHTML=`<div class="load"><div class="orb"></div><p>Buscando as melhores condições…</p><p class="who" id="who"></p></div>`;
  const nomes=TAB[S.prod].planos.map(p=>p.seg);
  let i=0;const t=setInterval(()=>{const w=document.getElementById('who');if(w)w.textContent='↳ '+nomes[i%nomes.length]+' respondeu';i++},650);
  setTimeout(()=>{clearInterval(t);S.ofertas=P[S.prod].cota(S.d);ofertas()},2200);
}

function flagLabel(o){
  if(o.per.indexOf('prêmio total')===0)return 'Menor prêmio';
  if(S.prod==='consorcio')return 'Menor parcela';
  return 'Menor preço';
}
function ofertas(){
  const msg=P[S.prod].imediato?'Escolhendo agora, a apólice é emitida hoje.'
    :S.prod==='consorcio'?'Simulação de parcelas. A adesão ao grupo passa por confirmação.'
    :S.prod==='garantia'?'Valores estimados. A emissão passa por análise de crédito da seguradora.'
    :'Valores estimados. A contratação segue para análise da seguradora.';
  head.innerHTML=`<h2>${S.ofertas.length} ofertas para você</h2><p>${msg}</p>`;
  box.innerHTML=`${S.ofertas.map((o,i)=>`
    <div class="of ${i===0?'best':''}">
      ${i===0?`<span class="flag">${flagLabel(o)}</span>`:''}
      <div class="seg">${o.seg}</div><h4>${o.nome}</h4>
      <ul>${o.cob.map(c=>`<li>${c}</li>`).join('')}</ul>
      <div class="foot">
        <div><span class="v">${brl(o.valor)}</span><span class="per">${o.per}</span></div>
        <button class="btn sm" data-i="${i}">${S.prod==='consorcio'?'Aderir':'Contratar'}</button>
      </div>
    </div>`).join('')}
    <div class="acts"><button class="btn ghost sm" id="refaz">Refazer cotação</button></div>
    <p class="help">Ficou em dúvida? <a href="https://wa.me/5511966337576">Um corretor te ajuda a escolher.</a></p>`;
  box.querySelectorAll('.of .btn').forEach(b=>b.onclick=()=>{S.pick=S.ofertas[+b.dataset.i];go(3)});
  $('#refaz').onclick=()=>go(1);
}

function t3(){
  const o=S.pick,cons=S.prod==='consorcio',[dt,itens]=decl(S.prod);
  head.innerHTML=`<h2>${cons?'Finalizar adesão':'Finalizar contratação'}</h2><p>Cerca de dois minutos, com assinatura eletrônica.</p>`;
  box.innerHTML=`
  <div class="sum"><div><span class="seg">${o.seg}</span><br><b>${o.nome}</b></div><span class="v">${brl(o.valor)}</span></div>
  <div class="fields">
    <div class="f full"><label>Nome completo</label><input id="nome" placeholder="Como está no documento"></div>
    <div class="f"><label>CPF / CNPJ</label><input id="doc" placeholder="000.000.000-00"></div>
    <div class="f"><label>Celular</label><input id="fone" placeholder="(11) 90000-0000"></div>
    <div class="f full"><label>E-mail</label><input id="email" type="email" placeholder="voce@email.com"></div>
  </div>
  <p class="blk">${dt}</p>
  <div class="dps">
    ${itens.map(x=>`<label><input type="checkbox" class="q"> <span>${x}</span></label>`).join('')}
  </div>
  <p class="blk">Pagamento</p>
  <div class="pay">
    <button class="chip" data-pg="cartao" aria-pressed="true">Cartão de crédito</button>
    <button class="chip" data-pg="pix" aria-pressed="false">Pix</button>
  </div>
  <div class="fields" id="cc-box">
    <div class="f full"><label>Número do cartão</label><input id="cc" inputmode="numeric" placeholder="0000 0000 0000 0000"></div>
    <div class="f"><label>Validade</label><input id="cv" placeholder="MM/AA"></div>
    <div class="f"><label>CVV</label><input id="cvv" inputmode="numeric" placeholder="123"></div>
  </div>
  <p class="err" id="erro" hidden>Complete os dados e marque todas as declarações.</p>
  <div class="acts"><button class="btn ghost sm" id="back">Voltar</button><button class="btn" id="assinar">${cons?'Assinar e aderir':'Assinar e contratar'}</button></div>
  <p class="help">Ao ${cons?'aderir':'contratar'} você aceita ${cons?'o regulamento e a adesão ao grupo':'as condições gerais da '+o.seg} e a assinatura eletrônica da proposta.</p>`;
  box.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{
    box.querySelectorAll('[data-pg]').forEach(x=>x.setAttribute('aria-pressed','false'));
    b.setAttribute('aria-pressed','true');S.pg=b.dataset.pg;
    document.getElementById('cc-box').style.display=S.pg==='pix'?'none':'grid';});
  $('#back').onclick=()=>{S.step=2;chrome();ofertas()};
  $('#assinar').onclick=()=>{
    const ok=['nome','doc','email','fone'].every(i=>$('#'+i).value.trim())
      && [...box.querySelectorAll('.q')].every(c=>c.checked)
      && (S.pg==='pix' || ($('#cc').value&&$('#cv').value&&$('#cvv').value));
    if(!ok){$('#erro').hidden=false;return}
    go(4);
  };
}

function t4(){
  const im=P[S.prod].imediato,cons=S.prod==='consorcio',num='LV-'+Math.floor(100000+Math.random()*899999);
  head.innerHTML='';
  const titulo=im?'Apólice emitida.':cons?'Adesão enviada.':'Proposta enviada.';
  const texto=im?`Sua apólice da ${S.pick.seg} já está ativa e foi enviada por e-mail. A cobrança de ${brl(S.pick.valor)} entra hoje.`
    :cons?`A ${S.pick.seg} recebeu sua adesão ao grupo. Assim que confirmarmos, avisamos por e-mail e WhatsApp com os dados do plano.`
    :`A ${S.pick.seg} recebeu sua proposta e vai analisar. Avisamos por e-mail e WhatsApp assim que estiver aprovada.`;
  box.innerHTML=`<div class="done">
    <div class="seal"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg></div>
    <h2>${titulo}</h2>
    <p>${texto}</p>
    <span class="proto">${num}</span>
    <div class="tl">${timeline(S.prod).map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>
    <div class="acts"><button class="btn ghost sm" id="novo">Cotar outro seguro</button></div>
  </div>`;
  $('#novo').onclick=()=>{S={step:0,prod:null,d:{},ofertas:[],pick:null,pg:'cartao'};go(0,false)};
}

/* ===================== SEÇÃO DE PRODUTOS + RODAPÉ (gerados de P) ===================== */
document.getElementById('grade-produtos').innerHTML=Object.entries(P).map(([k,p])=>`
  <div class="card reveal">
    <div class="ic">${svg(k,26)}</div>
    <h3>${p.full}</h3>
    <p>${p.d}</p>
    <a class="lnk" href="#top" data-go="${k}">Cotar ${p.t.toLowerCase()} →</a>
  </div>`).join('');
document.getElementById('foot-produtos').innerHTML=Object.entries(P).map(([k,p])=>`
  <li><a href="#top" data-go="${k}">${p.t}</a></li>`).join('')+`<li><a href="#sobre">Sobre nós</a></li>`;

/* atalhos data-go */
function bindGo(){document.querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();S.prod=a.dataset.go;S.d={};go(1)});}

chrome();render();bindGo();

/* ===================== EFEITOS ===================== */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.14});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
