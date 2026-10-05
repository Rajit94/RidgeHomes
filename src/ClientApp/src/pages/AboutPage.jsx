import React, { useEffect, useState } from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { getTeamMembers } from '../services/api';

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    getTeamMembers().then(data => setTeam(data));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Ridge Homes Corporate"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            About Ridge Homes
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Building Homes for Conscious Living
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A culmination of people with an acquired passion for sustainable environments, traditional values, and uncompromised quality.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY & PHILOSOPHY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="border-l-4 border-[#DD9C37] pl-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
                Learning & Growth Begins at Home
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Ridge is a culmination of people with an acquired passion for conscious living. We believe learning and growth begins at home. A home that is designed to uphold traditions and age-old practices is one that will stand the test of time.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              A recurring theme at Ridge is the creation of ideal living environments that honour the knowledge of our forefathers. Recently, the growth of consumerism and city life has taken its toll on family upbringing. When we started Ridge, we aimed to bring families together in more ways than one. All our projects are focused on the rejuvenation of our customers. With an appreciation for nature, art and culture, Ridge is on a path to revolutionizing living spaces.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <Award className="w-8 h-8 text-[#DD9C37]" />
                <div>
                  <div className="text-xs font-bold text-gray-900">ISO 9001:2015</div>
                  <div className="text-[11px] text-gray-500">Quality Certified</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-gray-900">RERA Approved</div>
                  <div className="text-[11px] text-gray-500">100% Legal Scrutiny</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
              alt="Ridge Living"
              className="rounded-3xl shadow-2xl object-cover h-[450px] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs hidden sm:block">
              <div className="text-3xl font-extrabold text-[#DD9C37]">30+</div>
              <div className="text-xs text-gray-600 font-medium mt-1">
                Years of combined leadership experience in real estate excellence.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEET OUR TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-wider">
            Leadership & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
            Meet Our Leadership Team
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            The passionate minds shaping conscious communities and safeguarding investor trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-all"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#DD9C37] tracking-wider uppercase">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">
                    {member.name}
                  </h3>
                  <p className={`text-xs text-gray-600 mt-2 leading-relaxed ${
                    expandedId === member.id ? '' : 'line-clamp-3'
                  }`}>
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(member.id)}
                    className="text-xs font-bold text-[#DD9C37] hover:underline"
                  >
                    {expandedId === member.id ? 'Show Less' : 'Read Full Bio →'}
                  </button>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
