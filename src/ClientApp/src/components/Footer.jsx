import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Col 1: Brand & ISO */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded bg-[#DD9C37] text-white flex items-center justify-center font-bold text-lg">
                R
              </div>
              <span className="font-extrabold text-xl text-white tracking-wider">
                RIDGE<span className="text-[#DD9C37]">HOMES</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ridge Homes is an ISO 9001:2015 certified real estate organization dedicated to conscious living, traditional wisdom, and exceptional sustainable master planning in Hyderabad.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs">
              <Award className="w-4 h-4" />
              <span>ISO 9001:2015 Certified Organization</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#DD9C37] pl-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#DD9C37] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-[#DD9C37] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#DD9C37] transition-colors">All Projects</Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#DD9C37] transition-colors">Latest News & Blogs</Link>
              </li>
              <li>
                <Link to="/contactus" className="hover:text-[#DD9C37] transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#DD9C37] transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Projects */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#DD9C37] pl-2">
              Featured Ventures
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/projects/kshetra" className="hover:text-[#DD9C37] transition-colors flex items-center justify-between">
                  <span>Kshetra, Shankarpally</span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded">Ongoing</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/tranquilvalley" className="hover:text-[#DD9C37] transition-colors flex items-center justify-between">
                  <span>Tranquil Valley, Maheshwaram</span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded">Ongoing</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/sunrisecity" className="hover:text-[#DD9C37] transition-colors flex items-center justify-between">
                  <span>Sunrise City, Sultanpur</span>
                  <span className="text-[10px] bg-blue-900 text-blue-300 px-1.5 py-0.5 rounded">Delivered</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/springcity" className="hover:text-[#DD9C37] transition-colors flex items-center justify-between">
                  <span>Spring City, Hyderabad</span>
                  <span className="text-[10px] bg-blue-900 text-blue-300 px-1.5 py-0.5 rounded">Delivered</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#DD9C37] pl-2">
              Corporate Office
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DD9C37] mt-1 shrink-0" />
                <span>Trendz JP, 3rd Floor, Chhota Anjaiah Nagar, Gachibowli, Hyderabad, Telangana 500032</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DD9C37] shrink-0" />
                <a href="tel:9000888152" className="hover:text-[#DD9C37]">+91 9000888152</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DD9C37] shrink-0" />
                <a href="mailto:info@ridgehomes.in" className="hover:text-[#DD9C37]">info@ridgehomes.in</a>
              </div>

              {/* Social SVGs */}
              <div className="pt-2 flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#DD9C37] hover:text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#DD9C37] hover:text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#DD9C37] hover:text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#DD9C37] hover:text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} RIDGE HOMES LLP. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>DTCP & HMDA Approved Ventures</span>
            <span>TS RERA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
