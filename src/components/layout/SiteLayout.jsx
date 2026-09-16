import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../WhatsAppButton';
import CallButton from '../CallButton';

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, background: 'blue', color: 'white', padding: '4px', textAlign: 'center', fontSize: '10px' }}>SITELAYOUT RENDERED</div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CallButton />
      <WhatsAppButton />
    </div>
  );
}