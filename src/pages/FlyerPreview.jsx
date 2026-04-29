import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function FlyerPreview() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center gap-12 py-12 px-4">
      <h1 className="text-2xl font-bold text-gray-700">Флайер — Преглед за печат</h1>

      {/* ЛИЦЕ */}
      <div className="shadow-2xl">
        <img
          src="https://media.base44.com/images/public/69b9d864ebb8dd58db0fa41f/4d0209981_generated_image.png"
          alt="Limpiezas LD - Флайер Лице"
          className="w-[560px] max-w-full"
        />
      </div>

      {/* ГЪБ с реален QR код */}
      <div className="relative shadow-2xl bg-white" style={{ width: 560, fontFamily: 'Inter, sans-serif' }}>
        <img
          src="https://media.base44.com/images/public/69b9d864ebb8dd58db0fa41f/079a020f7_generated_image.png"
          alt="Limpiezas LD - Флайер Гръб"
          className="w-full block"
        />
        {/* Реален QR код позициониран върху изображението */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            top: '56%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          }}
        >
          <QRCodeSVG
            value="https://www.limpiezas-ld.com"
            size={130}
            bgColor="#ffffff"
            fgColor="#0a3d62"
            level="H"
            includeMargin={false}
          />
          <p style={{ fontSize: 11, color: '#0a3d62', fontWeight: 700, marginTop: 6, textAlign: 'center' }}>
            www.limpiezas-ld.com
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 max-w-lg text-center shadow">
        <h2 className="font-bold text-lg mb-2">📋 Инструкции за печат</h2>
        <ul className="text-sm text-gray-600 text-left space-y-1">
          <li>• Формат: A5 (148 × 210 mm), двустранен</li>
          <li>• Резолюция: минимум 300 dpi</li>
          <li>• Цветово пространство: CMYK</li>
          <li>• QR кодът на гърба е реален и сканируем ✅</li>
          <li>• За финален печат — изпратете на дизайнер като референция</li>
        </ul>
      </div>
    </div>
  );
}