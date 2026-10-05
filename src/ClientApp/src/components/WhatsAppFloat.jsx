import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919000888152?text=Hello%20Ridge%20Homes,%20I%20would%20like%20more%20information%20about%20your%20projects."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="font-semibold text-sm hidden sm:inline">Chat with Us</span>
    </a>
  );
}
