// Timestamp Generator Tool
import { useState, useEffect } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Clock, RefreshCw, Calendar } from 'lucide-react';

export default function TimestampGenerator() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 8));
  const [milliseconds, setMilliseconds] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  const handleGenerate = () => {
    try {
      const dateStr = `${date}T${time}`;
      const dateObj = new Date(dateStr);

      if (isNaN(dateObj.getTime())) {
        setTimestamp('Invalid date/time');
        return;
      }

      const ts = milliseconds ? dateObj.getTime() : Math.floor(dateObj.getTime() / 1000);
      setTimestamp(ts.toString());
    } catch {
      setTimestamp('Error generating timestamp');
    }
  };

  const handleClear = () => {
    const now = new Date();
    setDate(now.toISOString().slice(0, 10));
    setTime(now.toTimeString().slice(0, 8));
    setTimestamp('');
  };

  const handleNow = () => {
    const now = new Date();
    setDate(now.toISOString().slice(0, 10));
    setTime(now.toTimeString().slice(0, 8));
    handleGenerate();
  };

  // Generate on mount
  useEffect(() => {
    handleGenerate();
  }, [date, time, milliseconds]);

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Date & Time</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="flex items-center gap-2 cursor-pointer p-2 bg-surface rounded-md">
            <input
              type="checkbox"
              checked={milliseconds}
              onChange={(e) => setMilliseconds(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Milliseconds</span>
          </label>
        </div>
        <div className="flex gap-2 mt-3">
          <Button onClick={handleGenerate} variant="primary">
            <Clock className="w-4 h-4 mr-2" />
            Generate Timestamp
          </Button>
          <Button onClick={handleNow} variant="secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Use Current Time
          </Button>
          <Button onClick={handleClear} variant="ghost">
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {timestamp && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Generated Timestamp</h3>
            <CopyButton textToCopy={timestamp} size="sm" />
          </div>
          <div className="bg-surface rounded-md p-3 font-mono text-lg text-center">
            {timestamp}
          </div>
          <div className="mt-2 text-center text-sm text-muted">
            {milliseconds ? 'Milliseconds since epoch' : 'Seconds since epoch'}
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Unix timestamps are used to represent dates and times as a single number for easy storage and comparison.</p>
      </div>
    </div>
  );
}
