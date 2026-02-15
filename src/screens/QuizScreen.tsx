
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Feather, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';
import { QUIZ_STEPS } from '../constants';
import { QuizAnswers } from '../types';

interface Props {
  onComplete: (answers: QuizAnswers) => void;
  onBack: () => void;
  initialAnswers?: QuizAnswers;
}

const QuizScreen: React.FC<Props> = ({ onComplete, onBack, initialAnswers }) => {
  // Toujours commencer à la question 0 pour permettre la modification depuis le début
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  
  const currentQ = QUIZ_STEPS[stepIndex];
  const isLastQuestion = stepIndex === QUIZ_STEPS.length - 1;

  // Reset animation state when step changes
  useEffect(() => {
    setAnimatingOut(false);
  }, [stepIndex]);

  const handleAnswer = (value: string) => {
    if (isSubmitting || animatingOut) return;

    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);
    
    // Feedback visuel (sélection)
    if (isLastQuestion) {
      setIsSubmitting(true);
      setTimeout(() => {
        onComplete(newAnswers);
      }, 600);
    } else {
      setAnimatingOut(true);
      setTimeout(() => {
        setStepIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleBack = () => {
    if (isSubmitting) return;
    if (stepIndex > 0) setStepIndex(prev => prev - 1);
    else onBack();
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0f172a] relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND DYNAMIQUE --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#000000] z-0" />
      
      {/* Orbe lumineux décoratif haut-gauche */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#c5a065]/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Orbe lumineux décoratif bas-droite */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#c5a065]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Plumes flottantes subtiles */}
      <div className="absolute top-[15%] right-[5%] opacity-[0.03] animate-float-slow pointer-events-none">
        <Feather size={120} />
      </div>

      <div className="max-w-xl w-full mx-auto flex flex-col h-full relative z-10 px-6 py-6">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleBack} 
            className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#c5a065]/50 transition-all backdrop-blur-md"
            disabled={isSubmitting}
          >
            <ArrowLeft size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>
          
          <div className="scale-75 origin-right">
             <Logo size="small" />
          </div>
        </div>

        {/* --- PROGRESSION SEGMENTÉE --- */}
        <div className="w-full flex gap-2 mb-10">
          {QUIZ_STEPS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
                idx <= stepIndex 
                  ? 'bg-gradient-to-r from-[#c5a065] to-[#e0c9a6] shadow-[0_0_10px_rgba(197,160,101,0.4)]' 
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* --- QUESTION AREA --- */}
        <div 
          key={currentQ.id} 
          className={`flex-1 flex flex-col justify-center transition-all duration-300 ${animatingOut ? 'opacity-0 translate-y-[-20px] scale-95' : 'opacity-100 translate-y-0 scale-100'} animate-in-up`}
        >
          {/* Numéro de question stylisé */}
          <p className="text-[#c5a065] text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">
            Question {stepIndex + 1}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white leading-tight drop-shadow-lg">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((opt, i) => {
              const isSelected = answers[currentQ.id] === opt.value;
              
              return (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt.value)} 
                  disabled={isSubmitting}
                  className={`
                    relative w-full p-5 rounded-2xl flex items-center justify-between group transition-all duration-300 border
                    ${isSelected 
                      ? 'bg-[#c5a065]/10 border-[#c5a065] shadow-[0_0_30px_rgba(197,160,101,0.15)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg'
                    }
                  `}
                  style={{ animationDelay: `${i * 100}ms` }} // Staggered effect
                >
                  {/* Texte de l'option */}
                  <span className={`text-lg font-medium tracking-wide text-left transition-colors ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {opt.label}
                  </span>

                  {/* Indicateur visuel (Cercle / Check) */}
                  <div className={`
                    w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300
                    ${isSelected 
                      ? 'bg-[#c5a065] border-[#c5a065] scale-110' 
                      : 'border-white/20 group-hover:border-[#c5a065]/50'
                    }
                  `}>
                    {isSelected && <CheckCircle2 size={16} className="text-[#0f172a]" />}
                  </div>

                  {/* Effet de lueur au survol (non sélectionné) */}
                  {!isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default QuizScreen;
