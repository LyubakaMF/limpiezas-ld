import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function CallButton() {
  const phoneNumber = '+34643533453';
  const telUrl = `tel:${phoneNumber}`;

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'CallClick', { method: 'phone' });
    }
    base44.functions.invoke('sendMetaCAPIEvent', {
      event_name: 'CallClick',
      event_source_url: window.location.href,
    }).catch(() => {});
  };

  return (
    <motion.a
      href={telUrl}
      onClick={handleClick}
      className="fixed bottom-24 right-6 md:hidden z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      aria-label="Llamar por teléfono"
    >
      <Phone size={24} />
    </motion.a>
  );
}