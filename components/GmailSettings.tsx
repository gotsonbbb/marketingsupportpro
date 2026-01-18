
import React, { useState, useEffect } from 'react';

interface GmailSettingsProps {
  onEmailChange: (email: string) => void;
  onClose: () => void;
}

const GmailSettings: React.FC<GmailSettingsProps> = ({ onEmailChange, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rehit_user_gmail');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSave = () => {
    if (email.includes('@')) {
      localStorage.setItem('rehit_user_gmail', email);
      onEmailChange(email);
      setIsSaved(true);
      setTimeout(() => { setIsSaved(false); onClose(); }, 1000);
    } else {
      alert("မှန်ကန်သော Email လိပ်စာ ထည့်သွင်းပေးပါ။");
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative z-[301] shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-2xl font-black text-slate-900 text-center mb-6">Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Receiver Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all font-bold" />
          </div>
          <button onClick={handleSave} className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl ${isSaved ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}>
            {isSaved ? 'SAVED SUCCESSFUL' : 'UPDATE SETTINGS'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GmailSettings;