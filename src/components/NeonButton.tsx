
import React, { ButtonHTMLAttributes } from 'react';

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = "font-medium rounded-md transition-all duration-300 relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-space-accent hover:bg-space-light text-white py-3 px-6 border-[1px] border-neon-blue hover:shadow-[0_0_10px_2px_rgba(0,243,255,0.6)]",
    secondary: "bg-neon-purple/20 hover:bg-neon-purple/40 text-white py-3 px-6 border-[1px] border-neon-purple hover:shadow-[0_0_10px_2px_rgba(149,76,233,0.6)]",
    outline: "bg-transparent hover:bg-space-light/10 text-white py-3 px-6 border-[1px] border-neon-blue hover:border-neon-blue/80"
  };
  
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6",
    lg: "py-4 px-8 text-lg"
  };
  
  const disabledClasses = disabled ? "opacity-50 pointer-events-none" : "";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabledClasses}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;
