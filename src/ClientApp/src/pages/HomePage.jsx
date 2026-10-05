import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MapPin, CheckCircle, Award, Compass, Trees, Building2 } from 'lucide-react';
import { getProjects, getBlogs } from '../services/api';
import SiteVisitModal from '../components/SiteVisitModal';

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedProjectForVisit, setSelectedProjectForVisit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProjects().then(data => setProjects(data));
    getBlogs().then(data => setBlogs(data));
  }, []);

  const ongoingProjects = projects.filter(p => p.status === 'Ongoing');
  const completedProjects = projects.filter(p => p.status === 'Completed');

  const openVisitModal = (projectName) => {
    setSelectedProjectForVisit(projectName);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt="Ridge Homes Shankarpally"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 scale-105 animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center text-white space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Award className="w-4 h-4" />
            <span>ISO 9001:2015 Certified • DTCP & HMDA Approved Layouts</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            An Inspiration for Ridge. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#DD9C37] to-amber-200">
              Conscious Living in Hyderabad
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Discover premier villa plots and thematic nature communities in Shankarpally, Maheshwaram, and West Hyderabad. Where ancient wisdom meets modern infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openVisitModal('Ridge Homes Projects')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Book Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* 2. ONGOING VENTURES (KSHETRA & TRANQUIL VALLEY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#DD9C37] font-bold text-xs uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>Signature Developments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Ongoing Projects
            </h2>
            <p className="text-gray-600 text-sm mt-1 max-w-xl">
              Carefully designed open plots and villa lands crafted with 100% legal verification and premium infrastructure.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-sm font-bold text-[#DD9C37] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ongoingProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={project.thumbnailImage || project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {project.status}
                  </span>
                  <span className="bg-black/70 backdrop-blur-sm text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                    RERA: {project.reraNumber}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-gray-800">
                  {project.approvalNumber}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#DD9C37]" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#DD9C37] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#DD9C37] hover:text-[#b37c28]"
                  >
                    <span>Read More Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openVisitModal(project.title)}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-[#DD9C37] transition-colors"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DELIVERED / COMPLETED PROJECTS */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
              Proven Track Record
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Delivered & Completed Ventures
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Communities successfully delivered with clear titles, full approvals, and thriving resident investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {completedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto">
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Completed & Handed Over
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {project.location}
                    </p>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500 flex items-center justify-between">
                    <span>RERA: {project.reraNumber}</span>
                    <Link to={`/projects/${project.slug}`} className="text-[#DD9C37] hover:underline">
                      Overview →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE RIDGE HOMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
            Our Hallmarks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
            Why Invest With Ridge Homes?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Upholding traditional ethos with institutional transparency and engineering precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-amber-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#DD9C37] flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">ISO 9001:2015 Certified</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Internationally recognized quality management standards across layout development, execution, and customer service.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-amber-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">100% Clear Title & RERA</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every venture is strictly approved by DTCP / HMDA and backed by registered TS RERA certificates for total safety.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-amber-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Trees className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Conscious Living</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Themed eco-ponds, traditional Mandua architecture, organic plantations, and extensive central parks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-amber-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Growth Corridors</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Strategically placed near Regional Ring Road (RRR), Financial District, Shamshabad Airport, and Neopolis.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LATEST NEWS & BLOGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
              Updates & Insights
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Latest News & Ridge Blogs
            </h2>
          </div>
          <Link to="/blogs" className="text-sm font-bold text-[#DD9C37] hover:underline flex items-center gap-1">
            <span>Read All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <article key={b.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <img
                src={b.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}
                alt={b.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                }}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-2 hover:text-[#DD9C37] transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link to={`/blogs/${b.slug}`} className="text-xs font-bold text-[#DD9C37] hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-amber-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-md bg-[#DD9C37] text-white font-bold text-xs uppercase tracking-wider">
              Start Your Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Ready to visit Kshetra or Tranquil Valley?
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Book a free private chauffeur-driven site visit with our senior property consultant. Experience the plots, RERA documentation, and amenities first-hand.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => openVisitModal('Ridge Homes VIP Site Visit')}
                className="px-6 py-3 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Schedule Private Site Visit
              </button>
              <a
                href="tel:9000888152"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all"
              >
                Call: +91 9000888152
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Site Visit Modal */}
      <SiteVisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={selectedProjectForVisit}
      />
    </div>
  );
}
