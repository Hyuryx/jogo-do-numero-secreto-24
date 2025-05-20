
import React from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
  onClick?: () => void;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className, 
  variant = 'default',
  onClick
}) => {
  const baseStyles = "neon-button font-medium transition-all";
  
  const variantStyles = {
    default: "border-neon-blue text-neon-blue hover:shadow-[0_0_15px_rgba(0,243,255,0.6)]",
    secondary: "border-neon-purple text-neon-purple hover:shadow-[0_0_15px_rgba(155,48,255,0.6)]",
    outline: "bg-transparent border-neon-blue/50 text-white hover:border-neon-blue hover:text-neon-blue"
  };
  
  return (
    <button 
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NeonButton;
