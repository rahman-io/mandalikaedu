import React, { useState } from 'react';
import { BLOG_POSTS_DATA, BlogPost } from '../data/blogPosts';
import { 
  BookOpen, Calendar, Clock, User, ArrowRight, 
  Smartphone, Share2, Sparkles, ChevronLeft, ChevronRight, X 
} from 'lucide-react';

interface BlogSectionProps {
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [carouselPreviewPost, setCarouselPreviewPost] = useState<BlogPost | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const categories = ['all', 'Tips Esai', 'Edukasi', 'Info Deadline', 'Strategi Bahasa'];

  const filteredPosts = BLOG_POSTS_DATA.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const openCarousel = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselPreviewPost(post);
    setCurrentSlideIndex(0);
  };

  return (
    <div className="py-16 bg-eduvance-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Matching Insights & Ideas from Eduvance) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3 shadow-2xs">
            Blog & Edukasi Mandiri
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            <span className="text-indigo-600">Insights</span> & Ide Beasiswa Dari <span className="text-indigo-600">MandalikaEdu</span>
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Artikel panduan mendalam seputar penulisan esai, strategi menembus IELTS tanpa les mahal, serta sistem konten edukasi Instagram MandalikaEdu.
          </p>

          {/* Categories in Rounded-Full Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {cat === 'all' ? 'Semua Topik' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="bg-slate-50 rounded-3xl border border-slate-200/90 hover:border-slate-400/80 p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group"
            >
              <div>
                {/* Meta unboxed */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-slate-800">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200 text-xs">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {post.author.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{post.author.name}</div>
                    <div className="text-[11px] text-slate-500">{post.author.credentials}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Baca Panduan <ArrowRight className="w-3.5 h-3.5" />
                </span>

                {/* Content Repurposing Feature: View Instagram Carousel */}
                <button
                  onClick={(e) => openCarousel(post, e)}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
                  title="Lihat Format Carousel Instagram"
                >
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Format Carousel IG</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL 1: Full Article Reading View */}
      {readingPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10">
            <button
              onClick={() => setReadingPost(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
              <span className="font-semibold text-slate-800">{readingPost.category}</span>
              <span aria-hidden="true">·</span>
              <span>{readingPost.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{readingPost.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              {readingPost.title}
            </h1>

            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6 text-xs">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {readingPost.author.name[0]}
              </div>
              <div>
                <div className="font-bold text-slate-900">{readingPost.author.name}</div>
                <div className="text-slate-500">{readingPost.author.role} ({readingPost.author.credentials})</div>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {readingPost.content.map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* In-article conversion block */}
            <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <strong className="text-slate-900 block font-semibold text-sm mb-0.5">
                  Ingin review esai atau berkas pribadi Anda?
                </strong>
                Dapatkan feedback langsung dari mentor alumni universitas terkemuka dunia.
              </div>
              <button
                onClick={() => {
                  setReadingPost(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm shrink-0"
              >
                Konsultasi Gratis
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Instagram Carousel Interactive Preview (Section 6 PDF) */}
      {carouselPreviewPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative">
            
            <button
              onClick={() => setCarouselPreviewPost(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              <Smartphone className="w-4 h-4 text-slate-300" />
              <span>Simulasi Content Repurposing (Slide Instagram)</span>
            </div>

            {/* Instagram Slide Frame */}
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 min-h-[380px] flex flex-col justify-between shadow-inner relative">
              
              {/* Slide Header */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                <span className="font-bold tracking-tight text-slate-900">@mandalika.edu</span>
                <span className="tabular-nums font-bold text-slate-400">
                  {currentSlideIndex + 1} / {carouselPreviewPost.instagramCarousel.length}
                </span>
              </div>

              {/* Slide Content */}
              <div className="py-6 space-y-4">
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {carouselPreviewPost.instagramCarousel[currentSlideIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {carouselPreviewPost.instagramCarousel[currentSlideIndex].body}
                </p>
              </div>

              {/* Slide Bottom Takeaway */}
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-900 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                {carouselPreviewPost.instagramCarousel[currentSlideIndex].takeaway}
              </div>

            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
                className={`p-2 rounded-full border transition-colors ${
                  currentSlideIndex === 0 
                    ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
                    : 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slide dots */}
              <div className="flex items-center gap-1.5">
                {carouselPreviewPost.instagramCarousel.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlideIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlideIndex(Math.min(carouselPreviewPost.instagramCarousel.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === carouselPreviewPost.instagramCarousel.length - 1}
                className={`p-2 rounded-full border transition-colors ${
                  currentSlideIndex === carouselPreviewPost.instagramCarousel.length - 1
                    ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
                    : 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-4">
              Konsep Bab 6: 1 data/artikel blog diubah menjadi format carousel Instagram, konten edukasi, dan direct lead link in bio.
            </p>

          </div>
        </div>
      )}

    </div>
  );
};
