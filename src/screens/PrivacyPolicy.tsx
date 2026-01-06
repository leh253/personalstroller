
import React from 'react';
import Logo from '../components/Logo';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-300 p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gold-400 hover:underline">
          <ArrowLeft size={18} /> Retour
        </button>
        <Logo size="small" className="mb-8" />
        <h1 className="text-3xl font-bold text-white mb-6">Politique de Confidentialité</h1>
        <p className="mb-4 text-xs italic opacity-60">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        
        <section className="space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-gold-400 mb-3">1. Collecte des données</h2>
            <p>Nous collectons les informations que vous nous fournissez lors de l'inscription : nom, prénom, adresse email, et votre situation parentale. Ces données sont utilisées exclusivement pour personnaliser votre expérience et sécuriser votre accès au service.</p>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-gold-400 mb-3">2. Utilisation des données</h2>
            <p>Vos réponses au quiz sont rattachées à votre compte utilisateur et sont utilisées uniquement pour filtrer notre base de données de produits. Nous ne vendons jamais vos données personnelles à des régies publicitaires tierces.</p>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-gold-400 mb-3">3. Vos Droits (RGPD)</h2>
            <p>Vous disposez d'un droit d'accès, de rectification et de suppression. Vous pouvez supprimer l'intégralité de votre compte et de toutes vos données associées à tout moment via le bouton dédié dans l'écran des résultats.</p>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-gold-400 mb-3">4. Sécurité</h2>
            <p>Vos données sont chiffrées lors de leur transit et stockées de manière sécurisée via notre infrastructure Supabase, conforme aux normes européennes de protection des données.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
