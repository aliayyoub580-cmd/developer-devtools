// Unix Timestamp Converter Tool
import { useState, useEffect } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Clock, RefreshCw, Calendar } from 'lucide-react';

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('1700000000');
  const [milliseconds, setMilliseconds] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [utcTime, setUtcTime] = useState('');

  const handleConvert = () => {
    try {
      const ts = parseFloat(timestamp) || 0;
      const multiplier = milliseconds ? 1 : 1000;
      const dateObj = new Date(ts * multiplier);

      setDate(dateObj);
      setFormattedDate(dateObj.toLocaleString());
      setLocalTime(dateObj.toLocaleString());
      setUtcTime(dateObj.toUTCString());
    } catch {
      setDate(null);
      setFormattedDate('Invalid timestamp');
      setLocalTime('');
      setUtcTime('');
    }
  };

  const handleClear = () => {
    setTimestamp('');
    setDate(null);
    setFormattedDate('');
    setLocalTime('');
    setUtcTime('');
  };

  const handleNow = () => {
    const now = Date.now();
    setTimestamp(milliseconds ? now.toString() : Math.floor(now / 1000).toString());
    handleConvert();
  };

  // Convert on mount and when inputs change
  useEffect(() => {
    handleConvert();
  }, [timestamp, milliseconds]);

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Timestamp Input</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="Enter Unix timestamp..."
            className="flex-1 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
          <select
            value={milliseconds ? 'milliseconds' : 'seconds'}
            onChange={(e) => setMilliseconds(e.target.value === 'milliseconds')}
            className="p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select>
        </div>
        <div className="flex gap-2 mt-3">
          <Button onClick={handleConvert} variant="primary">
            <Clock className="w-4 h-4 mr-2" />
            Convert
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

      {date && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Conversion Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Local Time</div>
              <div className="font-medium text-primary font-mono">{localTime}</div>
              <CopyButton textToCopy={localTime} className="mt-2" />
            </div>
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">UTC Time</div>
              <div className="font-medium text-primary font-mono">{utcTime}</div>
              <CopyButton textToCopy={utcTime} className="mt-2" />
            </div>
            <div className="bg-surface rounded-lg p-3 sm:col-span-2">
              <div className="text-sm text-muted mb-1">Formatted Date</div>
              <div className="font-medium text-primary font-mono">{formattedDate}</div>
              <CopyButton textToCopy={formattedDate} className="mt-2" />
            </div>
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Unix timestamps count the number of seconds (or milliseconds) since January 1, 1970 (UTC).</p>
      </div>
    </div>
  );
}
