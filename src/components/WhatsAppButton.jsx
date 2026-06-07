import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = '+34643533453';
  const message = 'Hola, me gustaría obtener más información sobre los servicios de limpieza.';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:hidden z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}