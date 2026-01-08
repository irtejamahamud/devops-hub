
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import ContentArea from './components/ContentArea.tsx';
import CheatSheetView from './components/CheatSheetView.tsx';
import StrategySimulator from './components/StrategySimulator.tsx';
import GlossaryView from './components/GlossaryView.tsx';
import LearningPathView from './components/LearningPathView.tsx';
import SurvivalKitView from './components/SurvivalKitView.tsx';
import DevOpsMentor from './components/DevOpsMentor.tsx';
import PipelineVisualizer from './components/PipelineVisualizer.tsx';
import TerminalLab from './components/TerminalLab.tsx';
import { DEVOPS_MODULES, LEARNING_PATHS, SURVIVAL_KIT } from './constants.tsx';
import { Search, Bell, Github, Zap, Layout, Menu, X as CloseIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState(DEVOPS_MODULES[0].id);
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [activeSurvivalId, setActiveSurvivalId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'module' | 'cheatsheet' | 'simulator' | 'glossary' | 'learning-path' | 'survival-kit'>('module');
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const activeModule = DEVOPS_MODULES.find(m => m.id === activeModuleId) || DEVOPS_MODULES[0];
  const activePath = LEARNING_PATHS.find(p => p.id === activePathId);
  const activeSurvival = SURVIVAL_KIT.find(s => s.id === activeSurvivalId);

  // Scroll to top on view change
  useEffect(() => {
    const mainContent = document.getElementById('main-content-scroll');
    if (mainContent) mainContent.scrollTop = 0;
  }, [activeView, activeModuleId, activePathId, activeSurvivalId]);

  const handleLaunchLab = () => {
    setIsLabOpen(true);
  };

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setActiveView('module');
    setActivePathId(null);
    setActiveSurvivalId(null);
    setIsMobileSidebarOpen(false);
  };

  const handleSelectPath = (id: string) => {
    setActivePathId(id);
    setActiveView('learning-path');
    setActiveSurvivalId(null);
    setIsMobileSidebarOpen(false);
  };

  const handleSelectSurvival = (id: string) => {
    setActiveSurvivalId(id);
    setActiveView('survival-kit');
    setActivePathId(null);
    setIsMobileSidebarOpen(false);
  };

  const handleSelectView = (view: any) => {
    setActiveView(view);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`fixed lg:relative z-[100] transition-transform lg:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar 
          activeModuleId={activeModuleId} 
          activePathId={activePathId}
          activeSurvivalId={activeSurvivalId}
          activeView={activeView}
          onSelectModule={handleSelectModule} 
          onSelectPath={handleSelectPath}
          onSelectSurvival={handleSelectSurvival}
          onSelectView={handleSelectView}
        />
      </div>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950">
        {/* Header */}
        <header className="h-16 bg-slate-900/40 border-b border-slate-800 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between z-50 shrink-0">
          <div className="flex items-center gap-4 w-full lg:w-1/2">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 lg:hidden bg-slate-800 rounded-lg text-slate-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-md group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search tools, commands, or concepts..." 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all hidden sm:block">
              <Zap className="w-5 h-5 text-amber-500" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-6 w-[1px] bg-slate-800 hidden sm:block"></div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-900/20 text-xs lg:text-sm font-bold">
              <Github className="w-4 h-4" />
              <span className="hidden lg:inline">Open Source</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div id="main-content-scroll" className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin">
          {activeView === 'module' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="px-6 lg:px-12 pt-8 lg:pt-12">
                <div className="bg-gradient-to-br from-blue-900/20 via-slate-900/80 to-slate-950 p-8 lg:p-12 rounded-[2rem] lg:rounded-[4rem] border border-white/5 mb-12 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] -z-10"></div>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-600/5 blur-[100px] -z-10"></div>
                  
                  <div className="max-w-2xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 mx-auto md:mx-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      DevOps Learning Engine v3.0 Active
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500">
                      Level up from Beginner <br className="hidden lg:block"/> to Production Pro
                    </h1>
                    <p className="text-slate-400 text-lg lg:text-2xl leading-relaxed font-medium mb-4 max-w-xl">
                      Your guide to mastering infrastructure, automation, and the art of modern delivery.
                    </p>
                  </div>
                  <div className="hidden xl:block w-full max-w-sm shrink-0 transform hover:rotate-1 hover:scale-105 transition-all duration-700">
                     <PipelineVisualizer />
                  </div>
                </div>
              </div>
              <ContentArea module={activeModule} onLaunchLab={handleLaunchLab} />
            </div>
          )}

          {activeView === 'learning-path' && activePath && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <LearningPathView 
                path={activePath} 
                onSelectModule={handleSelectModule} 
                onSelectCheatSheet={() => handleSelectView('cheatsheet')}
              />
            </div>
          )}

          {activeView === 'survival-kit' && activeSurvival && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <SurvivalKitView category={activeSurvival} />
            </div>
          )}

          {activeView === 'cheatsheet' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <CheatSheetView />
             </div>
          )}
          {activeView === 'simulator' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <StrategySimulator />
            </div>
          )}
          {activeView === 'glossary' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <GlossaryView />
            </div>
          )}

          {/* Footer */}
          <footer className="px-6 lg:px-12 py-20 border-t border-slate-800 bg-slate-900/20 mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              <div className="col-span-1 lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-xl tracking-tight">DevOps Mastery</h4>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                  A comprehensive, open-source resource for the next generation of Cloud and DevOps Engineers.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-blue-400 uppercase text-[10px] tracking-[0.2em]">Navigation</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li onClick={() => handleSelectView('simulator')} className="hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div>
                    Simulation Labs
                  </li>
                  <li onClick={() => handleSelectView('glossary')} className="hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div>
                    Tech Dictionary
                  </li>
                  <li onClick={() => handleSelectView('cheatsheet')} className="hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div>
                    Quick Reference
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-emerald-400 uppercase text-[10px] tracking-[0.2em]">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-emerald-500 transition-colors"></div>
                    Terraform Module Library
                  </li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-emerald-500 transition-colors"></div>
                    Docker Hub Guide
                  </li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-emerald-500 transition-colors"></div>
                    SRE Site Book
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-amber-400 uppercase text-[10px] tracking-[0.2em]">Community</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Join 50,000+ developers receiving our weekly infrastructure newsletter.
                </p>
                <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all hover:border-slate-600">
                    <Github className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all hover:border-slate-600">
                    <Zap className="w-6 h-6 text-amber-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-20 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">© 2025 DevOps Mastery • Secure by Design • Automated by Choice</p>
              <div className="flex gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-slate-400 cursor-pointer transition-colors">Security</span>
                <span className="hover:text-slate-400 cursor-pointer transition-colors">Ethics</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Lab Modal */}
      {isLabOpen && (
        <TerminalLab 
          module={activeModule} 
          onClose={() => setIsLabOpen(false)} 
        />
      )}

      {/* AI Bot */}
      <DevOpsMentor />
    </div>
  );
};

export default App;
