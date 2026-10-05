import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { submitInquiry } from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || 'General contact inquiry from website.',
        projectName: 'General Contact',
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
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Ridge Homes
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Whether you want to schedule a private site visit, review RERA documents, or explore plot pricing, our team is at your service.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="border-l-4 border-[#DD9C37] pl-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Office Information
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                Headquarters in Gachibowli
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#DD9C37] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Corporate Office</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    Trendz JP, 3rd Floor, Chhota Anjaiah Nagar, Gachibowli, Hyderabad, Telangana 500032
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#DD9C37] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Direct Hotline</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    <a href="tel:9000888152" className="hover:text-[#DD9C37] font-semibold">+91 9000888152</a> (General Inquiries)
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    <a href="tel:7775857777" className="hover:text-[#DD9C37] font-semibold">+91 7775857777</a> (Kshetra Sales Desk)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#DD9C37] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Email Us</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    <a href="mailto:info@ridgehomes.in" className="hover:text-[#DD9C37]">info@ridgehomes.in</a>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    <a href="mailto:kshetra@ridgehomes.in" className="hover:text-[#DD9C37]">kshetra@ridgehomes.in</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#DD9C37] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Working Hours</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Monday – Sunday: 9:00 AM – 7:30 PM (Site visits conducted 7 days a week)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900">Message Delivered!</h3>
                <p className="text-gray-600 text-sm max-w-sm mx-auto">
                  Thank you for reaching out to Ridge Homes. Our executive has received your inquiry and will contact you directly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#DD9C37] text-white rounded-lg font-semibold text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Site Visit Now</h3>
                <p className="text-xs text-gray-500 mb-6">
                  Please submit your details below to schedule an on-site consultation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                    <textarea
                      rows="4"
                      placeholder="Tell us what project or plot size you are interested in..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#DD9C37]"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="contact-consent" className="text-[11px] text-gray-500">
                      I authorise Ridge Homes to contact me. Overrides DND/NDNC.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-xl shadow-md transition-all text-sm mt-2"
                  >
                    {submitting ? 'Submitting...' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.312953282245!2d78.3615!3d17.4445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc65555555%3A0x123456789!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1668416729799"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Ridge Homes Office Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
