import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, QrCode } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://media.base44.com/images/public/69b9d864ebb8dd58db0fa41f/b357a208b_generated_image.png" alt="Limpiezas LD" className="h-10 w-auto" />
              <span className="text-xl font-bold">Limpiezas LD</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">{f.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{f.services}</h4>
            <ul className="space-y-3 text-sm text-background/60">
              {f.serviceLinks.map(label => (
                <li key={label}><Link to="/Services" className="hover:text-background transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{f.company}</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><Link to="/About" className="hover:text-background transition-colors">{f.companyLinks[0]}</Link></li>
              <li><Link to="/Booking" className="hover:text-background transition-colors">{f.companyLinks[1]}</Link></li>
              <li><Link to="/Empleo" className="hover:text-background transition-colors">{f.companyLinks[2]}</Link></li>
              <li><span className="cursor-pointer hover:text-background transition-colors">{f.companyLinks[3]}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{f.contact}</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+34643533453" className="hover:text-background transition-colors">+34 643 53 34 53</a>
                <a href="https://wa.me/34643533453" target="_blank" rel="noopener noreferrer" className="ml-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full hover:bg-green-400 transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /><a href="tel:+34602665537" className="hover:text-background transition-colors">+34 602 66 55 37</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><a href="mailto:limpiezasld@gmail.com" className="hover:text-background transition-colors">limpiezasld@gmail.com</a></li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <a href="https://maps.google.com/?q=C.+Conde+de+Aranda+6,+30880+Águilas,+Murcia,+Spain" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  C. Conde de Aranda 6, 30880 Águilas
                </a>
              </li>
              <li className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span className="text-background/50 text-xs leading-relaxed">{f.serviceArea}</span>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-background/40 mb-2">{f.scanQR}</p>
              <div className="bg-white rounded-xl p-2 inline-block">
                <QRCodeSVG value={typeof window !== 'undefined' ? window.location.origin : 'https://limpiezasld.com'} size={88} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">{f.rights}</p>
          <div className="flex gap-6 text-sm text-background/40">
            <span className="hover:text-background/60 transition-colors cursor-pointer">{f.privacy}</span>
            <span className="hover:text-background/60 transition-colors cursor-pointer">{f.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}