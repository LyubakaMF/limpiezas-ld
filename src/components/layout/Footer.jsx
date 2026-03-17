import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
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
            <p className="text-background/60 text-sm leading-relaxed">
              Servicios profesionales de limpieza que transforman tu espacio. La confianza de miles de hogares y empresas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><Link to="/Services" className="hover:text-background transition-colors">Residential Cleaning</Link></li>
              <li><Link to="/Services" className="hover:text-background transition-colors">Commercial Cleaning</Link></li>
              <li><Link to="/Services" className="hover:text-background transition-colors">Deep Cleaning</Link></li>
              <li><Link to="/Services" className="hover:text-background transition-colors">Move In/Out</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><Link to="/About" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="/Booking" className="hover:text-background transition-colors">Book Now</Link></li>
              <li><span className="hover:text-background transition-colors cursor-pointer">Careers</span></li>
              <li><span className="hover:text-background transition-colors cursor-pointer">FAQ</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> hello@pureclean.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 123 Clean Street, Suite 100
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">© 2026 Limpiezas LD. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm text-background/40">
            <span className="hover:text-background/60 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-background/60 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}