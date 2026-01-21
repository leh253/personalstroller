
import React, { useState } from 'react';
import { Loader2, Feather } from 'lucide-react';
import WelcomeScreen from './screens/WelcomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';
import { QuizAnswers, Stroller, ScreenState } from './types';
import { fetchMatchingStrollers } from './services/strollerService';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<Stroller[]>([]);

  // 1. Scan terminé -> On va au Quiz
  const handleScanComplete = () => {
    setScreen('quiz');
  };

  // 2. Quiz terminé -> On lance la recherche (plus d'inscription)
  const handleQuizComplete = async (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setScreen('loading_results');

    try {
      // On lance la recherche et on attend au moins 2 secondes pour l'effet "IA"
      const matchesPromise = fetchMatchingStrollers(answers);
      const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));
      
      const [matches] = await Promise.all([matchesPromise, delayPromise]);
      
      setResults(matches);
      setScreen('results');
    } catch (error) {
      console.error("Erreur chargement résultats:", error);
      setResults([]);
      setScreen('results');
    }
  };

  return (
    <div className="w-full h-full bg-[#151b2b] overflow-hidden">
      {screen === 'welcome' && <WelcomeScreen onStart={handleScanComplete} />}
      
      {screen === 'quiz' && (
        <QuizScreen 
          initialAnswers={quizAnswers}
          onComplete={handleQuizComplete} 
          onBack={() => setScreen('welcome')}
        />
      )}

      {screen === 'loading_results' && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 animate-in bg-[#151b2b] relative overflow-hidden">
          {/* Background Feathers */}
          <div className="absolute top-[15%] left-[10%] opacity-10 animate-float-slow">
            <Feather className="text-gold-400 w-16 h-16 rotate-12" />
          </div>
          <div className="absolute bottom-[20%] right-[10%] opacity-10 animate-float">
            <Feather className="text-gold-400 w-12 h-12 -rotate-12" />
          </div>

          <div className="relative w-24 h-24 flex items-center justify-center mb-8 z-10">
             <div className="absolute w-full h-full border-4 border-gold-400/10 rounded-full"></div>
             <div className="absolute w-full h-full border-4 border-t-gold-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
             <div className="absolute w-[80%] h-[80%] border-4 border-b-gold-400/50 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slow"></div>
             <Loader2 className="text-gold-400 animate-pulse" size={32} />
          </div>
          
          <h3 className="text-2xl font-light text-white mb-2 z-10">Analyse en cours</h3>
          <p className="text-gold-400 font-bold tracking-[0.2em] uppercase text-[10px] animate-pulse z-10">
            Recherche de la poussette idéale...
          </p>
        </div>
      )}

      {screen === 'results' && (
        <ResultsScreen 
          results={results}
          onRestart={() => setScreen('welcome')}
          onBack={() => setScreen('welcome')}
        />
      )}
    </div>
  );
}
