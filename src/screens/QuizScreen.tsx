
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import Logo from '../components/Logo';
import { QUIZ_STEPS } from '../constants';
import { QuizAnswers } from '../types';

interface Props {
  onComplete: (answers: QuizAnswers) => void;
  onBack: () => void;
  initialAnswers?: QuizAnswers;
}

const QuizScreen: React.FC<Props> = ({ onComplete, onBack, initialAnswers }) => {
  const [stepIndex, setStepIndex] = useState(() => initialAnswers && Object.keys(initialAnswers).length > 0 ? QUIZ_STEPS.length - 1 : 0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentQ = QUIZ_STEPS[stepIndex];
  const isLastQuestion = stepIndex === QUIZ_STEPS.length - 1;
  const isQuestion5 = currentQ.id === 'Q5'; // Terrain question has more options

  const handleAnswer = (value: string) => {
    if (isSubmitting) return;
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);
    if (isLastQuestion) setIsSubmitting(true);
    setTimeout(() => {
      if (!isLastQuestion) setStepIndex(prev => prev + 1);
      else onComplete(newAnswers);
    }, 250); // Slightly longer delay for animation feeling
  };

  const progress = ((stepIndex + 1) / QUIZ_STEPS.length) * 100;

  return (
    <div className="w-full flex-1 flex flex-col relative min-h-screen overflow-hidden">
      {/* Top Bar */}
      <div className="p-6 shrink-0 z-20">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => stepIndex > 0 ? setStepIndex(s => s - 1) : onBack()} 
              className="text-gray-400 hover:text-white p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors group"
              disabled={isSubmitting}
            >
              <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex flex-col items-end">
               <span className="text-gold-400 font-serif text-2xl italic leading-none">0{stepIndex + 1}</span>
               <span className="text-gray-600 text-[10px] font-medium tracking-widest uppercase">Question</span>
            </div>
          </div>
          
          {/* Elegant Progress Line */}
          <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#c5a065] to-[#fde68a] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-[0_0_10px_rgba(197,160,101,0.5)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12 overflow-y-auto z-10">
        <div className="max-w-md w-full mx-auto">
          <div key={currentQ.id} className="animate-in-up flex flex-col">
            <h2 className={`font-serif text-white text-center leading-tight mb-10 drop-shadow-lg ${isQuestion5 ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
              {currentQ.question}
            </h2>
            
            <div className={`grid gap-4 ${isQuestion5 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentQ.id] === opt.value;
                
                return (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(opt.value)} 
                    disabled={isSubmitting} 
                    className={`relative w-full group transition-all duration-300 flex items-center justify-between p-5 rounded-2xl border backdrop-blur-md overflow-hidden
                    ${isSelected 
                        ? 'bg-[#c5a065] border-[#c5a065] text-white shadow-glow scale-[1.02]' 
                        : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-[#c5a065]/50 hover:shadow-lg'
                    }`}
                  >
                    {/* Background glow on hover for unselected */}
                    {!isSelected && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />}
                    
                    <span className={`font-sans font-medium text-left tracking-wide z-10 ${isQuestion5 ? 'text-sm' : 'text-lg'} ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {opt.label}
                    </span>
                    
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all z-10 ${isSelected ? 'border-white bg-white text-[#c5a065]' : 'border-white/20 text-transparent group-hover:border-[#c5a065] group-hover:text-[#c5a065]'}`}>
                       {isSelected ? <Check size={14} strokeWidth={3} /> : <ArrowRight size={14} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
