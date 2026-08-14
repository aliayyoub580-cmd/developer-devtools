import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { FavoritesContextType } from '../types';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'devtools-favorites';

const loadFavorites = (): string[] => {
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

const saveFavorites = (favorites: string[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Handle storage error
    }
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites());

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = useCallback((toolId: string) => {
    setFavorites(prev => (!prev.includes(toolId) ? [...prev, toolId] : prev));
  }, []);

  const removeFavorite = useCallback((toolId: string) => {
    setFavorites(prev => prev.filter(id => id !== toolId));
  }, []);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => (prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]));
  }, []);

  const isFavorite = useCallback((toolId: string): boolean => {
    return favorites.includes(toolId);
  }, [favorites]);

  const value = useMemo(() => ({
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }), [favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
