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
    <div className="py-16 bg-eduvance-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pusat Kurasi Beasiswa Terverifikasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Database <span className="text-indigo-600">Beasiswa</span> Kuliah Luar Negeri
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Pilih negara target Anda atau gunakan filter multi-parameter. Setiap beasiswa telah diverifikasi batas pendaftaran, syarat bahasa, dan peluang afirmasi untuk talenta daerah.
          </p>
        </div>

        {/* Step 1: Country Quick Selector Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pilih Negara Tujuan Favorit
            </span>
            {selectedCountry !== 'all' && (
              <button
                onClick={() => setSelectedCountry('all')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
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
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-xs scale-[1.02] ring-2 ring-amber-400/20'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-xs font-medium'
                  }`}
                >
                  <span className="text-2xl" role="img" aria-label={c.name}>
                    {c.flag}
                  </span>
                  <span className="text-xs whitespace-nowrap truncate w-full">
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari beasiswa (misal: MEXT, DAAD, S2 Teknik, Tanpa IELTS)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
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
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="text-xs text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 font-bold py-2.5 px-3 rounded-xl transition-colors border border-transparent hover:border-indigo-100"
                title="Reset seluruh filter"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Secondary Filter Tags */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold mr-1">Rumpun Studi:</span>
            {fieldOptions.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedField(f)}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedField === f
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs scale-[1.02]'
                    : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium'
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
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-300 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group relative"
                >
                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-xl" role="img" aria-label={sch.country}>{sch.flag}</span>
                        <span className="font-bold text-slate-800">{sch.country}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="font-medium text-slate-600">{sch.level.join(', ')}</span>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => toggleBookmark(sch.id, e)}
                        className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-xl hover:bg-indigo-50 transition-colors"
                        title={isBookmarked ? 'Hapus dari simpanan' : 'Simpan beasiswa'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Scholarship Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 line-clamp-2">
                      {sch.name}
                    </h3>

                    {/* Organizer */}
                    <p className="text-xs text-slate-500 mb-4 line-clamp-1 font-medium">
                      {sch.organizer}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                        {sch.fundingType}
                      </span>
                      <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full text-[11px]">
                        Kesulitan: {sch.difficulty}
                      </span>
                      <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full text-[11px]">
                        Kuota: {sch.quota}
                      </span>
                    </div>

                    {/* Key Coverage Snippet */}
                    <div className="space-y-1.5 mb-4 text-xs text-slate-600">
                      <div className="font-bold text-slate-700 mb-1">Cakupan Utama:</div>
                      {sch.coverage.slice(0, 3).map((cov, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{cov}</span>
                        </div>
                      ))}
                    </div>

                    {/* Requirement Note */}
                    <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-xs text-slate-700 mb-4">
                      <div className="font-bold text-slate-900 mb-0.5">Syarat Bahasa & IPK:</div>
                      <p className="line-clamp-2 text-slate-600">{sch.requirements.language}</p>
                    </div>
                  </div>

                  {/* Card Bottom Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <div className="text-xs text-slate-500">
                      <div className="font-medium text-slate-600">Deadline:</div>
                      <span className="font-bold text-slate-900">{sch.applicationPeriod.deadline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReminderModalScholarship(sch);
                        }}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                        title="Ingatkan Saya Sebelum Deadline"
                      >
                        <Bell className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveModalScholarship(sch)}
                        className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
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
        <div className="mt-16 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-indigo-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/60 border border-indigo-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pendampingan Intensif MandalikaEdu</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Bingung Menentukan Beasiswa yang Paling Sesuai Profil Anda?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dapatkan pemetaan profil 1-on-1 bersama mentor alumni luar negeri. Kami bedah kelemahan berkas, kurasi beasiswa dengan peluang lolos tertinggi untuk asal daerah Anda, dan dampingi penulisan esai dari nol.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0 relative z-10">
            <button
              onClick={() => onSelectForConsultation(SCHOLARSHIPS_DATA[0])}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl active:scale-95 transition-all text-center whitespace-nowrap shadow-md"
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
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Catatan & Tips Mentor MandalikaEdu</span>
                </div>
                <p className="text-xs text-indigo-950/80 leading-relaxed font-medium">
                  {activeModalScholarship.tipsMandalika}
                </p>
              </div>

              {/* Grid 2 Kolom: Cakupan & Syarat Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cakupan Pembiayaan */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-indigo-600" />
                    Cakupan yang Ditanggung
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activeModalScholarship.coverage.map((cov, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{cov}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Syarat Utama & Dokumen */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
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
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 flex items-start gap-2 border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{stage}</span>
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
                  className="text-indigo-600 hover:text-indigo-800 underline font-semibold flex items-center gap-1"
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
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5"
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
                  className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-xl whitespace-nowrap shadow-xs flex items-center justify-center gap-1.5"
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
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {reminderSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <Bell className="w-3.5 h-3.5 text-indigo-600" />
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={reminderContact.name}
                      onChange={(e) => setReminderContact({ ...reminderContact, name: e.target.value })}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kanal Pengingat
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setReminderContact({ ...reminderContact, notifyVia: 'whatsapp' })}
                        className={`py-2 px-3 rounded-xl border text-center transition-colors cursor-pointer ${
                          reminderContact.notifyVia === 'whatsapp'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setReminderContact({ ...reminderContact, notifyVia: 'email' })}
                        className={`py-2 px-3 rounded-xl border text-center transition-colors cursor-pointer ${
                          reminderContact.notifyVia === 'email'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Email
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {reminderContact.notifyVia === 'whatsapp' ? 'Nomor WhatsApp' : 'Alamat Email'}
                    </label>
                    <input
                      type={reminderContact.notifyVia === 'whatsapp' ? 'tel' : 'email'}
                      required
                      value={reminderContact.phoneOrEmail}
                      onChange={(e) => setReminderContact({ ...reminderContact, phoneOrEmail: e.target.value })}
                      placeholder={reminderContact.notifyVia === 'whatsapp' ? '0812-xxxx-xxxx' : 'emailanda@gmail.com'}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Data Anda aman dan tidak akan disebarkan. Anda juga akan menerima tips eksklusif persiapan beasiswa dari MandalikaEdu.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
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
