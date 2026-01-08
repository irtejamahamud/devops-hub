
import React from 'react';
import { 
  Terminal, 
  Container, 
  GitBranch, 
  ShieldCheck, 
  Cloud, 
  Activity, 
  Cpu, 
  Workflow,
  Lock,
  FileArchive,
  Server,
  Move,
  FileText,
  Command as CommandIcon,
  Search,
  Globe,
  Database,
  Map,
  Layers,
  Zap,
  Compass,
  Box,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Eye,
  Shield,
  HardDrive,
  Network,
  Settings,
  AlertTriangle,
  ClipboardCheck
} from 'lucide-react';
import { Module, CheatSheet, GlossaryTerm, LearningPath, SurvivalKitCategory } from './types.ts';

export const DEVOPS_MODULES: Module[] = [
  {
    id: 'intro',
    title: 'Introduction to DevOps',
    category: 'Foundations',
    icon: 'Terminal',
    difficulty: 'Beginner',
    content: `DevOps is not just a toolset; it is a cultural transformation. It bridges the historical gap between Developers (who want speed) and Operations (who want stability).

The Core Philosophy:
1. The Three Ways: Flow (Dev to Ops), Feedback (Ops to Dev), and Continuous Learning (Experimentation).
2. CALMS: Culture, Automation, Lean, Measurement, and Sharing.
3. The DevOps Loop: A continuous cycle of Plan, Code, Build, Test, Release, Deploy, Operate, and Monitor.

By adopting DevOps, teams reduce "Lead Time for Changes" and improve "Mean Time to Recovery" (MTTR), directly impacting business value.`,
    example: `A high-performing DevOps team might deploy 10+ times a day using automated CI/CD pipelines, where every commit is tested and verified before reaching production.`
  },
  {
    id: 'linux-foundations',
    title: 'Linux Foundations',
    category: 'Foundations',
    icon: 'HardDrive',
    difficulty: 'Beginner',
    content: `Linux powers over 90% of the world's servers. Mastering it is non-negotiable for DevOps.

Filesystem Hierarchy Essentials:
- /etc: Global configuration files.
- /var/log: The first place to look when things break.
- /home: User workspaces.
- /tmp: Temporary files (cleared on reboot).

The Power of the Shell:
The Shell (Bash/Zsh) is your primary interface. You must master command chaining using pipes (|), input/output redirection (>, >>), and background processes (&). Understanding permissions (chmod 755 vs 644) and ownership (chown) is critical for system security.`,
    example: `# Find process listening on port 80 and kill it
sudo lsof -i :80 -t | xargs kill -9`
  },
  {
    id: 'git-mastery',
    title: 'Git Mastery',
    category: 'Foundations',
    icon: 'GitBranch',
    difficulty: 'Beginner',
    content: `Git is the source of truth for everything in modern DevOps, including Infrastructure as Code (IaC).

Advanced Workflows:
- Feature Branching: Isolate development from the stable main branch.
- Pull Requests: The gatekeeper for quality and security.
- Interactive Rebase: Cleaning up messy commit histories before merging.
- Git Hooks: Automating tasks (like linting) locally before code is even pushed.

Remember: "Commit early, commit often, but only push clean code."`,
    example: `# Clean up history by squashing the last 3 commits
git rebase -i HEAD~3`
  }
];

export const SURVIVAL_KIT: SurvivalKitCategory[] = [
  {
    id: 'linux-basics',
    title: 'Linux & Server Basics',
    icon: 'HardDrive',
    description: 'Essential commands for navigating and managing remote servers.',
    items: [
      { name: 'ssh', desc: 'Secure remote login to server', example: 'ssh user@1.2.3.4' },
      { name: 'scp', desc: 'Securely copy files over SSH', example: 'scp file.zip user@host:/path' },
      { name: 'rsync', desc: 'Fast, incremental file synchronization', example: 'rsync -avz local/ remote/' },
      { name: 'sudo', desc: 'Run command with superuser privileges', example: 'sudo apt update' },
      { name: 'chmod / chown', desc: 'Manage file permissions and ownership', example: 'chmod 400 key.pem' },
      { name: 'htop / top', desc: 'Monitor CPU, memory, and running processes', example: 'htop' },
      { name: 'systemctl', desc: 'Manage system services (start, stop, enable)', example: 'sudo systemctl restart nginx' }
    ]
  },
  {
    id: 'networking-ports',
    title: 'Networking & Ports',
    icon: 'Network',
    description: 'Tools to debug connectivity and verify service availability.',
    items: [
      { name: 'curl / wget', desc: 'Test HTTP endpoints and download files', example: 'curl -I https://google.com' },
      { name: 'ping', desc: 'Check network reachability to a host', example: 'ping 8.8.8.8' },
      { name: 'netstat / ss', desc: 'Display network connections and open ports', example: 'ss -lntp' },
      { name: 'lsof', desc: 'Find which process is using a specific port', example: 'lsof -i :3000' },
      { name: 'dig / nslookup', desc: 'Debug DNS resolution issues', example: 'dig mydomain.com' }
    ]
  },
  {
    id: 'web-servers',
    title: 'Web Server & Reverse Proxy',
    icon: 'Server',
    description: 'Configuring entry points for your application traffic.',
    items: [
      { name: 'nginx', desc: 'High-performance web server and reverse proxy' },
      { name: 'proxy_pass', desc: 'Forward incoming traffic to a backend app', example: 'proxy_pass http://localhost:8080;' },
      { name: 'server_name', desc: 'Domain configuration for virtual hosts', example: 'server_name example.com;' },
      { name: 'ssl / certbot', desc: 'HTTPS encryption setup', example: 'certbot --nginx' }
    ]
  },
  {
    id: 'process-mgmt',
    title: 'Process Management',
    icon: 'Cpu',
    description: 'Keeping your applications running in the background.',
    items: [
      { name: 'pm2', desc: 'Production process manager for Node.js', example: 'pm2 start app.js' },
      { name: 'cron', desc: 'Schedule recurring background jobs', example: 'crontab -e' },
      { name: 'journalctl', desc: 'Inspect system and service logs', example: 'journalctl -u nginx -f' }
    ]
  },
  {
    id: 'cicd-containers',
    title: 'CI/CD & Containers',
    icon: 'Workflow',
    description: 'Automating the build and deployment pipeline.',
    items: [
      { name: 'docker build', desc: 'Create a container image from a Dockerfile', example: 'docker build -t app:v1 .' },
      { name: 'docker-compose', desc: 'Manage multi-container applications', example: 'docker-compose up -d' },
      { name: 'GitHub Actions', desc: 'Automated CI/CD workflows using YAML' }
    ]
  },
  {
    id: 'pro-checklist',
    title: 'Minimum Deployment Checklist',
    icon: 'ClipboardCheck',
    description: 'The core steps required to move from code to a secure production environment.',
    items: [
      { name: 'Step 1: SSH', desc: 'Successfully connect to your remote cloud instance.' },
      { name: 'Step 2: Environment', desc: 'Install runtime (Node/Python) and setup .env files.' },
      { name: 'Step 3: App Runtime', desc: 'Start app with a process manager (PM2/Docker).' },
      { name: 'Step 4: Reverse Proxy', desc: 'Setup Nginx to point domain to your app port.' },
      { name: 'Step 5: Security', desc: 'Enable Firewall (UFW) and add SSL (Certbot).' }
    ]
  },
  {
    id: 'common-errors',
    title: 'Common Deployment Errors',
    icon: 'AlertTriangle',
    description: 'Quick reference for troubleshooting standard failures.',
    items: [
      { name: '502 Bad Gateway', desc: 'Nginx is running, but the backend app is down or unreachable.' },
      { name: '403 Forbidden', desc: 'Usually a file permission issue or Nginx index config error.' },
      { name: 'EADDRINUSE', desc: 'The port you are trying to use is already taken by another process.' },
      { name: 'Connection Refused', desc: 'Service is not running or a firewall is blocking the port.' }
    ]
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'the-foundations',
    title: 'The Fundamentals',
    description: 'The "Survival Kit" for every DevOps engineer. Master Linux, Networking, Git, and SSH.',
    icon: 'Terminal',
    modules: ['intro', 'linux-foundations', 'git-mastery'],
    cheatSheets: ['linux-cs', 'git-cs']
  }
];

export const CHEAT_SHEETS: CheatSheet[] = [
  {
    id: 'ssh-cs',
    title: 'SSH & Remote Access',
    category: 'Connectivity',
    commands: [
      { cmd: 'ssh user@host', desc: 'Basic secure shell login' },
      { cmd: 'ssh -p 2222 user@host', desc: 'Login using a custom port' },
      { cmd: 'ssh -i key.pem user@host', desc: 'Login using a specific private key' },
      { cmd: 'scp -r app user@host:/path', desc: 'Recursively copy folder to server' },
      { cmd: 'rsync -avz app/ user@host:/path', desc: 'Efficiently sync local folder with server' },
      { cmd: 'ssh -L 3306:localhost:3306 user@host', desc: 'Local port forward (Access remote DB locally)' },
      { cmd: 'ssh -v user@host', desc: 'Verbose mode for debugging connection issues' },
      { cmd: 'ssh-copy-id user@host', desc: 'Install your public key on a remote machine' }
    ]
  },
  {
    id: 'file-cs',
    title: 'File & Archive Mastery',
    category: 'System',
    commands: [
      { cmd: 'zip -r archive.zip folder', desc: 'Compress a folder into a zip file' },
      { cmd: 'unzip archive.zip', desc: 'Extract a zip archive' },
      { cmd: 'tar -czvf app.tar.gz folder', desc: 'Create a compressed tarball (gzip)' },
      { cmd: 'tar -xzvf app.tar.gz', desc: 'Extract a compressed tarball' },
      { cmd: 'du -sh *', desc: 'Show disk usage of files in human format' },
      { cmd: 'df -h', desc: 'Display free disk space on filesystems' },
      { cmd: 'ls -la', desc: 'List all files with detailed permissions' }
    ]
  },
  {
    id: 'network-cs',
    title: 'Networking Diagnostics',
    category: 'Network',
    commands: [
      { cmd: 'curl -I https://api.com', desc: 'Check HTTP response headers' },
      { cmd: 'wget -O file.zip https://url', desc: 'Download file and rename it' },
      { cmd: 'ping -c 4 8.8.8.8', desc: 'Check connectivity (4 packets only)' },
      { cmd: 'ss -lntp', desc: 'List all listening TCP ports and processes' },
      { cmd: 'lsof -i :80', desc: 'Find process currently using port 80' },
      { cmd: 'ip addr', desc: 'Show all network interfaces and IP addresses' },
      { cmd: 'nslookup google.com', desc: 'Query DNS for a domain IP' }
    ]
  },
  {
    id: 'process-cs',
    title: 'Process & Services',
    category: 'Operations',
    commands: [
      { cmd: 'pm2 start app.js --name "api"', desc: 'Start Node app with PM2' },
      { cmd: 'pm2 list', desc: 'Show all running PM2 applications' },
      { cmd: 'pm2 logs', desc: 'View real-time application logs' },
      { cmd: 'pm2 restart all', desc: 'Restart all PM2 managed apps' },
      { cmd: 'systemctl status nginx', desc: 'Check status of Nginx service' },
      { cmd: 'sudo systemctl restart nginx', desc: 'Restart a system service' },
      { cmd: 'top / htop', desc: 'Interactive process viewer' },
      { cmd: 'kill -9 <PID>', desc: 'Forcefully kill a process by ID' }
    ]
  },
  {
    id: 'docker-cs',
    title: 'Docker Essentials',
    category: 'Containers',
    commands: [
      { cmd: 'docker build -t myapp .', desc: 'Build image from Dockerfile' },
      { cmd: 'docker run -d -p 80:80 myapp', desc: 'Run container in background' },
      { cmd: 'docker ps', desc: 'List all running containers' },
      { cmd: 'docker exec -it <id> bash', desc: 'Enter container terminal' },
      { cmd: 'docker-compose up -d', desc: 'Start multi-container app' },
      { cmd: 'docker logs -f <id>', desc: 'Follow container logs' }
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: 'SRE', category: 'Culture', definition: 'Site Reliability Engineering.' }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'Terminal': return <Terminal className="w-5 h-5" />;
    case 'Container': return <Container className="w-5 h-5" />;
    case 'GitBranch': return <GitBranch className="w-5 h-5" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
    case 'Cloud': return <Cloud className="w-5 h-5" />;
    case 'Activity': return <Activity className="w-5 h-5" />;
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    case 'Workflow': return <Workflow className="w-5 h-5" />;
    case 'Lock': return <Lock className="w-5 h-5" />;
    case 'FileArchive': return <FileArchive className="w-5 h-5" />;
    case 'Server': return <Server className="w-5 h-5" />;
    case 'Move': return <Move className="w-5 h-5" />;
    case 'FileText': return <FileText className="w-5 h-5" />;
    case 'Command': return <CommandIcon className="w-5 h-5" />;
    case 'Map': return <Map className="w-5 h-5" />;
    case 'Layers': return <Layers className="w-5 h-5" />;
    case 'Zap': return <Zap className="w-5 h-5" />;
    case 'Compass': return <Compass className="w-5 h-5" />;
    case 'Box': return <Box className="w-5 h-5" />;
    case 'ChevronLeft': return <ChevronLeft className="w-5 h-5" />;
    case 'ChevronRight': return <ChevronRight className="w-5 h-5" />;
    case 'BookOpen': return <BookOpen className="w-5 h-5" />;
    case 'Eye': return <Eye className="w-5 h-5" />;
    case 'Shield': return <Shield className="w-5 h-5" />;
    case 'HardDrive': return <HardDrive className="w-5 h-5" />;
    case 'Network': return <Network className="w-5 h-5" />;
    case 'Settings': return <Settings className="w-5 h-5" />;
    case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
    case 'ClipboardCheck': return <ClipboardCheck className="w-5 h-5" />;
    default: return <Terminal className="w-5 h-5" />;
  }
};
