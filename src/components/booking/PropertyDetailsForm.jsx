import React from 'react';
import { Input } from '@/components/ui/input';

function RadioGroup({ label, options, value, onChange, otherValue, onOtherChange, otherLabel }) {
  return (
    <div>
      <p className="text-sm font-medium mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer text-sm font-medium transition-colors select-none
              ${value === opt.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border hover:bg-accent hover:text-accent-foreground'}`}
          >
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {value === 'other' && (
        <Input
          className="mt-3 rounded-xl h-10"
          placeholder={otherLabel}
          value={otherValue || ''}
          onChange={(e) => onOtherChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default function PropertyDetailsForm({ form, onChange, translations: bp }) {
  const propertyTypes = [
    { value: 'house', label: bp.propTypeHouse },
    { value: 'townhouse', label: bp.propTypeTownhouse },
    { value: 'apartment', label: bp.propTypeApartment },
    { value: 'commercial', label: bp.propTypeCommercial },
    { value: 'other', label: bp.other },
  ];

  const areas = [
    { value: 'up_to_60', label: '< 60 m²' },
    { value: 'up_to_80', label: '60–80 m²' },
    { value: 'up_to_100', label: '80–100 m²' },
    { value: 'over_100', label: '> 100 m²' },
    { value: 'other', label: bp.other },
  ];

  const makeNums = (values) => [
    ...values.map((v) => ({ value: String(v), label: String(v) })),
    { value: 'other', label: bp.other },
  ];

  return (
    <div className="space-y-6 pt-2">
      <RadioGroup
        label={bp.propertyType}
        options={propertyTypes}
        value={form.property_type}
        onChange={(v) => onChange('property_type', v)}
        otherValue={form.property_type_other}
        onOtherChange={(v) => onChange('property_type_other', v)}
        otherLabel={bp.otherDescribe}
      />

      <RadioGroup
        label={bp.propertyArea}
        options={areas}
        value={form.property_area}
        onChange={(v) => onChange('property_area', v)}
        otherValue={form.property_area_other}
        onOtherChange={(v) => onChange('property_area_other', v)}
        otherLabel={bp.otherDescribe}
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <RadioGroup
          label={bp.numBedrooms}
          options={makeNums([0, 1, 2, 3, '4+'])}
          value={form.num_bedrooms}
          onChange={(v) => onChange('num_bedrooms', v)}
          otherValue={form.num_bedrooms_other}
          onOtherChange={(v) => onChange('num_bedrooms_other', v)}
          otherLabel={bp.otherDescribe}
        />
        <RadioGroup
          label={bp.numBathrooms}
          options={makeNums([1, 2, 3, '4+'])}
          value={form.num_bathrooms}
          onChange={(v) => onChange('num_bathrooms', v)}
          otherValue={form.num_bathrooms_other}
          onOtherChange={(v) => onChange('num_bathrooms_other', v)}
          otherLabel={bp.otherDescribe}
        />
        <RadioGroup
          label={bp.numLivingRooms}
          options={makeNums([0, 1, 2, '3+'])}
          value={form.num_living_rooms}
          onChange={(v) => onChange('num_living_rooms', v)}
          otherValue={form.num_living_rooms_other}
          onOtherChange={(v) => onChange('num_living_rooms_other', v)}
          otherLabel={bp.otherDescribe}
        />
        <RadioGroup
          label={bp.numKitchens}
          options={makeNums([1, 2, '3+'])}
          value={form.num_kitchens}
          onChange={(v) => onChange('num_kitchens', v)}
          otherValue={form.num_kitchens_other}
          onOtherChange={(v) => onChange('num_kitchens_other', v)}
          otherLabel={bp.otherDescribe}
        />
      </div>
    </div>
  );
}