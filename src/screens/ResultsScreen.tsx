
import React, { useState } from 'react';
import { RefreshCw, ExternalLink, ArrowLeft, LogOut, Trash2, AlertTriangle, Star } from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { recordProductClick, deleteUserAccountData } from '../services/strollerService';
import { Stroller } from '../types';

interface Props {
  results: Stroller[];
  onRestart: () => void;
  onBack: () => void;
  onLogout: () => void;
}

const ResultsScreen: React.FC<Props> = ({ results, onRestart, onBack, onLogout }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUserAccountData();
      onLogout();
    } catch (error: any) {
      alert("Erreur: " + error.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="px-6 py-4 sticky top-0 z-50 flex items-center justify-between glass-panel !rounded-none !border-x-0 !border-t-0">
        <button onClick={onBack} className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"><ArrowLeft size={20}/></button>
        <Logo size="small" />
        <button onClick={onLogout} className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"><LogOut size={20}/></button>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 animate-in">
        <header className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold-400/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium mb-4 text-white drop-shadow-md">Votre Sélection</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400"></div>
            <p className="text-gold-400 text-xs tracking-[0.2em] uppercase font-bold">
              {results.length} Modèle{results.length > 1 ? 's' : ''} d'exception
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400"></div>
          </div>
        </header>

        {results.length === 0 ? (
          <div className="text-center py-20 glass-panel max-w-lg mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-slate-400">
               <AlertTriangle size={32} strokeWidth={1} />
            </div>
            <p className="text-slate-300 mb-8 px-8 font-light text-lg leading-relaxed">
              Nos critères d'exigence n'ont trouvé aucune correspondance parfaite. Ajustez vos préférences pour découvrir d'autres modèles.
            </p>
            <Button variant="primary" onClick={onRestart} className="max-w-xs">Modifier mes critères</Button>
          </div>
        ) : (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {results.map((s, i) => (
              <div key={i} className="group relative flex flex-col rounded-[2rem] bg-slate-900/40 border border-white/10 overflow-hidden hover:border-gold-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-900/20 hover:-translate-y-2">
                
                {/* Image Section */}
                <div className="bg-gradient-to-b from-white to-slate-100 p-8 h-72 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_rgba(197,160,101,0.15),_transparent)] pointer-events-none" />
                  <img src={s.url_image} alt={s.modele} className="max-h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-xl z-10" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-navy-900/90 text-gold-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-gold-400/20 uppercase tracking-widest shadow-sm backdrop-blur-md">
                      Recommandé
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col bg-navy-900/60 backdrop-blur-md">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-gold-400 text-[10px] font-black tracking-[0.25em] uppercase">{s.marque}</span>
                     <div className="flex text-gold-400 gap-0.5">
                       {[1,2,3,4,5].map(star => <Star key={star} size={10} fill="currentColor" strokeWidth={0} className="opacity-60" />)}
                     </div>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-medium mb-8 text-white leading-tight">{s.modele}</h3>
                  
                  <a 
                    href={s['site web'] || s.url_produit} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => recordProductClick(s)}
                    className="mt-auto group/btn relative w-full overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-gold-400/50 p-4 flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gold-400/0 group-hover/btn:bg-gold-400/10 transition-colors" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white group-hover/btn:text-gold-400 transition-colors">Découvrir</span>
                    <ExternalLink size={14} className="text-white group-hover/btn:text-gold-400 transition-colors" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer Actions */}
        <footer className="mt-32 border-t border-white/5 pt-12 flex flex-col items-center gap-8 max-w-sm mx-auto">
          <Button variant="outline" onClick={onRestart} className="!border-dashed !border-slate-700 hover:!border-gold-400/50 text-slate-400 hover:text-gold-400">
            <RefreshCw size={16} className="mr-2" /> Recommencer le diagnostic
          </Button>
          
          {!showDeleteConfirm ? (
            <button onClick={() => setShowDeleteConfirm(true)} className="text-slate-600 hover:text-red-400 text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors">
              <Trash2 size={12}/> Supprimer mes données
            </button>
          ) : (
            <div className="w-full glass-panel p-6 animate-in">
              <div className="flex items-center gap-3 mb-3 text-red-400">
                <AlertTriangle size={18} />
                <span className="text-xs font-bold uppercase tracking-wide">Zone de danger</span>
              </div>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">Cette action est irréversible et effacera tout votre historique.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 rounded-lg border border-white/10 text-xs text-slate-300 hover:bg-white/5 transition-colors">Annuler</button>
                <button onClick={handleDeleteAccount} disabled={isDeleting} className="flex-1 py-2.5 rounded-lg bg-red-500/10 border border-red-500/50 text-xs text-red-400 hover:bg-red-500/20 transition-colors font-medium">{isDeleting ? '...' : 'Confirmer'}</button>
              </div>
            </div>
          )}
        </footer>
      </main>
    </div>
  );
};
export default ResultsScreen;
