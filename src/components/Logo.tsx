import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'large', className = '' }) => {
  const isSmall = size === 'small';
  return (
    <div className={`flex flex-col items-center ${isSmall ? 'flex-row gap-3 mb-0' : 'mb-6'} ${className}`}>
      <div className={`relative rounded-full border border-gold-400/50 flex items-center justify-center bg-navy-800 overflow-hidden shadow-xl ${isSmall ? 'w-10 h-10' : 'w-24 h-24 mb-4'}`}>
        <img src="https://www.image-heberg.fr/files/17614987662851851592.png" alt="Logo" className="w-full h-full object-contain p-2" />
      </div>
      <div className={isSmall ? 'text-left' : 'text-center'}>
        <h1 className={`font-bold tracking-[0.1em] gold-text leading-tight ${isSmall ? 'text-sm' : 'text-xl md:text-3xl'}`}>
          PERSONAL STROLLER
        </h1>
        <p className={`text-gold-400 italic font-light tracking-widest opacity-80 uppercase ${isSmall ? 'text-[8px] leading-none mt-0.5' : 'text-[10px] mt-2'}`}>
          Premium Selection
        </p>
      </div>
    </div>
  );
};
export default Logo;