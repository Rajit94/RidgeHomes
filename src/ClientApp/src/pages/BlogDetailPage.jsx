import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Award, CheckCircle } from 'lucide-react';
import { getBlogBySlug, getBlogs } from '../services/api';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    getBlogBySlug(slug).then(data => setBlog(data));
    getBlogs().then(data => setRecentBlogs(data));
  }, [slug]);

  if (!blog) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#DD9C37] border-t-transparent"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#DD9C37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All News & Blogs</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#DD9C37]" />
            {new Date(blog.publishedDate).toLocaleDateString('en-IN', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium">
            <User className="w-3.5 h-3.5 text-gray-400" />
            {blog.author || 'Ridge Homes Editorial'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {blog.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed border-l-4 border-[#DD9C37] pl-4 italic">
          {blog.excerpt}
        </p>
      </div>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg h-[340px] sm:h-[440px]">
        <img
          src={blog.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}
          alt={blog.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg font-normal">
        <p>{blog.content}</p>

        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <Award className="w-5 h-5 text-[#DD9C37]" />
            <span>Ridge Homes Quality Commitment</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            All ventures developed by Ridge Homes conform to strict TS RERA guidelines and institutional quality governance under our ISO 9001:2015 certification.
          </p>
        </div>
      </div>

      {/* Related News */}
      <div className="pt-12 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">More Articles from Ridge Homes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBlogs.filter(b => b.slug !== slug).slice(0, 3).map(b => (
            <Link
              key={b.id}
              to={`/blogs/${b.slug}`}
              className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md p-4 transition-all block"
            >
              <h4 className="font-bold text-sm text-gray-900 line-clamp-2 hover:text-[#DD9C37]">
                {b.title}
              </h4>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {b.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
