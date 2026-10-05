import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitInquiry } from '../services/api';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Sales Manager - Luxury Plots & Villas',
    location: 'Gachibowli, Hyderabad',
    type: 'Full-time',
    experience: '5-8 Years',
    description: 'Lead high-value residential plot sales for our Shankarpally and Maheshwaram flagship communities. Strong client relationship skills required.'
  },
  {
    id: 2,
    title: 'Civil Site Execution Engineer',
    location: 'Shankarpally / Maheshwaram Sites',
    type: 'Full-time',
    experience: '3-6 Years',
    description: 'Supervise quality execution of CC roads, drainage networks, entrance arches, and park landscaping conforming to ISO 9001:2015 standards.'
  },
  {
    id: 3,
    title: 'Legal Associate - Real Estate & RERA',
    location: 'Corporate Office, Hyderabad',
    type: 'Full-time',
    experience: '2-4 Years',
    description: 'Assist in title search verification, HMDA/DTCP drafting, and regulatory RERA compliance under the Head of Legal.'
  },
  {
    id: 4,
    title: 'Customer Relations Executive',
    location: 'Gachibowli, Hyderabad',
    type: 'Full-time',
    experience: '1-3 Years',
    description: 'Coordinate customer site visits, handle inquiries, prepare allotment documentation, and support after-sales customer satisfaction.'
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', experience: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Career Application for [${selectedJob?.title}]. Experience: ${formData.experience}. Note: ${formData.note}`,
        projectName: 'Careers Application',
        pageUrl: window.location.href,
        consentGiven: true
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Careers at Ridge Homes
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Build your professional future with an organization that values integrity, innovation, and conscious community development.
          </p>
        </div>
      </section>

      {/* Openings Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="border-l-4 border-[#DD9C37] pl-4">
          <h2 className="text-2xl font-bold text-gray-900">Current Opportunities</h2>
          <p className="text-xs text-gray-500 mt-1">We are hiring across departments for our expanding project pipeline.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOpenings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  {job.type} • {job.experience}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DD9C37]" />
                  <span>{job.location}</span>
                </div>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setSubmitted(false);
                  }}
                  className="w-full py-2.5 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Apply for this Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
                <p className="text-xs text-gray-600">
                  Thank you for applying for <strong>{selectedJob.title}</strong>. Our HR team will review your application and contact you if shortlisted.
                </p>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="mt-4 px-5 py-2 bg-[#DD9C37] text-white text-xs font-bold rounded-lg"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-[#DD9C37] uppercase">Ridge Careers</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">Apply: {selectedJob.title}</h3>

                <form onSubmit={handleApply} className="space-y-3 mt-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Mobile"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Total Experience (Years)</label>
                    <input
                      type="text"
                      placeholder="e.g. 4 Years"
                      value={formData.experience}
                      onChange={e => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Brief Introduction / LinkedIn Profile</label>
                    <textarea
                      rows="3"
                      placeholder="Share a short bio or link to your resume/LinkedIn..."
                      value={formData.note}
                      onChange={e => setFormData({ ...formData, note: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-lg text-xs shadow-md mt-2"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
