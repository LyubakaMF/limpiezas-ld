import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tag, CheckCircle2, XCircle } from 'lucide-react';

const EXPIRY = new Date('2026-08-01T23:59:59');

const VALID_CODES = {
  'rosa20': 20,
};

export default function PromoCodeInput({ onChange }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(null); // null | 'valid' | 'invalid' | 'expired'
  const [discount, setDiscount] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    setStatus(null);
    setDiscount(null);
    onChange({ code: '', discount: 0 });
  };

  const handleBlur = () => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) { setStatus(null); return; }

    if (new Date() > EXPIRY) {
      setStatus('expired');
      onChange({ code: '', discount: 0 });
      return;
    }

    const pct = VALID_CODES[trimmed];
    if (!pct) {
      setStatus('invalid');
      onChange({ code: '', discount: 0 });
      return;
    }

    setStatus('valid');
    setDiscount(pct);
    onChange({ code: trimmed.toUpperCase(), discount: pct, label: `${pct}% descuento` });
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
      {status === 'valid' && discount && (
        <p className="text-sm text-green-600 font-medium">✓ ¡Código aplicado! {discount}% de descuento</p>
      )}
      {status === 'invalid' && (
        <p className="text-sm text-destructive">Código no válido.</p>
      )}
      {status === 'expired' && (
        <p className="text-sm text-destructive">Este código ha expirado (válido hasta el 01/08/2026).</p>
      )}
    </div>
  );
}