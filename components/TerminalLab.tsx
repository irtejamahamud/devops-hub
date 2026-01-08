
import React, { useState, useEffect, useRef } from 'react';
import { Module } from '../types.ts';
import { X, Terminal as TerminalIcon, Maximize2, RotateCcw, Play } from 'lucide-react';

interface TerminalLabProps {
  module: Module;
  onClose: () => void;
}

interface LogEntry {
  type: 'command' | 'response' | 'error';
  text: string;
}

const TerminalLab: React.FC<TerminalLabProps> = ({ module, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial welcome message based on module
    setLogs([
      { type: 'response', text: `--- DevOps Interactive Lab: ${module.title} ---` },
      { type: 'response', text: `Welcome to the interactive terminal. Type 'help' to see available commands.` },
      { type: 'response', text: `Scenario: You are working on a ${module.category} task. Try practicing the examples mentioned in the guide.` },
    ]);
    if (inputRef.current) inputRef.current.focus();
  }, [module]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLogs(prev => [...prev, { type: 'command', text: cmd }]);
    setIsTyping(true);

    // Mock processing delay
    setTimeout(() => {
      let response = '';
      let type: 'response' | 'error' = 'response';

      if (trimmed === 'help') {
        response = `Available commands: 
- help: Show this menu
- clear: Clear terminal
- status: Check system status
- ls: List files in current directory
- cat [file]: Read file content
- ${module.id === 'vcs' ? 'git status, git add, git commit' : 
     module.id === 'docker' ? 'docker ps, docker build, docker run' :
     module.id === 'nginx' ? 'nginx -t, service nginx status' : 
     'run-example: Execute the module code'}`;
      } else if (trimmed === 'clear') {
        setLogs([]);
        setIsTyping(false);
        return;
      } else if (trimmed === 'ls') {
        response = module.id === 'docker' ? 'Dockerfile  src/  package.json' :
                   module.id === 'nginx' ? 'nginx.conf  sites-available/  sites-enabled/' :
                   'README.md  main.js  config.json';
      } else if (trimmed === 'status') {
        response = 'System: HEALTHY | Uptime: 4h 12m | Load: 0.23, 0.15, 0.08';
      } else if (trimmed === 'run-example') {
        response = `Executing simulated task for ${module.title}...\nResult: SUCCESS\nLogs: ${module.example.split('\n')[0]} ... executed successfully.`;
      } else if (trimmed.startsWith('git') && module.id === 'vcs') {
        response = trimmed === 'git status' ? 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean' : 
                   'Git command executed successfully.';
      } else if (trimmed.startsWith('docker') && module.id === 'docker') {
        response = trimmed === 'docker ps' ? 'CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES\n7f1a23b89e   nginx     "/docker-entrypoint.…"   2 minutes ago    Up 2 minutes    80/tcp    web-proxy' : 
                   'Docker instruction processed.';
      } else {
        response = `Command not found: ${trimmed}. Type 'help' for assistance.`;
        type = 'error';
      }

      setLogs(prev => [...prev, { type, text: response }]);
      setIsTyping(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 md:p-12 animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-6xl h-full flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Lab Header */}
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="h-4 w-[1px] bg-slate-600 hidden md:block"></div>
            <div className="flex items-center gap-2 text-slate-300">
              <TerminalIcon className="w-4 h-4" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">DevOps Sandbox v1.0.4</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lab Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Instructions Sidebar */}
          <div className="w-full md:w-80 bg-slate-900/50 border-r border-slate-700 p-6 overflow-y-auto hidden md:block">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">Lab Instructions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Objective</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Practice using the tools discussed in the <strong>{module.title}</strong> module. 
                  Try executing common commands in the terminal to see simulated outputs.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Guided Tasks</h4>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm text-slate-400">
                    <div className="w-4 h-4 rounded border border-slate-700 mt-0.5 shrink-0"></div>
                    Verify the environment by typing <code className="text-blue-400">status</code>
                  </li>
                  <li className="flex gap-2 text-sm text-slate-400">
                    <div className="w-4 h-4 rounded border border-slate-700 mt-0.5 shrink-0"></div>
                    Explore the workspace with <code className="text-blue-400">ls</code>
                  </li>
                  <li className="flex gap-2 text-sm text-slate-400">
                    <div className="w-4 h-4 rounded border border-slate-700 mt-0.5 shrink-0"></div>
                    Run the module specific example command.
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <button className="w-full flex items-center justify-center gap-2 bg-emerald-600/10 text-emerald-500 border border-emerald-600/20 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600/20 transition-all">
                  <Play className="w-4 h-4" />
                  Reset Environment
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Display */}
          <div 
            className="flex-1 bg-slate-950 p-6 overflow-y-auto font-mono text-sm" 
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 duration-200">
                  {log.type === 'command' && (
                    <div className="flex gap-2 text-blue-400 font-bold">
                      <span className="text-slate-500">$</span>
                      <span>{log.text}</span>
                    </div>
                  )}
                  {log.type === 'response' && (
                    <div className="text-slate-300 whitespace-pre-wrap pl-4 border-l border-slate-800">
                      {log.text}
                    </div>
                  )}
                  {log.type === 'error' && (
                    <div className="text-red-400 pl-4 border-l border-red-900/50">
                      {log.text}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 items-center text-slate-500 pl-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              )}
            </div>

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2 text-blue-400 font-bold">
              <span className="text-slate-500 shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-blue-400"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLab;
