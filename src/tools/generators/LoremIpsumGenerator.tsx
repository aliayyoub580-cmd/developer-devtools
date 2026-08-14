// Lorem Ipsum Generator Tool
import { useState } from 'react';
import { generateLoremIpsum } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, FileText } from 'lucide-react';

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(5);
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    const result = generateLoremIpsum(paragraphs, sentences);
    setOutput(result);
  };

  const handleClear = () => {
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lorem-ipsum.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate on mount
  useState(() => {
    handleGenerate();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Lorem Ipsum Settings</h3>
          <Button onClick={handleGenerate} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">Paragraphs</label>
            <input
              type="number"
              value={paragraphs}
              onChange={(e) => setParagraphs(Math.max(1, Math.min(50, parseInt(e.target.value) || 3)))}
              min="1"
              max="50"
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Sentences per Paragraph</label>
            <input
              type="number"
              value={sentences}
              onChange={(e) => setSentences(Math.max(1, Math.min(20, parseInt(e.target.value) || 5)))}
              min="1"
              max="20"
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Generated Text</h3>
          <div className="flex gap-2">
            <CopyButton textToCopy={output} size="sm" />
            <Button onClick={handleDownload} variant="ghost" size="sm">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </div>
        <div className="h-64 overflow-auto bg-surface rounded-md p-3">
          <pre className="whitespace-pre-wrap text-sm">{output || 'Lorem ipsum text will appear here'}</pre>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} variant="primary">
          <FileText className="w-4 h-4 mr-2" />
          Generate Lorem Ipsum
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Lorem ipsum is placeholder text commonly used in design and publishing to preview layouts.</p>
      </div>
    </div>
  );
}
