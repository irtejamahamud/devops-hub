
import React from 'react';
import { CheckCircle2, Circle, ArrowDown } from 'lucide-react';
import { PipelineStep } from '../types.ts';

const steps: PipelineStep[] = [
  { name: 'Build', status: 'success', description: 'Compiling assets' },
  { name: 'Test', status: 'success', description: 'Unit & integration tests' },
  { name: 'Staging', status: 'active', description: 'Deployment to pre-prod' },
  { name: 'Security', status: 'pending', description: 'Vulnerability scan' },
  { name: 'Deploy', status: 'pending', description: 'Production rollout' },
];

const PipelineVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl backdrop-blur-sm shadow-xl w-full">
      <div className="flex items-center justify-between mb-6 gap-2">
        <h3 className="font-bold text-sm text-slate-200 whitespace-nowrap">Pipeline Status</h3>
        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded-full border border-blue-500/20 font-mono">
          03f92a1
        </span>
      </div>
      
      <div className="flex flex-col gap-1">
        {steps.map((step, idx) => (
          <div key={step.name} className="flex flex-col">
            <div className="flex items-center gap-4 group relative">
              {/* Status Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 shrink-0 ${
                step.status === 'success' ? 'bg-green-500/10 border-green-500/50' :
                step.status === 'active' ? 'bg-blue-500/10 border-blue-500 animate-pulse scale-105 shadow-[0_0_10px_rgba(59,130,246,0.3)]' :
                'bg-slate-800 border-slate-700'
              }`}>
                {step.status === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : step.status === 'active' ? (
                  <Circle className="w-3 h-3 text-blue-500 fill-blue-500" />
                ) : (
                  <Circle className="w-3 h-3 text-slate-600" />
                )}
              </div>

              {/* Step Info */}
              <div className="flex flex-col min-w-0">
                <p className={`text-xs font-bold leading-tight ${
                  step.status === 'active' ? 'text-blue-400' : 
                  step.status === 'success' ? 'text-slate-200' : 'text-slate-500'
                }`}>
                  {step.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {step.description}
                </p>
              </div>

              {/* Hover Details */}
              <div className="absolute left-10 top-0 bg-slate-800 text-[10px] px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap shadow-lg">
                Last updated: 2m ago
              </div>
            </div>

            {/* Connecting Line */}
            {idx < steps.length - 1 && (
              <div className="ml-[15px] my-1 flex items-center h-4">
                <div className={`w-0.5 h-full ${
                  step.status === 'success' ? 'bg-green-500/30' : 'bg-slate-800'
                }`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
