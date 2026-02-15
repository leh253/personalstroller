
import React, { useState, useEffect } from 'react';
import { Fingerprint, Feather } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    if (isScanning) return;
    setIsScanning(true);
  };

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onStart, 300); // Petit délai après 100%
            return 100;
          }
          return prev + 2; // Vitesse du scan
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isScanning, onStart]);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-between bg-[#0f172a] overflow-hidden">
      
      {/* --- PLUIE DE PLUMES (ANIMATION MAINTENUE) --- */}
      <div className="absolute top-[5%] right-[10%] opacity-10 pointer-events-none animate-float-slow">
        <Feather className="text-[#c5a065] w-24 h-24 rotate-12" strokeWidth={0.5} />
      </div>
      
      <div className="absolute bottom-[15%] left-[-5%] opacity-5 pointer-events-none animate-float-delayed">
        <Feather className="text-[#c5a065] w-32 h-32 -rotate-12" strokeWidth={0.5} />
      </div>

      <div className="absolute top-[40%] left-[5%] opacity-5 pointer-events-none animate-float">
        <Feather className="text-[#c5a065] w-12 h-12 rotate-45" strokeWidth={1} />
      </div>

      {/* --- CONTENU CENTRAL --- */}
      <div className="flex-1 flex flex-col items-center justify-center w-full z-10 mt-10">
        
        {/* CERCLE PRINCIPAL - CADRE DORE */}
        <div className="relative w-72 h-72 md:w-80 md:h-80">
          
          {/* --- EFFETS AVANCÉS AUTOUR DU LOGO --- */}
          
          {/* 1. Halo Pulsant Large */}
          <div className="absolute inset-0 bg-[#c5a065]/10 blur-[80px] rounded-full animate-pulse-slow pointer-events-none" />

          {/* 2. Cercle Orbital Externe (Fin) */}
          <div className="absolute -inset-16 border border-[#c5a065]/10 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none" />
          
          {/* 3. Cercle Orbital Intermédiaire (Pointillés) */}
          <div className="absolute -inset-8 border border-dashed border-[#c5a065]/20 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none opacity-60" />

          {/* 4. Particules orbitales (simulation avec border-transparent et un bord coloré) */}
          <div className="absolute -inset-12 rounded-full border border-transparent border-t-[#c5a065]/30 animate-[spin_8s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-12 rounded-full border border-transparent border-b-[#c5a065]/30 animate-[spin_8s_linear_infinite] pointer-events-none" />

          {/* 5. Radar Scan Effect (Cercle qui s'agrandit et disparait) */}
          <div className="absolute inset-0 border border-[#c5a065]/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20 pointer-events-none" />


          {/* L'anneau doré extérieur (Gradient) */}
          <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-b from-[#c5a065] via-[#8c6b3a] to-[#0f172a] shadow-[0_0_40px_rgba(197,160,101,0.15)] z-10">
            {/* Le fond sombre intérieur */}
            <div className="w-full h-full rounded-full bg-[#131b2e] flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] border-[6px] border-[#0f172a]">
              
              {/* Effet de scan à l'intérieur du cercle */}
              {isScanning && (
                <div className="absolute inset-0 z-0">
                  <div className="w-full h-[2px] bg-[#c5a065]/50 blur-sm absolute top-0 animate-scan" />
                  <div className="absolute inset-0 bg-[#c5a065]/5 animate-pulse" />
                </div>
              )}

              {/* LOGO ICONE SEULE (Centrée et Agrandie) */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8">
                <img 
                  src="https://www.image-heberg.fr/files/17614987662851851592.png" 
                  alt="Baby Icon" 
                  className="w-full h-full object-contain drop-shadow-2xl opacity-90"
                />
              </div>

            </div>
          </div>
          
          {/* Liseré fin très lumineux sur le dessus pour l'effet métallique */}
          <div className="absolute inset-0 rounded-full border-t border-[#ffeebb]/30 pointer-events-none z-20" />
        </div>

      </div>

      {/* --- FOOTER SCANNER --- */}
      <div className="mb-16 w-full flex flex-col items-center justify-center relative z-20">
        
        {/* BOUTON SCANNER (SQUIRCLE) */}
        <div className="relative group">
          
          {/* --- EFFETS AUTOUR DE L'EMPREINTE --- */}
          {/* Glow constant derrière le bouton */}
          <div className={`absolute -inset-4 bg-[#c5a065]/20 blur-xl rounded-full transition-all duration-700 ${isScanning ? 'opacity-60 scale-125' : 'opacity-20 scale-100'}`} />
          
          {/* Onde de choc légère et permanente */}
          <div className="absolute -inset-1 border border-[#c5a065]/20 rounded-[2.2rem] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />

          <button
            onClick={startScan}
            disabled={isScanning}
            className="relative w-24 h-24 rounded-[2rem] bg-[#1e2536] border border-white/5 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all active:scale-95 overflow-hidden z-10"
          >
            {/* Remplissage de progression */}
            {isScanning && (
               <div 
                 className="absolute bottom-0 left-0 w-full bg-[#c5a065]/20 transition-all duration-75 ease-linear"
                 style={{ height: `${scanProgress}%` }}
               />
            )}

            <Fingerprint 
              size={48} 
              strokeWidth={1.2}
              className={`text-[#c5a065] transition-all duration-500 ${isScanning ? 'animate-pulse scale-110 drop-shadow-[0_0_15px_rgba(197,160,101,1)]' : 'opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(197,160,101,0.5)]'}`} 
            />
            
            {/* Liseré interne pour l'effet bouton enfoncé */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none opacity-50" />
          </button>
          
          {/* Cercle d'onde vif au clic (Scan actif) */}
          {isScanning && (
            <div className="absolute inset-0 -m-4 border-2 border-[#c5a065]/30 rounded-[2.5rem] animate-ping" />
          )}
        </div>

        <p className="mt-6 text-[10px] text-[#4a5568] tracking-[0.2em] font-medium uppercase">
          {isScanning ? "Analyse en cours..." : "Maintenir pour analyser"}
        </p>

      </div>
      
      {/* Footer legal très discret */}
      <div className="absolute bottom-4 text-[8px] text-[#1e293b] select-none">
        Personal Stroller AI © 2025
      </div>

    </div>
  );
};

export default WelcomeScreen;
