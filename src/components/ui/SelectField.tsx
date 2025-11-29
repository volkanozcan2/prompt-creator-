import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  label: string;
  value: string;
  name?: string;
  options: string[];
  onChange: (value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, value, name, options, onChange }) => {
  return (
    <div className="group">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block group-focus-within:text-black transition-colors">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-900 outline-none appearance-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-black/5 transition-all"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none group-hover:text-black transition-colors" />
      </div>
    </div>
  );
};