
import React, { useState } from 'react';
import { generateLogo } from '../geminiService';

const LogoGenerator: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [style, setStyle] = useState('modern');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName) return;
    setLoading(true);
    setError(null);
    try {
      const url = await generateLogo(brandName, style);
      setLogoUrl(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/5 mt-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-lg backdrop-blur-md border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Logo Lab</h3>
          <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest opacity-80">Brand Identity Creator</p>
        </div>
      </div>

      <form onSubmit={handleGenerateLogo} className="space-y-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-indigo-200 uppercase tracking-widest ml-1 mb-2 block">Brand Name</label>
            <input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="လုပ်ငန်းနာမည်..." className="w-full px-5 py-4 rounded-2xl bg-white/10 text-white placeholder:text-white/30 text-sm font-bold border border-white/10 focus:bg-white focus:text-slate-900 outline-none transition-all shadow-inner" />
          </div>
          <div>
            <label className="text-[10px] font-black text-indigo-200 uppercase tracking-widest ml-1 mb-2 block">Style Choice</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 text-sm font-bold focus:bg-white focus:text-slate-900 outline-none transition-all cursor-pointer">
              <option value="modern" className="text-slate-900">Modern & Clean</option>
              <option value="minimalist" className="text-slate-900">Minimalist</option>
              <option value="geometric" className="text-slate-900">Geometric Bold</option>
              <option value="hand-drawn" className="text-slate-900">Hand-drawn Sketch</option>
              <option value="luxury" className="text-slate-900">Luxury Gold</option>
              <option value="colorful" className="text-slate-900">Playful Colorful</option>
              <option value="vintage" className="text-slate-900">Classic Vintage</option>
            </select>
          </div>
          <button type="submit" disabled={loading || !brandName} className="w-full py-5 bg-white text-indigo-900 font-black rounded-2xl shadow-2xl transition-all hover:bg-slate-50 disabled:opacity-30 uppercase text-xs tracking-[0.3em]">
            {loading ? 'ဖန်တီးနေသည်...' : 'Get Professional Logo'}
          </button>
        </div>
      </form>

      {logoUrl && !loading && (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group bg-white p-4">
            <img src={logoUrl} className="w-full h-auto rounded-xl" alt="Brand Logo" />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a href={logoUrl} download={`${brandName}_logo.png`} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs hover:bg-indigo-600 hover:text-white transition-all">DOWNLOAD PNG</a>
            </div>
          </div>
        </div>
      )}
      {error && <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 text-white text-[10px] font-bold rounded-2xl text-center">⚠️ {error}</div>}
    </div>
  );
};

export default LogoGenerator;