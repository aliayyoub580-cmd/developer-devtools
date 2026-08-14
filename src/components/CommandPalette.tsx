import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommandPalette } from '../contexts/CommandPaletteContext';
import { searchTools } from '../data/toolRegistry';
import { useFavorites } from '../contexts/FavoritesContext';
import { useRecentTools } from '../contexts/RecentToolsContext';
import { Search, Clock, Star, X, ArrowRight } from 'lucide-react';
import { allTools } from '../data/toolRegistry';
import * as LucideIcons from 'lucide-react';

export const CommandPalette = () => {
  const navigate = useNavigate();
  const { close } = useCommandPalette();
  const { favorites } = useFavorites();
  const { recentTools } = useRecentTools();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<'all' | 'favorites' | 'recent'>('all');

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setSelectedIndex(0);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = searchTools(searchQuery);
    setSearchResults(results.slice(0, 8));
  }, [searchQuery]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if not our keys
      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const maxIndex = getCurrentResults().length - 1;
        setSelectedIndex(prev => Math.min(maxIndex, prev + 1));
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const results = getCurrentResults();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].route);
          close();
        }
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        // Cycle through sections
        const sections: ('all' | 'favorites' | 'recent')[] = ['all', 'favorites', 'recent'];
        const currentIndex = sections.indexOf(activeSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        setActiveSection(sections[nextIndex]);
        setSelectedIndex(0);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, activeSection, close, navigate, searchQuery]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  const getCurrentResults = () => {
    if (searchQuery.trim()) {
      return searchResults;
    }

    switch (activeSection) {
      case 'favorites':
        return favorites.map(id => allTools.find(t => t.id === id)).filter(Boolean) as any[];
      case 'recent':
        return recentTools.map(id => allTools.find(t => t.id === id)).filter(Boolean) as any[];
      default:
        return allTools.slice(0, 12);
    }
  };

  const currentResults = getCurrentResults();

  const handleSelect = (result: any) => {
    navigate(result.route);
    close();
  };

  const getIcon = (iconName: string) => {
    return (LucideIcons as any)[iconName] || LucideIcons.Code;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
      <div
        ref={containerRef}
        className="w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Search input */}
        <div className="relative p-4 border-b border-border">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveSection('all');
            }}
            placeholder="Search tools... (Ctrl+K)"
            className="w-full pl-12 pr-12 py-3 bg-elevated text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-border/20 rounded"
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          )}
          <div className="absolute right-4 bottom-2 flex gap-1">
            <kbd className="px-2 py-1 bg-border/20 text-muted text-xs rounded">↑↓</kbd>
            <kbd className="px-2 py-1 bg-border/20 text-muted text-xs rounded">Enter</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="p-2 max-h-[60vh] overflow-y-auto scrollbar-thin">
          {searchQuery.trim() === '' && (
            <>
              {/* Quick access sections */}
              <div className="px-2 py-2">
                <div className="flex gap-1 mb-3">
                  <button
                    onClick={() => setActiveSection('all')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      activeSection === 'all' ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-elevated'
                    }`}
                  >
                    All Tools
                  </button>
                  <button
                    onClick={() => setActiveSection('favorites')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${
                      activeSection === 'favorites' ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-elevated'
                    }`}
                  >
                    <Star className="w-3 h-3" />
                    Favorites
                  </button>
                  <button
                    onClick={() => setActiveSection('recent')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${
                      activeSection === 'recent' ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-elevated'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    Recent
                  </button>
                </div>
              </div>

              {/* Section content */}
              <div className="space-y-1">
                {currentResults.length === 0 && (
                  <div className="px-4 py-8 text-center text-muted">
                    {activeSection === 'favorites' ? 'No favorites yet' : activeSection === 'recent' ? 'No recent tools' : 'No tools found'}
                  </div>
                )}
                {currentResults.map((result, index) => {
                  const Icon = getIcon(result.icon);
                  return (
                    <button
                      key={result.id || index}
                      onClick={() => handleSelect(result)}
                      className={`w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center gap-3 ${
                        index === selectedIndex ? 'bg-accent/10 border border-accent/20' : 'hover:bg-elevated'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-primary">{result.name}</div>
                        <div className="text-sm text-muted truncate">{result.shortDescription || result.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {searchQuery.trim() && (
            <div className="space-y-1">
              {currentResults.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted">
                  No tools found for "{searchQuery}"
                </div>
              ) : (
                currentResults.map((result, index) => {
                  const Icon = getIcon(result.icon);
                  return (
                    <button
                      key={result.id || index}
                      onClick={() => handleSelect(result)}
                      className={`w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center gap-3 ${
                        index === selectedIndex ? 'bg-accent/10 border border-accent/20' : 'hover:bg-elevated'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-primary">{result.name}</div>
                        <div className="text-sm text-muted truncate">{result.shortDescription || result.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted" />
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border text-xs text-muted">
          <kbd className="px-2 py-1 bg-border/20 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-border/20 rounded">K</kbd> to open
        </div>
      </div>
    </div>
  );
};
