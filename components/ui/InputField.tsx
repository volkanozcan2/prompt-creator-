import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, fullWidth }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-none px-3 py-2.5 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors placeholder-gray-300"
      />
    </div>
  );
};