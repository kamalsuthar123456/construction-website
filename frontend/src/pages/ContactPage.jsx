import React from 'react';
import Navbar from '../components/Navbar';
import ContactUs from '../components/ContactUs';
import Partners from '../components/Partners';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-600 selection:text-white">
      <Navbar />
      <main className="pt-20">
        <ContactUs />
        <Partners />
      </main>
    </div>
  );
}
