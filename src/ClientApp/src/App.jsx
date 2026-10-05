import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CareersPage from './pages/CareersPage';
import IsoCertifiedPage from './pages/IsoCertifiedPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-gray-800">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/iso-certified" element={<IsoCertifiedPage />} />
            <Route path="/contactus" element={<ContactPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}
