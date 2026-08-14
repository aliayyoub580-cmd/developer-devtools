import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CommandPalette } from '../components/CommandPalette';
import { useCommandPalette } from '../contexts/CommandPaletteContext';

export const Layout = () => {
  const { isOpen } = useCommandPalette();

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {isOpen && <CommandPalette />}
    </div>
  );
};
