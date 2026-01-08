
import React, { useState } from 'react';
import { CHEAT_SHEETS } from '../constants.tsx';
import { Search, Copy, Check, Terminal, Command as CommandIcon } from 'lucide-react';

const CheatSheetView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSheets = CHEAT_SHEETS.map(sheet => ({
    ...sheet,
    commands: sheet.commands.filter(c => 
      c.cmd.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.desc.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(sheet => sheet.commands.length > 0);

  return (
    <div className="flex-1 p-6 md:p-12 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold mb-4 flex items-center gap-3">
          <CommandIcon className="w-10 h-10 text-blue-500" />
          CLI Cheat Sheets
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Quick reference for common DevOps commands and utilities. Search and click to copy.
        </p>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search commands (e.g. 'docker', 'commit', 'ssh')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-6 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredSheets.map(sheet => (
          <div key={sheet.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm flex flex-col">
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                {sheet.title}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {sheet.category}
              </span>
            </div>
            
            <div className="p-4 space-y-2">
              {sheet.commands.map((cmd, idx) => {
                const uniqueId = `${sheet.id}-${idx}`;
                return (
                  <div 
                    key={idx}
                    onClick={() => handleCopy(cmd.cmd, uniqueId)}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-all border border-transparent hover:border-slate-700"
                  >
                    <div className="flex flex-col min-w-0 mr-4">
                      <code className="text-blue-400 font-mono text-sm mb-1 truncate">
                        {cmd.cmd}
                      </code>
                      <span className="text-xs text-slate-500 truncate">
                        {cmd.desc}
                      </span>
                    </div>
                    <div className={`shrink-0 p-2 rounded-lg transition-all ${
                      copiedId === uniqueId ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100'
                    }`}>
                      {copiedId === uniqueId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filteredSheets.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500">No commands found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheatSheetView;
