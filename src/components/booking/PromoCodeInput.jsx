import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tag, CheckCircle2, XCircle } from 'lucide-react';

// Valid promo codes: { code: { discount, label, expiresAt } }
const PROMO_CODES = {
  rosa20: {
    discount: 20,
    label: '20% descuento',
    expiresAt: new Date('2026-06-15T23:59:59'),
  },
};

export default function PromoCodeInput({ onChange }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(null); // null | 'valid' | 'invalid' | 'expired'

  const handleChange = (e) => {
    const code = e.target.value;
    setValue(code);
    setStatus(null);
    onChange({ code: '', discount: 0 });
  };

  const handleBlur = () => {
    if (!value.trim()) {
      setStatus(null);
      return;
    }
    const key = value.trim().toLowerCase();
    const promo = PROMO_CODES[key];

    if (!promo) {
      setStatus('invalid');
      onChange({ code: '', discount: 0 });
      return;
    }

    if (new Date() > promo.expiresAt) {
      setStatus('expired');
      onChange({ code: '', discount: 0 });
      return;
    }

    setStatus('valid');
    onChange({ code: value.trim().toLowerCase(), discount: promo.discount, label: promo.label });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="promo_code">Código promocional</Label>
      <div className="relative">
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id="promo_code"
          placeholder="Introduce tu código..."
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-12 rounded-xl pl-9 pr-10"
        />
        {status === 'valid' && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
        )}
        {(status === 'invalid' || status === 'expired') && (
          <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
        )}
      </div>
      {status === 'valid' && (
        <p className="text-sm text-green-600 font-medium">✓ ¡Código aplicado! 20% de descuento</p>
      )}
      {status === 'invalid' && (
        <p className="text-sm text-destructive">Código no válido.</p>
      )}
      {status === 'expired' && (
        <p className="text-sm text-destructive">Este código ha expirado (válido hasta el 15/06/2026).</p>
      )}
    </div>
  );
}