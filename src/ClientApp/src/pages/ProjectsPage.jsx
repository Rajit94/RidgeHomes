import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { getProjects } from '../services/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All'); // All, Ongoing, Completed

  useEffect(() => {
    getProjects().then(data => setProjects(data));
  }, []);

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-widest">
          Portfolio of Excellence
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Our Ventures
        </h1>
        <p className="text-gray-600 text-sm">
          Discover our ongoing thematic communities and successfully handed-over residential layouts across Hyderabad.
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 pt-4">
          {['All', 'Ongoing', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-[#DD9C37] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab} Projects
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={p.thumbnailImage || p.heroImage}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow ${
                  p.status === 'Ongoing' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {p.status}
                </span>
                <span className="bg-black/70 backdrop-blur-sm text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                  RERA: {p.reraNumber}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DD9C37]" />
                  <span>{p.location}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#DD9C37] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">{p.approvalNumber}</span>
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#DD9C37] hover:underline"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
