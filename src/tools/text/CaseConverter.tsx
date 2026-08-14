// Case Converter Tool
import { useState } from 'react';
import { convertCase } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
export default function CaseConverter() {
  const [input, setInput] = useState('hello world');
  const [output, setOutput] = useState('');
  const [selectedCase, setSelectedCase] = useState('UPPERCASE');

  const cases = [
    'UPPERCASE',
    'lowercase',
    'Title Case',
    'Sentence case',
    'camelCase',
    'PascalCase',
    'snake_case',
    'kebab-case',
    'CONSTANT_CASE'
  ];

  const handleConvert = () => {
    const result = convertCase(input, selectedCase);
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  useState(() => {
    handleConvert();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Input Text</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              Clear
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleConvert();
            }}
            placeholder="Enter text to convert..."
            className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Output</h3>
            <CopyButton textToCopy={output} size="sm" />
          </div>
          <div className="h-48 overflow-auto bg-surface rounded-md p-3">
            <pre className="whitespace-pre-wrap break-all">{output}</pre>
          </div>
        </div>
      </div>

      {/* Case Selection */}
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Select Case</h3>
        <div className="flex flex-wrap gap-2">
          {cases.map(caseType => (
            <Button
              key={caseType}
              onClick={() => {
                setSelectedCase(caseType);
                handleConvert();
              }}
              variant={selectedCase === caseType ? 'primary' : 'secondary'}
              size="sm"
            >
              {caseType}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Select a case type to convert your text. The conversion happens automatically as you type.</p>
      </div>
    </div>
  );
}
