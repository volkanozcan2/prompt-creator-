import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', icon, fullWidth }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-200";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-black",
    secondary: "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {icon}
      {children}
    </button>
  );
};