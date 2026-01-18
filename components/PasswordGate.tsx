
import React, { useState } from 'react';

interface PasswordGateProps {
  onSuccess: () => void;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1411985') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 overflow-hidden relative">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl border border-white/20 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-[2rem] flex items-center justify-center text-white text-3xl mx-auto mb-8 shadow-2xl rotate-3 border border-white/30">🔐</div>
        <h2 className="text-3xl font-black text-white mb-2">မင်္ဂလာပါ</h2>
        <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-10">Premium Marketing System</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Code ရိုက်ထည့်ပါ..." className={`w-full px-8 py-5 rounded-2xl bg-white/5 border-2 ${error ? 'border-red-500' : 'border-white/10'} text-white text-center text-lg font-black tracking-widest outline-none transition-all`} autoFocus />
          <button type="submit" className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all uppercase tracking-[0.2em] text-xs">Access System</button>
        </form>
        {error && <p className="mt-4 text-red-400 font-black text-xs uppercase">Incorrect Code!</p>}
      </div>
    </div>
  );
};

export default PasswordGate;