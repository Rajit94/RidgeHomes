import React from 'react';
import { Award, ShieldCheck, CheckCircle2, FileText, Building2, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IsoCertifiedPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Award className="w-4 h-4" />
            <span>International Quality Standard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ISO 9001:2015 Certified Organization
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ridge Homes is proudly ISO 9001:2015 certified, affirming our dedication to world-class engineering processes, transparent land documentation, and lasting customer peace of mind.
          </p>
        </div>
      </section>

      {/* Main Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#DD9C37] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Rigorous Quality Management</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              ISO 9001:2015 represents international consensus on sound management practices. At Ridge Homes, our quality systems govern every stage: from land title verification and soil testing to civil execution and handover.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">100% Legal & RERA Compliance</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every layout is planned in accordance with HMDA/DTCP standards and backed by TS RERA registration. Certified title verification ensures clear ownership and peaceful possession for generations.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Superior Infrastructure</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Cement concrete (CC) and 40ft blacktop roads, underground electricity and drainage, LED street illumination, and grand arch entrances built with precision-graded materials.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Ecological Sustainability</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Rainwater harvesting percolation pits, lush central parks, traditional avenue plantation, and organic eco-ponds integrated into the master layout design.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-xl shadow-md transition-all text-sm"
          >
            <span>Explore ISO Certified Ventures</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
