import { useState, useRef, useEffect } from 'react';
import { copyToClipboard } from '../utils';
import { useToast } from '../contexts/ToastContext';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface CopyButtonProps {
  textToCopy: string;
  onCopy?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showToast?: boolean;
}

export const CopyButton = ({ textToCopy, onCopy, className = '', size = 'sm', showToast = true }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      if (showToast) {
        toast.addToast('Copied to clipboard!', 'success');
      }
      if (onCopy) onCopy();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else {
      if (showToast) {
        toast.addToast('Failed to copy', 'error');
      }
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size={size}
      className={className}
      aria-label={copied ? 'Copied' : 'Copy'}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {size !== 'sm' && <span>{copied ? 'Copied!' : 'Copy'}</span>}
    </Button>
  );
};
