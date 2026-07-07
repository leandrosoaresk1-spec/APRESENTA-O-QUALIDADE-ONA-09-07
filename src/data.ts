/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PresentationData } from './types';

export interface RawRMItem {
  id: string;
  title: string;
  area: string;
  type: string;
  status: string;
  needsAction?: string;
}

export const INITIAL_PRESENTATION_DATA: PresentationData = {
  metadata: {
    title: "Pendências Qualidade e ONA",
    subtitle: "Gerência de Gestão de Pessoas",
    date: "07/07/2026",
    author: "Gerência de Gestão de Pessoas"
  },
  comparative: {
    dates: {
      past: "26/03/2026",
      current: "07/07/2026"
    },
    metrics: {
      rm: { past: 16, current: 27, change: "+11", trend: "up" },
      documentation: { past: 9, current: 6, change: "-3", trend: "down" },
      actionPlans: { past: 4, current: 4, change: "Estável", trend: "stable" }
    },
    insight: "As RM aumentaram 68%, enquanto as documentações pendentes reduziram 33%. O principal foco deve ser a redução do passivo de Relatórios de Melhoria, mantendo o avanço na regularização documental."
  },
  rmSlide: {
    byArea: [
      { area: "Administração de Pessoal", count: 9 },
      { area: "Atração e Seleção", count: 4 },
      { area: "DHO", count: 4 },
      { area: "Segurança do Trabalho", count: 4 },
      { area: "Medicina do Trabalho", count: 2 },
      { area: "Gerência de Gestão de Pessoas", count: 2 },
      { area: "Consultoria Interna", count: 1 },
      { area: "Dimensionamento, Cargos e Remuneração", count: 1 }
    ],
    mainIssues: [
      "Auditorias internas e externas pendentes de resposta.",
      "Entrega de notas fiscais em desacordo com as diretrizes vigentes.",
      "Atraso na manifestação de respostas aos clientes internos.",
      "Avaliações de experiência com preenchimento pendente.",
      "Indicadores de qualidade que demandam revisão formal.",
      "RMs devolvidas pelo setor de Qualidade para correções estruturais."
    ],
    attentionPoints: [
      { id: "at-1", text: "Alto volume de RMs relacionadas a atrasos em notas fiscais, demandando alinhamento com a Controladoria.", type: "critical" },
      { id: "at-2", text: "Priorizar o encerramento das auditorias internas e externas pendentes, cujo prazo é crítico.", type: "critical" },
      { id: "at-3", text: "RMs devolvidas pela Qualidade devem ser revisadas, corrigidas e reenviadas imediatamente.", type: "warning" },
      { id: "at-4", text: "Necessidade de alinhamento recorrente entre as áreas operacionais para mitigar reincidências de falhas.", type: "info" }
    ]
  },
  documentationSlide: {
    byArea: [
      {
        area: "Atração e Seleção",
        count: 4,
        items: ["MAP GER ATR SEL 001", "LEG GER ATR SEL 001", "MTR GER ATR SEL 001", "PLAN COMU ATR SEL 001"]
      },
      {
        area: "Administração de Pessoal",
        count: 2,
        items: ["MGR GER ADM PES 001", "PRS INST ADM PES 005 - Preparação Para Futuro"]
      }
    ],
    observation: "Priorizar de forma imediata a atualização das documentações pendentes para mitigar riscos graves apontados nas próximas auditorias de certificação."
  },
  actionPlansSlide: {
    plans: [
      {
        id: "77207",
        title: "PLANO DE AÇÃO - INDICADORES DHO",
        area: "DHO / Treinamento e Desenvolvimento",
        status: "Em andamento",
        actionNeeded: "Necessita de alimentação técnica de indicadores e fechamento final no sistema."
      },
      {
        id: "76646",
        title: "PLANO DE AÇÃO - ACIDENTES DE TRABALHO",
        area: "Segurança do Trabalho",
        status: "Em andamento",
        actionNeeded: "Necessita de preenchimento dos dados de contingência e encerramento operacional."
      },
      {
        id: "75109",
        title: "PA MANUTENÇÃO ESTRUTURA FÍSICA RH",
        area: "Administração de Pessoal",
        status: "Em andamento",
        actionNeeded: "Necessita de alimentação de status sobre reformas estruturais planejadas."
      },
      {
        id: "68291",
        title: "PLANO DE AÇÃO - AUDITORIA INTERNA DE RISCOS - CICLO 2024",
        area: "Gerência de Gestão de Pessoas",
        status: "Em andamento",
        actionNeeded: "Sub-ação 68291 (Revisão do Mapa de Gerenciamento de Riscos DHO) necessita de alimentação de dados e fechamento."
      }
    ],
    guidelines: [
      { text: "Planos com vigência superior a 1 ano exigem justificativa formal registrada no sistema.", isImportant: true }
    ]
  },
  onaSlide: {
    items: [
      {
        id: "ona-1",
        title: "Indicador de Riscos Psicossociais",
        responsible: "Segurança e Medicina do Trabalho",
        status: "Em andamento",
        details: "Reuniões integradas realizadas para criação e validação do novo indicador corporativo de riscos psicossociais.",
        requirement: "REQUISITO N° 4 NÍVEL II",
        progress: 50,
        steps: [
          { name: "Alinhamento inicial de reuniões estratégicas", completed: true },
          { name: "Definição de bases e campos lógicos para o indicador", completed: true },
          { name: "Definição formal da matriz de riscos psicossociais", completed: true },
          { name: "Desenho e construção do 1º esboço do painel visual", completed: false },
          { name: "1ª apresentação executiva para ajustes e validação de testes", completed: false },
          { name: "Validação final, disponibilização para a rede e monitoramento", completed: false }
        ]
      },
      {
        id: "ona-2",
        title: "AVCB HSL",
        responsible: "Segurança do Trabalho",
        status: "Em andamento",
        requirement: "REQUISITO N° 5 NÍVEL I SUBSEÇÃO 4.2",
        details: "São Lucas: Avançar com o plano de adequação da infraestrutura predial, observando a priorização das estruturas críticas no cronograma de investimentos. Evoluir na obtenção do AVCB – Auto de Vistoria do Corpo de Bombeiros, atualmente protocolado e em processo de análise."
      },
      {
        id: "ona-3",
        title: "Avaliação de Eficácia dos Treinamentos",
        responsible: "DHO",
        status: "Em andamento",
        requirement: "REQUISITO N° 6 NÍVEL II",
        details: "Comum às unidades: Ampliar a metodologia de avaliação de eficácia dos treinamentos realizados, além da sistemática realizada de pré e pós-teste de conhecimentos sobre o conteúdo das capacitações realizadas. Alinhar a percepção dos resultados mensurados com os objetivos iniciais propostos para o conteúdo da ação de capacitação e desenvolvimento dos profissionais. Considerar maior objetividade nos critérios de decisão dos gestores para a classificação dos resultados como \"eficaz\", evidenciando as estratégias de mensuração."
      },
      {
        id: "ona-4",
        title: "LNTD (Levantamento de Necessidade de Treinamento)",
        responsible: "DHO",
        status: "Em andamento",
        requirement: "REQUISITO N° 8 NÍVEL I",
        details: "Comum às unidades: Implementar sistemática de levantamento de necessidades de treinamentos periódicos ou pontuais específicos para o Corpo Clínico aberto que atua na Instituição. Aprimorar o método de levantamento de necessidade de treinamento, como, por exemplo, utilizando fontes de informação tais como as pesquisas de satisfação dos clientes, relatórios de auditorias, dados das comissões institucionais, entre outros. Avançar com a nova proposta de formulário de mapeamento, incluindo a definição de objetivo e/ou justificativa para a temática proposta para a capacitação dos profissionais. Evoluir com a apropriação da responsabilidade sobre o processo pelos líderes das áreas, além do que é realizado atualmente pelo setor de Desenvolvimento Humano Organizacional - DHO."
      }
    ]
  },
  nextStepsSlide: {
    steps: [
      { text: "Encerrar as RMs Críticas, priorizando aquelas de maior impacto regulatório.", completed: false, category: "RMs" },
      { text: "Atualizar todas as documentações pendentes, focando em Administração de Pessoal e Atração e Seleção.", completed: false, category: "Documentações" },
      { text: "Atualizar, alimentar e encerrar os 4 planos de ação pendentes no sistema.", completed: false, category: "Planos de Ação" },
      { text: "Priorizar auditorias internas e externas pendentes, com atenção especial aos prazos de 90 dias.", completed: false, category: "Auditorias" },
      { text: "Acompanhar de perto e de forma recorrente as pendências críticas voltadas à ONA.", completed: false, category: "ONA" }
    ]
  }
};

export const INITIAL_RM_LIST: RawRMItem[] = [
  // Atração e Seleção (4)
  { id: "12275", title: "Atraso para processo de movimentação de colaborador", area: "Atração e Seleção", type: "Processo", status: "Pendente" },
  { id: "9339", title: "AUDITORIA INTERNA DA QUALIDADE - CICLO 2025 - GERIR ATRAÇÃO E SELEÇÃO DE COLABORADORES ( AUDITORIA INTERNA )", area: "Atração e Seleção", type: "Auditoria Interna", status: "Recusado pela Qualidade", needsAction: "Analisar e mandar novamente" },
  { id: "12087", title: "AUDITORIA EXTERNA ISO 9001 - AMBULATÓRIOS ESPECIALIZADOS 2026 - GERIR ATRAÇÃO E SELEÇÃO DE COLABORADORES", area: "Atração e Seleção", type: "Auditoria Externa", status: "Pendente" },
  { id: "10726", title: "AVALIAÇÃO DA QUALIDADE DAS ANÁLISES DOS INDICADORES - GERÊNCIA DE GESTÃO DE PESSOAS ( RM EM CONJUNTO COM A SEGURANÇA DO TRABALHO )", area: "Atração e Seleção", type: "Indicadores", status: "Pendente", needsAction: "Em Conjunto com Segurança" },

  // Medicina do Trabalho (2)
  { id: "11485", title: "Auditoria de Acreditação ONA 2025 - Promover Saúde e Segurança Ocupacional", area: "Medicina do Trabalho", type: "Acreditação ONA", status: "Aguardando Resposta", needsAction: "Necessita respondê-la" },
  { id: "9718", title: "Ausência da realização do termo de feedback na avaliação de experiência", area: "Medicina do Trabalho", type: "Processo", status: "Recusado pela Qualidade", needsAction: "Analisar e mandar novamente" },

  // Administração de Pessoal (9)
  { id: "8527", title: "Atraso de manifestação ao cliente - Hospital 100% SUS", area: "Administração de Pessoal", type: "Manifestação Cliente", status: "Pendente" },
  { id: "9488", title: "Atraso de manifestação ao cliente - Hospital de Alta Complexidade", area: "Administração de Pessoal", type: "Manifestação Cliente", status: "Pendente" },
  { id: "7572", title: "Atraso de retorno de manifestação ao cliente", area: "Administração de Pessoal", type: "Manifestação Cliente", status: "Pendente" },
  { id: "9663", title: "Auditoria Interna da Qualidade - Ciclo 2025 - Gerir Administração de Pessoal", area: "Administração de Pessoal", type: "Auditoria Interna", status: "Pendente" },
  { id: "11827", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "Administração de Pessoal", type: "Nota Fiscal", status: "Pendente" },
  { id: "11826", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "Administração de Pessoal", type: "Nota Fiscal", status: "Pendente" },
  { id: "11822", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "Administração de Pessoal", type: "Nota Fiscal", status: "Pendente" },
  { id: "11813", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "Administração de Pessoal", type: "Nota Fiscal", status: "Pendente" },
  { id: "11961", title: "Falhas e inconsistências no ponto dos colaboradores do Centro de Autismo", area: "Administração de Pessoal", type: "Ponto de Pessoal", status: "Pendente" },

  // DHO (4)
  { id: "11514", title: "Auditoria de Acreditação ONA 2025 - Gerir Capacitação e Desenvolvimento", area: "DHO", type: "Acreditação ONA", status: "Aguardando Resposta", needsAction: "Necessita respondê-la" },
  { id: "12088", title: "Auditoria Externa ISO 9001:2015 - Ambulatórios Especializados 2026", area: "DHO", type: "Auditoria Externa", status: "Pendente" },
  { id: "9831", title: "Auditoria Interna da Qualidade - Ciclo 2025 - Gerir Capacitação e Desenvolvimento", area: "DHO", type: "Auditoria Interna", status: "Pendente" },
  { id: "12213", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "DHO", type: "Nota Fiscal", status: "Pendente", needsAction: "Verificar se condiz ou se foi aberto erroneamente" },

  // Segurança do Trabalho (4)
  { id: "9387", title: "Auditoria Interna da Qualidade - Ciclo 2025 - Promover Saúde e Segurança", area: "Segurança do Trabalho", type: "Auditoria Interna", status: "Recusado pela Qualidade", needsAction: "Analisar e mandar novamente" },
  { id: "10726", title: "Avaliação da qualidade das análises dos indicadores - Gerência de Gestão de Pessoas", area: "Segurança do Trabalho", type: "Indicadores", status: "Pendente", needsAction: "Em Conjunto com Atração" },
  { id: "11998", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "Segurança do Trabalho", type: "Nota Fiscal", status: "Pendente" },
  { id: "11994", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "Segurança do Trabalho", type: "Nota Fiscal", status: "Pendente" },

  // Dimensionamento (1)
  { id: "10603", title: "Auditoria Interna da Qualidade - Ciclo 2025 - Gerir Recursos Humanos", area: "Dimensionamento e Cargos e Remuneração", type: "Auditoria Interna", status: "Pendente" },

  // Consultoria Interna (1)
  { id: "8489", title: "Avaliação da qualidade das análises dos indicadores - Gerência de Gestão de Pessoas", area: "Consultoria Interna", type: "Indicadores", status: "Pendente" },

  // Gerência de Gestão de Pessoas (2)
  { id: "9203", title: "Ausência do preenchimento da avaliação de experiência", area: "Gerência de Gestão de Pessoas", type: "Processo", status: "Necessita DHO fechar pendência" },
  { id: "12002", title: "Entrega de nota fiscal em desacordo com a diretriz", area: "Gerência de Gestão de Pessoas", type: "Nota Fiscal", status: "Pendente" }
];
