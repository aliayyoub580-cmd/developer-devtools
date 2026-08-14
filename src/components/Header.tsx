import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCommandPalette } from '../contexts/CommandPaletteContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { categories, searchTools, allTools } from '../data/toolRegistry';
import { Sun, Moon, Search, Menu, X, Heart } from 'lucide-react';
import { Button } from '../components/Button';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { open: openCommandPalette } = useCommandPalette();
  const { favorites } = useFavorites();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, [location]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = searchTools(searchQuery);
    setSearchResults(results.slice(0, 8));
  }, [searchQuery]);

  // Handle keyboard navigation for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].route);
    } else if (searchQuery.trim()) {
      // Try to find a matching tool by name
      const tool = allTools.find(t => t.name.toLowerCase() === searchQuery.toLowerCase());
      if (tool) {
        navigate(tool.route);
      }
    }
  };

  const handleSearchSelect = (result: any) => {
    navigate(result.route);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="DevTools Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
              <span className="text-xl font-bold text-primary">DevTools</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                Home
              </Link>
              <div className="relative group">
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    isActive('/category') ? 'text-accent' : 'text-secondary hover:text-primary'
                  }`}
                >
                  Tools
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {categories.slice(0, 6).map(category => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="block px-4 py-2 text-sm text-secondary hover:bg-elevated hover:text-primary transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                    {categories.length > 6 && (
                      <Link
                        to="/category/all"
                        className="block px-4 py-2 text-sm text-secondary hover:bg-elevated hover:text-primary transition-colors"
                      >
                        All Categories
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <Link
                to="/category/json-data"
                className={`hidden xl:block text-sm font-medium transition-colors ${
                  isActive('/category/json-data') ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                JSON & Data
              </Link>
              <Link
                to="/category/generators"
                className={`hidden xl:block text-sm font-medium transition-colors ${
                  isActive('/category/generators') ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                Generators
              </Link>
              <Link
                to="/category/security"
                className={`hidden xl:block text-sm font-medium transition-colors ${
                  isActive('/category/security') ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                Security
              </Link>
              <Link
                to="/about"
                className={`hidden xl:block text-sm font-medium transition-colors ${
                  isActive('/about') ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Search and theme toggle */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen) {
                    // Focus will be handled by the input
                  }
                }}
                className="p-2 rounded-md hover:bg-elevated transition-colors lg:hidden"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-secondary" />
              </button>

              {/* Search input - visible on desktop or when mobile search is open */}
              {(isSearchOpen || window.innerWidth >= 1024) && (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tools..."
                    className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-elevated text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                    autoFocus={isSearchOpen}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-surface rounded"
                    >
                      <X className="w-4 h-4 text-muted" />
                    </button>
                  )}

                  {/* Search results dropdown */}
                  {searchResults.length > 0 && searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50">
                      {searchResults.map(result => (
                        <button
                          key={result.id}
                          onClick={() => handleSearchSelect(result)}
                          className="w-full px-4 py-3 text-left hover:bg-elevated transition-colors flex items-center gap-3"
                        >
                          <span className="text-secondary text-sm">{result.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-primary">{result.name}</div>
                            <div className="text-sm text-muted">{result.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Favorites */}
            <Link
              to="/"
              state={{ scrollToFavorites: true }}
              className="hidden sm:flex items-center gap-1 p-2 rounded-md hover:bg-elevated transition-colors"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5 text-secondary" />
              {favorites.length > 0 && (
                <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded-full">{favorites.length}</span>
              )}
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-elevated transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-secondary" />
              ) : (
                <Moon className="w-5 h-5 text-secondary" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-elevated transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-secondary" />
              ) : (
                <Menu className="w-5 h-5 text-secondary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-surface border-t border-border">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 text-primary font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <div>
                <div className="text-sm text-muted mb-2">Categories</div>
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block py-2 text-secondary hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/about"
                className="block py-2 text-secondary hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <div className="pt-4 border-t border-border">
                <Button
                  onClick={() => {
                    openCommandPalette();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Tools (Ctrl+K)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile search overlay */}
        {isSearchOpen && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
              setSearchResults([]);
            }}
          />
        )}
      </div>
    </header>
  );
};
