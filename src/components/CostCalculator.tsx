import React, { useState, useMemo } from 'react';
import { 
  Calculator, DollarSign, Wallet, ArrowRight, ShieldCheck, 
  HelpCircle, Sparkles, TrendingDown, Clock, Home, Utensils, Bus, HeartPulse 
} from 'lucide-react';
import { COUNTRIES_DATA, CountryDetail } from '../data/countries';

interface CostCalculatorProps {
  onOpenBooking: () => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onOpenBooking }) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('jerman');
  const [studyLevel, setStudyLevel] = useState<'S1' | 'S2'>('S2');
  const [lifestyle, setLifestyle] = useState<'hemat' | 'standar' | 'nyaman'>('hemat');
  const [fundingMode, setFundingMode] = useState<'mandiri' | 'partial' | 'fully_funded'>('mandiri');
  const [partTimeHours, setPartTimeHours] = useState<number>(15);

  const country = useMemo(() => {
    return COUNTRIES_DATA.find(c => c.id === selectedCountryId) || COUNTRIES_DATA[0];
  }, [selectedCountryId]);

  // Calculations
  const calculation = useMemo(() => {
    // Base monthly living costs in local currency
    let baseMonthlyLocal = 0;
    let rent = 0;
    let food = 0;
    let transport = 0;
    let insurance = 0;
    let annualTuitionIdr = 0;
    let hourlyWageLocal = 0;

    switch (country.id) {
      case 'jepang':
        hourlyWageLocal = 1150; // JPY
        annualTuitionIdr = 56000000; // ~56jt
        if (lifestyle === 'hemat') { rent = 40000; food = 30000; transport = 7000; insurance = 2000; }
        else if (lifestyle === 'standar') { rent = 55000; food = 40000; transport = 10000; insurance = 2000; }
        else { rent = 75000; food = 55000; transport = 12000; insurance = 2000; }
        break;
      case 'jerman':
        hourlyWageLocal = 14; // EUR
        annualTuitionIdr = 0; // FREE tuition
        if (lifestyle === 'hemat') { rent = 350; food = 200; transport = 40; insurance = 125; }
        else if (lifestyle === 'standar') { rent = 450; food = 260; transport = 50; insurance = 125; }
        else { rent = 650; food = 350; transport = 60; insurance = 125; }
        break;
      case 'inggris':
        hourlyWageLocal = 11.5; // GBP
        annualTuitionIdr = studyLevel === 'S2' ? 320000000 : 280000000;
        if (lifestyle === 'hemat') { rent = 550; food = 200; transport = 60; insurance = 50; }
        else if (lifestyle === 'standar') { rent = 750; food = 280; transport = 90; insurance = 50; }
        else { rent = 1100; food = 380; transport = 130; insurance = 50; }
        break;
      case 'australia':
        hourlyWageLocal = 25; // AUD
        annualTuitionIdr = 340000000;
        if (lifestyle === 'hemat') { rent = 900; food = 400; transport = 100; insurance = 55; }
        else if (lifestyle === 'standar') { rent = 1250; food = 500; transport = 140; insurance = 55; }
        else { rent = 1600; food = 700; transport = 180; insurance = 55; }
        break;
      case 'turki':
        hourlyWageLocal = 150; // TRY
        annualTuitionIdr = 12000000; // ~12jt
        if (lifestyle === 'hemat') { rent = 2000; food = 2000; transport = 300; insurance = 300; }
        else if (lifestyle === 'standar') { rent = 3500; food = 2800; transport = 450; insurance = 300; }
        else { rent = 5500; food = 4000; transport = 600; insurance = 300; }
        break;
      case 'korea-selatan':
        hourlyWageLocal = 9860; // KRW
        annualTuitionIdr = 65000000;
        if (lifestyle === 'hemat') { rent = 350000; food = 300000; transport = 55000; insurance = 70000; }
        else if (lifestyle === 'standar') { rent = 480000; food = 400000; transport = 70000; insurance = 70000; }
        else { rent = 650000; food = 550000; transport = 90000; insurance = 70000; }
        break;
      case 'belanda':
      default:
        hourlyWageLocal = 13; // EUR
        annualTuitionIdr = 220000000;
        if (lifestyle === 'hemat') { rent = 500; food = 250; transport = 40; insurance = 60; }
        else if (lifestyle === 'standar') { rent = 700; food = 320; transport = 60; insurance = 60; }
        else { rent = 950; food = 420; transport = 80; insurance = 60; }
        break;
    }

    baseMonthlyLocal = rent + food + transport + insurance;
    const monthlyLivingIdr = baseMonthlyLocal * country.currencyRateIdr;

    // Part-time monthly earning (4.3 weeks per month)
    const monthlyEarningLocal = partTimeHours * 4.3 * hourlyWageLocal;
    const monthlyEarningIdr = monthlyEarningLocal * country.currencyRateIdr;

    // Apply funding mode
    let effectiveAnnualTuitionIdr = annualTuitionIdr;
    let effectiveMonthlyLivingIdr = monthlyLivingIdr;

    if (fundingMode === 'partial') {
      effectiveAnnualTuitionIdr = annualTuitionIdr * 0.5; // 50% waiver
    } else if (fundingMode === 'fully_funded') {
      effectiveAnnualTuitionIdr = 0;
      effectiveMonthlyLivingIdr = 0; // Covered by stipend
    }

    // Net personal outflow after part-time offset
    const netMonthlyExpenseIdr = Math.max(0, effectiveMonthlyLivingIdr - (fundingMode === 'fully_funded' ? 0 : monthlyEarningIdr));
    const annualTotalExpenseIdr = effectiveAnnualTuitionIdr + (netMonthlyExpenseIdr * 12);

    return {
      currency: country.currency,
      rate: country.currencyRateIdr,
      rent,
      food,
      transport,
      insurance,
      baseMonthlyLocal,
      monthlyLivingIdr,
      hourlyWageLocal,
      monthlyEarningLocal,
      monthlyEarningIdr,
      effectiveAnnualTuitionIdr,
      effectiveMonthlyLivingIdr,
      netMonthlyExpenseIdr,
      annualTotalExpenseIdr
    };
  }, [country, studyLevel, lifestyle, fundingMode, partTimeHours]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4 text-slate-700" />
            <span>Transparansi Perkiraan Biaya Riil</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Kalkulator Biaya Kuliah & Hidup Luar Negeri
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Hitung estimasi pengeluaran per bulan dan per tahun secara akurat. Simulasikan penghematan dari beasiswa penuh, beasiswa parsial, hingga potensi pemasukan kerja paruh waktu resmi mahasiswa.
          </p>
        </div>

        {/* 2-Column Split: Controls vs Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* 1. Pilih Negara */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                1. Pilih Negara Tujuan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {COUNTRIES_DATA.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCountryId(c.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCountryId === c.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xl mb-1">{c.flag}</div>
                    <div className="text-xs font-bold truncate">{c.name}</div>
                    <div className={`text-[10px] ${selectedCountryId === c.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {c.currency}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Jenjang & Gaya Hidup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Jenjang Studi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStudyLevel('S1')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      studyLevel === 'S1'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    S1 (3-4 Tahun)
                  </button>
                  <button
                    onClick={() => setStudyLevel('S2')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      studyLevel === 'S2'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    S2 (1-2 Tahun)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  3. Gaya Hidup & Akomodasi
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'hemat', label: 'Hemat / Asrama' },
                    { id: 'standar', label: 'Standar' },
                    { id: 'nyaman', label: 'Studio Pribadi' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLifestyle(item.id as any)}
                      className={`py-2 px-1 text-[11px] font-medium rounded-lg border text-center truncate transition-colors ${
                        lifestyle === item.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Skenario Pembiayaan */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                4. Skenario Pembiayaan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'mandiri', label: 'Biaya Mandiri 100%', sub: 'Tanpa beasiswa' },
                  { id: 'partial', label: 'Beasiswa Parsial', sub: 'Potongan SPP 50%' },
                  { id: 'fully_funded', label: 'Fully Funded (MEXT/DAAD)', sub: 'Gratis total + Uang saku' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setFundingMode(mode.id as any)}
                    className={`p-3 rounded-xl border text-left transition-colors ${
                      fundingMode === mode.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{mode.label}</div>
                    <div className={`text-[10px] ${fundingMode === mode.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {mode.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Simulasi Kerja Paruh Waktu (Part-time student job) */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  5. Rencana Kerja Paruh Waktu Resmi
                </label>
                <span className="text-xs font-bold text-slate-900 tabular-nums">
                  {partTimeHours} Jam / Minggu
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="28"
                step="2"
                value={partTimeHours}
                onChange={(e) => setPartTimeHours(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>0 Jam (Fokus Belajar)</span>
                <span>15 Jam (Rekomendasi)</span>
                <span>28 Jam (Batas Legal Jepang)</span>
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Aturan Kerja Resmi {country.name}:</strong> {country.partTimeWorkRules.allowedHours}. Potensi upah rata-rata: {country.partTimeWorkRules.hourlyWage}.
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Calculation Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Ringkasan Simulasi Finansial
              </div>

              {/* Total Clean Output */}
              <div className="py-4 border-b border-white/10">
                <span className="text-xs text-slate-300 block mb-1">
                  Total Estimasi Beban Mandiri per Tahun
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums text-white">
                  {fundingMode === 'fully_funded' ? (
                    <span>Rp 0 <span className="text-xs font-normal text-slate-300">(100% Ditanggung Beasiswa)</span></span>
                  ) : (
                    `Rp ${(calculation.annualTotalExpenseIdr / 1000000).toFixed(1)} Juta`
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {fundingMode === 'fully_funded' 
                    ? 'Termasuk tunjangan living allowance bulanan dari sponsor' 
                    : `Atau sekitar Rp ${(calculation.netMonthlyExpenseIdr / 1000000).toFixed(1)} Juta / bulan setelah offset part-time`}
                </div>
              </div>

              {/* Breakdown List */}
              <div className="py-5 space-y-3 text-xs border-b border-white/10">
                <div className="font-semibold text-slate-300 mb-1">
                  Rincian Biaya Hidup Bulanan ({country.name}):
                </div>
                
                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center gap-2">
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sewa Tempat Tinggal / Asrama</span>
                  </div>
                  <span className="tabular-nums font-medium">
                    {calculation.rent.toLocaleString()} {country.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-3.5 h-3.5 text-slate-400" />
                    <span>Makan & Kebutuhan Harian</span>
                  </div>
                  <span className="tabular-nums font-medium">
                    {calculation.food.toLocaleString()} {country.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-3.5 h-3.5 text-slate-400" />
                    <span>Asuransi Kesehatan Mahasiswa</span>
                  </div>
                  <span className="tabular-nums font-medium">
                    {calculation.insurance.toLocaleString()} {country.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center gap-2">
                    <Bus className="w-3.5 h-3.5 text-slate-400" />
                    <span>Transportasi Lokal</span>
                  </div>
                  <span className="tabular-nums font-medium">
                    {calculation.transport.toLocaleString()} {country.currency}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-white font-bold">
                  <span>Subtotal Living Cost Bulanan:</span>
                  <span className="tabular-nums">
                    {calculation.baseMonthlyLocal.toLocaleString()} {country.currency} (~Rp {(calculation.monthlyLivingIdr / 1000000).toFixed(1)} Jt)
                  </span>
                </div>
              </div>

              {/* Offset from part-time work */}
              {partTimeHours > 0 && fundingMode !== 'fully_funded' && (
                <div className="py-4 border-b border-white/10 text-xs">
                  <div className="flex items-center justify-between text-slate-200 mb-1">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                      Penghasilan Part-time ({partTimeHours} jam/mgg):
                    </span>
                    <span className="tabular-nums text-emerald-400 font-bold">
                      - Rp {(calculation.monthlyEarningIdr / 1000000).toFixed(1)} Jt / bln
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Bisa menutupi hingga {Math.min(100, Math.round((calculation.monthlyEarningIdr / calculation.monthlyLivingIdr) * 100))}% biaya hidup bulanan Anda!
                  </p>
                </div>
              )}

              {/* Action */}
              <div className="pt-5 space-y-3">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 active:scale-95 transition-all text-center"
                >
                  Konsultasikan Simulasi Biaya Ini
                </button>
                <div className="text-[11px] text-slate-400 text-center">
                  Kurs: 1 {country.currency.split(' ')[0]} ≈ Rp {country.currencyRateIdr.toLocaleString()}
                </div>
              </div>

            </div>

            {/* Quick Fact Callout */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-700" />
                <span>Tips Penghematan untuk Anak Daerah:</span>
              </div>
              <p className="leading-relaxed">
                {country.regionalStudentFriendly}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
