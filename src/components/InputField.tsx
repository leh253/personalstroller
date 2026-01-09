
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, className = '', ...props }) => {
  return (
    <div className={`relative w-full mb-6 group ${className}`}>
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-400 transition-colors pointer-events-none z-10">
          <Icon size={18} strokeWidth={1.5} />
        </div>
      )}
      <input 
        {...props} 
        className={`w-full glass-input py-4 ${Icon ? 'pl-12' : 'pl-5'} pr-4 rounded-xl text-base outline-none placeholder:text-gray-500/60 text-white font-light tracking-wide`} 
      />
    </div>
  );
};

export default InputField;
