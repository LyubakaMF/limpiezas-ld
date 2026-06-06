import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";

const adText = `🧹 LIMPIEZA FIN DE OBRA — ANUNCIO FACEBOOK

¿Obra terminada pero llena de polvo y escombros? 🏗️

Después de una reforma o construcción, limpiar no es una tarea sencilla. El polvo fino penetra en cada superficie, las manchas de cemento y pintura son difíciles de remover, y los restos de material están en todos lados.

✨ NUESTRO SERVICIO DE LIMPIEZA FIN DE OBRA:

✅ Eliminación completa de polvo de construcción (techos, paredes, esquinas)
✅ Remoción de manchas de cemento, silicona y pintura
✅ Limpieza técnica de vidrios y marcos
✅ Limpieza profunda de interiores de armarios y zonas de difícil acceso
✅ Aspirado industrial de todas las superficies
✅ Desinfección completa — Listo para entrar y vivir

🎯 ESPECIALIZADOS EN:
• Reformas residenciales
• Nuevas construcciones
• Renovaciones comerciales
• Obras mayores y menores

💰 PRECIOS COMPETITIVOS
Presupuesto personalizado según el tamaño y estado de la propiedad.

📞 CONTACTA HOY:
📱 +34 643 53 34 53
📧 limpiezasld@gmail.com

🌍 SERVIMOS: Águilas, San Juan de los Terreros, Mazarrón, Pulpí, Lorca y alrededores

⭐ +2,000 clientes satisfechos | 4.9/5 estrellas | 100% garantía de satisfacción

¡Que los profesionales se encarguen de la limpieza! 🧹✨`;

export default function AdText() {
  const [copied, setCopied] = React.useState(false);

  const handleDownload = () => {
    const blob = new Blob([adText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anuncio-fb-fin-obra.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(adText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center">Anuncio Facebook — Fin de Obra</h1>

        <div className="flex gap-3 mb-4">
          <Button onClick={handleDownload} className="flex-1 gap-2">
            <Download className="w-4 h-4" />
            Descargar .txt
          </Button>
          <Button onClick={handleCopy} variant="outline" className="flex-1 gap-2">
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "¡Copiado!" : "Copiar texto"}
          </Button>
        </div>

        <div className="bg-white border rounded-lg p-4 whitespace-pre-wrap text-sm leading-relaxed font-mono select-all">
          {adText}
        </div>
      </div>
    </div>
  );
}