
import React, { useState } from 'react';
import { DEVOPS_MODULES, LEARNING_PATHS, SURVIVAL_KIT, getIcon } from '../constants.tsx';
import { Layout, Compass, Layers, Command, Map, ChevronLeft, ChevronRight, Bookmark, Zap, ChevronDown } from 'lucide-react';

interface SidebarProps {
  activeModuleId: string;
  activePathId: string | null;
  activeSurvivalId: string | null;
  activeView: 'module' | 'cheatsheet' | 'simulator' | 'glossary' | 'learning-path' | 'survival-kit';
  onSelectModule: (id: string) => void;
  onSelectPath: (id: string) => void;
  onSelectSurvival: (id: string) => void;
  onSelectView: (view: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeModuleId, 
  activePathId, 
  activeSurvivalId,
  activeView, 
  onSelectModule, 
  onSelectPath, 
  onSelectSurvival,
  onSelectView 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSurvivalOpen, setIsSurvivalOpen] = useState(true);
  const categories = Array.from(new Set(DEVOPS_MODULES.map(m => m.category)));

  const NavItem = ({ icon, label, isActive, onClick, colorClass = "blue" }: any) => (
    <button
      onClick={onClick}
      title={isCollapsed ? label : ""}
      className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 group relative ${
        isCollapsed ? 'justify-center p-3' : 'px-4 py-3'
      } ${
        isActive 
          ? `bg-${colorClass}-600/10 text-${colorClass}-400 border border-${colorClass}-600/20 shadow-lg shadow-${colorClass}-900/10` 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
      }`}
    >
      <div className={`shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {getIcon(icon)}
      </div>
      {!isCollapsed && <span className="text-sm font-medium truncate">{label}</span>}
      {isActive && !isCollapsed && (
        <div className={`absolute right-2 w-1.5 h-1.5 rounded-full bg-${colorClass}-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}></div>
      )}
    </button>
  );

  return (
    <aside className={`bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out z-30 ${
      isCollapsed ? 'w-20' : 'w-72'
    }`}>
      {/* Brand Header */}
      <div className={`p-6 border-b border-slate-800 flex items-center shrink-0 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30">
            <Layout className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">DevOps Hub</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cloud Architect v2</p>
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-40 shadow-xl"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
      
      <nav className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin">
        {/* Survival Kit - New Priority Section */}
        <div>
          {!isCollapsed && (
            <button 
              onClick={() => setIsSurvivalOpen(!isSurvivalOpen)}
              className="w-full flex items-center justify-between text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-3 px-4 hover:text-amber-400 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-3 h-3" />
                The Survival Kit
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isSurvivalOpen ? '' : '-rotate-90'}`} />
            </button>
          )}
          {isSurvivalOpen && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-300">
              {SURVIVAL_KIT.map(kit => (
                <NavItem 
                  key={kit.id}
                  icon={kit.icon}
                  label={kit.title}
                  isActive={activeView === 'survival-kit' && activeSurvivalId === kit.id}
                  onClick={() => onSelectSurvival(kit.id)}
                  colorClass="amber"
                />
              ))}
            </div>
          )}
        </div>

        {/* Learning Journeys */}
        <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-4 flex items-center gap-2">
              <Compass className="w-3 h-3" />
              Paths
            </h3>
          )}
          <div className="space-y-1">
            {LEARNING_PATHS.map(path => (
              <NavItem 
                key={path.id}
                icon={path.icon}
                label={path.title}
                isActive={activeView === 'learning-path' && activePathId === path.id}
                onClick={() => onSelectPath(path.id)}
                colorClass="blue"
              />
            ))}
          </div>
        </div>

        {/* Visual Labs */}
        <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-4 flex items-center gap-2">
              <Layers className="w-3 h-3" />
              Visual Labs
            </h3>
          )}
          <div className="space-y-1">
            <NavItem 
              icon="Layers"
              label="Strategy Simulator"
              isActive={activeView === 'simulator'}
              onClick={() => onSelectView('simulator')}
              colorClass="purple"
            />
          </div>
        </div>

        {/* Knowledge Base */}
        <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-4 flex items-center gap-2">
              <Bookmark className="w-3 h-3" />
              Reference
            </h3>
          )}
          <div className="space-y-1">
            <NavItem 
              icon="Command"
              label="Cheat Sheets"
              isActive={activeView === 'cheatsheet'}
              onClick={() => onSelectView('cheatsheet')}
              colorClass="amber"
            />
            <NavItem 
              icon="Map"
              label="DevOps Glossary"
              isActive={activeView === 'glossary'}
              onClick={() => onSelectView('glossary')}
              colorClass="emerald"
            />
          </div>
        </div>

        {/* Full Library */}
        <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-4">
              All Modules
            </h3>
          )}
          {categories.map(category => (
            <div key={category} className="mb-4">
              {!isCollapsed && (
                <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-4 border-l border-slate-800 ml-4 py-0.5">
                  {category}
                </h4>
              )}
              <ul className="space-y-1">
                {DEVOPS_MODULES.filter(m => m.category === category).map(module => (
                  <li key={module.id}>
                    <NavItem 
                      icon={module.icon}
                      label={module.title}
                      isActive={activeView === 'module' && activeModuleId === module.id}
                      onClick={() => onSelectModule(module.id)}
                      colorClass="blue"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
              <span className="text-[10px] font-bold text-blue-400">Master</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full w-[85%] transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
