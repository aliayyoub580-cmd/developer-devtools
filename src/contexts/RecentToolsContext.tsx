import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { RecentToolsContextType } from '../types';

const RecentToolsContext = createContext<RecentToolsContextType | undefined>(undefined);

const STORAGE_KEY = 'devtools-recent-tools';
const MAX_RECENT = 12;

const loadRecentTools = (): string[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Handle parsing error
    }
  }
  return [];
};

const saveRecentTools = (tools: string[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
    } catch {
      // Handle storage error
    }
  }
};

export const RecentToolsProvider = ({ children }: { children: ReactNode }) => {
  const [recentTools, setRecentTools] = useState<string[]>(loadRecentTools());

  useEffect(() => {
    saveRecentTools(recentTools);
  }, [recentTools]);

  const addRecentTool = useCallback((toolId: string) => {
    setRecentTools(prev => {
      if (prev[0] === toolId) return prev;
      const filtered = prev.filter(id => id !== toolId);
      return [toolId, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecentTools = useCallback(() => {
    setRecentTools([]);
  }, []);

  const value = useMemo(() => ({
    recentTools,
    addRecentTool,
    clearRecentTools
  }), [recentTools, addRecentTool, clearRecentTools]);

  return (
    <RecentToolsContext.Provider value={value}>
      {children}
    </RecentToolsContext.Provider>
  );
};

export const useRecentTools = (): RecentToolsContextType => {
  const context = useContext(RecentToolsContext);
  if (!context) {
    throw new Error('useRecentTools must be used within a RecentToolsProvider');
  }
  return context;
};
