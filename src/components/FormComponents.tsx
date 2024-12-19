// AboutMeComponent.tsx
import React from 'react';

export const AboutMeComponent = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">About Me</label>
    <textarea
      className="w-full p-2 border rounded-md"
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Tell us about yourself..."
    />
  </div>
);

// AddressComponent.tsx


export const AddressComponent = ({
  value,
  onChange,
}: {
  value: { street: string; city: string; state: string; zip: string };
  onChange: (value: { street: string; city: string; state: string; zip: string }) => void;
}) => {
  const handleChange = (field: string, newValue: string) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={value.street}
          onChange={(e) => handleChange('street', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={value.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={value.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ZIP</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={value.zip}
            onChange={(e) => handleChange('zip', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}


// BirthdateComponent.tsx


export const BirthdateComponent = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Birthdate</label>
    <input
      type="date"
      className="w-full p-2 border rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
