// Git Command Generator Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw } from 'lucide-react';

export default function GitCommandGenerator() {
  const [category, setCategory] = useState('basic');
  const [command, setCommand] = useState('');
  const [description, setDescription] = useState('');

  const commands = {
    basic: [
      { cmd: 'git init', desc: 'Initialize a new Git repository' },
      { cmd: 'git clone <url>', desc: 'Clone a repository' },
      { cmd: 'git status', desc: 'Check the status of your repository' },
    ],
    branch: [
      { cmd: 'git branch', desc: 'List all branches' },
      { cmd: 'git branch <name>', desc: 'Create a new branch' },
      { cmd: 'git checkout <branch>', desc: 'Switch to a branch' },
      { cmd: 'git checkout -b <branch>', desc: 'Create and switch to a new branch' },
    ],
    commit: [
      { cmd: 'git add <file>', desc: 'Stage a file for commit' },
      { cmd: 'git add .', desc: 'Stage all changes' },
      { cmd: 'git commit -m "message"', desc: 'Commit staged changes' },
      { cmd: 'git commit --amend', desc: 'Amend the last commit' },
    ],
    remote: [
      { cmd: 'git remote add origin <url>', desc: 'Add a remote repository' },
      { cmd: 'git push -u origin main', desc: 'Push to remote repository' },
      { cmd: 'git pull origin main', desc: 'Pull from remote repository' },
    ],
  };

  const handleGenerate = () => {
    const categoryCommands = commands[category as keyof typeof commands] || [];
    if (categoryCommands.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryCommands.length);
      setCommand(categoryCommands[randomIndex].cmd);
      setDescription(categoryCommands[randomIndex].desc);
    }
  };

  const handleClear = () => {
    setCommand('');
    setDescription('');
  };

  const categories = Object.keys(commands);

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Command Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              onClick={() => {
                setCategory(cat);
                handleGenerate();
              }}
              variant={category === cat ? 'primary' : 'secondary'}
              size="sm"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={handleGenerate} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Random Command
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
      </div>

      {command && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Git Command</h3>
            <CopyButton textToCopy={command} size="sm" />
          </div>
          <div className="bg-surface rounded-md p-3 font-mono text-lg">
            {command}
          </div>
          <div className="mt-3 text-secondary">
            {description}
          </div>
        </div>
      )}

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">All Commands</h3>
        <div className="h-48 overflow-auto bg-surface rounded-md p-3">
          {categories.map(cat => (
            <div key={cat} className="mb-4">
              <h4 className="font-medium text-primary mb-2">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
              <div className="space-y-1">
                {(commands[cat as keyof typeof commands] || []).map((cmd, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <code className="bg-border/20 px-2 py-1 rounded text-sm">{cmd.cmd}</code>
                    <CopyButton textToCopy={cmd.cmd} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Browse Git commands by category or get a random command.</p>
      </div>
    </div>
  );
}
