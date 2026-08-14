import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { RecentToolsProvider } from './contexts/RecentToolsContext';
import { ToastProvider } from './contexts/ToastContext';
import { CommandPaletteProvider } from './contexts/CommandPaletteContext';
import { Router } from './routes/Router';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RecentToolsProvider>
          <ToastProvider>
            <CommandPaletteProvider>
              <Router />
            </CommandPaletteProvider>
          </ToastProvider>
        </RecentToolsProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
