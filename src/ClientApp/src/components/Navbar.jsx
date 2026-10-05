import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, ChevronDown, Menu, X, Award } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top Contact Bar */}
      <div className="bg-[#111827] text-gray-300 text-xs py-2 px-4 sm:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a href="tel:9000888152" className="flex items-center gap-1.5 hover:text-[#DD9C37] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#DD9C37]" />
              <span>+91 9000888152</span>
            </a>
            <a href="mailto:info@ridgehomes.in" className="flex items-center gap-1.5 hover:text-[#DD9C37] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#DD9C37]" />
              <span>info@ridgehomes.in</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-amber-400 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>ISO 9001:2015 Certified Real Estate Developer</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            R
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-wider text-gray-900 block leading-tight">
              RIDGE<span className="text-[#DD9C37]">HOMES</span>
            </span>
            <span className="text-[10px] tracking-widest text-gray-500 uppercase block font-semibold">
              Inspiring Conscious Living
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-7 font-medium text-sm text-gray-700">
          <Link
            to="/"
            className={`transition-colors hover:text-[#DD9C37] ${isActive('/') ? 'text-[#DD9C37] font-semibold' : ''}`}
          >
            Home
          </Link>

          {/* Projects Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProjectsDropdown(true)}
            onMouseLeave={() => setProjectsDropdown(false)}
          >
            <button
              className="flex items-center gap-1 transition-colors hover:text-[#DD9C37] py-2"
              onClick={() => setProjectsDropdown(!projectsDropdown)}
            >
              <span>Projects</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {projectsDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 animate-fadeIn">
                <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Ongoing Projects
                </div>
                <Link
                  to="/projects/kshetra"
                  className="block px-4 py-2 hover:bg-amber-50 hover:text-[#DD9C37] transition-colors"
                >
                  <div className="font-semibold text-gray-900">Kshetra</div>
                  <div className="text-xs text-gray-500">Shankarpally • DTCP & RERA Approved</div>
                </Link>
                <Link
                  to="/projects/tranquilvalley"
                  className="block px-4 py-2 hover:bg-amber-50 hover:text-[#DD9C37] transition-colors"
                >
                  <div className="font-semibold text-gray-900">Tranquil Valley</div>
                  <div className="text-xs text-gray-500">Maheshwaram • HMDA Approved</div>
                </Link>

                <div className="border-t border-gray-100 my-2"></div>

                <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Completed Projects
                </div>
                <Link
                  to="/projects/sunrisecity"
                  className="block px-4 py-2 hover:bg-amber-50 hover:text-[#DD9C37] transition-colors"
                >
                  <div className="font-semibold text-gray-900">Sunrise City</div>
                  <div className="text-xs text-gray-500">Sultanpur • Delivered</div>
                </Link>
                <Link
                  to="/projects/springcity"
                  className="block px-4 py-2 hover:bg-amber-50 hover:text-[#DD9C37] transition-colors"
                >
                  <div className="font-semibold text-gray-900">Spring City</div>
                  <div className="text-xs text-gray-500">West Corridor • Delivered</div>
                </Link>

                <div className="border-t border-gray-100 my-2"></div>
                <Link
                  to="/projects"
                  className="block px-4 py-1.5 text-xs font-semibold text-[#DD9C37] hover:underline"
                >
                  View All Projects →
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about-us"
            className={`transition-colors hover:text-[#DD9C37] ${isActive('/about-us') ? 'text-[#DD9C37] font-semibold' : ''}`}
          >
            About Us
          </Link>

          <Link
            to="/blogs"
            className={`transition-colors hover:text-[#DD9C37] ${isActive('/blogs') ? 'text-[#DD9C37] font-semibold' : ''}`}
          >
            Blogs
          </Link>

          <Link
            to="/careers"
            className={`transition-colors hover:text-[#DD9C37] ${isActive('/careers') ? 'text-[#DD9C37] font-semibold' : ''}`}
          >
            Careers
          </Link>

          <Link
            to="/contactus"
            className={`transition-colors hover:text-[#DD9C37] ${isActive('/contactus') ? 'text-[#DD9C37] font-semibold' : ''}`}
          >
            Contact Us
          </Link>

          <Link
            to="/admin"
            className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Admin Panel
          </Link>
        </nav>

        {/* Right CTA Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/iso-certified"
            className="border border-amber-300 bg-amber-50 px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-amber-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold text-amber-800">ISO 9001:2015</span>
          </Link>

          <Link
            to="/contactus"
            className="bg-[#DD9C37] hover:bg-[#c9892c] text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            Book Site Visit
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium py-1"
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium py-1"
          >
            All Projects
          </Link>
          <Link
            to="/projects/kshetra"
            onClick={() => setMobileMenuOpen(false)}
            className="block pl-4 text-sm text-gray-600 py-1"
          >
            • Kshetra (Shankarpally)
          </Link>
          <Link
            to="/projects/tranquilvalley"
            onClick={() => setMobileMenuOpen(false)}
            className="block pl-4 text-sm text-gray-600 py-1"
          >
            • Tranquil Valley (Maheshwaram)
          </Link>
          <Link
            to="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium py-1"
          >
            About Us
          </Link>
          <Link
            to="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium py-1"
          >
            Blogs & News
          </Link>
          <Link
            to="/contactus"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium py-1"
          >
            Contact Us
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-amber-700 font-medium py-1"
          >
            Admin Leads Portal
          </Link>
        </div>
      )}
    </header>
  );
}
