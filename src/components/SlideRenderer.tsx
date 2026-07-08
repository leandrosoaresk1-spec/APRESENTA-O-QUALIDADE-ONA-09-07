/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  Award,
  Activity,
  FileSpreadsheet,
  UserCheck,
  ShieldAlert,
  ChevronRight,
  Check,
  Calendar,
  Info,
  Shield,
  Layers
} from 'lucide-react';
import { PresentationData, RMByArea, ActionPlan, ONAPendingItem } from '../types';
import { SantaCasaLogo } from './SantaCasaLogo';
import { INITIAL_RM_LIST } from '../data';

interface SlideProps {
  data: PresentationData;
  setData: React.Dispatch<React.SetStateAction<PresentationData>>;
  activeSlide: number;
}

// Slide 1: Capa (Cover)
export const Slide1: React.FC<{ data: PresentationData }> = ({ data }) => {
  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative overflow-hidden select-none">
      {/* Background visual accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-brand-muted/20 to-transparent pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-brand/5 pointer-events-none" />
      <div className="absolute right-24 bottom-24 w-96 h-96 rounded-full border border-brand/10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <span className="font-mono text-xs tracking-widest text-gray-400 uppercase">
          Apresentação Executiva
        </span>
        <div className="w-12 h-[2px] bg-brand" />
      </div>

      {/* Main Title Area */}
      <div className="my-auto max-w-4xl z-10">
        <div className="mb-6 flex items-center gap-3">
          <SantaCasaLogo variant="full" iconSize={64} />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          {data.metadata.title}
        </h1>
        <div className="h-[4px] w-32 bg-brand my-6" />
        <p className="font-sans text-lg md:text-xl text-gray-500 font-light tracking-wide leading-relaxed">
          {data.metadata.subtitle}
        </p>
        <p className="font-sans text-xs text-brand font-bold uppercase tracking-widest mt-2 bg-brand/5 inline-block px-2.5 py-0.5 rounded-full border border-brand/10">
          People Analytics
        </p>
      </div>

      {/* Footer Meta */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-gray-100 pt-8 z-10">
        <div>
          <span className="block font-mono text-xs text-gray-400 uppercase tracking-wider">Status das Pendências</span>
          <span className="text-gray-900 font-medium">{data.metadata.date}</span>
        </div>
        <div className="text-right">
          <span className="block font-mono text-xs text-gray-400 uppercase tracking-wider font-light">
            Organização
          </span>
          <div className="flex items-center gap-1.5 mt-1 justify-end">
            <span className="text-brand font-bold text-sm tracking-wider uppercase">
              Santa Casa BH
            </span>
            <SantaCasaLogo variant="icon-only" iconSize={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Slide 2: Comparativo Geral (Março x Julho)
export const Slide2: React.FC<SlideProps> = ({ data }) => {
  const { comparative } = data;
  const metrics = comparative.metrics;

  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Slide Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-5">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 02</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Comparativo Geral das Pendências
          </h2>
        </div>
        <div className="text-right font-mono text-xs text-gray-400">
          {comparative.dates.past} vs {comparative.dates.current}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto py-6">
        {/* Metric 1: RMs */}
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-brand/20 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand" />
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-gray-400 font-semibold tracking-wider uppercase">Relato de Melhoria (RM)</span>
              <span className="p-1.5 bg-brand-muted text-brand rounded-lg">
                <TrendingUp size={16} />
              </span>
            </div>
            
            <div className="flex items-baseline gap-6 my-4">
              <div>
                <span className="block text-xs text-gray-400 font-mono">MAR/2026</span>
                <span className="text-3xl font-display font-medium text-gray-400">{metrics.rm.past}</span>
              </div>
              <div className="text-gray-300 self-center text-xl">→</div>
              <div>
                <span className="block text-xs text-gray-800 font-semibold font-mono">JUL/2026</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display font-bold text-gray-900">{metrics.rm.current}</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-1 py-0.5 rounded-md font-bold tracking-tight font-sans self-end mb-1">
                    +17(novas)
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500">Variação no período</span>
            <span className="px-2.5 py-0.5 bg-brand-muted text-brand text-xs font-mono font-bold rounded-full flex items-center gap-1">
              ▲ +68% (+11 RM)
            </span>
          </div>
        </div>

        {/* Metric 2: Documentação */}
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden hover:border-gray-300 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-gray-400 font-semibold tracking-wider uppercase">Documentação</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingDown size={16} />
              </span>
            </div>
            
            <div className="flex items-baseline gap-6 my-4">
              <div>
                <span className="block text-xs text-gray-400 font-mono">MAR/2026</span>
                <span className="text-3xl font-display font-medium text-gray-400">{metrics.documentation.past}</span>
              </div>
              <div className="text-gray-300 self-center text-xl">→</div>
              <div>
                <span className="block text-xs text-gray-800 font-semibold font-mono">JUL/2026</span>
                <span className="text-5xl font-display font-bold text-gray-900">{metrics.documentation.current}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500">Variação no período</span>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-mono font-bold rounded-full flex items-center gap-1">
              ▼ -33% (-3 Docs)
            </span>
          </div>
        </div>

        {/* Metric 3: Planos de Ação */}
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden hover:border-gray-300 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-gray-400 font-semibold tracking-wider uppercase">Plano de Ação</span>
              <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                <Minus size={16} />
              </span>
            </div>
            
            <div className="flex items-baseline gap-6 my-4">
              <div>
                <span className="block text-xs text-gray-400 font-mono">MAR/2026</span>
                <span className="text-3xl font-display font-medium text-gray-400">{metrics.actionPlans.past}</span>
              </div>
              <div className="text-gray-300 self-center text-xl">→</div>
              <div>
                <span className="block text-xs text-gray-800 font-semibold font-mono">JUL/2026</span>
                <span className="text-5xl font-display font-bold text-gray-900">{metrics.actionPlans.current}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500">Variação no período</span>
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-mono font-bold rounded-full">
              0% Estável
            </span>
          </div>
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100 flex items-start gap-4 mt-auto">
        <span className="p-2 bg-brand/10 text-brand rounded-lg mt-0.5 font-bold text-xs uppercase font-mono">
          Insight
        </span>
        <p className="text-sm text-gray-600 leading-relaxed font-light">
          {comparative.insight}
        </p>
      </div>
    </div>
  );
};

// Slide 3: RM (Relatórios de Melhoria)
export const Slide3: React.FC<SlideProps> = ({ data }) => {
  const { rmSlide } = data;
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [selectedAreaIndex, setSelectedAreaIndex] = useState<number>(0); // Default to Administração de Pessoal (index 0)

  // Maximum value for scaling SVG charts
  const maxCount = Math.max(...rmSlide.byArea.map(a => a.count));

  const selectedArea = rmSlide.byArea[selectedAreaIndex]?.area;

  const rmsForArea = INITIAL_RM_LIST.filter(rm => {
    // Normalização básica dos nomes de áreas para garantir correspondência (ex: "Dimensionamento...")
    const norm1 = rm.area.replace(/[,&]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const norm2 = selectedArea ? selectedArea.replace(/[,&]/g, '').replace(/\s+/g, ' ').trim().toLowerCase() : '';
    
    // Tratamento especial para Dimensionamento
    if (norm1.includes('dimensionamento') && norm2.includes('dimensionamento')) {
      return true;
    }
    return norm1 === norm2;
  });

  return (
    <div className="h-full flex flex-col justify-start p-12 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 03</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            RM - Relatórios de Melhoria Pendentes
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Total de Pendências: <span className="text-brand font-bold">27</span>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 mt-8 mb-4 overflow-hidden">
        {/* Left column: Custom Horizontal SVG Bar Chart */}
        <div className="lg:col-span-6 flex flex-col h-full overflow-hidden">
          <h3 className="font-display text-sm font-bold text-gray-800 tracking-wider uppercase mb-5 flex items-center gap-2 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-brand" />
            Quantidade de RM por Área
          </h3>
          <div className="flex-1 overflow-y-auto pr-3 space-y-2 custom-scrollbar max-h-[460px]">
            {rmSlide.byArea.map((item, idx) => {
              const widthPercentage = (item.count / maxCount) * 100;
              const isSelected = selectedAreaIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`group cursor-pointer p-2.5 -mx-2 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-brand/5 border-brand/20 shadow-xs' 
                      : 'bg-transparent border-transparent hover:bg-gray-50/50'
                  }`}
                  onClick={() => setSelectedAreaIndex(idx)}
                  onMouseEnter={() => setActiveBar(idx)}
                  onMouseLeave={() => setActiveBar(null)}
                >
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className={`font-semibold truncate max-w-[280px] transition-colors ${
                      isSelected ? 'text-brand' : 'text-gray-700 group-hover:text-brand'
                    }`}>
                      {item.area}
                    </span>
                    <span className={`font-mono text-xs font-bold transition-colors ${
                      isSelected ? 'text-brand' : 'text-gray-900 group-hover:text-brand'
                    }`}>
                      {item.count} {item.count === 1 ? 'RM' : 'RMs'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand rounded-full origin-left"
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.05 }}
                      style={{
                        backgroundColor: isSelected || activeBar === idx ? '#F32020' : '#ff5a5a'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: RM Details by Area */}
        <div className="lg:col-span-6 flex flex-col h-full overflow-hidden">
          <h3 className="font-display text-sm font-bold text-gray-800 tracking-wider uppercase mb-5 flex items-center gap-2 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            Detalhamento de RM – {selectedArea?.toUpperCase()}
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[460px] space-y-4">
            {rmsForArea.map((rm) => {
              const isRecusado = rm.status.toLowerCase().includes('recusado') || rm.status.toLowerCase().includes('desacordo');
              const isAudit = rm.title.toLowerCase().includes('auditoria') || (rm.type && rm.type.toLowerCase().includes('auditoria'));
              return (
                <div 
                  key={rm.id} 
                  className={`border rounded-xl p-4 shadow-2xs hover:border-brand/20 transition-all relative overflow-hidden ${
                    isRecusado
                      ? 'border-red-100 bg-red-50/10'
                      : 'border-gray-100 bg-gray-50/20'
                  }`}
                >
                  {/* ID and Status badge */}
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-extrabold text-brand bg-red-50 px-2.5 py-0.5 rounded">
                        RM {rm.id}
                      </span>
                      {isAudit && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <AlertTriangle size={10} className="text-amber-500 shrink-0" />
                          Auditoria
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isRecusado
                        ? 'bg-red-100 text-red-700'
                        : rm.status.toLowerCase().includes('pendente')
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}>
                      {rm.status}
                    </span>
                  </div>

                  {/* RM Title */}
                  <p className="text-xs font-bold text-gray-800 leading-relaxed mb-2 flex items-start gap-1">
                    {isAudit && (
                      <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" title="RM de Auditoria" />
                    )}
                    <span>{rm.title}</span>
                  </p>

                  {/* Action/Instructions if they exist or if it is a special item */}
                  {rm.needsAction ? (
                    rm.status === 'Pendente' ? (
                      <div className="mt-2 p-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-medium text-gray-500 italic flex items-start gap-1.5">
                        <AlertCircle size={12} className="flex-shrink-0 mt-0.5 text-gray-400" />
                        <span>
                          Obs: {rm.needsAction}
                        </span>
                      </div>
                    ) : (rm.id === '11514' || rm.id === '11485') ? (
                      <div className="mt-2.5 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-[10.5px] font-semibold text-blue-700 flex items-start gap-1.5">
                        <AlertCircle size={12} className="flex-shrink-0 mt-0.5 text-blue-500" />
                        <span>
                          AGUARDANDO VERIFICAÇÃO DA QUALIDADE
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2.5 p-2.5 bg-red-50 border border-brand/10 rounded-lg text-[10.5px] font-semibold text-brand flex items-start gap-1.5">
                        <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                        <span>
                          FINALIZAR PENDÊNCIA ( {rm.status.toUpperCase()} , {rm.needsAction.toUpperCase()} )
                        </span>
                      </div>
                    )
                  ) : rm.status.toLowerCase().includes('recusado') ? (
                    <div className="mt-2.5 p-2.5 bg-red-50 border border-brand/10 rounded-lg text-[10.5px] font-semibold text-brand flex items-start gap-1.5">
                      <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                      <span>
                        FINALIZAR PENDÊNCIA ( RECUSADO PELA QUALIDADE , ANALISAR E MANDAR NOVAMENTE )
                      </span>
                    </div>
                  ) : null}

                  {/* Additional contextual labels to mimic the prompt's layout */}
                  <div className="mt-2.5 flex items-center gap-1.5 text-[9px] text-gray-400 font-mono">
                    <span>Tipo: {rm.type}</span>
                    <span>•</span>
                    <span>Área: {rm.area}</span>
                  </div>
                </div>
              );
            })}

            {rmsForArea.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-xs">
                Nenhuma pendência de RM encontrada para esta área.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Slide: Pontos de Atenção para RM (Slide 04)
export const SlideRMAttention: React.FC<SlideProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-5">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 04</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Pontos de Atenção para RM
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Riscos & Prioridades Críticas
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto py-6">
        {/* Card 1: Atraso de Notas Fiscais */}
        <div className="bg-red-50/10 border border-red-100 rounded-2xl p-8 flex flex-col justify-between shadow-2xs hover:border-brand/20 transition-all">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 bg-red-50 text-brand rounded-xl">
                <AlertTriangle size={24} className="text-brand" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Atraso de Notas Fiscais</h3>
                <span className="font-mono text-[10px] text-brand font-bold bg-red-50/50 px-2 py-0.5 rounded uppercase mt-1 inline-block">8 RMs no Total</span>
              </div>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-medium mb-6">
              Identificado volume crítico de problemas recorrentes relacionados ao atraso no recebimento/processamento de notas fiscais. Esse tema gerou múltiplas aberturas de RMs pela Controladoria.
            </p>
          </div>

          <div className="bg-white border border-red-100/50 p-4 rounded-xl shadow-2xs">
            <span className="block font-mono text-[9px] text-brand font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Award size={12} className="text-brand" /> RECOMENDAÇÃO OPERACIONAL
            </span>
            <p className="text-xs text-gray-800 font-extrabold leading-relaxed">
              Avaliar a necessidade de realizar um alinhamento direto com a área responsável (conversa de alinhamento) para tratar este tema.
            </p>
          </div>
        </div>

        {/* Card 2: Priorização de Auditorias */}
        <div className="bg-gray-50/30 border border-gray-100 rounded-2xl p-8 flex flex-col justify-between shadow-2xs hover:border-gray-200 transition-all">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 bg-gray-100 text-gray-600 rounded-xl">
                <ShieldAlert size={24} className="text-gray-500" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Priorização de Auditorias</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase">Internas & Externas</span>
                  <span className="font-mono text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-100 px-2 py-0.5 rounded uppercase">6 RM de Auditorias</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-medium mb-6">
              Diretriz estratégica para priorizar a finalização tanto das Auditorias Internas quanto das Auditorias Externas em andamento.
            </p>
          </div>

          <div className="bg-emerald-50/20 border border-emerald-100 p-4 rounded-xl">
            <span className="block font-mono text-[9px] text-emerald-700 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-600" /> STATUS DA AUDITORIA INTERNA 2026
            </span>
            <p className="text-xs text-gray-800 font-extrabold leading-relaxed">
              Importante destacar que as RMs de Auditoria Interna de 2026 estão atualmente dentro do prazo estipulado.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100">
        <span>Foco: Mitigação de Riscos em RMs</span>
        <span>Alinhamento com Controladoria e Qualidade</span>
      </div>
    </div>
  );
};

// Slide 4: Documentações
export const Slide4: React.FC<SlideProps> = ({ data }) => {
  const { documentationSlide } = data;
  const [selectedArea, setSelectedArea] = useState<number>(0);

  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-5">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 05</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Documentações Pendentes por Área
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Total Pendentes: <span className="text-brand font-bold">6 Documentos</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-6">
        {/* Left: Minimal Area Indicators */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          <h3 className="font-display text-sm font-bold text-gray-800 tracking-wider uppercase mb-2">
            Visão das Áreas Pendentes
          </h3>
          
          <div className="space-y-3">
            {documentationSlide.byArea.map((doc, idx) => {
              const isSelected = selectedArea === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedArea(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-brand bg-brand-muted/40 shadow-sm'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-lg ${isSelected ? 'bg-brand text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <FileText size={16} />
                    </span>
                    <div>
                      <h4 className={`text-sm font-bold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                        {doc.area}
                      </h4>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {doc.items.length} {doc.items.length === 1 ? 'pendência' : 'pendências'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-2xl font-bold text-gray-900">{doc.count}</span>
                    <ChevronRight size={16} className={`text-gray-400 transition-transform ${isSelected ? 'transform translate-x-1 text-brand' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Documents List of selected area */}
        <div className="lg:col-span-7 bg-gray-50/50 border border-gray-100 rounded-xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
              <span className="font-mono text-xs text-brand font-semibold tracking-wider uppercase">
                Listagem Detalhada
              </span>
              <span className="text-xs text-gray-500">
                {documentationSlide.byArea[selectedArea].area}
              </span>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedArea}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {documentationSlide.byArea[selectedArea].items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-gray-100/80 rounded-lg p-4 flex items-center justify-between shadow-sm hover:border-brand/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                        <span className="font-mono text-xs font-bold text-gray-800">{item.split(' - ')[0]}</span>
                        {item.includes(' - ') && (
                          <span className="text-xs text-gray-500 font-light truncate max-w-[320px]">
                            — {item.split(' - ')[1]}
                          </span>
                        )}
                      </div>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-mono rounded">
                        Revisar
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Action note */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-brand flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              <strong className="text-gray-700 font-semibold">Observação:</strong> {documentationSlide.observation}
            </p>
          </div>
        </div>
      </div>

      {/* Mini Progress Visual Indicator */}
      <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100/80">
        <span>Foco Estratégico: Redução de Riscos em Auditorias</span>
        <span>Apenas Atração e Seleção e Administração de Pessoal Pendentes</span>
      </div>
    </div>
  );
};

// Slide 5: Planos de Ação
export const Slide5: React.FC<SlideProps> = ({ data }) => {
  const { actionPlansSlide } = data;
  const [activePlan, setActivePlan] = useState<number>(0);

  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 06</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Status dos Planos de Ação Pendentes
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Total Ativos: <span className="text-brand font-bold">4 Planos</span>
        </div>
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4">
        {/* Left: Pending Plans Cards */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
          <h3 className="font-display text-sm font-bold text-gray-800 tracking-wider uppercase mb-2">
            Planos de Ação Sob Monitoramento
          </h3>
          
          <div className="space-y-3 max-h-[290px] overflow-y-auto pr-2">
            {actionPlansSlide.plans.map((plan, idx) => (
              <div 
                key={plan.id}
                onClick={() => setActivePlan(idx)}
                className={`bg-white border rounded-xl p-4 shadow-sm hover:border-brand/20 transition-all cursor-pointer relative overflow-hidden ${
                  activePlan === idx ? 'border-brand/40 ring-1 ring-brand/5' : 'border-gray-100'
                }`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full ${
                  plan.status === 'Pendente' ? 'bg-brand' : 'bg-amber-400'
                }`} />
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold text-brand bg-brand-muted px-2 py-0.5 rounded">
                        PA {plan.id}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono truncate max-w-[150px]">
                        {plan.area}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
                      {plan.title}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    plan.status === 'Pendente' 
                      ? 'bg-red-50 text-brand' 
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {plan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Plan Details */}
        <div className="lg:col-span-5 bg-gray-50/50 border border-gray-100 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-wider mb-2">
              Detalhamento Técnico do Plano
            </span>
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3.5 mb-4">
              <span className="font-mono text-xs font-bold text-brand bg-brand-muted px-2.5 py-1 rounded">
                PA {actionPlansSlide.plans[activePlan].id}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                actionPlansSlide.plans[activePlan].status === 'Pendente' 
                  ? 'bg-red-50 text-brand' 
                  : 'bg-amber-50 text-amber-700'
              }`}>
                {actionPlansSlide.plans[activePlan].status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Título do Plano</h4>
                <p className="text-xs font-bold text-gray-800 mt-1">{actionPlansSlide.plans[activePlan].title}</p>
              </div>
              
              <div>
                <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Área Responsável</h4>
                <p className="text-xs text-gray-600 font-medium mt-1">{actionPlansSlide.plans[activePlan].area}</p>
              </div>

              <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-xs">
                <h4 className="text-[10px] font-mono text-brand font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={12} /> Ação Necessária
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed font-light mt-1.5">
                  {actionPlansSlide.plans[activePlan].actionNeeded}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 leading-relaxed font-light flex items-center gap-1.5">
            <Clock size={12} className="text-gray-400" /> Atualização obrigatória via sistema MV Estratégico.
          </div>
        </div>
      </div>

      {/* Status Info */}
      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100/80">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand" /> Pendente de preenchimento/alimentação
        </div>
        <div className="flex items-center gap-1.5 ml-4">
          <span className="w-2 h-2 rounded-full bg-amber-400" /> Em andamento
        </div>
      </div>
    </div>
  );
};

// Slide 6: Novas Diretrizes do Plano de Ação
export const Slide6: React.FC<SlideProps> = ({ data }) => {
  const { actionPlansSlide } = data;

  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 07</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Novas Diretrizes do Plano de Ação
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Regras de Governança
        </div>
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4">
        {/* Left Column: Visual time limit timeline / bento grid cards */}
        <div className="lg:col-span-5 grid grid-rows-2 gap-4">
          <div className="bg-red-50/40 border border-brand/10 rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] text-brand font-bold uppercase tracking-widest">
                Derivados de Auditoria
              </span>
              <span className="p-1 bg-brand text-white rounded">
                <ShieldAlert size={14} />
              </span>
            </div>
            <div className="mt-4">
              <span className="block text-3xl font-display font-black text-brand">90 Dias</span>
              <span className="text-xs text-gray-500 font-light mt-1 block">
                Prazo máximo estrito e improrrogável para planos de ação de auditoria.
              </span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
                Plano de Ação Padrão
              </span>
              <span className="p-1 bg-gray-200 text-gray-600 rounded">
                <Clock size={14} />
              </span>
            </div>
            <div className="mt-4">
              <span className="block text-3xl font-display font-bold text-gray-800">365 Dias</span>
              <span className="text-xs text-gray-500 font-light mt-1 block">
                Prazo recomendado para a conclusão de planos de ação corporativos padrão (1 ano).
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Guidelines list */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-display text-xs font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award size={14} className="text-brand" /> Diretrizes de Conformidade & Rigor Técnico
            </h3>
            
            <div className="space-y-4">
              {actionPlansSlide.guidelines.map((guideline, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                    guideline.isImportant ? 'bg-red-50 text-brand' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {guideline.isImportant ? <ShieldAlert size={10} /> : <Check size={10} />}
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    guideline.isImportant ? 'text-gray-900 font-medium' : 'text-gray-600 font-light'
                  }`}>
                    {guideline.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Aba Detalhe Box */}
            <div className="mt-5 p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
              <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-wider mb-2.5">
                Aba "Detalhe" – Preenchimento Obrigatório
              </span>
              <div className="grid grid-cols-3 gap-2.5 mb-3">
                <div className="bg-white border border-gray-100 rounded-lg p-2.5 text-center shadow-xs">
                  <span className="block font-sans text-xs font-bold text-gray-700">Descrição</span>
                  <span className="text-[9px] text-gray-400 mt-0.5 block">Detalhamento claro</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-2.5 text-center shadow-xs">
                  <span className="block font-sans text-xs font-bold text-gray-700">Objetivo</span>
                  <span className="text-[9px] text-gray-400 mt-0.5 block">Meta esperada</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-2.5 text-center shadow-xs">
                  <span className="block font-sans text-xs font-bold text-gray-700">Riscos</span>
                  <span className="text-[9px] text-gray-400 mt-0.5 block">Mitigação prévia</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50/40 border border-amber-100/40 p-2.5 rounded-lg">
                <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium text-[10.5px] leading-relaxed">
                  Metodologias <strong className="font-bold">5W2H</strong> e <strong className="font-bold">Diagrama de Ishikawa</strong> são obrigatórias na estruturação das ações.
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-5 p-4 bg-red-50/40 border border-brand/10 border-l-4 border-l-brand rounded-r-xl rounded-l-md shadow-xs">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-brand font-bold uppercase tracking-wider mb-1.5">
              <Award size={12} className="animate-pulse" /> RECOMENDAÇÃO OPERACIONAL GERAL
            </span>
            <p className="text-xs text-gray-800 font-extrabold leading-relaxed">
              Cada área deve estruturar um Plano de Melhoria anual unificado, garantindo visibilidade e acompanhamento contínuo da alta gestão.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100/80">
        <span>Diretriz: Alinhamento de Metas de Governança Corporativa</span>
        <span>Sistema de Gestão de Qualidade Santa Casa BH</span>
      </div>
    </div>
  );
};

// Slide 7: Pendências ONA
export const Slide7: React.FC<SlideProps> = ({ data, setData }) => {
  const { onaSlide } = data;
  const [expandedItem, setExpandedItem] = useState<string | null>("ona-1");

  // Handle checking checklist items on ONA-1
  const toggleStep = (stepIdx: number) => {
    setData(prev => {
      const items = [...prev.onaSlide.items];
      const psychItem = items.find(i => i.id === "ona-1");
      if (psychItem && psychItem.steps) {
        const updatedSteps = [...psychItem.steps];
        updatedSteps[stepIdx].completed = !updatedSteps[stepIdx].completed;
        const completedCount = updatedSteps.filter(s => s.completed).length;
        psychItem.steps = updatedSteps;
        psychItem.progress = Math.round((completedCount / updatedSteps.length) * 100);
      }
      return {
        ...prev,
        onaSlide: { items }
      };
    });
  };

  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 08</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Requisitos ONA – Não Conformidade Parcial
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Foco: <span className="text-brand font-bold">4 Itens ONA</span>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4">
        {/* Left: Interactive list of ONA cards */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
          {onaSlide.items.map((item) => {
            const isExpanded = expandedItem === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isExpanded ? 'border-brand bg-brand-muted/10 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">
                      {item.responsible}
                    </span>
                    <h3 className="text-xs font-bold text-gray-800">{item.title}</h3>
                    {item.requirement && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-block font-mono text-[9px] font-bold text-brand bg-red-50/50 border border-brand/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {item.requirement}
                        </span>
                        {item.requirement.includes("N° 6") && (
                          <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            <Shield size={10} className="text-amber-500 shrink-0" />
                            CORE
                          </span>
                        )}
                        {(item.requirement.includes("N° 8") || item.requirement.includes("N° 5")) && (
                          <>
                            <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              <Shield size={10} className="text-amber-500 shrink-0" />
                              CORE
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              <Layers size={10} className="text-blue-500 shrink-0" />
                              TRANSVERSAL
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold ${
                    item.status === 'Pendente' 
                      ? 'bg-red-50 text-brand' 
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {item.progress !== undefined && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full" style={{ width: `${item.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono font-bold">
                      {item.progress}% Concluído
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Detailed checklist or sub-actions */}
        <div className="lg:col-span-6 bg-gray-50/50 border border-gray-100 rounded-xl p-6 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {expandedItem ? (
              <motion.div
                key={expandedItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-between"
              >
                {/* Displaying details of the selected item */}
                {(() => {
                  const item = onaSlide.items.find(i => i.id === expandedItem);
                  if (!item) return null;
                  return (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="border-b border-gray-100 pb-3 mb-4 flex justify-between items-center">
                          <span className="font-mono text-[10px] text-brand font-bold uppercase tracking-wider">
                            Detalhamento ONA
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">{item.responsible}</span>
                        </div>
                        
                        <h4 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h4>
                        {item.requirement && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-block font-mono text-[10px] font-extrabold text-brand bg-red-50/50 px-2.5 py-1 rounded border border-brand/10 uppercase tracking-wider">
                              {item.requirement}
                            </span>
                            {item.requirement.includes("N° 6") && (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded uppercase tracking-wider">
                                <Shield size={11} className="text-amber-500 shrink-0" />
                                CORE
                              </span>
                            )}
                            {(item.requirement.includes("N° 8") || item.requirement.includes("N° 5")) && (
                              <>
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded uppercase tracking-wider">
                                  <Shield size={11} className="text-amber-500 shrink-0" />
                                  CORE
                                </span>
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded uppercase tracking-wider">
                                  <Layers size={11} className="text-blue-500 shrink-0" />
                                  TRANSVERSAL
                                </span>
                              </>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">{item.details}</p>

                        {/* Interactive checklist for Riscos Psicossociais */}
                        {item.id === "ona-1" && item.steps && (
                           <div className="space-y-2 mt-4 max-h-[170px] overflow-y-auto pr-1">
                            <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-wider mb-2">
                              Etapas de Desenvolvimento (Simule Conclusão)
                            </span>
                            {item.steps.map((step, idx) => (
                              <div 
                                key={idx} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStep(idx);
                                }}
                                className="flex items-center gap-2.5 cursor-pointer text-xs group"
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                  step.completed 
                                    ? 'bg-brand border-brand text-white' 
                                    : 'border-gray-300 group-hover:border-brand bg-white'
                                }`}>
                                  {step.completed && <Check size={10} strokeWidth={3} />}
                                </div>
                                <span className={`text-xs ${
                                  step.completed 
                                    ? 'text-gray-400 line-through' 
                                    : 'text-gray-700'
                                }`}>
                                  {step.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <Activity size={24} className="mb-2 text-gray-300 animate-pulse" />
                <p className="text-xs font-light">Selecione uma pendência ONA ao lado para detalhamento técnico.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100/80">
        <span className="text-amber-800 font-medium">NOTA &gt; Ultima reunião da qualidade foi mencionado sobre o % de dimensionamento da Santa Casa BH | REQUISITO I NÍVEL I ELE É "CORE" e "TRANSVERSAL"</span>
      </div>
    </div>
  );
};

// Slide 9: Calendário de Auditorias Externas (Slide 09)
export const SlideQualityCalendar: React.FC<SlideProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Top Header Row with Logo */}
      <div className="flex justify-between items-start">
        <SantaCasaLogo variant="full" iconSize={50} />
        <span className="font-mono text-xs text-gray-400">Slide 09</span>
      </div>

      {/* Main Title and Calendar Block */}
      <div className="my-auto flex flex-col items-center justify-center py-4">
        {/* Title: CALENDÁRIO - AUDITORIAS EXTERNAS DA QUALIDADE 2026 */}
        <h2 className="font-sans text-xl md:text-2xl font-black tracking-wider text-gray-800 text-center mb-8 uppercase">
          CALENDÁRIO - AUDITORIAS EXTERNAS DA QUALIDADE 2026
        </h2>

        {/* Grid layout showing both ONA 2022 and other Confirmed Audits */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch px-4">
          {/* Main ONA Audit Box */}
          <div className="bg-white border border-gray-400/80 rounded-sm overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="bg-[#B91C1C] text-white py-3.5 text-center font-sans font-bold text-xs tracking-widest border-b border-gray-400 uppercase">
                MANUAL ONA 2022 – SANTA CASA BH
              </div>
              <div className="py-8 px-4 text-center bg-white font-sans text-lg md:text-xl font-bold text-gray-800 tracking-wide flex flex-col items-center justify-center gap-2">
                <Calendar className="text-[#B91C1C] w-6 h-6 shrink-0" />
                <span>21/09/2026 a 25/09/2026</span>
              </div>
            </div>
            <div className="bg-gray-50/50 border-t border-gray-100 py-2.5 px-4 text-center">
              <span className="text-[9px] font-bold text-brand uppercase tracking-wider">Acreditação Hospitalar ONA</span>
            </div>
          </div>

          {/* Confirmed Audits Box */}
          <div className="bg-white border border-gray-300 rounded-sm overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="bg-gray-800 text-white py-3.5 text-center font-sans font-bold text-xs tracking-widest border-b border-gray-300 uppercase">
                AUDITORIAS ADICIONAIS CONFIRMADAS
              </div>
              <div className="p-4 space-y-3">
                {/* Audit 1 */}
                <div className="flex items-center justify-between p-2.5 bg-gray-50/80 border border-gray-100 rounded-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                      <Calendar className="text-blue-600 w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">ISO Faculdade</h4>
                      <p className="text-[9px] text-gray-400 font-mono">CONFIRMADA</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-sm font-mono">
                      08/09 a 09/09
                    </span>
                  </div>
                </div>

                {/* Audit 2 */}
                <div className="flex items-center justify-between p-2.5 bg-gray-50/80 border border-gray-100 rounded-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0">
                      <Calendar className="text-emerald-600 w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">Selo Unimed</h4>
                      <p className="text-[9px] text-gray-400 font-mono">CONFIRMADA</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-sm font-mono">
                      15/10 a 16/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50/50 border-t border-gray-100 py-2.5 px-4 text-center">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono">Outras Certificações Externas</span>
            </div>
          </div>
        </div>

        {/* Footnotes / Additional Info exactly matched */}
        <div className="w-full max-w-2xl mt-8 text-center space-y-3 font-sans text-gray-700 font-medium">
          <p className="text-xs md:text-sm leading-relaxed text-[#2D3748]">
            O cronograma de visitas será divulgado assim que a IAC (DNV/IBES) o disponibilizar à equipe da Qualidade.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-[#2D3748]">
            As datas agendadas poderão sofrer alterações, conforme necessidade.
          </p>
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100">
        <span>Foco: Auditorias Externas 2026</span>
        <span>Acreditação ONA 2022</span>
      </div>
    </div>
  );
};

// Slide 8: Próximos Passos (Next Steps Timeline)
export const Slide8: React.FC<SlideProps> = ({ data, setData }) => {
  const { nextStepsSlide } = data;

  // Handle toggling check items
  const toggleStep = (idx: number) => {
    setData(prev => {
      const updatedSteps = [...prev.nextStepsSlide.steps];
      updatedSteps[idx].completed = !updatedSteps[idx].completed;
      return {
        ...prev,
        nextStepsSlide: { steps: updatedSteps }
      };
    });
  };

  const completedCount = nextStepsSlide.steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / nextStepsSlide.steps.length) * 100);

  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-5">
        <div>
          <span className="font-mono text-xs text-brand font-medium tracking-widest uppercase">Slide 10</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Plano de Ação e Próximos Passos
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Metas de Curto Prazo
        </div>
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-6">
        {/* Left: Dynamic Checklist and interactive meter */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-gray-800 tracking-wider uppercase mb-1">
              Checklist Executivo de Metas
            </h3>
            <p className="text-xs text-gray-400 font-light">Simule a conclusão das atividades prioritárias durante reuniões de alinhamento.</p>
          </div>
          
          <div className="space-y-4">
            {nextStepsSlide.steps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => toggleStep(idx)}
                className="flex items-center gap-3.5 group cursor-pointer bg-gray-50/30 p-3 rounded-xl border border-transparent hover:border-brand/10 hover:bg-brand-muted/20 transition-all"
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  step.completed 
                    ? 'bg-brand border-brand text-white' 
                    : 'border-gray-300 group-hover:border-brand bg-white'
                }`}>
                  {step.completed && <Check size={12} strokeWidth={3} />}
                </div>
                <div className="flex-1">
                  <span className={`text-xs block ${
                    step.completed ? 'text-gray-400 line-through font-light' : 'text-gray-700 font-medium'
                  }`}>
                    {step.text}
                  </span>
                  <span className="text-[9px] font-mono font-semibold text-brand tracking-widest uppercase mt-0.5 block">
                    {step.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: High-impact Summary Meter (McKinsey visual style) */}
        <div className="lg:col-span-5 bg-gray-50/50 border border-gray-100 rounded-xl p-8 flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-wider mb-6">
              Status do Cronograma de Qualidade
            </span>
            
            {/* Visual Circular Meter */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="72" 
                  cy="72" 
                  r="64" 
                  className="stroke-gray-100 fill-none" 
                  strokeWidth="8" 
                />
                <motion.circle 
                  cx="72" 
                  cy="72" 
                  r="64" 
                  className="stroke-brand fill-none" 
                  strokeWidth="8"
                  strokeDasharray={402}
                  animate={{ strokeDashoffset: 402 - (402 * progressPercent) / 100 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-bold text-gray-900">{progressPercent}%</span>
                <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Concluído</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-xs font-bold text-gray-800 mb-1">
              {completedCount} de {nextStepsSlide.steps.length} Metas Concluídas
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-light px-4">
              Avance nas pendências críticas antes do cronograma de auditorias externas agendado para Setembro/2026.
            </p>
          </div>
        </div>
      </div>

      {/* Next steps timeline indicator */}
      <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100/80">
        <span>Foco: Ciclo de Qualidade Julho/2026</span>
        <span className="flex items-center gap-1 text-brand">
          Auditoria de Certificação ONA (21/09/2026) <ArrowRight size={10} />
        </span>
      </div>
    </div>
  );
};

// Slide 11: SlideObrigado (Thank you, People Analytics and Motivational message)
export const SlideObrigado: React.FC<SlideProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col justify-between p-12 bg-white relative overflow-hidden select-none">
      {/* Background visual accents */}
      <div className="absolute left-0 bottom-0 w-1/3 h-full bg-gradient-to-r from-brand-muted/20 to-transparent pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-brand/5 pointer-events-none" />
      <div className="absolute right-12 top-12 w-80 h-80 rounded-full border border-brand/5 pointer-events-none" />

      {/* Top Header Row with Logo */}
      <div className="flex justify-between items-start z-10">
        <SantaCasaLogo variant="full" iconSize={50} />
        <span className="font-mono text-xs text-gray-400">Slide 10</span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto flex flex-col items-center text-center max-w-2xl mx-auto z-10">
        {/* Animated Greeting */}
        <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-none mb-4">
          Obrigado!
        </h1>
        
        {/* Subtitle / Department and People Analytics */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="font-sans text-sm text-gray-500 tracking-wide font-medium">
            Gerência de Gestão de Pessoas
          </span>
          <span className="font-sans text-xs text-brand font-extrabold uppercase tracking-widest bg-brand-muted/40 px-3 py-1 rounded-full border border-brand/10">
            People Analytics
          </span>
        </div>

        {/* Divider line */}
        <div className="h-[2px] w-16 bg-brand mb-8" />

        {/* Motivational message */}
        <p className="font-sans text-base md:text-lg text-gray-600 font-medium italic leading-relaxed max-w-lg">
          "Dados nos dão direção, pessoas nos dão propósito. Juntos, transformamos indicadores em saúde de ponta para todos."
        </p>
      </div>

      {/* Footer bar */}
      <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100 z-10">
        <span>Gestão de Pessoas & Qualidade 2026</span>
        <span>Santa Casa BH</span>
      </div>
    </div>
  );
};
