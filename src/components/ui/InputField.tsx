import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  name?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, name, onChange, placeholder, fullWidth }) => {
  return (
    <div className={`group ${fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block group-focus-within:text-black transition-colors">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
      />
    </div>
  );
};