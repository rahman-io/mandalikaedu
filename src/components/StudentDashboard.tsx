import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, Upload, FileText, Calendar, 
  ArrowRight, ShieldCheck, Sparkles, AlertCircle, Clock, Trash2, Download 
} from 'lucide-react';

interface StudentDashboardProps {
  onOpenBooking: () => void;
}

interface ChecklistItem {
  id: string;
  stage: string;
  title: string;
  desc: string;
  isCompleted: boolean;
  docTemplateUrl?: string;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Tahap 1: Dokumen Fundamental
  { id: 'c1', stage: 'Tahap 1: Dokumen Fundamental', title: 'Paspor Masih Berlaku Minimal 18 Bulan', desc: 'Pastikan nama di paspor sesuai persis dengan ijazah dan akta kelahiran Anda.', isCompleted: true },
  { id: 'c2', stage: 'Tahap 1: Dokumen Fundamental', title: 'Terjemahan Tersumpah (Sworn Translator) Ijazah & Transkrip', desc: 'Diterjemahkan oleh penerjemah tersumpah bersertifikat HPI ke dalam bahasa Inggris/Jerman.', isCompleted: true },
  { id: 'c3', stage: 'Tahap 1: Dokumen Fundamental', title: 'Curriculum Vitae (Format ATS / Europass Standar Akademik)', desc: 'Maksimal 2 halaman, sorot proyek skripsi dan keterlibatan organisasi di daerah.', isCompleted: false },
  
  // Tahap 2: Tes Bahasa & Standardisasi
  { id: 'c4', stage: 'Tahap 2: Standardized Language Test', title: 'Tes Prediksi Diagnostik IELTS / TOEFL', desc: 'Ketahui kelemahan band score Anda (Listening, Reading, Writing, atau Speaking).', isCompleted: true },
  { id: 'c5', stage: 'Tahap 2: Standardized Language Test', title: 'Mengikuti Ujian Resmi IELTS / TOEFL iBT / JLPT', desc: 'Targetkan minimal IELTS 6.5 (tidak ada subskor di bawah 6.0) untuk program beasiswa penuh.', isCompleted: false },

  // Tahap 3: Esai & Berkas Narasi
  { id: 'c6', stage: 'Tahap 3: Esai & Berkas Narasi', title: 'Draf Pertama Motivation Letter / Personal Statement', desc: 'Gunakan kerangka STAR dan angkat keunikan latar belakang daerah Anda sebagai kekuatan.', isCompleted: false },
  { id: 'c7', stage: 'Tahap 3: Esai & Berkas Narasi', title: '2 Surat Rekomendasi (Akademik & Profesional)', desc: 'Surat bertanda tangan dari dosen pembimbing skripsi atau atasan kerja dengan kop surat resmi.', isCompleted: false },
  { id: 'c8', stage: 'Tahap 3: Esai & Berkas Narasi', title: 'Proposal Riset (Khusus Pelamar S2 Riset / S3 Doktor)', desc: 'Rencana topik riset 1.500 kata yang menjawab isu riil di Indonesia.', isCompleted: false },

  // Tahap 4: Submission & Wawancara
  { id: 'c9', stage: 'Tahap 4: Submission & Wawancara', title: 'Pendaftaran Akun Portal Resmi Beasiswa Target', desc: 'Isi formulir online secara teliti sebelum mendekati batas deadline.', isCompleted: false },
  { id: 'c10', stage: 'Tahap 4: Submission & Wawancara', title: 'Latihan Simulasi Wawancara (Mock Interview)', desc: 'Latihan menjawab pertanyaan jebakan komite beasiswa bersama alumni.', isCompleted: false },

  // Tahap 5: Visa & Pra-Keberangkatan
  { id: 'c11', stage: 'Tahap 5: Visa & Pra-Keberangkatan', title: 'Memperoleh LoA (Letter of Acceptance) Unconditional', desc: 'Surat penerimaan resmi tanpa syarat dari universitas tujuan.', isCompleted: false },
  { id: 'c12', stage: 'Tahap 5: Visa & Pra-Keberangkatan', title: 'Pengurusan Visa Pelajar & Asuransi Internasional', desc: 'Pengajuan berkas visa ke VFS / Kedutaan besar negara tujuan.', isCompleted: false },
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onOpenBooking }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('mandalika_student_checklist');
      return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
    } catch {
      return INITIAL_CHECKLIST;
    }
  });

  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; date: string }>>([
    { name: 'Transkrip_Nilai_S1_Terjemahan.pdf', size: '1.4 MB', date: '12 Maret 2026' },
    { name: 'Curriculum_Vitae_ATS_Draft1.pdf', size: '420 KB', date: '18 Maret 2026' },
  ]);

  const [simulatedUploadName, setSimulatedUploadName] = useState('');

  const toggleItem = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setChecklist(updated);
    try {
      localStorage.setItem('mandalika_student_checklist', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedUploadName.trim()) return;
    const newFile = {
      name: simulatedUploadName.endsWith('.pdf') ? simulatedUploadName : `${simulatedUploadName}.pdf`,
      size: '850 KB',
      date: 'Hari ini'
    };
    setUploadedFiles([newFile, ...uploadedFiles]);
    setSimulatedUploadName('');
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx));
  };

  const completedCount = checklist.filter((i) => i.isCompleted).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // Group by stages
  const stages = Array.from(new Set(checklist.map((i) => i.stage)));

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                Portal Mandiri & Tracking Persiapan
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Roadmap & Dashboard Persiapan Siswa
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Pantau setiap tahapan persiapan beasiswa dan aplikasi kuliah luar negeri Anda agar tidak ada berkas penting yang terlewat.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2 shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Jadwalkan Sesi Mentor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Kelengkapan Berkas & Kesiapan Aplikasi</span>
                <span className="tabular-nums font-bold text-slate-900">{completedCount} dari {checklist.length} Tugas Selesai ({progressPercent}%)</span>
              </div>
              
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-900 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-xs text-slate-500">
                {progressPercent < 40 
                  ? 'Fokus utama Anda saat ini adalah mengamankan paspor, terjemahan tersumpah, dan CV standar internasional.'
                  : progressPercent < 80 
                  ? 'Kesiapan Anda sudah cukup matang! Segera selesaikan draf Motivation Letter untuk direview oleh mentor.'
                  : 'Luar biasa! Berkas Anda hampir 100% siap untuk disubmit ke portal universitas & beasiswa target!'}
              </p>
            </div>

            <div className="md:col-span-4 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-700" />
                <span>Status Pendampingan</span>
              </div>
              <div className="text-slate-600">
                Belum terhubung ke mentor bimbingan resmi?
              </div>
              <button
                onClick={onOpenBooking}
                className="text-slate-900 font-bold hover:underline flex items-center gap-1 pt-1"
              >
                Klaim Konsultasi Discovery Gratis (20 Mnt)
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* 2-Column Layout: Checklist (8 cols) vs Upload Zone & Resources (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checklist Column */}
          <div className="lg:col-span-8 space-y-6">
            {stages.map((stageName) => {
              const stageItems = checklist.filter((i) => i.stage === stageName);
              const stageCompleted = stageItems.filter((i) => i.isCompleted).length;

              return (
                <div key={stageName} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <h3 className="text-sm font-bold text-slate-900">
                      {stageName}
                    </h3>
                    <span className="text-xs text-slate-500 tabular-nums font-medium">
                      {stageCompleted} / {stageItems.length} Selesai
                    </span>
                  </div>

                  <div className="space-y-3">
                    {stageItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                          item.isCompleted
                            ? 'bg-slate-50/80 border-slate-200 text-slate-500'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40 text-slate-900'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-slate-900 shrink-0"
                          aria-label={item.isCompleted ? 'Mark incomplete' : 'Mark completed'}
                        >
                          {item.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-slate-900" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className={`text-xs font-bold ${item.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {item.title}
                          </div>
                          <p className={`text-[11px] mt-0.5 leading-relaxed ${item.isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Upload Simulator & Resources */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Upload Mockup Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-slate-700" />
                <span>Simpan & Verifikasi Berkas Anda</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Unggah draf CV, Motivation Letter, atau transkrip untuk persiapan review mentor MandalikaEdu.
              </p>

              {/* Upload Input Form */}
              <form onSubmit={handleSimulatedUpload} className="mb-4 space-y-2">
                <input
                  type="text"
                  value={simulatedUploadName}
                  onChange={(e) => setSimulatedUploadName(e.target.value)}
                  placeholder="Nama berkas (mis: Esai_Chevening_V1)"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Simpan Berkas ke Akun</span>
                </button>
              </form>

              {/* List of uploaded files */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Berkas Tersimpan ({uploadedFiles.length}):
                </div>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between gap-2 text-xs border border-slate-100">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                      <div className="truncate">
                        <div className="font-semibold text-slate-800 truncate">{file.name}</div>
                        <div className="text-[10px] text-slate-400">{file.size} · {file.date}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      title="Hapus berkas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Downloads */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Bonus Siswa MandalikaEdu
              </span>
              <h4 className="text-base font-bold">
                Template Resmi Dokumen Aplikasi
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unduh template CV ATS internasional, draf surat rekomendasi dosen, dan format Motivation Letter teruji.
              </p>
              <div className="pt-2 space-y-2">
                {[
                  'Template Europass & ATS CV (.docx)',
                  'Draft Letter of Recommendation (.docx)',
                  'Checklist Verifikasi Visa Pelajar (.pdf)'
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs text-slate-200 py-1.5 border-b border-white/10">
                    <span className="truncate pr-2">{item}</span>
                    <button 
                      onClick={() => alert(`Mengunduh ${item}... Berkas sampel template siap digunakan.`)}
                      className="text-slate-300 hover:text-white p-1"
                      title="Unduh template"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
