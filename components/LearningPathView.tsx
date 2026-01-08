
import React from 'react';
import { LearningPath } from '../types.ts';
import { DEVOPS_MODULES, CHEAT_SHEETS, getIcon } from '../constants.tsx';
import { ArrowRight, CheckCircle, BookOpen, Command as CommandIcon } from 'lucide-react';

interface LearningPathViewProps {
  path: LearningPath;
  onSelectModule: (id: string) => void;
  onSelectCheatSheet: () => void;
}

const LearningPathView: React.FC<LearningPathViewProps> = ({ path, onSelectModule, onSelectCheatSheet }) => {
  const pathModules = path.modules.map(id => DEVOPS_MODULES.find(m => m.id === id)).filter(Boolean);
  const pathSheets = path.cheatSheets.map(id => CHEAT_SHEETS.find(cs => cs.id === id)).filter(Boolean);

  return (
    <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-blue-600/10 text-blue-500 rounded-3xl border border-blue-500/20 shadow-xl shadow-blue-950/20">
            {getIcon(path.icon)}
          </div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">{path.title}</h2>
            <p className="text-slate-400 mt-1 text-lg">{path.description}</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500/50 via-slate-800 to-transparent hidden md:block"></div>

        <div className="space-y-12">
          {pathModules.map((module, idx) => (
            <div key={module!.id} className="relative flex items-start gap-8 group">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center z-10 shrink-0 group-hover:border-blue-500 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/20">
                <span className="text-sm font-bold text-slate-500 group-hover:text-blue-500">{idx + 1}</span>
              </div>

              <div 
                onClick={() => onSelectModule(module!.id)}
                className="flex-1 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-slate-700 hover:bg-slate-900/60 transition-all cursor-pointer shadow-xl backdrop-blur-sm group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-blue-400">
                    {getIcon(module!.icon)}
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{module!.category}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                    module!.difficulty === 'Beginner' ? 'bg-green-500/5 border-green-500/20 text-green-500' : 'bg-yellow-500/5 border-yellow-500/20 text-yellow-500'
                  }`}>
                    {module!.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{module!.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {module!.content.slice(0, 160)}...
                </p>
                <div className="flex items-center gap-2 text-blue-500 text-sm font-bold transition-all group-hover:translate-x-1">
                  Dive into Module <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}

          <div className="relative flex items-start gap-8 pt-4">
             <div className="w-12 h-12 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center z-10 shrink-0 shadow-lg">
                <CommandIcon className="w-5 h-5 text-amber-500" />
              </div>
              
              <div className="flex-1 space-y-4">
                <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest px-2">Path Resources</h4>
                <div className="grid md:grid-cols-2 gap-4">
                   {pathSheets.map(sheet => (
                     <div 
                        key={sheet!.id}
                        onClick={onSelectCheatSheet}
                        className="p-5 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-amber-500/30 transition-all cursor-pointer group backdrop-blur-sm shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <BookOpen className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-slate-200 group-hover:text-amber-400 transition-colors">{sheet!.title}</span>
                        </div>
                        <p className="text-xs text-slate-500">Quick reference for production workflows.</p>
                     </div>
                   ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathView;
