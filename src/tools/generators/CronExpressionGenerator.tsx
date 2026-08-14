// Cron Expression Generator Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw } from 'lucide-react';

export default function CronExpressionGenerator() {
  const [cron, setCron] = useState({
    minute: '0',
    hour: '0',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  });
  const [expression, setExpression] = useState('0 0 * * *');
  const [description, setDescription] = useState('Every day at midnight');

  const handleGenerate = () => {
    const expr = `${cron.minute} ${cron.hour} ${cron.dayOfMonth} ${cron.month} ${cron.dayOfWeek}`;
    setExpression(expr);

    // Generate human-readable description
    let desc = '';
    if (cron.minute === '0' && cron.hour === '0' && cron.dayOfMonth === '*' && cron.month === '*' && cron.dayOfWeek === '*') {
      desc = 'Every day at midnight';
    } else if (cron.minute === '0' && cron.hour !== '0' && cron.dayOfMonth === '*' && cron.month === '*' && cron.dayOfWeek === '*') {
      desc = `Every day at ${cron.hour}:00`;
    } else if (cron.minute !== '0' && cron.hour === '0' && cron.dayOfMonth === '*' && cron.month === '*' && cron.dayOfWeek === '*') {
      desc = `Every hour at minute ${cron.minute}`;
    } else {
      desc = 'Custom schedule';
    }
    setDescription(desc);
  };

  const handleClear = () => {
    setCron({
      minute: '0',
      hour: '0',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
    });
    setExpression('0 0 * * *');
    setDescription('Every day at midnight');
  };

  // Generate initial expression
  useState(() => {
    handleGenerate();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Cron Schedule</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">Minute</label>
            <select
              value={cron.minute}
              onChange={(e) => {
                setCron(prev => ({ ...prev, minute: e.target.value }));
                handleGenerate();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="0">0</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="*">Every minute</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Hour</label>
            <select
              value={cron.hour}
              onChange={(e) => {
                setCron(prev => ({ ...prev, hour: e.target.value }));
                handleGenerate();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="0">0</option>
              <option value="12">12</option>
              <option value="*">Every hour</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Day of Month</label>
            <select
              value={cron.dayOfMonth}
              onChange={(e) => {
                setCron(prev => ({ ...prev, dayOfMonth: e.target.value }));
                handleGenerate();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="*">Every day</option>
              <option value="1">1st</option>
              <option value="15">15th</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Month</label>
            <select
              value={cron.month}
              onChange={(e) => {
                setCron(prev => ({ ...prev, month: e.target.value }));
                handleGenerate();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="*">Every month</option>
              <option value="1">January</option>
              <option value="6">June</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Day of Week</label>
            <select
              value={cron.dayOfWeek}
              onChange={(e) => {
                setCron(prev => ({ ...prev, dayOfWeek: e.target.value }));
                handleGenerate();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="*">Every day</option>
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={handleClear} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Cron Expression</h3>
          <CopyButton textToCopy={expression} size="sm" />
        </div>
        <div className="bg-surface rounded-md p-3 font-mono text-lg text-center">
          {expression}
        </div>
        <div className="mt-3 text-center text-secondary">
          {description}
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Cron expressions define when scheduled tasks should run. Format: minute hour day-of-month month day-of-week</p>
      </div>
    </div>
  );
}
