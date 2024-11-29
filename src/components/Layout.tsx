import React from 'react';
import { Menu, Users, Scissors } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'clients' | 'services';
  onNavigate: (page: 'clients' | 'services') => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">World Beauty</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => onNavigate('clients')}
                className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                  currentPage === 'clients' ? 'bg-purple-900' : 'hover:bg-purple-600'
                }`}
              >
                <Users size={20} />
                Clientes
              </button>
              <button
                onClick={() => onNavigate('services')}
                className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                  currentPage === 'services' ? 'bg-purple-900' : 'hover:bg-purple-600'
                }`}
              >
                <Scissors size={20} />
                Serviços
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-purple-600"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  onNavigate('clients');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                  currentPage === 'clients' ? 'bg-purple-900' : 'hover:bg-purple-600'
                }`}
              >
                <Users size={20} />
                Clientes
              </button>
              <button
                onClick={() => {
                  onNavigate('services');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                  currentPage === 'services' ? 'bg-purple-900' : 'hover:bg-purple-600'
                }`}
              >
                <Scissors size={20} />
                Serviços
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}