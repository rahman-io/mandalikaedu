import React, { useState, useMemo } from 'react';
import { Scholarship, SCHOLARSHIPS_DATA } from '../data/scholarships';
import { COUNTRIES_DATA } from '../data/countries';
import { 
  Search, Filter, Calendar, ExternalLink, Bookmark, BookmarkCheck, 
  Bell, CheckCircle2, AlertCircle, Sparkles, ChevronRight, X,
  ArrowRight, ShieldCheck, Clock, Award, FileText, Globe2
} from 'lucide-react';

interface ScholarshipDatabaseProps {
  onSelectForConsultation: (scholarship: Scholarship) => void;
  onExploreCountry?: (countryId: string) => void;
}

export const ScholarshipDatabase: React.FC<ScholarshipDatabaseProps> = ({ 
  onSelectForConsultation,
  onExploreCountry
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedFunding, setSelectedFunding] = useState<string>('all');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedDeadlineStatus, setSelectedDeadlineStatus] = useState<string>('all');
  
  // Modals state
  const [activeModalScholarship, setActiveModalScholarship] = useState<Scholarship | null>(null);
  const [reminderModalScholarship, setReminderModalScholarship] = useState<Scholarship | null>(null);
  const [reminderContact, setReminderContact] = useState<{ name: string; phoneOrEmail: string; notifyVia: 'whatsapp' | 'email' }>({
    name: '',
    phoneOrEmail: '',
    notifyVia: 'whatsapp'
  });
  const [reminderSuccess, setReminderSuccess] = useState(false);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mandalika_saved_scholarships');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter((item) => item !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('mandalika_saved_scholarships', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderContact.phoneOrEmail.trim()) return;
    setReminderSuccess(true);
    setTimeout(() => {
      setReminderSuccess(false);
      setReminderModalScholarship(null);
      setReminderContact({ name: '', phoneOrEmail: '', notifyVia: 'whatsapp' });
    }, 2200);
  };

  const countryFilterList = [
    { id: 'all', name: 'Semua Negara', flag: '🌍' },
    { id: 'Jepang', name: 'Jepang', flag: '🇯🇵' },
    { id: 'Jerman', name: 'Jerman', flag: '🇩🇪' },
    { id: 'Inggris', name: 'Inggris (UK)', flag: '🇬🇧' },
    { id: 'Australia', name: 'Australia', flag: '🇦🇺' },
    { id: 'Turki', name: 'Turki', flag: '🇹🇷' },
    { id: 'Korea Selatan', name: 'Korea Selatan', flag: '🇰🇷' },
    { id: 'Uni Eropa', name: 'Uni Eropa', flag: '🇪🇺' },
    { id: 'Belanda', name: 'Belanda', flag: '🇳🇱' },
    { id: 'Amerika Serikat', name: 'Amerika Serikat', flag: '🇺🇸' },
  ];

  const fieldOptions = [
    'all',
    'Engineering & STEM',
    'Sosial & Humaniora',
    'Bisnis & Ekonomi',
    'Kedokteran & Kesehatan',
    'Kebijakan Publik & Hukum'
  ];

  // Filtered scholarships
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.filter((sch) => {
      // Country match
      if (selectedCountry !== 'all') {
        if (!sch.country.toLowerCase().includes(selectedCountry.toLowerCase())) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = sch.name.toLowerCase().includes(query);
        const matchesOrg = sch.organizer.toLowerCase().includes(query);
        const matchesCountry = sch.country.toLowerCase().includes(query);
        const matchesSummary = sch.summary.toLowerCase().includes(query);
        const matchesFields = sch.fieldsOfStudy.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesOrg && !matchesCountry && !matchesSummary && !matchesFields) {
          return false;
        }
      }

      // Level match
      if (selectedLevel !== 'all') {
        if (!sch.level.includes(selectedLevel as any)) {
          return false;
        }
      }

      // Funding match
      if (selectedFunding !== 'all') {
        if (selectedFunding === 'Fully Funded' && sch.fundingType !== 'Fully Funded') return false;
        if (selectedFunding === 'Partial' && sch.fundingType !== 'Partial') return false;
      }

      // Field match
      if (selectedField !== 'all') {
        if (!sch.fieldsOfStudy.some(f => f.toLowerCase().includes(selectedField.toLowerCase()))) {
          return false;
        }
      }

      // Deadline Status
      if (selectedDeadlineStatus !== 'all') {
        if (sch.applicationPeriod.deadlineStatus !== selectedDeadlineStatus) return false;
      }

      return true;
    });
  }, [selectedCountry, searchQuery, selectedLevel, selectedFunding, selectedField, selectedDeadlineStatus]);

  const resetFilters = () => {
    setSelectedCountry('all');
    setSearchQuery('');
    setSelectedLevel('all');
    setSelectedFunding('all');
    setSelectedField('all');
    setSelectedDeadlineStatus('all');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Pusat Kurasi Beasiswa Terverifikasi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Database Beasiswa Kuliah Luar Negeri
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Pilih negara target Anda atau gunakan filter multi-parameter. Setiap beasiswa telah diverifikasi batas pendaftaran, syarat bahasa, dan peluang afirmasi untuk talenta daerah.
          </p>
        </div>

        {/* Step 1: Country Quick Selector Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pilih Negara Tujuan Favorit
            </span>
            {selectedCountry !== 'all' && (
              <button
                onClick={() => setSelectedCountry('all')}
                className="text-xs text-slate-600 hover:text-slate-900 underline"
              >
                Lihat Semua Negara
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
            {countryFilterList.map((c) => {
              const isSelected = selectedCountry === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountry(c.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                  }`}
                >
                  <span className="text-2xl" role="img" aria-label={c.name}>
                    {c.flag}
                  </span>
                  <span className="text-xs font-medium whitespace-nowrap truncate w-full">
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari beasiswa (misal: MEXT, DAAD, S2 Teknik, Tanpa IELTS)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Jenjang Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">Semua Jenjang</option>
                <option value="S1">S1 (Sarjana)</option>
                <option value="S2">S2 (Master)</option>
                <option value="S3">S3 (Doktor)</option>
                <option value="Riset">Riset / Non-Degree</option>
              </select>
            </div>

            {/* Pendanaan Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedFunding}
                onChange={(e) => setSelectedFunding(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">Semua Pendanaan</option>
                <option value="Fully Funded">Fully Funded (Penuh)</option>
                <option value="Partial">Partial Funded</option>
              </select>
            </div>

            {/* Status Deadline */}
            <div className="md:col-span-2">
              <select
                value={selectedDeadlineStatus}
                onChange={(e) => setSelectedDeadlineStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">Semua Status</option>
                <option value="open">Buka Sekarang</option>
                <option value="closing_soon">Segera Tutup</option>
                <option value="upcoming">Akan Datang</option>
              </select>
            </div>

            {/* Reset Action */}
            <div className="md:col-span-1 text-center">
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium py-2 px-2 hover:bg-slate-100 rounded-md transition-colors"
                title="Reset seluruh filter"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Secondary Filter Tags */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium mr-1">Rumpun Studi:</span>
            {fieldOptions.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedField(f)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedField === f
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'all' ? 'Semua Bidang' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 text-sm text-slate-500 gap-2">
          <div>
            Menampilkan <span className="font-bold text-slate-900 tabular-nums">{filteredScholarships.length}</span> beasiswa terkurasi
            {selectedCountry !== 'all' && (
              <span> untuk negara <strong className="text-slate-800">{selectedCountry}</strong></span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>Data diverifikasi berkala oleh Tim Riset MandalikaEdu</span>
          </div>
        </div>

        {/* Scholarship Cards Grid */}
        {filteredScholarships.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Tidak ada beasiswa yang cocok
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Coba kurangi filter atau ubah kata kunci pencarian Anda untuk melihat peluang lainnya.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((sch) => {
              const isBookmarked = bookmarkedIds.includes(sch.id);
              return (
                <div
                  key={sch.id}
                  onClick={() => setActiveModalScholarship(sch)}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400/80 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group relative"
                >
                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-xl" role="img" aria-label={sch.country}>{sch.flag}</span>
                        <span className="font-semibold text-slate-800">{sch.country}</span>
                        <span aria-hidden="true">·</span>
                        <span>{sch.level.join(', ')}</span>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => toggleBookmark(sch.id, e)}
                        className="text-slate-400 hover:text-slate-900 p-1 rounded-md transition-colors"
                        title={isBookmarked ? 'Hapus dari simpanan' : 'Simpan beasiswa'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-5 h-5 text-slate-900 fill-slate-900" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Scholarship Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors mb-1 line-clamp-2">
                      {sch.name}
                    </h3>

                    {/* Organizer */}
                    <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                      {sch.organizer}
                    </p>

                    {/* Unboxed Metadata Row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                      <span className="font-medium text-slate-800">
                        {sch.fundingType}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500">
                        Kesulitan: {sch.difficulty}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500">
                        Kuota: {sch.quota}
                      </span>
                    </div>

                    {/* Key Coverage Snippet */}
                    <div className="space-y-1.5 mb-4 text-xs text-slate-600">
                      <div className="font-semibold text-slate-700 mb-1">Cakupan Utama:</div>
                      {sch.coverage.slice(0, 3).map((cov, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{cov}</span>
                        </div>
                      ))}
                    </div>

                    {/* Requirement Note */}
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mb-4">
                      <div className="font-semibold text-slate-800 mb-0.5">Syarat Bahasa & IPK:</div>
                      <p className="line-clamp-2 text-slate-600">{sch.requirements.language}</p>
                    </div>
                  </div>

                  {/* Card Bottom Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <div className="text-xs text-slate-500">
                      <div className="font-medium text-slate-700">Deadline:</div>
                      <span className="font-semibold text-slate-900">{sch.applicationPeriod.deadline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReminderModalScholarship(sch);
                        }}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Ingatkan Saya Sebelum Deadline"
                      >
                        <Bell className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveModalScholarship(sch)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
                      >
                        Detail
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upsell Banner for Scholarship Hunter / Consultation */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Pendampingan Intensif MandalikaEdu
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Bingung Menentukan Beasiswa yang Paling Sesuai Profil Anda?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dapatkan pemetaan profil 1-on-1 bersama mentor alumni luar negeri. Kami bedah kelemahan berkas, kurasi beasiswa dengan peluang lolos tertinggi untuk asal daerah Anda, dan dampingi penulisan esai dari nol.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onSelectForConsultation(SCHOLARSHIPS_DATA[0])}
              className="px-6 py-3 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 active:scale-95 transition-all text-center whitespace-nowrap shadow-sm"
            >
              Jadwalkan Konsultasi Gratis
            </button>
          </div>
        </div>

      </div>

      {/* MODAL 1: Detail Beasiswa Lengkap (Section 4 Alur Pengguna) */}
      {activeModalScholarship && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-slate-100 flex items-start justify-between gap-4 z-10">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="text-xl">{activeModalScholarship.flag}</span>
                  <span className="font-semibold text-slate-800">{activeModalScholarship.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>Jenjang: {activeModalScholarship.level.join(', ')}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-800">{activeModalScholarship.fundingType}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {activeModalScholarship.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Penyelenggara: {activeModalScholarship.organizer}
                </p>
              </div>

              <button
                onClick={() => setActiveModalScholarship(null)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 sm:px-8 py-6 space-y-6">
              
              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Ringkasan Beasiswa
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalScholarship.summary}
                </p>
              </div>

              {/* Tips Khusus MandalikaEdu (Nilai Tambah untuk Anak Daerah) */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-slate-700" />
                  <span>Catatan & Tips Mentor MandalikaEdu</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeModalScholarship.tipsMandalika}
                </p>
              </div>

              {/* Grid 2 Kolom: Cakupan & Syarat Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cakupan Pembiayaan */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-slate-600" />
                    Cakupan yang Ditanggung
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activeModalScholarship.coverage.map((cov, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                        <span>{cov}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Syarat Utama & Dokumen */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Syarat Utama & Dokumen
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700 mb-3">
                    <div><strong>IPK Minimum:</strong> {activeModalScholarship.requirements.gpa}</div>
                    <div><strong>Standar Bahasa:</strong> {activeModalScholarship.requirements.language}</div>
                    {activeModalScholarship.requirements.maxAge && (
                      <div><strong>Batas Usia:</strong> {activeModalScholarship.requirements.maxAge}</div>
                    )}
                    {activeModalScholarship.requirements.workExperience && (
                      <div><strong>Pengalaman Kerja:</strong> {activeModalScholarship.requirements.workExperience}</div>
                    )}
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-semibold text-slate-800 block mb-1 text-xs">Dokumen Wajib:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {activeModalScholarship.requirements.documents.map((doc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-slate-400">·</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Tahapan Seleksi */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Tahapan Alur Seleksi
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {activeModalScholarship.selectionStages.map((stage, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tanggal & Verifikasi */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Periode: <strong>{activeModalScholarship.applicationPeriod.open}</strong> s.d. <strong>{activeModalScholarship.applicationPeriod.deadline}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Terakhir diverifikasi: <strong>{activeModalScholarship.lastVerified}</strong></span>
                </div>
                <a
                  href={activeModalScholarship.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-slate-950 underline font-medium flex items-center gap-1"
                >
                  Situs Resmi Pendaftaran
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Modal Conversion Footer (Di sinilah konversi ke paket berbayar terjadi) */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                Butuh bantuan menyusun berkas & esai untuk <strong>{activeModalScholarship.name}</strong>?
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const sch = activeModalScholarship;
                    setActiveModalScholarship(null);
                    setReminderModalScholarship(sch);
                  }}
                  className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  Ingatkan Deadline
                </button>

                <button
                  onClick={() => {
                    const sch = activeModalScholarship;
                    setActiveModalScholarship(null);
                    onSelectForConsultation(sch);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all rounded-xl whitespace-nowrap shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Konsultasi untuk Beasiswa Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Pengingat Deadline (Lead Generation via WhatsApp/Email) */}
      {reminderModalScholarship && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setReminderModalScholarship(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {reminderSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pengingat Berhasil Didaftarkan!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kami akan mengirimkan notifikasi 30 hari & 14 hari sebelum deadline <strong>{reminderModalScholarship.name}</strong> ke kontak Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReminderSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Bell className="w-4 h-4 text-slate-700" />
                  <span>Pengingat Deadline Beasiswa</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Ingatkan Saya Sebelum Deadline
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {reminderModalScholarship.name} (Deadline: {reminderModalScholarship.applicationPeriod.deadline})
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={reminderContact.name}
                      onChange={(e) => setReminderContact({ ...reminderContact, name: e.target.value })}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Kanal Pengingat
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setReminderContact({ ...reminderContact, notifyVia: 'whatsapp' })}
                        className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                          reminderContact.notifyVia === 'whatsapp'
                            ? 'bg-slate-900 text-white border-slate-900 font-medium'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setReminderContact({ ...reminderContact, notifyVia: 'email' })}
                        className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                          reminderContact.notifyVia === 'email'
                            ? 'bg-slate-900 text-white border-slate-900 font-medium'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        Email
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {reminderContact.notifyVia === 'whatsapp' ? 'Nomor WhatsApp' : 'Alamat Email'}
                    </label>
                    <input
                      type={reminderContact.notifyVia === 'whatsapp' ? 'tel' : 'email'}
                      required
                      value={reminderContact.phoneOrEmail}
                      onChange={(e) => setReminderContact({ ...reminderContact, phoneOrEmail: e.target.value })}
                      placeholder={reminderContact.notifyVia === 'whatsapp' ? '0812-xxxx-xxxx' : 'emailanda@gmail.com'}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Data Anda aman dan tidak akan disebarkan. Anda juga akan menerima tips eksklusif persiapan beasiswa dari MandalikaEdu.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Pasang Pengingat Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
