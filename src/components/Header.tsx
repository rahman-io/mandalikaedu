import React, { useState } from 'react';
import { Menu, X, Compass, Calculator, GraduationCap, Sparkles, BookOpen, UserCheck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beasiswa', label: 'Database Beasiswa' },
    { id: 'kuis', label: 'Kuis Studi' },
    { id: 'kalkulator', label: 'Kalkulator Biaya' },
    { id: 'paket', label: 'Paket & Harga' },
    { id: 'kisah', label: 'Kisah Siswa' },
    { id: 'dashboard', label: 'Roadmap Siswa' },
    { id: 'daftar-mentor', label: 'Daftar Jadi Mentor' },
    { id: 'tentang', label: 'Tentang Kami' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-slate-800 transition-colors">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
                MandalikaEdu
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Bimbingan Kuliah Luar Negeri
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.slice(0, 5).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-2 border-b-2 ${
                    isActive
                      ? 'text-slate-950 font-semibold border-slate-900'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            {/* Secondary dropdown or direct items */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`whitespace-nowrap shrink-0 transition-colors py-2 border-b-2 ${
                activeTab === 'dashboard'
                  ? 'text-slate-950 font-semibold border-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => handleNavClick('daftar-mentor')}
              className={`whitespace-nowrap shrink-0 transition-colors py-2 border-b-2 ${
                activeTab === 'daftar-mentor'
                  ? 'text-slate-950 font-semibold border-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Daftar Jadi Mentor
            </button>
            <button
              onClick={() => handleNavClick('tentang')}
              className={`whitespace-nowrap shrink-0 transition-colors py-2 border-b-2 ${
                activeTab === 'tentang'
                  ? 'text-slate-950 font-semibold border-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Tentang
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-95 transition-all whitespace-nowrap shrink-0 shadow-sm"
            >
              Konsultasi Gratis
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Konsultasi
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center px-4 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Jadwalkan Konsultasi Gratis (20 Menit)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
