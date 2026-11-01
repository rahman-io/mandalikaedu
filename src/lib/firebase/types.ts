import { Scholarship } from '../../data/scholarships';
import { ServicePackage } from '../../data/packages';
import { Testimonial } from '../../data/testimonials';
import { CountryDetail } from '../../data/countries';
import { BlogPost } from '../../data/blogPosts';

export interface MentorDoc {
  id: string;
  name: string;
  role: string;
  origin: string;
  education: string;
  scholarship: string;
  bio: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FirestoreScholarshipDoc extends Scholarship {
  _collection: 'scholarships';
  _firestorePath: string;
  _migratedAt: string;
}

export interface FirestorePackageDoc extends ServicePackage {
  _collection: 'packages';
  _firestorePath: string;
  _migratedAt: string;
}

export interface FirestoreMentorDoc extends MentorDoc {
  _collection: 'mentors';
  _firestorePath: string;
  _migratedAt: string;
}

export interface FirestoreTestimonialDoc extends Testimonial {
  _collection: 'testimonials';
  _firestorePath: string;
  _migratedAt: string;
}

export interface FirestoreCountryDoc extends CountryDetail {
  _collection: 'countries';
  _firestorePath: string;
  _migratedAt: string;
}

export interface FirestoreBlogPostDoc extends BlogPost {
  _collection: 'blogPosts';
  _firestorePath: string;
  _migratedAt: string;
}

export interface FirebaseExportBundle {
  version: string;
  format: 'firestore-json-v1';
  exportedAt: string;
  source: string;
  description: string;
  summary: {
    totalCollections: number;
    totalDocuments: number;
    breakdown: Record<string, number>;
  };
  collections: {
    scholarships: Record<string, FirestoreScholarshipDoc>;
    packages: Record<string, FirestorePackageDoc>;
    mentors: Record<string, FirestoreMentorDoc>;
    testimonials: Record<string, FirestoreTestimonialDoc>;
    countries: Record<string, FirestoreCountryDoc>;
    blogPosts: Record<string, FirestoreBlogPostDoc>;
  };
}
