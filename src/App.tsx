/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  FileSpreadsheet,
  Download,
  Calendar,
  Settings,
  X,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  PlusCircle,
  Activity,
  AlertCircle,
  FileText
} from 'lucide-react';
import { INITIAL_PRESENTATION_DATA, INITIAL_RM_LIST, RawRMItem } from './data';
import { PresentationData } from './types';
import { SantaCasaLogo } from './components/SantaCasaLogo';
import {
  Slide1,
  Slide2,
  Slide3,
  SlideRMAttention,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  SlideQualityCalendar,
  Slide8,
  SlideObrigado
} from './components/SlideRenderer';

export default function App() {
  // State for Presentation Data (allowing runtime tuning)
  const [data, setData] = useState<PresentationData>(INITIAL_PRESENTATION_DATA);
  const [rmList, setRmList] = useState<RawRMItem[]>(INITIAL_RM_LIST);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<'slides' | 'spreadsheet'>('slides');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Search & filter states for spreadsheet mode
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('Todas');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Todos');

  // Custom metadata tuner states
  const [editTitle, setEditTitle] = useState(data.metadata.title);
  const [editSubtitle, setEditSubtitle] = useState(data.metadata.subtitle);
  const [editDate, setEditDate] = useState(data.metadata.date);
  const [editInsight, setEditInsight] = useState(data.comparative.insight);

  // New RM adding form state
  const [showAddRM, setShowAddRM] = useState(false);
  const [newRMTitle, setNewRMTitle] = useState('');
  const [newRMArea, setNewRMArea] = useState('Administração de Pessoal');
  const [newRMStatus, setNewRMStatus] = useState('Pendente');

  // Persistent Slide Notes state
  const [slideNotes, setSlideNotes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('santa-casa-slide-notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('santa-casa-slide-notes', JSON.stringify(slideNotes));
  }, [slideNotes]);

  const slideCount = 10;

  // Keyboard navigation for slides
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (currentTab !== 'slides') return;
    
    // Ignore navigation keydown if typing inside an input or textarea
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

    if (e.key === 'ArrowRight') {
      setActiveSlide((prev) => Math.min(prev + 1, slideCount - 1));
    } else if (e.key === 'ArrowLeft') {
      setActiveSlide((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape' && isFullscreen) {
      setIsFullscreen(false);
    }
  }, [currentTab, isFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Apply tuned metadata to the current data state
  const saveSettings = () => {
    setData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        title: editTitle,
        subtitle: editSubtitle,
        date: editDate
      },
      comparative: {
        ...prev.comparative,
        insight: editInsight
      }
    }));
    setShowSettings(false);
  };

  // Dynamic filter for RMs
  const filteredRMs = rmList.filter((item) => {
    const matchesSearch = item.id.includes(searchTerm) || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.needsAction && item.needsAction.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesArea = selectedAreaFilter === 'Todas' || item.area === selectedAreaFilter;
    const matchesStatus = selectedStatusFilter === 'Todos' || 
      (selectedStatusFilter === 'Pendente' && item.status.toLowerCase().includes('pendente')) ||
      (selectedStatusFilter === 'Recusado' && item.status.toLowerCase().includes('recusado')) ||
      (selectedStatusFilter === 'Desacordo' && item.status.toLowerCase().includes('desacordo')) ||
      (selectedStatusFilter === 'Outros' && !item.status.toLowerCase().includes('pendente') && !item.status.toLowerCase().includes('recusado') && !item.status.toLowerCase().includes('desacordo'));

    return matchesSearch && matchesArea && matchesStatus;
  });

  // Unique areas list for spreadsheet filters
  const uniqueAreas = ['Todas', ...Array.from(new Set(rmList.map(item => item.area)))];

  // Resolve RM locally (simulation)
  const resolveRM = (id: string) => {
    setRmList((prev) => 
      prev.map((rm) => (rm.id === id ? { ...rm, status: 'Resolvido ✅' } : rm))
    );
  };

  // Add new RM locally
  const addNewRM = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRMTitle.trim()) return;
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();
    const newRM: RawRMItem = {
      id: randomId,
      title: newRMTitle,
      area: newRMArea,
      type: 'Custom',
      status: newRMStatus
    };
    
    setRmList((prev) => [newRM, ...prev]);
    
    // Update count in RM slide
    setData((prev) => {
      const byArea = [...prev.rmSlide.byArea];
      const areaIndex = byArea.findIndex(a => a.area === newRMArea);
      if (areaIndex !== -1) {
        byArea[areaIndex].count += 1;
      } else {
        byArea.push({ area: newRMArea, count: 1 });
      }
      return {
        ...prev,
        comparative: {
          ...prev.comparative,
          metrics: {
            ...prev.comparative.metrics,
            rm: {
              ...prev.comparative.metrics.rm,
              current: prev.comparative.metrics.rm.current + 1,
              change: `+${prev.comparative.metrics.rm.current + 1 - prev.comparative.metrics.rm.past}`
            }
          }
        },
        rmSlide: {
          ...prev.rmSlide,
          byArea
        }
      };
    });

    setNewRMTitle('');
    setShowAddRM(false);
  };

  // Render current slide component based on selection
  const renderSlide = () => {
    switch (activeSlide) {
      case 0:
        return <Slide1 data={data} />;
      case 1:
        return <Slide2 data={data} setData={setData} activeSlide={activeSlide} />;
      case 2:
        return <Slide3 data={data} setData={setData} activeSlide={activeSlide} />;
      case 3:
        return <SlideRMAttention data={data} setData={setData} activeSlide={activeSlide} />;
      case 4:
        return <Slide4 data={data} setData={setData} activeSlide={activeSlide} />;
      case 5:
        return <Slide5 data={data} setData={setData} activeSlide={activeSlide} />;
      case 6:
        return <Slide6 data={data} setData={setData} activeSlide={activeSlide} />;
      case 7:
        return <Slide7 data={data} setData={setData} activeSlide={activeSlide} />;
      case 8:
        return <SlideQualityCalendar data={data} setData={setData} activeSlide={activeSlide} />;
      case 9:
        return <SlideObrigado data={data} setData={setData} activeSlide={activeSlide} />;
      default:
        return <Slide1 data={data} />;
    }
  };

  const slideNames = [
    "Capa da Apresentação",
    "Comparativo Geral",
    "Relatórios de Melhoria",
    "Pontos de Atenção para RM",
    "Documentações",
    "Planos de Ação",
    "Novas Diretrizes",
    "Pendências ONA",
    "Calendário Auditoria 2026",
    "Agradecimento"
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isFullscreen ? 'bg-black p-0' : 'bg-gray-50'}`}>
      {/* Upper Navigation bar */}
      {!isFullscreen && (
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-40 shadow-xs">
          <div className="flex items-center gap-4">
            <SantaCasaLogo variant="horizontal" iconSize={36} />
            <div className="h-6 w-px bg-gray-200 hidden md:block" />
            <div>
              <h1 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
                Apresentação Executiva: Gestão de Qualidade
                <span className="px-1.5 py-0.5 bg-brand-muted text-brand text-[10px] font-semibold rounded">
                  2026
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-light font-sans mt-0.5">
                Gerência de Gestão de Pessoas — Status: {data.metadata.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Tab switchers */}
            <div className="bg-gray-100 p-1 rounded-lg flex items-center">
              <button
                onClick={() => setCurrentTab('slides')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  currentTab === 'slides'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Grid size={14} />
                Slides Executivos
              </button>
              <button
                onClick={() => setCurrentTab('spreadsheet')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  currentTab === 'spreadsheet'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <FileSpreadsheet size={14} />
                Planilha de RMs ({rmList.filter(r => r.status !== 'Resolvido ✅').length})
              </button>
            </div>

            <div className="h-4 w-px bg-gray-200 mx-1 hidden sm:block" />

            {/* Quick Actions */}
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors cursor-pointer"
              title="Ajustar Dados"
            >
              <Settings size={15} />
            </button>
            
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              title="Imprimir Apresentação"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Exportar PDF</span>
            </button>
            
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Maximize2 size={13} />
              Apresentar
            </button>
          </div>
        </header>
      )}

      {/* Main presentation workspace area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* SLIDES TAB */}
        {currentTab === 'slides' && (
          <>
            {/* Sidebar Slide Navigation - Hidden when fullscreen */}
            {!isFullscreen && (
              <aside className="w-full lg:w-72 bg-white border-r border-gray-100 p-5 overflow-y-auto hidden lg:flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Navegação de Slides
                  </h3>
                  <div className="space-y-1.5">
                    {slideNames.map((name, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                          activeSlide === idx
                            ? 'bg-brand-muted border-brand/20 text-brand'
                            : 'bg-transparent border-transparent hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold bg-white px-1.5 py-0.5 rounded shadow-xs border border-gray-100 flex-shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="truncate">
                          <span className="text-xs font-semibold block">{name}</span>
                          <span className="text-[10px] text-gray-400 font-light truncate">
                            {idx === 0 && 'Capa Executiva'}
                            {idx === 1 && 'Comparativo de Dados'}
                            {idx === 2 && 'Bar Chart e RMs por Área'}
                            {idx === 3 && 'Tópicos Críticos e Auditoria'}
                            {idx === 4 && 'Documentos por Área'}
                            {idx === 5 && 'Prazos e Status'}
                            {idx === 6 && 'Normativas de Governança'}
                            {idx === 7 && 'Indicadores ONA'}
                            {idx === 8 && 'Auditoria Externa 2026'}
                            {idx === 9 && 'Encerramento e Mensagem'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom guidance help */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 leading-relaxed font-light">
                  <div className="flex items-center gap-1.5 font-bold text-gray-700 mb-1">
                    <HelpCircle size={13} className="text-brand" /> Dicas de Apresentador
                  </div>
                  Pressione as teclas <strong className="font-semibold text-gray-800">Seta Esquerda</strong> e <strong className="font-semibold text-gray-800">Seta Direita</strong> do teclado para alternar entre os slides.
                </div>
              </aside>
            )}

            {/* Slide Container Area */}
            <div className={`flex-1 flex flex-col justify-center items-center ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}`}>
              <div 
                className={`w-full max-w-5xl aspect-[16/10] bg-white rounded-2xl overflow-hidden flex flex-col relative transition-shadow duration-500 ${
                  isFullscreen 
                    ? 'h-screen w-screen rounded-none max-w-none aspect-auto shadow-none' 
                    : 'shadow-xl border border-gray-100/50'
                }`}
              >
                {/* Fullscreen close bar */}
                {isFullscreen && (
                  <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400 bg-black/45 px-2 py-1 rounded">
                      Slide {activeSlide + 1} de {slideCount}
                    </span>
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="p-2 bg-black/45 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
                    >
                      <Minimize2 size={16} />
                    </button>
                  </div>
                )}

                {/* Render Slide */}
                <div className="flex-1 relative overflow-hidden bg-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="h-full w-full"
                    >
                      {renderSlide()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom Center Notes Field */}
                  {activeSlide !== 0 && activeSlide !== 9 && (
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
                      <div className="bg-white/95 backdrop-blur-xs border border-gray-200/80 hover:border-brand/40 shadow-md rounded-lg py-1 px-3 flex items-center gap-2 transition-all">
                        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
                          <FileText size={11} className="text-brand/80" /> Anotações:
                        </span>
                        <input
                          type="text"
                          value={slideNotes[activeSlide] || ''}
                          onChange={(e) => {
                            setSlideNotes(prev => ({
                              ...prev,
                              [activeSlide]: e.target.value
                            }));
                          }}
                          placeholder="Digite suas observações aqui..."
                          className="flex-1 bg-transparent border-none text-[11px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 p-0"
                        />
                        {slideNotes[activeSlide] && (
                          <button
                            onClick={() => setSlideNotes(prev => ({ ...prev, [activeSlide]: '' }))}
                            className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer shrink-0"
                            title="Limpar"
                          >
                            <X size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Slide Footer Controller Bar */}
                <div className={`px-8 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between z-10 ${isFullscreen ? 'px-12 py-5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <button
                      disabled={activeSlide === 0}
                      onClick={() => setActiveSlide((prev) => Math.max(prev - 1, 0))}
                      className="p-2 text-gray-500 hover:text-brand hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-all cursor-pointer"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-xs font-mono font-bold text-gray-500">
                      {String(activeSlide + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
                    </span>
                    <button
                      disabled={activeSlide === slideCount - 1}
                      onClick={() => setActiveSlide((prev) => Math.min(prev + 1, slideCount - 1))}
                      className="p-2 text-gray-500 hover:text-brand hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-all cursor-pointer"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Progress Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: slideCount }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeSlide === idx 
                            ? 'w-6 bg-brand' 
                            : 'w-2 bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider hidden sm:inline">
                    {slideNames[activeSlide]}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SPREADSHEET DATAGRID TAB */}
        {currentTab === 'spreadsheet' && (
          <div className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                    Relatórios de Melhoria (RM) — Banco de Dados Completo
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-0.5">
                    Lista oficial contendo todas as {rmList.length} RMs identificadas na auditoria. Pesquise e filtre dados instantaneamente.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddRM(true)}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  <PlusCircle size={14} />
                  Adicionar Nova RM
                </button>
              </div>

              {/* Grid search and filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquisar por ID, título ou ação necessária..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand"
                  />
                </div>

                {/* Filter Area */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/50 px-3 py-1.5 rounded-xl">
                  <Filter size={13} className="text-gray-400" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">Área:</span>
                  <select
                    value={selectedAreaFilter}
                    onChange={(e) => setSelectedAreaFilter(e.target.value)}
                    className="flex-1 bg-transparent text-xs font-medium text-gray-700 focus:outline-none cursor-pointer"
                  >
                    {uniqueAreas.map((area, idx) => (
                      <option key={idx} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                {/* Filter Status */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/50 px-3 py-1.5 rounded-xl">
                  <Activity size={13} className="text-gray-400" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">Status:</span>
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="flex-1 bg-transparent text-xs font-medium text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Pendente">Pendentes</option>
                    <option value="Recusado">Recusados pela Qualidade</option>
                    <option value="Desacordo">Notas em Desacordo</option>
                    <option value="Outros">Outros Status</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-mono text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="py-3.5 px-4 font-bold">Código RM</th>
                      <th className="py-3.5 px-4 font-bold">Título / Assunto da Pendência</th>
                      <th className="py-3.5 px-4 font-bold">Área Responsável</th>
                      <th className="py-3.5 px-4 font-bold">Classificação</th>
                      <th className="py-3.5 px-4 font-bold">Situação Atual</th>
                      <th className="py-3.5 px-4 font-bold text-right">Ação Coletiva</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    {filteredRMs.length > 0 ? (
                      filteredRMs.map((item) => (
                        <tr 
                          key={item.id} 
                          className={`hover:bg-gray-50/70 transition-colors ${
                            item.status === 'Resolvido ✅' ? 'bg-emerald-50/10' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                            #{item.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div>
                              <p className={`font-semibold ${item.status === 'Resolvido ✅' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                {item.title}
                              </p>
                              {item.needsAction && (
                                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                                  <AlertCircle size={10} /> {item.needsAction}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 font-medium">
                            {item.area}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-mono">
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              item.status === 'Resolvido ✅'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status.includes('Recusado')
                                  ? 'bg-red-50 text-brand border border-red-100'
                                  : item.status.includes('Desacordo')
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {item.status !== 'Resolvido ✅' ? (
                              <button
                                onClick={() => resolveRM(item.id)}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1 rounded transition-all cursor-pointer"
                              >
                                <CheckCircle size={12} />
                                Encerrar RM
                              </button>
                            ) : (
                              <span className="text-[10px] text-gray-400 font-mono italic">Resolvido</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-400 font-light">
                          Nenhum relatório de melhoria localizado correspondendo aos filtros vigentes.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Adjustments Sidebar/Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-end z-50">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-brand" />
                  <h3 className="font-display font-bold text-gray-900 text-sm">
                    Painel de Ajustes de Dados
                  </h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 rounded-full cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Título Principal</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Área / Subtítulo</label>
                  <input
                    type="text"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Data de Status</label>
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Insight Executivo (Slide 2)</label>
                  <textarea
                    rows={4}
                    value={editInsight}
                    onChange={(e) => setEditInsight(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-brand leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3 mt-8">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 bg-brand hover:bg-brand-hover text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New RM Modal */}
      {showAddRM && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddRM(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-900 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-bold text-gray-950 text-sm mb-4">
              Adicionar Novo Relatório de Melhoria (RM)
            </h3>

            <form onSubmit={addNewRM} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Título da Pendência</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Entrega de notas fiscais atrasadas..."
                  value={newRMTitle}
                  onChange={(e) => setNewRMTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Área Correlata</label>
                <select
                  value={newRMArea}
                  onChange={(e) => setNewRMArea(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-brand"
                >
                  <option value="Administração de Pessoal">Administração de Pessoal</option>
                  <option value="Atração e Seleção">Atração e Seleção</option>
                  <option value="DHO">DHO</option>
                  <option value="Segurança do Trabalho">Segurança do Trabalho</option>
                  <option value="Medicina do Trabalho">Medicina do Trabalho</option>
                  <option value="Gerência de Gestão de Pessoas">Gerência de Gestão de Pessoas</option>
                  <option value="Consultoria Interna">Consultoria Interna</option>
                  <option value="Dimensionamento e Cargos e Remuneração">Dimensionamento e Cargos e Remuneração</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Situação Inicial</label>
                <select
                  value={newRMStatus}
                  onChange={(e) => setNewRMStatus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-brand"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Recusado pela Qualidade">Recusado pela Qualidade</option>
                  <option value="Em análise">Em análise</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddRM(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Adicionar RM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
