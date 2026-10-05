import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Download, CheckCircle, ChevronLeft, ChevronRight, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';
import { getProjectBySlug, submitInquiry } from '../services/api';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    getProjectBySlug(slug).then(data => {
      setProject(data);
      setFormData(prev => ({
        ...prev,
        message: `I would like to book a site visit for ${data?.title || 'this project'}.`
      }));
    });
  }, [slug]);

  if (!project) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#DD9C37] border-t-transparent"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading venture details...</p>
      </div>
    );
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        projectName: project.title,
        pageUrl: window.location.href,
        consentGiven: formData.consent
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const amenities = project.amenities || [];

  const handleNextAmenity = () => {
    if (amenities.length > 0) {
      setActiveAmenityIndex((prev) => (prev + 1) % amenities.length);
    }
  };

  const handlePrevAmenity = () => {
    if (amenities.length > 0) {
      setActiveAmenityIndex((prev) => (prev - 1 + amenities.length) % amenities.length);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. PROJECT HERO BANNER */}
      <section className="relative h-[400px] sm:h-[480px] flex items-end bg-gray-950 overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-10 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-[#DD9C37] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {project.status} Venture
            </span>
            <span className="bg-black/70 backdrop-blur-sm text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">
              RERA: {project.reraNumber}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {project.approvalNumber}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
            <MapPin className="w-4 h-4 text-[#DD9C37]" />
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Story (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border-l-4 border-[#DD9C37] pl-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Project Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {project.tagline}
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed text-base">
              {project.description}
            </p>

            {project.detailedStory && (
              <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-100 space-y-3">
                <h3 className="font-bold text-gray-900 text-lg">Word to the Wise</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {project.detailedStory}
                </p>
              </div>
            )}

            {/* Download Brochure Button */}
            <div className="pt-2">
              <a
                href={project.brochureUrl || '#'}
                download
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gray-900 hover:bg-[#DD9C37] text-white font-bold rounded-xl shadow-md transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Brochure (PDF)</span>
              </a>
            </div>
          </div>

          {/* Quick Specifications Card (Col 3) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6 self-start">
            <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
              Venture Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-400 block text-[11px] uppercase font-bold">Venture Status</span>
                <span className="font-bold text-emerald-600">{project.status}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] uppercase font-bold">Category</span>
                <span className="font-semibold text-gray-800">{project.category}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] uppercase font-bold">RERA Registration</span>
                <span className="font-mono font-bold text-gray-900">{project.reraNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] uppercase font-bold">Government Approval</span>
                <span className="font-semibold text-gray-800">{project.approvalNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] uppercase font-bold">Location</span>
                <span className="font-semibold text-gray-800">{project.location}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <a
                href="#book-visit"
                className="block text-center w-full py-2.5 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-lg text-sm transition-all"
              >
                Schedule Site Visit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AREA DIVISION METRICS CARDS (MATCHING RIDGE HOMES) */}
      {project.stats && project.stats.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
              Land Masterplan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Area Division & Statistics
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {project.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm hover:border-[#DD9C37] transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#DD9C37]">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-gray-600 mt-1.5 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. DEVELOPMENTS & AMENITIES PHOTO CAROUSEL */}
      {amenities.length > 0 && (
        <section className="bg-gray-50 py-16 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
                  Site Progress & Features
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  On-Ground Developments
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevAmenity}
                  className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-[#DD9C37] hover:text-white transition-all shadow-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextAmenity}
                  className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-[#DD9C37] hover:text-white transition-all shadow-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.slice(activeAmenityIndex, activeAmenityIndex + 3).concat(
                amenities.slice(0, Math.max(0, activeAmenityIndex + 3 - amenities.length))
              ).map((amenity, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={amenity.imageUrl}
                      alt={amenity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 font-bold text-sm text-gray-900 text-center">
                    {amenity.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. LOCATION HIGHLIGHTS & MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Highlights List */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
                Strategic Connectivity
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                Location Highlights
              </h2>
            </div>

            <ul className="space-y-3">
              {(project.locationHighlights || []).map((h, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-[#DD9C37] flex items-center justify-center shrink-0 font-bold text-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-800 font-medium">{h.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[380px] bg-gray-100">
            {project.googleMapsEmbedUrl ? (
              <iframe
                src={project.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={`${project.title} location`}
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                Map location coordinates available on request.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. BOOK SITE VISIT EMBEDDED FORM */}
      <section id="book-visit" className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Direct Developer Booking
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Book Your Site Visit for {project.title}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Fill out the form to schedule a weekend site tour. Our sales representative will arrange private pick-and-drop or coordinate on-site reception with complete layout blueprints.
              </p>

              <div className="space-y-3 pt-4 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#DD9C37]" />
                  <span>Direct Hotline: +91 9000888152</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#DD9C37]" />
                  <span>Inquiries: info@ridgehomes.in</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-900 shadow-xl">
              {submitSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold">Request Received!</h4>
                  <p className="text-xs text-gray-600">
                    Thank you. We have received your booking request for {project.title}. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-4 py-2 bg-[#DD9C37] text-white text-xs font-bold rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="email@address.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="page-consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="page-consent" className="text-[11px] text-gray-500">
                      I authorize Ridge Homes to contact me regarding {project.title}. Overrides DND.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-lg shadow-md transition-all"
                  >
                    {submitting ? 'Submitting...' : 'Send Message & Book Visit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
