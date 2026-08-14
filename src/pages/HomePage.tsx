import { Link } from 'react-router-dom';
import { useRecentTools } from '../contexts/RecentToolsContext';
import { useCommandPalette } from '../contexts/CommandPaletteContext';
import { featuredTools, popularTools, categories, getToolsByCategory } from '../data/toolRegistry';
import { ToolCard } from '../components/ToolCard';
import { CategoryCard } from '../components/CategoryCard';
import { Search, ArrowRight, Clock, Star, TrendingUp } from 'lucide-react';

export const HomePage = () => {
  const { recentTools } = useRecentTools();
  const { open: openCommandPalette } = useCommandPalette();

  const recentToolObjects = recentTools
    .map(id => popularTools.find(t => t.id === id))
    .filter(Boolean) as typeof popularTools;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 lg:py-20">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20">
            Powerful Developer Tools
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
          Developer tools, all in one place.
        </h1>

        <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto mb-8">
          Fast, free, privacy-friendly tools for developers. Format, convert, generate, validate, debug, and optimize without installing anything.
        </p>

        {/* Search Box */}
        <div
          onClick={openCommandPalette}
          className="relative max-w-2xl mx-auto mb-12 bg-surface border border-border rounded-2xl p-2 sm:p-3 shadow-lg hover:border-accent/50 hover:shadow-accent/10 transition-all cursor-pointer flex items-center gap-3 px-4 group"
        >
          <Search className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
          <input
            type="text"
            readOnly
            placeholder="Search developer tools..."
            className="flex-1 bg-transparent text-primary placeholder:text-muted focus:outline-none cursor-pointer text-base py-2"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-elevated border border-border text-muted text-xs font-mono rounded-md shadow-sm">
            <span className="text-xs">Ctrl</span> K
          </kbd>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Featured Tools</h2>
          <Link to="/category/json-data" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1">
            Browse all tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} showCategory={false} />
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Popular Tools</h2>
          <Link to="/category/generators" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1">
            View categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popularTools.slice(0, 8).map(tool => (
            <ToolCard key={tool.id} tool={tool} showCategory={false} />
          ))}
        </div>
      </section>

      {/* Recently Used */}
      {recentToolObjects.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">
              <Clock className="w-6 h-6 inline-block mr-2" />
              Recently Used
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentToolObjects.map(tool => (
              <ToolCard key={tool.id} tool={tool} showCategory={false} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Browse by Category</h2>
          <Link to="/category/json-data" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1">
            All categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => {
            const tools = getToolsByCategory(category.id);
            return (
              <CategoryCard
                key={category.id}
                category={category}
                toolCount={tools.length}
              />
            );
          })}
        </div>
      </section>

      {/* Why DevTools Section */}
      <section className="py-16 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Why use DevTools?</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Everything you need for daily development work, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: <TrendingUp className="w-6 h-6" />, title: 'Fast', description: 'Instant processing in your browser' },
            { icon: <Star className="w-6 h-6" />, title: 'Free', description: 'No subscriptions or hidden costs' },
            { icon: <Search className="w-6 h-6" />, title: 'Easy to Use', description: 'Intuitive interfaces for all tools' },
            { icon: <Clock className="w-6 h-6" />, title: 'No Installation', description: 'Works directly in your browser' },
            { icon: <Search className="w-6 h-6" />, title: 'Searchable', description: 'Find tools instantly with Ctrl+K' },
            { icon: <Star className="w-6 h-6" />, title: 'Favorites', description: 'Save your most used tools' },
          ].map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-12 h-12 bg-elevated rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-accent">{feature.icon}</span>
              </div>
              <h3 className="font-semibold text-primary mb-1">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Common questions about DevTools and how it works.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: 'Is DevTools free to use?',
              answer: 'Yes! All tools on DevTools are completely free to use. There are no hidden costs, subscriptions, or paywalls.'
            },
            {
              question: 'Do I need to create an account?',
              answer: 'No account is required. All tools work without any signup or authentication. Your data stays in your browser.'
            },
            {
              question: 'Are my inputs private and secure?',
              answer: 'Absolutely. Most tools process data entirely in your browser. We never send your inputs to external servers unless explicitly necessary for a specific tool.'
            },
            {
              question: 'Can I use DevTools offline?',
              answer: 'Many tools work offline once the page is loaded. Tools that require browser APIs may have limited functionality offline.'
            },
            {
              question: 'How do I find a specific tool?',
              answer: 'Use the search bar at the top or press Ctrl+K to open the command palette and search for any tool by name or keyword.'
            },
            {
              question: 'Can I save my favorite tools?',
              answer: 'Yes! Click the heart icon on any tool card to add it to your favorites. Favorites are saved in your browser.'
            },
          ].map((faq, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
              <p className="text-secondary">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
