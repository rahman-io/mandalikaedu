import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Award, Briefcase, GraduationCap, 
  Upload, ShieldCheck, ArrowRight, Clock, Globe, FileText, Phone 
} from 'lucide-react';
import { getActiveWhatsAppNumber } from '../config/contact';

interface MentorRecruitmentSectionProps {
  onOpenBookingWithMentor?: (mentorName: string) => void;
}

export const MentorRecruitmentSection: React.FC<MentorRecruitmentSectionProps> = ({ 
  onOpenBookingWithMentor 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    originCity: '',
    university: '',
    country: '',
    major: '',
    level: 'S2',
    scholarship: '',
    yearStatus: '',
    skills: [] as string[],
    hoursPerWeek: '3-5 jam/minggu',
    linkedinOrIg: '',
    motivation: '',
    proofFileName: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableSkills = [
    'Review Esai & Motivation Letter',
    'Persiapan IELTS / TOEFL',
    'Simulasi Wawancara (Mock Interview)',
    'Bimbingan Visa Pelajar & Finansial',
    'Adaptasi Budaya & Survival di Negara Tujuan',
    'Proposal Riset & Korespondensi Profesor'
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const waText = encodeURIComponent(
    `Halo Tim MandalikaEdu, saya ingin mendaftar sebagai Mentor:\n\n` +
    `• Nama: ${formData.fullName}\n` +
    `• Asal: ${formData.originCity}\n` +
    `• Kampus & Negara: ${formData.university} (${formData.country})\n` +
    `• Jenjang & Jurusan: ${formData.level} - ${formData.major}\n` +
    `• Beasiswa: ${formData.scholarship || 'Mandiri / Jalur Lain'}\n` +
    `• Keahlian Bimbingan: ${formData.skills.join(', ')}\n` +
    `• Ketersediaan: ${formData.hoursPerWeek}\n` +
    `• Profil: ${formData.linkedinOrIg}\n\n` +
    `Mohon informasi tahap review berkas & wawancara singkat. Terima kasih!`
  );

  const waUrl = `https://wa.me/${getActiveWhatsAppNumber()}?text=${waText}`;

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 flex items-center justify-center gap-1.5">
            <Users className="w-4 h-4 text-slate-700" />
            <span>Kemitraan & Rekrutmen Mentor MandalikaEdu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Bergabung Jadi Mentor: Bimbing Talenta Daerah ke Kampus Dunia
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Apakah Anda mahasiswa aktif atau alumni Indonesia di luar negeri? Mari perluas akses pendidikan tinggi dunia bagi adik-adik di daerah dengan skema kerja sama fleksibel dan transparan.
          </p>
        </div>

        {/* 3 Manfaat & Skema Kemitraan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Skema Bagi Hasil / Fee per Sesi
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mentor dibayar transparan per sesi bimbingan 1-on-1 atau melalui sistem bagi hasil dari paket bimbingan yang ditangani sesuai perjanjian kemitraan resmi.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Jadwal Fleksibel (Part-time)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Atur waktu luang Anda sendiri (2–5 jam/minggu). Seluruh bimbingan berjalan 100% daring melalui Google Meet / Zoom tanpa mengganggu perkuliahan atau riset Anda.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Dampak Riil untuk Anak Daerah
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Profil dan kredensial Anda akan tampil di website resmi, membantu calon mahasiswa daerah memilih mentor yang relevan dengan negara dan jurusan impiannya.
            </p>
          </div>
        </div>

        {/* Alur Seleksi Mentor */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
            Alur Seleksi & Onboarding Mentor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Langkah 1</span>
              <strong>Pengisian Formulir & Berkas</strong>
              <p className="text-slate-500">Isi data akademik, beasiswa yang diraih, dan upload bukti status studi (LoA/Ijazah/KTM).</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Langkah 2</span>
              <strong>Review Berkas & Wawancara</strong>
              <p className="text-slate-500">Pemeriksaan keaslian kredensial dan diskusi singkat 15 menit via daring mengenai gaya komunikasi.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Langkah 3</span>
              <strong>Simulasi Review Esai</strong>
              <p className="text-slate-500">Uji coba memberi catatan konstruktif pada contoh draf esai pelamar untuk memastikan kualitas bimbingan.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Langkah 4</span>
              <strong>PKS & Profil Tayang</strong>
              <p className="text-slate-500">Tandatangan perjanjian kemitraan tertulis (SLA, kerahasiaan data siswa) lalu profil resmi tampil di web.</p>
            </div>
          </div>
        </div>

        {/* Formulir Pendaftaran */}
        <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl mx-auto p-8 sm:p-10 shadow-sm">
          {!isSubmitted ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Formulir Pendaftaran Mentor Baru
                </h2>
                <p className="text-xs text-slate-500">
                  Lengkapi data di bawah ini. Tim MandalikaEdu akan menghubungi Anda dalam 2-3 hari kerja.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                
                {/* Data Pribadi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Lengkap & Gelar *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Contoh: Ahmad Fauzi, M.Sc."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Alamat Email Aktif *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="emailanda@universitas.ac.id"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Kota Asal di Indonesia *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.originCity}
                      onChange={e => setFormData({ ...formData, originCity: e.target.value })}
                      placeholder="Contoh: Lombok Timur / Kupang / Makassar"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                {/* Data Pendidikan & Kampus Luar Negeri */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Universitas Luar Negeri *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.university}
                      onChange={e => setFormData({ ...formData, university: e.target.value })}
                      placeholder="Contoh: The University of Tokyo / TU Munich"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Negara Tempat Studi *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Contoh: Jepang / Jerman / UK / Australia"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Jenjang Studi
                    </label>
                    <select
                      value={formData.level}
                      onChange={e => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="S1">S1 (Bachelor)</option>
                      <option value="S2">S2 (Master)</option>
                      <option value="S3">S3 (Ph.D / Doktor)</option>
                      <option value="Postdoc">Postdoctoral / Riset</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Jurusan / Bidang Studi *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.major}
                      onChange={e => setFormData({ ...formData, major: e.target.value })}
                      placeholder="Contoh: Mechanical Engineering"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tahun Masuk / Lulus *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.yearStatus}
                      onChange={e => setFormData({ ...formData, yearStatus: e.target.value })}
                      placeholder="Contoh: Masuk 2024 / Lulus 2025"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Beasiswa yang Pernah Diraih (jika ada)
                  </label>
                  <input
                    type="text"
                    value={formData.scholarship}
                    onChange={e => setFormData({ ...formData, scholarship: e.target.value })}
                    placeholder="Contoh: MEXT Monbukagakusho / DAAD EPOS / AAS / Chevening / Mandiri"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Bidang yang Bisa Dibimbing */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block font-semibold text-slate-700 mb-2">
                    Bidang yang Siap Anda Bimbing (Pilih yang relevan):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableSkills.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                          className="rounded text-slate-900 focus:ring-slate-900"
                        />
                        <span className="text-slate-700 text-xs">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ketersediaan Jam & Link Profil */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Ketersediaan Waktu per Minggu
                    </label>
                    <select
                      value={formData.hoursPerWeek}
                      onChange={e => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="1-2 jam/minggu">1-2 jam / minggu (Sangat ringan)</option>
                      <option value="3-5 jam/minggu">3-5 jam / minggu (Standar)</option>
                      <option value="6-10 jam/minggu">6-10 jam / minggu (Intensif)</option>
                      <option value="Weekend only">Hanya Sabtu & Minggu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tautan LinkedIn atau Instagram *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.linkedinOrIg}
                      onChange={e => setFormData({ ...formData, linkedinOrIg: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                {/* Motivasi & Bukti Studi */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Motivasi Bergabung dengan MandalikaEdu
                  </label>
                  <textarea
                    rows={2}
                    value={formData.motivation}
                    onChange={e => setFormData({ ...formData, motivation: e.target.value })}
                    placeholder="Ceritakan mengapa Anda ingin mendampingi calon mahasiswa dari daerah..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bukti Studi (Kartu Mahasiswa / LoA / Ijazah) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={formData.proofFileName}
                      onChange={e => setFormData({ ...formData, proofFileName: e.target.value })}
                      placeholder="Nama berkas (mis: LoA_Todai_Ilham.pdf atau link Google Drive)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Sesuai Bab 8: Identitas & bukti studi diverifikasi ketat sebelum profil tayang.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-sm cursor-pointer mt-4"
                >
                  Kirim Pendaftaran Mentor
                </button>
              </form>
            </div>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Pendaftaran Mentor Diterima!
              </h2>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Terima kasih <strong>{formData.fullName}</strong> atas kepedulian Anda untuk ikut memajukan adik-adik daerah. Formulir pendaftaran mentor Anda untuk bimbingan negara <strong>{formData.country}</strong> telah tersimpan.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1 text-slate-700">
                <div>· <strong>Kampus:</strong> {formData.university}</div>
                <div>· <strong>Keahlian:</strong> {formData.skills.join(', ') || 'Umum'}</div>
                <div>· <strong>Ketersediaan:</strong> {formData.hoursPerWeek}</div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Kirim Notifikasi Pendaftaran ke WhatsApp Tim MandalikaEdu</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold"
                >
                  Daftarkan Mentor Lain / Edit Data
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
