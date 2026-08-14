// Timezone Converter Tool
import { useState, useEffect } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Globe, RefreshCw, ArrowLeftRight } from 'lucide-react';

export default function TimezoneConverter() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 8));
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState('America/New_York');
  const [convertedDate, setConvertedDate] = useState('');
  const [convertedTime, setConvertedTime] = useState('');

  // Common timezones
  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Kolkata',
    'Australia/Sydney',
  ];

  const handleConvert = () => {
    try {
      const dateStr = `${date}T${time}`;
      const dateObj = new Date(dateStr);

      if (isNaN(dateObj.getTime())) {
        setConvertedDate('Invalid date/time');
        setConvertedTime('');
        return;
      }

      // Format the date in the target timezone
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: toTimezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(dateObj);

        const year = parts.find(p => p.type === 'year')?.value || '';
        const month = parts.find(p => p.type === 'month')?.value || '';
        const day = parts.find(p => p.type === 'day')?.value || '';
        const hour = parts.find(p => p.type === 'hour')?.value || '';
        const minute = parts.find(p => p.type === 'minute')?.value || '';
        const second = parts.find(p => p.type === 'second')?.value || '';

        setConvertedDate(`${year}-${month}-${day}`);
        setConvertedTime(`${hour}:${minute}:${second}`);
      } catch {
        // Fallback for browsers that don't support the timezone
        setConvertedDate(date);
        setConvertedTime(time);
      }
    } catch {
      setConvertedDate('Error converting timezone');
      setConvertedTime('');
    }
  };

  const handleClear = () => {
    const now = new Date();
    setDate(now.toISOString().slice(0, 10));
    setTime(now.toTimeString().slice(0, 8));
    setConvertedDate('');
    setConvertedTime('');
  };

  const handleSwap = () => {
    setFromTimezone(toTimezone);
    setToTimezone(fromTimezone);
    handleConvert();
  };

  // Convert on mount and when inputs change
  useEffect(() => {
    handleConvert();
  }, [date, time, fromTimezone, toTimezone]);

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
              onChange={(e) => {
                setDate(e.target.value);
                handleConvert();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                handleConvert();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Timezone Conversion</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">From Timezone</label>
            <select
              value={fromTimezone}
              onChange={(e) => {
                setFromTimezone(e.target.value);
                handleConvert();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">To Timezone</label>
            <select
              value={toTimezone}
              onChange={(e) => {
                setToTimezone(e.target.value);
                handleConvert();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Button onClick={handleConvert} variant="primary">
            <Globe className="w-4 h-4 mr-2" />
            Convert Timezone
          </Button>
          <Button onClick={handleSwap} variant="secondary">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Swap Timezones
          </Button>
          <Button onClick={handleClear} variant="ghost">
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {convertedDate && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Converted Time</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-sm text-muted mb-1">Date</div>
              <div className="font-medium text-primary font-mono">{convertedDate}</div>
              <CopyButton textToCopy={convertedDate} className="mt-1" />
            </div>
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-sm text-muted mb-1">Time</div>
              <div className="font-medium text-primary font-mono">{convertedTime}</div>
              <CopyButton textToCopy={convertedTime} className="mt-1" />
            </div>
          </div>
          <div className="mt-3 bg-surface rounded-lg p-3 text-center">
            <div className="text-sm text-muted mb-1">Full Date/Time</div>
            <div className="font-medium text-primary font-mono">{convertedDate} {convertedTime}</div>
            <CopyButton textToCopy={`${convertedDate} ${convertedTime}`} className="mt-1" />
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Convert times between different timezones. Note that some timezones may not be available in all browsers.</p>
      </div>
    </div>
  );
}
