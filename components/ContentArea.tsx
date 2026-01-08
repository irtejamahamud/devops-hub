
import React from 'react';
import { Module } from '../types.ts';
import { BookOpen, Code, Lightbulb, PlayCircle, Star } from 'lucide-react';

interface ContentAreaProps {
  module: Module;
  onLaunchLab: () => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({ module, onLaunchLab }) => {
  return (
    <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
            module.difficulty === 'Beginner' ? 'bg-green-500/5 border-green-500/20 text-green-500' :
            module.difficulty === 'Intermediate' ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-500' :
            'bg-red-500/5 border-red-500/20 text-red-500'
          }`}>
            {module.difficulty}
          </span>
          <span className="text-slate-700">•</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{module.category}</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">{module.title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Core Content */}
        <section className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800/50 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
          <div className="flex items-center gap-2 mb-8 text-blue-400">
            <BookOpen className="w-6 h-6" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">Deep Dive Theory</h3>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">
            {module.content.split('\n\n').map((paragraph, i) => (
              <div key={i}>
                {paragraph.split('\n').map((line, j) => (
                  <p key={j} className={line.startsWith('- ') ? 'ml-4 list-item list-none pl-4 border-l-2 border-slate-800 my-1' : 'mb-2'}>
                    {line.startsWith('- ') ? <span className="text-blue-500 mr-2">•</span> : null}
                    {line.replace('- ', '')}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Example/Code Block */}
        <section className="bg-slate-950 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
          <div className="bg-slate-900/80 px-8 py-5 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-emerald-400">
              <Code className="w-5 h-5" />
              <h3 className="text-xs font-black uppercase tracking-widest">Practical Application</h3>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></div>
            </div>
          </div>
          <pre className="p-8 overflow-x-auto text-sm lg:text-base mono text-emerald-400 leading-relaxed bg-[#0a0a0a]">
            <code className="block">{module.example}</code>
          </pre>
        </section>

        {/* Best Practices Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-amber-500/5 border border-amber-500/10 p-8 rounded-[2rem] hover:bg-amber-500/10 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <Lightbulb className="w-6 h-6" />
              <h4 className="font-black uppercase text-xs tracking-widest">Architect's Tip</h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Think about "Day 2 Operations" while designing. How will you scale this? How will you patch it? 
              A perfect one-time deployment that is hard to update is a technical debt waiting to happen.
            </p>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/10 p-8 rounded-[2rem] hover:bg-blue-500/10 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-blue-400">
              <Star className="w-6 h-6" />
              <h4 className="font-black uppercase text-xs tracking-widest">Core Competency</h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              In DevOps, "Soft Skills" are as important as "Hard Skills." Empathy for the teams sitting "across the silo" 
              is what truly enables a high-performing collaborative culture.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 py-12">
          <button 
            onClick={onLaunchLab}
            className="group flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all transform hover:scale-105 shadow-xl shadow-blue-900/40 active:scale-95"
          >
            <PlayCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Launch Interactive Lab
          </button>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Simulated Production Environment Ready</p>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
