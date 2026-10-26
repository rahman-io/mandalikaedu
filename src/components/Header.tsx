import React, { useState } from 'react';
import { Menu, X, Compass, Calculator, GraduationCap, Sparkles, BookOpen, UserCheck, ShieldCheck } from 'lucide-react';
import brandLogoImg from '../assets/logo.jpg';

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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-indigo-100/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Wordmark & Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            {/* Visual Brand Mark from uploaded Instagram logo (text cropped out) */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-slate-200/80 shadow-2xs group-hover:border-indigo-300 transition-all flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={brandLogoImg} 
                alt="MandalikaEdu Logo" 
                className="w-full h-full object-cover object-top scale-[1.28] origin-top" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
                Mandalika<span className="text-indigo-600">Edu</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wide">
                Bimbingan Kuliah Luar Negeri
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-50/80 border border-slate-200/60 rounded-full text-xs font-semibold text-slate-600">
            {navItems.slice(0, 5).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => handleNavClick('daftar-mentor')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === 'daftar-mentor'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Daftar Jadi Mentor
            </button>
            <button
              onClick={() => handleNavClick('tentang')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === 'tentang'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Tentang
            </button>
          </nav>

          {/* Zone 3: Warm Amber Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all whitespace-nowrap shrink-0 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Konsultasi Gratis</span>
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg whitespace-nowrap"
            >
              Konsultasi
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none"
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
