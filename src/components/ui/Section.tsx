import React from 'react';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, description, children, icon }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="p-2.5 bg-gray-50 rounded-xl text-gray-900 shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="pl-0 sm:pl-14 space-y-6">
        {children}
      </div>
    </div>
  );
};