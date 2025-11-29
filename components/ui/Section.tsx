import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 text-gray-900">
        {icon && <span className="text-gray-500">{icon}</span>}
        <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
};