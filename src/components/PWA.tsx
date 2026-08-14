// PWA Component
import { useEffect, useState } from 'react';
import { registerServiceWorker } from '../lib/serviceWorker';
import { Button } from '../components';
import { Download, X } from 'lucide-react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWA = () => {
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as unknown as PWAInstallPrompt);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    setShowInstallButton(false);

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (err) {
      console.error('Error during installation:', err);
    }

    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallButton(false);
    setInstallPrompt(null);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!showInstallButton && !updateAvailable) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {showInstallButton && (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-lg max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-primary mb-1">Install DevTools</h3>
              <p className="text-sm text-secondary">
                Add DevTools to your home screen for quick access.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button onClick={handleInstall} variant="primary" size="sm">
              Install
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {updateAvailable && (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-lg max-w-sm mt-2">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-primary mb-1">Update Available</h3>
              <p className="text-sm text-secondary">
                A new version of DevTools is available.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button onClick={handleRefresh} variant="primary" size="sm">
              Refresh
            </Button>
            <Button onClick={() => setUpdateAvailable(false)} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
