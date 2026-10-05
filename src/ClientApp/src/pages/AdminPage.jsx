import React, { useEffect, useState } from 'react';
import { Users, Phone, Mail, Clock, CheckCircle2, RefreshCw, Building2, Plus, Trash2, MapPin } from 'lucide-react';
import { getInquiries, updateInquiryStatus, getProjects, createProject, deleteProject } from '../services/api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'properties'

  // Leads State
  const [inquiries, setInquiries] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  // Projects State
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    slug: '',
    tagline: '',
    category: 'Villas & Plots',
    status: 'Ongoing',
    location: '',
    reraNumber: '',
    approvalNumber: '',
    description: '',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  });
  const [savingProject, setSavingProject] = useState(false);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    const data = await getInquiries();
    setInquiries(data);
    setLeadsLoading(false);
  };

  const fetchProjects = async () => {
    setProjectsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setProjectsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
    fetchProjects();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateInquiryStatus(id, newStatus);
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setSavingProject(true);
    try {
      const generatedSlug = newProject.slug || newProject.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const created = await createProject({
        ...newProject,
        slug: generatedSlug
      });
      setProjects([created, ...projects]);
      setShowAddProjectModal(false);
      setNewProject({
        title: '',
        slug: '',
        tagline: '',
        category: 'Villas & Plots',
        status: 'Ongoing',
        location: '',
        reraNumber: '',
        approvalNumber: '',
        description: '',
        heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      });
    } catch (err) {
      alert('Failed to save project. Ensure slug is unique.');
    } finally {
      setSavingProject(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter(i => i.status === 'New').length;
  const contactedLeads = inquiries.filter(i => i.status === 'Contacted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-bold text-[#DD9C37] uppercase tracking-widest">
            Internal Operations Portal
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
            Ridge Homes Admin Control
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage live leads and project inventory routed through <strong>YARP Gateway (Port 5000)</strong>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'leads' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Leads & Inquiries ({totalLeads})
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'properties' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Manage Projects ({projects.length})
          </button>
        </div>
      </div>

      {/* ================= TAB 1: LEADS ================= */}
      {activeTab === 'leads' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#DD9C37] flex items-center justify-center font-bold text-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{totalLeads}</div>
                <div className="text-xs text-gray-500 font-medium">Total Inquiries Received</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{newLeads}</div>
                <div className="text-xs text-gray-500 font-medium">New / Action Required</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{contactedLeads}</div>
                <div className="text-xs text-gray-500 font-medium">Followed Up / Contacted</div>
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 font-bold text-sm text-gray-800 flex justify-between items-center">
              <span>Customer Leads Record</span>
              <button
                onClick={fetchLeads}
                className="inline-flex items-center gap-1.5 text-xs text-[#DD9C37] hover:underline"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${leadsLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Leads</span>
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">
                No inquiries recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5">Customer</th>
                      <th className="px-6 py-3.5">Contact Details</th>
                      <th className="px-6 py-3.5">Venture Requested</th>
                      <th className="px-6 py-3.5">Message / Requirement</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{inq.name}</td>
                        <td className="px-6 py-4 space-y-1">
                          <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <a href={`tel:${inq.phone}`} className="hover:text-[#DD9C37]">{inq.phone}</a>
                          </div>
                          {inq.email && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <a href={`mailto:${inq.email}`} className="hover:text-[#DD9C37]">{inq.email}</a>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                            {inq.projectName || 'General'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-600 max-w-xs truncate">{inq.message || '-'}</td>
                        <td className="px-6 py-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${
                              inq.status === 'New'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : inq.status === 'Contacted'
                                ? 'bg-blue-50 text-blue-700 border-blue-300'
                                : 'bg-gray-100 text-gray-700 border-gray-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: PROJECTS CRUD ================= */}
      {activeTab === 'properties' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Current Ventures Database</h3>
              <p className="text-xs text-gray-500">Live projects served from <strong>PropertyService</strong></p>
            </div>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#DD9C37] hover:bg-[#c9892c] text-white text-xs font-bold rounded-lg transition-colors shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Venture</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  <img src={p.thumbnailImage || p.heroImage} alt={p.title} className="h-44 w-full object-cover" />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {p.status}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">ID: {p.id}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-base">{p.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#DD9C37]" />
                      <span>{p.location}</span>
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">{p.description}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">RERA: {p.reraNumber || 'N/A'}</span>
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddProjectModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
            <span className="text-xs font-bold text-[#DD9C37] uppercase">PropertyService CRUD</span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">Add New Venture / Project</h3>

            <form onSubmit={handleCreateProject} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ridge Meadows"
                  value={newProject.title}
                  onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Status</label>
                  <select
                    value={newProject.status}
                    onChange={e => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-200"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newProject.category}
                    onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shankarpally, Hyderabad"
                  value={newProject.location}
                  onChange={e => setNewProject({ ...newProject, location: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">RERA Number</label>
                  <input
                    type="text"
                    placeholder="P011000..."
                    value={newProject.reraNumber}
                    onChange={e => setNewProject({ ...newProject, reraNumber: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Approval Number</label>
                  <input
                    type="text"
                    placeholder="HMDA / DTCP LP No"
                    value={newProject.approvalNumber}
                    onChange={e => setNewProject({ ...newProject, approvalNumber: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="A short punchy tagline"
                  value={newProject.tagline}
                  onChange={e => setNewProject({ ...newProject, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Full project details..."
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={savingProject}
                className="w-full py-3 bg-[#DD9C37] hover:bg-[#c9892c] text-white font-bold rounded-lg text-xs shadow-md mt-2"
              >
                {savingProject ? 'Saving to Database...' : 'Save & Publish Venture'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
