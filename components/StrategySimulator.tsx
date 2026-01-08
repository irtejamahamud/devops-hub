
import React, { useState, useEffect } from 'react';
// Added missing Layers and Terminal imports
import { Play, RotateCcw, Info, Server, Users, ArrowRight, Layers, Terminal } from 'lucide-react';
import { DeploymentStrategy } from '../types.ts';

const StrategySimulator: React.FC = () => {
  const [strategy, setStrategy] = useState<DeploymentStrategy>('rolling');
  const [isDeploying, setIsDeploying] = useState(false);
  const [pods, setPods] = useState<number[]>(new Array(10).fill(1)); // 1 = v1, 2 = v2
  const [progress, setProgress] = useState(0);
  const [canaryTraffic, setCanaryTraffic] = useState(10); // Percent to v2

  const reset = () => {
    setIsDeploying(false);
    setPods(new Array(10).fill(1));
    setProgress(0);
  };

  const startDeployment = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setProgress(0);
    
    if (strategy === 'rolling') {
      let currentIdx = 0;
      const interval = setInterval(() => {
        setPods(prev => {
          const next = [...prev];
          next[currentIdx] = 2;
          return next;
        });
        currentIdx++;
        setProgress((currentIdx / 10) * 100);
        if (currentIdx === 10) {
          clearInterval(interval);
          setIsDeploying(false);
        }
      }, 800);
    } else if (strategy === 'blue-green') {
      // Swaps all at once after a delay
      setTimeout(() => {
        setPods(new Array(10).fill(2));
        setProgress(100);
        setIsDeploying(false);
      }, 3000);
    } else if (strategy === 'canary') {
      // First 2 pods go v2, wait, then the rest
      setPods(prev => [2, 2, ...prev.slice(2)]);
      setProgress(20);
      setTimeout(() => {
        setPods(new Array(10).fill(2));
        setProgress(100);
        setIsDeploying(false);
      }, 4000);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-4 flex items-center gap-3">
          <Layers className="w-10 h-10 text-blue-500" />
          Deployment Strategy Simulator
        </h2>
        <p className="text-slate-400 text-lg">
          Visualize how different release patterns impact your infrastructure and traffic flow.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Select Strategy</label>
            <div className="space-y-3">
              {(['rolling', 'blue-green', 'canary'] as DeploymentStrategy[]).map(s => (
                <button
                  key={s}
                  onClick={() => { setStrategy(s); reset(); }}
                  disabled={isDeploying}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    strategy === s 
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <span className="capitalize font-bold">{s.replace('-', ' ')}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
             <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
               <Info className="w-4 h-4" />
               <p>{strategy === 'rolling' ? 'Instances are replaced one by one.' : 
                  strategy === 'blue-green' ? 'A whole new environment is swapped in.' : 
                  'Small group gets v2 first, then everyone else.'}</p>
             </div>
             
             <div className="flex gap-2">
                <button
                  onClick={startDeployment}
                  disabled={isDeploying || progress === 100}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-bold transition-all"
                >
                  <Play className="w-4 h-4" />
                  Deploy v2.0
                </button>
                <button
                  onClick={reset}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-2 space-y-8">
           {/* Load Balancer */}
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-400">Public Traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-blue-400">{Math.round(progress)}% v2</span>
                </div>
              </div>

              {/* Instances Grid */}
              <div className="grid grid-cols-5 gap-4">
                 {pods.map((version, i) => (version === 1 ? (
                   <div key={i} className="flex flex-col items-center gap-2 group">
                      <div className="w-full aspect-square bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center transition-all animate-in fade-in">
                        <Server className="w-6 h-6 text-slate-600 group-hover:text-slate-400" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">v1.0</span>
                   </div>
                 ) : (
                   <div key={i} className="flex flex-col items-center gap-2 group">
                      <div className="w-full aspect-square bg-emerald-500/10 border border-emerald-500 rounded-2xl flex items-center justify-center transition-all animate-in zoom-in duration-500">
                        <Server className="w-6 h-6 text-emerald-500" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-500">v2.0</span>
                   </div>
                 )))}
              </div>
              
              {/* Connection Lines (Aesthetic) */}
              <div className="mt-10 flex justify-center opacity-20">
                <div className="flex flex-col items-center">
                   <div className="w-[1px] h-8 bg-gradient-to-b from-blue-500 to-transparent"></div>
                   <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Reverse Proxy / Load Balancer</div>
                </div>
              </div>
           </div>

           {/* Real-time Logs */}
           <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-500">
              <div className="flex items-center gap-2 mb-2 text-slate-400 border-b border-slate-800 pb-2">
                <Terminal className="w-3 h-3" />
                <span>Deployment Logs</span>
              </div>
              <div className="space-y-1">
                <div>[INFO] Initializing {strategy} strategy...</div>
                {progress > 0 && <div>[WARN] Terminating v1 instances...</div>}
                {progress > 50 && <div>[INFO] Health checks passing for v2...</div>}
                {progress === 100 && <div className="text-emerald-500">[SUCCESS] Traffic fully shifted to v2.0</div>}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StrategySimulator;
