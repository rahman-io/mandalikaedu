import { SCHOLARSHIPS_DATA } from '../../data/scholarships';
import { PACKAGES_DATA } from '../../data/packages';
import { TESTIMONIALS_DATA } from '../../data/testimonials';
import { COUNTRIES_DATA } from '../../data/countries';
import { BLOG_POSTS_DATA } from '../../data/blogPosts';
import {
  FirebaseExportBundle,
  FirestoreScholarshipDoc,
  FirestorePackageDoc,
  FirestoreMentorDoc,
  FirestoreTestimonialDoc,
  FirestoreCountryDoc,
  FirestoreBlogPostDoc,
  MentorDoc
} from './types';

export const MENTORS_DATA: MentorDoc[] = [
  {
    id: 'dr-ilham-ramdani',
    name: 'Dr. Ilham Ramdani, Ph.D.',
    role: 'Co-Founder & Head Academic Mentor',
    origin: 'Lombok, Nusa Tenggara Barat',
    education: 'Ph.D. in Engineering, The University of Tokyo, Jepang',
    scholarship: 'Penerima MEXT Monbukagakusho Scholarship (2018 - 2023)',
    bio: 'Menyelesaikan S1 di kampus regional Mataram sebelum menembus beasiswa MEXT ke Todai. Telah membimbing lebih dari 120 mahasiswa daerah meraih beasiswa Asia dan Eropa.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-28T00:00:00.000Z'
  },
  {
    id: 'nadia-salsabila',
    name: 'Nadia Salsabila, M.Sc.',
    role: 'Lead Mentor Eropa & Jerman',
    origin: 'Padang, Sumatera Barat',
    education: 'M.Sc. Sustainable Engineering, RWTH Aachen University, Jerman',
    scholarship: 'Penerima DAAD EPOS Scholarship',
    bio: 'Spesialis penyusunan Europass CV dan Motivation Letter berstandar institusi Jerman. Membantu pelamar daerah menyiasati blocked account dan visa pelajar.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-28T00:00:00.000Z'
  },
  {
    id: 'kevin-jonathan',
    name: 'Kevin Jonathan, M.P.P.',
    role: 'Lead Mentor UK & Beasiswa Kepemimpinan',
    origin: 'Kupang, Nusa Tenggara Timur',
    education: 'Master of Public Policy, University of Oxford (Blavatnik School)',
    scholarship: 'Penerima Chevening Scholarship UK',
    bio: 'Berpengalaman melatih pelamar daerah menyusun 4 esai Chevening berbasis pengalaman kepemimpinan riil di masyarakat tanpa gaya bahasa klise.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-28T00:00:00.000Z'
  },
  {
    id: 'ratih-puspadewi',
    name: 'Ratih Puspadewi, S.Pd., M.Ed.',
    role: 'Language & IELTS Strategist',
    origin: 'Purwokerto, Jawa Tengah',
    education: 'Master of Education, The University of Melbourne, Australia',
    scholarship: 'Penerima Australia Awards Scholarships (AAS)',
    bio: 'Meraih skor IELTS Band 8.5 melalui metode belajar mandiri 90 hari. Mengembangkan kurikulum persiapan tes bahasa yang realistis dan terjangkau untuk anak daerah.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-28T00:00:00.000Z'
  }
];

/**
 * Builds the complete structured Firestore export bundle.
 */
export function generateFirebaseExportBundle(): FirebaseExportBundle {
  const now = new Date().toISOString();

  const scholarshipsRecord: Record<string, FirestoreScholarshipDoc> = {};
  SCHOLARSHIPS_DATA.forEach((item) => {
    scholarshipsRecord[item.id] = {
      ...item,
      _collection: 'scholarships',
      _firestorePath: `scholarships/${item.id}`,
      _migratedAt: now
    };
  });

  const packagesRecord: Record<string, FirestorePackageDoc> = {};
  PACKAGES_DATA.forEach((item) => {
    packagesRecord[item.id] = {
      ...item,
      _collection: 'packages',
      _firestorePath: `packages/${item.id}`,
      _migratedAt: now
    };
  });

  const mentorsRecord: Record<string, FirestoreMentorDoc> = {};
  MENTORS_DATA.forEach((item) => {
    mentorsRecord[item.id] = {
      ...item,
      _collection: 'mentors',
      _firestorePath: `mentors/${item.id}`,
      _migratedAt: now
    };
  });

  const testimonialsRecord: Record<string, FirestoreTestimonialDoc> = {};
  TESTIMONIALS_DATA.forEach((item) => {
    testimonialsRecord[item.id] = {
      ...item,
      _collection: 'testimonials',
      _firestorePath: `testimonials/${item.id}`,
      _migratedAt: now
    };
  });

  const countriesRecord: Record<string, FirestoreCountryDoc> = {};
  COUNTRIES_DATA.forEach((item) => {
    countriesRecord[item.id] = {
      ...item,
      _collection: 'countries',
      _firestorePath: `countries/${item.id}`,
      _migratedAt: now
    };
  });

  const blogPostsRecord: Record<string, FirestoreBlogPostDoc> = {};
  BLOG_POSTS_DATA.forEach((item) => {
    blogPostsRecord[item.id] = {
      ...item,
      _collection: 'blogPosts',
      _firestorePath: `blogPosts/${item.id}`,
      _migratedAt: now
    };
  });

  const breakdown = {
    scholarships: Object.keys(scholarshipsRecord).length,
    packages: Object.keys(packagesRecord).length,
    mentors: Object.keys(mentorsRecord).length,
    testimonials: Object.keys(testimonialsRecord).length,
    countries: Object.keys(countriesRecord).length,
    blogPosts: Object.keys(blogPostsRecord).length
  };

  const totalDocuments = Object.values(breakdown).reduce((acc, curr) => acc + curr, 0);

  return {
    version: '1.0.0',
    format: 'firestore-json-v1',
    exportedAt: now,
    source: 'MandalikaEdu Platform Single Source of Truth',
    description: 'Format data Firestore siap migrasi untuk seluruh entitas database MandalikaEdu',
    summary: {
      totalCollections: Object.keys(breakdown).length,
      totalDocuments,
      breakdown
    },
    collections: {
      scholarships: scholarshipsRecord,
      packages: packagesRecord,
      mentors: mentorsRecord,
      testimonials: testimonialsRecord,
      countries: countriesRecord,
      blogPosts: blogPostsRecord
    }
  };
}

/**
 * Triggers a browser download of the formatted Firebase JSON bundle.
 */
export function downloadFirebaseExport(): void {
  const bundle = generateFirebaseExportBundle();
  const jsonStr = JSON.stringify(bundle, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `mandalikaedu-firestore-export-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
