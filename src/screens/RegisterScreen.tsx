
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, Trash2, Check, Plus, ShieldCheck } from 'lucide-react';
import { supabase } from '../services/supabase';
import { UserFormData, ParentStatus, QuizAnswers } from '../types';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { MONTHS } from '../constants';

interface Props {
  onBack: () => void;
  onSuccess: () => void;
  quizAnswers: QuizAnswers;
}

const RegisterScreen: React.FC<Props> = ({ onBack, onSuccess, quizAnswers }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: '', 
    password: '', 
    parentStatus: 'future', 
    pregnancyTermMonth: '', 
    pregnancyTermYear: '',
    children: [], 
    consent: false
  });

  const updateForm = (field: keyof UserFormData, value: any) => setFormData(p => ({ ...p, [field]: value }));

  const addChild = () => {
    if (formData.children.length < 6) {
      setFormData(p => ({ ...p, children: [...p.children, { ageRange: '' }] }));
    }
  };

  const removeChild = (index: number) => {
    const c = [...formData.children];
    c.splice(index, 1);
    setFormData(p => ({ ...p, children: c }));
  };

  const updateChildAge = (index: number, val: string) => {
    const c = [...formData.children];
    c[index].ageRange = val;
    setFormData(p => ({ ...p, children: c }));
  };

  useEffect(() => {
    if (formData.parentStatus === 'parent' && formData.children.length === 0) addChild();
  }, [formData.parentStatus]);

  const handleRegister = async () => {
    if (!formData.email || !formData.password) return alert("Veuillez remplir l'email et le mot de passe.");
    if (!formData.consent) return alert("Veuillez accepter les conditions.");
    
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
      });
      
      if (authError) throw authError;

      if (authData.user) {
        // Enregistrement anonymisé : pas de nom, pas de date de naissance.
        // On inclut ici les réponses au quiz (quizAnswers)
        const { error: dbError } = await supabase.from('user_leads').insert({
          id: authData.user.id,
          email: formData.email.trim(),
          parent_status: formData.parentStatus,
          pregnancy_term: formData.parentStatus === 'future' && formData.pregnancyTermYear 
            ? `${formData.pregnancyTermYear}-${formData.pregnancyTermMonth || '01'}-01` 
            : null,
          children: formData.parentStatus === 'parent' ? formData.children : [],
          consent: formData.consent,
          quiz_answers: quizAnswers || {}
        });
        if (dbError) console.error("Error saving lead data:", dbError);
      }
      onSuccess();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const ageOptions = [
    { label: '0-6 mois', value: '0-6m' },
    { label: '6-12 mois', value: '6-12m' },
    { label: '12-24 mois', value: '12-24m' },
    { label: '2 ans et +', value: '2y+' },
  ];

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];

  return (
    <div className="flex flex-col min-h-screen bg-[#151b2b]">
      <header className="p-6 bg-[#151b2b]/90 backdrop-blur-xl z-20 flex items-center shrink-0 border-b border-white/5 sticky top-0">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full mr-4 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-[#c5a065] font-bold text-xs tracking-[0.2em] uppercase">Espace Personnel</h2>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-10 animate-in-up">
          
          <section className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5">
            <div className="flex items-center gap-3 mb-6 text-[#c5a065]">
              <ShieldCheck size={20} />
              <p className="text-[10px] font-black tracking-widest uppercase">Confidentialité garantie</p>
            </div>
            
            <InputField icon={Mail} type="email" placeholder="Votre email" value={formData.email} onChange={e => updateForm('email', e.target.value)} />
            <InputField icon={Lock} type="password" placeholder="Mot de passe sécurisé" value={formData.password} onChange={e => updateForm('password', e.target.value)} />
            
            <p className="text-[10px] text-gray-500 leading-relaxed mt-2 italic">
              Nous ne collectons ni nom, ni prénom, ni date de naissance pour protéger votre vie privée.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black text-gray-500 mb-6 tracking-widest uppercase">Votre Situation</p>
            <div className="flex gap-4 mb-8">
              {[ { l: 'Futur Parent', v: 'future' }, { l: 'Déjà Parent', v: 'parent' } ].map(o => (
                <button 
                  key={o.v} 
                  type="button" 
                  onClick={() => updateForm('parentStatus', o.v)} 
                  className={`flex-1 py-5 rounded-2xl text-xs font-bold border transition-all ${formData.parentStatus === o.v ? 'border-[#c5a065] bg-[#c5a065]/10 text-[#c5a065] shadow-lg' : 'border-white/5 bg-slate-900/40 text-gray-500'}`}
                >
                  {o.l}
                </button>
              ))}
            </div>

            {formData.parentStatus === 'future' && (
              <div className="space-y-4 animate-in">
                <p className="text-[10px] text-gray-500 mb-2 ml-1 tracking-widest uppercase font-bold">Mois prévu du terme (Approximatif)</p>
                <div className="flex gap-2">
                  <select 
                    className="flex-1 glass-input py-4 px-4 rounded-2xl appearance-none bg-[#151b2b] text-sm"
                    value={formData.pregnancyTermMonth}
                    onChange={e => updateForm('pregnancyTermMonth', e.target.value)}
                  >
                    <option value="">Mois</option>
                    {MONTHS.map((m, i) => <option key={i} value={(i+1).toString().padStart(2, '0')}>{m}</option>)}
                  </select>
                  <select 
                    className="flex-1 glass-input py-4 px-4 rounded-2xl appearance-none bg-[#151b2b] text-sm"
                    value={formData.pregnancyTermYear}
                    onChange={e => updateForm('pregnancyTermYear', e.target.value)}
                  >
                    <option value="">Année</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            )}

            {formData.parentStatus === 'parent' && (
              <div className="space-y-4">
                {formData.children.map((c, i) => (
                  <div key={i} className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 relative group flex items-center justify-between">
                    <p className="text-[#c5a065] text-[9px] font-black tracking-widest uppercase">Enfant {i+1}</p>
                    <div className="flex items-center gap-3">
                      <select 
                        className="glass-input py-2 px-4 rounded-xl appearance-none bg-[#151b2b] text-xs cursor-pointer min-w-[140px]" 
                        value={c.ageRange} 
                        onChange={e => updateChildAge(i, e.target.value)}
                      >
                        <option value="" disabled>Tranche d'âge</option>
                        {ageOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                      <button type="button" onClick={() => removeChild(i)} className="text-gray-600 hover:text-red-400 p-2 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {formData.children.length < 6 && (
                  <button type="button" onClick={addChild} className="w-full py-4 border border-dashed border-[#c5a065]/20 text-[#c5a065]/60 rounded-2xl hover:bg-[#c5a065]/5 transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Plus size={14} /> Ajouter un enfant
                  </button>
                )}
              </div>
            )}
          </section>

          <section className="pb-12">
            <div className="flex gap-4 mb-8 cursor-pointer items-start" onClick={() => updateForm('consent', !formData.consent)}>
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${formData.consent ? 'bg-[#c5a065] border-[#c5a065]' : 'border-gray-700 bg-white/5'}`}>
                {formData.consent && <Check size={14} className="text-white" />}
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                J'accepte que mes réponses anonymisées soient analysées pour me proposer la meilleure sélection de poussettes.
              </p>
            </div>
            <Button variant="primary" onClick={handleRegister} disabled={!formData.consent || loading}>
              {loading ? "Création du profil..." : "Créer mon profil anonymisé"}
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
