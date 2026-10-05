import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User } from 'lucide-react';
import { submitInquiry } from '../services/api';

export default function SiteVisitModal({ isOpen, onClose, projectName = "General" }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I would like to schedule a site visit for ${projectName}.`,
    consent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        projectName: projectName,
        pageUrl: window.location.href,
        consentGiven: formData.consent,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Site Visit Booked!</h3>
            <p className="text-gray-600 text-sm max-w-sm mx-auto">
              Thank you for choosing Ridge Homes. Our dedicated relationship manager for <strong>{projectName}</strong> will call you within 15 minutes to confirm the timing and transportation.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-[#DD9C37] text-white rounded-lg font-semibold text-sm hover:bg-[#c9892c] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
                Exclusive Experience
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                Book Your Site Visit Now
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Experience the location, amenities, and layout of <strong>{projectName}</strong> in person.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37] focus:ring-1 focus:ring-[#DD9C37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37] focus:ring-1 focus:ring-[#DD9C37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37] focus:ring-1 focus:ring-[#DD9C37]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Requirements / Preferred Date</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD9C37] focus:ring-1 focus:ring-[#DD9C37]"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 rounded text-[#DD9C37] focus:ring-[#DD9C37]"
                />
                <label htmlFor="consent" className="text-[11px] text-gray-500 leading-tight">
                  I authorise Ridge Homes to contact me via Call/WhatsApp. Overrides national DND/NDNC registry.
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                {submitting ? 'Submitting...' : 'Confirm Site Visit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
