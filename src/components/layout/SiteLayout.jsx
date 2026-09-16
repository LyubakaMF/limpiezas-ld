import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../WhatsAppButton';
import CallButton from '../CallButton';

export default function SiteLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, background: 'blue', color: 'white', padding: '4px', textAlign: 'center', fontSize: '10px' }}>SITELAYOUT RENDERED — URL: {location.pathname}</div>
      <Navbar />
      <main className="flex-1">
        <div style={{ background: 'green', color: 'white', padding: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>BEFORE OUTLET</div>
        <Outlet />
        <div style={{ background: 'orange', color: 'white', padding: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>AFTER OUTLET</div>
      </main>
      <Footer />
      <CallButton />
      <WhatsAppButton />
    </div>
  );
}