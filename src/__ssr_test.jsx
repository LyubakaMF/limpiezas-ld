import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/lib/LanguageContext';
import Booking from '@/pages/Booking';

try {
  const html = renderToString(
    <LanguageProvider>
      <MemoryRouter initialEntries={['/Booking']}>
        <Routes>
          <Route path="/Booking" element={<Booking />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>
  );
  console.log('SSR SUCCESS, length:', html.length);
  console.log('HTML preview:', html.slice(0, 800));
} catch (e) {
  console.log('SSR ERROR:', e.message);
  console.log('STACK:', e.stack?.slice(0, 2000));
}