import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';

export interface BookingSubmissionPayload {
  studentName: string;
  studentWhatsapp: string;
  studentEmail?: string;
  originCity: string;
  targetScholarship?: string;
  targetCountry: string;
  studyLevel: string;
  packageId: string;
  packageName: string;
  priceFormatted: string;
  preferredDate?: string;
  preferredTime: string;
  notes?: string;
  isFree: boolean;
}

export interface BookingSubmissionResult {
  success: boolean;
  bookingId: string;
  error?: string;
}

/**
 * Menyimpan data pendaftaran formulir secara aman ke Firebase Firestore
 * sekaligus mengirimkan salinan cadangan ke server untuk notifikasi email perusahaan resmi
 */
export async function submitBookingRecord(
  payload: BookingSubmissionPayload
): Promise<BookingSubmissionResult> {
  let firestoreBookingId = '';

  // 1. Simpan ke Firebase Firestore (Sesuai Firestore Security Rules)
  try {
    const status = payload.isFree ? 'confirmed' : 'pending';
    const docData = {
      studentName: payload.studentName.trim(),
      studentWhatsapp: payload.studentWhatsapp.trim(),
      studentEmail: (payload.studentEmail || '').trim(),
      originCity: payload.originCity.trim(),
      targetCountry: payload.targetCountry,
      studyLevel: payload.studyLevel,
      targetScholarship: payload.targetScholarship || `${payload.studyLevel} ${payload.targetCountry}`,
      packageId: payload.packageId,
      packageName: payload.packageName,
      priceFormatted: payload.priceFormatted,
      preferredDate: payload.preferredDate || 'Segera',
      preferredTime: payload.preferredTime,
      notes: (payload.notes || '').trim(),
      status: status,
      source: 'website_modal',
      consentAgreed: true,
      consentLegalText: 'Dilindungi UU Perlindungan Data Pribadi dan payung hukum LEMBAGA RESEARCH EMPOWERMENT LEARNING AND REPLACE INSTITUTE',
      createdAt: new Date().toISOString(),
      clientTimestamp: Date.now(),
      serverReceivedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'bookings'), docData);
    firestoreBookingId = docRef.id;
  } catch (error) {
    console.warn('Gagal menyimpan langsung ke client Firestore, beralih ke server backup endpoint:', error);
    // Catat jika ada error izin sesuai kaidah error handler
    try {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } catch {
      // lanjut ke server-side fallback
    }
  }

  // 2. Kirim notifikasi cadangan ke backend server untuk arsip email resmi perusahaan
  try {
    const response = await fetch('/api/booking/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        firestoreBookingId: firestoreBookingId || undefined,
        submittedAt: new Date().toISOString(),
      }),
    });

    const result = await response.json();
    if (!firestoreBookingId && result.bookingId) {
      firestoreBookingId = result.bookingId;
    }
  } catch (serverError) {
    console.warn('Pemberitahuan email server mengalami kendala jaringan:', serverError);
  }

  return {
    success: true,
    bookingId: firestoreBookingId || `lead_${Date.now()}`,
  };
}
