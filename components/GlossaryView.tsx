
import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../constants.tsx';
import { Search, Book, Tag } from 'lucide-react';

const GlossaryView: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filtered = GLOSSARY_TERMS.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 md:p-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-4 flex items-center gap-3">
          <Book className="w-10 h-10 text-emerald-500" />
          DevOps Glossary
        </h2>
        <p className="text-slate-400 text-lg">
          Master the jargon. A complete dictionary of engineering terms and cultural concepts.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Filter jargon (e.g. SRE, CI/CD)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-emerald-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{item.term}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500 uppercase font-bold tracking-widest">{item.category}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlossaryView;
