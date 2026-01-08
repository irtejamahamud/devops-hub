
export interface Module {
  id: string;
  title: string;
  category: string;
  icon: string;
  content: string;
  example: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PipelineStep {
  name: string;
  status: 'pending' | 'active' | 'success' | 'error';
  description: string;
}

export interface Command {
  cmd: string;
  desc: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  category: string;
  commands: Command[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  modules: string[]; // IDs of modules
  cheatSheets: string[]; // IDs of cheat sheets
}

export interface SurvivalItem {
  name: string;
  desc: string;
  example?: string;
}

export interface SurvivalKitCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: SurvivalItem[];
}

export type DeploymentStrategy = 'rolling' | 'blue-green' | 'canary';
