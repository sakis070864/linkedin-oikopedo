"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Maximize, TrendingUp, Shield, AlertTriangle, 
  Zap, Info, MessageSquare, Linkedin, Download, 
  Search, Building, TreePine, Droplets, Lightbulb,
  Euro, BarChart3, PieChart, Activity, ChevronRight,
  Loader2, CheckCircle2, Scale, Map as MapIcon,
  GanttChart, Target, Compass, RefreshCcw, Globe,
  HelpCircle, X, Sparkles
} from 'lucide-react';

// Kenes times gia to katharismo (Clear)
const EMPTY_INPUTS = {
  m2: '',
  factor: '',
  buildCostM2: '',
  sellPriceM2: '',
  plotPrice: ''
};

// Deigmata oikopedon me analytikh AI logikh
const SAMPLE_PLOTS = [
  {
    id: 1,
    name: "Athens Center - Pagrati",
    m2: 400,
    factor: 2.1,
    buildCostM2: 1600,
    sellPriceM2: 4200,
    plotPrice: 850000,
    location: "Pagrati, Athens, Greece",
    tags: ["Urban", "High Density"],
    aiAnalysis: {
      strategy: "Aggressive residential development. Focus on compact, high-design luxury lofts for young professionals.",
      technical: "High building factor (2.1) allows for vertical expansion. Check soil stability for 7+ floors and archaeological proximity to the Stadium area.",
      market: "High liquidity zone. Projected exit value €3.3M+ with current absorption rates in central Athens.",
      risk: "Medium-Low. Main risk is construction permits delay due to local municipality backlog."
    }
  },
  {
    id: 2,
    name: "Glyfada - Golf Area",
    m2: 800,
    factor: 0.8,
    buildCostM2: 2200,
    sellPriceM2: 8500,
    plotPrice: 2100000,
    location: "Golf, Glyfada, Greece",
    tags: ["Premium", "Coastal"],
    aiAnalysis: {
      strategy: "Ultra-luxury single villa or two high-end maisonettes with private pools and smart home automation.",
      technical: "Strict height limitations apply. Maximize basement levels for spa/gym facilities to increase total livable m2.",
      market: "Exclusive demand from international investors. Capital appreciation projected at 12% annually due to the Ellinikon project.",
      risk: "Low. High entry cost but guaranteed exit in the premium segment."
    }
  },
  {
    id: 3,
    name: "Kifisia - Strofili",
    m2: 1200,
    factor: 0.6,
    buildCostM2: 2000,
    sellPriceM2: 6500,
    plotPrice: 1800000,
    location: "Kifisia, Athens, Greece",
    tags: ["Residential", "Safe"],
    aiAnalysis: {
      strategy: "Family-oriented luxury complex. High emphasis on green building (Leed Certified) and communal garden spaces.",
      technical: "Traditional settlement constraints. External aesthetics must comply with Kifisia architecture board guidelines.",
      market: "Stable demand. Low volatility. Preferred by high-net-worth local families seeking long-term residence.",
      risk: "Minimal. Steady 18-24 month development cycle."
    }
  },
  {
    id: 5,
    name: "Mykonos - Super Paradise",
    m2: 4000,
    factor: 0.1,
    buildCostM2: 3500,
    sellPriceM2: 12000,
    plotPrice: 1500000,
    location: "Super Paradise, Mykonos, Greece",
    tags: ["Luxury", "Tourism"],
    aiAnalysis: {
      strategy: "Boutique hospitality or trophy villa. Focus on outdoor entertainment spaces and iconic Cycladic minimalism.",
      technical: "Harsh environmental conditions (wind/salt). Strictly monitor water supply infrastructure and legal forestry mapping (Dasarchio).",
      market: "Global visibility. High short-term rental yields (Projected 8-10% ROI on rentals alone).",
      risk: "High Regulatory Risk. Building permits in Mykonos are under heavy scrutiny. Expert legal counsel required."
    }
  },
  {
    id: 6,
    name: "Santorini - Oia View",
    m2: 2000,
    factor: 0.15,
    buildCostM2: 4000,
    sellPriceM2: 15000,
    plotPrice: 2200000,
    location: "Oia, Santorini, Greece",
    tags: ["Top Tier", "Unique"],
    aiAnalysis: {
      strategy: "Exclusive cave-style luxury suites. High-fidelity cave excavation to maximize unique Aegean views.",
      technical: "Extremely complex engineering due to volcanic soil and steep inclination. Logistic challenges for materials transport.",
      market: "World-class asset. Supply is virtually zero. Unique positioning in the global ultra-luxury market.",
      risk: "High Construction Risk. Logistics and specialized labor costs can fluctuate significantly."
    }
  }
];

const App = () => {
  const [inputs, setInputs] = useState(SAMPLE_PLOTS[0]); // Start me Pagrati
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiReport, setShowAiReport] = useState(false);
  const [activePlot, setActivePlot] = useState(SAMPLE_PLOTS[0]);
  const [isCustom, setIsCustom] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showHowToUse, setShowHowToUse] = useState(false);

  const linkedinUrl = "https://www.linkedin.com/in/sakis-athan-b240553a2";

  // Katharismos olon ton pedion (Hard Clear)
  const resetInputs = () => {
    setInputs({ ...EMPTY_INPUTS }); 
    setActivePlot(null); // Den yparxei epilegmeno oikopedo
    setIsCustom(true);   // Girname se custom mode
    setShowAiReport(false);
    setResetKey(prev => prev + 1);
  };

  const stats = useMemo(() => {
    const m2Value = parseFloat(inputs.m2) || 0;
    const factorValue = parseFloat(inputs.factor) || 0;
    const buildCostM2Value = parseFloat(inputs.buildCostM2) || 0;
    const sellPriceM2Value = parseFloat(inputs.sellPriceM2) || 0;
    const plotPriceValue = parseFloat(inputs.plotPrice) || 0;

    const totalBuildM2 = m2Value * factorValue;
    const totalBuildCost = totalBuildM2 * buildCostM2Value;
    const totalInvestment = totalBuildCost + plotPriceValue;
    const totalRevenue = totalBuildM2 * sellPriceM2Value;
    const totalProfit = totalRevenue - totalInvestment;
    
    const profitPerM2 = totalBuildM2 > 0 ? totalProfit / totalBuildM2 : 0;
    const costPerM2 = totalBuildM2 > 0 ? totalInvestment / totalBuildM2 : 0;
    const roiPercent = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

    let strength = Math.min(100, Math.max(0, (roiPercent / 45) * 100));
    let riskReward = Math.min(100, Math.max(0, (profitPerM2 / (buildCostM2Value || 1)) * 60));

    return { totalBuildM2, totalBuildCost, totalInvestment, totalRevenue, totalProfit, profitPerM2, costPerM2, roiPercent, strength, riskReward };
  }, [inputs]);

  const handleAiAudit = () => {
    setIsAiLoading(true);
    setShowAiReport(false);
    setTimeout(() => {
      setIsAiLoading(false);
      setShowAiReport(true);
    }, 1500);
  };

  const handleSampleClick = (plot) => {
    setInputs({
      m2: plot.m2,
      factor: plot.factor,
      buildCostM2: plot.buildCostM2,
      sellPriceM2: plot.sellPriceM2,
      plotPrice: plot.plotPrice
    });
    setActivePlot(plot);
    setIsCustom(false);
    setShowAiReport(false);
  };

  const formatEuro = (val) => new Intl.NumberFormat('el-GR', { 
    style: 'currency', 
    currency: 'EUR', 
    maximumFractionDigits: 0 
  }).format(val);

  const mapUrl = useMemo(() => {
    const query = (isCustom || !activePlot) ? "Greece" : activePlot.location;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }, [activePlot, isCustom]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 relative">
      
      {/* HOW TO USE MODAL */}
      {showHowToUse && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowHowToUse(false)}></div>
          <div className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowHowToUse(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full text-slate-500 transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-500/20 rounded-2xl">
                <Sparkles className="text-blue-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white italic">Demo Odigos Xrisis</h2>
            </div>

            <div className="space-y-6 text-slate-300">
              <div className="flex gap-4">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg shadow-blue-900/40">1</span>
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Epilekste Oikopedo:</strong> Dialekste ena apo ta deigmata (Benchmark Opportunities) sta aristera gia na gemisoun automata ta dedomena.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg shadow-blue-900/40">2</span>
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Allakste ta Noumera:</strong> Pirakste ta m2, ton syntelesti domisis h to kostos kataskeuhs gia na deite to <strong className="text-emerald-400">ROI</strong> na allazei se real-time.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg shadow-emerald-900/40">3</span>
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Run AI Audit:</strong> Patiste to prasino koumpi gia na ginei h pliris anallusi apo to AI kai na anoiksei o xartis.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg shadow-red-900/40">4</span>
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Reset/Clear:</strong> Patiste to koumpi <strong className="text-red-400">CLEAR ALL</strong> gia να katharisoun ola ta pedia kai na balete dika sas stoixeia apo to miden.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowHowToUse(false)}
              className="w-full mt-10 bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-900/40"
            >
              Katalaba, pame!
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] text-slate-950">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic text-shadow-glow">
              PLOT INVESTOR <span className="text-emerald-500">PRO</span>
            </h1>
          </div>
          <p className="text-slate-500 text-[10px] mt-2 font-black uppercase tracking-[0.3em]">AI-Powered Real Estate Analytics Dashboard</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* HOW TO USE BUTTON WITH FIREFLY LIGHT EFFECT */}
          <div className="relative group p-[2px] rounded-2xl overflow-hidden animate-pulse-slow">
            {/* The "Firefly" (Pigolampida) running around the perimeter */}
            <div className="absolute inset-[-500%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#3b82f6_50%,transparent_60%,transparent_100%)] animate-spin-fast duration-[2000ms] pointer-events-none opacity-80 group-hover:opacity-100"></div>
            
            <button 
              onClick={() => setShowHowToUse(true)}
              className="relative bg-slate-950 hover:bg-slate-900 text-blue-400 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 z-10"
            >
              <HelpCircle className="w-4 h-4" /> How To Use
            </button>
          </div>

          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-[#0077b5] hover:bg-[#005c8a] px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-blue-900/20 text-white group">
            <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Connect with Sakis
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: INPUTS & SELECTION */}
        <div className="lg:col-span-4 space-y-6">
          <div key={resetKey} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black flex items-center gap-2 text-white">
                <Activity className="text-emerald-400 w-5 h-5" /> PARAMETERS
              </h2>
              <button 
                onClick={resetInputs}
                className="p-3 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all text-red-400 flex items-center gap-2 text-[10px] font-black uppercase group"
                title="Clear All Fields"
              >
                <RefreshCcw className="w-4 h-4 group-active:rotate-180 transition-transform duration-500" /> CLEAR ALL
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Plot Area (m2)" value={inputs.m2} onChange={(v) => { setInputs({...inputs, m2: v}); setIsCustom(true); setShowAiReport(false); }} icon={<Maximize className="w-3 h-3"/>} />
                <InputGroup label="Build Factor" value={inputs.factor} onChange={(v) => { setInputs({...inputs, factor: v}); setIsCustom(true); setShowAiReport(false); }} step="0.1" icon={<Building className="w-3 h-3"/>} />
              </div>
              <InputGroup label="Construction / m2 (€)" value={inputs.buildCostM2} onChange={(v) => setInputs({...inputs, buildCostM2: v})} icon={<Euro className="w-3 h-3"/>} />
              <InputGroup label="Target Sale / m2 (€)" value={inputs.sellPriceM2} onChange={(v) => setInputs({...inputs, sellPriceM2: v})} icon={<TrendingUp className="w-3 h-3"/>} />
              <InputGroup label="Land Acquisition (€)" value={inputs.plotPrice} onChange={(v) => setInputs({...inputs, plotPrice: v})} icon={<Shield className="w-3 h-3"/>} />

              <button 
                onClick={handleAiAudit}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${isAiLoading ? 'bg-slate-800 text-slate-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'}`}
                disabled={isAiLoading}
              >
                {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                Generate AI Intelligence Report
              </button>
            </div>
          </div>

          <div className="bg-slate-900/20 border border-slate-800 rounded-[2.5rem] p-8 shadow-lg">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Target className="w-4 h-4" /> Market Benchmarks
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              {SAMPLE_PLOTS.map(plot => (
                <button 
                  key={plot.id}
                  onClick={() => handleSampleClick(plot)}
                  className={`w-full group text-left p-5 rounded-3xl border transition-all flex justify-between items-center ${activePlot?.id === plot.id ? 'bg-emerald-500/10 border-emerald-500 shadow-lg' : 'bg-slate-950/50 border-slate-800 hover:border-slate-600'}`}
                >
                  <div className="overflow-hidden text-ellipsis">
                    <p className={`text-[11px] font-black uppercase tracking-tight truncate transition-colors ${activePlot?.id === plot.id ? 'text-emerald-400' : 'text-white'}`}>{plot.name}</p>
                    <div className="flex gap-2 mt-2">
                      {plot.tags.slice(0, 2).map(t => <span key={t} className="text-[8px] text-slate-600 font-black uppercase tracking-tighter">{t}</span>)}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activePlot?.id === plot.id ? 'text-emerald-500 translate-x-1' : 'text-slate-800'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: RESULTS, GAUGES & MAP */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 gap-6">
               <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-[220px]">
                <div className="absolute top-0 right-0 p-6 opacity-5"><Scale className="w-16 h-16" /></div>
                <div className="relative w-36 h-36 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                    <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" 
                      strokeDasharray={402} strokeDashoffset={402 - (402 * stats.strength) / 100}
                      strokeLinecap="round" className="text-emerald-500 transition-all duration-1000 ease-out shadow-emerald-500" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{Math.round(stats.strength)}</span>
                    <span className="text-[9px] font-black text-slate-500 uppercase">Score</span>
                  </div>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Investment Strength</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-[220px]">
                <div className="absolute top-0 right-0 p-6 opacity-5"><Compass className="w-16 h-16" /></div>
                <div className="relative w-48 h-24 overflow-hidden mb-4 mt-4">
                    <div className="w-48 h-48 border-[14px] border-slate-800 rounded-full absolute top-0"></div>
                    <div className="w-48 h-48 border-[14px] border-transparent border-t-blue-500 rounded-full absolute top-0 transition-all duration-1000" style={{ transform: `rotate(${(stats.riskReward * 1.8) - 90}deg)` }}></div>
                    <div className="absolute bottom-0 w-full flex justify-between px-2 text-[8px] font-black text-slate-600">
                      <span>RISK</span>
                      <span>REWARD</span>
                    </div>
                    <div className="absolute inset-0 flex items-end justify-center pb-2">
                       <span className="text-xl font-black text-white whitespace-nowrap">{stats.roiPercent.toFixed(1)}% ROI</span>
                    </div>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Performance Meter</p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-full min-h-[460px] shadow-2xl relative">
               <div className="p-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 backdrop-blur-md z-10">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-blue-400" /> Location Insight
                  </h3>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter truncate max-w-[140px]">{(isCustom || !activePlot) ? "Greece (Manual)" : activePlot.location}</span>
               </div>
               <div className="flex-1 bg-slate-950 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    src={mapUrl}
                    className="filter grayscale invert contrast-125 opacity-70 pointer-events-none"
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
               </div>
            </div>
          </div>

          {/* AI REPORT */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showAiReport ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-slate-900 border-2 border-emerald-500/20 rounded-[2.5rem] p-8 md:p-10 relative shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <CheckCircle2 className="text-emerald-400 w-8 h-8 shrink-0" />
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight uppercase italic decoration-emerald-500/50 underline underline-offset-8">
                    EXECUTIVE AUDIT: {(isCustom || !activePlot) ? "CUSTOM PROJECT" : activePlot.name.toUpperCase()}
                  </h3>
                  <p className="text-[9px] text-slate-500 mt-2 font-black uppercase tracking-[0.2em]">Engineered Investment Intelligence Report</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
                <div className="space-y-6">
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Zap className="w-12 h-12 text-emerald-500" /></div>
                    <h4 className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Target className="w-3 h-3" /> Core Strategy
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{(isCustom || !activePlot) ? `Project shows an estimated ROI of ${stats.roiPercent.toFixed(1)}%. Target ${stats.roiPercent > 25 ? 'High-Margin Premium buyers' : 'Volume Residential units'} to optimize cash flow.` : activePlot.aiAnalysis.strategy}"
                    </p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                    <h4 className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <GanttChart className="w-3 h-3" /> Technical & Legal
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {(isCustom || !activePlot) ? "Verify municipal building height caps and drainage network capacity. High probability of archaeological survey requirement." : activePlot.aiAnalysis.technical}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                    <h4 className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <TrendingUp className="w-3 h-3" /> Market Potential
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {(isCustom || !activePlot) ? "The micro-market is exhibiting low inventory levels. Off-plan sales strategies should be prioritized." : activePlot.aiAnalysis.market}
                    </p>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-red-500/5 rounded-3xl border border-red-500/10">
                    <AlertTriangle className="text-red-400 w-5 h-5 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Risk Warning</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold tracking-tight italic font-sans">
                        {(isCustom || !activePlot) ? "Fluctuating material costs may erode margins. Lock fixed-cost contracts with suppliers immediately." : activePlot.aiAnalysis.risk}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FINANCIAL SUMMARY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Saleable Area" value={`${Math.round(stats.totalBuildM2)} m2`} sub="Net Buildable" color="text-blue-400" />
            <StatCard label="Build Budget" value={formatEuro(stats.totalBuildCost)} sub="Excl. Land Price" color="text-white" />
            <StatCard label="Total Capital" value={formatEuro(stats.totalInvestment)} sub="Fully Loaded Cost" color="text-emerald-400" />
            <StatCard label="Net Return" value={formatEuro(stats.totalProfit)} sub="Estimated Profit" color="text-emerald-500" />
          </div>

          {/* UNIT ECONOMICS */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl overflow-hidden relative border-b-emerald-500/30 border-b-4">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
              <div className="relative">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">Profit / m2</p>
                <div className="text-2xl lg:text-3xl font-black text-white tracking-tighter tabular-nums">
                    {formatEuro(stats.profitPerM2)}
                </div>
                <div className="h-0.5 w-12 bg-emerald-500/40 rounded-full mt-3 mx-auto md:mx-0"></div>
              </div>
              <div className="relative border-y md:border-y-0 md:border-x border-slate-800 py-10 md:py-0 md:px-12">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">Break-Even / m2</p>
                <div className="text-2xl lg:text-3xl font-black text-white tracking-tighter tabular-nums">
                    {formatEuro(stats.costPerM2)}
                </div>
                <div className="h-0.5 w-12 bg-blue-500/40 rounded-full mt-3 mx-auto md:mx-0"></div>
              </div>
              <div className="relative">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">Gross Value</p>
                <div className="text-2xl lg:text-3xl font-black text-emerald-500 tracking-tighter tabular-nums">
                    {formatEuro(stats.totalRevenue)}
                </div>
                <div className="h-0.5 w-12 bg-slate-700 rounded-full mt-3 mx-auto md:mx-0"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-900 pt-10">
        <div className="flex items-center gap-4 text-center md:text-left">
           <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-black text-emerald-400 uppercase">SA</div>
           <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
             Engineered by Sakis &copy; 2024 | Business Automation
           </p>
        </div>
        <div className="flex gap-6 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all">
           <Linkedin className="w-5 h-5 text-blue-400 cursor-pointer" />
           <Globe className="w-5 h-5 text-white cursor-pointer" />
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        iframe { filter: grayscale(1) invert(1) contrast(1.2); }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: spin-fast 1.5s linear infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { transform: scale(1.05); box-shadow: 0 0 35px rgba(59, 130, 246, 0.4); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
      `}} />
    </div>
  );
};

const InputGroup = ({ label, value, onChange, step = "1", icon }) => (
  <div className="space-y-3 font-sans">
    <label className="text-[9px] font-black text-slate-600 uppercase flex items-center gap-2 tracking-widest truncate">
      {icon} {label}
    </label>
    <input 
      type="number" 
      step={step}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-sm font-black text-emerald-400 focus:border-emerald-500 outline-none transition-all hover:bg-slate-900 shadow-inner"
      placeholder="0"
    />
  </div>
);

const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-[2.5rem] hover:bg-slate-900/60 transition-all transform hover:-translate-y-1 shadow-lg group overflow-hidden font-sans">
    <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2 group-hover:text-slate-400 transition-colors truncate">{label}</p>
    <div className={`text-lg md:text-xl font-black ${color} mb-1 tracking-tighter whitespace-nowrap overflow-visible tabular-nums`}>
      {value}
    </div>
    <p className="text-[9px] font-bold text-slate-800 uppercase group-hover:text-slate-600 transition-colors truncate">{sub}</p>
  </div>
);

export default App;