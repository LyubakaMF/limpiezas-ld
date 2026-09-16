import React from 'react';

export default function Booking() {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        zIndex: 99999,
        background: 'red',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        BOOKING RENDERED — Booking.jsx се изпълнява
      </div>
      <div className="pt-32 min-h-screen p-8">
        <h1 className="text-2xl font-bold text-foreground">Booking страница</h1>
        <p className="text-muted-foreground">Това е тестово съдържание.</p>
      </div>
    </>
  );
}