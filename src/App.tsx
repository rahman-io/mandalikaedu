/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { ScholarshipDatabase } from './components/ScholarshipDatabase';
import { QuizStudyFinder } from './components/QuizStudyFinder';
import { CostCalculator } from './components/CostCalculator';
import { PackagesSection } from './components/PackagesSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { CountriesDirectory } from './components/CountriesDirectory';
import { StudentDashboard } from './components/StudentDashboard';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { BookingModal } from './components/BookingModal';
import { LeadMagnetModal } from './components/LeadMagnetModal';
import { ServicePackage } from './data/packages';
import { Scholarship } from './data/scholarships';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState<boolean>(false);
  const [preselectedPackageId, setPreselectedPackageId] = useState<string>('discovery-free');
  const [bookingNote, setBookingNote] = useState<string>('');

  const handleOpenBooking = (pkgId: string = 'discovery-free', note: string = '') => {
    setPreselectedPackageId(pkgId);
    setBookingNote(note);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    handleOpenBooking(pkg.id, `Memilih paket: ${pkg.name}`);
  };

  const handleSelectScholarshipForConsultation = (sch: Scholarship) => {
    handleOpenBooking('discovery-free', `Konsultasi khusus beasiswa: ${sch.name} (${sch.country})`);
  };

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-slate-900 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        onOpenBooking={() => handleOpenBooking('discovery-free')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeSection
            onNavigateTab={handleNavClick}
            onOpenBooking={() => handleOpenBooking('discovery-free')}
            onSelectScholarship={handleSelectScholarshipForConsultation}
            onSelectPackage={handleSelectPackage}
            onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
          />
        )}

        {activeTab === 'beasiswa' && (
          <ScholarshipDatabase
            onSelectForConsultation={handleSelectScholarshipForConsultation}
            onExploreCountry={() => handleNavClick('negara')}
          />
        )}

        {activeTab === 'kuis' && (
          <QuizStudyFinder
            onOpenBookingWithPackage={(pkgId, note) => handleOpenBooking(pkgId, note)}
            onExploreScholarship={() => handleNavClick('beasiswa')}
          />
        )}

        {activeTab === 'kalkulator' && (
          <CostCalculator
            onOpenBooking={() => handleOpenBooking('discovery-free')}
          />
        )}

        {activeTab === 'paket' && (
          <PackagesSection
            onSelectPackage={handleSelectPackage}
          />
        )}

        {activeTab === 'negara' && (
          <CountriesDirectory
            onSelectCountryForScholarships={() => handleNavClick('beasiswa')}
            onOpenBooking={() => handleOpenBooking('discovery-free')}
          />
        )}

        {activeTab === 'kisah' && (
          <SuccessStoriesSection
            onOpenBooking={() => handleOpenBooking('discovery-free')}
          />
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            onOpenBooking={() => handleOpenBooking('discovery-free')}
          />
        )}

        {activeTab === 'blog' && (
          <BlogSection
            onOpenBooking={() => handleOpenBooking('discovery-free')}
          />
        )}

        {activeTab === 'tentang' && (
          <AboutSection
            onOpenBooking={() => handleOpenBooking('discovery-free')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleNavClick}
        onOpenBooking={() => handleOpenBooking('discovery-free')}
        onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
      />

      {/* Global Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedPackageId={preselectedPackageId}
        customNote={bookingNote}
      />

      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
      />

    </div>
  );
}
