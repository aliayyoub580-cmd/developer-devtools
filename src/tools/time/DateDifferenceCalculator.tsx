// Date Difference Calculator Tool
import { useState, useEffect } from 'react';
import { calculateDateDifference } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Calendar, RefreshCw, ArrowLeftRight } from 'lucide-react';

export default function DateDifferenceCalculator() {
  const [date1, setDate1] = useState(new Date().toISOString().slice(0, 10));
  const [time1, setTime1] = useState('00:00');
  const [date2, setDate2] = useState(new Date().toISOString().slice(0, 10));
  const [time2, setTime2] = useState('00:00');
  const [difference, setDifference] = useState<ReturnType<typeof calculateDateDifference> | null>(null);

  const handleCalculate = () => {
    try {
      const date1Obj = new Date(`${date1}T${time1}`);
      const date2Obj = new Date(`${date2}T${time2}`);

      if (isNaN(date1Obj.getTime()) || isNaN(date2Obj.getTime())) {
        setDifference(null);
        return;
      }

      const diff = calculateDateDifference(date1Obj, date2Obj);
      setDifference(diff);
    } catch {
      setDifference(null);
    }
  };

  const handleClear = () => {
    const now = new Date();
    setDate1(now.toISOString().slice(0, 10));
    setTime1('00:00');
    setDate2(now.toISOString().slice(0, 10));
    setTime2('00:00');
    setDifference(null);
  };

  const handleSwap = () => {
    const tempD = date1;
    const tempT = time1;
    setDate1(date2);
    setTime1(time2);
    setDate2(tempD);
    setTime2(tempT);
  };

  useEffect(() => {
    handleCalculate();
  }, [date1, time1, date2, time2]);

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Select Dates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-secondary mb-2 block">Date 1</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={date1}
                onChange={(e) => {
                  setDate1(e.target.value);
                }}
                className="flex-1 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="time"
                value={time1}
                onChange={(e) => {
                  setTime1(e.target.value);
                }}
                className="p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Date 2</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={date2}
                onChange={(e) => {
                  setDate2(e.target.value);
                }}
                className="flex-1 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="time"
                value={time2}
                onChange={(e) => {
                  setTime2(e.target.value);
                }}
                className="p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Button onClick={handleCalculate} variant="primary">
            <Calendar className="w-4 h-4 mr-2" />
            Calculate Difference
          </Button>
          <Button onClick={handleSwap} variant="secondary">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Swap Dates
          </Button>
          <Button onClick={handleClear} variant="ghost">
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {difference && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Date Difference</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{difference.days}</div>
              <div className="text-sm text-muted">Days</div>
              <CopyButton textToCopy={difference.days.toString()} className="mt-1" />
            </div>
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{difference.hours}</div>
              <div className="text-sm text-muted">Hours</div>
              <CopyButton textToCopy={difference.hours.toString()} className="mt-1" />
            </div>
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{difference.minutes}</div>
              <div className="text-sm text-muted">Minutes</div>
              <CopyButton textToCopy={difference.minutes.toString()} className="mt-1" />
            </div>
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{difference.seconds}</div>
              <div className="text-sm text-muted">Seconds</div>
              <CopyButton textToCopy={difference.seconds.toString()} className="mt-1" />
            </div>
          </div>
          <div className="mt-3 bg-surface rounded-lg p-3 text-center">
            <div className="text-sm text-muted mb-1">Total Seconds</div>
            <div className="text-xl font-bold text-primary">{difference.totalSeconds}</div>
            <CopyButton textToCopy={difference.totalSeconds.toString()} className="mt-1" />
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Calculate the difference between two dates in days, hours, minutes, and seconds.</p>
      </div>
    </div>
  );
}
