import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, QrCode } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://media.base44.com/images/public/69b9d864ebb8dd58db0fa41f/3f30551b2_generated_image.png" alt="Limpiezas LD logo" className="h-10 w-10 object-contain" width="40" height="40" />
              <span className="text-2xl font-bold">Limpiezas LD</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">{f.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f.services}</h3>
            <ul className="space-y-3 text-sm text-background/70">
              {f.serviceLinks.map(label => (
                <li key={label}><Link to="/Services" className="hover:text-background transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f.company}</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link to="/About" className="hover:text-background transition-colors">{f.companyLinks[0]}</Link></li>
              <li><Link to="/Booking" className="hover:text-background transition-colors">{f.companyLinks[1]}</Link></li>
              <li><Link to="/Empleo" className="hover:text-background transition-colors">{f.companyLinks[2]}</Link></li>
              <li><span className="cursor-pointer hover:text-background transition-colors">{f.companyLinks[3]}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f.contact}</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex flex-wrap items-center gap-2">
                <a href="tel:+34643533453" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  <Phone className="w-4 h-4" />
                  +34 643 53 34 53
                </a>
                <a href="https://wa.me/34643533453" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +34 643 53 34 53" className="text-xs bg-green-500 text-white px-2 py-1.5 rounded-lg font-medium hover:bg-green-400 transition-colors">WhatsApp</a>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <a href="tel:+34602665537" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  <Phone className="w-4 h-4" />
                  +34 602 66 55 37
                </a>
                <a href="https://wa.me/34602665537" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +34 602 66 55 37" className="text-xs bg-green-500 text-white px-2 py-1.5 rounded-lg font-medium hover:bg-green-400 transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><a href="mailto:limpiezasdomesticos@gmail.com" className="hover:text-background transition-colors">limpiezasdomesticos@gmail.com</a></li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <a href="https://maps.google.com/?q=C.+Conde+de+Aranda+6,+30880+Águilas,+Murcia,+Spain" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  C. Conde de Aranda 6, 30880 Águilas
                </a>
              </li>
              <li className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span className="text-background/70 text-xs leading-relaxed">{f.serviceArea}</span>
              </li>
              <li className="flex items-start gap-2 pt-2">
                <span className="text-background/70 text-xs leading-relaxed font-medium">{f.languages}</span>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-background/70 mb-2">{f.scanQR}</p>
              <div className="bg-white rounded-xl p-2 inline-block">
                <QRCodeSVG value="https://www.limpiezas-ld.com" size={88} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/70">{f.rights}</p>
          <div className="flex gap-6 text-sm text-background/70 items-center">
            <Link to="/PrivacyPolicy" className="hover:text-background transition-colors">{f.privacy}</Link>
            <span className="hover:text-background transition-colors cursor-pointer">{f.terms}</span>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}