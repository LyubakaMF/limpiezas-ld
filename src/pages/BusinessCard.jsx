import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function BusinessCard() {
  const cardFrontRef = useRef(null);
  const cardBackRef = useRef(null);

  const downloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85, 55],
    });

    // Front
    const frontCanvas = await html2canvas(cardFrontRef.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: null,
    });
    const frontImg = frontCanvas.toDataURL("image/png");
    pdf.addImage(frontImg, "PNG", 0, 0, 85, 55);

    // Back
    pdf.addPage([85, 55], "landscape");
    const backCanvas = await html2canvas(cardBackRef.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: null,
    });
    const backImg = backCanvas.toDataURL("image/png");
    pdf.addImage(backImg, "PNG", 0, 0, 85, 55);

    pdf.save("LimpiezasLD_Tarjeta.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-10 p-8">
      <h1 className="text-2xl font-bold text-gray-700">Визитна картичка — Limpiezas LD</h1>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* FRONT */}
        <div>
          <p className="text-center text-sm text-gray-500 mb-2 font-medium">Лице</p>
          <div
            ref={cardFrontRef}
            style={{ width: 340, height: 204 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Green gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-emerald-500" />
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/10" />
            <div className="absolute top-4 right-16 w-16 h-16 rounded-full bg-white/5" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="text-white/80 w-5 h-5" />
                <span className="text-white/80 text-xs font-medium tracking-widest uppercase">Servicios de Limpieza</span>
              </div>

              <div>
                <h2 className="text-white text-2xl font-extrabold tracking-tight leading-tight">
                  Limpiezas LD
                </h2>
                <p className="text-white/75 text-sm mt-1 font-medium">Lyubomir Dimitrov</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-white/40 rounded" />
                <span className="text-white/60 text-xs">Profesionales · Ecológicos</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div>
          <p className="text-center text-sm text-gray-500 mb-2 font-medium">Гръб</p>
          <div
            ref={cardBackRef}
            style={{ width: 340, height: 204 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* White background with green accent */}
            <div className="absolute inset-0 bg-white" />
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-700 via-emerald-500 to-green-600" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full bg-green-50" />
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-green-50" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-7 py-5 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-green-700" />
                </div>
                <span className="text-gray-700 text-sm font-semibold">+34 643 53 34 53</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-green-700" />
                </div>
                <span className="text-gray-600 text-sm">limpiezasdomesticos@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-green-700" />
                </div>
                <span className="text-gray-600 text-sm">Águilas, Murcia · España</span>
              </div>

              <div className="mt-1 pt-2 border-t border-gray-100">
                <p className="text-green-700 text-xs font-bold tracking-wide">www.limpiezas-ld.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={downloadPDF}
        className="bg-green-700 hover:bg-green-800 text-white rounded-full px-8 py-3 text-base font-semibold flex items-center gap-2 shadow-lg"
      >
        <Download className="w-5 h-5" />
        Изтегли PDF
      </Button>
    </div>
  );
}