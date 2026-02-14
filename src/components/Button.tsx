
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'option';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', disabled = false, className = '', type = 'button' }) => {
  const baseStyle = "relative w-full py-4 rounded-xl font-sans font-medium text-[15px] tracking-widest uppercase transition-all duration-300 active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    // Premium Gold Gradient with shine effect
    primary: "bg-gradient-to-r from-[#c5a065] via-[#d4b075] to-[#b08d55] text-white shadow-[0_4px_20px_-5px_rgba(197,160,101,0.4)] border border-white/10",
    
    // Elegant Outline
    outline: "bg-transparent border border-[#c5a065]/50 text-[#c5a065] hover:bg-[#c5a065]/10 hover:border-[#c5a065] backdrop-blur-sm",
    
    // Minimalist Option
    option: "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {/* Shine effect overlay for primary buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      )}
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
