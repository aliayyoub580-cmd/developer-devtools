// Fake Data Generator Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw } from 'lucide-react';

export default function FakeDataGenerator() {
  const [type, setType] = useState('name');
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState<string[]>([]);

  const dataTypes = ['name', 'email', 'phone', 'address', 'company', 'date'];

  const generateData = () => {
    const fakeData: Record<string, () => string> = {
      name: () => ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'][Math.floor(Math.random() * 5)],
      email: () => ['john@example.com', 'jane@example.com', 'bob@example.com', 'alice@example.com', 'charlie@example.com'][Math.floor(Math.random() * 5)],
      phone: () => ['(555) 123-4567', '(555) 234-5678', '(555) 345-6789', '(555) 456-7890', '(555) 567-8901'][Math.floor(Math.random() * 5)],
      address: () => ['123 Main St, New York, NY', '456 Oak Ave, Los Angeles, CA', '789 Pine Rd, Chicago, IL'][Math.floor(Math.random() * 3)],
      company: () => ['Acme Inc', 'Globex Corp', 'Initech', 'Wayne Enterprises', 'Stark Industries'][Math.floor(Math.random() * 5)],
      date: () => new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    };

    const generator = fakeData[type] || fakeData.name;
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      results.push(generator());
    }
    setOutput(results);
  };

  const handleClear = () => {
    setOutput([]);
  };

  // Generate initial data
  useState(() => {
    generateData();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Fake Data Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">Data Type</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                generateData();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {dataTypes.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 5)))}
              min="1"
              max="100"
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={generateData} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
      </div>

      {output.length > 0 && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Generated Data</h3>
            <CopyButton textToCopy={output.join('\n')} size="sm" />
          </div>
          <div className="h-48 overflow-auto bg-surface rounded-md p-3">
            <div className="space-y-2">
              {output.map((item, index) => (
                <div key={index} className="p-2 bg-elevated rounded">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Generate fake data for testing and development purposes.</p>
      </div>
    </div>
  );
}
