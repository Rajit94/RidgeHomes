import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getBlogs } from '../services/api';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(data => setBlogs(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-widest">
          Knowledge & Press
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Latest News & Ridge Blogs
        </h1>
        <p className="text-gray-600 text-sm">
          Stay informed on real estate trends in Hyderabad, RERA legal insights, and progress updates from Ridge Homes ventures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((b) => (
          <article
            key={b.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={b.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}
                alt={b.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#DD9C37]" />
                    {new Date(b.publishedDate).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    Ridge Editorial
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg hover:text-[#DD9C37] transition-colors leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {b.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <Link to={`/blogs/${b.slug}`} className="text-xs font-bold text-[#DD9C37] hover:underline cursor-pointer inline-flex items-center gap-1">
                  <span>Continue Reading</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
