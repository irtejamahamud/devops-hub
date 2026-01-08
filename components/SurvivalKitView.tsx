
import React from 'react';
import { SurvivalKitCategory } from '../types.ts';
import { getIcon } from '../constants.tsx';
import { Copy, Terminal, Info, CheckCircle2 } from 'lucide-react';

interface SurvivalKitViewProps {
  category: SurvivalKitCategory;
}

const SurvivalKitView: React.FC<SurvivalKitViewProps> = ({ category }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-20 h-20 bg-amber-600/10 text-amber-500 border border-amber-500/20 rounded-[2rem] flex items-center justify-center shadow-xl shadow-amber-950/20">
          {getIcon(category.icon)}
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">{category.title}</h2>
          <p className="text-slate-400 text-xl font-medium max-w-2xl">{category.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {category.items.map((item, idx) => (
          <div 
            key={idx} 
            className="group bg-slate-900/40 border border-slate-800 hover:border-amber-500/30 rounded-3xl p-6 lg:p-8 transition-all hover:bg-slate-900/60 shadow-xl backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 opacity-50"></div>
                </div>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              {item.example && (
                <div className="w-full lg:w-auto shrink-0">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                    <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Practice CLI</span>
                      <button 
                        onClick={() => copyToClipboard(item.example!)}
                        className="p-1.5 text-slate-500 hover:text-white transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <code className="block p-4 font-mono text-sm text-amber-400 bg-black/40">
                      $ {item.example}
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {category.id === 'pro-checklist' && (
          <div className="mt-8 p-8 bg-blue-600/5 border border-blue-600/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-6 text-blue-400">
              <Info className="w-6 h-6" />
              <h4 className="text-sm font-black uppercase tracking-widest">Survival Strategy</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-300 font-medium">
                  To become a "Pro" deployer, you must master the sequence of operations. It is not about knowing every command, but knowing <strong>which</strong> command solves the specific production blocker.
                </p>
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-slate-400">Always check logs before restarting services.</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-slate-400">Use SSH keys, never passwords in production.</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-slate-400">If you repeat a task 3 times, script it in Bash.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurvivalKitView;
