import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
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
              <li><span className="cursor-pointer hover:text-background transition-colors">{f.companyLinks[2]}</span></li>
              <li><span className="cursor-pointer hover:text-background transition-colors">{f.companyLinks[3]}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{f.contact}</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +34 643 53 34 53</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +34 602 66 55 37</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> limpiezasld@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> C. Conde de Aranda 6, 30880 Águilas</li>
            </ul>
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